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
        define(["require", "exports", "@hpcc-js/common", "marked", "prismjs", "./sourceSample.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require("@hpcc-js/common");
    var marked = require("marked");
    var prism = require("prismjs");
    var sourceSample_js_1 = require("./sourceSample.js");
    marked.setOptions({
        highlight: function (code, lang) {
            if (!prism.languages.hasOwnProperty(lang)) {
                // Default to markup if it's not in our extensions.
                lang = "markup";
            }
            return prism.highlight(code, prism.languages[lang], lang);
        }
    });
    var Markdown = /** @class */ (function (_super) {
        __extends(Markdown, _super);
        function Markdown() {
            var _this = _super.call(this) || this;
            _this._renderer = new marked.Renderer();
            _this._origCode = _this._renderer.code;
            _this._codeSamples = [];
            _this._placeholderID = 0;
            _this._renderer.code = function (text, infostring, escaped) {
                switch (infostring) {
                    case "meta":
                    case "sample":
                    case "sample-code":
                        return _this.renderPlaceholder(infostring, infostring, text);
                    default:
                        if (infostring.indexOf("@hpcc-js") === 0) {
                            return _this.renderPlaceholder("publish-properties", infostring, text);
                        }
                }
                return _this._origCode.call(_this._renderer, text, infostring, escaped);
            };
            _this._renderer.heading = function (text, level) {
                var escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
                return "<h" + level + ">\n    <a name=\"" + escapedText + "\" class=\"anchor\" href=\"#" + escapedText + "\">\n        <span class=\"header-link\"></span>\n    </a>\n    " + text + "\n</h" + level + ">";
            };
            return _this;
        }
        Markdown.prototype.renderPlaceholder = function (classID, infostring, text) {
            var targetID = "placeholder-" + ++this._placeholderID;
            this._codeSamples.push({ targetID: targetID, classID: classID, infostring: infostring, text: text });
            return "<div id=\"" + targetID + "\" class=\"" + classID + "\"></div>";
        };
        Markdown.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            element
                .style("overflow-x", "hidden")
                .style("overflow-y", "scroll")
                .style("padding", "8px");
        };
        Markdown.prototype.updateMeta = function (cs) {
            var json = JSON.parse(cs.text);
            var md = [];
            if (json.source) {
                md.push("[source](" + json.source + ")");
            }
            common_1.select("#" + cs.targetID).html(marked(md.join("\n")));
        };
        Markdown.prototype.updateSampleCode = function (cs) {
            cs.splitPanel = new sourceSample_js_1.SourceSample()
                .target(cs.targetID)
                .javascript(cs.text)
                .height(Math.max((cs.text.split("\n").length + 1) * 14, 200))
                .render();
        };
        Markdown.prototype.parseClassID = function (classID) {
            var _a = classID.split("_"), moduleName = _a[0], className = _a[1];
            return ["@hpcc-js/" + moduleName, className];
        };
        Markdown.prototype.extends = function (w) {
            var classParts = w.class().split(" ");
            classParts.pop();
            return this.parseClassID(classParts.pop());
        };
        Markdown.prototype.updatePublishProperties = function (cs) {
            var _this = this;
            var _a = cs.infostring.split(":"), module = _a[0], widget = _a[1];
            (__syncRequire ? Promise.resolve().then(function () { return require(module); }) : new Promise(function (resolve_1, reject_1) { require([module], resolve_1, reject_1); })).then(function (mod) {
                var md = [];
                var w = new mod[widget]();
                var derivedFrom = _this.extends(w);
                md.push("Derived from:  " + derivedFrom[1] + " (" + derivedFrom[0] + ")\n");
                var pp = w.publishedProperties(false, true);
                pp.forEach(function (meta) {
                    md.push("### " + meta.id + "\n");
                    md.push("_" + meta.description + "_\n");
                    md.push("* **type**: " + meta.type);
                    md.push("* **optional**: " + !!meta.ext.optional);
                    md.push("* **default**: " + JSON.stringify(meta.defaultValue) + " ");
                    if (meta.type === "set") {
                        md.push("* **options**: " + JSON.stringify(meta.set) + " ");
                    }
                    md.push("");
                });
                common_1.select("#" + cs.targetID + " ").html(marked(md.join("\n")));
            });
        };
        Markdown.prototype.update = function (domNode, element) {
            var _this = this;
            _super.prototype.update.call(this, domNode, element);
            element.style("height", this.height() + "px");
            if (this._prevMarkdown !== this.markdown()) {
                this._prevMarkdown = this.markdown();
                this._codeSamples = [];
                element.html(marked(this.markdown(), { renderer: this._renderer }));
                this._codeSamples.forEach(function (cs) {
                    switch (cs.classID) {
                        case "meta":
                            _this.updateMeta(cs);
                            break;
                        case "sample-code":
                            _this.updateSampleCode(cs);
                            break;
                        case "publish-properties":
                            _this.updatePublishProperties(cs);
                            break;
                    }
                });
            }
            else {
                this._codeSamples.forEach(function (cs) {
                    if (cs.splitPanel) {
                        cs.splitPanel
                            .width(_this.width())
                            .lazyRender();
                    }
                });
            }
        };
        __decorate([
            common_1.publish("", "string")
        ], Markdown.prototype, "markdown", void 0);
        return Markdown;
    }(common_1.HTMLWidget));
    exports.Markdown = Markdown;
});
//# sourceMappingURL=markdown.js.map