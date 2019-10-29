import { fromUnixTime } from 'date-fns';
import { toDate, format } from 'date-fns-tz';
import { DateObject } from 'common/models/interfaces/date-object';

export class LocaleDate {
    private date: Date;
    private dateObject: DateObject;

    public constructor(input: number, dateObject: DateObject) {
        const utc = fromUnixTime(input);
        this.date = toDate(utc, {
            timeZone: dateObject.timezone
        });
        this.dateObject = dateObject
    }

    public toDate(): string {
        const { language, formatString, timezone } = this.dateObject;
        return format(this.date, formatString, {
            timeZone: timezone
            // TODO: Add locale - https://github.com/marnusw/date-fns-tz#time-zone-formatting
        });
    }
}
