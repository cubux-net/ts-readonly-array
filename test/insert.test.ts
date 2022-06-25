import insert from '../src/insert';

type L = readonly number[];
const input: L = [10, 20, 30, 40, 50];
const empty: L = [];
const backup = [...input];

it('inserts into empty input', () => {
  expect(insert(empty, 0, 42, 37)).toEqual([42, 37]);

  expect(empty).toHaveLength(0);
});

it('invalid index', () => {
  expect(() => insert(input, -1)).toThrow(
    new RangeError(`index -1 is our of range 0..${input.length}`),
  );
  expect(() => insert(input, 999)).toThrow(
    new RangeError(`index 999 is our of range 0..${input.length}`),
  );
});

it('empty inserts', () => {
  expect(insert(input, 0)).toBe(input);
  expect(insert(input, input.length - 1)).toBe(input);
  expect(insert(input, input.length)).toBe(input);

  expect(input).toEqual(backup);
});

it('inserts', () => {
  expect(insert(input, 0, 42, 37)).toEqual([42, 37, 10, 20, 30, 40, 50]);
  expect(insert(input, 1, 42, 37)).toEqual([10, 42, 37, 20, 30, 40, 50]);
  expect(insert(input, input.length - 2, 42, 37)).toEqual([
    10,
    20,
    30,
    42,
    37,
    40,
    50,
  ]);
  expect(insert(input, input.length - 1, 42, 37)).toEqual([
    10,
    20,
    30,
    40,
    42,
    37,
    50,
  ]);
  expect(insert(input, input.length, 42, 37)).toEqual([
    10,
    20,
    30,
    40,
    50,
    42,
    37,
  ]);

  expect(input).toEqual(backup);
});
