var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
        define(["require", "exports", "@hpcc-js/comms", "@hpcc-js/marshaller", "@hpcc-js/other", "@hpcc-js/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var comms_1 = require("@hpcc-js/comms");
    var marshaller_1 = require("@hpcc-js/marshaller");
    var other_1 = require("@hpcc-js/other");
    var util_1 = require("@hpcc-js/util");
    var logger = util_1.scopedLogger("index.ts");
    var App = /** @class */ (function () {
        function App(placeholder) {
            this._dashy = new marshaller_1.Dashy();
            this._dashy
                .target(placeholder)
                .render();
            this.parseUrl();
        }
        App.prototype.parseUrl = function () {
            var _this = this;
            var _url = new other_1.Comms.ESPUrl().url(document.URL);
            if (_url.param("Wuid")) {
                logger.debug("WU Params:  " + _url.params());
                var baseUrl_1 = _url.param("Protocol") + "://" + _url.param("Hostname") + ":" + _url.param("Port");
                logger.debug(baseUrl_1);
                var result = new comms_1.Result({ baseUrl: baseUrl_1 }, _url.param("Wuid"), _url.param("ResultName"));
                result.fetchRows().then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                    var ddlStr, ddl;
                    return __generator(this, function (_a) {
                        ddlStr = response[0][_url.param("ResultName")];
                        ddl = JSON.parse(ddlStr);
                        this._dashy.importDDL(ddl, baseUrl_1, _url.param("Wuid"));
                        return [2 /*return*/];
                    });
                }); });
            }
            else if (_url.param("QueryID")) {
                // http://10.241.100.159:8002/WsEcl/submit/query/roxie/prichajx_govottocustomerstats.ins109_service_1/json
                // ?Protocol=http&Hostname=10.241.100.159&Port=8002&QuerySet=roxie&QueryID=prichajx_govottocustomerstats.ins109_service_1
                logger.debug("Roxie Params:  " + JSON.stringify(_url.params()));
                var baseUrl_2 = (_url.param("Protocol") || "http") + "://" + _url.param("Hostname") + ":" + _url.param("Port");
                var action = "WsEcl/submit/query/" + _url.param("QuerySet") + "/" + _url.param("QueryID") + "/json";
                var responseID_1 = _url.param("QueryID") + "Response";
                logger.debug(action);
                var connection = new comms_1.Connection({ baseUrl: baseUrl_2 });
                connection.send(action, {}).then(function (response) {
                    if (util_1.exists("Results.HIPIE_DDL.Row", response[responseID_1]) && response[responseID_1].Results.HIPIE_DDL.Row.length) {
                        var ddl = JSON.parse(response[responseID_1].Results.HIPIE_DDL.Row[0].HIPIE_DDL);
                        _this._dashy.importDDL(ddl, baseUrl_2, _url.param("Wuid"));
                    }
                });
            }
            else {
            }
        };
        App.prototype.doResize = function (width, height) {
            this._dashy
                .resize({ width: width, height: height })
                .lazyRender();
        };
        return App;
    }());
    exports.App = App;
    window.addEventListener("resize", doResize);
    function doResize() {
        var myWidth;
        var myHeight;
        if (typeof (window.innerWidth) === "number") {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        }
        else {
            if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
            }
            else {
                if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                    myWidth = document.body.clientWidth;
                    myHeight = document.body.clientHeight;
                }
            }
        }
        if (app && myWidth && myHeight) {
            app.doResize(myWidth - 16, myHeight - 16);
        }
    }
    var app;
    function load(target) {
        app = new App(target);
        doResize();
    }
    exports.load = load;
});
//# sourceMappingURL=index.js.map