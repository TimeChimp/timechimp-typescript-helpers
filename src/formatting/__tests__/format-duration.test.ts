import { DurationFormat } from '../../common';
import { formatDuration } from '../format-duration';

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

describe('format should work correctly', () => {
  it('should format 0 seconds to 00:00', () => {
    expect(formatDuration(0)).toBe('00:00');
  });

  it('should format positive durations with hours, minutes, and seconds', () => {
    expect(formatDuration(3661, 'HH:mm:ss')).toBe('01:01:01');
    expect(formatDuration(3600, 'HH:mm:ss')).toBe('01:00:00');
    expect(formatDuration(61, 'HH:mm:ss')).toBe('00:01:01');
    expect(formatDuration(60, 'HH:mm:ss')).toBe('00:01:00');
    expect(formatDuration(1, 'HH:mm:ss')).toBe('00:00:01');
    expect(formatDuration(3601, 'HH:mm:ss')).toBe('01:00:01');
    expect(formatDuration(3660, 'HH:mm:ss')).toBe('01:01:00');
  });

  it('should format positive durations with hours and minutes', () => {
    expect(formatDuration(3661, 'HH:mm')).toBe('01:01');
    expect(formatDuration(3600, 'HH:mm')).toBe('01:00');
    expect(formatDuration(61, 'HH:mm')).toBe('00:01');
    expect(formatDuration(60, 'HH:mm')).toBe('00:01');
    expect(formatDuration(1, 'HH:mm')).toBe('00:00');
    expect(formatDuration(3601, 'HH:mm')).toBe('01:00');
    expect(formatDuration(3660, 'HH:mm')).toBe('01:01');
  });

  it('should format negative durations with a minus sign', () => {
    expect(formatDuration(-3661, 'HH:mm:ss')).toBe('-01:01:01');
    expect(formatDuration(-3661, 'HH:mm')).toBe('-01:01');
    expect(formatDuration(-3600, 'HH:mm:ss')).toBe('-01:00:00');
    expect(formatDuration(-61, 'HH:mm:ss')).toBe('-00:01:01');
    expect(formatDuration(-60, 'HH:mm:ss')).toBe('-00:01:00');
    expect(formatDuration(-1, 'HH:mm:ss')).toBe('-00:00:01');
    expect(formatDuration(-3601, 'HH:mm:ss')).toBe('-01:00:01');
    expect(formatDuration(-3660, 'HH:mm:ss')).toBe('-01:01:00');
  });

  it('should return "00:00" if seconds is not a number', () => {
    // @ts-expect-error - testing invalid input
    expect(formatDuration(undefined)).toBe('00:00');
    // @ts-expect-error - testing invalid input
    expect(formatDuration(null)).toBe('00:00');
    // @ts-expect-error - testing invalid input
    expect(formatDuration('')).toBe('00:00');
    expect(formatDuration(NaN)).toBe('00:00');
    expect(formatDuration({} as any)).toBe('00:00');
  });

  it('Converts duration to right format', () => {
    type TestCase = {
      durationInSeconds: number;
      format: DurationFormat;
      expectedResult: string;
    };

    const testCases: TestCase[] = [
      {
        durationInSeconds: 24 * SECONDS_IN_HOUR,
        format: 'HH:mm',
        expectedResult: '24:00',
      },
      {
        durationInSeconds: 8 * SECONDS_IN_HOUR + 23 * SECONDS_IN_MINUTE + 12,
        format: 'HH:mm',
        expectedResult: '08:23',
      },
      {
        durationInSeconds: 2 * SECONDS_IN_HOUR + 2 * SECONDS_IN_MINUTE + 2,
        format: 'HH:mm',
        expectedResult: '02:02',
      },
      {
        durationInSeconds: 2 * SECONDS_IN_HOUR + 3 * SECONDS_IN_MINUTE + 4,
        format: 'HH:mm:ss',
        expectedResult: '02:03:04',
      },
      {
        durationInSeconds: 763 * SECONDS_IN_HOUR + 3 * SECONDS_IN_MINUTE + 4,
        format: 'HH:mm',
        expectedResult: '763:03',
      },
      {
        durationInSeconds: 763 * SECONDS_IN_HOUR + 3 * SECONDS_IN_MINUTE + 4,
        format: 'HH:mm:ss',
        expectedResult: '763:03:04',
      },

      {
        durationInSeconds: -(24 * SECONDS_IN_HOUR),
        format: 'HH:mm',
        expectedResult: '-24:00',
      },
      {
        durationInSeconds: -(8 * SECONDS_IN_HOUR + 23 * SECONDS_IN_MINUTE + 12),
        format: 'HH:mm',
        expectedResult: '-08:23',
      },
      {
        durationInSeconds: -(2 * SECONDS_IN_HOUR + 2 * SECONDS_IN_MINUTE + 2),
        format: 'HH:mm',
        expectedResult: '-02:02',
      },
      {
        durationInSeconds: -(2 * SECONDS_IN_HOUR + 3 * SECONDS_IN_MINUTE + 4),
        format: 'HH:mm:ss',
        expectedResult: '-02:03:04',
      },
      {
        durationInSeconds: -(763 * SECONDS_IN_HOUR + 3 * SECONDS_IN_MINUTE + 4),
        format: 'HH:mm',
        expectedResult: '-763:03',
      },
      {
        durationInSeconds: -(763 * SECONDS_IN_HOUR + 3 * SECONDS_IN_MINUTE + 4),
        format: 'HH:mm:ss',
        expectedResult: '-763:03:04',
      },
      {
        durationInSeconds: 0,
        format: 'HH:mm:ss',
        expectedResult: '00:00:00',
      },
      {
        durationInSeconds: 34,
        format: 'HH:mm:ss',
        expectedResult: '00:00:34',
      },
      {
        durationInSeconds: 270,
        format: 'HH:mm:ss',
        expectedResult: '00:04:30',
      },
    ];

    testCases.forEach(({ durationInSeconds, format, expectedResult }) => {
      const actualResult = formatDuration(durationInSeconds, format);
      expect(actualResult).toBe(expectedResult);
    });
  });
});
