import type {
  ANTLRErrorListener,
  ATNConfigSet,
  ATNSimulator,
  BitSet,
  DFA,
  Parser,
  RecognitionException,
  Recognizer,
  Token,
} from 'antlr4ng';
import { CharStream, CommonTokenStream } from 'antlr4ng';
import { Visitor } from '~/Visitor';
import { IdemLexer } from '~/generated/IdemLexer';
import { IdemParser, type ParseContext } from '~/generated/IdemParser';
import type { ASTNode } from '~/types/ast';
import '~/IdemParserExtension'; // Import the extension to apply the prototype method

/**
 * A custom error listener that throws an exception upon syntax errors.
 */
class ThrowingErrorListener implements ANTLRErrorListener {
  /**
   * Throws an error on a syntax error.
   */
  public syntaxError<S extends Token, T extends ATNSimulator>(
    recognizer: Recognizer<T>,
    offendingSymbol: S | null,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | null,
  ): void {
    throw new Error(`line ${line}:${charPositionInLine} ${msg}`);
  }

  /**
   * The following methods are required to satisfy the ANTLRErrorListener interface.
   * They are implemented with empty bodies as we don't need to act on these events.
   */
  public reportAmbiguity(
    recognizer: Parser,
    dfa: DFA,
    startIndex: number,
    stopIndex: number,
    exact: boolean,
    ambigAlts: BitSet,
    configs: ATNConfigSet,
  ): void {
    // Do nothing.
  }

  public reportAttemptingFullContext(
    recognizer: Parser,
    dfa: DFA,
    startIndex: number,
    stopIndex: number,
    conflictingAlts: BitSet,
    configs: ATNConfigSet,
  ): void {
    // Do nothing.
  }

  public reportContextSensitivity(
    recognizer: Parser,
    dfa: DFA,
    startIndex: number,
    stopIndex: number,
    prediction: number,
    configs: ATNConfigSet,
  ): void {
    // Do nothing.
  }
}

export const parse = (input: string): ParseContext => {
  const inputStream = CharStream.fromString(input);
  const lexer = new IdemLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new IdemParser(tokenStream);

  // Replace default console error listener with one that throws
  parser.removeErrorListeners();
  parser.addErrorListener(new ThrowingErrorListener());

  parser.buildParseTrees = true;
  return parser.parse();
};

export const parseContextToAst = (parseContext: ParseContext): ASTNode => {
  // Error handling is now managed by the ThrowingErrorListener, which will
  // cause the parse() call to throw, and the exception will be caught in expressionToAst.
  try {
    const visitor = new Visitor();
    return visitor.visit(parseContext) as ASTNode;
  } catch (e) {
    // biome-ignore lint/complexity/noUselessCatch: this is fine
    throw e;
    // console.error("Error during AST construction (visiting):", e);
    // return null;
  }
};

export const expressionToAst = (expression: string): ASTNode => {
  try {
    const parseContext = parse(expression);
    return parseContextToAst(parseContext) as ASTNode;
  } catch (e) {
    // Catch errors from the lexer/parser setup or the ThrowingErrorListener
    // console.error(`Failed to parse expression: "${expression}"`, e); // Optional: uncomment for debugging
    // biome-ignore lint/complexity/noUselessCatch: this is fine
    throw e;
    //return null;
  }
};
