export function es6Require(deps, callback, errback?, _require?) {
    const require = _require || (window as any).require;
    require(deps, function (...args: string[]) {
        for (let i = 0; i < args.length; ++i) {
            const depParts = deps[i].split("/");
            if (depParts.length && arguments[i][depParts[depParts.length - 1]]) {
                arguments[i] = arguments[i][depParts[depParts.length - 1]];
            }
        }
        callback.apply(this, arguments);
    }, errback);
}
