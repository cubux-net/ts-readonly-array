import remove from '../src/remove';

type L = readonly number[];
const input: L = [10, 20, 30, 40, 50];
const backup = [...input];

it('out of bounds', () => {
  expect(() => remove(input, -1)).toThrow(
    new RangeError(`index -1 is our of range 0..${input.length - 1}`),
  );
  expect(() => remove(input, 5)).toThrow(
    new RangeError(`index 5 is our of range 0..${input.length - 1}`),
  );
  expect(() => remove(input, 999)).toThrow(
    new RangeError(`index 999 is our of range 0..${input.length - 1}`),
  );

  expect(() => remove(input, 1, -3)).toThrow(new RangeError('negative length'));
});

it('length beyond end', () => {
  expect(remove(input, 3, 3)).toEqual([10, 20, 30]);
  expect(remove(input, 4, 3)).toEqual([10, 20, 30, 40]);

  expect(input).toEqual(backup);
});

it('normal', () => {
  expect(remove(input, 0)).toEqual([20, 30, 40, 50]);
  expect(remove(input, 1)).toEqual([10, 30, 40, 50]);
  expect(remove(input, 3)).toEqual([10, 20, 30, 50]);
  expect(remove(input, 4)).toEqual([10, 20, 30, 40]);

  expect(remove(input, 0, 2)).toEqual([30, 40, 50]);
  expect(remove(input, 1, 2)).toEqual([10, 40, 50]);
  expect(remove(input, 3, 2)).toEqual([10, 20, 30]);

  expect(remove(input, 0, 5)).toEqual([]);

  expect(input).toEqual(backup);
});

it('noop', () => {
  expect(remove(input, 2, 0)).toBe(input);

  expect(input).toEqual(backup);
});
