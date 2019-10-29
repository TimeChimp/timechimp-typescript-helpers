import accounting from 'accounting';

import { store } from '@/store';

export function unformatCurrency(input: string): number {
    const numberFormat = store.getters['setting/setting']('numberFormat');

    switch (numberFormat) {
        case 'dot':
            return accounting.unformat(input, '.');
        case 'space':
            return accounting.unformat(input, ',');
        case 'comma':
        default:
            return accounting.unformat(input, ',');
    }
}
