/**
 * Remove items matching the given predicate
 *
 * Creates new array from the input `array` by *omitting* items *matching*
 * predicate `removePredicate`. This is opposite to `Array.prototype.filter()`.
 *
 * Positive `limit` (defaults to `1`) will omit at most that number of items.
 * Negative `limit` means "no limit".
 *
 * - Will return input `array` when it's nothing to change.
 *
 * ```js
 * const input = [10, 20, 30, 40];
 * removeMatch(input, (v) => v % 20 === 0);
 * // => [10, 30, 40]
 * removeMatch(input, (v) => v % 10 === 0, 2);
 * // => [30, 40]
 * removeMatch(input, (v) => v % 2);
 * // => [10, 20, 30, 40]
 * removeMatch(input, (v) => v % 2 === 0, -1);
 * // => []
 * ```
 *
 * @param array Source array
 * @param removePredicate A callback to check whether the item need be removed
 * @param limit Limit number of items to remove
 */
function removeMatch<T>(
  array: readonly T[],
  removePredicate: (value: T, index: number) => unknown,
  limit = 1,
): readonly T[] {
  if (limit === 0) {
    return array;
  }
  const next: T[] = [];
  for (let i = 0, L = array.length; i < L; i++) {
    // here only previously positive became can become 0
    if (limit === 0) {
      // add all the rest and done
      next.push(...array.slice(i));
      break;
    }

    const value = array[i];
    // if (limit < 0) t.i. no limit
    // or (limit > 0) still
    // positive limit will not reach 0 here
    if (removePredicate(value, i)) {
      // skip current item
      // and reduce positive limit until 0
      if (limit > 0) {
        limit--;
      }
    } else {
      next.push(value);
    }
  }
  return next.length === array.length ? array : next;
}

export default removeMatch;
