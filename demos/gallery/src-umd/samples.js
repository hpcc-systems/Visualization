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
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sampleIdx = {};
    exports.sampleFolders = [];
    exports.sampleFiles = [];
    function index(node, parentName) {
        if (parentName === void 0) { parentName = ""; }
        var fullName = parentName ? parentName + "/" + node.name : node.name;
        exports.sampleIdx[node.path] = node;
        switch (node.type) {
            case "file":
                exports.sampleFiles.push(node);
                break;
            case "folder":
                exports.sampleFolders.push(__assign({}, node, { name: fullName }));
                node.children.forEach(function (row) { return index(row, fullName); });
                break;
        }
    }
    // @ts-ignore
    index(window.config.samples);
});
