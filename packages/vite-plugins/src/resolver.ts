import { createLoaderScope, referenceFor, resolveLoaderConfig } from "./dojoLoader.js";
import type {
    DojoLoaderConfig,
    DojoLoaderScope,
    DojoPluginOptions,
    DojoRequire,
    ReferenceModule
} from "./types.js";

/** Either an absMid of the requesting module or a directory reference (trailing separator). */
export type Reference = string | ReferenceModule;

/**
 * Wraps the vm-hosted Dojo loader with the id/url conversions the Vite plugin needs.
 */
export class DojoResolver {
    readonly options: DojoPluginOptions;
    readonly context: string;
    readonly config: DojoLoaderConfig;
    readonly scope: DojoLoaderScope;
    readonly require: DojoRequire;
    readonly dojoPath: string;

    constructor(options: DojoPluginOptions, context: string) {
        this.options = options;
        this.context = context;
        this.config = resolveLoaderConfig(
            options.loaderConfig,
            context,
            options.buildEnvironment || options.environment
        );
        this.scope = createLoaderScope(this.config, context);
        this.require = this.scope.require;
        this.dojoPath = this.scope.dojoPath;
    }

    /** Features known at build time, used to evaluate `dojo/has!` conditionals. */
    get features(): Record<string, unknown> {
        return this.config.has || {};
    }

    /**
     * Turns a (possibly relative) mid into an absolute mid.
     * `from` is either an absMid of the requesting module or a directory reference.
     */
    toAbsMid(mid: string, from?: Reference): string {
        if (!mid) return mid;
        try {
            return this.require.toAbsMid(mid, from ? refModule(from) : undefined);
        } catch {
            return mid;
        }
    }

    /** Maps an absMid to an on-disk path (without extension resolution). */
    toUrl(mid: string, from?: Reference): string | undefined {
        if (!mid) return undefined;
        try {
            const url = this.require.toUrl(mid, from ? refModule(from) : undefined);
            return url && url !== mid ? url : undefined;
        } catch {
            return undefined;
        }
    }
}

function refModule(from: Reference): ReferenceModule {
    if (typeof from !== "string") return from;
    // A directory reference is signalled by a trailing separator.
    return /[\\/]$/.test(from) ? referenceFor(from) : { mid: from };
}
