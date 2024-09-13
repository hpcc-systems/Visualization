import { AccessorT, Observer, Accessor } from "./observer.ts";
import { max } from "./max.ts";
import { min } from "./min.ts";

function _extent(): Observer<number, [number, number]> {
    const minFO = min();
    const maxFO = max();

    return {
        observe: (value: number, idx: number) => {
            minFO.observe(value, idx);
            maxFO.observe(value, idx);
        },
        peek: () => [minFO.peek(), maxFO.peek()]
    };
}

export type ExtentAccessor<T> = AccessorT<T, number>;

export function extent(): Observer<number, [number, number]>;
export function extent<T = any>(callbackFn: ExtentAccessor<T>): Observer<T, [number, number]>;
export function extent<T = any>(callbackFn?: ExtentAccessor<T>): Observer<number, [number, number]> | Observer<T, [number, number]> {
    return callbackFn ? Accessor(_extent, callbackFn) : _extent();
}
