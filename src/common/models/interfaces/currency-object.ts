import { CurrencySymbol } from './currency-symbol';

export interface CurrencyObject {
    id: string;
    name: string;
    fractionSize: number;
    symbol: CurrencySymbol | null;
    uniqSymbol: CurrencySymbol | null;
}
