import { TimeFormat } from '../common/models/types/time-format';

export const timePlaceholder = (timeFormat: TimeFormat) =>
  timeFormat === 'HH:mm' ? '00:00' : '0:00AM';
