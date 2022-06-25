/**
 * Insert items at the given offset
 *
 * Creates new array by inserting new `...items` into input `array` in offset
 * `index`.
 *
 * - Will throw `RangeError` when `index` is invalid.
 * - Will return input `array` without changes when nothing to insert.
 * - Allow appending with `index = array.length`.
 *
 * ```js
 * const input = [10, 20, 30];
 * insert(input, 2, 40, 50);
 * // [10, 20, 40, 50, 30]
 * ```
 *
 * @param array Source array
 * @param index Offset in `array` where to insert `items`
 * @param items Extra items to insert
 */
const insert = <T>(
  array: readonly T[],
  index: number,
  ...items: readonly T[]
): readonly T[] => {
  if (index < 0 || index > array.length) {
    throw new RangeError(`index ${index} is our of range 0..${array.length}`);
  }
  if (items.length === 0) {
    return array;
  }
  if (array.length === 0) {
    return items;
  }
  if (index === 0) {
    return [...items, ...array];
  }
  if (index === array.length) {
    return [...array, ...items];
  }
  return [...array.slice(0, index), ...items, ...array.slice(index)];
};

export default insert;
