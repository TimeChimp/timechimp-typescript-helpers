import { dynamicSort } from './dynamic-sort';

export function dynamicSortMultiple(props: any[]) {
  return (obj1: any, obj2: any) => {
    let i = 0;
    let result = 0;

    while (result === 0 && i < props.length) {
      result = dynamicSort(props[i])(obj1, obj2);
      i++;
    }

    return result;
  };
}
