import accounting from 'accounting';
import { store } from '@/store';

export function formatNumber(input: number) {
    let numberFormat = 'comma';

    numberFormat = store.getters['setting/setting']('numberFormat');

    switch (numberFormat) {
        case 'dot':
            return accounting.formatNumber(input, 2, '.', ',');
        case 'space':
            return accounting.formatNumber(input, 2, ',', ' ');
        case 'comma':
        default:
            return accounting.formatNumber(input, 2, ',', '.');
    }
}
