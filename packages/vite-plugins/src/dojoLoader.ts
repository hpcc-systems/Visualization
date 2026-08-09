/*
 * Loads the real Dojo loader (dojo.js) into a Node vm context so that build-time
 * module id resolution uses exactly the same algorithm as Dojo does at runtime.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

import type { DojoLoaderConfig, DojoLoaderScope, LoaderConfigInput, ReferenceModule } from "./types.js";

const nodeRequire = createRequire(import.meta.url);

/** Features baked into the client-side has cache. */
export const DEFAULT_RUNTIME_FEATURES: Record<string, unknown> = {
    "vite": 1,
    "webpack": 1,
    "host-browser": 1,
    "dom": 1,
    "dojo-loader": 1,
    "dojo-has-api": 1,
    "dojo-dom-ready-api": 1,
    "dojo-sniff": 1,
    "dojo-test-sniff": 1,
    "config-deferredInstrumentation": 1,
    "config-tlmSiblingOfDojo": 1
};

/** Features used when hosting the loader in Node; keeps dojo.js off browser globals. */
const LOADER_BUILD_FEATURES: Record<string, unknown> = {
    "foreign-loader": 1,
    "dojo-config-api": 1,
    "csp-restrictions": 1,
    "dojo-built": 1,
    "config-dojo-loader-catches": 0,
    "config-tlmSiblingOfDojo": 0,
    "dojo-log-api": 0,
    "dojo-publish-privates": 0,
    "dojo-sync-loader": 0,
    "dojo-timeout-api": 0,
    "dojo-trace-api": 0,
    "dojo-sniff": 0,
    "dojo-test-sniff": 0,
    "dojo-cdn": 0,
    "dojo-loader-eval-hint-url": 0,
    "config-stripStrict": 0,
    "ie-event-behavior": 0,
    "dom": 0,
    "host-browser": 0,
    "host-node": 0,
    "host-rhino": 0,
    "host-webworker": 0,
    "dojo-force-activex-xhr": 0,
    "dojo-enforceDefine": 0,
    "dojo-combo-api": 0
};

/*
 * Dojo's toAbsMid/toUrl misbehave when a package main module resolves outside of the
 * package directory. Mirror of dojo-webpack-plugin's DojoLoaderNonLocalMainPatch.
 */
const MAIN_MODULE_PATCH = `(function() {
    Object.keys(require.packs).forEach(function(key) {
        var pkg = require.packs[key];
        if ((/(^\\/)|(:)/.test(pkg.main)
            || pkg.main.split('/').reduce(function(acc, part) {
                if (acc < 0 || part === '.') return acc;
                return part === '..' ? --acc : ++acc;
            }, 0) <= 0)
            && typeof pkg.realMain === 'undefined'
        ) {
            pkg.realMain = pkg.main;
            pkg.main = '';
        }
    });
    require.originalToAbsMid = require.toAbsMid;
    require.originalToUrl = require.toUrl;
    require.toAbsMid = function(name, referenceModule) {
        var absMid = require.originalToAbsMid(name, referenceModule);
        if (absMid.indexOf('/') === absMid.length - 1) {
            var pkgName = absMid.substring(0, absMid.length - 1);
            var pkg = require.packs[pkgName];
            if (pkg && pkg.realMain) absMid = pkgName;
        }
        return absMid;
    };
    require.toUrl = function(name, referenceModule) {
        var url = require.originalToUrl(name, referenceModule);
        var pkg = require.packs[name];
        if (pkg && pkg.realMain) {
            var parts = url.split('?');
            parts[0] = /(^\\/)|(:)/.test(pkg.realMain) ? pkg.realMain : parts[0] + '/' + pkg.realMain;
            url = parts.join('?');
        }
        return url;
    };
})();`;

/**
 * Resolves the `loaderConfig` plugin option into a plain config object.
 * Accepts an object, a function of `environment`, or the id of a module exporting either.
 */
export function resolveLoaderConfig(
    loaderConfig: LoaderConfigInput,
    context: string,
    environment?: Record<string, unknown>
): DojoLoaderConfig {
    let config: any = loaderConfig;
    if (typeof config === "string") {
        const resolved = config.startsWith(".") ? path.resolve(context, config) : config;
        const mod = nodeRequire(nodeRequire.resolve(resolved, { paths: [context] }));
        config = mod && mod.__esModule ? mod.default : mod;
    }
    if (typeof config === "function") {
        config = config(environment || {});
    }
    config = { ...(config || {}) };
    config.baseUrl = path.resolve(context, config.baseUrl || ".").replace(/\\/g, "/");
    return config as DojoLoaderConfig;
}

function findDojoPath(config: DojoLoaderConfig, context: string): string {
    const pkg = (config.packages || []).find(p => p && p.name === "dojo");
    if (pkg) {
        const location = pkg.location || pkg.name;
        const candidate = path.isAbsolute(location) ? location : path.resolve(context, location);
        if (fs.existsSync(path.join(candidate, "dojo.js"))) {
            return candidate;
        }
    }
    if (config.paths && config.paths.dojo) {
        const location = config.paths.dojo;
        const candidate = path.isAbsolute(location) ? location : path.resolve(context, location);
        if (fs.existsSync(path.join(candidate, "dojo.js"))) {
            return candidate;
        }
    }
    return path.dirname(nodeRequire.resolve("dojo/dojo.js", { paths: [context, process.cwd()] }));
}

/**
 * Boots dojo.js inside a vm and returns the loader scope. `scope.require` provides
 * `toAbsMid`/`toUrl`, and `scope.require.rawConfig` the post-processed config.
 */
export function createLoaderScope(config: DojoLoaderConfig, context: string): DojoLoaderScope {
    const dojoPath = findDojoPath(config, context);
    const dojoFile = path.join(dojoPath, "dojo.js");
    const source = fs.readFileSync(dojoFile, "utf-8");

    const scope: any = {};
    scope.global = scope.window = scope;
    scope.console = { log() { }, warn() { }, error() { } };
    scope.dojoConfig = {
        ...config,
        has: {
            ...LOADER_BUILD_FEATURES,
            ...config.has,
            // dojo.js must not touch browser globals while running under Node
            "dom": 0,
            "host-browser": 0,
            "host-node": 0,
            "host-webworker": 0,
            "dojo-config-api": 1,
            "dojo-publish-privates": 1
        }
    };
    vm.createContext(scope);
    vm.runInContext(
        `(function(global, window) {${source}\n${MAIN_MODULE_PATCH}})`,
        scope,
        dojoFile
    ).call(scope, scope, scope);

    scope.dojoPath = dojoPath;
    return scope as DojoLoaderScope;
}

/**
 * Reference module for resolving a mid relative to a directory rather than a module.
 */
export function referenceFor(dir: string): ReferenceModule {
    return { mid: path.join(dir, "x").replace(/\\/g, "/") };
}
