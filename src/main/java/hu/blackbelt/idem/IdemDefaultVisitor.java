package hu.blackbelt.idem;

import org.antlr.v4.runtime.tree.ParseTree;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class IdemDefaultVisitor extends IdemBaseVisitor<AstNode> {

    private static IdemDefaultVisitor INSTANCE = null;

    private IdemDefaultVisitor() {
    }

    public static synchronized IdemDefaultVisitor getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new IdemDefaultVisitor();
        }
        return INSTANCE;
    }

    public AstNode visitNode(ParseTree parseTree) {
        // A null check here provides a more informative error message
        if (parseTree == null) {
            throw new IllegalStateException("Attempting to visit a null parse tree node.");
        }
        return this.visit(parseTree);
    }

    @Override
    public AstNode visitParse(IdemParser.ParseContext ctx) {
        return visitNode(ctx.expression());
    }

    @Override
    public AstNode visitPostfixFunctionCallExpression(IdemParser.PostfixFunctionCallExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.PostfixFunctionCall)
                .expression(visitNode(ctx.expression()))
                .functionName(ctx.Identifier().getText())
                .elements(ctx.exprList() == null ? Collections.emptyList() : (visitNode(ctx.exprList())).getElements())
                .build();
    }

    @Override
    public AstNode visitLocalDateExpression(IdemParser.LocalDateExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.LocalDate)
                .value(LocalDate.parse(ctx.getText(), DateTimeFormatter.ISO_LOCAL_DATE))
                .build();
    }

    @Override
    public AstNode visitTimestampExpression(IdemParser.TimestampExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Timestamp)
                .value(LocalDateTime.parse(ctx.getText(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .build();
    }

    @Override
    public AstNode visitTimeExpression(IdemParser.TimeExpressionContext ctx) {
        String timeText = ctx.getText();
        DateTimeFormatter formatter = timeText.length() > 5 ? DateTimeFormatter.ISO_LOCAL_TIME : DateTimeFormatter.ofPattern("HH:mm");
        return AstNode.builder()
                .type(AstNodeType.Time)
                .value(LocalTime.parse(timeText, formatter))
                .build();
    }

    @Override
    public AstNode visitTodayExpression(IdemParser.TodayExpressionContext ctx) {
        return AstNode.builder().type(AstNodeType.Today).build();
    }

    @Override
    public AstNode visitYesterdayExpression(IdemParser.YesterdayExpressionContext ctx) {
        return AstNode.builder().type(AstNodeType.Yesterday).build();
    }

    @Override
    public AstNode visitTomorrowExpression(IdemParser.TomorrowExpressionContext ctx) {
        return AstNode.builder().type(AstNodeType.Tomorrow).build();
    }

    @Override
    public AstNode visitNumberExpression(IdemParser.NumberExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Number)
                .value(new BigDecimal(ctx.getText()))
                .build();
    }

    @Override
    public AstNode visitBoolExpression(IdemParser.BoolExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Boolean)
                .value(Boolean.valueOf(ctx.getText()))
                .build();
    }

    @Override
    public AstNode visitListExpression(IdemParser.ListExpressionContext ctx) {
        return this.visitNode(ctx.list());
    }

    @Override
    public AstNode visitStringExpression(IdemParser.StringExpressionContext ctx) {
        var raw = ctx.getText();
        return AstNode.builder()
                .type(AstNodeType.String)
                .value(raw.substring(1, raw.length() - 1))
                .build();
    }

    @Override
    public AstNode visitIndexedAccessExpression(IdemParser.IndexedAccessExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.IndexAccess)
                .expression(this.visitNode(ctx.expression()))
                .indexes(this.visitNode(ctx.indexes()))
                .build();
    }

    @Override
    public AstNode visitExpressionExpression(IdemParser.ExpressionExpressionContext ctx) {
        AstNode base = this.visitNode(ctx.expression());
        if (ctx.pointers() != null) {
            return AstNode.builder()
                    .type(AstNodeType.PointerAccess)
                    .expression(base)
                    .pointers(this.visitNode(ctx.pointers()))
                    .build();
        }
        return base;
    }

    @Override
    public AstNode visitList(IdemParser.ListContext ctx) {
        if (ctx.exprList() != null) {
            AstNode exprListNode = this.visitNode(ctx.exprList());
            return AstNode.builder()
                    .type(AstNodeType.List)
                    .elements(exprListNode.getElements())
                    .build();
        }
        return AstNode.builder()
                .type(AstNodeType.List)
                .elements(Collections.emptyList())
                .build();
    }

    @Override
    public AstNode visitExprList(IdemParser.ExprListContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.ExprList)
                .elements(
                        ctx.expression().stream()
                                .map(this::visitNode)
                                .collect(Collectors.toList())
                )
                .build();
    }

    @Override
    public AstNode visitIndexes(IdemParser.IndexesContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Indexes)
                .elements(
                        ctx.expression().stream()
                                .map(this::visitNode)
                                .collect(Collectors.toList())
                )
                .build();
    }

    @Override
    public AstNode visitPointers(IdemParser.PointersContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Pointers)
                .elements(
                        ctx.pointer().stream()
                                .map(this::visitNode)
                                .collect(Collectors.toList())
                )
                .build();
    }

    @Override
    public AstNode visitPointer(IdemParser.PointerContext ctx) {
        if (ctx.tags() != null) {
            return this.visitNode(ctx.tags());
        }
        return AstNode.builder()
                .type(AstNodeType.Index)
                .indexes(this.visitNode(ctx.indexes()))
                .build();
    }

    @Override
    public AstNode visitTags(IdemParser.TagsContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Tags)
                .features(
                        ctx.feature().stream()
                                .map(f -> f.Identifier().getText())
                                .collect(Collectors.toList())
                )
                .build();
    }

    @Override
    public AstNode visitNullExpression(IdemParser.NullExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Null)
                .value(null)
                .build();
    }

    @Override
    public AstNode visitSelfExpression(IdemParser.SelfExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Self)
                .tags(this.visitNode(ctx.tags()))
                .build();
    }

    @Override
    public AstNode visitUnaryMinusExpression(IdemParser.UnaryMinusExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.UnaryMinus)
                .expression(this.visitNode(ctx.expression()))
                .build();
    }

    @Override
    public AstNode visitNotExpression(IdemParser.NotExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Not)
                .expression(this.visitNode(ctx.expression()))
                .build();
    }

    @Override
    public AstNode visitPowerExpression(IdemParser.PowerExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Power)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitMultiplyExpression(IdemParser.MultiplyExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Multiply)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitDivideExpression(IdemParser.DivideExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Divide)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitModulusExpression(IdemParser.ModulusExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Modulus)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitDivExpression(IdemParser.DivExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Div)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitModExpression(IdemParser.ModExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Mod)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitAddExpression(IdemParser.AddExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Add)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitSubtractExpression(IdemParser.SubtractExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Subtract)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitAddDatePartExpression(IdemParser.AddDatePartExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.AddDatePart)
                .left(this.visitNode(ctx.expression()))
                .datePart(ctx.DatePart().getText())
                .build();
    }

    @Override
    public AstNode visitSubtractDatePartExpression(IdemParser.SubtractDatePartExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.SubtractDatePart)
                .left(this.visitNode(ctx.expression()))
                .datePart(ctx.DatePart().getText())
                .build();
    }

    @Override
    public AstNode visitGtEqExpression(IdemParser.GtEqExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Gte)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitLtEqExpression(IdemParser.LtEqExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Lte)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitGtExpression(IdemParser.GtExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Gt)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitLtExpression(IdemParser.LtExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Lt)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitEqExpression(IdemParser.EqExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Eq)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitNotEqExpression(IdemParser.NotEqExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.NotEq)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitAndExpression(IdemParser.AndExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.And)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitOrExpression(IdemParser.OrExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Or)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitXorExpression(IdemParser.XorExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Xor)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitTernaryExpression(IdemParser.TernaryExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Ternary)
                .tCond(this.visitNode(ctx.expression(0)))
                .tThen(this.visitNode(ctx.expression(1)))
                .tElse(this.visitNode(ctx.expression(2)))
                .build();
    }

    @Override
    public AstNode visitInExpression(IdemParser.InExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.In)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }

    @Override
    public AstNode visitImpliesExpression(IdemParser.ImpliesExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Implies)
                .left(this.visitNode(ctx.expression(0)))
                .right(this.visitNode(ctx.expression(1)))
                .build();
    }
}