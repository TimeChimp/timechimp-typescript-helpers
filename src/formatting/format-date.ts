import { store } from '@/store';
import { LocaleDate } from '@/common/utils/date/locale-date';
import { DateFormat } from '@/common/models/types/date-format';

export function formatDate(input: any, format?: DateFormat) {
    let dateFormat = 'yyyy/MM/dd';

    dateFormat = store.getters['setting/setting']('dateFormat');

    return new LocaleDate(input).format(format || dateFormat);
}
