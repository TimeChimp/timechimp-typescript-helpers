import accounting from 'accounting';
import { NumberFormat } from '../common/models/types/number-format';

export function formatNumber(
  input: number,
  precision: number = 2,
  numberFormat: NumberFormat = '1,234.56'
) {
  switch (numberFormat) {
    case '1.234,56':
      return accounting.formatNumber(input, precision, '.', ',');
    case '1 234,56':
      return accounting.formatNumber(input, precision, ' ', ',');
    case '1,234.56':
    default:
      return accounting.formatNumber(input, precision, ',', '.');
  }
}
