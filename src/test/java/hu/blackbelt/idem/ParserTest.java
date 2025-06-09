package hu.blackbelt.idem;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ParserTest {

    private AstNode parse(String expression) {
        return Parse.parseContextToAst(Parse.parse(expression));
    }

    @Test
    @DisplayName("true")
    void logicalTrue() {
        AstNode ast = parse("true");
        assertEquals(AstNodeType.Boolean, ast.getType());
        assertTrue((Boolean) ast.getValue());
    }

    @Test
    @DisplayName("false")
    void logicalFalse() {
        AstNode ast = parse("false");
        assertEquals(AstNodeType.Boolean, ast.getType());
        assertFalse((Boolean) ast.getValue());
    }

    @Test
    @DisplayName("null")
    void logicalNull() {
        AstNode ast = parse("null");
        assertEquals(AstNodeType.Null, ast.getType());
    }

    @Test
    @DisplayName("self-expression with tags")
    void selfExpressionWithTags() {
        AstNode ast = parse("self.foo.bar");

        assertEquals(AstNodeType.Self, ast.getType());
        AstNode tags = ast.getTags();
        assertNotNull(tags);
        assertEquals(AstNodeType.Tags, tags.getType());
        assertEquals(List.of("foo", "bar"), tags.getFeatures());
    }

    @Test
    @DisplayName("unary minus")
    void unaryMinus() {
        AstNode ast = parse("-42");
        assertEquals(AstNodeType.UnaryMinus, ast.getType());
        AstNode expr = ast.getExpression();
        assertNotNull(expr);
        assertEquals(AstNodeType.Number, expr.getType());
        assertEquals(new BigDecimal("42"), expr.getValue());
    }

    @Test
    @DisplayName("logical not")
    void logicalNot() {
        AstNode ast = parse("not true");
        assertEquals(AstNodeType.Not, ast.getType());
        AstNode expr = ast.getExpression();
        assertNotNull(expr);
        assertEquals(AstNodeType.Boolean, expr.getType());
        assertTrue((Boolean) expr.getValue());
    }

    @Test
    @DisplayName("power")
    void power() {
        AstNode ast = parse("2^3");
        assertEquals(AstNodeType.Power, ast.getType());
        assertEquals(AstNodeType.Number, ast.getLeft().getType());
        assertEquals(new BigDecimal("2"), ast.getLeft().getValue());
        assertEquals(AstNodeType.Number, ast.getRight().getType());
        assertEquals(new BigDecimal("3"), ast.getRight().getValue());
    }

    @Test
    @DisplayName("multiply / divide / modulus")
    void multiplyDivideModulus() {
        assertEquals(AstNodeType.Multiply, parse("6*7").getType());
        assertEquals(AstNodeType.Divide, parse("8/2").getType());
        assertEquals(AstNodeType.Modulus, parse("5%2").getType());
    }

    @Test
    @DisplayName("add / subtract")
    void addSubtract() {
        assertEquals(AstNodeType.Add, parse("1+2").getType());
        assertEquals(AstNodeType.Subtract, parse("3-1").getType());
    }

    @Test
    @DisplayName("add / subtract DatePart")
    void addSubtractDatePart() {
        AstNode add = parse("4+10D");
        assertEquals(AstNodeType.AddDatePart, add.getType());
        assertEquals("10D", add.getDatePart());

        AstNode sub = parse("5-2Y");
        assertEquals(AstNodeType.SubtractDatePart, sub.getType());
        assertEquals("2Y", sub.getDatePart());
    }

    @Test
    @DisplayName("comparisons")
    void comparisons() {
        assertEquals(AstNodeType.Gte, parse("2>=2").getType());
        assertEquals(AstNodeType.Lte, parse("3<=4").getType());
        assertEquals(AstNodeType.Gt, parse("5>3").getType());
        assertEquals(AstNodeType.Lt, parse("2<7").getType());
    }

    @Test
    @DisplayName("equality and inequality")
    void equalityAndInequality() {
        assertEquals(AstNodeType.Eq, parse("1==1").getType());
        assertEquals(AstNodeType.NotEq, parse("1!=2").getType());
    }

    @Test
    @DisplayName("logical and / or / xor / implies")
    void logicalAndOr() {
        assertEquals(AstNodeType.And, parse("true and false").getType());
        assertEquals(AstNodeType.Or, parse("true or false").getType());
        assertEquals(AstNodeType.Xor, parse("true xor false").getType());
        assertEquals(AstNodeType.Implies, parse("true implies false").getType());
    }

    @Test
    @DisplayName("ternary")
    void ternary() {
        AstNode ast = parse("1?2:3");
        assertEquals(AstNodeType.Ternary, ast.getType());
        assertEquals(new BigDecimal("1"), ast.getTCond().getValue());
        assertEquals(new BigDecimal("2"), ast.getTThen().getValue());
        assertEquals(new BigDecimal("3"), ast.getTElse().getValue());
    }

    @Test
    @DisplayName("number literal")
    void numberLiteral() {
        AstNode expected = AstNode.builder()
                .type(AstNodeType.Number)
                .value(new BigDecimal("123.45"))
                .build();
        assertEquals(expected, parse("123.45"));
    }

    @Test
    @DisplayName("parses date literal")
    void dateLiteral() {
        // CORRECTED: The expected value is now a java.time.LocalDate object.
        AstNode expected = AstNode.builder()
                .type(AstNodeType.LocalDate)
                .value(LocalDate.parse("2023-12-31"))
                .build();
        assertEquals(expected, parse("2023-12-31"));
    }
    @Test
    @DisplayName("boolean and null")
    void booleanAndNull() {
        AstNode expectedFalse = AstNode.builder()
                .type(AstNodeType.Boolean)
                .value(false)
                .build();
        assertEquals(expectedFalse, parse("false"));

        AstNode expectedNull = AstNode.builder().type(AstNodeType.Null).value(null).build();
        assertEquals(expectedNull, parse("null"));
    }

    @Test
    @DisplayName("parses list and index access")
    void listAndIndexAccess() {
        AstNode listAst = parse("[1, 'a']");
        assertEquals(AstNodeType.List, listAst.getType());
        assertEquals(2, listAst.getElements().size());

        // CORRECTED: Test now expects a generic IndexAccess node
        AstNode accessAst = parse("[10, 20][1]");
        assertEquals(AstNodeType.IndexAccess, accessAst.getType());
        assertNotNull(accessAst.getExpression());
        assertEquals(AstNodeType.List, accessAst.getExpression().getType());
        assertNotNull(accessAst.getIndexes());
        assertEquals(new BigDecimal("1"), accessAst.getIndexes().getElements().get(0).getValue());
    }

    @Test
    @DisplayName("parses string literal and index access")
    void stringLiteralAndAccess() {
        assertEquals("hello", parse("\"hello\"").getValue());

        // CORRECTED: Test now expects a generic IndexAccess node
        AstNode accessAst = parse("'ok'[0]");
        assertEquals(AstNodeType.IndexAccess, accessAst.getType());

        // Check the base expression
        AstNode baseExpr = accessAst.getExpression();
        assertNotNull(baseExpr);
        assertEquals(AstNodeType.String, baseExpr.getType());
        assertEquals("ok", baseExpr.getValue());

        // Check the indexes
        AstNode indexes = accessAst.getIndexes();
        assertNotNull(indexes);
        assertEquals(AstNodeType.Indexes, indexes.getType());
        assertEquals(1, indexes.getElements().size());
        assertEquals(new BigDecimal("0"), indexes.getElements().get(0).getValue());
    }

    @Test
    @DisplayName("parenthesized expression")
    void parenthesizedExpression() {
        assertEquals(AstNodeType.Add, parse("(1+1)").getType());
    }

    @Test
    @DisplayName("pointer-access off a parenthesized expr")
    void pointerAccessOffParenthesizedExpr() {
        AstNode ast = parse("(1+2).foo[3]");

        assertEquals(AstNodeType.PointerAccess, ast.getType());
        assertEquals(AstNodeType.Add, ast.getExpression().getType());

        AstNode pointers = ast.getPointers();
        assertEquals(AstNodeType.Pointers, pointers.getType());
        assertEquals(2, pointers.getElements().size());

        AstNode tagPointer = pointers.getElements().get(0);
        assertEquals(AstNodeType.Tags, tagPointer.getType());
        assertEquals(List.of("foo"), tagPointer.getFeatures());

        AstNode indexPointer = pointers.getElements().get(1);
        assertEquals(AstNodeType.Index, indexPointer.getType());
        AstNode indexes = indexPointer.getIndexes();
        assertEquals(AstNodeType.Indexes, indexes.getType());
        assertEquals(new BigDecimal("3"), indexes.getElements().get(0).getValue());
    }

    @Test
    @DisplayName("mixes arithmetic and logical in one expression")
    void mixesArithmeticAndLogical() {
        AstNode actual = parse("not (1 + 2 * 3 <= 7) and (4 % 2 == 0)");

        AstNode expected = AstNode.builder()
                .type(AstNodeType.And)
                .left(AstNode.builder()
                        .type(AstNodeType.Not)
                        .expression(AstNode.builder()
                                .type(AstNodeType.Lte)
                                .left(AstNode.builder()
                                        .type(AstNodeType.Add)
                                        .left(AstNode.builder().type(AstNodeType.Number).value(new BigDecimal("1")).build())
                                        .right(AstNode.builder()
                                                .type(AstNodeType.Multiply)
                                                .left(AstNode.builder().type(AstNodeType.Number).value(new BigDecimal("2")).build())
                                                .right(AstNode.builder().type(AstNodeType.Number).value(new BigDecimal("3")).build())
                                                .build())
                                        .build())
                                .right(AstNode.builder().type(AstNodeType.Number).value(new BigDecimal("7")).build())
                                .build())
                        .build())
                .right(AstNode.builder()
                        .type(AstNodeType.Eq)
                        .left(AstNode.builder()
                                .type(AstNodeType.Modulus)
                                .left(AstNode.builder().type(AstNodeType.Number).value(new BigDecimal("4")).build())
                                .right(AstNode.builder().type(AstNodeType.Number).value(new BigDecimal("2")).build())
                                .build())
                        .right(AstNode.builder().type(AstNodeType.Number).value(new BigDecimal("0")).build())
                        .build())
                .build();

        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("mixes arithmetic with multiple self chains")
    void mixesArithmeticWithMultipleSelfChains() {
        AstNode actual = parse("self.x + self.y * self.z");

        AstNode expected = AstNode.builder()
                .type(AstNodeType.Add)
                .left(
                        AstNode.builder().type(AstNodeType.Self)
                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("x")).build())
                                .build()
                )
                .right(
                        AstNode.builder().type(AstNodeType.Multiply)
                                .left(
                                        AstNode.builder().type(AstNodeType.Self)
                                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("y")).build())
                                                .build()
                                )
                                .right(
                                        AstNode.builder().type(AstNodeType.Self)
                                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("z")).build())
                                                .build()
                                )
                                .build()
                )
                .build();

        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("handles a ternary using self chains")
    void handlesTernaryUsingSelfChains() {
        AstNode actual = parse("self.enabled ? self.onValue : self.offValue");

        AstNode expected = AstNode.builder()
                .type(AstNodeType.Ternary)
                .tCond(
                        AstNode.builder().type(AstNodeType.Self)
                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("enabled")).build())
                                .build()
                )
                .tThen(
                        AstNode.builder().type(AstNodeType.Self)
                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("onValue")).build())
                                .build()
                )
                .tElse(
                        AstNode.builder().type(AstNodeType.Self)
                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("offValue")).build())
                                .build()
                )
                .build();

        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("combines logical and unary with self chains")
    void combinesLogicalAndUnaryWithSelfChains() {
        AstNode actual = parse("not self.isValid and self.items.length > 0");

        AstNode expected = AstNode.builder()
                .type(AstNodeType.And)
                .left(
                        AstNode.builder().type(AstNodeType.Not)
                                .expression(
                                        AstNode.builder().type(AstNodeType.Self)
                                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("isValid")).build())
                                                .build()
                                )
                                .build()
                )
                .right(
                        AstNode.builder().type(AstNodeType.Gt)
                                .left(
                                        AstNode.builder().type(AstNodeType.Self)
                                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("items", "length")).build())
                                                .build()
                                )
                                .right(
                                        AstNode.builder().type(AstNodeType.Number).value(new BigDecimal("0")).build()
                                )
                                .build()
                )
                .build();

        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("respects parentheses around self chains in mixed arithmetic")
    void respectsParenthesesAroundSelfChains() {
        AstNode actual = parse("(self.a + self.b) * self.c");

        AstNode expected = AstNode.builder()
                .type(AstNodeType.Multiply)
                .left(
                        AstNode.builder().type(AstNodeType.Add)
                                .left(
                                        AstNode.builder().type(AstNodeType.Self)
                                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("a")).build())
                                                .build()
                                )
                                .right(
                                        AstNode.builder().type(AstNodeType.Self)
                                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("b")).build())
                                                .build()
                                )
                                .build()
                )
                .right(
                        AstNode.builder().type(AstNodeType.Self)
                                .tags(AstNode.builder().type(AstNodeType.Tags).features(List.of("c")).build())
                                .build()
                )
                .build();

        assertEquals(expected, actual);
    }

    // --- NEW TESTS FOR POSTFIX SYNTAX ---

    @Test
    @DisplayName("parses a postfix function call with no arguments")
    void postfixFunctionCallNoArgs() {
        AstNode ast = parse("'hello'!size()");

        assertEquals(AstNodeType.PostfixFunctionCall, ast.getType());
        assertEquals("size", ast.getFunctionName());

        // Check the base expression the function is called on
        assertNotNull(ast.getExpression());
        assertEquals(AstNodeType.String, ast.getExpression().getType());
        assertEquals("hello", ast.getExpression().getValue());

        // Check for arguments (should be none)
        assertEquals(Collections.emptyList(), ast.getElements());
    }

    @Test
    @DisplayName("parses a postfix function call with arguments")
    void postfixFunctionCallWithArgs() {
        AstNode ast = parse("1.234!round(2)");

        assertEquals(AstNodeType.PostfixFunctionCall, ast.getType());
        assertEquals("round", ast.getFunctionName());

        // Check base expression
        assertNotNull(ast.getExpression());
        assertEquals(AstNodeType.Number, ast.getExpression().getType());
        assertEquals(new BigDecimal("1.234"), ast.getExpression().getValue());

        // Check arguments
        assertNotNull(ast.getElements());
        assertEquals(1, ast.getElements().size());
        AstNode arg1 = ast.getElements().get(0);
        assertEquals(AstNodeType.Number, arg1.getType());
        assertEquals(new BigDecimal("2"), arg1.getValue());
    }

    @Test
    @DisplayName("parses chained postfix function calls")
    void chainedPostfixCalls() {
        AstNode ast = parse("today!year()!round(0)");

        // Outermost call is round(0)
        assertEquals(AstNodeType.PostfixFunctionCall, ast.getType());
        assertEquals("round", ast.getFunctionName());

        // The base expression for round() is the result of today!year()
        AstNode innerCall = ast.getExpression();
        assertEquals(AstNodeType.PostfixFunctionCall, innerCall.getType());
        assertEquals("year", innerCall.getFunctionName());

        // The base expression for year() is today
        AstNode keyword = innerCall.getExpression();
        assertEquals(AstNodeType.Today, keyword.getType());
    }

    @Test
    @DisplayName("parses literal types: Timestamp and Time")
    void literalTypes() {
        AstNode tsAst = parse("2025-06-08T10:30:00");
        assertEquals(AstNodeType.Timestamp, tsAst.getType());
        assertEquals(LocalDateTime.of(2025, 6, 8, 10, 30, 0), tsAst.getValue());

        AstNode timeAst = parse("15:45:10");
        assertEquals(AstNodeType.Time, timeAst.getType());
        assertEquals(LocalTime.of(15, 45, 10), timeAst.getValue());

        AstNode timeAstNoSec = parse("09:15");
        assertEquals(AstNodeType.Time, timeAstNoSec.getType());
        assertEquals(LocalTime.of(9, 15, 0), timeAstNoSec.getValue());
    }

    @Test
    @DisplayName("parses new date keywords")
    void dateKeywords() {
        assertEquals(AstNodeType.Today, parse("today").getType());
        assertEquals(AstNodeType.Yesterday, parse("yesterday").getType());
        assertEquals(AstNodeType.Tomorrow, parse("tomorrow").getType());
    }

}
