/**
 * IObserverHandle - Reference to an observing instance
 */
export interface IObserverHandle {
    release(): void;
    unwatch(): void;
}

export type CallbackFunction = (...args: any[]) => void;

class ObserverHandle<T extends string> implements IObserverHandle {
    private eventTarget: Observable<T>;
    private eventID: T;
    private callback: CallbackFunction;

    constructor(eventTarget: Observable<T>, eventID: T, callback: CallbackFunction) {
        this.eventTarget = eventTarget;
        this.eventID = eventID;
        this.callback = callback;
    }

    release() {
        this.eventTarget.removeObserver(this.eventID, this.callback);
    }

    unwatch() {
        this.release();
    }
}

export type EventID = string;
export class Observable<T extends EventID> {
    private _eventObservers: { [eventID: string]: CallbackFunction[] } = {};

    constructor(...events: T[]) {
    }

    addObserver(eventID: T, callback: CallbackFunction): IObserverHandle {
        let eventObservers: CallbackFunction[] = this._eventObservers[eventID];
        if (!eventObservers) {
            eventObservers = [];
            this._eventObservers[eventID] = eventObservers;
        }
        eventObservers.push(callback);
        return new ObserverHandle<T>(this, eventID, callback);
    }

    removeObserver(eventID: T, callback: CallbackFunction): this {
        const eventObservers = this._eventObservers[eventID];
        if (eventObservers) {
            for (let i = eventObservers.length - 1; i >= 0; --i) {
                if (eventObservers[i] === callback) {
                    eventObservers.splice(i, 1);
                }
            }
        }
        return this;
    }

    dispatchEvent(eventID: T, ...args: any[]): this {
        const eventObservers = this._eventObservers[eventID];
        if (eventObservers) {
            for (const observer of eventObservers) {
                observer(...args);
            }
        }
        return this;
    }

    private _hasObserver(eventID: string): boolean {
        const eventObservers = this._eventObservers[eventID];
        for (const observer in eventObservers) {
            if (eventObservers[observer]) {
                return true;
            }
        }
        return false;
    }

    hasObserver(_eventID?: T): boolean {
        if (_eventID !== void 0) {
            return this._hasObserver(_eventID);
        }
        for (const eventID in this._eventObservers) {
            if (this._hasObserver(eventID)) {
                return true;
            }
        }
        return false;
    }
}
