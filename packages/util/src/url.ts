export function join(...segments: string[]) {
    const parts: string[] = segments.reduce((parts: string[], segment) => {
        // Remove leading slashes from non-first part.
        if (parts.length > 0) {
            segment = segment.replace(/^\//, "");
        }
        // Remove trailing slashes.
        segment = segment.replace(/\/$/, "");
        return [...parts, ...segment.split("/")];
    }, []);
    const resultParts = [];
    for (const part of parts) {
        if (part === ".") {
            continue;
        }
        if (part === "..") {
            resultParts.pop();
            continue;
        }
        resultParts.push(part);
    }
    return resultParts.join("/");
}

export function dirname(path: string) {
    return join(path, "..");
}
