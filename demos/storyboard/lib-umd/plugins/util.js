var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
    var g_divID = 0;
    function _div(widgets, props) {
        if (props === void 0) { props = {}; }
        var divID = "widget" + ++g_divID;
        var div = document.createElement("div");
        div.id = divID;
        div.style.height = (props.height || 240) + "px";
        delete props.height;
        for (var key in props) {
            for (var _i = 0, widgets_1 = widgets; _i < widgets_1.length; _i++) {
                var w = widgets_1[_i];
                if (typeof w[key] === "function") {
                    w[key](props[key]);
                    break;
                }
            }
        }
        div.notify = function (_) {
            this.value = _;
            this.dispatchEvent(new CustomEvent("input"));
        };
        div.widget = widgets[0];
        div.value = null;
        return div;
    }
    exports._div = _div;
    function div(widget, props) {
        if (props === void 0) { props = {}; }
        var widgets = !Array.isArray(widget) ? [widget] : widget;
        var div = _div(widgets, props);
        div.data = function (json, fields) {
            if (fields === void 0) { fields = []; }
            var _a = json2ColData(json, fields), columns = _a.columns, data = _a.data;
            widgets[0]
                .columns(columns)
                .data(data)
                .lazyRender();
            return div;
        };
        return div;
    }
    exports.div = div;
    function editorDiv(widget, props) {
        if (props === void 0) { props = {}; }
        var widgets = !Array.isArray(widget) ? [widget] : widget;
        var div = _div(widgets, props);
        div.text = function (text) {
            widgets[0]
                .text(text)
                .lazyRender();
            return div;
        };
        return div;
    }
    exports.editorDiv = editorDiv;
    function row2arrXXX(row, fields) {
        var retVal = [];
        fields.forEach(function (f, i) { return retVal.push(i > 0 ? parseInt(row[f]) : row[f]); });
        return retVal;
    }
    exports.row2arrXXX = row2arrXXX;
    function row2arr(row, fields) {
        var retVal = [];
        fields.forEach(function (f, i) { return retVal.push(row[f]); });
        return retVal;
    }
    exports.row2arr = row2arr;
    function json2ColData(data, columns) {
        if (columns === void 0) { columns = []; }
        if (data.length === 0 && columns.length === 0) {
            return {
                columns: [],
                data: []
            };
        }
        if (columns.length === 0) {
            columns = Object.keys(data[0]);
        }
        return {
            columns: columns,
            data: data.map(function (row) { return __spreadArrays(row2arr(row, columns), [row]); })
        };
    }
    exports.json2ColData = json2ColData;
});
//# sourceMappingURL=util.js.map