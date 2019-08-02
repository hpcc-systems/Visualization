---
title: Using "iife" with "npm" 
root: '/docs'
parents: ['Installation']
---

[(github sources)](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/iife_npm)

Rather than relying on unpkg to cache and resolve the libraries from the npm repository, this example downloads the libraries to the local development folder using the node package manger (npm) command line tool.

1. Install npm - the easiest way to do this is to install the latest LTS version of Node JS from:  https://nodejs.org/en/download
2. Create a new "package.json" file in the root folder for your project (if it doesn't already exist):
```bash
npm init
```
Simply selecting the defaults for all the prompts should produce a bare-bones package.json file:
```json
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
```bash
npm install -s @hpcc-js/chart
```

Once completed your package.json file will now contain a versioned reference to your new dependency:
```json
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

