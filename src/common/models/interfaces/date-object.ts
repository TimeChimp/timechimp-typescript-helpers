import { WeekStartDay } from '../types/week-start-day';
import { TcDateFormat } from '../types/date-format';

export interface DateObject {
  language: string;
  timezone: string;
  startOfWeek: WeekStartDay;
  dateFormat: TcDateFormat;
}
