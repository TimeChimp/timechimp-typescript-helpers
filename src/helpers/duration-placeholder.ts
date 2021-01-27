import { DurationFormat } from '../common/models/types/duration-format';

export const durationPlaceholder = (durationFormat: DurationFormat) =>
  durationFormat === 'decimal' ? '0.00' : '00:00';
