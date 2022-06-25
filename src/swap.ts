/**
 * Swap two items in array
 *
 * Creates new array from source `array` by swapping two items at indices `i` and
 * `j`.
 *
 * - Will throw `RangeError` when either `i` or `j` is invalid.
 * - Will return input `array` when nothing to change (`===` check for indices
 *   and items values).
 *
 * ```js
 * const input = [10, 20, 30, 40];
 * swap(input, 2, 3);
 * // => [10, 30, 20, 40]
 * ```
 *
 * @param array Source array
 * @param i Index 1
 * @param j Index 2
 */
const swap = <T>(array: readonly T[], i: number, j: number): readonly T[] => {
  if (i < 0 || i >= array.length) {
    throw new RangeError(
      `1st index ${i} is our of range 0..${array.length - 1}`,
    );
  }
  if (j < 0 || j >= array.length) {
    throw new RangeError(
      `2nd index ${j} is our of range 0..${array.length - 1}`,
    );
  }

  if (i === j || array[i] === array[j]) {
    return array;
  }

  const next = [...array];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

export default swap;
