import {Observable, Observer} from "@stein197/observer";
import lodash from "lodash";

export default class Value<T> implements Observable<(value: T) => void> {

	private readonly observer = new Observer<(value: T) => void>();

	public constructor(private value: T) {}

	public get(): T {
		return this.value;
	}

	public set(value: T): void {
		if (lodash.isEqual(this.value, value))
			return;
		this.value = value;
		this.observer.notify(value);
	}

	public addListener(listener: (value: T) => void): void {
		this.observer.addListener(listener);
	}

	public removeListener(listener: (value: T) => void): void {
		this.observer.removeListener(listener);
	}
}
