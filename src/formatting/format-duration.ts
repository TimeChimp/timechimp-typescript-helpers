import { formatNumber } from './format-number';
import { DurationFormat } from '../common/models/types/duration-format';
import { NumberFormat } from '../common/models/types/number-format';

export const formatDuration = (
  seconds: number,
  format: DurationFormat = 'HH:mm',
  decimalFormat: NumberFormat = NumberFormat.Dot
) => {
  if (isNaN(seconds)) {
    seconds = 0;
  }

  let time = '';
  let isNegative = false;

  if (seconds < 0) {
    isNegative = true;
    seconds = Math.abs(seconds);
  }

  if (format === 'HH:mm:ss' || format === 'HH:mm') {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.round((seconds - hour * 3600) / 60);

    const formatedHour = hour < 10 ? `0${hour}` : hour;

    if (minute < 10) {
      time = `${formatedHour}:0${minute}`;
    } else {
      time = `${formatedHour}:${minute}`;
    }

    if (format === 'HH:mm:ss') {
      const second = Math.floor(seconds - hour * 3600 - minute * 60);
      if (second < 10) {
        time = `${time}:0${second}`;
      } else {
        time = `${time}:${second}`;
      }
    }
  } else if (format === 'decimal') {
    time = formatNumber(seconds / 3600, 2, decimalFormat);
  }

  if (isNegative) {
    time = `-${time}`;
  }

  return time;
};
