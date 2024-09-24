import { variance } from "./variance.ts";
import { AccessorT, Observer, Accessor } from "./observer.ts";

function _deviation(): Observer<number, number | undefined> {
    const v = variance();

    return {
        observe: (value: number, idx: number) => {
            v.observe(value, idx);
        },
        peek: () => {
            const variance = v.peek();
            return variance !== undefined ? Math.sqrt(variance) : variance;
        }
    };
}

export type DeviationAccessor<T> = AccessorT<T, number>;

export function deviation(): Observer<number, number | undefined>;
export function deviation<T = any>(callbackFn: DeviationAccessor<T>): Observer<T, number | undefined>;
export function deviation<T = any>(callbackFn?: DeviationAccessor<T>): Observer<number, number | undefined> | Observer<T, number | undefined> {
    return callbackFn ? Accessor(_deviation, callbackFn) : _deviation();
}
