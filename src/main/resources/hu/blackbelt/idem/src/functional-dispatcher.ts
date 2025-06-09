import {evaluate, compare} from './evaluate';
import type {ASTNode} from './types/ast';
import type {EvalContext} from './evaluate';
import {
    differenceInDays, differenceInSeconds,
} from 'date-fns';

type IdemFunction = (target: any, args: ASTNode[], ctx: EvalContext) => any;

const FUNCTIONS: Record<string, IdemFunction> = {
    // Generic
    isDefined: (target) => target !== null,
    isUndefined: (target) => target === null,

    // String
    lowerCase: (target) => String(target).toLowerCase(),
    upperCase: (target) => String(target).toUpperCase(),
    length: (target) => String(target).length,
    substring: (target, args, ctx) => {
        const from = evaluate(args[0], ctx);
        const len = evaluate(args[1], ctx);
        return String(target).substring(from, from + len);
    },
    first: (target, args, ctx) => String(target).substring(0, evaluate(args[0], ctx)),
    last: (target, args, ctx) => String(target).slice(-evaluate(args[0], ctx)),
    position: (target, args, ctx) => String(target).indexOf(evaluate(args[0], ctx)),
    matches: (target, args, ctx) => new RegExp(evaluate(args[0], ctx)).test(target),
    replace: (target, args, ctx) => String(target).replace(new RegExp(evaluate(args[0], ctx), 'g'), evaluate(args[1], ctx)),
    trim: (target) => String(target).trim(),

    // Numeric
    round: (target, args, ctx) => {
        const precision = args.length > 0 ? evaluate(args[0], ctx) : 0;
        if (precision === 0) {
            return Math.round(target);
        }
        const factor = Math.pow(10, precision);
        // Use toFixed to handle floating point inaccuracies for rounding
        return parseFloat(Number(target).toFixed(precision));
    },

    // Temporal
    difference: (target, args, ctx) => {
        const right = evaluate(args[0], ctx);
        if (target instanceof Date && right instanceof Date) {
            // simple date check (no time part)
            if (target.getUTCHours() === 0 && target.getUTCMinutes() === 0 && target.getUTCSeconds() === 0 &&
                right.getUTCHours() === 0 && right.getUTCMinutes() === 0 && right.getUTCSeconds() === 0
            ) {
                return differenceInDays(target, right);
            }
            // time or timestamp difference
            return differenceInSeconds(target, right);
        }
        return null; // Or throw error
    },

    // Collection
    size: (target) => (target as any[]).length,
    count: (target) => (target as any[]).length,
    head: (target, args, ctx) => (target as any[]).slice(0, evaluate(args[0], ctx)),
    tail: (target, args, ctx) => (target as any[]).slice(-evaluate(args[0], ctx)),
    limit: (target, args, ctx) => {
        const count = evaluate(args[0], ctx);
        const offset = args.length > 1 ? evaluate(args[1], ctx) : 0;
        return (target as any[]).slice(offset, offset + count);
    },
    join: (target, args, ctx) => {
        const collection = target as any[];
        const iterator = args[0];
        const delimiter = evaluate(args[1], ctx);
        return collection.map(item => {
            const localCtx = {...ctx, self: {[iterator.iteratorVar!]: item}};
            const val = evaluate(iterator.iteratorExpression!, localCtx)
            return String(val ?? '');
        }).join(delimiter);
    },
    filter: (target, args, ctx) => {
        const collection = target as any[];
        const iterator = args[0];
        return collection.filter(item => {
            const localCtx = {...ctx, self: {[iterator.iteratorVar!]: item}};
            return evaluate(iterator.iteratorExpression!, localCtx);
        });
    },
    sum: (target, args, ctx) => getStream(target, args, ctx).reduce((sum, val) => sum + (Number(val) || 0), 0),
    avg: (target, args, ctx) => {
        const values = getStream(target, args, ctx).map(v => Number(v));
        if (values.length === 0) return 0;
        const sum = values.reduce((sum, val) => sum + val, 0);
        return sum / values.length;
    },
    min: (target, args, ctx) => Math.min(...getStream(target, args, ctx).filter(v => v !== null)),
    max: (target, args, ctx) => Math.max(...getStream(target, args, ctx).filter(v => v !== null)),
    sort: (target, args, ctx) => {
        const collection = [...(target as any[])];
        collection.sort((a, b) => {
            for (const iterator of args) {
                const localCtxA = {...ctx, self: {[iterator.iteratorVar!]: a}};
                const localCtxB = {...ctx, self: {[iterator.iteratorVar!]: b}};
                const valA = evaluate(iterator.iteratorExpression!, localCtxA);
                const valB = evaluate(iterator.iteratorExpression!, localCtxB);

                const direction = iterator.value === 'DESC' ? -1 : 1;
                const result = compare(valA, valB);
                if (result !== 0) {
                    return result * direction;
                }
            }
            return 0;
        });
        return collection;
    }
};

function getStream(target: any, args: ASTNode[], ctx: EvalContext): any[] {
    const collection = target as any[];
    if (args.length === 0) return collection;
    const iterator = args[0];
    return collection.map(item => {
        const localCtx = {...ctx, self: {[iterator.iteratorVar!]: item}};
        return evaluate(iterator.iteratorExpression!, localCtx);
    });
}

export function dispatch(functionName: string, target: any, args: ASTNode[], ctx: EvalContext): any {
    if (target === null && !['isDefined', 'isUndefined'].includes(functionName)) {
        return null;
    }
    const func = FUNCTIONS[functionName];
    if (func) {
        return func(target, args, ctx);
    }
    throw new Error(`Function '${functionName}' not found for type ${typeof target}`);
}
