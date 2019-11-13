import { DateRange } from '../common/models/interfaces/date-range';
import { DateLocales } from '../common/models/interfaces/date-locales';
import { TcDate } from '../common/utils/date';

function getDefaults(dateLocales?: DateLocales): DateLocales {
    let locales = dateLocales;
    if (!locales) {
        locales = {
            today: 'Today',
            yesterday: 'Yesterday',
            thisWeek: 'This week',
            lastWeek: 'Last week',
            thisMonth: 'This week',
            lastMonth: 'Last week',
            thisQuarter: 'This quarter',
            lastQuarter: 'Last quarter',
            thisYear: 'This year',
            lastYear: 'Last year',
        }
    }
    return locales;
}

export function getDateRanges(dateLocales?: DateLocales): DateRange[] {
    const locales = getDefaults(dateLocales);
    return [
        {
            startDate: new TcDate().toDate(),
            endDate: new TcDate().toDate(),
            title: locales.today,
            view: 'day',
        },
        {
            startDate: new TcDate().subtract(1, 'day').toDate(),
            endDate: new TcDate().subtract(1, 'day').toDate(),
            title: locales.yesterday,
            view: 'day',
        },
        {
            startDate: new TcDate().startOf('week').toDate(),
            endDate: new TcDate().endOf('week').toDate(),
            title: locales.thisWeek,
            view: 'week',
        },
        {
            startDate: new TcDate()
                .subtract(1, 'week')
                .startOf('week')
                .toDate(),
            endDate: new TcDate()
                .subtract(1, 'week')
                .endOf('week')
                .toDate(),
            title: locales.lastWeek,
            view: 'week',
        },
        {
            startDate: new TcDate().startOf('month').toDate(),
            endDate: new TcDate().endOf('month').toDate(),
            title: locales.thisMonth,
            view: 'month',
        },
        {
            startDate: new TcDate()
                .subtract(1, 'month')
                .startOf('month')
                .toDate(),
            endDate: new TcDate()
                .subtract(1, 'month')
                .endOf('month')
                .toDate(),
            title: locales.lastMonth,
            view: 'month',
        },
        {
            startDate: new TcDate().startOf('quarter').toDate(),
            endDate: new TcDate().endOf('quarter').toDate(),
            title: locales.thisQuarter,
            view: 'quarter',
        },
        {
            startDate: new TcDate()
                .subtract(1, 'quarter')
                .startOf('quarter')
                .toDate(),
            endDate: new TcDate()
                .subtract(1, 'quarter')
                .endOf('quarter')
                .toDate(),
            title: locales.lastQuarter,
            view: 'quarter',
        },
        {
            startDate: new TcDate().startOf('year').toDate(),
            endDate: new TcDate().endOf('year').toDate(),
            title: locales.thisYear,
            view: 'year',
        },
        {
            startDate: new TcDate()
                .subtract(1, 'year')
                .startOf('year')
                .toDate(),
            endDate: new TcDate()
                .subtract(1, 'year')
                .endOf('year')
                .toDate(),
            title: locales.lastYear,
            view: 'year',
        },
    ];
}

export function getDateRangesSingle(dateLocales: DateLocales): DateRange[] {
    const locales = getDefaults(dateLocales);
    return [
        {
            startDate: new TcDate().toDate(),
            endDate: new TcDate().toDate(),
            title: locales.today,
            view: 'day',
        },
        {
            startDate: new TcDate().subtract(1, 'day').toDate(),
            endDate: new TcDate().subtract(1, 'day').toDate(),
            title: locales.yesterday,
            view: 'day',
        },
        {
            startDate: new TcDate().startOf('week').toDate(),
            endDate: new TcDate().endOf('week').toDate(),
            title: locales.thisWeek,
            view: 'week',
        },
        {
            startDate: new TcDate()
                .subtract(1, 'week')
                .startOf('week')
                .toDate(),
            endDate: new TcDate()
                .subtract(1, 'week')
                .endOf('week')
                .toDate(),
            title: locales.lastWeek,
            view: 'week',
        },
    ];
}
