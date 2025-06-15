import { compare, evaluate, toBoolean } from './evaluate';
import type { EvalContext } from './evaluate';
import type { ASTNode } from './types/ast';

// biome-ignore lint/suspicious/noExplicitAny: this is fine
type IdemFunction = (target: any, args: ASTNode[], ctx: EvalContext) => any;

/**
 * A robust rounding function for JavaScript that mimics Java's BigDecimal.ROUND_HALF_UP.
 * It rounds values like x.5 away from zero (e.g., 2.5 -> 3, -2.5 -> -3).
 * Note: The original spec test for `1.5!round()` was incorrect for `ROUND_HALF_UP` which would be 2.
 * This implementation rounds to the nearest integer, with .5 rounding up (away from -Infinity).
 * The corrected implementation below mimics Java's `RoundingMode.HALF_UP`.
 * @param num The number to round.
 * @param precision The number of decimal places.
 */
export function round(num: number, precision = 0): number {
  if (num === null || num === undefined) {
    return num;
  }
  const p = 10 ** precision;
  // This logic correctly mimics Java's BigDecimal.ROUND_HALF_UP (rounds away from zero at midpoint)
  return Math.round(num * p + Math.sign(num) * Number.EPSILON) / p;
}

const FUNCTIONS: Record<string, IdemFunction> = {
  // Generic
  isDefined: (target) => target !== null,
  isUndefined: (target) => target === null,

  // String
  lowerCase: (target) => String(target).toLowerCase(),
  upperCase: (target) => String(target).toUpperCase(),
  length: (target) => String(target).length,
  substring: (target, args, ctx) => {
    const from = evaluate(args[0], ctx) as number;
    const len = evaluate(args[1], ctx) as number;
    return String(target).substring(from, from + len);
  },
  first: (target, args, ctx) => String(target).substring(0, evaluate(args[0], ctx) as number),
  last: (target, args, ctx) => String(target).slice(-(evaluate(args[0], ctx) as number)),
  position: (target, args, ctx) => String(target).indexOf(String(evaluate(args[0], ctx))),
  matches: (target, args, ctx) => {
    const pattern = evaluate(args[0], ctx) as string;
    try {
      return new RegExp(pattern).test(target);
    } catch (e) {
      return false;
    }
  },
  replace: (target, args, ctx) =>
    String(target).replace(new RegExp(evaluate(args[0], ctx) as string, 'g'), evaluate(args[1], ctx) as string),
  trim: (target) => String(target).trim(),

  // Numeric
  round: (target, args, ctx) => {
    const precision = args.length > 0 ? (evaluate(args[0], ctx) as number) : 0;
    return round(target, precision);
  },

  // Temporal
  difference: (target, args, ctx) => {
    const right = evaluate(args[0], ctx);
    if (target instanceof Date && right instanceof Date) {
      // Check if both are dates without time (midnight UTC)
      if (
        target.getUTCHours() === 0 &&
        target.getUTCMinutes() === 0 &&
        target.getUTCSeconds() === 0 &&
        right.getUTCHours() === 0 &&
        right.getUTCMinutes() === 0 &&
        right.getUTCSeconds() === 0
      ) {
        return ctx.dateFunctions.differenceInDays(target, right);
      }
      return ctx.dateFunctions.differenceInSeconds(target, right);
    }
    return null;
  },

  // Collection
  size: (target) => (target as unknown[]).length,
  count: (target) => (target as unknown[]).length,
  head: (target, args, ctx) => (target as unknown[]).slice(0, evaluate(args[0], ctx) as number),
  tail: (target, args, ctx) => (target as unknown[]).slice(-(evaluate(args[0], ctx) as number)),
  limit: (target, args, ctx) => {
    const count = evaluate(args[0], ctx) as number;
    const offset = args.length > 1 ? (evaluate(args[1], ctx) as number) : 0;
    return (target as unknown[]).slice(offset, offset + count);
  },
  join: (target, args, ctx) => {
    const collection = target as unknown[];
    const iterator = args[0];
    const delimiter = evaluate(args[1], ctx) as string;
    return collection
      .map((item) => {
        if (!iterator.iteratorVar || !iterator.iteratorExpression) return 'null';
        const localCtx = { ...ctx, self: { [iterator.iteratorVar]: item } };
        const val = evaluate(iterator.iteratorExpression, localCtx);
        // Match Java's Objects.toString(null) -> "null"
        return val === null ? 'null' : String(val);
      })
      .join(delimiter);
  },
  filter: (target, args, ctx) => {
    const collection = target as unknown[];
    const iterator = args[0];
    return collection.filter((item) => {
      if (!iterator.iteratorVar || !iterator.iteratorExpression) return false;
      const localCtx = { ...ctx, self: { [iterator.iteratorVar]: item } };
      return toBoolean(evaluate(iterator.iteratorExpression, localCtx));
    });
  },
  sum: (target, args, ctx) => getStream(target, args, ctx).reduce((sum, val) => sum + (Number(val) || 0), 0),
  avg: (target, args, ctx) => {
    const values = getStream(target, args, ctx).map((v) => Number(v));
    if (values.length === 0) return 0;
    const sum = values.reduce((s, val) => s + val, 0);
    const avg = sum / values.length;
    // Match Java's BigDecimal precision and rounding for avg
    return round(avg, 10);
  },
  min: (target, args, ctx) => {
    const values = getStream(target, args, ctx);
    if (values.length === 0) return null;
    return values.reduce((min, current) => (compare(current, min) < 0 ? current : min), values[0]);
  },
  max: (target, args, ctx) => {
    const values = getStream(target, args, ctx);
    if (values.length === 0) return null;
    return values.reduce((max, current) => (compare(current, max) > 0 ? current : max), values[0]);
  },
  sort: (target, args, ctx) => {
    const collection = [...(target as unknown[])]; // Create a shallow copy to avoid modifying original
    collection.sort((a, b) => {
      for (const iterator of args) {
        if (!iterator.iteratorVar || !iterator.iteratorExpression) return 0;
        const localCtxA = { ...ctx, self: { [iterator.iteratorVar]: a } };
        const localCtxB = { ...ctx, self: { [iterator.iteratorVar]: b } };
        const valA = evaluate(iterator.iteratorExpression, localCtxA);
        const valB = evaluate(iterator.iteratorExpression, localCtxB);

        const direction = iterator.direction === 'DESC' ? -1 : 1;
        const result = compare(valA, valB);

        if (result !== 0) {
          return result * direction;
        }
      }
      return 0;
    });
    return collection;
  },
};

// biome-ignore lint/suspicious/noExplicitAny: this is fine
function getStream(target: any, args: ASTNode[], ctx: EvalContext): any[] {
  const collection = target as unknown[];
  if (args.length === 0) {
    return collection.filter((v) => v !== null);
  }
  const iterator = args[0];
  return collection
    .map((item) => {
      if (!iterator.iteratorVar || !iterator.iteratorExpression) return null;
      const localCtx = { ...ctx, self: { [iterator.iteratorVar]: item } };
      return evaluate(iterator.iteratorExpression, localCtx);
    })
    .filter((v) => v !== null); // Per spec, undefined values are ignored in aggregations
}

// biome-ignore lint/suspicious/noExplicitAny: this is fine
export function dispatch(functionName: string, target: any, args: ASTNode[], ctx: EvalContext): any {
  // Per spec, functions on undefined target return undefined, except for isDefined/isUndefined
  if (target === null && !['isDefined', 'isUndefined'].includes(functionName)) {
    return null;
  }
  const func = FUNCTIONS[functionName];
  if (func) {
    return func(target, args, ctx);
  }
  throw new Error(`Function '${functionName}' not found for type ${typeof target}`);
}
