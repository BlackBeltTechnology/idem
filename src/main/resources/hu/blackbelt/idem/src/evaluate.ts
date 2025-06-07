import type { ASTNode } from '~/Visitor';
import { parseLocalDate } from '~/utils/datetime';

export interface EvalContext {
  // biome-ignore lint/suspicious/noExplicitAny: This is fine
  self: Record<string, any>;
}

// biome-ignore lint/suspicious/noExplicitAny: This is fine
export function evaluate(node: ASTNode, ctx?: EvalContext): any {
  switch (node.type) {
    case 'Number':
      return node.value;

    case 'Boolean':
      return node.value;

    case 'Null':
      return null;

    case 'LocalDate':
      return parseLocalDate(node.value);

    case 'Self':
      return node.tags.features.reduce((obj: object, prop: keyof object) => {
        if (obj == null) return undefined;
        return obj[prop];
      }, ctx?.self);

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
      return evaluate(node.left, ctx) && evaluate(node.right, ctx);

    case 'Or':
      return evaluate(node.left, ctx) || evaluate(node.right, ctx);

    case 'Not':
      return !evaluate(node.expr, ctx);

    case 'UnaryMinus':
      return -evaluate(node.expr, ctx);

    case 'Eq':
      return evaluate(node.left, ctx) === evaluate(node.right, ctx);

    case 'NotEq':
      return evaluate(node.left, ctx) !== evaluate(node.right, ctx);

    case 'Gt':
      return evaluate(node.left, ctx) > evaluate(node.right, ctx);

    case 'Gte':
      return evaluate(node.left, ctx) >= evaluate(node.right, ctx);

    case 'Lt':
      return evaluate(node.left, ctx) < evaluate(node.right, ctx);

    case 'Lte':
      return evaluate(node.left, ctx) <= evaluate(node.right, ctx);

    case 'Ternary':
      return evaluate(node.cond, ctx) ? evaluate(node.then, ctx) : evaluate(node.else, ctx);

    case 'In': {
      const left = evaluate(node.left, ctx);
      const right = evaluate(node.right, ctx);
      if (Array.isArray(right)) {
        return right.includes(left);
      }
      return false;
    }

    case 'List':
      return node.elements.map((el: ASTNode) => evaluate(el, ctx));

    case 'ListAccess': {
      const arr = evaluate(node.list, ctx);
      const idxs = node.indexes.elements.map((ix: ASTNode) => evaluate(ix, ctx));
      // biome-ignore lint/suspicious/noExplicitAny: This is fine
      return idxs.reduce((a: any, i: any) => (Array.isArray(a) ? a[i] : undefined), arr);
    }

    case 'String':
      return node.value;

    case 'StringAccess': {
      const str = node.value;
      const positions = node.indexes.elements.map((ix: ASTNode) => evaluate(ix, ctx));
      return str.charAt(positions[0]);
    }

    case 'PointerAccess': {
      let base = evaluate(node.expr, ctx);
      for (const p of node.pointers.elements as ASTNode[]) {
        if (p.type === 'Tags') {
          for (const feat of p.features) {
            base = base?.[feat];
          }
        } else if (p.type === 'Indexes') {
          const ix = evaluate(p.elements[0], ctx);
          base = base?.[ix];
        }
      }
      return base;
    }

    case 'AddDatePart':
    case 'SubtractDatePart':
      throw new Error(`${node.type} not implemented in evaluator`);

    default:
      // biome-ignore lint/suspicious/noExplicitAny: This is fine
      throw new Error(`Unknown AST node type ${(node as any)?.type}`);
  }
}
