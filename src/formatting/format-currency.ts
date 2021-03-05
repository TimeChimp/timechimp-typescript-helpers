import accounting from 'accounting';

import { getCurrencies } from '../common/constants/settings';
import { CurrencyObject } from '../common/models/interfaces/currency-object';
import { NumberFormat } from '../common/models/types/number-format';

export function formatCurrency(
  input: number,
  currency: string = 'EUR',
  numberFormat: NumberFormat = '1,234.56'
): string {
  const currencies = getCurrencies();

  const currencyObject = currencies.find(x => x.id === currency) || {
    id: 'EUR',
    name: 'Euro',
    fractionSize: 2,
    symbol: {
      grapheme: '€',
      template: '$1',
      rtl: false,
    },
    uniqSymbol: {
      grapheme: '€',
      template: '$1',
      rtl: false,
    },
  };
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
    case '1.234,56':
      return accounting.formatMoney(input, {
        ...result,
        decimal: ',',
        thousand: '.',
      });
    case '1 234,56':
      return accounting.formatMoney(input, {
        ...result,
        decimal: ',',
        thousand: ' ',
      });
    case '1,234.56':
    default:
      return accounting.formatMoney(input, {
        ...result,
        decimal: '.',
        thousand: ',',
      });
  }
}
