import { describe, expect, it } from 'vitest';
import { expressionToAst } from '~/parse';

describe('Expression → AST Parser', () => {
  it('should parse literals correctly', () => {
    expect(expressionToAst('true')).toMatchObject({ type: 'Boolean', value: true });
    expect(expressionToAst('null')).toMatchObject({ type: 'Null' });
    expect(expressionToAst('123.45')).toMatchObject({ type: 'Number', value: 123.45 });
    expect(expressionToAst("'hello'")).toMatchObject({ type: 'String', value: 'hello' });
    expect(expressionToAst('`2025-01-10`')).toMatchObject({ type: 'Date' });
  });

  it('should parse self and navigation expressions', () => {
    const ast = expressionToAst('self.foo.bar');
    expect(ast).toMatchObject({
      type: 'Navigation',
      name: 'bar',
      target: {
        type: 'Navigation',
        name: 'foo',
        target: { type: 'Self' },
      },
    });
  });

  it('should parse unary operators', () => {
    const ast = expressionToAst('-42');
    expect(ast).toMatchObject({
      type: 'Unary',
      operator: '-',
      children: [{ type: 'Number', value: 42 }],
    });
  });

  it('should respect operator precedence', () => {
    const ast = expressionToAst('1 + 2 * 3');
    expect(ast).toMatchObject({
      type: 'Binary',
      operator: '+',
      children: [
        { type: 'Number', value: 1 },
        {
          type: 'Binary',
          operator: '*',
          children: [{ type: 'Number', value: 2 }, { type: 'Number', value: 3 }],
        },
      ],
    });
  });

  it('should handle parentheses to override precedence', () => {
    const ast = expressionToAst('(1 + 2) * 3');
    expect(ast).toMatchObject({
      type: 'Binary',
      operator: '*',
      children: [
        {
          type: 'Binary',
          operator: '+',
          children: [{ type: 'Number', value: 1 }, { type: 'Number', value: 2 }],
        },
        { type: 'Number', value: 3 },
      ],
    });
  });

  it('should parse index access', () => {
    const ast = expressionToAst('self.items[0]');
    expect(ast).toMatchObject({
      type: 'IndexAccess',
      children: [
        { type: 'Navigation', name: 'items' },
        { type: 'Number', value: 0 },
      ],
    });
  });

  it('should parse a function call with no arguments', () => {
    const ast = expressionToAst('self.name!length()');
    expect(ast).toMatchObject({
      type: 'FunctionCall',
      name: 'length',
      target: { type: 'Navigation', name: 'name' },
      args: [],
    });
  });

  it('should parse a function call with simple arguments', () => {
    const ast = expressionToAst("'hello'!substring(1, 4)");
    expect(ast).toMatchObject({
      type: 'FunctionCall',
      name: 'substring',
      target: { type: 'String', value: 'hello' },
      args: [
        { type: 'Number', value: 1 },
        { type: 'Number', value: 4 },
      ],
    });
  });

  it('should parse a function call with an iterator argument', () => {
    const ast = expressionToAst('self.items!filter(i | i > 1)');
    expect(ast).toMatchObject({
      type: 'FunctionCall',
      name: 'filter',
      target: { type: 'Navigation', name: 'items' },
      args: [{
        type: 'IteratorArgument',
        iteratorVar: 'i',
        iteratorExpression: {
          type: 'Binary',
          operator: '>',
          children: [
            { type: 'Identifier', name: 'i' },
            { type: 'Number', value: 1 },
          ],
        },
      }],
    });
  });

  it('should parse a complex expression', () => {
    const ast = expressionToAst('not (self.a > 1) and self.b');
    expect(ast).toMatchObject({
      type: 'Binary',
      operator: 'and',
      children: [
        {
          type: 'Unary',
          operator: 'not',
          children: [
            {
                type: 'Binary',
                operator: '>',
            }
          ]
        },
        {
          type: 'Navigation',
          name: 'b'
        }
      ]
    });
  });
});
