import { Dispatch, IObserverHandle, Message } from "./dispatch";

class PropChangedMessage extends Message {

    constructor(readonly property: string, public newValue: any, public oldValue?: any) {
        super();
    }

    get canConflate(): boolean { return true; }
    conflate(other: PropChangedMessage) {
        if (this.property === other.property) {
            this.newValue = other.newValue;
            return true;
        }
        return false;
    }

    void(): boolean {
        return this.newValue === this.oldValue;
    }
}

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
    private _dispatch = new Dispatch();
    private _monitorHandle: number;
    protected _monitorTickCount: number = 0;

    protected clear(newVals?: Partial<I>) {
        this._espState = {} as U;
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

    protected set(newVals: I): void;
    protected set<K extends keyof U>(key: K, newVal: U[K], batchMode?: boolean): void;
    protected set<K extends keyof U>(keyOrNewVals: K | U, newVal?: U[K]): void {
        if (typeof keyOrNewVals === "string") {
            return this.setSingle(keyOrNewVals as any, newVal as U[K]);  //  TODO:  "as any" should not be needed (TS >= 3.1.x)
        }
        this.setAll(keyOrNewVals as Partial<U>);
    }

    private setSingle<K extends keyof U>(key: K, newVal: U[K] | undefined): void {
        const oldVal = this._espState[key];
        this._espState[key] = newVal;
        this._dispatch.post(new PropChangedMessage(key as string, newVal, oldVal));
    }

    private setAll(_: Partial<U>): void {
        for (const key in _) {
            if (_.hasOwnProperty(key)) {
                this.setSingle(key, _[key]);
            }
        }
    }

    protected has<K extends keyof U>(key: K): boolean {
        return this._espState[key] !== void 0;
    }

    addObserver(eventID: StateEvents, callback: StateCallback): IObserverHandle;
    addObserver(eventID: StateEvents, propID: keyof U, callback: StatePropCallback): IObserverHandle;
    addObserver(eventID: StateEvents, propIDOrCallback: StateCallback | keyof U, callback?: StatePropCallback): IObserverHandle {
        if (this.isCallback(propIDOrCallback)) {
            if (eventID !== "changed") throw new Error("Invalid eventID:  " + eventID);
            return this._dispatch.attach((messages: PropChangedMessage[]) => {
                propIDOrCallback(messages.map(m => ({
                    id: m.property,
                    oldValue: m.oldValue,
                    newValue: m.newValue
                })));
            });
        } else {
            if (eventID !== "propChanged") throw new Error("Invalid eventID:  " + eventID);
            return this._dispatch.attach((messages: PropChangedMessage[]) => {
                const filteredMessages = messages.filter(m => m.property === propIDOrCallback);
                if (filteredMessages.length) {
                    if (filteredMessages.length > 1) {
                        console.warn("Should only be 1 message?");
                    }
                    const event = filteredMessages[filteredMessages.length - 1];
                    callback!({
                        id: event.property,
                        oldValue: event.oldValue,
                        newValue: event.newValue
                    });
                }
            });
        }
    }

    on(eventID: StateEvents, callback: StateCallback): this;
    on(eventID: StateEvents, propID: keyof U, callback: StatePropCallback): this;
    on(eventID: StateEvents, propIDOrCallback: StateCallback | keyof U, callback?: StatePropCallback): this {
        this.addObserver(eventID, propIDOrCallback as any, callback as any);
        return this;
    }

    protected isCallback(propIDOrCallback: StateCallback | keyof U): propIDOrCallback is StateCallback {
        return (typeof propIDOrCallback === "function");
    }

    protected hasEventListener(): boolean {
        return this._dispatch.hasObserver();
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
            const refreshPromise: Promise<any> = this.hasEventListener() ? this.refresh() : Promise.resolve();
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
