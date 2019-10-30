import { formatDate } from './format-date';
import { DateObject } from '@/common/models/interfaces/date-object';

describe('Format date', () => {
  it('Renders the formatted date version of the input string', () => {
    const amount: string = '9';
    const dateObject: DateObject = {
      language: 'nl',
      timezone: 'Europe/Amsterdam',
      startOfWeek: 1,
      dateFormat: 'dd-MM-yyyy'
    }

    const result = formatDate(amount, dateObject);

    expect(result).toEqual("01-09-2001");
  });
});
