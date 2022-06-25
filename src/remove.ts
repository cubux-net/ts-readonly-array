/**
 * Remove items at the given offset
 *
 * Creates new array by omitting `length` items from input `array` at `start`
 * offset.
 *
 * - Will throw `RangeError` when `index` is invalid or `length` is negative.
 * - Will return input `array` when length is `0`.
 * - Value of `length` can safely lead out of `array.length`.
 *
 * ```js
 * const input = [10, 20, 30, 40];
 * remove(input, 1);     // => [10, 30, 40]
 * remove(input, 1, 2);  // => [10, 40]
 * remove(input, 1, 10); // => [10]
 * ```
 *
 * @param array Source array
 * @param start Offset in `array` where to start
 * @param length Number of items to remove
 */
const remove = <T>(
  array: readonly T[],
  start: number,
  length = 1,
): readonly T[] => {
  if (start < 0 || start >= array.length) {
    throw new RangeError(
      `index ${start} is our of range 0..${array.length - 1}`,
    );
  }
  if (length < 0) {
    throw new RangeError('negative length');
  }
  if (length === 0) {
    return array;
  }
  if (start === 0) {
    return array.slice(length);
  }
  if (start >= array.length - length) {
    return array.slice(0, start);
  }
  return [...array.slice(0, start), ...array.slice(start + length)];
};

export default remove;
