import dayjs from 'dayjs';
import { getShortLocaleCode } from './get-short-locale-code';

export const getWeekDates = (date: Date) => {
  const startOfWeek = dayjs(date).startOf('w');
  return [...Array(7)].map((_, i) => startOfWeek.add(i, 'd').toDate());
};

export const formatDateTime = (
  date: Date | null,
  template: string,
  language: string = 'en'
): string => {
  if (!date) {
    return '';
  }
  return dayjs(date)
    .locale(getShortLocaleCode(language))
    .format(template);
};

export const getDayShortName = (
  date: Date,
  language: string = 'en'
): string => {
  const dayShortName = formatDateTime(date, 'ddd D', language);
  return dayShortName.charAt(0).toUpperCase() + dayShortName.slice(1);
};

export const getDateWithoutTimeAsUTC = (date: Date) =>
  new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
  );

export const toDateString = (
  date?: Date,
  format: string = 'YYYY-MM-DD'
): string | undefined => {
  if (!date) {
    return undefined;
  }

  return dayjs(date).format(format);
};

export const getYearMonthDayKey = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const getDateOfWeek = (week: number, year: number) => {
  const day = 1 + (week - 1) * 7;

  return new Date(year, 0, day);
};

/**
 * Based on https://stackoverflow.com/a/16591175/1635379, calculate the first date of ISO-8601 week.
 * It can be calculated by calculating the number of Thursdays from the start of the year.
 * E.g. 12th Thursday is on 12th week.
 * @param week - ISO-8601 week
 * @param year - ISO-8601 year
 */
export const getDateOfIsoWeek = (week: number, year: number): Date => {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dow = simple.getDay();
  const isoWeekStart = simple;
  if (dow <= 4) {
    isoWeekStart.setDate(simple.getDate() - simple.getDay() + 1);
  } else {
    isoWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
  }
  return isoWeekStart;
};

export const getIsoWeekAndYear = (date: Date) => {
  const dayjsDate = dayjs(date);
  return {
    year: dayjsDate.isoWeekYear(),
    week: dayjsDate.isoWeek(),
    day: dayjsDate.isoWeekday(),
  };
};

export const getIsoWeek = (date: Date) => {
  return dayjs(date).isoWeek();
};

export const minimumDelay = (
  func: () => void,
  startTime: Date,
  mininumMs: number
): void => {
  const diff = dayjs().diff(startTime, 'millisecond');
  const ms = diff < mininumMs ? mininumMs - diff : 0;

  setTimeout(func, ms);
};
