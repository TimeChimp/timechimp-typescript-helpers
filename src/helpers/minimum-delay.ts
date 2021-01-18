import dayjs from 'dayjs';

export const minimumDelay = (
  func: () => void,
  startTime: Date,
  mininumMs: number
): void => {
  const diff = dayjs().diff(startTime, 'millisecond');
  const ms = diff < mininumMs ? mininumMs - diff : 0;

  setTimeout(func, ms);
};
