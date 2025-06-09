grammar Idem;

parse
  : expression
  ;

expression
  : expression '!' Identifier '(' argumentList? ')'         #functionCallExpression
  | expression '.' Identifier                               #navigationExpression
  | Self ('.' Identifier)*                                  #selfExpression
  | '-' expression                                          #unaryMinusExpression
  | 'not' expression                                        #notExpression
  | expression '^' expression                               #powerExpression
  | expression ('*' | '/' | 'div' | 'mod' | '%') expression #multiplyDivideModExpression
  | expression ('+' | '-') expression                       #addSubtractExpression
  | expression ('<=' | '>=' | '<' | '>') expression         #comparisonExpression
  | expression ('=' | '==' | '!=' | '<>') expression        #equalityExpression
  | expression 'and' expression                             #andExpression
  | expression 'xor' expression                             #xorExpression
  | expression 'or' expression                              #orExpression
  | expression 'implies' expression                         #impliesExpression
  | expression '?' expression ':' expression                #ternaryExpression
  | expression 'in' expression                              #inExpression
  | literal                                                 #literalExpression
  | Identifier                                              #identifierExpression
  | '(' expression ')'                                      #parenthesesExpression
  | expression '[' expression ']'                           #indexAccessExpression
  ;

literal
  : numericLiteral
  | stringLiteral
  | booleanLiteral
  | temporalLiteral
  | nullLiteral
  ;

stringLiteral
  : StringLiteral
  ;

nullLiteral
  : 'null'
  ;

numericLiteral
  : Number
  ;

booleanLiteral
  : 'true'
  | 'false'
  ;

temporalLiteral
  : '`' DATE '`'                #dateLiteral
  | '`' TIMESTAMP '`'           #timestampLiteral
  | '`' TIME '`'                #timeLiteral
  | 'today'                     #todayLiteral
  | 'yesterday'                 #yesterdayLiteral
  | 'tomorrow'                  #tomorrowLiteral
  ;

argumentList
  : iteratorArgument (',' expression)*
  | expression (',' expression)*
  ;

iteratorArgument
  : Identifier '|' expression
  ;

// --- LEXER ---

// Keywords
Self: 'self';
In: 'in';

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