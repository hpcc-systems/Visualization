(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.Entity = factory();
    }
}(this, function () {
    function ESPUrl() {
        this._protocol = "http:";
        this._hostname = "localhost";
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

    ESPUrl.prototype.protocol = function (_) {
        if (!arguments.length) return this._protocol;
        this._protocol = _;
        return this;
    };
    
    ESPUrl.prototype.hostname = function (_) {
        if (!arguments.length) return this._hostname;
        this._hostname = _;
        return this;
    };
    
    ESPUrl.prototype.port = function (_) {
        if (!arguments.length) return this._port;
        this._port = _;
        return this;
    };
    
    ESPUrl.prototype.pathname = function (_) {
        if (!arguments.length) return this._pathname;
        this._pathname = _;
        return this;
    };
    
    ESPUrl.prototype.isWsWorkunits = function () {
        return this._pathname.toLowerCase().indexOf("wsworkunits") >= 0 || this._params["Wuid"];
    };

    ESPUrl.prototype.isWorkunitResult = function () {
        return this.isWsWorkunits() && (this._params["Sequence"] || this._params["ResultName"]);
    };

    ESPUrl.prototype.isWsEcl = function () {
        return this._pathname.toLowerCase().indexOf("wsecl") >= 0 || (this._params["QuerySetId"] && this._params["Id"]);
    };

    ESPUrl.prototype.getUrl = function (overrides) {
        overrides = overrides || {};
        return (overrides.protocol ? overrides.protocol : this._protocol) + "//" +
                (overrides.hostname ? overrides.hostname : this._hostname) + ":" +
                (overrides.port ? overrides.port : this._port) + "/" +
                (overrides.pathname ? overrides.pathname : this._pathname);
    };

    function ESPMappings(mappings) {
        this._mappings = mappings;
        this._reverseMappings = {};
        for (var resultName in this._mappings) {
            this._reverseMappings[resultName] = {};
            for (var key in this._mappings[resultName]) {
                this._reverseMappings[resultName][this._mappings[resultName][key]] = key;
            }
        }
    };

    ESPMappings.prototype.contains = function (resultName, origField) {
        return exists(resultName + "." + origField, this._mappings);
    };

    ESPMappings.prototype.mapResult = function (response, resultName) {
        var mapping = this._mappings[resultName];
        if (mapping) {
            response[resultName] = response[resultName].map(function (item) {
                var row = {};
                if (mapping.x && mapping.x instanceof Array) {
                    //  LINE Mapping  ---
                    row = [];
                    for (var i = 0; i < mapping.x.length; ++i) {
                        row.push({
                            label: item[mapping.x[i]],
                            weight: item[mapping.y[i]]
                        })
                    }
                } else {
                    //  Regular Mapping  ---
                    for (var key in mapping) {
                        row[mapping[key]] = item[key];
                    }
                }
                return row;
            }, this);
        }
    };

    ESPMappings.prototype.mapResponse = function (response) {
        for (var key in response) {
            this.mapResult(response, key);
        }
    };

    function Comms() {
        ESPUrl.call(this);
        this._proxyMappings = {};
        this._mappings = new ESPMappings({});
    };
    Comms.prototype = Object.create(ESPUrl.prototype);

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

    Comms.prototype.mappings = function (_) {
        if (!arguments.length) return this._mappings;
        this._mappings = new ESPMappings(_);
        return this;
    };

    Comms.prototype.proxyMappings = function (_) {
        if (!arguments.length) return this._proxyMappings;
        this._proxyMappings = _;
        return this;
    };

    function WsECL() {
        Comms.call(this);

        this._port = "8002";
        this._target = "";
        this._query = "";
    };
    WsECL.prototype = Object.create(Comms.prototype);

    WsECL.prototype.url = function (_) {
        var retVal = Comms.prototype.url.apply(this, arguments);
        if (arguments.length) {
            //  http://192.168.1.201:8010/esp/files/stub.htm?QuerySetId=roxie&Id=stock.3&Widget=QuerySetDetailsWidget
            this._port = this._port === "8010" ? "8002" : this._port;  //  Need a better way  ---
            for (var key in this._params) {
                switch (key) {
                    case "QuerySetId":
                        this.target(this._params[key]);
                        break;
                    case "Id":
                        this.query(this._params[key]);
                        break;
                }
            }

            if (!this._target && !this._query) {
                // http://192.168.1.201:8002/WsEcl/res/query/hthor/quicktest/res/index.html
                var pathParts = this._pathname.split("/res/");
                if (pathParts.length >= 2) {
                    var queryParts = pathParts[1].split("/");
                    if (queryParts.length >= 3) {
                        this.target(queryParts[1]);
                        this.query(queryParts[2]);
                    }
                }
            }
        }
        return retVal;
    };

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

    WsECL.prototype.constructUrl = function () {
        return Comms.prototype.getUrl.call(this, {
            pathname: "WsEcl/submit/query/" + this._target + "/" + this._query + "/json"
        });
    };

    WsECL.prototype.call = function (target, request, callback) {
        target = target || {};
        target.target = target.target || this._target;
        target.query = target.query || this._query;
        var context = this;
        var url = this.getUrl({
            pathname: "WsEcl/submit/query/" + target.target + "/" + target.query + "/json"
        });
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
            context._mappings.mapResponse(response);
            callback(response);
        });
    };

    WsECL.prototype.send = function (request, callback) {
        this.call({target: this._target, query: this._query}, request, callback);
    };

    function WsWorkunits() {
        Comms.call(this);

        this._port = "8010";
        this._wuid = "";
        this._jobname = "";
        this._sequence = null;
        this._resultName = null;

        this._resultNameCache = {};
        this._resultNameCacheCount = 0;
    };
    WsWorkunits.prototype = Object.create(Comms.prototype);

    WsWorkunits.prototype.url = function (_) {
        var retVal = Comms.prototype.url.apply(this, arguments);
        if (arguments.length) {
            //  http:x.x.x.x:8010/WsWorkunit/WuResult?Wuid=xxx&ResultName=yyy
            for (var key in this._params) {
                switch (key) {
                    case "Wuid":
                        this.wuid(this._params[key]);
                        break;
                    case "ResultName":
                        this.resultName(this._params[key]);
                        break;
                    case "Sequence":
                        this.sequence(this._params[key]);
                        break;
                }
            }
            if (!this._wuid) {
                //  http://192.168.1.201:8010/WsWorkunits/res/W20140922-213329/c:/temp/index.html
                var urlParts = this._url.split("/res/");
                if (urlParts.length >= 2) {
                    var urlParts2 = urlParts[1].split("/");
                    this.wuid(urlParts2[0]);
                }
            }
        }
        return retVal;
    };

    WsWorkunits.prototype.wuid = function (_) {
        if (!arguments.length) return this._wuid;
        this._wuid = _;
        return this;
    };

    WsWorkunits.prototype.jobname = function (_) {
        if (!arguments.length) return this._jobname;
        this._jobname = _;
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

    WsWorkunits.prototype.appendParam = function (label, value, params) {
        if (value) {
            if (params) {
                params += "&"
            }
            return params + label + "=" + value;
        }
        return params;
    };

    WsWorkunits.prototype.constructUrl = function () {
        var url = Comms.prototype.getUrl.call(this, {
            pathname: "WsWorkunits/res/" + this._wuid + "/"
        });
        var params = "";
        params = this.appendParam("ResultName", this._resultName, params);
        return url + (params ? "?" + params : "");
    };

    WsWorkunits.prototype._fetchResult = function (target, callback, skipMapping) {
        target = target || {};
        target._start = target._start || 0;
        target._count = target._count || -1;
        var url = this.getUrl({
            pathname: "WsWorkunits/WUResult.json"
        });
        var request = {
            Wuid: target.wuid,
            ResultName: target.resultname,
            SuppressXmlSchema: true,
            Start: target._start,
            Count: target._count
        };
        this._resultNameCache[target.resultname] = {};
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
            context._resultNameCache[target.resultname] = response;
            if (!skipMapping) {
                context._mappings.mapResult(context._resultNameCache, target.resultname);            
            }
            callback(context._resultNameCache[target.resultname]);
        });
    };

    WsWorkunits.prototype.fetchResult = function (target, callback, skipMapping) {
        if (target.wuid) {
            this._fetchResult(target, callback, skipMapping);        
        } else if (target.jobname) {
            var context = this;
            this.WUQuery(target, function(response) {
                target.wuid = response[0].Wuid;
                context._fetchResult(target, callback, skipMapping);        
            });
        }
    },
    
    WsWorkunits.prototype.WUQuery = function (request, callback) {
        var url = this.getUrl({
            pathname: "WsWorkunits/WUQuery.json",
        });
        var request = {
            Jobname: request.jobname,
            Count: 1
        }

        this._resultNameCache = {};
        this._resultNameCacheCount = 0;
        var context = this;
        this.jsonp(url, request, function (response) {
            if (!exists("WUQueryResponse.Workunits.ECLWorkunit", response)) {
                throw "No workunit found.";
            }
            response = response.WUQueryResponse.Workunits.ECLWorkunit;
            callback(response);
        });
    };

    WsWorkunits.prototype.fetchResultNames = function (callback) {
        var url = this.getUrl({
            pathname: "WsWorkunits/WUInfo.json",
        });
        var request = {
            Wuid: this._wuid,
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
                callback(context._resultNameCache);
            }
        });
    };

    WsWorkunits.prototype.fetchResults = function (callback, skipMapping) {
        var context = this;
        this.fetchResultNames(function (response) {
            var toFetch = context._resultNameCacheCount;
            if (toFetch > 0) {
                for (var key in context._resultNameCache) {
                    var item = context._resultNameCache[key];
                    context.fetchResult(key, function (response) {
                        if (--toFetch <= 0) {
                            callback(context._resultNameCache);
                        }
                    }, skipMapping);
                };
            } else {
                callback(context._resultNameCache);
            }
        });
    };

    WsWorkunits.prototype.postFilter = function (request, response) {
        var retVal = {};
        for (var key in response) {
            retVal[key] = response[key].filter(function (row, idx) {
                for (var request_key in request) {
                    if (row[request_key] !== undefined && request[request_key] !== undefined && row[request_key] !== request[request_key]) {
                        return false;
                    }
                }
                return true;
            });
        }
        this._mappings.mapResponse(retVal);
        return retVal;
    };

    WsWorkunits.prototype.send = function (request, callback) {
        var context = this;
        if (!this._resultNameCacheCount) {
            this.fetchResults(function (response) {
                callback(context.postFilter(request, response));
            }, true);
        } else {
            callback(context.postFilter(request, this._resultNameCache));
        }
    };

    //  HIPIERoxie  ---
    function HIPIERoxie() {
        Comms.call(this);
    };
    HIPIERoxie.prototype = Object.create(Comms.prototype);

    HIPIERoxie.prototype.fetchResults = function (request, callback) {
        var url = this.getUrl({});
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
        WsWorkunits.call(this);

        this._hipieResults = {};
    };
    HIPIEWorkunit.prototype = Object.create(WsWorkunits.prototype);

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
        var context = this;
        return WsWorkunits.prototype.fetchResultNames.call(this, function (response) {
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
        });
    };

    HIPIEWorkunit.prototype.fetchResult = function (name, callback) {
        var context = this;
        return WsWorkunits.prototype.fetchResult.call(this, { wuid: this._wuid, resultname: name }, function (response) {
            callback(response);
        });
    };

    HIPIEWorkunit.prototype.call = function (request, callback) {
        var context = this;
        if (request.refresh || !this._resultNameCache || !this._resultNameCacheCount) {
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
                }
            }
            callback(retVal);
        }
    };

    return {
        ESPMappings: ESPMappings,
        ESPUrl: ESPUrl,
        WsECL: WsECL,
        WsWorkunits: WsWorkunits,
        HIPIERoxie: HIPIERoxie,
        HIPIEWorkunit: HIPIEWorkunit,
        createESPConnection: function (url) {
            url = url || document.URL;
            var testURL = new ESPUrl()
                .url(url)
            ;
            if (testURL.isWsWorkunits()) {
                return new WsWorkunits()
                    .url(url)
                ;
            }
            if (testURL.isWsEcl()) {
                return new WsECL()
                   .url(url)
                ;
            }
            return null;
        }
    };
}));
