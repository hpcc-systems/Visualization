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
        define(["require", "exports", "@hpcc-js/common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require("@hpcc-js/common");
    var Sample = /** @class */ (function (_super) {
        __extends(Sample, _super);
        function Sample(jsEditorID) {
            var _this = _super.call(this) || this;
            _this._widget = null;
            _this._jsEditorID = jsEditorID;
            return _this;
        }
        Sample.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this._sampleDiv = element.append("div")
                .attr("id", this._jsEditorID + "-sample")
                .datum(null);
        };
        Sample.prototype.update = function (domNode, element) {
            var _this = this;
            _super.prototype.update.call(this, domNode, element);
            this._sampleDiv
                .style("width", this.width() + "px")
                .style("height", this.height() + "px");
            var js = this.javascript();
            if (js && this._prevJS !== js) {
                this._prevJS = js;
                this._sampleDiv.text("");
                var loading_1 = this._sampleDiv.append("div").text("...loading...");
                System.registry.delete(System.normalizeSync(this._jsEditorID + "!./plugins/cm.js"));
                this._widget = null;
                System.import(this._jsEditorID + "!./plugins/cm.js").then(function () {
                    loading_1.remove();
                    var element = _this._sampleDiv.select(".common_Widget");
                    if (!element.empty()) {
                        _this._widget = element.datum();
                        _this.changed(_this._widget);
                    }
                }).catch(function (e) {
                    _this.changed(_this._widget);
                    _this._sampleDiv.node().innerText = e.message;
                    System.registry.delete(System.normalizeSync(_this._jsEditorID + "!./plugins/cm.js"));
                });
            }
            else if (this._widget) {
                this._widget
                    .resize()
                    .render();
            }
        };
        Sample.prototype.changed = function (widget) {
        };
        __decorate([
            common_1.publish("", "string")
        ], Sample.prototype, "javascript", void 0);
        return Sample;
    }(common_1.HTMLWidget));
    exports.Sample = Sample;
});
//# sourceMappingURL=sample.js.map