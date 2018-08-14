var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HTMLWidget, publish, select as d3Select } from "@hpcc-js/common";
import { Select } from "@hpcc-js/other";
var sampleIdx = {};
var sampleFolders = [];
function index(node) {
    sampleIdx[node.path] = node;
    if (node.type === "folder") {
        sampleFolders.push(node);
        node.children.forEach(index);
    }
}
// @ts-ignore
window.config.samples.children.forEach(index);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this._nav = new Select();
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
            .label("Fetching Samples from GitHub:  ")
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
        var _this = this;
        _super.prototype.update.call(this, domNode, element);
        this._body.style("height", this.height() - 40 + "px");
        if (this.renderCount() === 0) {
            var defaultRow = sampleFolders.filter(function (row) { return row.path === _this._default; })[0] || sampleFolders[0];
            this._nav._select.node().value = defaultRow.path;
            this.navChanged({ text: defaultRow.name, value: defaultRow.path }, "text", true);
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
            .each(function (d, i) {
            var _this = this;
            //  Stagger the loading ever so slightly...
            setTimeout(function () {
                d3Select(_this)
                    .attr("src", "./galleryItem.html?" + d.path);
            }, i * 333);
        });
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
    __decorate([
        publish("", "string")
    ], App.prototype, "_default", void 0);
    return App;
}(HTMLWidget));
export { App };
//# sourceMappingURL=gallery.js.map