/**
 * Append items
 *
 * Create new array containing items from input `array` and extra `...items` in
 * the end.
 *
 * - Will return input `array` without changes when nothing to append.
 *
 * ```js
 * const input = [10, 20, 30];
 * const output = append(input, 40, 50);
 * // [10, 20, 30, 40, 50]
 * ```
 *
 * **NOTICE**: By default this function should be avoided when you surely add at
 * least one element:
 *
 * ```js
 * // Better
 * [...array, item1, item2]
 * // Instead of |
 * append(array, item1, item2)
 * ```
 *
 * So, when appending items count can be zero:
 *
 * ```js
 * // This will always create new array
 * [...array, ...addItems]
 *
 * // will return origin `array` when `addItems` is empty array
 * append(array, ...addItems)
 * ```
 *
 * @param array Source array
 * @param items Extra items to append
 */
function append<T>(array: readonly T[], ...items: readonly T[]): readonly T[] {
  if (items.length === 0) {
    return array;
  }
  if (array.length === 0) {
    return items;
  }
  return [...array, ...items];
}

export default append;
