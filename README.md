[![Build Status](https://travis-ci.org/GordonSmith/Visualization.svg?branch=TRAVIS-CI)](https://travis-ci.org/GordonSmith/Visualization)
# Visualization Framework 
* _[Demo/Test Page](http://rawgit.com/hpcc-systems/Visualization/master/demos/test.html) and its [source](https://github.com/hpcc-systems/Visualization/blob/master/demos/test.html)_
* _[Dermatology Test Page](http://rawgit.com/hpcc-systems/Visualization/master/demos/dermatology.html) and its [source](https://github.com/hpcc-systems/Visualization/blob/master/demos/dermatology.html)_
* _[Wiki] (https://github.com/hpcc-systems/Visualization/wiki)_

The goal of the visualization framework is to simplify the construction of visualizations and dashboards for Big Data on the HPCC Platform.  This project consists of the following key parts:

1. Provides a consistent interface to "off the shelf" and hand crafted visualizations.
2. Simplifies visualization instantiation and composition within HTML DOM and SVG DOM nodes (One visualization can be a combination of several others).
3. Provide connectors (marshallers) to the HPCC Platform.

### The obligatory Hello World [example](http://rawgit.com/hpcc-systems/Visualization/master/demos/HelloWorld.html)
```html
﻿<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <script src="../widgets/lib/requirejs/require.js"></script>
    <script src="../widgets/config.js"></script>
    <script>
        requirejs.config({
            baseUrl: "../widgets"
        });
    </script>
</head>
<body>
    <div id="helloWorld" style="width:100%; height:100vh">
    </div>
    <script>
        require(["src/common/TextBox"], function (TextBox) {
            var helloWorld = new TextBox()
                .target("helloWorld")
                .text("Hello\nWorld!")
                .render()
            ;
        });
    </script>
</body>
</html>
```

### Standing on the back of giants 
None of this would would be possible without the great work of others.  The widgets/lib folder includes the work from:
* [requirejs](http://requirejs.org/)
* [D3](http://d3js.org/)
* [Topojson](https://github.com/mbostock/topojson)
* [dagre](https://github.com/cpettitt/dagre)
* [Font-Awesome](http://fortawesome.github.io/Font-Awesome/) 
* [ColorBrewer](http://colorbrewer2.org/)
* [C3](http://c3js.org/)
* [d3-cloud](https://github.com/jasondavies/d3-cloud)

While widgets/src also includes wrappers for CDN hosted visualizations:
* [Google Maps](https://developers.google.com/maps/)
* [Google Charts](https://developers.google.com/chart/)
