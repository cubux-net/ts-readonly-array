# `@cubux/readonly-array`

[![NPM latest](https://img.shields.io/npm/v/@cubux/readonly-array.svg)](https://www.npmjs.com/package/@cubux/readonly-array)

A bunch of helper functions to work with read-only arrays. Works internally with
native arrays without any kind of magic.

```ts
import { insert, remove } from '@cubux/readonly-array';

const input: readonly number[] = [10, 20, 30];

console.log(insert(input, 1, 42, 37));
// => [10, 42, 37, 20, 30]

console.log(remove(input, 1));
// => [10, 30]
console.log(remove(input, 1, 2));
// => [10]
```

Alternative usage:

```ts
import * as RoArray from '@cubux/readonly-array';

const input: readonly number[] = [10, 20, 30];
console.log(RoArray.insert(input, 1, 42, 37));
// => [10, 42, 37, 20, 30]
```

## Use Cases

### State management

```tsx
import { FC, useState } from 'react';
import { insert, remove, set } from '@cubux/readonly-array';

const TodoList: FC = () => {
  const [items, setItems] = useState<readonly string[]>([]);

  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          <button
            onClick={() => setItems(list => insert(list, i, ''))}
          >
            INS
          </button>
          <button
            onClick={() => setItems(list => remove(list, i))}
          >
            DEL
          </button>
          <input
            value={item}
            onChange={(e) => setItems(list => set(list, i, e.target.value))}
          />
        </li>
      ))}
      <li>
        <button onClick={() => setItems(list => [...list, ''])}>ADD</button>
      </li>
    </ul>
  );
};
```

## Install

```sh
npm i @cubux/readonly-array
```

## API

### `append()`

```ts
append(
  array:    readonly T[],
  ...items: readonly T[],
): readonly T[]
```

Creates a new array containing items from input `array` and extra `...items` in
the end.

- Will return input `array` without changes when nothing to append.

```js
const input = [10, 20, 30];
append(input, 40, 50);
// [10, 20, 30, 40, 50]
```

**NOTICE**: By default this function should be avoided when you surely add at
least one element:

```js
// Better
[...array, item1, item2]
// Instead of
append(array, item1, item2)
```

So, when appending items count can be zero:

```js
// This will always create new array
[...array, ...addItems]

// But this will return origin `array` when `addItems` is empty array
append(array, ...addItems)
```

### `insert()`

```ts
insert(
  array:    readonly T[],
  index:    number,
  ...items: readonly T[],
): readonly T[]
```

Creates new array by inserting new `...items` into input `array` in offset
`index`.

- Will throw `RangeError` when `index` is invalid.
- Will return input `array` without changes when nothing to insert.
- Allow appending with `index = array.length`.

```js
const input = [10, 20, 30];
insert(input, 2, 40, 50);
// [10, 20, 40, 50, 30]
```

### `remove()`

```ts
remove(
  array:  readonly T[],
  start:  number,
  length: number = 1,
): readonly T[]
```

Creates new array by omitting `length` items from input `array` at `start`
offset.

- Will throw `RangeError` when `index` is invalid or `length` is negative.
- Will return input `array` when length is `0`.
- Value of `length` can safely lead out of `array.length`.

```js
const input = [10, 20, 30, 40];
remove(input, 1);     // => [10, 30, 40]
remove(input, 1, 2);  // => [10, 40]
remove(input, 1, 10); // => [10]
```

### `removeMatch()`

```ts
removeMatch<T>(
  array:           readonly T[],
  removePredicate: (value: T, index: number) => unknown,
  limit:           number = 1,
): readonly T[]
```

Remove items matching the given predicate

Creates new array from the input `array` by *omitting* items *matching*
predicate `removePredicate`. This is opposite to `Array.prototype.filter()`.

Positive `limit` (defaults to `1`) will omit at most that number of items.
Negative `limit` means "no limit".

- Will return input `array` when it's nothing to change.

```js
const input = [10, 20, 30, 40];
removeMatch(input, (v) => v % 20 === 0);
// => [10, 30, 40]
removeMatch(input, (v) => v % 10 === 0, 2);
// => [30, 40]
removeMatch(input, (v) => v % 2);
// => [10, 20, 30, 40]
removeMatch(input, (v) => v % 2 === 0, -1);
// => []
```

### `set()`

```ts
set(
  array: readonly T[],
  index: number,
  value: T,
): readonly T[]
```

Creates new array from input `array` with item at offset `index` changed to
`value`.

- Will throw `RangeError` when `index` is invalid.
- Will return input `array` when nothing to change (`===` check).

```js
const input = [10, 20, 30, 40];
set(input, 2, 42);
// => [10, 20, 42, 40]

// instead of
const next = [...input];
next[2] = 42;
next
```

### `swap()`

```ts
swap(
  array: readonly T[],
  i:     number,
  j:     number,
): readonly T[]
```

Creates new array from source `array` by swapping two items at indices `i` and
`j`.

- Will throw `RangeError` when either `i` or `j` is invalid.
- Will return input `array` when nothing to change (`===` check for indices
  and items values).

```js
const input = [10, 20, 30, 40];
swap(input, 2, 3);
// => [10, 30, 20, 40]
```

### `update()`

```ts
update(
  array:   readonly T[],
  index:   number,
  updater: (prev: T, index: number) => T,
): readonly T[]
```

Creates new array from input `array` with item at offset `index` changed with
a given callback `updater`. A callback `updater(prev, index)` will receive
previous value and index.

- Will throw `RangeError` when `index` is invalid.
- Will return input `array` when nothing to change (`===` check).

```js
const input = [10, 20, 30, 40];
update(input, 2, (v, i) => 1000 * i + v);
// => [10, 20, 2030, 40]
```

### `updateMatch()`

```ts
update(
  array:     readonly T[],
  predicate: (value: T, index: number) => T,
  updater:   (prev: T, index: number) => T,
  limit:     number = 1,
): readonly T[]
```

Creates new array from input `array` with some item matching `predicate` (at
most `limit`) updated by `updater`.

Callbacks `predicate(value, index)` and `updater(prev, index)` will receive item
value and index. The `predicate` returns whether the given item need be updated.
The `updater` will be called for those items matched by `predicated` until
`limit` exceeds.

Positive `limit` (defaults to `1`) will update at most that number of items.
Negative `limit` means "no limit".

- `limit` applies to `predicate` only without care if some previous item was
  actually changed by `updater`.
- Will return input `array` when nothing to change (`===` check).

```js
const input = [10, 20, 30, 40];
updateMatch(input, v => v % 20 === 0, (v, i) => 1000 * i + v);
// => [10, 1020, 30, 40]
```
