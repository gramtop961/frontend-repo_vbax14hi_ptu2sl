const ALLOWED = /[^0-9+\-*/%().\s]/; // any disallowed char

export function isSafeExpression(expr) {
  // reject if any non-allowed tokens present
  return !ALLOWED.test(expr);
}

export function evalSafe(expr) {
  if (!isSafeExpression(expr)) throw new Error('Unsafe expression. Allowed: numbers and + - * / % ( )');
  // eslint-disable-next-line no-new-func
  const fn = new Function(`return (${expr})`);
  const res = fn();
  if (typeof res !== 'number' || !isFinite(res)) throw new Error('Invalid math expression');
  return res;
}
