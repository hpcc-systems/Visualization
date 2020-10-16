import { Observer } from "./observer";

export type ReduceCallback<T, U> = (previousValue: U, currentValue: T, currentIndex: number) => U;

function _reduce<T, U>(callback: ReduceCallback<T, U>, initialValue?: U): Observer<T, U> {
    let reduced: U;

    return {
        observe: (value: T, idx: number) => {
            if (idx === 0) {
                reduced = initialValue === undefined ? (value as unknown as U) : callback(initialValue, value, idx);
            } else {
                reduced = callback(reduced, value, idx);
            }
        },
        peek: () => reduced
    };
}

export function reduce<T = any, U = any>(callbackFn: ReduceCallback<T, U>, initialValue?: U): Observer<T, U> {
    return _reduce(callbackFn, initialValue);
}
