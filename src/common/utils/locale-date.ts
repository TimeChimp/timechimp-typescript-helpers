import { fromUnixTime } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
import { DateObject } from '../models/interfaces/date-object';

export class LocaleDate {
    private date: Date;
    private dateObject: DateObject;

    public constructor(input: number, dateObject: DateObject) {
        const utc = fromUnixTime(input);      
        this.date = utcToZonedTime(utc, dateObject.timezone);     
        this.dateObject = dateObject
    }

    public toDate(): string {
        const { dateFormat, timezone } = this.dateObject;
        return format(this.date, dateFormat, {
            timeZone: timezone
            // TODO: Add locale - https://github.com/marnusw/date-fns-tz#time-zone-formatting
        });
    }
}
