# JavaScript wrapper around values that can be observed
This package allows you to observe changes made on different values.

## Installation
```
npm i @stein197/value-observer
```

## Usage
The package comes with two classes: `Value` and `Container`. The first one is just a simple wrapper that could be used as follows:
```ts
import {Value} from "@stein197/value-observer";

const v = new Value(12);
v.addListener((oldValue, newValue) => console.log(oldValue, newValue)); // Adding an event listener. The callback takes two arguments - old value before chaging and the new one (current)
v.get(); // 12
v.set(12); // Does not fire an event because the new value is the same as the old one
v.set(24);
> 12 24
```

And the second class bundles a group of different values that can be tracked (which used `Value` class inside):
```ts
import {Container} from "@stein197/value-observer";

const c = new Container({
	age: 12,
	name: "John",
	status: "Online"
});
c.addEventListener("status", (oldValue, newValue) => console.log(oldValue, newValue)); // Tracking the change of "status" field. The usage is the same as the addListener above
c.get(); // {age: 12, name: "John", status: "Online"}
c.get("status"); // "Online"
c.set("age", 24); // Does not call the listener above
c.set("status", "Offline");
> "Online" "Offline"
```

The package also provides two interfaces similar to the classes discussed above: `ReadonlyValue` and `ReadonlyContainer` which could be used as a signature parameter in TypeScript code or implemented in other classes. "Readonly" means that the value cannot be set - only read and listen to changes:
```ts
import {ReadonlyValue, ReadonlyContainer} from "@stein197/value-observer";

function observe(value: ReadonlyValue<boolean>): void {
	value.get(); // Ok
	value.addListener(console.log); // Ok
	value.set(true); // Compile-time error
}

class AnotherContainer implements ReadonlyContainer<string> {/* ... */}

```

## NPM scripts
- `clean` cleans working directory from compiled files
- `compile` compiles source code
- `bundle` bundles compiled code into a single file
- `test` runs unit tests