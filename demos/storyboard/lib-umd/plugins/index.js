(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./chart", "./dot", "./editor", "./esp", "./geospatial", "./hipie", "./roxie", "./table"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("./chart"));
    __export(require("./dot"));
    __export(require("./editor"));
    __export(require("./esp"));
    __export(require("./geospatial"));
    __export(require("./hipie"));
    __export(require("./roxie"));
    __export(require("./table"));
});
//# sourceMappingURL=index.js.map