import { TimeDisplay } from '../common/models/types/time-display';
import { TcDate } from '../common/utils/date';

export const secondsToHours = (seconds: number = 0) => seconds / 3600;

export const hoursToSeconds = (hours: number = 0) => hours * 3600;

interface FormatToSecondsResult {
  isValid: boolean;
  seconds: number | null;
}

export const formatToSeconds = (
  input: string | undefined,
  max24: boolean = true
): FormatToSecondsResult => {
  let result: FormatToSecondsResult = {
    isValid: false,
    seconds: null,
  };

  if (!input) {
    result.isValid = true;
    return result;
  }

  let isNegative = false;

  // replace comma/semicolon for dot
  input = input.replace(',', '.').replace(';', '.');

  // is negative value
  if (input.includes('-')) {
    input = input.replace('-', '');
    isNegative = true;
  }

  // 01:30    = 1.5 hour
  // 1:30     = 1.5 hour
  // :30      = 0.5 hour
  if (input.includes(':')) {
    const h = parseInt(input.split(':')[0], 10) || 0;
    const m = parseFloat(input.split(':')[1]) / 60;
    result.seconds = (h + m) * 3600;
  }

  // 1h30m       = 1.5 hour
  else if (input.includes('h') && input.includes('m')) {
    const a = input.split(/h|m/);
    const h = parseInt(a[0], 10) || 0;
    const m = parseFloat(a[1]) / 60;
    result.seconds = (h + m) * 3600;
  }

  // 1h       = 1 hour
  else if (input.includes('h')) {
    input = input.replace('h', '');
    result.seconds = parseFloat(input) * 3600;
  }

  // 1m       = 1 minute
  else if (input.includes('m')) {
    input = input.replace('m', '');
    result.seconds = parseFloat(input) * 60;
  }

  // 1.5      = 1.5 hour
  // .5       = 0.5 hour
  else if (input.includes('.')) {
    result.seconds = parseFloat(input) * 3600;
  }

  // 0130     = 1.5 hour
  // 130      = 1.5 hour
  else if (input.length === 3) {
    result.seconds = parseFloat(input) * 60;
  }

  // 0130     = 1.5 hour
  // 1130     = 11.5 hour
  else if (input.length === 4) {
    input = input.replace(/^0/, '');

    if (input.length === 3) {
      const h = parseInt(input[0], 10);
      const m = parseFloat(input[1] + input[2]) / 60;
      result.seconds = (h + m) * 3600;
    } else {
      const h = parseInt(input[0] + input[1], 10);
      const m = parseFloat(input[2] + input[3]) / 60;
      result.seconds = (h + m) * 3600;
    }
  }

  // 24       = 24 hour
  // 1        = 1 hour
  else {
    result.seconds = parseFloat(input) * 3600;
  }

  if (max24 && result.seconds > 24 * 3600) {
    result.seconds = 24 * 3600;
  }

  if (isNegative) {
    result.seconds = result.seconds * -1;
  }

  if (!isNaN(result.seconds)) {
    result.isValid = true;
  }

  return result;
};

export const formatToTime = (
  seconds: number,
  format: TimeDisplay = 'HH:mm'
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

  if (isNegative) {
    time = `-${time}`;
  }

  return time;
};

interface TimeResult {
  start: Date | null;
  end: Date | null;
  duration: number | null;
}

export const calculateTime = (
  date: Date,
  startInput?: string,
  endInput?: string,
  durationInput?: string
): TimeResult => {
  let startTime;
  let endTime;
  if (startInput) {
    startTime = new TcDate(date)
      .startOf('day')
      .add(formatToSeconds(startInput).seconds!, 'second');
  }

  if (endInput) {
    endTime = new TcDate(date)
      .startOf('day')
      .add(formatToSeconds(endInput).seconds!, 'second');
  }

  let duration = formatToSeconds(durationInput).seconds;

  if (startTime && endTime) {
    let differenceInMinutes = endTime.diff(startTime.toDate(), 'minute');

    if (differenceInMinutes < 0) {
      differenceInMinutes = 24 * 60 + differenceInMinutes;
      endTime = endTime.add(1, 'day');
    }

    duration = differenceInMinutes * 60; // convert minutes to seconds
  } else if (duration !== null && endTime) {
    startTime = endTime.subtract(duration, 'second');
  } else if (duration !== null && startTime) {
    endTime = startTime.add(duration, 'second');
  }

  return {
    start: startTime ? startTime.toDate() : null,
    end: endTime ? endTime.toDate() : null,
    duration,
  };
};
