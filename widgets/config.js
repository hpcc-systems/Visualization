requirejs.config({
    baseUrl: ".",
    paths: {
        'async': 'lib/requirejs/plugins/async',
        'css': 'lib/requirejs/plugins/css',
        'goog': 'lib/requirejs/plugins/goog',
        'propertyParser': 'lib/requirejs/plugins/propertyParser'
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
            name: "topojson",
            location: "lib/topojson",
            main: "topojson"
        }
    ]
});
