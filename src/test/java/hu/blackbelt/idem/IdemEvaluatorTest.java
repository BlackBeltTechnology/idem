package hu.blackbelt.idem;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("IdemEvaluator")
public class IdemEvaluatorTest {

    private static EvalContext ctx;

    @BeforeAll
    static void setup() {
        Map<String, Object> selfMap = new HashMap<>();
        selfMap.put("a", new BigDecimal("1.5"));
        selfMap.put("b", new BigDecimal("2"));
        selfMap.put("flag", false);
        selfMap.put("nested", Map.of("x", new BigDecimal("42")));
        selfMap.put("arr", List.of(new BigDecimal("10"), new BigDecimal("20"), Map.of("val", new BigDecimal("5"))));
        selfMap.put("matrix", List.of(
                List.of(new BigDecimal("1"), new BigDecimal("2")),
                List.of(new BigDecimal("3"), new BigDecimal("4"))
        ));
        selfMap.put("str", "hello");
        selfMap.put("items", List.of(new BigDecimal("1"), new BigDecimal("2"), new BigDecimal("3")));
        selfMap.put("startDate", LocalDate.parse("2025-06-15"));
        selfMap.put("name", "Idem Language");
        selfMap.put("maybeNull", null);

        selfMap.put("products", List.of(
                Map.of("productId", 1, "productName", "Chai", "unitPrice", new BigDecimal("18"), "discontinued", false),
                Map.of("productId", 2, "productName", "Chang", "unitPrice", new BigDecimal("19"), "discontinued", true),
                Map.of("productId", 3, "productName", "Aniseed Syrup", "unitPrice", new BigDecimal("10"), "discontinued", false)
        ));

        selfMap.put("orderDetails", List.of(
                Map.of("orderId", 10248, "productId", 11, "unitPrice", new BigDecimal("14"), "quantity", 12, "discount", 0),
                Map.of("orderId", 10248, "productId", 42, "unitPrice", new BigDecimal("9.8"), "quantity", 10, "discount", 0),
                Map.of("orderId", 10249, "productId", 72, "unitPrice", new BigDecimal("34.8"), "quantity", 5, "discount", 0)
        ));

        ctx = EvalContext.builder()
                .self(selfMap)
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
        assertEquals(true, evaluate("not false"));
    }

    @Test
    @DisplayName("parses null")
    void testNull() {
        assertNull(evaluate("null"));
    }

    @Test
    @DisplayName("parses local dates")
    void testLocalDates() {
        assertEquals(LocalDate.parse("2023-12-31"), evaluate("2023-12-31"));
    }

    @Test
    @DisplayName("resolves simple self properties")
    void testSelfProperties() {
        assertEquals(new BigDecimal("1.5"), evaluate("self.a"));
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

    // ADDED: Test for div/mod operators from TypeScript suite
    @Test
    @DisplayName("handles div mod operators")
    void testDivMod() {
        assertEquals(new BigDecimal("2"), evaluate("5 div 2"));
        assertEquals(new BigDecimal("2"), evaluate("5 div 2.5"));
        assertEquals(new BigDecimal("2"), evaluate("5.5 div 2"));
        assertEquals(new BigDecimal("1"), evaluate("5 mod 2"));
        assertEquals(new BigDecimal("0"), evaluate("5 mod 2.5"));
        assertEquals(new BigDecimal("1"), evaluate("5.5 mod 2")); // Assuming 'mod' truncates operands like in the TS test
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
        assertEquals(false, evaluate("true and false"));
        assertEquals(true, evaluate("true or false"));
    }

    @Test
    @DisplayName("handles implies operator")
    void testImplies() {
        assertEquals(true, evaluate("true implies true"));
        assertEquals(false, evaluate("true implies false"));
        assertEquals(true, evaluate("false implies true"));
        assertEquals(true, evaluate("false implies false"));
    }

    @Test
    @DisplayName("handles xor operator")
    void testXor() {
        assertEquals(true, evaluate("true xor false"));
        assertEquals(false, evaluate("true xor true"));
        assertEquals(true, evaluate("false xor true"));
        assertEquals(false, evaluate("false xor false"));
    }

    @Test
    @DisplayName("handles ternary operator")
    void testTernary() {
        assertEquals(new BigDecimal("10"), evaluate("1 > 0 ? 10 : 20"));
        assertEquals(new BigDecimal("20"), evaluate("1 < 0 ? 10 : 20"));
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
        assertEquals(new BigDecimal("3"), evaluate("self.matrix[1][0]"));
    }

    @Test
    @DisplayName("evaluates a complex combined expression")
    void testComplexExpression() {
        String expr = "not (self.a + self.b > 4) and (2 in self.items) ? self.matrix[0][1] : self.nested.x";
        // not (1 + 2 > 3) -> not (false) -> true
        // (2 in [1,2,3]) -> true
        // true and true -> true
        // returns self.matrix[0][1] -> 2
        assertEquals(new BigDecimal("2"), evaluate(expr));
    }

    @Test
    @DisplayName("handles string functions")
    void testStringFunctions() {
        assertEquals("idem language", evaluate("self.name!lowerCase()"));
        assertEquals("IDEM LANGUAGE", evaluate("self.name!upperCase()"));
        assertEquals(new BigDecimal(13), evaluate("self.name!length()"));
        assertEquals("em L", evaluate("self.name!substring(2, 4)"));
        assertEquals("Idem", evaluate("self.name!first(4)"));
        assertEquals("guage", evaluate("self.name!last(5)"));
        assertEquals(new BigDecimal(5), evaluate("self.name!position('Lang')"));
        assertEquals(true, evaluate("'abc-123'!matches('[a-z]+-\\d+')"));
        assertEquals("Idem-Language", evaluate("'Idem Language'!replace(' ', '-')"));
        assertEquals("abc", evaluate("'  abc  '!trim()"));
    }

    @Test
    @DisplayName("handles postfix function calls on numbers")
    void testNumericFunctions() {
        assertEquals(new BigDecimal("1.23"), evaluate("1.2345!round(2)"));
        assertEquals(new BigDecimal("1.23"), evaluate("1.239!floor(2)"));
        assertEquals(new BigDecimal("1.24"), evaluate("1.231!ceil(2)"));
        assertEquals(new BigDecimal("2"), evaluate("self.a!round()"));
    }

    @Test
    @DisplayName("handles postfix function calls on dates")
    void testDateFunctions() {
        assertEquals(new BigDecimal("2023"), evaluate("2023-10-31!year()"));
        assertEquals(new BigDecimal("10"), evaluate("2023-10-31!monthOfYear()"));
        assertEquals(new BigDecimal("44"), evaluate("2023-10-31!weekOfYear()"));
        assertEquals(new BigDecimal("-10"), evaluate("2024-03-15!dayDiff(2024-03-05)"));
        assertEquals(new BigDecimal("-172800"), evaluate("2025-06-10!difference(2025-06-08)"));
    }

    @Test
    @DisplayName("handles new date keywords")
    void testDateKeywords() {
        assertEquals(LocalDate.now(), evaluate("today"));
        assertEquals(LocalDate.now().minusDays(1), evaluate("yesterday"));
        assertEquals(LocalDate.now().plusDays(1), evaluate("tomorrow"));
    }

    @Test
    @DisplayName("handles new Timestamp and Time types and functions")
    void testTimestampAndTimeFunctions() {
        // Test literals
        assertEquals(LocalDateTime.of(2025, 6, 8, 10, 30, 0), evaluate("2025-06-08T10:30:00"));
        assertEquals(LocalTime.of(10, 30), evaluate("10:30"));

        // Test functions
        assertEquals(new BigDecimal("10"), evaluate("2025-06-08T10:30:00!hour()"));
        assertEquals(new BigDecimal("30"), evaluate("2025-06-08T10:30:00!minute()"));
        assertEquals(new BigDecimal("45"), evaluate("15:00:45!second()"));

        // Date functions on Timestamps
        assertEquals(new BigDecimal("2025"), evaluate("2025-01-01T12:00:00!year()"));

        // Timestamp difference
        assertEquals(new BigDecimal("7200"), evaluate("2025-06-10T10:00:00!difference(2025-06-10T12:00:00)"));

        // Time difference
        assertEquals(new BigDecimal("-1800"), evaluate("14:30:00!difference(14:00:00)"));

    }

    @Test
    @DisplayName("handles date part arithmetic")
    void testDatePartArithmetic() {
        assertEquals(LocalDate.parse("2025-06-18"), evaluate("2025-06-08 + 10d"));
        assertEquals(LocalDate.parse("2025-05-15"), evaluate("self.startDate - 1M"));
    }

    @Test
    @DisplayName("handles generic size() function")
    void testSizeFunction() {
        assertEquals(new BigDecimal("5"), evaluate("'hello'!size()"));
        assertEquals(new BigDecimal("3"), evaluate("[1,2,3]!size()"));
        assertEquals(new BigDecimal("1"), evaluate("self.nested!size()"));
    }

    @Test
    @DisplayName("handles type conversion functions")
    void testTypeConversionFunctions() {
        assertEquals(BigDecimal.ONE, evaluate("true!toInt()"));
        assertEquals(BigDecimal.ZERO, evaluate("self.flag!toInt()"));
    }

    @Test
    @DisplayName("throws error for function on wrong type")
    void testStrongTyping() {
        assertThrows(UnsupportedOperationException.class, () -> evaluate("123!year()"));
        assertThrows(UnsupportedOperationException.class, () -> evaluate("'hello'!round(2)"));
    }

    @Test
    @DisplayName("handles generic functions")
    void testGenericFunctions() {
        assertEquals(true, evaluate("self.a!isDefined()"));
        assertEquals(false, evaluate("self.maybeNull!isDefined()"));
        assertEquals(true, evaluate("self.maybeNull!isUndefined()"));
        assertEquals(false, evaluate("self.a!isUndefined()"));
    }

    @Test
    @DisplayName("handles array head function")
    void testArrayHead() {
        assertEquals(List.of(new BigDecimal("1")), evaluate("self.items!head(1)"));
    }

    @Test
    @DisplayName("handles array tail function")
    void testArrayTail() {
        assertEquals(List.of(new BigDecimal("3")), evaluate("self.items!tail(1)"));
    }

    @Test
    @DisplayName("handles array limit function")
    void testArrayLimit() {
        assertEquals(List.of(new BigDecimal("2"), new BigDecimal("3")), evaluate("self.items!limit(2, 1)"));
    }

    @Test
    @DisplayName("handles array join function")
    void testArrayJoin() {
        assertEquals("Chai, Chang, Aniseed Syrup", evaluate("self.products!join(x | x.productName, ', ')"));
    }

    @Test
    @DisplayName("handles array count function")
    void testArrayCount() {
        assertEquals(new BigDecimal("3"), evaluate("self.products!count()"));
    }

    @Test
    @DisplayName("handles array sort function")
    void testArraySort() {
        List<Map<String, Object>> expected = List.of(
                Map.of("productId", 2, "productName", "Chang", "unitPrice", new BigDecimal("19"), "discontinued", true),
                Map.of("productId", 1, "productName", "Chai", "unitPrice", new BigDecimal("18"), "discontinued", false),
                Map.of("productId", 3, "productName", "Aniseed Syrup", "unitPrice", new BigDecimal("10"), "discontinued", false)
        );
        assertEquals(expected, evaluate("self.products!sort(p | p.unitPrice DESC)"));
    }

    @Test
    @DisplayName("handles array filter function")
    void testArrayFilter() {
        List<Map<String, Object>> expected = List.of(
                Map.of("orderId", 10248, "productId", 42, "unitPrice", new BigDecimal("9.8"), "quantity", 10, "discount", 0)
        );
        assertEquals(expected, evaluate("self.orderDetails!filter(od | od.unitPrice < 10)"));
    }

    @Test
    @DisplayName("handles array min function")
    void testArrayMin() {
        assertEquals(new BigDecimal("9.8"), evaluate("self.orderDetails!min(od | od.unitPrice)"));
    }

    @Test
    @DisplayName("handles array max function")
    void testArrayMax() {
        assertEquals(new BigDecimal("12"), evaluate("self.orderDetails!max(p | p.quantity)"));
    }

    @Test
    @DisplayName("handles array avg function")
    void testArrayAvg() {
        assertEquals(new BigDecimal("2"), evaluate("self.items!avg()"));
    }

    @Test
    @DisplayName("handles array sum function")
    void testArraySum() {
        assertEquals(new BigDecimal("6"), evaluate("self.items!sum()"));
    }
}
