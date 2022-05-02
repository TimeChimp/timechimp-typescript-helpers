import { convertMillisToHrsMinsSecs } from '../helpers';

export const formatHoursAsHrsMinsSecs = (
  hours: number,
  showSeconds = false
) => {
  const millis = hours * 3600000;
  const { hours: h, minutes: m, seconds: s } = convertMillisToHrsMinsSecs(
    millis
  );

  if (showSeconds) {
    return `${h}:${m}:${s}`;
  }
  return `${h}:${m}`;
};

export const formatMillisAsHrsMinsSecs = (
  millis: number,
  showSeconds = false
) => {
  const { hours: h, minutes: m, seconds: s } = convertMillisToHrsMinsSecs(
    millis
  );

  if (showSeconds) {
    return `${h}:${m}:${s}`;
  }
  return `${h}:${m}`;
};
