export function* generate<U>(generatorFn: () => U, maxLen?: number): IterableIterator<U> {
    let i = -1;
    while (maxLen === undefined || ++i < maxLen) {
        yield generatorFn();
    }
}
