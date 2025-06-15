import type { ASTNode } from '~/types/ast';
import { dispatch } from './functional-dispatcher';
import { expressionToAst } from './parse';
import { parseLocalDateAsUTC } from './utils/datetime';

export interface Self {
  // biome-ignore lint/suspicious/noExplicitAny: this is fine
  [key: string]: any;
}

export interface DateFunctions {
  addDays: (date: Date | number, amount: number) => Date;
  subDays: (date: Date | number, amount: number) => Date;
  parseISO: (argument: string) => Date;
  differenceInDays: (dateLeft: Date | number, dateRight: Date | number) => number;
  differenceInSeconds: (dateLeft: Date | number, dateRight: Date | number) => number;
}

export interface EvalContext {
  self: Self;
  dateFunctions: DateFunctions;
}

export type EvalExpr = <T = unknown>(expr: string, ctx?: Pick<EvalContext, 'self'>) => T | undefined;

// biome-ignore lint/suspicious/noExplicitAny: this is fine
const astCache = new Map<string, any>();

function getCached<T>(key: string, expression: () => T): T {
  if (astCache.has(key)) {
    return astCache.get(key);
  }

  const result = expression();

  astCache.set(key, result);

  return result;
}

/**
 * Creates a customized evaluation function with specific helper implementations.
 * This allows for dependency injection of helper functions, making the expression
 * evaluation more flexible and testable.
 *
 * @param other An object with full implementation of helper functions.
 * @returns A new evalExpr-like function that uses the provided helper functions.
 */
export function createEvalExpr(other: Omit<EvalContext, 'self'>): EvalExpr {
  return <T = unknown>(expr: string, ctx: { self: Self } = { self: {} }): T | undefined => {
    const evalContext: EvalContext = { ...ctx, ...other };
    return evalExpr(expr, evalContext) as T | undefined;
  };
}

function evalExpr(expr: string, ctx: EvalContext): unknown {
  try {
    const astNode = getCached<ASTNode>(expr, () => expressionToAst(expr));
    return evaluate(astNode, ctx);
  } catch (error) {
    console.error(`Failed to evaluate idem expression: "${expr}"`, '\nContext:', ctx, '\nError:', error);
    return undefined;
  }
}

export function evaluate(node: ASTNode, ctx: EvalContext): unknown {
  if (!node) return null;

  switch (node.type) {
    case 'Number':
      return Number.parseFloat(node.value as string);
    case 'String':
    case 'Boolean':
    case 'EnumLiteral':
      return node.value;
    case 'Null':
      return null;
    case 'Date':
      return parseLocalDateAsUTC(node.value as string);
    case 'Timestamp':
      return ctx.dateFunctions.parseISO(node.value as string);
    case 'Time': {
      const [h, m, s] = (node.value as string).split(':');
      const d = new Date(0);
      d.setUTCHours(Number(h), Number(m), Number(s || 0));
      return d;
    }
    case 'Today': {
      const d = new Date();
      d.setUTCHours(0, 0, 0, 0);
      return d;
    }
    case 'Yesterday': {
      const d = new Date();
      d.setUTCHours(0, 0, 0, 0);
      return ctx.dateFunctions.subDays(d, 1);
    }
    case 'Tomorrow': {
      const d = new Date();
      d.setUTCHours(0, 0, 0, 0);
      return ctx.dateFunctions.addDays(d, 1);
    }

    case 'Self':
      return ctx.self;
    case 'Identifier':
      if (ctx.self && node.name && Object.prototype.hasOwnProperty.call(ctx.self, node.name)) {
        return ctx.self[node.name];
      }
      return null;

    case 'Unary': {
      if (!node.children) return null;
      const operand = evaluate(node.children[0], ctx) as number;
      if (operand === null && node.operator !== 'not') return null;
      switch (node.operator) {
        case '-':
          return -operand;
        case 'not':
          return !toBoolean(operand);
        default:
          throw new Error(`Unknown unary op: ${node.operator}`);
      }
    }

    case 'Binary': {
      if (!node.children) return null;
      const left = evaluate(node.children[0], ctx) as number;

      if (node.operator === 'and' && !toBoolean(left)) return false;
      if (node.operator === 'or' && toBoolean(left)) return true;
      if (node.operator === 'implies' && !toBoolean(left)) return true;

      const right = evaluate(node.children[1], ctx) as number;

      if (node.operator === '+') {
        if (typeof left === 'string' || typeof right === 'string') {
          if (left === null || right === null) return null;
          return String(left) + String(right);
        }
      }

      if (node.operator === 'in') {
        if (left === null) return null; // An undefined value cannot be 'in' a list
        if (!Array.isArray(right)) return false; // 'in' is false for non-array right-hand side
        return right.some((item) => compare(left, item) === 0);
      }

      if (!node.operator) return null;

      // For logical operators, we handle nulls via toBoolean.
      if (!['and', 'or', 'xor', 'implies'].includes(node.operator) && (left === null || right === null)) {
        return null;
      }

      switch (node.operator) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          if (right === 0) return null;
          return left / right;
        case 'div':
          if (right === 0) return null;
          return Math.trunc(left / right);
        case 'mod':
        case '%': // Added missing case for '%' operator
          if (right === 0) return null;
          return Math.trunc(left) % Math.trunc(right);
        case '^':
          return left ** right;

        case 'and':
          return toBoolean(left) && toBoolean(right);
        case 'or':
          return toBoolean(left) || toBoolean(right);
        case 'xor':
          return toBoolean(left) !== toBoolean(right);
        case 'implies':
          return !toBoolean(left) || toBoolean(right);

        case '==':
        case '=':
          return compare(left, right) === 0;
        case '!=':
        case '<>':
          return compare(left, right) !== 0;
        case '>':
          return compare(left, right) > 0;
        case '>=':
          return compare(left, right) >= 0;
        case '<':
          return compare(left, right) < 0;
        case '<=':
          return compare(left, right) <= 0;
        default:
          throw new Error(`Unknown binary op: ${node.operator}`);
      }
    }

    case 'Ternary': {
      if (!node.children) return null;
      const cond = evaluate(node.children[0], ctx);
      // Per spec, undefined condition evaluates to false branch
      return toBoolean(cond) ? evaluate(node.children[1], ctx) : evaluate(node.children[2], ctx);
    }

    case 'Navigation': {
      if (!node.target || !node.name) return null;
      const target = evaluate(node.target, ctx) as Record<string, unknown> | null;
      if (target === null || typeof target !== 'object' || target[node.name] === undefined) {
        return null;
      }
      return target[node.name];
    }

    case 'FunctionCall': {
      if (!node.target || !node.name) return null;
      const target = evaluate(node.target, ctx);
      return dispatch(node.name, target, node.args ?? [], ctx);
    }

    case 'IndexAccess': {
      if (!node.children) return null;
      const target = evaluate(node.children[0], ctx) as
        | Array<unknown>
        | string
        | Record<string | number, unknown>
        | null;
      if (target === null) return null;

      const index = evaluate(node.children[1], ctx) as number;
      if (index === null) return null;

      if ((Array.isArray(target) || typeof target === 'string') && (index < 0 || index >= target.length)) {
        return null; // out of bounds
      }
      const result = target?.[index];
      return result === undefined ? null : result;
    }

    default:
      // biome-ignore lint/suspicious/noExplicitAny: this is fine
      throw new Error(`Unknown AST node type: ${(node as any).type}`);
  }
}

// biome-ignore lint/suspicious/noExplicitAny: this is fine
export function compare(left: any, right: any): number {
  if (Object.is(left, right)) return 0;
  if (left === null) return -1;
  if (right === null) return 1;

  if (typeof left === 'string' && typeof right === 'string') {
    return left.toLowerCase().localeCompare(right.toLowerCase());
  }
  if (left instanceof Date && right instanceof Date) {
    const diff = left.getTime() - right.getTime();
    return diff === 0 ? 0 : diff > 0 ? 1 : -1;
  }
  if (typeof left === 'number' && typeof right === 'number') {
    const diff = left - right;
    return diff === 0 ? 0 : diff > 0 ? 1 : -1;
  }
  // For boolean comparison, true is greater than false
  if (typeof left === 'boolean' && typeof right === 'boolean') {
    return left === right ? 0 : left ? 1 : -1;
  }
  // Coerce comparable values for equality checks
  // biome-ignore lint/suspicious/noDoubleEquals: this is intentional
  if (left == right) return 0;

  // Fallback for incomparable types, consider them equal.
  return 0;
}

export function toBoolean(value: unknown): boolean {
  if (value === null || value === false) return false;
  if (typeof value === 'number' && value === 0) return false;
  if (typeof value === 'string' && value === '') return false;
  return true;
}
