require.config({
    baseUrl: ".",
    paths: {
        "requireLib": "../bower_components/requirejs/require",
        "css": "../bower_components/require-css/css",
        "css-builder": "../bower_components/require-css/css-builder",
        "normalize": "../bower_components/require-css/normalize",
        "async": "../bower_components/requirejs-plugins/src/async",
        "propertyParser": "../bower_components/requirejs-plugins/src/propertyParser",
        "goog": "../bower_components/requirejs-plugins/src/goog",

        "d3": "../bower_components/d3/d3",
        "c3": "../bower_components/c3/c3",
        "dagre": "../bower_components/dagre/index",
        "topojson": "../bower_components/topojson/topojson",
        "colorbrewer": "../bower_components/colorbrewer/colorbrewer",
        "d3.layout.cloud": "../bower_components/d3-cloud/d3.layout.cloud",
        "font-awesome": "../bower_components/font-awesome/css/font-awesome",
        "amcharts": "../bower_components/amcharts/dist/amcharts/amcharts",
        "amcharts.funnel": "../bower_components/amcharts/dist/amcharts/funnel",
        "amcharts.gauge": "../bower_components/amcharts/dist/amcharts/gauge",
        "amcharts.pie": "../bower_components/amcharts/dist/amcharts/pie",
        "amcharts.radar": "../bower_components/amcharts/dist/amcharts/radar",
        "amcharts.serial": "../bower_components/amcharts/dist/amcharts/serial",
        "amcharts.xy": "../bower_components/amcharts/dist/amcharts/xy",
        "amcharts.plugins.responsive": "../bower_components/amcharts/dist/amcharts/plugins/responsive/responsive",

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
            "dagre": "//" + window.location.hostname + "/cpettitt/dagre/v0.7.1/dist/dagre.min",
            "topojson": "//" + window.location.hostname + "/mbostock/topojson/v1.6.19/topojson",
            "colorbrewer": "//" + window.location.hostname + "/jeanlauliac/colorbrewer/v1.0.0/colorbrewer",
            "d3.layout.cloud": "//" + window.location.hostname + "/jasondavies/d3-cloud/v1.0.5/d3.layout.cloud",
            "font-awesome": "//" + window.location.hostname + "/FortAwesome/Font-Awesome/v4.3.0/css/font-awesome.min",
            "amcharts": "//" + window.location.hostname + "/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/amcharts",
            "amcharts.funnel": "//" + window.location.hostname + "/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/funnel",
            "amcharts.gauge": "//" + window.location.hostname + "/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/gauge",
            "amcharts.pie": "//" + window.location.hostname + "/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/pie",
            "amcharts.radar": "//" + window.location.hostname + "/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/radar",
            "amcharts.serial": "//" + window.location.hostname + "/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/serial",
            "amcharts.xy": "//" + window.location.hostname + "/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/xy",
            "amcharts.plugins.responsive": "//" + window.location.hostname + "/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/plugins/responsive/responsive",
            "amcharts.plugins.dataloader": "//" + window.location.hostname + "/arturgspb/bower-amcharts/v3.13.3/dist/amcharts/plugins/dataloader",

            "src": "../src"
        }
    });
}
