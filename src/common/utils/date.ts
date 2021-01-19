import dayjs, { ConfigType, OpUnitType } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import 'dayjs/locale/nl';
import 'dayjs/locale/en';
import { getShortLocaleCode } from '../../helpers/get-short-locale-code';
dayjs.extend(isoWeek);
dayjs.extend(isLeapYear);
dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);
dayjs.extend(isoWeeksInYear);

export const setTcDateLocale = (
  preset?: string | ILocale,
  object?: Partial<ILocale>,
  isLocal?: boolean
) => dayjs.locale(preset, object, isLocal);

export const updateTcDateLocale = (localeName: String, customConfig: Object) =>
  dayjs.updateLocale(localeName, customConfig);

export class TcDate {
  private internalDate?: ConfigType;

  constructor(date?: ConfigType) {
    this.internalDate = date;
  }

  add = (value: number, unit?: OpUnitType) =>
    dayjs(this.internalDate).add(value, unit);
  subtract = (value: number, unit?: OpUnitType) =>
    dayjs(this.internalDate).subtract(value, unit);
  toDate = () => dayjs(this.internalDate).toDate();
  toISOString = () => dayjs(this.internalDate).toISOString();
  format = (template?: string) => dayjs(this.internalDate).format(template);
  isSame = (date: ConfigType, unit?: OpUnitType) =>
    dayjs(this.internalDate).isSame(date, unit);
  startOf = (unit: OpUnitType) => dayjs(this.internalDate).startOf(unit);
  endOf = (unit: OpUnitType) => dayjs(this.internalDate).endOf(unit);
  year = () => dayjs(this.internalDate).year();
  week = () => dayjs(this.internalDate).week();
  locale = (preset: string | ILocale, object?: Partial<ILocale>) =>
    dayjs(this.internalDate).locale(preset, object);

  getWeekDates = () => {
    const startOfWeek = dayjs(this.internalDate).startOf('w');
    const weekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(startOfWeek.add(i, 'd').toDate());
    }
    return weekDates;
  };

  formatDateTime = (template: string, language: string = 'en'): string => {
    if (!this.internalDate) {
      return '';
    }
    return dayjs(this.internalDate)
      .locale(getShortLocaleCode(language))
      .format(template);
  };

  getDayShortName = (language: string = 'en'): string => {
    const dayShortName = this.formatDateTime('ddd D', language);
    return dayShortName.charAt(0).toUpperCase() + dayShortName.slice(1);
  };

  toDateString = (
    date?: Date,
    format: string = 'YYYY-MM-DD'
  ): string | undefined => {
    if (!date) {
      return undefined;
    }

    return dayjs(this.internalDate).format(format);
  };

  getYearMonthDayKey = () => {
    return dayjs(this.internalDate).format('YYYY-MM-DD');
  };

  getDateOfWeek = (week: number, year: number) => {
    const day = 1 + (week - 1) * 7;

    return new Date(year, 0, day);
  };

  getDateOfIsoWeek = (week: number, year: number): Date => {
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

  getIsoWeekAndYear = () => {
    const dayjsDate = dayjs(this.internalDate);
    return {
      year: dayjsDate.isoWeekYear(),
      week: dayjsDate.isoWeek(),
      day: dayjsDate.isoWeekday(),
    };
  };

  getIsoWeek = () => {
    return dayjs(this.internalDate).isoWeek();
  };

  getDateWithoutTimeAsUTC = () => {
    if (!this.internalDate) {
      throw new Error('Date is null');
    }

    return new Date(
      Date.UTC(
        (this.internalDate as Date).getFullYear(),
        (this.internalDate as Date).getMonth(),
        (this.internalDate as Date).getDate(),
        0,
        0,
        0,
        0
      )
    );
  };
}
