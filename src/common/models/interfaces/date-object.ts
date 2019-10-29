import { WeekStartDay } from '../types/week-start-day';

export interface DateObject {
    language: string;
    timezone: string;
    startOfWeek: WeekStartDay;
    formatString: string;
}
