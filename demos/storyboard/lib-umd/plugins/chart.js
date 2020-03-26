var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpcc-js/chart", "@hpcc-js/common", "@hpcc-js/layout", "./util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hpccChart = require("@hpcc-js/chart");
    var commonMod = require("@hpcc-js/common");
    var hpccLayout = require("@hpcc-js/layout");
    var util_1 = require("./util");
    var Charts = {
        area: "Area",
        bar: "Bar",
        bubble: "Bubble",
        bubbleXY: "BubbleXY",
        bullet: "Bullet",
        column: "Column",
        contour: "Contour",
        gantt: "Gantt",
        gauge: "Gauge",
        halfPie: "HalfPie",
        hexBin: "HexBin",
        line: "Line",
        pie: "Pie",
        quarterPie: "QuarterPie",
        quartileCandlestick: "QuartileCandlestick",
        radar: "Radar",
        radialBar: "RadialBar",
        scatter: "Scatter",
        statChart: "StatChart",
        step: "Step",
        wordCloud: "WordCloud"
    };
    function chartFactory(type) {
        return function (props) {
            var chart, cp, _div;
            if (props === void 0) { props = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chart = new hpccChart[type]();
                        cp = new hpccLayout.ChartPanel()
                            .widget(chart)
                            .on("click", function (row, col, sel) {
                            _div.notify(sel ? {
                                col: col,
                                row: row.__lparam || row
                            } : null);
                        });
                        _div = util_1.div([cp, chart], props);
                        return [4 /*yield*/, _div];
                    case 1:
                        _a.sent();
                        _div.widget
                            .target(_div)
                            .lazyRender();
                        return [2 /*return*/];
                }
            });
        };
    }
    var palID = 0;
    exports.chart = {
        createOrdinalPalette: function (items) {
            return __awaiter(this, void 0, void 0, function () {
                var id, fields, colors, pal;
                return __generator(this, function (_a) {
                    id = "pal_" + ++palID;
                    fields = Object.keys(items);
                    colors = fields.map(function (f) { return items[f]; });
                    pal = commonMod.Palette.ordinal(id, colors);
                    fields.map(pal);
                    return [2 /*return*/, id];
                });
            });
        }
    };
    for (var key in Charts) {
        exports.chart[key] = chartFactory(Charts[key]);
    }
});
//# sourceMappingURL=chart.js.map