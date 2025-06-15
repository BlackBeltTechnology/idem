export type AstNodeType =
  // Expressions
  | 'Binary'
  | 'Unary'
  | 'Ternary'
  | 'In'
  | 'FunctionCall'
  | 'Navigation'
  | 'IndexAccess'
  | 'Self'
  | 'Identifier'

  // Literals
  | 'Number'
  | 'String'
  | 'Boolean'
  | 'Null'
  | 'EnumLiteral'
  | 'Date'
  | 'Timestamp'
  | 'Time'
  | 'Today'
  | 'Yesterday'
  | 'Tomorrow'

  // Internal structures
  | 'ArgumentList'
  | 'Argument'
  | 'IteratorArgument';

export interface ASTNode {
  type: AstNodeType;
  // biome-ignore lint/suspicious/noExplicitAny: this is fine
  value?: any;
  operator?: string;
  children?: ASTNode[];
  name?: string; // identifier or function name

  // Function call specific
  target?: ASTNode;
  args?: ASTNode[];

  // Iterator specific
  iteratorVar?: string;
  iteratorExpression?: ASTNode;
  direction?: 'ASC' | 'DESC' | string;
}
