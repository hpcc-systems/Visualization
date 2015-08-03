require.config({
    baseUrl: "../../../",
    paths: {
        "requireLib": "bower_components/requirejs/require",
        "css": "bower_components/require-css/css",
        "css-builder": "bower_components/require-css/css-builder",
        "normalize": "bower_components/require-css/normalize",
        "async": "bower_components/requirejs-plugins/src/async",
        "propertyParser": "bower_components/requirejs-plugins/src/propertyParser",
        "goog": "bower_components/requirejs-plugins/src/goog",

        "d3": "bower_components/d3/d3",
        "c3": "bower_components/c3/c3",
        "dagre": "bower_components/dagre/index",
        "topojson": "bower_components/topojson/topojson",
        "colorbrewer": "bower_components/colorbrewer/colorbrewer",
        "d3.layout.cloud": "bower_components/d3-cloud/d3.layout.cloud",
        "font-awesome": "bower_components/font-awesome/css/font-awesome",
        "amcharts": "bower_components/amcharts/dist/amcharts/amcharts",
        "amcharts.funnel": "bower_components/amcharts/dist/amcharts/funnel",
        "amcharts.gauge": "bower_components/amcharts/dist/amcharts/gauge",
        "amcharts.pie": "bower_components/amcharts/dist/amcharts/pie",
        "amcharts.radar": "bower_components/amcharts/dist/amcharts/radar",
        "amcharts.serial": "bower_components/amcharts/dist/amcharts/serial",
        "amcharts.xy": "bower_components/amcharts/dist/amcharts/xy",
        "amcharts.plugins.responsive": "bower_components/amcharts/dist/amcharts/plugins/responsive/responsive",

        "src": "./src"
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
            "css": "//rawgit.com/guybedford/require-css/0.1.8/css.min",
            "css-builder": "//rawgit.com/guybedford/require-css/0.1.8/css-builder.min",
            "normalize": "//rawgit.com/guybedford/require-css/0.1.8/normalize.min",
            "async": "//rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/async",
            "propertyParser": "//rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/propertyParser",
            "goog": "//rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/goog",

            "d3": "//rawgit.com/mbostock/d3/v3.5.5/d3.min",
            "c3": "//rawgit.com/masayuki0812/c3/0.4.10/c3.min",
            "dagre": "//rawgit.com/cpettitt/dagre/v0.7.1/dist/dagre.min",
            "topojson": "//rawgit.com/mbostock/topojson/v1.6.19/topojson",
            "colorbrewer": "//rawgit.com/jeanlauliac/colorbrewer/v1.0.0/colorbrewer",
            "d3.layout.cloud": "//rawgit.com/jasondavies/d3-cloud/v1.0.5/d3.layout.cloud",
            "font-awesome": "//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min",
            "amcharts": "//rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/amcharts",
            "amcharts.funnel": "//rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/funnel",
            "amcharts.gauge": "//rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/gauge",
            "amcharts.pie": "//rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/pie",
            "amcharts.radar": "//rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/radar",
            "amcharts.serial": "//rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/serial",
            "amcharts.xy": "//rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/xy",
            "amcharts.plugins.responsive": "//rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/plugins/responsive/responsive",

            "src": "./src"
        }
    });
}

if (window.location.hostname === "cdn.rawgit.com") {
    require.config({
        paths: {
            "css": "//cdn.rawgit.com/guybedford/require-css/0.1.8/css.min",
            "css-builder": "//cdn.rawgit.com/guybedford/require-css/0.1.8/css-builder.min",
            "normalize": "//cdn.rawgit.com/guybedford/require-css/0.1.8/normalize.min",
            "async": "//cdn.rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/async",
            "propertyParser": "//cdn.rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/propertyParser",
            "goog": "//cdn.rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/goog",

            "d3": "//cdn.rawgit.com/mbostock/d3/v3.5.5/d3.min",
            "c3": "//cdn.rawgit.com/masayuki0812/c3/0.4.10/c3.min",
            "dagre": "//cdn.rawgit.com/cpettitt/dagre/v0.7.1/dist/dagre.min",
            "topojson": "//cdn.rawgit.com/mbostock/topojson/v1.6.19/topojson",
            "colorbrewer": "//cdn.rawgit.com/jeanlauliac/colorbrewer/v1.0.0/colorbrewer",
            "d3.layout.cloud": "//cdn.rawgit.com/jasondavies/d3-cloud/v1.0.5/d3.layout.cloud",
            "font-awesome": "//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min",
            "amcharts": "//cdn.rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/amcharts",
            "amcharts.funnel": "//cdn.rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/funnel",
            "amcharts.gauge": "//cdn.rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/gauge",
            "amcharts.pie": "//cdn.rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/pie",
            "amcharts.radar": "//cdn.rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/radar",
            "amcharts.serial": "//cdn.rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/serial",
            "amcharts.xy": "//cdn.rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/xy",
            "amcharts.plugins.responsive": "//cdn.rawgit.com/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/plugins/responsive/responsive",

            "src": "./src"
        }
    });
}
