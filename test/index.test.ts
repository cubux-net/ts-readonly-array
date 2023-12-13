import {
  append,
  insert,
  remove,
  removeMatch,
  set,
  swap,
  update,
  updateMatch,
} from '../src';

it('direct', () => {
  expect(append([10, 20], 30, 40, 50)).toEqual([10, 20, 30, 40, 50]);
  expect(insert([10, 20, 30], 2, 40, 50)).toEqual([10, 20, 40, 50, 30]);
  expect(remove([10, 20, 30], 1)).toEqual([10, 30]);
  expect(removeMatch([10, 20, 40], (n) => n % 20 === 0)).toEqual([10, 40]);
  expect(set([10, 20, 30, 40], 2, 42)).toEqual([10, 20, 42, 40]);
  expect(swap([10, 20, 30, 40], 0, 2)).toEqual([30, 20, 10, 40]);
  expect(update([10, 20, 30], 1, (n) => -n)).toEqual([10, -20, 30]);
  expect(
    updateMatch(
      [2, 3, 5],
      (n) => n % 2,
      (n) => -n,
    ),
  ).toEqual([2, -3, 5]);
});
