import { unformatCurrency } from './unformat-currency';

describe('Unformat currency', () => {
  it('Renders the unformated number version of the input currency string', () => {
    const testString = '$100,00';
    const result = unformatCurrency(testString);
    expect(result).toEqual(100);
  });
});
