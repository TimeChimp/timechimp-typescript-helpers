import { TcDate } from '../common/utils/date';
import { LocaleDate } from '../common/utils/locale-date';
import { DateObject } from '../common/models/interfaces/date-object';

const defaults: DateObject = {
  language: 'nl',
  timezone: 'Europe/Amsterdam',
  startOfWeek: 1,
  dateFormat: 'EEEE',
};

export function getWeekDays(
  charCount?: number,
  dateObject: DateObject = defaults
): string[] {
  const start = new TcDate().startOf('week').date;
  const end = new TcDate().endOf('week').date;

  const ordered = new TcDate()
    .interval(start, end)
    .map(x => new LocaleDate(new TcDate(x).toDate(), dateObject).toDate());

  if (charCount) {
    return ordered.map(x => x.substring(0, charCount).toUpperCase());
  } else {
    return ordered;
  }
}
