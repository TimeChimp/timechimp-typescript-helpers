interface Array<T> {
    sum<T>(this: T[], selector: (x: T) => number): number;
}

function sum<T>(this: T[], selector: (x: T) => number) {
    return this.reduce((pre, cur) => pre + selector(cur), 0);
}

Array.prototype.sum = sum;
