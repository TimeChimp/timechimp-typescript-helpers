export function getInputValueByName(name: string) {
    const field = document.getElementsByName(name);
    if (field && field.length > 0) {
        return (field[0] as HTMLInputElement).value;
    }
    return null;
}

export function setInputValueByName(name: string, value: string) {
    const field = document.getElementsByName(name);
    if (field && field.length > 0) {
        const input = (field[0] as HTMLInputElement);
        input.value = value;
    }
}

export function setInputCheckedByName(name: string, checked: boolean) {
    const field = document.getElementsByName(name);
    if (field && field.length > 0) {
        const input = (field[0] as HTMLInputElement);
        input.checked = checked;
    }
}
