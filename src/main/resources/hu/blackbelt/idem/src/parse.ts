import { CharStream, CommonTokenStream } from 'antlr4ng';
import { Visitor } from '~/Visitor';
import { IdemLexer } from '~/generated/IdemLexer';
import { IdemParser, type ParseContext } from '~/generated/IdemParser';
import type { ASTNode } from '~/types/ast';
import '~/IdemParserExtension'; // Import the extension to apply the predicate method

export const parse = (input: string): ParseContext => {
    const inputStream = CharStream.fromString(input);
    const lexer = new IdemLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new IdemParser(tokenStream);
    parser.buildParseTrees = true; // Ensure parse trees are built
    // Optional: Add a custom error listener for cleaner error handling
    // parser.removeErrorListeners();
    // parser.addErrorListener(new MyErrorListener());
    return parser.parse();
};

export const parseContextToAst = (parseContext: ParseContext): ASTNode | null => {
    // Check if the parser encountered an error during parsing.
    if (parseContext.exception) {
        console.error("Parsing failed with exception:", parseContext.exception);
        return null;
    }
    try {
        const visitor = new Visitor();
        return visitor.visit(parseContext);
    } catch (e) {
        console.error("Error during AST construction (visiting):", e);
        return null;
    }
};

export const expressionToAst = (expression: string): ASTNode | null => {
    try {
        const parseContext = parse(expression);
        return parseContextToAst(parseContext);
    } catch (e) {
        // Catch errors from the lexer/parser setup itself
        console.error(`Failed to parse expression: "${expression}"`, e);
        return null;
    }
};
