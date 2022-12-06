import accounting from 'accounting';
import { NumberFormat } from '../common';

export function formatNumber(
  input: number,
  precision: number = 2,
  numberFormat: NumberFormat = NumberFormat.Dot
) {
  const map = {
    [NumberFormat.Dot]: () =>
      accounting.formatNumber(input, precision, '.', ','),
    [NumberFormat.Comma]: () =>
      accounting.formatNumber(input, precision, ',', '.'),
    [NumberFormat.Space]: () =>
      accounting.formatNumber(input, precision, ' ', ','),
    [NumberFormat.Apostrophe]: () =>
      accounting.formatNumber(input, precision, "'", '.'),
  };

  return map[numberFormat]();
}
