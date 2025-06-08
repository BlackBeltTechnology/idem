package hu.blackbelt.idem;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class IdemEvaluator {
    private static final Pattern DATE_PART_PATTERN = Pattern.compile("([0-9]+)([DdWwMmYy])");

    private static Object getFeatureValue(Map<String, Object> ctx, List<String> features) {
        if (features.size() == 0) {
            throw new IllegalArgumentException("No feauture is defined");
        }
        if (features.size() == 1) {
            return ctx.get(features.get(0));
        } else {
            var val = ctx.get(features.get(0));
            if (val == null) {
                return null;
            }
            if (! (val instanceof Map)) {
                throw new IllegalArgumentException("Feature does not found in context: " + features.get(0));
            }
            return getFeatureValue((Map<String, Object>) ctx.get(features.get(0)), features.stream().skip(1).toList());
        }
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
            case LocalDate:
            case String:
                return node.getValue();

            case StringAccess: {
                String str = (String) node.getValue();
                int index = toBigDecimal(evaluate(node.getIndexes().getElements().get(0), ctx)).intValue();
                return String.valueOf(str.charAt(index));
            }

            case Self:
                return getFeatureValue(ctx.getSelf(), node.getTags().getFeatures());

            case Add: {
                BigDecimal left = toBigDecimal(evaluate(node.getLeft(), ctx));
                BigDecimal right = toBigDecimal(evaluate(node.getRight(), ctx));
                return left.add(right);
            }

            case Subtract: {
                BigDecimal left = toBigDecimal(evaluate(node.getLeft(), ctx));
                BigDecimal right = toBigDecimal(evaluate(node.getRight(), ctx));
                return left.subtract(right);
            }

            case Multiply: {
                BigDecimal left = toBigDecimal(evaluate(node.getLeft(), ctx));
                BigDecimal right = toBigDecimal(evaluate(node.getRight(), ctx));
                return left.multiply(right);
            }

            case Divide: {
                BigDecimal left = toBigDecimal(evaluate(node.getLeft(), ctx));
                BigDecimal right = toBigDecimal(evaluate(node.getRight(), ctx));
                // It's good practice to define a scale and rounding mode for division
                return left.divide(right, 10, RoundingMode.HALF_UP);
            }

            case Modulus: {
                BigDecimal left = toBigDecimal(evaluate(node.getLeft(), ctx));
                BigDecimal right = toBigDecimal(evaluate(node.getRight(), ctx));
                return left.remainder(right);
            }

            case Power: {
                BigDecimal left = toBigDecimal(evaluate(node.getLeft(), ctx));
                int right = toBigDecimal(evaluate(node.getRight(), ctx)).intValue();
                return left.pow(right);
            }

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
                    // Handle case where 'left' is a number but collection contains different numeric types
                    if (left instanceof Number) {
                        return ((Collection<?>) right).stream()
                                .anyMatch(item -> compare(left, item) == 0);
                    }
                    return ((Collection<?>) right).contains(left);
                }
                return false;
            }

            case List:
                return node.getElements().stream()
                        .map(el -> evaluate(el, ctx))
                        .collect(Collectors.toList());

            case ListAccess: {
                List<Object> list = (List<Object>) evaluate(node.getList(), ctx);
                List<AstNode> indexNodes = node.getIndexes().getElements();
                Object current = list;
                for (AstNode indexNode : indexNodes) {
                    if (current instanceof List) {
                        int idx = toBigDecimal(evaluate(indexNode, ctx)).intValue();
                        current = ((List<?>) current).get(idx);
                    } else {
                        return null; // or throw error
                    }
                }
                return current;
            }

            case IndexAccess: {
                Object base = evaluate(node.getExpression(), ctx);
                Object current = base;
                List<AstNode> indexNodes = node.getIndexes().getElements();

                for (AstNode indexNode : indexNodes) {
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

            // FUNCTION IMPLEMENTATIONS
            case Floor: {
                BigDecimal value = toBigDecimal(evaluate(node.getElements().get(0), ctx));
                int precision = toBigDecimal(evaluate(node.getElements().get(1), ctx)).intValue();
                return value.setScale(precision, RoundingMode.FLOOR);
            }
            case Ceil: {
                BigDecimal value = toBigDecimal(evaluate(node.getElements().get(0), ctx));
                int precision = toBigDecimal(evaluate(node.getElements().get(1), ctx)).intValue();
                return value.setScale(precision, RoundingMode.CEILING);
            }
            case Round: {
                BigDecimal value = toBigDecimal(evaluate(node.getElements().get(0), ctx));
                int precision = toBigDecimal(evaluate(node.getElements().get(1), ctx)).intValue();
                return value.setScale(precision, RoundingMode.HALF_UP);
            }
            case Size: {
                Object obj = evaluate(node.getExpression(), ctx);
                if (obj instanceof String) return new BigDecimal(((String) obj).length());
                if (obj instanceof Collection) return new BigDecimal(((Collection<?>) obj).size());
                if (obj instanceof Map) return new BigDecimal(((Map<?, ?>) obj).size());
                throw new IllegalArgumentException("size() can only be called on String, Collection, or Map.");
            }
            case BoolToInt: {
                return (Boolean) evaluate(node.getExpression(), ctx) ? BigDecimal.ONE : BigDecimal.ZERO;
            }
            case Today:
                return truncateTime(new Date());
            case Yesterday: {
                Calendar cal = Calendar.getInstance();
                cal.setTime(truncateTime(new Date()));
                cal.add(Calendar.DATE, -1);
                return cal.getTime();
            }
            case Tomorrow: {
                Calendar cal = Calendar.getInstance();
                cal.setTime(truncateTime(new Date()));
                cal.add(Calendar.DATE, 1);
                return cal.getTime();
            }
            case DayDiff: {
                LocalDate date1 = toLocalDate(evaluate(node.getElements().get(0), ctx));
                LocalDate date2 = toLocalDate(evaluate(node.getElements().get(1), ctx));
                return new BigDecimal(ChronoUnit.DAYS.between(date1, date2));
            }
            case WeekDiff: {
                LocalDate date1 = toLocalDate(evaluate(node.getElements().get(0), ctx));
                LocalDate date2 = toLocalDate(evaluate(node.getElements().get(1), ctx));
                return new BigDecimal(ChronoUnit.WEEKS.between(date1, date2));
            }
            case MonthDiff: {
                LocalDate date1 = toLocalDate(evaluate(node.getElements().get(0), ctx));
                LocalDate date2 = toLocalDate(evaluate(node.getElements().get(1), ctx));
                return new BigDecimal(ChronoUnit.MONTHS.between(date1, date2));
            }
            case YearDiff: {
                LocalDate date1 = toLocalDate(evaluate(node.getElements().get(0), ctx));
                LocalDate date2 = toLocalDate(evaluate(node.getElements().get(1), ctx));
                return new BigDecimal(ChronoUnit.YEARS.between(date1, date2));
            }
            case Year:
                return new BigDecimal(toLocalDate(evaluate(node.getExpression(), ctx)).getYear());
            case MonthOfYear:
                return new BigDecimal(toLocalDate(evaluate(node.getExpression(), ctx)).getMonthValue());
            case DayOfMonth:
                return new BigDecimal(toLocalDate(evaluate(node.getExpression(), ctx)).getDayOfMonth());
            case DayOfYear:
                return new BigDecimal(toLocalDate(evaluate(node.getExpression(), ctx)).getDayOfYear());
            case DayOfWeek:
                return new BigDecimal(toLocalDate(evaluate(node.getExpression(), ctx)).getDayOfWeek().getValue());
            case WeekOfYear: {
                LocalDate date = toLocalDate(evaluate(node.getExpression(), ctx));
                return new BigDecimal(date.get(WeekFields.ISO.weekOfYear()));
            }
            case WeekOfMonth: {
                LocalDate date = toLocalDate(evaluate(node.getExpression(), ctx));
                return new BigDecimal(date.get(WeekFields.ISO.weekOfMonth()));
            }
            case AddDatePart:
                return handleDatePartArithmetic(node, ctx, 1);

            case SubtractDatePart:
                return handleDatePartArithmetic(node, ctx, -1);

            default:
                throw new IllegalStateException("Unknown AST node type: " + node.getType());
        }
    }

    private static BigDecimal toBigDecimal(Object value) {
        if (value instanceof BigDecimal) {
            return (BigDecimal) value;
        }
        if (value instanceof Number) {
            return new BigDecimal(value.toString());
        }
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
        // Fallback to equals for non-comparable types or different types
        return Objects.equals(left, right) ? 0 : -1;
    }

    private static LocalDate toLocalDate(Object value) {
        if (value instanceof Date) {
            return ((Date) value).toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        }
        throw new ClassCastException("Cannot cast " + (value != null ? value.getClass().getName() : "null") + " to Date.");
    }

    private static Date truncateTime(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

    private static Object handleDatePartArithmetic(AstNode node, EvalContext ctx, int sign) {
        Object dateValue = evaluate(node.getLeft(), ctx);
        if (!(dateValue instanceof Date)) {
            throw new IllegalArgumentException("Date arithmetic can only be performed on a Date object.");
        }

        String datePartStr = node.getDatePart();
        Matcher matcher = DATE_PART_PATTERN.matcher(datePartStr);

        if (!matcher.matches()) {
            throw new IllegalArgumentException("Invalid DatePart format: " + datePartStr);
        }

        long amount = Long.parseLong(matcher.group(1));
        String unit = matcher.group(2).toLowerCase();

        // Use the sign to determine addition or subtraction
        long effectiveAmount = amount * sign;

        ZonedDateTime zdt = ((Date) dateValue).toInstant().atZone(ZoneId.systemDefault());

        switch (unit) {
            case "d":
                zdt = zdt.plusDays(effectiveAmount);
                break;
            case "w":
                zdt = zdt.plusWeeks(effectiveAmount);
                break;
            case "m":
                zdt = zdt.plusMonths(effectiveAmount);
                break;
            case "y":
                zdt = zdt.plusYears(effectiveAmount);
                break;
            default:
                // This case should not be reached due to the regex pattern
                throw new IllegalStateException("Unknown date part unit: " + unit);
        }

        return Date.from(zdt.toInstant());
    }
}