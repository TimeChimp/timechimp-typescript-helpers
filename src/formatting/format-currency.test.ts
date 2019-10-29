import { formatCurrency } from './format-currency';

describe('Format currency', () => {
  it('Renders the formated string version of the input currency amount', () => {
    const amount = 100;
    const usd = {
      id: 'USD',
      name: 'US Dollar',
      fractionSize: 2,
      symbol: {
          grapheme: '$',
          template: '$1',
          rtl: false,
      },
      uniqSymbol: {
          grapheme: '$',
          template: '$1',
          rtl: false,
      },
  }

    const result = formatCurrency(amount, usd, 'dot');
    expect(result).toEqual('$100.00');
  });

  it('Renders the eur format if incorrect currency object', () => {
    const amount = 100;
    const usd = {
      id: 'baltus',
      name: 'US Dollar',
      fractionSize: 2,
      symbol: {
          grapheme: '$',
          template: '$1',
          rtl: false,
      },
      uniqSymbol: {
          grapheme: '$',
          template: '$1',
          rtl: false,
      },
  }

    const result = formatCurrency(amount, usd, 'comma');
    expect(result).toEqual('€100,00');
  });
});
