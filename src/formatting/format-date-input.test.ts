import { formatDateInput } from './format-date-input';


describe('InputTimeDate', () => {
  it('Renders the correct time from number', () => {
    const date = new Date();
    date.setHours(12);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const result = formatDateInput('12');
    expect(result).toEqual(date);
  });

});
