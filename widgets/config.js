requirejs.config({
    baseUrl: ".",
    paths: {
        'async': 'lib/requirejs/plugins/async',
        'css': 'lib/requirejs/plugins/css',
        'text': 'lib/requirejs/plugins/text',
        'goog': 'lib/requirejs/plugins/goog',
        'propertyParser': 'lib/requirejs/plugins/propertyParser',
        'dygraphs': 'lib/dygraph/dygraph'
    },
     shim: {
        'dygraphs': {
            exports: 'Dygraph,DygraphCanvasRenderer,DygraphLayout,DygraphOptions'
        },
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
