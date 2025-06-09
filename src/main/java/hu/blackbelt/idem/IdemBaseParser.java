package hu.blackbelt.idem;

import org.antlr.v4.runtime.Parser;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;

/**
 * A custom base class for the generated ANTLR parser.
 * This class allows us to add custom methods (for semantic predicates, etc.)
 * without embedding Java-specific code into the .g4 grammar file, making the
 * grammar compatible with multiple targets (like TypeScript).
 */
public abstract class IdemBaseParser extends Parser {

    public IdemBaseParser(TokenStream input) {
        super(input);
    }

    /**
     * A semantic predicate function used in the grammar to resolve ambiguity
     * between an iteratorArgument and a regular expression.
     * @return true if the token following an Identifier is a '|', false otherwise.
     */
    public boolean isIterator() {
        Token nextToken = _input.LT(2);
        if (nextToken == null) {
            return false;
        }
        return "|".equals(nextToken.getText());
    }
}
