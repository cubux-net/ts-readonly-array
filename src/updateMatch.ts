/**
 * Update some matching items with a callback
 *
 * Creates new array from input `array` with some item matching `predicate` (at
 * most `limit`) updated by `updater`.
 *
 * Callbacks `predicate(value, index)` and `updater(prev, index)` will receive
 * item value and index. The `predicate` returns whether the given item need be
 * updated. The `updater` will be called for those items matched by `predicated`
 * until `limit` exceeds.
 *
 * Positive `limit` (defaults to `1`) will update at most that number of items.
 * Negative `limit` means "no limit".
 *
 * - `limit` applies to `predicate` only without care if some previous item was
 *   actually changed by `updater`.
 * - Will return input `array` when nothing to change (`===` check).
 *
 * @param array Source array
 * @param predicate Callback to check whether the item need be updated
 * @param updater Callback to calculate new value
 * @param limit Limit number of items to remove
 */
function updateMatch<T>(
  array: readonly T[],
  predicate: (value: T, index: number) => unknown,
  updater: (prev: T, index: number) => T,
  limit = 1,
): readonly T[] {
  if (limit === 0) {
    return array;
  }
  const next = [...array];
  let changed = false;
  for (let i = 0, L = array.length; i < L; i++) {
    // here only previously positive became can become 0
    if (limit === 0) {
      // done
      break;
    }

    const value = array[i];
    if (predicate(value, i)) {
      const nextItem = updater(value, i);
      if (nextItem !== value) {
        next[i] = nextItem;
        changed = true;
      }
      if (limit > 0) {
        limit--;
      }
    }
  }
  return changed ? next : array;
}

export default updateMatch;
