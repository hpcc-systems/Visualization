import { median } from "./median";
import { AccessorT, Observer, Accessor, scalar } from "./observer";

export type QuartileAccessor<T> = AccessorT<T, number>;

export type QuartileT = [number, number, number, number, number] | undefined;

function _quartile(): Observer<number, QuartileT> {
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
            let medianVal: number;
            let lower: number[];
            let upper: number[];
            if (sorted.length < 2) {
                return undefined;
            } else if (sorted.length % 2 === 0) {
                medianVal = (sorted[mid - 1] + sorted[mid]) / 2;
                lower = sorted.slice(0, mid);
                upper = sorted.slice(mid);
            } else {
                medianVal = sorted[Math.floor(mid)];
                lower = sorted.slice(0, Math.floor(mid));
                upper = sorted.slice(Math.ceil(mid));
            }
            return [sorted[0], scalar(median())(lower)!, medianVal, scalar(median())(upper)!, sorted[sorted.length - 1]];
        }
    };
}

export function quartile(): Observer<number, QuartileT>;
export function quartile<T = any>(callbackFn: QuartileAccessor<T>): Observer<T, QuartileT>;
export function quartile<T = any>(callbackFn?: QuartileAccessor<T>): Observer<number, QuartileT> | Observer<T, QuartileT> {
    return callbackFn ? Accessor(_quartile, callbackFn) : _quartile();
}