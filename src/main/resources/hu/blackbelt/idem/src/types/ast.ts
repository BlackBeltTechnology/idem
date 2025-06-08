export type AstNodeType =
  // Primitives & Literals
  | 'Number'
  | 'Boolean'
  | 'Null'
  | 'String'
  | 'List'
  | 'Self'

  // Date/Time Literals & Keywords
  | 'LocalDate'
  | 'Timestamp'
  | 'Time'
  | 'Today'
  | 'Yesterday'
  | 'Tomorrow'

  // Expressions
  | 'Add'
  | 'Subtract'
  | 'Multiply'
  | 'Divide'
  | 'Modulus'
  | 'Power'
  | 'And'
  | 'Or'
  | 'Not'
  | 'UnaryMinus'
  | 'Eq'
  | 'NotEq'
  | 'Gt'
  | 'Gte'
  | 'Lt'
  | 'Lte'
  | 'Ternary'
  | 'In'
  | 'Implies'
  | 'AddDatePart'
  | 'SubtractDatePart'
  | 'IndexAccess'
  | 'PointerAccess'

  // New Postfix Call
  | 'PostfixFunctionCall'

  // Internal helper types
  | 'Block'
  | 'ExprList'
  | 'Indexes'
  | 'Index'
  | 'Pointers'
  | 'Tags';
