package hu.blackbelt.idem;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;

import static java.util.Map.entry;

public class FunctionDispatcher {

    private static final Map<String, BiFunction<Object, List<Object>, Object>> TYPE_FUNCTIONS = Map.of(
            "toInt", (val, args) -> {
                if (val instanceof Boolean) return (Boolean) val ? BigDecimal.ONE : BigDecimal.ZERO;
                throw new IllegalArgumentException("Cannot convert " + val.getClass().getSimpleName() + " to int");
            }
    );

    private static final Map<String, BiFunction<BigDecimal, List<Object>, Object>> NUMBER_FUNCTIONS = Map.of(
            "floor", (val, args) -> val.setScale(((BigDecimal)args.get(0)).intValue(), RoundingMode.FLOOR),
            "ceil", (val, args) -> val.setScale(((BigDecimal)args.get(0)).intValue(), RoundingMode.CEILING),
            "round", (val, args) -> val.setScale(((BigDecimal)args.get(0)).intValue(), RoundingMode.HALF_UP)
    );

    private static final Map<String, BiFunction<LocalDate, List<Object>, Object>> DATE_FUNCTIONS = Map.ofEntries(
            entry("year", (val, args) -> new BigDecimal(val.getYear())),
            entry("monthOfYear", (val, args) -> new BigDecimal(val.getMonthValue())),
            entry("dayOfMonth", (val, args) -> new BigDecimal(val.getDayOfMonth())),
            entry("dayOfYear", (val, args) -> new BigDecimal(val.getDayOfYear())),
            entry("dayOfWeek", (val, args) -> new BigDecimal(val.getDayOfWeek().getValue())),
            entry("weekOfYear", (val, args) -> new BigDecimal(val.get(WeekFields.ISO.weekOfYear()))),
            entry("weekOfMonth", (val, args) -> new BigDecimal(val.get(WeekFields.ISO.weekOfMonth()))),
            entry("dayDiff", (val, args) -> new BigDecimal(ChronoUnit.DAYS.between(val, (LocalDate)args.get(0)))),
            entry("weekDiff", (val, args) -> new BigDecimal(ChronoUnit.WEEKS.between(val, (LocalDate)args.get(0)))),
            entry("monthDiff", (val, args) -> new BigDecimal(ChronoUnit.MONTHS.between(val, (LocalDate)args.get(0)))),
            entry("yearDiff", (val, args) -> new BigDecimal(ChronoUnit.YEARS.between(val, (LocalDate)args.get(0))))
    );

    private static final Map<String, BiFunction<LocalDateTime, List<Object>, Object>> TIMESTAMP_FUNCTIONS = Map.of(
            "hour", (val, args) -> new BigDecimal(val.getHour()),
            "minute", (val, args) -> new BigDecimal(val.getMinute()),
            "second", (val, args) -> new BigDecimal(val.getSecond())
    );

    private static final Map<String, BiFunction<LocalTime, List<Object>, Object>> TIME_FUNCTIONS = Map.of(
            "hour", (val, args) -> new BigDecimal(val.getHour()),
            "minute", (val, args) -> new BigDecimal(val.getMinute()),
            "second", (val, args) -> new BigDecimal(val.getSecond())
    );

    private static final Map<String, BiFunction<Object, List<Object>, Object>> GENERIC_FUNCTIONS = Map.of(
            "size", (val, args) -> {
                if (val instanceof String) return new BigDecimal(((String) val).length());
                if (val instanceof Collection) return new BigDecimal(((Collection<?>) val).size());
                if (val instanceof Map) return new BigDecimal(((Map<?, ?>) val).size());
                throw new IllegalArgumentException("size() can only be called on String, Collection, or Map.");
            }
    );

    public static Object dispatch(Object base, String functionName, List<Object> args) {
        if (GENERIC_FUNCTIONS.containsKey(functionName)) {
            return GENERIC_FUNCTIONS.get(functionName).apply(base, args);
        }
        if (TYPE_FUNCTIONS.containsKey(functionName)) {
            return TYPE_FUNCTIONS.get(functionName).apply(base, args);
        }

        if (base instanceof BigDecimal && NUMBER_FUNCTIONS.containsKey(functionName)) {
            return NUMBER_FUNCTIONS.get(functionName).apply((BigDecimal) base, args);
        }
        if (base instanceof LocalDate && DATE_FUNCTIONS.containsKey(functionName)) {
            return DATE_FUNCTIONS.get(functionName).apply((LocalDate) base, args);
        }
        if (base instanceof LocalDateTime && (DATE_FUNCTIONS.containsKey(functionName) || TIMESTAMP_FUNCTIONS.containsKey(functionName))) {
            if (TIMESTAMP_FUNCTIONS.containsKey(functionName)) {
                return TIMESTAMP_FUNCTIONS.get(functionName).apply((LocalDateTime) base, args);
            }
            return DATE_FUNCTIONS.get(functionName).apply(((LocalDateTime) base).toLocalDate(), args);
        }
        if (base instanceof LocalTime && TIME_FUNCTIONS.containsKey(functionName)) {
            return TIME_FUNCTIONS.get(functionName).apply((LocalTime) base, args);
        }

        throw new UnsupportedOperationException("Function '" + functionName + "' not found for type " + base.getClass().getSimpleName());
    }
}