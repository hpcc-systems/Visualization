(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.Entity = factory();
    }
}(this, function () {
    function Comms() {
        this._ssl = false;
        this._ip = "localhost";
        this._port = "";
        this._mappings = {};
    };

    exists = function (prop, scope) {
        var propParts = prop.split(".");
        var testScope = scope;
        for (var i = 0; i < propParts.length; ++i) {
            var item = propParts[i];
            if (testScope[item] === undefined) {
                return false;
            }
            testScope = testScope[item];
        }
        return true;
    };

    serialize = function (obj) {
        var str = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
            }
        }
        return str.join("&");
    };

    Comms.prototype.jsonp = function (url, request, callback) {
        var context = this;
        var callbackName = 'jsonp_callback_' + Math.round(Math.random() * 999999);
        window[callbackName] = function (response) {
            delete window[callbackName];
            document.body.removeChild(script);
            callback(response);
        };

        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'jsonp=' + callbackName + "&" + serialize(request);
        document.body.appendChild(script);
    };

    Comms.prototype.ssl = function (_) {
        if (!arguments.length) return this._ssl;
        this._ssl = _;
        return this;
    };

    Comms.prototype.ip = function (_) {
        if (!arguments.length) return this._ip;
        this._ip = _;
        return this;
    };

    Comms.prototype.port = function (_) {
        if (!arguments.length) return this._port;
        this._port = _;
        return this;
    };

    Comms.prototype.mappings = function (_) {
        if (!arguments.length) return this._mappings;
        this._mappings = _;
        return this;
    };

    Comms.prototype.mapData = function (data) {
        for (var key in data) {
            var mapping = this._mappings[key];
            if (mapping) {
                data[key] = data[key].map(function (item) {
                    var row = {};
                    for (var field in item) {
                        var mappedField = mapping[field];
                        row[mappedField ? mappedField : field] = item[field];
                    }
                    return row;
                });
            }
            data[key] = data[key];
        }
    };

    function WsECL() {
        Comms.call(this);

        this._port = "8002";
        this._target = "";
        this._query = "";
    };
    WsECL.prototype = Object.create(Comms.prototype);

    WsECL.prototype.target = function (_) {
        if (!arguments.length) return this._target;
        this._target = _;
        return this;
    };

    WsECL.prototype.query = function (_) {
        if (!arguments.length) return this._query;
        this._query = _;
        return this;
    };

    WsECL.prototype.call = function (request, callback) {
        // http://10.239.190.106:8002/WsEcl/submit/query/myroxie_dataland/fetched_ins002_stats/json
        var context = this;
        var url = "http" + (this._ssl ? "s" : "") + "://" + this._ip + ":" + this._port + "/WsEcl/submit/query/" + this._target + "/" + this._query + "/json";
        this.jsonp(url, request, function (response) {
            // Remove "xxxResponse.Result"
            for (var key in response) {
                response = response[key].Results;
                break;
            }
            // Remove "response.result.Row"
            for (var key in response) {
                response[key] = response[key].Row;
            }
            context.mapData(response);
            callback(response);
        });
    };

    function WsWorkunits() {
        Comms.call(this);

        this._port = "8010";
        this._wuid = "";
        this._sequence = null;
        this._resultName = null;
    };
    WsWorkunits.prototype = Object.create(Comms.prototype);

    WsWorkunits.prototype.wuid = function (_) {
        if (!arguments.length) return this._wuid;
        this._wuid = _;
        return this;
    };

    WsWorkunits.prototype.sequence = function (_) {
        if (!arguments.length) return this._sequence;
        this._sequence = _;
        return this;
    };

    WsWorkunits.prototype.resultName = function (_) {
        if (!arguments.length) return this._resultName;
        this._resultName = _;
        return this;
    };

    WsWorkunits.prototype.call = function (start, count, callback) {
        var context = this;
        var url = "http" + (this._ssl ? "s" : "") + "://" + this._ip + ":" + this._port + "/WsWorkunits/WUResult.json";
        var request = {
            Start: start,
            Count: count,
            Wuid: this._wuid,
            SuppressXmlSchema: true
        };
        if (this._sequence !== null) {
            request.Sequence = this._sequence;
        } else if (this._resultName !== null) {
            request.ResultName = this._resultName;
        }
        this.jsonp(url, request, function (response) {
            // Remove "xxxResponse.Result"
            for (var key in response) {
                if (!response[key].Result) {
                    throw "No result found.";
                }
                context._total = response[key].Total;
                response = response[key].Result;
                if (context._sequence !== null) {
                    if (!response.Row) {
                        throw "No Row found.";
                    }
                    response = response.Row; 
                } else if (this._resultName !== null) {
                    for (var key in response) {
                        response = response[key].Row;
                        break;
                    }
                }
                break;
            }
            callback(response);
        });
    };

    return {
        WsECL: WsECL,
        WsWorkunits: WsWorkunits
};
}));
