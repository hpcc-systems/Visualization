
function join(baseURL: string, relativeURL: string) {
    return relativeURL
        ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
        : baseURL;
}

export const isRelativePath = (path: string) => path[0] === ".";
export const fixRelativeUrl = (path: string, basePath: string) => {
    if (isRelativePath(path)) {
        return join(basePath, path);
    }
    return path;
};