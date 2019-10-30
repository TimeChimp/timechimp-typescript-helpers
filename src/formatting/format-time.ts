import { formatNumber } from './format-number';
import { TimeFormat } from '@/common/models/types/time-format';

export function formatTime(seconds: number, format: TimeFormat) {
    if (isNaN(seconds)) {
        seconds = 0;
    }

    let time = '';
    let isNegative = false;

    if (seconds < 0) {
        isNegative = true;
        seconds = Math.abs(seconds);
    }

    if (format === 'HH:mm:ss') {
        const hour = Math.floor(seconds / 3600);
        const minute = Math.floor((seconds - hour * 3600) / 60);
        const second = Math.floor(seconds - hour * 3600 - minute * 60);

        const formatedHour = hour < 10 ? `0${hour}` : hour;

        if (minute < 10) {
            time = `${formatedHour}:0${minute}`;
        } else {
            time = `${formatedHour}:${minute}`;
        }

        if (second < 10) {
            time = `${time}:0${second}`;
        } else {
            time = `${time}:${second}`;
        }
    } else if (format === 'HH:mm') {
        const hour = Math.floor(seconds / 3600);
        const minute = Math.round((seconds - hour * 3600) / 60);

        const formatedHour = hour < 10 ? `0${hour}` : hour;

        if (minute < 10) {
            time = `${formatedHour}:0${minute}`;
        } else {
            time = `${formatedHour}:${minute}`;
        }
    } else if (format === 'decimal') {
        time = formatNumber(seconds / 3600);
    } else {
        // TODO
        // time = moment.utc(moment.duration(seconds, 's').asMilliseconds()).format(format);
    }

    if (isNegative) {
        time = `-${time}`;
    }
    return time;
}
