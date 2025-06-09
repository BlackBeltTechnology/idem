import type {
  AddDatePartExpressionContext,
  AddExpressionContext,
  XorExpressionContext,
  AndExpressionContext,
  BoolExpressionContext,
  DivideExpressionContext,
  DivExpressionContext,
  EqExpressionContext,
  ExprListContext,
  ExpressionContext,
  ExpressionExpressionContext,
  GtEqExpressionContext,
  GtExpressionContext,
  InExpressionContext,
  ImpliesExpressionContext,
  IndexesContext,
  IndexedAccessExpressionContext,
  ListContext,
  ListExpressionContext,
  LocalDateExpressionContext,
  LtEqExpressionContext,
  LtExpressionContext,
  ModulusExpressionContext,
  MultiplyExpressionContext,
  ModExpressionContext,
  NotEqExpressionContext,
  NotExpressionContext,
  NullExpressionContext,
  NumberExpressionContext,
  OrExpressionContext,
  ParseContext,
  PointerContext,
  PointersContext,
  PostfixFunctionCallExpressionContext,
  PowerExpressionContext,
  SelfExpressionContext,
  StringExpressionContext,
  SubtractDatePartExpressionContext,
  SubtractExpressionContext,
  TagsContext,
  TernaryExpressionContext,
  TimeExpressionContext,
  TimestampExpressionContext,
  TodayExpressionContext,
  TomorrowExpressionContext,
  UnaryMinusExpressionContext,
  YesterdayExpressionContext,
} from '~/generated/IdemParser';
import { IdemVisitor } from '~/generated/IdemVisitor';
import type { AstNodeType } from '~/types/ast';

export type ASTNode = {
  type: AstNodeType;
  [key: string]: any;
};

export class Visitor extends IdemVisitor<ASTNode> {
  private constructor() {
    super();
  }

  private static INSTANCE = new Visitor();
  static getInstance = () => Visitor.INSTANCE;

  visitParse = (ctx: ParseContext): ASTNode => this.visit(ctx.expression()) as ASTNode;

  visitPostfixFunctionCallExpression = (ctx: PostfixFunctionCallExpressionContext): ASTNode => ({
    type: 'PostfixFunctionCall',
    expr: this.visit(ctx.expression()),
    functionName: ctx.Identifier().getText(),
    args: ctx.exprList() ? (this.visit(ctx.exprList() as ExprListContext) as ASTNode).elements : [],
  });

  visitLocalDateExpression = (ctx: LocalDateExpressionContext): ASTNode => ({
    type: 'LocalDate',
    value: ctx.getText(),
  });

  visitTimestampExpression = (ctx: TimestampExpressionContext): ASTNode => ({
    type: 'Timestamp',
    value: ctx.getText(),
  });

  visitTimeExpression = (ctx: TimeExpressionContext): ASTNode => ({
    type: 'Time',
    value: ctx.getText(),
  });

  visitTodayExpression = (_ctx: TodayExpressionContext): ASTNode => ({ type: 'Today' });
  visitYesterdayExpression = (_ctx: YesterdayExpressionContext): ASTNode => ({ type: 'Yesterday' });
  visitTomorrowExpression = (_ctx: TomorrowExpressionContext): ASTNode => ({ type: 'Tomorrow' });

  visitIndexedAccessExpression = (ctx: IndexedAccessExpressionContext): ASTNode => ({
    type: 'IndexAccess',
    expr: this.visit(ctx.expression()),
    indexes: this.visit(ctx.indexes()),
  });

  visitSelfExpression = (ctx: SelfExpressionContext): ASTNode => ({
    type: 'Self',
    tags: this.visit(ctx.tags()),
  });

  visitUnaryMinusExpression = (ctx: UnaryMinusExpressionContext): ASTNode => ({
    type: 'UnaryMinus',
    expr: this.visit(ctx.expression()),
  });

  visitNotExpression = (ctx: NotExpressionContext): ASTNode => ({
    type: 'Not',
    expr: this.visit(ctx.expression()),
  });

  visitPowerExpression = (ctx: PowerExpressionContext): ASTNode => ({
    type: 'Power',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitMultiplyExpression = (ctx: MultiplyExpressionContext): ASTNode => ({
    type: 'Multiply',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitDivideExpression = (ctx: DivideExpressionContext): ASTNode => ({
    type: 'Divide',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitModulusExpression = (ctx: ModulusExpressionContext): ASTNode => ({
    type: 'Modulus',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitDivExpression = (ctx: DivExpressionContext): ASTNode => ({
    type: 'Div',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitModExpression = (ctx: ModExpressionContext): ASTNode => ({
    type: 'Mod',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });



  visitAddExpression = (ctx: AddExpressionContext): ASTNode => ({
    type: 'Add',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitSubtractExpression = (ctx: SubtractExpressionContext): ASTNode => ({
    type: 'Subtract',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitAddDatePartExpression = (ctx: AddDatePartExpressionContext): ASTNode => ({
    type: 'AddDatePart',
    left: this.visit(ctx.expression()),
    datePart: ctx.DatePart().getText(),
  });

  visitSubtractDatePartExpression = (ctx: SubtractDatePartExpressionContext): ASTNode => ({
    type: 'SubtractDatePart',
    left: this.visit(ctx.expression()),
    datePart: ctx.DatePart().getText(),
  });

  visitGtEqExpression = (ctx: GtEqExpressionContext): ASTNode => ({
    type: 'Gte',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitLtEqExpression = (ctx: LtEqExpressionContext): ASTNode => ({
    type: 'Lte',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitGtExpression = (ctx: GtExpressionContext): ASTNode => ({
    type: 'Gt',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitLtExpression = (ctx: LtExpressionContext): ASTNode => ({
    type: 'Lt',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitEqExpression = (ctx: EqExpressionContext): ASTNode => ({
    type: 'Eq',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitNotEqExpression = (ctx: NotEqExpressionContext): ASTNode => ({
    type: 'NotEq',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitAndExpression = (ctx: AndExpressionContext): ASTNode => ({
    type: 'And',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitOrExpression = (ctx: OrExpressionContext): ASTNode => ({
    type: 'Or',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitXorExpression = (ctx: XorExpressionContext): ASTNode => ({
    type: 'Xor',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitImpliesExpression = (ctx: ImpliesExpressionContext): ASTNode => ({
    type: 'Implies',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitTernaryExpression = (ctx: TernaryExpressionContext): ASTNode => ({
    type: 'Ternary',
    cond: this.visit(ctx.expression(0) as ExpressionContext),
    // biome-ignore lint/suspicious/noThenProperty: <explanation>
    then: this.visit(ctx.expression(1) as ExpressionContext),
    else: this.visit(ctx.expression(2) as ExpressionContext),
  });

  visitInExpression = (ctx: InExpressionContext): ASTNode => ({
    type: 'In',
    left: this.visit(ctx.expression(0) as ExpressionContext),
    right: this.visit(ctx.expression(1) as ExpressionContext),
  });

  visitNumberExpression = (ctx: NumberExpressionContext): ASTNode => ({
    type: 'Number',
    value: Number.parseFloat(ctx.getText()),
  });

  visitBoolExpression = (ctx: BoolExpressionContext): ASTNode => ({
    type: 'Boolean',
    value: ctx.getText() === 'true',
  });

  visitNullExpression = (_ctx: NullExpressionContext): ASTNode => ({
    type: 'Null',
    value: null,
  });

  visitListExpression = (ctx: ListExpressionContext): ASTNode => this.visit(ctx.list()) as ASTNode;

  visitStringExpression = (ctx: StringExpressionContext): ASTNode => {
    const raw = ctx.getText();
    return { type: 'String', value: raw.substring(1, raw.length - 1) };
  };

  visitExpressionExpression = (ctx: ExpressionExpressionContext): ASTNode => {
    const base = this.visit(ctx.expression());
    if (ctx.pointers()) {
      return { type: 'PointerAccess', expr: base, pointers: this.visit(ctx.pointers() as PointersContext) };
    }
    return base as ASTNode;
  };

  visitList = (ctx: ListContext): ASTNode => ({
    type: 'List',
    elements: ctx.exprList() ? (this.visit(ctx.exprList() as ExprListContext) as ASTNode).elements : [],
  });

  visitExprList = (ctx: ExprListContext): ASTNode => ({
    type: 'ExprList',
    elements: ctx.expression().map((e) => this.visit(e)),
  });

  visitIndexes = (ctx: IndexesContext): ASTNode => ({
    type: 'Indexes',
    elements: ctx.expression().map((e) => this.visit(e)),
  });

  visitPointers = (ctx: PointersContext): ASTNode => ({
    type: 'Pointers',
    elements: ctx.pointer().map((p) => this.visit(p)),
  });

  visitPointer = (ctx: PointerContext): ASTNode => {
    if (ctx.tags()) {
      return this.visit(ctx.tags() as TagsContext) as ASTNode;
    }
    return {
      type: 'Index',
      indexes: this.visit(ctx.indexes() as IndexesContext),
    };
  };

  visitTags = (ctx: TagsContext): ASTNode => ({
    type: 'Tags',
    features: ctx.feature().map((f) => f.Identifier().getText()),
  });
}
