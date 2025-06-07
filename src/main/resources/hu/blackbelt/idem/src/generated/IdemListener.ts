
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ParseContext } from "./IdemParser.js";
import { BlockContext } from "./IdemParser.js";
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
 * This interface defines a complete listener for a parse tree produced by
 * `IdemParser`.
 */
export class IdemListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `IdemParser.parse`.
     * @param ctx the parse tree
     */
    enterParse?: (ctx: ParseContext) => void;
    /**
     * Exit a parse tree produced by `IdemParser.parse`.
     * @param ctx the parse tree
     */
    exitParse?: (ctx: ParseContext) => void;
    /**
     * Enter a parse tree produced by `IdemParser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `IdemParser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by the `selfExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterSelfExpression?: (ctx: SelfExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `selfExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitSelfExpression?: (ctx: SelfExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `unaryMinusExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterUnaryMinusExpression?: (ctx: UnaryMinusExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `unaryMinusExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitUnaryMinusExpression?: (ctx: UnaryMinusExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `notExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterNotExpression?: (ctx: NotExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `notExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitNotExpression?: (ctx: NotExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `numberExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterNumberExpression?: (ctx: NumberExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `numberExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitNumberExpression?: (ctx: NumberExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `localDateExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterLocalDateExpression?: (ctx: LocalDateExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `localDateExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitLocalDateExpression?: (ctx: LocalDateExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `boolExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterBoolExpression?: (ctx: BoolExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `boolExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitBoolExpression?: (ctx: BoolExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `nullExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterNullExpression?: (ctx: NullExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `nullExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitNullExpression?: (ctx: NullExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `listExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterListExpression?: (ctx: ListExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `listExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitListExpression?: (ctx: ListExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `stringExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterStringExpression?: (ctx: StringExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `stringExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitStringExpression?: (ctx: StringExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `expressionExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterExpressionExpression?: (ctx: ExpressionExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `expressionExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitExpressionExpression?: (ctx: ExpressionExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `powerExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterPowerExpression?: (ctx: PowerExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `powerExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitPowerExpression?: (ctx: PowerExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `multiplyExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterMultiplyExpression?: (ctx: MultiplyExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `multiplyExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitMultiplyExpression?: (ctx: MultiplyExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `divideExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterDivideExpression?: (ctx: DivideExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `divideExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitDivideExpression?: (ctx: DivideExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `modulusExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterModulusExpression?: (ctx: ModulusExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `modulusExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitModulusExpression?: (ctx: ModulusExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `addExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterAddExpression?: (ctx: AddExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `addExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitAddExpression?: (ctx: AddExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `subtractExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterSubtractExpression?: (ctx: SubtractExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `subtractExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitSubtractExpression?: (ctx: SubtractExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `gtEqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterGtEqExpression?: (ctx: GtEqExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `gtEqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitGtEqExpression?: (ctx: GtEqExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ltEqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterLtEqExpression?: (ctx: LtEqExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ltEqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitLtEqExpression?: (ctx: LtEqExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `gtExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterGtExpression?: (ctx: GtExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `gtExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitGtExpression?: (ctx: GtExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ltExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterLtExpression?: (ctx: LtExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ltExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitLtExpression?: (ctx: LtExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `eqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterEqExpression?: (ctx: EqExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `eqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitEqExpression?: (ctx: EqExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `notEqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterNotEqExpression?: (ctx: NotEqExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `notEqExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitNotEqExpression?: (ctx: NotEqExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `andExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `andExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `orExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterOrExpression?: (ctx: OrExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `orExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitOrExpression?: (ctx: OrExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ternaryExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterTernaryExpression?: (ctx: TernaryExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ternaryExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitTernaryExpression?: (ctx: TernaryExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `inExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterInExpression?: (ctx: InExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `inExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitInExpression?: (ctx: InExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `addDatePartExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterAddDatePartExpression?: (ctx: AddDatePartExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `addDatePartExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitAddDatePartExpression?: (ctx: AddDatePartExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `subtractDatePartExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    enterSubtractDatePartExpression?: (ctx: SubtractDatePartExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `subtractDatePartExpression`
     * labeled alternative in `IdemParser.expression`.
     * @param ctx the parse tree
     */
    exitSubtractDatePartExpression?: (ctx: SubtractDatePartExpressionContext) => void;
    /**
     * Enter a parse tree produced by `IdemParser.list`.
     * @param ctx the parse tree
     */
    enterList?: (ctx: ListContext) => void;
    /**
     * Exit a parse tree produced by `IdemParser.list`.
     * @param ctx the parse tree
     */
    exitList?: (ctx: ListContext) => void;
    /**
     * Enter a parse tree produced by `IdemParser.indexes`.
     * @param ctx the parse tree
     */
    enterIndexes?: (ctx: IndexesContext) => void;
    /**
     * Exit a parse tree produced by `IdemParser.indexes`.
     * @param ctx the parse tree
     */
    exitIndexes?: (ctx: IndexesContext) => void;
    /**
     * Enter a parse tree produced by `IdemParser.pointers`.
     * @param ctx the parse tree
     */
    enterPointers?: (ctx: PointersContext) => void;
    /**
     * Exit a parse tree produced by `IdemParser.pointers`.
     * @param ctx the parse tree
     */
    exitPointers?: (ctx: PointersContext) => void;
    /**
     * Enter a parse tree produced by `IdemParser.pointer`.
     * @param ctx the parse tree
     */
    enterPointer?: (ctx: PointerContext) => void;
    /**
     * Exit a parse tree produced by `IdemParser.pointer`.
     * @param ctx the parse tree
     */
    exitPointer?: (ctx: PointerContext) => void;
    /**
     * Enter a parse tree produced by `IdemParser.tags`.
     * @param ctx the parse tree
     */
    enterTags?: (ctx: TagsContext) => void;
    /**
     * Exit a parse tree produced by `IdemParser.tags`.
     * @param ctx the parse tree
     */
    exitTags?: (ctx: TagsContext) => void;
    /**
     * Enter a parse tree produced by `IdemParser.feature`.
     * @param ctx the parse tree
     */
    enterFeature?: (ctx: FeatureContext) => void;
    /**
     * Exit a parse tree produced by `IdemParser.feature`.
     * @param ctx the parse tree
     */
    exitFeature?: (ctx: FeatureContext) => void;
    /**
     * Enter a parse tree produced by `IdemParser.exprList`.
     * @param ctx the parse tree
     */
    enterExprList?: (ctx: ExprListContext) => void;
    /**
     * Exit a parse tree produced by `IdemParser.exprList`.
     * @param ctx the parse tree
     */
    exitExprList?: (ctx: ExprListContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

