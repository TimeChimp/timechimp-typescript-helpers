import { NumberFormat } from '../../common/models/types/number-format';
import { unformatCurrency } from '../unformat-currency';

describe('Unformat currency', () => {
  const COMMA_NUMBER_FORMAT = '1.234,56';
  const DOT_NUMBER_FORMAT = '1,234.56';

  const testCases: {
    input: string;
    expected: number;
    numberFormat?: NumberFormat;
  }[] = [
    {
      input: '$100,00',
      expected: 100,
      numberFormat: COMMA_NUMBER_FORMAT,
    },
    {
      input: '$ 100,00',
      expected: 100,
      numberFormat: COMMA_NUMBER_FORMAT,
    },
    {
      input: '100,00$',
      expected: 100,
      numberFormat: COMMA_NUMBER_FORMAT,
    },
    {
      input: '100,00 $',
      expected: 100,
      numberFormat: COMMA_NUMBER_FORMAT,
    },
    {
      input: '100,00',
      expected: 100,
      numberFormat: COMMA_NUMBER_FORMAT,
    },
    {
      input: '$100.00',
      expected: 100,
      numberFormat: DOT_NUMBER_FORMAT,
    },
    {
      input: '-$100.00',
      expected: -100,
      numberFormat: DOT_NUMBER_FORMAT,
    },
  ];

  testCases.forEach(({ input, expected, numberFormat }) => {
    it(`Renders the unformated number version of the input currency string: ${input}`, () => {
      const result = unformatCurrency(input, numberFormat);
      expect(result).toEqual(expected);
    });
  });
});
