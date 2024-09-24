import { Observer, Accessor, AccessorT } from "./observer.ts";

function _max(): Observer<number, number> {
    let max: number;

    return {
        observe: (value: number, idx: number) => {
            if (idx === 0) {
                max = value;
            } else if (max < value) {
                max = value;
            }
        },
        peek: () => max
    };
}

export type MaxAccessor<T> = AccessorT<T, number>;

export function max(): Observer<number, number>;
export function max<T = any>(callbackFn: MaxAccessor<T>): Observer<T, number>;
export function max<T = any>(callbackFn?: MaxAccessor<T>): Observer<number, number> | Observer<T, number> {
    return callbackFn ? Accessor(_max, callbackFn) : _max();
}
