// Generated from /Users/robson/Project/idem/src/main/antlr4/hu.blackbelt.idem/Idem.g4 by ANTLR 4.13.2
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link IdemParser}.
 */
public interface IdemListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link IdemParser#parse}.
	 * @param ctx the parse tree
	 */
	void enterParse(IdemParser.ParseContext ctx);
	/**
	 * Exit a parse tree produced by {@link IdemParser#parse}.
	 * @param ctx the parse tree
	 */
	void exitParse(IdemParser.ParseContext ctx);
	/**
	 * Enter a parse tree produced by {@link IdemParser#block}.
	 * @param ctx the parse tree
	 */
	void enterBlock(IdemParser.BlockContext ctx);
	/**
	 * Exit a parse tree produced by {@link IdemParser#block}.
	 * @param ctx the parse tree
	 */
	void exitBlock(IdemParser.BlockContext ctx);
	/**
	 * Enter a parse tree produced by the {@code floorFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterFloorFunctionCall(IdemParser.FloorFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code floorFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitFloorFunctionCall(IdemParser.FloorFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ceilFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterCeilFunctionCall(IdemParser.CeilFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ceilFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitCeilFunctionCall(IdemParser.CeilFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code roundFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterRoundFunctionCall(IdemParser.RoundFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code roundFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitRoundFunctionCall(IdemParser.RoundFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code sizeFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterSizeFunctionCall(IdemParser.SizeFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code sizeFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitSizeFunctionCall(IdemParser.SizeFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code dayDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterDayDiffFunctionCall(IdemParser.DayDiffFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code dayDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitDayDiffFunctionCall(IdemParser.DayDiffFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code weekDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterWeekDiffFunctionCall(IdemParser.WeekDiffFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code weekDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitWeekDiffFunctionCall(IdemParser.WeekDiffFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code monthDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterMonthDiffFunctionCall(IdemParser.MonthDiffFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code monthDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitMonthDiffFunctionCall(IdemParser.MonthDiffFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code yearDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterYearDiffFunctionCall(IdemParser.YearDiffFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code yearDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitYearDiffFunctionCall(IdemParser.YearDiffFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code yearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterYearFunctionCall(IdemParser.YearFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code yearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitYearFunctionCall(IdemParser.YearFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code dayOfYearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterDayOfYearFunctionCall(IdemParser.DayOfYearFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code dayOfYearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitDayOfYearFunctionCall(IdemParser.DayOfYearFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code weekOfYearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterWeekOfYearFunctionCall(IdemParser.WeekOfYearFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code weekOfYearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitWeekOfYearFunctionCall(IdemParser.WeekOfYearFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code monthOfYearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterMonthOfYearFunctionCall(IdemParser.MonthOfYearFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code monthOfYearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitMonthOfYearFunctionCall(IdemParser.MonthOfYearFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code dayOfMonthFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterDayOfMonthFunctionCall(IdemParser.DayOfMonthFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code dayOfMonthFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitDayOfMonthFunctionCall(IdemParser.DayOfMonthFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code weekOfMonthFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterWeekOfMonthFunctionCall(IdemParser.WeekOfMonthFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code weekOfMonthFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitWeekOfMonthFunctionCall(IdemParser.WeekOfMonthFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code dayOfWeekFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterDayOfWeekFunctionCall(IdemParser.DayOfWeekFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code dayOfWeekFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitDayOfWeekFunctionCall(IdemParser.DayOfWeekFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code todayFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterTodayFunctionCall(IdemParser.TodayFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code todayFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitTodayFunctionCall(IdemParser.TodayFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code yesterdayFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterYesterdayFunctionCall(IdemParser.YesterdayFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code yesterdayFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitYesterdayFunctionCall(IdemParser.YesterdayFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code tomorrowFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterTomorrowFunctionCall(IdemParser.TomorrowFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code tomorrowFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitTomorrowFunctionCall(IdemParser.TomorrowFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code boolToIntFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterBoolToIntFunctionCall(IdemParser.BoolToIntFunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by the {@code boolToIntFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitBoolToIntFunctionCall(IdemParser.BoolToIntFunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by the {@code gtExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterGtExpression(IdemParser.GtExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code gtExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitGtExpression(IdemParser.GtExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code numberExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNumberExpression(IdemParser.NumberExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code numberExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNumberExpression(IdemParser.NumberExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code modulusExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterModulusExpression(IdemParser.ModulusExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code modulusExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitModulusExpression(IdemParser.ModulusExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code notExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNotExpression(IdemParser.NotExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code notExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNotExpression(IdemParser.NotExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code multiplyExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterMultiplyExpression(IdemParser.MultiplyExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code multiplyExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitMultiplyExpression(IdemParser.MultiplyExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code gtEqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterGtEqExpression(IdemParser.GtEqExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code gtEqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitGtEqExpression(IdemParser.GtEqExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code localDateExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterLocalDateExpression(IdemParser.LocalDateExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code localDateExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitLocalDateExpression(IdemParser.LocalDateExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code andExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterAndExpression(IdemParser.AndExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code andExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitAndExpression(IdemParser.AndExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code stringExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterStringExpression(IdemParser.StringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code stringExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitStringExpression(IdemParser.StringExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code expressionExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterExpressionExpression(IdemParser.ExpressionExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code expressionExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitExpressionExpression(IdemParser.ExpressionExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code nullExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNullExpression(IdemParser.NullExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code nullExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNullExpression(IdemParser.NullExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code listExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterListExpression(IdemParser.ListExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code listExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitListExpression(IdemParser.ListExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ltEqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterLtEqExpression(IdemParser.LtEqExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ltEqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitLtEqExpression(IdemParser.LtEqExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ltExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterLtExpression(IdemParser.LtExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ltExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitLtExpression(IdemParser.LtExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code boolExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterBoolExpression(IdemParser.BoolExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code boolExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitBoolExpression(IdemParser.BoolExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code notEqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNotEqExpression(IdemParser.NotEqExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code notEqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNotEqExpression(IdemParser.NotEqExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code divideExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterDivideExpression(IdemParser.DivideExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code divideExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitDivideExpression(IdemParser.DivideExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code orExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterOrExpression(IdemParser.OrExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code orExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitOrExpression(IdemParser.OrExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code unaryMinusExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterUnaryMinusExpression(IdemParser.UnaryMinusExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code unaryMinusExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitUnaryMinusExpression(IdemParser.UnaryMinusExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code powerExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterPowerExpression(IdemParser.PowerExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code powerExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitPowerExpression(IdemParser.PowerExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code eqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterEqExpression(IdemParser.EqExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code eqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitEqExpression(IdemParser.EqExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code inExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterInExpression(IdemParser.InExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code inExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitInExpression(IdemParser.InExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code addExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterAddExpression(IdemParser.AddExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code addExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitAddExpression(IdemParser.AddExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code subtractExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterSubtractExpression(IdemParser.SubtractExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code subtractExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitSubtractExpression(IdemParser.SubtractExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code selfExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterSelfExpression(IdemParser.SelfExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code selfExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitSelfExpression(IdemParser.SelfExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code addDatePartExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterAddDatePartExpression(IdemParser.AddDatePartExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code addDatePartExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitAddDatePartExpression(IdemParser.AddDatePartExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code subtractDatePartExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterSubtractDatePartExpression(IdemParser.SubtractDatePartExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code subtractDatePartExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitSubtractDatePartExpression(IdemParser.SubtractDatePartExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ternaryExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterTernaryExpression(IdemParser.TernaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ternaryExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitTernaryExpression(IdemParser.TernaryExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link IdemParser#list}.
	 * @param ctx the parse tree
	 */
	void enterList(IdemParser.ListContext ctx);
	/**
	 * Exit a parse tree produced by {@link IdemParser#list}.
	 * @param ctx the parse tree
	 */
	void exitList(IdemParser.ListContext ctx);
	/**
	 * Enter a parse tree produced by {@link IdemParser#indexes}.
	 * @param ctx the parse tree
	 */
	void enterIndexes(IdemParser.IndexesContext ctx);
	/**
	 * Exit a parse tree produced by {@link IdemParser#indexes}.
	 * @param ctx the parse tree
	 */
	void exitIndexes(IdemParser.IndexesContext ctx);
	/**
	 * Enter a parse tree produced by {@link IdemParser#pointers}.
	 * @param ctx the parse tree
	 */
	void enterPointers(IdemParser.PointersContext ctx);
	/**
	 * Exit a parse tree produced by {@link IdemParser#pointers}.
	 * @param ctx the parse tree
	 */
	void exitPointers(IdemParser.PointersContext ctx);
	/**
	 * Enter a parse tree produced by {@link IdemParser#pointer}.
	 * @param ctx the parse tree
	 */
	void enterPointer(IdemParser.PointerContext ctx);
	/**
	 * Exit a parse tree produced by {@link IdemParser#pointer}.
	 * @param ctx the parse tree
	 */
	void exitPointer(IdemParser.PointerContext ctx);
	/**
	 * Enter a parse tree produced by {@link IdemParser#tags}.
	 * @param ctx the parse tree
	 */
	void enterTags(IdemParser.TagsContext ctx);
	/**
	 * Exit a parse tree produced by {@link IdemParser#tags}.
	 * @param ctx the parse tree
	 */
	void exitTags(IdemParser.TagsContext ctx);
	/**
	 * Enter a parse tree produced by {@link IdemParser#feature}.
	 * @param ctx the parse tree
	 */
	void enterFeature(IdemParser.FeatureContext ctx);
	/**
	 * Exit a parse tree produced by {@link IdemParser#feature}.
	 * @param ctx the parse tree
	 */
	void exitFeature(IdemParser.FeatureContext ctx);
	/**
	 * Enter a parse tree produced by {@link IdemParser#exprList}.
	 * @param ctx the parse tree
	 */
	void enterExprList(IdemParser.ExprListContext ctx);
	/**
	 * Exit a parse tree produced by {@link IdemParser#exprList}.
	 * @param ctx the parse tree
	 */
	void exitExprList(IdemParser.ExprListContext ctx);
}