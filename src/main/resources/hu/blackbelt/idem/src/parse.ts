import { CharStream, CommonTokenStream } from 'antlr4ng';
import { type ASTNode, Visitor } from '~/Visitor';
import { IdemLexer } from '~/generated/IdemLexer';
import { IdemParser, type ParseContext } from '~/generated/IdemParser';

export const parse = (input: string): ParseContext => {
  const inputStream = CharStream.fromString(input);
  const lexer = new IdemLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new IdemParser(tokenStream);
  return parser.parse();
};

export const parseContextToAst = (parseContext: ParseContext) => {
  return Visitor.getInstance().visit(parseContext) as ASTNode;
};

export const expressionToAst = (expression: string): ASTNode => {
  const parseContext = parse(expression);
  return parseContextToAst(parseContext);
};
