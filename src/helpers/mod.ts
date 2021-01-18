/**
 * Typically, when calculating module of negative number, it should become positive.
 * JavaScript's '%' operator does not support this behavior. This helper converts
 * negative number to positive, if needed.
 */
export const mod = (value: number, n: number) => {
  return ((value % n) + n) % n;
};
