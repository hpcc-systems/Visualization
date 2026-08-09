/*
 * Public types shared by the plugin modules.
 */

export interface DojoPackageConfig {
    name: string;
    location?: string;
    main?: string;
}

/** A Dojo loader config, after `baseUrl` has been resolved to an absolute path. */
export interface DojoLoaderConfig {
    baseUrl: string;
    paths?: Record<string, string>;
    packages?: DojoPackageConfig[];
    has?: Record<string, unknown>;
    [option: string]: unknown;
}

/** `loaderConfig` as authored: an object, a factory of `environment`, or a module id exporting either. */
export type LoaderConfigInput =
    | Partial<DojoLoaderConfig>
    | ((environment: Record<string, unknown>) => Partial<DojoLoaderConfig>)
    | string;

export interface ModuleReplacement {
    test: RegExp;
    replace: string | ((absMid: string) => string);
}

export interface DojoPluginOptions {
    /** Dojo loader config, or the id of a module exporting one. */
    loaderConfig: LoaderConfigInput;
    /** Passed to `loaderConfig` when it is a function. */
    environment?: Record<string, unknown>;
    /** Build-time override for `environment`. */
    buildEnvironment?: Record<string, unknown>;
    /** Locales to include for `dojo/i18n!`. Defaults to all. */
    locales?: string[];
    /** Treat undefined `has` features as false at build time. */
    coerceUndefinedToFalse?: boolean;
    /** Features to always resolve at run time. */
    runtimeFeatures?: string[];
    /** Allow loader extensions to resolve asynchronously. */
    async?: boolean;
    /** How static ESM dependencies are passed to AMD factories. Defaults to `default`. */
    esmInterop?: "default" | "namespace";
    /** Path used to resolve relative mids passed to the global require. */
    globalContext?: string;
    /** Resolution mode for free/global require() dependencies. */
    globalRequireMode?: "reference" | "context";
    moduleReplacement?: ModuleReplacement[];
}

/** Reference module accepted by the Dojo loader's `toAbsMid`/`toUrl`. */
export interface ReferenceModule {
    mid: string;
}

export interface DojoRequire {
    toAbsMid(mid: string, referenceModule?: ReferenceModule): string;
    toUrl(mid: string, referenceModule?: ReferenceModule): string;
    rawConfig: DojoLoaderConfig;
    packs: Record<string, DojoPackageConfig & { realMain?: string }>;
}

/** The vm scope dojo.js was booted in. */
export interface DojoLoaderScope {
    require: DojoRequire;
    dojoPath: string;
}
