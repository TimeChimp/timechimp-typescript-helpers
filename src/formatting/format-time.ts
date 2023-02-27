import { convertMillisToHrsMins, convertMillisToHrsMinsSecs } from '../helpers';

export const formatHoursAsHrsMinsSecs = (
  hours: number,
  showSeconds = false
) => {
  const millis = hours * 3600000;

  if (showSeconds) {
    const { hours: h, minutes: m, seconds: s } = convertMillisToHrsMinsSecs(
      millis
    );
    return `${h}:${m}:${s}`;
  }

  const { hours: h, minutes: m } = convertMillisToHrsMins(millis);
  return `${h}:${m}`;
};

export const formatMillisAsHrsMinsSecs = (
  millis: number,
  showSeconds = false
) => {
  if (showSeconds) {
    const { hours: h, minutes: m, seconds: s } = convertMillisToHrsMinsSecs(
      millis
    );
    return `${h}:${m}:${s}`;
  }

  const { hours: h, minutes: m } = convertMillisToHrsMins(millis);
  return `${h}:${m}`;
};
