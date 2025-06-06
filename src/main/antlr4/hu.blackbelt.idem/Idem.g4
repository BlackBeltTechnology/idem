grammar Idem;

parse
 : block EOF
 ;

block
 : (expression)?
 ;


//functionCall
// : Floor '(' expression  ',' expression ')'        #floorFunctionCall
// | Ceil '(' expression  ',' expression ')'         #ceilFunctionCall
// | Round '(' expression ',' expression ')'         #roundFunctionCall/
// | Size '(' expression ')'                         #sizeFunctionCall
// | DayDiff '(' expression ',' expression ')'       #dayDiffFunctionCall
// | WeekDiff '(' expression ',' expression ')'      #weekDiffFunctionCall
// | MonthDiff '(' expression ',' expression ')'     #monthDiffFunctionCall
// | YearDiff '(' expression ',' expression ')'      #yearDiffFunctionCall
// | Year        '(' expression ')'                  #yearFunctionCall
// | DayOfYear   '(' expression ')'                  #dayOfYearFunctionCall
// | WeekOfYear  '(' expression ')'                  #weekOfYearFunctionCall
// | MonthOfYear '(' expression ')'                  #monthOfYearFunctionCall
// | DayOfMonth  '(' expression ')'                  #dayOfMonthFunctionCall
// | WeekOfMonth '(' expression ')'                  #weekOfMonthFunctionCall
// | DayOfWeek   '(' expression ')'                  #dayOfWeekFunctionCall
// | Today '(' ')'                                   #todayFunctionCall
// | Yesterday '(' ')'                               #yesterdayFunctionCall
// | Tomorrow '(' ')'                                #tomorrowFunctionCall
// | BoolToInt '(' expression ')'                    #boolToIntFunctionCall
// ;

expression
 : 'self' tags                              #selfExpression
 | '-' expression                           #unaryMinusExpression
 | '!' expression                           #notExpression
 | expression '^' expression                #powerExpression
 | expression '*' expression                #multiplyExpression
 | expression '/' expression                #divideExpression
 | expression '%' expression                #modulusExpression
 | expression '+' expression                #addExpression
 | expression '-' expression                #subtractExpression
 | expression '+' DatePart                  #addDatePartExpression
 | expression '-' DatePart                  #subtractDatePartExpression
 | expression '>=' expression               #gtEqExpression
 | expression '<=' expression               #ltEqExpression
 | expression '>' expression                #gtExpression
 | expression '<' expression                #ltExpression
 | expression '==' expression               #eqExpression
 | expression '!=' expression               #notEqExpression
 | expression '&&' expression               #andExpression
 | expression '||' expression               #orExpression
 | expression '?' expression ':' expression #ternaryExpression
 | expression In expression                 #inExpression
 | Number                                   #numberExpression
 | LocalDate                                #localDateExpression
 | Bool                                     #boolExpression
 | Null                                     #nullExpression
 | list indexes?                            #listExpression
 | String indexes?                          #stringExpression
 | '(' expression ')'pointers?              #expressionExpression
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

Identifier
 : (Char | Unicode | Underscore) (Char | Digit | Unicode | Underscore)*
 ;

//Size     : 'size';
//In       : 'in';
//Null     : 'null';

//DayDiff    : 'day_diff';
//WeekDiff   : 'week_diff';
//MonthDiff  : 'month_diff';
//YearDiff   : 'year_diff';

//Year        : 'year';
//DayOfYear   : 'day_of_year';
//WeekOfYear  : 'week_of_year';
//MonthOfYear : 'month_of_year';
//DayOfMonth  : 'day_of_month';
//WeekOfMonth : 'week_of_month';
//DayOfWeek   : 'day_of_week';
//Today       : 'today';
//Yesterday   : 'yesterday';
//Tomorrow    : 'tomorrow';
//Choice      : 'choice';
//Floor       : 'floor';
//Ceil        : 'ceil';
//Round       : 'round';
//BoolToInt   : 'boolToInt';

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