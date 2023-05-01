import { NumberFormat } from '../../../common';
import { formatDuration } from '../../../formatting/format-duration';
import { TimeParser } from '../time-parser';

describe('TimeEntryDurationField', () => {
  it('invalid time entry inputs should be invalid', () => {
    const invalidInputs = [
      '01:0§0',
      '2500',
      '12:60',
      '24:01',
      '2h94m',
      '8h7',
      '--2h',
      '12:34:',
      '01:010',
    ];

    invalidInputs.forEach((input) => {
      expect(new TimeParser(input).parse().isValid).toBe(false);
    });
  });

  it('valid time entry inputs should be valid', () => {
    const validInputs = [
      { input: '0.', expectedResult: '00:00' },
      { input: '12m', expectedResult: '00:12' },
      { input: '123m', expectedResult: '02:03' },
      { input: '1h', expectedResult: '01:00' },
      { input: '12h', expectedResult: '12:00' },
      { input: '1h1m', expectedResult: '01:01' },
      { input: '1h12m', expectedResult: '01:12' },
      { input: '12h12m', expectedResult: '12:12' },
      { input: '1', expectedResult: '01:00' },
      { input: '0.5', expectedResult: '00:30' },
      { input: '0,5', expectedResult: '00:30' },
      { input: '0;5', expectedResult: '00:30' },
      { input: '12', expectedResult: '12:00' },
      { input: '123', expectedResult: '01:23' },
      { input: '1234', expectedResult: '12:34' },
      { input: '2:00', expectedResult: '02:00' },
      { input: '03', expectedResult: '00:03' },
      { input: '003', expectedResult: '00:03' },
      { input: '022', expectedResult: '00:22' },
      { input: '2400', expectedResult: '24:00' },
      { input: '0.3', expectedResult: '00:18' },
      { input: '0,3', expectedResult: '00:18' },
      { input: '0;3', expectedResult: '00:18' },

      { input: '-12m', expectedResult: '-00:12' },
      { input: '-123m', expectedResult: '-02:03' },
      { input: '-1h', expectedResult: '-01:00' },
      { input: '-12h', expectedResult: '-12:00' },
      { input: '-1h1m', expectedResult: '-01:01' },
      { input: '-1h12m', expectedResult: '-01:12' },
      { input: '-12h12m', expectedResult: '-12:12' },
      { input: '-1', expectedResult: '-01:00' },
      { input: '-1,1', expectedResult: '-01:06' },
      { input: '-1.1', expectedResult: '-01:06' },
      { input: '-1;1', expectedResult: '-01:06' },
      { input: '-12', expectedResult: '-12:00' },
      { input: '-123', expectedResult: '-01:23' },
      { input: '-1234', expectedResult: '-12:34' },
      { input: '-03', expectedResult: '-00:03' },
      { input: '-003', expectedResult: '-00:03' },
      { input: '-022', expectedResult: '-00:22' },
      { input: '-2400', expectedResult: '-24:00' },

      { input: '1:00am', expectedResult: '01:00' },
      { input: '11:00am', expectedResult: '11:00' },
      { input: '1:00pm', expectedResult: '13:00' },
      { input: '11:00pm', expectedResult: '23:00' },
    ];

    validInputs.forEach(({ input, expectedResult }) => {
      expect(
        formatDuration(
          new TimeParser(input).parse().seconds!,
          'HH:mm',
          NumberFormat.Comma
        )
      ).toBe(expectedResult);
      expect(new TimeParser(input).parse().isValid).toBe(true);
    });
  });
});
