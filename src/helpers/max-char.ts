
export function maxChar(str: string, maxChar: number) {
    if (str && maxChar && str.length > maxChar) {
        str = str.substring(0, maxChar);
    }
    return str;
}
