import {parseISO} from 'date-fns';
import type {ASTNode} from '~/types/ast';
import {dispatch} from './functional-dispatcher';
import {parseLocalDateAsUTC} from "./utils/datetime";

export interface EvalContext {
    self: { [key: string]: any };
}

export function evaluate(node: ASTNode, ctx: EvalContext): any {
    if (!node) return null;

    switch (node.type) {
        case 'Number':
        case 'String':
        case 'Boolean':
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
            // An identifier in an expression (e.g. in an iterator) resolves to a value in the context
            return ctx.self?.[node.name!];

        case 'Unary': {
            const operand = evaluate(node.children![0], ctx);
            if (operand === null) return null;
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
            const right = evaluate(node.children![1], ctx);

            if (node.operator === '+') {
                if (typeof left === 'string' || typeof right === 'string') {
                    if (left === null || right === null) return null;
                    return String(left) + String(right);
                }
            }
            if (!['and', 'or', 'xor', 'implies'].includes(node.operator!) && (left === null || right === null)) {
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
                    return left / right;
                case 'div':
                    return Math.trunc(left / right);
                case 'mod':
                case '%':
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
            const cond = evaluate(node.children![0], ctx);
            return toBoolean(cond) ? evaluate(node.children![1], ctx) : evaluate(node.children![2], ctx);
        }

        case 'In': {
            const left = evaluate(node.children![0], ctx);
            const right = evaluate(node.children![1], ctx);
            if (right === null) return null;
            if (!Array.isArray(right)) return false;
            if (left === null) return null;
            return right.some(item => compare(left, item) === 0);
        }

        case 'Navigation': {
            const target = evaluate(node.target!, ctx);
            if (target === null) return null;
            return target[node.name!];
        }

        case 'FunctionCall': {
            const target = evaluate(node.target!, ctx);
            return dispatch(node.name!, target, node.args!, ctx);
        }

        case 'IndexAccess': {
            const target = evaluate(node.children![0], ctx);
            if (target === null) return null;

            // This simplistic version only handles one level of indexing, e.g. list[0]
            // Chained access like matrix[0][1] would need a loop.
            const index = evaluate(node.children![1], ctx);
            if (index === null) return null;

            // Handle multi-dimensional access by evaluating subsequent indices against the intermediate results
            let current = target[index];
            if (node.children!.length > 2) {
                const remainingIndices = node.children!.slice(2);
                for(const indexNode of remainingIndices) {
                     if (current === null) return null;
                     const nextIndex = evaluate(indexNode, ctx);
                     if (nextIndex === null) return null;
                     current = current[nextIndex];
                }
            }
            return current;
        }

        default:
            throw new Error(`Unknown AST node type: ${node.type}`);
    }
}

export function compare(left: any, right: any): number {
    if (left === right) return 0;
    if (left === null) return -1;
    if (right === null) return 1;

    if (typeof left === 'string' && typeof right === 'string') {
        return left.toLowerCase().localeCompare(right.toLowerCase());
    }
    if (left instanceof Date && right instanceof Date) {
        return left.getTime() - right.getTime();
    }
    if (left > right) return 1;
    if (left < right) return -1;

    // For cases like 2 == 2.0
    if (left == right) return 0;

    return 0;
}


export function toBoolean(value: any): boolean {
    if (value === null || value === false) return false;
    if (typeof value === 'number' && value === 0) return false;
    return true;
}
