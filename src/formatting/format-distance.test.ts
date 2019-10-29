import { formatDistance } from './format-distance';

describe('Distance', () => {
  it('Converts meters to miles', () => {
    const meters: number = 10000;
    const result = formatDistance(meters, 'mi', true);
    expect(result).toEqual('6.21 mi');
  });
});
