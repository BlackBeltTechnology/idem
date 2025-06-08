package hu.blackbelt.idem;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class IdemEvaluator {

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


            case StringAccess: {
                String str = (String) node.getValue();
                int index = toBigDecimal(evaluate(node.getIndexes().getElements().get(0), ctx)).intValue();
                return String.valueOf(str.charAt(index));
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


            case AddDatePart:
            case SubtractDatePart:
                throw new UnsupportedOperationException(node.getType() + " not implemented in evaluator");

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
}