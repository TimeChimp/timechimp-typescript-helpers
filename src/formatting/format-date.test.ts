import { formatDate } from './format-date';

describe('Format date', () => {
  it('Renders the formatted date version of the input string', () => {
    const amount: string = '9:30';
    const result = formatDate(amount);

    const expected  = new Date(amount);
    expect(result).toEqual(expected);
  });
});
