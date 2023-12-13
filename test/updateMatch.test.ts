import updateMatch from '../src/updateMatch';

it('updateMatch', () => {
  const a = [10, 20, 30, 40] as const;
  const inc = (n: number) => n + 1;

  expect(updateMatch(a, v => v % 20 === 0, inc)).toEqual([10, 21, 30, 40]);
  expect(updateMatch(a, v => v % 20 === 0, inc, -1)).toEqual([10, 21, 30, 41]);
  expect(updateMatch(a, v => v % 10 === 0, inc, 2)).toEqual([11, 21, 30, 40]);
  expect(updateMatch(a, v => v % 2, inc)).toBe(a);
  expect(updateMatch(a, v => v % 2 === 0, inc, -1)).toEqual([11, 21, 31, 41]);

  expect(updateMatch(a, v => v % 2, inc, 0)).toBe(a);

  expect(a).toEqual([10, 20, 30, 40]);
});
