import { describe, expect, it } from 'vitest';
import { expressionToAst } from '~/parse';

describe('Expression → AST', () => {
  it('self-expression with tags', () => {
    const ast = expressionToAst('self.foo.bar');
    expect(ast).toMatchObject({
      type: 'Self',
      tags: {
        type: 'Tags',
        features: ['foo', 'bar'],
      },
    });
  });

  it('unary minus', () => {
    expect(expressionToAst('-42')).toMatchObject({
      type: 'UnaryMinus',
      expr: { type: 'Number', value: 42 },
    });
  });

  it('logical not', () => {
    expect(expressionToAst('!true')).toMatchObject({
      type: 'Not',
      expr: { type: 'Boolean', value: true },
    });
  });

  it('power', () => {
    expect(expressionToAst('2^3')).toMatchObject({
      type: 'Power',
      left: { type: 'Number', value: 2 },
      right: { type: 'Number', value: 3 },
    });
  });

  it('multiply / divide / modulus', () => {
    expect(expressionToAst('6*7')).toMatchObject({ type: 'Multiply' });
    expect(expressionToAst('8/2')).toMatchObject({ type: 'Divide' });
    expect(expressionToAst('5%2')).toMatchObject({ type: 'Modulus' });
  });

  it('add / subtract', () => {
    expect(expressionToAst('1+2')).toMatchObject({ type: 'Add' });
    expect(expressionToAst('3-1')).toMatchObject({ type: 'Subtract' });
  });

  it('add / subtract DatePart', () => {
    expect(expressionToAst('4+10D')).toMatchObject({
      type: 'AddDatePart',
      datepart: '10D',
    });
    expect(expressionToAst('5-2Y')).toMatchObject({
      type: 'SubtractDatePart',
      datepart: '2Y',
    });
  });

  it('comparisons', () => {
    expect(expressionToAst('2>=2')).toMatchObject({ type: 'Gte' });
    expect(expressionToAst('3<=4')).toMatchObject({ type: 'Lte' });
    expect(expressionToAst('5>3')).toMatchObject({ type: 'Gt' });
    expect(expressionToAst('2<7')).toMatchObject({ type: 'Lt' });
  });

  it('equality and inequality', () => {
    expect(expressionToAst('1==1')).toMatchObject({ type: 'Eq' });
    expect(expressionToAst('1!=2')).toMatchObject({ type: 'NotEq' });
  });

  it('logical and / or', () => {
    expect(expressionToAst('true && false')).toMatchObject({ type: 'And' });
    expect(expressionToAst('true || false')).toMatchObject({ type: 'Or' });
  });

  it('ternary', () => {
    expect(expressionToAst('1?2:3')).toMatchObject({
      type: 'Ternary',
      cond: { type: 'Number', value: 1 },
      // biome-ignore lint/suspicious/noThenProperty: <explanation>
      then: { type: 'Number', value: 2 },
      else: { type: 'Number', value: 3 },
    });
  });

  it('number literal', () => {
    expect(expressionToAst('123.45')).toEqual({
      type: 'Number',
      value: 123.45,
    });
  });

  it('date literal', () => {
    expect(expressionToAst('2023-12-31')).toEqual({
      type: 'LocalDate',
      value: '2023-12-31',
    });
  });

  it('boolean and null', () => {
    expect(expressionToAst('false')).toEqual({ type: 'Boolean', value: false });
    expect(expressionToAst('null')).toEqual({ type: 'Null', value: null });
  });

  it('list literal and access', () => {
    const lst = expressionToAst('[1,2,3]');
    expect(lst).toMatchObject({
      type: 'List',
      elements: [
        { type: 'Number', value: 1 },
        { type: 'Number', value: 2 },
        { type: 'Number', value: 3 },
      ],
    });

    const acc = expressionToAst('[10,20][1]');
    expect(acc).toMatchObject({
      type: 'ListAccess',
      list: { type: 'List' },
      indexes: {
        type: 'Indexes',
        elements: [{ type: 'Number', value: 1 }],
      },
    });
  });

  it('string literal and access', () => {
    expect(expressionToAst(`"hello"`)).toEqual({ type: 'String', value: 'hello' });
    expect(expressionToAst(`'xy'`)).toEqual({ type: 'String', value: 'xy' });

    const sacc = expressionToAst(`'ok'[0]`);
    expect(sacc).toMatchObject({
      type: 'StringAccess',
      value: 'ok',
      indexes: {
        type: 'Indexes',
        elements: [{ type: 'Number', value: 0 }],
      },
    });
  });

  it('parenthesized expression', () => {
    expect(expressionToAst('(1+1)')).toMatchObject({ type: 'Add' });
  });

  it('pointer-access off a parenthesized expr', () => {
    const p = expressionToAst('(1+2).foo[3]');
    expect(p).toMatchObject({
      type: 'PointerAccess',
      expr: { type: 'Add' },
      pointers: {
        type: 'Pointers',
        elements: [
          { type: 'Tags', features: ['foo'] },
          {
            type: 'Index',
            indexes: {
              type: 'Indexes',
              elements: [{ type: 'Number', value: 3 }],
            },
          },
        ],
      },
    });
  });

  it('mixes arithmetic and logical in one expression', () => {
    const ast = expressionToAst('!(1 + 2 * 3 <= 7) && (4 % 2 == 0)');
    expect(ast).toEqual({
      type: 'And',
      left: {
        type: 'Not',
        expr: {
          type: 'Lte',
          left: {
            type: 'Add',
            left: { type: 'Number', value: 1 },
            right: {
              type: 'Multiply',
              left: { type: 'Number', value: 2 },
              right: { type: 'Number', value: 3 },
            },
          },
          right: { type: 'Number', value: 7 },
        },
      },
      right: {
        type: 'Eq',
        left: {
          type: 'Modulus',
          left: { type: 'Number', value: 4 },
          right: { type: 'Number', value: 2 },
        },
        right: { type: 'Number', value: 0 },
      },
    });
  });

  it('mixes arithmetic with multiple self chains', () => {
    const ast = expressionToAst('self.x + self.y * self.z');
    expect(ast).toEqual({
      type: 'Add',
      left: { type: 'Self', tags: { features: ['x'], type: 'Tags' } },
      right: {
        type: 'Multiply',
        left: { type: 'Self', tags: { features: ['y'], type: 'Tags' } },
        right: { type: 'Self', tags: { features: ['z'], type: 'Tags' } },
      },
    });
  });

  it('handles a ternary using self chains', () => {
    const ast = expressionToAst('self.enabled ? self.onValue : self.offValue');
    expect(ast).toEqual({
      type: 'Ternary',
      cond: { tags: { features: ['enabled'], type: 'Tags' }, type: 'Self' },
      // biome-ignore lint/suspicious/noThenProperty: <explanation>
      then: { tags: { features: ['onValue'], type: 'Tags' }, type: 'Self' },
      else: { tags: { features: ['offValue'], type: 'Tags' }, type: 'Self' },
    });
  });

  it('combines logical and unary with self chains', () => {
    const ast = expressionToAst('!self.isValid && self.items.length > 0');
    expect(ast).toEqual({
      type: 'And',
      left: {
        type: 'Not',
        expr: { type: 'Self', tags: { features: ['isValid'], type: 'Tags' } },
      },
      right: {
        type: 'Gt',
        left: { type: 'Self', tags: { features: ['items', 'length'], type: 'Tags' } },
        right: { type: 'Number', value: 0 },
      },
    });
  });

  it('respects parentheses around self chains in mixed arithmetic', () => {
    const ast = expressionToAst('(self.a + self.b) * self.c');
    expect(ast).toEqual({
      type: 'Multiply',
      left: {
        type: 'Add',
        left: { type: 'Self', tags: { features: ['a'], type: 'Tags' } },
        right: { type: 'Self', tags: { features: ['b'], type: 'Tags' } },
      },
      right: { type: 'Self', tags: { features: ['c'], type: 'Tags' } },
    });
  });
});
