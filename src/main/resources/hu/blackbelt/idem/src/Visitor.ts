import type {
  AddSubtractExpressionContext,
  AndExpressionContext,
  ArgumentContext,
  ArgumentListContext,
  BooleanFalseLiteralAltContext,
  BooleanTrueLiteralAltContext,
  ComparisonExpressionContext,
  DateLiteralContext,
  EnumLiteralAltContext,
  EnumLiteralContext,
  EqualityExpressionContext,
  ExpressionContext,
  FunctionCallExpressionContext,
  IdentifierExpressionContext,
  ImpliesExpressionContext,
  InExpressionContext,
  IndexAccessExpressionContext,
  IteratorArgumentContext,
  LiteralExpressionContext,
  MultiplyDivideModExpressionContext,
  NavigationExpressionContext,
  NotExpressionContext,
  NullLiteralAltContext,
  NumericLiteralAltContext,
  OrExpressionContext,
  ParenthesesExpressionContext,
  ParseContext,
  PowerExpressionContext,
  SelfExpressionContext,
  StringLiteralAltContext,
  TemporalLiteralAltContext,
  TernaryExpressionContext,
  TimeLiteralContext,
  TimestampLiteralContext,
  TodayLiteralContext,
  TomorrowLiteralContext,
  UnaryMinusExpressionContext,
  XorExpressionContext,
  YesterdayLiteralContext,
} from '~/generated/IdemParser';
import { IdemVisitor } from '~/generated/IdemVisitor';
import type { ASTNode } from '~/types/ast';

export class Visitor extends IdemVisitor<ASTNode> {
  // Entry point
  visitParse = (ctx: ParseContext): ASTNode => {
    return this.visit(ctx.expression()) as ASTNode;
  };

  // --- Literal Visitor Methods (for labeled alternatives in the 'literal' rule) ---

  visitNumericLiteralAlt = (ctx: NumericLiteralAltContext): ASTNode => {
    // Use string representation to avoid precision loss for decimals in JS
    return { type: 'Number', value: ctx.Number().getText() };
  };

  visitStringLiteralAlt = (ctx: StringLiteralAltContext): ASTNode => {
    const text = ctx.StringLiteral().getText();
    return { type: 'String', value: text.substring(1, text.length - 1) };
  };

  visitBooleanTrueLiteralAlt = (ctx: BooleanTrueLiteralAltContext): ASTNode => {
    return { type: 'Boolean', value: true };
  };

  visitBooleanFalseLiteralAlt = (ctx: BooleanFalseLiteralAltContext): ASTNode => {
    return { type: 'Boolean', value: false };
  };

  visitNullLiteralAlt = (ctx: NullLiteralAltContext): ASTNode => {
    return { type: 'Null' };
  };

  visitTemporalLiteralAlt = (ctx: TemporalLiteralAltContext): ASTNode => {
    return this.visit(ctx.temporalLiteral()) as ASTNode;
  };

  visitEnumLiteralAlt = (ctx: EnumLiteralAltContext): ASTNode => {
    return this.visit(ctx.enumLiteral()) as ASTNode;
  };

  // --- Temporal Literal Visitor Methods (for labeled alternatives in the 'temporalLiteral' rule) ---

  visitDateLiteral = (ctx: DateLiteralContext): ASTNode => {
    return { type: 'Date', value: ctx.DATE().getText() };
  };

  visitTimestampLiteral = (ctx: TimestampLiteralContext): ASTNode => {
    return { type: 'Timestamp', value: ctx.TIMESTAMP().getText() };
  };

  visitTimeLiteral = (ctx: TimeLiteralContext): ASTNode => {
    return { type: 'Time', value: ctx.TIME().getText() };
  };

  visitTodayLiteral = (ctx: TodayLiteralContext): ASTNode => {
    return { type: 'Today' };
  };

  visitYesterdayLiteral = (ctx: YesterdayLiteralContext): ASTNode => {
    return { type: 'Yesterday' };
  };

  visitTomorrowLiteral = (ctx: TomorrowLiteralContext): ASTNode => {
    return { type: 'Tomorrow' };
  };

  // --- Sub-Rule Visitors ---

  visitEnumLiteral = (ctx: EnumLiteralContext): ASTNode => {
    return { type: 'EnumLiteral', value: ctx.getText() };
  };

  visitLiteralExpression = (ctx: LiteralExpressionContext): ASTNode => {
    return this.visit(ctx.literal()) as ASTNode;
  };

  visitParenthesesExpression = (ctx: ParenthesesExpressionContext): ASTNode => {
    return this.visit(ctx.expression()) as ASTNode;
  };

  visitFunctionCallExpression = (ctx: FunctionCallExpressionContext): ASTNode => {
    let args: ASTNode[] = [];
    const argumentList = ctx.argumentList();
    if (argumentList) {
      const argNode = this.visit(argumentList);
      if (argNode?.children) {
        args = argNode.children;
      }
    }

    return {
      type: 'FunctionCall',
      target: this.visit(ctx.expression()) as ASTNode,
      name: ctx.Identifier().getText(),
      args: args,
    };
  };

  visitNavigationExpression = (ctx: NavigationExpressionContext): ASTNode => {
    return {
      type: 'Navigation',
      target: this.visit(ctx.expression()) as ASTNode,
      name: ctx.Identifier().getText(),
    };
  };

  visitSelfExpression = (ctx: SelfExpressionContext): ASTNode => {
    let node: ASTNode = { type: 'Self' };
    if (ctx.Identifier().length > 0) {
      for (const id of ctx.Identifier()) {
        node = { type: 'Navigation', target: node, name: id.getText() };
      }
    }
    return node;
  };

  visitUnaryMinusExpression = (ctx: UnaryMinusExpressionContext): ASTNode => {
    return { type: 'Unary', operator: '-', children: [this.visit(ctx.expression()) as ASTNode] };
  };

  visitNotExpression = (ctx: NotExpressionContext): ASTNode => {
    return { type: 'Unary', operator: 'not', children: [this.visit(ctx.expression()) as ASTNode] };
  };

  // biome-ignore lint/suspicious/noExplicitAny: this is fine
  private buildBinary(left: ExpressionContext, op: any, right: ExpressionContext): ASTNode {
    return {
      type: 'Binary',
      operator: op.getText(),
      children: [this.visit(left) as ASTNode, this.visit(right) as ASTNode],
    };
  }

  private visitBinaryExpression(ctx: {
    expression: (i: number) => ExpressionContext | null;
    getChild: (i: number) => unknown;
  }): ASTNode {
    const left = ctx.expression(0);
    const right = ctx.expression(1);
    if (!left || !right) {
      // This should not happen in a valid parse tree for a binary expression.
      throw new Error('Invalid binary expression structure: missing operand.');
    }
    return this.buildBinary(left, ctx.getChild(1), right);
  }

  visitPowerExpression = (ctx: PowerExpressionContext) => {
    return this.visitBinaryExpression(ctx);
  };

  visitMultiplyDivideModExpression = (ctx: MultiplyDivideModExpressionContext) => {
    return this.visitBinaryExpression(ctx);
  };

  visitAddSubtractExpression = (ctx: AddSubtractExpressionContext) => {
    return this.visitBinaryExpression(ctx);
  };

  visitComparisonExpression = (ctx: ComparisonExpressionContext) => {
    return this.visitBinaryExpression(ctx);
  };

  visitEqualityExpression = (ctx: EqualityExpressionContext) => {
    return this.visitBinaryExpression(ctx);
  };

  visitAndExpression = (ctx: AndExpressionContext) => {
    return this.visitBinaryExpression(ctx);
  };

  visitXorExpression = (ctx: XorExpressionContext) => {
    return this.visitBinaryExpression(ctx);
  };

  visitOrExpression = (ctx: OrExpressionContext) => {
    return this.visitBinaryExpression(ctx);
  };

  visitImpliesExpression = (ctx: ImpliesExpressionContext) => {
    return this.visitBinaryExpression(ctx);
  };

  visitTernaryExpression = (ctx: TernaryExpressionContext): ASTNode => {
    const condition = ctx.expression(0);
    const ifTrue = ctx.expression(1);
    const ifFalse = ctx.expression(2);
    if (!condition || !ifTrue || !ifFalse) {
      throw new Error('Invalid ternary expression structure: missing operand.');
    }
    return {
      type: 'Ternary',
      children: [this.visit(condition) as ASTNode, this.visit(ifTrue) as ASTNode, this.visit(ifFalse) as ASTNode],
    };
  };

  visitInExpression = (ctx: InExpressionContext): ASTNode => {
    return this.visitBinaryExpression(ctx);
  };

  visitIdentifierExpression = (ctx: IdentifierExpressionContext): ASTNode => {
    return { type: 'Identifier', name: ctx.getText() };
  };

  visitIndexAccessExpression = (ctx: IndexAccessExpressionContext): ASTNode => {
    const target = ctx.expression(0);
    const index = ctx.expression(1);
    if (!target || !index) {
      throw new Error('Invalid index access expression structure.');
    }
    return { type: 'IndexAccess', children: [this.visit(target) as ASTNode, this.visit(index) as ASTNode] };
  };

  visitArgumentList = (ctx: ArgumentListContext): ASTNode => {
    const args: ASTNode[] = ctx.argument().map((arg) => this.visit(arg) as ASTNode);
    return { type: 'ArgumentList', children: args };
  };

  visitArgument = (ctx: ArgumentContext): ASTNode => {
    const target = ctx.getChild(0);
    if (!target) {
      throw new Error('Invalid index access expression structure.');
    }
    return this.visit(target) as ASTNode;
  };
  visitIteratorArgument = (ctx: IteratorArgumentContext): ASTNode => {
    const casesNode = ctx.Cases();
    return {
      type: 'IteratorArgument',
      iteratorVar: ctx.Identifier().getText(),
      iteratorExpression: this.visit(ctx.expression()) as ASTNode,
      direction: casesNode ? casesNode.getText().toUpperCase() : 'ASC',
    };
  };
}
