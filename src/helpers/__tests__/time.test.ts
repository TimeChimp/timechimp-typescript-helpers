import dayjs from 'dayjs';
import { formatToSeconds, calculateTime } from '../time';

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

describe('Time duration formatting', () => {
  it('should write hours with m (minutes)', () => {
    const result = formatToSeconds('30m');
    expect(result.seconds).toEqual(30 * MINUTES_IN_HOUR);
  });
  it('should write hours with h (hours)', () => {
    const result = formatToSeconds('1h');
    expect(result.seconds).toEqual(1 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR);
  });
  it('should write hours with h&m', () => {
    const result = formatToSeconds('3h10m');
    expect(result.seconds).toEqual(
      3 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR + 10 * 60
    );
  });
  it('should write hours single numbers', () => {
    const result = formatToSeconds('3');
    expect(result.seconds).toEqual(3 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR);
  });
  it('should write hours with comma', () => {
    const result = formatToSeconds('1,5');
    expect(result.seconds).toEqual(
      1 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR + 30 * 60
    );
  });
  it('should write hours with dot', () => {
    const result = formatToSeconds('1.5');
    expect(result.seconds).toEqual(
      1 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR + 30 * 60
    );
  });
  it('should write hours with semicolumn', () => {
    const result = formatToSeconds('1;5');
    expect(result.seconds).toEqual(
      1 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR + 30 * 60
    );
  });
  it('should write hours starting with a zero, containing four numbers', () => {
    const result = formatToSeconds('0300');
    expect(result.seconds).toEqual(3 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR);
  });
  it('should write hours with two numbers', () => {
    const result = formatToSeconds('12');
    expect(result.seconds).toEqual(12 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR);
  });
  it('should write hours with three numbers', () => {
    const result = formatToSeconds('120');
    expect(result.seconds).toEqual(2 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR);
  });
  it('should write hours with four numbers', () => {
    const result = formatToSeconds('1530');
    expect(result.seconds).toEqual(
      15 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR + 30 * 60
    );
  });
  it('should not write more than 24 hours', () => {
    const result = formatToSeconds('2500');
    expect(result.seconds).toEqual(24 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR);
  });
  it('should write negative hours', () => {
    const result = formatToSeconds('-08:00');
    expect(result.seconds).toEqual(-8 * SECONDS_IN_MINUTE * MINUTES_IN_HOUR);
  });
  it('should write 0 hours', () => {
    const result = formatToSeconds('0');
    expect(result.seconds).toEqual(0);
  });
  it('should not be valid', () => {
    const result = formatToSeconds('asdf');
    expect(result.isValid).toEqual(false);
  });
  it('should be valid', () => {
    const result = formatToSeconds('8');
    expect(result.isValid).toEqual(true);
  });
});

describe('Day entry formatting', () => {
  it('should calculate start/end/duration combination correctly', () => {
    const getCurrentDate = () => dayjs(new Date());
    const getDateFrom00 = (hours = 0, minutes = 0) =>
      getCurrentDate()
        .startOf('day')
        .add(hours, 'hour')
        .add(minutes, 'minute');

    const testConditions = [
      {
        input: { start: '12', end: undefined, duration: undefined },
        expected: { start: getDateFrom00(12), end: null, duration: null },
      },
      {
        input: { start: undefined, end: '17', duration: undefined },
        expected: { start: null, end: getDateFrom00(17), duration: null },
      },
      {
        input: { start: undefined, end: undefined, duration: '5' },
        expected: { start: null, end: null, duration: 5 * SECONDS_IN_HOUR },
      },
      {
        input: { start: '12:30', end: '17:00', duration: undefined },
        expected: {
          start: getDateFrom00(12, 30),
          end: getDateFrom00(17),
          duration: 4.5 * SECONDS_IN_HOUR,
        },
      },
      {
        input: { start: '17:00', end: '12:00', duration: undefined },
        expected: {
          start: getDateFrom00(17),
          end: getDateFrom00(24 + 12),
          duration: 19 * SECONDS_IN_HOUR,
        },
      },
      {
        input: { start: '12:00', end: undefined, duration: '5' },
        expected: {
          start: getDateFrom00(12),
          end: getDateFrom00(17),
          duration: 5 * SECONDS_IN_HOUR,
        },
      },
      {
        input: { start: undefined, end: '17:00', duration: '5' },
        expected: {
          start: getDateFrom00(12),
          end: getDateFrom00(17),
          duration: 5 * SECONDS_IN_HOUR,
        },
      },
      {
        input: { start: '03:00', end: '03:01', duration: undefined },
        expected: {
          start: getDateFrom00(3),
          end: getDateFrom00(3, 1),
          duration: 1 * SECONDS_IN_MINUTE,
        },
      },
      {
        input: { start: '03:00', end: '03:10', duration: undefined },
        expected: {
          start: getDateFrom00(3),
          end: getDateFrom00(3, 10),
          duration: 10 * SECONDS_IN_MINUTE,
        },
      },
    ];

    testConditions.forEach(({ input, expected }, index) => {
      const actual = calculateTime(
        getCurrentDate().toDate(),
        input.start,
        input.end,
        input.duration
      );

      expect(actual.start?.toUTCString()).toEqual(
        expected.start?.toDate().toUTCString()
      );
      expect(actual.end?.toUTCString()).toEqual(
        expected.end?.toDate().toUTCString()
      );
      expect(actual.duration).toBe(expected.duration);
    });
  });
});
