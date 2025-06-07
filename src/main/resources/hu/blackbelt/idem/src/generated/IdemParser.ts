
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { IdemListener } from "./IdemListener.js";
import { IdemVisitor } from "./IdemVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class IdemParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly Identifier = 3;
    public static readonly Or = 4;
    public static readonly And = 5;
    public static readonly Equals = 6;
    public static readonly NEquals = 7;
    public static readonly GTEquals = 8;
    public static readonly LTEquals = 9;
    public static readonly Pow = 10;
    public static readonly Excl = 11;
    public static readonly GT = 12;
    public static readonly LT = 13;
    public static readonly Add = 14;
    public static readonly Subtract = 15;
    public static readonly Multiply = 16;
    public static readonly Divide = 17;
    public static readonly Modulus = 18;
    public static readonly OBracket = 19;
    public static readonly CBracket = 20;
    public static readonly OParen = 21;
    public static readonly CParen = 22;
    public static readonly SColon = 23;
    public static readonly Assign = 24;
    public static readonly Comma = 25;
    public static readonly QMark = 26;
    public static readonly Colon = 27;
    public static readonly Bool = 28;
    public static readonly Number = 29;
    public static readonly String = 30;
    public static readonly LocalDate = 31;
    public static readonly DatePart = 32;
    public static readonly Space = 33;
    public static readonly Null = 34;
    public static readonly In = 35;
    public static readonly RULE_parse = 0;
    public static readonly RULE_block = 1;
    public static readonly RULE_expression = 2;
    public static readonly RULE_list = 3;
    public static readonly RULE_indexes = 4;
    public static readonly RULE_pointers = 5;
    public static readonly RULE_pointer = 6;
    public static readonly RULE_tags = 7;
    public static readonly RULE_feature = 8;
    public static readonly RULE_exprList = 9;

    public static readonly literalNames = [
        null, "'self'", "'.'", null, "'||'", "'&&'", "'=='", "'!='", "'>='", 
        "'<='", "'^'", "'!'", "'>'", "'<'", "'+'", "'-'", "'*'", "'/'", 
        "'%'", "'['", "']'", "'('", "')'", "';'", "'='", "','", "'?'", "':'"
    ];

    public static readonly symbolicNames = [
        null, null, null, "Identifier", "Or", "And", "Equals", "NEquals", 
        "GTEquals", "LTEquals", "Pow", "Excl", "GT", "LT", "Add", "Subtract", 
        "Multiply", "Divide", "Modulus", "OBracket", "CBracket", "OParen", 
        "CParen", "SColon", "Assign", "Comma", "QMark", "Colon", "Bool", 
        "Number", "String", "LocalDate", "DatePart", "Space", "Null", "In"
    ];
    public static readonly ruleNames = [
        "parse", "block", "expression", "list", "indexes", "pointers", "pointer", 
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
            this.state = 20;
            this.block();
            this.state = 21;
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
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 24;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4029188098) !== 0) || _la === 34) {
                {
                this.state = 23;
                this.expression(0);
                }
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
        let _startState = 4;
        this.enterRecursionRule(localContext, 4, IdemParser.RULE_expression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 51;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case IdemParser.T__0:
                {
                localContext = new SelfExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 27;
                this.match(IdemParser.T__0);
                this.state = 28;
                this.tags();
                }
                break;
            case IdemParser.Subtract:
                {
                localContext = new UnaryMinusExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 29;
                this.match(IdemParser.Subtract);
                this.state = 30;
                this.expression(27);
                }
                break;
            case IdemParser.Excl:
                {
                localContext = new NotExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 31;
                this.match(IdemParser.Excl);
                this.state = 32;
                this.expression(26);
                }
                break;
            case IdemParser.Number:
                {
                localContext = new NumberExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 33;
                this.match(IdemParser.Number);
                }
                break;
            case IdemParser.LocalDate:
                {
                localContext = new LocalDateExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 34;
                this.match(IdemParser.LocalDate);
                }
                break;
            case IdemParser.Bool:
                {
                localContext = new BoolExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 35;
                this.match(IdemParser.Bool);
                }
                break;
            case IdemParser.Null:
                {
                localContext = new NullExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 36;
                this.match(IdemParser.Null);
                }
                break;
            case IdemParser.OBracket:
                {
                localContext = new ListExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 37;
                this.list();
                this.state = 39;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
                case 1:
                    {
                    this.state = 38;
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
                this.state = 41;
                this.match(IdemParser.String);
                this.state = 43;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
                case 1:
                    {
                    this.state = 42;
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
                this.state = 45;
                this.match(IdemParser.OParen);
                this.state = 46;
                this.expression(0);
                this.state = 47;
                this.match(IdemParser.CParen);
                this.state = 49;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
                case 1:
                    {
                    this.state = 48;
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
            this.state = 112;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 6, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 110;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
                    case 1:
                        {
                        localContext = new PowerExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 53;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 54;
                        this.match(IdemParser.Pow);
                        this.state = 55;
                        this.expression(26);
                        }
                        break;
                    case 2:
                        {
                        localContext = new MultiplyExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 56;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 57;
                        this.match(IdemParser.Multiply);
                        this.state = 58;
                        this.expression(25);
                        }
                        break;
                    case 3:
                        {
                        localContext = new DivideExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 59;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 60;
                        this.match(IdemParser.Divide);
                        this.state = 61;
                        this.expression(24);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ModulusExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 62;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 63;
                        this.match(IdemParser.Modulus);
                        this.state = 64;
                        this.expression(23);
                        }
                        break;
                    case 5:
                        {
                        localContext = new AddExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 65;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 66;
                        this.match(IdemParser.Add);
                        this.state = 67;
                        this.expression(22);
                        }
                        break;
                    case 6:
                        {
                        localContext = new SubtractExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 68;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 69;
                        this.match(IdemParser.Subtract);
                        this.state = 70;
                        this.expression(21);
                        }
                        break;
                    case 7:
                        {
                        localContext = new GtEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 71;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 72;
                        this.match(IdemParser.GTEquals);
                        this.state = 73;
                        this.expression(18);
                        }
                        break;
                    case 8:
                        {
                        localContext = new LtEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 74;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 75;
                        this.match(IdemParser.LTEquals);
                        this.state = 76;
                        this.expression(17);
                        }
                        break;
                    case 9:
                        {
                        localContext = new GtExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 77;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 78;
                        this.match(IdemParser.GT);
                        this.state = 79;
                        this.expression(16);
                        }
                        break;
                    case 10:
                        {
                        localContext = new LtExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 80;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 81;
                        this.match(IdemParser.LT);
                        this.state = 82;
                        this.expression(15);
                        }
                        break;
                    case 11:
                        {
                        localContext = new EqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 83;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 84;
                        this.match(IdemParser.Equals);
                        this.state = 85;
                        this.expression(14);
                        }
                        break;
                    case 12:
                        {
                        localContext = new NotEqExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 86;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 87;
                        this.match(IdemParser.NEquals);
                        this.state = 88;
                        this.expression(13);
                        }
                        break;
                    case 13:
                        {
                        localContext = new AndExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 89;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 90;
                        this.match(IdemParser.And);
                        this.state = 91;
                        this.expression(12);
                        }
                        break;
                    case 14:
                        {
                        localContext = new OrExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 92;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 93;
                        this.match(IdemParser.Or);
                        this.state = 94;
                        this.expression(11);
                        }
                        break;
                    case 15:
                        {
                        localContext = new TernaryExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 95;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 96;
                        this.match(IdemParser.QMark);
                        this.state = 97;
                        this.expression(0);
                        this.state = 98;
                        this.match(IdemParser.Colon);
                        this.state = 99;
                        this.expression(10);
                        }
                        break;
                    case 16:
                        {
                        localContext = new InExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 101;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 102;
                        this.match(IdemParser.In);
                        this.state = 103;
                        this.expression(9);
                        }
                        break;
                    case 17:
                        {
                        localContext = new AddDatePartExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 104;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 105;
                        this.match(IdemParser.Add);
                        this.state = 106;
                        this.match(IdemParser.DatePart);
                        }
                        break;
                    case 18:
                        {
                        localContext = new SubtractDatePartExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, IdemParser.RULE_expression);
                        this.state = 107;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 108;
                        this.match(IdemParser.Subtract);
                        this.state = 109;
                        this.match(IdemParser.DatePart);
                        }
                        break;
                    }
                    }
                }
                this.state = 114;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 6, this.context);
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
        this.enterRule(localContext, 6, IdemParser.RULE_list);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 115;
            this.match(IdemParser.OBracket);
            this.state = 117;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4029188098) !== 0) || _la === 34) {
                {
                this.state = 116;
                this.exprList();
                }
            }

            this.state = 119;
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
        this.enterRule(localContext, 8, IdemParser.RULE_indexes);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 125;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 121;
                    this.match(IdemParser.OBracket);
                    this.state = 122;
                    this.expression(0);
                    this.state = 123;
                    this.match(IdemParser.CBracket);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 127;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
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
        this.enterRule(localContext, 10, IdemParser.RULE_pointers);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 130;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 129;
                    this.pointer();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 132;
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
    public pointer(): PointerContext {
        let localContext = new PointerContext(this.context, this.state);
        this.enterRule(localContext, 12, IdemParser.RULE_pointer);
        try {
            this.state = 136;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case IdemParser.T__1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 134;
                this.tags();
                }
                break;
            case IdemParser.OBracket:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 135;
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
        this.enterRule(localContext, 14, IdemParser.RULE_tags);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 140;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 138;
                    this.match(IdemParser.T__1);
                    this.state = 139;
                    this.feature();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 142;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
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
        this.enterRule(localContext, 16, IdemParser.RULE_feature);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 144;
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
        this.enterRule(localContext, 18, IdemParser.RULE_exprList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 146;
            this.expression(0);
            this.state = 151;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 25) {
                {
                {
                this.state = 147;
                this.match(IdemParser.Comma);
                this.state = 148;
                this.expression(0);
                }
                }
                this.state = 153;
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
        case 2:
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
        4,1,35,155,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,1,0,1,0,1,0,1,1,3,1,25,8,1,1,2,1,2,1,2,
        1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,40,8,2,1,2,1,2,3,2,44,
        8,2,1,2,1,2,1,2,1,2,3,2,50,8,2,3,2,52,8,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,5,2,111,8,2,10,2,12,2,114,9,2,1,3,1,3,3,3,118,8,3,
        1,3,1,3,1,4,1,4,1,4,1,4,4,4,126,8,4,11,4,12,4,127,1,5,4,5,131,8,
        5,11,5,12,5,132,1,6,1,6,3,6,137,8,6,1,7,1,7,4,7,141,8,7,11,7,12,
        7,142,1,8,1,8,1,9,1,9,1,9,5,9,150,8,9,10,9,12,9,153,9,9,1,9,0,1,
        4,10,0,2,4,6,8,10,12,14,16,18,0,0,181,0,20,1,0,0,0,2,24,1,0,0,0,
        4,51,1,0,0,0,6,115,1,0,0,0,8,125,1,0,0,0,10,130,1,0,0,0,12,136,1,
        0,0,0,14,140,1,0,0,0,16,144,1,0,0,0,18,146,1,0,0,0,20,21,3,2,1,0,
        21,22,5,0,0,1,22,1,1,0,0,0,23,25,3,4,2,0,24,23,1,0,0,0,24,25,1,0,
        0,0,25,3,1,0,0,0,26,27,6,2,-1,0,27,28,5,1,0,0,28,52,3,14,7,0,29,
        30,5,15,0,0,30,52,3,4,2,27,31,32,5,11,0,0,32,52,3,4,2,26,33,52,5,
        29,0,0,34,52,5,31,0,0,35,52,5,28,0,0,36,52,5,34,0,0,37,39,3,6,3,
        0,38,40,3,8,4,0,39,38,1,0,0,0,39,40,1,0,0,0,40,52,1,0,0,0,41,43,
        5,30,0,0,42,44,3,8,4,0,43,42,1,0,0,0,43,44,1,0,0,0,44,52,1,0,0,0,
        45,46,5,21,0,0,46,47,3,4,2,0,47,49,5,22,0,0,48,50,3,10,5,0,49,48,
        1,0,0,0,49,50,1,0,0,0,50,52,1,0,0,0,51,26,1,0,0,0,51,29,1,0,0,0,
        51,31,1,0,0,0,51,33,1,0,0,0,51,34,1,0,0,0,51,35,1,0,0,0,51,36,1,
        0,0,0,51,37,1,0,0,0,51,41,1,0,0,0,51,45,1,0,0,0,52,112,1,0,0,0,53,
        54,10,25,0,0,54,55,5,10,0,0,55,111,3,4,2,26,56,57,10,24,0,0,57,58,
        5,16,0,0,58,111,3,4,2,25,59,60,10,23,0,0,60,61,5,17,0,0,61,111,3,
        4,2,24,62,63,10,22,0,0,63,64,5,18,0,0,64,111,3,4,2,23,65,66,10,21,
        0,0,66,67,5,14,0,0,67,111,3,4,2,22,68,69,10,20,0,0,69,70,5,15,0,
        0,70,111,3,4,2,21,71,72,10,17,0,0,72,73,5,8,0,0,73,111,3,4,2,18,
        74,75,10,16,0,0,75,76,5,9,0,0,76,111,3,4,2,17,77,78,10,15,0,0,78,
        79,5,12,0,0,79,111,3,4,2,16,80,81,10,14,0,0,81,82,5,13,0,0,82,111,
        3,4,2,15,83,84,10,13,0,0,84,85,5,6,0,0,85,111,3,4,2,14,86,87,10,
        12,0,0,87,88,5,7,0,0,88,111,3,4,2,13,89,90,10,11,0,0,90,91,5,5,0,
        0,91,111,3,4,2,12,92,93,10,10,0,0,93,94,5,4,0,0,94,111,3,4,2,11,
        95,96,10,9,0,0,96,97,5,26,0,0,97,98,3,4,2,0,98,99,5,27,0,0,99,100,
        3,4,2,10,100,111,1,0,0,0,101,102,10,8,0,0,102,103,5,35,0,0,103,111,
        3,4,2,9,104,105,10,19,0,0,105,106,5,14,0,0,106,111,5,32,0,0,107,
        108,10,18,0,0,108,109,5,15,0,0,109,111,5,32,0,0,110,53,1,0,0,0,110,
        56,1,0,0,0,110,59,1,0,0,0,110,62,1,0,0,0,110,65,1,0,0,0,110,68,1,
        0,0,0,110,71,1,0,0,0,110,74,1,0,0,0,110,77,1,0,0,0,110,80,1,0,0,
        0,110,83,1,0,0,0,110,86,1,0,0,0,110,89,1,0,0,0,110,92,1,0,0,0,110,
        95,1,0,0,0,110,101,1,0,0,0,110,104,1,0,0,0,110,107,1,0,0,0,111,114,
        1,0,0,0,112,110,1,0,0,0,112,113,1,0,0,0,113,5,1,0,0,0,114,112,1,
        0,0,0,115,117,5,19,0,0,116,118,3,18,9,0,117,116,1,0,0,0,117,118,
        1,0,0,0,118,119,1,0,0,0,119,120,5,20,0,0,120,7,1,0,0,0,121,122,5,
        19,0,0,122,123,3,4,2,0,123,124,5,20,0,0,124,126,1,0,0,0,125,121,
        1,0,0,0,126,127,1,0,0,0,127,125,1,0,0,0,127,128,1,0,0,0,128,9,1,
        0,0,0,129,131,3,12,6,0,130,129,1,0,0,0,131,132,1,0,0,0,132,130,1,
        0,0,0,132,133,1,0,0,0,133,11,1,0,0,0,134,137,3,14,7,0,135,137,3,
        8,4,0,136,134,1,0,0,0,136,135,1,0,0,0,137,13,1,0,0,0,138,139,5,2,
        0,0,139,141,3,16,8,0,140,138,1,0,0,0,141,142,1,0,0,0,142,140,1,0,
        0,0,142,143,1,0,0,0,143,15,1,0,0,0,144,145,5,3,0,0,145,17,1,0,0,
        0,146,151,3,4,2,0,147,148,5,25,0,0,148,150,3,4,2,0,149,147,1,0,0,
        0,150,153,1,0,0,0,151,149,1,0,0,0,151,152,1,0,0,0,152,19,1,0,0,0,
        153,151,1,0,0,0,13,24,39,43,49,51,110,112,117,127,132,136,142,151
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
