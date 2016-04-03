"use strict";
(function (root, factory) {
    root.hpccsystems = root.hpccsystems || {};
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.common_Widget = factory();
    }
}(this, function () {
    var require = require || window.require;  //  Keep lint quiet  ---
    var hpccsystems = hpccsystems || window.hpccsystems;

    function requireErrorHandler(err) {
        console.log("Loader Error:\n" + err.message);
    }

    function url(opts) {
        opts = opts || {};
        var protocol = opts.protocol || window.location.protocol;
        var hostname = opts.hostname || window.location.hostname;
        var port = opts.port !== undefined ? opts.port : window.location.port;
        var host = hostname + (port ? ":" + port : "");
        var pathname = opts.pathname || window.location.pathname;
        var href = protocol + "//" + host + pathname;
        return href;
    }

    function cdnUrl(version, src) {
        return url({
            protocol: window.location.protocol === "https:" ? "https:" : "http:",
            hostname: "viz.hpccsystems.com",
            port: "",
            pathname: "/" + version + "/dist-amd" + (src ? "-src" : "")
        });
    }

    function githubUrl(branch, org, repo) {
        branch = branch || "master";
        org = org || "hpcc-systems";
        repo = repo || "Visualization";
        return url({
            hostname: "rawgit.com",
            port: "",
            pathname: "/" + org + "/" + repo + "/" + branch + "/src"
        });
    }

    var bundleCache = {};
    function resolveCDN(opts, callback) {
        opts.useSrc = opts.useSrc || false;
        var srcUrl = cdnUrl(opts.ver, opts.useSrc);
        var bundleUrl = srcUrl + "/hpcc-bundles-def.js";
        if (bundleCache[bundleUrl]) {
            setTimeout(function () {
                callback(bundleCache[bundleUrl]);
            }, 0);
            return;
        }
        require([bundleUrl], function (bundles) {
            var retVal = require.config({
                context: opts.ver,
                baseUrl: srcUrl,
                bundles: bundles,
                paths: {
                    src: ".",
                    "font-awesome": "./font-awesome/css/font-awesome.min",
                }
            });
            bundleCache[bundleUrl] = retVal;
            retVal([srcUrl + "/hpcc-viz.js"], function () {
                callback(retVal);
            });
        }, requireErrorHandler);
    }

    var configCache = {};
    function resolveGithub(opts, callback) {
        var srcUrl = githubUrl(opts.branch, opts.org, opts.repo);
        var configUrl = srcUrl + "/configRawGit.json";
        if (configCache[configUrl]) {
            setTimeout(function () {
                callback(configCache[configUrl]);
            }, 0);
            return;
        }
        require(["json!" + configUrl], function (config) {
            config.context = opts.branch + "_" + opts.org + "_" + opts.repo;
            config.baseUrl = srcUrl;
            config.paths.src = "../src";
            var retVal = require.config(config);
            configCache[configUrl] = retVal;
            setTimeout(function () {
                callback(retVal);
            }, 0);
        }, requireErrorHandler);
    }

    var Loader = {
        cdn: function (version, callback) {
            resolveCDN({ ver: version }, callback);
        },
        cdnSrc: function (version, callback) {
            resolveCDN({ ver: version, useSrc: true }, callback);
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
            resolveGithub({
                branch: branch,
                org: org,
                repo: repo
            }, callback);
        },
        create: function (state, callback) {
            if (typeof state === "string") {
                state = JSON.parse(state);
            }
            switch (state.__version) {
                case "1":
                case "2":
                case "3":
                    this.cdn("v1.10.0", function(require) {
                        require(["src/other/Persist"], function(Persist) {
                            Persist.create(state, callback);
                        }, requireErrorHandler);
                    });
                    break;
                default:
                    this.cdn("v" + state.__version, function (require) {
                        require(["src/other/Persist"], function (Persist) {
                            Persist.create(state, callback);
                        }, requireErrorHandler);
                    });
                    break;
            }
        }
    };

    //  First Loader loaded is added to global namespace (no overriding)  ---
    if (!hpccsystems.Loader) {
        hpccsystems.Loader = Loader; 
    }

    return Loader;
}));