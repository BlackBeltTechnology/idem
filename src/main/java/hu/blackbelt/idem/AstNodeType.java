package hu.blackbelt.idem;

public enum AstNodeType {
    Number,
    Boolean,
    Null,
    String,
    List,
    Self,

    // Literals & Keywords
    LocalDate,
    Timestamp,
    Time,
    Today,
    Yesterday,
    Tomorrow,

    // Expressions
    Add,
    Subtract,
    Multiply,
    Divide,
    Modulus,
    Power,
    And,
    Or,
    Not,
    UnaryMinus,
    Eq,
    NotEq,
    Gt,
    Gte,
    Lt,
    Lte,
    Ternary,
    In,
    AddDatePart,
    SubtractDatePart,
    IndexAccess,
    PointerAccess,

    // New Postfix Call
    PostfixFunctionCall,

    // Internal helper types
    Block,
    ListAccess,
    StringAccess,
    ExprList,
    Indexes,
    Index,
    Pointers,
    Tags
}