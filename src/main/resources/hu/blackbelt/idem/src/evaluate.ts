import { add, compareAsc, sub } from 'date-fns';
import type { ASTNode } from '~/Visitor';
import { dispatch, handleDatePartArithmetic } from '~/functional-dispatcher';

export interface EvalContext {
  [key: string]: any;
}

const getFeatureValue = (ctx: EvalContext, features: string[]) =>
  features.reduce((obj, prop) => obj?.[prop], ctx?.self);

export function evaluate(node: ASTNode, ctx?: EvalContext): any {
  switch (node.type) {
    // --- Literals & Keywords ---
    case 'Number':
    case 'String':
    case 'Boolean':
    case 'Null':
      return node.value;
    case 'LocalDate':
    case 'Timestamp':
    case 'Time':
      return new Date(node.value);
    case 'Today':
      return new Date(new Date().setHours(0, 0, 0, 0));
    case 'Yesterday':
      return sub(new Date(new Date().setHours(0, 0, 0, 0)), { days: 1 });
    case 'Tomorrow':
      return add(new Date(new Date().setHours(0, 0, 0, 0)), { days: 1 });

    // --- Core Expressions ---
    case 'Self':
      return getFeatureValue(ctx as EvalContext, node.tags.features);
    case 'List':
      return node.elements.map((el: ASTNode) => evaluate(el, ctx));
    case 'PostfixFunctionCall': {
      const base = evaluate(node.expr, ctx);
      const args = node.args.map((arg: ASTNode) => evaluate(arg, ctx));
      return dispatch(base, node.functionName, args);
    }
    case 'AddDatePart':
      return handleDatePartArithmetic(evaluate(node.left, ctx), node.datePart, 1);
    case 'SubtractDatePart':
      return handleDatePartArithmetic(evaluate(node.left, ctx), node.datePart, -1);

    // --- Operators ---
    case 'Add':
      return evaluate(node.left, ctx) + evaluate(node.right, ctx);
    case 'Subtract':
      return evaluate(node.left, ctx) - evaluate(node.right, ctx);
    case 'Multiply':
      return evaluate(node.left, ctx) * evaluate(node.right, ctx);
    case 'Divide':
      return evaluate(node.left, ctx) / evaluate(node.right, ctx);
    case 'Modulus':
      return evaluate(node.left, ctx) % evaluate(node.right, ctx);
    case 'Power':
      return evaluate(node.left, ctx) ** evaluate(node.right, ctx);
    case 'And':
      return !!evaluate(node.left, ctx) && evaluate(node.right, ctx);
    case 'Or':
      return !!evaluate(node.left, ctx) || evaluate(node.right, ctx);
    case 'Xor':
      return !!evaluate(node.left, ctx) !== !!evaluate(node.right, ctx);
    case 'Not':
      return !evaluate(node.expr, ctx);
    case 'UnaryMinus':
      return -evaluate(node.expr, ctx);
    case 'Ternary':
      return evaluate(node.cond, ctx) ? evaluate(node.then, ctx) : evaluate(node.else, ctx);
    case 'Implies':
      return !evaluate(node.left, ctx) || !!evaluate(node.right, ctx);
    case 'In': {
      const left = evaluate(node.left, ctx);
      const right = evaluate(node.right, ctx);
      if (!Array.isArray(right)) return false;
      return right.includes(left);
    }
    case 'Eq': {
      const left = evaluate(node.left, ctx);
      const right = evaluate(node.right, ctx);
      if (left instanceof Date && right instanceof Date) return compareAsc(left, right) === 0;
      return left === right;
    }
    case 'NotEq': {
      const left = evaluate(node.left, ctx);
      const right = evaluate(node.right, ctx);
      if (left instanceof Date && right instanceof Date) return compareAsc(left, right) !== 0;
      return left !== right;
    }
    case 'Gt': {
      const left = evaluate(node.left, ctx);
      const right = evaluate(node.right, ctx);
      if (left instanceof Date && right instanceof Date) return compareAsc(left, right) > 0;
      return left > right;
    }
    case 'Gte': {
      const left = evaluate(node.left, ctx);
      const right = evaluate(node.right, ctx);
      if (left instanceof Date && right instanceof Date) return compareAsc(left, right) >= 0;
      return left >= right;
    }
    case 'Lt': {
      const left = evaluate(node.left, ctx);
      const right = evaluate(node.right, ctx);
      if (left instanceof Date && right instanceof Date) return compareAsc(left, right) < 0;
      return left < right;
    }
    case 'Lte': {
      const left = evaluate(node.left, ctx);
      const right = evaluate(node.right, ctx);
      if (left instanceof Date && right instanceof Date) return compareAsc(left, right) <= 0;
      return left <= right;
    }

    // --- Accessors ---
    case 'IndexAccess': {
      let current = evaluate(node.expr, ctx);
      const idxs = node.indexes.elements.map((ix: ASTNode) => evaluate(ix, ctx));
      for (const i of idxs) {
        if (current === null || current === undefined) return undefined;
        current = current[i];
      }
      return current;
    }
    case 'PointerAccess': {
      let base = evaluate(node.expr, ctx);
      for (const p of node.pointers.elements) {
        if (!base) return undefined;
        if (p.type === 'Tags') {
          for (const feat of p.features) {
            base = base?.[feat];
          }
        } else if (p.type === 'Index') {
          const ix = evaluate(p.indexes.elements[0], ctx);
          base = base?.[ix];
        }
      }
      return base;
    }

    default:
      throw new Error(`Unknown AST node type: ${node.type}`);
  }
}
