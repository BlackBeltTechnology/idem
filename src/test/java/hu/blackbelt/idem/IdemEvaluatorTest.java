package hu.blackbelt.idem;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
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
        selfMap.put("itemsForAvg", List.of(new BigDecimal("1"), new BigDecimal("2"), new BigDecimal("4"))); // avg = 7/3
        selfMap.put("startDate", LocalDate.now());
        selfMap.put("name", "Idem Language");
        selfMap.put("maybeNull", null);

        selfMap.put("products", List.of(
                Map.of("productId", 1, "productName", "Chai", "unitPrice", new BigDecimal("18.00"), "discontinued", false),
                Map.of("productId", 2, "productName", "Chang", "unitPrice", new BigDecimal("19.00"), "discontinued", true),
                Map.of("productId", 3, "productName", "Aniseed Syrup", "unitPrice", new BigDecimal("10.00"), "discontinued", false)
        ));

        selfMap.put("orderDetails", List.of(
                Map.of("orderId", 10248, "productId", 11, "unitPrice", new BigDecimal("14.00"), "quantity", new BigDecimal(12), "discount", 0),
                Map.of("orderId", 10248, "productId", 42, "unitPrice", new BigDecimal("9.80"), "quantity", new BigDecimal(10), "discount", 0),
                Map.of("orderId", 10249, "productId", 72, "unitPrice", new BigDecimal("34.80"), "quantity", new BigDecimal(5), "discount", 0)
        ));

        selfMap.put("strings", List.of("c", "a", "b"));

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
    void testEnumLiteral() {
        assertEquals("MyEnum#VALUE", evaluate("MyEnum#VALUE"));
        assertEquals("ns::MyEnum#VALUE", evaluate("ns::MyEnum#VALUE"));
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
        assertEquals(0, new BigDecimal("3.00").compareTo(((BigDecimal) evaluate("self.a * self.b")).setScale(2, RoundingMode.HALF_UP)));
        assertEquals(0, new BigDecimal("0.75").compareTo(((BigDecimal) evaluate("self.a / self.b")).setScale(2, RoundingMode.HALF_UP)));
        assertEquals(new BigDecimal("8"), evaluate("2^3"));
        assertNull(evaluate("self.a + self.maybeNull"));
        assertNull(evaluate("'hello' + self.maybeNull"));
    }

    @Test
    void testDivMod() {
        assertEquals(new BigDecimal("2"), evaluate("5 div 2"));
        assertEquals(new BigDecimal("2"), evaluate("5.5 div 2"));
        assertEquals(new BigDecimal("1"), evaluate("5 mod 2"));
        assertEquals(new BigDecimal("1"), evaluate("5.5 mod 2.9"));
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
        assertEquals(true, evaluate("not self.maybeNull"));
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
        assertNull(evaluate("self.maybeNull in self.items"));
    }

    @Test
    void testIndexAccess() {
        assertEquals(new BigDecimal("2"), evaluate("self.items[1]"));
        assertEquals("e", evaluate("self.str[1]"));
        assertEquals(new BigDecimal("3"), evaluate("self.matrix[1][0]"));
        assertNull(evaluate("self.items[99]")); // Out of bounds
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
        assertEquals("hello", evaluate("' hello '!trim()"));
        assertEquals("he", evaluate("'hello'!first(2)"));
        assertEquals("lo", evaluate("'hello'!last(2)"));
        assertEquals(new BigDecimal(6), evaluate("'hello world'!position('world')"));
        assertEquals(true, evaluate("'abc-123'!matches('[a-z]+-\\d+')"));
        assertEquals("a-b-c", evaluate("'a b c'!replace(' ', '-')"));
    }

    @Test
    void testNumericFunctions() {
        assertEquals(new BigDecimal("1.23"), evaluate("1.2345!round(2)"));
        assertEquals(new BigDecimal("1.24"), evaluate("1.2355!round(2)"));
        assertEquals(new BigDecimal("2"), evaluate("self.a!round()"));
        assertEquals(new BigDecimal("-2"), evaluate("-1.5!round()"));
        assertEquals(new BigDecimal("-1"), evaluate("-1.4!round()"));
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
        assertEquals("a", evaluate("self.strings!min()"));
        assertEquals("c", evaluate("self.strings!max()"));
    }

    @Test
    void testIteratorFunctions() {
        assertEquals(0, new BigDecimal("27").compareTo((BigDecimal) evaluate("self.orderDetails!sum(od | od.quantity)")));
        assertEquals(new BigDecimal("9.80"), evaluate("self.orderDetails!min(od | od.unitPrice)"));
        assertEquals(new BigDecimal("34.80"), evaluate("self.orderDetails!max(od | od.unitPrice)"));
        assertEquals("Chai, Chang, Aniseed Syrup", evaluate("self.products!join(p | p.productName, ', ')"));
        assertEquals(1, ((List<?>) evaluate("self.orderDetails!filter(od | od.unitPrice < 10)")).size());

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> sorted = (List<Map<String, Object>>) evaluate("self.products!sort(p | p.unitPrice)");
        assertEquals(new BigDecimal("10.00"), sorted.get(0).get("unitPrice"));

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> sortedDesc = (List<Map<String, Object>>) evaluate("self.products!sort(p | p.unitPrice DESC)");
        assertEquals(new BigDecimal("19.00"), sortedDesc.get(0).get("unitPrice"));
        assertEquals(new BigDecimal("10.00"), sortedDesc.get(2).get("unitPrice"));
    }

    @Test
    void testIteratorFunctionsAvgRounding() {
        // 7/3 = 2.3333333333
        BigDecimal expected = new BigDecimal("2.3333333333");
        BigDecimal actual = (BigDecimal) evaluate("self.itemsForAvg!avg()");
        assertEquals(0, expected.compareTo(actual));
    }

    @Test
    void testJoinWithNulls() {
        Map<String, Object> selfMapWithNulls = new HashMap<>(ctx.getSelf());

        Map<String, Object> product1 = Map.of("productName", "Chai");
        Map<String, Object> product2 = new HashMap<>();
        product2.put("productName", null);
        Map<String, Object> product3 = Map.of("productName", "Aniseed Syrup");
        List<Map<String, Object>> productList = new ArrayList<>();
        productList.add(product1);
        productList.add(product2);
        productList.add(product3);

        selfMapWithNulls.put("productsWithNulls", productList);

        EvalContext ctxWithNulls = EvalContext.builder().self(selfMapWithNulls).build();
        assertEquals("Chai,null,Aniseed Syrup", IdemEvaluator.evaluate(Parse.expressionToAst("self.productsWithNulls!join(p | p.productName, ',')"), ctxWithNulls));
    }

    @Test
    void testChainedIteratorFunctions() {
        String expr = "self.products!filter(p | p.unitPrice > 10)!sort(p | p.productName DESC)";
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> result = (List<Map<String, Object>>) evaluate(expr);

        // Products with price > 10 are Chai (18) and Chang (19).
        // Sorted by productName DESC, 'Chang' comes before 'Chai'.
        assertEquals(2, result.size());
        assertEquals("Chang", result.get(0).get("productName"));
        assertEquals("Chai", result.get(1).get("productName"));
    }
}