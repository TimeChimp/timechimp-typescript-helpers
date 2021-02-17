import { SupportedLocale } from '../common/models/types/supported-locales';
import { enUS, enGB, nl } from 'date-fns/locale';

export const getDateLocale = (locale: SupportedLocale) => {
  const locales = {
    'nl-NL': nl,
    'en-US': enUS,
    'en-GB': enGB,
  };

  return locales[locale];
};
