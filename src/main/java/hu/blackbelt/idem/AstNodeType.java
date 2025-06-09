package hu.blackbelt.idem;

public enum AstNodeType {
    // Expressions
    BINARY_EXPRESSION,
    UNARY_EXPRESSION,
    TERNARY_EXPRESSION,
    IN_EXPRESSION,
    FUNCTION_CALL,
    NAVIGATION,
    INDEX_ACCESS,
    SELF,
    IDENTIFIER,

    // Literals
    NUMBER,
    STRING,
    BOOLEAN,
    NULL,
    DATE,
    TIMESTAMP,
    TIME,
    TODAY,
    YESTERDAY,
    TOMORROW,

    // Internal
    ARGUMENT_LIST,
    ITERATOR_ARGUMENT
}
