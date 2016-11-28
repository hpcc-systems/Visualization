"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_commonFactory = factory();
    }
} (this, function () {

    function es6Require(deps, callback, errback, _require) {
        var require = _require || window.require;
        require(deps, function (objs) {
            for (var i = 0; i < arguments.length; ++i) {
                var depParts = deps[i].split("/");
                if (depParts.length && arguments[i][depParts[depParts.length - 1]]) {
                    arguments[i] = arguments[i][depParts[depParts.length - 1]];
                }
            }
            callback.apply(this, arguments);
        }, errback);
    }
    return es6Require;
}));

