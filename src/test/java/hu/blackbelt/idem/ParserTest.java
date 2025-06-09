package hu.blackbelt.idem;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class ParserTest {

    private AstNode parse(String expression) {
        return Parse.expressionToAst(expression);
    }

    @Test
    @DisplayName("parses literals")
    void testLiterals() {
        assertEquals(AstNodeType.BOOLEAN, parse("true").getType());
        assertEquals(AstNodeType.NULL, parse("null").getType());
        assertEquals(AstNodeType.NUMBER, parse("123.45").getType());
        assertEquals(AstNodeType.STRING, parse("'hello'").getType());
        assertEquals(AstNodeType.DATE, parse("`2023-12-31`").getType());
    }

    @Test
    @DisplayName("parses self expression with navigation")
    void selfExpressionWithTags() {
        AstNode ast = parse("self.foo.bar");
        assertEquals(AstNodeType.NAVIGATION, ast.getType());
        assertEquals("bar", ast.getName());
        assertEquals(AstNodeType.NAVIGATION, ast.getTarget().getType());
    }

    @Test
    @DisplayName("parses unary operators")
    void unaryOperators() {
        AstNode ast = parse("-42");
        assertEquals(AstNodeType.UNARY_EXPRESSION, ast.getType());
        assertEquals("-", ast.getOperator());
    }

    @Test
    @DisplayName("parses binary operators with correct precedence")
    void binaryOperators() {
        AstNode ast = parse("1 + 2 * 3"); // Should be 1 + (2 * 3)
        assertEquals(AstNodeType.BINARY_EXPRESSION, ast.getType());
        assertEquals("+", ast.getOperator());

        AstNode rightChild = ast.getChildren().get(1);
        assertEquals(AstNodeType.BINARY_EXPRESSION, rightChild.getType());
        assertEquals("*", rightChild.getOperator());
    }

    @Test
    @DisplayName("parses parentheses to override precedence")
    void parentheses() {
        AstNode ast = parse("(1 + 2) * 3"); // Should be (1 + 2) * 3
        assertEquals(AstNodeType.BINARY_EXPRESSION, ast.getType());
        assertEquals("*", ast.getOperator());

        AstNode leftChild = ast.getChildren().get(0);
        assertEquals(AstNodeType.BINARY_EXPRESSION, leftChild.getType());
        assertEquals("+", leftChild.getOperator());
    }

    @Test
    @DisplayName("parses index access")
    void indexAccess() {
        AstNode ast = parse("self.items[0]");
        assertEquals(AstNodeType.INDEX_ACCESS, ast.getType());
        assertEquals(2, ast.getChildren().size());
    }

    @Test
    @DisplayName("parses function call with no args")
    void functionCallNoArgs() {
        AstNode ast = parse("self.name!length()");
        assertEquals(AstNodeType.FUNCTION_CALL, ast.getType());
        assertEquals("length", ast.getName());
        assertTrue(ast.getArguments().isEmpty());
    }

    @Test
    @DisplayName("parses function call with simple args")
    void functionCallWithArgs() {
        AstNode ast = parse("self.name!substring(1, 4)");
        assertEquals(AstNodeType.FUNCTION_CALL, ast.getType());
        assertEquals("substring", ast.getName());
        assertEquals(2, ast.getArguments().size());
        assertEquals(AstNodeType.NUMBER, ast.getArguments().get(0).getType());
    }

    @Test
    @DisplayName("parses function call with iterator arg")
    void functionCallWithIterator() {
        AstNode ast = parse("self.items!filter(i | i > 1)");
        assertEquals(AstNodeType.FUNCTION_CALL, ast.getType());
        assertEquals("filter", ast.getName());
        assertEquals(1, ast.getArguments().size());

        AstNode iteratorArg = ast.getArguments().get(0);
        assertEquals(AstNodeType.ITERATOR_ARGUMENT, iteratorArg.getType());
        assertEquals("i", iteratorArg.getIteratorVar());
        assertEquals(AstNodeType.BINARY_EXPRESSION, iteratorArg.getIteratorExpression().getType());
    }

}