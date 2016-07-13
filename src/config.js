require.config({
    waitSeconds : 30,
    baseUrl: ".",
    paths: {
        "requireLib": "../node_modules/requirejs/require",
        "css": "../node_modules/require-css/css",
        "css-builder": "../node_modules/require-css/css-builder",
        "normalize": "../node_modules/require-css/normalize",
        "async": "../node_modules/requirejs-plugins/src/async",
        "propertyParser": "../node_modules/requirejs-plugins/src/propertyParser",
        "goog": "../node_modules/requirejs-plugins/src/goog",

        "d3": "../bower_components/d3/d3",
        "c3": "../bower_components/c3/c3",
        "dagre": "../bower_components/dagre/index",
        "topojson": "../bower_components/topojson/topojson",
        "colorbrewer": "../bower_components/colorbrewer/colorbrewer",
        "d3-cloud": "../bower_components/d3-cloud/build/d3.layout.cloud",
        "d3-sankey": "../bower_components/d3-plugins/sankey/sankey",
        "font-awesome": "../bower_components/font-awesome/css/font-awesome",
        "es6-promise": "../bower_components/es6-promise/promise",
        "d3-bullet": "../bower_components/d3-plugins/bullet/bullet",

        "amcharts": "../bower_components/amcharts3/amcharts/amcharts",
        "amcharts.funnel": "../bower_components/amcharts3/amcharts/funnel",
        "amcharts.gauge": "../bower_components/amcharts3/amcharts/gauge",
        "amcharts.pie": "../bower_components/amcharts3/amcharts/pie",
        "amcharts.radar": "../bower_components/amcharts3/amcharts/radar",
        "amcharts.serial": "../bower_components/amcharts3/amcharts/serial",
        "amcharts.xy": "../bower_components/amcharts3/amcharts/xy",
        "amcharts.gantt": "../bower_components/amcharts3/amcharts/gantt",
        "amcharts.plugins.responsive": "../bower_components/amcharts3/amcharts/plugins/responsive/responsive",
        "amchartsImg": "../bower_components/amcharts3/amcharts/images/",

        "simpleheat": "../bower_components/simpleheat/index",

        "auto-complete": "../bower_components/javascript-auto-complete/auto-complete",

        "src": "../src"
    },
    shim: {
        "amcharts.funnel": {
            deps: ["amcharts"],
            exports: "AmCharts",
            init: function() {
                AmCharts.isReady = true;
            }
        },
        "amcharts.gauge": {
            deps: ["amcharts"],
            exports: "AmCharts",
            init: function() {
                AmCharts.isReady = true;
            }
        },
        "amcharts.pie": {
            deps: ["amcharts"],
            exports: "AmCharts",
            init: function() {
                AmCharts.isReady = true;
            }
        },
        "amcharts.radar": {
            deps: ["amcharts"],
            exports: "AmCharts",
            init: function() {
                AmCharts.isReady = true;
            }
        },
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
        },
        'amcharts.gantt': {
            deps: [ 'amcharts', 'amcharts.serial' ],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        "simpleheat": {
            exports: "simpleheat",
            init: function() {
                simpleheat.isReady = true;
            }
        }
    }
});

switch (window.location.hostname) {
case "rawgit.com":
case "cdn.rawgit.com":
    require.config({
        paths: {
            "css": "//" + window.location.hostname + "/guybedford/require-css/0.1.8/css.min",
            "css-builder": "//" + window.location.hostname + "/guybedford/require-css/0.1.8/css-builder.min",
            "normalize": "//" + window.location.hostname + "/guybedford/require-css/0.1.8/normalize.min",
            "async": "//" + window.location.hostname + "/millermedeiros/requirejs-plugins/v1.0.3/src/async",
            "propertyParser": "//" + window.location.hostname + "/millermedeiros/requirejs-plugins/v1.0.3/src/propertyParser",
            "goog": "//" + window.location.hostname + "/millermedeiros/requirejs-plugins/v1.0.3/src/goog",

            "d3": "//" + window.location.hostname + "/mbostock/d3/v3.5.5/d3.min",
            "c3": "//" + window.location.hostname + "/masayuki0812/c3/0.4.10/c3.min",
            "dagre": "//" + window.location.hostname + "/cpettitt/dagre/v0.7.3/dist/dagre.min",
            "topojson": "//" + window.location.hostname + "/mbostock/topojson/v1.6.19/topojson",
            "colorbrewer": "//" + window.location.hostname + "/jeanlauliac/colorbrewer/v1.0.0/colorbrewer",
            "d3-cloud": "//" + window.location.hostname + "/jasondavies/d3-cloud/v1.2.0/build/d3.layout.cloud",
            "d3-sankey": "//" + window.location.hostname + "/d3/d3-plugins/master/sankey/sankey",
            "font-awesome": "//" + window.location.hostname + "/FortAwesome/Font-Awesome/v4.3.0/css/font-awesome.min",
            "es6-promise": "//" + window.location.hostname + "/jakearchibald/es6-promise/v3.0.2/dist/es6-promise.min",
            "d3-bullet": "//" + window.location.hostname + "/d3/d3-plugins/master/bullet/bullet",

            "amcharts": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/amcharts",
            "amcharts.funnel": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/funnel",
            "amcharts.gauge": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/gauge",
            "amcharts.pie": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/pie",
            "amcharts.radar": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/radar",
            "amcharts.serial": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/serial",
            "amcharts.xy": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/xy",
            "amcharts.gantt": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/gantt",
            "amcharts.plugins.responsive": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/plugins/responsive/responsive",
            "amcharts.plugins.dataloader": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/plugins/dataloader",
            "amchartsImg": "//" + window.location.hostname + "/amcharts/amcharts3/3.18.0/amcharts/images/",
            "simpleheat": "//" + window.location.hostname + "/mourner/simpleheat/v0.3.0/simpleheat",
            "auto-complete": "//" + window.location.hostname + "/Pixabay/JavaScript-autoComplete/master/auto-complete",
            "src": "../src"
        }
    });
}
