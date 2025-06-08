
import { AbstractParseTreeVisitor } from "antlr4ng";


import { ParseContext } from "./IdemParser.js";
import { BlockContext } from "./IdemParser.js";
import { FloorFunctionCallContext } from "./IdemParser.js";
import { CeilFunctionCallContext } from "./IdemParser.js";
import { RoundFunctionCallContext } from "./IdemParser.js";
import { SizeFunctionCallContext } from "./IdemParser.js";
import { DayDiffFunctionCallContext } from "./IdemParser.js";
import { WeekDiffFunctionCallContext } from "./IdemParser.js";
import { MonthDiffFunctionCallContext } from "./IdemParser.js";
import { YearDiffFunctionCallContext } from "./IdemParser.js";
import { YearFunctionCallContext } from "./IdemParser.js";
import { DayOfYearFunctionCallContext } from "./IdemParser.js";
import { WeekOfYearFunctionCallContext } from "./IdemParser.js";
import { MonthOfYearFunctionCallContext } from "./IdemParser.js";
import { DayOfMonthFunctionCallContext } from "./IdemParser.js";
import { WeekOfMonthFunctionCallContext } from "./IdemParser.js";
import { DayOfWeekFunctionCallContext } from "./IdemParser.js";
import { TodayFunctionCallContext } from "./IdemParser.js";
import { YesterdayFunctionCallContext } from "./IdemParser.js";
import { TomorrowFunctionCallContext } from "./IdemParser.js";
import { BoolToIntFunctionCallContext } from "./IdemParser.js";
import { SelfExpressionContext } from "./IdemParser.js";
import { UnaryMinusExpressionContext } from "./IdemParser.js";
import { NotExpressionContext } from "./IdemParser.js";
import { NumberExpressionContext } from "./IdemParser.js";
import { LocalDateExpressionContext } from "./IdemParser.js";
import { BoolExpressionContext } from "./IdemParser.js";
import { NullExpressionContext } from "./IdemParser.js";
import { ListExpressionContext } from "./IdemParser.js";
import { StringExpressionContext } from "./IdemParser.js";
import { ExpressionExpressionContext } from "./IdemParser.js";
import { PowerExpressionContext } from "./IdemParser.js";
import { MultiplyExpressionContext } from "./IdemParser.js";
import { DivideExpressionContext } from "./IdemParser.js";
import { ModulusExpressionContext } from "./IdemParser.js";
import { AddExpressionContext } from "./IdemParser.js";
import { SubtractExpressionContext } from "./IdemParser.js";
import { GtEqExpressionContext } from "./IdemParser.js";
import { LtEqExpressionContext } from "./IdemParser.js";
import { GtExpressionContext } from "./IdemParser.js";
import { LtExpressionContext } from "./IdemParser.js";
import { EqExpressionContext } from "./IdemParser.js";
import { NotEqExpressionContext } from "./IdemParser.js";
import { AndExpressionContext } from "./IdemParser.js";
import { OrExpressionContext } from "./IdemParser.js";
import { TernaryExpressionContext } from "./IdemParser.js";
import { InExpressionContext } from "./IdemParser.js";
import { AddDatePartExpressionContext } from "./IdemParser.js";
import { SubtractDatePartExpressionContext } from "./IdemParser.js";
import { ListContext } from "./IdemParser.js";
import { IndexesContext } from "./IdemParser.js";
import { PointersContext } from "./IdemParser.js";
import { PointerContext } from "./IdemParser.js";
import { TagsContext } from "./IdemParser.js";
import { FeatureContext } from "./IdemParser.js";
import { ExprListContext } from "./IdemParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `IdemParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class IdemVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `IdemParser.parse`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParse?: (ctx: ParseContext) => Result;
    /**
     * Visit a parse tree produced by `IdemParser.block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock?: (ctx: BlockContext) => Result;
    /**
     * Visit a parse tree produced by the `floorFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFloorFunctionCall?: (ctx: FloorFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `ceilFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCeilFunctionCall?: (ctx: CeilFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `roundFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRoundFunctionCall?: (ctx: RoundFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `sizeFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSizeFunctionCall?: (ctx: SizeFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `dayDiffFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDayDiffFunctionCall?: (ctx: DayDiffFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `weekDiffFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWeekDiffFunctionCall?: (ctx: WeekDiffFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `monthDiffFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMonthDiffFunctionCall?: (ctx: MonthDiffFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `yearDiffFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitYearDiffFunctionCall?: (ctx: YearDiffFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `yearFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitYearFunctionCall?: (ctx: YearFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `dayOfYearFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDayOfYearFunctionCall?: (ctx: DayOfYearFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `weekOfYearFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWeekOfYearFunctionCall?: (ctx: WeekOfYearFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `monthOfYearFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMonthOfYearFunctionCall?: (ctx: MonthOfYearFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `dayOfMonthFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDayOfMonthFunctionCall?: (ctx: DayOfMonthFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `weekOfMonthFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWeekOfMonthFunctionCall?: (ctx: WeekOfMonthFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `dayOfWeekFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDayOfWeekFunctionCall?: (ctx: DayOfWeekFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `todayFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTodayFunctionCall?: (ctx: TodayFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `yesterdayFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitYesterdayFunctionCall?: (ctx: YesterdayFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `tomorrowFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTomorrowFunctionCall?: (ctx: TomorrowFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `boolToIntFunctionCall`
     * labeled alternative in `IdemParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBoolToIntFunctionCall?: (ctx: BoolToIntFunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by the `selfExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSelfExpression?: (ctx: SelfExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `unaryMinusExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnaryMinusExpression?: (ctx: UnaryMinusExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `notExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNotExpression?: (ctx: NotExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `numberExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNumberExpression?: (ctx: NumberExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `localDateExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLocalDateExpression?: (ctx: LocalDateExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `boolExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBoolExpression?: (ctx: BoolExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `nullExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNullExpression?: (ctx: NullExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `listExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitListExpression?: (ctx: ListExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `stringExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStringExpression?: (ctx: StringExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `expressionExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpressionExpression?: (ctx: ExpressionExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `powerExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPowerExpression?: (ctx: PowerExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `multiplyExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMultiplyExpression?: (ctx: MultiplyExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `divideExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDivideExpression?: (ctx: DivideExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `modulusExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitModulusExpression?: (ctx: ModulusExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `addExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAddExpression?: (ctx: AddExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `subtractExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSubtractExpression?: (ctx: SubtractExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `gtEqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGtEqExpression?: (ctx: GtEqExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `ltEqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLtEqExpression?: (ctx: LtEqExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `gtExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGtExpression?: (ctx: GtExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `ltExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLtExpression?: (ctx: LtExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `eqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEqExpression?: (ctx: EqExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `notEqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNotEqExpression?: (ctx: NotEqExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `andExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAndExpression?: (ctx: AndExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `orExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitOrExpression?: (ctx: OrExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `ternaryExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTernaryExpression?: (ctx: TernaryExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `inExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInExpression?: (ctx: InExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `addDatePartExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAddDatePartExpression?: (ctx: AddDatePartExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `subtractDatePartExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSubtractDatePartExpression?: (ctx: SubtractDatePartExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `IdemParser.list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitList?: (ctx: ListContext) => Result;
    /**
     * Visit a parse tree produced by `IdemParser.indexes`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIndexes?: (ctx: IndexesContext) => Result;
    /**
     * Visit a parse tree produced by `IdemParser.pointers`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPointers?: (ctx: PointersContext) => Result;
    /**
     * Visit a parse tree produced by `IdemParser.pointer`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPointer?: (ctx: PointerContext) => Result;
    /**
     * Visit a parse tree produced by `IdemParser.tags`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTags?: (ctx: TagsContext) => Result;
    /**
     * Visit a parse tree produced by `IdemParser.feature`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFeature?: (ctx: FeatureContext) => Result;
    /**
     * Visit a parse tree produced by `IdemParser.exprList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExprList?: (ctx: ExprListContext) => Result;
}

