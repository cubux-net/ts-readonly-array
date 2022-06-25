import swap from '../src/swap';

type L = readonly number[];
const input: L = [10, 20, 30, 40, 50];
const backup = [...input];

it('out of bounds', () => {
  expect(() => swap(input, -1, 3)).toThrow(
    new RangeError(`1st index -1 is our of range 0..${input.length - 1}`),
  );
  expect(() => swap(input, 5, 3)).toThrow(
    new RangeError(`1st index 5 is our of range 0..${input.length - 1}`),
  );
  expect(() => swap(input, 6, 3)).toThrow(
    new RangeError(`1st index 6 is our of range 0..${input.length - 1}`),
  );

  expect(() => swap(input, 2, -1)).toThrow(
    new RangeError(`2nd index -1 is our of range 0..${input.length - 1}`),
  );
  expect(() => swap(input, 2, 5)).toThrow(
    new RangeError(`2nd index 5 is our of range 0..${input.length - 1}`),
  );
  expect(() => swap(input, 2, 6)).toThrow(
    new RangeError(`2nd index 6 is our of range 0..${input.length - 1}`),
  );

  expect(input).toEqual(backup);
});

it('normal', () => {
  expect(swap(input, 0, 2)).toEqual([30, 20, 10, 40, 50]);
  expect(swap(input, 0, 4)).toEqual([50, 20, 30, 40, 10]);
  expect(swap(input, 3, 4)).toEqual([10, 20, 30, 50, 40]);

  expect(input).toEqual(backup);
});

it('noop', () => {
  expect(swap(input, 1, 1)).toBe(input);

  expect(input).toEqual(backup);

  const withSame: L = [10, 42, 30, 40, 42, 60];
  const backupSame = [...withSame];
  expect(swap(withSame, 1, 4)).toBe(withSame);
  expect(withSame).toEqual(backupSame);
});
