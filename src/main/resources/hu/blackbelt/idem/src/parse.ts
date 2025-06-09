import { CharStream, CommonTokenStream } from 'antlr4ng';
import { Visitor } from '~/Visitor';
import { IdemLexer } from '~/generated/IdemLexer';
import { IdemParser, type ParseContext } from '~/generated/IdemParser';
import type { ASTNode } from '~/types/ast';

export const parse = (input: string): ParseContext => {
  const inputStream = CharStream.fromString(input);
  const lexer = new IdemLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new IdemParser(tokenStream);
  parser.buildParseTrees = true;
  return parser.parse();
};

export const parseContextToAst = (parseContext: ParseContext): ASTNode => {
  const visitor = new Visitor();
  return visitor.visit(parseContext);
};

export const expressionToAst = (expression: string): ASTNode => {
  const parseContext = parse(expression);
  return parseContextToAst(parseContext);
};
