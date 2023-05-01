export function roundNumber(
  input: number,
  roundingType: string,
  roundingValue: number
) {
  const str = (input / 60).toString();

  switch (roundingType) {
    case 'up':
      return Math.ceil(input / roundingValue) * roundingValue;
    case 'down':
      return parseInt(str, 10) * 60;
    case 'nearest':
      return Math.round(input / 60) * 60;
    default:
      throw new Error('roundingType not found');
  }
}
