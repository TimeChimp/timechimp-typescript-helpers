import { formatNumber } from './format-number';
import { Distance } from 'common/models/types/distance';

export function formatDistance(input: number, distance: Distance, symbol: boolean = true) {
    let converted;

    if (distance === 'mi') {
        converted = input * 0.000621371192;
    } else {
        converted = input / 1000;
    }

    const formatted = formatNumber(converted);

    if (!symbol) {
        return formatted;
    }
    return distance === 'km' ? `${formatted} KM` : `${formatted} mi`;
}
