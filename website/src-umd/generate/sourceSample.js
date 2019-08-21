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
        define(["require", "exports", "@hpcc-js/codemirror", "@hpcc-js/common", "@hpcc-js/phosphor", "./sample.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codemirror_1 = require("@hpcc-js/codemirror");
    var common_1 = require("@hpcc-js/common");
    var phosphor_1 = require("@hpcc-js/phosphor");
    var sample_js_1 = require("./sample.js");
    var SourceSample = /** @class */ (function (_super) {
        __extends(SourceSample, _super);
        function SourceSample() {
            var _this = _super.call(this, "horizontal") || this;
            _this.jsEditor = new codemirror_1.JSEditor()
                .on("changes", function () {
                _this.sample
                    .javascript(_this.jsEditor.text())
                    .lazyRender();
            });
            _this.sample = new sample_js_1.Sample(_this.jsEditor.id());
            _this
                .addWidget(_this.jsEditor)
                .addWidget(_this.sample);
            return _this;
        }
        SourceSample.prototype.update = function (domNode, element) {
            _super.prototype.update.call(this, domNode, element);
            if (this._prevJS !== this.javascript()) {
                this._prevJS = this.javascript();
                this.jsEditor.javascript(this.javascript());
            }
        };
        __decorate([
            common_1.publish("", "string")
        ], SourceSample.prototype, "javascript", void 0);
        return SourceSample;
    }(phosphor_1.SplitPanel));
    exports.SourceSample = SourceSample;
});
//# sourceMappingURL=sourceSample.js.map