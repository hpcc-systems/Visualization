require.config({
    baseUrl: ".",
    paths: {
        "requireLib": "../../bower_components/requirejs/require",
        "css": "../../bower_components/require-css/css",
        "css-builder": "../../bower_components/require-css/css-builder",
        "normalize": "../../bower_components/require-css/normalize",
        "async": "../../bower_components/requirejs-plugins/src/async",
        "propertyParser": "../../bower_components/requirejs-plugins/src/propertyParser",
        "goog": "../../bower_components/requirejs-plugins/src/goog",
        "d3": "../../bower_components/d3/d3",
        "c3": "../../bower_components/c3/c3",
        "dagre": "../../bower_components/dagre/index",
        "topojson": "../../bower_components/topojson/topojson",
        "colorbrewer": "../../bower_components/colorbrewer/colorbrewer",
        "d3.layout.cloud": "../../bower_components/d3-cloud/d3.layout.cloud",
        "font-awesome": "../../bower_components/font-awesome/css/font-awesome",
        "amcharts": "../../bower_components/amcharts/dist/amcharts/amcharts",
        "amcharts.funnel": "../../bower_components/amcharts/dist/amcharts/funnel",
        "amcharts.gauge": "../../bower_components/amcharts/dist/amcharts/gauge",
        "amcharts.pie": "../../bower_components/amcharts/dist/amcharts/pie",
        "amcharts.radar": "../../bower_components/amcharts/dist/amcharts/radar",
        "amcharts.serial": "../../bower_components/amcharts/dist/amcharts/serial",
        "amcharts.xy": "../../bower_components/amcharts/dist/amcharts/xy",
        "amcharts.plugins.responsive": "../../bower_components/amcharts/dist/amcharts/plugins/responsive/responsive",
        "src": "../../src"
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
        }
    }
});

if (window.location.hostname === "rawgit.com") {
    require.config({
        paths: {
            "css": "http://rawgit.com/guybedford/require-css/0.1.8/css.min",
            "css-builder": "http://rawgit.com/guybedford/require-css/0.1.8/css-builder.min",
            "normalize": "http://rawgit.com/guybedford/require-css/0.1.8/normalize.min",
            "async": "http://rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/async",
            "propertyParser": "http://rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/propertyParser",
            "goog": "http://rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/goog",
            "d3": "http://rawgit.com/mbostock/d3/v3.5.5/d3.min",
            "c3": "http://rawgit.com/masayuki0812/c3/0.4.10/c3.min",
            "dagre": "http://rawgit.com/cpettitt/dagre/v0.7.1/dist/dagre.min",
            "topojson": "http://rawgit.com/mbostock/topojson/v1.6.19/topojson",
            "colorbrewer": "http://rawgit.com/jeanlauliac/colorbrewer/v1.0.0/colorbrewer",
            "d3.layout.cloud": "http://rawgit.com/jasondavies/d3-cloud/v1.0.5/d3.layout.cloud",
            "font-awesome": "http://rawgit.com/FortAwesome/Font-Awesome/v4.3.0/css/font-awesome.min",
            "amcharts": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/amcharts",
            "amcharts.funnel": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/funnel",
            "amcharts.gauge": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/gauge",
            "amcharts.pie": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/pie",
            "amcharts.radar": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/radar",
            "amcharts.serial": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/serial",
            "amcharts.xy": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/xy",
            "amcharts.plugins.responsive": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/plugins/responsive/responsive",
            "amcharts.plugins.dataloader": "http://rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/plugins/dataloader",
            "src": "../src"
        }
    });
}