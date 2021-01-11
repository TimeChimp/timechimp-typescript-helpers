import { formatDateInput } from './format-date-input';
import { DateObject } from '../common/models/interfaces/date-object';

describe('InputTimeDate', () => {
  it('Renders the correct time from number', () => {
    const dateObject: DateObject = {
      language: 'nl',
      timezone: 'Europe/Amsterdam',
      startOfWeek: 1,
      dateFormat: 'yyyy-MM-dd HH:mm:ss zzz',
    };

    // const date = new Date();
    const result = formatDateInput('9:30', dateObject);
    // expect(result.le).toEqual(`${new Date().toISOString().substr(0, 10)} 09:30:00 GMT+1`);
    expect(result.length).toEqual(25);
  });
});
