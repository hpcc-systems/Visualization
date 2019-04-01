export function trim(str: string, char: string): string {
    if (typeof char !== "string") return str;
    if (char.length === 0) return str;
    while (str.indexOf(char) === 0) {
        str = str.substring(1);
    }
    while (endsWith(str, char)) {
        str = str.substring(0, str.length - 1);
    }
    return str;
}

export function endsWith(origString: string, searchString: string, position?: number) {
    const subjectString = origString.toString();
    if (typeof position !== "number" || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
    }
    position -= searchString.length;
    const lastIndex = subjectString.lastIndexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
}

function entitiesEncode(str: string): string {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function safeEncode(item: undefined | boolean | number | string): undefined | boolean | number | string {
    switch (Object.prototype.toString.call(item)) {
        case "[object Undefined]":
        case "[object Boolean]":
        case "[object Number]":
            return item as undefined | boolean | number;
        case "[object String]":
            return entitiesEncode(item as string);
        default:
            console.log("Unknown cell type:  " + Object.prototype.toString.call(item));
    }
    return item;
}
