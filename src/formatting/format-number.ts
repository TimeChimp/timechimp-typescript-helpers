import accounting from 'accounting';
import { NumberFormat } from '../common/models/types/number-format';

export function formatNumber(input: number, precision: number = 2, numberFormat: NumberFormat = 'comma') {
    switch (numberFormat) {
        case 'dot':
            return accounting.formatNumber(input, precision, ',', '.');
        case 'space':
            return accounting.formatNumber(input, precision, ',', ' ');
        case 'comma':
        default:
            return accounting.formatNumber(input, precision, '.', ',');
    }
}
