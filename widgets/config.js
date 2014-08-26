requirejs.config({
    baseUrl: ".",
    paths: {
        'async': 'lib/requirejs/plugins/async',
        'css': 'lib/requirejs/plugins/css'
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
            name: "topojson",
            location: "lib/topojson",
            main: "topojson"
        }
    ]
});
