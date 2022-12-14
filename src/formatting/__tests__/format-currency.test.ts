import { NumberFormat } from '../../common';
import { formatCurrency } from '../format-currency';

describe('Format currency', () => {
  it('Renders the formated string version of the input currency amount', () => {
    const currency = 'USD';
    const amount = 100;

    const result = formatCurrency(amount, currency, NumberFormat.Comma);
    expect(result).toEqual('$100.00');
  });

  it('Renders the eur format if incorrect currency', () => {
    const currency = 'Baltus';
    const amount = 100;

    const result = formatCurrency(amount, currency, NumberFormat.Dot);
    expect(result).toEqual('€100,00');
  });

  it('Renders the eur format if no params', () => {
    const amount = 100;

    const result = formatCurrency(amount);
    expect(result).toEqual('€100,00');
  });
});
