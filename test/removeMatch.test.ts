import removeMatch from '../src/removeMatch';

it('removeMatch', () => {
  const input = [10, 20, 30, 40] as const;

  expect(removeMatch(input, (v) => v % 20 === 0)).toEqual([10, 30, 40]);
  expect(removeMatch(input, (v) => v % 20 === 0, -1)).toEqual([10, 30]);
  expect(removeMatch(input, (v) => v % 10 === 0, 2)).toEqual([30, 40]);
  expect(removeMatch(input, (v) => v % 2)).toBe(input);
  expect(removeMatch(input, (v) => v % 2 === 0, -1)).toEqual([]);

  expect(removeMatch(input, (v) => v % 2, 0)).toBe(input);

  expect(input).toEqual([10, 20, 30, 40]);
});
