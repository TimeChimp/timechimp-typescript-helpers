import { formatNumber } from './format-number';
import { DurationFormat } from '../common/models/types/duration-format';
import { NumberFormat } from '../common/models/types/number-format';

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

export const formatDuration = (
  seconds: number,
  format: DurationFormat = 'HH:mm',
  decimalFormat: NumberFormat = NumberFormat.Dot
) => {
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    seconds = 0;
  }

  let time = '';
  let isNegative = false;

  if (seconds < 0) {
    isNegative = true;
    seconds = Math.abs(seconds);
  }

  if (format === 'HH:mm:ss' || format === 'HH:mm') {
    const hour = Math.floor(seconds / SECONDS_IN_HOUR);
    const minute = seconds / SECONDS_IN_MINUTE - hour * 60;
    const roundedMinute = Math.floor(minute);

    const formatedHour = hour < 10 ? `0${hour}` : hour;
    const formatedMinute =
      roundedMinute < 10 ? `0${roundedMinute}` : roundedMinute;

    time = `${formatedHour}:${formatedMinute}`;

    if (format === 'HH:mm:ss') {
      const remainingSeconds =
        seconds - hour * SECONDS_IN_HOUR - roundedMinute * SECONDS_IN_MINUTE;
      const formatedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
      time = `${time}:${formatedSeconds}`;
    }
  } else if (format === 'decimal') {
    time = formatNumber(seconds / SECONDS_IN_HOUR, 2, decimalFormat);
  }

  if (isNegative) {
    time = `-${time}`;
  }

  return time;
};
