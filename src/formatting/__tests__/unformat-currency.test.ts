import { NumberFormat } from '../../common/models/types/number-format';
import { unformatCurrency } from '../unformat-currency';

describe('Unformat currency', () => {
  const testCases: {
    input: string;
    expected: number;
    numberFormat?: NumberFormat;
  }[] = [
    {
      input: '$100,00',
      expected: 100,
      numberFormat: NumberFormat.Dot,
    },
    {
      input: '$ 100,00',
      expected: 100,
      numberFormat: NumberFormat.Dot,
    },
    {
      input: '100,00$',
      expected: 100,
      numberFormat: NumberFormat.Dot,
    },
    {
      input: '100,00 $',
      expected: 100,
      numberFormat: NumberFormat.Dot,
    },
    {
      input: '100,00',
      expected: 100,
      numberFormat: NumberFormat.Dot,
    },
    {
      input: '$100.00',
      expected: 100,
      numberFormat: NumberFormat.Comma,
    },
    {
      input: '-$100.00',
      expected: -100,
      numberFormat: NumberFormat.Comma,
    },
  ];

  testCases.forEach(({ input, expected, numberFormat }) => {
    it(`Renders the unformated number version of the input currency string: ${input}`, () => {
      const result = unformatCurrency(input, numberFormat);
      expect(result).toEqual(expected);
    });
  });
});
