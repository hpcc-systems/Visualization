//  See ./node_modules/dojo/promise/Promise.js for official API
export class Deferred<T> {

    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;

    protected _isCanceled = false;
    protected _canceledReason: string;
    protected _isResolved = false;
    protected _isRejected = false;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    then(onFulfilled?: (value: T) => void, onRejected?: (reason: any) => void): Deferred<T> {
        this.promise.then((value: T) => {
            if (this._isCanceled && onRejected) {
                onRejected(this._canceledReason);
            } else if (!this._isCanceled && onFulfilled) {
                this._isResolved = true;
                onFulfilled(value);
            }
        }, (reason: any) => {
            if (this._isCanceled && onRejected) {
                onRejected(this._canceledReason);
            } else if (!this._isCanceled && onRejected) {
                this._isRejected = true;
                onRejected(reason);
            }
        });
        return this;
    }

    cancel(reason?: string) {
        this._isCanceled = true;
        this._canceledReason = reason;
    }

    isResolved() {
        return this._isResolved;
    }

    isRejected() {
        this._isRejected;
    }

    isFulfilled() {
        this._isResolved || this._isRejected || this._isCanceled;
    }

    isCanceled() {
        this._isCanceled;
    }
}

export class DeferredList<T> extends Deferred<T[]> {
    total: Deferred<number> = new Deferred<number>();
}
