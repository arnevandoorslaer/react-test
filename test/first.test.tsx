import { First } from '../src/core/types/first.type';

describe('should create type from first array element', () => {
  type arr1 = ['a', 'b', 'c'];
  type arr2 = [3, 2, 1];

  it('should correctly extract the type of the first element from arr1', () => {
    type head1 = First<arr1>;
    expect<head1>('a').toBe<'a'>('a');
  });

  it('should correctly extract the type of the first element from arr2', () => {
    type head2 = First<arr2>;
    expect<head2>(3).toBe<3>(3);
  });
});
