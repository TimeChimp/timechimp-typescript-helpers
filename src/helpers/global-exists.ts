export function globalVarExists(nameOfVariable: string) {
    return nameOfVariable in window;
}
