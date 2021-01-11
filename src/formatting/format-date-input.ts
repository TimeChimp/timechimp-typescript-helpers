import { TcDate } from '../common/utils/date';
import { formatFloat } from './format-float';
import { formatTime } from './format-time';
import { DateObject } from '../common/models/interfaces/date-object';
import { LocaleDate } from '../common/utils/locale-date';

export function formatDateInput(
  input: any,
  dateFormat: DateObject,
  date?: Date
) {
  const float = formatFloat(input, true);
  const time = formatTime(float * 3600, 'HH:mm');

  const timeArray = time.split(':');

  const hours = parseInt(timeArray[0], 10);
  const minutes = parseInt(timeArray[1], 10);

  const unixDate = new TcDate(date)
    .set(hours, 'hours')
    .set(minutes, 'minutes')
    .set(0, 'seconds')
    .set(0, 'milliseconds')
    .toDate();

  const formatted = new LocaleDate(unixDate, dateFormat).toDate();
  return formatted;
}
