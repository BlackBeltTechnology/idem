grammar Idem;

// With the build tool fixed, this options block is the correct and
// most robust way to configure the generated parser.
options {
  packageName = 'hu.blackbelt.idem';
  superclass = hu.blackbelt.idem.IdemBaseParser;
}

parse
  : expression
  ;

expression
  : expression '!' Identifier '(' argumentList? ')'      #functionCallExpression
  | expression '.' Identifier                           #navigationExpression
  | Self ('.' Identifier)* #selfExpression
  | '-' expression                                      #unaryMinusExpression
  | 'not' expression                                    #notExpression
  | expression '^' expression                           #powerExpression
  | expression ('*' | '/' | 'div' | 'mod' | '%') expression #multiplyDivideModExpression
  | expression ('+' | '-') expression                   #addSubtractExpression
  | expression ('<=' | '>=' | '<' | '>') expression      #comparisonExpression
  | expression ('=' | '==' | '!=' | '<>') expression      #equalityExpression
  | expression 'and' expression                         #andExpression
  | expression 'xor' expression                         #xorExpression
  | expression 'or' expression                          #orExpression
  | expression 'implies' expression                     #impliesExpression
  | expression '?' expression ':' expression            #ternaryExpression
  | expression 'in' expression                          #inExpression
  | literal                                             #literalExpression
  | Identifier                                          #identifierExpression
  | '(' expression ')'                                  #parenthesesExpression
  | expression '[' expression ']'                       #indexAccessExpression
  ;

literal
  : Number          #numericLiteralAlt
  | StringLiteral   #stringLiteralAlt
  | 'true'          #booleanTrueLiteralAlt
  | 'false'         #booleanFalseLiteralAlt
  | temporalLiteral #temporalLiteralAlt
  | 'null'          #nullLiteralAlt
  ;

temporalLiteral
  : '`' DATE '`'          #dateLiteral
  | '`' TIMESTAMP '`'      #timestampLiteral
  | '`' TIME '`'           #timeLiteral
  | 'today'                #todayLiteral
  | 'yesterday'              #yesterdayLiteral
  | 'tomorrow'               #tomorrowLiteral
  ;

argumentList: argument (',' argument)*;

argument
  // Use a target-agnostic predicate function call.
  // The function is implemented in the parser's base class for each target.
  : {this.isIterator()}? iteratorArgument
  | expression
  ;

iteratorArgument
  : Identifier '|' expression (sortDirection=Cases)?
  ;


// --- LEXER ---

// Keywords
Self: 'self';
In: 'in';
Cases: 'ASC' | 'DESC';

// Operators
Or: 'or';
Xor: 'xor';
And: 'and';
Not: 'not';
Implies: 'implies';

// Fragment for reuse
fragment LETTER: 'a'..'z' | 'A'..'Z' | '_';
fragment DIGIT: '0'..'9';

Identifier
  : LETTER (LETTER | DIGIT)*
  ;

Number
  : DIGIT+ ('.' DIGIT+)?
  ;

StringLiteral
  : '"' ( ~["\r\n] | '\\\\' | '\\"' )* '"'
  | '\'' ( ~['\r\n] | '\\\\' | '\\\'' )* '\''
  ;

DATE: DIGIT DIGIT DIGIT DIGIT '-' DIGIT DIGIT '-' DIGIT DIGIT;
TIMESTAMP: DATE 'T' DIGIT DIGIT ':' DIGIT DIGIT (':' DIGIT DIGIT)? ('Z')?;
TIME: DIGIT DIGIT ':' DIGIT DIGIT (':' DIGIT DIGIT)?;

WS
  : [ \t\r\n]+ -> skip
  ;
