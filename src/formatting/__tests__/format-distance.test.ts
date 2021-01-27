import { formatDistance } from '../format-distance';

describe('Distance', () => {
  it('Converts meters to miles', () => {
    const meters: number = 10000;
    const result = formatDistance(meters, 'mi', true);
    expect(result).toEqual('6.21 mi');
  });

  it('Converts meters to miles and returns no symbol', () => {
    const meters: number = 10000;
    const result = formatDistance(meters, 'mi', false);
    expect(result).toEqual('6.21');
  });
});
