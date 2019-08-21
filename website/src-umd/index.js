(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./hpccIndex.js", "../src-umd/index.json"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hpccIndex_js_1 = require("./hpccIndex.js");
    // @ts-ignore
    var indexJson = require("../src-umd/index.json");
    // @ts-ignore
    // import * as ColumnMD from "../docs/Column.md";
    console.log(indexJson);
    function test() {
        return new hpccIndex_js_1.HPCCIndexPanel()
            .target("placeholder")
            .data(indexJson)
            .render();
        /*
    return new HPCCMarkdown()
        .target("placeholder")
         .markdown(ColumnMD)
        .render()
        ;
        */
    }
    exports.test = test;
});
//# sourceMappingURL=index.js.map