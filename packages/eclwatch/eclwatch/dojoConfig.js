var dojoConfig;
var debugHPCC_JS = false; //  Should never be TRUE in a PR  ---

function getConfig(env) {
    // dojoRoot is defined if we"re running in node (i.e. building)
    var dojoRoot = env.dojoRoot;
    var baseUrl = dojoRoot ? "." : "/esp/files";
    var hpccBaseUrl = "../../node_modules/@hpcc-js";
    var hpccMin = debugHPCC_JS ? "" : ".min";

    return {
        baseUrl: baseUrl,
        deps: ["hpcc/stub"],
        async: true,

        parseOnLoad: false,
        isDebug: (typeof debugConfig !== "undefined"),
        vizDebug: false,
        selectorEngine: "lite",
        blankGif: "/esp/files/eclwatch/img/blank.gif",
        paths: {
            "hpcc": baseUrl + "/eclwatch",
            "src": baseUrl + "/lib-amd/src",
            "ganglia": baseUrl + "/ganglia",
            "templates": baseUrl + "/eclwatch/templates",
            "ecl": baseUrl + "/eclwatch/ecl",
            "css": baseUrl + "/loader/css",
            "@hpcc-js/api": "../../node_modules/@hpcc-js/api/dist/index" + hpccMin,
            "@hpcc-js/chart": "../../node_modules/@hpcc-js/chart/dist/index" + hpccMin,
            "@hpcc-js/common": "../../node_modules/@hpcc-js/common/dist/index" + hpccMin,
            "@hpcc-js/comms": "../../node_modules/@hpcc-js/comms/dist/index" + hpccMin,
            "@hpcc-js/composite": "../../node_modules/@hpcc-js/composite/dist/index" + hpccMin,
            "@hpcc-js/dgrid": "../../node_modules/@hpcc-js/dgrid/dist/index" + hpccMin,
            "@hpcc-js/dgrid-shim": "../../node_modules/@hpcc-js/dgrid-shim/dist/index" + hpccMin,
            "@hpcc-js/eclwatch": "../../node_modules/@hpcc-js/eclwatch/dist/index" + hpccMin,
            "@hpcc-js/form": "../../node_modules/@hpcc-js/form/dist/index" + hpccMin,
            "@hpcc-js/graph": "../../node_modules/@hpcc-js/graph/dist/index" + hpccMin,
            "@hpcc-js/layout": "../../node_modules/@hpcc-js/layout/dist/index" + hpccMin,
            "@hpcc-js/html": "../../node_modules/@hpcc-js/html/dist/index" + hpccMin,
            "@hpcc-js/map": "../../node_modules/@hpcc-js/map/dist/index" + hpccMin,
            "@hpcc-js/other": "../../node_modules/@hpcc-js/other/dist/index" + hpccMin,
            "@hpcc-js/react": "../../node_modules/@hpcc-js/react/dist/index" + hpccMin,
            "@hpcc-js/timeline": "../../node_modules/@hpcc-js/timeline/dist/index" + hpccMin,
            "@hpcc-js/tree": "../../node_modules/@hpcc-js/tree/dist/index" + hpccMin,
            "@hpcc-js/util": "../../node_modules/@hpcc-js/util/dist/index" + hpccMin,
            "@hpcc-js/TopoJSON": dojoRoot ? "/esp/files/dist/TopoJSON" : "../../node_modules/@hpcc-js/map/TopoJSON",
            "clipboard": "../../node_modules/clipboard/dist/clipboard",
            "codemirror": "../../node_modules/codemirror",
            "crossfilter": "../../node_modules/crossfilter2/crossfilter.min",
            "font-awesome": "../../node_modules/@hpcc-js/common/font-awesome",
            "tslib": "../../node_modules/tslib/tslib"
        },
        packages: [
            {
                name: "dojo",
                location: "../../node_modules/dojo",
                lib: "."
            },
            {
                name: "dijit",
                location: "../../node_modules/dijit",
                lib: "."
            },
            {
                name: "dojox",
                location: "../../node_modules/dojox",
                lib: "."
            },
            {
                name: "dojo-themes",
                location: "../../node_modules/dojo-themes",
                lib: "."
            },
            {
                name: "dgrid",
                location: baseUrl + "/dgrid",
                lib: "."
            },
            {
                name: "xstyle",
                location: baseUrl + "/xstyle",
                lib: "."
            },
            {
                name: "put-selector",
                location: baseUrl + "/put-selector",
                lib: "."
            }
        ]
    };
}

// For Webpack, export the config.  This is needed both at build time and on the client at runtime
// for the packed application.
if (typeof module !== "undefined" && module) {
    module.exports = getConfig;
} else {
    dojoConfig = getConfig({});
}
