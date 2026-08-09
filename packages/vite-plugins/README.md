# @hpcc-js/vite-plugins

Build [Dojo 1.x](https://dojotoolkit.org/) applications with [Vite](https://vite.dev/).

This is a Vite/Rollup counterpart to
[dojo-webpack-plugin](https://github.com/OpenNTF/dojo-webpack-plugin). It lets you keep
writing plain Dojo AMD modules — `define`, synchronous and asynchronous `require`,
`dojo/has!`, `dojo/text!`, `dojo/i18n!` — and have Vite bundle them, tree-shake them and
code-split them like any other ES module graph.

- Module ids are resolved with the **real Dojo loader**, run in a Node VM at build time,
  so `baseUrl`, `paths`, `packages`, `map` and `aliases` behave exactly as they do at
  runtime.
- AMD modules are rewritten to ES modules, so Rollup sees a normal static import graph.
- Asynchronous `require([...])` becomes a dynamic import, so on-demand modules land in
  their own chunk.
- Works in `vite build` and in the dev server.
- Written in TypeScript and ships type declarations.
- Widget toolkits built on `dojo/_base/declare`, such as dijit, work unchanged.

## Install

```sh
npm install --save-dev @hpcc-js/vite-plugins
npm install --save dojo dojo-util dijit dojox
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
        paths: { app: "./js" },
        packages: [{ name: "dojo", location: "./node_modules/dojo" }],
      },
    }),
  ],
});
```

```js
// js/main.js
define(["dojo/dom", "dojo/on", "dojo/text!app/banner.txt"], function (
  dom,
  on,
  banner,
) {
  dom.byId("banner").textContent = banner;

  // Split out into its own chunk and fetched on demand
  require(["app/about"], function (about) {
    console.log(about.text);
  });
});
```

Point an HTML entry at the module and Vite does the rest:

```html
<script type="module" src="./js/main.js"></script>
```

A complete working app lives in [example/](example). It builds the application layout from
Dojo's [Layout with Dijit](https://dojotoolkit.org/documentation/tutorials/1.10/dijit_layout/index.html)
tutorial — a `BorderContainer` with a resizable sidebar and a `TabContainer` — declared in
markup and instantiated by `dojo/parser`, plus a `dijit/Dialog` loaded on demand so it lands
in its own chunk.

If you pull in a dijit theme, set `build.cssMinify` to `false`, as the example does. dijit's
stylesheets still carry IE hacks such as `#zoom: 1`, which Vite's default lightningcss
minifier rejects. Its `errorRecovery` option is not a fix: it discards the whole enclosing
rule, which quietly drops `.dijitInline { display: inline-block }` and breaks widget layout
in production builds while dev looks fine.

## Options

### `loaderConfig` (required)

The Dojo loader config. May be an object, a function of `environment` returning one, or
the id of a module that exports either. Only the properties that affect module
resolution are used at build time (`baseUrl`, `paths`, `packages`, `map`, `aliases`,
`has`); the whole config is serialised into the bundle as `require.rawConfig` so that
`dojo/_base/config` works as usual.

### `environment` / `buildEnvironment`

Passed to `loaderConfig` when it is a function. `buildEnvironment` takes precedence at
build time, which lets you use different paths for building and for running.

### `has` features

Features declared in `loaderConfig.has` are used to resolve `dojo/has!` conditionals at
build time. A conditional whose feature is undefined at build time is deferred to run
time, and every branch it can reach is included in the bundle.

### `coerceUndefinedToFalse`

Treat undefined features as `false` when evaluating `dojo/has!` at build time, so no
conditional module loading survives into the bundle.

### `runtimeFeatures`

An array of feature names that must always be evaluated at run time, even when the
loader config gives them a value. Useful for tests that flip features and reload modules.

### `locales`

Which locales `dojo/i18n!` should bundle. Defaults to every locale the root bundle
enables; pass `[]` for the root locale only.

### `globalContext`

Directory used to resolve relative module ids passed to the _global_ `require`. Like
Dojo, this plugin distinguishes the free `require` identifier (relative ids resolve
against the global context) from a `require` listed as a dependency (relative ids
resolve against the module). Defaults to the Vite root.

### `async`

Allow Dojo loader extensions proxied to the client to resolve asynchronously.

### `esmInterop`

Controls how static ESM dependencies are passed to AMD factories. The default,
`"default"`, unwraps a module's default export. Use `"namespace"` for AMD code
written against webpack-style ESM namespace objects.

### `moduleReplacement`

The equivalent of webpack's `NormalModuleReplacementPlugin`, used to map Dojo loader
extensions onto something Vite can bundle. Each rule is `{ test: RegExp, replace }`,
matched against the resolved absMid, where `replace` is a module id or a function
returning one.

```js
dojo({
  loaderConfig: {
    /* ... */
  },
  moduleReplacement: [
    { test: /^dojox\/gfx\/renderer!/, replace: "dojox/gfx/canvas" },
  ],
});
```

These replacements are built in:

| Module id                       | Replaced with        |
| ------------------------------- | -------------------- |
| `dojo/selector/_loader!default` | `dojo/selector/lite` |
| `dojo/request/default!`         | `dojo/request/xhr`   |

## Loader extensions

| Extension     | Handling                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `dojo/has!`   | Resolved at build time where possible, otherwise a runtime conditional over statically imported branches |
| `dojo/text!`  | Inlined as a string                                                                                      |
| `dojo/i18n!`  | Root bundle plus the matching locale bundles, resolved by `dojo/i18n` on the client                      |
| anything else | Proxied: the extension's `load()` runs on the client                                                     |

For an extension that needs other modules available synchronously, use the
`dojo/loaderProxy` request form, exactly as in dojo-webpack-plugin:

```js
moduleReplacement: [
  {
    test: /^svg!/,
    replace: (mid) => {
      const resource = mid.slice("svg!".length);
      return `dojo/loaderProxy?loader=svg&deps=${encodeURIComponent("dojo/text!" + resource).replace(/!/g, "%21")}!${resource}`;
    },
  },
];
```

## Declarative widgets and `dojo/parser`

`dojo/parser` reads `data-dojo-type` out of the DOM at run time, so the module ids never
appear in the source and static analysis cannot find them. Nothing errors — the parser simply
resolves nothing and no widgets are created.

List the widget classes as dependencies of a module that _is_ in the graph. That puts them in
the bundle and registers them under the ids the parser asks for, so its runtime `require`
resolves them from the registry:

```js
define([
  "dojo/parser",
  // referenced only by data-dojo-type, so they have to be named somewhere
  "dijit/layout/BorderContainer",
  "dijit/layout/TabContainer",
  "dijit/layout/ContentPane",
], function (parser) {
  parser.parse();
});
```

The same applies to any module id assembled at run time, such as
`require("dijit/form/" + name)`. [example/](example) uses the declarative layout from the
[Layout with Dijit](https://dojotoolkit.org/documentation/tutorials/1.10/dijit_layout/index.html)
tutorial and does exactly this.

## Plugin conventions

This is a Vite-only plugin, not a portable Rolldown/Rollup one: it reads the resolved
Vite config in `configResolved` to learn the project root, and normalizes ids with Vite's
`normalizePath`.

- Plugin name `vite-plugin-dojo`, `enforce: 'pre'` so module ids are resolved through the
  Dojo loader config before Vite's own resolver sees them.
- Applies to both `serve` and `build`; the same transform runs in dev and in the bundle.
- Synthesized modules (`dojo/has!`, `dojo/text!`, `dojo/i18n!`, loader proxies and the AMD
  runtime) use `\0`-prefixed virtual ids so no other plugin tries to process them.
- `load` and `transform` declare hook filters. The handlers repeat the check, so the plugin
  still behaves correctly on versions that ignore filters.

## Strict mode and `new Function`

ES modules are always strict, but Dojo needs sloppy mode: `dojo/_base/declare` reads
`arguments.callee` in every generated constructor, and `this.inherited(arguments)` depends
on the same thing. Both throw a `TypeError` in strict code, which would make `declare` — and
therefore all of dijit and dojox — unusable.

So the plugin does not inline an AMD module's body. It passes the body to the runtime as
source text and evaluates it with `new Function("define", "require", body)`, whose body runs
in sloppy mode. dojo-webpack-plugin never had to do this because webpack wraps each module
in a function, which is sloppy already.

Two consequences:

- **A `script-src` CSP needs `'unsafe-eval'`.** Dojo itself already requires this unless you
  set the `csp-restrictions` has feature.
- Module bodies are not minified, since they live inside a string literal. Each body carries
  a `//# sourceURL` comment, so dev tools still show the original file with its original line
  numbers.

Modules that opt into strict mode themselves (`"use strict"` at the top of the factory) stay
strict, which is correct — no Dojo or dijit module combines that with `declare`.

## Differences from dojo-webpack-plugin

- No Dojo loader is embedded in the output. Module resolution happens entirely at build
  time, and a small runtime (~2 KB) provides the module registry, `has`, `require.toAbsMid`,
  `require.on` and `require.undef`.
- `require.toUrl()` returns a `baseUrl`-relative url derived from the absMid rather than
  running Dojo's full path mapping.
- `require.ensure` is a webpack API and is not provided; use `require([...], callback)`.
- Circular dependencies behave as they do under the Dojo loader: a module that is still
  initialising is passed as `undefined`, so cyclic modules should communicate through
  `exports`.

## Tests

The test suite runs on [Vitest](https://vitest.dev). The cases are ported from
dojo-webpack-plugin's `test/TestCases`: each is built with Vite and the resulting bundle is
executed, so the assertions run against real output.

```sh
npm test                             # run every case
npm run test:watch                   # re-run on change
DOJO_TEST_FILTER=loaders npm test    # only build and run cases matching "loaders"
```

`npm test` compiles the plugin first; the test cases load it from `dist/`.

The cases were written for mocha, so they declare tests through a global `it` and assert with
`should`. [test/cases.test.ts](test/cases.test.ts) installs both, builds every case and imports
its bundle in a top-level await, then turns what the bundles declared into real Vitest tests.
Vitest's own API is imported explicitly so the global `it` stays free for the fixtures.

One wrinkle: a case can pull in a lazily loaded chunk _while a test is running_, and that chunk
may declare further tests — long after Vitest has collected the suite. Those run together in a
trailing `tests declared by lazily loaded chunks` test, which is skipped when a case has none.

## Development

The plugin is written in TypeScript under `src/` and compiled to `dist/` with `tsc`.

```sh
npm run build          # compile src/ to dist/ with type declarations
npm run typecheck      # type-check src/, the test harness and the example
npm run dev            # build, then serve example/ with the dev server
npm run build:example  # build, then bundle example/ into example/dist
npm run preview        # build example/, then serve the production bundle
npm run clean          # remove dist/ and example/dist/
```

`npm run build` compiles the plugin, not the example — `dev`, `build:example` and `preview`
each run it first, so they can be used on their own.

`src/runtime/amd.ts` is the client-side AMD runtime. It is compiled like the rest of the
source, but its emitted JavaScript is read back at build time and injected into the
application bundle, so it must stay dependency-free.

## License

MIT or Apache-2.0, matching dojo-webpack-plugin, from which the test cases and several
algorithms (has expression evaluation, i18n bundle selection, the loader-extension
runner) are derived.
