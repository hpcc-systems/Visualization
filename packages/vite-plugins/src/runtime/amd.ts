/*
 * Client-side AMD runtime for vite-plugin-dojo.
 *
 * Modules transformed by the plugin keep their original `define(...)` body; the plugin
 * only injects module-scoped `define` and `require` bindings created here, plus static
 * ESM imports for every dependency it could resolve at build time.
 *
 * Like Dojo, the free `require` identifier is the *global* require (relative ids resolve
 * against the global context) while a require listed as a dependency is a *context*
 * require (relative ids resolve against the module).
 */

/** A dependency the plugin imported eagerly; `value` is read lazily. */
export interface StaticDep {
    absMid: string;
    readonly value: any;
}

/** A dependency behind a dynamic import, used for asynchronous `require([...])`. */
export interface LazyDep {
    absMid: string;
    load(): Promise<any>;
}

export type Dep = StaticDep | LazyDep;

/** The module scope description the plugin emits for each transformed AMD module. */
export interface ModuleSpec {
    absMid: string;
    statics?: Record<string, StaticDep>;
    lazies?: Record<string, LazyDep>;
    globalBase?: string;
    globalStatics?: Record<string, StaticDep>;
    globalLazies?: Record<string, LazyDep>;
    cjs?: Record<string, StaticDep>;
}

export interface AmdRequire {
    (mid: string): any;
    (mids: string[], callback?: (...args: any[]) => any, errback?: (err: any) => void): any;
    toAbsMid(mid: any): string;
    toUrl(mid: any): string;
    has: typeof __dojoHas;
    rawConfig: Record<string, any>;
    on: typeof on;
    signal: typeof signal;
    async: number;
    undef?(mid: string): void;
}

export type AmdDefine = ((a: any, b?: any, c?: any) => any) & { amd?: boolean };

const registry: Record<string, any> = Object.create(null); // absMid -> module value
const aliases: Record<string, string> = Object.create(null); // alternate absMid -> canonical absMid
const undefed = new Set<string>(); // absMids removed by require.undef
const listeners: Record<string, Array<(event: any) => void>> = Object.create(null);

let rawConfig: Record<string, any> = {};
let hasCache: Record<string, any> = Object.create(null);
let hasContextObj: any = null;
let globalBase = "";
let undefApi = false;
let circularDependencyProxies = true;
let undefinedStaticDependenciesAreCircular = false;

const NOT_LOADED: any = { notLoaded: true };
const EMPTY: Record<string, never> = Object.freeze({});
const UNINITIALIZED = Symbol("vite-plugin-dojo.uninitialized");
const circularDependencies = new Map<string, any>();

function circularDependency(absMid: string): any {
    let dependency = circularDependencies.get(absMid);
    if (dependency) return dependency;

    const target = function (this: any, ...args: any[]) {
        const value = registry[absMid];
        if (typeof value !== "function") {
            throw new TypeError(`vite-plugin-dojo: circular dependency '${absMid}' is not callable`);
        }
        return value.apply(this, args);
    };
    dependency = new Proxy(target, {
        get(_target, property) {
            const value = registry[absMid];
            return value === undefined ? undefined : Reflect.get(value, property, value);
        },
        set(_target, property, value) {
            const dependencyValue = registry[absMid];
            if (dependencyValue === undefined) return false;
            return Reflect.set(dependencyValue, property, value, dependencyValue);
        },
        has(_target, property) {
            const value = registry[absMid];
            return value !== undefined && property in value;
        }
    });
    circularDependencies.set(absMid, dependency);
    return dependency;
}

function getGlobal(): any {
    // @ts-expect-error
    return typeof globalThis !== "undefined" ? globalThis : self;
}

export function __dojoConfigure(
    config: Record<string, any>,
    features: Record<string, any>,
    options?: {
        globalBase?: string;
        circularDependencyProxies?: boolean;
        undefinedStaticDependenciesAreCircular?: boolean;
    }
): void {
    rawConfig = config || {};
    hasCache = Object.assign(Object.create(null), features || {});
    if (rawConfig.has) Object.assign(hasCache, rawConfig.has);
    rawConfig.hasCache = hasCache;
    __dojoHas.cache = hasCache;
    globalBase = (options && options.globalBase) || "";
    circularDependencyProxies = options?.circularDependencyProxies !== false;
    undefinedStaticDependenciesAreCircular = !!options?.undefinedStaticDependenciesAreCircular;
    undefApi = !!hasCache["dojo-undef-api"];

    const g = getGlobal();
    if (g.dojoConfig) {
        for (const key of Object.keys(g.dojoConfig)) {
            if (!(key in rawConfig)) rawConfig[key] = g.dojoConfig[key];
        }
    }
    // Expose the merged config as window.dojoConfig so AMD modules can read it.
    g.dojoConfig = rawConfig;
    // Feature tests receive a read-through view of the global object: reads see the real
    // globals (including accessors such as `navigator`), writes stay local.
    hasContextObj = new Proxy(Object.create(null), {
        get: (local, prop) => (prop in local ? local[prop] : Reflect.get(g, prop, g)),
        set: (local, prop, value) => {
            local[prop] = value;
            return true;
        },
        has: (local, prop) => prop in local || prop in g,
        deleteProperty: (local, prop) => {
            delete local[prop];
            return true;
        }
    });

    if (!g.require) {
        g.require = new ModuleContext({ absMid: globalBase }).require;
    }
}

/* ------------------------------------------------------------------ has.js */

export function __dojoHas(name: string): any {
    const entry = hasCache[name];
    if (typeof entry === "function") {
        const doc = getGlobal().document;
        hasCache[name] = entry(hasContextObj, doc, doc && doc.createElement("div"));
        return hasCache[name];
    }
    return entry;
}

__dojoHas.cache = hasCache;

__dojoHas.add = function (name: string, test: any, now?: boolean, force?: boolean): any {
    if (!(name in hasCache) || force) hasCache[name] = test;
    return now ? __dojoHas(name) : undefined;
};

__dojoHas.remove = function (name: string): void {
    delete hasCache[name];
};

/* -------------------------------------------------------------- mid utils */

/** Resolves a relative mid against the absMid of the requesting module. */
function resolveRelative(mid: string, fromAbsMid: string | undefined): string {
    if (mid.charAt(0) !== ".") return mid;
    const base = String(fromAbsMid || "").split("/");
    base.pop();
    for (const part of mid.split("/")) {
        if (part === "." || part === "") continue;
        if (part === "..") base.pop();
        else base.push(part);
    }
    return base.join("/");
}

/* ------------------------------------------------------------- module ctx */

/**
 * A dependency scope: module ids exactly as written in the source, mapped to the
 * value (statics) or a lazy importer (lazies) the plugin resolved at build time.
 */
class Scope {
    base: string;
    statics: Record<string, StaticDep>;
    lazies: Record<string, LazyDep>;
    fallback: Scope | undefined;

    constructor(
        base: string,
        statics?: Record<string, StaticDep>,
        lazies?: Record<string, LazyDep>,
        fallback?: Scope
    ) {
        this.base = base;
        this.statics = statics || EMPTY;
        this.lazies = lazies || EMPTY;
        // Non-relative ids mean the same thing in every scope, so the global require can
        // reuse what the plugin resolved for the module's own dependencies.
        this.fallback = fallback;
    }

    entry(mid: string): Dep | undefined {
        const own = this.statics[mid] || this.lazies[mid];
        if (own) return own;
        if (this.fallback && mid.charAt(0) !== ".") return this.fallback.entry(mid);
        return undefined;
    }

    toAbsMid(mid: any): string {
        if (typeof mid !== "string") return mid;
        const entry = this.entry(mid);
        if (entry) return entry.absMid;
        return mid.split("!").map(part => resolveRelative(part, this.base)).join("!");
    }

    /** The registry key for `mid`, following aliases. */
    key(mid: string): string {
        const absMid = this.toAbsMid(mid);
        return aliases[absMid] || absMid;
    }

    lookup(mid: string): any {
        const key = this.key(mid);
        if (key in registry) return registry[key];
        const entry = this.entry(mid);
        if (entry && "value" in entry && !undefed.has(key)) {
            const value = entry.value;
            if (value === UNINITIALIZED) {
                return circularDependencyProxies ? circularDependency(key) : undefined;
            }
            return value;
        }
        return NOT_LOADED;
    }
}

class ModuleContext {
    absMid: string;
    cjs: Record<string, StaticDep>;
    context: Scope;
    globalScope: Scope;
    value: any;
    module: any;
    exports: any;
    contextRequire: AmdRequire;
    require: AmdRequire;
    define: AmdDefine;

    constructor(spec: ModuleSpec) {
        this.absMid = spec.absMid;
        this.cjs = spec.cjs || EMPTY;
        this.context = new Scope(spec.absMid, spec.statics, spec.lazies);
        this.globalScope = new Scope(
            spec.globalBase !== undefined ? spec.globalBase : globalBase,
            spec.globalStatics,
            spec.globalLazies,
            this.context
        );
        this.value = undefined;
        this.contextRequire = makeRequire(this, this.context);
        this.require = makeRequire(this, this.globalScope);
        this.define = makeDefine(this);
    }

    lookup(scope: Scope, mid: string): any {
        if (mid in this.cjs) return this.cjs[mid].value;
        return scope.lookup(mid);
    }
}

function makeRequire(ctx: ModuleContext, scope: Scope): AmdRequire {
    const req = function (mid: any, callback?: any, errback?: any): any {
        if (typeof mid === "string") {
            const value = ctx.lookup(scope, mid);
            if (value === NOT_LOADED) {
                throw new Error("vite-plugin-dojo: module not found: " + mid);
            }
            return value;
        }
        return asyncRequire(ctx, scope, mid, callback, errback);
    } as AmdRequire;

    req.toAbsMid = mid => scope.toAbsMid(mid);
    req.toUrl = mid => {
        const absMid = scope.toAbsMid(mid);
        if (/^(\/|\w+:)/.test(absMid)) return absMid;
        const base = String(rawConfig.baseUrl || "./").replace(/\/?$/, "/");
        return base + (/\.[^/.]*$/.test(absMid) ? absMid : absMid + ".js");
    };
    req.has = __dojoHas;
    req.rawConfig = rawConfig;
    req.on = on;
    req.signal = signal;
    req.async = 1;
    if (undefApi) {
        req.undef = mid => {
            const key = scope.key(mid);
            delete registry[key];
            undefed.add(key);
        };
    }
    return req;
}

function interop(ns: any): any {
    return ns && typeof ns === "object" && "default" in ns ? ns.default : ns;
}

/**
 * Describes a statically imported dependency. The value is read on demand because
 * Dojo has circular dependencies: reading an ES module binding that is still
 * initialising throws, and Dojo's own loader passes `undefined` in that situation.
 */
export function __dojoDep(get: () => any, absMid: string, needsInterop?: number): StaticDep {
    return {
        absMid,
        get value() {
            try {
                const value = needsInterop ? interop(get()) : get();
                return value === undefined && undefinedStaticDependenciesAreCircular ? UNINITIALIZED : value;
            } catch {
                return UNINITIALIZED;
            }
        }
    };
}

/**
 * Dojo invokes the callback synchronously when every module is already loaded and
 * several loader extensions rely on that, so only go async when something must be
 * fetched.
 */
function asyncRequire(
    ctx: ModuleContext,
    scope: Scope,
    mids: string | string[],
    callback?: (...args: any[]) => any,
    errback?: (err: any) => void
): any {
    const list = Array.isArray(mids) ? mids : [mids];
    const values: any[] = new Array(list.length);
    const missing: Array<{ mid: string }> = [];
    const pending: Array<Promise<void>> = [];

    list.forEach((mid, idx) => {
        if (mid === "require") return void (values[idx] = ctx.contextRequire);
        if (mid === "module") return void (values[idx] = ctx.module);
        if (mid === "exports") return void (values[idx] = ctx.exports);
        const value = ctx.lookup(scope, mid);
        if (value !== NOT_LOADED) return void (values[idx] = value);
        const lazy = scope.lazies[mid];
        if (lazy) {
            pending.push(lazy.load().then(ns => void (values[idx] = interop(ns))));
            return;
        }
        // An eagerly imported module that require.undef removed: bring it back.
        const entry = scope.entry(mid);
        if (entry && "value" in entry) {
            values[idx] = __dojoRegister(scope.key(mid), entry.value);
            return;
        }
        missing.push({ mid: mid });
    });

    if (missing.length) {
        const err: any = new Error(
            "vite-plugin-dojo: module(s) not found: " + missing.map(m => m.mid).join(", ")
        );
        err.info = missing;
        if (errback) errback(err);
        else signal("error", err);
        return undefined;
    }
    if (!pending.length) {
        return callback ? callback.apply(null, values) : undefined;
    }
    return Promise.all(pending).then(() => (callback ? callback.apply(null, values) : undefined));
}

function makeDefine(ctx: ModuleContext): AmdDefine {
    const define = function define(a: any, b?: any, c?: any): any {
        let id: string | undefined;
        let deps: any;
        let factory: any;
        if (typeof a === "string") {
            id = a;
            deps = b;
            factory = c;
        } else {
            deps = a;
            factory = b;
        }
        if (factory === undefined) {
            factory = deps;
            deps = [];
        }
        if (!Array.isArray(deps)) {
            factory = deps;
            deps = [];
        }

        const absMid = id || ctx.absMid;
        const module = { id: absMid, exports: {} as any, config: () => ({}) };
        if (!id) {
            ctx.module = module;
            ctx.exports = module.exports;
        }

        let value: any;
        if (typeof factory === "function") {
            const args = (deps as string[]).map(mid => {
                if (mid === "require") return ctx.contextRequire;
                if (mid === "module") return module;
                if (mid === "exports") return module.exports;
                const dep = ctx.lookup(ctx.context, mid);
                if (dep === NOT_LOADED) {
                    throw new Error("vite-plugin-dojo: unresolved dependency '" + mid + "' of " + absMid);
                }
                return dep;
            });
            value = factory.apply(getGlobal(), args);
            if (value === undefined) value = module.exports;
            else module.exports = value;
        } else {
            value = factory;
        }

        __dojoRegister(absMid, value);
        if (!id) ctx.value = value;
        return value;
    } as AmdDefine;
    define.amd = true;
    return define;
}

/* --------------------------------------------------------------- signals */

function on(type: string, listener: (event: any) => void): { remove(): void } {
    const bucket = listeners[type] || (listeners[type] = []);
    bucket.push(listener);
    return {
        remove() {
            const i = bucket.indexOf(listener);
            if (i >= 0) bucket.splice(i, 1);
        }
    };
}

function signal(type: string, event: any): void {
    (listeners[type] || []).slice().forEach(listener => listener(event));
}

/* ------------------------------------------------------------ public API */

/** Creates the module scope injected above every transformed AMD module. */
export function __dojoModule(spec: ModuleSpec): ModuleContext {
    return new ModuleContext(spec);
}

/**
 * Evaluates an AMD module body. `new Function` is what makes this work: its body runs in
 * sloppy mode, whereas the surrounding ES module is always strict. Dojo's declare() reads
 * `arguments.callee` on every instantiation and `this.inherited(arguments)` needs the same,
 * both of which throw in strict mode.
 */
export function __dojoRun(ctx: ModuleContext, source: string, sourceUrl?: string): any {
    const body = sourceUrl ? source + "\n//# sourceURL=" + sourceUrl : source;
    new Function("define", "require", body).call(getGlobal(), ctx.define, ctx.require);
    return ctx.value;
}

/** Registers a value produced by a synthesized module (has!, text!, i18n!, ...). */
export function __dojoRegister(absMid: string, value: any): any {
    registry[absMid] = value;
    undefed.delete(absMid);
    return value;
}

/** Declares that `alias` addresses the same module as `canonical`. */
export function __dojoAlias(canonical: string, alias: string): void {
    if (alias !== canonical) aliases[alias] = canonical;
}

/** A context require bound to `absMid`, used by loader-extension proxies. */
export function __dojoRequireFor(absMid: string, statics: Record<string, StaticDep>): AmdRequire {
    return new ModuleContext({ absMid, statics }).contextRequire;
}

export { registry as __dojoRegistry };
