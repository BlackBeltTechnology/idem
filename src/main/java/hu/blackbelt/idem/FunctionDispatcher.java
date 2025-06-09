package hu.blackbelt.idem;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static hu.blackbelt.idem.IdemEvaluator.compare;
import static hu.blackbelt.idem.IdemEvaluator.evaluate;
import static hu.blackbelt.idem.IdemEvaluator.toBoolean;

public class FunctionDispatcher {

    @FunctionalInterface
    interface IdemFunction {
        Object apply(Object target, List<AstNode> args, EvalContext ctx);
    }

    private static final Map<String, IdemFunction> FUNCTIONS = Map.ofEntries(
            // Generic Functions
            Map.entry("isDefined", (target, args, ctx) -> target != null),
            Map.entry("isUndefined", (target, args, ctx) -> target == null),

            // String Functions
            Map.entry("lowerCase", (target, args, ctx) -> ((String) target).toLowerCase()),
            Map.entry("upperCase", (target, args, ctx) -> ((String) target).toUpperCase()),
            Map.entry("length", (target, args, ctx) -> new BigDecimal(((String) target).length())),
            Map.entry("substring", (target, args, ctx) -> {
                int startIndex = IdemEvaluator.toBigDecimal(evaluate(args.get(0), ctx)).intValue();
                int length = IdemEvaluator.toBigDecimal(evaluate(args.get(1), ctx)).intValue();
                return ((String) target).substring(startIndex, startIndex + length);
            }),
            Map.entry("first", (target, args, ctx) -> {
                int n = IdemEvaluator.toBigDecimal(evaluate(args.get(0), ctx)).intValue();
                return ((String) target).substring(0, n);
            }),
            Map.entry("last", (target, args, ctx) -> {
                int n = IdemEvaluator.toBigDecimal(evaluate(args.get(0), ctx)).intValue();
                String str = (String) target;
                return str.substring(str.length() - n);
            }),
            Map.entry("position", (target, args, ctx) -> new BigDecimal(((String) target).indexOf((String)evaluate(args.get(0), ctx)))),
            Map.entry("matches", (target, args, ctx) -> ((String) target).matches((String)evaluate(args.get(0), ctx))),
            Map.entry("replace", (target, args, ctx) -> ((String) target).replaceAll((String)evaluate(args.get(0), ctx), (String)evaluate(args.get(1), ctx))),
            Map.entry("trim", (target, args, ctx) -> ((String) target).trim()),

            // Numeric Functions
            Map.entry("round", (target, args, ctx) -> {
                int precision = args.isEmpty() ? 0 : IdemEvaluator.toBigDecimal(evaluate(args.get(0), ctx)).intValue();
                return IdemEvaluator.toBigDecimal(target).setScale(precision, RoundingMode.HALF_UP);
            }),

            // Temporal Functions
            Map.entry("difference", (target, args, ctx) -> {
                Object right = evaluate(args.get(0), ctx);
                if (target instanceof LocalDate) return new BigDecimal(ChronoUnit.DAYS.between((LocalDate) right, (LocalDate) target));
                if (target instanceof LocalDateTime) return new BigDecimal(ChronoUnit.SECONDS.between((LocalDateTime) right, (LocalDateTime) target));
                if (target instanceof LocalTime) return new BigDecimal(ChronoUnit.SECONDS.between((LocalTime) right, (LocalTime) target));
                throw new IllegalArgumentException("difference() not supported for this type");
            }),

            // Collection Functions
            Map.entry("size", (target, args, ctx) -> new BigDecimal(((Collection<?>) target).size())),
            Map.entry("count", (target, args, ctx) -> new BigDecimal(((Collection<?>) target).size())),
            Map.entry("head", (target, args, ctx) -> {
                long n = IdemEvaluator.toBigDecimal(evaluate(args.get(0), ctx)).longValue();
                return ((Collection<?>) target).stream().limit(n).collect(Collectors.toList());
            }),
            Map.entry("tail", (target, args, ctx) -> {
                long n = IdemEvaluator.toBigDecimal(evaluate(args.get(0), ctx)).longValue();
                Collection<?> collection = (Collection<?>) target;
                return collection.stream().skip(Math.max(0, collection.size() - n)).collect(Collectors.toList());
            }),
            Map.entry("limit", (target, args, ctx) -> {
                long count = IdemEvaluator.toBigDecimal(evaluate(args.get(0), ctx)).longValue();
                long offset = args.size() > 1 ? IdemEvaluator.toBigDecimal(evaluate(args.get(1), ctx)).longValue() : 0;
                return ((Collection<?>) target).stream().skip(offset).limit(count).collect(Collectors.toList());
            }),
            Map.entry("filter", (target, args, ctx) -> {
                AstNode iterator = args.get(0);
                return ((Collection<?>) target).stream()
                        .filter(item -> {
                            EvalContext itemCtx = ctx.withSelf(Map.of(iterator.getIteratorVar(), item));
                            return toBoolean(evaluate(iterator.getIteratorExpression(), itemCtx));
                        })
                        .collect(Collectors.toList());
            }),
            Map.entry("join", (target, args, ctx) -> {
                AstNode iterator = args.get(0);
                String delimiter = (String) evaluate(args.get(1), ctx);
                return ((Collection<?>) target).stream()
                        .map(item -> {
                            EvalContext itemCtx = ctx.withSelf(Map.of(iterator.getIteratorVar(), item));
                            return Objects.toString(evaluate(iterator.getIteratorExpression(), itemCtx));
                        })
                        .collect(Collectors.joining(delimiter));
            }),
            Map.entry("sum", (target, args, ctx) -> getStream(target, args, ctx)
                    .map(IdemEvaluator::toBigDecimal)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)),
            Map.entry("avg", (target, args, ctx) -> {
                List<BigDecimal> numbers = getStream(target, args, ctx)
                        .map(IdemEvaluator::toBigDecimal).collect(Collectors.toList());
                if (numbers.isEmpty()) return BigDecimal.ZERO;
                BigDecimal sum = numbers.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
                return sum.divide(new BigDecimal(numbers.size()), 10, RoundingMode.HALF_UP);
            }),
            Map.entry("min", (target, args, ctx) -> getStream(target, args, ctx)
                    .min(IdemEvaluator::compare)
                    .orElse(null)),
            Map.entry("max", (target, args, ctx) -> getStream(target, args, ctx)
                    .max(IdemEvaluator::compare)
                    .orElse(null)),
            Map.entry("sort", (target, args, ctx) -> {
                List<?> list = new java.util.ArrayList<>((Collection<?>) target);
                Comparator<Object> comparator = (o1, o2) -> {
                    int result = 0;
                    for (AstNode sortClause : args) {
                        if (result == 0) {
                            EvalContext ctx1 = ctx.withSelf(Map.of(sortClause.getIteratorVar(), o1));
                            EvalContext ctx2 = ctx.withSelf(Map.of(sortClause.getIteratorVar(), o2));

                            Object val1 = evaluate(sortClause.getIteratorExpression(), ctx1);
                            Object val2 = evaluate(sortClause.getIteratorExpression(), ctx2);
                            result = compare(val1, val2);

                            if (sortClause.getValue() != null && "DESC".equalsIgnoreCase(sortClause.getValue().toString())) {
                                result = -result;
                            }
                        }
                    }
                    return result;
                };
                list.sort(comparator);
                return list;
            })
    );

    private static Stream<?> getStream(Object target, List<AstNode> args, EvalContext ctx) {
        Collection<?> collection = (Collection<?>) target;
        if (args.isEmpty()) {
            return collection.stream();
        }
        AstNode iterator = args.get(0);
        return collection.stream().map(item -> {
            EvalContext itemCtx = ctx.withSelf(Map.of(iterator.getIteratorVar(), item));
            return evaluate(iterator.getIteratorExpression(), itemCtx);
        });
    }

    public static Object dispatch(String functionName, Object target, List<AstNode> args, EvalContext ctx) {
        if (target == null && !Set.of("isDefined", "isUndefined").contains(functionName)) {
            return null;
        }
        if (FUNCTIONS.containsKey(functionName)) {
            return FUNCTIONS.get(functionName).apply(target, args, ctx);
        }
        throw new UnsupportedOperationException("Function '" + functionName + "' is not defined.");
    }

}