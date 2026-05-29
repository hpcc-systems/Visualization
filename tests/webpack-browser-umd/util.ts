/**
 * Loads a script into the browser document and resolves when it finishes
 * executing.  Re-using the same URL is safe because the browser will serve
 * the cached copy and execute it again (vitest/vite does not add aggressive
 * cache-busting for static assets in the public folder).
 */

let _loadScriptCounter = 0;
export async function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load bundle: ${src}`));
        document.head.appendChild(script);
    });
}

/**
 * Loads a script while a minimal AMD `define` shim is active, then returns
 * the module exports produced by the AMD factory.  UMD bundles built by
 * webpack take the AMD branch when `define.amd` is truthy, calling
 * `define(name, deps, factory)`.  Because the bundles are fully self-contained
 * (no external dependencies) the factory receives no arguments.
 *
 * A unique query-string parameter forces the browser to fetch and execute the
 * script even when it has already been loaded as a global in this page.
 */
export async function loadScriptViaAMD(src: string): Promise<any> {
    const win = window as any;
    const previousDefine = win.define;

    return new Promise((resolve, reject) => {
        win.define = (nameOrDepsOrFactory: any, depsOrFactory?: any, optFactory?: any) => {
            // Normalise the AMD define() overloads:
            //   define(factory)
            //   define(deps, factory)
            //   define(name, deps, factory)
            let factory: (() => any) | undefined;
            if (typeof optFactory === "function") {
                factory = optFactory;
            } else if (typeof depsOrFactory === "function") {
                factory = depsOrFactory;
            } else if (typeof nameOrDepsOrFactory === "function") {
                factory = nameOrDepsOrFactory;
            }
            if (!factory) return;

            // Restore the previous define BEFORE running the factory so that
            // any inner UMD modules bundled inside the webpack bundle do NOT
            // detect define.amd and instead take the CJS/exports code path.
            win.define = previousDefine;

            try {
                resolve(factory());
            } catch (err) {
                reject(err);
            }
        };
        win.define.amd = {};

        // Use a guaranteed-unique counter so that even back-to-back calls
        // within the same millisecond produce distinct script URLs, forcing
        // the browser to fetch and execute the bundle fresh every time.
        const cacheBust = `?amd=${++_loadScriptCounter}`;
        const script = document.createElement("script");
        script.src = src + cacheBust;
        script.onerror = () => {
            win.define = previousDefine;
            reject(new Error(`Failed to load AMD bundle: ${src}`));
        };
        document.head.appendChild(script);
    });
}
