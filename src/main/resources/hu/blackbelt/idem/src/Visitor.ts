import {
  AndExpressionContext,
  ArgumentListContext,
  ComparisonExpressionContext,
  EqualityExpressionContext,
  ExpressionContext,
  FunctionCallExpressionContext,
  IdentifierExpressionContext,
  ImpliesExpressionContext,
  InExpressionContext,
  IndexAccessExpressionContext,
  IteratorArgumentContext,
  LiteralContext,
  LiteralExpressionContext,
  NavigationExpressionContext,
  NotExpressionContext,
  OrExpressionContext,
  ParenthesesExpressionContext,
  ParseContext,
  PowerExpressionContext,
  SelfExpressionContext,
  TernaryExpressionContext,
  UnaryMinusExpressionContext,
  XorExpressionContext,
  AddSubtractExpressionContext,
  MultiplyDivideModExpressionContext,
} from '~/generated/IdemParser';
import { IdemVisitor } from '~/generated/IdemVisitor';
import type { ASTNode } from '~/types/ast';

export class Visitor extends IdemVisitor<ASTNode> {
  visitParse = (ctx: ParseContext): ASTNode => this.visit(ctx.expression());

  visitParenthesesExpression = (ctx: ParenthesesExpressionContext): ASTNode => this.visit(ctx.expression());

  visitLiteralExpression = (ctx: LiteralExpressionContext): ASTNode => this.visit(ctx.literal());

  visitIdentifierExpression = (ctx: IdentifierExpressionContext): ASTNode => ({
    type: 'Identifier',
    name: ctx.getText(),
  });

  visitSelfExpression = (ctx: SelfExpressionContext): ASTNode => {
    let node: ASTNode = { type: 'Self' };
    if (ctx.Identifier().length > 0) {
      for (const id of ctx.Identifier()) {
        node = { type: 'Navigation', target: node, name: id.getText() };
      }
    }
    return node;
  };

  visitNavigationExpression = (ctx: NavigationExpressionContext): ASTNode => ({
    type: 'Navigation',
    target: this.visit(ctx.expression()),
    name: ctx.Identifier().getText(),
  });

  visitUnaryMinusExpression = (ctx: UnaryMinusExpressionContext): ASTNode => ({
    type: 'Unary',
    operator: '-',
    children: [this.visit(ctx.expression())],
  });

  visitNotExpression = (ctx: NotExpressionContext): ASTNode => ({
    type: 'Unary',
    operator: 'not',
    children: [this.visit(ctx.expression())],
  });

  private buildBinary = (left: ExpressionContext, op: any, right: ExpressionContext): ASTNode => ({
    type: 'Binary',
    operator: op.getText(),
    children: [this.visit(left), this.visit(right)],
  });

  visitPowerExpression = (ctx: PowerExpressionContext): ASTNode => this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
  visitMultiplyDivideModExpression = (ctx: MultiplyDivideModExpressionContext): ASTNode => this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
  visitAddSubtractExpression = (ctx: AddSubtractExpressionContext): ASTNode => this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
  visitComparisonExpression = (ctx: ComparisonExpressionContext): ASTNode => this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
  visitEqualityExpression = (ctx: EqualityExpressionContext): ASTNode => this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
  visitAndExpression = (ctx: AndExpressionContext): ASTNode => this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
  visitXorExpression = (ctx: XorExpressionContext): ASTNode => this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
  visitOrExpression = (ctx: OrExpressionContext): ASTNode => this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
  visitImpliesExpression = (ctx: ImpliesExpressionContext): ASTNode => this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));

  visitTernaryExpression = (ctx: TernaryExpressionContext): ASTNode => ({
    type: 'Ternary',
    children: [this.visit(ctx.expression(0)), this.visit(ctx.expression(1)), this.visit(ctx.expression(2))],
  });

  visitInExpression = (ctx: InExpressionContext): ASTNode => ({
    type: 'In',
    children: [this.visit(ctx.expression(0)), this.visit(ctx.expression(1))],
  });

  visitFunctionCallExpression = (ctx: FunctionCallExpressionContext): ASTNode => ({
    type: 'FunctionCall',
    target: this.visit(ctx.expression()),
    name: ctx.Identifier().getText(),
    args: ctx.argumentList() ? this.visit(ctx.argumentList()).args : [],
  });

  visitArgumentList = (ctx: ArgumentListContext): ASTNode => {
    const args: ASTNode[] = [];
    if (ctx.iteratorArgument()) {
      args.push(this.visit(ctx.iteratorArgument()));
    }
    ctx.expression().forEach(expr => args.push(this.visit(expr)));
    return { type: 'ArgumentList', args };
  };

  visitIteratorArgument = (ctx: IteratorArgumentContext): ASTNode => ({
    type: 'IteratorArgument',
    iteratorVar: ctx.Identifier().getText(),
    iteratorExpression: this.visit(ctx.expression()),
  });

  visitIndexAccessExpression = (ctx: IndexAccessExpressionContext): ASTNode => ({
    type: 'IndexAccess',
    children: [this.visit(ctx.expression(0)), this.visit(ctx.expression(1))],
  });

  visitLiteral = (ctx: LiteralContext): ASTNode => {
    const child = ctx.getChild(0);
    if (child instanceof LiteralContext) {
      return this.visit(child);
    }
    const ruleName = (child.getPayload() as any).ruleIndex;
    const ruleNameStr = (ctx.parser.ruleNames as any)[ruleName];

    const text = ctx.getText();
    switch (ruleNameStr) {
      case 'numericLiteral': return { type: 'Number', value: parseFloat(text) };
      case 'StringLiteral': return { type: 'String', value: text.substring(1, text.length - 1) };
      case 'booleanLiteral': return { type: 'Boolean', value: text === 'true' };
      case 'nullLiteral': return { type: 'Null' };
      case 'temporalLiteral': {
        const typeChild = ctx.temporalLiteral().getChild(0).constructor.name;
        const temporalText = ctx.temporalLiteral().getText();
        switch (typeChild) {
            case 'DateLiteralContext': return { type: 'Date', value: temporalText.replaceAll('`', '') };
            case 'TimestampLiteralContext': return { type: 'Timestamp', value: temporalText.replaceAll('`', '') };
            case 'TimeLiteralContext': return { type: 'Time', value: temporalText.replaceAll('`', '') };
            case 'TodayLiteralContext': return { type: 'Today' };
            case 'YesterdayLiteralContext': return { type: 'Yesterday' };
            case 'TomorrowLiteralContext': return { type: 'Tomorrow' };
        }
      }
    }
    throw new Error(`Unknown literal type: ${ruleNameStr}`);
  };
}
