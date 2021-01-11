import accounting from 'accounting';

import { getCurrencies } from '../common/constants/settings';
import { CurrencyObject } from '../common/models/interfaces/currency-object';
import { NumberFormat } from '../common/models/types/number-format';

export function formatCurrency(
  input: number,
  currency: string = 'EUR',
  numberFormat: NumberFormat = 'comma'
): string {
  const currencies = getCurrencies();

  const currencyObject = currencies.find(x => x.id === currency);
  if (!currencyObject) {
    throw new Error('Currency not found');
  }
  const { symbol, fractionSize }: CurrencyObject = currencyObject;

  let result;
  if (symbol) {
    const { grapheme, template } = symbol;
    const format = template.replace('$', '%s').replace('1', '%v');
    result = { symbol: grapheme, format, fractionSize };
  } else {
    result = { symbol: currencyObject.id, fractionSize };
  }

  switch (numberFormat) {
    case 'dot':
      return accounting.formatMoney(input, {
        ...result,
        decimal: '.',
        thousand: ',',
      });
    case 'space':
      return accounting.formatMoney(input, {
        ...result,
        decimal: ',',
        thousand: ' ',
      });
    case 'comma':
    default:
      return accounting.formatMoney(input, {
        ...result,
        decimal: ',',
        thousand: '.',
      });
  }
}
