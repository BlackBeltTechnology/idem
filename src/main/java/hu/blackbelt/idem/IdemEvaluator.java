package hu.blackbelt.idem;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@SuppressWarnings({"unchecked", "rawtypes"})
public class IdemEvaluator {

    public static Object evaluate(AstNode node, EvalContext ctx) {
        if (node == null) return null;

        switch (node.getType()) {
            case NUMBER:
            case STRING:
            case BOOLEAN:
            case DATE:
            case TIMESTAMP:
            case TIME:
                return node.getValue();
            case NULL:
                return null;
            case TODAY:
                return LocalDate.now();
            case YESTERDAY:
                return LocalDate.now().minusDays(1);
            case TOMORROW:
                return LocalDate.now().plusDays(1);
            case SELF:
                return ctx.getSelf();
            case IDENTIFIER:
                return ctx.getSelf().get(node.getName());
            case UNARY_EXPRESSION:
                return handleUnary(node, ctx);
            case BINARY_EXPRESSION:
                return handleBinary(node, ctx);
            case TERNARY_EXPRESSION: {
                Object condition = evaluate(node.getChildren().get(0), ctx);
                // Per spec, undefined condition is false
                if (toBoolean(condition)) {
                    return evaluate(node.getChildren().get(1), ctx);
                } else {
                    return evaluate(node.getChildren().get(2), ctx);
                }
            }
            case NAVIGATION: {
                Object target = evaluate(node.getTarget(), ctx);
                if (target == null) return null;
                if (target instanceof Map) {
                    return ((Map<String, Object>) target).get(node.getName());
                }
                throw new IllegalArgumentException("Navigation target must be a map-like object.");
            }
            case FUNCTION_CALL: {
                Object target = evaluate(node.getTarget(), ctx);
                return FunctionDispatcher.dispatch(node.getName(), target, node.getArguments(), ctx);
            }
            case IN_EXPRESSION: {
                Object left = evaluate(node.getChildren().get(0), ctx);
                Object right = evaluate(node.getChildren().get(1), ctx);
                if (left == null || right == null) return null;
                if (!(right instanceof Collection)) return false;
                return ((Collection) right).stream().anyMatch(item -> compare(left, item) == 0);
            }
            case INDEX_ACCESS: {
                Object target = evaluate(node.getChildren().get(0), ctx);
                Object index = evaluate(node.getChildren().get(1), ctx);
                if (target == null || index == null) return null;
                int idx = toBigDecimal(index).intValue();
                if (target instanceof List) return ((List) target).get(idx);
                if (target instanceof String) return String.valueOf(((String) target).charAt(idx));
                throw new IllegalArgumentException("Index access is only supported for lists and strings.");
            }
            default:
                throw new IllegalStateException("Unexpected value: " + node.getType());
        }
    }

    private static Object handleUnary(AstNode node, EvalContext ctx) {
        Object operand = evaluate(node.getChildren().get(0), ctx);
        if (operand == null) return null;
        switch (node.getOperator()) {
            case "-": return toBigDecimal(operand).negate();
            case "not": return !toBoolean(operand);
            default: throw new UnsupportedOperationException("Unknown unary operator: " + node.getOperator());
        }
    }

    private static Object handleBinary(AstNode node, EvalContext ctx) {
        Object left = evaluate(node.getChildren().get(0), ctx);
        Object right = evaluate(node.getChildren().get(1), ctx);

        // Undefined propagation
        if ("+".equals(node.getOperator())) {
            if (left instanceof String || right instanceof String) {
                if (left == null || right == null) return null;
                return Objects.toString(left) + Objects.toString(right);
            }
        }

        if (!isLogical(node.getOperator())) {
            if (left == null || right == null) return null;
        }

        switch (node.getOperator()) {
            case "+":
                return toBigDecimal(left).add(toBigDecimal(right));
            case "-": return toBigDecimal(left).subtract(toBigDecimal(right));
            case "*": return toBigDecimal(left).multiply(toBigDecimal(right));
            case "/": return toBigDecimal(left).divide(toBigDecimal(right), 10, RoundingMode.HALF_UP);
            case "div": return toBigDecimal(left).toBigInteger().divide(toBigDecimal(right).toBigInteger());
            case "mod":
            case "%":
                return toBigDecimal(left).toBigInteger().remainder(toBigDecimal(right).toBigInteger());
            case "^": return toBigDecimal(left).pow(toBigDecimal(right).intValue());
            case "and": return toBoolean(left) && toBoolean(right);
            case "or": return toBoolean(left) || toBoolean(right);
            case "xor": return toBoolean(left) != toBoolean(right);
            case "implies": return !toBoolean(left) || toBoolean(right);
            case "=": case "==": return compare(left, right) == 0;
            case "!=": case "<>": return compare(left, right) != 0;
            case ">": return compare(left, right) > 0;
            case ">=": return compare(left, right) >= 0;
            case "<": return compare(left, right) < 0;
            case "<=": return compare(left, right) <= 0;
            default: throw new UnsupportedOperationException("Unknown binary operator: " + node.getOperator());
        }
    }

    private static boolean isLogical(String op) {
        return List.of("and", "or", "xor", "implies").contains(op);
    }

    public static int compare(Object left, Object right) {
        if (Objects.equals(left, right)) {
            return 0;
        }
        if (left == null) {
            return -1;
        }
        if (right == null) {
            return 1;
        }
        if (left instanceof String && right instanceof String) {
            return ((String) left).compareToIgnoreCase((String) right);
        }
        if (left instanceof Number && right instanceof Number) {
            return toBigDecimal(left).compareTo(toBigDecimal(right));
        }
        if (left instanceof Comparable && right instanceof Comparable) {
            if (left.getClass().isAssignableFrom(right.getClass())) {
                return ((Comparable) left).compareTo(right);
            } else if (right.getClass().isAssignableFrom(left.getClass())) {
                return -((Comparable) right).compareTo(left);
            }
        }
        throw new IllegalArgumentException("Cannot compare " + left.getClass() + " and " + right.getClass());
    }

    public static BigDecimal toBigDecimal(Object value) {
        if (value instanceof BigDecimal) return (BigDecimal) value;
        if (value instanceof Number) return new BigDecimal(value.toString());
        if (value instanceof String) return new BigDecimal((String) value);
        if (value instanceof Boolean) return (Boolean) value ? BigDecimal.ONE : BigDecimal.ZERO;
        throw new ClassCastException("Cannot cast " + value.getClass().getName() + " to BigDecimal.");
    }

    public static boolean toBoolean(Object value) {
        if (value instanceof Boolean) return (Boolean) value;
        if (value == null) return false; // Undefined is false in logical contexts
        if (value instanceof Number && ((Number) value).doubleValue() == 0) return false;
        return true; // Any other non-null, non-boolean value is truthy
    }
}
