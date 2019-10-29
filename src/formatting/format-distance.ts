import { store } from '@/store';
import { formatNumber } from './format-number';

export function formatDistance(input: number, symbol?: boolean) {
    const distance = store.getters['setting/setting']('distance');

    let converted;

    if (distance === 'mi') {
        converted = input * 0.000621371192;
    } else {
        converted = input / 1000;
    }

    const formatted = formatNumber(converted);

    return distance === 'km' ? `${formatted} KM` : `${formatted} mi`;
}
