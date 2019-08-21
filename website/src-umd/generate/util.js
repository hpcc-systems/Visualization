(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "marked"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var marked = require("marked");
    if (!fs.existsSync("dist")) {
        fs.mkdirSync("dist");
    }
    fs.readFile("docs/test.md", function (err, data) {
        var html = marked(data.toString());
        fs.writeFile("dist/test.html", html, "utf8", function (err) {
        });
    });
});
//# sourceMappingURL=util.js.map