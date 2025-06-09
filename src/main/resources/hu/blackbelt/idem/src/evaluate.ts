import { addDays, addMonths, addWeeks, addYears, differenceInDays, differenceInSeconds, parseISO, subDays } from 'date-fns';
import type { ASTNode } from '~/types/ast';
import { dispatch } from './functional-dispatcher';

export interface EvalContext {
  self: { [key: string]: any };
}

export function evaluate(node: ASTNode, ctx: EvalContext): any {
  if (!node) return undefined;

  switch (node.type) {
    case 'Number':
    case 'String':
    case 'Boolean':
      return node.value;
    case 'Null':
      return null;
    case 'Date': return parseISO(node.value as string);
    case 'Timestamp': return parseISO(node.value as string);
    case 'Time': {
        const [h, m, s] = (node.value as string).split(':');
        const d = new Date(0);
        d.setHours(Number(h), Number(m), Number(s || 0));
        return d;
    }
    case 'Today': { const d = new Date(); d.setHours(0,0,0,0); return d; }
    case 'Yesterday': return subDays(new Date(new Date().setHours(0,0,0,0)), 1);
    case 'Tomorrow': return addDays(new Date(new Date().setHours(0,0,0,0)), 1);

    case 'Self':
      return ctx.self;
    case 'Identifier':
      return ctx.self?.[node.name!];

    case 'Unary': {
      const operand = evaluate(node.children![0], ctx);
      if (operand === null || operand === undefined) return undefined;
      switch (node.operator) {
        case '-': return -operand;
        case 'not': return !operand;
        default: throw new Error(`Unknown unary op: ${node.operator}`);
      }
    }

    case 'Binary': {
        const left = evaluate(node.children![0], ctx);
        const right = evaluate(node.children![1], ctx);

        if (!['and', 'or', 'xor', 'implies'].includes(node.operator!) && (left === null || right === null || left === undefined || right === undefined)) {
            return undefined;
        }

        switch(node.operator) {
            case '+':
                if (typeof left === 'string' || typeof right === 'string') return String(left ?? '') + String(right ?? '');
                return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/': return left / right;
            case 'div': return Math.trunc(left / right);
            case 'mod':
            case '%': return Math.trunc(left) % Math.trunc(right);
            case '^': return left ** right;

            case 'and': return !!left && !!right;
            case 'or': return !!left || !!right;
            case 'xor': return !!left !== !!right;
            case 'implies': return !left || !!right;

            case '==': case '=': return compare(left, right) === 0;
            case '!=': case '<>': return compare(left, right) !== 0;
            case '>': return compare(left, right) > 0;
            case '>=': return compare(left, right) >= 0;
            case '<': return compare(left, right) < 0;
            case '<=': return compare(left, right) <= 0;
            default: throw new Error(`Unknown binary op: ${node.operator}`);
        }
    }

    case 'Ternary': {
        const cond = evaluate(node.children![0], ctx);
        return cond ? evaluate(node.children![1], ctx) : evaluate(node.children![2], ctx);
    }

    case 'In': {
        const left = evaluate(node.children![0], ctx);
        const right = evaluate(node.children![1], ctx);
        if (left === null || left === undefined || !Array.isArray(right)) return false;
        return right.some(item => compare(left, item) === 0);
    }

    case 'Navigation': {
        const target = evaluate(node.target!, ctx);
        return target?.[node.name!];
    }

    case 'FunctionCall': {
        const target = evaluate(node.target!, ctx);
        return dispatch(node.name!, target, node.args!, ctx);
    }

    case 'IndexAccess': {
        const target = evaluate(node.children![0], ctx);
        let current = target;
        for (let i = 1; i < node.children!.length; i++) {
            const index = evaluate(node.children![i], ctx);
            if (current === null || current === undefined || index === null || index === undefined) return undefined;
            current = current[index];
        }
        return current;
    }

    default:
      throw new Error(`Unknown AST node type: ${node.type}`);
  }
}

function compare(left: any, right: any): number {
    if (left === right) return 0;
    if (left === null || left === undefined) return -1;
    if (right === null || right === undefined) return 1;

    if (typeof left === 'string' && typeof right === 'string') {
        return left.toLowerCase().localeCompare(right.toLowerCase());
    }
    if (left > right) return 1;
    if (left < right) return -1;
    return 0;
}
