import vm from "node:vm";

/** An nls bundle: `root` plus a flag or object per locale. */
export interface NlsBundle {
    root?: Record<string, unknown>;
    [locale: string]: unknown;
}

interface NlsDefine {
    (arg1: any, arg2?: any): void;
    amd: boolean;
}

/** Evaluates an AMD nls bundle and returns the bundle object. */
export function evalBundle(source: string, filename?: string): NlsBundle {
    let result: any;
    let isAmd = false;
    const define = function (arg1: any, arg2?: any) {
        isAmd = true;
        if (!arg2) {
            result = arg1;
        } else if (arg1.length === 0) {
            result = arg2();
        } else if (arg1.length === 2 && arg1[0] === "require" && arg1[1] === "exports") {
            // TypeScript emits `define(["require", "exports"], factory)` for nls modules
            const exp = {};
            const req = () => {
                throw new Error("require() is not supported in language files");
            };
            result = arg2(req, exp);
            if (result === undefined) result = exp;
        } else {
            throw new Error("define dependencies not supported in language files: " + filename);
        }
    } as NlsDefine;
    define.amd = true;
    const sandbox = { define, module: {}, exports: {} };
    vm.createContext(sandbox);
    vm.runInContext(source, sandbox, filename || "nls-bundle.js");
    if (!isAmd) {
        throw new Error("Non-AMD nls bundles are not supported by vite-plugin-dojo: " + filename);
    }
    return result;
}

const LOCALE_RE = /^[a-z]{2}([_-]([A-Za-z]{2,4}|[0-9]{3}))?([_-]([A-Za-z]{2,4}|[0-9]{3}))?$/;

function isLocaleMatch(a: string, b: string): boolean {
    return a === b || a.startsWith(b + "-") || b.startsWith(a + "-");
}

/**
 * Locales enabled in `bundle` that match `requestedLocale` (either more or less specific).
 */
export function availableLocales(requestedLocale: string, bundle: NlsBundle | undefined): string[] {
    if (!bundle || !bundle.root || typeof bundle.root !== "object") return [];
    if (requestedLocale === "*") {
        return Object.keys(bundle).filter(locale => locale !== "root" && !!bundle[locale]);
    }
    const result: string[] = [];
    const parts = requestedLocale.split("-");
    let current = "";
    for (const part of parts) {
        current += (current ? "-" : "") + part;
        if (bundle[current]) result.push(current);
    }
    for (const loc of Object.keys(bundle)) {
        if (bundle[loc] && loc.startsWith(requestedLocale + "-")) result.push(loc);
    }
    return result;
}

/**
 * Disables locales in a root bundle that the `locales` option excluded.
 * @returns the rewritten module source, or `undefined` when nothing changed.
 */
export function restrictRootBundle(
    source: string,
    filename: string,
    requestedLocales: string[] | undefined
): string | undefined {
    if (!requestedLocales) return undefined;
    let bundle: NlsBundle;
    try {
        bundle = evalBundle(source, filename);
    } catch {
        return undefined;
    }
    if (!bundle || !bundle.root) return undefined;

    let modified = false;
    for (const locale of Object.keys(bundle)) {
        if (locale === "root" || !LOCALE_RE.test(locale)) continue;
        if (bundle[locale] && !requestedLocales.some(loc => isLocaleMatch(loc, locale))) {
            bundle[locale] = false;
            modified = true;
        }
    }
    return modified ? `define(${JSON.stringify(bundle, null, 1)});` : undefined;
}
