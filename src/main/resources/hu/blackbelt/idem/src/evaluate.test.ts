import { describe, expect, it } from 'vitest';
import { evaluate } from './evaluate';
import { expressionToAst } from './parse';
import { addDays, subDays } from 'date-fns';

const ctx = {
    self: {
        a: 1.5,
        b: 2,
        flag: false,
        nested: { x: 42 },
        arr: [10, 20, { val: 5 }],
        matrix: [[1, 2], [3, 4]],
        str: 'hello',
        items: [1, 2, 3],
        startDate: new Date('2025-06-15T00:00:00.000Z'),
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

const evalExpr = (expr: string) => evaluate(expressionToAst(expr), ctx);

describe('IdemEvaluator', () => {

    it('parses numbers and unary minus', () => {
        expect(evalExpr('123')).toBe(123);
        expect(evalExpr('-123')).toBe(-123);
        expect(evalExpr('0')).toBe(0);
    });

    it('parses booleans and not', () => {
        expect(evalExpr('true')).toBe(true);
        expect(evalExpr('false')).toBe(false);
        expect(evalExpr('not false')).toBe(true);
    });

    it('parses null', () => {
        expect(evalExpr('null')).toBeNull();
    });

    it('resolves self properties', () => {
        expect(evalExpr('self.a')).toBe(1.5);
        expect(evalExpr('self.nested.x')).toBe(42);
        expect(evalExpr('self.nonExistent')).toBeNull();
    });

    it('handles arithmetic operators', () => {
        expect(evalExpr('1+2')).toBe(3);
        expect(evalExpr('5-3')).toBe(2);
        expect(evalExpr('2*3')).toBe(6);
        expect(evalExpr('8/4')).toBe(2);
        expect(evalExpr('10%3')).toBe(1);
        expect(evalExpr('2^3')).toBe(8);
        expect(evalExpr('self.a + self.b')).toBe(3.5);
        expect(evalExpr('self.a + self.maybeNull')).toBeNull();
        expect(evalExpr("'hello' + self.maybeNull")).toBeNull();
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
        expect(evalExpr('self.maybeNull ? 10 : 20')).toBe(20);
    });

    it('handles in operator', () => {
        expect(evalExpr('2 in self.items')).toBe(true);
        expect(evalExpr('4 in self.items')).toBe(false);
        expect(evalExpr('self.maybeNull in self.items')).toBeNull();
    });

    it('handles index access', () => {
        expect(evalExpr('self.items[1]')).toBe(2);
        expect(evalExpr('self.str[1]')).toBe('e');
        expect(evalExpr('self.matrix[1][0]')).toBe(3);
    });

    it('evaluates a complex expression', () => {
        const expr = "not (self.a + self.b > 5) and (2 in self.items) ? self.matrix[0][1] : self.nested.x";
        expect(evalExpr(expr)).toBe(2);
    });

    describe('Built-in Functions', () => {
        it('handles generic functions', () => {
            expect(evalExpr('self.a!isDefined()')).toBe(true);
            expect(evalExpr('self.maybeNull!isDefined()')).toBe(false);
            expect(evalExpr('self.maybeNull!isUndefined()')).toBe(true);
            expect(evalExpr('self.nonExistent!size()')).toBeNull();
        });

        it('handles string functions', () => {
            expect(evalExpr('self.name!lowerCase()')).toBe('idem language');
            expect(evalExpr('self.name!upperCase()')).toBe('IDEM LANGUAGE');
            expect(evalExpr('self.name!length()')).toBe(13);
            expect(evalExpr("' hello '!trim()")).toBe('hello');
            expect(evalExpr("'hello'!substring(1, 3)")).toBe('ell');
            expect(evalExpr("'hello'!first(2)")).toBe('he');
            expect(evalExpr("'hello'!last(2)")).toBe('lo');
            expect(evalExpr("'hello world'!position('world')")).toBe(6);
            expect(evalExpr("'abc-123'!matches('[a-z]+-\\\\d+')")).toBe(true);
            expect(evalExpr("'a b c'!replace(' ', '-')")).toBe('a-b-c');
        });

        it('handles numeric functions', () => {
            expect(evalExpr('1.2355!round(2)')).toBe(1.24);
            expect(evalExpr('self.a!round()')).toBe(2);
        });

        it('handles temporal literals and functions', () => {
            expect(evalExpr('`2023-12-31`').toISOString()).toContain('2023-12-31');
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            expect(evalExpr('today').toISOString()).toEqual(today.toISOString());
            expect(evalExpr('yesterday').toISOString()).toEqual(subDays(today, 1).toISOString());
            expect(evalExpr('tomorrow').toISOString()).toEqual(addDays(today, 1).toISOString());
            expect(evalExpr('`2025-06-10`!difference(`2025-06-08`)')).toBe(2);
            expect(evalExpr('`2025-01-01T12:00:10Z`!difference(`2025-01-01T12:00:00Z`)')).toBe(10);
        });

        it('handles collection functions', () => {
            expect(evalExpr("self.items!size()")).toBe(3);
            expect(evalExpr("self.items!count()")).toBe(3);
            expect(evalExpr("self.items!head(2)")).toEqual([1, 2]);
            expect(evalExpr("self.items!tail(2)")).toEqual([2, 3]);
            expect(evalExpr("self.items!limit(1, 1)")).toEqual([2]);
            expect(evalExpr("self.items!sum()")).toBe(6);
            expect(evalExpr("self.items!avg()")).toBe(2);
            expect(evalExpr("self.items!min()")).toBe(1);
            expect(evalExpr("self.items!max()")).toBe(3);
        });

        it('handles iterator functions', () => {
            expect(evalExpr("self.orderDetails!sum(od | od.quantity)")).toBe(27);
            expect(evalExpr("self.orderDetails!avg(od | od.quantity)")).toBe(9);
            expect(evalExpr("self.orderDetails!min(od | od.unitPrice)")).toBe(9.8);
            expect(evalExpr("self.orderDetails!max(od | od.unitPrice)")).toBe(34.8);
            expect(evalExpr("self.products!join(p | p.productName, ', ')")).toBe('Chai, Chang, Aniseed Syrup');
            expect(evalExpr("self.orderDetails!filter(od | od.unitPrice < 10)")).toHaveLength(1);
            const sorted = evalExpr("self.products!sort(p | p.unitPrice)");
            expect(sorted[0].unitPrice).toBe(10);
            const sortedDesc = evalExpr("self.products!sort(p | p.unitPrice DESC)");
            expect(sortedDesc[0].unitPrice).toBe(19);
        });
    });
});
