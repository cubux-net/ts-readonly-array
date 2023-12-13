# Changelog

## 2.0.0 (2023-12-13)

- **BREAKING**: Drop Node < 18.
- **BREAKING**: Add `typescript` from 3 to 5 to optional `peerDependencies`.

## 1.1.0 (2023-12-13)

- Add: `removeMatch()` removes some items matching the given predicate. It's a
  combination of `[].findIndex()` and `remove()` or `[].filter()` with inversion
  and limit.
- Add: `updateMatch()` updates some items matching the given predicate. It's a
  combination of `[].map()` with limit.

## 1.0.0 (2022-06-25)

- Initial release.
