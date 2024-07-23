import { Source, IterableActivity, isSource } from "./activity";
import { extent } from "../observers/extent";
import { scalar } from "../observers/observer";
import { map } from "./map";

function normalizeGen(): IterableActivity<number> {
    const calcExtent = scalar(extent());
    return function* (_source: Source<number>) {
        const source = Array.isArray(_source) ? _source : [..._source];
        const range = calcExtent(source);
        const divisor = (range[1] - range[0]) || 1;
        const normalizeMap = map((row: number) => (row - range[0]) / divisor);
        return yield* normalizeMap(source);
    };
}

export function normalize(): IterableActivity<number>;
export function normalize(source: Source<number>): IterableIterator<number>;
export function normalize(s_or_undef?: Source<number>): IterableActivity<number> | IterableIterator<number> {
    return isSource(s_or_undef) ? normalizeGen()(s_or_undef) : normalizeGen();
}
