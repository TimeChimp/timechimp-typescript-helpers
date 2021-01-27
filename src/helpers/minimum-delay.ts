import { TcDate } from '../common/utils/date';

export const minimumDelay = (
  func: () => void,
  startTime: Date,
  mininumMs: number
): void => {
  const diff = new TcDate().diff(startTime, 'millisecond');
  const ms = diff < mininumMs ? mininumMs - diff : 0;

  setTimeout(func, ms);
};
