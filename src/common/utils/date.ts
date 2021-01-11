import { Time } from '../models/types/time';
import { BetweenDate } from '../models/types/between-date';
import { WeekStartDay } from '../models/types/week-start-day';
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
  getUnixTime,
  fromUnixTime,
} from 'date-fns';

export class TcDate {
  private internalDate: number;

  public constructor(input?: any) {
    if (!input) {
      const utc = new Date();
      this.internalDate = getUnixTime(utc);
    } else {
      const utc = new Date(input);
      this.internalDate = getUnixTime(utc);
    }
  }

  public get date(): Date {
    return fromUnixTime(this.internalDate);
  }

  public set date(value: Date) {
    this.internalDate = getUnixTime(value);
  }

  public toDate() {
    return this.internalDate;
  }

  public add(amount: number, type: Time): TcDate {
    switch (type) {
      case 'milliseconds':
      case 'millisecond':
      case 'ms':
        this.date = addMilliseconds(this.date, amount);
        break;
      case 'seconds':
      case 'second':
      case 's':
        this.date = addSeconds(this.date, amount);
        break;
      case 'minutes':
      case 'minute':
      case 'm':
        this.date = addMinutes(this.date, amount);
        break;
      case 'hours':
      case 'hour':
      case 'h':
        this.date = addHours(this.date, amount);
        break;
      case 'days':
      case 'day':
      case 'd':
        this.date = addDays(this.date, amount);
        break;
      case 'weeks':
      case 'week':
      case 'w':
        this.date = addWeeks(this.date, amount);
        break;
      case 'months':
      case 'month':
      case 'M':
        this.date = addMonths(this.date, amount);
        break;
      case 'quarters':
      case 'quarter':
      case 'q':
        this.date = addQuarters(this.date, amount);
        break;
      case 'years':
      case 'year':
      case 'y':
        this.date = addYears(this.date, amount);
        break;
    }

    return this;
  }

  public subtract(amount: number, type: Time): TcDate {
    switch (type) {
      case 'milliseconds':
      case 'millisecond':
      case 'ms':
        this.date = subMilliseconds(this.date, amount);
        break;
      case 'seconds':
      case 'second':
      case 's':
        this.date = subSeconds(this.date, amount);
        break;
      case 'minutes':
      case 'minute':
      case 'm':
        this.date = subMinutes(this.date, amount);
        break;
      case 'hours':
      case 'hour':
      case 'h':
        this.date = subHours(this.date, amount);
        break;
      case 'days':
      case 'day':
      case 'd':
        this.date = subDays(this.date, amount);
        break;
      case 'weeks':
      case 'week':
      case 'w':
        this.date = subWeeks(this.date, amount);
        break;
      case 'months':
      case 'month':
      case 'M':
        this.date = subMonths(this.date, amount);
        break;
      case 'quarters':
      case 'quarter':
      case 'q':
        this.date = subQuarters(this.date, amount);
        break;
      case 'years':
      case 'year':
      case 'y':
        this.date = subYears(this.date, amount);
        break;
    }

    return this;
  }

  public diff(start: Date, type: Time): number {
    let difference: number = differenceInSeconds(this.date, start);

    switch (type) {
      case 'seconds':
      case 'second':
        difference = differenceInSeconds(this.date, start);
        break;
      case 'minutes':
      case 'minute':
        difference = differenceInMinutes(this.date, start);
        break;
      case 'hours':
      case 'hour':
        difference = differenceInHours(this.date, start);
        break;
      case 'days':
      case 'day':
        difference = differenceInDays(this.date, start);
        break;
      case 'weeks':
      case 'week':
        difference = differenceInWeeks(this.date, start);
        break;
      case 'months':
      case 'month':
        difference = differenceInMonths(this.date, start);
        break;
      case 'quarters':
      case 'quarter':
        difference = differenceInQuarters(this.date, start);
        break;
      case 'years':
      case 'year':
        difference = differenceInYears(this.date, start);
        break;
    }

    return difference;
  }

  public startOf(type: Time, weekStartDay?: WeekStartDay): TcDate {
    switch (type) {
      case 'seconds':
        this.date = startOfSecond(this.date);
        break;
      case 'minutes':
        this.date = startOfMinute(this.date);
        break;
      case 'hours':
        this.date = startOfHour(this.date);
        break;
      case 'day':
        this.date = startOfDay(this.date);
        break;
      case 'week':
        this.date = startOfWeek(this.date, { weekStartsOn: weekStartDay });
        break;
      case 'month':
        this.date = startOfMonth(this.date);
        break;
      case 'quarter':
        this.date = startOfQuarter(this.date);
        break;
      case 'year':
        this.date = startOfYear(this.date);
        break;
    }

    return this;
  }

  public endOf(type: Time, weekStartDay?: WeekStartDay): TcDate {
    switch (type) {
      case 'seconds':
        this.date = endOfSecond(this.date);
        break;
      case 'minutes':
        this.date = endOfMinute(this.date);
        break;
      case 'hours':
        this.date = endOfHour(this.date);
        break;
      case 'day':
        this.date = endOfDay(this.date);
        break;
      case 'week':
        this.date = endOfWeek(this.date, { weekStartsOn: weekStartDay });
        break;
      case 'month':
        this.date = endOfMonth(this.date);
        break;
      case 'quarter':
        this.date = endOfQuarter(this.date);
        break;
      case 'year':
        this.date = endOfYear(this.date);
        break;
    }

    return this;
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

  public isSame(
    dateToCheck: Date,
    type: Time,
    weekStartDay?: WeekStartDay
  ): boolean {
    switch (type) {
      case 'day':
        return isSameDay(this.date, dateToCheck);
      case 'week':
        return isSameWeek(this.date, dateToCheck, {
          weekStartsOn: weekStartDay,
        });
      case 'month':
        return isSameMonth(this.date, dateToCheck);
      case 'quarter':
        return isSameQuarter(this.date, dateToCheck);
      case 'year':
        return isSameYear(this.date, dateToCheck);
      default:
        return false;
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
    switch (type) {
      case 'second':
      case 'seconds':
        this.date = setSeconds(this.date, amount);
        break;
      case 'minute':
      case 'minutes':
        this.date = setMinutes(this.date, amount);
        break;
      case 'hour':
      case 'hours':
        this.date = setHours(this.date, amount);
    }

    return this;
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

  public weekOfYear(date: Date) {
    return getWeek(date);
  }
}
