import accounting from 'accounting';
import { NumberFormat } from '../common/models/types/number-format';

export function unformatCurrency(
  input: string,
  numberFormat: NumberFormat = NumberFormat.Dot
): number {
  const map = {
    [NumberFormat.Dot]: () => accounting.unformat(input, ','),
    [NumberFormat.Comma]: () => accounting.unformat(input, '.'),
    [NumberFormat.Space]: () => accounting.unformat(input, ','),
    [NumberFormat.Apostrophe]: () => accounting.unformat(input, '.'),
  };

  return map[numberFormat]();
}
