export function hasSubArray(master: any[], sub: any[]) {
  return sub.every(val => master.includes(val));
}
