export function dynamicSort(property: any) {
    let sortOrder = 1;

    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }

    return (a: any, b: any) => {
        if (a[property] < b[property]) {
            return -1 * sortOrder;
        }

        if (a[property] > b[property]) {
            return 1 * sortOrder;
        }

        return 0;
    };
}
