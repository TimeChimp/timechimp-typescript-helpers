import { dynamicSortMultiple } from './dynamic-sort-multiple';

export function sortBy<T>(list: T[], props: string[]): T[] {
  const orderList = new Array<T>().concat(list);
  return orderList.sort(dynamicSortMultiple(props));
}
