# H3 Demo

_A working example combining the H3 ECL Plugin with embedded Visualization_

![Animated Demo](readme.gif)

## Project Layout

* **ecl**:  ECL Development Code (historic only)
* **res**:  Visualization Resources
* **src**:  Visualization Source Code (TypeScript)
* **h3Helper.ecl**:  ECL H3 Macro
* **h3Helper.manifest**:  ECL Manifest (to auto include the visualization resources)
* **package.json**:  npm dependencies
* **README.md**:  This file
* **tsconfig.json**:  TypeScript compiler options
* **rollup.config.json**:  JavaScript bundle configuration

## ECL Usage

```c++
IMPORT $ as VizDemoH3;

cities := VizDemoH3.h3Helper('~gjs::canada', lat, lon);

//  Submit to thor  ---
cities.buildAllIndex;

//  Compile and Publish to Roxie  ---
cities.h3Query;
```

## Building Visualization Resources

```
npm install

npm run build
```
