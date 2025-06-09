package hu.blackbelt.idem;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.math.BigInteger;
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
                Map.of("orderId", 10248, "productId", 11, "unitPrice", new BigDecimal("14.0"), "quantity", new BigDecimal(12), "discount", 0),
                Map.of("orderId", 10248, "productId", 42, "unitPrice", new BigDecimal("9.8"), "quantity", new BigDecimal(10), "discount", 0),
                Map.of("orderId", 10249, "productId", 72, "unitPrice", new BigDecimal("34.8"), "quantity", new BigDecimal(5), "discount", 0)
        ));

        ctx = EvalContext.builder().self(selfMap).build();
    }

    private Object evaluate(String expression) {
        return IdemEvaluator.evaluate(Parse.expressionToAst(expression), ctx);
    }

    @Test
    void testNumbers() {
        assertEquals(new BigDecimal("123"), evaluate("123"));
        assertEquals(new BigDecimal("-123"), evaluate("-123"));
    }

    @Test
    void testBooleans() {
        assertEquals(true, evaluate("true"));
        assertEquals(false, evaluate("not true"));
    }

    @Test
    void testNull() {
        assertNull(evaluate("null"));
    }

    @Test
    void testSelfProperties() {
        assertEquals(new BigDecimal("1.5"), evaluate("self.a"));
        assertEquals(new BigDecimal("42"), evaluate("self.nested.x"));
        assertNull(evaluate("self.nonExistent"));
    }

    @Test
    void testArithmetic() {
        assertEquals(0, new BigDecimal("3.5").compareTo((BigDecimal) evaluate("self.a + self.b")));
        assertEquals(0, new BigDecimal("-0.5").compareTo((BigDecimal) evaluate("self.a - self.b")));
        assertEquals(0, new BigDecimal("3.0").compareTo((BigDecimal) evaluate("self.a * self.b")));
        assertEquals(new BigDecimal("8"), evaluate("2^3"));
        assertNull(evaluate("self.a + null"));
    }

    @Test
    void testDivMod() {
        assertEquals(new BigInteger("2"), evaluate("5 div 2"));
        assertEquals(new BigInteger("2"), evaluate("5.5 div 2"));
        assertEquals(new BigInteger("1"), evaluate("5 mod 2"));
        assertEquals(new BigInteger("1"), evaluate("5.5 mod 2.9"));
    }

    @Test
    void testStringConcatenation() {
        assertEquals("hello world", evaluate("'hello ' + 'world'"));
    }

    @Test
    void testComparisons() {
        assertEquals(true, evaluate("3 > 2"));
        assertEquals(true, evaluate("3 >= 3"));
        assertEquals(true, evaluate("2 < 3"));
        assertEquals(true, evaluate("2 <= 2"));
        assertEquals(true, evaluate("2 == 2.0"));
        assertEquals(true, evaluate("2 != 3"));
        assertEquals(true, evaluate("'Hello' == 'hello'"));
        assertEquals(false, evaluate("'Apple' <> 'apple'"));
    }

    @Test
    void testLogicalOps() {
        assertEquals(true, evaluate("true and self.a > 1"));
        assertEquals(true, evaluate("self.flag or true"));
        assertEquals(false, evaluate("true implies false"));
        assertEquals(true, evaluate("true xor false"));
    }

    @Test
    void testTernary() {
        assertEquals(new BigDecimal("10"), evaluate("self.a > 1 ? 10 : 20"));
        assertEquals(new BigDecimal("20"), evaluate("self.maybeNull ? 10 : 20"));
    }

    @Test
    void testInOperator() {
        assertEquals(true, evaluate("2 in self.items"));
        assertEquals(false, evaluate("4 in self.items"));
    }

    @Test
    void testIndexAccess() {
        assertEquals(new BigDecimal("2"), evaluate("self.items[1]"));
        assertEquals("e", evaluate("self.str[1]"));
        assertEquals(new BigDecimal("3"), evaluate("self.matrix[1][0]"));
    }

    @Test
    void testComplexExpression() {
        String expr = "not (self.a + self.b > 5) and (2 in self.items) ? self.matrix[0][1] : self.nested.x";
        assertEquals(new BigDecimal("2"), evaluate(expr));
    }

    @Test
    void testStringFunctions() {
        assertEquals("idem language", evaluate("self.name!lowerCase()"));
        assertEquals("IDEM LANGUAGE", evaluate("self.name!upperCase()"));
        assertEquals(new BigDecimal(13), evaluate("self.name!length()"));
        assertEquals("ell", evaluate("'hello'!substring(1, 3)"));
    }

    @Test
    void testNumericFunctions() {
        assertEquals(new BigDecimal("1.23"), evaluate("1.2345!round(2)"));
        assertEquals(new BigDecimal("2"), evaluate("self.a!round()"));
    }

    @Test
    void testTemporalFunctions() {
        assertEquals(LocalDate.now(), evaluate("today"));
        assertEquals(new BigDecimal(2), evaluate("`2025-06-10`!difference(`2025-06-08`)"));
    }

    @Test
    void testCollectionFunctions() {
        assertEquals(new BigDecimal(3), evaluate("self.items!size()"));
        assertEquals(new BigDecimal(3), evaluate("self.items!count()"));
        assertEquals(List.of(new BigDecimal(1), new BigDecimal(2)), evaluate("self.items!head(2)"));
        assertEquals(List.of(new BigDecimal(2), new BigDecimal(3)), evaluate("self.items!tail(2)"));
        assertEquals(List.of(new BigDecimal(2)), evaluate("self.items!limit(1, 1)"));
        assertEquals(new BigDecimal(6), evaluate("self.items!sum()"));
        assertEquals(0, new BigDecimal("2.0000000000").compareTo((BigDecimal) evaluate("self.items!avg()")));
        assertEquals(new BigDecimal(1), evaluate("self.items!min()"));
        assertEquals(new BigDecimal(3), evaluate("self.items!max()"));
    }

    @Test
    void testIteratorFunctions() {
        assertEquals(new BigDecimal("27"), evaluate("self.orderDetails!sum(od | od.quantity)"));
        assertEquals(0, new BigDecimal("9.0000000000").compareTo((BigDecimal) evaluate("self.orderDetails!avg(od | od.quantity)")));
        assertEquals(new BigDecimal("9.8"), evaluate("self.orderDetails!min(od | od.unitPrice)"));
        assertEquals(new BigDecimal("34.8"), evaluate("self.orderDetails!max(od | od.unitPrice)"));
        assertEquals("Chai, Chang, Aniseed Syrup", evaluate("self.products!join(p | p.productName, ', ')"));
        assertEquals(1, ((List<?>)evaluate("self.orderDetails!filter(od | od.unitPrice < 10)")).size());

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> sorted = (List<Map<String, Object>>) evaluate("self.products!sort(p | p.unitPrice)");
        assertEquals(new BigDecimal("10"), sorted.get(0).get("unitPrice"));
    }
}
