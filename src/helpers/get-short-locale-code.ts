/**
 * Converts dash-separated locales to single-worded locale. It's useful for dayjs because it mostly uses them.
 * @param longLocaleCode - examples: en-US, nl-NL
 */
export const getShortLocaleCode = (longLocaleCode: string) => (longLocaleCode || '').split('-')[0];
