# IMPORT, REQUIRE and Global Namespaces

Depending on how the `@hpcc-js` packages have been included into your web app, there are 3 common paradigms for accessing the widgets within the packages.  While the majority of the examples in this documentation use the `import` method, it is important to note that depending on your apps configuration any of the 3 common options are interchangeable.

##  \<SCRIPT> and Global Namespaces

Tends to be used on smaller or "quick" web page construction, the packages are typically loaded from a CDN server and are accessed via global namespace.  Each `@hpcc-js` package will set up a global variable matching the package name.
**Note:**  Because the global variable includes "/" in its name, it will need to be accessed using `OBJ["prop"]` syntax, this is deliberate as it reduces the chance that our global variable names will clash with other third party libraries.

```html
<!DOCTYPE html>
<html>

<head>
    <title>CDN + SCRIPT</title>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/@hpcc-js/util"></script>
    <script src="https://unpkg.com/@hpcc-js/common"></script>
    <script src="https://unpkg.com/@hpcc-js/api"></script>
    <script src="https://unpkg.com/@hpcc-js/chart"></script>
    <script>
        var hpccChart = window["@hpcc-js/chart"];
    </script>
</head>

<body>
    <div id="placeholder" style="width:640px;height:480px">
    </div>
    <script>
        const myPie = new hpccChart.Pie()
            .target("placeholder")
            .columns(["label", "weight"])
            .data([["Hello", 43], ["World", "43]])
            .render()
        ;
    </script>
</body>

</html>
```

##  ES6 IMPORT

Typically used by folks who are either targeting modern browsers, or who use transpilers like Babel or TypeScript.  Typically used in conjunction with bundlers WEbpack or RollupJS.
**Note:**  All the "live" samples in this documentation will use this notation.

```javascript
import { Pie } from "@hpcc-js/chart";

const myPie = new Pie();
...
myPie.render();
```

##  AMD REQUIRE 

While AMD loading is probably less popular than `import` + `WebPack` it can be very useful during the development phase of a WebApp.

```javascript
require(["@hpcc-js/chart"], function(hpccChart) {
    const Pie = hpccChart.Pie;

    const myPie = new Pie();
    ...
    myPie.render();
});
```

##  CommonJS REQUIRE 

This paradigm is not typically used by front end developers and has subtly different to AMD REQUIRE

```javascript
const Pie = require("@hpcc-js/chart").Pie;

const myPie = new Pie();
...
myPie.render();
```
