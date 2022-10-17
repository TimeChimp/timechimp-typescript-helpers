import { Time } from '../models/types/time';
import { BetweenDate } from '../models/types/between-date';
import { WeekStartDay } from '../models/types/week-start-day';
import { getDateLocale } from '../../helpers/get-date-locale';
import { SupportedLocale } from '../models/types/supported-locales';
import {
  addMonths,
  addWeeks,
  addMinutes,
  addHours,
  subSeconds,
  subMinutes,
  subHours,
  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears,
  addDays,
  addQuarters,
  addYears,
  addSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInWeeks,
  differenceInQuarters,
  differenceInYears,
  startOfSecond,
  startOfWeek,
  startOfMonth,
  startOfYear,
  startOfHour,
  startOfMinute,
  differenceInSeconds,
  differenceInDays,
  differenceInMonths,
  startOfDay,
  startOfQuarter,
  endOfSecond,
  endOfMinute,
  endOfHour,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfQuarter,
  endOfYear,
  getDay,
  getWeek,
  isSameMonth,
  isSameQuarter,
  isSameYear,
  isSameDay,
  isSameWeek,
  isWithinInterval,
  isAfter,
  isValid,
  getDaysInMonth,
  setDay,
  setSeconds,
  setMinutes,
  setHours,
  eachDayOfInterval,
  subMilliseconds,
  addMilliseconds,
  getYear,
  format,
  parse,
  differenceInMilliseconds,
  parseJSON,
} from 'date-fns';
import getISOWeekYear from 'date-fns/getISOWeekYear';
import getISOWeek from 'date-fns/getISOWeek';
import getISODay from 'date-fns/getISODay';

export class TcDate {
  private date: Date;

  public constructor(date?: Date | string, format?: string) {
    if (!date) {
      date = new Date();
    }

    if (typeof date === 'string') {
      if (format) {
        this.date = parse(date, format, new Date());
      } else {
        this.date = parseJSON(date);
      }
    } else {
      this.date = date;
    }
  }

  public toDate() {
    return this.date;
  }

  public format(template: string, locale: SupportedLocale = 'en') {
    let dateLocale = locale;
    // fix for date fns to make am/pm lowercase: https://github.com/date-fns/date-fns/issues/946
    if (template === 'h:mma') {
      template = "h:mmaaaaa'm'";
      // fix doesn't work with nl-NL locale
      dateLocale = 'en';
    }

    const listOfTemplates = {
      ['DD/MM/YYYY']: 'dd/MM/yyyy',
      ['YYYY/MM/DD']: 'yyyy/MM/dd',
      ['MM/DD/YYYY']: 'MM/dd/yyyy',
      ['DD-MM-YYYY']: 'dd-MM-yyyy',
      ['YYYY-MM-DD']: 'yyyy-MM-dd',
      ['DD.MM.YYYY']: 'dd.MM.yyyy',
      ['YYYY.MM.DD']: 'yyyy.MM.dd',
    };

    return format(this.date, listOfTemplates[template] || template, { locale: getDateLocale(dateLocale) });
  }

  public add(amount: number, type: Time): TcDate {
    let date;
    switch (type) {
      case 'milliseconds':
      case 'millisecond':
      case 'ms':
        date = addMilliseconds(this.date, amount);
        break;
      case 'seconds':
      case 'second':
      case 's':
        date = addSeconds(this.date, amount);
        break;
      case 'minutes':
      case 'minute':
      case 'm':
        date = addMinutes(this.date, amount);
        break;
      case 'hours':
      case 'hour':
      case 'h':
        date = addHours(this.date, amount);
        break;
      case 'days':
      case 'day':
      case 'd':
        date = addDays(this.date, amount);
        break;
      case 'weeks':
      case 'week':
      case 'w':
        date = addWeeks(this.date, amount);
        break;
      case 'months':
      case 'month':
      case 'M':
        date = addMonths(this.date, amount);
        break;
      case 'quarters':
      case 'quarter':
      case 'q':
        date = addQuarters(this.date, amount);
        break;
      case 'years':
      case 'year':
      case 'y':
        date = addYears(this.date, amount);
        break;
      default:
        throw new Error(`${type} is not supported`);
    }
    return new TcDate(date);
  }

  public subtract(amount: number, type: Time): TcDate {
    let date;
    switch (type) {
      case 'milliseconds':
      case 'millisecond':
      case 'ms':
        date = subMilliseconds(this.date, amount);
        break;
      case 'seconds':
      case 'second':
      case 's':
        date = subSeconds(this.date, amount);
        break;
      case 'minutes':
      case 'minute':
      case 'm':
        date = subMinutes(this.date, amount);
        break;
      case 'hours':
      case 'hour':
      case 'h':
        date = subHours(this.date, amount);
        break;
      case 'days':
      case 'day':
      case 'd':
        date = subDays(this.date, amount);
        break;
      case 'weeks':
      case 'week':
      case 'w':
        date = subWeeks(this.date, amount);
        break;
      case 'months':
      case 'month':
      case 'M':
        date = subMonths(this.date, amount);
        break;
      case 'quarters':
      case 'quarter':
      case 'q':
        date = subQuarters(this.date, amount);
        break;
      case 'years':
      case 'year':
      case 'y':
        date = subYears(this.date, amount);
        break;
      default:
        throw new Error(`${type} is not supported`);
    }
    return new TcDate(date);
  }

  public diff(start: Date, type: Time): number {
    let difference: number = differenceInSeconds(this.date, start);

    switch (type) {
      case 'milliseconds':
      case 'millisecond':
      case 'ms':
        difference = differenceInMilliseconds(this.date, start);
        break;
      case 'seconds':
      case 'second':
      case 's':
        difference = differenceInSeconds(this.date, start);
        break;
      case 'minutes':
      case 'minute':
      case 'm':
        difference = differenceInMinutes(this.date, start);
        break;
      case 'hours':
      case 'hour':
      case 'h':
        difference = differenceInHours(this.date, start);
        break;
      case 'days':
      case 'day':
      case 'd':
        difference = differenceInDays(this.date, start);
        break;
      case 'weeks':
      case 'week':
      case 'w':
        difference = differenceInWeeks(this.date, start);
        break;
      case 'months':
      case 'month':
      case 'M':
        difference = differenceInMonths(this.date, start);
        break;
      case 'quarters':
      case 'quarter':
      case 'q':
        difference = differenceInQuarters(this.date, start);
        break;
      case 'years':
      case 'year':
      case 'y':
        difference = differenceInYears(this.date, start);
        break;
      default:
        throw new Error(`${type} is not supported`);
    }
    return difference;
  }

  public startOf(type: Time, weekStartDay?: WeekStartDay): TcDate {
    let date;
    switch (type) {
      case 'seconds':
      case 'second':
      case 's':
        date = startOfSecond(this.date);
        break;
      case 'minutes':
      case 'minute':
      case 'm':
        date = startOfMinute(this.date);
        break;
      case 'hours':
      case 'hour':
      case 'h':
        date = startOfHour(this.date);
        break;
      case 'days':
      case 'day':
      case 'd':
        date = startOfDay(this.date);
        break;
      case 'weeks':
      case 'week':
      case 'w':
        date = startOfWeek(this.date, { weekStartsOn: weekStartDay });
        break;
      case 'months':
      case 'month':
      case 'M':
        date = startOfMonth(this.date);
        break;
      case 'quarters':
      case 'quarter':
      case 'q':
        date = startOfQuarter(this.date);
        break;
      case 'years':
      case 'year':
      case 'y':
        date = startOfYear(this.date);
        break;
      default:
        throw new Error(`${type} is not supported`);
    }
    return new TcDate(date);
  }

  public endOf(type: Time, weekStartDay?: WeekStartDay): TcDate {
    let date;
    switch (type) {
      case 'seconds':
      case 'second':
      case 's':
        date = endOfSecond(this.date);
        break;
      case 'minutes':
      case 'minute':
      case 'm':
        date = endOfMinute(this.date);
        break;
      case 'hours':
      case 'hour':
      case 'h':
        date = endOfHour(this.date);
        break;
      case 'days':
      case 'day':
      case 'd':
        date = endOfDay(this.date);
        break;
      case 'weeks':
      case 'week':
      case 'w':
        date = endOfWeek(this.date, { weekStartsOn: weekStartDay });
        break;
      case 'months':
      case 'month':
      case 'M':
        date = endOfMonth(this.date);
        break;
      case 'quarters':
      case 'quarter':
      case 'q':
        date = endOfQuarter(this.date);
        break;
      case 'years':
      case 'year':
      case 'y':
        date = endOfYear(this.date);
        break;
      default:
        throw new Error(`${type} is not supported`);
    }
    return new TcDate(date);
  }

  public weekday(): number {
    return getDay(this.date);
  }

  public weekdayToDate(day: number, weekStartDay: WeekStartDay): Date {
    return setDay(this.date, day, { weekStartsOn: weekStartDay });
  }

  public week(weekStartDay: WeekStartDay): number {
    return getWeek(this.date, { weekStartsOn: weekStartDay });
  }

  public year(): number {
    return getYear(this.date);
  }

  public isSame(
    dateToCheck: Date,
    type: Time,
    weekStartDay?: WeekStartDay
  ): boolean {
    switch (type) {
      case 'days':
      case 'day':
      case 'd':
        return isSameDay(this.date, dateToCheck);
      case 'weeks':
      case 'week':
      case 'w':
        return isSameWeek(this.date, dateToCheck, {
          weekStartsOn: weekStartDay,
        });
      case 'months':
      case 'month':
      case 'M':
        return isSameMonth(this.date, dateToCheck);
      case 'quarters':
      case 'quarter':
      case 'q':
        return isSameQuarter(this.date, dateToCheck);
      case 'years':
      case 'year':
      case 'y':
        return isSameYear(this.date, dateToCheck);
      default:
        throw new Error(`${type} is not supported`);
    }
  }

  public isBetween({ start, end }: BetweenDate): boolean {
    return isWithinInterval(this.date, {
      start,
      end,
    });
  }

  public isAfter(dateToCheck: Date): boolean {
    return isAfter(this.date, dateToCheck);
  }

  public isValid(): boolean {
    return isValid(this.date);
  }

  public set(amount: number, type: Time): TcDate {
    let date;
    switch (type) {
      case 'second':
      case 'seconds':
        date = setSeconds(this.date, amount);
        break;
      case 'minute':
      case 'minutes':
        date = setMinutes(this.date, amount);
        break;
      case 'hour':
      case 'hours':
        date = setHours(this.date, amount);
    }
    return new TcDate(date);
  }

  public daysInMonth(): number {
    return getDaysInMonth(this.date);
  }

  public toISOString(): string {
    return this.date.toISOString();
  }

  public interval(start: Date, end: Date): Date[] {
    return eachDayOfInterval({
      start,
      end,
    });
  }

  public getWeekDates = (weekStartDay?: WeekStartDay) => {
    const startOfWeekDate = startOfWeek(this.date, {
      weekStartsOn: weekStartDay,
    });
    const weekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(addDays(startOfWeekDate, i));
    }
    return weekDates;
  };

  public getDayShortName = (locale?: SupportedLocale): string => {
    const dayShortName = this.format('EEE d', locale);
    return dayShortName.charAt(0).toUpperCase() + dayShortName.slice(1);
  };

  public getYearMonthDayKey = () => {
    return this.format('yyyy-MM-dd');
  };

  public getDateOfWeek = (week: number, year: number) => {
    const day = 1 + (week - 1) * 7;
    return new Date(year, 0, day);
  };

  public getDateOfIsoWeek = (week: number, year: number): Date => {
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

  public getIsoWeekAndYear = () => {
    return {
      year: getISOWeekYear(this.date),
      week: getISOWeek(this.date),
      day: getISODay(this.date),
    };
  };

  public getISODay = () => {
    return getISODay(this.date);
  };

  public getISOYear = () => {
    return getISOWeekYear(this.date);
  };

  public getIsoWeek = () => {
    return getISOWeek(this.date);
  };

  public getDateWithoutTimeAsUTC = () => {
    if (!this.date) {
      throw new Error('Date is null');
    }

    return new Date(
      Date.UTC(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        0,
        0,
        0,
        0
      )
    );
  };
}
