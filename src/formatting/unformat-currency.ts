import accounting from 'accounting';
import { NumberFormat } from '../common/models/types/number-format';

export function unformatCurrency(
  input: string,
  numberFormat: NumberFormat = '1,234.56'
): number {
  switch (numberFormat) {
    case '1.234,56':
      return accounting.unformat(input, ',');
    case '1 234,56':
      return accounting.unformat(input, ',');
    case '1,234.56':
    default:
      return accounting.unformat(input, '.');
  }
}
