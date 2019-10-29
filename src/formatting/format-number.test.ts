import { formatNumber } from './format-number';

describe('Format number', () => {
  it('Renders the formatted number version of the input string', () => {
    const testString = 100;
    const result = formatNumber(testString);
    expect(result).toEqual('100');
  });
});
