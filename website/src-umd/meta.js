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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path = require("path");
    var wd = process.cwd();
    var pkgName = path.basename(wd);
    var TSNode = /** @class */ (function () {
        function TSNode(_tdNode) {
            this._tdNode = _tdNode;
            this.name = _tdNode.name;
        }
        return TSNode;
    }());
    exports.TSNode = TSNode;
    var TSModule = /** @class */ (function (_super) {
        __extends(TSModule, _super);
        function TSModule(tdNode) {
            var _this = _super.call(this, tdNode) || this;
            _this._classes = {};
            if (tdNode.children) {
                tdNode.children.filter(function (cls) { return cls.kindString === "Class"; }).forEach(function (cls) {
                    _this._classes[cls.name] = new TSClass(cls);
                });
            }
            return _this;
        }
        return TSModule;
    }(TSNode));
    exports.TSModule = TSModule;
    var TSClass = /** @class */ (function (_super) {
        __extends(TSClass, _super);
        function TSClass(tdNode) {
            return _super.call(this, tdNode) || this;
        }
        TSClass.prototype.source = function () {
            if (this._tdNode.sources) {
                var source = this._tdNode.sources[0];
                return "https://github.com/hpcc-systems/Visualization/blob/master/packages/" + pkgName + "/src/" + source.fileName + "#L" + source.line;
            }
            return "";
        };
        TSClass.prototype.extends = function () {
            if (this._tdNode.extendedTypes) {
                return this._tdNode.extendedTypes.map(function (et) { return et.name; })[0];
            }
            return "";
        };
        TSClass.prototype.toJSON = function () {
            return JSON.stringify({
                source: this.source(),
                extends: this.extends(),
                yyy: "yyy",
                zzz: {
                    aaa: 0
                }
            }, undefined, 4);
        };
        return TSClass;
    }(TSNode));
    exports.TSClass = TSClass;
    var Meta = /** @class */ (function () {
        function Meta(pkgJson, metaJson) {
            var _this = this;
            this.modules = {};
            this._classes = {};
            if (metaJson.children) {
                metaJson.children.forEach(function (mod) {
                    _this.modules[mod.name] = new TSModule(mod);
                    _this._classes = __assign({}, _this._classes, _this.modules[mod.name]._classes);
                });
            }
        }
        Object.defineProperty(Meta.prototype, "classes", {
            get: function () {
                return this._classes;
            },
            enumerable: true,
            configurable: true
        });
        return Meta;
    }());
    exports.Meta = Meta;
});
//# sourceMappingURL=meta.js.map