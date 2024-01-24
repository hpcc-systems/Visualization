var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        define(["require", "exports", "@hpcc-js/common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DemoWidget = void 0;
    var common_1 = require("@hpcc-js/common");
    var DemoWidget = /** @class */ (function (_super) {
        __extends(DemoWidget, _super);
        function DemoWidget() {
            var _this = _super.call(this) || this;
            _this._samplePath = "./samples/HelloWorld.js";
            _this._errCount = 0;
            _this._widget = null;
            return _this;
        }
        DemoWidget.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this._sampleDiv = element.append("div")
                .attr("id", "target")
                .datum(null);
        };
        DemoWidget.prototype.update = function (domNode, element) {
            var _this = this;
            _super.prototype.update.call(this, domNode, element);
            this._sampleDiv
                .style("width", "".concat(this.width(), "px"))
                .style("height", "".concat(this.height(), "px"));
            var js = window["cm_editor"].text();
            if (js && this._prevJS !== js) {
                this._prevJS = js;
                this._sampleDiv.text("");
                var loading_1 = this._sampleDiv.append("div").text("...loading...");
                System.registry.delete(System.normalizeSync("cm_editor_".concat(this._errCount, "!./plugins/cm.js")));
                this._widget = null;
                System.import("cm_editor_".concat(this._errCount, "!./plugins/cm.js")).then(function (info) {
                    loading_1.remove();
                    setTimeout(function () {
                        var element = _this._sampleDiv.select(".common_Widget");
                        if (!element.empty()) {
                            _this._widget = element.datum();
                            _this.changed(_this._widget);
                        }
                    }, 500);
                }).catch(function (e) {
                    _this.changed(_this._widget);
                    _this._sampleDiv.node().innerText = e.message;
                    System.registry.delete(System.normalizeSync("cm_editor_".concat(_this._errCount++, "!./plugins/cm.js")));
                });
            }
            else if (this._widget) {
                this._widget
                    .resize()
                    .render();
            }
        };
        DemoWidget.prototype.changed = function (widget) {
        };
        DemoWidget.prototype.debugSystem = function () {
            var keysItr = System.registry.keys();
            var k = keysItr.next();
            while (!k.done) {
                console.log(k.value);
                k = keysItr.next();
            }
        };
        return DemoWidget;
    }(common_1.HTMLWidget));
    exports.DemoWidget = DemoWidget;
});
