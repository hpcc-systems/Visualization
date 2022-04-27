type posixSeparator = "/";
type win32Separator = "\\";

function url(separator: posixSeparator | win32Separator) {

    function join(...segments: string[]) {
        if (segments.length === 0) return ".";
        const parts: string[] = segments.reduce((parts, segment) => {
            // Remove leading slashes from non-first part.
            if (parts.length > 0) {
                segment = segment.replace(separator === "\\" ? /^\\/ : /^\//, "");
            }
            // Remove trailing slashes.
            segment = segment.replace(separator === "\\" ? /\\$/ : /\/$/, "");
            return [...parts, ...segment.split(separator)];
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
        return resultParts.join(separator);
    }

    function dirname(path: string) {
        return join(path, "..");
    }

    return {
        join,
        dirname
    };
}
export const guessSeparator = (path: string): posixSeparator | win32Separator => path.split("/").length >= path.split("\\").length ? "/" : "\\";
export const posix = url("/");
export const win32 = url("\\");

//  Backward compatibility  ---
export const join = posix.join;
export const dirname = posix.dirname;
