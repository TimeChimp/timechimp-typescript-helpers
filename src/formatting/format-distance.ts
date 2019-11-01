import { formatNumber } from './format-number';
import { Distance } from '../common/models/types/distance';
import { NumberFormat } from '../common/models/types/number-format';

export function formatDistance(
    input: number, 
    distance: Distance, 
    symbol: boolean = true, 
    precision: number = 2, 
    numberFormat: NumberFormat = 'comma'
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
