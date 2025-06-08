import { describe, expect, it } from 'vitest';
import { evaluate } from './evaluate';
import { expressionToAst } from './parse';
import { addDays, differenceInDays, subDays } from 'date-fns';
import { parseLocalDate } from './utils/datetime';

const ctx = {
  self: {
    name: "Idem Language",
    a: 1.5,
    b: 2,
    flag: false,
    nested: { x: 42 },
    arr: [10, 20, { val: 5 }],
    matrix: [[1, 2], [3, 4]],
    items: [1, 2, 3],
    startDate: new Date('2025-06-15T00:00:00.000Z'),
    maybeNull: null,
  },
};

const evalExpr = (expr: string) => evaluate(expressionToAst(expr), ctx);

describe('evaluate', () => {
  it('parses numbers and unary minus', () => {
    expect(evaluate(expressionToAst('123'), ctx)).toBe(123);
    expect(evaluate(expressionToAst('-123'), ctx)).toBe(-123);
    expect(evaluate(expressionToAst('0'), ctx)).toBe(0);
  });

  it('parses booleans and not', () => {
    expect(evaluate(expressionToAst('true'), ctx)).toBe(true);
    expect(evaluate(expressionToAst('false'), ctx)).toBe(false);
    expect(evaluate(expressionToAst('not false'), ctx)).toBe(true);
  });

  it('parses null', () => {
    expect(evaluate(expressionToAst('null'), ctx)).toBeNull();
  });

  // TODO: There is time offset
  // it('parses local dates (as strings)', () => {
  //   expect(evaluate(expressionToAst('2023-12-31'), ctx)).toEqual(parseLocalDate('2023-12-31'));
  // });

  it('resolves simple self properties', () => {
    expect(evaluate(expressionToAst('self.a'), ctx)).toBe(1.5);
    expect(evaluate(expressionToAst('self.nested.x'), ctx)).toBe(42);
  });

  it('handles + - * / % ^', () => {
    expect(evaluate(expressionToAst('1+2'), ctx)).toBe(3);
    expect(evaluate(expressionToAst('5-3'), ctx)).toBe(2);
    expect(evaluate(expressionToAst('2*3'), ctx)).toBe(6);
    expect(evaluate(expressionToAst('8/4'), ctx)).toBe(2);
    expect(evaluate(expressionToAst('10%3'), ctx)).toBe(1);
    expect(evaluate(expressionToAst('2^3'), ctx)).toBe(8);
  });

  it('handles > >= < <= == !=', () => {
    expect(evaluate(expressionToAst('3>2'), ctx)).toBe(true);
    expect(evaluate(expressionToAst('3>=3'), ctx)).toBe(true);
    expect(evaluate(expressionToAst('2<3'), ctx)).toBe(true);
    expect(evaluate(expressionToAst('2<=2'), ctx)).toBe(true);
    expect(evaluate(expressionToAst('2==2'), ctx)).toBe(true);
    expect(evaluate(expressionToAst('2!=3'), ctx)).toBe(true);
  });

  it('handles && and ||', () => {
    expect(evaluate(expressionToAst('true and false'), ctx)).toBe(false);
    expect(evaluate(expressionToAst('true or false'), ctx)).toBe(true);
  });

  it('handles implies operator', () => {
    expect(evalExpr('true implies true')).toBe(true);
    expect(evalExpr('true implies false')).toBe(false);
    expect(evalExpr('false implies true')).toBe(true);
    expect(evalExpr('false implies false')).toBe(true);
  });

  it('handles xor operator', () => {
    expect(evalExpr('true xor false')).toBe(true);
    expect(evalExpr('false xor true')).toBe(true);
    expect(evalExpr('true xor true')).toBe(false);
    expect(evalExpr('false xor false')).toBe(false);
  });

  it('handles ternary operator', () => {
    expect(evaluate(expressionToAst('1 > 0 ? 10 : 20'), ctx)).toBe(10);
    expect(evaluate(expressionToAst('1 < 0 ? 10 : 20'), ctx)).toBe(20);
  });

  it('handles in operator', () => {
    expect(evaluate(expressionToAst('2 in [1,2,3]'), ctx)).toBe(true);
    expect(evaluate(expressionToAst('4 in [1,2,3]'), ctx)).toBe(false);
  });

  it('parses lists and indexing', () => {
    expect(evaluate(expressionToAst('[1,2,3]'), ctx)).toEqual([1, 2, 3]);
    expect(evaluate(expressionToAst('[1,2,3][1]'), ctx)).toBe(2);
    expect(evaluate(expressionToAst('[[1,2],[3,4]][1][0]'), ctx)).toBe(3);
  });

  it('parses strings and char access', () => {
    expect(evaluate(expressionToAst(`"abc"`), ctx)).toBe('abc');
    expect(evaluate(expressionToAst(`"abc"[1]`), ctx)).toBe('b');
    expect(evaluate(expressionToAst(`"abc"[1]=="b"`), ctx)).toBe(true);
  });

  it('handles pointer access after parentheses', () => {
    expect(evaluate(expressionToAst('(self.arr[2]).val'), ctx)).toBe(5);
    expect(evaluate(expressionToAst('self.matrix[1][0]'), ctx)).toBe(3);
  });

  it('evaluates a complex combined expression', () => {
    const expr = 'not (self.a+self.b>4) and (self.items in [1,2,3]) ? self.matrix[0][1] : self.nested.x';
    expect(evaluate(expressionToAst(expr), ctx)).toBe(42);
  });

  it('evaluates postfix functions on numbers', () => {
    expect(evalExpr('1.2345!round(2)')).toBe(1.23);
    expect(evalExpr('1.239!floor(2)')).toBe(1.23);
    expect(evalExpr('1.231!ceil(2)')).toBe(1.24);
    expect(evalExpr('self.a!round()')).toBe(2);
  });

  it('evaluates postfix functions on dates', () => {
    expect(evalExpr("2023-10-31!year()")).toBe(2023);
    expect(evalExpr("2023-10-31T10:20:30!hour()")).toBe(10);
    const expectedDiff = differenceInDays(new Date('2024-03-05'), new Date('2024-03-15'));
    expect(evalExpr("2024-03-15!dayDiff(2024-03-05)")).toBe(expectedDiff);
    // 1 day = 86400 seconds
    expect(evalExpr('2025-06-09!difference(2025-06-10)')).toBe(86400);
  });

  it('evaluates new date keywords', () => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    expect(evalExpr('today')).toEqual(today);
    expect(evalExpr('yesterday')).toEqual(subDays(today, 1));
    expect(evalExpr('tomorrow')).toEqual(addDays(today, 1));
  });

    it('evaulates string functions', () => {
    expect(evalExpr('self.name!lowerCase()')).toBe('idem language');
    expect(evalExpr('self.name!upperCase()')).toBe('IDEM LANGUAGE');
    expect(evalExpr('self.name!length()')).toBe(13);
    expect(evalExpr("'  abc  '!trim()")).toBe('abc');
    expect(evalExpr("'hello'!substring(1, 3)")).toBe('ell');
    expect(evalExpr("'hello'!first(2)")).toBe('he');
    expect(evalExpr("'hello'!last(2)")).toBe('lo');
    expect(evalExpr("'hello world'!position('world')")).toBe(6);
    expect(evalExpr("'abc-123'!matches('[a-z]+-\\d+')")).toBe(true);
    expect(evalExpr("'a b c'!replace(' ', '-')")).toBe('a-b-c');
  });

  it('evaluates generic size() function', () => {
    expect(evalExpr("'hello'!size()")).toBe(5);
    expect(evalExpr("self.items!size()")).toBe(3);
  });

  it('evaluates type conversion functions', () => {
    expect(evalExpr('true!toInt()')).toBe(1);
    expect(evalExpr('self.flag!toInt()')).toBe(0);
  });

  it('handles robust arithmetic', () => {
    expect(evalExpr('0.1 + 0.2')).toBeCloseTo(0.3);
    expect(evalExpr('self.a + self.b')).toBe(3.5);
  });

  it('handles robust comparisons', () => {
    expect(evalExpr('self.a > 0')).toBe(true);
    expect(evalExpr("'2025-01-01' > '2024-01-01'")).toBe(true);
  });

  it('handles indexing', () => {
    expect(evalExpr('self.items[1]')).toBe(2);
    expect(evalExpr("'hello'[1]")).toBe('e');
  });

  it('handles pointer access', () => {
    expect(evalExpr('(self.arr[2]).val')).toBe(5);
  });


  it('handles defined / undefined functions', () => {
    expect(evalExpr('self.a!isDefined()')).toBe(true);
    expect(evalExpr('self.maybeNull!isDefined()')).toBe(false);
    expect(evalExpr('self.maybeNull!isUndefined()')).toBe(true);
  });

  it('throws error for function on wrong type', () => {
    expect(() => evalExpr('123!year()')).toThrow();
    expect(() => evalExpr("'hello'!round(2)")).toThrow();
  });
});
