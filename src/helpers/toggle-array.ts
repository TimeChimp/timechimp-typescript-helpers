export function toggleArray(array: any, objs: any[]) {
    if (!array) {
        return [];
    }

    let arrayClone = [ ...array ];

    objs.forEach((obj) => {
        if (arrayClone.includes(obj)) {
            arrayClone = arrayClone.filter((x) => x !== obj);
        } else {
            arrayClone.push(obj);
        }
    });

    return arrayClone;
}
