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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpcc-js/comms", "@hpcc-js/eclwatch", "./util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hpccComms = require("@hpcc-js/comms");
    var hpccEclwatch = require("@hpcc-js/eclwatch");
    var util_1 = require("./util");
    function esp(url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        url: url,
                        wu: function (wuid) { return wu(hpccComms.Workunit.attach({ baseUrl: url }, wuid)); },
                        submit: function (ecl, target) {
                            if (target === void 0) { target = "hthor"; }
                            return __asyncGenerator(this, arguments, function submit_1() {
                                var wu_1, results, rows;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!ecl) return [3 /*break*/, 15];
                                            return [4 /*yield*/, __await([{ Workunit: "Submitting..." }])];
                                        case 1: return [4 /*yield*/, _a.sent()];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, __await(hpccComms.Workunit.submit({ baseUrl: url }, target, ecl))];
                                        case 3:
                                            wu_1 = _a.sent();
                                            return [4 /*yield*/, __await([{ Workunit: "Waiting for completion..." }])];
                                        case 4: return [4 /*yield*/, _a.sent()];
                                        case 5:
                                            _a.sent();
                                            return [4 /*yield*/, __await(wu_1.watchUntilComplete())];
                                        case 6:
                                            _a.sent();
                                            return [4 /*yield*/, __await([{ Workunit: "Fetching Results..." }])];
                                        case 7: return [4 /*yield*/, _a.sent()];
                                        case 8:
                                            _a.sent();
                                            return [4 /*yield*/, __await(wu_1.fetchResults())];
                                        case 9:
                                            results = _a.sent();
                                            return [4 /*yield*/, __await(results)];
                                        case 10:
                                            rows = (_a.sent()) && results.length ? results[0].fetchRows() : [];
                                            return [4 /*yield*/, __await([{ Workunit: "Cleaning up..." }])];
                                        case 11: return [4 /*yield*/, _a.sent()];
                                        case 12:
                                            _a.sent();
                                            wu_1.delete();
                                            return [4 /*yield*/, __await(rows)];
                                        case 13: return [4 /*yield*/, _a.sent()];
                                        case 14:
                                            _a.sent();
                                            return [3 /*break*/, 18];
                                        case 15: return [4 /*yield*/, __await([])];
                                        case 16: return [4 /*yield*/, _a.sent()];
                                        case 17:
                                            _a.sent();
                                            _a.label = 18;
                                        case 18: return [2 /*return*/];
                                    }
                                });
                            });
                        }
                    }];
            });
        });
    }
    exports.esp = esp;
    function wu(wu) {
        var _this = this;
        return {
            wuid: wu.Wuid,
            results: function () { return __awaiter(_this, void 0, void 0, function () {
                var results, retVal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, wu.fetchResults()];
                        case 1:
                            results = _a.sent();
                            retVal = results.map(result);
                            retVal.forEach(function (r) {
                                retVal[r.name] = r;
                            });
                            return [2 /*return*/, retVal];
                    }
                });
            }); }
        };
    }
    function result(r) {
        return {
            name: r.Name,
            data: function (from, count) {
                return r.fetchRows(from, count);
            },
            table: function (props) {
                if (props === void 0) { props = {}; }
                return __asyncGenerator(this, arguments, function table_1() {
                    var wuResult, _div;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                wuResult = new hpccEclwatch.WUResult()
                                    .baseUrl(r.BaseUrl)
                                    .wuid(r.Wuid)
                                    .resultName(r.Name)
                                    .on("click", function (row, col, sel) {
                                    _div.notify(sel ? row && row.__lparam ? row && row.__lparam : row : null);
                                });
                                _div = util_1.div(wuResult, props);
                                return [4 /*yield*/, __await(_div)];
                            case 1: return [4 /*yield*/, _a.sent()];
                            case 2:
                                _a.sent();
                                _div.widget
                                    .target(_div)
                                    .lazyRender();
                                return [2 /*return*/];
                        }
                    });
                });
            }
        };
    }
});
//# sourceMappingURL=esp.js.map