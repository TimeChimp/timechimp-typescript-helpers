import { SupportedLocale } from '../common/models/types/supported-locales';
import nl from 'date-fns/locale/nl';
import enGB from 'date-fns/locale/en-GB';
import de from 'date-fns/locale/de';
import fr from 'date-fns/locale/fr';
import pl from 'date-fns/locale/pl';
import es from 'date-fns/locale/es';

export const getDateLocale = (locale: SupportedLocale) => {
  const locales = {
    nl: nl,
    en: enGB,
    de: de,
    fr: fr,
    pl: pl,
    es: es,
  };

  return locales[locale];
};
