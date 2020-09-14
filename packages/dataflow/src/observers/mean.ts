import { Observer, Accessor } from "./observer";

function _mean(): Observer<number, number> {
    let total: number;
    let count: number;

    return {
        observe: (value: number, idx: number) => {
            if (idx === 0) {
                total = value;
            } else {
                total += value;
            }
            count = idx;
        },
        peek: () => total / (count + 1)
    };
}

export type MeanAccessor<T> = (row: T, currentIndex: number) => number;

export function mean(): Observer<number, number>;
export function mean<T = any>(callbackFn: MeanAccessor<T>): Observer<T, number>;
export function mean<T = any>(callbackFn?: MeanAccessor<T>): Observer<number, number> | Observer<T, number> {
    return callbackFn ? Accessor(_mean, callbackFn) : _mean();
}
