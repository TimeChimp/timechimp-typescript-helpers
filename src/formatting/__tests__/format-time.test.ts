import {
  formatHoursAsHrsMinsSecs,
  formatMillisAsHrsMinsSecs,
} from '../format-time';

describe('Format time', () => {
  it('converts hours to HH:mm', () => {
    const inputs = [
      { input: 12, expectedResult: '12:00' },
      { input: 12.5, expectedResult: '12:30' },
      { input: 40, expectedResult: '40:00' },
      { input: 44.5, expectedResult: '44:30' },
      { input: 0.8333333333333333, expectedResult: '00:50' },
    ];

    inputs.forEach(({ input, expectedResult }) =>
      expect(formatHoursAsHrsMinsSecs(input)).toEqual(expectedResult)
    );
  });

  it('converts hours to HH:mm:ss', () => {
    const inputs = [
      { input: 12, expectedResult: '12:00:00' },
      { input: 12.5, expectedResult: '12:30:00' },
      { input: 40, expectedResult: '40:00:00' },
      { input: 44.5, expectedResult: '44:30:00' },
      { input: 0.8333333333333333, expectedResult: '00:49:59' },
    ];

    inputs.forEach(({ input, expectedResult }) =>
      expect(formatHoursAsHrsMinsSecs(input, true)).toEqual(expectedResult)
    );
  });

  it('converts milliseconds to HH:mm:ss', () => {
    const inputs = [
      { input: 43200000, expectedResult: '12:00:00' },
      { input: 45000000, expectedResult: '12:30:00' },
      { input: 144000000, expectedResult: '40:00:00' },
      { input: 160200000, expectedResult: '44:30:00' },
    ];

    inputs.forEach(({ input, expectedResult }) =>
      expect(formatMillisAsHrsMinsSecs(input, true)).toEqual(expectedResult)
    );
  });
});
