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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpcc-js/codemirror", "@hpcc-js/other", "@hpcc-js/phosphor", "@hpcc-js/util", "./DemoWidget"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codemirror_1 = require("@hpcc-js/codemirror");
    var other_1 = require("@hpcc-js/other");
    var phosphor_1 = require("@hpcc-js/phosphor");
    var util_1 = require("@hpcc-js/util");
    var DemoWidget_1 = require("./DemoWidget");
    var logger = util_1.scopedLogger("index.ts");
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = _super.call(this) || this;
            _this._skipUpdate = false;
            _this._editor = new codemirror_1.JSEditor()
                .on("changes", function (changes) {
                _this.changed(_this._editor);
            });
            _this._propEditor = new other_1.PropertyEditor();
            _this._demo = new DemoWidget_1.DemoWidget()
                .on("changed", function (widget) {
                _this.changed(_this._demo);
            });
            _this._propEditor.monitor(function (id, newValue, oldValue, source) {
                _this.changed(_this._propEditor);
            });
            window["cm_editor"] = _this._editor;
            _this.addWidget(_this._demo, '<div id="target">');
            _this.addWidget(_this._propEditor, "Properties", "split-right", _this._demo);
            _this.addWidget(_this._editor, "JavaScript", "split-bottom", _this._demo);
            return _this;
        }
        App.prototype.load = function (fileName) {
            var _this = this;
            System.import("./samples/" + fileName + ".js!./plugins/text.js").then(function (text) {
                _this._editor.text(text);
            });
        };
        App.prototype.changed = function (source) {
            switch (source) {
                case this._demo:
                    this._propEditor
                        .widget(this._demo._widget)
                        .render();
                    break;
                case this._editor:
                    if (this._skipUpdate) {
                        this._skipUpdate = false;
                    }
                    else {
                        this._demo.lazyRender();
                    }
                    break;
                case this._propEditor:
                    if (this._editor.hasFocus()) {
                        return;
                    }
                    if (this._demo._widget) {
                        this._demo._widget
                            .lazyRender();
                        this.syncJavaScript(this._demo._widget);
                    }
                    break;
            }
        };
        App.prototype.syncJavaScript = function (w) {
            var srcCodeLines = this._editor.text().split("\n");
            var props = w.serialize();
            var renderIdx = 0;
            var inProps = false;
            for (var i = srcCodeLines.length - 1; i >= 0; --i) {
                var line = srcCodeLines[i];
                var dotIndex = line.indexOf(".");
                var parenIndex = line.indexOf("(");
                if (dotIndex >= 0 && parenIndex > dotIndex) {
                    var func = line.substring(dotIndex + 1, parenIndex);
                    switch (func) {
                        case "render":
                            inProps = true;
                            renderIdx = i;
                            break;
                        case "target":
                            inProps = false;
                            break;
                        case "columns":
                        case "data":
                            break;
                        default:
                            if (inProps) {
                                if (props[func]) {
                                    srcCodeLines[i] = srcCodeLines[i].substring(0, parenIndex) + ("(" + JSON.stringify(props[func]) + ")");
                                    delete props[func];
                                }
                                else {
                                    srcCodeLines.splice(i, 1);
                                    renderIdx--;
                                }
                            }
                    }
                }
            }
            for (var key in props) {
                if (typeof w[key] === "function") {
                    srcCodeLines.splice(renderIdx, 0, "    ." + key + "(" + JSON.stringify(props[key]) + ")");
                }
            }
            this._skipUpdate = true;
            this._editor.text(srcCodeLines.join("\n"));
        };
        return App;
    }(phosphor_1.DockPanel));
    exports.App = App;
});
//# sourceMappingURL=index.js.map