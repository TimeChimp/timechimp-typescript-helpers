import { formatTime } from './format-time';

describe('Time', () => {
  it('Renders the formatted version of the input seconds', () => {
    const seconds = 32874;
    const result = formatTime(seconds, 'HH:mm:ss');
    expect(result).toEqual('09:07:54');
  });

  it('Renders the formatted version of the input seconds when no format param', () => {
    const seconds = 32874;
    const result = formatTime(seconds);
    expect(result).toEqual('09:07:54');
  });
});
