export function roundNumber(input: number, roundingType: string, roundingValue: number) {
    switch (roundingType) {
        case 'up':
            return Math.ceil(input / roundingValue) * roundingValue;
        case 'down':
            const str = (input / 60).toString();
            return parseInt(str, 10) * 60;
        case 'nearest':
            return Math.round(input / 60) * 60;
        default:
            throw new Error('roundingType not found');
    }
}
