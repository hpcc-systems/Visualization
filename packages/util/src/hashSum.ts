//  Ported to TypeScript from:  https://github.com/bevacqua/hash-sum

function fold(hash: number, text: string): number {
    for (let i = 0; i < text.length; ++i) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash |= 0;
    }
    return hash < 0 ? hash * -2 : hash;
}

function foldObject(hash: number, o: any, seen: Set<any>): number {
    if (typeof o.hashSum === "function") {
        return o.hashSum();
    }
    const keys = Object.keys(o).sort();
    for (let i = 0; i < keys.length; ++i) {
        hash = foldValue(hash, o[keys[i]], keys[i], seen);
    }
    return hash;
}

function foldValue(input: number, value: any, key: string, seen: Set<any>): number {
    const hash = fold(fold(fold(input, key), Object.prototype.toString.call(value)), typeof value);
    if (value === null) {
        return fold(hash, "null");
    }
    if (value === undefined) {
        return fold(hash, "undefined");
    }
    if (typeof value === "object") {
        if (seen.has(value)) {
            return fold(hash, "[Circular]" + key);
        }
        seen.add(value);
        return foldObject(hash, value, seen);
    }
    return fold(hash, value.toString());
}

export function hashSum(o: any): string {
    return foldValue(0, o, "", new Set()).toString(16).padStart(8, "0");
}
