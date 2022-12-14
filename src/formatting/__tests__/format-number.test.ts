import { NumberFormat } from '../../common';
import { formatNumber } from '../format-number';

describe('Format number', () => {
  it('Renders the comma seperated number version of the input string', () => {
    const testString = 100;
    const result = formatNumber(testString, 2, NumberFormat.Dot);
    expect(result).toEqual('100,00');
  });

  it('Renders the dot seperated number version of the input string', () => {
    const testString = 100;
    const result = formatNumber(testString, 2, NumberFormat.Comma);
    expect(result).toEqual('100.00');
  });

  it('Renders the space seperated number version of the input string', () => {
    const testString = 1000;
    const result = formatNumber(testString, 2, NumberFormat.Space);
    expect(result).toEqual('1 000,00');
  });

  it('Renders the apostrophe seperated number version of the input string', () => {
    const testString = 1000;
    const result = formatNumber(testString, 2, NumberFormat.Apostrophe);
    expect(result).toEqual("1'000.00");
  });
});
