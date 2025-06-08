// Generated from /Users/robson/Project/idem/src/main/antlr4/hu.blackbelt.idem/Idem.g4 by ANTLR 4.13.2
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue", "this-escape"})
public class IdemParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, Identifier=3, Size=4, In=5, Null=6, DayDiff=7, WeekDiff=8, 
		MonthDiff=9, YearDiff=10, Year=11, DayOfYear=12, WeekOfYear=13, MonthOfYear=14, 
		DayOfMonth=15, WeekOfMonth=16, DayOfWeek=17, Today=18, Yesterday=19, Tomorrow=20, 
		Choice=21, Floor=22, Ceil=23, Round=24, BoolToInt=25, Or=26, And=27, Equals=28, 
		NEquals=29, GTEquals=30, LTEquals=31, Pow=32, Excl=33, GT=34, LT=35, Add=36, 
		Subtract=37, Multiply=38, Divide=39, Modulus=40, OBracket=41, CBracket=42, 
		OParen=43, CParen=44, SColon=45, Assign=46, Comma=47, QMark=48, Colon=49, 
		Bool=50, Number=51, String=52, LocalDate=53, DatePart=54, Space=55;
	public static final int
		RULE_parse = 0, RULE_block = 1, RULE_functionCall = 2, RULE_expression = 3, 
		RULE_list = 4, RULE_indexes = 5, RULE_pointers = 6, RULE_pointer = 7, 
		RULE_tags = 8, RULE_feature = 9, RULE_exprList = 10;
	private static String[] makeRuleNames() {
		return new String[] {
			"parse", "block", "functionCall", "expression", "list", "indexes", "pointers", 
			"pointer", "tags", "feature", "exprList"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'self'", "'.'", null, "'size'", "'in'", "'null'", "'day_diff'", 
			"'week_diff'", "'month_diff'", "'year_diff'", "'year'", "'day_of_year'", 
			"'week_of_year'", "'month_of_year'", "'day_of_month'", "'week_of_month'", 
			"'day_of_week'", "'today'", "'yesterday'", "'tomorrow'", "'choice'", 
			"'floor'", "'ceil'", "'round'", "'boolToInt'", "'||'", "'&&'", "'=='", 
			"'!='", "'>='", "'<='", "'^'", "'!'", "'>'", "'<'", "'+'", "'-'", "'*'", 
			"'/'", "'%'", "'['", "']'", "'('", "')'", "';'", "'='", "','", "'?'", 
			"':'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, "Identifier", "Size", "In", "Null", "DayDiff", "WeekDiff", 
			"MonthDiff", "YearDiff", "Year", "DayOfYear", "WeekOfYear", "MonthOfYear", 
			"DayOfMonth", "WeekOfMonth", "DayOfWeek", "Today", "Yesterday", "Tomorrow", 
			"Choice", "Floor", "Ceil", "Round", "BoolToInt", "Or", "And", "Equals", 
			"NEquals", "GTEquals", "LTEquals", "Pow", "Excl", "GT", "LT", "Add", 
			"Subtract", "Multiply", "Divide", "Modulus", "OBracket", "CBracket", 
			"OParen", "CParen", "SColon", "Assign", "Comma", "QMark", "Colon", "Bool", 
			"Number", "String", "LocalDate", "DatePart", "Space"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Idem.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public IdemParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ParseContext extends ParserRuleContext {
		public BlockContext block() {
			return getRuleContext(BlockContext.class,0);
		}
		public TerminalNode EOF() { return getToken(IdemParser.EOF, 0); }
		public ParseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parse; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterParse(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitParse(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitParse(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ParseContext parse() throws RecognitionException {
		ParseContext _localctx = new ParseContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_parse);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(22);
			block();
			setState(23);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BlockContext extends ParserRuleContext {
		public FunctionCallContext functionCall() {
			return getRuleContext(FunctionCallContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public BlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_block; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterBlock(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitBlock(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitBlock(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BlockContext block() throws RecognitionException {
		BlockContext _localctx = new BlockContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_block);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(27);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case Size:
			case DayDiff:
			case WeekDiff:
			case MonthDiff:
			case YearDiff:
			case Year:
			case DayOfYear:
			case WeekOfYear:
			case MonthOfYear:
			case DayOfMonth:
			case WeekOfMonth:
			case DayOfWeek:
			case Today:
			case Yesterday:
			case Tomorrow:
			case Floor:
			case Ceil:
			case Round:
			case BoolToInt:
				{
				setState(25);
				functionCall();
				}
				break;
			case T__0:
			case Null:
			case Excl:
			case Subtract:
			case OBracket:
			case OParen:
			case Bool:
			case Number:
			case String:
			case LocalDate:
				{
				setState(26);
				expression(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FunctionCallContext extends ParserRuleContext {
		public FunctionCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionCall; }
	 
		public FunctionCallContext() { }
		public void copyFrom(FunctionCallContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class MonthOfYearFunctionCallContext extends FunctionCallContext {
		public TerminalNode MonthOfYear() { return getToken(IdemParser.MonthOfYear, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public MonthOfYearFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterMonthOfYearFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitMonthOfYearFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitMonthOfYearFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class YearFunctionCallContext extends FunctionCallContext {
		public TerminalNode Year() { return getToken(IdemParser.Year, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public YearFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterYearFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitYearFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitYearFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class SizeFunctionCallContext extends FunctionCallContext {
		public TerminalNode Size() { return getToken(IdemParser.Size, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public SizeFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterSizeFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitSizeFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitSizeFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class WeekOfYearFunctionCallContext extends FunctionCallContext {
		public TerminalNode WeekOfYear() { return getToken(IdemParser.WeekOfYear, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public WeekOfYearFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterWeekOfYearFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitWeekOfYearFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitWeekOfYearFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class WeekOfMonthFunctionCallContext extends FunctionCallContext {
		public TerminalNode WeekOfMonth() { return getToken(IdemParser.WeekOfMonth, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public WeekOfMonthFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterWeekOfMonthFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitWeekOfMonthFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitWeekOfMonthFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class DayOfYearFunctionCallContext extends FunctionCallContext {
		public TerminalNode DayOfYear() { return getToken(IdemParser.DayOfYear, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public DayOfYearFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterDayOfYearFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitDayOfYearFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitDayOfYearFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class YesterdayFunctionCallContext extends FunctionCallContext {
		public TerminalNode Yesterday() { return getToken(IdemParser.Yesterday, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public YesterdayFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterYesterdayFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitYesterdayFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitYesterdayFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class TodayFunctionCallContext extends FunctionCallContext {
		public TerminalNode Today() { return getToken(IdemParser.Today, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public TodayFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterTodayFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitTodayFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitTodayFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class MonthDiffFunctionCallContext extends FunctionCallContext {
		public TerminalNode MonthDiff() { return getToken(IdemParser.MonthDiff, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Comma() { return getToken(IdemParser.Comma, 0); }
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public MonthDiffFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterMonthDiffFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitMonthDiffFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitMonthDiffFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class YearDiffFunctionCallContext extends FunctionCallContext {
		public TerminalNode YearDiff() { return getToken(IdemParser.YearDiff, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Comma() { return getToken(IdemParser.Comma, 0); }
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public YearDiffFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterYearDiffFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitYearDiffFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitYearDiffFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class FloorFunctionCallContext extends FunctionCallContext {
		public TerminalNode Floor() { return getToken(IdemParser.Floor, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Comma() { return getToken(IdemParser.Comma, 0); }
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public FloorFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterFloorFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitFloorFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitFloorFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class DayOfMonthFunctionCallContext extends FunctionCallContext {
		public TerminalNode DayOfMonth() { return getToken(IdemParser.DayOfMonth, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public DayOfMonthFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterDayOfMonthFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitDayOfMonthFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitDayOfMonthFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class DayDiffFunctionCallContext extends FunctionCallContext {
		public TerminalNode DayDiff() { return getToken(IdemParser.DayDiff, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Comma() { return getToken(IdemParser.Comma, 0); }
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public DayDiffFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterDayDiffFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitDayDiffFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitDayDiffFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class BoolToIntFunctionCallContext extends FunctionCallContext {
		public TerminalNode BoolToInt() { return getToken(IdemParser.BoolToInt, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public BoolToIntFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterBoolToIntFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitBoolToIntFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitBoolToIntFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class WeekDiffFunctionCallContext extends FunctionCallContext {
		public TerminalNode WeekDiff() { return getToken(IdemParser.WeekDiff, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Comma() { return getToken(IdemParser.Comma, 0); }
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public WeekDiffFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterWeekDiffFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitWeekDiffFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitWeekDiffFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class RoundFunctionCallContext extends FunctionCallContext {
		public TerminalNode Round() { return getToken(IdemParser.Round, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Comma() { return getToken(IdemParser.Comma, 0); }
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public RoundFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterRoundFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitRoundFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitRoundFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class TomorrowFunctionCallContext extends FunctionCallContext {
		public TerminalNode Tomorrow() { return getToken(IdemParser.Tomorrow, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public TomorrowFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterTomorrowFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitTomorrowFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitTomorrowFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class CeilFunctionCallContext extends FunctionCallContext {
		public TerminalNode Ceil() { return getToken(IdemParser.Ceil, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Comma() { return getToken(IdemParser.Comma, 0); }
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public CeilFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterCeilFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitCeilFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitCeilFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class DayOfWeekFunctionCallContext extends FunctionCallContext {
		public TerminalNode DayOfWeek() { return getToken(IdemParser.DayOfWeek, 0); }
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public DayOfWeekFunctionCallContext(FunctionCallContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterDayOfWeekFunctionCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitDayOfWeekFunctionCall(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitDayOfWeekFunctionCall(this);
			else return visitor.visitChildren(this);
		}
	}

	public final FunctionCallContext functionCall() throws RecognitionException {
		FunctionCallContext _localctx = new FunctionCallContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_functionCall);
		try {
			setState(132);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case Floor:
				_localctx = new FloorFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(29);
				match(Floor);
				setState(30);
				match(OParen);
				setState(31);
				expression(0);
				setState(32);
				match(Comma);
				setState(33);
				expression(0);
				setState(34);
				match(CParen);
				}
				break;
			case Ceil:
				_localctx = new CeilFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(36);
				match(Ceil);
				setState(37);
				match(OParen);
				setState(38);
				expression(0);
				setState(39);
				match(Comma);
				setState(40);
				expression(0);
				setState(41);
				match(CParen);
				}
				break;
			case Round:
				_localctx = new RoundFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(43);
				match(Round);
				setState(44);
				match(OParen);
				setState(45);
				expression(0);
				setState(46);
				match(Comma);
				setState(47);
				expression(0);
				setState(48);
				match(CParen);
				}
				break;
			case Size:
				_localctx = new SizeFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(50);
				match(Size);
				setState(51);
				match(OParen);
				setState(52);
				expression(0);
				setState(53);
				match(CParen);
				}
				break;
			case DayDiff:
				_localctx = new DayDiffFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(55);
				match(DayDiff);
				setState(56);
				match(OParen);
				setState(57);
				expression(0);
				setState(58);
				match(Comma);
				setState(59);
				expression(0);
				setState(60);
				match(CParen);
				}
				break;
			case WeekDiff:
				_localctx = new WeekDiffFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(62);
				match(WeekDiff);
				setState(63);
				match(OParen);
				setState(64);
				expression(0);
				setState(65);
				match(Comma);
				setState(66);
				expression(0);
				setState(67);
				match(CParen);
				}
				break;
			case MonthDiff:
				_localctx = new MonthDiffFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(69);
				match(MonthDiff);
				setState(70);
				match(OParen);
				setState(71);
				expression(0);
				setState(72);
				match(Comma);
				setState(73);
				expression(0);
				setState(74);
				match(CParen);
				}
				break;
			case YearDiff:
				_localctx = new YearDiffFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 8);
				{
				setState(76);
				match(YearDiff);
				setState(77);
				match(OParen);
				setState(78);
				expression(0);
				setState(79);
				match(Comma);
				setState(80);
				expression(0);
				setState(81);
				match(CParen);
				}
				break;
			case Year:
				_localctx = new YearFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 9);
				{
				setState(83);
				match(Year);
				setState(84);
				match(OParen);
				setState(85);
				expression(0);
				setState(86);
				match(CParen);
				}
				break;
			case DayOfYear:
				_localctx = new DayOfYearFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 10);
				{
				setState(88);
				match(DayOfYear);
				setState(89);
				match(OParen);
				setState(90);
				expression(0);
				setState(91);
				match(CParen);
				}
				break;
			case WeekOfYear:
				_localctx = new WeekOfYearFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 11);
				{
				setState(93);
				match(WeekOfYear);
				setState(94);
				match(OParen);
				setState(95);
				expression(0);
				setState(96);
				match(CParen);
				}
				break;
			case MonthOfYear:
				_localctx = new MonthOfYearFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 12);
				{
				setState(98);
				match(MonthOfYear);
				setState(99);
				match(OParen);
				setState(100);
				expression(0);
				setState(101);
				match(CParen);
				}
				break;
			case DayOfMonth:
				_localctx = new DayOfMonthFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 13);
				{
				setState(103);
				match(DayOfMonth);
				setState(104);
				match(OParen);
				setState(105);
				expression(0);
				setState(106);
				match(CParen);
				}
				break;
			case WeekOfMonth:
				_localctx = new WeekOfMonthFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 14);
				{
				setState(108);
				match(WeekOfMonth);
				setState(109);
				match(OParen);
				setState(110);
				expression(0);
				setState(111);
				match(CParen);
				}
				break;
			case DayOfWeek:
				_localctx = new DayOfWeekFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 15);
				{
				setState(113);
				match(DayOfWeek);
				setState(114);
				match(OParen);
				setState(115);
				expression(0);
				setState(116);
				match(CParen);
				}
				break;
			case Today:
				_localctx = new TodayFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 16);
				{
				setState(118);
				match(Today);
				setState(119);
				match(OParen);
				setState(120);
				match(CParen);
				}
				break;
			case Yesterday:
				_localctx = new YesterdayFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 17);
				{
				setState(121);
				match(Yesterday);
				setState(122);
				match(OParen);
				setState(123);
				match(CParen);
				}
				break;
			case Tomorrow:
				_localctx = new TomorrowFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 18);
				{
				setState(124);
				match(Tomorrow);
				setState(125);
				match(OParen);
				setState(126);
				match(CParen);
				}
				break;
			case BoolToInt:
				_localctx = new BoolToIntFunctionCallContext(_localctx);
				enterOuterAlt(_localctx, 19);
				{
				setState(127);
				match(BoolToInt);
				setState(128);
				match(OParen);
				setState(129);
				expression(0);
				setState(130);
				match(CParen);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionContext extends ParserRuleContext {
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	 
		public ExpressionContext() { }
		public void copyFrom(ExpressionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class GtExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode GT() { return getToken(IdemParser.GT, 0); }
		public GtExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterGtExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitGtExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitGtExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class NumberExpressionContext extends ExpressionContext {
		public TerminalNode Number() { return getToken(IdemParser.Number, 0); }
		public NumberExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterNumberExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitNumberExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitNumberExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ModulusExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Modulus() { return getToken(IdemParser.Modulus, 0); }
		public ModulusExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterModulusExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitModulusExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitModulusExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class NotExpressionContext extends ExpressionContext {
		public TerminalNode Excl() { return getToken(IdemParser.Excl, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public NotExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterNotExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitNotExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitNotExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class MultiplyExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Multiply() { return getToken(IdemParser.Multiply, 0); }
		public MultiplyExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterMultiplyExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitMultiplyExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitMultiplyExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class GtEqExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode GTEquals() { return getToken(IdemParser.GTEquals, 0); }
		public GtEqExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterGtEqExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitGtEqExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitGtEqExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LocalDateExpressionContext extends ExpressionContext {
		public TerminalNode LocalDate() { return getToken(IdemParser.LocalDate, 0); }
		public LocalDateExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterLocalDateExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitLocalDateExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitLocalDateExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class AndExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode And() { return getToken(IdemParser.And, 0); }
		public AndExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterAndExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitAndExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitAndExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class StringExpressionContext extends ExpressionContext {
		public TerminalNode String() { return getToken(IdemParser.String, 0); }
		public IndexesContext indexes() {
			return getRuleContext(IndexesContext.class,0);
		}
		public StringExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterStringExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitStringExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitStringExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionExpressionContext extends ExpressionContext {
		public TerminalNode OParen() { return getToken(IdemParser.OParen, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode CParen() { return getToken(IdemParser.CParen, 0); }
		public PointersContext pointers() {
			return getRuleContext(PointersContext.class,0);
		}
		public ExpressionExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterExpressionExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitExpressionExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitExpressionExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class NullExpressionContext extends ExpressionContext {
		public TerminalNode Null() { return getToken(IdemParser.Null, 0); }
		public NullExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterNullExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitNullExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitNullExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ListExpressionContext extends ExpressionContext {
		public ListContext list() {
			return getRuleContext(ListContext.class,0);
		}
		public IndexesContext indexes() {
			return getRuleContext(IndexesContext.class,0);
		}
		public ListExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterListExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitListExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitListExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LtEqExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode LTEquals() { return getToken(IdemParser.LTEquals, 0); }
		public LtEqExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterLtEqExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitLtEqExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitLtEqExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LtExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode LT() { return getToken(IdemParser.LT, 0); }
		public LtExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterLtExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitLtExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitLtExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class BoolExpressionContext extends ExpressionContext {
		public TerminalNode Bool() { return getToken(IdemParser.Bool, 0); }
		public BoolExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterBoolExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitBoolExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitBoolExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class NotEqExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode NEquals() { return getToken(IdemParser.NEquals, 0); }
		public NotEqExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterNotEqExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitNotEqExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitNotEqExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class DivideExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Divide() { return getToken(IdemParser.Divide, 0); }
		public DivideExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterDivideExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitDivideExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitDivideExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class OrExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Or() { return getToken(IdemParser.Or, 0); }
		public OrExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterOrExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitOrExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitOrExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class UnaryMinusExpressionContext extends ExpressionContext {
		public TerminalNode Subtract() { return getToken(IdemParser.Subtract, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public UnaryMinusExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterUnaryMinusExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitUnaryMinusExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitUnaryMinusExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class PowerExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Pow() { return getToken(IdemParser.Pow, 0); }
		public PowerExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterPowerExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitPowerExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitPowerExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class EqExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Equals() { return getToken(IdemParser.Equals, 0); }
		public EqExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterEqExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitEqExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitEqExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class InExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode In() { return getToken(IdemParser.In, 0); }
		public InExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterInExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitInExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitInExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class AddExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Add() { return getToken(IdemParser.Add, 0); }
		public AddExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterAddExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitAddExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitAddExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class SubtractExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode Subtract() { return getToken(IdemParser.Subtract, 0); }
		public SubtractExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterSubtractExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitSubtractExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitSubtractExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class SelfExpressionContext extends ExpressionContext {
		public TagsContext tags() {
			return getRuleContext(TagsContext.class,0);
		}
		public SelfExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterSelfExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitSelfExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitSelfExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class AddDatePartExpressionContext extends ExpressionContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode Add() { return getToken(IdemParser.Add, 0); }
		public TerminalNode DatePart() { return getToken(IdemParser.DatePart, 0); }
		public AddDatePartExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterAddDatePartExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitAddDatePartExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitAddDatePartExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class SubtractDatePartExpressionContext extends ExpressionContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode Subtract() { return getToken(IdemParser.Subtract, 0); }
		public TerminalNode DatePart() { return getToken(IdemParser.DatePart, 0); }
		public SubtractDatePartExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterSubtractDatePartExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitSubtractDatePartExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitSubtractDatePartExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class TernaryExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode QMark() { return getToken(IdemParser.QMark, 0); }
		public TerminalNode Colon() { return getToken(IdemParser.Colon, 0); }
		public TernaryExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterTernaryExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitTernaryExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitTernaryExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 6;
		enterRecursionRule(_localctx, 6, RULE_expression, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(159);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__0:
				{
				_localctx = new SelfExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(135);
				match(T__0);
				setState(136);
				tags();
				}
				break;
			case Subtract:
				{
				_localctx = new UnaryMinusExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(137);
				match(Subtract);
				setState(138);
				expression(27);
				}
				break;
			case Excl:
				{
				_localctx = new NotExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(139);
				match(Excl);
				setState(140);
				expression(26);
				}
				break;
			case Number:
				{
				_localctx = new NumberExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(141);
				match(Number);
				}
				break;
			case LocalDate:
				{
				_localctx = new LocalDateExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(142);
				match(LocalDate);
				}
				break;
			case Bool:
				{
				_localctx = new BoolExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(143);
				match(Bool);
				}
				break;
			case Null:
				{
				_localctx = new NullExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(144);
				match(Null);
				}
				break;
			case OBracket:
				{
				_localctx = new ListExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(145);
				list();
				setState(147);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
				case 1:
					{
					setState(146);
					indexes();
					}
					break;
				}
				}
				break;
			case String:
				{
				_localctx = new StringExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(149);
				match(String);
				setState(151);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
				case 1:
					{
					setState(150);
					indexes();
					}
					break;
				}
				}
				break;
			case OParen:
				{
				_localctx = new ExpressionExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(153);
				match(OParen);
				setState(154);
				expression(0);
				setState(155);
				match(CParen);
				setState(157);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
				case 1:
					{
					setState(156);
					pointers();
					}
					break;
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(220);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(218);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
					case 1:
						{
						_localctx = new PowerExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(161);
						if (!(precpred(_ctx, 25))) throw new FailedPredicateException(this, "precpred(_ctx, 25)");
						setState(162);
						match(Pow);
						setState(163);
						expression(26);
						}
						break;
					case 2:
						{
						_localctx = new MultiplyExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(164);
						if (!(precpred(_ctx, 24))) throw new FailedPredicateException(this, "precpred(_ctx, 24)");
						setState(165);
						match(Multiply);
						setState(166);
						expression(25);
						}
						break;
					case 3:
						{
						_localctx = new DivideExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(167);
						if (!(precpred(_ctx, 23))) throw new FailedPredicateException(this, "precpred(_ctx, 23)");
						setState(168);
						match(Divide);
						setState(169);
						expression(24);
						}
						break;
					case 4:
						{
						_localctx = new ModulusExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(170);
						if (!(precpred(_ctx, 22))) throw new FailedPredicateException(this, "precpred(_ctx, 22)");
						setState(171);
						match(Modulus);
						setState(172);
						expression(23);
						}
						break;
					case 5:
						{
						_localctx = new AddExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(173);
						if (!(precpred(_ctx, 21))) throw new FailedPredicateException(this, "precpred(_ctx, 21)");
						setState(174);
						match(Add);
						setState(175);
						expression(22);
						}
						break;
					case 6:
						{
						_localctx = new SubtractExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(176);
						if (!(precpred(_ctx, 20))) throw new FailedPredicateException(this, "precpred(_ctx, 20)");
						setState(177);
						match(Subtract);
						setState(178);
						expression(21);
						}
						break;
					case 7:
						{
						_localctx = new GtEqExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(179);
						if (!(precpred(_ctx, 17))) throw new FailedPredicateException(this, "precpred(_ctx, 17)");
						setState(180);
						match(GTEquals);
						setState(181);
						expression(18);
						}
						break;
					case 8:
						{
						_localctx = new LtEqExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(182);
						if (!(precpred(_ctx, 16))) throw new FailedPredicateException(this, "precpred(_ctx, 16)");
						setState(183);
						match(LTEquals);
						setState(184);
						expression(17);
						}
						break;
					case 9:
						{
						_localctx = new GtExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(185);
						if (!(precpred(_ctx, 15))) throw new FailedPredicateException(this, "precpred(_ctx, 15)");
						setState(186);
						match(GT);
						setState(187);
						expression(16);
						}
						break;
					case 10:
						{
						_localctx = new LtExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(188);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(189);
						match(LT);
						setState(190);
						expression(15);
						}
						break;
					case 11:
						{
						_localctx = new EqExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(191);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						setState(192);
						match(Equals);
						setState(193);
						expression(14);
						}
						break;
					case 12:
						{
						_localctx = new NotEqExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(194);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(195);
						match(NEquals);
						setState(196);
						expression(13);
						}
						break;
					case 13:
						{
						_localctx = new AndExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(197);
						if (!(precpred(_ctx, 11))) throw new FailedPredicateException(this, "precpred(_ctx, 11)");
						setState(198);
						match(And);
						setState(199);
						expression(12);
						}
						break;
					case 14:
						{
						_localctx = new OrExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(200);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(201);
						match(Or);
						setState(202);
						expression(11);
						}
						break;
					case 15:
						{
						_localctx = new TernaryExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(203);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(204);
						match(QMark);
						setState(205);
						expression(0);
						setState(206);
						match(Colon);
						setState(207);
						expression(10);
						}
						break;
					case 16:
						{
						_localctx = new InExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(209);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(210);
						match(In);
						setState(211);
						expression(9);
						}
						break;
					case 17:
						{
						_localctx = new AddDatePartExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(212);
						if (!(precpred(_ctx, 19))) throw new FailedPredicateException(this, "precpred(_ctx, 19)");
						setState(213);
						match(Add);
						setState(214);
						match(DatePart);
						}
						break;
					case 18:
						{
						_localctx = new SubtractDatePartExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(215);
						if (!(precpred(_ctx, 18))) throw new FailedPredicateException(this, "precpred(_ctx, 18)");
						setState(216);
						match(Subtract);
						setState(217);
						match(DatePart);
						}
						break;
					}
					} 
				}
				setState(222);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ListContext extends ParserRuleContext {
		public TerminalNode OBracket() { return getToken(IdemParser.OBracket, 0); }
		public TerminalNode CBracket() { return getToken(IdemParser.CBracket, 0); }
		public ExprListContext exprList() {
			return getRuleContext(ExprListContext.class,0);
		}
		public ListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_list; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ListContext list() throws RecognitionException {
		ListContext _localctx = new ListContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_list);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(223);
			match(OBracket);
			setState(225);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 16899639747805250L) != 0)) {
				{
				setState(224);
				exprList();
				}
			}

			setState(227);
			match(CBracket);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IndexesContext extends ParserRuleContext {
		public List<TerminalNode> OBracket() { return getTokens(IdemParser.OBracket); }
		public TerminalNode OBracket(int i) {
			return getToken(IdemParser.OBracket, i);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> CBracket() { return getTokens(IdemParser.CBracket); }
		public TerminalNode CBracket(int i) {
			return getToken(IdemParser.CBracket, i);
		}
		public IndexesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_indexes; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterIndexes(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitIndexes(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitIndexes(this);
			else return visitor.visitChildren(this);
		}
	}

	public final IndexesContext indexes() throws RecognitionException {
		IndexesContext _localctx = new IndexesContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_indexes);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(233); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(229);
					match(OBracket);
					setState(230);
					expression(0);
					setState(231);
					match(CBracket);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(235); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,9,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PointersContext extends ParserRuleContext {
		public List<PointerContext> pointer() {
			return getRuleContexts(PointerContext.class);
		}
		public PointerContext pointer(int i) {
			return getRuleContext(PointerContext.class,i);
		}
		public PointersContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pointers; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterPointers(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitPointers(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitPointers(this);
			else return visitor.visitChildren(this);
		}
	}

	public final PointersContext pointers() throws RecognitionException {
		PointersContext _localctx = new PointersContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_pointers);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(238); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(237);
					pointer();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(240); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PointerContext extends ParserRuleContext {
		public TagsContext tags() {
			return getRuleContext(TagsContext.class,0);
		}
		public IndexesContext indexes() {
			return getRuleContext(IndexesContext.class,0);
		}
		public PointerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pointer; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterPointer(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitPointer(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitPointer(this);
			else return visitor.visitChildren(this);
		}
	}

	public final PointerContext pointer() throws RecognitionException {
		PointerContext _localctx = new PointerContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_pointer);
		try {
			setState(244);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
				enterOuterAlt(_localctx, 1);
				{
				setState(242);
				tags();
				}
				break;
			case OBracket:
				enterOuterAlt(_localctx, 2);
				{
				setState(243);
				indexes();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TagsContext extends ParserRuleContext {
		public List<FeatureContext> feature() {
			return getRuleContexts(FeatureContext.class);
		}
		public FeatureContext feature(int i) {
			return getRuleContext(FeatureContext.class,i);
		}
		public TagsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tags; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterTags(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitTags(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitTags(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TagsContext tags() throws RecognitionException {
		TagsContext _localctx = new TagsContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_tags);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(248); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(246);
					match(T__1);
					setState(247);
					feature();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(250); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,12,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FeatureContext extends ParserRuleContext {
		public TerminalNode Identifier() { return getToken(IdemParser.Identifier, 0); }
		public FeatureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_feature; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterFeature(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitFeature(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitFeature(this);
			else return visitor.visitChildren(this);
		}
	}

	public final FeatureContext feature() throws RecognitionException {
		FeatureContext _localctx = new FeatureContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_feature);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(252);
			match(Identifier);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExprListContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> Comma() { return getTokens(IdemParser.Comma); }
		public TerminalNode Comma(int i) {
			return getToken(IdemParser.Comma, i);
		}
		public ExprListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exprList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).enterExprList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof IdemListener ) ((IdemListener)listener).exitExprList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof IdemVisitor ) return ((IdemVisitor<? extends T>)visitor).visitExprList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExprListContext exprList() throws RecognitionException {
		ExprListContext _localctx = new ExprListContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_exprList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(254);
			expression(0);
			setState(259);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==Comma) {
				{
				{
				setState(255);
				match(Comma);
				setState(256);
				expression(0);
				}
				}
				setState(261);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 3:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 25);
		case 1:
			return precpred(_ctx, 24);
		case 2:
			return precpred(_ctx, 23);
		case 3:
			return precpred(_ctx, 22);
		case 4:
			return precpred(_ctx, 21);
		case 5:
			return precpred(_ctx, 20);
		case 6:
			return precpred(_ctx, 17);
		case 7:
			return precpred(_ctx, 16);
		case 8:
			return precpred(_ctx, 15);
		case 9:
			return precpred(_ctx, 14);
		case 10:
			return precpred(_ctx, 13);
		case 11:
			return precpred(_ctx, 12);
		case 12:
			return precpred(_ctx, 11);
		case 13:
			return precpred(_ctx, 10);
		case 14:
			return precpred(_ctx, 9);
		case 15:
			return precpred(_ctx, 8);
		case 16:
			return precpred(_ctx, 19);
		case 17:
			return precpred(_ctx, 18);
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u00017\u0107\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0001\u0000\u0001\u0000\u0001"+
		"\u0000\u0001\u0001\u0001\u0001\u0003\u0001\u001c\b\u0001\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u0085\b\u0002\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u0094\b\u0003\u0001\u0003\u0001"+
		"\u0003\u0003\u0003\u0098\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0003\u0003\u009e\b\u0003\u0003\u0003\u00a0\b\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0005\u0003\u00db\b\u0003\n\u0003\f\u0003\u00de"+
		"\t\u0003\u0001\u0004\u0001\u0004\u0003\u0004\u00e2\b\u0004\u0001\u0004"+
		"\u0001\u0004\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0004\u0005"+
		"\u00ea\b\u0005\u000b\u0005\f\u0005\u00eb\u0001\u0006\u0004\u0006\u00ef"+
		"\b\u0006\u000b\u0006\f\u0006\u00f0\u0001\u0007\u0001\u0007\u0003\u0007"+
		"\u00f5\b\u0007\u0001\b\u0001\b\u0004\b\u00f9\b\b\u000b\b\f\b\u00fa\u0001"+
		"\t\u0001\t\u0001\n\u0001\n\u0001\n\u0005\n\u0102\b\n\n\n\f\n\u0105\t\n"+
		"\u0001\n\u0000\u0001\u0006\u000b\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010"+
		"\u0012\u0014\u0000\u0000\u0132\u0000\u0016\u0001\u0000\u0000\u0000\u0002"+
		"\u001b\u0001\u0000\u0000\u0000\u0004\u0084\u0001\u0000\u0000\u0000\u0006"+
		"\u009f\u0001\u0000\u0000\u0000\b\u00df\u0001\u0000\u0000\u0000\n\u00e9"+
		"\u0001\u0000\u0000\u0000\f\u00ee\u0001\u0000\u0000\u0000\u000e\u00f4\u0001"+
		"\u0000\u0000\u0000\u0010\u00f8\u0001\u0000\u0000\u0000\u0012\u00fc\u0001"+
		"\u0000\u0000\u0000\u0014\u00fe\u0001\u0000\u0000\u0000\u0016\u0017\u0003"+
		"\u0002\u0001\u0000\u0017\u0018\u0005\u0000\u0000\u0001\u0018\u0001\u0001"+
		"\u0000\u0000\u0000\u0019\u001c\u0003\u0004\u0002\u0000\u001a\u001c\u0003"+
		"\u0006\u0003\u0000\u001b\u0019\u0001\u0000\u0000\u0000\u001b\u001a\u0001"+
		"\u0000\u0000\u0000\u001c\u0003\u0001\u0000\u0000\u0000\u001d\u001e\u0005"+
		"\u0016\u0000\u0000\u001e\u001f\u0005+\u0000\u0000\u001f \u0003\u0006\u0003"+
		"\u0000 !\u0005/\u0000\u0000!\"\u0003\u0006\u0003\u0000\"#\u0005,\u0000"+
		"\u0000#\u0085\u0001\u0000\u0000\u0000$%\u0005\u0017\u0000\u0000%&\u0005"+
		"+\u0000\u0000&\'\u0003\u0006\u0003\u0000\'(\u0005/\u0000\u0000()\u0003"+
		"\u0006\u0003\u0000)*\u0005,\u0000\u0000*\u0085\u0001\u0000\u0000\u0000"+
		"+,\u0005\u0018\u0000\u0000,-\u0005+\u0000\u0000-.\u0003\u0006\u0003\u0000"+
		"./\u0005/\u0000\u0000/0\u0003\u0006\u0003\u000001\u0005,\u0000\u00001"+
		"\u0085\u0001\u0000\u0000\u000023\u0005\u0004\u0000\u000034\u0005+\u0000"+
		"\u000045\u0003\u0006\u0003\u000056\u0005,\u0000\u00006\u0085\u0001\u0000"+
		"\u0000\u000078\u0005\u0007\u0000\u000089\u0005+\u0000\u00009:\u0003\u0006"+
		"\u0003\u0000:;\u0005/\u0000\u0000;<\u0003\u0006\u0003\u0000<=\u0005,\u0000"+
		"\u0000=\u0085\u0001\u0000\u0000\u0000>?\u0005\b\u0000\u0000?@\u0005+\u0000"+
		"\u0000@A\u0003\u0006\u0003\u0000AB\u0005/\u0000\u0000BC\u0003\u0006\u0003"+
		"\u0000CD\u0005,\u0000\u0000D\u0085\u0001\u0000\u0000\u0000EF\u0005\t\u0000"+
		"\u0000FG\u0005+\u0000\u0000GH\u0003\u0006\u0003\u0000HI\u0005/\u0000\u0000"+
		"IJ\u0003\u0006\u0003\u0000JK\u0005,\u0000\u0000K\u0085\u0001\u0000\u0000"+
		"\u0000LM\u0005\n\u0000\u0000MN\u0005+\u0000\u0000NO\u0003\u0006\u0003"+
		"\u0000OP\u0005/\u0000\u0000PQ\u0003\u0006\u0003\u0000QR\u0005,\u0000\u0000"+
		"R\u0085\u0001\u0000\u0000\u0000ST\u0005\u000b\u0000\u0000TU\u0005+\u0000"+
		"\u0000UV\u0003\u0006\u0003\u0000VW\u0005,\u0000\u0000W\u0085\u0001\u0000"+
		"\u0000\u0000XY\u0005\f\u0000\u0000YZ\u0005+\u0000\u0000Z[\u0003\u0006"+
		"\u0003\u0000[\\\u0005,\u0000\u0000\\\u0085\u0001\u0000\u0000\u0000]^\u0005"+
		"\r\u0000\u0000^_\u0005+\u0000\u0000_`\u0003\u0006\u0003\u0000`a\u0005"+
		",\u0000\u0000a\u0085\u0001\u0000\u0000\u0000bc\u0005\u000e\u0000\u0000"+
		"cd\u0005+\u0000\u0000de\u0003\u0006\u0003\u0000ef\u0005,\u0000\u0000f"+
		"\u0085\u0001\u0000\u0000\u0000gh\u0005\u000f\u0000\u0000hi\u0005+\u0000"+
		"\u0000ij\u0003\u0006\u0003\u0000jk\u0005,\u0000\u0000k\u0085\u0001\u0000"+
		"\u0000\u0000lm\u0005\u0010\u0000\u0000mn\u0005+\u0000\u0000no\u0003\u0006"+
		"\u0003\u0000op\u0005,\u0000\u0000p\u0085\u0001\u0000\u0000\u0000qr\u0005"+
		"\u0011\u0000\u0000rs\u0005+\u0000\u0000st\u0003\u0006\u0003\u0000tu\u0005"+
		",\u0000\u0000u\u0085\u0001\u0000\u0000\u0000vw\u0005\u0012\u0000\u0000"+
		"wx\u0005+\u0000\u0000x\u0085\u0005,\u0000\u0000yz\u0005\u0013\u0000\u0000"+
		"z{\u0005+\u0000\u0000{\u0085\u0005,\u0000\u0000|}\u0005\u0014\u0000\u0000"+
		"}~\u0005+\u0000\u0000~\u0085\u0005,\u0000\u0000\u007f\u0080\u0005\u0019"+
		"\u0000\u0000\u0080\u0081\u0005+\u0000\u0000\u0081\u0082\u0003\u0006\u0003"+
		"\u0000\u0082\u0083\u0005,\u0000\u0000\u0083\u0085\u0001\u0000\u0000\u0000"+
		"\u0084\u001d\u0001\u0000\u0000\u0000\u0084$\u0001\u0000\u0000\u0000\u0084"+
		"+\u0001\u0000\u0000\u0000\u00842\u0001\u0000\u0000\u0000\u00847\u0001"+
		"\u0000\u0000\u0000\u0084>\u0001\u0000\u0000\u0000\u0084E\u0001\u0000\u0000"+
		"\u0000\u0084L\u0001\u0000\u0000\u0000\u0084S\u0001\u0000\u0000\u0000\u0084"+
		"X\u0001\u0000\u0000\u0000\u0084]\u0001\u0000\u0000\u0000\u0084b\u0001"+
		"\u0000\u0000\u0000\u0084g\u0001\u0000\u0000\u0000\u0084l\u0001\u0000\u0000"+
		"\u0000\u0084q\u0001\u0000\u0000\u0000\u0084v\u0001\u0000\u0000\u0000\u0084"+
		"y\u0001\u0000\u0000\u0000\u0084|\u0001\u0000\u0000\u0000\u0084\u007f\u0001"+
		"\u0000\u0000\u0000\u0085\u0005\u0001\u0000\u0000\u0000\u0086\u0087\u0006"+
		"\u0003\uffff\uffff\u0000\u0087\u0088\u0005\u0001\u0000\u0000\u0088\u00a0"+
		"\u0003\u0010\b\u0000\u0089\u008a\u0005%\u0000\u0000\u008a\u00a0\u0003"+
		"\u0006\u0003\u001b\u008b\u008c\u0005!\u0000\u0000\u008c\u00a0\u0003\u0006"+
		"\u0003\u001a\u008d\u00a0\u00053\u0000\u0000\u008e\u00a0\u00055\u0000\u0000"+
		"\u008f\u00a0\u00052\u0000\u0000\u0090\u00a0\u0005\u0006\u0000\u0000\u0091"+
		"\u0093\u0003\b\u0004\u0000\u0092\u0094\u0003\n\u0005\u0000\u0093\u0092"+
		"\u0001\u0000\u0000\u0000\u0093\u0094\u0001\u0000\u0000\u0000\u0094\u00a0"+
		"\u0001\u0000\u0000\u0000\u0095\u0097\u00054\u0000\u0000\u0096\u0098\u0003"+
		"\n\u0005\u0000\u0097\u0096\u0001\u0000\u0000\u0000\u0097\u0098\u0001\u0000"+
		"\u0000\u0000\u0098\u00a0\u0001\u0000\u0000\u0000\u0099\u009a\u0005+\u0000"+
		"\u0000\u009a\u009b\u0003\u0006\u0003\u0000\u009b\u009d\u0005,\u0000\u0000"+
		"\u009c\u009e\u0003\f\u0006\u0000\u009d\u009c\u0001\u0000\u0000\u0000\u009d"+
		"\u009e\u0001\u0000\u0000\u0000\u009e\u00a0\u0001\u0000\u0000\u0000\u009f"+
		"\u0086\u0001\u0000\u0000\u0000\u009f\u0089\u0001\u0000\u0000\u0000\u009f"+
		"\u008b\u0001\u0000\u0000\u0000\u009f\u008d\u0001\u0000\u0000\u0000\u009f"+
		"\u008e\u0001\u0000\u0000\u0000\u009f\u008f\u0001\u0000\u0000\u0000\u009f"+
		"\u0090\u0001\u0000\u0000\u0000\u009f\u0091\u0001\u0000\u0000\u0000\u009f"+
		"\u0095\u0001\u0000\u0000\u0000\u009f\u0099\u0001\u0000\u0000\u0000\u00a0"+
		"\u00dc\u0001\u0000\u0000\u0000\u00a1\u00a2\n\u0019\u0000\u0000\u00a2\u00a3"+
		"\u0005 \u0000\u0000\u00a3\u00db\u0003\u0006\u0003\u001a\u00a4\u00a5\n"+
		"\u0018\u0000\u0000\u00a5\u00a6\u0005&\u0000\u0000\u00a6\u00db\u0003\u0006"+
		"\u0003\u0019\u00a7\u00a8\n\u0017\u0000\u0000\u00a8\u00a9\u0005\'\u0000"+
		"\u0000\u00a9\u00db\u0003\u0006\u0003\u0018\u00aa\u00ab\n\u0016\u0000\u0000"+
		"\u00ab\u00ac\u0005(\u0000\u0000\u00ac\u00db\u0003\u0006\u0003\u0017\u00ad"+
		"\u00ae\n\u0015\u0000\u0000\u00ae\u00af\u0005$\u0000\u0000\u00af\u00db"+
		"\u0003\u0006\u0003\u0016\u00b0\u00b1\n\u0014\u0000\u0000\u00b1\u00b2\u0005"+
		"%\u0000\u0000\u00b2\u00db\u0003\u0006\u0003\u0015\u00b3\u00b4\n\u0011"+
		"\u0000\u0000\u00b4\u00b5\u0005\u001e\u0000\u0000\u00b5\u00db\u0003\u0006"+
		"\u0003\u0012\u00b6\u00b7\n\u0010\u0000\u0000\u00b7\u00b8\u0005\u001f\u0000"+
		"\u0000\u00b8\u00db\u0003\u0006\u0003\u0011\u00b9\u00ba\n\u000f\u0000\u0000"+
		"\u00ba\u00bb\u0005\"\u0000\u0000\u00bb\u00db\u0003\u0006\u0003\u0010\u00bc"+
		"\u00bd\n\u000e\u0000\u0000\u00bd\u00be\u0005#\u0000\u0000\u00be\u00db"+
		"\u0003\u0006\u0003\u000f\u00bf\u00c0\n\r\u0000\u0000\u00c0\u00c1\u0005"+
		"\u001c\u0000\u0000\u00c1\u00db\u0003\u0006\u0003\u000e\u00c2\u00c3\n\f"+
		"\u0000\u0000\u00c3\u00c4\u0005\u001d\u0000\u0000\u00c4\u00db\u0003\u0006"+
		"\u0003\r\u00c5\u00c6\n\u000b\u0000\u0000\u00c6\u00c7\u0005\u001b\u0000"+
		"\u0000\u00c7\u00db\u0003\u0006\u0003\f\u00c8\u00c9\n\n\u0000\u0000\u00c9"+
		"\u00ca\u0005\u001a\u0000\u0000\u00ca\u00db\u0003\u0006\u0003\u000b\u00cb"+
		"\u00cc\n\t\u0000\u0000\u00cc\u00cd\u00050\u0000\u0000\u00cd\u00ce\u0003"+
		"\u0006\u0003\u0000\u00ce\u00cf\u00051\u0000\u0000\u00cf\u00d0\u0003\u0006"+
		"\u0003\n\u00d0\u00db\u0001\u0000\u0000\u0000\u00d1\u00d2\n\b\u0000\u0000"+
		"\u00d2\u00d3\u0005\u0005\u0000\u0000\u00d3\u00db\u0003\u0006\u0003\t\u00d4"+
		"\u00d5\n\u0013\u0000\u0000\u00d5\u00d6\u0005$\u0000\u0000\u00d6\u00db"+
		"\u00056\u0000\u0000\u00d7\u00d8\n\u0012\u0000\u0000\u00d8\u00d9\u0005"+
		"%\u0000\u0000\u00d9\u00db\u00056\u0000\u0000\u00da\u00a1\u0001\u0000\u0000"+
		"\u0000\u00da\u00a4\u0001\u0000\u0000\u0000\u00da\u00a7\u0001\u0000\u0000"+
		"\u0000\u00da\u00aa\u0001\u0000\u0000\u0000\u00da\u00ad\u0001\u0000\u0000"+
		"\u0000\u00da\u00b0\u0001\u0000\u0000\u0000\u00da\u00b3\u0001\u0000\u0000"+
		"\u0000\u00da\u00b6\u0001\u0000\u0000\u0000\u00da\u00b9\u0001\u0000\u0000"+
		"\u0000\u00da\u00bc\u0001\u0000\u0000\u0000\u00da\u00bf\u0001\u0000\u0000"+
		"\u0000\u00da\u00c2\u0001\u0000\u0000\u0000\u00da\u00c5\u0001\u0000\u0000"+
		"\u0000\u00da\u00c8\u0001\u0000\u0000\u0000\u00da\u00cb\u0001\u0000\u0000"+
		"\u0000\u00da\u00d1\u0001\u0000\u0000\u0000\u00da\u00d4\u0001\u0000\u0000"+
		"\u0000\u00da\u00d7\u0001\u0000\u0000\u0000\u00db\u00de\u0001\u0000\u0000"+
		"\u0000\u00dc\u00da\u0001\u0000\u0000\u0000\u00dc\u00dd\u0001\u0000\u0000"+
		"\u0000\u00dd\u0007\u0001\u0000\u0000\u0000\u00de\u00dc\u0001\u0000\u0000"+
		"\u0000\u00df\u00e1\u0005)\u0000\u0000\u00e0\u00e2\u0003\u0014\n\u0000"+
		"\u00e1\u00e0\u0001\u0000\u0000\u0000\u00e1\u00e2\u0001\u0000\u0000\u0000"+
		"\u00e2\u00e3\u0001\u0000\u0000\u0000\u00e3\u00e4\u0005*\u0000\u0000\u00e4"+
		"\t\u0001\u0000\u0000\u0000\u00e5\u00e6\u0005)\u0000\u0000\u00e6\u00e7"+
		"\u0003\u0006\u0003\u0000\u00e7\u00e8\u0005*\u0000\u0000\u00e8\u00ea\u0001"+
		"\u0000\u0000\u0000\u00e9\u00e5\u0001\u0000\u0000\u0000\u00ea\u00eb\u0001"+
		"\u0000\u0000\u0000\u00eb\u00e9\u0001\u0000\u0000\u0000\u00eb\u00ec\u0001"+
		"\u0000\u0000\u0000\u00ec\u000b\u0001\u0000\u0000\u0000\u00ed\u00ef\u0003"+
		"\u000e\u0007\u0000\u00ee\u00ed\u0001\u0000\u0000\u0000\u00ef\u00f0\u0001"+
		"\u0000\u0000\u0000\u00f0\u00ee\u0001\u0000\u0000\u0000\u00f0\u00f1\u0001"+
		"\u0000\u0000\u0000\u00f1\r\u0001\u0000\u0000\u0000\u00f2\u00f5\u0003\u0010"+
		"\b\u0000\u00f3\u00f5\u0003\n\u0005\u0000\u00f4\u00f2\u0001\u0000\u0000"+
		"\u0000\u00f4\u00f3\u0001\u0000\u0000\u0000\u00f5\u000f\u0001\u0000\u0000"+
		"\u0000\u00f6\u00f7\u0005\u0002\u0000\u0000\u00f7\u00f9\u0003\u0012\t\u0000"+
		"\u00f8\u00f6\u0001\u0000\u0000\u0000\u00f9\u00fa\u0001\u0000\u0000\u0000"+
		"\u00fa\u00f8\u0001\u0000\u0000\u0000\u00fa\u00fb\u0001\u0000\u0000\u0000"+
		"\u00fb\u0011\u0001\u0000\u0000\u0000\u00fc\u00fd\u0005\u0003\u0000\u0000"+
		"\u00fd\u0013\u0001\u0000\u0000\u0000\u00fe\u0103\u0003\u0006\u0003\u0000"+
		"\u00ff\u0100\u0005/\u0000\u0000\u0100\u0102\u0003\u0006\u0003\u0000\u0101"+
		"\u00ff\u0001\u0000\u0000\u0000\u0102\u0105\u0001\u0000\u0000\u0000\u0103"+
		"\u0101\u0001\u0000\u0000\u0000\u0103\u0104\u0001\u0000\u0000\u0000\u0104"+
		"\u0015\u0001\u0000\u0000\u0000\u0105\u0103\u0001\u0000\u0000\u0000\u000e"+
		"\u001b\u0084\u0093\u0097\u009d\u009f\u00da\u00dc\u00e1\u00eb\u00f0\u00f4"+
		"\u00fa\u0103";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}