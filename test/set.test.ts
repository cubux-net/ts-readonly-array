import set from '../src/set';

type L = readonly number[];
const input: L = [10, 20, 30, 40, 50];
const backup = [...input];

it('out of bounds', () => {
  expect(() => set(input, -1, 42)).toThrow(
    new RangeError(`index -1 is our of range 0..${input.length - 1}`),
  );
  expect(() => set(input, 5, 42)).toThrow(
    new RangeError(`index 5 is our of range 0..${input.length - 1}`),
  );
  expect(() => set(input, 6, 42)).toThrow(
    new RangeError(`index 6 is our of range 0..${input.length - 1}`),
  );

  expect(input).toEqual(backup);
});

it('normal', () => {
  expect(set(input, 0, 42)).toEqual([42, 20, 30, 40, 50]);
  expect(set(input, 1, 42)).toEqual([10, 42, 30, 40, 50]);
  expect(set(input, 3, 42)).toEqual([10, 20, 30, 42, 50]);
  expect(set(input, 4, 42)).toEqual([10, 20, 30, 40, 42]);

  expect(input).toEqual(backup);
});

it('noop', () => {
  expect(set(input, 1, 20)).toBe(input);

  expect(input).toEqual(backup);
});
