package hu.blackbelt.idem;


import org.antlr.v4.runtime.tree.ParseTree;
import org.antlr.v4.runtime.tree.TerminalNode;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class IdemDefaultVisitor extends IdemBaseVisitor {

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
        return (AstNode) this.visit(parseTree);
    }

    @Override
    public AstNode visitParse(IdemParser.ParseContext ctx) {
        return visitNode(ctx.block());
    }

    @Override
    public Object visitTerminal(TerminalNode node) {
        System.out.println(node.getSymbol() + " " + node.getText());
        return super.visitTerminal(node);
    }

    public AstNode visitBlock(IdemParser.BlockContext ctx) {
        return ctx.expression() != null ?
                this.visitNode(ctx.expression()) :
                AstNode.builder()
                        .type(AstNodeType.Block)
                        .expression(null)
                        .build();
    }

    @Override
    public AstNode visitNumberExpression(IdemParser.NumberExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Number)
                .value(new BigDecimal(ctx.getText()))
                .build();
    }

    @Override
    public AstNode visitLocalDateExpression(IdemParser.LocalDateExpressionContext ctx) {
        var sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return AstNode.builder()
                    .type(AstNodeType.LocalDate)
                    .value(sdf.parse(ctx.getText()))
                    .build();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public AstNode visitBoolExpression(IdemParser.BoolExpressionContext ctx) {
        return AstNode.builder()
                .type(AstNodeType.Boolean)
                .value(ctx.getText() == null ? false : Boolean.valueOf(ctx.getText().toLowerCase()))
                .build();
    }

    @Override
    public AstNode visitListExpression(IdemParser.ListExpressionContext ctx) {
        return ctx.indexes() != null
                ? AstNode.builder().type(AstNodeType.ListAccess)
                    .indexes(this.visitNode(ctx.indexes()))
                    .list(this.visitNode(ctx.list()))
                    .build()
                : this.visitNode(ctx.list());
    }

    @Override
    public AstNode visitStringExpression(IdemParser.StringExpressionContext ctx) {
        var raw = ctx.getText();
        Pattern regex = Pattern.compile("(['\"])(.*?)\\1");
        Matcher matcher = regex.matcher(raw);

        String unquoted = null;
        if (matcher.find()) {
            unquoted = matcher.group(2);
        }
        return ctx.indexes() != null
                ? AstNode.builder()
                    .type(AstNodeType.StringAccess)
                    .value(unquoted)
                    .indexes(this.visitNode(ctx.indexes()))
                    .build()
                : AstNode.builder()
                    .type(AstNodeType.String)
                    .value(unquoted)
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
            // We visit the exprList, which returns an AstNode of type ExprList
            // containing the list of elements. We then extract this list for the List node.
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
        //System.out.println("SELF: " + ctx.getText());
        return AstNode.builder()
                .type(AstNodeType.Self)
                .tags(this.visitNode(ctx.tags()))
                .build();
        //return super.visitSelfExpression(ctx);
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
    public Object visitTernaryExpression(IdemParser.TernaryExpressionContext ctx) {
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
}
