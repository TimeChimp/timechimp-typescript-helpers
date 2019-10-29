export function sortCaseInsensitive(arr: any, prop: string) {
    return arr.sort((a: any, b: any) => {
        if (a[prop] && b[prop]) {
            const nameA = a[prop].toUpperCase();
            const nameB = b[prop].toUpperCase();

            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }
        }

        return 0;
    });
}
