/**
 * Converts dash-separated locales to single-worded locale.
 * @param longLocaleCode - examples: en-US, nl-NL
 */
export const getShortLocaleCode = (longLocaleCode: string) =>
  (longLocaleCode || '').split('-')[0];
