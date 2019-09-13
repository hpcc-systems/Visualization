# Installation

All @hpcc-js packages are published to the [NPM repository](https://www.npmjs.com/~hpcc-js) and support AMD, CommonJS, IIFE and ES6 style modules.  They also include support for the [unpkg](https://www.unpkg.com) + [jsdelivr](https://www.jsdelivr.com/) CDN servers.

There are many fully working boilerplate examples in the [repository](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart):
* [CDN + \<SCRIPT>](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/iife_unpkg)
* [NPM + \<SCRIPT>](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/iife_npm)
* [CDN + AMD](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/amd_unpkg)
* [NPM + AMD](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/amd_npm)
* [NPM + WebPack](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/webpack)
* [NPM + Rollup.js](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/rollup)

## NPM + WebPack 

Assuming you have "npm" installed on your development machine and an existing project.

_[(sources)](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/webpack)_ 

### Install dependencies:

```shell
npm install @hpcc-js/chart
npm install -g webpack webpack-cli
```

### JavaScript

Create a JavaScript file `src/index.js` that renders a Bar Chart (for more information see [@hpcc-js/chart](../packages/chart/docs/index.md)).

```javascript
//  ./src/index.js
import { Bar } from "@hpcc-js/chart"

const bar = new Bar()
    .target("target")
    .columns(["Label", "Weight"])
    .data([
        ["World", 52],
        ["Hello", 48]
    ])
    .yAxisDomainLow(0)
    .yAxisDomainHigh(100)
    .render()
    ;
```

### Create a WebPack configuration file:

```javascript
//  ./webpack.config..js

var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'index.js',
        library: "quickstart"
    },
    mode: "production"
}
```

### Run WebPack

```shell
webpack
```

### Include the bundled sources into your web page:

```html
<!DOCTYPE html>
<html>

<head>
    <title>WebPack</title>
    <meta charset="utf-8" />
</head>

<body>
    <div id="target">
    </div>
    <script src="dist/index.min.js"></script>
</body>

</html>
```

## CDN + https://unpkg.com

_Loading the sources directly from a CDN server (https://unpkg.com)_

Probably the simplest way to get started is to simply reference the required packages directly from https://unpkg.com servers.  The main downsides to this approach are:
* Reliant on third party service up time.
* Need to manually include all dependencies.
* Be mindful of global namespace pollution.

_[(sources)](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/iife_unpkg)_ 

```html
<head>
...
<script src="https://unpkg.com/@hpcc-js/util"></script>
    <script src="https://unpkg.com/@hpcc-js/common"></script>
    <script src="https://unpkg.com/@hpcc-js/api"></script>
    <script src="https://unpkg.com/@hpcc-js/chart"></script>
    <script>
        var Column = window["@hpcc-js/chart"].Column;
    </script>
...
</head>

<body>
    <div id="placeholder">
        <!--  Placeholder for Visualization  -->
    </div>
    <script>
        var columnChart = new Column()      //  Create new instance of Column
            .target("placeholder")          //  Nominate target on web page 
            .columns(["Subject", "Result"]) //  Set "Columns"
            .data([                         //  Set "Data"
                ["English", 45],
                ["Irish", 28],
                ["Math", 98],
                ["Geography", 48],
                ["Science", 82]
            ])
            .render()                       //  Render
            ;
    </script>
</body>
```

## NPM + \<SCRIPT>
Rather than relying on unpkg to cache and resolve the libraries from the npm repository, this example downloads the libraries to the local development folder using the node package manger (npm) command line tool.

[(sources)](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/iife_npm)

1. Install npm - the easiest way to do this is to install the latest LTS version of Node JS from:  https://nodejs.org/en/download
2. Create a new "package.json" file in the root folder for your project (if it doesn't already exist):

```shell
npm init
```

Simply selecting the defaults for all the prompts should produce a bare-bones package.json file:
```javascript
{
  "name": "@hpcc-js/iife_npm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

3. Install the libraries you need (npm will automatically download all dependencies for you).  The `-s` option will save a reference to it in your package.json:

```shell
npm install -s @hpcc-js/chart
```

Once completed your package.json file will now contain a versioned reference to your new dependency:

```javascript
{
  "name": "@hpcc-js/iife_npm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "@hpcc-js/chart": "^2.1.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Now we can replace any references to "unpkg" from the previous example, with the locally installed equivalent files: 
```html
<head>
...
    <script src="node_modules/@hpcc-js/common/dist/index.min.js"></script>
    <script src="node_modules/@hpcc-js/api/dist/index.min.js"></script>
    <script src="node_modules/@hpcc-js/chart/dist/index.min.js"></script>
    <script>
        var Column = window["@hpcc-js/chart"].Column;
    </script>
...
</head>

<body>
    <div id="placeholder">
        <!--  Placeholder for Visualization  -->
    </div>
    <script>
        var columnChart = new Column()      //  Create new instance of Column
            .target("placeholder")          //  Nominate target on web page 
            .columns(["Subject", "Result"]) //  Set "Columns"
            .data([                         //  Set "Data"
                ["English", 45],
                ["Irish", 28],
                ["Math", 98],
                ["Geography", 48],
                ["Science", 82]
            ])
            .render()                       //  Render
            ;
    </script>
</body>
```
