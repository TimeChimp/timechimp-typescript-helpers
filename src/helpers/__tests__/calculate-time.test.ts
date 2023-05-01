import { calculateTime } from '../calculate-time';
import { TcDate } from '../../common/utils/date';

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

describe('Day entry formatting', () => {
  it('should calculate start/end/duration combination correctly', () => {
    const getDateFrom00 = (hours = 0, minutes = 0) =>
      new TcDate().startOf('day').add(hours, 'hour').add(minutes, 'minute');

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

    testConditions.forEach(({ input, expected }) => {
      const actual = calculateTime(
        new Date(),
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
