(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.Entity = factory();
    }
}(this, function () {
    function ESPUrl() {
    };

    ESPUrl.prototype.url = function (_) {
        if (!arguments.length) return this._url;
        this._url = _;
        var parser = document.createElement('a');
        parser.href = this._url;

        var params = {};
        if (parser.search.length) {
            var tmp = parser.search;
            if (tmp[0] === "?") {
                tmp = tmp.substring(1);
            }
            tmp = tmp.split("&");
            tmp.map(function (item) {
                var tmpItem = item.split("=");
                params[tmpItem[0]] = tmpItem[1];
            });
        }
        this._protocol = parser.protocol;
        this._hostname = parser.hostname;
        this._port = parser.port;
        this._pathname = parser.pathname;
        while (this._pathname.length && this._pathname[0] === "/") {
            this._pathname = this._pathname.substring(1);
        }
        this._search = parser.search;
        this._params = params;
        this._hash = parser.hash;
        this._host = parser.host;

        return this;
    };

    ESPUrl.prototype.isWsWorkunits = function () {
        return this._pathname.toLowerCase().indexOf("wsworkunits") >= 0;
    };

    ESPUrl.prototype.isWorkunitResult = function () {
        return this.isWsWorkunits() && this._params["Wuid"] && (this._params["Sequence"] || this._params["ResultName"]);
    };

    ESPUrl.prototype.getUrl = function (overrides) {
        return (overrides.protocol ? overrides.protocol : this._protocol) + "//" +
                (overrides.hostname ? overrides.hostname : this._hostname) + ":" +
                (overrides.port ? overrides.port : this._port) + "/" +
                (overrides.pathname ? overrides.pathname : this._pathname);
    };

    function Comms() {
        this._url = "";
        this._ssl = false;
        this._ip = "localhost";
        this._port = "";
        this._proxyMappings = {};
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
        for (var key in this._proxyMappings) {
            var newUrlParts = url.split(key);
            var newUrl = newUrlParts[0];
            if(newUrlParts.length > 1) {
                var espUrl = new ESPUrl()
                    .url(url)
                ;
                url = newUrl + this._proxyMappings[key];
                request.IP = espUrl._hostname;
                request.PORT = espUrl._port;
                if (newUrlParts.length > 0) {
                    request.PATH = newUrlParts[1];
                }
                break;
            }
        }
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

    Comms.prototype.ddlUrl = function (_) {
        if (!arguments.length) return this._ddlUrl;
        this._ddlUrl = _;
        return this;
    };

    Comms.prototype.url = function (_) {
        if (!arguments.length) return this._url;
        this._url = _;
        this.ddlUrl(new ESPUrl().url(_));
        return this;
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

    Comms.prototype.proxyMappings = function (_) {
        if (!arguments.length) return this._proxyMappings;
        this._proxyMappings = _;
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
        var url = this._url ? this._url : "http" + (this._ssl ? "s" : "") + "://" + this._ip + ":" + this._port + "/WsEcl/submit/query/" + this._target + "/" + this._query + "/json";
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
        var url = "";
        //  TODO witch to use ESPUrl  ---
        if (this._url) {
            var urlParts = this._url.split("?");
            url = urlParts[0];
            try {
                var params = urlParts[1].split("&");
                var context = this;
                params.forEach(function (item) {
                    var parts = item.split("=");
                    switch (parts[0]) {
                        case "Wuid":
                            context.wuid(parts[1]);
                            break;
                        case "ResultName":
                            context.resultName(parts[1]);
                            break;
                    }
                });
            } catch (e) {
            }
        } else {
            url = this._url ? this._url : "http" + (this._ssl ? "s" : "") + "://" + this._ip + ":" + this._port + "/WsWorkunits/WUResult.json";
        }
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

    //  HIPIERoxie  ---
    function HIPIERoxie() {
        Comms.call(this);
    };
    HIPIERoxie.prototype = Object.create(Comms.prototype);

    HIPIERoxie.prototype.fetchResults = function (request, callback) {
        var url = this._ddlUrl.getUrl({ });
        this._resultNameCache = {};
        this._resultNameCacheCount = 0;
        var context = this;
        this.jsonp(url, request, function (response) {
            // Remove "xxxResponse.Result"
            for (var key in response) {
                response = response[key].Results;
                break;
            }
            // Remove "response.result.Row"
            for (var key in response) {
                context._resultNameCache[key] = response[key].Row;
                ++context._resultNameCacheCount;
            }
            callback(context._resultNameCache);
        });
    };

    HIPIERoxie.prototype.fetchResult = function (name, callback) {
        callback(this._resultNameCache[name]);
    };

    HIPIERoxie.prototype.call = function (request, callback) {
        var context = this;
        this.fetchResults(request, callback);
    };

    //  HIPIEWorkunit  ---
    function HIPIEWorkunit() {
        Comms.call(this);

        this._hipieResults = {};
    };
    HIPIEWorkunit.prototype = Object.create(Comms.prototype);

    HIPIEWorkunit.prototype.hipieResults = function (_) {
        if (!arguments.length) return this._hipieResults;
        this._hipieResultsLength = 0;
        this._hipieResults = {};
        var context = this;
        _.forEach(function (item) {
            context._hipieResultsLength++;
            context._hipieResults[item.id] = item;
        });
        return this;
    };

    HIPIEWorkunit.prototype.fetchResults = function (callback) {
        var url = this._ddlUrl.getUrl({
            pathname: "WsWorkunits/WUInfo.json",
        });
        var request = {
            Wuid: this._ddlUrl._params["Wuid"],
            TruncateEclTo64k: true,
            IncludeExceptions: false,
            IncludeGraphs: false,
            IncludeSourceFiles: false,
            IncludeResults: true,
            IncludeResultsViewNames: false,
            IncludeVariables: false,
            IncludeTimers: false,
            IncludeResourceURLs: false,
            IncludeDebugValues: false,
            IncludeApplicationValues: false,
            IncludeWorkflows: false,
            IncludeXmlSchemas: false,
            SuppressResultSchemas: true
        }

        this._resultNameCache = {};
        this._resultNameCacheCount = 0;
        var context = this;
        this.jsonp(url, request, function (response) {
            if (exists("WUInfoResponse.Workunit.Results.ECLResult", response)) {
                response.WUInfoResponse.Workunit.Results.ECLResult.map(function (item) {
                    context._resultNameCache[item.Name] = [];
                    ++context._resultNameCacheCount;
                });
                var toFetch = context._hipieResultsLength;
                if (toFetch > 0) {
                    for (var key in context._hipieResults) {
                        var item = context._hipieResults[key];
                        context.fetchResult(item.from, function (response) {
                            if (--toFetch <= 0) {
                                callback(context._resultNameCache);
                            }
                        });
                    };
                } else {
                    callback(context._resultNameCache);
                }
            }
        });
    };

    HIPIEWorkunit.prototype.fetchResult = function (name, callback) {
        var url = this._ddlUrl.getUrl({
            pathname: "WsWorkunits/WUResult.json",
        });
        var request = {
            Wuid: this._ddlUrl._params["Wuid"],
            ResultName: name,
            SuppressXmlSchema: true,
            Start: 0,
            Count: 99999
        };
        this._resultNameCache[name].data = [];
        var context = this;
        this.jsonp(url, request, function (response) {
            // Remove "xxxResponse.Result"
            for (var key in response) {
                if (!response[key].Result) {
                    throw "No result found.";
                }
                context._total = response[key].Total;
                response = response[key].Result;
                for (var key in response) {
                    response = response[key].Row;
                    break;
                }
                break;
            }
            context._resultNameCache[name] = response;
            context._resultNameCache[name + "_changed"] = [{}];
            context._resultNameCache[name + "_changed"][0][name + "_changed"] = true;
            callback(response);
        });
    };

    HIPIEWorkunit.prototype.call = function (request, callback) {
        var context = this;
        if (request.refresh || !this._resultNameCache) {
            this.fetchResults(callback);
        } else {
            var changedFilter = {};
            for (var key in request) {
                if (request[key] && request[key + "_changed"]) {
                    changedFilter[key] = request[key];
                }
            }
            var retVal = {};
            for (var key in this._hipieResults) {
                var item = this._hipieResults[key];
                var matchedResult = true;
                for (var key2 in changedFilter) {
                    if (item.filter.indexOf(key2) < 0) {
                        matchedResult = false;
                        break;
                    }
                }
                if (matchedResult) {
                    retVal[item.from] = this._resultNameCache[item.from].filter(function (row) {
                        for (var key2 in changedFilter) {
                            if (row[key2] !== changedFilter[key2]) {
                                return false;
                            }
                        }
                        return true;
                    });
                    retVal[item.from + "_changed"] = [{}];
                    retVal[item.from + "_changed"][0][item.from + "_changed"] = true;
                }
            }
            callback(retVal);
        }
    };

    return {
        ESPUrl: ESPUrl,
        WsECL: WsECL,
        WsWorkunits: WsWorkunits,
        HIPIERoxie: HIPIERoxie,
        HIPIEWorkunit: HIPIEWorkunit
};
}));
