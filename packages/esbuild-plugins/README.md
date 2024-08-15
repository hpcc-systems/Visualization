# esbuild-plugin-sfx-wasm

## Installation

With npm:

```sh
npm i -D esbuild-plugin-sfx-wasm
```

## Use-cases

**The primary motivation for this plugin is to simplify the bundling and distribution of web assembly modules**

- Compresses the wasm module using Zstd
- Encodes the compressed wasm module as a base91 string
- Generates a standalone module that decodes and instantiates the wasm module on demand

## Usage

### Build Config

```ts
import esbuild from "esbuild";
import sfxWasm from "esbuild-plugin-sfx-wasm";

esbuild.build({
  /* ... */
  plugins: [
    sfxWasm()
  ],
  /* ... */
});
```

### Usage in your code

```js
import loadCalculator from "../build/calculator.wasm";

async function add(a, b) {
  const calc = await loadCalculator();
  return calc.add(1, 2);
}
```
