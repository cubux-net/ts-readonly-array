/**
 * Update item with a callback
 *
 * Creates new array from input `array` with item at offset `index` changed with
 * a given callback `updater`. A callback `updater(prev, index)` will receive
 * previous value and index.
 *
 * - Will throw `RangeError` when `index` is invalid.
 * - Will return input `array` when nothing to change (`===` check).
 *
 * ```js
 * const input = [10, 20, 30, 40];
 * update(input, 2, (v, i) => 1000 * i + v);
 * // => [10, 20, 2030, 40]
 * ```
 *
 * @param array Source array
 * @param index Offset to update
 * @param updater Callback to calculate new value
 */
function update<T>(
  array: readonly T[],
  index: number,
  updater: (prev: T, index: number) => T,
): readonly T[] {
  if (index < 0 || index >= array.length) {
    throw new RangeError(
      `index ${index} is our of range 0..${array.length - 1}`,
    );
  }

  const oldItem = array[index];
  const newItem = updater(oldItem, index);
  if (newItem === oldItem) {
    return array;
  }

  const next = [...array];
  next[index] = newItem;
  return next;
}

export default update;
