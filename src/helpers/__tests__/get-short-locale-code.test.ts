import { getShortLocaleCode } from '../get-short-locale-code';

describe('getShortLocaleCode', () => {
  it('should get valid short code', () => {
    const conditions = [
      { input: 'en-US', output: 'en' },
      { input: 'nl-NL', output: 'nl' },
      { input: 'nl', output: 'nl' },
      { input: '', output: '' },
    ];

    conditions.forEach(({ input, output }) => {
      expect(getShortLocaleCode(input)).toBe(output);
    });
  });
});
