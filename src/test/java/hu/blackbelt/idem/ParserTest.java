package hu.blackbelt.idem;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Disabled
class ParserTest {

    private AstNode parse(String expression) {
        return Parse.parseContextToAst(Parse.parse(expression));
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
        AstNode ast = parse("!true");
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
    @DisplayName("logical and / or")
    void logicalAndOr() {
        assertEquals(AstNodeType.And, parse("true && false").getType());
        assertEquals(AstNodeType.Or, parse("true || false").getType());
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
    @DisplayName("date literal")
    void dateLiteral() throws ParseException {
        AstNode expected = AstNode.builder()
                .type(AstNodeType.LocalDate)
                .value(new SimpleDateFormat("yyyy-MM-dd").parse("2023-12-31"))
                .build();
        assertEquals(expected, parse("2023-12-31"));
    }

    @Test
    @DisplayName("boolean and null")
    void booleanAndNull() {
        AstNode expectedFalse = AstNode.builder()
                .type(AstNodeType.Boolean)
                .value(Optional.of(false))
                .build();
        assertEquals(expectedFalse, parse("false"));

        AstNode expectedNull = AstNode.builder().type(AstNodeType.Null).value(null).build();
        assertEquals(expectedNull, parse("null"));
    }

    @Test
    @DisplayName("list literal and access")
    void listLiteralAndAccess() {
        AstNode listAst = parse("[1,2,3]");
        assertEquals(AstNodeType.List, listAst.getType());
        assertEquals(3, listAst.getElements().size());
        assertEquals(new BigDecimal("1"), listAst.getElements().get(0).getValue());

        AstNode accessAst = parse("[10,20][1]");
        assertEquals(AstNodeType.ListAccess, accessAst.getType());
        assertEquals(AstNodeType.List, accessAst.getList().getType());
        AstNode indexes = accessAst.getIndexes();
        assertEquals(AstNodeType.Indexes, indexes.getType());
        assertEquals(new BigDecimal("1"), indexes.getElements().get(0).getValue());
    }

    @Test
    @DisplayName("string literal and access")
    void stringLiteralAndAccess() {
        assertEquals(AstNode.builder().type(AstNodeType.String).value("hello").build(), parse("\"hello\""));
        assertEquals(AstNode.builder().type(AstNodeType.String).value("xy").build(), parse("'xy'"));

        AstNode accessAst = parse("'ok'[0]");
        assertEquals(AstNodeType.StringAccess, accessAst.getType());
        assertEquals("ok", accessAst.getValue());
        AstNode indexes = accessAst.getIndexes();
        assertEquals(AstNodeType.Indexes, indexes.getType());
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
        AstNode actual = parse("!(1 + 2 * 3 <= 7) && (4 % 2 == 0)");

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
        AstNode actual = parse("!self.isValid && self.items.length > 0");

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
}