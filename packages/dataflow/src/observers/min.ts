import { Observer, Accessor, AccessorT } from "./observer.ts";

function _min(): Observer<number, number> {
    let min: number;

    return {
        observe: (value: number, idx: number) => {
            if (idx === 0) {
                min = value;
            } else if (min > value) {
                min = value;
            }
        },
        peek: () => min
    };
}

export type MinAccessor<T> = AccessorT<T, number>;

export function min(): Observer<number, number>;
export function min<T = any>(callbackFn: MinAccessor<T>): Observer<T, number>;
export function min<T = any>(callbackFn?: MinAccessor<T>): Observer<number, number> | Observer<T, number> {
    return callbackFn ? Accessor(_min, callbackFn) : _min();
}
