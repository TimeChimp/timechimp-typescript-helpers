import { filterBy } from '../filter-by';

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

describe('Filtering arrays', () => {
  it('should filter array on a property', () => {
    const filteredArray = filterBy<any>(array, ['client'], 'google');
    expect(filteredArray[0].client).toEqual('Google');
  });
});
