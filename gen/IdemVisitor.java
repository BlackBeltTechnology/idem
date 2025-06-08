// Generated from /Users/robson/Project/idem/src/main/antlr4/hu.blackbelt.idem/Idem.g4 by ANTLR 4.13.2
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link IdemParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface IdemVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link IdemParser#parse}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitParse(IdemParser.ParseContext ctx);
	/**
	 * Visit a parse tree produced by {@link IdemParser#block}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBlock(IdemParser.BlockContext ctx);
	/**
	 * Visit a parse tree produced by the {@code floorFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFloorFunctionCall(IdemParser.FloorFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ceilFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCeilFunctionCall(IdemParser.CeilFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code roundFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRoundFunctionCall(IdemParser.RoundFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code sizeFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSizeFunctionCall(IdemParser.SizeFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code dayDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDayDiffFunctionCall(IdemParser.DayDiffFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code weekDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitWeekDiffFunctionCall(IdemParser.WeekDiffFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code monthDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMonthDiffFunctionCall(IdemParser.MonthDiffFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code yearDiffFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitYearDiffFunctionCall(IdemParser.YearDiffFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code yearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitYearFunctionCall(IdemParser.YearFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code dayOfYearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDayOfYearFunctionCall(IdemParser.DayOfYearFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code weekOfYearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitWeekOfYearFunctionCall(IdemParser.WeekOfYearFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code monthOfYearFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMonthOfYearFunctionCall(IdemParser.MonthOfYearFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code dayOfMonthFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDayOfMonthFunctionCall(IdemParser.DayOfMonthFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code weekOfMonthFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitWeekOfMonthFunctionCall(IdemParser.WeekOfMonthFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code dayOfWeekFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDayOfWeekFunctionCall(IdemParser.DayOfWeekFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code todayFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTodayFunctionCall(IdemParser.TodayFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code yesterdayFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitYesterdayFunctionCall(IdemParser.YesterdayFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code tomorrowFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTomorrowFunctionCall(IdemParser.TomorrowFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code boolToIntFunctionCall}
	 * labeled alternative in {@link IdemParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBoolToIntFunctionCall(IdemParser.BoolToIntFunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by the {@code gtExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitGtExpression(IdemParser.GtExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code numberExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumberExpression(IdemParser.NumberExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code modulusExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitModulusExpression(IdemParser.ModulusExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code notExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNotExpression(IdemParser.NotExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code multiplyExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMultiplyExpression(IdemParser.MultiplyExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code gtEqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitGtEqExpression(IdemParser.GtEqExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code localDateExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLocalDateExpression(IdemParser.LocalDateExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code andExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAndExpression(IdemParser.AndExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code stringExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringExpression(IdemParser.StringExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code expressionExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpressionExpression(IdemParser.ExpressionExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code nullExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNullExpression(IdemParser.NullExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code listExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitListExpression(IdemParser.ListExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ltEqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLtEqExpression(IdemParser.LtEqExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ltExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLtExpression(IdemParser.LtExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code boolExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBoolExpression(IdemParser.BoolExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code notEqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNotEqExpression(IdemParser.NotEqExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code divideExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDivideExpression(IdemParser.DivideExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code orExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitOrExpression(IdemParser.OrExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code unaryMinusExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnaryMinusExpression(IdemParser.UnaryMinusExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code powerExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPowerExpression(IdemParser.PowerExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code eqExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEqExpression(IdemParser.EqExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code inExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInExpression(IdemParser.InExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code addExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAddExpression(IdemParser.AddExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code subtractExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSubtractExpression(IdemParser.SubtractExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code selfExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSelfExpression(IdemParser.SelfExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code addDatePartExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAddDatePartExpression(IdemParser.AddDatePartExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code subtractDatePartExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSubtractDatePartExpression(IdemParser.SubtractDatePartExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ternaryExpression}
	 * labeled alternative in {@link IdemParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTernaryExpression(IdemParser.TernaryExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link IdemParser#list}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitList(IdemParser.ListContext ctx);
	/**
	 * Visit a parse tree produced by {@link IdemParser#indexes}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIndexes(IdemParser.IndexesContext ctx);
	/**
	 * Visit a parse tree produced by {@link IdemParser#pointers}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPointers(IdemParser.PointersContext ctx);
	/**
	 * Visit a parse tree produced by {@link IdemParser#pointer}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPointer(IdemParser.PointerContext ctx);
	/**
	 * Visit a parse tree produced by {@link IdemParser#tags}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTags(IdemParser.TagsContext ctx);
	/**
	 * Visit a parse tree produced by {@link IdemParser#feature}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFeature(IdemParser.FeatureContext ctx);
	/**
	 * Visit a parse tree produced by {@link IdemParser#exprList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExprList(IdemParser.ExprListContext ctx);
}