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
        'font-awesome': lib_folder + "/font-awesome"
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
