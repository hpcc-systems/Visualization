requirejs.config({
    baseUrl: ".",
    paths: {
        'async': 'lib/requirejs/plugins/async',
        'css': 'lib/requirejs/plugins/css',
        'text': 'lib/requirejs/plugins/text',
        'goog': 'lib/requirejs/plugins/goog',
        'propertyParser': 'lib/requirejs/plugins/propertyParser',

        'amcharts'          : 'lib/amcharts/amcharts',
        'amcharts.funnel'   : 'lib/amcharts/funnel',
        'amcharts.gauge'    : 'lib/amcharts/gauge',
        'amcharts.pie'      : 'lib/amcharts/pie',
        'amcharts.radar'    : 'lib/amcharts/radar',
        'amcharts.serial'   : 'lib/amcharts/serial',
        'amcharts.xy'       : 'lib/amcharts/xy'           
    },
     shim: {
        'amcharts.funnel': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts.gauge': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts.pie': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts.radar': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts.serial': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts.xy': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        }
    },    
    packages: [
        {
            name: "src",
            location: "src"
        },
        {
            name: "lib",
            location: "lib"
        },
        {
            name: "dist",
            location: "dist"
        },
        {
            name: "d3",
            location: "lib/d3",
            main: "d3"
        },
        {
            name: "c3",
            location: "lib/c3",
            main: "c3"
        },
        {
            name: "crossfilter",
            location: "lib/crossfilter",
            main: "crossfilter"
        },
        {
            name: "lodash",
            location: "lib/lodash",
            main: "lodash"
        },
        {
            name: "topojson",
            location: "lib/topojson",
            main: "topojson"
        }
    ]
});
