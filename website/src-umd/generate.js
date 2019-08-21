(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./docs", "./meta"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var docs_1 = require("./docs");
    var meta_1 = require("./meta");
    function updateMDMeta(filePath, content, pkgJson, metaJson) {
        var meta = new meta_1.Meta(pkgJson, metaJson);
        var mdFile = new docs_1.MDFile(filePath, meta);
        return mdFile.updateMeta().write();
    }
    exports.updateMDMeta = updateMDMeta;
});
//# sourceMappingURL=generate.js.map