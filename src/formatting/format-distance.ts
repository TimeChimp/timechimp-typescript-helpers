import { formatNumber } from './format-number';
import { DistanceFormat, NumberFormat } from '../common';

export function formatDistance(
  input: number,
  distance: DistanceFormat,
  symbol = true,
  precision = 2,
  numberFormat: NumberFormat = NumberFormat.Dot
) {
  let converted;

  if (distance === 'mi') {
    converted = input * 0.000621371192;
  } else {
    converted = input / 1000;
  }

  const formatted = formatNumber(converted, precision, numberFormat);

  if (!symbol) {
    return formatted;
  }
  return distance === 'km' ? `${formatted} KM` : `${formatted} mi`;
}
