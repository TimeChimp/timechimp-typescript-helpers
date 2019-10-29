import accounting from 'accounting';
import { NumberFormat } from 'common/models/types/number-format';

export function formatNumber(input: number, numberFormat: NumberFormat = 'comma') {
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
