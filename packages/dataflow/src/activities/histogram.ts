import { IterableActivity, Source, isSource } from "./activity";
import { extent } from "../observers/extent";
import { scalar } from "../observers/observer";

export type HistogramFn<T> = (row: T) => number;
export type HistogramRow<T> = { from: number, to: number, value: T[] };
export type OptionA = { buckets: number };
export type OptionB = { min: number, range: number };
export type Options = OptionA | OptionB;

function isOptionA(_: Options): _ is OptionA {
    return (_ as OptionA).buckets !== undefined;
}

function histogramGen<T = any>(callbackFn: HistogramFn<T>, options: Options): IterableActivity<T, HistogramRow<T>> {
    return function* (_source: Source<T>) {
        let min: number;
        let bucketSize: number;

        let source;
        if (isOptionA(options)) {
            source = Array.isArray(_source) ? _source : [..._source];
            const minMax = scalar(extent(callbackFn))(source);
            if (minMax === undefined) {
                return undefined;
            }
            min = minMax[0];
            const max = minMax[1];
            const buckets = options.buckets;
            bucketSize = (max - min) / buckets;
        } else {
            source = _source;
            min = options.min;
            bucketSize = options.range;
        }

        const histogram: { [key: number]: T[] } = {};

        let maxBucketID = 0;
        for (const row of source) {
            const value = callbackFn(row);
            const bucketID = Math.floor((value - min) / bucketSize);
            if (maxBucketID < bucketID) {
                maxBucketID = bucketID;
            }
            if (histogram[bucketID] === undefined) {
                histogram[bucketID] = [];
            }
            histogram[bucketID].push(row);
        }

        const lastBucket = histogram[maxBucketID];
        const from = min + maxBucketID * bucketSize;

        for (let i = 0; i <= maxBucketID; ++i) {
            //  If all items in the last bucket match the "to" of the previous bucket, put them in there...
            if (i === maxBucketID - 1 && lastBucket.every(row => from === callbackFn(row))) {
                yield {
                    from: min + i * bucketSize,
                    to: min + (i + 1) * bucketSize,
                    value: [...(histogram[i] || []), ...lastBucket]
                };
                break;
            }
            yield {
                from: min + i * bucketSize,
                to: min + (i + 1) * bucketSize,
                value: histogram[i] || []
            };
        }
    };
}

export function histogram<T>(histogramByFn: HistogramFn<T>, options: Options): IterableActivity<T, HistogramRow<T>>;
export function histogram<T>(source: Source<T>, histogramByFn: HistogramFn<T>, options: Options): IterableIterator<HistogramRow<T>>;
export function histogram<T>(s_or_hf: Source<T> | HistogramFn<T>, hf_or_b: HistogramFn<T> | Options, options?: Options): IterableActivity<T, HistogramRow<T>> | IterableIterator<HistogramRow<T>> {
    return isSource(s_or_hf) ? histogramGen<T>(hf_or_b as HistogramFn<T>, options!)(s_or_hf) : histogramGen<T>(s_or_hf as HistogramFn<T>, hf_or_b as Options);
}
