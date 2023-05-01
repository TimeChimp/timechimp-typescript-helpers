import { formatFloat } from '../format-float';

describe('Format float', () => {
  it('Renders the formatted float version of the input string', () => {
    const amount = '9:30';
    const result = formatFloat(amount, true);
    expect(result).toEqual(9.5);
  });
});
