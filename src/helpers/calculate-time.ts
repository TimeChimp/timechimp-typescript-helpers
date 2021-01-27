import { TimeParser } from '../common/utils/time-parser';
import { TcDate } from './../common/utils/date';

interface TimeResult {
  start: Date | null;
  end: Date | null;
  duration: number | null | undefined;
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
      .add(new TimeParser(startInput).parse().seconds!, 'second');
  }

  if (endInput) {
    endTime = new TcDate(date)
      .startOf('day')
      .add(new TimeParser(endInput).parse().seconds!, 'second');
  }

  let duration = new TimeParser(durationInput).parse().seconds;

  if (startTime && endTime) {
    let differenceInMinutes = endTime.diff(startTime.toDate(), 'minute');

    if (differenceInMinutes < 0) {
      differenceInMinutes = 24 * 60 + differenceInMinutes;
      endTime = endTime.add(1, 'day');
    }

    duration = differenceInMinutes * 60; // convert minutes to seconds
  } else if (duration && endTime) {
    startTime = endTime.subtract(duration, 'second');
  } else if (duration && startTime) {
    endTime = startTime.add(duration, 'second');
  }

  return {
    start: startTime ? startTime.toDate() : null,
    end: endTime ? endTime.toDate() : null,
    duration: duration ? duration : null,
  };
};
