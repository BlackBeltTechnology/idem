import {
    AddSubtractExpressionContext, AndExpressionContext, ArgumentContext, ArgumentListContext, ComparisonExpressionContext,
    EqualityExpressionContext, ExpressionContext, FunctionCallExpressionContext, IdentifierExpressionContext,
    ImpliesExpressionContext, InExpressionContext, IndexAccessExpressionContext, IteratorArgumentContext,
    LiteralContext, LiteralExpressionContext, MultiplyDivideModExpressionContext, NavigationExpressionContext,
    NotExpressionContext, OrExpressionContext, ParenthesesExpressionContext, ParseContext,
    PowerExpressionContext, SelfExpressionContext, TemporalLiteralContext, TernaryExpressionContext,
    UnaryMinusExpressionContext, XorExpressionContext
} from '~/generated/IdemParser';
import {IdemVisitor} from '~/generated/IdemVisitor';
import type {ASTNode} from '~/types/ast';
import {TerminalNode} from "antlr4ng";

export class Visitor extends IdemVisitor<ASTNode> {
    // Entry point
    visitParse(ctx: ParseContext): ASTNode {
        return this.visit(ctx.expression());
    }

    visitLiteral(ctx: LiteralContext): ASTNode {
        if (ctx.Number()) {
            return {type: 'Number', value: parseFloat(ctx.getText())};
        }
        if (ctx.StringLiteral()) {
            const text = ctx.getText();
            return {type: 'String', value: text.substring(1, text.length - 1)};
        }
        if (ctx.temporalLiteral()) {
            return this.visit(ctx.temporalLiteral());
        }

        const terminal = ctx.getChild(0) as TerminalNode;
        const text = terminal.getText();
        if (text === 'true') {
            return {type: 'Boolean', value: true};
        }
        if (text === 'false') {
            return {type: 'Boolean', value: false};
        }
        if (text === 'null') {
            return {type: 'Null'};
        }

        throw new Error(`Unknown literal type: ${ctx.getText()}`);
    }

    visitTemporalLiteral(ctx: TemporalLiteralContext): ASTNode {
        const text = ctx.getText();
        if (text === 'today') return {type: 'Today'};
        if (text === 'yesterday') return {type: 'Yesterday'};
        if (text === 'tomorrow') return {type: 'Tomorrow'};

        const temporalText = text.substring(1, text.length - 1);
        if (ctx.DATE()) return {type: 'Date', value: temporalText};
        if (ctx.TIMESTAMP()) return {type: 'Timestamp', value: temporalText};
        if (ctx.TIME()) return {type: 'Time', value: temporalText};

        throw new Error(`Unknown temporal literal: ${text}`);
    }


    visitLiteralExpression(ctx: LiteralExpressionContext): ASTNode {
        return this.visit(ctx.literal());
    }

    visitParenthesesExpression(ctx: ParenthesesExpressionContext): ASTNode {
        return this.visit(ctx.expression());
    }

    visitFunctionCallExpression(ctx: FunctionCallExpressionContext): ASTNode {
        const argNode = ctx.argumentList() ? this.visit(ctx.argumentList()) : null;
        return {
            type: 'FunctionCall',
            target: this.visit(ctx.expression()),
            name: ctx.Identifier().getText(),
            args: argNode ? argNode.children : [],
        };
    }

    visitNavigationExpression(ctx: NavigationExpressionContext): ASTNode {
        return {
            type: 'Navigation',
            target: this.visit(ctx.expression()),
            name: ctx.Identifier().getText(),
        };
    }

    visitSelfExpression(ctx: SelfExpressionContext): ASTNode {
        let node: ASTNode = {type: 'Self'};
        if (ctx.Identifier().length > 0) {
            for (const id of ctx.Identifier()) {
                node = {type: 'Navigation', target: node, name: id.getText()};
            }
        }
        return node;
    }

    visitUnaryMinusExpression(ctx: UnaryMinusExpressionContext): ASTNode {
        return {type: 'Unary', operator: '-', children: [this.visit(ctx.expression())]};
    }

    visitNotExpression(ctx: NotExpressionContext): ASTNode {
        return {type: 'Unary', operator: 'not', children: [this.visit(ctx.expression())]};
    }

    private buildBinary(left: ExpressionContext, op: any, right: ExpressionContext): ASTNode {
        return {
            type: 'Binary',
            operator: op.getText(),
            children: [this.visit(left), this.visit(right)],
        };
    }

    visitPowerExpression(ctx: PowerExpressionContext) {
        return this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    visitMultiplyDivideModExpression(ctx: MultiplyDivideModExpressionContext) {
        return this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    visitAddSubtractExpression(ctx: AddSubtractExpressionContext) {
        return this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    visitComparisonExpression(ctx: ComparisonExpressionContext) {
        return this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    visitEqualityExpression(ctx: EqualityExpressionContext) {
        return this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    visitAndExpression(ctx: AndExpressionContext) {
        return this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    visitXorExpression(ctx: XorExpressionContext) {
        return this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    visitOrExpression(ctx: OrExpressionContext) {
        return this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    visitImpliesExpression(ctx: ImpliesExpressionContext) {
        return this.buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    visitTernaryExpression(ctx: TernaryExpressionContext): ASTNode {
        return {
            type: 'Ternary',
            children: [this.visit(ctx.expression(0)), this.visit(ctx.expression(1)), this.visit(ctx.expression(2))]
        };
    }

    visitInExpression(ctx: InExpressionContext): ASTNode {
        return {type: 'In', children: [this.visit(ctx.expression(0)), this.visit(ctx.expression(1))]};
    }

    visitIdentifierExpression(ctx: IdentifierExpressionContext): ASTNode {
        return {type: 'Identifier', name: ctx.getText()};
    }

    visitIndexAccessExpression(ctx: IndexAccessExpressionContext): ASTNode {
        return {type: 'IndexAccess', children: [this.visit(ctx.expression(0)), this.visit(ctx.expression(1))]};
    }

    visitArgumentList(ctx: ArgumentListContext): ASTNode {
        const args: ASTNode[] = ctx.argument().map(arg => this.visit(arg));
        return { type: 'ArgumentList', children: args };
    }

    visitArgument(ctx: ArgumentContext): ASTNode {
        // The grammar change means an argument is either an iterator or an expression.
        // We visit whichever child is present.
        return this.visit(ctx.getChild(0));
    }

    visitIteratorArgument(ctx: IteratorArgumentContext): ASTNode {
        return {
            type: 'IteratorArgument',
            iteratorVar: ctx.Identifier().getText(),
            iteratorExpression: this.visit(ctx.expression()),
            value: ctx.Cases() ? ctx.Cases().getText().toUpperCase() : 'ASC'
        };
    }
}
