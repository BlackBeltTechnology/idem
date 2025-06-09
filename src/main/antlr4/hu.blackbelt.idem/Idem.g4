grammar Idem;

parse
  : expression
  ;

expression
  : expression '!' Identifier '(' exprList? ')' #postfixFunctionCallExpression
  | Self tags                                 #selfExpression
  | Subtract expression                       #unaryMinusExpression
  | Not expression                            #notExpression
  | expression Pow expression                 #powerExpression
  | expression indexes                        #indexedAccessExpression
  | expression Multiply expression            #multiplyExpression
  | expression Divide expression              #divideExpression
  | expression Modulus expression             #modulusExpression
  | expression Div expression                 #divExpression
  | expression Mod expression                 #modExpression
  | expression Add expression                 #addExpression
  | expression Subtract expression            #subtractExpression
  | expression Add DatePart                   #addDatePartExpression
  | expression Subtract DatePart              #subtractDatePartExpression
  | expression GTEquals expression            #gtEqExpression
  | expression LTEquals expression            #ltEqExpression
  | expression GT expression                  #gtExpression
  | expression LT expression                  #ltExpression
  | expression Equals expression              #eqExpression
  | expression NEquals expression             #notEqExpression
  | expression And expression                 #andExpression
  | expression Xor expression                 #xorExpression
  | expression Or expression                  #orExpression
  | expression Implies expression             #impliesExpression
  | expression '?' expression ':' expression  #ternaryExpression
  | expression In expression                  #inExpression
  | Number                                    #numberExpression
  | Bool                                      #boolExpression
  | Null                                      #nullExpression
  | list                                      #listExpression
  | String                                    #stringExpression
  | LocalDate                                 #localDateExpression
  | Timestamp                                 #timestampExpression
  | Time                                      #timeExpression
  | Today                                     #todayExpression
  | Yesterday                                 #yesterdayExpression
  | Tomorrow                                  #tomorrowExpression
  | OParen expression CParen pointers?        #expressionExpression
  ;

list
  : '[' exprList? ']'
  ;

indexes
  : ('[' expression ']')+
  ;

pointers
  : (pointer)+
  ;

pointer
  : tags
  | indexes
  ;

tags
  : ('.' feature )+
  ;

feature
  : Identifier
  ;

exprList
  : expression (',' expression)*
  ;

Self      : 'self';
In        : 'in';
Null      : 'null';
Today     : 'today';
Yesterday : 'yesterday';
Tomorrow  : 'tomorrow';

Or        : 'or';
Xor       : 'xor';
And       : 'and';
Equals    : '==';
NEquals   : '!=';
GTEquals  : '>=';
LTEquals  : '<=';
Pow       : '^';
Not       : 'not';
Implies   : 'implies';
GT        : '>';
LT        : '<';
Add       : '+';
Subtract  : '-';
Multiply  : '*';
Divide    : '/';
Modulus   : '%';
Div       : 'div';
Mod       : 'mod';
OBracket  : '[';
CBracket  : ']';
OParen    : '(';
CParen    : ')';
SColon    : ';';
Assign    : '=';
Comma     : ',';
QMark     : '?';
Colon     : ':';

Bool
  : 'true'
  | 'false'
  ;

Identifier
  : ('a'..'z'|'A'..'Z'|'_') ('a'..'z'|'A'..'Z'|'0'..'9'|'_')*
  ;

Number
  : Int ('.' Digit*)?
  ;

String
  : ["] (~["\r\n] | '\\\\' | '\\"')* ["]
  | ['] (~['\r\n] | '\\\\' | '\\\'')* [']
  ;

LocalDate
  : Digit Digit Digit Digit '-' Digit Digit '-' Digit Digit
  ;

Timestamp
  : LocalDate 'T' Digit Digit ':' Digit Digit ':' Digit Digit
  ;

Time
  : Digit Digit ':' Digit Digit (':' Digit Digit)?
  ;

DatePart
  : Number ([Dd] | [Ww] | [Mm] | [Yy])
  ;

Space
  : [ \t\r\n\u000C] -> skip
  ;

fragment Int
  : [1-9] Digit*
  | '0'
  ;

fragment Digit
  : [0-9]
;
