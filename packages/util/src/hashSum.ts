//  Ported to TypeScript from:  https://github.com/bevacqua/hash-sum

function pad(hash: string, len: number): string {
    while (hash.length < len) {
        hash = "0" + hash;
    }
    return hash;
}

function fold(hash: number, text: string): number {
    if (text.length === 0) {
        return hash;
    }
    for (let i = 0; i < text.length; ++i) {
        const chr = text.charCodeAt(i);
        // tslint:disable:no-bitwise
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
        // tslint:enable:no-bitwise
    }
    return hash < 0 ? hash * -2 : hash;
}

function foldObject(hash: number, o: any, seen: any[]): number {
    if (typeof o.hashSum === "function") {
        return o.hashSum();
    }
    return Object.keys(o).sort().reduce((input: any, key: string) => {
        return foldValue(input, o[key], key, seen);
    }, hash);
}

function foldValue(input: number, value: any, key: string, seen: any[]): number {
    const hash = fold(fold(fold(input, key), toString(value)), typeof value);
    if (value === null) {
        return fold(hash, "null");
    }
    if (value === undefined) {
        return fold(hash, "undefined");
    }
    if (typeof value === "object") {
        if (seen.indexOf(value) !== -1) {
            return fold(hash, "[Circular]" + key);
        }
        seen.push(value);
        return foldObject(hash, value, seen);
    }
    return fold(hash, value.toString());
}

function toString(o: any): string {
    return Object.prototype.toString.call(o);
}

export function hashSum(o: any): string {
    return pad(foldValue(0, o, "", []).toString(16), 8);
}
