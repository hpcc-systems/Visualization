require.config({
    baseUrl: ".",
    paths: {
        "css": ["http://rawgit.com/guybedford/require-css/0.1.8/css.min", "../bower_components/require-css/css"],
        "async": ["http://rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/async", "../bower_components/requirejs-plugins/src/async"],
        "propertyParser": ["http://rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/propertyParser", "../bower_components/requirejs-plugins/src/propertyParser"],
        "goog": ["http://rawgit.com/millermedeiros/requirejs-plugins/v1.0.3/src/goog", "../bower_components/requirejs-plugins/src/goog"],

        "d3": ["http://rawgit.com/mbostock/d3/v3.5.5/d3.min", "../bower_components/d3/d3"],
        "c3": ["http://rawgit.com/masayuki0812/c3/0.4.10/c3.min", "../bower_components/c3/c3"],
        "dagre": ["http://rawgit.com/cpettitt/dagre/v0.7.1/dist/dagre.min", "../bower_components/dagre/index"],
        "topojson": ["http://rawgit.com/mbostock/topojson/v1.6.19/topojson", "../bower_components/topojson/topojson"],
        "colorbrewer": ["http://rawgit.com/jeanlauliac/colorbrewer/v1.0.0/colorbrewer", "../bower_components/colorbrewer/colorbrewer"],
        "d3.layout.cloud": ["http://rawgit.com/jasondavies/d3-cloud/v1.0.5/d3.layout.cloud", "../bower_components/d3-cloud/d3.layout.cloud"],
        "font-awesome": ["http://rawgit.com/FortAwesome/Font-Awesome/v4.3.0/css/font-awesome.min", "../bower_components/font-awesome/css/font-awesome"]
    },
    packages: [
        {
            name: "src",
            location: "../src"
        }
    ]
});
