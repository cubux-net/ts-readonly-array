import append from '../src/append';

type L = readonly number[];
const input: L = [10, 20, 30];
const empty: L = [];
const backup = [...input];

it('empty input', () => {
  expect(append(empty, ...input)).toEqual(input);

  expect(empty).toHaveLength(0);
});

it('empty append', () => {
  expect(append(input)).toBe(input);

  expect(input).toEqual(backup);
});

it('normal', () => {
  expect(append(input, 42, 37)).toEqual([10, 20, 30, 42, 37]);

  expect(input).toEqual(backup);
});
