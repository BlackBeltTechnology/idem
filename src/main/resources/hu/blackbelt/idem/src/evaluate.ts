import {parseISO, addDays, subDays} from 'date-fns';
import type {ASTNode} from '~/types/ast';
import {dispatch, round} from './functional-dispatcher';
import {parseLocalDateAsUTC} from "./utils/datetime";

export interface EvalContext {
    self: { [key: string]: any };
}

export function evaluate(node: ASTNode, ctx: EvalContext): any {
    if (!node) return null;

    switch (node.type) {
        case 'Number':
            return parseFloat(node.value as string);
        case 'String':
        case 'Boolean':
        case 'EnumLiteral':
            return node.value;
        case 'Null':
            return null;
        case 'Date':
            return parseLocalDateAsUTC(node.value as string);
        case 'Timestamp':
            return parseISO(node.value as string);
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
            return subDays(d, 1);
        }
        case 'Tomorrow': {
            const d = new Date();
            d.setUTCHours(0, 0, 0, 0);
            return addDays(d, 1);
        }

        case 'Self':
            return ctx.self;
        case 'Identifier':
            if (ctx.self && Object.prototype.hasOwnProperty.call(ctx.self, node.name!)) {
                return ctx.self[node.name!];
            }
            return null;

        case 'Unary': {
            const operand = evaluate(node.children![0], ctx);
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
            const left = evaluate(node.children![0], ctx);

            if (node.operator === 'and' && !toBoolean(left)) return false;
            if (node.operator === 'or' && toBoolean(left)) return true;
            if (node.operator === 'implies' && !toBoolean(left)) return true;

            const right = evaluate(node.children![1], ctx);

            if (node.operator === '+') {
                if (typeof left === 'string' || typeof right === 'string') {
                    if (left === null || right === null) return null;
                    return String(left) + String(right);
                }
            }

            if (node.operator === 'in') {
                if (left === null) return null; // An undefined value cannot be 'in' a list
                if (!Array.isArray(right)) return false; // 'in' is false for non-array right-hand side
                return right.some(item => compare(left, item) === 0);
            }

            // For logical operators, we handle nulls via toBoolean.
            if (!['and', 'or', 'xor', 'implies'].includes(node.operator!) && (left === null || right === null)) {
                return null;
            }

            switch (node.operator) {
                case '+': return left + right;
                case '-': return left - right;
                case '*': return left * right;
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
                case '^': return left ** right;

                case 'and': return toBoolean(left) && toBoolean(right);
                case 'or': return toBoolean(left) || toBoolean(right);
                case 'xor': return toBoolean(left) !== toBoolean(right);
                case 'implies': return !toBoolean(left) || toBoolean(right);

                case '==': case '=': return compare(left, right) === 0;
                case '!=': case '<>': return compare(left, right) !== 0;
                case '>': return compare(left, right) > 0;
                case '>=': return compare(left, right) >= 0;
                case '<': return compare(left, right) < 0;
                case '<=': return compare(left, right) <= 0;
                default:
                    throw new Error(`Unknown binary op: ${node.operator}`);
            }
        }

        case 'Ternary': {
            const cond = evaluate(node.children![0], ctx);
            // Per spec, undefined condition evaluates to false branch
            return toBoolean(cond) ? evaluate(node.children![1], ctx) : evaluate(node.children![2], ctx);
        }

        case 'Navigation': {
            const target = evaluate(node.target!, ctx);
            if (target === null || typeof target !== 'object' || target[node.name!] === undefined) {
                return null;
            }
            return target[node.name!];
        }

        case 'FunctionCall': {
            const target = evaluate(node.target!, ctx);
            return dispatch(node.name!, target, node.args!, ctx);
        }

        case 'IndexAccess': {
            const target = evaluate(node.children![0], ctx);
            if (target === null) return null;

            const index = evaluate(node.children![1], ctx);
            if (index === null) return null;

            if ((Array.isArray(target) || typeof target === 'string') && (index < 0 || index >= target.length)) {
                return null; // out of bounds
            }
            const result = target[index];
            return result === undefined ? null : result;
        }

        default:
            throw new Error(`Unknown AST node type: ${(node as any).type}`);
    }
}

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
        return (left === right) ? 0 : left ? 1 : -1;
    }
    // Coerce comparable values for equality checks
    if (left == right) return 0;

    // Fallback for incomparable types, consider them equal.
    return 0;
}

export function toBoolean(value: any): boolean {
    if (value === null || value === false) return false;
    if (typeof value === 'number' && value === 0) return false;
    if (typeof value === 'string' && value === '') return false;
    return true;
}