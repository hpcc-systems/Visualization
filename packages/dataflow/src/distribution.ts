import { Source, ScalarActivity, isSource } from "./activity";
import { Max } from "./max";
import { Min } from "./min";
import { Variance } from "./variance";
import { Mean } from "./mean";

export type DistributionCallback<T> = (row: T, currentIndex: number) => number;

type DistributionT = {
    min: number,
    mean: number,
    max: number,
    deviation: number,
    variance: number
} | undefined;

function distributionGen<T>(callbackFn: DistributionCallback<T>): ScalarActivity<T, DistributionT> {
    const min = new Min();
    const max = new Max();
    const mean = new Mean();
    const variance = new Variance();
    return function (source: Source<T>) {
        let i = -1;
        for (const row of source) {
            const value = callbackFn(row, ++i);
            min.next(value, i);
            max.next(value, i);
            mean.next(value, i);
            variance.next(value, i);
        }
        if (i < 0) {
            return undefined;
        }
        const varianceResult = variance.result()!;
        return {
            min: min.result()!,
            max: max.result()!,
            mean: mean.result()!,
            variance: varianceResult,
            deviation: Math.sqrt(varianceResult)
        };
    };
}

export function distribution<T>(callbackFn: DistributionCallback<T>): ScalarActivity<T, DistributionT>;
export function distribution<T>(source: Source<T>, callbackFn: DistributionCallback<T>): (DistributionT);
export function distribution<T>(s_or_cb: Source<T> | DistributionCallback<T>, callbackFn?: DistributionCallback<T>): ScalarActivity<T, DistributionT> | (DistributionT) {
    return isSource(s_or_cb) ? distributionGen(callbackFn!)(s_or_cb) : distributionGen(s_or_cb);
}
