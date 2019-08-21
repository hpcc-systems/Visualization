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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpcc-js/common", "@hpcc-js/phosphor", "./hpccMarkdown.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require("@hpcc-js/common");
    var phosphor_1 = require("@hpcc-js/phosphor");
    var hpccMarkdown_js_1 = require("./hpccMarkdown.js");
    var HPCCIndex = /** @class */ (function (_super) {
        __extends(HPCCIndex, _super);
        function HPCCIndex() {
            return _super.call(this) || this;
        }
        HPCCIndex.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this._ul = element.append("ul");
        };
        HPCCIndex.prototype.update = function (domNode, element) {
            var _this = this;
            _super.prototype.update.call(this, domNode, element);
            var items = this._ul.selectAll(".indexItem").data(this.data(), function (d) { return d.path; });
            items.enter().append("li")
                .attr("class", "indexItem")
                .on("click", function (d) { return _this.clicked(d.path); })
                .merge(items)
                .text(function (d) { return d.path; });
            items.exit().remove();
        };
        HPCCIndex.prototype.clicked = function (path) {
        };
        return HPCCIndex;
    }(common_1.HTMLWidget));
    var HPCCIndexPanel = /** @class */ (function (_super) {
        __extends(HPCCIndexPanel, _super);
        function HPCCIndexPanel() {
            var _this = _super.call(this, "horizontal") || this;
            _this._index = new HPCCIndex()
                .on("clicked", function (path) {
                var _a;
                (_a = "../" + path, __syncRequire ? Promise.resolve().then(function () { return require(_a); }) : new Promise(function (resolve_1, reject_1) { require([_a], resolve_1, reject_1); })).then(function (md) {
                    _this._markdown
                        .markdown(md)
                        .lazyRender();
                });
            });
            _this._markdown = new hpccMarkdown_js_1.HPCCMarkdown();
            _this
                .addWidget(_this._index)
                .addWidget(_this._markdown)
                .relativeSizes([0.3, 0.7]);
            return _this;
        }
        HPCCIndexPanel.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
        };
        HPCCIndexPanel.prototype.update = function (domNode, element) {
            this._index.data(this.data());
            _super.prototype.update.call(this, domNode, element);
        };
        return HPCCIndexPanel;
    }(phosphor_1.SplitPanel));
    exports.HPCCIndexPanel = HPCCIndexPanel;
});
//# sourceMappingURL=hpccIndex.js.map