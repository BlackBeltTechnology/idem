import { addDays, differenceInDays, differenceInSeconds, parseISO, subDays } from 'date-fns';
import { beforeAll, describe, expect, it } from 'vitest';
import { type EvalExpr, createEvalExpr, compare } from './evaluate';
import { parseLocalDateAsUTC } from './utils/datetime';

interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  discontinued: boolean;
}

interface OrderDetail {
  orderId: number;
  productId: number;
  unitPrice: number;
  quantity: number;
  discount: number;
}

const ctx = {
  self: {
    a: 1.5,
    b: 2,
    flag: false,
    nested: { x: 42 },
    arr: [10, 20, { val: 5 }],
    matrix: [
      [1, 2],
      [3, 4],
    ],
    str: 'hello',
    items: [1, 2, 3],
    itemsForAvg: [1, 2, 4], // avg = 2.333...
    strings: ['c', 'a', 'b'],
    startDate: parseLocalDateAsUTC('2025-06-15'),
    name: 'Idem Language',
    maybeNull: null,
    products: [
      { productId: 1, productName: 'Chai', unitPrice: 18, discontinued: false },
      { productId: 2, productName: 'Chang', unitPrice: 19, discontinued: true },
      { productId: 3, productName: 'Aniseed Syrup', unitPrice: 10, discontinued: false },
    ],
    orderDetails: [
      { orderId: 10248, productId: 11, unitPrice: 14.0, quantity: 12, discount: 0 },
      { orderId: 10248, productId: 42, unitPrice: 9.8, quantity: 10, discount: 0 },
      { orderId: 10249, productId: 72, unitPrice: 34.8, quantity: 5, discount: 0 },
    ],
  },
};

describe('IdemEvaluator', () => {
  let evalExpr: EvalExpr;

  beforeAll(() => {
    evalExpr = createEvalExpr({
      dateFunctions: {
        addDays,
        subDays,
        parseISO,
        differenceInSeconds,
        differenceInDays,
      },
    });
  });

  it('works without context', () => {
    expect(evalExpr('1 + 1')).toBe(2);
  });

  it('parses numbers and unary minus', () => {
    expect(evalExpr('123')).toBe(123);
    expect(evalExpr('-123')).toBe(-123);
    expect(evalExpr('123.45')).toBe(123.45);
    expect(evalExpr('0')).toBe(0);
  });

  it('parses booleans and not', () => {
    expect(evalExpr('true')).toBe(true);
    expect(evalExpr('false')).toBe(false);
    expect(evalExpr('not false')).toBe(true);
    expect(evalExpr('not self.maybeNull', ctx)).toBe(true);
  });

  it('parses null', () => {
    expect(evalExpr('null')).toBeNull();
  });

  it('parses enum literals', () => {
    expect(evalExpr('MyEnum#MyValue')).toBe('MyEnum#MyValue');
    expect(evalExpr('model::MyEnum#MyValue')).toBe('model::MyEnum#MyValue');
  });

  it('resolves self properties', () => {
    expect(evalExpr('self.a', ctx)).toBe(1.5);
    expect(evalExpr('self.nested.x', ctx)).toBe(42);
    expect(evalExpr('self.nonExistent', ctx)).toBeNull();
  });

  it('handles arithmetic operators', () => {
    expect(evalExpr('1+2')).toBe(3);
    expect(evalExpr('5-3')).toBe(2);
    expect(evalExpr('2*3')).toBe(6);
    expect(evalExpr('8/4')).toBe(2);
    expect(evalExpr('10%3')).toBe(1);
    expect(evalExpr('10/3')).toBeCloseTo(3.3333333333);
    expect(evalExpr('2^3')).toBe(8);
    expect(evalExpr('self.a + self.b', ctx)).toBe(3.5);
    expect(evalExpr('self.a + self.maybeNull', ctx)).toBeNull();
    expect(evalExpr("'hello ' + self.maybeNull", ctx)).toBeNull();
  });

  it('handles div/mod operators', () => {
    expect(evalExpr('5 div 2')).toBe(2);
    expect(evalExpr('5.5 div 2')).toBe(2);
    expect(evalExpr('5 mod 2')).toBe(1);
    expect(evalExpr('5.5 mod 2.9')).toBe(1);
  });

  it('handles comparison operators', () => {
    expect(evalExpr('3>2')).toBe(true);
    expect(evalExpr('3>=3')).toBe(true);
    expect(evalExpr('2<3')).toBe(true);
    expect(evalExpr('2<=2')).toBe(true);
    expect(evalExpr('2==2')).toBe(true);
    expect(evalExpr('2.0==2')).toBe(true);
    expect(evalExpr('2!=3')).toBe(true);
  });

  it('handles string comparisons case-insensitively', () => {
    expect(evalExpr("'Hello' == 'hello'")).toBe(true);
    expect(evalExpr("'Apple' != 'Banana'")).toBe(true);
    expect(evalExpr("'Apple' <> 'apple'")).toBe(false);
  });

  it('handles logical operators', () => {
    expect(evalExpr('true and false')).toBe(false);
    expect(evalExpr('true or false')).toBe(true);
    expect(evalExpr('true implies false')).toBe(false);
    expect(evalExpr('false implies true')).toBe(true);
    expect(evalExpr('true xor false')).toBe(true);
    expect(evalExpr('true xor true')).toBe(false);
  });

  it('handles ternary operator', () => {
    expect(evalExpr('1 > 0 ? 10 : 20')).toBe(10);
    expect(evalExpr('self.maybeNull ? 10 : 20', ctx)).toBe(20);
  });

  it('handles in operator', () => {
    expect(evalExpr('2 in self.items', ctx)).toBe(true);
    expect(evalExpr('4 in self.items', ctx)).toBe(false);
    expect(evalExpr('self.maybeNull in self.items', ctx)).toBeNull();
    expect(evalExpr('2 in self.maybeNull', ctx)).toBe(false);
  });

  it('handles index access', () => {
    expect(evalExpr('self.items[1]', ctx)).toBe(2);
    expect(evalExpr('self.str[1]', ctx)).toBe('e');
    expect(evalExpr('self.matrix[1][0]', ctx)).toBe(3);
    expect(evalExpr('self.items[99]', ctx)).toBeNull(); // Out of bounds
  });

  it('evaluates a complex expression', () => {
    const expr = 'not (self.a + self.b > 5) and (2 in self.items) ? self.matrix[0][1] : self.nested.x';
    expect(evalExpr(expr, ctx)).toBe(2);
  });

  describe('Built-in Functions', () => {
    it('handles generic functions', () => {
      expect(evalExpr('self.a!isDefined()', ctx)).toBe(true);
      expect(evalExpr('self.maybeNull!isDefined()', ctx)).toBe(false);
      expect(evalExpr('self.maybeNull!isUndefined()', ctx)).toBe(true);
      expect(evalExpr('self.nonExistent!size()', ctx)).toBeNull();
    });

    it('handles string functions', () => {
      expect(evalExpr('self.name!lowerCase()', ctx)).toBe('idem language');
      expect(evalExpr('self.name!upperCase()', ctx)).toBe('IDEM LANGUAGE');
      expect(evalExpr('self.name!length()', ctx)).toBe(13);
      expect(evalExpr("' hello '!trim()")).toBe('hello');
      expect(evalExpr("'hello'!substring(1, 3)")).toBe('ell');
      expect(evalExpr("'hello'!first(2)")).toBe('he');
      expect(evalExpr("'hello'!last(2)")).toBe('lo');
      expect(evalExpr("'hello world'!position('world')")).toBe(6);
      expect(evalExpr("'abc-123'!matches('[a-z]+-\\d+')")).toBe(true);
      expect(evalExpr("'a b c'!replace(' ', '-')")).toBe('a-b-c');
    });

    it('handles numeric functions', () => {
      // Test rounding to match Java's ROUND_HALF_UP
      expect(evalExpr('1.235!round(2)')).toBe(1.24);
      expect(evalExpr('1.2345!round(2)')).toBe(1.23);
      expect(evalExpr('1.5!round()')).toBe(2);
      expect(evalExpr('-1.5!round()')).toBe(-2);
      expect(evalExpr('-1.4!round()')).toBe(-1);
      expect(evalExpr('-1.6!round()')).toBe(-2);
    });

    it('handles temporal literals and functions', () => {
      expect(evalExpr('`2023-12-31`')).toEqual(parseLocalDateAsUTC('2023-12-31'));
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      expect(evalExpr('today')).toEqual(today);
      expect(evalExpr('yesterday')).toEqual(subDays(today, 1));
      expect(evalExpr('tomorrow')).toEqual(addDays(today, 1));
      expect(evalExpr('`2025-06-10`!difference(`2025-06-08`)')).toBe(2);
      expect(evalExpr('`2025-01-01T12:00:10Z`!difference(`2025-01-01T12:00:00Z`)')).toBe(10);
      const d = new Date(0);
      d.setUTCHours(10, 30, 5);
      expect(evalExpr('`10:30:05`')).toEqual(d);
      const d2 = new Date(0);
      d2.setUTCHours(10, 30, 0);
      expect(evalExpr('`10:30`')).toEqual(d2);
    });

    it('handles collection functions', () => {
      expect(evalExpr('self.items!size()', ctx)).toBe(3);
      expect(evalExpr('self.items!count()', ctx)).toBe(3);
      expect(evalExpr('self.items!head(2)', ctx)).toEqual([1, 2]);
      expect(evalExpr('self.items!tail(2)', ctx)).toEqual([2, 3]);
      expect(evalExpr('self.items!limit(1, 1)', ctx)).toEqual([2]);
      expect(evalExpr('self.items!sum()', ctx)).toBe(6);
      expect(evalExpr('self.items!avg()', ctx)).toBe(2);
      expect(evalExpr('self.items!min()', ctx)).toBe(1);
      expect(evalExpr('self.items!max()', ctx)).toBe(3);
    });

    it('handles min/max on various types', () => {
      expect(evalExpr('self.strings!min()', ctx)).toBe('a');
      expect(evalExpr('self.strings!max()', ctx)).toBe('c');
    });

    it('handles collection avg with rounding', () => {
      // 7 / 3 = 2.3333333333... rounded to 10 places
      expect(evalExpr('self.itemsForAvg!avg()', ctx)).toBe(2.3333333333);
    });

    it('handles iterator functions', () => {
      expect(evalExpr('self.orderDetails!sum(od | od.quantity)', ctx)).toBe(27);
      expect(evalExpr('self.orderDetails!avg(od | od.quantity)', ctx)).toBe(9);
      expect(evalExpr('self.orderDetails!min(od | od.unitPrice)', ctx)).toBe(9.8);
      expect(evalExpr('self.orderDetails!max(od | od.unitPrice)', ctx)).toBe(34.8);
      expect(evalExpr("self.products!join(p | p.productName, ', ')", ctx)).toBe('Chai, Chang, Aniseed Syrup');
      const filtered = evalExpr('self.orderDetails!filter(od | od.unitPrice < 10)', ctx) as OrderDetail[];
      expect(filtered).toHaveLength(1);
      expect(filtered[0].unitPrice).toBe(9.8);
      const sorted = evalExpr('self.products!sort(p | p.unitPrice)', ctx) as Product[];
      expect(sorted[0].unitPrice).toBe(10);
      const sortedDesc = evalExpr('self.products!sort(p | p.unitPrice DESC)', ctx) as Product[];
      expect(sortedDesc[0].unitPrice).toBe(19);
    });

    it('handles chained iterator functions with correct sorting', () => {
      const expr = 'self.products!filter(p | p.unitPrice > 10)!sort(p | p.productName DESC)';
      const result = evalExpr(expr, ctx) as Product[];
      // Products with price > 10 are Chai (18) and Chang (19).
      // Sorted by productName DESC, 'Chang' comes before 'Chai'.
      expect(result).toHaveLength(2);
      expect(result[0].productName).toBe('Chang'); // Corrected expectation
      expect(result[1].productName).toBe('Chai'); // Corrected expectation
    });

    it('handles join with null values', () => {
      const ctxWithNulls = {
        self: {
          ...ctx.self,
          products: [{ productName: 'Chai' }, { productName: null }, { productName: 'Aniseed Syrup' }],
        },
      };
      const result = evalExpr("self.products!join(p | p.productName, ',')", ctxWithNulls);
      expect(result).toBe('Chai,null,Aniseed Syrup');
    });
  });

  describe('compare', () => {
    it('should compare numbers correctly', () => {
      expect(compare(1, 2)).toBe(-1);
      expect(compare(2, 1)).toBe(1);
      expect(compare(1, 1)).toBe(0);
    });

    it('should compare strings case-insensitively', () => {
      expect(compare('a', 'b')).toBe(-1);
      expect(compare('b', 'a')).toBe(1);
      expect(compare('a', 'a')).toBe(0);
      expect(compare('a', 'A')).toBe(0);
    });

    it('should compare booleans correctly', () => {
      expect(compare(true, false)).toBe(1);
      expect(compare(false, true)).toBe(-1);
      expect(compare(true, true)).toBe(0);
      expect(compare(false, false)).toBe(0);
    });

    it('should compare dates correctly', () => {
      const d1 = new Date(100);
      const d2 = new Date(200);
      expect(compare(d1, d2)).toBe(-1);
      expect(compare(d2, d1)).toBe(1);
      expect(compare(d1, d1)).toBe(0);
    });

    it('should handle nulls correctly', () => {
      expect(compare(null, null)).toBe(0);
      expect(compare(null, 1)).toBe(-1);
      expect(compare(1, null)).toBe(1);
    });

    it('should use loose equality for different types', () => {
      expect(compare(1, '1')).toBe(0);
      expect(compare(0, false)).toBe(0);
      expect(compare(1, true)).toBe(0);
    });

    it('should consider incomparable types as equal', () => {
      expect(compare({}, {})).toBe(0);
      expect(compare([], [])).toBe(0);
      expect(compare(1, 'a')).toBe(0);
      expect(compare(new Date(), 123)).toBe(0);
      expect(compare({ a: 1 }, { a: 1 })).toBe(0);
    });
  });
});
