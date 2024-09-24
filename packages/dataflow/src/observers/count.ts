import { Observer } from "./observer.ts";

export function count<T = any>(): Observer<T, number> {
    let count: number;

    return {
        observe: (value: T, idx: number) => {
            if (idx === 0) {
                count = 0;
            }
            ++count;
        },
        peek: () => count
    };
}
