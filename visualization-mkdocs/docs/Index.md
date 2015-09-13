# Visualization Framework 

[![Build Status](https://travis-ci.org/hpcc-systems/Visualization.svg?branch=master)](https://travis-ci.org/hpcc-systems/Visualization)
[![Join the chat at https://gitter.im/hpcc-systems/Visualization](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hpcc-systems/Visualization?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://gemnasium.com/hpcc-systems/Visualization.svg)](https://gemnasium.com/hpcc-systems/Visualization)
* _[Demo/Test Page](http://rawgit.com/hpcc-systems/Visualization/master/demos/test.html) and its [source](https://github.com/hpcc-systems/Visualization/blob/master/demos/test.html)_
* _[Dermatology Test Page](http://rawgit.com/hpcc-systems/Visualization/master/demos/dermatology.html) and its [source](https://github.com/hpcc-systems/Visualization/blob/master/demos/dermatology.html)_
* _[Wiki] (https://github.com/hpcc-systems/Visualization/wiki)_

The goal of the HPCC Visualisation Framework is to provide a comprehensive set of visualizations, adhering to a consistent set of interfaces. It includes wrappers for third party chart libraries (Google, C3 Charts, AM Charts etc.) as well as home grown visualizations (watch this space). It also adds a set of connectors and marshallers to make connecting visualizations to the HPCC Platform a trivial excercise.

### The obligatory Hello World [example](http://rawgit.com/hpcc-systems/Visualization/master/demos/HelloWorld/index.html)
```html
﻿<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <script src="http://viz.hpccsystems.com/v1.2.2/dist-amd/hpcc-viz.js"></script>
    <script src="http://viz.hpccsystems.com/v1.2.2/dist-amd/hpcc-bundles.js"></script>
    <script>
        require.config({
            paths: {
                "src": "http://viz.hpccsystems.com/v1.2.2/dist-amd",
                "font-awesome": "http://viz.hpccsystems.com/v1.2.2/dist-amd/font-awesome/css/font-awesome.min"
            }
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
* [AM Charts](http://www.amcharts.com/)
* [d3-cloud](https://github.com/jasondavies/d3-cloud)

While widgets/src also includes wrappers for CDN hosted visualizations:
* [Google Maps](https://developers.google.com/maps/)
* [Google Charts](https://developers.google.com/chart/)