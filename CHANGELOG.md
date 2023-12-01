# CHANGELOG
## [Unreleased]

## [2.0.0](../../compare/1.1.0..2.0.0) - 2023-12-01
### Added
- `ts`, `build` scripts

### Changed
- Updated TypeScript version (4.4.4 -> 5.3.2)
- Class `Value`: methods `addListener()`, `removeListener()` and `onceListener()` were renamed to `on()`, `off()` and `once()`

### Removed
- Files: `clean.bat`, `clean.sh`
- Scripts: `precompile`, `compile`, `prebundle`, `bundle`, `pretest`
- Dependencies: `@types/lodash`, `mocha`, `rollup`
- Classes: `Container`
- Interfaces: `ReadonlyContainer`, `ReadonlyValue`

## [1.1.0](../../compare/1.0.0..1.1.0) - 2022-11-01
### Changed
- Complex objects now treated as simple ones without observing minor changes in their inner fields. Use `Container` instead

### Removed
- `lodash` dependency

## [1.0.0](../../tree/1.0.0) - 2021-10-30
Release
