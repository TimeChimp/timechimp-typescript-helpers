import { store } from '@/store';
import { LocaleDate } from '@/common/utils/date/locale-date';

export function formatDateTime(input: Date) {
    let dateFormat = 'yyyy/MM/dd';

    dateFormat = store.getters['setting/setting']('dateFormat');

    return new LocaleDate(input).format(dateFormat + ' h:mm');
}
