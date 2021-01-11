import { WeekStartDay } from '../types/week-start-day';
import { DateFormat } from '../types/date-format';

export interface DateObject {
  language: string;
  timezone: string;
  startOfWeek: WeekStartDay;
  dateFormat: DateFormat;
}
