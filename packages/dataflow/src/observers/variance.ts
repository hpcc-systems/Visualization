import { AccessorT, Observer, Accessor } from "./observer";

function _variance(): Observer<number, number | undefined> {
    let count: number;
    let mean: number;
    let sum: number;

    return {
        observe: (value: number, idx: number) => {
            if (idx === 0) {
                count = 0;
                mean = 0;
                sum = 0;
            }
            const delta = value - mean;
            mean += delta / ++count;
            sum += delta * (value - mean);
        },
        peek: () => count > 1 ? sum / (count - 1) : undefined
    };
}

export type VarianceAccessor<T> = AccessorT<T, number>;

export function variance(): Observer<number, number | undefined>;
export function variance<T = any>(callbackFn: VarianceAccessor<T>): Observer<T, number | undefined>;
export function variance<T = any>(callbackFn?: VarianceAccessor<T>): Observer<number, number | undefined> | Observer<T, number | undefined> {
    return callbackFn ? Accessor(_variance, callbackFn) : _variance();
}
