import {Observable} from "@stein197/observer";

/**
 * Represents a read-only value that can be observed. Could be used as a signature of a function argument or as an
 * interface that any value-based class could implement to provide only read-only abilities to the outer world.
 * @typeParam T - Type of value.
 */
export interface ReadonlyValue<T> extends Observable<(value: T) => void> {

	/**
	 * Return value.
	 * @returns Value.
	 */
	get(): T;
}
