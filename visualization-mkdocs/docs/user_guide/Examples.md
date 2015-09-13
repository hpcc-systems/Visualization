The below examples illustrate how to build, from scratch, a widget in both its AMD and non AMD form. By AMD form, we simply mean that the mechanism from which the javascript files are initialised and loaded is [RequireJS]  (http://requirejs.org/) encapsulation. By non-AMD form we mean that the library files are built to load without the use of RequireJS or any Module Dependency Manager via the [Gulp](http://gulpjs.com/) build system. (Gulp builds both NON-AMD and AMD versions of the library).  Comments are used when appropriate.


## Hello World 
### [AMD version](http://rawgit.com/Evan1415/hpcc_viz/master/HELLO_WORLD_EXAMPLES/hello_hard.html)
``` html

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <!-- CSS Styling -->
    <style>
        .common_TextBox .common_Shape {
            fill: #dcf1ff;
            stroke: #1f77b4;
        }

        .common_Text {
            fill: #000;
            font-size: 12px;
        }

        .common_Shape {
            fill: #1f77b4;
            stroke: #1f77b4;
        }

        
    </style>
    <!-- RequireJS Library -->
    <script src="http://rawgit.com/jrburke/requirejs/2.1.17/require.js"></script>
    <!-- Configuration Scripts -->
    <script src="../dist-amd/hpcc-viz.js"></script>
    <script src="../dist-amd/hpcc-bundles.js"></script>
    <script> require.config({
        paths: {
            "font-awesome": "../dist-amd/font-awesome/css/font-awesome.min",
            "src": "../dist-amd"
        }
    });
    </script>
    <!-- TextBox Widget Script -->
    <script>
        require(["../src/common/TextBox"], function (TextBox) {
            new TextBox()
                    .target("helloWorld")
                    .text("Hello\nWorld!")
                    .render()
            ;
        });
    </script>
</head>
<body>
<div id="helloWorld" style="width:400px; height:400px">
</div>
</body>
</html>

```
### [Non-AMD version](https://rawgit.com/Evan1415/hpcc_gulp/master/demos/hello_hard_namd.html)
``` html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <!-- CSS Styling -->
    <style>
        .common_TextBox .common_Shape {
            fill: #dcf1ff;
            stroke: #1f77b4;
        }

        .common_Text {
            fill: #000;
            font-size: 12px;
        }

        .common_Shape {
            fill: #1f77b4;
            stroke: #1f77b4;
        }

        .thumb {
            font-size: 12px;
            padding: 2px 2px 2px 2px;
            background: #f8f8f8;
            border-radius: 5px;
            border: 1px solid #e5e5e5;
            display: inline-block;
            overflow: hidden;
        }

        .small.thumb {
            width: 100px;
            height: 100px;
        }
    </style>
    <link rel="stylesheet" href="../dist/hpcc-viz.min.css">
    <!-- google api -->
    <script src="https://www.google.com/jsapi"></script>
    <!-- d3 -->
    <script src="../bower_components/d3/d3.js"></script>
    <!-- for gulp.js -->
    <script src="../dist/hpcc-viz-common.js"></script>
    <script>
        var graph = null;
        google.load("visualization", "1", {
            callback: doTest,
            packages: ["corechart"]
        });

        function doTest() {
            new common_TextBox()
                    .text("Text\nBox")
                    .target("textBox")
                    .render()
            ;
        }
    </script>
</head>
<body onload="doTest">
<div id="textBox" class="small thumb"></div>
</body>
</html>
```


## AM Bar Chart
### [AMD Version](http://rawgit.com/Evan1415/hpcc_viz/master/HELLO_WORLD_EXAMPLES/bar_hard.html) 
``` html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <!-- Require Script --> 
    <script src="http://rawgit.com/jrburke/requirejs/2.1.17/require.js"></script>
    <!-- Configuration Script -->
    <script>
        require.config({
            paths: {
                "css": "http://rawgit.com/guybedford/require-css/0.1.8/css.min",
                "css-builder": "http://rawgit.com/guybedford/require-css/0.1.8/css-builder.min",
                "d3": "http://rawgit.com/mbostock/d3/v3.5.5/d3.min",
                "colorbrewer": "http://rawgit.com/jeanlauliac/colorbrewer/v1.0.0/colorbrewer",
                "amcharts": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/amcharts",
                "amcharts.serial": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/serial",
                "amcharts.xy": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/xy"
            } ,

            shim: {
                "amcharts.serial": {
                    deps: ["amcharts"],
                    exports: "AmCharts",
                    init: function() {
                        AmCharts.isReady = true;
                    }
                },
                "amcharts.xy": {
                    deps: ["amcharts"],
                    exports: "AmCharts",
                    init: function() {
                        AmCharts.isReady = true;
                    }
                }
            }
        });
    </script>
    <!-- Widget Script -->
    <script>
        require(["../src/amchart/Bar"], function (AmBar) {
            new AmBar()
                    .target("ambar")
                    .columns(["Letter", "Frequency"])
                    .data([
                        ['A', .08167],
                        ['B', .01492],
                        ['C', .02782],
                        ['D', .04253],
                        ['E', .12702],
                        ['F', .02288],
                        ['G', .02015],
                        ['H', .06094],
                        ['I', .06966],
                        ['J', .00153],
                        ['K', .00772],
                        ['L', .04025],
                        ['M', .02406],
                        ['N', .06749],
                        ['O', .07507],
                        ['P', .01929],
                        ['Q', .00095],
                        ['R', .05987],
                        ['S', .06327],
                        ['T', .09056],
                        ['U', .02758],
                        ['V', .00978],
                        ['W', .02360],
                        ['X', .00150],
                        ['Y', .01974],
                        ['Z', .00074],
                    ])
                    .render()
            ;
        });
    </script>
</head>
<body>
<h1>Frequency of Letters in a sentence </h1>
<div id="ambar" class="xlarge thumb">
</div>
</body>
</html>
```

### [Non-AMD Version](https://rawgit.com/Evan1415/hpcc_gulp/master/demos/bar_hard_namd.html)
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <title>Non-AMD Am Bar Chart</title>
    <style>
        .thumb {
            font-size: 12px;
            padding: 2px 2px 2px 2px;
            background: #f8f8f8;
            border-radius: 5px;
            border: 1px solid #e5e5e5;
            display: inline-block;
            overflow: hidden;
        }
        .small.thumb {
            width: 100px;
            height: 100px;
        }
        .large.thumb {
            width: 500px;
            height: 500px;
        }
    </style>


    <script src="https://www.google.com/jsapi"></script>
    <script src="../bower_components/d3/d3.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/amcharts.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/serial.js"></script>
    <script src="../bower_components/colorbrewer/colorbrewer.js"></script>

    <script src="../dist/hpcc-viz-common.js"></script>
    <script src="../dist/hpcc-viz-api.min.js"></script>
    <script src="../dist/hpcc-viz-chart.min.js"></script>
    <script src="../dist/hpcc-viz-amchart.min.js"></script>


    <script>
        var graph = null;
        google.load("visualization", "1", {
            callback: doTest,
            packages: ["corechart"]
        });
        function doTest() {
            var timeoutStep = 500;
            var timeoutIdx = 0;
            setTimeout(function () {
                displayCharts();
            }, timeoutStep * timeoutIdx++);
            function displayCharts() {
                new amchart_Bar()
                        .target("ambar")
                        .columns(["Letter", "Frequency"])
                        .data([
                            ['A', .08167],
                            ['B', .01492],
                            ['C', .02782],
                            ['D', .04253],
                            ['E', .12702],
                            ['F', .02288],
                            ['G', .02015],
                            ['H', .06094],
                            ['I', .06966],
                            ['J', .00153],
                            ['K', .00772],
                            ['L', .04025],
                            ['M', .02406],
                            ['N', .06749],
                            ['O', .07507],
                            ['P', .01929],
                            ['Q', .00095],
                            ['R', .05987],
                            ['S', .06327],
                            ['T', .09056],
                            ['U', .02758],
                            ['V', .00978],
                            ['W', .02360],
                            ['X', .00150],
                            ['Y', .01974],
                            ['Z', .00074],
                        ])
                        .render()
                ;
            }
        }
    </script>


</head>


<body>


<div id="ambar" class="large thumb"></div>


</body>
</html> 
```

## Pie Chart 
### [AMD Version](http://rawgit.com/Evan1415/hpcc_viz/master/HELLO_WORLD_EXAMPLES/Pie.html)
``` html

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <script src="http://rawgit.com/jrburke/requirejs/2.1.17/require.js"></script>
    <link rel="stylesheet" type="text/css" href="test.css">
    <script src="../dist-amd/hpcc-viz.js"></script>
    <script src="../dist-amd/hpcc-bundles.js"></script>
    <script> require.config({
        paths: {
            "font-awesome": "../dist-amd/font-awesome/css/font-awesome.min",
            "src": "../dist-amd"
        }
    });
    </script>cd 
    <script>
        require(["../src/google/Pie"], function (GPie) {
            new GPie()
                    .target("gpie")
                    .columns(["Operating System", "Market Share"])
                    .data([
                        ["Windows 8", 23.5],
                        ["Windows 7", 51.1],
                        ["Windows Vista", 0.7],
                        ["Other Windows", 0.5],
                        ["Windows XP",3.3],
                        ["Linux",5.5],
                        ["Mac",10.2],
                        ["Mobile",5.4]
                    ])
                    .render()
            ;
        });
    </script>
</head>
<body>
<h1>Popularity of Operating Systems </h1>
<div id="gpie" class="xlarge thumb"></div>
</div>

</body>
</html>

```
### [Non-AMD Version] (http://rawgit.com/Evan1415/hpcc_viz/master/HELLO_WORLD_EXAMPLES/pie_namd.html)
``` html

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <title>HPCC Systems - Visualization Framework</title>
    <link rel="stylesheet" href="test.css">
    <!--
    Most scripts are optional, include only what you need
    @TODO: shoud document dependencies in README
    -->
    <script src="https://www.google.com/jsapi"></script>
    <script src="https://maps.googleapis.com/maps/api/js"></script>
    <script src="../bower_components/d3/d3.js"></script>
    <script src="../bower_components/c3/c3.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/amcharts.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/serial.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/funnel.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/gauge.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/pie.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/radar.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/xy.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/gantt.js"></script>
    <script src="../bower_components/dagre/index.js"></script>
    <script src="../bower_components/colorbrewer/colorbrewer.js"></script>
    <script src="../bower_components/topojson/topojson.js"></script>
    <script src="../bower_components/d3-cloud/d3.layout.cloud.js"></script>

    <script src="../dist/hpcc-viz-common.js"></script>
    <script src="../dist/hpcc-viz-api.min.js"></script>
    <script src="../dist/hpcc-viz-other.min.js"></script>
    <script src="../dist/hpcc-viz-tree.min.js"></script>
    <script src="../dist/hpcc-viz-chart.min.js"></script>
    <script src="../dist/hpcc-viz-graph.min.js"></script>
    <script src="../dist/hpcc-viz-c3chart.min.js"></script>
    <script src="../dist/hpcc-viz-amchart.min.js"></script>
    <script src="../dist/hpcc-viz-google.min.js"></script>
    <script src="../dist/hpcc-viz-map.min.js"></script>
    <script src="../dist/hpcc-viz-layout.min.js"></script>
    <script src="../dist/hpcc-viz-marshaller.min.js"></script>

    <script>
        var graph = null;
        google.load("visualization", "1", {
            callback: doTest,
            packages: ["corechart"]
        });

        function doTest() {
            new google_Pie()
                    .target("gpie")
                    .columns(["Operating System", "Market Share"])
                    .data([
                        ["Windows 8", 23.5],
                        ["Windows 7", 51.1],
                        ["Windows Vista", 0.7],
                        ["Other Windows", 0.5],
                        ["Windows XP", 3.3],
                        ["Linux", 5.5],
                        ["Mac", 10.2],
                        ["Mobile", 5.4]
                    ])
                    .render()
            
        }
    </script>
</head>
<body onload="doTest">
<div id="gpie" class="xlarge thumb"></div>
</body>
</html>
```

## Marshaller
### [AMD Version](http://rawgit.com/Evan1415/hpcc_viz/master/HELLO_WORLD_EXAMPLES/marsh.html)
In this version of the Marshaller, we present an interactive, dynamic widget that visualises electoral data from the United States. 
``` html

<!DOCTYPE html>
<html>
<head>
    <script src="http://rawgit.com/jrburke/requirejs/2.1.17/require.js"></script>
    <script src="../dist-amd/hpcc-viz.js"></script>
    <script src="../dist-amd/hpcc-bundles.js"></script>
    <script> require.config({
        paths: {
            "font-awesome": "../dist-amd/font-awesome/css/font-awesome.min",
            "src": "../dist-amd"
        }
    });
    </script>
</head>
<body>
<script>
    require(["src/marshaller/Graph"], function (Graph) {
        new Graph()
                .size({width:800,height:500})
                .target("widget-wrapper")
                .testData()
                .render()
        ;
    });
</script>
<div id="widget-wrapper"></div>
</body>
</html>
```
### [Non-AMD Version](https://rawgit.com/Evan1415/hpcc_viz/master/HELLO_WORLD_EXAMPLES/marsh_namd.html)
``` html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <title>HPCC Systems - Visualization Framework</title>
    <link rel="stylesheet" href="test.css">

    <script src="https://www.google.com/jsapi"></script>
    <script src="https://maps.googleapis.com/maps/api/js"></script>
    <script src="../bower_components/d3/d3.js"></script>
    <script src="../bower_components/c3/c3.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/amcharts.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/serial.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/funnel.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/gauge.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/pie.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/radar.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/xy.js"></script>
    <script src="../bower_components/amcharts/dist/amcharts/gantt.js"></script>
    <script src="../bower_components/dagre/index.js"></script>
    <script src="../bower_components/colorbrewer/colorbrewer.js"></script>
    <script src="../bower_components/topojson/topojson.js"></script>
    <script src="../bower_components/d3-cloud/d3.layout.cloud.js"></script>

    <script src="../dist/hpcc-viz-common.js"></script>
    <script src="../dist/hpcc-viz-api.min.js"></script>
    <script src="../dist/hpcc-viz-other.min.js"></script>
    <script src="../dist/hpcc-viz-tree.min.js"></script>
    <script src="../dist/hpcc-viz-chart.min.js"></script>
    <script src="../dist/hpcc-viz-graph.min.js"></script>
    <script src="../dist/hpcc-viz-c3chart.min.js"></script>
    <script src="../dist/hpcc-viz-amchart.min.js"></script>
    <script src="../dist/hpcc-viz-google.min.js"></script>
    <script src="../dist/hpcc-viz-map.min.js"></script>
    <script src="../dist/hpcc-viz-layout.min.js"></script>
    <script src="../dist/hpcc-viz-marshaller.min.js"></script>

    <script>
        var graph = null;
        google.load("visualization", "1", {
            callback: doTest,
            packages: ["corechart"]
        });

        function doTest() {
            new marshaller_HTML()
                    .size({width:800,height:500})
                    .target("widget-wrapper")
                    .testData()
                    .render()
            ;
        }
    </script>


</head>
<body onload="doTest">
<div id="widget-wrapper"></div>
</body>
</html>
```