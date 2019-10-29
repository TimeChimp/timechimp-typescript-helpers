export function compareArray(array1: any[], array2: any[]) {
    const array1Clone = [ ... array1 ].sort();
    const array2Clone = [ ... array2 ].sort();

    return array1Clone.length === array2Clone.length
                && array1Clone.every((value, index) => value === array2Clone[index]);
}
