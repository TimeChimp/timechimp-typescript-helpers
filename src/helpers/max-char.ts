
export function maxChar(str, maxChar) {
    if (str && maxChar && str.length > maxChar) {
        str = str.substring(0, maxChar);
    }
    return str;
}
