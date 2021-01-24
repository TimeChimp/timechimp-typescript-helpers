import { formatToSeconds } from '../formatting/format-to-seconds';
import { TcDate } from './../common/utils/date';

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
