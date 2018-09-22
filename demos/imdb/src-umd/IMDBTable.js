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
    /**
     * The IMDBTable base class provides common implementations of:
     * * Default styling.
     */
    var IMDBTable = /** @class */ (function (_super) {
        __extends(IMDBTable, _super);
        function IMDBTable() {
            var _this = _super.call(this) || this;
            _this
                .pagination(false)
                .sortable(true);
            return _this;
        }
        return IMDBTable;
    }(dgrid_1.Table));
    /**
     * The MovieTable provides a specific view of the Move data.
     */
    var MovieTable = /** @class */ (function (_super) {
        __extends(MovieTable, _super);
        function MovieTable() {
            var _this = _super.call(this) || this;
            _this.columns(["Rank", "Title", "Rating"]);
            return _this;
        }
        /**
         * Loads the table with movie information
         */
        MovieTable.prototype.load = function (vertices) {
            this.data(vertices.map(function (v, i) {
                var d = v.info();
                //  Include the origonal "vertex" in a hidden column for click event ---
                return [d.rank, d.title, d.rating, v];
            }));
        };
        return MovieTable;
    }(IMDBTable));
    exports.MovieTable = MovieTable;
    /**
     * The PersonTable provides a specific view of the People data.
     */
    var PersonTable = /** @class */ (function (_super) {
        __extends(PersonTable, _super);
        function PersonTable() {
            var _this = _super.call(this) || this;
            _this.columns(["Name", "Directed ##", "Acted ##"]);
            return _this;
        }
        /**
         * Loads the table with person information
         */
        PersonTable.prototype.load = function (vertices) {
            this.data(vertices.map(function (v, i) {
                var d = v.info();
                //  Include the origonal "vertex" in a hidden column for click event ---
                return [d.name, d.directed.length, d.acted.length, v];
            }));
        };
        return PersonTable;
    }(IMDBTable));
    exports.PersonTable = PersonTable;
});
//# sourceMappingURL=IMDBTable.js.map