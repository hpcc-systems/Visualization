import { IterableActivity, Source, isSource } from "./activity.ts";

export type GroupFn<T> = (row: T, index: number) => number | string;
export type GroupRow<T> = { key: string, value: T[] };

function groupGen<T = any>(groupFn: GroupFn<T>): IterableActivity<T, GroupRow<T>> {
    return function* (source: Source<T>) {
        let i = -1;
        const group: { [key: string]: T[] } = {};
        for (const row of source) {
            const key = groupFn(row, ++i);
            if (!group[key]) {
                group[key] = [];
            }
            group[key].push(row);
        }
        for (const key in group) {
            yield { key, value: group[key] };
        }
    };
}

export function group<T>(groupByFn: GroupFn<T>): IterableActivity<T, GroupRow<T>>;
export function group<T>(source: Source<T>, groupByFn: GroupFn<T>): IterableIterator<GroupRow<T>>;
export function group<T>(s_or_gbf: Source<T> | GroupFn<T>, groupByFn?: GroupFn<T>): IterableActivity<T, GroupRow<T>> | IterableIterator<GroupRow<T>> {
    return isSource(s_or_gbf) ? groupGen<T>(groupByFn!)(s_or_gbf) : groupGen<T>(s_or_gbf);
}
