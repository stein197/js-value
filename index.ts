import {Observer} from "@stein197/observer";

export = Value;

/**
 * Observable class which wraps passed values and observes them to change.
 * Usage:
 * ```ts
 * const value = new Value("string");
 * value.on(string => console.log(string));
 * value.set("new string");
 * > "string"
 * ```
 * @typaParam T - Type of passed value.
 */
class Value<T> {

	private readonly observer = new Observer<(oldValue: T, newValue: T) => void>();

	/**
	 * Instantiates a wrapper with the passed value.
	 * @param value Initial value.
	 */
	public constructor(private value: T) {}

	/**
	 * Return the current value.
	 * @returns The current value.
	 */
	public get(): T {
		return this.value;
	}

	/**
	 * Set the value and fires listeners on change. An event is fired only when the value changes. The value is
	 * considered to be changed, when the new value is not equal to the old one. The comparison is done by reference, so
	 * if the value is an object, make sure to pass a new instance.
	 * @param value New value
	 */
	public set(value: T): void {
		if (value !== this.value)
			this.observer.dispatch(this.value, this.value = value);
	}

	public on(listener: (oldValue: T, newValue: T) => void): void {
		this.observer.addListener(listener);
	}

	public off(listener: (oldValue: T, newValue: T) => void): void {
		this.observer.removeListener(listener);
	}

	public once(listener: (oldValue: T, newValue: T) => void): void {
		this.observer.onceListener(listener);
	}
}
