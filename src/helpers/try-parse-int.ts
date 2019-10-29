export function tryParseInt(str: any, defaultValue: number) {
    let retValue = defaultValue;

    if (str !== null && str !== undefined) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str, 10);
            }
        }
    }

    return retValue;
}
