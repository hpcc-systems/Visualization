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
        define(["require", "exports", "@hpcc-js/layout", "@hpcc-js/phosphor", "./IMDBGraph", "./IMDBTable", "./IMDBVertex"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var layout_1 = require("@hpcc-js/layout");
    var phosphor_1 = require("@hpcc-js/phosphor");
    var IMDBGraph_1 = require("./IMDBGraph");
    var IMDBTable_1 = require("./IMDBTable");
    var IMDBVertex_1 = require("./IMDBVertex");
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = _super.call(this, "horizontal") || this;
            _this._root = "J.J. Abrams";
            _this._sheetRight = new phosphor_1.TabPanel();
            _this._graphPanel = new layout_1.ChartPanel()
                .title("IMDB 1000")
                .legendButtonVisible(false)
                .downloadButtonVisible(false)
                .dataButtonVisible(false)
                .on("vertex_dblclick", function (row, col, sel, ext) {
                _this._graph.expand(ext.vertex).then(function () {
                    _this.refreshTables(true);
                });
            }, true);
            _this._graph = new IMDBGraph_1.IMDBGraph();
            _this._gridMovies = new IMDBTable_1.MovieTable()
                .on("click", function (row, col, sel) {
                if (sel) {
                    _this.centerOn(row.__lparam);
                }
            });
            _this._gridPeople = new IMDBTable_1.PersonTable()
                .on("click", function (row, col, sel) {
                if (sel) {
                    _this.centerOn(row.__lparam);
                }
            });
            return _this;
        }
        App.prototype.root = function (_) {
            this._root = _;
            return this;
        };
        App.prototype.centerOn = function (vertex, resetZoom) {
            if (resetZoom === void 0) { resetZoom = false; }
            this._graph
                .selection([vertex]);
            if (resetZoom) {
                this._graph.zoomToItem(vertex);
            }
            else {
                this._graph.centerOnItem(vertex);
            }
        };
        App.prototype.refreshTables = function (render) {
            if (render === void 0) { render = false; }
            var movies = [];
            var people = [];
            this._graph.data().vertices.forEach(function (v) {
                if (v instanceof IMDBVertex_1.MovieVertex) {
                    movies.push(v);
                }
                else if (v instanceof IMDBVertex_1.PersonVertex) {
                    people.push(v);
                }
            });
            this._gridMovies
                .load(movies);
            this._gridPeople
                .load(people);
            if (render) {
                this._graph.render();
                this._gridMovies.render();
                this._gridPeople.render();
            }
        };
        App.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this._graphPanel.widget(this._graph);
            this._sheetRight
                .addWidget(this._gridMovies, "Movies")
                .addWidget(this._gridPeople, "People");
            this
                .addWidget(this._graphPanel)
                .addWidget(this._sheetRight);
        };
        App.prototype.update = function (domNode, element) {
            var _this = this;
            _super.prototype.update.call(this, domNode, element);
            if (this._prevRoot !== this._root) {
                this._prevRoot = this._root;
                //  Wait for initial render to have finished (all animations)
                setTimeout(function () {
                    _this._graph.load(_this._root).then(function () {
                        _this.refreshTables(true);
                    });
                }, 750);
            }
        };
        return App;
    }(phosphor_1.SplitPanel));
    exports.App = App;
});
//# sourceMappingURL=index.js.map