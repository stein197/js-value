# JavaScript wrapper around values that can be observed
This package allows you to observe changes made on values.

## Installation
```
npm i @stein197/value
```

## Usage
The package includes only single class `Value`:
```ts
import Value from "@stein197/value";

const v = new Value(12);
v.on((oldValue, newValue) => console.log(oldValue, newValue)); // Adding an event listener. The callback takes two arguments - the old value and the new one
v.get(); // 12
v.set(12); // Does not fire an event because the new value is the same as the old one
v.set(24);
> 12 24
```

## NPM scripts
- `clean` cleans working directory from compiled files
- `ts` compiles source code
- `test` runs unit tests
- `build` all the previous scripts combined