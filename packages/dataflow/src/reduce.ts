import { Source, ScalarActivity, isSource } from "./activity";

export type ReduceCallback<T, U> = (previousValue: U, currentValue: T, currentIndex: number) => U;

function reduceGen<T, U>(callbackFn: ReduceCallback<T, U>, initialValue?: U): ScalarActivity<T, U> {
    return function (source: Source<T>) {
        if (Array.isArray(source)) {
            return initialValue === undefined ? source.reduce(callbackFn as any) : source.reduce(callbackFn, initialValue);
        } else {
            let prev: any = initialValue === undefined ? source.next().value : initialValue;
            let i = initialValue === undefined ? 0 : -1;
            for (const item of source) {
                prev = callbackFn(prev, item, ++i);
            }
            return prev;
        }
    }
}

export function reduce<T, U>(callbackFn: ReduceCallback<T, U>, initialValue?: U): ScalarActivity<T, U>;
export function reduce<T, U>(source: Source<T>, callbackFn: ReduceCallback<T, U>, initialValue?: U): U;
export function reduce<T, U>(s_or_cb: Source<T> | ReduceCallback<T, U>, cb_or_v: ReduceCallback<T, U> | U, initialValue?: U): ScalarActivity<T, U> | U {
    return isSource(s_or_cb) ? reduceGen<T, U>(cb_or_v as ReduceCallback<T, U>, initialValue!)(s_or_cb) : reduceGen<T, U>(s_or_cb, cb_or_v as U);
}
