import { DurationFormat } from '../../common/models/types/duration-format';
import { formatDuration } from '../format-duration';

describe('format should work correctly', () => {
  it('Converts duration to right format', () => {
    type TestCase = {
      durationInSeconds: number;
      format: DurationFormat;
      expectedResult: string;
    };

    const testCases: TestCase[] = [
      {
        durationInSeconds: 24 * 3600,
        format: 'HH:mm',
        expectedResult: '24:00',
      },
      {
        durationInSeconds: 8 * 3600 + 23 * 60 + 12,
        format: 'HH:mm',
        expectedResult: '08:23',
      },
      {
        durationInSeconds: 2 * 3600 + 2 * 60 + 2,
        format: 'HH:mm',
        expectedResult: '02:02',
      },
      {
        durationInSeconds: 2 * 3600 + 3 * 60 + 4,
        format: 'HH:mm:ss',
        expectedResult: '02:03:04',
      },
      {
        durationInSeconds: 763 * 3600 + 3 * 60 + 4,
        format: 'HH:mm',
        expectedResult: '763:03',
      },
      {
        durationInSeconds: 763 * 3600 + 3 * 60 + 4,
        format: 'HH:mm:ss',
        expectedResult: '763:03:04',
      },

      {
        durationInSeconds: -(24 * 3600),
        format: 'HH:mm',
        expectedResult: '-24:00',
      },
      {
        durationInSeconds: -(8 * 3600 + 23 * 60 + 12),
        format: 'HH:mm',
        expectedResult: '-08:23',
      },
      {
        durationInSeconds: -(2 * 3600 + 2 * 60 + 2),
        format: 'HH:mm',
        expectedResult: '-02:02',
      },
      {
        durationInSeconds: -(2 * 3600 + 3 * 60 + 4),
        format: 'HH:mm:ss',
        expectedResult: '-02:03:04',
      },
      {
        durationInSeconds: -(763 * 3600 + 3 * 60 + 4),
        format: 'HH:mm',
        expectedResult: '-763:03',
      },
      {
        durationInSeconds: -(763 * 3600 + 3 * 60 + 4),
        format: 'HH:mm:ss',
        expectedResult: '-763:03:04',
      },
    ];

    testCases.forEach(({ durationInSeconds, format, expectedResult }) => {
      const actualResult = formatDuration(durationInSeconds, format);
      expect(actualResult).toBe(expectedResult);
    });
  });
});
