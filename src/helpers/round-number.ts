export enum RoundingType {
  UP = 'UP',
  DOWN = 'DOWN',
  NEAREST = 'NEAREST',
}

export function roundNumber(
  input: number,
  roundingType: RoundingType,
  roundingValue: number
) {
  switch (roundingType) {
    case RoundingType.UP:
      return Math.ceil(input / roundingValue) * roundingValue;
    case RoundingType.DOWN:
      const str = (input / 60).toString();
      return parseInt(str, 10) * 60;
    case RoundingType.NEAREST:
      return Math.round(input / 60) * 60;
    default:
      throw new Error('roundingType not found');
  }
}
