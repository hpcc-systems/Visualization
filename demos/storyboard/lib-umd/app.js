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
        define(["require", "exports", "@hpcc-js/codemirror", "@hpcc-js/common", "@hpcc-js/layout", "@hpcc-js/observable-md", "@hpcc-js/phosphor", "./html", "./samples", "./util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codemirror_1 = require("@hpcc-js/codemirror");
    var common_1 = require("@hpcc-js/common");
    var layout_1 = require("@hpcc-js/layout");
    var observable_md_1 = require("@hpcc-js/observable-md");
    var phosphor_1 = require("@hpcc-js/phosphor");
    var html_1 = require("./html");
    // import * as plugins from "./plugins/index";
    var samples_1 = require("./samples");
    var util_1 = require("./util");
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
            _this._toggleCode = new common_1.ToggleButton().faChar("fa-code").tooltip("Show Code Inline")
                .on("click", function () {
                _this.updateAddress();
                _this._omd
                    .showCode(_this._toggleCode.selected())
                    .lazyRender();
            });
            _this._selectSample = new common_1.SelectDropDown()
                .values(samples_1.samples)
                .on("click", function (md) {
                _this.updateAddress();
                _this._mdEditor
                    .markdown(md)
                    .lazyRender();
                _this.generate();
            });
            _this._buttonGithub = new common_1.Button().faChar("fa-github").tooltip("GitHub Repository")
                .on("click", function () {
                var win = window.open("https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md", "_blank");
                win.focus();
            });
            _this._titleBar = new common_1.TitleBar().buttons([_this._buttonGenerate, _this._buttonDownload, new common_1.Spacer(), _this._toggleValues, _this._toggleCode, new common_1.Spacer(), _this._selectSample, new common_1.Spacer(), _this._buttonGithub])
                .title("Observable Markdown Demo");
            _this._split = new phosphor_1.SplitPanel("horizontal");
            _this._mdEditor = new codemirror_1.MarkdownEditor()
                .on("changes", function () {
                _this.updateToolbar();
            });
            _this._rhsTab = new phosphor_1.TabPanel();
            _this._omd = new observable_md_1.ObservableMD();
            _this._html = new codemirror_1.HTMLEditor();
            if (!samples_1.samples[defaultSelection]) {
                if (defaultSelection[0] === "@") {
                    // @lzxue/the-world-grid-map-use-l7
                    util_1.inspect(defaultSelection).then(function (md) {
                        samples_1.samples[defaultSelection] = md;
                    });
                }
                else {
                    defaultSelection = "Hello World";
                }
            }
            _this._selectSample.selected(defaultSelection);
            _this._toggleValues.selected(debug);
            return _this;
        }
        App.prototype.updateAddress = function () {
            var newUrl = document.location.origin + document.location.pathname + encodeURI("?" + this._selectSample.selected() + (this._toggleValues.selected() === true ? "&debug" : "") + (this._toggleCode.selected() === true ? "&code" : ""));
            try {
                window.history.pushState("", "", newUrl);
            }
            catch (e) {
                //  Local files do not have history...
            }
        };
        App.prototype.generate = function () {
            var omd = this._mdEditor.text();
            this._omd
                .markdown(this._mdEditor.text())
                .lazyRender();
            this._html
                .text(html_1.html(omd))
                .lazyRender();
            this.updateToolbar();
        };
        App.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this._rhsTab
                .addWidget(this._omd, "Markdown", { overflowY: "auto" })
                .addWidget(this._html, "HTML");
            this._split
                .addWidget(this._mdEditor)
                .addWidget(this._rhsTab);
            this.top(this._titleBar);
            this.center(this._split);
            this._mdEditor
                .text(samples_1.samples[this._selectSample.selected()]);
            this._omd
                .showValues(this._toggleValues.selected())
                .showCode(this._toggleCode.selected());
            this.generate();
        };
        App.prototype.update = function (domNode, element) {
            _super.prototype.update.call(this, domNode, element);
            this.updateToolbar();
        };
        App.prototype.updateToolbar = function () {
            this._buttonGenerate.enabled(this._mdEditor.text() !== this._omd.markdown()).lazyRender();
        };
        return App;
    }(layout_1.Border2));
    exports.App = App;
});
//# sourceMappingURL=app.js.map