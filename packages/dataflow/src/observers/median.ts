import { AccessorT, Observer, Accessor } from "./observer";

function _median(): Observer<number, number> {
    let values: number[];

    return {
        observe: (value: number, idx: number) => {
            if (idx === 0) {
                values = [];
            }
            values.push(value);
        },
        peek: () => {
            const sorted = values.sort((l, r) => l - r);
            const mid = sorted.length / 2;
            if (sorted.length % 2 === 0) {
                return (sorted[mid - 1] + sorted[mid]) / 2;
            } else {
                return sorted[Math.floor(mid)];
            }
        }
    };
}

export type MedianAccessor<T> = AccessorT<T, number>;

export function median(): Observer<number, number>;
export function median<T = any>(callbackFn: MedianAccessor<T>): Observer<T, number>;
export function median<T = any>(callbackFn?: MedianAccessor<T>): Observer<number, number> | Observer<T, number> {
    return callbackFn ? Accessor(_median, callbackFn) : _median();
}