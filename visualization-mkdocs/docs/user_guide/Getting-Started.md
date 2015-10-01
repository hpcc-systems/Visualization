## Getting Started

The framework is available in a variety of packages and sources, it also supports both Non-AMD and AMD paradigms for those who love/hate RequireJS and its kin.  

Installation details for both [consumers](#installing-using-releases) and [visualization developers](#development) are found below. 

The pre-built packages can be accessed from here:

* CDN Server (AMD) - http://viz.hpccsystems.com/v1.2.4/dist-amd/<br>
* CDN Server (Non AMD) - http://viz.hpccsystems.com/v1.2.4/dist/<br>
* Bower - ```bower install hpcc-viz --save```<br>
* GitHub - https://github.com/hpcc-systems/Visualization/releases<br>

And the sources can be found here:

* GitHub - https://github.com/hpcc-systems/Visualization/

#### Developers
The following details how developers should develop widgets:<br>

* [Developing Widgets](Developing-Widgets)

#### Other
* [FAQ](../FAQ/)

------------------------------------------------------------------------------------------------------------

## Installing & Using Releases

### Locally

### Via CDN

### Via Bower

Install node
* _[Node](https://nodejs.org/)_

Install bower using npm

    $ npm install -g bower
    $ cd Your-Project-Dir
    $ bower install hpcc-viz

### AMD Usage
```html
<!doctype html>
<html>
<head>
    <script src="bower_components/hpcc-viz/dist-amd/hpcc-viz.js"></script> <!-- Auto Loads RequireJS -->
    <script src="bower_components/hpcc-viz/dist-amd/hpcc-bundles.js"></script>
    <script>
        require.config({
            paths: {
                "src": "bower_components/hpcc-viz/dist-amd",
                "font-awesome": "/bower_components/hpcc-viz/dist-amd/font-awesome/css/font-awesome.min",
                "amchartsImg": "/bower_components/hpcc-viz/dist-amd/img/amcharts/" /* Only needed if using AmCharts */
            }
        });
    </script>
</head>
</html>
```

See [Examples](../examples/AMD-Examples) for how to create widgets.

### Non-AMD Usage
```html
<!doctype html>
<html>
<head>
    <link rel="stylesheet" href="../bower_components/c3/c3.css" />
    <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.css" />
    <link rel="stylesheet" href="../dist/hpcc-viz.min.css">

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
    <script src="../dist/hpcc-viz-form.min.js"></script>
    <script src="../dist/hpcc-viz-graph.min.js"></script>
    <script src="../dist/hpcc-viz-c3chart.min.js"></script>
    <script src="../dist/hpcc-viz-amchart.min.js"></script>
    <script src="../dist/hpcc-viz-google.min.js"></script>
    <script src="../dist/hpcc-viz-map.min.js"></script>
    <script src="../dist/hpcc-viz-layout.min.js"></script>
    <script src="../dist/hpcc-viz-marshaller.min.js"></script>
</head>
</html>
```

See [Examples](../examples/Non-AMD-Examples) for how to create widgets.

---------------------------------------------------------------------------------------------------------------------------------

## Development

Install node
* _[Node](https://nodejs.org/)_

Install bower using npm

    $ npm install -g bower

Clone repository

	$ git clone https://github.com/hpcc-systems/Visualization.git 

Install Node module dependencies
	
	$ cd Visualization
	$ npm install

Install Bower dependencies

    $ bower install

Two new folders will be created in the root of the Visualization folder: _**"node_modules" & "bower_components"**_


------------------------------------------------------------------------------------------------------


## Building Releases from Source (AMD & Non-AMD)

After following the above steps, run the following commands:

Install Gulp
	
	$ npm install -g gulp
    $ gulp

Two new folders will be created in the root of the Visualization folder once again: _**"dist" & "dist-amd"**_


## Running Unit Tests

    $ npm test
