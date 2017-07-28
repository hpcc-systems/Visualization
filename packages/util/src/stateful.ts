import { hashSum } from "./hashSum";
import { IObserverHandle, Observable } from "./observer";

export interface IEvent {
    id: string;
    oldValue: any;
    newValue: any;
}

export type StatePropCallback = (changes: IEvent) => void;
export type StateCallback = (changes: IEvent[]) => void;
export type StateEvents = "propChanged" | "changed";
export class StateObject<U, I> {
    private _espState: U = {} as U;
    private _espStateCache: { [key: string]: string } = {};
    private _events = new Observable<StateEvents>();

    protected clear(newVals?: Partial<I>) {
        this._espState = {} as U;
        this._espStateCache = {};
        if (newVals !== void 0) {
            this.set(newVals as I);
        }
    }

    protected get(): U;
    protected get<K extends keyof U>(key: K, defValue?: U[K]): U[K];
    protected get<K extends keyof U>(key?: K, defValue?: U[K]): U | U[K] | undefined {
        if (key === void 0) {
            return this._espState;
        }
        return this.has(key) ? this._espState[key] : defValue;
    }

    protected set(newVals: I): IEvent[];
    protected set<K extends keyof U>(key: K, newVal: U[K], batchMode?: boolean): IEvent;
    protected set<K extends keyof U>(keyOrNewVals: K | U, newVal?: U[K], batchMode: boolean = false): IEvent[] | IEvent | null {
        if (typeof keyOrNewVals === "string") {
            return this.setSingle(keyOrNewVals, newVal as U[K], batchMode);
        }
        return this.setAll(keyOrNewVals as Partial<U>);
    }

    private setSingle<K extends keyof U>(key: K, newVal: U[K], batchMode: boolean): IEvent | null {
        const oldCacheVal = this._espStateCache[(key as string)];
        const newCacheVal = hashSum(newVal);
        if (oldCacheVal !== newCacheVal) {
            this._espStateCache[key] = newCacheVal;
            const oldVal = this._espState[key];
            this._espState[key] = newVal;
            const changedInfo: IEvent = { id: key, oldValue: oldVal, newValue: newVal };
            if (!batchMode) {
                this._events.dispatchEvent("propChanged", changedInfo);
                this._events.dispatchEvent("changed", [changedInfo]);
            }
            return changedInfo;
        }
        return null;
    }

    private setAll(_: Partial<U>): IEvent[] {
        const changed: IEvent[] = [];
        for (const key in _) {
            if (_.hasOwnProperty(key)) {
                const changedInfo = this.setSingle(key, _[key]!, true);
                if (changedInfo) {
                    changed.push(changedInfo);
                }
            }
        }
        if (changed.length) {
            for (const changeInfo of changed) {
                this._events.dispatchEvent(("propChanged"), changeInfo);
            }
            this._events.dispatchEvent(("changed"), changed);
        }
        return changed;
    }

    protected has<K extends keyof U>(key: K): boolean {
        return this._espState[key] !== void 0;
    }

    addObserver(eventID: StateEvents, callback: StateCallback): IObserverHandle;
    addObserver(eventID: StateEvents, propID: keyof U, callback: StatePropCallback): IObserverHandle;
    addObserver(eventID: StateEvents, propIDOrCallback: StateCallback | keyof U, callback?: StatePropCallback): IObserverHandle {
        if (this.isCallback(propIDOrCallback)) {
            if (eventID !== "changed") throw new Error("Invalid eventID:  " + eventID);
            return this._events.addObserver(eventID, propIDOrCallback);
        } else {
            if (eventID !== "propChanged") throw new Error("Invalid eventID:  " + eventID);
            return this._events.addObserver(eventID, (changeInfo: IEvent) => {
                if (changeInfo.id === propIDOrCallback) {
                    callback!(changeInfo);
                }
            });
        }
    }

    on(eventID: StateEvents, callback: StateCallback): this;
    on(eventID: StateEvents, propID: keyof U, callback: StatePropCallback): this;
    on(eventID: StateEvents, propIDOrCallback: StateCallback | keyof U, callback?: StatePropCallback): this {
        if (this.isCallback(propIDOrCallback)) {
            switch (eventID) {
                case "changed":
                    this._events.addObserver(eventID, propIDOrCallback);
                default:
            }
        } else {
            switch (eventID) {
                case "propChanged":
                    this._events.addObserver(eventID, (changeInfo: IEvent) => {
                        if (changeInfo.id === propIDOrCallback) {
                            callback!(changeInfo);
                        }
                    });
                default:
            }
        }
        return this;
    }

    protected isCallback(propIDOrCallback: StateCallback | keyof U): propIDOrCallback is StateCallback {
        return (typeof propIDOrCallback === "function");
    }

    protected hasEventListener(): boolean {
        return this._events.hasObserver();
    }
}
