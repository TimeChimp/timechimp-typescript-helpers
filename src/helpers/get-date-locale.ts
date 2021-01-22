import { SupportedLocale } from '../common/models/types/supported-locales';
import { enUS, nl } from 'date-fns/locale';

export const getDateLocale = (locale: SupportedLocale) => {
  switch (locale) {
    case 'nl-NL':
      return nl;
    case 'en-US':
      return enUS;
  }
};
