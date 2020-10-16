import { max } from "./max";
import { min } from "./min";
import { mean } from "./mean";
import { variance } from "./variance";
import { Observer, Accessor } from "./observer";

export type DistributionCallback<T> = (row: T, currentIndex: number) => number;

export type DistributionT = {
    min: number,
    mean: number,
    max: number,
    deviation: number | undefined,
    variance: number | undefined
} | undefined;

function _distribution(): Observer<number, DistributionT> {
    const minFO = min();
    const maxFO = max();
    const meanFO = mean();
    const varianceFO = variance();

    return {
        observe: (value: number, idx: number) => {
            minFO.observe(value, idx);
            maxFO.observe(value, idx);
            meanFO.observe(value, idx);
            varianceFO.observe(value, idx);
        },
        peek: () => {
            const minResult = minFO.peek();
            if (minResult === undefined) return undefined;
            const varianceResult = varianceFO.peek();
            return {
                min: minResult,
                max: maxFO.peek(),
                mean: meanFO.peek(),
                variance: varianceResult,
                deviation: varianceResult !== undefined ? Math.sqrt(varianceResult) : undefined
            };
        }
    };
}

export type DistributionAccessor<T> = (row: T, currentIndex: number) => number;

export function distribution(): Observer<number, DistributionT>;
export function distribution<T = any>(callbackFn: DistributionAccessor<T>): Observer<T, DistributionT>;
export function distribution<T = any>(callbackFn?: DistributionAccessor<T>): Observer<number, DistributionT> | Observer<T, DistributionT> {
    return callbackFn ? Accessor(_distribution, callbackFn) : _distribution();
}
