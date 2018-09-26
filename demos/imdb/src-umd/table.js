var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpcc-js/dgrid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dgrid_1 = require("@hpcc-js/dgrid");
    var IMDBTable = /** @class */ (function (_super) {
        __extends(IMDBTable, _super);
        function IMDBTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        IMDBTable.prototype.load = function (vertices) {
            var columns = [];
            var data = [];
            vertices.forEach(function (v, i) {
                var info = v.info().origData;
                var row = [];
                for (var key in info) {
                    if (i === 0) {
                        columns.push(key);
                    }
                    row.push(info[key]);
                }
                row.push(v);
                data.push(row);
            });
            this
                .columns(columns)
                .data(data);
        };
        return IMDBTable;
    }(dgrid_1.Table));
    exports.IMDBTable = IMDBTable;
});
//# sourceMappingURL=table.js.map