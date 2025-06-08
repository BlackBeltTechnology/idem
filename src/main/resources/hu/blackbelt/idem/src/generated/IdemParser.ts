
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
            this.state = 19;
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
            this.state = 45;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case IdemParser.Self:
                {
                localContext = new SelfExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 22;
                this.match(IdemParser.Self);
                this.state = 23;
                this.tags();
                }
                break;
            case IdemParser.Subtract:
                {
                localContext = new UnaryMinusExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 24;
                this.match(IdemParser.Subtract);
                this.state = 25;
                this.expression(33);
                }
                break;
            case IdemParser.Excl:
                {
                localContext = new NotExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 26;
                this.match(IdemParser.Excl);
                this.state = 27;
                this.expression(32);
                }
                break;
            case IdemParser.Number:
                {
                localContext = new NumberExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 28;
                this.match(IdemParser.Number);
                }
                break;
            case IdemParser.Bool:
                {
                localContext = new BoolExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 29;
                this.match(IdemParser.Bool);
                }
                break;
            case IdemParser.Null:
                {
                localContext = new NullExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 30;
                this.match(IdemParser.Null);
                }
                break;
            case IdemParser.OBracket:
                {
                localContext = new ListExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 31;
                this.list();
                }
                break;
            case IdemParser.String:
                {
                localContext = new StringExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 32;
                this.match(IdemParser.String);
                }
                break;
            case IdemParser.LocalDate:
                {
                localContext = new LocalDateExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 33;
                this.match(IdemParser.LocalDate);
                }
                break;
            case IdemParser.Timestamp:
                {
                localContext = new TimestampExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 34;
                this.match(IdemParser.Timestamp);
                }
                break;
            case IdemParser.Time:
                {
                localContext = new TimeExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 35;
                this.match(IdemParser.Time);
                }
                break;
            case IdemParser.Today:
                {
                localContext = new TodayExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 36;
                this.match(IdemParser.Today);
                }
                break;
            case IdemParser.Yesterday:
                {
                localContext = new YesterdayExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 37;
                this.match(IdemParser.Yesterday);
                }
                break;
            case IdemParser.Tomorrow:
                {
                localContext = new TomorrowExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 38;
                this.match(IdemParser.Tomorrow);
                }
                break;
            case IdemParser.OParen:
                {
                localContext = new ExpressionExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 39;
                this.match(IdemParser.OParen);
                this.state = 40;
                this.expression(0);
                this.state = 41;
                this.match(IdemParser.CParen);
                this.state = 43;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
                case 1:
                    {
                    this.state = 42;
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
            this.state = 116;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 114;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
                    case 1:
                        {
                        localContext = new PowerExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 47;
                        if (!(this.precpred(this.context, 31))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 31)");
                        }
                        this.state = 48;
                        this.match(IdemParser.Pow);
                        this.state = 49;
                        this.expression(32);
                        }
                        break;
                    case 2:
                        {
                        localContext = new MultiplyExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 50;
                        if (!(this.precpred(this.context, 29))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 29)");
                        }
                        this.state = 51;
                        this.match(IdemParser.Multiply);
                        this.state = 52;
                        this.expression(30);
                        }
                        break;
                    case 3:
                        {
                        localContext = new DivideExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 53;
                        if (!(this.precpred(this.context, 28))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 28)");
                        }
                        this.state = 54;
                        this.match(IdemParser.Divide);
                        this.state = 55;
                        this.expression(29);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ModulusExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 56;
                        if (!(this.precpred(this.context, 27))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 27)");
                        }
                        this.state = 57;
                        this.match(IdemParser.Modulus);
                        this.state = 58;
                        this.expression(28);
                        }
                        break;
                    case 5:
                        {
                        localContext = new AddExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 59;
                        if (!(this.precpred(this.context, 26))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 26)");
                        }
                        this.state = 60;
                        this.match(IdemParser.Add);
                        this.state = 61;
                        this.expression(27);
                        }
                        break;
                    case 6:
                        {
                        localContext = new SubtractExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 62;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 63;
                        this.match(IdemParser.Subtract);
                        this.state = 64;
                        this.expression(26);
                        }
                        break;
                    case 7:
                        {
                        localContext = new GtEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 65;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 66;
                        this.match(IdemParser.GTEquals);
                        this.state = 67;
                        this.expression(23);
                        }
                        break;
                    case 8:
                        {
                        localContext = new LtEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 68;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 69;
                        this.match(IdemParser.LTEquals);
                        this.state = 70;
                        this.expression(22);
                        }
                        break;
                    case 9:
                        {
                        localContext = new GtExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 71;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 72;
                        this.match(IdemParser.GT);
                        this.state = 73;
                        this.expression(21);
                        }
                        break;
                    case 10:
                        {
                        localContext = new LtExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 74;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 75;
                        this.match(IdemParser.LT);
                        this.state = 76;
                        this.expression(20);
                        }
                        break;
                    case 11:
                        {
                        localContext = new EqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 77;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 78;
                        this.match(IdemParser.Equals);
                        this.state = 79;
                        this.expression(19);
                        }
                        break;
                    case 12:
                        {
                        localContext = new NotEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 80;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 81;
                        this.match(IdemParser.NEquals);
                        this.state = 82;
                        this.expression(18);
                        }
                        break;
                    case 13:
                        {
                        localContext = new AndExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 83;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 84;
                        this.match(IdemParser.And);
                        this.state = 85;
                        this.expression(17);
                        }
                        break;
                    case 14:
                        {
                        localContext = new OrExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 86;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 87;
                        this.match(IdemParser.Or);
                        this.state = 88;
                        this.expression(16);
                        }
                        break;
                    case 15:
                        {
                        localContext = new TernaryExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 89;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 90;
                        this.match(IdemParser.QMark);
                        this.state = 91;
                        this.expression(0);
                        this.state = 92;
                        this.match(IdemParser.Colon);
                        this.state = 93;
                        this.expression(15);
                        }
                        break;
                    case 16:
                        {
                        localContext = new InExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 95;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 96;
                        this.match(IdemParser.In);
                        this.state = 97;
                        this.expression(14);
                        }
                        break;
                    case 17:
                        {
                        localContext = new PostfixFunctionCallExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 98;
                        if (!(this.precpred(this.context, 35))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 35)");
                        }
                        this.state = 99;
                        this.match(IdemParser.Excl);
                        this.state = 100;
                        this.match(IdemParser.Identifier);
                        this.state = 101;
                        this.match(IdemParser.OParen);
                        this.state = 103;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 42500340) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 125) !== 0)) {
                            {
                            this.state = 102;
                            this.exprList();
                            }
                        }

                        this.state = 105;
                        this.match(IdemParser.CParen);
                        }
                        break;
                    case 18:
                        {
                        localContext = new IndexedAccessExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 106;
                        if (!(this.precpred(this.context, 30))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 30)");
                        }
                        this.state = 107;
                        this.indexes();
                        }
                        break;
                    case 19:
                        {
                        localContext = new AddDatePartExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 108;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 109;
                        this.match(IdemParser.Add);
                        this.state = 110;
                        this.match(IdemParser.DatePart);
                        }
                        break;
                    case 20:
                        {
                        localContext = new SubtractDatePartExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 111;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 112;
                        this.match(IdemParser.Subtract);
                        this.state = 113;
                        this.match(IdemParser.DatePart);
                        }
                        break;
                    }
                    }
                }
                this.state = 118;
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
            this.state = 119;
            this.match(IdemParser.OBracket);
            this.state = 121;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 42500340) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 125) !== 0)) {
                {
                this.state = 120;
                this.exprList();
                }
            }

            this.state = 123;
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
            this.state = 129;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 125;
                    this.match(IdemParser.OBracket);
                    this.state = 126;
                    this.expression(0);
                    this.state = 127;
                    this.match(IdemParser.CBracket);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 131;
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
            this.state = 134;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 133;
                    this.pointer();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 136;
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
            this.state = 140;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case IdemParser.T__0:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 138;
                this.tags();
                }
                break;
            case IdemParser.OBracket:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 139;
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
            this.state = 144;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 142;
                    this.match(IdemParser.T__0);
                    this.state = 143;
                    this.feature();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 146;
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
            this.state = 148;
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
            this.state = 150;
            this.expression(0);
            this.state = 155;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 29) {
                {
                {
                this.state = 151;
                this.match(IdemParser.Comma);
                this.state = 152;
                this.expression(0);
                }
                }
                this.state = 157;
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
        4,1,40,159,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,44,8,1,
        3,1,46,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,104,8,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,115,8,1,10,1,12,1,118,9,1,1,2,1,2,
        3,2,122,8,2,1,2,1,2,1,3,1,3,1,3,1,3,4,3,130,8,3,11,3,12,3,131,1,
        4,4,4,135,8,4,11,4,12,4,136,1,5,1,5,3,5,141,8,5,1,6,1,6,4,6,145,
        8,6,11,6,12,6,146,1,7,1,7,1,8,1,8,1,8,5,8,154,8,8,10,8,12,8,157,
        9,8,1,8,0,1,2,9,0,2,4,6,8,10,12,14,16,0,0,191,0,18,1,0,0,0,2,45,
        1,0,0,0,4,119,1,0,0,0,6,129,1,0,0,0,8,134,1,0,0,0,10,140,1,0,0,0,
        12,144,1,0,0,0,14,148,1,0,0,0,16,150,1,0,0,0,18,19,3,2,1,0,19,20,
        5,0,0,1,20,1,1,0,0,0,21,22,6,1,-1,0,22,23,5,2,0,0,23,46,3,12,6,0,
        24,25,5,19,0,0,25,46,3,2,1,33,26,27,5,15,0,0,27,46,3,2,1,32,28,46,
        5,34,0,0,29,46,5,32,0,0,30,46,5,4,0,0,31,46,3,4,2,0,32,46,5,35,0,
        0,33,46,5,36,0,0,34,46,5,37,0,0,35,46,5,38,0,0,36,46,5,5,0,0,37,
        46,5,6,0,0,38,46,5,7,0,0,39,40,5,25,0,0,40,41,3,2,1,0,41,43,5,26,
        0,0,42,44,3,8,4,0,43,42,1,0,0,0,43,44,1,0,0,0,44,46,1,0,0,0,45,21,
        1,0,0,0,45,24,1,0,0,0,45,26,1,0,0,0,45,28,1,0,0,0,45,29,1,0,0,0,
        45,30,1,0,0,0,45,31,1,0,0,0,45,32,1,0,0,0,45,33,1,0,0,0,45,34,1,
        0,0,0,45,35,1,0,0,0,45,36,1,0,0,0,45,37,1,0,0,0,45,38,1,0,0,0,45,
        39,1,0,0,0,46,116,1,0,0,0,47,48,10,31,0,0,48,49,5,14,0,0,49,115,
        3,2,1,32,50,51,10,29,0,0,51,52,5,20,0,0,52,115,3,2,1,30,53,54,10,
        28,0,0,54,55,5,21,0,0,55,115,3,2,1,29,56,57,10,27,0,0,57,58,5,22,
        0,0,58,115,3,2,1,28,59,60,10,26,0,0,60,61,5,18,0,0,61,115,3,2,1,
        27,62,63,10,25,0,0,63,64,5,19,0,0,64,115,3,2,1,26,65,66,10,22,0,
        0,66,67,5,12,0,0,67,115,3,2,1,23,68,69,10,21,0,0,69,70,5,13,0,0,
        70,115,3,2,1,22,71,72,10,20,0,0,72,73,5,16,0,0,73,115,3,2,1,21,74,
        75,10,19,0,0,75,76,5,17,0,0,76,115,3,2,1,20,77,78,10,18,0,0,78,79,
        5,10,0,0,79,115,3,2,1,19,80,81,10,17,0,0,81,82,5,11,0,0,82,115,3,
        2,1,18,83,84,10,16,0,0,84,85,5,9,0,0,85,115,3,2,1,17,86,87,10,15,
        0,0,87,88,5,8,0,0,88,115,3,2,1,16,89,90,10,14,0,0,90,91,5,30,0,0,
        91,92,3,2,1,0,92,93,5,31,0,0,93,94,3,2,1,15,94,115,1,0,0,0,95,96,
        10,13,0,0,96,97,5,3,0,0,97,115,3,2,1,14,98,99,10,35,0,0,99,100,5,
        15,0,0,100,101,5,33,0,0,101,103,5,25,0,0,102,104,3,16,8,0,103,102,
        1,0,0,0,103,104,1,0,0,0,104,105,1,0,0,0,105,115,5,26,0,0,106,107,
        10,30,0,0,107,115,3,6,3,0,108,109,10,24,0,0,109,110,5,18,0,0,110,
        115,5,39,0,0,111,112,10,23,0,0,112,113,5,19,0,0,113,115,5,39,0,0,
        114,47,1,0,0,0,114,50,1,0,0,0,114,53,1,0,0,0,114,56,1,0,0,0,114,
        59,1,0,0,0,114,62,1,0,0,0,114,65,1,0,0,0,114,68,1,0,0,0,114,71,1,
        0,0,0,114,74,1,0,0,0,114,77,1,0,0,0,114,80,1,0,0,0,114,83,1,0,0,
        0,114,86,1,0,0,0,114,89,1,0,0,0,114,95,1,0,0,0,114,98,1,0,0,0,114,
        106,1,0,0,0,114,108,1,0,0,0,114,111,1,0,0,0,115,118,1,0,0,0,116,
        114,1,0,0,0,116,117,1,0,0,0,117,3,1,0,0,0,118,116,1,0,0,0,119,121,
        5,23,0,0,120,122,3,16,8,0,121,120,1,0,0,0,121,122,1,0,0,0,122,123,
        1,0,0,0,123,124,5,24,0,0,124,5,1,0,0,0,125,126,5,23,0,0,126,127,
        3,2,1,0,127,128,5,24,0,0,128,130,1,0,0,0,129,125,1,0,0,0,130,131,
        1,0,0,0,131,129,1,0,0,0,131,132,1,0,0,0,132,7,1,0,0,0,133,135,3,
        10,5,0,134,133,1,0,0,0,135,136,1,0,0,0,136,134,1,0,0,0,136,137,1,
        0,0,0,137,9,1,0,0,0,138,141,3,12,6,0,139,141,3,6,3,0,140,138,1,0,
        0,0,140,139,1,0,0,0,141,11,1,0,0,0,142,143,5,1,0,0,143,145,3,14,
        7,0,144,142,1,0,0,0,145,146,1,0,0,0,146,144,1,0,0,0,146,147,1,0,
        0,0,147,13,1,0,0,0,148,149,5,33,0,0,149,15,1,0,0,0,150,155,3,2,1,
        0,151,152,5,29,0,0,152,154,3,2,1,0,153,151,1,0,0,0,154,157,1,0,0,
        0,155,153,1,0,0,0,155,156,1,0,0,0,156,17,1,0,0,0,157,155,1,0,0,0,
        11,43,45,103,114,116,121,131,136,140,146,155
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
