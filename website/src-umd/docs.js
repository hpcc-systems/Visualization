(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var path = require("path");
    var wd = process.cwd();
    var isMD = function (file) { return path.extname(file) === ".md"; };
    var MDFile = /** @class */ (function () {
        function MDFile(filePath, meta) {
            this.filePath = filePath;
            this.name = path.basename(filePath, ".md");
            this._meta = meta.classes[this.name];
            this._content = fs.readFileSync(filePath, "utf8").split("\n");
        }
        MDFile.prototype.clearPlaceholder = function (tag) {
            var retVal = -1;
            var content = [];
            var inMeta = false;
            var lineNo = 0;
            for (var _i = 0, _a = this._content; _i < _a.length; _i++) {
                var line = _a[_i];
                if (line === "```meta") {
                    inMeta = true;
                    retVal = lineNo;
                }
                else if (inMeta && line === "```") {
                    inMeta = false;
                }
                else if (inMeta && line.indexOf("```") === 0) {
                    throw new Error("Invalid Meta Section (" + this.filePath + ")");
                }
                else if (inMeta) {
                    continue;
                }
                content.push(line);
                ++lineNo;
            }
            this._content = content;
            return retVal;
        };
        MDFile.prototype.updateMeta = function () {
            var metaLineNo = this.clearPlaceholder("meta");
            if (metaLineNo >= 0) {
                this._content.splice(metaLineNo + 1, 0, this._meta.toJSON());
            }
            return this;
        };
        MDFile.prototype.write = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                fs.writeFile(_this.filePath, _this._content.join("\n"), function (err) {
                    if (err)
                        reject(err);
                    resolve(_this);
                });
            });
        };
        return MDFile;
    }());
    exports.MDFile = MDFile;
    var Docs = /** @class */ (function () {
        function Docs(meta) {
            var _this = this;
            this.files = {};
            fs.readdirSync(wd + "/docs").filter(isMD).forEach(function (filePath) {
                var mdFile = new MDFile(wd + "/docs/" + filePath, meta);
                _this.files[mdFile.name] = mdFile;
            });
        }
        return Docs;
    }());
    exports.Docs = Docs;
});
//# sourceMappingURL=docs.js.map