/**
 * Assign item in array
 *
 * Creates new array from input `array` with item at offset `index` changed to
 * `value`.
 *
 * - Will throw `RangeError` when `index` is invalid.
 * - Will return input `array` when nothing to change (`===` check).
 *
 * ```js
 * const input = [10, 20, 30, 40];
 * set(input, 2, 42);
 * // => [10, 20, 42, 40]
 *
 * // instead of
 * const next = [...input];
 * next[2] = 42;
 * next
 * ```
 *
 * @param array Source array
 * @param index Offset to assign in
 * @param value New value to assign
 */
const set = <T>(array: readonly T[], index: number, value: T): readonly T[] => {
  if (index < 0 || index >= array.length) {
    throw new RangeError(
      `index ${index} is our of range 0..${array.length - 1}`,
    );
  }
  if (value === array[index]) {
    return array;
  }

  const next = [...array];
  next[index] = value;
  return next;
};

export default set;
