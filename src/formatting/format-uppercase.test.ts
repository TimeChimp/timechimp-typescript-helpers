import { formatUppercase } from './format-uppercase';

describe('Uppercase', () => {
  it('Renders the uppercase version of the input string', () => {
    const testString = 'baltus';
    const result = formatUppercase(testString);
    expect(result).toEqual('Baltus');
  });
});
