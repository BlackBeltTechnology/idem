package hu.blackbelt.idem;

import org.antlr.v4.runtime.tree.ParseTree;
import org.antlr.v4.runtime.tree.TerminalNode;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class IdemDefaultVisitor extends IdemBaseVisitor<AstNode> {

    @Override
    public AstNode visitParse(IdemParser.ParseContext ctx) {
        return visit(ctx.expression());
    }

    @Override
    public AstNode visitParenthesesExpression(IdemParser.ParenthesesExpressionContext ctx) {
        return visit(ctx.expression());
    }

    @Override
    public AstNode visitLiteralExpression(IdemParser.LiteralExpressionContext ctx) {
        return visit(ctx.literal());
    }

    // --- Literal Visitors ---
    @Override
    public AstNode visitNumericLiteralAlt(IdemParser.NumericLiteralAltContext ctx) {
        return AstNode.builder().type(AstNodeType.NUMBER).value(new BigDecimal(ctx.getText())).build();
    }

    @Override
    public AstNode visitStringLiteralAlt(IdemParser.StringLiteralAltContext ctx) {
        String text = ctx.getText();
        return AstNode.builder().type(AstNodeType.STRING).value(text.substring(1, text.length() - 1)).build();
    }

    @Override
    public AstNode visitBooleanTrueLiteralAlt(IdemParser.BooleanTrueLiteralAltContext ctx) {
        return AstNode.builder().type(AstNodeType.BOOLEAN).value(true).build();
    }

    @Override
    public AstNode visitBooleanFalseLiteralAlt(IdemParser.BooleanFalseLiteralAltContext ctx) {
        return AstNode.builder().type(AstNodeType.BOOLEAN).value(false).build();
    }

    @Override
    public AstNode visitNullLiteralAlt(IdemParser.NullLiteralAltContext ctx) {
        return AstNode.builder().type(AstNodeType.NULL).build();
    }

    @Override
    public AstNode visitTemporalLiteralAlt(IdemParser.TemporalLiteralAltContext ctx) {
        return visit(ctx.temporalLiteral());
    }

    @Override
    public AstNode visitDateLiteral(IdemParser.DateLiteralContext ctx) {
        return AstNode.builder().type(AstNodeType.DATE).value(LocalDate.parse(ctx.DATE().getText())).build();
    }

    @Override
    public AstNode visitTimestampLiteral(IdemParser.TimestampLiteralContext ctx) {
        String tsText = ctx.TIMESTAMP().getText();
        if (tsText.endsWith("Z")) {
            tsText = tsText.substring(0, tsText.length() - 1);
        }
        try {
            return AstNode.builder().type(AstNodeType.TIMESTAMP).value(LocalDateTime.parse(tsText, DateTimeFormatter.ISO_LOCAL_DATE_TIME)).build();
        } catch (DateTimeParseException e) {
            return AstNode.builder().type(AstNodeType.TIMESTAMP).value(LocalDateTime.parse(tsText, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"))).build();
        }
    }

    @Override
    public AstNode visitTimeLiteral(IdemParser.TimeLiteralContext ctx) {
        String timeText = ctx.TIME().getText();
        DateTimeFormatter formatter = timeText.length() > 5 ? DateTimeFormatter.ISO_LOCAL_TIME : DateTimeFormatter.ofPattern("HH:mm");
        return AstNode.builder().type(AstNodeType.TIME).value(LocalTime.parse(timeText, formatter)).build();
    }

    @Override
    public AstNode visitTodayLiteral(IdemParser.TodayLiteralContext ctx) {
        return AstNode.builder().type(AstNodeType.TODAY).build();
    }

    @Override
    public AstNode visitYesterdayLiteral(IdemParser.YesterdayLiteralContext ctx) {
        return AstNode.builder().type(AstNodeType.YESTERDAY).build();
    }

    @Override
    public AstNode visitTomorrowLiteral(IdemParser.TomorrowLiteralContext ctx) {
        return AstNode.builder().type(AstNodeType.TOMORROW).build();
    }

    // --- Other Visitors ---
    @Override
    public AstNode visitSelfExpression(IdemParser.SelfExpressionContext ctx) {
        AstNode self = AstNode.builder().type(AstNodeType.SELF).build();
        if (ctx.Identifier() != null) {
            AstNode current = self;
            for (TerminalNode id : ctx.Identifier()) {
                current = AstNode.builder()
                        .type(AstNodeType.NAVIGATION)
                        .target(current)
                        .name(id.getText())
                        .build();
            }
            return current;
        }
        return self;
    }

    @Override
    public AstNode visitNavigationExpression(IdemParser.NavigationExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.NAVIGATION)
                .target(visit(ctx.expression()))
                .name(ctx.Identifier().getText())
                .build();
    }

    @Override
    public AstNode visitUnaryMinusExpression(IdemParser.UnaryMinusExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.UNARY_EXPRESSION)
                .operator("-")
                .child(visit(ctx.expression()))
                .build();
    }

    @Override
    public AstNode visitNotExpression(IdemParser.NotExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.UNARY_EXPRESSION)
                .operator("not")
                .child(visit(ctx.expression()))
                .build();
    }

    private AstNode buildBinary(IdemParser.ExpressionContext left, ParseTree op, IdemParser.ExpressionContext right) {
        return AstNode.builder()
                .type(AstNodeType.BINARY_EXPRESSION)
                .operator(op.getText())
                .child(visit(left))
                .child(visit(right))
                .build();
    }

    @Override
    public AstNode visitPowerExpression(IdemParser.PowerExpressionContext ctx) {
        return buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    @Override
    public AstNode visitMultiplyDivideModExpression(IdemParser.MultiplyDivideModExpressionContext ctx) {
        return buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    @Override
    public AstNode visitAddSubtractExpression(IdemParser.AddSubtractExpressionContext ctx) {
        return buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    @Override
    public AstNode visitComparisonExpression(IdemParser.ComparisonExpressionContext ctx) {
        return buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    @Override
    public AstNode visitEqualityExpression(IdemParser.EqualityExpressionContext ctx) {
        return buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    @Override
    public AstNode visitAndExpression(IdemParser.AndExpressionContext ctx) {
        return buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    @Override
    public AstNode visitXorExpression(IdemParser.XorExpressionContext ctx) {
        return buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    @Override
    public AstNode visitOrExpression(IdemParser.OrExpressionContext ctx) {
        return buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    @Override
    public AstNode visitImpliesExpression(IdemParser.ImpliesExpressionContext ctx) {
        return buildBinary(ctx.expression(0), ctx.getChild(1), ctx.expression(1));
    }

    @Override
    public AstNode visitTernaryExpression(IdemParser.TernaryExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.TERNARY_EXPRESSION)
                .child(visit(ctx.expression(0))) // condition
                .child(visit(ctx.expression(1))) // then
                .child(visit(ctx.expression(2))) // else
                .build();
    }

    @Override
    public AstNode visitInExpression(IdemParser.InExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.IN_EXPRESSION)
                .child(visit(ctx.expression(0)))
                .child(visit(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitFunctionCallExpression(IdemParser.FunctionCallExpressionContext ctx) {
        AstNode argNode = ctx.argumentList() != null ? visit(ctx.argumentList()) : null;
        List<AstNode> args = argNode != null ? argNode.getChildren() : Collections.emptyList();

        return AstNode.builder()
                .type(AstNodeType.FUNCTION_CALL)
                .target(visit(ctx.expression()))
                .name(ctx.Identifier().getText())
                .arguments(args)
                .build();
    }

    @Override
    public AstNode visitArgumentList(IdemParser.ArgumentListContext ctx) {
        List<AstNode> args = ctx.argument().stream()
                .map(this::visit)
                .collect(Collectors.toList());
        return AstNode.builder().type(AstNodeType.ARGUMENT_LIST).children(args).build();
    }

    @Override
    public AstNode visitArgument(IdemParser.ArgumentContext ctx) {
        return visit(ctx.getChild(0));
    }

    @Override
    public AstNode visitIteratorArgument(IdemParser.IteratorArgumentContext ctx) {
        AstNode.AstNodeBuilder builder = AstNode.builder()
                .type(AstNodeType.ITERATOR_ARGUMENT)
                .iteratorVar(ctx.Identifier().getText())
                .iteratorExpression(visit(ctx.expression()));

        if (ctx.sortDirection != null) {
            builder.value(ctx.sortDirection.getText().toUpperCase());
        } else {
            builder.value("ASC");
        }

        return builder.build();
    }

    @Override
    public AstNode visitIndexAccessExpression(IdemParser.IndexAccessExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.INDEX_ACCESS)
                .child(visit(ctx.expression(0))) // target
                .child(visit(ctx.expression(1))) // index
                .build();
    }

    @Override
    public AstNode visitIdentifierExpression(IdemParser.IdentifierExpressionContext ctx) {
        return AstNode.builder().type(AstNodeType.IDENTIFIER).name(ctx.getText()).build();
    }
}
