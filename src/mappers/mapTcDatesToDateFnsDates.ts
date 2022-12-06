import { TcDateFormat, DateFnsDateFormat } from '../common';

export const mapTcDateFormatToDateFnsDateFormat = (
  dateFormat: TcDateFormat | string
): DateFnsDateFormat | string => {
  switch (dateFormat) {
    case 'DD/MM/YYYY':
      return 'dd/MM/yyyy';
    case 'DD-MM-YYYY':
      return 'dd-MM-yyyy';
    case 'YYYY-MM-DD':
      return 'yyyy-MM-dd';
    case 'MM/DD/YYYY':
      return 'MM/dd/yyyy';
    case 'DD.MM.YYYY':
      return 'dd.MM.yyyy';
    case 'YYYY.MM.DD':
      return 'yyyy.MM.dd';
    case 'YYYY/MM/DD':
      return 'yyyy/MM/dd';
    default:
      return dateFormat;
  }
};
