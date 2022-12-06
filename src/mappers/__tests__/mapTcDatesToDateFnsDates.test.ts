import { mapTcDateFormatToDateFnsDateFormat } from '../mapTcDatesToDateFnsDates';

describe('mapTcDateFormatToDateFnsDateFormat', () => {
  it('should return the correct date format', () => {
    expect(mapTcDateFormatToDateFnsDateFormat('DD/MM/YYYY')).toBe('dd/MM/yyyy');
    expect(mapTcDateFormatToDateFnsDateFormat('DD-MM-YYYY')).toBe('dd-MM-yyyy');
    expect(mapTcDateFormatToDateFnsDateFormat('YYYY-MM-DD')).toBe('yyyy-MM-dd');
    expect(mapTcDateFormatToDateFnsDateFormat('MM/DD/YYYY')).toBe('MM/dd/yyyy');
    expect(mapTcDateFormatToDateFnsDateFormat('DD.MM.YYYY')).toBe('dd.MM.yyyy');
    expect(mapTcDateFormatToDateFnsDateFormat('YYYY.MM.DD')).toBe('yyyy.MM.dd');
    expect(mapTcDateFormatToDateFnsDateFormat('YYYY/MM/DD')).toBe('yyyy/MM/dd');
    expect(mapTcDateFormatToDateFnsDateFormat('YYYY')).toBe('YYYY');
  });
});
