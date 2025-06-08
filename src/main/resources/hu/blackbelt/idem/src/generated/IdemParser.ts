
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
    public static readonly In = 3;
    public static readonly Null = 4;
    public static readonly Today = 5;
    public static readonly Yesterday = 6;
    public static readonly Tomorrow = 7;
    public static readonly Or = 8;
    public static readonly And = 9;
    public static readonly Equals = 10;
    public static readonly NEquals = 11;
    public static readonly GTEquals = 12;
    public static readonly LTEquals = 13;
    public static readonly Pow = 14;
    public static readonly Excl = 15;
    public static readonly GT = 16;
    public static readonly LT = 17;
    public static readonly Add = 18;
    public static readonly Subtract = 19;
    public static readonly Multiply = 20;
    public static readonly Divide = 21;
    public static readonly Modulus = 22;
    public static readonly OBracket = 23;
    public static readonly CBracket = 24;
    public static readonly OParen = 25;
    public static readonly CParen = 26;
    public static readonly SColon = 27;
    public static readonly Assign = 28;
    public static readonly Comma = 29;
    public static readonly QMark = 30;
    public static readonly Colon = 31;
    public static readonly Bool = 32;
    public static readonly Identifier = 33;
    public static readonly Number = 34;
    public static readonly String = 35;
    public static readonly LocalDate = 36;
    public static readonly Timestamp = 37;
    public static readonly Time = 38;
    public static readonly DatePart = 39;
    public static readonly Space = 40;
    public static readonly RULE_parse = 0;
    public static readonly RULE_expression = 1;
    public static readonly RULE_list = 2;
    public static readonly RULE_indexes = 3;
    public static readonly RULE_pointers = 4;
    public static readonly RULE_pointer = 5;
    public static readonly RULE_tags = 6;
    public static readonly RULE_feature = 7;
    public static readonly RULE_exprList = 8;

    public static readonly literalNames = [
        null, "'.'", "'self'", "'in'", "'null'", "'today'", "'yesterday'", 
        "'tomorrow'", "'||'", "'&&'", "'=='", "'!='", "'>='", "'<='", "'^'", 
        "'!'", "'>'", "'<'", "'+'", "'-'", "'*'", "'/'", "'%'", "'['", "']'", 
        "'('", "')'", "';'", "'='", "','", "'?'", "':'"
    ];

    public static readonly symbolicNames = [
        null, null, "Self", "In", "Null", "Today", "Yesterday", "Tomorrow", 
        "Or", "And", "Equals", "NEquals", "GTEquals", "LTEquals", "Pow", 
        "Excl", "GT", "LT", "Add", "Subtract", "Multiply", "Divide", "Modulus", 
        "OBracket", "CBracket", "OParen", "CParen", "SColon", "Assign", 
        "Comma", "QMark", "Colon", "Bool", "Identifier", "Number", "String", 
        "LocalDate", "Timestamp", "Time", "DatePart", "Space"
    ];
    public static readonly ruleNames = [
        "parse", "expression", "list", "indexes", "pointers", "pointer", 
        "tags", "feature", "exprList",
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
            this.state = 18;
            this.expression(0);
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
        let _startState = 2;
        this.enterRecursionRule(localContext, 2, IdemParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 44;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case IdemParser.Self:
                {
                localContext = new SelfExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 21;
                this.match(IdemParser.Self);
                this.state = 22;
                this.tags();
                }
                break;
            case IdemParser.Subtract:
                {
                localContext = new UnaryMinusExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 23;
                this.match(IdemParser.Subtract);
                this.state = 24;
                this.expression(33);
                }
                break;
            case IdemParser.Excl:
                {
                localContext = new NotExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 25;
                this.match(IdemParser.Excl);
                this.state = 26;
                this.expression(32);
                }
                break;
            case IdemParser.Number:
                {
                localContext = new NumberExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 27;
                this.match(IdemParser.Number);
                }
                break;
            case IdemParser.Bool:
                {
                localContext = new BoolExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 28;
                this.match(IdemParser.Bool);
                }
                break;
            case IdemParser.Null:
                {
                localContext = new NullExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 29;
                this.match(IdemParser.Null);
                }
                break;
            case IdemParser.OBracket:
                {
                localContext = new ListExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 30;
                this.list();
                }
                break;
            case IdemParser.String:
                {
                localContext = new StringExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 31;
                this.match(IdemParser.String);
                }
                break;
            case IdemParser.LocalDate:
                {
                localContext = new LocalDateExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 32;
                this.match(IdemParser.LocalDate);
                }
                break;
            case IdemParser.Timestamp:
                {
                localContext = new TimestampExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 33;
                this.match(IdemParser.Timestamp);
                }
                break;
            case IdemParser.Time:
                {
                localContext = new TimeExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 34;
                this.match(IdemParser.Time);
                }
                break;
            case IdemParser.Today:
                {
                localContext = new TodayExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 35;
                this.match(IdemParser.Today);
                }
                break;
            case IdemParser.Yesterday:
                {
                localContext = new YesterdayExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 36;
                this.match(IdemParser.Yesterday);
                }
                break;
            case IdemParser.Tomorrow:
                {
                localContext = new TomorrowExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 37;
                this.match(IdemParser.Tomorrow);
                }
                break;
            case IdemParser.OParen:
                {
                localContext = new ExpressionExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 38;
                this.match(IdemParser.OParen);
                this.state = 39;
                this.expression(0);
                this.state = 40;
                this.match(IdemParser.CParen);
                this.state = 42;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
                case 1:
                    {
                    this.state = 41;
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
            this.state = 115;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 113;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
                    case 1:
                        {
                        localContext = new PowerExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 46;
                        if (!(this.precpred(this.context, 31))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 31)");
                        }
                        this.state = 47;
                        this.match(IdemParser.Pow);
                        this.state = 48;
                        this.expression(32);
                        }
                        break;
                    case 2:
                        {
                        localContext = new MultiplyExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 49;
                        if (!(this.precpred(this.context, 29))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 29)");
                        }
                        this.state = 50;
                        this.match(IdemParser.Multiply);
                        this.state = 51;
                        this.expression(30);
                        }
                        break;
                    case 3:
                        {
                        localContext = new DivideExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 52;
                        if (!(this.precpred(this.context, 28))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 28)");
                        }
                        this.state = 53;
                        this.match(IdemParser.Divide);
                        this.state = 54;
                        this.expression(29);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ModulusExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 55;
                        if (!(this.precpred(this.context, 27))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 27)");
                        }
                        this.state = 56;
                        this.match(IdemParser.Modulus);
                        this.state = 57;
                        this.expression(28);
                        }
                        break;
                    case 5:
                        {
                        localContext = new AddExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 58;
                        if (!(this.precpred(this.context, 26))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 26)");
                        }
                        this.state = 59;
                        this.match(IdemParser.Add);
                        this.state = 60;
                        this.expression(27);
                        }
                        break;
                    case 6:
                        {
                        localContext = new SubtractExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 61;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 62;
                        this.match(IdemParser.Subtract);
                        this.state = 63;
                        this.expression(26);
                        }
                        break;
                    case 7:
                        {
                        localContext = new GtEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 64;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 65;
                        this.match(IdemParser.GTEquals);
                        this.state = 66;
                        this.expression(23);
                        }
                        break;
                    case 8:
                        {
                        localContext = new LtEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 67;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 68;
                        this.match(IdemParser.LTEquals);
                        this.state = 69;
                        this.expression(22);
                        }
                        break;
                    case 9:
                        {
                        localContext = new GtExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 70;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 71;
                        this.match(IdemParser.GT);
                        this.state = 72;
                        this.expression(21);
                        }
                        break;
                    case 10:
                        {
                        localContext = new LtExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 73;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 74;
                        this.match(IdemParser.LT);
                        this.state = 75;
                        this.expression(20);
                        }
                        break;
                    case 11:
                        {
                        localContext = new EqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 76;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 77;
                        this.match(IdemParser.Equals);
                        this.state = 78;
                        this.expression(19);
                        }
                        break;
                    case 12:
                        {
                        localContext = new NotEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 79;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 80;
                        this.match(IdemParser.NEquals);
                        this.state = 81;
                        this.expression(18);
                        }
                        break;
                    case 13:
                        {
                        localContext = new AndExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 82;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 83;
                        this.match(IdemParser.And);
                        this.state = 84;
                        this.expression(17);
                        }
                        break;
                    case 14:
                        {
                        localContext = new OrExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 85;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 86;
                        this.match(IdemParser.Or);
                        this.state = 87;
                        this.expression(16);
                        }
                        break;
                    case 15:
                        {
                        localContext = new TernaryExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 88;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 89;
                        this.match(IdemParser.QMark);
                        this.state = 90;
                        this.expression(0);
                        this.state = 91;
                        this.match(IdemParser.Colon);
                        this.state = 92;
                        this.expression(15);
                        }
                        break;
                    case 16:
                        {
                        localContext = new InExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 94;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 95;
                        this.match(IdemParser.In);
                        this.state = 96;
                        this.expression(14);
                        }
                        break;
                    case 17:
                        {
                        localContext = new PostfixFunctionCallExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 97;
                        if (!(this.precpred(this.context, 35))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 35)");
                        }
                        this.state = 98;
                        this.match(IdemParser.Excl);
                        this.state = 99;
                        this.match(IdemParser.Identifier);
                        this.state = 100;
                        this.match(IdemParser.OParen);
                        this.state = 102;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 42500340) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 125) !== 0)) {
                            {
                            this.state = 101;
                            this.exprList();
                            }
                        }

                        this.state = 104;
                        this.match(IdemParser.CParen);
                        }
                        break;
                    case 18:
                        {
                        localContext = new IndexedAccessExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 105;
                        if (!(this.precpred(this.context, 30))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 30)");
                        }
                        this.state = 106;
                        this.indexes();
                        }
                        break;
                    case 19:
                        {
                        localContext = new AddDatePartExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 107;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 108;
                        this.match(IdemParser.Add);
                        this.state = 109;
                        this.match(IdemParser.DatePart);
                        }
                        break;
                    case 20:
                        {
                        localContext = new SubtractDatePartExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 110;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 111;
                        this.match(IdemParser.Subtract);
                        this.state = 112;
                        this.match(IdemParser.DatePart);
                        }
                        break;
                    }
                    }
                }
                this.state = 117;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
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
        this.enterRule(localContext, 4, IdemParser.RULE_list);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 118;
            this.match(IdemParser.OBracket);
            this.state = 120;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 42500340) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 125) !== 0)) {
                {
                this.state = 119;
                this.exprList();
                }
            }

            this.state = 122;
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
        this.enterRule(localContext, 6, IdemParser.RULE_indexes);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 128;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 124;
                    this.match(IdemParser.OBracket);
                    this.state = 125;
                    this.expression(0);
                    this.state = 126;
                    this.match(IdemParser.CBracket);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 130;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 6, this.context);
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
        this.enterRule(localContext, 8, IdemParser.RULE_pointers);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 133;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 132;
                    this.pointer();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 135;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
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
        this.enterRule(localContext, 10, IdemParser.RULE_pointer);
        try {
            this.state = 139;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case IdemParser.T__0:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 137;
                this.tags();
                }
                break;
            case IdemParser.OBracket:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 138;
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
        this.enterRule(localContext, 12, IdemParser.RULE_tags);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 143;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 141;
                    this.match(IdemParser.T__0);
                    this.state = 142;
                    this.feature();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 145;
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
    public feature(): FeatureContext {
        let localContext = new FeatureContext(this.context, this.state);
        this.enterRule(localContext, 14, IdemParser.RULE_feature);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 147;
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
        this.enterRule(localContext, 16, IdemParser.RULE_exprList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 149;
            this.expression(0);
            this.state = 154;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 29) {
                {
                {
                this.state = 150;
                this.match(IdemParser.Comma);
                this.state = 151;
                this.expression(0);
                }
                }
                this.state = 156;
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
        case 1:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 31);
        case 1:
            return this.precpred(this.context, 29);
        case 2:
            return this.precpred(this.context, 28);
        case 3:
            return this.precpred(this.context, 27);
        case 4:
            return this.precpred(this.context, 26);
        case 5:
            return this.precpred(this.context, 25);
        case 6:
            return this.precpred(this.context, 22);
        case 7:
            return this.precpred(this.context, 21);
        case 8:
            return this.precpred(this.context, 20);
        case 9:
            return this.precpred(this.context, 19);
        case 10:
            return this.precpred(this.context, 18);
        case 11:
            return this.precpred(this.context, 17);
        case 12:
            return this.precpred(this.context, 16);
        case 13:
            return this.precpred(this.context, 15);
        case 14:
            return this.precpred(this.context, 14);
        case 15:
            return this.precpred(this.context, 13);
        case 16:
            return this.precpred(this.context, 35);
        case 17:
            return this.precpred(this.context, 30);
        case 18:
            return this.precpred(this.context, 24);
        case 19:
            return this.precpred(this.context, 23);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,40,158,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,43,8,1,3,1,
        45,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,103,8,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,5,1,114,8,1,10,1,12,1,117,9,1,1,2,1,2,3,2,
        121,8,2,1,2,1,2,1,3,1,3,1,3,1,3,4,3,129,8,3,11,3,12,3,130,1,4,4,
        4,134,8,4,11,4,12,4,135,1,5,1,5,3,5,140,8,5,1,6,1,6,4,6,144,8,6,
        11,6,12,6,145,1,7,1,7,1,8,1,8,1,8,5,8,153,8,8,10,8,12,8,156,9,8,
        1,8,0,1,2,9,0,2,4,6,8,10,12,14,16,0,0,190,0,18,1,0,0,0,2,44,1,0,
        0,0,4,118,1,0,0,0,6,128,1,0,0,0,8,133,1,0,0,0,10,139,1,0,0,0,12,
        143,1,0,0,0,14,147,1,0,0,0,16,149,1,0,0,0,18,19,3,2,1,0,19,1,1,0,
        0,0,20,21,6,1,-1,0,21,22,5,2,0,0,22,45,3,12,6,0,23,24,5,19,0,0,24,
        45,3,2,1,33,25,26,5,15,0,0,26,45,3,2,1,32,27,45,5,34,0,0,28,45,5,
        32,0,0,29,45,5,4,0,0,30,45,3,4,2,0,31,45,5,35,0,0,32,45,5,36,0,0,
        33,45,5,37,0,0,34,45,5,38,0,0,35,45,5,5,0,0,36,45,5,6,0,0,37,45,
        5,7,0,0,38,39,5,25,0,0,39,40,3,2,1,0,40,42,5,26,0,0,41,43,3,8,4,
        0,42,41,1,0,0,0,42,43,1,0,0,0,43,45,1,0,0,0,44,20,1,0,0,0,44,23,
        1,0,0,0,44,25,1,0,0,0,44,27,1,0,0,0,44,28,1,0,0,0,44,29,1,0,0,0,
        44,30,1,0,0,0,44,31,1,0,0,0,44,32,1,0,0,0,44,33,1,0,0,0,44,34,1,
        0,0,0,44,35,1,0,0,0,44,36,1,0,0,0,44,37,1,0,0,0,44,38,1,0,0,0,45,
        115,1,0,0,0,46,47,10,31,0,0,47,48,5,14,0,0,48,114,3,2,1,32,49,50,
        10,29,0,0,50,51,5,20,0,0,51,114,3,2,1,30,52,53,10,28,0,0,53,54,5,
        21,0,0,54,114,3,2,1,29,55,56,10,27,0,0,56,57,5,22,0,0,57,114,3,2,
        1,28,58,59,10,26,0,0,59,60,5,18,0,0,60,114,3,2,1,27,61,62,10,25,
        0,0,62,63,5,19,0,0,63,114,3,2,1,26,64,65,10,22,0,0,65,66,5,12,0,
        0,66,114,3,2,1,23,67,68,10,21,0,0,68,69,5,13,0,0,69,114,3,2,1,22,
        70,71,10,20,0,0,71,72,5,16,0,0,72,114,3,2,1,21,73,74,10,19,0,0,74,
        75,5,17,0,0,75,114,3,2,1,20,76,77,10,18,0,0,77,78,5,10,0,0,78,114,
        3,2,1,19,79,80,10,17,0,0,80,81,5,11,0,0,81,114,3,2,1,18,82,83,10,
        16,0,0,83,84,5,9,0,0,84,114,3,2,1,17,85,86,10,15,0,0,86,87,5,8,0,
        0,87,114,3,2,1,16,88,89,10,14,0,0,89,90,5,30,0,0,90,91,3,2,1,0,91,
        92,5,31,0,0,92,93,3,2,1,15,93,114,1,0,0,0,94,95,10,13,0,0,95,96,
        5,3,0,0,96,114,3,2,1,14,97,98,10,35,0,0,98,99,5,15,0,0,99,100,5,
        33,0,0,100,102,5,25,0,0,101,103,3,16,8,0,102,101,1,0,0,0,102,103,
        1,0,0,0,103,104,1,0,0,0,104,114,5,26,0,0,105,106,10,30,0,0,106,114,
        3,6,3,0,107,108,10,24,0,0,108,109,5,18,0,0,109,114,5,39,0,0,110,
        111,10,23,0,0,111,112,5,19,0,0,112,114,5,39,0,0,113,46,1,0,0,0,113,
        49,1,0,0,0,113,52,1,0,0,0,113,55,1,0,0,0,113,58,1,0,0,0,113,61,1,
        0,0,0,113,64,1,0,0,0,113,67,1,0,0,0,113,70,1,0,0,0,113,73,1,0,0,
        0,113,76,1,0,0,0,113,79,1,0,0,0,113,82,1,0,0,0,113,85,1,0,0,0,113,
        88,1,0,0,0,113,94,1,0,0,0,113,97,1,0,0,0,113,105,1,0,0,0,113,107,
        1,0,0,0,113,110,1,0,0,0,114,117,1,0,0,0,115,113,1,0,0,0,115,116,
        1,0,0,0,116,3,1,0,0,0,117,115,1,0,0,0,118,120,5,23,0,0,119,121,3,
        16,8,0,120,119,1,0,0,0,120,121,1,0,0,0,121,122,1,0,0,0,122,123,5,
        24,0,0,123,5,1,0,0,0,124,125,5,23,0,0,125,126,3,2,1,0,126,127,5,
        24,0,0,127,129,1,0,0,0,128,124,1,0,0,0,129,130,1,0,0,0,130,128,1,
        0,0,0,130,131,1,0,0,0,131,7,1,0,0,0,132,134,3,10,5,0,133,132,1,0,
        0,0,134,135,1,0,0,0,135,133,1,0,0,0,135,136,1,0,0,0,136,9,1,0,0,
        0,137,140,3,12,6,0,138,140,3,6,3,0,139,137,1,0,0,0,139,138,1,0,0,
        0,140,11,1,0,0,0,141,142,5,1,0,0,142,144,3,14,7,0,143,141,1,0,0,
        0,144,145,1,0,0,0,145,143,1,0,0,0,145,146,1,0,0,0,146,13,1,0,0,0,
        147,148,5,33,0,0,148,15,1,0,0,0,149,154,3,2,1,0,150,151,5,29,0,0,
        151,153,3,2,1,0,152,150,1,0,0,0,153,156,1,0,0,0,154,152,1,0,0,0,
        154,155,1,0,0,0,155,17,1,0,0,0,156,154,1,0,0,0,11,42,44,102,113,
        115,120,130,135,139,145,154
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
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
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
export class TimestampExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Timestamp(): antlr.TerminalNode {
        return this.getToken(IdemParser.Timestamp, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterTimestampExpression) {
             listener.enterTimestampExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitTimestampExpression) {
             listener.exitTimestampExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitTimestampExpression) {
            return visitor.visitTimestampExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TimeExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Time(): antlr.TerminalNode {
        return this.getToken(IdemParser.Time, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterTimeExpression) {
             listener.enterTimeExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitTimeExpression) {
             listener.exitTimeExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitTimeExpression) {
            return visitor.visitTimeExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TodayExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Today(): antlr.TerminalNode {
        return this.getToken(IdemParser.Today, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterTodayExpression) {
             listener.enterTodayExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitTodayExpression) {
             listener.exitTodayExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitTodayExpression) {
            return visitor.visitTodayExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class YesterdayExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Yesterday(): antlr.TerminalNode {
        return this.getToken(IdemParser.Yesterday, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterYesterdayExpression) {
             listener.enterYesterdayExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitYesterdayExpression) {
             listener.exitYesterdayExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitYesterdayExpression) {
            return visitor.visitYesterdayExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TomorrowExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Tomorrow(): antlr.TerminalNode {
        return this.getToken(IdemParser.Tomorrow, 0)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterTomorrowExpression) {
             listener.enterTomorrowExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitTomorrowExpression) {
             listener.exitTomorrowExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitTomorrowExpression) {
            return visitor.visitTomorrowExpression(this);
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
export class PostfixFunctionCallExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public Excl(): antlr.TerminalNode {
        return this.getToken(IdemParser.Excl, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(IdemParser.Identifier, 0)!;
    }
    public OParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.OParen, 0)!;
    }
    public CParen(): antlr.TerminalNode {
        return this.getToken(IdemParser.CParen, 0)!;
    }
    public exprList(): ExprListContext | null {
        return this.getRuleContext(0, ExprListContext);
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterPostfixFunctionCallExpression) {
             listener.enterPostfixFunctionCallExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitPostfixFunctionCallExpression) {
             listener.exitPostfixFunctionCallExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitPostfixFunctionCallExpression) {
            return visitor.visitPostfixFunctionCallExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IndexedAccessExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public indexes(): IndexesContext {
        return this.getRuleContext(0, IndexesContext)!;
    }
    public override enterRule(listener: IdemListener): void {
        if(listener.enterIndexedAccessExpression) {
             listener.enterIndexedAccessExpression(this);
        }
    }
    public override exitRule(listener: IdemListener): void {
        if(listener.exitIndexedAccessExpression) {
             listener.exitIndexedAccessExpression(this);
        }
    }
    public override accept<Result>(visitor: IdemVisitor<Result>): Result | null {
        if (visitor.visitIndexedAccessExpression) {
            return visitor.visitIndexedAccessExpression(this);
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
