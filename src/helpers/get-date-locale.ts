import { SupportedLocale } from '../common/models/types/supported-locales';
import nl from 'date-fns/locale/nl';
import enGB from 'date-fns/locale/en-GB';
import de from 'date-fns/locale/de';

export const getDateLocale = (locale: SupportedLocale) => {
  const locales = {
    nl: nl,
    en: enGB,
    de: de,
  };

  return locales[locale];
};
