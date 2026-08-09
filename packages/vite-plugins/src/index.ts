import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import MagicString from "magic-string";
import { normalizePath } from "vite";
import type { Plugin } from "vite";

import { DojoResolver } from "./resolver.js";
import { analyze } from "./analyze.js";
import type { AstNode } from "./analyze.js";
import { DEFAULT_RUNTIME_FEATURES } from "./dojoLoader.js";
import { hasExprMids, parseHasExpr, reduceHasExpr, stringifyHasExpr } from "./hasExpr.js";
import type { HasExprNode } from "./hasExpr.js";
import { availableLocales, evalBundle, restrictRootBundle } from "./i18n.js";
import type { DojoPluginOptions } from "./types.js";

export type {
    DojoLoaderConfig,
    DojoPackageConfig,
    DojoPluginOptions,
    LoaderConfigInput,
    ModuleReplacement
} from "./types.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));

const PREFIX = "\0dojo:";
const RUNTIME_ID = PREFIX + "runtime";
const RUNNER_ID = PREFIX + "runner";
const NOMODULE_ID = PREFIX + "nomodule";
const MID_QUERY = "dojo-mid";

const JS_EXTENSIONS = [".js", ".mjs", ".cjs"];

/** Hook filters: ids this plugin can possibly handle. */
const VIRTUAL_ID_FILTER = /^\0dojo:/;
const JS_ID_FILTER = /\.[mc]?js(\?|$)/;
const MID_ID_FILTER = /[?&]dojo-mid=/;

const PSEUDO = new Set(["require", "module", "exports"]);

/** Thrown for misconfiguration, so `resolveId` can report it instead of silently missing. */
class DojoPluginError extends Error { }

interface HasPayload {
    absMid: string;
    expr: HasExprNode;
    reference: string;
}

interface AliasPayload {
    absMid: string;
    target: string;
    reference: string;
}

interface TextPayload {
    absMid: string;
    file: string;
}

interface ProxyPayload {
    absMid: string;
    loader: string;
    name: string;
    deps: string[];
    reference: string;
}

interface I18nPayload {
    absMid: string;
    bundle: string;
    reference: string;
}

/** Encodes a virtual module of the given kind carrying a JSON payload. */
function virtual(kind: string, payload: unknown): string {
    return `${PREFIX}${kind}:${encodeURIComponent(JSON.stringify(payload))}`;
}

function parseVirtual(id: string): { kind: string; payload: any } | undefined {
    if (!id.startsWith(PREFIX)) return undefined;
    const rest = id.slice(PREFIX.length);
    const sep = rest.indexOf(":");
    if (sep < 0) return { kind: rest, payload: undefined };
    return { kind: rest.slice(0, sep), payload: JSON.parse(decodeURIComponent(rest.slice(sep + 1))) };
}

function splitId(id: string): { file: string; params: URLSearchParams } {
    const q = id.indexOf("?");
    if (q < 0) return { file: id, params: new URLSearchParams() };
    return { file: id.slice(0, q), params: new URLSearchParams(id.slice(q + 1)) };
}

function joinQuery(file: string, params: URLSearchParams): string {
    const query = params.toString();
    return query ? `${file}?${query}` : file;
}

/** JSON.stringify, also escaping the line separators that some tools reject in string literals. */
function jsString(value: string): string {
    return JSON.stringify(value).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

function existingFile(url: string | undefined): string | undefined {
    if (!url) return undefined;
    const candidates = path.extname(url) ? [url, ...JS_EXTENSIONS.map(e => url + e)] : JS_EXTENSIONS.map(e => url + e);
    for (const candidate of candidates) {
        try {
            if (fs.statSync(candidate).isFile()) return candidate;
        } catch {
            /* not there */
        }
    }
    return undefined;
}

export function dojo(options: DojoPluginOptions): Plugin {
    if (!options || !options.loaderConfig) {
        throw new Error("vite-plugin-dojo: the 'loaderConfig' option is required");
    }

    let resolver!: DojoResolver;
    let root = process.cwd();
    let globalContext!: string;
    let globalReference!: string;
    let buildFeatures!: Record<string, unknown>;
    const runtimeFeatures = new Set(options.runtimeFeatures || []);
    const useGlobalContextMode = options.globalRequireMode === "context";

    const replacements = [
        { test: /^dojo\/selector\/_loader!default$/, replace: "dojo/selector/lite" },
        { test: /^dojo\/request\/default!$/, replace: "dojo/request/xhr" },
        ...(options.moduleReplacement || [])
    ];

    function applyReplacements(absMid: string): string | undefined {
        for (const rule of replacements) {
            if (rule.test.test(absMid)) {
                return typeof rule.replace === "function" ? rule.replace(absMid) : rule.replace;
            }
        }
        return undefined;
    }

    /** absMid of `importer`, or a directory reference when it is not a Dojo module. */
    function referenceOf(importer: string | undefined): string {
        if (!importer) return useGlobalContextMode ? globalContext : globalReference;
        const v = parseVirtual(importer);
        if (v) return (v.payload && v.payload.reference) || globalContext;
        const { file, params } = splitId(importer);
        const mid = params.get(MID_QUERY);
        if (mid) return mid;
        return normalizePath(path.dirname(file)) + "/";
    }

    function dojoId(file: string, absMid: string): string {
        return `${normalizePath(file)}?${MID_QUERY}=${encodeURIComponent(absMid)}`;
    }

    /** Convert Vite root-relative ids like /eclwatch/Foo.js into real workspace file paths. */
    function toWorkspaceFile(file: string): string {
        if (!file.startsWith("/") || fs.existsSync(file)) return file;
        const rooted = normalizePath(path.resolve(root, "." + file));
        return fs.existsSync(rooted) ? rooted : file;
    }

    const AMD_DEFINE = /(^|[^\w.$])define\s*\(/m;
    const ESM_SYNTAX = /^(?:import|export)\s/m;

    /** True when a file looks like an AMD module, used to decide whether to claim it. */
    function looksAmd(file: string): boolean {
        try {
            return AMD_DEFINE.test(fs.readFileSync(file, "utf-8"));
        } catch {
            return false;
        }
    }

    /** True when a file has top-level ES module syntax — it is an ESM file, not pure AMD. */
    function looksEsmSource(source: string): boolean {
        return ESM_SYNTAX.test(source
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\/\/.*$/gm, ""));
    }

    function looksEsm(file: string): boolean {
        try {
            return looksEsmSource(fs.readFileSync(file, "utf-8"));
        } catch {
            return false;
        }
    }

    /** Directories that name a module id prefix, longest first. */
    let midIndex!: Array<{ name: string; dir: string }>;

    function buildMidIndex(): Array<{ name: string; dir: string }> {
        const entries: Array<{ name: string; dir: string }> = [];
        const seen = new Set<string>();
        const add = (name: string, dir: string | undefined) => {
            if (!name || !dir || seen.has(name)) return;
            seen.add(name);
            entries.push({ name, dir: normalizePath(dir) });
        };
        for (const name of Object.keys(resolver.config.paths || {})) add(name, resolver.toUrl(name));
        // A package maps to its directory; toUrl() would resolve it to the main module.
        for (const pkg of resolver.config.packages || []) {
            if (pkg && pkg.name) add(pkg.name, path.resolve(resolver.config.baseUrl, pkg.location || pkg.name));
        }
        entries.sort((a, b) => b.dir.length - a.dir.length);
        return entries;
    }

    /**
     * All module ids that address `file`, most specific first. A file can be reachable
     * under several ids (e.g. via `paths` and via `baseUrl`); the first is canonical and
     * the rest become runtime aliases for it.
     */
    function midsForFile(file: string): string[] {
        const noExt = normalizePath(file).replace(/\.[mc]?js$/, "");
        const mids: string[] = [];
        for (const entry of midIndex) {
            if (noExt === entry.dir) mids.push(entry.name);
            else if (noExt.startsWith(entry.dir + "/")) {
                mids.push(entry.name + "/" + noExt.slice(entry.dir.length + 1));
            }
        }
        const rel = path.posix.relative(resolver.config.baseUrl, noExt);
        if (rel && !rel.startsWith("..")) mids.push(rel);
        return mids;
    }

    /** Resolves a plain (extension-less) module id through the Dojo loader config. */
    function resolvePlain(mid: string, reference: string): string | undefined {
        const requested = resolver.toAbsMid(mid, reference);
        let file = existingFile(resolver.toUrl(requested));
        if (!file) {
            // Not covered by the loader config: fall back to Node resolution so that AMD
            // packages installed in node_modules (dojo, dijit, dojox, ...) still get an absMid.
            file = nodeResolve(requested);
            if (!file || !looksAmd(file)) return undefined;
        }
        if (!JS_EXTENSIONS.includes(path.extname(file))) {
            // Non-JS files (e.g. CSS) are returned as plain paths so vite handles them directly.
            return normalizePath(file);
        }
        return dojoId(file, midsForFile(file)[0] || requested);
    }

    function nodeResolve(absMid: string): string | undefined {
        try {
            const resolved = createRequire(path.join(root, "index.js")).resolve(absMid);
            return path.isAbsolute(resolved) ? normalizePath(resolved) : undefined;
        } catch {
            return undefined;
        }
    }

    /**
     * Resolves `<plugin>!<resource>` loader-extension syntax.
     */
    function resolvePlugin(mid: string, reference: string): string | undefined {
        const bang = mid.indexOf("!");
        const rawPlugin = mid.slice(0, bang);
        const resource = mid.slice(bang + 1);

        // dojo/loaderProxy?loader=<mid>&deps=<mid,...>&name=<name>!<resource>
        if (rawPlugin.split("?")[0] === "dojo/loaderProxy") {
            const query = new URLSearchParams(rawPlugin.slice(rawPlugin.indexOf("?") + 1));
            const loader = query.get("loader");
            if (!loader) throw new DojoPluginError("dojo/loaderProxy requires a 'loader' query arg");
            const name = query.get("name") ?? resource;
            const deps = (query.get("deps") || "").split(",").filter(Boolean);
            const toAbs = (m: string) => m.split("!").map(part => resolver.toAbsMid(part, reference)).join("!");
            return virtual("proxy", {
                absMid: `${toAbs(loader)}!${name ? toAbs(name) : ""}`,
                loader,
                name: name ? toAbs(name) : "",
                deps,
                reference
            } satisfies ProxyPayload);
        }

        const pluginAbsMid = resolver.toAbsMid(rawPlugin, reference);
        if (pluginAbsMid === "dojo/has") {
            return resolveHas(resource, reference);
        }

        const resourceAbsMid = resource ? resolver.toAbsMid(resource, reference) : "";
        const fullAbsMid = `${pluginAbsMid}!${resourceAbsMid}`;

        const replaced = applyReplacements(fullAbsMid);
        if (replaced !== undefined) {
            return virtual("alias", { absMid: fullAbsMid, target: replaced, reference } satisfies AliasPayload);
        }

        if (pluginAbsMid === "dojo/text") {
            const file = existingFile(resolver.toUrl(resourceAbsMid));
            if (!file) return undefined;
            return virtual("text", { absMid: fullAbsMid, file } satisfies TextPayload);
        }

        if (pluginAbsMid === "dojo/i18n") {
            return virtual("i18n", { absMid: fullAbsMid, bundle: resourceAbsMid, reference } satisfies I18nPayload);
        }

        // CSS loader plugins: resolve the resource file and let vite handle it.
        if (pluginAbsMid === "css" || pluginAbsMid === "xstyle/css") {
            const file = existingFile(resolver.toUrl(resourceAbsMid));
            if (!file) return NOMODULE_ID;
            return normalizePath(file);
        }

        // Anything else runs the Dojo loader extension on the client.
        return virtual("proxy", {
            absMid: fullAbsMid,
            loader: pluginAbsMid,
            name: resourceAbsMid || resource,
            deps: [],
            reference
        } satisfies ProxyPayload);
    }

    function resolveHas(expr: string, reference: string): string | undefined {
        const features = { ...buildFeatures };
        for (const name of runtimeFeatures) delete features[name];
        const reduced = reduceHasExpr(parseHasExpr(expr), features, options.coerceUndefinedToFalse);

        if (reduced === null) return NOMODULE_ID;
        if (typeof reduced === "string") {
            return resolveMid(reduced, reference);
        }
        const absMid = `dojo/has!${stringifyHasExpr(reduced, m => resolver.toAbsMid(m, reference))}`;
        return virtual("has", { absMid, expr: reduced, reference } satisfies HasPayload);
    }

    /** Full resolution of a Dojo module id to a Rollup id, or undefined. */
    function resolveMid(mid: string, reference: string): string | undefined {
        if (!mid || PSEUDO.has(mid)) return undefined;
        if (mid.includes("!")) return resolvePlugin(mid, reference);

        const absMid = resolver.toAbsMid(mid, reference);
        const replaced = applyReplacements(absMid);
        if (replaced !== undefined && replaced !== absMid) {
            return virtual("alias", { absMid, target: replaced, reference } satisfies AliasPayload);
        }
        return resolvePlain(mid, reference);
    }

    /* ------------------------------------------------------------ codegen */

    function runtimeSource(): string {
        const source = fs.readFileSync(path.join(HERE, "runtime", "amd.js"), "utf-8");
        const features: Record<string, unknown> = { ...DEFAULT_RUNTIME_FEATURES, ...resolver.features };
        for (const name of runtimeFeatures) delete features[name];
        const globalBase = path.posix.relative(resolver.config.baseUrl, globalContext);
        const runtimeOptions = {
            globalBase: useGlobalContextMode
                ? (globalBase ? globalBase + "/" : "") + "x"
                : globalReference,
            undefinedStaticDependenciesAreCircular: useGlobalContextMode
        };
        return `${source}\n__dojoConfigure(${JSON.stringify(resolver.config)}, ${JSON.stringify(features)}, ${JSON.stringify(runtimeOptions)});\n`;
    }

    function runnerSource(): string {
        // Mirrors dojo-webpack-plugin's runner: drives a Dojo loader extension's load().
        return `export default function runner(ldr, name, req, async) {
	var resolveFn, result, resultSet;
	ldr.load(name, req, function(data) {
		result = data;
		resultSet = true;
		if (resolveFn) resolveFn(data);
	}, {isBuild: true});
	if (resultSet) return result;
	if (!async) throw new Error(name + " unavailable");
	return new Promise(function(resolve) { resolveFn = resolve; });
}
`;
    }

    function hasSource(payload: HasPayload): string {
        const mids = [...new Set(hasExprMids(payload.expr))];
        const lines = [`import { __dojoHas, __dojoRegister } from ${JSON.stringify(RUNTIME_ID)};`];
        const names = new Map<string, string>();
        mids.forEach((mid, i) => {
            names.set(mid, `__b${i}`);
            lines.push(`import __b${i} from ${JSON.stringify(mid)};`);
        });
        const expr = build(payload.expr);
        lines.push(`export default __dojoRegister(${JSON.stringify(payload.absMid)}, ${expr});`);
        return lines.join("\n");

        function build(node: HasExprNode): string {
            if (node === null) return "undefined";
            if (typeof node === "string") return names.get(node)!;
            return `(__dojoHas(${JSON.stringify(node.feature)}) ? ${build(node.then)} : ${build(node.else)})`;
        }
    }

    function aliasSource(payload: AliasPayload): string {
        return [
            `import { __dojoRegister } from ${JSON.stringify(RUNTIME_ID)};`,
            `import __target from ${JSON.stringify(payload.target)};`,
            `export default __dojoRegister(${JSON.stringify(payload.absMid)}, __target);`
        ].join("\n");
    }

    function textSource(payload: TextPayload): string {
        const content = fs.readFileSync(payload.file, "utf-8");
        return [
            `import { __dojoRegister } from ${JSON.stringify(RUNTIME_ID)};`,
            `export default __dojoRegister(${JSON.stringify(payload.absMid)}, ${JSON.stringify(content)});`
        ].join("\n");
    }

    function proxySource(payload: ProxyPayload): string {
        const lines = [
            `import { __dojoDep, __dojoRegister, __dojoRequireFor } from ${JSON.stringify(RUNTIME_ID)};`,
            `import __runner from ${JSON.stringify(RUNNER_ID)};`,
            `import __loader from ${JSON.stringify(payload.loader)};`
        ];
        const entries: string[] = [];
        payload.deps.forEach((dep, i) => {
            const absMid = dep.split("!").map(part => resolver.toAbsMid(part, payload.reference)).join("!");
            lines.push(`import __d${i} from ${JSON.stringify(dep)};`);
            entries.push(`${JSON.stringify(absMid)}: __dojoDep(() => __d${i}, ${JSON.stringify(absMid)})`);
        });
        lines.push(
            `const __req = __dojoRequireFor(${JSON.stringify(payload.absMid)}, {${entries.join(", ")}});`,
            `export default __dojoRegister(${JSON.stringify(payload.absMid)}, __runner(__loader, ${JSON.stringify(payload.name)}, __req, ${!!options.async}));`
        );
        return lines.join("\n");
    }

    function i18nSource(payload: I18nPayload): string {
        const absMid = payload.bundle;
        const file = existingFile(resolver.toUrl(absMid));
        const loader = resolvePlain("dojo/i18n", payload.reference);
        if (!file) {
            throw new DojoPluginError(`cannot find nls bundle '${absMid}'`);
        }
        if (!loader) {
            throw new DojoPluginError("cannot resolve the dojo/i18n loader");
        }
        const match = /^(.+\/)?nls\/([^/]+)\/?(.*?)$/.exec(absMid);
        if (!match) {
            throw new DojoPluginError(`'${absMid}' must live in an nls directory`);
        }
        const isLocaleBundle = !!match[3];
        const deps: string[] = [];
        if (!isLocaleBundle) {
            const bundle = evalBundle(fs.readFileSync(file, "utf-8"), file);
            const seen = new Set<string>();
            for (const requested of options.locales || ["*"]) {
                for (const locale of availableLocales(requested, bundle)) {
                    const localeAbsMid = `${match[1] || ""}nls/${locale}/${match[2]}`;
                    if (!seen.has(localeAbsMid)) {
                        seen.add(localeAbsMid);
                        deps.push(localeAbsMid);
                    }
                }
            }
        }
        deps.push(absMid);

        const lines = [
            `import { __dojoDep, __dojoRegister, __dojoRequireFor } from ${JSON.stringify(RUNTIME_ID)};`,
            `import __runner from ${JSON.stringify(RUNNER_ID)};`,
            `import __loader from ${JSON.stringify(loader)};`
        ];
        const entries: string[] = [];
        deps.forEach((dep, i) => {
            lines.push(`import __d${i} from ${JSON.stringify(dep)};`);
            entries.push(`${JSON.stringify(dep)}: __dojoDep(() => __d${i}, ${JSON.stringify(dep)})`);
        });
        lines.push(
            `const __req = __dojoRequireFor(${JSON.stringify(payload.absMid)}, {${entries.join(", ")}});`,
            `export default __dojoRegister(${JSON.stringify(payload.absMid)}, __runner(__loader, ${JSON.stringify(absMid)}, __req, ${!!options.async}));`
        );
        return lines.join("\n");
    }

    /* ------------------------------------------------------------- plugin */

    return {
        name: "vite-plugin-dojo",
        enforce: "pre",

        configResolved(config) {
            root = normalizePath(config.root || process.cwd());
            resolver = new DojoResolver(options, root);
            buildFeatures = { ...resolver.features };
            midIndex = buildMidIndex();
            globalContext =
                normalizePath(options.globalContext ? path.resolve(root, options.globalContext) : root) + "/";
            const globalBase = path.posix.relative(resolver.config.baseUrl, globalContext);
            globalReference = (globalBase && globalBase !== "." ? globalBase + "/" : "") + "x";
        },

        resolveId(source, importer) {
            if (!resolver) return null;
            if (source.startsWith(PREFIX)) return source;
            if (source.startsWith("\0")) return null;
            // The transform emits fully resolved ids so that global-require dependencies
            // keep the context they were resolved in.
            if (source.includes(`?${MID_QUERY}=`)) {
                const { file, params } = splitId(source);
                const resolvedFile = toWorkspaceFile(file);
                return resolvedFile === file ? source : joinQuery(resolvedFile, params);
            }

            if (source.includes("!")) {
                try {
                    return resolveMid(source, referenceOf(importer)) || null;
                } catch (err) {
                    if (err instanceof DojoPluginError) return this.error(err.message);
                    throw err;
                }
            }

            // Only manage imports from dojo-owned modules. Plain ESM files (e.g. @fluentui/*)
            // must resolve their deps natively so they receive real named exports, not a
            // dojo-wrapped default-only version.
            const importerFile = importer ? splitId(importer).file : "";
            const importerMid = importer ? splitId(importer).params.get(MID_QUERY) : null;
            const syntheticDojoImporter = !!importerMid && !fs.existsSync(importerFile);
            const isDojoPeer = !importer
                || importer.startsWith(PREFIX)
                || (importer.includes(`?${MID_QUERY}=`)
                    && (syntheticDojoImporter || (looksAmd(importerFile) && !looksEsm(importerFile))));
            if (!isDojoPeer) return null;

            const reference = referenceOf(importer);
            try {
                return resolveMid(source, reference) || null;
            } catch (err) {
                if (err instanceof DojoPluginError) return this.error(err.message);
                throw err;
            }
        },

        load: {
            filter: { id: [VIRTUAL_ID_FILTER, MID_ID_FILTER] },
            handler(id) {
                const v = parseVirtual(id);
                if (v) {
                    try {
                        switch (v.kind) {
                            case "runtime":
                                return runtimeSource();
                            case "runner":
                                return runnerSource();
                            case "nomodule":
                                return "export default undefined;";
                            case "has":
                                return hasSource(v.payload as HasPayload);
                            case "alias":
                                return aliasSource(v.payload as AliasPayload);
                            case "text":
                                return textSource(v.payload as TextPayload);
                            case "proxy":
                                return proxySource(v.payload as ProxyPayload);
                            case "i18n":
                                return i18nSource(v.payload as I18nPayload);
                            default:
                                return null;
                        }
                    } catch (err) {
                        return this.error(err instanceof DojoPluginError ? err.message : (err as Error));
                    }
                }
                const { file, params } = splitId(id);
                if (!params.has(MID_QUERY)) return null;
                let source = fs.readFileSync(toWorkspaceFile(file), "utf-8");
                if (options.locales && /(^|\/)nls\/[^/]+$/.test(params.get(MID_QUERY)!)) {
                    source = restrictRootBundle(source, file, options.locales) || source;
                }
                return source;
            }
        },

        transform: {
            filter: { id: JS_ID_FILTER },
            async handler(code, id) {
                const { file, params } = splitId(id);
                let absMid = params.get(MID_QUERY) || undefined;
                if (!absMid) {
                    // Entry modules reach the plugin as a plain path (from an HTML <script> or a
                    // dev-server URL), so derive their module id from the loader config.
                    if (file.startsWith("\0") || !JS_EXTENSIONS.includes(path.extname(file))) return null;
                    absMid = midsForFile(file)[0];
                    if (!absMid) return null;
                }
                if (looksEsmSource(code)) return null;

                let ast;
                try {
                    ast = this.parse(code);
                } catch {
                    return null;
                }
                const info = analyze(ast as unknown as AstNode);
                if (!info.isAmd) return null;

                const self = dojoId(file, absMid);
                const prologue = [`import * as __dojoRt from ${JSON.stringify(RUNTIME_ID)};`];
                const aliases: Array<[string, string]> = [];
                let n = 0;

                // The global require resolves relative ids against the global context, so its
                // dependencies must be resolved as if imported from there.
                const globalImporter = useGlobalContextMode
                    ? `${globalContext}__global__.js?${MID_QUERY}=${encodeURIComponent(globalContext)}`
                    : virtual("global-importer", { reference: globalReference });

                const canonicalOf = (resolvedId: string): string | undefined => {
                    const v = parseVirtual(resolvedId);
                    if (v) return v.payload && v.payload.absMid;
                    return splitId(resolvedId).params.get(MID_QUERY) || undefined;
                };

                /** Records the mid a dependency was requested by so the runtime can resolve it. */
                const noteAlias = (canonical: string | undefined, requested: string | undefined) => {
                    if (canonical && requested && canonical !== requested) aliases.push([canonical, requested]);
                };

                /** Emits a static import and returns a runtime dependency descriptor. */
                const importFor = async (mid: string, importer: string, reference: string) => {
                    const resolved = await this.resolve(mid, importer, { skipSelf: false });
                    if (!resolved) return undefined;
                    const name = `__dj${n++}`;
                    const spec = JSON.stringify(resolved.id);
                    let needsInterop = false;
                    if (resolved.id.startsWith(PREFIX)) {
                        // Virtual modules always export default via __dojoRegister
                        prologue.push(`import ${name} from ${spec};`);
                    } else if (splitId(resolved.id).params.has(MID_QUERY)) {
                        // AMD files processed by transform export default; plain ES modules do not.
                        // A file with ESM syntax is an ESM bundle even if it incidentally contains
                        // define() from a bundled UMD dep — treat it as ESM.
                        const { file: resolvedFile } = splitId(resolved.id);
                        if (looksAmd(resolvedFile) && !looksEsm(resolvedFile)) {
                            prologue.push(`import ${name} from ${spec};`);
                        } else {
                            prologue.push(`import * as ${name} from ${spec};`);
                            needsInterop = true;
                        }
                    } else {
                        prologue.push(`import * as ${name} from ${spec};`);
                        needsInterop = true;
                    }
                    const requested = resolver.toAbsMid(mid, reference);
                    noteAlias(canonicalOf(resolved.id), requested);
                    const unwrapDefault = needsInterop && options.esmInterop !== "namespace";
                    return `__dojoRt.__dojoDep(() => ${name}, ${JSON.stringify(requested)}${unwrapDefault ? ", 1" : ""})`;
                };

                const lazyFor = async (mid: string, importer: string, reference: string, target: string[]) => {
                    const resolved = await this.resolve(mid, importer, { skipSelf: false });
                    if (!resolved) return;
                    const requested = resolver.toAbsMid(mid, reference);
                    noteAlias(canonicalOf(resolved.id), requested);
                    target.push(
                        `${JSON.stringify(mid)}: {load: () => import(${JSON.stringify(resolved.id)}), absMid: ${JSON.stringify(requested)}}`
                    );
                };

                const statics: string[] = [];
                const lazies: string[] = [];
                const globalStatics: string[] = [];
                const globalLazies: string[] = [];
                const cjs: string[] = [];

                for (const mid of info.contextDeps) {
                    const dep = await importFor(mid, self, absMid);
                    if (dep) statics.push(`${JSON.stringify(mid)}: ${dep}`);
                }
                for (const mid of info.cjsDeps) {
                    const dep = await importFor(mid, self, absMid);
                    if (dep) cjs.push(`${JSON.stringify(mid)}: ${dep}`);
                }
                for (const mid of info.contextAsyncDeps) await lazyFor(mid, self, absMid, lazies);
                for (const mid of info.globalAsyncDeps) {
                    if (useGlobalContextMode) {
                        const dep = await importFor(mid, globalImporter, globalContext);
                        if (dep) globalStatics.push(`${JSON.stringify(mid)}: ${dep}`);
                    } else {
                        await lazyFor(mid, globalImporter, globalReference, globalLazies);
                    }
                }

                // The same file can be addressed by several module ids.
                for (const alias of midsForFile(file)) noteAlias(absMid, alias);

                for (const [canonical, alias] of aliases) {
                    prologue.push(`__dojoRt.__dojoAlias(${JSON.stringify(canonical)}, ${JSON.stringify(alias)});`);
                }
                prologue.push(
                    `const __dojo = __dojoRt.__dojoModule({absMid: ${JSON.stringify(absMid)},` +
                    ` statics: {${statics.join(", ")}}, lazies: {${lazies.join(", ")}},` +
                    ` globalStatics: {${globalStatics.join(", ")}}, globalLazies: {${globalLazies.join(", ")}},` +
                    ` cjs: {${cjs.join(", ")}}});`
                );

                // The body is handed to the runtime as source text so that it can be evaluated in
                // sloppy mode. Dojo's declare() reads `arguments.callee`, which throws in an ES
                // module, and every module body is strict once Rollup emits it as ESM.
                const magic = new MagicString(code);
                magic.overwrite(
                    0,
                    code.length,
                    `var __dojoValue = __dojoRt.__dojoRun(__dojo, ${jsString(code)}, ${jsString(normalizePath(file))});`
                );
                magic.prepend(`${prologue.join("\n")}\n`);
                magic.append("\nexport { __dojoValue as default };\n");
                return { code: magic.toString(), map: magic.generateMap({ hires: true }) };
            }
        }
    };
}
