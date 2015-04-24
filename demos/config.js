var develop_mode = true;
var lib_folder = develop_mode ? "../bower_components" : "../dist/amd/lib";
var src_folder = develop_mode ? "../src" : "../dist/amd/src";

require.config({
    baseUrl: ".",
    paths: {
        'async': '../bower_components/requirejs-plugins/src/async',
        'css': '../bower_components/require-css/css',
        'text': '../bower_components/text/text',
        'goog': '../bower_components/requirejs-plugins/src/goog',
        'propertyParser': '../bower_components/requirejs-plugins/src/propertyParser',

        "lodash": "./bower_components/lodash-compat",

        'dagre/dagre': lib_folder + "/dagre/index",
        'topojson': lib_folder + "/topojson",
        'colorbrewer': lib_folder + "/colorbrewer",
        'd3-cloud': lib_folder + "/d3-cloud",
        'font-awesome': lib_folder + "/font-awesome",

        'amcharts': lib_folder + '/amcharts/dist/amcharts/amcharts',
        'amcharts/funnel': lib_folder + '/amcharts/dist/amcharts/funnel',
        'amcharts/gauge': lib_folder + '/amcharts/dist/amcharts/gauge',
        'amcharts/pie': lib_folder + '/amcharts/dist/amcharts/pie',
        'amcharts/radar': lib_folder + '/amcharts/dist/amcharts/radar',
        'amcharts/serial': lib_folder + '/amcharts/dist/amcharts/serial',
        'amcharts/xy': lib_folder + '/amcharts/dist/amcharts/xy',
    },
    shim: {
        'amcharts/funnel': {
            deps: [ 'amcharts' ],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/gauge': {
            deps: [ 'amcharts' ],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/pie': {
            deps: [ 'amcharts' ],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/radar': {
            deps: [ 'amcharts' ],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/serial': {
            deps: [ 'amcharts' ],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/xy': {
            deps: [ 'amcharts' ],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        }
    },
    packages: [
        {
            name: 'd3',
            location: lib_folder + "/d3",
            main: "d3"
        },
        {
            name: 'c3',
            location: lib_folder + "/c3",
            main: "c3"
        },
        {
            name: 'src',
            location: src_folder
        }
    ]
});
