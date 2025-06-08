package hu.blackbelt.idem;

import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;

public class Parse {
    public static IdemParser.ParseContext parse(String code) {
        IdemLexer idemLexer = new IdemLexer(CharStreams.fromString(code));
        CommonTokenStream tokens = new CommonTokenStream(idemLexer);
        IdemParser parser = new IdemParser(tokens);
        return parser.parse();
    }

    public static AstNode parseContextToAst(IdemParser.ParseContext parseContext) {
        return (AstNode) (IdemDefaultVisitor.getInstance().visit(parseContext));
    };

    public static AstNode expressionToAst (String expression) {
        var parseContext = parse(expression);
        return parseContextToAst(parseContext);
    };

}
