
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

        this._source = [];
        this._sections = {};
    }
    Audio.prototype = Object.create(HTMLWidget.prototype);
    Audio.prototype._class += " other_Audio";

    Audio.prototype.source = function (_) {
        if (!arguments.length) return this._source;
        this._source = _;
        return this;
    };

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
        var source = element.selectAll("source").data(this._source, function (d) { return d; });
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
        define('other/Bag',[], factory);
    } else {
        root.other_Bag = factory();
    }
}(this, function () {
    function SelectionBag() {
        this.items = {};
    }

    SelectionBag.prototype.clear = function () {
        for (var key in this.items) {
            this.items[key].element().classed("selected", false);
        }
        this.items = {};
    };

    SelectionBag.prototype.isEmpty = function() {
        for (var key in this.items) { // jshint ignore:line
            return false;
        }
        return true;
    };

    SelectionBag.prototype.append = function (item) {
        this.items[item._id] = item;
        item.element().classed("selected", true);
    };

    SelectionBag.prototype.remove = function (item) {
        this.items[item._id].element().classed("selected", false);
        delete this.items[item._id];
    };

    SelectionBag.prototype.isSelected = function(item) {
        return this.items[item._id];
    };

    SelectionBag.prototype.get = function () {
        var retVal = [];
        for (var key in this.items) {
            retVal.push(this.items[key]);
        }
        return retVal;
    };

    SelectionBag.prototype.set = function (itemArray) {
        this.clear();
        itemArray.forEach(function (item, idx) {
            this.append(item);
        }, this);
    };

    SelectionBag.prototype.click = function (item, d3Event) {
        if (d3Event.ctrlKey) {
            if (this.items[item._id]) {
                this.remove(item);
            } else {
                this.append(item);
            }
        } else {
            this.clear();
            this.append(item);
        }
    };

    return {
        Selection: SelectionBag,
        Navigation: null
    };
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Comms.js',[], factory);
    } else {
        root.other_Comms = factory();
    }
}(this, function () {
    function ESPUrl() {
        this._protocol = "http:";
        this._hostname = "localhost";
    }

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

    var exists = function (prop, scope) {
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
        var callbackName = 'jsonp_callback_' + Math.round(Math.random() * 999999);
        window[callbackName] = function (response) {
            respondedTimeout = 0;
            doCallback(response);
        };
        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'jsonp=' + callbackName + "&" + serialize(request);
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
            for (key in response) {
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
                    response = response[responseKey].Row;
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
                if (request[key] && request[key + "_changed"]) {
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

    //  HIPIEDatabomb  ---
    function HIPIEDatabomb() {
        HIPIEWorkunit.call(this);
    }
    HIPIEDatabomb.prototype = Object.create(HIPIEWorkunit.prototype);

    HIPIEDatabomb.prototype.databomb = function (_) {
        if (!arguments.length) return this._databomb;
        this._databomb = _;
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
        define('other/IWordCloud',[], factory);
    } else {
        root.other_IWordCloud = factory();
    }
}(this, function () {
    function IWordCloud() {
    }

    IWordCloud.prototype.testData = function () {
        this.columns(["Word", "Weight"]);
        var words = ["Myriel", "Napoleon", "Mlle.Baptistine", "Mme.Magloire", "CountessdeLo", "Geborand", "Champtercier", "Cravatte", "Count", "OldMan", "Labarre", "Valjean", "Marguerite", "Mme.deR", "Isabeau", "Gervais", "Tholomyes", "Listolier", "Fameuil", "Blacheville", "Favourite", "Dahlia", "Zephine", "Fantine", "Mme.Thenardier", "Thenardier", "Cosette", "Javert", "Fauchelevent", "Bamatabois", "Perpetue", "Simplice", "Scaufflaire", "Woman1", "Judge", "Champmathieu", "Brevet", "Chenildieu", "Cochepaille", "Pontmercy", "Boulatruelle", "Eponine", "Anzelma", "Woman2", "MotherInnocent", "Gribier", "Jondrette", "Mme.Burgon", "Gavroche", "Gillenormand", "Magnon", "Mlle.Gillenormand", "Mme.Pontmercy", "Mlle.Vaubois", "Lt.Gillenormand", "Marius", "BaronessT", "Mabeuf", "Enjolras", "Combeferre", "Prouvaire", "Feuilly", "Courfeyrac", "Bahorel", "Bossuet", "Joly", "Grantaire", "MotherPlutarch", "Gueulemer", "Babet", "Claquesous", "Montparnasse", "Toussaint", "Child1", "Child2", "Brujon", "Mme.Hucheloup"].map(function (d) {
            return [ d, 10 + Math.random() * 14 ];
        });
        this.data(words);
        return this;
    };

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
        define('other/MorphText.js',["../common/SVGWidget", "css!./MorphText"], factory);
    } else {
        root.other_MorphText = factory(root.common_SVGWidget);
    }
}(this, function (SVGWidget) {
    function MorphText() {
        SVGWidget.call(this);

        this._text = "";
        this._anchor = "middle";
        this._reverse = false;
    }
    MorphText.prototype = Object.create(SVGWidget.prototype);
    MorphText.prototype._class += " other_MorphText";

    MorphText.prototype.text = function (_) {
        if (!arguments.length) return this._text;
        this._text = _;

        var usedChars = {};
        var chars = this._text.split("");
        this.data(chars.map(function(d) {
            var id = "_" + d;
            if (usedChars[id] === undefined) {
                usedChars[id] = 0;
            }
            usedChars[id]++;
            return {text: d, id: d.charCodeAt(0) + (1024 * usedChars[id])};
        }));

        return this;
    };

    MorphText.prototype.anchor = function (_) {
        if (!arguments.length) return this._anchor;
        this._anchor = _;
        return this;
    };

    MorphText.prototype.fontSize = function (_) {
        if (!arguments.length) return this._fontSize;
        this._fontSize = _;
        return this;
    };

    MorphText.prototype.reverse = function (_) {
        if (!arguments.length) return this._reverse;
        this._reverse = _;
        return this;
    };

    MorphText.prototype.enter = function (domNode, element) {
        if (!this._fontSize) {
            var style = window.getComputedStyle(domNode, null);
            this._fontSize = parseInt(style.fontSize);
        }
        this._fontWidth = this._fontSize * 32 / 48;
        this._textElement = element.append("g")
        ;
    };

    MorphText.prototype.dateTime = function () {
        var d = new Date(),
            seconds = d.getSeconds().toString().length === 1 ? '0' + d.getSeconds() : d.getSeconds(),
            minutes = d.getMinutes().toString().length === 1 ? '0' + d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length === 1 ? '0' + d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ':' + seconds + ampm;
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
            .attr("x", function (d, i) { return (-context._data.length / 2 + i) * context._fontWidth + context._fontWidth / 2; })
        ;

        var newText = text.enter().append("text")
            .attr("class", "enter")
            .attr("font-size", this._fontSize)
            .attr("dy", ".35em")
            .attr("y", (this._reverse ? +1 : -1) * this._fontWidth * 2)
            .attr("x", function (d, i) { return (-context._data.length / 2 + i) * context._fontWidth + context._fontWidth / 2; })
            .style("fill-opacity", 1e-6)
            .style("text-anchor", this._anchor)
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
            .attr("y", (this._reverse ? -1 : +1) * this._fontWidth * 2)
            .style("fill-opacity", 1e-6)
            .remove()
        ;
    };

    return MorphText;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Paginator',["d3", "../common/HTMLWidget","css!./Paginator"], factory);
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
    Paginator.prototype._class += " other_Paginator";

    Paginator.prototype.publish("itemsPerPage", 2, "number", "Pagination items per page",null,{tags:['Private']});
    Paginator.prototype.publish("numItems", 10, "number", "Pagination total number of items",null,{tags:['Private']});
    Paginator.prototype.publish("pageNumber", 1, "number", "Pagination set or get the page number",null,{tags:['Private']});

    Paginator.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this.paginator = element.append("ul").attr("class","paginator pagination pagination-sm");
    };

    Paginator.prototype.update = function (domNode, element) {
        var context = this;
        this._tNumPages = Math.ceil(this.numItems() / this.itemsPerPage()) || 1;

        if (this.pageNumber() > this._tNumPages) { this.pageNumber(1); }

        this._numList = [];
        if (this.numItems()) {
            this._numList.push("previous");
            for (var i=0; i < this._tNumPages; i++) {
                this._numList.push(i+1);
            }
            this._numList.push("next");
        }

        var page = this.paginator.selectAll("li").data(this._numList,function(d) { return d; });
        page
            .enter()
            .append("li")
            .append("a")
            .attr("href", "#")
            .on('click', function(d, i) {
                d3.event.preventDefault();
                if (d==='next') {
                    if ((context.pageNumber()+1) <= context._tNumPages) {
                        var p = context.pageNumber()+1;
                        context.pageNumber(p);
                        context._onSelect(p,"next");
                    }
                } else if (d==='previous') {
                    if ((context.pageNumber() - 1) >= 1) {
                        var p2 = context.pageNumber()-1;
                        context.pageNumber(p2);
                        context._onSelect(p2, "previous");
                    }
                } else {
                    context.pageNumber(d);
                    context._onSelect(d);
                }
            })
        ;

        page.classed("active", function(e, j) { return j === context.pageNumber(); })
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
        define('other/Persist',["require"], factory);
    } else {
        root.other_Persist = factory(root.require);
    }
}(this, function (require) {
    return {
        discover: function (widget) {
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
        },

        serializeToObject: function (widget, properties, includeData) {
            var retVal = {
                __version: 3,
                __class: widget._class.split(" ").pop(),
                __id: widget._id,
                __properties: {}
            };
            if (properties && properties.length) {
                properties.forEach.forEach(function (item) {
                    if (widget[item.id + "_modified"]()) {
                        retVal.__properties[item] = widget[item]();
                    }
                });
            } else {
                this.discover(widget).forEach(function (item) {
                    if (widget[item.id + "_modified"]()) {
                        switch (item.type) {
                            case "widget":
                                retVal.__properties[item.id] = this.serializeToObject(widget[item.id](), null, includeData);
                                break;
                            case "widgetArray":
                                retVal.__properties[item.id] = [];
                                var widgetArray = widget[item.id]();
                                widgetArray.forEach(function (widget, idx) {
                                    retVal.__properties[item.id].push(this.serializeToObject(widget, null, includeData));
                                }, this);
                                break;
                            default:
                                retVal.__properties[item.id] = widget[item.id]();
                                break;
                        }
                    }
                }, this);
            }
            if (widget._class === "marshaller_Graph") {
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

        deserialize: function (state, callback) {
            var context = this;
            var path = "src/" + state.__class.split("_").join("/");
            require([path], function (Widget) {
                var widget = new Widget();
                if (state instanceof String) {
                    state = JSON.parse(state);
                }
                if (state.__id.indexOf("_w") !== 0) {
                    widget._id = state.__id;
                }
                var createCount = 0;
                for (var key in state.__properties) {
                    if (widget["__meta_" + key]) {
                        switch (widget["__meta_" + key].type) {
                            case "widget":
                                ++createCount;
                                context.deserialize(state.__properties[key], function (widgetItem) {
                                    widget[key](widgetItem);
                                    --createCount;
                                });
                                break;
                            case "widgetArray":
                                ++createCount;
                                var widgetStateArray = state.__properties[key];
                                var widgetArray = [];
                                widgetArray.length = widgetStateArray.length;
                                var arrayCreateCount = 0;
                                widgetStateArray.forEach(function (widgetState, idx) {
                                    ++arrayCreateCount;
                                    context.deserialize(widgetState, function (widgetItem) {
                                        widgetArray[idx] = widgetItem;
                                        --arrayCreateCount;
                                    });
                                    var arrayIntervalHandler = setInterval(function () {
                                        if (arrayCreateCount <= 0) {
                                            clearInterval(arrayIntervalHandler);
                                            arrayCreateCount = undefined;
                                            widget[key](widgetArray);
                                            --createCount;
                                        }
                                    }, 20);
                                });
                                break;
                            default:
                                widget[key](state.__properties[key]);
                                break;
                        }
                    }
                }
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
            });
        },

        create: function (state, callback) {
            if (typeof state === "string") {
                state = JSON.parse(state);
            }
            this.deserialize(state, callback);
        },

        clone: function (widget, callback) {
            this.create(this.serializeToObject(widget, [], true), callback);
        }
    };
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/PropertyEditor.js',["d3", "../common/Widget", "../common/HTMLWidget", "./Persist", "css!./PropertyEditor"], factory);
    } else {
        root.other_PropertyEditor = factory(root.d3, root.common_Widget, root.common_HTMLWidget, root.other_Persist);
    }
}(this, function (d3, Widget, HTMLWidget, Persist) {
    function PropertyEditor() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._columns = ["Key", "Value"];
        this._contentEditors = [];
        this._show_settings = true;
    }
    PropertyEditor.prototype = Object.create(HTMLWidget.prototype);
    PropertyEditor.prototype._class += " other_PropertyEditor";

    PropertyEditor.prototype.publish("themeMode", false, "boolean", "Edit default values",null,{tags:['Basic','TODO2']});
    PropertyEditor.prototype.publish("showColumns", true, "boolean", "Show Columns",null,{tags:['Intermediate','TODO2']});
    PropertyEditor.prototype.publish("showData", true, "boolean", "Show Data",null,{tags:['Intermediate','TODO2']});
    PropertyEditor.prototype.publish("shareCountMin", 2, "number", "Share Count Min",null,{tags:['Basic','TODO2']});
    PropertyEditor.prototype.publish("paramGrouping", "By Widget", "set", "Param Grouping", ["By Param", "By Widget"],{tags:['Basic','TODO2']});
    PropertyEditor.prototype.publish("sectionTitle", "", "string", "Section Title",null,{tags:['Private','TODO2']});
    PropertyEditor.prototype.publish("collapsibleSections", true, "boolean", "Collapsible Sections",null,{tags:['Basic','TODO2']});

    PropertyEditor.prototype.show_settings = function (_) {
        if (!arguments.length) {
            return this._show_settings;
        }
        this._show_settings = _;
        return this;
    };
    var formatJSRequire = function (widget, fieldName, properties, renderCallback, postCreate) {
        if (!widget) {
            return "";
        }
        var classParts = widget._class.split("_");
        var path = "src/" + classParts.join("/");
        var label = classParts[classParts.length - 1];
        var propertiesString = properties.split("\n").map(function (item) {
            return item.length ? "        " + item : "";
        }).join("\n");
        propertiesString += propertiesString.length ? "\n" : "";

        postCreate += postCreate.length ? "\n" : "";
        return "require([\"" + path + "\"], function(" + label + ") {\n" +
        "    var " + fieldName + " = new " + label + "()\n" +
        "        .target(\"divID\")\n" +
        propertiesString +
        "        .render(" + renderCallback.split("\n").join("\n        ") + ")\n" +
        "    ;\n" +
        postCreate +
        "});";
    };

    var formatJSCallback = function (innerProp, properties, renderCallback) {
        var propertiesString = properties.split("\n").map(function (item) {
            return item.length ? "        " + item : "";
        }).join("\n");
        propertiesString += propertiesString.length ? "\n" : "";
        return "function(widget) {\n" +
        "    widget." + innerProp + "\n" +
        propertiesString +
        "        .render(" + renderCallback + ")\n" +
        "    ;\n" +
        "}";
    };

    var formatJSProperties = function (widget, includeColumns, includeData) {
        if (!widget) {
            return "";
        }
        var context = this;
        var propsStr = Persist.discover(this.theme_mode() ? Object.getPrototypeOf(widget) : widget).map(function (prop) {
            if (!context.widgetPropertyModified(widget, prop.id)) {
                return "";
            }
            return "." + prop.id + "(" + JSON.stringify(context.widgetProperty(widget, prop.id)) + ")";
        }).filter(function (str) {
            return str !== "";
        }).join("\n");
        if (includeColumns) {
            var columns = widget.columns();
            if (columns instanceof Array) {
                if (columns.length) {
                    propsStr += (propsStr.length ? "\n" : "");
                    propsStr += ".columns(" + JSON.stringify(columns) + ")";
                }
            } else if (columns) {
                propsStr += (propsStr.length ? "\n" : "");
                propsStr += ".columns(" + JSON.stringify(columns) + ")";
            }
        }
        if (includeData) {
            var data = widget.data();
            if (data instanceof Array) {
                if (data.length) {
                    propsStr += (propsStr.length ? "\n" : "");
                    propsStr += ".data(" + JSON.stringify(data) + ")";
                }
            } else if (data) {
                propsStr += (propsStr.length ? "\n" : "");
                try {
                    propsStr += ".data(" + JSON.stringify(data) + ")";
                } catch (e) {
                    propsStr += ".data(" + e + ")";
                }
            }
        }
        return propsStr;
    };

    PropertyEditor.prototype.getJavaScript = function (fieldName, includeColumns, includeData, postCreate) {
        postCreate = postCreate || "";
        var callbackJS = "";
        if (this._data._content) {
            callbackJS = formatJSCallback("_content", formatJSProperties(this._data._content, includeColumns, includeData), "");
        }
        return formatJSRequire(this._data, fieldName, formatJSProperties(this._data, includeColumns, includeData), callbackJS, postCreate);
    };

    PropertyEditor.prototype.getPersistString = function (fieldName) {
        return "var " + fieldName + " = " + JSON.stringify(Persist.serializeToObject(this._data, null, false), null, "  ") + ";";
    };

    PropertyEditor.prototype.onChange = function (widget, propID) {
    };

    PropertyEditor.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "auto");
    };
    
    PropertyEditor.prototype.findSharedProperties = function (data, themeMode) {
        var propsByID = {};

        if (typeof (data) !== 'undefined' && data.length > 0) {
            var allProps = [];
            data.forEach(function (widget) {
                var gpResponse = this._getParams(themeMode ? Object.getPrototypeOf(widget) : widget, 0);
                allProps = allProps.concat(gpResponse);
            }, this);
            allProps.forEach(function (prop) {
                if (['widget', 'widgetArray'].indexOf(prop.type) === -1) {
                    var tempIdx = prop.id + '_' + prop.description;
                    if (typeof (propsByID[tempIdx]) === 'undefined') {
                        propsByID[tempIdx] = { arr: [] };
                    }
                    propsByID[tempIdx].id = prop.id;
                    propsByID[tempIdx].description = prop.description;
                    propsByID[tempIdx].type = prop.type;
                    propsByID[tempIdx].set = prop.set;
                    propsByID[tempIdx].arr.push(prop);
                }
            });
        }
        return propsByID;
    };

    PropertyEditor.prototype._getParams = function(widgetObj, depth) {
        var retArr = [];
        var paramArr = Persist.discover(widgetObj);
        paramArr.forEach(function (param, i1) {
            retArr.push({
                id: param.id,
                type: param.type,
                description: param.description,
                set: param.set,
                widget: widgetObj
            });
            if (param.type === "widgetArray") {
                var childWidgetArray = this.widgetProperty(widgetObj, param.id);
                childWidgetArray.forEach(function (childWidget) {
                    var cwArr = this._getParams(childWidget, depth + 1);
                    retArr = retArr.concat(cwArr);
                }, this);
            }
            else if (param.type === "widget") {
                var childWidget = this.widgetProperty(widgetObj, param.id);
                var temp = this._getParams(childWidget, depth + 1);
                retArr = retArr.concat(temp);
            }
        }, this);
        return retArr;
    };
    var tableNeedsRedraw = function (context) {
        var needsRedraw = false;
        if (typeof (context._current_grouping) === 'undefined') {
            context._current_grouping = context._group_params_by;
        } else if (context._current_grouping !== context._group_params_by) {
            needsRedraw = true;
        }
        if (typeof (context._showing_columns) === 'undefined') {
            context._showing_columns = context.showColumns();
        } else if (context._showing_columns !== context.showColumns()) {
            needsRedraw = true;
        }
        if (typeof (context._showing_data) === 'undefined') {
            context._showing_data = context.showData();
        } else if (context._showing_data !== context.showData()) {
            needsRedraw = true;
        }
        if (typeof (context._showing_themeMode) === 'undefined') {
            context._showing_themeMode = context.themeMode();
        } else if (context._showing_themeMode !== context.themeMode()) {
            needsRedraw = true;
        }
        return needsRedraw;
    };
    PropertyEditor.prototype.widgetPropertyModified = function (widget, propID) {
        return !this.themeMode() || this === widget ? widget[propID + "_modified"]() : Object.getPrototypeOf(widget)[propID + "_modified"]();
    };
    PropertyEditor.prototype.widgetProperty = function (widget, propID, _) {
        if (_ === undefined) {
            return !this.themeMode() || this === widget ? widget[propID]() : Object.getPrototypeOf(widget)[propID]();
        }
        return !this.themeMode() || this === widget ? widget[propID](_) : Object.getPrototypeOf(widget)[propID](_);
    };

    PropertyEditor.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        if (tableNeedsRedraw(this)) {
            element.selectAll("#" + this._id + " > table").remove();
        }
        this._current_grouping = this.paramGrouping();
        if (this._show_settings) {
            //Display table containing PropertyEditor settings
            var editorTable = element.selectAll("#" + this._id + " > div").data([this], function (d) {
                return d._id;
            });
            editorTable.enter().append("div").each(function (widget) {
                new PropertyEditor()
                    .showColumns(false)
                    .showData(false)
                    .show_settings(false)
                    .paramGrouping('By Widget')
                    .sectionTitle('Property Editor Settings')
                    .target(d3.select(this).node())
                    .data([widget])
                    .render()
                ;
            });
        }
        //Update tables based on "group by" setting
        if (this.paramGrouping() === "By Param") {
            var sharedPropsMainSections = [];
            var sPropSections = [];
            if (this._data.length > 0) {
                sharedPropsMainSections.push(this.findSharedProperties(this._data, this.themeMode()));
                for (var k1 in sharedPropsMainSections) {
                    var sectionArr = [];
                    for (var k2 in sharedPropsMainSections[k1]) {
                        var widgetArr = [];
                        sharedPropsMainSections[k1][k2].arr.forEach(function (n) {
                            widgetArr.push(n.widget);
                        });
                        if (this.shareCountMin() <= widgetArr.length || widgetArr[0]._class.indexOf('PropertyEditor') !== -1) {
                            sectionArr.push({
                                rowType: 'shared',
                                widgetArr: widgetArr,
                                id: sharedPropsMainSections[k1][k2].id,
                                description: sharedPropsMainSections[k1][k2].description,
                                type: sharedPropsMainSections[k1][k2].type,
                                set: sharedPropsMainSections[k1][k2].set
                            });
                            sharedPropsMainSections[k1][k2].arr.forEach(function (widgetNode) {
                                sectionArr.push({
                                    rowType: 'individual',
                                    widgetArr: [widgetNode.widget],
                                    id: sharedPropsMainSections[k1][k2].id,
                                    description: sharedPropsMainSections[k1][k2].description,
                                    type: sharedPropsMainSections[k1][k2].type,
                                    set: sharedPropsMainSections[k1][k2].set
                                });
                            });
                        }
                    }
                    sPropSections.push(sectionArr);
                }
            }
        }
        //Creating Table and THEAD
        var table = null;
        if (true) {
            table = element.selectAll("#" + this._id + " > table").data(this._data, function (d) {
                return d._id;
            });
            table.enter().append("table")
                .each(function (widget) {
                    var element = d3.select(this);
                    var thead = element.append("thead");
                    if (context.collapsibleSections()) {
                        thead.attr("class", "mm-label max").on("click", function () {
                            var elm = d3.select(this);
                            if (elm.classed("min")) {
                                elm.classed("max", true);
                                elm.classed("min", false);
                            } else {
                                elm.classed("max", false);
                                elm.classed("min", true);
                            }
                        });
                    }

                    thead.append("tr").append("th").attr("colspan", context._columns.length).attr("class", "th-widget-class").text(function () {
                        var text = '';
                        if (context.sectionTitle()) {
                            text = context.sectionTitle();
                        } else {
                            var splitClass = widget._class.split('_');
                            if (splitClass.length > 1) {
                                text = "Widget: " + splitClass[splitClass.length - 1];
                            } else {
                                text = "Widget: " + widget._class;
                            }
                        }
                        return text;
                    });
                    thead = thead.append("tr").attr("class", "mm-content");
                    element.append("tbody").attr("class", "mm-content");
                    var th = thead.selectAll("th").data(context._columns, function (d) {
                        return d;
                    });
                    th.enter()
                        .append("th")
                        .text(function (column) {
                            return column;
                        })
                    ;
                    th.exit().remove();
                })
            ;
        }
        //Creating TBODY
        if (true) {
            table.select("tbody").each(function (widget, widgetIdx) {
                var tbody = d3.select(this);
                var rows;
                //  Columns  ---
                var tr;
                var td;
                var input = null;
                if (context.showColumns()) {
                    tr = tbody.append("tr");
                    td = tr.append("td").text("Columns");
                    td = tr.append("td");
                    input = td.append("textarea")
                        .attr("rows", "4")
                        .attr("cols", "25")
                        .on("change", function () {
                            widget
                                .columns(JSON.parse(this.value))
                                .render(function () {
                                    context.onChange(widget, "columns");
                                })
                            ;
                        })
                    ;
                    input.node().value = JSON.stringify(widget._columns);
                }
                //  Data  ---

                if (context.showData()) {
                    tr = tbody.append("tr");
                    td = tr.append("td")
                        .text("Data")
                    ;
                    td = tr.append("td");
                    input = td.append("textarea")
                        .attr("rows", "4")
                        .attr("cols", "25")
                        .on("change", function () {
                            widget
                                .data(JSON.parse(this.value))
                                .render(function () {
                                    context.onChange("data");
                                })
                            ;
                        })
                    ;
                    try {
                        input.node().value = JSON.stringify(widget._data);
                    } catch (e) {
                        input.node().value = e;
                    }
                }
                //Updating TR 'By Param'
                if (context.paramGrouping() === "By Param") {
                    rows = tbody.selectAll(".tr_" + widget._id).data(sPropSections[widgetIdx]);
                    rows.enter().append("tr").each(function (d) {
                        var tr = d3.select(this);
                        var rowClass = "propertyRow";
                        if (d.rowType === 'shared') {
                            rowClass = "sharedPropertyRow";
                        }
                        else if (d.rowType === 'individual') {
                            this.hidden = true;
                        }
                        tr.attr("class", "tr_" + widget._id + " " + rowClass);
                        tr.append("td").attr("class", "pe-label").html(function (sProp) {
                            var text = '';
                            switch (sProp.rowType) {
                                case 'shared':
                                    text = sProp.id;
                                    break;
                                case 'individual':
                                    var splitClass = sProp.widgetArr[0]._class.split('_');
                                    var displayClass = splitClass[splitClass.length - 1];
                                    text = displayClass + ' [' + sProp.widgetArr[0]._id + ']';
                                    break;
                            }
                            return text;
                        })
                        .on("click", function (sProp) {
                            var hidden, classList = this.className.split(' ');
                            if (classList.indexOf('expanded') === -1) {
                                hidden = false;
                                classList.push('expanded');
                                this.className = classList.join(' ');
                            } else {
                                hidden = true;
                                var newClassList = '';
                                classList.forEach(function (c) {
                                    if (c !== 'expanded') {
                                        newClassList += c;
                                    }
                                });
                                this.className = newClassList;
                            }
                            var childCount = sProp.widgetArr.length;
                            var childNode = this.parentNode.nextSibling;
                            for (var i = 0; i < childCount; i++) {
                                childNode.hidden = hidden;
                                childNode = childNode.nextSibling;
                            }
                        });
                        //Setting the td.field content
                        tr.append("td").attr("class", "field").each(function () {
                            var td = d3.select(this);
                            var input = null;
                            switch (d.type) {
                                case "boolean":
                                    input = td.append("input")
                                        .attr("class", "input_" + widget._id)
                                        .attr("type", "checkbox")
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, that.checked).render(function (w) {
                                                    context.onChange(w, d.id);
                                                    context.render();
                                                });
                                            });
                                        })
                                    ;
                                    break;
                                case "number":
                                    if (typeof (d.ext) !== 'undefined' && typeof (d.ext.inputType) !== 'undefined') {
                                        if (d.ext.inputType === "textarea") {
                                            input = td.append('textarea');
                                        }
                                        else if (d.ext.inputType === 'range') {
                                            input = td.append('input')
                                                .attr('type', 'range')
                                                .attr('min', d.ext.min)
                                                .attr('max', d.ext.max)
                                                .attr('step', d.ext.step)
                                            ;
                                        }
                                    }
                                    if (typeof (input) === 'undefined' || input === null) {
                                        input = td.append('input');
                                    }
                                    input.attr("class", "input_" + widget._id)
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, that.value);
                                            });
                                            widget.render();
                                        });
                                    break;
                                case "string":
                                    if (typeof (d.ext) !== 'undefined' && typeof (d.ext.inputType) !== 'undefined') {
                                        if (d.ext.inputType === "textarea") {
                                            input = td.append('textarea');
                                        }
                                    }
                                    if (typeof (input) === 'undefined' || input === null) {
                                        input = td.append('input');
                                    }
                                    input.attr("class", "input_" + widget._id)
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, that.value);
                                            });
                                            widget.render();
                                        })
                                    ;
                                    break;
                                case "html-color":
                                    input = td.append("input")
                                        .attr("class", "input_" + widget._id)
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, that.value).render(function (w) {
                                                    context.onChange(w, d.id);
                                                    context.render();
                                                });
                                            });
                                        })
                                    ;
                                    if (!context.isIE) {
                                        try {
                                            var colorInput = input;
                                            var inputColor = td.append("input")
                                                .attr("type", "color")
                                                .on("change", function () {
                                                    var node = colorInput.node();
                                                    node.value = this.value;
                                                    colorInput.on("change").apply(colorInput.node());
                                                })
                                            ;
                                            d.widgetArr.forEach(function (w) {
                                                inputColor.node().value = context.widgetProperty(w, d.id);
                                            });
                                        } catch (e) {
                                            inputColor.remove();
                                        }
                                    }
                                    break;
                                case "set":
                                    input = td.append("select")
                                        .attr("class", "input_" + widget._id)
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, that.value).render(function (w) {
                                                    context.onChange(w, d.id);
                                                    context.render();
                                                });
                                            });
                                        })
                                    ;
                                    d.set.forEach(function (item) {
                                        input.append("option")
                                            .attr("value", item)
                                            .text(item)
                                        ;
                                    });
                                    break;
                                case "array":
                                    input = td.append("textarea")
                                        .attr("class", "input_" + widget._id)
                                        .attr("rows", "4")
                                        .attr("cols", "25")
                                        .on("change", function () {
                                            var that = this;
                                            d.widgetArr.forEach(function (w) {
                                                context.widgetProperty(w, d.id, JSON.parse(that.value)).render(function (w) {
                                                    context.onChange(w, d.id);
                                                    context.render();
                                                });
                                            });
                                        })
                                    ;
                                    break;
                                default:
                                    break;
                            }
                        });
                    });
                    //Setting the td.pe-label html content
                    rows.selectAll('td.pe-label').each(function (sProp) {
                        var text = '';
                        switch (sProp.rowType) {
                            case 'shared':
                                text = sProp.id;
                                break;
                            case 'individual':
                                var displayClass = sProp.widgetArr[0]._class.split('_')[1];
                                text = displayClass + ' [' + sProp.widgetArr[0]._id + ']';
                                break;
                        }
                        this.innerHTML = text;
                    });
                    //Setting the state of the inputs
                    rows.select(".input_" + widget._id).each(function (sProp) {
                        var input = d3.select(this);
                        if (sProp.rowType === 'individual') {
                            sProp.widgetArr.forEach(function (w) {
                                switch (sProp.type) {
                                    case "boolean":
                                        input.node().checked = context.widgetProperty(w, sProp.id);
                                        break;
                                    case "html-color":
                                        input.node().value = context.widgetProperty(w, sProp.id);
                                        break;
                                    case "array":
                                        input.node().value = JSON.stringify(context.widgetProperty(w, sProp.id), null, "  ");
                                        break;
                                    case "widget":
                                        var innerWidget = context.widgetProperty(w, sProp.id);
                                        w["_propertyEditor_" + sProp.id]
                                            .data(innerWidget ? [innerWidget] : [])
                                            .render()
                                        ;
                                        break;
                                    case "widgetArray":
                                        w["_propertyEditor_" + sProp.id]
                                            .data(context.widgetProperty(sProp.widget, sProp.id))
                                            .render()
                                        ;
                                        break;
                                    case "number":
                                    case "string":
                                    case "set":
                                        /* falls through */
                                    default:
                                        input.node().value = context.widgetProperty(w, sProp.id);
                                        break;
                                }
                            });
                        }
                    });
                    //On Exit
                    rows.exit().each(function (d) {
                        var element = d3.select(this);
                        console.log("PropertyEditor exit:" + d._class + d._id);
                        switch (d.type) {
                            case "widget":
                                d.propertyEditor
                                    .target(null)
                                ;
                                break;
                            case "widgetArray":
                                element.html("");
                                break;
                        }
                    }).remove();
                } else if (context.paramGrouping() === "By Widget") {
                    //Updating TR 'By Widget'
                    rows = tbody.selectAll(".tr_" + widget._id).data(Persist.discover(context.themeMode() ? Object.getPrototypeOf(widget) : widget), function (d) {
                        return widget._id + "_" + d.id + "_" + d.type;
                    });
                    rows.enter().append("tr").each(function (d) {
                        var tr = d3.select(this);
                        tr.attr("class", "tr_" + widget._id);
                        tr.append("td").attr("class", "pe-label").text(function (d) {
                            return d.id;
                        });
                        var inputType = 'input';
                        if (typeof (d.ext) !== 'undefined' &&
                            typeof (d.ext.inputType) !== 'undefined' &&
                            d.ext.inputType === "textarea") {
                            inputType = 'textarea';
                        }
                        tr.append("td")
                            .attr("class", "field")
                            .each(function () {
                                var td = d3.select(this);
                                var input = null;
                                switch (d.type) {
                                    case "boolean":
                                        input = td.append(inputType)
                                            .attr("class", "input_" + widget._id)
                                            .attr("type", "checkbox")
                                            .on("change", function () {
                                                context.widgetProperty(widget, d.id, this.checked).render(function () {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                });
                                            })
                                        ;
                                        break;
                                    case "number":
                                    case "string":
                                        if (typeof (d.ext) !== 'undefined' && typeof (d.ext.inputType) !== 'undefined') {
                                            if (d.ext.inputType === "textarea") {
                                                input = td.append('textarea');
                                            }
                                            else if (d.type === 'number' && d.ext.inputType === 'range') {
                                                input = td.append('input')
                                                    .attr('type', 'range')
                                                    .attr('min', d.ext.min)
                                                    .attr('max', d.ext.max)
                                                    .attr('step', d.ext.step)
                                                ;
                                            }
                                        }
                                        if (input === null) {
                                            input = td.append('input');
                                        }
                                        input.attr("class", "input_" + widget._id)
                                            .on("change", function () {
                                                context.widgetProperty(widget, d.id, this.value).render(function (widget) {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                });
                                            })
                                        ;
                                        break;
                                    case "html-color":
                                        input = td.append("input")
                                            .attr("class", "input_" + widget._id)
                                            .on("change", function () {
                                                context.widgetProperty(widget, d.id, this.value).render(function (widget) {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                });
                                            })
                                        ;
                                        if (!context.isIE) {
                                            try {
                                                var colorInput = input;
                                                var inputColor = td.append("input")
                                                    .attr("type", "color")
                                                    .on("change", function () {
                                                        var node = colorInput.node();
                                                        node.value = this.value;
                                                        colorInput.on("change").apply(colorInput.node());
                                                    })
                                                ;
                                                inputColor.node().value = context.widgetProperty(widget, d.id);
                                            } catch (e) {
                                                inputColor.remove();
                                            }
                                        }
                                        break;
                                    case "set":
                                        input = td.append("select")
                                            .attr("class", "input_" + widget._id)
                                            .on("change", function () {
                                                context.widgetProperty(widget, d.id, this.value).render(function (widget) {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                });
                                            })
                                        ;
                                        d.set.forEach(function (item) {
                                            input.append("option")
                                                .attr("value", item)
                                                .text(item)
                                            ;
                                        });
                                        break;
                                    case "array":
                                        input = td.append("textarea")
                                            .attr("class", "input_" + widget._id)
                                            .attr("rows", "4")
                                            .attr("cols", "25")
                                            .on("change", function () {
                                                context.widgetProperty(widget, d.id, JSON.parse(this.value)).render(function () {
                                                    context.onChange(widget, d.id);
                                                    context.render();
                                                });
                                            })
                                        ;
                                        break;
                                    case "widget":
                                    case "widgetArray":
                                        input = td.append("div")
                                            .attr("class", "input_" + widget._id)
                                        ;
                                        widget["_propertyEditor_" + d.id] = new PropertyEditor()
                                            .paramGrouping('By Widget')
                                            .showColumns(context.showColumns())
                                            .showData(context.showData())
                                            .show_settings(false)
                                            .target(input.node())
                                        ;
                                        widget["_propertyEditor_" + d.id].onChange = function (widget, propID) {
                                            context.onChange(widget, propID);
                                            //  No render needed  ---
                                        };
                                        break;
                                    default:
                                        break;
                                }
                            })
                        ;
                    });
                    rows.select(".input_" + widget._id).each(function (d) {
                        var input = d3.select(this);
                        switch (d.type) {
                            case "boolean":
                                input.node().checked = context.widgetProperty(widget, d.id);
                                break;
                            case "html-color":
                                input.node().value = context.widgetProperty(widget, d.id);
                                break;
                            case "array":
                                input.node().value = JSON.stringify(context.widgetProperty(widget, d.id), null, "  ");
                                break;
                            case "widget":
                                var innerWidget = context.widgetProperty(widget, d.id);
                                widget["_propertyEditor_" + d.id].data(innerWidget ? [innerWidget] : []).render();
                                break;
                            case "widgetArray":
                                widget["_propertyEditor_" + d.id].data(context.widgetProperty(widget, d.id)).render();
                                break;
                            case "number":
                            case "string":
                            case "set":
                                /* falls through */
                            default:
                                input.node().value = context.widgetProperty(widget, d.id);
                                break;
                        }
                    });
                    rows.exit().each(function (d) {
                        var element = d3.select(this);
                        console.log("PropertyEditor exit:" + d._class + d._id);
                        switch (d.type) {
                            case "widget":
                                d.propertyEditor.target(null);
                                break;
                            case "widgetArray":
                                element.html("");
                                break;
                        }
                    }).remove();
                }
            });
        }
        table.exit().remove();
    };

    PropertyEditor.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    PropertyEditor.prototype.click = function (d) {
    };

    return PropertyEditor;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Table.js',["d3", "../common/HTMLWidget","../other/Paginator", "../other/Bag", "css!./Table"], factory);
    } else {
        root.other_Table = factory(root.d3, root.common_HTMLWidget, root.other_Paginator, root.other_Bag);
    }
}(this, function (d3, HTMLWidget, Paginator, Bag) {
    function Table() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._currentSort = "";
        this._currentSortOrder = 1;
        this._columns = [];
        this._paginator = new Paginator();
        this._selectionBag = new Bag.Selection();
        this._selectionPrevClick = null;
    }
    Table.prototype = Object.create(HTMLWidget.prototype);
    Table.prototype._class += " other_Table";

    Table.prototype.testData = function () {
        this
            .columns(["Lat", "Long", "Pin"])
            .data([
                [37.665074, -122.384375, "green-dot.png"],
                [32.690680, -117.178540],
                [39.709455, -104.969859],
                [41.244123, -95.961610],
                [32.688980, -117.192040],
                [45.786490, -108.526600],
                [45.796180, -108.535652],
                [45.774320, -108.494370],
                [45.777062, -108.549835, "red-dot.png"]
            ])
        ;
        return this;
    };

    Table.prototype.publish("pagination", false, "boolean", "enable or disable pagination",null,{tags:['Private']});
    Table.prototype.publishProxy("itemsPerPage", "_paginator");
    Table.prototype.publishProxy("pageNumber", "_paginator", "pageNumber",1);

    Table.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "auto");

        this.table = element.append("table");
        this.thead = this.table.append("thead").append("tr");
        this.tbody = this.table.append("tbody");
    };

    Table.prototype._generateTempCell = function() {
        var trow = this.tbody.selectAll("tr").data([[0]]);
        trow
            .enter()
            .append("tr")
        ;
        var tcell = trow.selectAll("td").data(function (row, i) {
            return row;
        });
        tcell.enter()
            .append("td")
            .text(function (d) {
                return d;
            })
        ;
        tcell.exit()
            .remove()
        ;
        return tcell;
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
            this._paginator.render();
        }

        var thHeight = this.calcHeight(th);
        var tcellHeight = this.calcHeight(this._generateTempCell());
        var paginatorHeight = this.calcHeight(this._paginator.element());
        var ipp = Math.ceil((this.height() - thHeight - paginatorHeight) / tcellHeight) || 1;
        return ipp;
    };

    Table.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        var th = this.thead.selectAll("th").data(this._columns, function (d) { return d;});
        th
            .enter()
            .append("th")
                .each(function(d) {
                    var element = d3.select(this);
                    element
                        .append("span")
                            .attr("class", "thText")
                    ;
                    element
                        .append("span")
                            .attr("class", "thIcon")
                    ;
                })
            .on("click", function (column) {
                context.headerClick(column);
            })
        ;
        th.select(".thText")
            .text(function (column) {
                return column;
            })
        ;
        th.select(".thIcon")
            .text(function (column) {
                if (context._currentSortOrder === -1) {
                    return context._currentSort === column ? "\uf078" : "";
                } else {
                    return context._currentSort === column ? "\uf077" : "";
                }
            })
        ;
        th.exit()
            .remove()
        ;

        if (this.pagination()) {
            if (this._paginator.target() === null) {
                this._paginator.target(domNode);
            }

            var ipp = this._calcRowsPerPage(th);
            this.itemsPerPage(ipp);

            this._paginator.numItems(this._data.length);
            this._tNumPages = Math.ceil(this._paginator.numItems() / this.itemsPerPage()) || 1;
            if (this.pageNumber() > this._tNumPages) { this.pageNumber(1); } // resets if current pagenum selected out of range

            this._paginator._onSelect = function(p, d) {
                console.log('page: ' + p);
                context.pageNumber(p);
                context.render();
                return;
            };

        } else {
            this._paginator.numItems(0); // remove widget
        }

        // pageNumber starts at index 1
        var startIndex = this.pageNumber()-1;
        var itemsOnPage = this.itemsPerPage();

        var start = startIndex * itemsOnPage;
        var end = parseInt(startIndex * itemsOnPage) + parseInt(itemsOnPage);

        var tData = null;
        if (this.pagination()) {
            tData = this._data.slice(start,end);
        } else {
            tData = this._data;
        }

        var rows = this.tbody.selectAll("tr").data(tData);
        rows
            .enter()
            .append("tr")
            .on("click.selectionBag", function (d) {
                context.selectionBagClick(d);
                context.render();
            })
            .on("click", function (d) {
                context.click(context.rowToObj(d));
            })
        ;

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

        var cells = rows.selectAll("td").data(function (row, i) {
            return row;
        });
        cells.enter()
            .append("td")
        ;
        cells
            .text(function (d) {
                if (d instanceof String) {
                    return d.trim();
                } else if (d instanceof Object) {
                    return "";
                }
                return d;
            })
        ;
        cells.exit()
            .remove()
        ;
        this._paginator.render();
    };

    Table.prototype.exit = function (domNode, element) {
        this._paginator.target(null);
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Table.prototype.headerClick = function (column) {
        var context = this;
        if (this._currentSort !== column) {
            this._currentSort = column;
            this._currentSortOrder = 1;
        } else {
            this._currentSortOrder *= -1;
        }
        var idx = this._columns.indexOf(column);

        this._data.sort(function (l, r) {
            if (l[idx] === r[idx]) {
                return 0;
            } else if (typeof (r[idx]) === "undefined" || l[idx] > r[idx]) {
                return context._currentSortOrder;
            }
            return context._currentSortOrder * -1;
        });
        this.render();
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
            var selection = this._data.filter(function (row) {
                var lastInRangeRow = false;
                if (row === d || row === this._selectionPrevClick) {
                    if (inRange) {
                        lastInRangeRow = true;
                    }
                    inRange = !inRange;
                }
                return inRange || lastInRangeRow;
            }, this);
            this.selection(selection);
        } else {
            this._selectionBag.click(this._createSelectionObject(d), d3.event);
            this._selectionPrevClick = d;
        }
    };

    Table.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    return Table;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/WordCloud.js',["d3", "../common/SVGWidget", "./IWordCloud", "require", "css!./WordCloud"], factory);
    } else {
        root.other_WordCloud = factory(root.d3, root.common_SVGWidget, root.other_IWordCloud, root.require);
    }
}(this, function (d3, SVGWidget, IWordCloud, require) {
    function WordCloud() {
        SVGWidget.call(this);
        IWordCloud.call(this);
    }
    WordCloud.prototype = Object.create(SVGWidget.prototype);
    WordCloud.prototype._class += " other_WordCloud";
    WordCloud.prototype.implements(IWordCloud.prototype);

    WordCloud.prototype.publish("padding", 1, "number", "Padding",null,{tags:['Intermediate']});
    WordCloud.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:['Basic']});
    WordCloud.prototype.publish("fontSizeFrom", 6, "number", "Font Size From",null,{tags:['Basic']});
    WordCloud.prototype.publish("fontSizeTo", 24, "number", "Font Size To",null,{tags:['Basic']});
    WordCloud.prototype.publish("angleFrom", -60, "number", "Angle From",null,{tags:['Basic']});
    WordCloud.prototype.publish("angleTo", 60, "number", "Angle To",null,{tags:['Basic']});
    WordCloud.prototype.publish("angleCount", 5, "number", "Angle Count",null,{tags:['Basic']});

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
        this.cloud = d3.layout.cloud()
            .font(this.fontFamily())
            .padding(this.padding())
        ;
        this.svg = element.append("g");
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
            var text = context.svg.selectAll("text")
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
                context.svg.transition().delay(1000).duration(750)
                    .attr("transform", "scale(" + borderScale + ")")
                ;
            }
        }
    };

    WordCloud.prototype.render = function (callback) {
        var context = this;
        require(["d3.layout.cloud"], function (d3LayoutClout) {
            SVGWidget.prototype.render.call(context, callback);
        });
        return this;
    };

    return WordCloud;
}));

