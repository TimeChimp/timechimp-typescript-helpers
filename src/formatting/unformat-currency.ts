import accounting from 'accounting';
import { NumberFormat } from '../common/models/types/number-format';

export function unformatCurrency(input: string, numberFormat: NumberFormat = 'comma'): number {
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
