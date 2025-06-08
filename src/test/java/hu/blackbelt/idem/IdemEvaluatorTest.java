package hu.blackbelt.idem;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("IdemEvaluator")
public class IdemEvaluatorTest {

    private static EvalContext ctx;

    private static Date parseLocalDate(String dateStr) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    @BeforeAll
    static void setup() {
        ctx = EvalContext.builder()
                .self(Map.of(
                        "a", new BigDecimal("1"),
                        "b", new BigDecimal("2"),
                        "flag", false,
                        "nested", Map.of("x", new BigDecimal("42")),
                        "arr", List.of(new BigDecimal("10"), new BigDecimal("20"), Map.of("val", new BigDecimal("5"))),
                        "matrix", List.of(
                                List.of(new BigDecimal("1"), new BigDecimal("2")),
                                List.of(new BigDecimal("3"), new BigDecimal("4"))
                        ),
                        "str", "hello",
                        "items", List.of(new BigDecimal("1"), new BigDecimal("2"), new BigDecimal("3")),
                        "startDate", parseLocalDate("2025-06-15")
                ))
                .build();
    }

    private Object evaluate(String expression) {
        return IdemEvaluator.evaluate(Parse.expressionToAst(expression), ctx);
    }

    @Test
    @DisplayName("parses numbers and unary minus")
    void testNumbers() {
        assertEquals(new BigDecimal("123"), evaluate("123"));
        assertEquals(new BigDecimal("-123"), evaluate("-123"));
        assertEquals(new BigDecimal("0"), evaluate("0"));
    }

    @Test
    @DisplayName("parses booleans and not")
    void testBooleans() {
        assertEquals(true, evaluate("true"));
        assertEquals(false, evaluate("false"));
        assertEquals(true, evaluate("!false"));
    }

    @Test
    @DisplayName("parses null")
    void testNull() {
        assertNull(evaluate("null"));
    }

    @Test
    @DisplayName("parses local dates")
    void testLocalDates() {
        assertEquals(parseLocalDate("2023-12-31"), evaluate("2023-12-31"));
    }

    @Test
    @DisplayName("resolves simple self properties")
    void testSelfProperties() {
        assertEquals(new BigDecimal("1"), evaluate("self.a"));
        assertEquals(new BigDecimal("42"), evaluate("self.nested.x"));
    }

    @Test
    @DisplayName("handles + - * / % ^")
    void testArithmetic() {
        assertEquals(new BigDecimal("3"), evaluate("1+2"));
        assertEquals(new BigDecimal("2"), evaluate("5-3"));
        assertEquals(new BigDecimal("6"), evaluate("2*3"));
        // BigDecimal division requires careful handling of scale
        assertTrue(new BigDecimal("2").compareTo((BigDecimal) evaluate("8/4")) == 0);
        assertEquals(new BigDecimal("1"), evaluate("10%3"));
        assertEquals(new BigDecimal("8"), evaluate("2^3"));
    }

    @Test
    @DisplayName("handles > >= < <= == !=")
    void testComparisons() {
        assertEquals(true, evaluate("3>2"));
        assertEquals(true, evaluate("3>=3"));
        assertEquals(true, evaluate("2<3"));
        assertEquals(true, evaluate("2<=2"));
        assertEquals(true, evaluate("2==2"));
        assertEquals(true, evaluate("2.0==2"));
        assertEquals(true, evaluate("2!=3"));
    }

    @Test
    @DisplayName("handles && and ||")
    void testLogical() {
        assertEquals(false, evaluate("true&&false"));
        assertEquals(true, evaluate("true||false"));
    }

    @Test
    @DisplayName("handles ternary operator")
    void testTernary() {
        assertEquals(new BigDecimal("10"), evaluate("1>0?10:20"));
        assertEquals(new BigDecimal("20"), evaluate("1<0?10:20"));
    }

    @Test
    @DisplayName("handles in operator")
    void testIn() {
        assertEquals(true, evaluate("2 in [1,2,3]"));
        assertEquals(false, evaluate("4 in [1,2,3]"));
        assertEquals(true, evaluate("self.b in self.items"));
    }

    @Test
    @DisplayName("parses lists and indexing")
    void testListsAndIndexing() {
        List<?> expectedList = List.of(new BigDecimal("1"), new BigDecimal("2"), new BigDecimal("3"));
        assertEquals(expectedList, evaluate("[1,2,3]"));
        assertEquals(new BigDecimal("2"), evaluate("[1,2,3][1]"));
        assertEquals(new BigDecimal("3"), evaluate("[[1,2],[3,4]][1][0]"));
    }

    @Test
    @DisplayName("parses strings and char access")
    void testStrings() {
        assertEquals("abc", evaluate("\"abc\""));
        assertEquals("b", evaluate("\"abc\"[1]"));
        assertEquals(true, evaluate("\"abc\"[1]==\"b\""));
    }

    @Test
    @DisplayName("handles pointer access after parentheses")
    void testPointerAccess() {
        assertEquals(new BigDecimal("5"), evaluate("(self.arr[2]).val"));
        // Note: The direct AST for self.matrix[1][0] is a ListAccess, not a PointerAccess
        assertEquals(new BigDecimal("3"), evaluate("self.matrix[1][0]"));
    }

    @Test
    @DisplayName("evaluates a complex combined expression")
    void testComplexExpression() {
        String expr = "!(self.a + self.b > 3) && (2 in self.items) ? self.matrix[0][1] : self.nested.x";
        // !(1 + 2 > 3) -> !(false) -> true
        // (2 in [1,2,3]) -> true
        // true && true -> true
        // returns self.matrix[0][1] -> 2
        assertEquals(new BigDecimal("2"), evaluate(expr));
    }

    @Test
    @DisplayName("handles BoolToInt function")
    void testBoolToInt() {
        assertEquals(new BigDecimal("1"), evaluate("boolToInt(true)"));
        assertEquals(new BigDecimal("0"), evaluate("boolToInt(false)"));
        assertEquals(new BigDecimal("0"), evaluate("boolToInt(self.flag)"));
    }

    @Test
    @DisplayName("handles Size function")
    void testSize() {
        assertEquals(new BigDecimal("5"), evaluate("size(\"hello\")"));
        assertEquals(new BigDecimal("3"), evaluate("size([1,2,3])"));
        assertEquals(new BigDecimal("3"), evaluate("size(self.items)"));
        assertEquals(new BigDecimal("1"), evaluate("size(self.nested)"));
    }

    @Test
    @DisplayName("handles numeric functions Round, Floor, Ceil")
    void testNumericFunctions() {
        assertEquals(new BigDecimal("1.23"), evaluate("round(1.2345, 2)"));
        assertEquals(new BigDecimal("1.24"), evaluate("round(1.2355, 2)"));
        assertEquals(new BigDecimal("1.23"), evaluate("floor(1.239, 2)"));
        assertEquals(new BigDecimal("1.24"), evaluate("ceil(1.231, 2)"));
    }

    @Test
    @DisplayName("handles no-arg date functions Today, Yesterday, Tomorrow")
    void testNoArgDateFunctions() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date today = cal.getTime();

        assertEquals(today, evaluate("today()"));

        cal.add(Calendar.DATE, -1);
        Date yesterday = cal.getTime();
        assertEquals(yesterday, evaluate("yesterday()"));

        cal.add(Calendar.DATE, 2);
        Date tomorrow = cal.getTime();
        assertEquals(tomorrow, evaluate("tomorrow()"));
    }

    @Test
    @DisplayName("handles date part extraction functions")
    void testDatePartFunctions() {
        assertEquals(new BigDecimal("2023"), evaluate("year(2023-10-31)"));
        assertEquals(new BigDecimal("10"), evaluate("monthOfYear(2023-10-31)"));
        assertEquals(new BigDecimal("31"), evaluate("dayOfMonth(2023-10-31)"));
        assertEquals(new BigDecimal("304"), evaluate("dayOfYear(2023-10-31)"));
        assertEquals(new BigDecimal("2"), evaluate("dayOfWeek(2023-10-31)"));
        assertEquals(new BigDecimal("44"), evaluate("weekOfYear(2023-10-31)"));
        assertEquals(new BigDecimal("5"), evaluate("weekOfMonth(2023-10-31)"));
    }

    @Test
    @DisplayName("handles date diff functions")
    void testDateDiffFunctions() {
        assertEquals(new BigDecimal("10"), evaluate("dayDiff(2024-03-05, 2024-03-15)"));
        assertEquals(new BigDecimal("-1"), evaluate("weekDiff(2024-03-15, 2024-03-08)"));
        assertEquals(new BigDecimal("2"), evaluate("monthDiff(2024-03-15, 2024-05-15)"));
        assertEquals(new BigDecimal("-3"), evaluate("yearDiff(2027-01-01, 2024-01-01)"));
    }

    @Test
    @DisplayName("handles date part arithmetic")
    void testDatePartArithmetic() {
        // Test addition with different units (d, W, m, Y)
        assertEquals(parseLocalDate("2025-06-18"), evaluate("2025-06-08 + 10d"));
        assertEquals(parseLocalDate("2025-06-29"), evaluate("2025-06-08 + 3W"));
        assertEquals(parseLocalDate("2025-08-08"), evaluate("2025-06-08 + 2m"));
        assertEquals(parseLocalDate("2027-06-08"), evaluate("2025-06-08 + 2Y"));

        // Test subtraction with different units (D, w, M, y)
        assertEquals(parseLocalDate("2025-05-29"), evaluate("2025-06-08 - 10D"));
        assertEquals(parseLocalDate("2025-05-25"), evaluate("2025-06-08 - 2w"));
        assertEquals(parseLocalDate("2025-03-08"), evaluate("2025-06-08 - 3M"));
        assertEquals(parseLocalDate("2024-06-08"), evaluate("2025-06-08 - 1y"));

        // Test with a variable from the self context
        assertEquals(parseLocalDate("2025-06-20"), evaluate("self.startDate + 5d"));
        assertEquals(parseLocalDate("2025-05-15"), evaluate("self.startDate - 1M"));
    }
}