import { TcDate } from '../common/utils/date';

export function getMonthDays(date: Date) {
  const startDate = new TcDate(date).startOf('month').toDate();

  return [...Array(new TcDate(startDate).daysInMonth())].map((_, x) => {
    return new TcDate(startDate).add(x, 'day').toDate();
  });
}
