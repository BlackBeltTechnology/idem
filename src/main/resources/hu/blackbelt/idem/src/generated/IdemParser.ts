
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { IdemListener } from "./IdemListener.js";
import { IdemVisitor } from "./IdemVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class IdemParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly Self = 2;
    public static readonly Size = 3;
    public static readonly In = 4;
    public static readonly Null = 5;
    public static readonly DayDiff = 6;
    public static readonly WeekDiff = 7;
    public static readonly MonthDiff = 8;
    public static readonly YearDiff = 9;
    public static readonly Year = 10;
    public static readonly DayOfYear = 11;
    public static readonly WeekOfYear = 12;
    public static readonly MonthOfYear = 13;
    public static readonly DayOfMonth = 14;
    public static readonly WeekOfMonth = 15;
    public static readonly DayOfWeek = 16;
    public static readonly Today = 17;
    public static readonly Yesterday = 18;
    public static readonly Tomorrow = 19;
    public static readonly Choice = 20;
    public static readonly Floor = 21;
    public static readonly Ceil = 22;
    public static readonly Round = 23;
    public static readonly BoolToInt = 24;
    public static readonly Or = 25;
    public static readonly And = 26;
    public static readonly Equals = 27;
    public static readonly NEquals = 28;
    public static readonly GTEquals = 29;
    public static readonly LTEquals = 30;
    public static readonly Pow = 31;
    public static readonly Excl = 32;
    public static readonly GT = 33;
    public static readonly LT = 34;
    public static readonly Add = 35;
    public static readonly Subtract = 36;
    public static readonly Multiply = 37;
    public static readonly Divide = 38;
    public static readonly Modulus = 39;
    public static readonly OBracket = 40;
    public static readonly CBracket = 41;
    public static readonly OParen = 42;
    public static readonly CParen = 43;
    public static readonly SColon = 44;
    public static readonly Assign = 45;
    public static readonly Comma = 46;
    public static readonly QMark = 47;
    public static readonly Colon = 48;
    public static readonly Bool = 49;
    public static readonly Identifier = 50;
    public static readonly Number = 51;
    public static readonly String = 52;
    public static readonly LocalDate = 53;
    public static readonly DatePart = 54;
    public static readonly Space = 55;
    public static readonly RULE_parse = 0;
    public static readonly RULE_block = 1;
    public static readonly RULE_functionCall = 2;
    public static readonly RULE_expression = 3;
    public static readonly RULE_list = 4;
    public static readonly RULE_indexes = 5;
    public static readonly RULE_pointers = 6;
    public static readonly RULE_pointer = 7;
    public static readonly RULE_tags = 8;
    public static readonly RULE_feature = 9;
    public static readonly RULE_exprList = 10;

    public static readonly literalNames = [
        null, "'.'", "'self'", "'size'", "'in'", "'null'", "'day_diff'", 
        "'week_diff'", "'month_diff'", "'year_diff'", "'year'", "'day_of_year'", 
        "'week_of_year'", "'month_of_year'", "'day_of_month'", "'week_of_month'", 
        "'day_of_week'", "'today'", "'yesterday'", "'tomorrow'", "'choice'", 
        "'floor'", "'ceil'", "'round'", "'boolToInt'", "'||'", "'&&'", "'=='", 
        "'!='", "'>='", "'<='", "'^'", "'!'", "'>'", "'<'", "'+'", "'-'", 
        "'*'", "'/'", "'%'", "'['", "']'", "'('", "')'", "';'", "'='", "','", 
        "'?'", "':'"
    ];

    public static readonly symbolicNames = [
        null, null, "Self", "Size", "In", "Null", "DayDiff", "WeekDiff", 
        "MonthDiff", "YearDiff", "Year", "DayOfYear", "WeekOfYear", "MonthOfYear", 
        "DayOfMonth", "WeekOfMonth", "DayOfWeek", "Today", "Yesterday", 
        "Tomorrow", "Choice", "Floor", "Ceil", "Round", "BoolToInt", "Or", 
        "And", "Equals", "NEquals", "GTEquals", "LTEquals", "Pow", "Excl", 
        "GT", "LT", "Add", "Subtract", "Multiply", "Divide", "Modulus", 
        "OBracket", "CBracket", "OParen", "CParen", "SColon", "Assign", 
        "Comma", "QMark", "Colon", "Bool", "Identifier", "Number", "String", 
        "LocalDate", "DatePart", "Space"
    ];
    public static readonly ruleNames = [
        "parse", "block", "functionCall", "expression", "list", "indexes", 
        "pointers", "pointer", "tags", "feature", "exprList",
    ];

    public get grammarFileName(): string { return "Idem.g4"; }
    public get literalNames(): (string | null)[] { return IdemParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return IdemParser.symbolicNames; }
    public get ruleNames(): string[] { return IdemParser.ruleNames; }
    public get serializedATN(): number[] { return IdemParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, IdemParser._ATN, IdemParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public parse(): ParseContext {
        let localContext = new ParseContext(this.context, this.state);
        this.enterRule(localContext, 0, IdemParser.RULE_parse);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 22;
            this.block();
            this.state = 23;
            this.match(IdemParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 2, IdemParser.RULE_block);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 27;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case IdemParser.Size:
            case IdemParser.DayDiff:
            case IdemParser.WeekDiff:
            case IdemParser.MonthDiff:
            case IdemParser.YearDiff:
            case IdemParser.Year:
            case IdemParser.DayOfYear:
            case IdemParser.WeekOfYear:
            case IdemParser.MonthOfYear:
            case IdemParser.DayOfMonth:
            case IdemParser.WeekOfMonth:
            case IdemParser.DayOfWeek:
            case IdemParser.Today:
            case IdemParser.Yesterday:
            case IdemParser.Tomorrow:
            case IdemParser.Floor:
            case IdemParser.Ceil:
            case IdemParser.Round:
            case IdemParser.BoolToInt:
                {
                this.state = 25;
                this.functionCall();
                }
                break;
            case IdemParser.Self:
            case IdemParser.Null:
            case IdemParser.Excl:
            case IdemParser.Subtract:
            case IdemParser.OBracket:
            case IdemParser.OParen:
            case IdemParser.Bool:
            case IdemParser.Number:
            case IdemParser.String:
            case IdemParser.LocalDate:
                {
                this.state = 26;
                this.expression(0);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public functionCall(): FunctionCallContext {
        let localContext = new FunctionCallContext(this.context, this.state);
        this.enterRule(localContext, 4, IdemParser.RULE_functionCall);
        try {
            this.state = 132;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case IdemParser.Floor:
                localContext = new FloorFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 29;
                this.match(IdemParser.Floor);
                this.state = 30;
                this.match(IdemParser.OParen);
                this.state = 31;
                this.expression(0);
                this.state = 32;
                this.match(IdemParser.Comma);
                this.state = 33;
                this.expression(0);
                this.state = 34;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.Ceil:
                localContext = new CeilFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 36;
                this.match(IdemParser.Ceil);
                this.state = 37;
                this.match(IdemParser.OParen);
                this.state = 38;
                this.expression(0);
                this.state = 39;
                this.match(IdemParser.Comma);
                this.state = 40;
                this.expression(0);
                this.state = 41;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.Round:
                localContext = new RoundFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 43;
                this.match(IdemParser.Round);
                this.state = 44;
                this.match(IdemParser.OParen);
                this.state = 45;
                this.expression(0);
                this.state = 46;
                this.match(IdemParser.Comma);
                this.state = 47;
                this.expression(0);
                this.state = 48;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.Size:
                localContext = new SizeFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 50;
                this.match(IdemParser.Size);
                this.state = 51;
                this.match(IdemParser.OParen);
                this.state = 52;
                this.expression(0);
                this.state = 53;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.DayDiff:
                localContext = new DayDiffFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 55;
                this.match(IdemParser.DayDiff);
                this.state = 56;
                this.match(IdemParser.OParen);
                this.state = 57;
                this.expression(0);
                this.state = 58;
                this.match(IdemParser.Comma);
                this.state = 59;
                this.expression(0);
                this.state = 60;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.WeekDiff:
                localContext = new WeekDiffFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 62;
                this.match(IdemParser.WeekDiff);
                this.state = 63;
                this.match(IdemParser.OParen);
                this.state = 64;
                this.expression(0);
                this.state = 65;
                this.match(IdemParser.Comma);
                this.state = 66;
                this.expression(0);
                this.state = 67;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.MonthDiff:
                localContext = new MonthDiffFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 69;
                this.match(IdemParser.MonthDiff);
                this.state = 70;
                this.match(IdemParser.OParen);
                this.state = 71;
                this.expression(0);
                this.state = 72;
                this.match(IdemParser.Comma);
                this.state = 73;
                this.expression(0);
                this.state = 74;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.YearDiff:
                localContext = new YearDiffFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 76;
                this.match(IdemParser.YearDiff);
                this.state = 77;
                this.match(IdemParser.OParen);
                this.state = 78;
                this.expression(0);
                this.state = 79;
                this.match(IdemParser.Comma);
                this.state = 80;
                this.expression(0);
                this.state = 81;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.Year:
                localContext = new YearFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 83;
                this.match(IdemParser.Year);
                this.state = 84;
                this.match(IdemParser.OParen);
                this.state = 85;
                this.expression(0);
                this.state = 86;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.DayOfYear:
                localContext = new DayOfYearFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 88;
                this.match(IdemParser.DayOfYear);
                this.state = 89;
                this.match(IdemParser.OParen);
                this.state = 90;
                this.expression(0);
                this.state = 91;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.WeekOfYear:
                localContext = new WeekOfYearFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 93;
                this.match(IdemParser.WeekOfYear);
                this.state = 94;
                this.match(IdemParser.OParen);
                this.state = 95;
                this.expression(0);
                this.state = 96;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.MonthOfYear:
                localContext = new MonthOfYearFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 98;
                this.match(IdemParser.MonthOfYear);
                this.state = 99;
                this.match(IdemParser.OParen);
                this.state = 100;
                this.expression(0);
                this.state = 101;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.DayOfMonth:
                localContext = new DayOfMonthFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 103;
                this.match(IdemParser.DayOfMonth);
                this.state = 104;
                this.match(IdemParser.OParen);
                this.state = 105;
                this.expression(0);
                this.state = 106;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.WeekOfMonth:
                localContext = new WeekOfMonthFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 108;
                this.match(IdemParser.WeekOfMonth);
                this.state = 109;
                this.match(IdemParser.OParen);
                this.state = 110;
                this.expression(0);
                this.state = 111;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.DayOfWeek:
                localContext = new DayOfWeekFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 113;
                this.match(IdemParser.DayOfWeek);
                this.state = 114;
                this.match(IdemParser.OParen);
                this.state = 115;
                this.expression(0);
                this.state = 116;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.Today:
                localContext = new TodayFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 118;
                this.match(IdemParser.Today);
                this.state = 119;
                this.match(IdemParser.OParen);
                this.state = 120;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.Yesterday:
                localContext = new YesterdayFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 121;
                this.match(IdemParser.Yesterday);
                this.state = 122;
                this.match(IdemParser.OParen);
                this.state = 123;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.Tomorrow:
                localContext = new TomorrowFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 124;
                this.match(IdemParser.Tomorrow);
                this.state = 125;
                this.match(IdemParser.OParen);
                this.state = 126;
                this.match(IdemParser.CParen);
                }
                break;
            case IdemParser.BoolToInt:
                localContext = new BoolToIntFunctionCallContext(localContext);
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 127;
                this.match(IdemParser.BoolToInt);
                this.state = 128;
                this.match(IdemParser.OParen);
                this.state = 129;
                this.expression(0);
                this.state = 130;
                this.match(IdemParser.CParen);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expression(): ExpressionContext;
    public expression(_p: number): ExpressionContext;
    public expression(_p?: number): ExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 6;
        this.enterRecursionRule(localContext, 6, IdemParser.RULE_expression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 159;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case IdemParser.Self:
                {
                localContext = new SelfExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 135;
                this.match(IdemParser.Self);
                this.state = 136;
                this.tags();
                }
                break;
            case IdemParser.Subtract:
                {
                localContext = new UnaryMinusExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 137;
                this.match(IdemParser.Subtract);
                this.state = 138;
                this.expression(27);
                }
                break;
            case IdemParser.Excl:
                {
                localContext = new NotExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 139;
                this.match(IdemParser.Excl);
                this.state = 140;
                this.expression(26);
                }
                break;
            case IdemParser.Number:
                {
                localContext = new NumberExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 141;
                this.match(IdemParser.Number);
                }
                break;
            case IdemParser.LocalDate:
                {
                localContext = new LocalDateExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 142;
                this.match(IdemParser.LocalDate);
                }
                break;
            case IdemParser.Bool:
                {
                localContext = new BoolExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 143;
                this.match(IdemParser.Bool);
                }
                break;
            case IdemParser.Null:
                {
                localContext = new NullExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 144;
                this.match(IdemParser.Null);
                }
                break;
            case IdemParser.OBracket:
                {
                localContext = new ListExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 145;
                this.list();
                this.state = 147;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
                case 1:
                    {
                    this.state = 146;
                    this.indexes();
                    }
                    break;
                }
                }
                break;
            case IdemParser.String:
                {
                localContext = new StringExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 149;
                this.match(IdemParser.String);
                this.state = 151;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
                case 1:
                    {
                    this.state = 150;
                    this.indexes();
                    }
                    break;
                }
                }
                break;
            case IdemParser.OParen:
                {
                localContext = new ExpressionExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 153;
                this.match(IdemParser.OParen);
                this.state = 154;
                this.expression(0);
                this.state = 155;
                this.match(IdemParser.CParen);
                this.state = 157;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
                case 1:
                    {
                    this.state = 156;
                    this.pointers();
                    }
                    break;
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 220;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 218;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
                    case 1:
                        {
                        localContext = new PowerExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 161;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 162;
                        this.match(IdemParser.Pow);
                        this.state = 163;
                        this.expression(26);
                        }
                        break;
                    case 2:
                        {
                        localContext = new MultiplyExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 164;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 165;
                        this.match(IdemParser.Multiply);
                        this.state = 166;
                        this.expression(25);
                        }
                        break;
                    case 3:
                        {
                        localContext = new DivideExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 167;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 168;
                        this.match(IdemParser.Divide);
                        this.state = 169;
                        this.expression(24);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ModulusExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 170;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 171;
                        this.match(IdemParser.Modulus);
                        this.state = 172;
                        this.expression(23);
                        }
                        break;
                    case 5:
                        {
                        localContext = new AddExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 173;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 174;
                        this.match(IdemParser.Add);
                        this.state = 175;
                        this.expression(22);
                        }
                        break;
                    case 6:
                        {
                        localContext = new SubtractExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 176;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 177;
                        this.match(IdemParser.Subtract);
                        this.state = 178;
                        this.expression(21);
                        }
                        break;
                    case 7:
                        {
                        localContext = new GtEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 179;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 180;
                        this.match(IdemParser.GTEquals);
                        this.state = 181;
                        this.expression(18);
                        }
                        break;
                    case 8:
                        {
                        localContext = new LtEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 182;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 183;
                        this.match(IdemParser.LTEquals);
                        this.state = 184;
                        this.expression(17);
                        }
                        break;
                    case 9:
                        {
                        localContext = new GtExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 185;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 186;
                        this.match(IdemParser.GT);
                        this.state = 187;
                        this.expression(16);
                        }
                        break;
                    case 10:
                        {
                        localContext = new LtExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 188;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 189;
                        this.match(IdemParser.LT);
                        this.state = 190;
                        this.expression(15);
                        }
                        break;
                    case 11:
                        {
                        localContext = new EqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 191;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 192;
                        this.match(IdemParser.Equals);
                        this.state = 193;
                        this.expression(14);
                        }
                        break;
                    case 12:
                        {
                        localContext = new NotEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 194;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 195;
                        this.match(IdemParser.NEquals);
                        this.state = 196;
                        this.expression(13);
                        }
                        break;
                    case 13:
                        {
                        localContext = new AndExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 197;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 198;
                        this.match(IdemParser.And);
                        this.state = 199;
                        this.expression(12);
                        }
                        break;
                    case 14:
                        {
                        localContext = new OrExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 200;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 201;
                        this.match(IdemParser.Or);
                        this.state = 202;
                        this.expression(11);
                        }
                        break;
                    case 15:
                        {
                        localContext = new TernaryExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 203;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 204;
                        this.match(IdemParser.QMark);
                        this.state = 205;
                        this.expression(0);
                        this.state = 206;
                        this.match(IdemParser.Colon);
                        this.state = 207;
                        this.expression(10);
                        }
                        break;
                    case 16:
                        {
                        localContext = new InExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 209;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 210;
                        this.match(IdemParser.In);
                        this.state = 211;
                        this.expression(9);
                        }
                        break;
                    case 17:
                        {
                        localContext = new AddDatePartExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 212;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 213;
                        this.match(IdemParser.Add);
                        this.state = 214;
                        this.match(IdemParser.DatePart);
                        }
                        break;
                    case 18:
                        {
                        localContext = new SubtractDatePartExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 215;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 216;
                        this.match(IdemParser.Subtract);
                        this.state = 217;
                        this.match(IdemParser.DatePart);
                        }
                        break;
                    }
                    }
                }
                this.state = 222;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public list(): ListContext {
        let localContext = new ListContext(this.context, this.state);
        this.enterRule(localContext, 8, IdemParser.RULE_list);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 223;
            this.match(IdemParser.OBracket);
            this.state = 225;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 5 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 3802385) !== 0)) {
                {
                this.state = 224;
                this.exprList();
                }
            }

            this.state = 227;
            this.match(IdemParser.CBracket);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public indexes(): IndexesContext {
        let localContext = new IndexesContext(this.context, this.state);
        this.enterRule(localContext, 10, IdemParser.RULE_indexes);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 233;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 229;
                    this.match(IdemParser.OBracket);
                    this.state = 230;
                    this.expression(0);
                    this.state = 231;
                    this.match(IdemParser.CBracket);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 235;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pointers(): PointersContext {
        let localContext = new PointersContext(this.context, this.state);
        this.enterRule(localContext, 12, IdemParser.RULE_pointers);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 237;
                    this.pointer();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 240;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pointer(): PointerContext {
        let localContext = new PointerContext(this.context, this.state);
        this.enterRule(localContext, 14, IdemParser.RULE_pointer);
        try {
            this.state = 244;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case IdemParser.T__0:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 242;
                this.tags();
                }
                break;
            case IdemParser.OBracket:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 243;
                this.indexes();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tags(): TagsContext {
        let localContext = new TagsContext(this.context, this.state);
        this.enterRule(localContext, 16, IdemParser.RULE_tags);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 248;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 246;
                    this.match(IdemParser.T__0);
                    this.state = 247;
                    this.feature();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 250;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 12, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public feature(): FeatureContext {
        let localContext = new FeatureContext(this.context, this.state);
        this.enterRule(localContext, 18, IdemParser.RULE_feature);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 252;
            this.match(IdemParser.Identifier);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exprList(): ExprListContext {
        let localContext = new ExprListContext(this.context, this.state);
        this.enterRule(localContext, 20, IdemParser.RULE_exprList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 254;
            this.expression(0);
            this.state = 259;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 46) {
                {
                {
                this.state = 255;
                this.match(IdemParser.Comma);
                this.state = 256;
                this.expression(0);
                }
                }
                this.state = 261;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 3:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 25);
        case 1:
            return this.precpred(this.context, 24);
        case 2:
            return this.precpred(this.context, 23);
        case 3:
            return this.precpred(this.context, 22);
        case 4:
            return this.precpred(this.context, 21);
        case 5:
            return this.precpred(this.context, 20);
        case 6:
            return this.precpred(this.context, 17);
        case 7:
            return this.precpred(this.context, 16);
        case 8:
            return this.precpred(this.context, 15);
        case 9:
            return this.precpred(this.context, 14);
        case 10:
            return this.precpred(this.context, 13);
        case 11:
            return this.precpred(this.context, 12);
        case 12:
            return this.precpred(this.context, 11);
        case 13:
            return this.precpred(this.context, 10);
        case 14:
            return this.precpred(this.context, 9);
        case 15:
            return this.precpred(this.context, 8);
        case 16:
            return this.precpred(this.context, 19);
        case 17:
            return this.precpred(this.context, 18);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,55,263,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,1,0,1,0,1,0,1,1,1,1,3,1,28,8,
        1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,133,8,2,1,3,1,3,1,3,1,3,1,3,1,
        3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,148,8,3,1,3,1,3,3,3,152,8,3,1,
        3,1,3,1,3,1,3,3,3,158,8,3,3,3,160,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,
        3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,
        3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,
        3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,
        3,1,3,1,3,5,3,219,8,3,10,3,12,3,222,9,3,1,4,1,4,3,4,226,8,4,1,4,
        1,4,1,5,1,5,1,5,1,5,4,5,234,8,5,11,5,12,5,235,1,6,4,6,239,8,6,11,
        6,12,6,240,1,7,1,7,3,7,245,8,7,1,8,1,8,4,8,249,8,8,11,8,12,8,250,
        1,9,1,9,1,10,1,10,1,10,5,10,258,8,10,10,10,12,10,261,9,10,1,10,0,
        1,6,11,0,2,4,6,8,10,12,14,16,18,20,0,0,306,0,22,1,0,0,0,2,27,1,0,
        0,0,4,132,1,0,0,0,6,159,1,0,0,0,8,223,1,0,0,0,10,233,1,0,0,0,12,
        238,1,0,0,0,14,244,1,0,0,0,16,248,1,0,0,0,18,252,1,0,0,0,20,254,
        1,0,0,0,22,23,3,2,1,0,23,24,5,0,0,1,24,1,1,0,0,0,25,28,3,4,2,0,26,
        28,3,6,3,0,27,25,1,0,0,0,27,26,1,0,0,0,28,3,1,0,0,0,29,30,5,21,0,
        0,30,31,5,42,0,0,31,32,3,6,3,0,32,33,5,46,0,0,33,34,3,6,3,0,34,35,
        5,43,0,0,35,133,1,0,0,0,36,37,5,22,0,0,37,38,5,42,0,0,38,39,3,6,
        3,0,39,40,5,46,0,0,40,41,3,6,3,0,41,42,5,43,0,0,42,133,1,0,0,0,43,
        44,5,23,0,0,44,45,5,42,0,0,45,46,3,6,3,0,46,47,5,46,0,0,47,48,3,
        6,3,0,48,49,5,43,0,0,49,133,1,0,0,0,50,51,5,3,0,0,51,52,5,42,0,0,
        52,53,3,6,3,0,53,54,5,43,0,0,54,133,1,0,0,0,55,56,5,6,0,0,56,57,
        5,42,0,0,57,58,3,6,3,0,58,59,5,46,0,0,59,60,3,6,3,0,60,61,5,43,0,
        0,61,133,1,0,0,0,62,63,5,7,0,0,63,64,5,42,0,0,64,65,3,6,3,0,65,66,
        5,46,0,0,66,67,3,6,3,0,67,68,5,43,0,0,68,133,1,0,0,0,69,70,5,8,0,
        0,70,71,5,42,0,0,71,72,3,6,3,0,72,73,5,46,0,0,73,74,3,6,3,0,74,75,
        5,43,0,0,75,133,1,0,0,0,76,77,5,9,0,0,77,78,5,42,0,0,78,79,3,6,3,
        0,79,80,5,46,0,0,80,81,3,6,3,0,81,82,5,43,0,0,82,133,1,0,0,0,83,
        84,5,10,0,0,84,85,5,42,0,0,85,86,3,6,3,0,86,87,5,43,0,0,87,133,1,
        0,0,0,88,89,5,11,0,0,89,90,5,42,0,0,90,91,3,6,3,0,91,92,5,43,0,0,
        92,133,1,0,0,0,93,94,5,12,0,0,94,95,5,42,0,0,95,96,3,6,3,0,96,97,
        5,43,0,0,97,133,1,0,0,0,98,99,5,13,0,0,99,100,5,42,0,0,100,101,3,
        6,3,0,101,102,5,43,0,0,102,133,1,0,0,0,103,104,5,14,0,0,104,105,
        5,42,0,0,105,106,3,6,3,0,106,107,5,43,0,0,107,133,1,0,0,0,108,109,
        5,15,0,0,109,110,5,42,0,0,110,111,3,6,3,0,111,112,5,43,0,0,112,133,
        1,0,0,0,113,114,5,16,0,0,114,115,5,42,0,0,115,116,3,6,3,0,116,117,
        5,43,0,0,117,133,1,0,0,0,118,119,5,17,0,0,119,120,5,42,0,0,120,133,
        5,43,0,0,121,122,5,18,0,0,122,123,5,42,0,0,123,133,5,43,0,0,124,
        125,5,19,0,0,125,126,5,42,0,0,126,133,5,43,0,0,127,128,5,24,0,0,
        128,129,5,42,0,0,129,130,3,6,3,0,130,131,5,43,0,0,131,133,1,0,0,
        0,132,29,1,0,0,0,132,36,1,0,0,0,132,43,1,0,0,0,132,50,1,0,0,0,132,
        55,1,0,0,0,132,62,1,0,0,0,132,69,1,0,0,0,132,76,1,0,0,0,132,83,1,
        0,0,0,132,88,1,0,0,0,132,93,1,0,0,0,132,98,1,0,0,0,132,103,1,0,0,
        0,132,108,1,0,0,0,132,113,1,0,0,0,132,118,1,0,0,0,132,121,1,0,0,
        0,132,124,1,0,0,0,132,127,1,0,0,0,133,5,1,0,0,0,134,135,6,3,-1,0,
        135,136,5,2,0,0,136,160,3,16,8,0,137,138,5,36,0,0,138,160,3,6,3,
        27,139,140,5,32,0,0,140,160,3,6,3,26,141,160,5,51,0,0,142,160,5,
        53,0,0,143,160,5,49,0,0,144,160,5,5,0,0,145,147,3,8,4,0,146,148,
        3,10,5,0,147,146,1,0,0,0,147,148,1,0,0,0,148,160,1,0,0,0,149,151,
        5,52,0,0,150,152,3,10,5,0,151,150,1,0,0,0,151,152,1,0,0,0,152,160,
        1,0,0,0,153,154,5,42,0,0,154,155,3,6,3,0,155,157,5,43,0,0,156,158,
        3,12,6,0,157,156,1,0,0,0,157,158,1,0,0,0,158,160,1,0,0,0,159,134,
        1,0,0,0,159,137,1,0,0,0,159,139,1,0,0,0,159,141,1,0,0,0,159,142,
        1,0,0,0,159,143,1,0,0,0,159,144,1,0,0,0,159,145,1,0,0,0,159,149,
        1,0,0,0,159,153,1,0,0,0,160,220,1,0,0,0,161,162,10,25,0,0,162,163,
        5,31,0,0,163,219,3,6,3,26,164,165,10,24,0,0,165,166,5,37,0,0,166,
        219,3,6,3,25,167,168,10,23,0,0,168,169,5,38,0,0,169,219,3,6,3,24,
        170,171,10,22,0,0,171,172,5,39,0,0,172,219,3,6,3,23,173,174,10,21,
        0,0,174,175,5,35,0,0,175,219,3,6,3,22,176,177,10,20,0,0,177,178,
        5,36,0,0,178,219,3,6,3,21,179,180,10,17,0,0,180,181,5,29,0,0,181,
        219,3,6,3,18,182,183,10,16,0,0,183,184,5,30,0,0,184,219,3,6,3,17,
        185,186,10,15,0,0,186,187,5,33,0,0,187,219,3,6,3,16,188,189,10,14,
        0,0,189,190,5,34,0,0,190,219,3,6,3,15,191,192,10,13,0,0,192,193,
        5,27,0,0,193,219,3,6,3,14,194,195,10,12,0,0,195,196,5,28,0,0,196,
        219,3,6,3,13,197,198,10,11,0,0,198,199,5,26,0,0,199,219,3,6,3,12,
        200,201,10,10,0,0,201,202,5,25,0,0,202,219,3,6,3,11,203,204,10,9,
        0,0,204,205,5,47,0,0,205,206,3,6,3,0,206,207,5,48,0,0,207,208,3,
        6,3,10,208,219,1,0,0,0,209,210,10,8,0,0,210,211,5,4,0,0,211,219,
        3,6,3,9,212,213,10,19,0,0,213,214,5,35,0,0,214,219,5,54,0,0,215,
        216,10,18,0,0,216,217,5,36,0,0,217,219,5,54,0,0,218,161,1,0,0,0,
        218,164,1,0,0,0,218,167,1,0,0,0,218,170,1,0,0,0,218,173,1,0,0,0,
        218,176,1,0,0,0,218,179,1,0,0,0,218,182,1,0,0,0,218,185,1,0,0,0,
        218,188,1,0,0,0,218,191,1,0,0,0,218,194,1,0,0,0,218,197,1,0,0,0,
        218,200,1,0,0,0,218,203,1,0,0,0,218,209,1,0,0,0,218,212,1,0,0,0,
        218,215,1,0,0,0,219,222,1,0,0,0,220,218,1,0,0,0,220,221,1,0,0,0,
        221,7,1,0,0,0,222,220,1,0,0,0,223,225,5,40,0,0,224,226,3,20,10,0,
        225,224,1,0,0,0,225,226,1,0,0,0,226,227,1,0,0,0,227,228,5,41,0,0,
        228,9,1,0,0,0,229,230,5,40,0,0,230,231,3,6,3,0,231,232,5,41,0,0,
        232,234,1,0,0,0,233,229,1,0,0,0,234,235,1,0,0,0,235,233,1,0,0,0,
        235,236,1,0,0,0,236,11,1,0,0,0,237,239,3,14,7,0,238,237,1,0,0,0,
        239,240,1,0,0,0,240,238,1,0,0,0,240,241,1,0,0,0,241,13,1,0,0,0,242,
        245,3,16,8,0,243,245,3,10,5,0,244,242,1,0,0,0,244,243,1,0,0,0,245,
        15,1,0,0,0,246,247,5,1,0,0,247,249,3,18,9,0,248,246,1,0,0,0,249,
        250,1,0,0,0,250,248,1,0,0,0,250,251,1,0,0,0,251,17,1,0,0,0,252,253,
        5,50,0,0,253,19,1,0,0,0,254,259,3,6,3,0,255,256,5,46,0,0,256,258,
        3,6,3,0,257,255,1,0,0,0,258,261,1,0,0,0,259,257,1,0,0,0,259,260,
        1,0,0,0,260,21,1,0,0,0,261,259,1,0,0,0,14,27,132,147,151,157,159,
        218,220,225,235,240,244,250,259
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!IdemParser.__ATN) {
            IdemParser.__ATN = new antlr.ATNDeserializer().deserialize(IdemParser._serializedATN);
        }

        return IdemParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(IdemParser.literalNames, IdemParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return IdemParser.vocabulary;
    }

    private static readonly decisionsToDFA = IdemParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ParseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(IdemParser.EOF, 0)!;
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_parse;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterParse) {
             listener.enterParse(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitParse) {
             listener.exitParse(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitParse) {
            return visitor.visitParse(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public functionCall(): FunctionCallContext | null {
        return this.getRuleContext(0, FunctionCallContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_block;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_functionCall;
    }
    public override copyFrom(ctx: FunctionCallContext): void {
        super.copyFrom(ctx);
    }
}
export class FloorFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Floor(): antlr.TerminalNode {
        return this.getToken(IdemParser.Floor, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Comma(): antlr.TerminalNode {
        return this.getToken(IdemParser.Comma, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterFloorFunctionCall) {
             listener.enterFloorFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitFloorFunctionCall) {
             listener.exitFloorFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitFloorFunctionCall) {
            return visitor.visitFloorFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CeilFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Ceil(): antlr.TerminalNode {
        return this.getToken(IdemParser.Ceil, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Comma(): antlr.TerminalNode {
        return this.getToken(IdemParser.Comma, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterCeilFunctionCall) {
             listener.enterCeilFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitCeilFunctionCall) {
             listener.exitCeilFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitCeilFunctionCall) {
            return visitor.visitCeilFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class RoundFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Round(): antlr.TerminalNode {
        return this.getToken(IdemParser.Round, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Comma(): antlr.TerminalNode {
        return this.getToken(IdemParser.Comma, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterRoundFunctionCall) {
             listener.enterRoundFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitRoundFunctionCall) {
             listener.exitRoundFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitRoundFunctionCall) {
            return visitor.visitRoundFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class SizeFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Size(): antlr.TerminalNode {
        return this.getToken(IdemParser.Size, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterSizeFunctionCall) {
             listener.enterSizeFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitSizeFunctionCall) {
             listener.exitSizeFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitSizeFunctionCall) {
            return visitor.visitSizeFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DayDiffFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DayDiff(): antlr.TerminalNode {
        return this.getToken(IdemParser.DayDiff, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Comma(): antlr.TerminalNode {
        return this.getToken(IdemParser.Comma, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterDayDiffFunctionCall) {
             listener.enterDayDiffFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitDayDiffFunctionCall) {
             listener.exitDayDiffFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitDayDiffFunctionCall) {
            return visitor.visitDayDiffFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class WeekDiffFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public WeekDiff(): antlr.TerminalNode {
        return this.getToken(IdemParser.WeekDiff, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Comma(): antlr.TerminalNode {
        return this.getToken(IdemParser.Comma, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterWeekDiffFunctionCall) {
             listener.enterWeekDiffFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitWeekDiffFunctionCall) {
             listener.exitWeekDiffFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitWeekDiffFunctionCall) {
            return visitor.visitWeekDiffFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MonthDiffFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public MonthDiff(): antlr.TerminalNode {
        return this.getToken(IdemParser.MonthDiff, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Comma(): antlr.TerminalNode {
        return this.getToken(IdemParser.Comma, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterMonthDiffFunctionCall) {
             listener.enterMonthDiffFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitMonthDiffFunctionCall) {
             listener.exitMonthDiffFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitMonthDiffFunctionCall) {
            return visitor.visitMonthDiffFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class YearDiffFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public YearDiff(): antlr.TerminalNode {
        return this.getToken(IdemParser.YearDiff, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Comma(): antlr.TerminalNode {
        return this.getToken(IdemParser.Comma, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterYearDiffFunctionCall) {
             listener.enterYearDiffFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitYearDiffFunctionCall) {
             listener.exitYearDiffFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitYearDiffFunctionCall) {
            return visitor.visitYearDiffFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class YearFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Year(): antlr.TerminalNode {
        return this.getToken(IdemParser.Year, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterYearFunctionCall) {
             listener.enterYearFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitYearFunctionCall) {
             listener.exitYearFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitYearFunctionCall) {
            return visitor.visitYearFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DayOfYearFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DayOfYear(): antlr.TerminalNode {
        return this.getToken(IdemParser.DayOfYear, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterDayOfYearFunctionCall) {
             listener.enterDayOfYearFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitDayOfYearFunctionCall) {
             listener.exitDayOfYearFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitDayOfYearFunctionCall) {
            return visitor.visitDayOfYearFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class WeekOfYearFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public WeekOfYear(): antlr.TerminalNode {
        return this.getToken(IdemParser.WeekOfYear, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterWeekOfYearFunctionCall) {
             listener.enterWeekOfYearFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitWeekOfYearFunctionCall) {
             listener.exitWeekOfYearFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitWeekOfYearFunctionCall) {
            return visitor.visitWeekOfYearFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MonthOfYearFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public MonthOfYear(): antlr.TerminalNode {
        return this.getToken(IdemParser.MonthOfYear, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterMonthOfYearFunctionCall) {
             listener.enterMonthOfYearFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitMonthOfYearFunctionCall) {
             listener.exitMonthOfYearFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitMonthOfYearFunctionCall) {
            return visitor.visitMonthOfYearFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DayOfMonthFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DayOfMonth(): antlr.TerminalNode {
        return this.getToken(IdemParser.DayOfMonth, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterDayOfMonthFunctionCall) {
             listener.enterDayOfMonthFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitDayOfMonthFunctionCall) {
             listener.exitDayOfMonthFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitDayOfMonthFunctionCall) {
            return visitor.visitDayOfMonthFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class WeekOfMonthFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public WeekOfMonth(): antlr.TerminalNode {
        return this.getToken(IdemParser.WeekOfMonth, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterWeekOfMonthFunctionCall) {
             listener.enterWeekOfMonthFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitWeekOfMonthFunctionCall) {
             listener.exitWeekOfMonthFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitWeekOfMonthFunctionCall) {
            return visitor.visitWeekOfMonthFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DayOfWeekFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DayOfWeek(): antlr.TerminalNode {
        return this.getToken(IdemParser.DayOfWeek, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterDayOfWeekFunctionCall) {
             listener.enterDayOfWeekFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitDayOfWeekFunctionCall) {
             listener.exitDayOfWeekFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitDayOfWeekFunctionCall) {
            return visitor.visitDayOfWeekFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TodayFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Today(): antlr.TerminalNode {
        return this.getToken(IdemParser.Today, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterTodayFunctionCall) {
             listener.enterTodayFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitTodayFunctionCall) {
             listener.exitTodayFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitTodayFunctionCall) {
            return visitor.visitTodayFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class YesterdayFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Yesterday(): antlr.TerminalNode {
        return this.getToken(IdemParser.Yesterday, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterYesterdayFunctionCall) {
             listener.enterYesterdayFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitYesterdayFunctionCall) {
             listener.exitYesterdayFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitYesterdayFunctionCall) {
            return visitor.visitYesterdayFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TomorrowFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Tomorrow(): antlr.TerminalNode {
        return this.getToken(IdemParser.Tomorrow, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterTomorrowFunctionCall) {
             listener.enterTomorrowFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitTomorrowFunctionCall) {
             listener.exitTomorrowFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitTomorrowFunctionCall) {
            return visitor.visitTomorrowFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BoolToIntFunctionCallContext extends FunctionCallContext {
    public constructor(ctx: FunctionCallContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BoolToInt(): antlr.TerminalNode {
        return this.getToken(IdemParser.BoolToInt, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterBoolToIntFunctionCall) {
             listener.enterBoolToIntFunctionCall(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitBoolToIntFunctionCall) {
             listener.exitBoolToIntFunctionCall(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitBoolToIntFunctionCall) {
            return visitor.visitBoolToIntFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_expression;
    }
    public override copyFrom(ctx: ExpressionContext): void {
        super.copyFrom(ctx);
    }
}
export class SelfExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Self(): antlr.TerminalNode {
        return this.getToken(IdemParser.Self, 0)!;
    }
    public tags(): TagsContext {
        return this.getRuleContext(0, TagsContext)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterSelfExpression) {
             listener.enterSelfExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitSelfExpression) {
             listener.exitSelfExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitSelfExpression) {
            return visitor.visitSelfExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UnaryMinusExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Subtract(): antlr.TerminalNode {
        return this.getToken(IdemParser.Subtract, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterUnaryMinusExpression) {
             listener.enterUnaryMinusExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitUnaryMinusExpression) {
             listener.exitUnaryMinusExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitUnaryMinusExpression) {
            return visitor.visitUnaryMinusExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NotExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Excl(): antlr.TerminalNode {
        return this.getToken(IdemParser.Excl, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterNotExpression) {
             listener.enterNotExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitNotExpression) {
             listener.exitNotExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitNotExpression) {
            return visitor.visitNotExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NumberExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Number(): antlr.TerminalNode {
        return this.getToken(IdemParser.Number, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterNumberExpression) {
             listener.enterNumberExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitNumberExpression) {
             listener.exitNumberExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitNumberExpression) {
            return visitor.visitNumberExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LocalDateExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LocalDate(): antlr.TerminalNode {
        return this.getToken(IdemParser.LocalDate, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterLocalDateExpression) {
             listener.enterLocalDateExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitLocalDateExpression) {
             listener.exitLocalDateExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitLocalDateExpression) {
            return visitor.visitLocalDateExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BoolExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Bool(): antlr.TerminalNode {
        return this.getToken(IdemParser.Bool, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterBoolExpression) {
             listener.enterBoolExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitBoolExpression) {
             listener.exitBoolExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitBoolExpression) {
            return visitor.visitBoolExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NullExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Null(): antlr.TerminalNode {
        return this.getToken(IdemParser.Null, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterNullExpression) {
             listener.enterNullExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitNullExpression) {
             listener.exitNullExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitNullExpression) {
            return visitor.visitNullExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ListExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public list(): ListContext {
        return this.getRuleContext(0, ListContext)!;
    }
    public indexes(): IndexesContext | null {
        return this.getRuleContext(0, IndexesContext);
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterListExpression) {
             listener.enterListExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitListExpression) {
             listener.exitListExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitListExpression) {
            return visitor.visitListExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class StringExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public String(): antlr.TerminalNode {
        return this.getToken(IdemParser.String, 0)!;
    }
    public indexes(): IndexesContext | null {
        return this.getRuleContext(0, IndexesContext);
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterStringExpression) {
             listener.enterStringExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitStringExpression) {
             listener.exitStringExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitStringExpression) {
            return visitor.visitStringExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ExpressionExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public pointers(): PointersContext | null {
        return this.getRuleContext(0, PointersContext);
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterExpressionExpression) {
             listener.enterExpressionExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitExpressionExpression) {
             listener.exitExpressionExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitExpressionExpression) {
            return visitor.visitExpressionExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PowerExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Pow(): antlr.TerminalNode {
        return this.getToken(IdemParser.Pow, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterPowerExpression) {
             listener.enterPowerExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitPowerExpression) {
             listener.exitPowerExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitPowerExpression) {
            return visitor.visitPowerExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MultiplyExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Multiply(): antlr.TerminalNode {
        return this.getToken(IdemParser.Multiply, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterMultiplyExpression) {
             listener.enterMultiplyExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitMultiplyExpression) {
             listener.exitMultiplyExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitMultiplyExpression) {
            return visitor.visitMultiplyExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DivideExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Divide(): antlr.TerminalNode {
        return this.getToken(IdemParser.Divide, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterDivideExpression) {
             listener.enterDivideExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitDivideExpression) {
             listener.exitDivideExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitDivideExpression) {
            return visitor.visitDivideExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ModulusExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Modulus(): antlr.TerminalNode {
        return this.getToken(IdemParser.Modulus, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterModulusExpression) {
             listener.enterModulusExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitModulusExpression) {
             listener.exitModulusExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitModulusExpression) {
            return visitor.visitModulusExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AddExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Add(): antlr.TerminalNode {
        return this.getToken(IdemParser.Add, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterAddExpression) {
             listener.enterAddExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitAddExpression) {
             listener.exitAddExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitAddExpression) {
            return visitor.visitAddExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class SubtractExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Subtract(): antlr.TerminalNode {
        return this.getToken(IdemParser.Subtract, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterSubtractExpression) {
             listener.enterSubtractExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitSubtractExpression) {
             listener.exitSubtractExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitSubtractExpression) {
            return visitor.visitSubtractExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class GtEqExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public GTEquals(): antlr.TerminalNode {
        return this.getToken(IdemParser.GTEquals, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterGtEqExpression) {
             listener.enterGtEqExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitGtEqExpression) {
             listener.exitGtEqExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitGtEqExpression) {
            return visitor.visitGtEqExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LtEqExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public LTEquals(): antlr.TerminalNode {
        return this.getToken(IdemParser.LTEquals, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterLtEqExpression) {
             listener.enterLtEqExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitLtEqExpression) {
             listener.exitLtEqExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitLtEqExpression) {
            return visitor.visitLtEqExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class GtExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public GT(): antlr.TerminalNode {
        return this.getToken(IdemParser.GT, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterGtExpression) {
             listener.enterGtExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitGtExpression) {
             listener.exitGtExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitGtExpression) {
            return visitor.visitGtExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LtExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public LT(): antlr.TerminalNode {
        return this.getToken(IdemParser.LT, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterLtExpression) {
             listener.enterLtExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitLtExpression) {
             listener.exitLtExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitLtExpression) {
            return visitor.visitLtExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class EqExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Equals(): antlr.TerminalNode {
        return this.getToken(IdemParser.Equals, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterEqExpression) {
             listener.enterEqExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitEqExpression) {
             listener.exitEqExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitEqExpression) {
            return visitor.visitEqExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NotEqExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public NEquals(): antlr.TerminalNode {
        return this.getToken(IdemParser.NEquals, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterNotEqExpression) {
             listener.enterNotEqExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitNotEqExpression) {
             listener.exitNotEqExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitNotEqExpression) {
            return visitor.visitNotEqExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AndExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public And(): antlr.TerminalNode {
        return this.getToken(IdemParser.And, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterAndExpression) {
             listener.enterAndExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitAndExpression) {
             listener.exitAndExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitAndExpression) {
            return visitor.visitAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class OrExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Or(): antlr.TerminalNode {
        return this.getToken(IdemParser.Or, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterOrExpression) {
             listener.enterOrExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitOrExpression) {
             listener.exitOrExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitOrExpression) {
            return visitor.visitOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TernaryExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public QMark(): antlr.TerminalNode {
        return this.getToken(IdemParser.QMark, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(IdemParser.Colon, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterTernaryExpression) {
             listener.enterTernaryExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitTernaryExpression) {
             listener.exitTernaryExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitTernaryExpression) {
            return visitor.visitTernaryExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class InExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public In(): antlr.TerminalNode {
        return this.getToken(IdemParser.In, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterInExpression) {
             listener.enterInExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitInExpression) {
             listener.exitInExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitInExpression) {
            return visitor.visitInExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AddDatePartExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public Add(): antlr.TerminalNode {
        return this.getToken(IdemParser.Add, 0)!;
    }
    public DatePart(): antlr.TerminalNode {
        return this.getToken(IdemParser.DatePart, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterAddDatePartExpression) {
             listener.enterAddDatePartExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitAddDatePartExpression) {
             listener.exitAddDatePartExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitAddDatePartExpression) {
            return visitor.visitAddDatePartExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class SubtractDatePartExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public Subtract(): antlr.TerminalNode {
        return this.getToken(IdemParser.Subtract, 0)!;
    }
    public DatePart(): antlr.TerminalNode {
        return this.getToken(IdemParser.DatePart, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterSubtractDatePartExpression) {
             listener.enterSubtractDatePartExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitSubtractDatePartExpression) {
             listener.exitSubtractDatePartExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitSubtractDatePartExpression) {
            return visitor.visitSubtractDatePartExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OBracket(): antlr.TerminalNode {
        return this.getToken(IdemParser.OBracket, 0)!;
    }
    public CBracket(): antlr.TerminalNode {
        return this.getToken(IdemParser.CBracket, 0)!;
    }
    public exprList(): ExprListContext | null {
        return this.getRuleContext(0, ExprListContext);
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_list;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterList) {
             listener.enterList(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitList) {
             listener.exitList(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitList) {
            return visitor.visitList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IndexesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OBracket(): antlr.TerminalNode[];
    public OBracket(i: number): antlr.TerminalNode | null;
    public OBracket(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(IdemParser.OBracket);
    	} else {
    		return this.getToken(IdemParser.OBracket, i);
    	}
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public CBracket(): antlr.TerminalNode[];
    public CBracket(i: number): antlr.TerminalNode | null;
    public CBracket(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(IdemParser.CBracket);
    	} else {
    		return this.getToken(IdemParser.CBracket, i);
    	}
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_indexes;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterIndexes) {
             listener.enterIndexes(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitIndexes) {
             listener.exitIndexes(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitIndexes) {
            return visitor.visitIndexes(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PointersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public pointer(): PointerContext[];
    public pointer(i: number): PointerContext | null;
    public pointer(i?: number): PointerContext[] | PointerContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PointerContext);
        }

        return this.getRuleContext(i, PointerContext);
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_pointers;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterPointers) {
             listener.enterPointers(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitPointers) {
             listener.exitPointers(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitPointers) {
            return visitor.visitPointers(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PointerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public tags(): TagsContext | null {
        return this.getRuleContext(0, TagsContext);
    }
    public indexes(): IndexesContext | null {
        return this.getRuleContext(0, IndexesContext);
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_pointer;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterPointer) {
             listener.enterPointer(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitPointer) {
             listener.exitPointer(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitPointer) {
            return visitor.visitPointer(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TagsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public feature(): FeatureContext[];
    public feature(i: number): FeatureContext | null;
    public feature(i?: number): FeatureContext[] | FeatureContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FeatureContext);
        }

        return this.getRuleContext(i, FeatureContext);
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_tags;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterTags) {
             listener.enterTags(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitTags) {
             listener.exitTags(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitTags) {
            return visitor.visitTags(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FeatureContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(IdemParser.Identifier, 0)!;
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_feature;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterFeature) {
             listener.enterFeature(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitFeature) {
             listener.exitFeature(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitFeature) {
            return visitor.visitFeature(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExprListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(IdemParser.Comma);
    	} else {
    		return this.getToken(IdemParser.Comma, i);
    	}
    }
    public override get ruleIndex(): number {
        return IdemParser.RULE_exprList;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterExprList) {
             listener.enterExprList(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitExprList) {
             listener.exitExprList(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitExprList) {
            return visitor.visitExprList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
