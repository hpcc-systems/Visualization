export type Source<T> = IterableIterator<T> | T[];
export type IterableActivity<T, U = T> = (source: Source<T>) => IterableIterator<U>;
export type ScalarActivity<T, U = T> = (source: Source<T>) => U;
export type Activity<T, U = T> = IterableActivity<T, U> | ScalarActivity<T, U>;

export function isSource<T>(source: Source<T> | any): source is Source<T> {
    return typeof source[Symbol.iterator] === "function" || Array.isArray(source);
}
