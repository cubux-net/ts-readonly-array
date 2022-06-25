import update from '../src/update';

type L = readonly number[];
const input: L = [10, 20, 30, 40, 50];
const backup = [...input];

it('out of bounds', () => {
  const inc = jest.fn((n: number) => n + 1);

  expect(() => update(input, -1, inc)).toThrow(
    new RangeError(`index -1 is our of range 0..${input.length - 1}`),
  );
  expect(() => update(input, 5, inc)).toThrow(
    new RangeError(`index 5 is our of range 0..${input.length - 1}`),
  );
  expect(() => update(input, 6, inc)).toThrow(
    new RangeError(`index 6 is our of range 0..${input.length - 1}`),
  );

  expect(inc).not.toHaveBeenCalled();

  expect(input).toEqual(backup);
});

it('normal', () => {
  const inc = jest.fn((n: number) => n + 1);

  expect(update(input, 0, inc)).toEqual([11, 20, 30, 40, 50]);
  expect(update(input, 1, inc)).toEqual([10, 21, 30, 40, 50]);
  expect(update(input, 3, inc)).toEqual([10, 20, 30, 41, 50]);
  expect(update(input, 4, inc)).toEqual([10, 20, 30, 40, 51]);

  expect(inc).toHaveBeenCalledTimes(4);
  expect(inc).toHaveBeenNthCalledWith(1, 10, 0);
  expect(inc).toHaveBeenNthCalledWith(2, 20, 1);
  expect(inc).toHaveBeenNthCalledWith(3, 40, 3);
  expect(inc).toHaveBeenNthCalledWith(4, 50, 4);

  expect(input).toEqual(backup);
});

it('noop', () => {
  const noop = jest.fn((n: number) => n);

  expect(update(input, 1, noop)).toBe(input);

  expect(noop).toHaveBeenCalledTimes(1);
  expect(noop).toHaveBeenNthCalledWith(1, 20, 1);

  expect(input).toEqual(backup);
});
