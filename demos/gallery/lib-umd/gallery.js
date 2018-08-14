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
        define(["require", "exports", "@hpcc-js/common", "@hpcc-js/other", "../samples.json"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require("@hpcc-js/common");
    var other_1 = require("@hpcc-js/other");
    // @ts-ignore
    var samples = require("../samples.json");
    var sampleIdx = {};
    var sampleFolders = [];
    function index(node) {
        sampleIdx[node.path] = node;
        if (node.type === "folder") {
            sampleFolders.push(node);
            node.children.forEach(index);
        }
    }
    samples.children.forEach(index);
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = _super.call(this) || this;
            _this._nav = new other_1.Select();
            _this._selectionStack = [];
            return _this;
        }
        App.prototype.enter = function (domNode, element) {
            var _this = this;
            _super.prototype.enter.call(this, domNode, element);
            this._navDiv = element.append("div")
                .style("position", "absolute")
                .style("left", "0px")
                .style("top", "0px")
                .style("right", "0px")
                .style("height", "32px");
            this._nav
                .target(this._navDiv.node())
                .label("Gallery:  ")
                .optional(false)
                .columns(["text", "value"])
                .textColumn("text")
                .valueColumn("value")
                .data(sampleFolders.map(function (n) { return [n.name, n.path]; }))
                .on("click", function (row, col, sel) {
                _this.navChanged(row, col, sel);
            })
                .render();
            this._body = element.append("div")
                .style("position", "absolute")
                .style("left", "0px")
                .style("top", "40px")
                .style("right", "0px")
                .style("overflow-y", "auto");
        };
        App.prototype.update = function (domNode, element) {
            _super.prototype.update.call(this, domNode, element);
            this._body.style("height", this.height() - 40 + "px");
            if (this.renderCount() === 0) {
                this.navChanged({ text: sampleFolders[0].name, value: sampleFolders[0].path }, "text", true);
            }
        };
        App.prototype.navChanged = function (row, col, sel) {
            var node = sampleIdx[row.value];
            var samples = this._body.selectAll(".sampleItem").data(node.children.filter(function (d) { return d.type === "file"; }), function (d) { return d.path; });
            var width = 480;
            var height = 360;
            var samplesEnter = samples.enter().append("div")
                .attr("class", "sampleItem")
                .style("display", "inline-block")
                .style("margin", "4px")
                .style("width", width + 8 + "px")
                .style("border", "solid")
                .style("border-width", "1px");
            samplesEnter.append("iframe")
                .attr("title", function (d) { return d.name; })
                .attr("width", "100%")
                .attr("height", height + "px")
                .style("border-style", "none")
                .merge(samples)
                .attr("src", function (d) { return "./galleryItem.html?" + d.path; });
            var titleDiv = samplesEnter.append("div")
                .style("height", "20px");
            titleDiv.append("h3")
                .style("float", "left")
                .style("margin-top", "0px")
                .style("margin-left", "4px")
                .style("margin-bottom", "0px")
                .text(function (d) { return d.name; });
            titleDiv.append("a")
                .style("float", "right")
                .style("margin-right", "4px")
                .attr("href", function (d) { return "./playground.html?" + d.path; })
                .text("playground");
            samples.exit().remove();
        };
        return App;
    }(common_1.HTMLWidget));
    exports.App = App;
});
//# sourceMappingURL=gallery.js.map