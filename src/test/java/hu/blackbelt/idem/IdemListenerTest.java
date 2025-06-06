package hu.blackbelt.idem;

import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.tree.ParseTree;
import org.junit.jupiter.api.Test;

public class IdemListenerTest {

    @Test
    void test() {
        String boff = "self.feature";
        IdemLexer idemLexer = new IdemLexer(CharStreams.fromString(boff));
        CommonTokenStream tokens = new CommonTokenStream(idemLexer);
        IdemParser parser = new IdemParser(tokens);
        ParseTree tree = parser.block();
        Object r = new IdemDefaultVisitor().visit(tree);
    }
}
