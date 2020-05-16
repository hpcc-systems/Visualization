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
        define(["require", "exports", "@hpcc-js/codemirror", "@hpcc-js/common", "@hpcc-js/dgrid", "@hpcc-js/layout", "@hpcc-js/observable-md", "@hpcc-js/phosphor", "./html", "./samples"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    var codemirror_1 = require("@hpcc-js/codemirror");
    var common_1 = require("@hpcc-js/common");
    var dgrid_1 = require("@hpcc-js/dgrid");
    var layout_1 = require("@hpcc-js/layout");
    var observable_md_1 = require("@hpcc-js/observable-md");
    var phosphor_1 = require("@hpcc-js/phosphor");
    var html_1 = require("./html");
    var samples_1 = require("./samples");
    var sampleKeys = {};
    for (var key in samples_1.samples) {
        sampleKeys[key] = key;
    }
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App(defaultSelection, debug) {
            if (debug === void 0) { debug = false; }
            var _this = _super.call(this) || this;
            _this._buttonGenerate = new common_1.Button().faChar("fa-arrow-right").tooltip("Render (Ctrl+S)")
                .on("click", function () {
                _this.generate();
            });
            _this._buttonDownload = new common_1.Button().faChar("fa-download").tooltip("Download as Web Page")
                .on("click", function () {
                var omd = _this._mdEditor.text();
                common_1.Utility.downloadString("TEXT", html_1.html(omd), (_this._selectSample.selected() || "omd") + ".html");
            });
            _this._toggleValues = new common_1.ToggleButton().faChar("fa-bug").tooltip("Show Developer Info")
                .selected(false)
                .on("click", function () {
                _this.updateAddress();
                _this._omd
                    .showValues(_this._toggleValues.selected())
                    .lazyRender();
            });
            _this._selectSample = new common_1.SelectDropDown()
                .values(sampleKeys)
                .on("click", function (key) {
                _this._sample = samples_1.samples[key];
                _this.updateAddress();
                _this._mdEditor
                    .markdown(_this._sample.content)
                    .lazyRender();
                _this.generate();
            });
            _this._buttonGithub = new common_1.Button().faChar("fa-github").tooltip("GitHub Repository")
                .on("click", function () {
                var win = window.open("https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md", "_blank");
                win.focus();
            });
            _this._titleBar = new common_1.TitleBar().buttons([_this._buttonGenerate, new common_1.Spacer(), _this._buttonDownload, _this._toggleValues, new common_1.Spacer(), _this._selectSample, new common_1.Spacer(), _this._buttonGithub])
                .title("Observable Markdown Demo");
            _this._mdEditor = new codemirror_1.ObservableMarkdownEditor()
                .on("changes", function () {
                _this.updateToolbar();
            });
            _this._mdErrors = new dgrid_1.Table()
                .columns(["Type", "Message", "Row", "Col"])
                .sortable(true)
                .on("click", function (row, col, sel) {
                if (sel) {
                    _this._mdEditor.setCursor(row.Row, row.Col);
                }
            });
            _this._lhsSplit = new phosphor_1.SplitPanel("vertical")
                .addWidget(_this._mdEditor)
                .addWidget(_this._mdErrors);
            _this._omd = new observable_md_1.ObservableMD()
                .on("runtimeUpdated", function () {
                _this.updateErrors(_this._omd.errors());
            });
            _this._html = new codemirror_1.HTMLEditor();
            _this._rhsTab = new phosphor_1.TabPanel()
                .addWidget(_this._omd, "Markdown", { overflowY: "auto" })
                .addWidget(_this._html, "HTML");
            _this._split = new phosphor_1.SplitPanel("horizontal")
                .addWidget(_this._lhsSplit)
                .addWidget(_this._rhsTab);
            if (!samples_1.samples[defaultSelection]) {
                defaultSelection = "Hello World (.omd)";
            }
            _this._selectSample.selected(defaultSelection);
            _this._toggleValues.selected(debug);
            return _this;
        }
        App.prototype.updateAddress = function () {
            var newUrl = document.location.origin + document.location.pathname + encodeURI("?" + this._selectSample.selected() + (this._toggleValues.selected() === true ? "&debug" : ""));
            try {
                window.history.pushState("", "", newUrl);
            }
            catch (e) {
                //  Local files do not have history...
            }
        };
        App.prototype.generate = function () {
            this.clearErrors();
            var text = this._mdEditor.text();
            this._omd
                .markdown(text)
                .lazyRender();
            this._html
                .text(html_1.html(text))
                .lazyRender();
            this.updateToolbar();
        };
        App.prototype.updateToolbar = function () {
            this._buttonGenerate.enabled(this._mdEditor.text() !== this._omd.markdown()).lazyRender();
        };
        App.prototype.clearErrors = function () {
            this._mdEditor.removeAllHighlight();
            this._mdErrors
                .data([])
                .lazyRender();
        };
        App.prototype.updateErrors = function (errors) {
            var _this = this;
            this._mdEditor.removeAllHighlight();
            var tableErrors = [];
            errors.forEach(function (e) {
                var startPos = _this._mdEditor.positionAt(e.start);
                var endPos = _this._mdEditor.positionAt(e.end - 1);
                _this._mdEditor.highlightError(startPos, endPos);
                tableErrors.push(["", e.message, startPos.line, startPos.ch, e.start, e.end]);
            });
            this._mdErrors
                .data(tableErrors)
                .lazyRender();
        };
        App.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this.top(this._titleBar);
            this.center(this._split);
            this._sample = samples_1.samples[this._selectSample.selected()];
            this._mdEditor
                .text(this._sample ? this._sample.content : "");
            this._omd
                .showValues(this._toggleValues.selected());
            this.generate();
        };
        App.prototype.update = function (domNode, element) {
            _super.prototype.update.call(this, domNode, element);
            this.updateToolbar();
        };
        return App;
    }(layout_1.Border2));
    exports.App = App;
});
//# sourceMappingURL=app.js.map