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
    private _espState: Partial<U> = {} as U;
    private _espStateCache: { [key: string]: string } = {};
    private _events = new Observable<StateEvents>();
    private _monitorHandle: number;
    protected _monitorTickCount: number = 0;

    protected clear(newVals?: Partial<I>) {
        this._espState = {} as U;
        this._espStateCache = {};
        if (newVals !== void 0) {
            this.set(newVals as I);
        }
        this._monitorTickCount = 0;
    }

    protected get(): U;
    protected get<K extends keyof U>(key: K, defValue?: U[K]): U[K];
    protected get<K extends keyof U>(key?: K, defValue?: U[K]): Partial<U> | U[K] | undefined {
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

    private setSingle<K extends keyof U>(key: K, newVal: U[K] | undefined, batchMode: boolean): IEvent | null {
        const oldCacheVal = this._espStateCache[(key as string)];
        const newCacheVal = hashSum(newVal);
        if (oldCacheVal !== newCacheVal) {
            this._espStateCache[key as string] = newCacheVal;
            const oldVal = this._espState[key];
            this._espState[key] = newVal;
            const changedInfo: IEvent = { id: key as string, oldValue: oldVal, newValue: newVal };
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
                const changedInfo = this.setSingle(key, _[key], true);
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

    //  Monitoring  ---
    protected async refresh(full: boolean = false): Promise<this> {
        await Promise.resolve();
        return this;
    }

    protected _monitor(): void {
        if (this._monitorHandle) {
            this._monitorTickCount = 0;
            return;
        }

        this._monitorHandle = setTimeout(() => {
            const refreshPromise: Promise<any> = this.hasEventListener() ? this.refresh(true) : Promise.resolve();
            refreshPromise.then(() => {
                this._monitor();
            });
            delete this._monitorHandle;
        }, this._monitorTimeoutDuraction());
    }

    protected _monitorTimeoutDuraction(): number {
        ++this._monitorTickCount;
        if (this._monitorTickCount <= 1) {          //  Once
            return 0;
        }
        return 30000;
    }

    watch(callback: StateCallback, triggerChange: boolean = true): IObserverHandle {
        if (typeof callback !== "function") {
            throw new Error("Invalid Callback");
        }
        if (triggerChange) {
            setTimeout(() => {
                const props: any = this.get();
                const changes: IEvent[] = [];
                for (const key in props) {
                    if (props.hasOwnProperty(props)) {
                        changes.push({ id: key, newValue: props[key], oldValue: undefined });
                    }
                }
                callback(changes);
            }, 0);
        }
        const retVal = this.addObserver("changed", callback);
        this._monitor();
        return retVal;
    }
}
