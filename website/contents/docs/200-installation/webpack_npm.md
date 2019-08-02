---
title: Using "webpack" with "npm" 
root: '/docs'
parents: ['Installation']
---

[(GitHub sources)](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/webpack)
Assuming you have "npm" installed on your development machine and an existing project.

### Install dependencies:
```
npm install @hpcc-js/chart
npm install -d webpack webpack-cli
```

### Include a chart:
```javascript
//  src/index.js
import { Bar } from "@hpcc-js/chart"

const bar = new Bar()
    .target("placeholder")
    .columns(examResults.columns)
    .data(examResults.data)
    .render()
    ;
```

### Create a WebPack configuration file:
```javascript
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

## Run WebPack
```
webpack
```

## Include the bundled sources into your web page:
```html
...
<body>
...
    <div id="placeholder">
    </div>
    <script src="dist/index.js"></script>
...
</body>
...
```
