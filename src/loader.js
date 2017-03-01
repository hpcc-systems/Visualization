"use strict";
(function (root) {
    root.hpccsystems = root.hpccsystems || {};
    root.hpccsystems.cache = root.hpccsystems.cache || {};

    //  Keep at the top for the optimizer to find (optimizer requires 100% JSON in require.config call) ---
    function optimizerConfig(require) {
        return require.config({
            baseUrl: ".",
            paths: {
                "requireLib": "../node_modules/requirejs/require",
                "css": "../node_modules/require-css/css",
                "css-builder": "../node_modules/require-css/css-builder",
                "normalize": "../node_modules/require-css/normalize",
                "async": "../node_modules/requirejs-plugins/src/async",
                "propertyParser": "../node_modules/requirejs-plugins/src/propertyParser",
                "goog": "../node_modules/requirejs-plugins/src/goog",
                "text": "../node_modules/requirejs-text/text",
                "json": "../node_modules/requirejs-plugins/src/json",

                "d3": "../bower_components/d3/d3",
                "c3": "../bower_components/c3/c3",
                "dagre": "../bower_components/dagre/index",
                "topojson": "../bower_components/topojson/topojson",
                "colorbrewer": "../bower_components/colorbrewer/colorbrewer",
                "d3-cloud": "../bower_components/d3-cloud/build/d3.layout.cloud",
                "d3-sankey": "../bower_components/d3-plugins/sankey/sankey",
                "font-awesome": "../bower_components/font-awesome/css/font-awesome",
                "es6-promise": "../bower_components/es6-promise/promise",
                "d3-hexbin": "../bower_components/d3-plugins/hexbin/hexbin",
                "d3-tip": "../bower_components/d3-tip/index",
                "d3-bullet": "../bower_components/d3-plugins/bullet/bullet",
                "handsontable": "../bower_components/handsontable/dist/handsontable.full",
                "grid-list": "../bower_components/grid-list/src/gridList",
                "orb-react": "../bower_components/orb/deps/react-0.12.2",
                "orb": "../bower_components/orb/dist/orb",

                "amcharts": "../bower_components/amcharts3/amcharts/amcharts",
                "amcharts-funnel": "../bower_components/amcharts3/amcharts/funnel",
                "amcharts-gauge": "../bower_components/amcharts3/amcharts/gauge",
                "amcharts-pie": "../bower_components/amcharts3/amcharts/pie",
                "amcharts-radar": "../bower_components/amcharts3/amcharts/radar",
                "amcharts-serial": "../bower_components/amcharts3/amcharts/serial",
                "amcharts-xy": "../bower_components/amcharts3/amcharts/xy",
                "amcharts-gantt": "../bower_components/amcharts3/amcharts/gantt",
                "amcharts-plugins-responsive": "../bower_components/amcharts3/amcharts/plugins/responsive/responsive",
                "amcharts-images": "../bower_components/amcharts3/amcharts/images/",

                "simpleheat": "../bower_components/simpleheat/index",
                "autoComplete": "../bower_components/javascript-auto-complete/auto-complete",

                "src": "../src"
            },
            shim: {
                "amcharts-funnel": {
                    deps: ["amcharts"],
                    exports: "AmCharts",
                    init: function () {
                        AmCharts.isReady = true;
                    }
                },
                "amcharts-gauge": {
                    deps: ["amcharts"],
                    exports: "AmCharts",
                    init: function () {
                        AmCharts.isReady = true;
                    }
                },
                "amcharts-pie": {
                    deps: ["amcharts"],
                    exports: "AmCharts",
                    init: function () {
                        AmCharts.isReady = true;
                    }
                },
                "amcharts-radar": {
                    deps: ["amcharts"],
                    exports: "AmCharts",
                    init: function () {
                        AmCharts.isReady = true;
                    }
                },
                "amcharts-serial": {
                    deps: ["amcharts"],
                    exports: "AmCharts",
                    init: function () {
                        AmCharts.isReady = true;
                    }
                },
                "amcharts-xy": {
                    deps: ["amcharts"],
                    exports: "AmCharts",
                    init: function () {
                        AmCharts.isReady = true;
                    }
                },
                'amcharts-gantt': {
                    deps: ['amcharts', 'amcharts-serial'],
                    exports: 'AmCharts',
                    init: function () {
                        AmCharts.isReady = true;
                    }
                },
                "simpleheat": {
                    exports: "simpleheat",
                    init: function () {
                        simpleheat.isReady = true;
                    }
                }
            }
        });
    }

    function rawgitPaths(srcUrl, rawgitBaseUrl) {
        return {
            "css": rawgitBaseUrl + "/guybedford/require-css/0.1.8/css.min",
            "css-builder": rawgitBaseUrl + "/guybedford/require-css/0.1.8/css-builder.min",
            "normalize": rawgitBaseUrl + "/guybedford/require-css/0.1.8/normalize.min",
            "async": rawgitBaseUrl + "/millermedeiros/requirejs-plugins/v1.0.3/src/async",
            "propertyParser": rawgitBaseUrl + "/millermedeiros/requirejs-plugins/v1.0.3/src/propertyParser",
            "goog": rawgitBaseUrl + "/millermedeiros/requirejs-plugins/v1.0.3/src/goog",
            "text": rawgitBaseUrl + "/requirejs/text/2.0.12/text",
            "json": rawgitBaseUrl + "/millermedeiros/requirejs-plugins/v1.0.3/src/json",

            "d3": rawgitBaseUrl + "/mbostock/d3/v3.5.17/d3.min",
            "c3": rawgitBaseUrl + "/masayuki0812/c3/0.4.11/c3.min",
            "dagre": rawgitBaseUrl + "/cpettitt/dagre/v0.7.3/dist/dagre.min",
            "topojson": rawgitBaseUrl + "/mbostock-bower/topojson-bower/v1.6.26/topojson.min",
            "colorbrewer": rawgitBaseUrl + "/jeanlauliac/colorbrewer/v1.0.0/colorbrewer",
            "d3-cloud": rawgitBaseUrl + "/jasondavies/d3-cloud/v1.2.2/build/d3.layout.cloud",
            "d3-sankey": rawgitBaseUrl + "/d3/d3-plugins/master/sankey/sankey",
            "font-awesome": rawgitBaseUrl + "/FortAwesome/Font-Awesome/v4.7.0/css/font-awesome.min",
            "es6-promise": rawgitBaseUrl + "/jakearchibald/es6-promise/v3.2.2/dist/es6-promise.min",
            "d3-hexbin": rawgitBaseUrl + "/d3/d3-plugins/master/hexbin/hexbin",
            "d3-tip": rawgitBaseUrl + "/Caged/d3-tip/v0.6.7/index",
            "d3-bullet": rawgitBaseUrl + "/d3/d3-plugins/master/bullet/bullet",
            "handsontable": rawgitBaseUrl + "/handsontable/handsontable/0.24.3/dist/handsontable.full.min",
            "grid-list": rawgitBaseUrl + "/hootsuite/grid/v0.3.4/src/gridList",
            "orb-react": rawgitBaseUrl + "/nnajm/orb/v1.0.9/deps/react-0.12.2.min",
            "orb": rawgitBaseUrl + "/nnajm/orb/v1.0.9/dist/orb.min",

            "amcharts": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/amcharts",
            "amcharts-funnel": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/funnel",
            "amcharts-gauge": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/gauge",
            "amcharts-pie": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/pie",
            "amcharts-radar": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/radar",
            "amcharts-serial": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/serial",
            "amcharts-xy": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/xy",
            "amcharts-gantt": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/gantt",
            "amcharts-plugins-responsive": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/plugins/responsive/responsive",
            "amcharts-plugins-dataloader": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/plugins/dataloader",
            "amcharts-images": rawgitBaseUrl + "/amcharts/amcharts3/3.18.0/amcharts/images/",

            "simpleheat": rawgitBaseUrl + "/mourner/simpleheat/v0.3.0/simpleheat",
            "autoComplete": rawgitBaseUrl + "/Pixabay/JavaScript-autoComplete/1.0.4/auto-complete",

            "src": srcUrl
        };
    }

    function srcConfig(srcUrl) {
        optimizerConfig(root.hpccsystems.require);
        var config = root.hpccsystems.require.s.contexts["_"].config;
        var paths = {};
        for (var key in config.paths) {
            paths[key] = srcUrl + "/" + config.paths[key];
        }
        root.hpccsystems.require.config({
            baseUrl: ".",
            paths: paths
        });
    }

    function buildConfig(srcUrl) {
        root.hpccsystems.require.config({
            baseUrl: ".",
            bundles: { replace: "me" },  //  Bundles get injected during gulp build-amd
            paths: {
                "src": srcUrl,
                "font-awesome": srcUrl + "/font-awesome/css/font-awesome.min",
                "amcharts-images": srcUrl + "/img/amcharts/"
            }
        });
    }

    function githubConfig(srcUrl) {
        optimizerConfig(root.hpccsystems.require);
        return root.hpccsystems.require.config({
            waitSeconds: 30,
            baseUrl: ".",
            paths: root.hpccsystems.cache[srcUrl].rawgitPaths
        });
    }

    function remoteGithubConfig(hostname, srcUrl, context, callback) {
        var rawgitBaseUrl = root.location.protocol === "https:" ? "https://" : "http://" + hostname;
        root.hpccsystems.require([srcUrl + "/loader.js"], function () {
            callback(root.hpccsystems.require.config({
                waitSeconds: 30,
                baseUrl: srcUrl,
                context: context,
                paths: root.hpccsystems.cache[srcUrl].rawgitPaths
            }));
        }, function (err) {
            callback(root.hpccsystems.require.config({
                waitSeconds: 30,
                baseUrl: srcUrl,
                context: context,
                paths: rawgitPaths(srcUrl, rawgitBaseUrl)
            }));
        });
    }

    function remoteCDNConfig(srcUrl, version, callback) {
        var bundleUrl = srcUrl + "/hpcc-bundles-def.js";
        root.hpccsystems.require([bundleUrl], function (bundles) {
            var retVal = root.hpccsystems.require.config({
                context: version,
                baseUrl: srcUrl,
                bundles: bundles,
                paths: {
                    "src": srcUrl,
                    "font-awesome": srcUrl + "/font-awesome/css/font-awesome.min",
                    "amcharts-images": srcUrl + "/img/amcharts/"
                }
            });
            retVal([srcUrl + "/hpcc-viz.js"], function () {
                callback(retVal);
            });
        });
    }

    (function () {
        var myInfo = {
            url: "",
        };
        if (document && document.currentScript) {
            myInfo.url = document.currentScript.src;
        } else {
            var scripts = document.getElementsByTagName('script');
            for (var i = scripts.length - 1; i >= 0 ; --i) {
                var script = scripts[i];
                var url = script.getAttribute.length !== undefined ? script.src : script.getAttribute('src', -1);
                if (url.indexOf("loader.js") > 0 || url.indexOf("hpcc-viz.js") > 0) {
                    myInfo.url = url;
                    break;
                }
            }
        }
        var urlParts = myInfo.url.split("/");
        myInfo.filename = urlParts.pop();
        myInfo.srcUrl = urlParts.join("/");

        if (!root.hpccsystems.cache[myInfo.srcUrl]) {
            var rawgitBaseUrl = root.location.protocol === "https:" ? "https://rawgit.com" : "http://rawgit.com";
            root.hpccsystems.cache[myInfo.srcUrl] = {
                rawgitPaths: rawgitPaths(myInfo.srcUrl, rawgitBaseUrl)
            };
        }

        if (!root.hpccsystems.require) {
            root.hpccsystems.require = root.require || require;
            if (!root.hpccsystems.skipAutoConfig) {
                switch (myInfo.filename) {
                    case "loader.js":
                        switch (root.location.hostname) {
                            case "rawgit.com":
                                githubConfig(myInfo.srcUrl);
                                break;
                            default:
                                srcConfig(myInfo.srcUrl);
                        }
                        break;
                    case "hpcc-viz.js":
                        buildConfig(myInfo.srcUrl);
                        break;
                }
            }
        }
    }());

    if (!root.hpccsystems.redirect) {
        root.hpccsystems.redirect = (function () {
            var cdnHost = "viz.hpccsystems.com";
            function url(opts) {
                opts = opts || {};
                var protocol = opts.protocol || (root.location.protocol === "https:" ? "https:" : "http:");
                var hostname = opts.hostname || root.location.hostname;
                var port = opts.port !== undefined ? opts.port : root.location.port;
                var host = hostname + (port ? ":" + port : "");
                var pathname = opts.pathname || root.location.pathname;
                var href = protocol + "//" + host + pathname;
                return href;
            }

            function cdnUrl(version) {
                return url({
                    hostname: cdnHost,
                    port: "",
                    pathname: "/" + version + "/dist-amd"
                });
            }

            return {
                cdnHost: function(_) {
                    if (!arguments.length) return cdnHost;
                    cdnHost = _;
                    return this;
                },
                github: function (branch, org, repo, callback) {
                    callback = arguments[arguments.length - 1];
                    switch (arguments.length) {
                        case 1:
                            branch = "master";
                            /* falls through */
                        case 2:
                            org = "hpcc-systems";
                            /* falls through */
                        case 3:
                            repo = "Visualization";
                            break;
                    }
                    var srcUrl = url({
                        hostname: "rawgit.com",
                        port: "",
                        pathname: "/" + org + "/" + repo + "/" + branch + "/src"
                    });
                    remoteGithubConfig("rawgit.com", srcUrl, org + "_" + repo + "_" + branch, callback);
                },
                cdn: function (version, callback) {
                    var srcUrl = cdnUrl(version);
                    remoteCDNConfig(srcUrl, version, callback);
                },
                create: function (state, callback) {
                    if (typeof state === "string") {
                        state = JSON.parse(state);
                    }
                    switch (state.__version) {
                        case "1":
                        case "2":
                        case "3":
                            this.cdn("v1.10.0", function (_req) {
                                _req(["src/other/Persist"], function (Persist) {
                                    Persist.create(state, function (widget) {
                                        callback(widget, _req);
                                    });
                                }, requireErrorHandler);
                            });
                            break;
                        default:
                            this.cdn("v" + state.__version, function (_req) {
                                _req(["src/other/Persist"], function (Persist) {
                                    Persist.create(state, function (widget) {
                                        callback(widget, _req);
                                    });
                                }, requireErrorHandler);
                            });
                            break;
                    }
                    function requireErrorHandler(err) {
                        console.log("Loader 'create' Error:\n" + err.message);
                    }
                }
            };
        }());
    }
}(this));