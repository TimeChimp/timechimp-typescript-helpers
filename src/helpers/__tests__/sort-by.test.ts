import { sortBy } from '../sort-by';

const array: any = [
  {
    client: 'Sony',
    task: 'Design',
  },
  {
    client: 'Apple',
    task: 'Analyse',
  },
  {
    client: 'Google',
    task: 'Development',
  },
];

describe('Sorting arrays', () => {
  it('should sort array on a property from A - Z', () => {
    const sortedArray = sortBy<any>(array, ['client']);
    expect(sortedArray[0].client).toEqual('Apple');
  });
});
