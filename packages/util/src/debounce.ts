import { hashSum } from "./hashSum";

export function debounce<R extends Promise<any>>(fn: () => R, timeout?: number): () => R;
export function debounce<P1, R extends Promise<any>>(fn: (param1: P1) => R, timeout?: number): (param1: P1) => R;
export function debounce<P1, P2, R extends Promise<any>>(fn: (param1: P1, param2: P2) => R, timeout?: number): (param1: P1, param2: P2) => R;
export function debounce<P1, P2, P3, R extends Promise<any>>(fn: (param1: P1, param2: P2, param3: P3) => R, timeout?: number): (param1: P1, param2: P2, param3: P3) => R;
export function debounce<P1, P2, P3, P4, R extends Promise<any>>(fn: (param1: P1, param2: P2, param3: P3, param4: P4) => R, timeout?: number): (param1: P1, param2: P2, param3: P3, param4: P4) => R;
export function debounce<TParam, R extends Promise<any>>(fn: (...params: TParam[]) => R, timeout?: number): (...params: TParam[]) => R {
    const promises: { [key: string]: { promise: R, clockStart: number } | null } = {};

    return (...params) => {
        const hash = hashSum(params);
        if (!promises[hash]) {
            promises[hash] = {
                clockStart: Date.now(),
                promise: fn(...params).then(response => {
                    if (timeout === undefined) {
                        promises[hash] = null;
                    } else {
                        setTimeout(() => {
                            promises[hash] = null;
                        }, Math.max(timeout - (Date.now() - promises[hash]!.clockStart), 0));
                    }
                    return response;
                }).catch(e => {
                    promises[hash] = null;
                    throw e;
                }) as R
            };
        }
        return promises[hash]!.promise;
    };
}

export function promiseTimeout<T>(ms: number, promise: Promise<T>) {
    let id: number;
    const timeout = new Promise((resolve, reject) => {
        id = setTimeout(() => {
            clearTimeout(id);
            reject("Timed out in " + ms + "ms.");
        }, ms);
    });

    return Promise.race([
        promise,
        timeout
    ]).then(response => {
        clearTimeout(id);
        return response;
    }).catch(e => {
        clearTimeout(id);
        throw e;
    });
}

export class AsyncOrderedQueue {
    private _q: Array<Promise<any>> = [];

    private isTop(p: Promise<any>): boolean {
        return this._q[0] === p;
    }

    push<T>(p: Promise<T>): Promise<T> {
        const retVal = p.then(response => {
            if (this.isTop(retVal)) {
                this._q.shift();
                return response;
            }
            return new Promise<T>((resolve, reject) => {
                const intervalHandler = setInterval(() => {
                    if (this.isTop(retVal)) {
                        clearInterval(intervalHandler);
                        this._q.shift();
                        resolve(response);
                    }
                }, 20);
            });
        });
        this._q.push(retVal);
        return retVal;
    }
}
