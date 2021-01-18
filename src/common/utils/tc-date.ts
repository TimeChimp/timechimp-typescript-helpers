import dayjs, { Dayjs, ConfigType } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { getShortLocaleCode } from '../../helpers/get-short-locale-code';
import 'dayjs/locale/nl';
import 'dayjs/locale/en';
dayjs.extend(isoWeek);
dayjs.extend(isLeapYear);
dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);
dayjs.extend(isoWeeksInYear);

declare function tcdate(date?: ConfigType): TcDate;

class TcDate extends Dayjs {
  private internalDate?: ConfigType;

  constructor(date?: ConfigType) {
    super(date);
    this.internalDate = date;
  }

  getWeekDates = () => {
    const startOfWeek = this.startOf('w');
    return [...Array(7)].map((_, i) => startOfWeek.add(i, 'd').toDate());
  };

  formatDateTime = (template: string, language: string = 'en'): string => {
    if (!this.internalDate) {
      return '';
    }
    return this.locale(getShortLocaleCode(language)).format(template);
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

    return this.format(format);
  };

  getYearMonthDayKey = () => {
    return this.format('YYYY-MM-DD');
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
    return {
      year: this.isoWeekYear(),
      week: this.isoWeek(),
      day: this.isoWeekday(),
    };
  };

  getIsoWeek = () => {
    return this.isoWeek();
  };

  minimumDelay = (
    func: () => void,
    startTime: Date,
    mininumMs: number
  ): void => {
    const diff = this.diff(startTime, 'millisecond');
    const ms = diff < mininumMs ? mininumMs - diff : 0;

    setTimeout(func, ms);
  };
}

export default tcdate;
