
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Audio.js',["d3", "../common/HTMLWidget"], factory);
    } else {
        root.other_Audio = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Audio() {
        HTMLWidget.call(this);

        this._tag = "audio";

        this._sections = {};
    }
    Audio.prototype = Object.create(HTMLWidget.prototype);
    Audio.prototype.constructor = Audio;
    Audio.prototype._class += " other_Audio";

    Audio.prototype.publish("source", "", "string", "Audio Source");

    Audio.prototype.section = function (label, offset, beatLength, beatCount) {
        if (!arguments.length) return this._sections;
        if (arguments.length === 1) return this._sections[label];
        this._sections[label] = {
            label: label,
            offset: offset,
            beatLength: beatLength,
            beatCount: beatCount,
            endOffset: offset + beatCount * beatLength
        };
        return this;
    };

    Audio.prototype.getType = function (fileExt) {
        switch(fileExt) {
            case "mp3":
                return "audio/mpeg; codecs='mp3'";
            case "ogg":
                return "audio/ogg; codecs='vorbis'";
        }
        return "";
    };


    Audio.prototype.enter = function (domNode, element) {
        var context = this;
        element.on("play", function (d) { context.onPlay(d); });
    };

    Audio.prototype.update = function (domNode, element) {
        var source = element.selectAll("source").data(this.source(), function (d) { return d; });
        source.enter().append("source")
            .attr("src", function (d) { return d; })
        ;
    };

    Audio.prototype.createTimer = function (params, startTime, beat) {
        var context = this;
        d3.timer(function () {
            context.onTick(params.label, beat, params);
            return true;
        }, beat * params.beatLength, startTime + params.offset);
    };

    Audio.prototype.onTick = function (label, beat, params) {
    };

    Audio.prototype.onPlay = function (d) {
        var startTime = Date.now();
        for (var key in this._sections) {
            var section = this._sections[key];
            for (var i = 0; i < section.beatCount; ++i) {
                this.createTimer(section, startTime, i);
            }
        }
    };

    Audio.prototype.play = function (d) {
        var context = this;
        this._element.on("canplaythrough", function (d) {
            context.node().play();
        });
        this.node().load();
    };

    return Audio;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Comms.js',[], factory);
    } else {
        root.other_Comms = factory();
    }
}(this, function () {
    function espValFix(val) {
        if (!val.trim) {
            return val;
        }
        var retVal = val.trim();
        if (retVal !== "" && !isNaN(retVal)) {
            return Number(retVal);
        }
        return retVal;
    }

    function espRowFix(row) {
        for (var key in row) {
            row[key] = espValFix(row[key]);
        }
        return row;
    }

    function ESPUrl() {
        this._protocol = "http:";
        this._hostname = "localhost";
    }

    ESPUrl.prototype.url = function (_) {
        if (!arguments.length) return this._url;
        this._url = _;
        var parser = document.createElement("a");
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
                params[decodeURIComponent(tmpItem[0])] = decodeURIComponent(tmpItem[1]);
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

    ESPUrl.prototype.isWsWorkunits_GetStats = function () {
        return this._pathname.toLowerCase().indexOf("wsworkunits/wugetstats") >= 0 && this._params["WUID"];
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
    }

    ESPMappings.prototype.contains = function (resultName, origField) {
        return exists(resultName + "." + origField, this._mappings);
    };

    ESPMappings.prototype.mapResult = function (response, resultName) {
        var mapping = this._mappings[resultName];
        if (mapping) {
            response[resultName] = response[resultName].map(function (item) {
                var row = [];
                if (mapping.x && mapping.x instanceof Array) {
                    //  LINE Mapping  ---
                    row = [];
                    for (var i = 0; i < mapping.x.length; ++i) {
                        row.push(item[mapping.y[i]]);
                    }
                } else {
                    //  Regular Mapping  ---
                    for (var key in mapping) {
                        if (mapping[key] === "label") {
                            row[0] = item[key];
                        } else if (mapping[key] === "weight") {
                            row[1] = item[key];
                        }
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
    }
    Comms.prototype = Object.create(ESPUrl.prototype);

    function exists(prop, scope) {
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
    }

    var serialize = function (obj) {
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

        var respondedTimeout = 60000;
        var respondedTick = 5000;
        var callbackName = "jsonp_callback_" + Math.round(Math.random() * 999999);
        window[callbackName] = function (response) {
            respondedTimeout = 0;
            doCallback(response);
        };
        var script = document.createElement("script");
        script.src = url + (url.indexOf("?") >= 0 ? "&" : "?") + "jsonp=" + callbackName + "&" + serialize(request);
        document.body.appendChild(script);
        var progress = setInterval(function () {
            if (respondedTimeout <= 0) {
                clearInterval(progress);
            } else {
                respondedTimeout -= respondedTick;
                if (respondedTimeout <= 0) {
                    clearInterval(progress);
                    console.log("Request timeout:  " + script.src);
                    doCallback();
                } else {
                    console.log("Request pending (" + respondedTimeout / 1000 + " sec):  " + script.src);
                }
            }
        }, respondedTick);

        function doCallback(response) {
            delete window[callbackName];
            document.body.removeChild(script);
            callback(response);
        }
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

    function Basic() {
        Comms.call(this);
    }
    Basic.prototype = Object.create(Comms.prototype);

    Basic.prototype.cacheCalls = function (_) {
        if (!arguments.length) return this._cacheCalls;
        this._cacheCalls = _;
        return this;
    };

    Basic.prototype.call = function (request, callback) {
        var url = this._url + (this._url.indexOf("?") >= 0 ? "&" : "?") + serialize(request);
        function doCall(request, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function (e) {
                callback(JSON.parse(xhr.responseText));
            };
            xhr.onerror = function (e) {
                callback({});
            };
            xhr.send(null);
        }
        if (this._cacheCalls) {
            var response = localStorage.getItem("hpcc.viz." + url);
            if (response && response !== null) {
                setTimeout(function () {
                    callback(JSON.parse(response));
                }, 0);
            } else {
                doCall(request, function (response) {
                    localStorage.setItem("hpcc.viz." + url,JSON.stringify(response));
                    callback(response);
                });
            }
        } else {
            localStorage.removeItem("hpcc.viz." + url);
            doCall(request, callback);
        }
    };

    function WsECL() {
        Comms.call(this);

        this._port = "8002";
        this._target = "";
        this._query = "";
    }
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

            var pathParts, queryParts;
            if (!this._target && !this._query) {
                // http://192.168.1.201:8002/WsEcl/res/query/hthor/quicktest/res/index.html
                pathParts = this._pathname.split("/res/");
                if (pathParts.length >= 2) {
                    queryParts = pathParts[1].split("/");
                    if (queryParts.length >= 3) {
                        this.target(queryParts[1]);
                        this.query(queryParts[2]);
                    }
                }
            }
            if (!this._target && !this._query) {
                //http://10.241.100.157:8002/WsEcl/forms/default/query/roxie/wecare
                pathParts = this._pathname.split("/forms/default/");
                if (pathParts.length >= 2) {
                    queryParts = pathParts[1].split("/");
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
            for (key in response) {
                response[key] = response[key].Row.map(espRowFix);

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
    }
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
                params += "&";
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
                for (var responseKey in response) {
                    response = response[responseKey].Row.map(espRowFix);
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
            this.WUQuery(target, function (response) {
                target.wuid = response[0].Wuid;
                context._fetchResult(target, callback, skipMapping);
            });
        }
    };

    WsWorkunits.prototype.WUQuery = function (_request, callback) {
        var url = this.getUrl({
            pathname: "WsWorkunits/WUQuery.json",
        });
        var request = {
            Jobname: request.jobname,
            Count: 1
        };

        this._resultNameCache = {};
        this._resultNameCacheCount = 0;
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
        };

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
                    context.fetchResult({ wuid: context._wuid, resultname: key }, function (response) {
                        if (--toFetch <= 0) {
                            callback(context._resultNameCache);
                        }
                    }, skipMapping);
                }
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

    function WsWorkunits_GetStats() {
        Comms.call(this);

        this._port = "8010";
        this._wuid = null;
    }
    WsWorkunits_GetStats.prototype = Object.create(Comms.prototype);

    WsWorkunits_GetStats.prototype.url = function (_) {
        var retVal = Comms.prototype.url.apply(this, arguments);
        if (arguments.length) {
            //  http://192.168.1.201:8010/WsWorkunits/WUGetStats?WUID="xxx"
            for (var key in this._params) {
                switch (key) {
                    case "WUID":
                        this.wuid(this._params[key]);
                        break;
                }
            }
        }
        return retVal;
    };

    WsWorkunits_GetStats.prototype.wuid = function (_) {
        if (!arguments.length) return this._wuid;
        this._wuid = _;
        return this;
    };

    WsWorkunits_GetStats.prototype.constructUrl = function () {
        return Comms.prototype.getUrl.call(this, {
            pathname: "WsWorkunits/WUGetStats?WUID=" + this._wuid
        });
    };

    WsWorkunits_GetStats.prototype.send = function (request, callback) {
        var url = this.getUrl({
            pathname: "WsWorkunits/WUGetStats.json?WUID=" + this._wuid
        });
        this.jsonp(url, request, function (response) {
            if (exists("WUGetStatsResponse.Statistics.WUStatisticItem", response)) {
                callback(response.WUGetStatsResponse.Statistics.WUStatisticItem);
            } else {
                callback([]);
            }
        });
    };

    //  HIPIERoxie  ---
    function HIPIERoxie() {
        Comms.call(this);
    }
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
            for (key in response) {
                context._resultNameCache[key] = response[key].Row.map(espRowFix);
                ++context._resultNameCacheCount;
            }
            callback(context._resultNameCache);
        });
    };

    HIPIERoxie.prototype.fetchResult = function (name, callback) {
        callback(this._resultNameCache[name]);
    };

    HIPIERoxie.prototype.call = function (request, callback) {
        this.fetchResults(request, callback);
    };

    //  HIPIEWorkunit  ---
    function HIPIEWorkunit() {
        WsWorkunits.call(this);

        this._hipieResults = {};
    }
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
                }
            } else {
                callback(context._resultNameCache);
            }
        });
    };

    HIPIEWorkunit.prototype.fetchResult = function (name, callback) {
        return WsWorkunits.prototype.fetchResult.call(this, { wuid: this._wuid, resultname: name }, function (response) {
            callback(response);
        });
    };

    HIPIEWorkunit.prototype.call = function (request, callback) {
        if (request.refresh || !this._resultNameCache || !this._resultNameCacheCount) {
            this.fetchResults(callback);
        } else {
            var changedFilter = {};
            for (var key in request) {
                if (request[key] && request[key + "_changed"] !== undefined) {
                    changedFilter[key] = request[key];
                }
            }
            var retVal = {};
            for (var hipieKey in this._hipieResults) {
                var item = this._hipieResults[hipieKey];
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
                            if (row[key2] !== changedFilter[key2] && row[key2.toLowerCase()] !== changedFilter[key2]) {
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

    //  HIPIEDatabomb  ---
    function HIPIEDatabomb() {
        HIPIEWorkunit.call(this);
    }
    HIPIEDatabomb.prototype = Object.create(HIPIEWorkunit.prototype);

    HIPIEDatabomb.prototype.databomb = function (_) {
        if (!arguments.length) return this._databomb;
        this._databomb = _.map(espRowFix);
        return this;
    };

    HIPIEDatabomb.prototype.databombOutput = function (_) {
        if (!arguments.length) return undefined;
        this._resultNameCacheCount++;
        this._resultNameCache[_] = this._databomb;
        return this;
    };

    HIPIEDatabomb.prototype.fetchResults = function (callback) {
        var context = this;
        setTimeout(function () {
            callback(context._resultNameCache);
        }, 0);
    };

    return {
        Basic: Basic,
        ESPMappings: ESPMappings,
        ESPUrl: ESPUrl,
        WsECL: WsECL,
        WsWorkunits: WsWorkunits,
        HIPIERoxie: HIPIERoxie,
        HIPIEWorkunit: HIPIEWorkunit,
        HIPIEDatabomb: HIPIEDatabomb,
        createESPConnection: function (url) {
            url = url || document.URL;
            var testURL = new ESPUrl()
                .url(url)
            ;
            if (testURL.isWsWorkunits_GetStats()) {
                return new WsWorkunits_GetStats()
                   .url(url)
                ;
            }
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


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/HeatMap.js',["d3", "../common/CanvasWidget", "simpleheat"], factory);
    } else {
        root.other_HeatMap = factory(root.d3, root.common_CanvasWidget, root.simpleheat);
    }
}(this, function (d3, CanvasWidget, simpleheat) {
    function HeatMap() {
        CanvasWidget.call(this);
    }
    HeatMap.prototype = Object.create(CanvasWidget.prototype);
    HeatMap.prototype.constructor = HeatMap;
    HeatMap.prototype._class += " other_HeatMap";
    
    HeatMap.prototype.publish("radius", 25, "number", "Set point radius", null, { tags: ["Basic"] });
    HeatMap.prototype.publish("blur", 15, "number", "Set point blur", null, { tags: ["Basic"] });
    HeatMap.prototype.publish("max", 1, "number", "Set max data value", null, { tags: ["Basic"] });
    HeatMap.prototype.publish("gradient", [], "array", "Set gradient colors", null, { tags: ["Basic"] });

    HeatMap.prototype.enter = function (domNode, element) {
        CanvasWidget.prototype.enter.apply(this, arguments);
        // canvas size needs to be set before render
        this.resize(this._size);
        this._heat = simpleheat(domNode);
    };

    HeatMap.prototype.update = function (domNode, element) {
        CanvasWidget.prototype.update.apply(this, arguments);
        if (this.data().length === 4) {
            this.data().map(function(a) { return a.splice(0,3); });
        }
        this._heat.data(this.data());

        if(this.radius()){
            this._heat.radius(this.radius(), this.blur());
        }

        this._heat.draw();    
    };

    HeatMap.prototype.exit = function(domNode, element) {
        delete this._heat;
        CanvasWidget.prototype.exit.apply(this, arguments);
    };
 
    return HeatMap;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Image.js',["../common/HTMLWidget"], factory);
    } else {
        root.other_Image = factory(root.common_HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function Image() {
        HTMLWidget.call(this);

        this._tag = "img";
        this._prevSource = undefined;
    }
    Image.prototype = Object.create(HTMLWidget.prototype);
    Image.prototype.constructor = Image;
    Image.prototype._class += " other_Image";

    Image.prototype.publish("source", null, "string", "Image Source",null,{tags:["Basic"]});

    Image.prototype.publish("sizing", "actual", "set", "Controls sizing mode", ["actual","fit","custom"], {tags:["Basic"]});
    
    Image.prototype.publish("customWidth", "50%", "string", "Applies this width to IMG element if 'sizing' is set to 'custom'", null, {tags:["Basic"]});
    Image.prototype.publish("customHeight", "20%", "string", "Applies this height to IMG element if 'sizing' is set to 'custom'", null, {tags:["Basic"]});
    
    Image.prototype.publish("lockAspectRatio", true, "boolean", "Locks the aspect ratio when scaling/stretching", null, {tags:["Basic"]});

    Image.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.attr("src",this.source());
        this._prevSource = this.source();
        this.initSource(element);
    };

    Image.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        if(this.changedSource()){
            this.initSource(element);
        }
        if(this.sizing() === "custom"){
            element.style({
                width:this.customWidth(),
                height:this.customHeight()
            });
        }
        else if (this.sizing() === "actual") {
            element.style({
                width:"auto",
                height:"auto"
            });
        }
        else if (this.sizing() === "fit") {
            element.style({
                width:"100%",
                height:"100%"
            });
        }
        if(this.lockAspectRatio()){
            this.applyAspectRatio(element);
        }
        
        var bbox = element.node().getBoundingClientRect();
        this._projectScaleY = bbox.height/this._sourceHeight;
        this._projectScaleX = bbox.width/this._sourceWidth;
    };
    
    Image.prototype.changedSource = function(){
        return this._prevSource !== this.source();
    };
    
    Image.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
    
    Image.prototype.initSource = function(element){
        element.attr("src",this.source());
        element.style({width:"auto",height:"auto"});
        this._prevSource = this.source();
        this._sourceBBox = element.node().getBoundingClientRect();
        this._sourceWidth = this._sourceBBox.width;
        this._sourceHeight = this._sourceBBox.height;
        this._ratio = this._sourceBBox.width / this._sourceBBox.height;
    };
    
    Image.prototype.projection = function(x,y){
        return {
            x: x * this._projectScaleX,
            y: y * this._projectScaleY
        };
    };
        
    Image.prototype.applyAspectRatio = function(element){
        var bbox = element.node().getBoundingClientRect();
        if(bbox.width < bbox.height){
            element.style({
                height:(1/this._ratio)*bbox.width+"px",
            });
        } else {
            element.style({
                width:this._ratio*bbox.height+"px",
            });
        }
    };

    return Image;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/IWordCloud',[], factory);
    } else {
        root.other_IWordCloud = factory();
    }
}(this, function () {
    function IWordCloud() {
    }

    //  Properties  ---

    //  Events  ---
    IWordCloud.prototype.click = function (d) {
        console.log("Click:  " + d.label);
    };

    return IWordCloud;
}));

if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Paginator.js',["d3", "../common/HTMLWidget","css!./Paginator"], factory);
    } else {
        root.other_Paginator = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Paginator() {
        HTMLWidget.call(this);

        this._tag = "div";

        this._tNumPages = 1; //np

        this._numList = []; //pn
    }
    Paginator.prototype = Object.create(HTMLWidget.prototype);
    Paginator.prototype.constructor = Paginator;
    Paginator.prototype._class += " other_Paginator";

    Paginator.prototype.publish("itemsPerPage", 2, "number", "Pagination items per page",null,{tags:["Private"]});
    Paginator.prototype.publish("numItems", 10, "number", "Pagination total number of items",null,{tags:["Private"]});
    Paginator.prototype.publish("pageNumber", 1, "number", "Pagination set or get the page number",null,{tags:["Private"]});
    Paginator.prototype.publish("adjacentPages", 2, "number", "Number of page indexes either side of current one", null, { tags: ["Private"] });
    Paginator.prototype.publish("bottom", 20, "number", "Pagination bottom offset", null, { tags: ["Private"] });
    Paginator.prototype.publish("right", 20, "number", "Pagination right offset", null, { tags: ["Private"] });

    Paginator.prototype.postUpdate = function (domeNode, element) { };

    Paginator.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;

        this.paginator = element.append("ul").attr("class","paginator pagination pagination-sm");
        this.side = element.append("div").attr("class","paginator pagination side");

        this.side.append("span")
            .classed("side", true)
            .text("Page ")
        ;

        this.side.append("input")
            .attr("type","number")
            .attr("class","currentPageNumber")
            .property("value",1)
            .attr("min",1)
            .on("change", function() {
                context.pageNumber(this.value);
                context._onSelect(this.value);
            })
        ;

        this.side.append("span")
            .classed("side total", true)
            .text(" of 1")
        ;
    };

    Paginator.prototype.update = function (domNode, element) {
        var context = this;
        element
            .style("bottom", this.bottom() + "px")
            .style("right", this.right() + "px")
        ;

        this._tNumPages = Math.ceil(this.numItems() / this.itemsPerPage()) || 1;

        if (this.pageNumber() > this._tNumPages) { this.pageNumber(1); }

        this._numList = [];
        if (this.numItems()) {
            this._numList.push("first");
            for (var x = -this.adjacentPages() ; x <= this.adjacentPages() ; x++) {
                if (this.pageNumber() + x > 0 && this.pageNumber() + x <= this._tNumPages) {
                    this._numList.push(this.pageNumber() + x);
                }
            }
            this._numList.push("last");
        }

        this.side.select(".total").text(" of "+this._tNumPages);
        this.side.select(".currentPageNumber").property("value",this.pageNumber());
        this.side.select(".currentPageNumber").attr("max",this._tNumPages);

        var page = this.paginator.selectAll("li").data(this._numList,function(d) { return d; });
        page
            .enter()
            .append(function(d) {
                var li = document.createElement("li");

                if (d !== context.pageNumber()) {
                    var a = document.createElement("a");
                    var linkText = document.createTextNode(d);

                    a.appendChild(linkText);
                    a.href = "#";
                    li.appendChild(a);

                    return li;
                } else {
                    var span = document.createElement("span");
                        span.innerHTML = d;

                        li.appendChild(span);

                    return li;
                }
            })
            .on("click", function(d, i) {
                d3.event.preventDefault();
                context.side.select(".currentPageNumber").property("value",context.pageNumber());
                switch(d) {
                    case "first":
                        if (context.pageNumber() !== 1) {
                            context.pageNumber(1);
                            context._onSelect(1, "previous");
                        }
                        break;
                    case "last":
                        if (context.pageNumber() !== context._tNumPages) {
                            context.pageNumber(context._tNumPages);
                            context._onSelect(context._tNumPages, "previous");
                        }
                        break;
                    default:
                        context.pageNumber(d);
                        context._onSelect(d);
                }
            })
        ;

        page.classed("active", function(e, j) { return e === context.pageNumber(); })
            .select("a")
            .text(function(d) { return d; })
        ;

        page.exit().remove();
        page.order();

        if (this.numItems() === 0) {
            d3.select(domNode).remove();
        }
    };

    Paginator.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Paginator;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Table.js',["d3", "../common/HTMLWidget", "./Paginator", "../common/Utility", "css!./Table"], factory);
    } else {
        root.other_Table = factory(root.d3, root.common_HTMLWidget, root.other_Paginator, root.common_Utility);
    }
}(this, function (d3, HTMLWidget, Paginator, Utility) {
    function Table() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._currentSort = "";
        this._currentSortOrder = 1;
        this.columns([]);
        this._paginator = new Paginator();
        this._selectionBag = new Utility.Selection();
        this._selectionPrevClick = null;
        this._paginatorTableSpacing = 4;
    }
    Table.prototype = Object.create(HTMLWidget.prototype);
    Table.prototype.constructor = Table;
    Table.prototype._class += " other_Table";

    Table.prototype.publish("renderHtmlDataCells", false, "boolean", "enable or disable HTML within cells",null,{tags:["Private"]});
    Table.prototype.publish("pagination", false, "boolean", "Enable or disable pagination",null,{tags:["Private"]});
    Table.prototype.publishProxy("itemsPerPage", "_paginator");
    Table.prototype.publishProxy("pageNumber", "_paginator", "pageNumber",1);
    Table.prototype.publishProxy("adjacentPages", "_paginator");
    Table.prototype.publish("showHeader", true, "boolean", "Show or hide the table header",null,{tags:["Private"]});
    Table.prototype.publish("fixedHeader", false, "boolean", "Enable or disable fixed table header",null,{tags:["Private"]});
    Table.prototype.publish("fixedColumn", false, "boolean", "Enable or disable fixed first column",null,{tags:["Private"]});
    
    Table.prototype.publish("fixedSize", false, "boolean", "Fix Size to Min Width/Height");
    
    Table.prototype.publish("theadFontSize", null, "string", "Table head font size", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodyFontSize", null, "string", "Table body font size", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tfootFontSize", null, "string", "Table body font size", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("theadFontColor", null, "html-color", "Table head font color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodyFontColor", null, "html-color", "Table body font color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tfootFontColor", null, "html-color", "Table body font color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("theadFontFamily", null, "string", "Table head font family", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodyFontFamily", null, "string", "Table body font family", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tfootFontFamily", null, "string", "Table body font family", null, { tags: ["Basic"], optional: true });
    
    Table.prototype.publish("theadCellBorderColor", null, "html-color", "Table head cell border color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tfootCellBorderColor", null, "html-color", "Table head cell border color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("theadRowBackgroundColor", null, "html-color", "Table head row color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tfootRowBackgroundColor", null, "html-color", "Table head row color", null, { tags: ["Basic"], optional: true });
    
    Table.prototype.publish("tbodyCellBorderColor", null, "html-color", "Table body cell border color", null, { tags: ["Basic"], optional: true });
    
    Table.prototype.publish("tbodyRowBackgroundColor", null, "html-color", "Table body row color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodyFixedColFontColor", null, "html-color", "Table body first column font color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodyFixedColBackgroundColor", null, "html-color", "Table body first column background color", null, { tags: ["Basic"], optional: true });
    
    Table.prototype.publish("tbodyHoverRowFontColor", null, "html-color", "Table body hover row font color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodyHoverRowBackgroundColor", null, "html-color", "Table body hover row background color", null, { tags: ["Basic"], optional: true });
    
    Table.prototype.publish("tbodySelectedRowFontColor", null, "html-color", "Table body selected row color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodySelectedRowBackgroundColor", null, "html-color", "Table body selected row color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tableZebraColor", null, "html-color", "Table zebra row color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("totalledColumns", [], "array", "Array of indices of the columns to be totalled", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("totalledLabel", null, "string", "Adds a label to the first column of the 'Totalled' row", null, { tags: ["Basic"], optional: true });
    
    Table.prototype.publish("columnPatterns", [], "array", "Array of formatting rules for each column", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("stringAlign", "left", "set", "Array of alignment positions for strings", ["left","right","center"], { tags: ["Basic"], optional: true });
    Table.prototype.publish("numberAlign", "right", "set", "Array of alignment positions for numbers", ["left","right","center"], { tags: ["Basic"], optional: true });

    Table.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._currentSort = "";
            this._currentSortOrder = 1;
        }
        return retVal;
    };

    Table.prototype.size = function (_) {
        var retVal = HTMLWidget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            if (this.tableDiv) {
                this.tableDiv
                    .style("width", this._size.width + "px")
                    .style("height", this._size.height + "px")
                ;
                this.headerDiv
                    .style("width", this._size.width + "px")
                    .style("height", this._size.height + "px")
                ;
            }
        }
        return retVal;
    };

    Table.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "hidden");

        this.tableDiv = element.append("div").attr("class", "tableDiv");
        this.table = this.tableDiv.append("table");
        this.thead = this.table.append("thead").append("tr");
        this.tbody = this.table.append("tbody");
        this.tfoot = this.table.append("tfoot").append("tr");
        this.headerDiv = element;
        this.tableDiv
            .style("overflow", "auto")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
        ;
        this.headerDiv
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
        ;
    };

    Table.prototype._generateTempRow = function() {
        var trow = this.tbody.append("tr");
        trow.append("td").text("QQQ");
        return trow;
    };

    Table.prototype._createSelectionObject = function (d) {
        var context = this;
        return {
            _id: d,
            element: function () {
                return context.tbody.selectAll("tr").filter(function (d2) { return d2 === d; });
            }
        };
    };

    Table.prototype._calcRowsPerPage = function(th) {
        if (this._paginator.numItems() === 0) { // only run on first render
            this._paginator.numItems(1);
            this.itemsPerPage(1);
        }
        this._paginator.render();

        var thHeight = this.thead.selectAll("th").node().clientHeight;
        var tfootHeight = this.tfoot.node().clientHeight;
        var tmpRow = this._generateTempRow();
        var tcellHeight = tmpRow.node().clientHeight;
        tmpRow.remove();
        var paginatorHeight = this.calcHeight(this._paginator.element());
        var ipp = Math.floor((this.height() - thHeight - tfootHeight- paginatorHeight - (this.hasHScroll(this.tableDiv) ? this.getScrollbarWidth() : 0) - this._paginatorTableSpacing * 2) / tcellHeight) || 1;
        return ipp;
    };

    Table.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        
        if (!this.showHeader()) {
            this.fixedHeader(false);
        } 

        var th = this.thead.selectAll("th").data(this.showHeader() ? this.columns() : [], function (d) { return d; });
        th.enter()
            .append("th")
                .each(function (d) {
                    var element = d3.select(this);
                    element.append("span").classed("thText",true);
                    element.append("span").classed("thIcon",true);
                })
            .on("click", function (column, idx) {
                context.headerClick(column, idx);
            })
        ;
        th.style({
                "color":this.theadFontColor(),
                "font-size":this.theadFontSize(),
                "border-color":this.theadCellBorderColor(),
                "background-color":this.theadRowBackgroundColor()
            })
        ;
        th.select(".thText")
            .style("font-family",this.theadFontFamily())
            .text(function (column) {
                return column;
            })
        ;
        th.select(".thIcon")
            .text(function (column, idx) {
                if (context._currentSortOrder === -1) {
                    return context._currentSort === idx ? "\uf078" : "";
                } else {
                    return context._currentSort === idx ? "\uf077" : "";
                }
            })
        ;
        th.exit()
            .remove()
        ;
        th.order();

        if (this.pagination()) {
            if (this._paginator.target() === null) {
                this._paginator.target(element.node());
            }

            var ipp = this._calcRowsPerPage(th);
            this.itemsPerPage(ipp);

            this._paginator.numItems(this.data().length);
            this._tNumPages = Math.ceil(this._paginator.numItems() / this.itemsPerPage()) || 1;
            if (this.pageNumber() > this._tNumPages || this.pageNumber() <= 0) { this.pageNumber(1); } // resets if current pagenum selected out of range

            this._paginator._onSelect = function (p, d) {
                context.pageNumber(p);
                context.render();
                return;
            };
            this.tableDiv.style("overflow-y", "hidden");
        } else {
            this.tableDiv.style("overflow-y", null);
            this._paginator.numItems(0); // remove widget
        }

        // pageNumber starts at index 1
        var startIndex = this.pageNumber() - 1;
        var itemsOnPage = this.itemsPerPage();

        var start = startIndex * itemsOnPage;
        var end = parseInt(startIndex * itemsOnPage) + parseInt(itemsOnPage);

        var tData = null;

        if (this.pagination()) {
            tData = this.data().slice(start, end);
        } else {
            tData = this.data();
        }

        var totalRow = [this.totalledLabel() ? this.totalledLabel() : null];

        if (context.totalledColumns().length !== 0) {
            var totArr = context.totalledColumns();
            for (var i = 1; i < context.columns().length; i++) {
                var sum = 0;
                if (totArr.indexOf(i) !== -1) {                  
                    for (var k = 0; k < tData.length; k++) {
                        sum = sum + tData[k][i];
                    }
                    totalRow.push(sum);
                } else {
                    totalRow.push("");
                }
            }
            this.tfoot.selectAll("td").remove();
            var tf = this.tfoot.selectAll("td").data(totalRow)
                .enter()
                .append("td")
                .text(function(d) {
                    return d;
                })
            ;
            tf
                .style("background-color",this.tfootRowBackgroundColor())
                .style("border-color",this.tfootCellBorderColor())
                .style("color",this.tfootFontColor())
                .style("font-size",this.tfootFontSize())
            ;
        }

        var rows = this.tbody.selectAll("tr").data(tData);
        
        this.setRowEvents(rows);

        rows
            .attr("class", function (d) {
                if (context._selectionBag.isSelected(context._createSelectionObject(d))) {
                    return "selected";
                }
            })
        ;

        rows.exit()
            .remove()
        ;
        
        rows.each(function() {
            var d = d3.select(this);
            context.applyStyleToRows(d);
        });
        var cells = rows.selectAll("td").data(function (row) {
            return row.filter(function (cell, idx) { return idx < context.columns().length; });
        });
        cells.enter()
            .append("td")
        ;
        cells[this.renderHtmlDataCells() ? "html" : "text"](function (d, idx) { 
            var retVal = context.columnPatterns()[idx] ? context.getColumnFormatting(d, idx) : d;
            return retVal; 
        });
        cells.exit()
            .remove()
        ;
        rows.each(function(tr,trIdx){
            d3.select(this).selectAll("td").each(function(tdContents,tdIdx){
                var alignment = context.getColumnAlignment(tdContents);
                d3.select(this)
                    .classed("tr-"+trIdx+"-td-"+tdIdx,true)
                    .style("text-align", alignment)
                ;
            });
        });
        this._paginator.render();
        if (this.data().length) {
            this.fixedLabelsUpdate(domNode, element);
        }
        
        context.applyStyleToRows(this.tbody.selectAll("tr"));
        this._paginator
            .right((this.hasVScroll(this.tableDiv) ? this.getScrollbarWidth() : 0 ) + this._paginatorTableSpacing)
            .bottom((this.hasHScroll(this.tableDiv) ? this.getScrollbarWidth() : 0) + this._paginatorTableSpacing)
            .render()
        ;
    };

    Table.prototype.fixedLabelsUpdate = function (domNode, element) {
        var context = this;
        var rows = this.tbody.selectAll("tr");
        rows.selectAll("td")
            .style({
                "color":this.tbodyFontColor(),
                "font-size":this.tbodyFontSize(),
                "font-family":this.tbodyFontFamily(),
                "border-color":this.tbodyCellBorderColor()
            })
        ;
        var colsWrapper = this.headerDiv.selectAll(".cols-wrapper").data(this.fixedHeader() ? [0] : []);
        colsWrapper.enter()
            .insert("div", ".rows-wrapper")
            .classed("cols-wrapper",true)
            .each(function () {
                d3.select(this)
                    .append("table")
                    .classed("labels-wrapper", true)
                    .append("thead")
                ;
            })
        ;
        colsWrapper.exit()
            .remove()
        ;
        var colLabelsWrapper = colsWrapper.select(".labels-wrapper");

        var rowsWrapper = this.headerDiv.selectAll(".rows-wrapper").data(this.fixedColumn() ? [0] : []);
        rowsWrapper.enter()
            .append("div")
            .attr("class", "rows-wrapper")
            .each(function (d) {
                var element = d3.select(this);
                element
                    .append("table")
                    .classed("labels-wrapper", true)
                ;
            })
        ;
        rowsWrapper.exit()
            .remove()
        ;
        var rowLabelsWrapper = rowsWrapper.select(".labels-wrapper");

        var theadSelection = this.table.select("thead");
        var colWrapperHeight = this.fixedHeader() || !this.showHeader() ? theadSelection.node().offsetHeight : 0;
        var tableMarginHeight = colWrapperHeight;
        _copyLabelContents();
        _setOnScrollEvents(this.tableDiv.node());
        
        colsWrapper.selectAll(".labels-wrapper tr").style("background-color",this.theadRowBackgroundColor());
        rowsWrapper.selectAll(".labels-wrapper thead > tr").style("background-color",this.theadRowBackgroundColor());
        
        var fixedColumnRows = rowsWrapper.selectAll(".labels-wrapper tbody > tr");
        context.applyRowStyles(fixedColumnRows,true);
        
        setTimeout(function(){
            context.applyStyleToRows(context.tbody.selectAll("tr"));
        },0);

        function _copyLabelContents() {
            var origThead = element.selectAll("th");
            origThead
                .style("border-color",context.theadCellBorderColor())
            ;
            if (context.fixedHeader()) {
                colsWrapper.select(".labels-wrapper > thead").html(theadSelection.html());
                colLabelsWrapper
                    .style("width", context.table.style("width"))
                    .style("position", "absolute")
                ;
                var newThead = context._parentElement.selectAll(".cols-wrapper th");
                origThead.each(function(d, i){
                    var el = newThead.filter(function (d, idx) { return idx === i;});
                    var elWidth = d3.select(this).style("width");
                    el
                        .style("width", elWidth)
                    ;
                });                
                newThead.on("click", function(d, idx){
                    context.headerClick(d, idx);
                });
                rowLabelsWrapper.html("");
            }
            
            var rowWrapperWidth;
            var newTableHeight;
            var newTableWidth;
            var finalWidth;
            var maxWidth;
            if (context.fixedColumn()) {
                rowLabelsWrapper.html("");

                var borderWidth = parseInt(context.table.select("td").style("border-width"));
                var rowSelection = context.table.selectAll("tbody > tr > td:first-child");
                rowWrapperWidth = context.fixedColumn() ? rowSelection.node().offsetWidth : 0;
                var theadWidth = parseInt(rowWrapperWidth) + parseInt(2 * borderWidth);

                var tHead = rowLabelsWrapper.selectAll("thead").data([0]);
                if (context.showHeader()) {
                    var tHead_tr = tHead.enter()
                        .insert("thead", "tbody")
                        .append("tr")
                        .style("background-color", context.theadRowBackgroundColor())
                    ;
                    tHead.exit()
                        .remove()
                    ;

                    var ths =  tHead_tr.selectAll("th").data(origThead.filter(function (d, idx) { return idx === 0; }));
                    ths.attr("class", "update");
                    ths.enter()
                        .append("th")
                        .html(function(d, i) {
                            return d[i].innerHTML;
                        })
                    ;
                    ths.style({
                        "width":theadWidth + "px",
                        "color":context.theadFontColor(),
                        "font-size":context.theadFontSize(),
                        "font-family":context.theadFontFamily(),
                        "border-color":context.theadCellBorderColor()
                    });
                    ths.exit()
                        .remove()
                    ;
                } 

                var tBody = rowLabelsWrapper.selectAll("tbody").data([0]);
                tBody.enter()
                    .append("tbody")
                ;
                tBody.exit()
                    .remove()
                ;

                var tds = tBody.selectAll("tr").data(rowSelection[0]);
                tds
                    .enter() 
                    .append("tr")
                    .html(function(d) {
                        return d.outerHTML || "<td>&nbsp;</td>";  
                    })
                ;  
                if (context.totalledColumns() && context.totalledLabel()) {
                    tBody
                        .append("tr").append("td")
                        .text(context.totalledLabel())
                    ;
                }
                tds
                    .style({
                        "color":context.tbodyFontColor(),
                        "font-size":context.tbodyFontSize(),
                        "font-family":context.tbodyFontFamily(),
                        "border-color":context.tbodyCellBorderColor(),
                    })
                ;
                rowsWrapper
                    .style("position", "absolute")
                ;
                rowLabelsWrapper
                    .style("width", rowWrapperWidth)
                ;

                if (context.fixedHeader()){
                    tHead.style({
                        "position": "absolute",
                        "width": theadWidth + "px"
                    });
                    rowLabelsWrapper
                        .style("margin-top", -domNode.scrollTop + colWrapperHeight + "px")
                    ;
                    element
                        .style("top", colWrapperHeight + "px")
                    ;
                } else {
                    if (context.showHeader()) {
                        tHead
                            .style("margin-top", "0px")
                            .style("position", "relative")
                        ;
                        rowLabelsWrapper
                            .style("margin-top", -domNode.scrollTop + "px")
                        ;
                        element
                            .style("top", "0px")
                        ;
                    } else {
                        tHead.remove();
                    }
                }
                var fixedRows = rowLabelsWrapper.selectAll("tr");
                fixedRows
                    .on("click", function (d, i) {
                        d3.select(rows[0][i]).on("click.selectionBag")(rows.data()[i - 1], i - 1)
                        ;
                    })
                    .on("mouseover", function (d, i) {
                        d3.select(rows[0][i]).on("mouseover")(rows.data()[i - 1], i - 1)
                        ;
                    })
                    .on("mouseout", function (d, i) {
                        d3.select(rows[0][i]).on("mouseout")(rows.data()[i - 1], i - 1)
                        ;
                    })
                    .attr("class", function (d, i) {
                        var offSet = context.showHeader() ? 1 : 0;
                        if (rows[0][i - offSet] && (d3.select(rows[0][i - offSet]).classed("selected")) === true) {
                            return rows[0][i - offSet].parentElement.querySelector(":hover") === rows[0][i - offSet] ? "selected hover" : "selected";
                        }
                    })
                ;
            } else {
                rowWrapperWidth = 0; 
            }

            if (!context.showHeader()) {
                tableMarginHeight = 0;
            }

            var box = d3.select(".tableDiv > table").node().getBoundingClientRect();
            if(context.fixedSize() && box.width !== 0 && box.height !== 0){
                calcWidth();
                calcHeight();
            } else {
                if (context.node().offsetheight - parseInt(tableMarginHeight) <= context.tableDiv.node().offsetHeight ) {
                    calcHeight();
                } else {
                    if (context.fixedHeader()) {
                        newTableHeight = context.node().offsetHeight - parseInt(tableMarginHeight);
                        newTableHeight = newTableHeight + "px";
                    } else {
                        newTableHeight ="100%";
                    }
                }
                if (context.node().offsetwidth - parseInt(rowWrapperWidth) < context.tableDiv.node().offsetWidth ) {
                    calcWidth();
                } else {
                    if (context.fixedColumn()) {
                        finalWidth = context.node().offsetWidth - parseInt(rowWrapperWidth);
                        finalWidth = finalWidth + "px";
                    } else {
                        finalWidth = "100%";
                    }
                }            
            }
            function calcWidth() {
                newTableWidth = box.width - parseInt(rowWrapperWidth);
                maxWidth = context.table.node().offsetWidth - rowWrapperWidth + context.getScrollbarWidth();
                finalWidth = newTableWidth > maxWidth ? maxWidth : newTableWidth;
                finalWidth = finalWidth + "px";
            }
            function calcHeight() {
                newTableHeight = box.height - parseInt(tableMarginHeight) + context.getScrollbarWidth();
                newTableHeight = newTableHeight + "px";
            }
        
            context.tableDiv
                .style("width", finalWidth)
                .style("height", newTableHeight)
                .style("position", "absolute")
                .style("top", tableMarginHeight + "px")
                .style("left", rowWrapperWidth + "px")
                .style("overflow", "auto")
            ;
            context.table
                .style({
                    "margin-left":"-" + rowWrapperWidth + "px",
                    "margin-top":"-" + colWrapperHeight + "px"
                })
            ;
            rowsWrapper
                .style("width", rowWrapperWidth + "px")
            ;
            rowLabelsWrapper
                .style("margin-top", -context.tableDiv.node().scrollTop + tableMarginHeight + "px")
            ;
            rowLabelsWrapper.select("thead")
                .style("margin-top", context.tableDiv.node().scrollTop - tableMarginHeight + "px")
                .on("click", function (d, idx) {
                    context.headerClick(d, idx);
                })
            ;
        }

        function _setOnScrollEvents(domNode) {
            domNode.onscroll = function (e) {
                var leftDelta = e.target.scrollLeft;
                var topDelta = e.target.scrollTop;
                colLabelsWrapper
                    .style("margin-left", -leftDelta + "px")
                ;
                rowLabelsWrapper
                    .style("margin-top", -topDelta + tableMarginHeight + "px")
                ;
                rowLabelsWrapper.select("thead")
                    .style("margin-top", topDelta - tableMarginHeight + "px")
                ;
            };
        }
    };

    Table.prototype.exit = function (domNode, element) {
        this._paginator.target(null);
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Table.prototype.sort = function (idx) {
        if (this._currentSort !== idx) {
            this._currentSort = idx;
            this._currentSortOrder = 1;
        } else {
            this._currentSortOrder *= -1;
        }
        var context = this;
        this.data().sort(function (l, r) {
            if (l[idx] === r[idx]) {
                return 0;
            } else if (typeof (r[idx]) === "undefined" || l[idx] > r[idx]) {
                return context._currentSortOrder;
            }
            return context._currentSortOrder * -1;
        });
        return this;
    };

    Table.prototype.applyStyleToRows = function(rows,isFixedCol){
        var context = this;
        rows.each(function () {
                var tr = d3.select(this);
                if (tr.classed("hover")) {
                    context.applyHoverRowStyles(tr);
                } else if (tr.classed("selected")) {
                    context.applySelectedRowStyles(tr);
                } else {
                    context.applyRowStyles(tr,isFixedCol);
                }
            })
        ;
    };
    Table.prototype.applyRowStyles = function(row, isFixedCol){
        row.style({
            "color":isFixedCol ? this.tbodyFixedColFontColor() : this.tbodyFontColor(),
            "background-color":isFixedCol ? this.tbodyFixedColBackgroundColor() : this.tableZebraColor_exists() && this.data().indexOf(row.datum()) % 2 ? this.tbodyRowBackgroundColor() : this.tableZebraColor()
        });
    };
    Table.prototype.applyHoverRowStyles = function(row){
        row.style({
            "color":this.tbodyHoverRowFontColor(),
            "background-color":this.tbodyHoverRowBackgroundColor()
        });
    };
    Table.prototype.applySelectedRowStyles = function(row){
        row.style({
            "color":this.tbodySelectedRowFontColor(),
            "background-color":this.tbodySelectedRowBackgroundColor()
        });
    };
    
    Table.prototype.setRowEvents = function(rows){
        var context = this;
        rows.enter()
            .append("tr")
            .on("click.selectionBag", function (d, i) {
                context.selectionBagClick(d);
                context.render();
                var fixedLeftRows = context.headerDiv.selectAll(".rows-wrapper tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                var tbodyRows = context.table.selectAll("tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                tbodyRows.classed("hover",true);
                context.applyRowStyles(tbodyRows);
                context.applyRowStyles(fixedLeftRows,true);
            })
            .on("click", function (d) {
                context.click(context.rowToObj(d), null, context._selectionBag.isSelected(context._createSelectionObject(d)));
                context.applyRowStyles(d3.select(this));
            })
            .on("mouseover", function (d, i) {
                var fixedLeftRows = context.headerDiv.selectAll(".rows-wrapper tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                if (fixedLeftRows.empty()) { return; }
                fixedLeftRows.classed("hover", true);
                var tbodyRows = context.table.selectAll("tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                tbodyRows.classed("hover", true);
                if (tbodyRows.classed("selected")) {
                    fixedLeftRows.classed("selected", true);
                }
                context.applyStyleToRows(tbodyRows);
                context.applyStyleToRows(fixedLeftRows,true);
            })
            .on("mouseout", function (d, i) {
                var fixedLeftRows = context.headerDiv.selectAll(".rows-wrapper tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                fixedLeftRows.classed("hover", false);
                var tbodyRows = context.table.selectAll("tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                    .classed("hover", false)
                ;
                context.applyStyleToRows(tbodyRows);
                context.applyStyleToRows(fixedLeftRows,true);
            })
        ;
    };
    Table.prototype.selection = function (_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) { return d._id; });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    };
    Table.prototype.selectionBagClick = function (d) {
        if (d3.event.shiftKey) {
            var inRange = false;
            var rows = [];
            var selection = this.data().filter(function (row, i) {
                var lastInRangeRow = false;
                if (row === d || row === this._selectionPrevClick) {
                    if (inRange) {
                        lastInRangeRow = true;
                    }
                    inRange = !inRange;
                    rows.push(i);
                }
                return inRange || lastInRangeRow;
            }, this);
            this.selection(selection);
            return rows;
        } else {
            this._selectionBag.click(this._createSelectionObject(d), d3.event);
            this._selectionPrevClick = d;
        }
    };

    Table.prototype.getColumnFormatting = function(cellData,colIdx){
        var context = this;
        if(typeof(cellData) === "string"){
            var timeFormat = d3.time.format(context.columnPatterns()[colIdx]);
            return timeFormat(new Date(cellData));
        } else if (typeof(cellData) === "number") {
            var format = d3.format(context.columnPatterns()[colIdx]);
            return format(cellData);
        }
        return cellData;
    };
    Table.prototype.getColumnAlignment = function(cellData){
        var context = this;
        switch(typeof(cellData)){
            case "number":
                return function(){
                    return context.numberAlign();
                };
            case "string":
                return function(){
                    return context.stringAlign();
                };
            default:
                return "";
        }
    };

    Table.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };
    Table.prototype.headerClick = function (column, idx) {
        this
            .sort(idx)
            .render()
        ;
    };

    return Table;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Legend.js',["d3", "./Table", "css!./Legend"], factory);
    } else {
        root.other_Legend = factory(root.d3, root.other_Table);
    }
}(this, function (d3, Table) {
    function Legend() {
        Table.call(this);
        this._tag = "div";
        
        this.showHeader(false);
    }
    Legend.prototype = Object.create(Table.prototype);
    Legend.prototype.constructor = Legend;
    Legend.prototype._class += " other_Legend";

    //We may need a new publish param "type" to store references to widgets
    //Legend.prototype.publish("targetWidget", null, "widget", "Target widget for Legend",null,{tags:["Private"]});
    
    Legend.prototype.targetWidget = function (widget) {
        var context = this;
            var colArr = ["Key", "Label"];
            var dataArr = [];
            var widgetColumns = widget.columns();

            var paletteType = widget._palette.toString().split("function ")[1].split("(")[0];
            if(paletteType === "ordinal"){
                for(var i in widgetColumns){
                    if(i > 0){
                        dataArr.push([
                            _htmlColorBlock(widget._palette(widgetColumns[i])),
                            widgetColumns[i]
                        ]);
                    }
                }
            } 
            else if (paletteType === "rainbow"){
                var colorArr = widget._palette.colors().reverse();
                var steps = colorArr.length;
                var weightMin = widget._dataMinWeight;
                var weightMax = widget._dataMaxWeight;
                for(var x = 0;x<steps;x++){
                    var stepWeightDiff = parseInt((weightMax - weightMin) / steps);
                    var lower,higher;
                    if(x === 0){
                        higher = commaSeparateNumber(weightMin + stepWeightDiff*(x+1));
                        dataArr.push([_htmlColorBlock(colorArr[x]),"0 - " + higher]);
                    } else if (x+1 === steps){
                        lower = commaSeparateNumber(weightMin + (stepWeightDiff*x) + 1);
                        dataArr.push([_htmlColorBlock(colorArr[x]),lower + "+"]);
                    } else {
                        lower = commaSeparateNumber(weightMin + (stepWeightDiff*x) + 1);
                        higher = commaSeparateNumber(weightMin + stepWeightDiff*(x+1));
                        dataArr.push([_htmlColorBlock(colorArr[x]),lower + " - " + higher]);
                    }
                }
            }

            context.columns(colArr);
            context.data(dataArr);

            context._targetWidget = widget;
        
        return this;
        
        function _htmlColorBlock(hexColor){
            return "<div class=\"colorBlock\" style=\"background-color:"+hexColor+";\"></div>";
        }
        function commaSeparateNumber(val){
            var int = val.toString().split(".")[0];
            var dec = val.toString().split(".")[1];
            while (/(\d+)(\d{3})/.test(int.toString())){
                int = int.toString().replace(/(\d+)(\d{3})/, "$1"+","+"$2");
            }
            return typeof(dec) !== "undefined" ? int+"."+dec : int;
        }
    };

    Legend.prototype.enter = function (domNode, element) {
        Table.prototype.enter.apply(this, arguments);
        this.renderHtmlDataCells(true);
        this.fixedHeader(false);
        element.classed("other_Legend", true);
    };

    Legend.prototype.update = function (domNode, element) {
        Table.prototype.update.apply(this, arguments);
        
        var context = this;
        if(typeof (this._targetWidget) !== "undefined"){
            this.targetWidget(this._targetWidget);
        }
        
        var table = element.select(".tableDiv > table");
        var tableRect = table.node().getBoundingClientRect();
        var elementRect = this._parentElement.node().getBoundingClientRect();
        
        element.select(".tableDiv").style({overflow:"visible"});
        
        var top = elementRect.height/2 - tableRect.height/2;
        var left = elementRect.width/2 - tableRect.width/2;
        table.style({position:"absolute",top:top+"px",left:left+"px"});
        
        var startIndex = this.pageNumber()-1;
        var itemsOnPage = this.itemsPerPage();

        var start = startIndex * itemsOnPage;
        var end = parseInt(startIndex * itemsOnPage) + parseInt(itemsOnPage);

        var tData = null;
        if (this.pagination()) {
            tData = this.data().slice(start,end);
        } else {
            tData = this.data();
        }

        var rows = this.tbody.selectAll("tr").data(tData);
        rows
            .on("click",function(d,i){
                context.onClick(d,i);
            })
            .on("mouseover",function(d,i){
                context.onMouseOver(d,i);
            })
        ;
    };
    
    Legend.prototype.onClick = function (rowData,rowIdx) { 
        console.log("Legend onClick method"); 
        console.log("rowData: "+rowData);
        console.log("rowIdx: "+rowIdx);
    };
    Legend.prototype.onMouseOver = function (rowData,rowIdx) {
        console.log("Legend onMouseOver method"); 
        console.log("rowData: "+rowData);
        console.log("rowIdx: "+rowIdx);
    };

    return Legend;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/MorphText.js',["../common/SVGWidget", "css!./MorphText"], factory);
    } else {
        root.other_MorphText = factory(root.common_SVGWidget);
    }
}(this, function (SVGWidget) {
    function MorphText() {
        SVGWidget.call(this);
    }
    MorphText.prototype = Object.create(SVGWidget.prototype);
    MorphText.prototype.constructor = MorphText;
    MorphText.prototype._class += " other_MorphText";

    MorphText.prototype.publish("anchor","middle", "set", "Sets anchor point",["middle"],{tags:["Basic"]});
    MorphText.prototype.publish("fontSize",14, "number", "Sets fontsize",null,{tags:["Basic"]});
    MorphText.prototype.publish("reverse",false, "boolean", "Reverse Animation",null,{tags:["Basic"]});
    MorphText.prototype.publish("text","", "string", "Sets text/data of widget",null,{tags:["Basic"]});

    MorphText.prototype._origText = MorphText.prototype.text;
    MorphText.prototype.text = function (_) {
        var retVal = MorphText.prototype._origText.apply(this, arguments);
        if (arguments.length) {
            var usedChars = {};
            var chars = _.split("");
            this.data(chars.map(function(d) {
                var id = "_" + d;
                if (usedChars[id] === undefined) {
                    usedChars[id] = 0;
                }
                usedChars[id]++;
                return {text: d, id: d.charCodeAt(0) + (1024 * usedChars[id])};
            }));
        }
        return retVal;
    };

    MorphText.prototype.enter = function (domNode, element) {
        if (!this.fontSize()) {
            var style = window.getComputedStyle(domNode, null);
            this.fontSize(parseInt(style.fontSize));
        }
        this._fontWidth = this.fontSize() * 32 / 48;
        this._textElement = element.append("g")
        ;
    };

    MorphText.prototype.dateTime = function () {
        var d = new Date(),
            seconds = d.getSeconds().toString().length === 1 ? "0" + d.getSeconds() : d.getSeconds(),
            minutes = d.getMinutes().toString().length === 1 ? "0" + d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length === 1 ? "0" + d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? "pm" : "am",
            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " " + hours + ":" + minutes + ":" + seconds + ampm;
    };

    MorphText.prototype.update = function (domNode, element) {
        var context = this;
        var text = this._textElement.selectAll("text")
            .data(this.data(), function (d) { return d.id; })
        ;
        text
          .attr("class", "update")
        ;
        this.transition.apply(text)
            .attr("x", function (d, i) { return (-context.data().length / 2 + i) * context._fontWidth + context._fontWidth / 2; })
        ;

        var newText = text.enter().append("text")
            .attr("class", "enter")
            .attr("font-size", this.fontSize())
            .attr("dy", ".35em")
            .attr("y", (this.reverse() ? +1 : -1) * this._fontWidth * 2)
            .attr("x", function (d, i) { return (-context.data().length / 2 + i) * context._fontWidth + context._fontWidth / 2; })
            .style("fill-opacity", 1e-6)
            .style("text-anchor", this.anchor())
            .text(function (d) { return d.text; })
        ;
        this.transition.apply(newText)
            .attr("y", 0)
            .style("fill-opacity", 1)
        ;

        text.exit()
            .attr("class", "exit")
        ;
        this.transition.apply(text.exit())
            .attr("y", (this.reverse() ? -1 : +1) * this._fontWidth * 2)
            .style("fill-opacity", 1e-6)
            .remove()
        ;
    };

    return MorphText;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Persist',["require"], factory);
    } else {
        root.other_Persist = factory(root.require);
    }
}(this, function (require) {
    function discover(widget) {
        var retVal = [];
        var isPrototype = widget._id === undefined;
        for (var key in widget) {
            if (key.indexOf("__meta_") >= 0) {
                var item = widget;
                var meta = item[key];
                if (meta.type) {
                    if (!(isPrototype && meta.type === "proxy")) {
                        while (meta.type === "proxy") {
                            item = item[meta.proxy];
                            meta = item["__meta_" + meta.method];
                        }
                        if (meta.id !== widget[key].id) {
                            meta = JSON.parse(JSON.stringify(meta));  //  Clone meta so we can safely replace the id.
                            meta.id = widget[key].id;
                        }
                        retVal.push(meta);
                    }
                }
            }
        }
        return retVal;
    }

    function widgetWalker(widget, visitor) {
        if (!widget)
            return;
        visitor(widget);
        var publishedProps = discover(widget);
        for (var i = 0; i < publishedProps.length; ++i) {
            var publishItem = publishedProps[i];
            switch (publishItem.type) {
                case "widget":
                    widgetWalker(widget[publishItem.id](), visitor);
                    break;
                case "widgetArray":
                    var widgetArray = widget[publishItem.id]();
                    widgetArray.forEach(function(widget) {
                        widgetWalker(widget, visitor);
                    });
                    break;
            }
        }
    }

    function propertyWalker(widget, filter, visitor) {
        var publishedProps = discover(widget);
        for (var i = 0; i < publishedProps.length; ++i) {
            var publishItem = publishedProps[i];
            if(typeof (filter) !== "function" || !filter(widget, publishItem)){
                visitor(widget, publishItem);
            }
        }
    }
    
    function widgetPropertyWalker(widget, filter, visitor) {
        widgetWalker(widget, function (widget) {
            propertyWalker(widget, filter, visitor);
        });
    }

    return {
        discover: discover,
        widgetWalker: widgetWalker,
        propertyWalker: propertyWalker,
        widgetPropertyWalker: widgetPropertyWalker,
        serializeTheme: function(widget,filter){
            return JSON.stringify(this.serializeThemeToObject(widget,filter));
        },
        serializeThemeToObject: function (widget, filter){
            filter = filter || ["surface", "Color", "Font", "palette"];

            var propObj = {};
            widgetPropertyWalker(widget, null, function (widget, item) {
                if (widget[item.id + "_modified"]() || widget["__meta_" + item.id].origDefaultValue !== widget["__meta_" + item.id].defaultValue) {
                    if (_isFilterMatch(item.id, filter)) {
                        var classParts = widget._class.trim().split(" ");
                        for (var i in classParts) {
                            if (propObj[classParts[i]] === undefined) {
                                propObj[classParts[i]] = {};
                            }
                            if (propObj[classParts[i]][item.id] === undefined) {
                                propObj[classParts[i]][item.id] = widget[item.id]();
                                break;
                            } else if (propObj[classParts[i]][item.id] === widget[item.id]()) {
                                break;
                            }
                        }
                    }
                }
            });

            function _isFilterMatch(str, arr) {
                var ret = false;
                for (var i in arr) {
                    if (str.indexOf(arr[i]) !== -1) {
                        ret = true;
                        break;
                    }
                }
                return ret;
            }
            return propObj;
        },
        removeTheme: function (widget,callback) {
            widgetPropertyWalker(widget, null, function (widget, item) {
                widget["__meta_" + item.id].defaultValue = widget["__meta_" + item.id].origDefaultValue;
            });

            if (typeof (callback) === "function") {
                callback.call(this);
            }
        },
        applyTheme: function (widget,themeObj,callback) {
            var context = this;
            widgetPropertyWalker(widget, null, function (widget, item) {
                switch (item.type) {
                    case "widget":
                        context.applyTheme(widget[item.id](), themeObj);
                        return true;
                    case "widgetArray":
                        var widgetArray = widget[item.id]();
                        widgetArray.forEach(function (widget) {
                            context.applyTheme(widget, themeObj);
                        }, this);
                        return true;
                    default:
                        widget.applyTheme(themeObj);
                        break;
                }
            });
            if(typeof (callback) === "function"){
                callback.call(this);
            }
        },

        serializeToObject: function (widget, filter, includeData) {
            var retVal = {
                __version: 3,
                __class: widget.classID(),
                __properties: {}
            };
            if (widget._id.indexOf("_w") !== 0) {
                retVal.__id = widget._id;
            }

            var context = this;
            propertyWalker(widget, filter, function (widget, item) {
                if (widget[item.id + "_modified"]()) {
                    switch (item.type) {
                        case "widget":
                            retVal.__properties[item.id] = context.serializeToObject(widget[item.id](), null, includeData);
                            return true;
                        case "widgetArray":
                            retVal.__properties[item.id] = [];
                            var widgetArray = widget[item.id]();
                            widgetArray.forEach(function (widget, idx) {
                                retVal.__properties[item.id].push(context.serializeToObject(widget, null, includeData));
                            });
                            return true;
                        default:
                            retVal.__properties[item.id] = widget[item.id]();
                            break;
                    }
                }
            });

            if (widget.classID() === "marshaller_Graph") {
                var vertices = widget.data().vertices;
                if (vertices) {
                    this.__vertices = vertices.map(function (item) {
                        return this.serializeToObject(item, null, includeData);
                    }, this);
                }
            }
            if (includeData) {
                retVal.__data = {};
                retVal.__data.columns = widget.columns();
                retVal.__data.data = widget.data();
            }
            return retVal;
        },

        serialize: function (widget, properties, includeData) {
            return JSON.stringify(this.serializeToObject(widget, properties, includeData));
        },

        deserializeFromObject: function(widget, state, callback) {
            var createCount = 0;
            var context = this;
            widgetPropertyWalker(widget, null, function (widget, item) {
                widget[item.id + "_reset"]();
                if (state.__properties[item.id] !== undefined) {
                    switch (item.type) {
                        case "widget":
                            ++createCount;
                            var widgetKey = item.id;
                            context.create(state.__properties[item.id], function (widgetItem) {
                                widget[widgetKey](widgetItem);
                                --createCount;
                            });
                            break;
                        case "widgetArray":
                            var widgetArrayKey = item.id;
                            var widgetStateArray = state.__properties[item.id];
                            if (widgetStateArray.length) {
                                ++createCount;
                                var widgetArray = [];
                                widgetArray.length = widgetStateArray.length;
                                var arrayCreateCount = 0;
                                widgetStateArray.forEach(function (widgetState, idx) {
                                    ++arrayCreateCount;
                                    context.create(widgetState, function (widgetItem) {
                                        widgetArray[idx] = widgetItem;
                                        --arrayCreateCount;
                                    });
                                    var arrayIntervalHandler = setInterval(function () {
                                        if (arrayCreateCount <= 0) {
                                            clearInterval(arrayIntervalHandler);
                                            arrayCreateCount = undefined;
                                            widget[widgetArrayKey](widgetArray);
                                            --createCount;
                                        }
                                    }, 20);
                                });
                            }
                            break;
                        default:
                            widget[item.id](state.__properties[item.id]);
                            break;
                    }
                }
            });
            var intervalHandler = setInterval(function () {
                if (createCount <= 0) {
                    clearInterval(intervalHandler);
                    createCount = undefined;
                    if (state.__data) {
                        for (var key in state.__data) {
                            widget[key](state.__data[key]);
                        }
                    }
                    callback(widget);
                }
            }, 20);
        },

        deserialize: function (widget, state, callback) {
            if (typeof state === "string") {
                state = JSON.parse(state);
            }
            if (state.__id && state.__id.indexOf("_w") !== 0 && widget._id !== state.__id) {
                console.log("Deserialize:  IDs do not match - " + widget._id);
            }
            this.deserializeFromObject(widget, state, callback);
        },

        create: function (state, callback) {
            if (typeof state === "string") {
                state = JSON.parse(state);
            }
            var path = "src/" + state.__class.split("_").join("/");
            var context = this;
            require([path], function (Widget) {
                var widget = new Widget();
                if (state.__id && state.__id.indexOf("_w") !== 0) {
                    widget._id = state.__id;
                }
                context.deserializeFromObject(widget, state, callback);
            });
        },

        clone: function (widget, callback) {
            this.create(this.serializeToObject(widget, [], true), callback);
        }
    };
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/PropertyEditor',["d3", "../common/Widget", "../common/HTMLWidget", "./Persist", "../layout/Grid", "../layout/Accordion", "../form/Form", "../form/Input", "css!./PropertyEditor"], factory);
    } else {
        root.other_PropertyEditor = factory(root.d3, root.common_Widget, root.common_HTMLWidget, root.other_Persist, root.layout_Grid, root.layout_Accordion, root.form_Form, root.form_Input);
    }
}(this, function (d3, Widget, HTMLWidget, Persist, Grid, Accordion, Form, Input) {
    function PropertyEditor() {
        Accordion.call(this);

        this._tag = "div";
        this._columns = ["Key", "Value"];
        this._contentEditors = [];
        this._show_settings = true;
        this._dataDiv = {};
        this._previousIds = "";
        this.__propertyEditor_watch = [];
    }
    PropertyEditor.prototype = Object.create(Accordion.prototype);
    PropertyEditor.prototype.constructor = PropertyEditor;
    PropertyEditor.prototype._class += " other_PropertyEditor";

    PropertyEditor.prototype.publish("showColumns", false, "boolean", "Show Columns",null,{tags:["Intermediate"]});
    PropertyEditor.prototype.publish("showData", false, "boolean", "Show Data",null,{tags:["Intermediate"]});
    PropertyEditor.prototype.publish("paramsBeforeWidgets", true, "boolean", "The non-widget parameter collapsible is placed before widget section(s)",null,{tags:["Private"]});
    PropertyEditor.prototype.publish("paramGrouping", "By Widget", "set", "Param Grouping", ["By Param", "By Widget"],{tags:["Basic"]});
    PropertyEditor.prototype.publish("excludeTags", [], "array", "Array of publish parameter tags to exclude from PropertEditor",null,{tags:["Private"]});
    PropertyEditor.prototype.publish("showProperties", [], "array", "Array of publish parameter IDs to include in PropertEditor (all others will be excluded)",null,{tags:["Private"]});
    
    PropertyEditor.prototype.publish("settingsWidget", null, "widget", "Another instance of PropertyEditor containing the publish parameters for the main instance of PropertyEditor",null,{tags:["Private"]});
    
    PropertyEditor.prototype.publish("ignoredClasses", [], "array", "Array of class chain substrings to hide params on match",null,{tags:["Basic"]});

    PropertyEditor.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            var context = this;
            if (_[0] instanceof Grid) {
                _[0].postSelectionChange = function () {
                    var selectedItems = _[0]._selectionBag.get().map(function(item){ return item.widget; });
                    context
                        .data(selectedItems.length > 0 ? selectedItems : [_[0]])
                        .paramGrouping( selectedItems.length > 1 ? "By Param" : "By Widget")
                        .render();
                };
            }
        }
        return retVal;
    };

    PropertyEditor.prototype.show_settings = function (_) {
        if (!arguments.length) {
            return this._show_settings;
        }
        this._show_settings = _;
        return this;
    };
    PropertyEditor.prototype.excludeWidgets = function (_) {
        if (!arguments.length) {
            return this._excludeWidgets;
        }
        this._excludeWidgets = _;
        return this;
    };

    PropertyEditor.prototype.onChange = function (widget, propID) {};

    PropertyEditor.prototype.paramFilter = function (){
        var showPropsList = this.showProperties();
        var excludeTagsList = this.excludeTags();
        return function (widget, publishItem){
            var showProperties = showPropsList;
            if(showProperties.length > 0){
                if(showProperties.indexOf(publishItem.id) === -1){
                    return true;
                }
            }
            if(excludeTagsList.length > 0){
                if(typeof(publishItem.ext) === "object" && typeof(publishItem.ext.tags) === "object"){
                    for(var tag in publishItem.ext.tags){
                        if(excludeTagsList.indexOf(publishItem.ext.tags[tag]) !== -1){
                            return true;
                        }
                    }
                }
            }
            return false;
        };
    };

    PropertyEditor.prototype.enter = function (domNode, element) {
        Accordion.prototype.enter.apply(this, arguments);
        
        if(this._parentElement.filter(".other_PropertyEditor div").empty()){
            this._parentElement.style("overflow", "auto");
        }
        
        if(this.title() === ""){
            this.title("Property Editor");
        }
        if (this.show_settings()) {
            this.pushListItem(
                new PropertyEditor()
                    .showColumns(false)
                    .showData(false)
                    .show_settings(false)
                    .excludeWidgets(true)
                    .defaultCollapsed(true)
                    .excludeTags(["Private"])
                    .paramGrouping("By Widget")
                    .title("Editor Settings")
                    .data([this]),null,true
            );
        }
    };
    
    PropertyEditor.prototype.update = function (domNode, element) {
        var context = this;
        
        switch(this.paramGrouping()){
            case "By Param":
                var paramObjs = this.getAllParams();
                
                this.clearListItems();
                
                this.removeWatches();
                for(var j in this.data()) {
                    this.createWatch(this.data()[j]);
                }

                var categorizedParams = this.categorizeParams(paramObjs);

                for(var categoryName in categorizedParams){
                    var paramArr1 = [];
                    for(var paramNode in categorizedParams[categoryName]){
                        var pNode = categorizedParams[categoryName][paramNode];
                        paramArr1.push(this.getSharedParamInputObj(pNode));
                    }
                    this.pushListItem(
                        new Accordion()
                            .title(categoryName+":")
                            .pushListItem(new Form().showSubmit(false).inputs(paramArr1))
                    );
                }
                break;
            case "By Widget":
                this.clearListItems();

                this.removeWatches();

                for(var i=0;i<this.data().length;i++) {
                    this.createWatch(this.data()[i]);
                    var paramArr2 = [];
                    var parentWidgetClass = this.data()[i]._class.split("_").pop();
                    Persist.propertyWalker(this.data()[i],context.paramFilter(),function(widget, param){
                        switch(param.type){
                            case "widget":
                                if(!context.excludeWidgets()){
                                    var wClass = widget[param.id]()._class.split("_").pop();
                                    context.pushListItem(
                                        new PropertyEditor()
                                        .showData(context.showData())
                                        .showColumns(context.showColumns())
                                        .show_settings(false)
                                        .title(wClass)
                                        .data([widget[param.id]()])
                                        .ignoredClasses(context.ignoredClasses())
                                    );
                                }
                                break;
                            case "widgetArray":
                                if(!context.excludeWidgets()){
                                    var w = widget[param.id]();
                                    var wClassArr = [];
                                    for(var widx=0;widx<w.length;widx++){
                                        wClassArr.push(w[widx]._class.split("_").pop());
                                    }
                                    context.pushListItem(
                                        new PropertyEditor()
                                            .show_settings(false)
                                            .title(parentWidgetClass+"."+param.id+": ["+wClassArr.join(", ")+"]")
                                            .data(w)
                                            .ignoredClasses(context.ignoredClasses())
                                    );
                                }
                                break;
                            default:
                                paramArr2.push(context.getParamInputObj(widget,param));
                                break;
                        }
                    });

                    if(this.showData()){
                        paramArr2.push(this.getDataInputObj(this.data()[i]));
                    }
                    if(this.showColumns()){
                        paramArr2.push(this.getColumnsInputObj(this.data()[i]));
                    }

                    if(paramArr2.length > 0 && this.classIsNotHidden(this.data()[i]._class)){
                        var paramListItem;
                        if(this.excludeWidgets()){
                            this.clearListItems();
                            paramListItem = new Form().showSubmit(false).inputs(paramArr2);
                        } else {
                            if(this.content().length > 0){
                                paramListItem = new Accordion()
                                    .title(parentWidgetClass+" Params:")
                                    .pushListItem(
                                        new Form().showSubmit(false).inputs(paramArr2)
                                    )
                                ;
                            } else {
                                paramListItem = new Form().showSubmit(false).inputs(paramArr2);
                            }
                        }
                        this.pushListItem(paramListItem,this.paramsBeforeWidgets());
                    }
                }
                break;
        }
        Accordion.prototype.update.apply(this, arguments);
    };
    
    PropertyEditor.prototype.exit = function (domNode, element) {
        this.removeWatches();
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
    
    PropertyEditor.prototype.removeWatches = function () {
        this.__propertyEditor_watch.forEach(function (watchObj) {
            watchObj.remove();
        });
        this.__propertyEditor_watch = [];
    };
    
    PropertyEditor.prototype.createWatch = function(obj){
        var context = this;
        this.__propertyEditor_watch.push(obj.monitor(function(key, newVal){
            if(typeof (newVal) === "object"){
                context.render();
            }
        }));
    };
    
    PropertyEditor.prototype.categorizeParams = function (arr) {
        var categories = {
            "Colors":["palette","color"],
            "Font":["font"],
            "Axis":["axis"],
            "General":[],
        };
        var ret = {};
        for(var p in arr){
            for(var c in categories){
                if(p.toLowerCase().indexOf(categories[c]) !== -1){
                    break;
                }
            }
            if(typeof (ret[c]) === "undefined"){
                ret[c] = [];
            }
            ret[c].push(arr[p]);
        }
        return ret;
    };
    
    PropertyEditor.prototype.classIsNotHidden = function (classNameString) {
        var classesToHide = this.ignoredClasses();
        for(var n in classesToHide){
            if(classNameString.indexOf(classesToHide[n]) !== -1){
                return false;
            }
        }
        return true;
    };
    
    PropertyEditor.prototype.getAllParams = function () {
        var context = this;
        var paramObjArr = {};
        for(var i in this.data()){
            Persist.widgetPropertyWalker(this.data()[i],context.paramFilter(),function(widget, param){
                switch(param.type){
                    case "widget":
                    case "widgetArray":
                        break;
                    default:
                        if(typeof (paramObjArr[param.id]) === "undefined"){
                            paramObjArr[param.id] = [];
                        }
                        paramObjArr[param.id].push({
                            widget:widget,
                            param:param,
                        });
                        break;
                }
            });
        }
        return paramObjArr;
    };
    
    PropertyEditor.prototype.getParamInputObj = function (widget,paramObj) {
        var val = ["widget","widgetArray"].indexOf(paramObj.type) === -1 ? widget[paramObj.id]() : null;
        var inp = new Input()
            .name(widget._id+"-"+paramObj.id)
            .label(paramObj.id)
            .type(this.inputTypeMapping(paramObj.type))
            .value(val)
        ;
        if(paramObj.type === "set"){
            inp.selectOptions(paramObj.set).value(val);
        }
        inp.change = function(w){
            if(paramObj.type === "boolean"){
                widget[paramObj.id](w._element.select("input").property("checked")).render();
            } else if(paramObj.type === "array") {
                var newArrayVal = w.value().split(",").filter(function(a){return a.length;});
                widget[paramObj.id](newArrayVal).render();
            } else {
                widget[paramObj.id](w.value()).render();
            }
        };
        inp._paramId = paramObj.id;
        return inp;
        
    };
    
    PropertyEditor.prototype.getSharedParamInputObj = function (sharedParamObj) {
        var paramId = sharedParamObj[0].param.id;
        var type = sharedParamObj[0].param.type;
        var inp = new Input()
            .name(paramId)
            .label(paramId)
            .type(this.inputTypeMapping(type))
        ;
        if(type === "set"){
            inp.selectOptions(sharedParamObj[0].param.set);
        }
        inp.change = function(w){
            for(var i in sharedParamObj){
                if(type === "boolean"){
                    sharedParamObj[i].widget[paramId](w._element.select("input").property("checked")).render();
                } else if(type === "array") {
                    var newArrayVal = w.value().split(",").filter(function(a){return a.length;});
                    sharedParamObj[i].widget[paramId](newArrayVal).render();
                } else {
                    sharedParamObj[i].widget[paramId](w.value()).render();
                }
            }
        };
        inp._paramId = paramId;
        return inp;
    };
    
    PropertyEditor.prototype.getDataInputObj = function (widget) {
        var dataStr = "";
        try{
            dataStr = JSON.stringify(widget.data());
        }catch(e){}
        var inp = new Input()
            .name(widget._id+"-data")
            .label("Data")
            .type("textarea")
            .value(dataStr)
        ;
        inp.change = function(w){
            try{
                widget.data(JSON.parse(w.value())).render();
            }catch(e){}
        };
        return inp;
    };
    PropertyEditor.prototype.getColumnsInputObj = function (widget) {
        var inp = new Input()
            .name(widget._id+"-columns")
            .label("Columns")
            .type("textarea")
            .value(widget.columns())
        ;
        inp.change = function(w){
            widget.columns(w.value().split(",")).render();
        };
        return inp;
    };
    
    PropertyEditor.prototype.inputTypeMapping = function (type){
        switch(type){
            case "set": return "select";
            case "array": return "textarea";
            case "boolean": return "checkbox";
            case "string": return "text";
            default: return type;
        }
    };
    
    PropertyEditor.prototype.click = function (d) {
    };

    return PropertyEditor;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/ThemeEditor.js',["../common/Widget", "../common/HTMLWidget", "./Persist", "./PropertyEditor", "css!./ThemeEditor"], factory);
    } else {
        root.other_PropertyEditor = factory(root.common_Widget, root.common_HTMLWidget, root.other_Persist, root.other_PropertyEditor);
    }
}(this, function (Widget, HTMLWidget, Persist, PropertyEditor) {
    function ThemeEditor() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._current_grouping = undefined;
        this._showing_columns = undefined;
        this._showing_data = undefined;
        this.columns(["Key", "Value"]);
        this._contentEditors = [];
        this._showSettings = true;

        this._defaultThemes = [];

        this._widgetObjsById = {};
    }
    var getThemes = function(idx){
        if (typeof(window.g_defaultThemes) === "function") {
            window.g_defaultThemes(idx);
        }
        return JSON.parse(localStorage.getItem("themeEditorThemes") || "{}");
    };
    var getSerials = function(idx){
        if (typeof(window.g_defaultSerials) === "function") {
            window.g_defaultSerials(idx);
        }
        return JSON.parse(localStorage.getItem("themeEditorSerials") || "{}");
    };
    var getThemeNames = function(idx){
        var loadedThemes = getThemes();
        var themes = [];
        for(var themeName in loadedThemes){
            themes.push(themeName);
        }
        if(typeof(idx) !== "undefined" && typeof(themes[idx]) !== "undefined"){
            themes = themes[idx];
        }
        return themes;
    };
    var getSerialNames = function(idx){
        var loadedSerials = getSerials();
        var serials = [];
        for(var serialName in loadedSerials){
            serials.push(serialName);
        }
        if(typeof(idx) !== "undefined" && typeof(serials[idx]) !== "undefined"){
            serials = serials[idx];
        }
        return serials;
    };
    ThemeEditor.prototype = Object.create(HTMLWidget.prototype);
    ThemeEditor.prototype._class += " other_ThemeEditor";

    ThemeEditor.prototype.publish("themeMode", true, "boolean", "Edit default values",null,{tags:["Basic"]});
    ThemeEditor.prototype.publish("saveTheme", "", "string", "Save Theme",null,{tags:["Basic","Theme"],saveButton:"Save",saveButtonID:"te-save-button"});
    ThemeEditor.prototype.publish("loadedTheme", getThemeNames(1), "set", "Loaded Theme",getThemeNames(),{tags:["Basic","Theme"]});
    ThemeEditor.prototype.publish("saveSerial", "", "string", "Save Serial",null,{tags:["Basic","Serial"],saveButton:"Save",saveButtonID:"te-save-button"});
    ThemeEditor.prototype.publish("loadedSerial", getSerialNames(0), "set", "Loaded Serial",getSerialNames(),{tags:["Basic","Serial"]});
    ThemeEditor.prototype.publish("showColumns", true, "boolean", "Show Columns",null,{tags:["Intermediate"]});
    ThemeEditor.prototype.publish("showData", true, "boolean", "Show Data",null,{tags:["Intermediate"]});
    ThemeEditor.prototype.publish("shareCountMin", 1, "number", "Share Count Min",null,{tags:["Private"]});
    ThemeEditor.prototype.publish("paramGrouping", "By Param", "set", "Param Grouping", ["By Param", "By Widget"],{tags:["Private"]});
    ThemeEditor.prototype.publish("editorComplexity", "Basic", "set", "Choose what publish properties to display within the editor.", ["Basic", "Intermediate", "Advanced", "Private"],{tags:["Private"]});
    ThemeEditor.prototype.publish("sectionTitle", "", "string", "Section Title",null,{tags:["Private"]});
    ThemeEditor.prototype.publish("collapsibleSections", true, "boolean", "Collapsible Sections",null,{tags:["Intermediate"]});

    ThemeEditor.prototype.getThemes = getThemes;
    ThemeEditor.prototype.getSerials = getSerials;
    ThemeEditor.prototype.getDefaultThemes = getThemeNames;
    ThemeEditor.prototype.getDefaultSerials = getSerialNames;

    ThemeEditor.prototype.showSettings = function (_) {
        if (!arguments.length) {
            return this._showSettings;
        }
        this._showSettings = _;
        return this;
    };

    ThemeEditor.prototype.onChange = function (widget, propID) {};

    ThemeEditor.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "auto");
    };

    var tableNeedsRedraw = function (context) {
        var needsRedraw = false;
        if (typeof (context._current_grouping) === "undefined") {
            context._current_grouping = context._group_params_by;
        } else if (context._current_grouping !== context._group_params_by) {
            needsRedraw = true;
        }
        if (typeof (context._showing_columns) === "undefined") {
            context._showing_columns = context.showColumns();
        } else if (context._showing_columns !== context.showColumns()) {
            needsRedraw = true;
        }
        if (typeof (context._showing_data) === "undefined") {
            context._showing_data = context.showData();
        } else if (context._showing_data !== context.showData()) {
            needsRedraw = true;
        }
        return needsRedraw;
    };

    ThemeEditor.prototype.widgetProperty = function (widget, propID, _) {
        if (_ === undefined) {
            return widget[propID]();
        }
        return widget[propID](_);
    };

    ThemeEditor.prototype.load = function(){};

    ThemeEditor.prototype.save = function(){};

    ThemeEditor.prototype.needsPropTableRedraw = function (domNode, element) {
        var ret = document.getElementById("te-themeEditorOptions") === null;
        return ret;
    };

    ThemeEditor.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        if (tableNeedsRedraw(this)) {
            element.selectAll("#" + this._id + " > table").remove();
        }
        this._current_grouping = this.paramGrouping();
        this._widgetObjsById[this._id] = this;
        this._sharedProperties = this.findSharedProperties(this.data());

        var needsPropertiesTableRedraw = this.needsPropTableRedraw();
        if(needsPropertiesTableRedraw && this.showSettings()){
            var teParams = Persist.discover(this);
            for(var i in teParams){
                if(teParams[i].ext.tags.indexOf(this.editorComplexity()) !== -1){
                    var teParamVal = this[teParams[i].id]();
                    if(teParams[i].id === "loadedTheme" || teParams[i].id === "loadedSerial"){
                        teParams[i].inputID = "te-load-theme";
                    }
                    teParams[i].input = tableInputHtml(teParams[i],teParamVal,[this._id],this._id);
                } else {
                    delete teParams[i];
                }
            }
            domNode.innerHTML = this.propertiesTableHtml(teParams);
            var evt = document.createEvent("Events");
            evt.initEvent("TE Properties Ready", true, true);
            document.dispatchEvent(evt);
        }

        this.buildTableObjects(domNode,this._sharedProperties);

        this.initFunctionality(domNode);
    };

    ThemeEditor.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    ThemeEditor.prototype.click = function (d) {
    };

    ThemeEditor.prototype.propertiesTableHtml = function (editorParams) {
        var tableObj = {
            id:"te-themeEditorOptions",
            label:"Editor Options",
            rowArr: []
        };
        var modeTableObj = {
            id:"te-tableModeOptions",
            label:this.themeMode() ? "Save/Load Theme" : "Save/Load Serial",
            rowArr: []
        };
        for(var i in editorParams){
            if(this.themeMode()){
                if(editorParams[i].ext.tags.indexOf("Theme") === -1 && editorParams[i].ext.tags.indexOf("Serial") === -1){
                    tableObj.rowArr.push({
                        th:camelizeString(editorParams[i].id),
                        td:editorParams[i].input,
                        trClass:"propertyRow",
                    });
                }
                else if(editorParams[i].ext.tags.indexOf("Theme") !== -1){
                    modeTableObj.rowArr.push({
                        th:camelizeString(editorParams[i].id),
                        td:editorParams[i].input,
                        trClass:"propertyRow",
                    });
                }
            } else {
                if (editorParams[i].ext.tags.indexOf("Serial") === -1 && editorParams[i].ext.tags.indexOf("Theme") === -1){
                    tableObj.rowArr.push({
                        th:camelizeString(editorParams[i].id),
                        td:editorParams[i].input,
                        trClass:"propertyRow",
                    });
                }
                else if (editorParams[i].ext.tags.indexOf("Serial") !== -1){
                    modeTableObj.rowArr.push({
                        th:camelizeString(editorParams[i].id),
                        td:editorParams[i].input,
                        trClass:"propertyRow",
                    });
                }
            }

        }
        var html = "";
        if(tableObj.rowArr.length > 0){
            html += this.tableObjHtml(tableObj);
        }
        if(modeTableObj.rowArr.length > 0){
            html += this.tableObjHtml(modeTableObj);
        }
        return html;
    };
    ThemeEditor.prototype.buildTableObjects = function(targetElement, propObjs){
        var sectionObjs = {};
        if(this.themeMode()){
            sectionObjs = {
                "chartColorSection":{
                    id:"te-colorOptions",
                    label:"Chart Colors",
                    rowObjArr: []
                },
                "surfaceSection":{
                    id:"te-containerOptions",
                    label:"Container Styles/Colors",
                    rowObjArr: []
                },
                "fontSection":{
                    id:"te-fontOptions",
                    label:"Font Styles/Colors",
                    rowObjArr: []
                }
            };
        } else {
            sectionObjs = {
                "nonSurfaceSection":{
                    id:"te-chartOptions",
                    label:"Chart Properties",
                    rowObjArr: []
                }
            };
        }
        for(var p in propObjs){
            if(this.themeMode()){
                if(p.toUpperCase().indexOf("FONT") !== -1 && !(propObjs[p].arr[0].widget._class.indexOf("layout_Surface") !== -1 && p.toUpperCase().indexOf("COLOR") !== -1)){
                    sectionObjs["fontSection"].rowObjArr.push(propObjs[p]);
                }
                else if(p === "paletteID"){
                    sectionObjs["chartColorSection"].rowObjArr.push(propObjs[p]);
                }
                else if(propObjs[p].arr[0].widget._class.indexOf("layout_Surface") !== -1){
                    sectionObjs["surfaceSection"].rowObjArr.push(propObjs[p]);
                }
            } else {
                if(propObjs[p].arr[0].widget._class.indexOf("layout_Surface") === -1){
                    sectionObjs["nonSurfaceSection"].rowObjArr.push(propObjs[p]);
                }
            }
        }
        var html = "";
        for(var i in sectionObjs){
            html += this.sharedPropertyTableHtml(sectionObjs[i]);
        }
        targetElement.innerHTML += html;
    };

    ThemeEditor.prototype.initFunctionality = function(elm){
        var context = this;
        _expandCollapse(elm);
        _inputOnChange(elm);
        _inputOnClick(elm);
        function _inputOnClick(elm){
            if(context.showSettings()){
                var saveBtn = document.getElementById("te-save-button");
                saveBtn.onclick = function(e){
                    var clickedElm = e.srcElement;
                    var themeName = clickedElm.previousSibling.value;
                    if(themeName.length > 1){
                        var loadSelect = document.getElementById("te-load-theme");
                        var loadOptions = loadSelect.getElementsByTagName("option");
                        var saveExists = false;
                        var saveStr;
                        for(var i in loadOptions){
                            var val = loadOptions[i].value;
                            if(val === themeName){
                                saveExists = true;
                            }
                        }
                        if(!saveExists){
                            saveStr = context.save(themeName);
                            loadSelect.innerHTML += "<option value='" + themeName + "'>" + themeName + "</option>";
                        } else {
                            var overwrite = confirm("'" + themeName + "' already exists. Do you want to overwrite the existing save? ");
                            if (overwrite) {
                                saveStr = context.save(themeName);
                            }
                        }
                        clickedElm.previousSibling.value = "";
                        loadSelect.value = themeName;
                    } else {
                        alert("Save Name cannot be empty.");
                    }
                };
            }
        }
        function _inputOnChange(elm){
            var teInputs = elm.getElementsByClassName("te-input");
            for(var i in teInputs){
                if(isNaN(parseInt(i)))break;
                var inputElm = teInputs[i];
                var inputID = inputElm.getAttribute("id");
                if(inputID === "te-load-theme"){
                    inputElm.onchange = function (e){
                        var elm = e.srcElement;
                        context.load(elm.value);
                    };
                }
                else if(inputID !== null && inputID.indexOf("te-input-themeMode") !== -1){
                    inputElm.onchange = function (e){
                        var elm = e.srcElement;
                        context.themeMode(elm.checked);

                        var name = document.getElementById("te-load-theme");
                        var nameToLoad = name !== null ? name.value : "Default";
                        context.load(nameToLoad);
                    };
                }
                else if(inputElm.tagName === "INPUT" || inputElm.tagName === "SELECT" || inputElm.tagName === "TEXTAREA"){
                    inputElm.onchange = function(e){
                        var elm = e.srcElement;

                        var id = elm.getAttribute("id");

                        if (elm.className.split(" ").indexOf("te-html-color-button") !== -1){
                            id = elm.previousSibling.getAttribute("id");
                            elm.previousSibling.value = elm.value;
                        }
                        var elmType = elm.getAttribute("type");
                        var splitId = id.split("-");
                        var genericId = splitId.slice(0,splitId.length-1).join("-") + "-";

                        var widsStr = elm.getAttribute("data-wids");
                        var paramId = elm.getAttribute("data-paramid");
                        var widArr = widsStr.split(",");
                        widArr.forEach(function(wid){
                            var individualId = genericId + wid;
                            var indElm = document.getElementById(individualId);
                            if(elmType === "checkbox"){
                                indElm.checked = elm.checked;
                                context._widgetObjsById[wid][paramId](elm.checked);
                            }
                            else if (elm.getAttribute("data-type") === "array") {
                                indElm.value = elm.value;
                                try{
                                    context._widgetObjsById[wid][paramId](JSON.parse(elm.value));
                                }catch(e){}
                            }
                            else {
                                indElm.value = elm.value;
                                context._widgetObjsById[wid][paramId](elm.value);

                                if (indElm.className.split(" ").indexOf("te-html-color-input") !== -1){
                                    indElm.nextSibling.value = elm.value;
                                }
                                else if (indElm.className.split(" ").indexOf("te-html-color-button") !== -1) {
                                    indElm.previousSibling.value = elm.value;
                                }
                            }
                        });
                        context.data().forEach(function(d){
                            d.render();
                        });
                    };
                }
            }
        }
        function _expandCollapse(elm){
            var tableArr = elm.getElementsByClassName("te-section-table");
            for(var i in tableArr){
                if(typeof(tableArr[i].getElementsByTagName) === "function"){
                    var thead = tableArr[i].getElementsByTagName("thead");
                    thead[0].onclick = function(e){
                        var elm = e.toElement;
                        if(elm.tagName === "TH"){
                            elm = elm.parentElement.parentElement;
                        }
                        var parent = elm.parentElement;
                        var tbodyClass = "";
                        if(parent.className.split(" ").indexOf("expanded") === -1){
                            parent.className = "te-section-table expanded";
                            tbodyClass = "shown";
                        } else {
                            parent.className = "te-section-table collapsed";
                            tbodyClass = "hidden";
                        }
                        var tbody = parent.getElementsByTagName("tbody");
                        tbody[0].className = tbodyClass;
                    };
                }
            }
            var sharedRowArr = elm.getElementsByClassName("sharedPropertyRow");
            for(var n in sharedRowArr){
                if(typeof(sharedRowArr[n].getElementsByClassName) === "function"){
                    var label = sharedRowArr[n].getElementsByClassName("te-label");
                    label[0].onclick = function(e){
                        var elm = e.toElement;
                        var parent = elm.parentElement;
                        var subRowClass = "";
                        if(parent.className.split(" ").indexOf("expanded") === -1){
                            parent.className = "sharedPropertyRow expanded";
                            subRowClass = "shown";
                        } else {
                            parent.className = "sharedPropertyRow collapsed";
                            subRowClass = "hidden";
                        }
                        var nextSib = parent.nextSibling;
                        while(nextSib !== null){
                            if(nextSib.className.split(" ").indexOf("sharedPropertyRow") === -1){
                                nextSib.className = "propertyRow "+subRowClass;
                                nextSib = nextSib.nextSibling;
                            } else {
                                nextSib = null;
                            }
                        }
                    };
                }
            }
        }
    };
    ThemeEditor.prototype.sharedPropertyTableHtml = function(sectionObj){
        var tableObj = {
            id:sectionObj.id,
            label:sectionObj.label,
            rowArr: []
        };
        sectionObj.rowObjArr.forEach(function(rowObj){
            rowObj.arr.forEach(function(widgetObj,widgetIdx){
                if(widgetIdx === 0){
                    tableObj.rowArr.push({
                        th:_sharedPropertyLabel(rowObj),
                        td:_sharedPropertyInput(rowObj),
                        trClass:"sharedPropertyRow collapsed"
                    });
                }
                tableObj.rowArr.push({
                    th:_propertyLabel(widgetObj),
                    td:_propertyInput(rowObj,widgetIdx),
                    trClass:"propertyRow hidden"
                });
            });
        });

        return this.tableObjHtml(tableObj);

        function _propertyLabel(widgetObj){
            var splitClass = widgetObj.widget.classID().split("_");
            var displayClass = splitClass.join("/");
            return displayClass + " <i>[" + widgetObj.widget._id + "]</i>";
        }
        function _sharedPropertyLabel(rowObj){
            return camelizeString(rowObj.id);
        }

        function _propertyInput(rowObj,idx){
            var value = _value(rowObj,idx);
            var html = tableInputHtml(rowObj,value,[rowObj.arr[idx]],rowObj.arr[idx].widget._id);
            return html;

            function _value(rowObj,idx){
                var value = rowObj.arr[idx].widget[rowObj.id]();
                return value !== null ? value : "";
            }
        }
        function _sharedPropertyInput(rowObj){
            var value = _sharedValue(rowObj);
            var html = tableInputHtml(rowObj,value,rowObj.arr,"shared");
            return html;

            function _sharedValue(rowObj){
                var value = rowObj.arr[0].widget[rowObj.id]();
                rowObj.arr.forEach(function(w,i){
                    if(value !== w.widget[w.id]()){
                        return "";
                    }
                });
                if(value !== null){
                    if(rowObj.type === "array"){
                        return JSON.stringify(value);
                    }
                    return value;
                }
                return "";
            }
        }
    };

    function camelizeString(str) {
        var spacedText = str.split(/(?=[0-9A-Z])/).map(function(n){return n.length > 1 ? n+" " : n;}).join("");
        return spacedText.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    function tableInputHtml(rowObj,value,widgetArr,idSuffix){
        var inputHtml = "";
        var id = "te-input-"+rowObj.id+"-"+idSuffix;

        var inputType;
        if (typeof (rowObj.ext) !== "undefined" && typeof (rowObj.ext.inputType) !== "undefined") {
            inputType = rowObj.ext.inputType;
        }

        if(typeof(rowObj.inputID) !== "undefined"){
            id = rowObj.inputID;
        }

        var dataWIDs = "data-paramid='" + rowObj.id + "' data-wids='" + widgetArr.map(function (w) {
            if(typeof(w.widget) === "object") {
                return w.widget._id;
            } else {
                return w;
            }
        }).join(",") + "'";
        switch(rowObj.type) {
            case "boolean":
                var checked = value ? " checked" : "";
                inputHtml = "<input id='" + id + "' " + dataWIDs + " type='checkbox' class='te-checkbox te-input'" + checked + ">" ;                break;
            case "number":
                if (typeof (inputType) !== "undefined") {
                    if (inputType === "textarea") {
                        inputHtml = "<textarea id='" + id +"' class='te-textarea te-input' " + dataWIDs + ">" + value + "</textarea>";
                    }
                    else if (inputType === "range") {
                        inputHtml = "<input id='" + id +"' class='te-input' type='range' " + dataWIDs + " value='" + value + "'  min='"+ rowObj.ext.min + "' max='" + rowObj.ext.max + "' step='" + rowObj.ext.step + "'>";
                    }
                }
                else {
                    inputHtml = "<input id='" + id +"' type='text' class='te-text te-input' " + dataWIDs + " value='" + value + "'>";
                }
                break;
            case "string":
                if (typeof (inputType) !== "undefined") {
                    if (inputType === "textarea") {
                        inputHtml = "<textarea id='" + id + "' class='te-textarea te-input' "+ dataWIDs + ">" + value + "</textarea>";
                    }
                }
                else {
                    inputHtml = "<input id='" + id + "' type='text' class='te-text te-input' value='" + value + "' " + dataWIDs + ">";
                }
                break;
            case "html-color":
                var valueAttr = value === "" ? "" : " value='" + value + "'";
                inputHtml = "<input id='" + id +"' type='text' class='te-html-color-input te-input' " + dataWIDs + " " + valueAttr + ">";
                inputHtml += "<input type='color' class='te-html-color-button te-input' " + dataWIDs + " " + valueAttr + ">";
                break;
            case "set":
                var options = _options(rowObj,value);
                inputHtml = "<select id='" + id + "' class='te-select te-input'" + dataWIDs + ">" + options + "</select>";
                break;
            case "array":
                inputHtml = "<textarea id='" + id + "' class='te-textarea te-input' data-type='array' " + dataWIDs + ">" + value + "</textarea>";
                break;
            default:
                break;
        }
        if(typeof(rowObj.ext.saveButton) !== "undefined"){
            inputHtml += "<button id='" + rowObj.ext.saveButtonID +"'>" + rowObj.ext.saveButton +"</button>";
        }
        return inputHtml;

        function _options(obj,val) {
            var options = "";
            obj.set.forEach(function(s){
                var selected = s === val ? " selected" : "";
                options += "<option value='" + s + "'" + selected + ">" + s + "</option>";
            });
            return options;
        }
    }

    ThemeEditor.prototype.tableObjHtml = function (tableObj) {
        var html = "<table id='" + tableObj.id + "' class='te-section-table expanded'>";
            html += "<thead><tr><th colspan='2'>" + tableObj.label + "</th></tr></thead>";
            html += "<tbody>";
                tableObj.rowArr.forEach(function(rowObj){
                    html += this.tableRowObjHtml(rowObj);
                },this);
            html += "</tbody>";
        return html + "</table>";
    };
    ThemeEditor.prototype.tableRowObjHtml = function (rowObj) {
        var html = typeof (rowObj.trClass) !== "undefined" ? "<tr class='" + rowObj.trClass +"'>" : "<tr>";
            html += "<th class='te-label'>" + rowObj.th + "</th>";
            html += "<td>" + rowObj.td + "</td>";
        return html + "</tr>";
    };

    ThemeEditor.prototype.setWidgetObjsById = function (widgetProp) {
        var context = this;
        var val = widgetProp.widget[widgetProp.id]();
        if(widgetProp.type === "widgetArray") {
            val.forEach(function(widget){
                context._widgetObjsById[widget._id] = widget;
            });
        }
        else if(widgetProp.type === "widget" && val !== null) {
            this._widgetObjsById[val._id] = val;
        }
    };
    ThemeEditor.prototype.checkTagFilter = function (tagArr) {
        var allowTags = ["Basic"];
        var ret = false;
        tagArr.forEach(function(tag){
            if(allowTags.indexOf(tag) !== -1){
                ret = true;
            }
        });
        return ret;
    };
    ThemeEditor.prototype.findSharedProperties = function (data) {
        var context = this;
        var propsByID;
        if (typeof (data) !== "undefined" && data.length > 0) {
            var allProps = [];
            propsByID = {};
            var surfacePropsByID = {};
            var nonSurfacePropsByID = {};
            data.forEach(function (widget) {
                var gpResponse = _getParams(widget, 0);
                allProps = allProps.concat(gpResponse);
            });
            allProps.forEach(function (prop) {
                if (["widget", "widgetArray"].indexOf(prop.type) !== -1) {
                    context.setWidgetObjsById(prop);
                } else if (context.checkTagFilter(prop.ext.tags)) {
                    var tempIdx = prop.id;
                    if(prop.widget._class.indexOf("Surface") !== -1){
                        if (typeof (surfacePropsByID[tempIdx]) === "undefined") {
                            surfacePropsByID[tempIdx] = { arr: [] };
                        }
                        surfacePropsByID[tempIdx].id = prop.id;
                        surfacePropsByID[tempIdx].description = prop.description;
                        surfacePropsByID[tempIdx].type = prop.type;
                        surfacePropsByID[tempIdx].set = prop.set;
                        surfacePropsByID[tempIdx].ext = prop.ext;
                        surfacePropsByID[tempIdx].arr.push(prop);
                    } else {
                        if (typeof (nonSurfacePropsByID[tempIdx]) === "undefined") {
                            nonSurfacePropsByID[tempIdx] = { arr: [] };
                        }
                        nonSurfacePropsByID[tempIdx].id = prop.id;
                        nonSurfacePropsByID[tempIdx].description = prop.description;
                        nonSurfacePropsByID[tempIdx].type = prop.type;
                        nonSurfacePropsByID[tempIdx].set = prop.set;
                        nonSurfacePropsByID[tempIdx].ext = prop.ext;
                        nonSurfacePropsByID[tempIdx].arr.push(prop);
                    }
                    if (typeof (propsByID[tempIdx]) === "undefined") {
                        propsByID[tempIdx] = { arr: [] };
                    }
                    propsByID[tempIdx].id = prop.id;
                    propsByID[tempIdx].description = prop.description;
                    propsByID[tempIdx].type = prop.type;
                    propsByID[tempIdx].set = prop.set;
                    propsByID[tempIdx].ext = prop.ext;
                    propsByID[tempIdx].arr.push(prop);
                }
            });
        }
        return propsByID;

        function _getParams(widgetObj, depth) {
            var retArr = [];
            if(widgetObj !== null){
                var paramArr = Persist.discover(widgetObj);
                paramArr.forEach(function (param, i1) {
                    if(typeof(param.ext.tags) !== "undefined"){
                        retArr.push({
                            id: param.id,
                            type: param.type,
                            description: param.description,
                            set: param.set,
                            ext: param.ext,
                            widget: widgetObj
                        });
                    }
                    if (param.type === "widgetArray") {
                        var childWidgetArray = context.widgetProperty(widgetObj, param.id);
                        childWidgetArray.forEach(function (childWidget) {
                            var cwArr = _getParams(childWidget, depth + 1);
                            retArr = retArr.concat(cwArr);
                        });
                    }
                    else if (param.type === "widget") {
                        var childWidget = context.widgetProperty(widgetObj, param.id);
                        var temp = _getParams(childWidget, depth + 1);
                        retArr = retArr.concat(temp);
                    }
                });
            }
            return retArr;
        }
    };

    return ThemeEditor;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/WordCloud.js',["d3", "../common/SVGWidget", "./IWordCloud", "d3-cloud", "css!./WordCloud"], factory);
    } else {
        root.other_WordCloud = factory(root.d3, root.common_SVGWidget, root.other_IWordCloud, root.d3.layout.cloud);
    }
}(this, function (d3, SVGWidget, IWordCloud, D3Cloud) {
    function WordCloud() {
        SVGWidget.call(this);
        IWordCloud.call(this);
    }
    WordCloud.prototype = Object.create(SVGWidget.prototype);
    WordCloud.prototype.constructor = WordCloud;
    WordCloud.prototype._class += " other_WordCloud";
    WordCloud.prototype.implements(IWordCloud.prototype);

    WordCloud.prototype.publish("padding", 1, "number", "Padding",null,{tags:["Intermediate"]});
    WordCloud.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic"]});
    WordCloud.prototype.publish("fontSizeFrom", 6, "number", "Font Size From",null,{tags:["Basic"]});
    WordCloud.prototype.publish("fontSizeTo", 24, "number", "Font Size To",null,{tags:["Basic"]});
    WordCloud.prototype.publish("angleFrom", -60, "number", "Angle From",null,{tags:["Basic"]});
    WordCloud.prototype.publish("angleTo", 60, "number", "Angle To",null,{tags:["Basic"]});
    WordCloud.prototype.publish("angleCount", 5, "number", "Angle Count",null,{tags:["Basic"]});

    WordCloud.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._vizData = _.map(function (row) {
                var retVal = {};
                for (var key in row) {
                    retVal["__viz_" + key] = row[key];
                }
                return retVal;
            });
        }
        return retVal;
    };

    WordCloud.prototype.enter = function (domNode, element) {
        this.cloud = new D3Cloud()
            .font(this.fontFamily())
            .padding(this.padding())
        ;
        this.zoomListener = d3.behavior.zoom()
            .scaleExtent([1, 10])
            .on("zoom", function () {
                element.attr("transform", "translate(" + d3.event.translate[0] + "," + d3.event.translate[1] + ")" + "scale(" + d3.event.scale + ")");
            })
        ;
        this._parentElement.call(this.zoomListener);
    };

    WordCloud.prototype.update = function (domNode, element) {
        var context = this;
        var extent = d3.extent(this._vizData, function (d) {
            return d.__viz_1;
        });
        var scale = d3.scale.log().domain(extent).range([this.fontSizeFrom(), this.fontSizeTo()]);

        var angleDomain = d3.scale.linear().domain([0, context.angleCount() - 1]).range([context.angleFrom(), context.angleTo()]);

        this.cloud
            .size([this.width(), this.height()])
            .words(this._vizData)
            .rotate(function () {
                return angleDomain(~~(Math.random() * context.angleCount()));
            })
            .fontSize(function (d) {
                return scale(d.__viz_1);
            })
            .on("end", draw)
            .start()
        ;

        function draw(data, bounds) {
            var fill = d3.scale.category20();
            var text = element.selectAll("text")
                .data(data, function (d) { return d.__viz_0 ? d.__viz_0.toLowerCase() : ""; })
            ;
            text.transition()
                .duration(1000)
                .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                .style("font-size", function (d) {
                    return scale(d.__viz_1) + "px";
                })
                .style("opacity", 1)
            ;
            text.enter().append("text")
                .attr("text-anchor", "middle")
                .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                .style("font-size", function(d) {
                    return scale(d.__viz_1) + "px";
                })
                .style("font-family", function (d) { return d.fontFamily; })
                .style("fill", function (d) { return fill(d.__viz_0 ? d.__viz_0.toLowerCase() : ""); })
                .text(function (d) { return d.__viz_0; })
                .on("click", function (d) {
                    context.click({label:  d.__viz_0, weight: d.__viz_1});
                })
                .style("opacity", 1e-6)
              .transition()
                .duration(1000)
                .style("opacity", 1)
            ;

            text.exit().transition().duration(1000)
                .style("opacity", 1e-4)
                .remove()
            ;

            if (bounds) {
                var w = context.width();
                var h = context.height();
                var dx = bounds[1].x - bounds[0].x,
                    dy = bounds[1].y - bounds[0].y,
                    borderScale = 0.9 / Math.max(dx / w, dy / h);
                
                element.transition().delay(1000).duration(750)
                    .attr("transform", "translate("+context._pos.x+","+context._pos.y+")scale(" + borderScale + ")")
                ;
                context.zoomListener.scale(borderScale).translate([context._pos.x,context._pos.y]);         
            }
        }
    };

    return WordCloud;
}));
