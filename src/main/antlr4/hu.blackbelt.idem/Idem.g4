grammar Idem;

parse
 : block EOF
 ;

block
 : (functionCall  | expression)
 ;

functionCall
 : Floor OParen expression  ',' expression CParen        #floorFunctionCall
 | Ceil OParen expression  ',' expression CParen         #ceilFunctionCall
 | Round OParen expression ',' expression CParen         #roundFunctionCall
 | Size OParen expression CParen                         #sizeFunctionCall
 | DayDiff OParen expression ',' expression CParen       #dayDiffFunctionCall
 | WeekDiff OParen expression ',' expression CParen      #weekDiffFunctionCall
 | MonthDiff OParen expression ',' expression CParen     #monthDiffFunctionCall
 | YearDiff OParen expression ',' expression CParen      #yearDiffFunctionCall
 | Year        OParen expression CParen                  #yearFunctionCall
 | DayOfYear   OParen expression CParen                  #dayOfYearFunctionCall
 | WeekOfYear  OParen expression CParen                  #weekOfYearFunctionCall
 | MonthOfYear OParen expression CParen                  #monthOfYearFunctionCall
 | DayOfMonth  OParen expression CParen                  #dayOfMonthFunctionCall
 | WeekOfMonth OParen expression CParen                  #weekOfMonthFunctionCall
 | DayOfWeek   OParen expression CParen                  #dayOfWeekFunctionCall
 | Today OParen CParen                                   #todayFunctionCall
 | Yesterday OParen CParen                               #yesterdayFunctionCall
 | Tomorrow OParen CParen                                #tomorrowFunctionCall
 | BoolToInt OParen expression CParen                    #boolToIntFunctionCall
 ;

expression
 : Self tags                                #selfExpression
 | Subtract expression                      #unaryMinusExpression
 | Excl expression                          #notExpression
 | expression Pow expression                #powerExpression
 | expression Multiply expression           #multiplyExpression
 | expression Divide expression             #divideExpression
 | expression Modulus expression            #modulusExpression
 | expression Add expression                #addExpression
 | expression Subtract expression           #subtractExpression
 | expression Add DatePart                  #addDatePartExpression
 | expression Subtract DatePart             #subtractDatePartExpression
 | expression GTEquals expression           #gtEqExpression
 | expression LTEquals expression           #ltEqExpression
 | expression GT expression                 #gtExpression
 | expression LT expression                 #ltExpression
 | expression Equals expression             #eqExpression
 | expression NEquals expression            #notEqExpression
 | expression And expression                #andExpression
 | expression Or expression                 #orExpression
 | expression '?' expression ':' expression #ternaryExpression
 | expression In expression                 #inExpression
 | Number                                   #numberExpression
 | LocalDate                                #localDateExpression
 | Bool                                     #boolExpression
 | Null                                     #nullExpression
 | list indexes?                            #listExpression
 | String indexes?                          #stringExpression
 | OParen expression CParen pointers?       #expressionExpression
 ;


//selfToken
// : 'self' ('.' Identifier )+
// ;

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

Self     : 'self';
Size     : 'size';
In       : 'in';
Null     : 'null';

DayDiff    : 'day_diff';
WeekDiff   : 'week_diff';
MonthDiff  : 'month_diff';
YearDiff   : 'year_diff';

Year        : 'year';
DayOfYear   : 'day_of_year';
WeekOfYear  : 'week_of_year';
MonthOfYear : 'month_of_year';
DayOfMonth  : 'day_of_month';
WeekOfMonth : 'week_of_month';
DayOfWeek   : 'day_of_week';
Today       : 'today';
Yesterday   : 'yesterday';
Tomorrow    : 'tomorrow';
Choice      : 'choice';
Floor       : 'floor';
Ceil        : 'ceil';
Round       : 'round';
BoolToInt   : 'boolToInt';

Or       : '||';
And      : '&&';
Equals   : '==';
NEquals  : '!=';
GTEquals : '>=';
LTEquals : '<=';
Pow      : '^';
Excl     : '!';
GT       : '>';
LT       : '<';
Add      : '+';
Subtract : '-';
Multiply : '*';
Divide   : '/';
Modulus  : '%';
OBracket : '[';
CBracket : ']';
OParen   : '(';
CParen   : ')';
SColon   : ';';
Assign   : '=';
Comma    : ',';
QMark    : '?';
Colon    : ':';

Bool
 : 'true' 
 | 'false'
 ;

Identifier
 : (Char | Unicode | Underscore) (Char | Digit | Unicode | Underscore)*
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

DatePart
 : Number ([Dd] | [Ww] | [Mm] | [Yy])
 ;


Space
 : [ \t\r\n\u000C] -> skip
 ;

//fragment SelfFrag
// : 'self'
// ;

fragment Int
 : [1-9] Digit*
 | '0'
 ;

fragment Dot
 : '.'
 ;

fragment Digit 
 : [0-9]
 ;

fragment Char
 : ('A'..'Z')
 | ('a'..'z')
 ;

fragment Underscore
 : '_'
 ;

fragment Empty
 : ' '
 ;

fragment Unicode
 : '\u00C0'..'\uFFFF';
