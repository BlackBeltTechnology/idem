package hu.blackbelt.idem;


public class IdemDefaultVisitor extends IdemBaseVisitor {

    @Override
    public Object visitSelfExpression(IdemParser.SelfExpressionContext ctx) {
        System.out.println("SELF: " + ctx.getText());
        return super.visitSelfExpression(ctx);
    }

    @Override
    public Object visitFeature(IdemParser.FeatureContext ctx) {
        System.out.println("FEATURE: " + ctx.getText());
        return super.visitFeature(ctx);
    }

}
