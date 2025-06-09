package hu.blackbelt.idem;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.function.BiFunction;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static java.util.Map.entry;
public class FunctionDispatcher {
    // --- FUNCTION MAPS ---

    private static final Map<String, BiFunction<Object, List<Object>, Object>> OBJECT_FUNCTIONS = Map.ofEntries(
            entry("isDefined", (val, args) -> val != null),
            entry("isUndefined", (val, args) -> val == null),
            entry("size", (val, args) -> {
                if (val instanceof Collection) return new BigDecimal(((Collection<?>) val).size());
                if (val instanceof Map) return new BigDecimal(((Map<?, ?>) val).size());
                if (val instanceof String) return new BigDecimal(((String) val).length());
                throw new IllegalArgumentException("size() can only be called on Collection, Map or String.");
            }),
            entry("join", (val, args) -> {
                if (!(val instanceof Collection)) {
                    throw new IllegalArgumentException("join() can only be called on Collection.");
                }
                String separator = args.isEmpty() ? "," : (String) args.get(0);
                return ((Collection<?>) val).stream()
                        .map(Object::toString)
                        .collect(Collectors.joining(separator));
            }),
            entry("toInt", (val, args) -> {
                if (val instanceof Boolean) return (Boolean) val ? BigDecimal.ONE : BigDecimal.ZERO;
                throw new IllegalArgumentException("Cannot convert " + val.getClass().getSimpleName() + " to int");
            })
    );

    private static final Map<String, BiFunction<BigDecimal, List<Object>, Object>> NUMBER_FUNCTIONS = Map.of(
            // Overloaded: handles round() and round(precision)
            "round", (val, args) -> {
                int precision = args.isEmpty() ? 0 : ((BigDecimal) args.get(0)).intValue();
                return val.setScale(precision, RoundingMode.HALF_UP);
            },
            "floor", (val, args) -> {
                int precision = args.isEmpty() ? 0 : ((BigDecimal) args.get(0)).intValue();
                return val.setScale(precision, RoundingMode.FLOOR);
            },
            "ceil", (val, args) -> {
                int precision = args.isEmpty() ? 0 : ((BigDecimal) args.get(0)).intValue();
                return val.setScale(precision, RoundingMode.CEILING);
            }
    );

    private static final Map<String, BiFunction<String, List<Object>, Object>> STRING_FUNCTIONS = Map.ofEntries(
            entry("lowerCase", (val, args) -> val.toLowerCase()),
            entry("upperCase", (val, args) -> val.toUpperCase()),
            entry("length", (val, args) -> new BigDecimal(val.length())),
            entry("trim", (val, args) -> val.trim()),
            entry("substring", (val, args) -> {
                int startIndex = ((BigDecimal) args.get(0)).intValue();
                int length = ((BigDecimal) args.get(1)).intValue();
                return val.substring(startIndex, startIndex + length);
            }),
            entry("first", (val, args) -> val.substring(0, ((BigDecimal) args.get(0)).intValue())),
            entry("last", (val, args) -> val.substring(val.length() - ((BigDecimal) args.get(0)).intValue())),
            entry("position", (val, args) -> new BigDecimal(val.indexOf((String) args.get(0)))),
            entry("matches", (val, args) -> val.matches((String) args.get(0))),
            entry("replace", (val, args) -> val.replaceAll((String) args.get(0), (String) args.get(1)))
    );

    private static final Map<String, BiFunction<LocalDate, List<Object>, Object>> DATE_FUNCTIONS = Map.ofEntries(
            entry("year", (val, args) -> new BigDecimal(val.getYear())),
            entry("monthOfYear", (val, args) -> new BigDecimal(val.getMonthValue())),
            entry("dayOfMonth", (val, args) -> new BigDecimal(val.getDayOfMonth())),
            entry("dayOfYear", (val, args) -> new BigDecimal(val.getDayOfYear())),
            entry("dayOfWeek", (val, args) -> new BigDecimal(val.getDayOfWeek().getValue())),
            entry("weekOfYear", (val, args) -> new BigDecimal(val.get(WeekFields.ISO.weekOfYear()))),
            entry("weekOfMonth", (val, args) -> new BigDecimal(val.get(WeekFields.ISO.weekOfMonth()))),
            entry("dayDiff", (val, args) -> new BigDecimal(ChronoUnit.DAYS.between(val, (LocalDate) args.get(0)))),
            entry("weekDiff", (val, args) -> new BigDecimal(ChronoUnit.WEEKS.between(val, (LocalDate) args.get(0)))),
            entry("monthDiff", (val, args) -> new BigDecimal(ChronoUnit.MONTHS.between(val, (LocalDate) args.get(0)))),
            entry("yearDiff", (val, args) -> new BigDecimal(ChronoUnit.YEARS.between(val, (LocalDate) args.get(0)))),
            entry("difference", (val, args) -> new BigDecimal(ChronoUnit.SECONDS.between(
                    val.atStartOfDay(ZoneId.systemDefault()),
                    ((LocalDate) args.get(0)).atStartOfDay(ZoneId.systemDefault())
            )))
    );

    @SuppressWarnings({"rawtypes", "unchecked"})
    private static final Map<String, BiFunction<Collection, List<Object>, Object>> COLLECTION_FUNCTIONS = Map.ofEntries(
            entry("head", (c, args) -> c.stream().limit(toBigDecimal(args.get(0)).longValue()).collect(Collectors.toList())),
            entry("tail", (c, args) -> c.stream().skip(Math.max(0, c.size() - toBigDecimal(args.get(0)).longValue())).collect(Collectors.toList())),
            entry("limit", (c, args) -> c.stream().skip(toBigDecimal(args.get(0)).longValue()).limit(toBigDecimal(args.get(1)).longValue()).collect(Collectors.toList())),
            entry("count", (c, args) -> new BigDecimal(c.size())),
            entry("join", (c, args) -> c.stream().map(Object::toString).collect(Collectors.joining(args.isEmpty() ? "," : (String)args.get(0)))),
            entry("sum", (c, args) -> c.stream()
                    .map(item -> getProperty(item, args))
                    .map(FunctionDispatcher::toBigDecimal)
            .reduce(BigDecimal.ZERO, BigDecimal::add)),
        entry("avg", (c, args) -> {
            if (c.isEmpty()) return BigDecimal.ZERO;

        BigDecimal sum = (BigDecimal) COLLECTION_FUNCTIONS.get("sum").apply(c, args);
        return sum.divide(new BigDecimal(c.size()), 10, RoundingMode.HALF_UP);
        }),
            entry("min", (c, args) -> c.stream()
            .map(item -> getProperty(item, args))
            .min(FunctionDispatcher::compare)
            .orElse(null)
        ),
        entry("max", (c, args) -> c.stream()
            .map(item -> getProperty(item, args))
            .max(FunctionDispatcher::compare)
            .orElse(null)
        ),
        entry("filter", (c, args) -> {
        String key = (String) args.get(0);
        Object expected = args.get(1);
        return c.stream()
                .filter(item -> compare(getProperty(item, Collections.singletonList(key)), expected) == 0)
                .collect(Collectors.toList());
        }),
            entry("sort", (c, args) -> {
        Comparator<Object> comparator = Comparator.comparing(
                item -> (Comparable) getProperty(item, args.subList(0, 1))
                        );
        if (args.size() > 1 && "DESC".equalsIgnoreCase((String)args.get(1))) {
            comparator = comparator.reversed();
            }
        return c.stream().sorted(comparator).collect(Collectors.toList());
        })
            );
+
        private static Object getProperty(Object item, List<Object> args) {
        if (args.isEmpty() || !(args.get(0) instanceof String)) {
            return item; // No property specified, operate on the item itself
            }
        if (item instanceof Map) {
            return ((Map<?, ?>) item).get((String) args.get(0));
            }
        // Could add reflection for POJOs here if needed
        throw new IllegalArgumentException("Cannot extract property from " + item.getClass().getSimpleName());
        }
+
        private static BigDecimal toBigDecimal(Object value) {
        if (value instanceof BigDecimal) return (BigDecimal) value;
        if (value instanceof Number) return new BigDecimal(value.toString());
        throw new ClassCastException("Cannot cast " + value.getClass().getName() + " to BigDecimal.");
        }
+
        @SuppressWarnings({"unchecked", "rawtypes"})
private static int compare(Object left, Object right) {
        if (left == null || right == null) return left == right ? 0 : -1;
        if (left instanceof Number && right instanceof Number) {
            return toBigDecimal(left).compareTo(toBigDecimal(right));
            }
        if (left instanceof Comparable && left.getClass().isInstance(right)) {
            return ((Comparable) left).compareTo(right);
            }
        return Objects.equals(left, right) ? 0 : -1;
        }
+
    private static final Map<String, BiFunction<LocalDateTime, List<Object>, Object>> TIMESTAMP_FUNCTIONS = Map.ofEntries(
            entry("hour", (val, args) -> new BigDecimal(val.getHour())),
            entry("minute", (val, args) -> new BigDecimal(val.getMinute())),
            entry("second", (val, args) -> new BigDecimal(val.getSecond())),
            entry("difference", (val, args) -> new BigDecimal(ChronoUnit.SECONDS.between(
                    val.atZone(ZoneId.systemDefault()),
                    ((LocalDateTime) args.get(0)).atZone(ZoneId.systemDefault())
            )))
    );

    private static final Map<String, BiFunction<LocalTime, List<Object>, Object>> TIME_FUNCTIONS = Map.ofEntries(
            entry("hour", (val, args) -> new BigDecimal(val.getHour())),
            entry("minute", (val, args) -> new BigDecimal(val.getMinute())),
            entry("second", (val, args) -> new BigDecimal(val.getSecond())),
            entry("difference", (val, args) -> new BigDecimal(ChronoUnit.SECONDS.between(val, (LocalTime) args.get(0))))
    );

    public static Object dispatch(Object base, String functionName, List<Object> args) {
        if (OBJECT_FUNCTIONS.containsKey(functionName)) {
            return OBJECT_FUNCTIONS.get(functionName).apply(base, args);
        }
        if (base instanceof BigDecimal && NUMBER_FUNCTIONS.containsKey(functionName)) {
            return NUMBER_FUNCTIONS.get(functionName).apply((BigDecimal) base, args);
        }
        if (base instanceof String && STRING_FUNCTIONS.containsKey(functionName)) {
            return STRING_FUNCTIONS.get(functionName).apply((String) base, args);
        }
        if (base instanceof LocalDate && DATE_FUNCTIONS.containsKey(functionName)) {
            return DATE_FUNCTIONS.get(functionName).apply((LocalDate) base, args);
        }
        if (base instanceof LocalDateTime) {
            if (TIMESTAMP_FUNCTIONS.containsKey(functionName))
                return TIMESTAMP_FUNCTIONS.get(functionName).apply((LocalDateTime) base, args);
            if (DATE_FUNCTIONS.containsKey(functionName))
                return DATE_FUNCTIONS.get(functionName).apply(((LocalDateTime) base).toLocalDate(), args);
        }
        if (base instanceof LocalTime && TIME_FUNCTIONS.containsKey(functionName)) {
            return TIME_FUNCTIONS.get(functionName).apply((LocalTime) base, args);
        }
        throw new UnsupportedOperationException("Function '" + functionName + "' not found for type " + base.getClass().getSimpleName());
    }
}
