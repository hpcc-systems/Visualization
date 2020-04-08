(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./app"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var app_1 = require("./app");
    var params = decodeURIComponent(document.URL.split("?")[1] || "");
    var debug = false;
    var sampleID = "";
    params.split("&").forEach(function (param) {
        if (param === "debug") {
            debug = true;
        }
        else {
            sampleID = param;
        }
    });
    var app;
    function loadApp() {
        app = new app_1.App(sampleID, debug)
            .target("placeholder");
        doResize();
    }
    exports.loadApp = loadApp;
    window.addEventListener("resize", doResize);
    function doResize() {
        var myWidth;
        var myHeight;
        if (typeof (window.innerWidth) === "number") {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        }
        else {
            if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
            }
            else {
                if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                    myWidth = document.body.clientWidth;
                    myHeight = document.body.clientHeight;
                }
            }
        }
        if (app && myWidth && myHeight) {
            app
                .resize({ width: myWidth - 16, height: myHeight - 16 })
                .lazyRender();
        }
    }
    document.addEventListener("keydown", function (e) {
        if (app && (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
            app.generate();
            e.preventDefault();
        }
    }, false);
});
//# sourceMappingURL=index.js.map