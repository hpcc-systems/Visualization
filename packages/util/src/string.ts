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
