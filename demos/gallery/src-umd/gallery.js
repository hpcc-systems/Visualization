var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpcc-js/common", "./samples.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require("@hpcc-js/common");
    var samples_js_1 = require("./samples.js");
    function href(html, path, name, style) {
        if (style === void 0) { style = ""; }
        var total = samples_js_1.sampleFiles.filter(function (file) { return file.path.indexOf(path) === 0; }).length;
        return "<a href=\"./" + html + ".html?" + path + "\" style=\"" + style + "\">" + name + " (" + total + ")</a>";
    }
    function hrefPath(path, depth) {
        if (depth === void 0) { depth = 1; }
        var folders = path.split("/");
        var file = folders.pop();
        var baseUrl = [];
        var retVal = [];
        folders.forEach(function (folder, idx) {
            if (idx >= depth) {
                retVal.push(href("gallery", baseUrl.join("/") + "/" + folder, folder));
            }
            baseUrl.push(folder);
        });
        var total = samples_js_1.sampleFiles.filter(function (file) { return file.path.indexOf(path) === 0; }).length;
        retVal.push(total > 1 ? file + " (" + total + ")" : file);
        return retVal.join(" > ");
    }
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = _super.call(this) || this;
            _this._selectionStack = [];
            return _this;
        }
        App.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this._navDiv = element.append("h3")
                .style("position", "absolute")
                .style("left", "0px")
                .style("top", "0px")
                .style("right", "0px")
                .style("height", "32px");
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
                var defaultRow = samples_js_1.sampleFolders.filter(function (row) { return row.path.indexOf(_this._default) === 0; })[0] || samples_js_1.sampleFolders[0];
                this.navChanged({ text: defaultRow.name, value: defaultRow.path }, "text", true);
            }
        };
        App.prototype.navChanged = function (row, col, sel) {
            var node = samples_js_1.sampleIdx[row.value];
            this._navDiv.html(hrefPath(row.value));
            var depth = row.value.split("/").length;
            history.pushState(undefined, undefined, "gallery.html?" + node.path);
            var data = node.children.map(function (d) {
                switch (d.type) {
                    case "file":
                        return d;
                    case "folder":
                        var childFiles = samples_js_1.sampleFiles.filter(function (file) { return file.path.indexOf(d.path) === 0; });
                        var idx = Math.floor(Math.random() * childFiles.length);
                        return __assign({}, childFiles[idx], { children: d.children });
                }
                return undefined;
            }).filter(function (d) { return !!d; });
            var samples = this._body.selectAll(".sampleItem").data(data, function (d) { return d.path; });
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
                    common_1.select(_this)
                        .attr("src", "./galleryItem.html?" + d.path);
                }, i * 333);
            });
            var titleDiv = samplesEnter.append("div")
                .style("height", "20px");
            titleDiv.append("h4")
                .style("float", "left")
                .style("margin-top", "0px")
                .style("margin-left", "4px")
                .style("margin-bottom", "0px")
                .html(function (d) { return hrefPath(d.path, depth); });
            titleDiv.append("a")
                .style("float", "right")
                .style("margin-right", "4px")
                .attr("href", function (d) { return "./playground.html?" + d.path; })
                .text("playground");
            samples.exit().remove();
        };
        __decorate([
            common_1.publish("", "string")
        ], App.prototype, "_default", void 0);
        return App;
    }(common_1.HTMLWidget));
    exports.App = App;
});
