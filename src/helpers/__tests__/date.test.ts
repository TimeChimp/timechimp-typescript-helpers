import {
  getDateWithoutTimeAsUTC,
  getDateOfWeek,
  getDayShortName,
  getIsoWeekAndYear,
  getDateOfIsoWeek,
} from '../date';
import dayjs from 'dayjs';

describe('utils/date', () => {
  describe('getDateWithoutTimeAsUTC', () => {
    it('should convert a date without time correctly', () => {
      const dateWithoutTime = new Date(2020, 1, 1, 0, 0, 0, 0);

      const convertedDate = getDateWithoutTimeAsUTC(dateWithoutTime);

      expect(convertedDate.getFullYear()).toBe(2020);
      expect(convertedDate.getFullYear()).toEqual(
        convertedDate.getUTCFullYear()
      );
      expect(convertedDate.getMonth()).toBe(1);
      expect(convertedDate.getMonth()).toEqual(convertedDate.getUTCMonth());
      expect(convertedDate.getDate()).toBe(1);
      expect(convertedDate.getDate()).toEqual(convertedDate.getUTCDate());
      expect(convertedDate.getUTCHours()).toBe(0);
      expect(convertedDate.getUTCMinutes()).toBe(0);
      expect(convertedDate.getUTCSeconds()).toBe(0);
      expect(convertedDate.getUTCMilliseconds()).toBe(0);
    });

    it('should convert a date with minimal time correctly', () => {
      const dateWithTime = new Date(2020, 1, 1, 1, 1, 1, 1);

      const convertedDate = getDateWithoutTimeAsUTC(dateWithTime);

      expect(convertedDate.getFullYear()).toBe(2020);
      expect(convertedDate.getFullYear()).toEqual(
        convertedDate.getUTCFullYear()
      );
      expect(convertedDate.getMonth()).toBe(1);
      expect(convertedDate.getMonth()).toEqual(convertedDate.getUTCMonth());
      expect(convertedDate.getDate()).toBe(1);
      expect(convertedDate.getUTCHours()).toBe(0);
      expect(convertedDate.getUTCMinutes()).toBe(0);
      expect(convertedDate.getUTCSeconds()).toBe(0);
      expect(convertedDate.getUTCMilliseconds()).toBe(0);
    });

    it('should convert a date with maximal time correctly', () => {
      const dateWithTime = new Date(2020, 1, 1, 23, 59, 59, 999);

      const convertedDate = getDateWithoutTimeAsUTC(dateWithTime);

      expect(convertedDate.getFullYear()).toBe(2020);
      expect(convertedDate.getFullYear()).toEqual(
        convertedDate.getUTCFullYear()
      );
      expect(convertedDate.getMonth()).toBe(1);
      expect(convertedDate.getMonth()).toEqual(convertedDate.getUTCMonth());
      expect(convertedDate.getDate()).toBe(1);
      expect(convertedDate.getDate()).toEqual(convertedDate.getUTCDate());
      expect(convertedDate.getUTCHours()).toBe(0);
      expect(convertedDate.getUTCMinutes()).toBe(0);
      expect(convertedDate.getUTCSeconds()).toBe(0);
      expect(convertedDate.getUTCMilliseconds()).toBe(0);
    });
  });

  describe('getDateOfWeek', () => {
    it('should convert a week and year to a date', () => {
      const week = 3;
      const year = 2020;

      const convertedDate = getDateOfWeek(week, year);

      expect(convertedDate.getFullYear()).toBe(2020);
      expect(convertedDate.getMonth()).toBe(0);
      expect(convertedDate.getDate()).toBe(15);
    });
  });

  describe('getDateOfIsoWeek: convert an ISO-8601 week and an ISO-8601 year to an ISO-8601 start date', () => {
    it('week 1 of 2021 start on 04.01.2021', () => {
      expect(dayjs(getDateOfIsoWeek(1, 2021)).format('YYYY-MM-DD')).toBe(
        '2021-01-04'
      );
    });
    it('week 2 of 2021 start on 11.01.2021', () => {
      expect(dayjs(getDateOfIsoWeek(2, 2021)).format('YYYY-MM-DD')).toBe(
        '2021-01-11'
      );
    });
    it('week 53 of 2020 start on 28.12.2020', () => {
      expect(dayjs(getDateOfIsoWeek(53, 2020)).format('YYYY-MM-DD')).toBe(
        '2020-12-28'
      );
    });
  });

  describe('getDayShortName', () => {
    it('should properly translate weekdays in English', () => {
      expect(getDayShortName(new Date(2020, 11, 7))).toBe('Mon 7');
      expect(getDayShortName(new Date(2020, 11, 8))).toBe('Tue 8');
      expect(getDayShortName(new Date(2020, 11, 9))).toBe('Wed 9');
      expect(getDayShortName(new Date(2020, 11, 10))).toBe('Thu 10');
      expect(getDayShortName(new Date(2020, 11, 11))).toBe('Fri 11');
      expect(getDayShortName(new Date(2020, 11, 12))).toBe('Sat 12');
      expect(getDayShortName(new Date(2020, 11, 13))).toBe('Sun 13');
    });

    it('should properly translate weekdays in Dutch', () => {
      expect(getDayShortName(new Date(2020, 11, 7), 'nl-be')).toBe('Ma. 7');
      expect(getDayShortName(new Date(2020, 11, 8), 'nl')).toBe('Di. 8');
      expect(getDayShortName(new Date(2020, 11, 9), 'nl')).toBe('Wo. 9');
      expect(getDayShortName(new Date(2020, 11, 10), 'nl-NL')).toBe('Do. 10');
      expect(getDayShortName(new Date(2020, 11, 11), 'nl-NL')).toBe('Vr. 11');
      expect(getDayShortName(new Date(2020, 11, 12), 'nl-NL')).toBe('Za. 12');
      expect(getDayShortName(new Date(2020, 11, 13), 'nl-NL')).toBe('Zo. 13');
    });
  });

  describe('getIsoWeekFromStartDay', () => {
    // Use this website to verify week number: https://www.timeanddate.com/date/weeknumber.html

    it('31.12.2020 should be year week 53', () => {
      const { year, week } = getIsoWeekAndYear(
        new Date(Date.UTC(2020, 11, 31))
      );
      expect(week).toBe(53);
      expect(year).toBe(2020);
    });
    it('27.12.2020 should be year week 52 if week starts on Monday', () => {
      const { year, week } = getIsoWeekAndYear(
        new Date(Date.UTC(2020, 11, 27))
      );
      expect(week).toBe(52);
      expect(year).toBe(2020);
    });
    it('28.12.2020 should be year week 53 if week starts on Monday', () => {
      const { year, week } = getIsoWeekAndYear(
        new Date(Date.UTC(2020, 11, 28))
      );
      expect(week).toBe(53);
      expect(year).toBe(2020);
    });
    it('01.01.2021 should be year week 53 of year 2020', () => {
      const { year, week } = getIsoWeekAndYear(new Date(Date.UTC(2021, 0, 1)));
      expect(week).toBe(53);
      expect(year).toBe(2020);
    });
    it('03.01.2021 should be year week 53 of year 2020', () => {
      const { year, week } = getIsoWeekAndYear(new Date(Date.UTC(2021, 0, 3)));
      expect(week).toBe(53);
      expect(year).toBe(2020);
    });
    it('31.12.2021 should be year week 52', () => {
      const { year, week } = getIsoWeekAndYear(
        new Date(Date.UTC(2021, 11, 31))
      );
      expect(week).toBe(52);
      expect(year).toBe(2021);
    });
  });
});
