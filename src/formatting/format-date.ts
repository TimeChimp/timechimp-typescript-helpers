import { LocaleDate } from '../common/utils/locale-date';
import { DateObject } from '../common/models/interfaces/date-object';
import { TcDate } from '../common/utils/date';

export function formatDate(input: any, dateObject: DateObject) {
  const unix = new TcDate(input).toDate();
  return new LocaleDate(unix, dateObject).toDate();
}
