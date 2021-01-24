import { formatToSeconds } from '../format-to-seconds';

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;

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
