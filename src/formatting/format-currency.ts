import accounting from 'accounting';

import { getCurrencies } from '../common/constants/settings';
import { CurrencyObject } from '../common/models/interfaces/currency-object';
import { NumberFormat } from '../common/models/types/number-format';

const getSymbolFormatAndFractionSize = (currency: string) => {
  const currencies = getCurrencies();

  const currencyObject = currencies.find((x) => x.id === currency) || {
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

  if (symbol) {
    const { grapheme, template } = symbol;
    const format = template.replace('$', '%s').replace('1', '%v');
    return { symbol: grapheme, format, fractionSize };
  }

  return { symbol: currencyObject.id, fractionSize };
};

export function formatCurrency(
  input: number,
  currency = 'EUR',
  numberFormat: NumberFormat = NumberFormat.Dot
): string {
  const result = getSymbolFormatAndFractionSize(currency);

  const map = {
    [NumberFormat.Dot]: () =>
      accounting.formatMoney(input, {
        ...result,
        decimal: ',',
        thousand: '.',
      }),
    [NumberFormat.Comma]: () =>
      accounting.formatMoney(input, {
        ...result,
        decimal: '.',
        thousand: ',',
      }),
    [NumberFormat.Space]: () =>
      accounting.formatMoney(input, {
        ...result,
        decimal: ',',
        thousand: ' ',
      }),
    [NumberFormat.Apostrophe]: () =>
      accounting.formatMoney(input, {
        ...result,
        decimal: ',',
        thousand: "'",
      }),
  };

  return map[numberFormat]();
}
