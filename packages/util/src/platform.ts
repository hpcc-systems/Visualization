declare const process: any;

export const root: any = typeof globalThis !== "undefined" ? globalThis : window;
export const isBrowser: boolean = typeof window !== "undefined" && root === window;
export const isNode: boolean = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
export const isCI: boolean = true;//isNode && process.env != null && (process.env.TRAVIS != null || process.env.GITHUB_ACTIONS != null);

export function getScriptSrc(partial: string) {
    const scripts = document.scripts || [];
    for (let i = document.scripts.length - 1; i >= 0; --i) {
        const script = scripts[i];
        if (script.src) {
            const idx = script.src.indexOf(partial);
            if (idx >= 0) {
                return script.src.substring(0, idx);
            }
        }
    }
    return "";
}
