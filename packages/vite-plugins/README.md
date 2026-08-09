# @hpcc-js/vite-plugins

Build Dojo 1.x AMD applications with Vite.

This package provides the `dojo()` Vite plugin that resolves Dojo module ids with the real
Dojo loader config at build time, transforms AMD modules into an ESM graph for Rollup/Vite,
and preserves Dojo runtime behavior where needed.

This plugin is based on the excellent work of [dojo-webpack-plugin](https://github.com/OpenNTF/dojo-webpack-plugin).

## Install

`vite` and `dojo` are peer dependencies.

```sh
npm install --save-dev @hpcc-js/vite-plugins vite
npm install --save dojo
```

If your app uses Dijit/DojoX widgets, also install those packages:

```sh
npm install --save dijit dojox dojo-util
```

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { dojo } from "@hpcc-js/vite-plugins";

export default defineConfig({
    plugins: [
        dojo({
            loaderConfig: {
                baseUrl: ".",
                paths: { app: "src" },
                packages: [
                    { name: "dojo", location: "./node_modules/dojo" },
                    { name: "dijit", location: "./node_modules/dijit" },
                    { name: "dojox", location: "./node_modules/dojox" }
                ]
            },
            locales: ["en", "de"]
        })
    ]
});
```

```js
// src/main.js
define(["dojo/dom", "dojo/text!app/banner.txt"], function (dom, banner) {
    dom.byId("banner").textContent = banner;

    // Async require becomes a split chunk.
    require(["app/about"], function (about) {
        console.log(about.text);
    });
});
```

```html
<script type="module" src="./src/main.js"></script>
```

## Demo App

The package includes a full sample app in `tests-demo/` that exercises:

- declarative Dijit layout with `dojo/parser`
- `dojo/has!`
- `dojo/text!`
- `dojo/i18n!`
- async `require([...])` chunking

When using Dijit themes, set `build.cssMinify: false`. Dijit stylesheets still include
legacy IE declarations (for example `#zoom: 1`) that Vite's default CSS minifier rejects.

## Options

```ts
dojo({
    loaderConfig,
    environment,
    buildEnvironment,
    locales,
    coerceUndefinedToFalse,
    runtimeFeatures,
    async,
    esmInterop,
    globalContext,
    globalRequireMode,
    moduleReplacement
});
```

- `loaderConfig` (required): Dojo loader config object, a function of `environment`, or a module id exporting either.
- `environment`: Passed to `loaderConfig` when `loaderConfig` is a function.
- `buildEnvironment`: Build-time override for `environment`.
- `locales`: Locales to include for `dojo/i18n!` roots. Defaults to all locales in the root bundle. Use `[]` for root only.
- `coerceUndefinedToFalse`: Treat undefined `has` features as `false` at build time.
- `runtimeFeatures`: `has` feature names that must be evaluated at runtime even if present in loader config.
- `async`: Allow proxied loader extensions to resolve asynchronously on the client.
- `esmInterop`: How ESM dependencies are passed into AMD factories. `"default"` (default) unwraps default export, `"namespace"` passes namespace object.
- `globalContext`: Path used to resolve relative mids passed to free/global `require(...)`. Defaults to Vite root.
- `globalRequireMode`: `"reference"` (default) or `"context"` for how global `require` dependencies are resolved.
- `moduleReplacement`: Array of replacement rules `{ test: RegExp, replace }` for resolved absMids.

Built-in replacements:

| Module id                       | Replaced with        |
| ------------------------------- | -------------------- |
| `dojo/selector/_loader!default` | `dojo/selector/lite` |
| `dojo/request/default!`         | `dojo/request/xhr`   |

## Loader Extensions

| Extension     | Handling |
| ------------- | -------- |
| `dojo/has!`   | Evaluated at build time when possible, otherwise emitted as runtime conditional over statically imported branches |
| `dojo/text!`  | Inlined as a string |
| `dojo/i18n!`  | Emits root and selected locale bundles, then resolves through `dojo/i18n` runtime logic |
| other plugin ids | Proxied to runtime via loader `load()` |

For loaders that require sync access to additional deps, use `dojo/loaderProxy` in a replacement rule.

## Declarative Widgets and dojo/parser

`dojo/parser` resolves `data-dojo-type` module ids from markup at runtime, so those ids do not
appear in static imports automatically. Include those widget modules in an AMD dependency array
somewhere in your graph so they are bundled and registered.

## Runtime and CSP

The plugin evaluates AMD module bodies with `new Function(...)` so Dojo modules that depend on
sloppy mode behavior (notably `dojo/_base/declare`) continue to work.

This means:

- `script-src` CSP must allow `unsafe-eval`.
- module bodies are preserved as source strings, with `sourceURL` comments for debugging.

## Package Exports

- `@hpcc-js/vite-plugins`: plugin entry (`dojo`) and public types.
- `@hpcc-js/vite-plugins/runtime`: runtime module export.

## Tests

Vitest test projects are defined in `vitest.config.ts`.

```sh
npm test
npm run test-node
npm run test-browser
DOJO_TEST_FILTER=loaders npm test
```

Test cases live under `tests/TestCases/` and are built with Vite before execution.

## Development Scripts

```sh
npm run clean
npm run build
npm run watch
npm run bundle
npm run bundle-watch
npm run bundle-serve
npm run build:example
npm run preview:example
npm run lint
npm run docs
npm run coverage
```

Notes:

- `build` runs both type generation and Vite bundling.
- `build:example` and `preview:example` currently target `example/vite.config.ts`.
- the checked-in demo app is in `tests-demo/`.

## License

Apache-2.0
