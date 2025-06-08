package hu.blackbelt.idem;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class IdemEvaluator {

    private static final Pattern DATE_PART_PATTERN = Pattern.compile("([0-9]+)([DdWwMmYy])");

    private static Object getFeatureValue(Map<String, Object> ctx, List<String> features) {
        if (features.isEmpty()) {
            throw new IllegalArgumentException("No feature is defined");
        }
        Object current = ctx;
        for (String feature : features) {
            if (current instanceof Map) {
                current = ((Map<?, ?>) current).get(feature);
                if (current == null) return null;
            } else {
                return null;
            }
        }
        return current;
    }

    @SuppressWarnings("unchecked")
    public static Object evaluate(AstNode node, EvalContext ctx) {
        if (node == null) {
            return null;
        }

        switch (node.getType()) {
            case Number:
            case Boolean:
            case Null:
            case String:
            case LocalDate:
            case Timestamp:
            case Time:
                return node.getValue();

            case Today:
                return LocalDate.now();
            case Yesterday:
                return LocalDate.now().minusDays(1);
            case Tomorrow:
                return LocalDate.now().plusDays(1);

            case Self:
                return getFeatureValue(ctx.getSelf(), node.getTags().getFeatures());

            case PostfixFunctionCall: {
                Object base = evaluate(node.getExpression(), ctx);
                List<Object> args = node.getElements().stream()
                        .map(el -> evaluate(el, ctx))
                        .collect(Collectors.toList());
                return FunctionDispatcher.dispatch(base, node.getFunctionName(), args);
            }

            case Add:
                return toBigDecimal(evaluate(node.getLeft(), ctx)).add(toBigDecimal(evaluate(node.getRight(), ctx)));
            case Subtract:
                return toBigDecimal(evaluate(node.getLeft(), ctx)).subtract(toBigDecimal(evaluate(node.getRight(), ctx)));
            case AddDatePart:
                return handleDatePartArithmetic(node, ctx, 1);
            case SubtractDatePart:
                return handleDatePartArithmetic(node, ctx, -1);
            case Multiply:
                return toBigDecimal(evaluate(node.getLeft(), ctx)).multiply(toBigDecimal(evaluate(node.getRight(), ctx)));
            case Divide:
                return toBigDecimal(evaluate(node.getLeft(), ctx)).divide(toBigDecimal(evaluate(node.getRight(), ctx)), 10, RoundingMode.HALF_UP);
            case Modulus:
                return toBigDecimal(evaluate(node.getLeft(), ctx)).remainder(toBigDecimal(evaluate(node.getRight(), ctx)));
            case Power:
                return toBigDecimal(evaluate(node.getLeft(), ctx)).pow(toBigDecimal(evaluate(node.getRight(), ctx)).intValue());
            case And:
                return (Boolean) evaluate(node.getLeft(), ctx) && (Boolean) evaluate(node.getRight(), ctx);
            case Or:
                return (Boolean) evaluate(node.getLeft(), ctx) || (Boolean) evaluate(node.getRight(), ctx);
            case Not:
                return !(Boolean) evaluate(node.getExpression(), ctx);
            case UnaryMinus:
                return toBigDecimal(evaluate(node.getExpression(), ctx)).negate();
            case Eq:
                return compare(evaluate(node.getLeft(), ctx), evaluate(node.getRight(), ctx)) == 0;
            case NotEq:
                return compare(evaluate(node.getLeft(), ctx), evaluate(node.getRight(), ctx)) != 0;
            case Gt:
                return compare(evaluate(node.getLeft(), ctx), evaluate(node.getRight(), ctx)) > 0;
            case Gte:
                return compare(evaluate(node.getLeft(), ctx), evaluate(node.getRight(), ctx)) >= 0;
            case Lt:
                return compare(evaluate(node.getLeft(), ctx), evaluate(node.getRight(), ctx)) < 0;
            case Lte:
                return compare(evaluate(node.getLeft(), ctx), evaluate(node.getRight(), ctx)) <= 0;
            case Ternary:
                return (Boolean) evaluate(node.getTCond(), ctx)
                        ? evaluate(node.getTThen(), ctx)
                        : evaluate(node.getTElse(), ctx);
            case In: {
                Object left = evaluate(node.getLeft(), ctx);
                Object right = evaluate(node.getRight(), ctx);
                if (right instanceof Collection) {
                    if (left instanceof Number) {
                        return ((Collection<?>) right).stream()
                                .anyMatch(item -> compare(left, item) == 0);
                    }
                    return ((Collection<?>) right).contains(left);
                }
                return false;
            }
            case Implies:
                return !(Boolean) evaluate(node.getLeft(), ctx) || (Boolean) evaluate(node.getRight(), ctx);
            case List:
                return node.getElements().stream()
                        .map(el -> evaluate(el, ctx))
                        .collect(Collectors.toList());
            case IndexAccess: {
                Object base = evaluate(node.getExpression(), ctx);
                Object current = base;
                for (AstNode indexNode : node.getIndexes().getElements()) {
                    int idx = toBigDecimal(evaluate(indexNode, ctx)).intValue();
                    if (current instanceof List) {
                        current = ((List<?>) current).get(idx);
                    } else if (current instanceof String) {
                        current = String.valueOf(((String) current).charAt(idx));
                    } else {
                        throw new IllegalStateException("Type " + (current != null ? current.getClass().getName() : "null") + " is not indexable.");
                    }
                }
                return current;
            }
            case PointerAccess: {
                Object base = evaluate(node.getExpression(), ctx);
                for (AstNode pointer : node.getPointers().getElements()) {
                    if (base == null) return null;
                    if (Objects.requireNonNull(pointer.getType()) == AstNodeType.Tags) {
                        for (String feature : pointer.getFeatures()) {
                            if (base instanceof Map) {
                                base = ((Map<String, Object>) base).get(feature);
                            } else {
                                return null;
                            }
                        }
                    } else if (pointer.getType() == AstNodeType.Index) {
                        AstNode indexNode = pointer.getIndexes().getElements().get(0);
                        int idx = toBigDecimal(evaluate(indexNode, ctx)).intValue();
                        if (base instanceof List) {
                            base = ((List<?>) base).get(idx);
                        } else {
                            return null;
                        }
                    }
                }
                return base;
            }
            default:
                throw new IllegalStateException("Unknown AST node type: " + node.getType());
        }
    }

    private static Object handleDatePartArithmetic(AstNode node, EvalContext ctx, int sign) {
        Object dateValue = evaluate(node.getLeft(), ctx);
        Matcher matcher = DATE_PART_PATTERN.matcher(node.getDatePart());
        if (!matcher.matches()) throw new IllegalArgumentException("Invalid DatePart format: " + node.getDatePart());

        long amount = Long.parseLong(matcher.group(1)) * sign;
        String unit = matcher.group(2).toLowerCase();

        ZonedDateTime zdt;
        if (dateValue instanceof LocalDate) {
            zdt = ((LocalDate) dateValue).atStartOfDay(ZoneId.systemDefault());
        } else if (dateValue instanceof LocalDateTime) {
            zdt = ((LocalDateTime) dateValue).atZone(ZoneId.systemDefault());
        } else {
            throw new IllegalArgumentException("Date arithmetic requires a LocalDate or LocalDateTime");
        }

        switch (unit) {
            case "d": zdt = zdt.plusDays(amount); break;
            case "w": zdt = zdt.plusWeeks(amount); break;
            case "m": zdt = zdt.plusMonths(amount); break;
            case "y": zdt = zdt.plusYears(amount); break;
        }

        return dateValue instanceof LocalDate ? zdt.toLocalDate() : zdt.toLocalDateTime();
    }

    private static BigDecimal toBigDecimal(Object value) {
        if (value instanceof BigDecimal) return (BigDecimal) value;
        if (value instanceof Number) return new BigDecimal(value.toString());
        throw new ClassCastException("Cannot cast " + value.getClass().getName() + " to BigDecimal.");
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private static int compare(Object left, Object right) {
        if (left instanceof Number && right instanceof Number) {
            return toBigDecimal(left).compareTo(toBigDecimal(right));
        }
        if (left instanceof Comparable && right != null && left.getClass().isInstance(right)) {
            return ((Comparable) left).compareTo(right);
        }
        return Objects.equals(left, right) ? 0 : -1;
    }
}