import { Utility } from "@hpcc-js/common";

const TIMEOUT_DEFAULT = 60;
function espValFix(val) {
    if (val === undefined || val === null) {
        return null;
    }
    if (!val.trim) {
        if (val.Row) {
            return espRowFix(val.Row);
        }
        return val;
    }
    const retVal = val.trim();
    if (retVal !== "" && !isNaN(retVal)) {
        if (retVal.length <= 1 || retVal[0] !== "0" || retVal[1] === ".") {
            return Number(retVal);
        }
    }
    return retVal;
}

function espRowFix(row) {
    for (const key in row) {
        row[key] = espValFix(row[key]);
    }
    return row;
}

export class ESPUrl {
    private _protocol = "http:";
    private _hostname = "localhost";
    private _url;
    private _port;
    private _search;
    private _pathname;
    private _params;
    private _hash;
    private _host;

    constructor() {
    }

    url(_: string): this;
    url(): string;
    url(_?): string | this {
        if (!arguments.length) return this._url;
        this._url = _;
        const parser = document.createElement("a");
        parser.href = this._url;
        parser.href = parser.href; // This fixes an IE9/IE10 DOM value issue

        const params = {};
        if (parser.search.length) {
            let tmp: any = parser.search;
            if (tmp[0] === "?") {
                tmp = tmp.substring(1);
            }
            tmp = tmp.split("&");
            tmp.map(function (item) {
                const tmpItem = item.split("=");
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
    }

    protocol(_: string): this;
    protocol(): string;
    protocol(_?: string): string | this {
        if (!arguments.length) return this._protocol;
        this._protocol = _;
        return this;
    }

    hostname(_: string): this;
    hostname(): string;
    hostname(_?: string): string | this {
        if (!arguments.length) return this._hostname;
        this._hostname = _;
        return this;
    }

    port(_: string): this;
    port(): string;
    port(_?: string) {
        if (!arguments.length) return this._port;
        this._port = _;
        return this;
    }

    search(_: string): this;
    search(): string;
    search(_?: string) {
        if (!arguments.length) return this._search;
        this._search = _;
        return this;
    }

    pathname(_: string): this;
    pathname(): string;
    pathname(_?: string) {
        if (!arguments.length) return this._pathname;
        this._pathname = _;
        return this;
    }

    hash(_: string): this;
    hash(): string;
    hash(_?: string) {
        if (!arguments.length) return this._hash;
        this._hash = _;
        return this;
    }

    host(_: string): this;
    host(): string;
    host(_?: string) {
        if (!arguments.length) return this._host;
        this._host = _;
        return this;
    }

    params(_: string): this;
    params(): string;
    params(_?: string) {
        if (!arguments.length) return this._params;
        this._params = _;
        return this;
    }

    param(key: string) {
        return this._params[key];
    }

    isWsWorkunits() {
        return this._pathname.toLowerCase().indexOf("wsworkunits") >= 0 || this._params["Wuid"];
    }

    isWorkunitResult() {
        return this.isWsWorkunits() && (this._params["Sequence"] || this._params["ResultName"]);
    }

    isWsEcl() {
        return this._pathname.toLowerCase().indexOf("wsecl") >= 0 || (this._params["QuerySetId"] && this._params["Id"]);
    }

    isWsWorkunits_GetStats() {
        return this._pathname.toLowerCase().indexOf("wsworkunits/wugetstats") >= 0 && this._params["WUID"];
    }

    getUrl(overrides) {
        overrides = overrides || {};
        return (overrides.protocol !== undefined ? overrides.protocol : this._protocol) + "//" +
            (overrides.hostname !== undefined ? overrides.hostname : this._hostname) + ":" +
            (overrides.port !== undefined ? overrides.port : this._port) + "/" +
            (overrides.pathname !== undefined ? overrides.pathname : this._pathname);
    }
}

export function ESPMappings(mappings) {
    this._mappings = mappings;
    this._reverseMappings = {};
    for (const resultName in this._mappings) {
        this._reverseMappings[resultName] = {};
        for (const key in this._mappings[resultName]) {
            this._reverseMappings[resultName][this._mappings[resultName][key]] = key;
        }
    }
}

ESPMappings.prototype.contains = function (resultName, origField) {
    return Utility.exists(resultName + "." + origField, this._mappings);
};

ESPMappings.prototype.mapResult = function (response, resultName) {
    const mapping = this._mappings[resultName];
    if (mapping) {
        response[resultName] = response[resultName].map(function (item) {
            let row = [];
            if (mapping.x && mapping.x instanceof Array) {
                //  LINE Mapping  ---
                row = [];
                for (let i = 0; i < mapping.x.length; ++i) {
                    row.push(item[mapping.y[i]]);
                }
            } else {
                //  Regular Mapping  ---
                for (const key in mapping) {
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
    for (const key in response) {
        this.mapResult(response, key);
    }
};

function Comms() {
    ESPUrl.call(this);
    this._proxyMappings = {};
    this._mappings = new ESPMappings({});
    this._timeout = TIMEOUT_DEFAULT;
    this._hipieResults = {};
}
Comms.prototype = Object.create(ESPUrl.prototype);

Comms.prototype.hipieResults = function (_) {
    if (!arguments.length) return this._hipieResults;
    this._hipieResultsLength = 0;
    this._hipieResults = {};
    const context = this;
    _.forEach(function (item) {
        context._hipieResultsLength++;
        context._hipieResults[item.id] = item;
    });
    return this;
};

const serialize = function (obj) {
    const str = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const val = obj[key];
            if (val !== undefined && val !== null) {
                str.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
            }
        }
    }
    return str.join("&");
};

let jsonp = function (url, request, timeout) {
    return new Promise(function (resolve, reject) {
        let respondedTimeout = timeout * 1000;
        const respondedTick = 5000;
        const callbackName = "jsonp_callback_" + Math.round(Math.random() * 999999);
        window[callbackName] = function (response) {
            respondedTimeout = 0;
            doCallback();
            resolve(response);
        };
        const script = document.createElement("script");
        script.src = url + (url.indexOf("?") >= 0 ? "&" : "?") + "jsonp=" + callbackName + "&" + serialize(request);
        document.body.appendChild(script);
        const progress = setInterval(function () {
            if (respondedTimeout <= 0) {
                clearInterval(progress);
            } else {
                respondedTimeout -= respondedTick;
                if (respondedTimeout <= 0) {
                    clearInterval(progress);
                    console.log("Request timeout:  " + script.src);
                    doCallback();
                    reject(Error("Request timeout:  " + script.src));
                } else {
                    console.log("Request pending (" + respondedTimeout / 1000 + " sec):  " + script.src);
                }
            }
        }, respondedTick);

        function doCallback() {
            delete window[callbackName];
            document.body.removeChild(script);
        }
    });
};

Comms.prototype.jsonp = function (url, request, callback) {
    for (const key in this._proxyMappings) {
        const newUrlParts = url.split(key);
        const newUrl = newUrlParts[0];
        if (newUrlParts.length > 1) {
            const espUrl = new ESPUrl()
                .url(url)
                ;
            url = newUrl + this._proxyMappings[key];
            request.IP = espUrl.hostname();
            request.PORT = espUrl.port();
            if (newUrlParts.length > 0) {
                request.PATH = newUrlParts[1];
            }
            break;
        }
    }
    return jsonp(url, request, this.timeout());
};

Comms.prototype.ajax = function (method, url, request) {
    return new Promise(function (resolve, reject) {
        let uri = url;
        if (method === "GET" && request) {
            uri += "?" + serialize(request);
        }
        const xhr: any = new XMLHttpRequest();
        xhr.onload = function (e) {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(this.response));
            } else {
                reject(Error(this.statusText));
            }
        };
        xhr.onerror = function () {
            reject(Error(this.statusText));
        };
        xhr.open(method, uri);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        if (method === "GET") {
            xhr.send();
        } else {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(serialize(request));
        }
    });
};

Comms.prototype.get = function (url, request) {
    return this.ajax("GET", url, request);
};

Comms.prototype.post = function (url, request) {
    return this.ajax("POST", url, request);
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

Comms.prototype.timeout = function (_) {
    if (!arguments.length) return this._timeout;
    this._timeout = _ || TIMEOUT_DEFAULT;
    return this;
};

export function Basic() {
    Comms.call(this);
}
Basic.prototype = Object.create(Comms.prototype);

Basic.prototype.cacheCalls = function (_) {
    if (!arguments.length) return this._cacheCalls;
    this._cacheCalls = _;
    return this;
};

Basic.prototype.call = function (request, callback) {
    const url = this._url + (this._url.indexOf("?") >= 0 ? "&" : "?") + serialize(request);
    if (this._cacheCalls) {
        const context = this;
        return new Promise(function (resolve, reject) {
            const response = JSON.parse(localStorage.getItem("hpcc.viz." + url));
            if (!response) {
                throw Error("not cached");
            }
            if (callback) {
                console.log("Deprecated:  callback, use promise (Basic.prototype.call)");
                callback(response);
            }
            resolve(response);
        }).catch(function (response) {
            return context.get(url).then(function (response2) {
                localStorage.setItem("hpcc.viz." + url, JSON.stringify(response2));
                if (callback) {
                    console.log("Deprecated:  callback, use promise (Basic.prototype.call)");
                    callback(response2);
                }
                return response2;
            });
        });
    } else {
        localStorage.removeItem("hpcc.viz." + url);
        return this.get(url).then(function (response) {
            if (callback) {
                console.log("Deprecated:  callback, use promise (Basic.prototype.call)");
                callback(response);
            }
            return response;
        });
    }
};

function locateRoxieResponse(response) {
    // v5 and v6 compatible ---
    for (const key in response) {
        if (response[key].Row && response[key].Row instanceof Array) {
            return response;
        }
        let retVal;
        if (typeof (response[key]) !== "string") {
            retVal = locateRoxieResponse(response[key]);
        }
        if (retVal) {
            return retVal;
        }
    }
    return null;
}

function locateRoxieException(response) {
    for (const key in response) {
        if (response[key].Exception && response[key].Exception instanceof Array) {
            return response[key];
        }
        const retVal = locateRoxieException(response[key]);
        if (retVal) {
            return retVal;
        }
    }
    return null;
}

export function WsECL() {
    Comms.call(this);

    this._port = "8002";
    this._target = "";
    this._query = "";
}
WsECL.prototype = Object.create(Comms.prototype);

WsECL.prototype.url = function (_) {
    const retVal = Comms.prototype.url.apply(this, arguments);
    if (arguments.length) {
        //  http://localhost:8010/esp/files/stub.htm?QuerySetId=roxie&Id=stock.3&Widget=QuerySetDetailsWidget
        this._port = this._port === "8010" ? "8002" : this._port;  //  Need a better way  ---
        for (const key in this._params) {
            switch (key) {
                case "QuerySetId":
                    this.target(this._params[key]);
                    break;
                case "Id":
                    this.query(this._params[key]);
                    break;
            }
        }

        let pathParts;
        let queryParts;
        if (!this._target || !this._query) {
            // http://localhost:8002/WsEcl/forms/default/query/roxie/wecare
            pathParts = this._pathname.split("/query/");
            if (pathParts.length >= 2) {
                queryParts = pathParts[1].split("/");
                if (queryParts.length >= 2) {
                    this.target(queryParts[0]);
                    this.query(queryParts[1]);
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
    const context = this;
    const url = this.getUrl({
        pathname: "WsEcl/submit/query/" + target.target + "/" + target.query + "/json"
    });
    return this.jsonp(url, request).then(function (response) {
        let _response = locateRoxieResponse(response);
        if (!_response) {
            _response = locateRoxieException(response);
        }
        response = _response;

        // Check for exceptions
        if (response.Exception) {
            throw Error(response.Exception.reduce(function (previousValue, exception, index, array) {
                if (previousValue.length) {
                    previousValue += "\n";
                }
                return previousValue + exception.Source + " " + exception.Code + ":  " + exception.Message;
            }, ""));
        }
        // Remove "response.result.Row"
        for (const key in response) {
            if (response[key].Row) {
                response[key] = response[key].Row.map(espRowFix);
            }
        }
        context._mappings.mapResponse(response);
        if (callback) {
            console.log("Deprecated:  callback, use promise (WsECL.prototype.call)");
            callback(response);
        }
        return response;
    });
};

WsECL.prototype.send = function (request, callback) {
    return this.call({ target: this._target, query: this._query }, request, callback);
};

export function WsWorkunits() {
    Comms.call(this);

    this._port = "8010";
    this._wuid = "";
    this._jobname = "";
    this._sequence = null;
    this._resultName = null;

    this._fetchResultNamesPromise = null;
    this._fetchResultPromise = {};
    this._resultNameCache = {};
    this._resultNameCacheCount = 0;
}
WsWorkunits.prototype = Object.create(Comms.prototype);

WsWorkunits.prototype.url = function (_) {
    const retVal = Comms.prototype.url.apply(this, arguments);
    if (arguments.length) {
        //  http://localhost:8010/WsWorkunit/WuResult?Wuid=xxx&ResultName=yyy
        for (const key in this._params) {
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
            //  http://localhost:8010/WsWorkunits/res/W20140922-213329/c:/temp/index.html
            const urlParts = this._url.split("/res/");
            if (urlParts.length >= 2) {
                const urlParts2 = urlParts[1].split("/");
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
    const url = Comms.prototype.getUrl.call(this, {
        pathname: "WsWorkunits/res/" + this._wuid + "/"
    });
    let params = "";
    params = this.appendParam("ResultName", this._resultName, params);
    return url + (params ? "?" + params : "");
};

WsWorkunits.prototype._fetchResult = function (target, callback, skipMapping) {
    target = target || {};
    if (!this._fetchResultPromise[target.resultname]) {
        target._start = target._start || 0;
        target._count = target._count || -1;
        const url = this.getUrl({
            pathname: "WsWorkunits/WUResult.json"
        });
        const request = {
            Wuid: target.wuid,
            ResultName: target.resultname,
            SuppressXmlSchema: true,
            Start: target._start,
            Count: target._count
        };
        this._resultNameCache[target.resultname] = {};
        const context = this;
        this._fetchResultPromise[target.resultname] = this.jsonp(url, request).then(function (response) {
            // Remove "xxxResponse.Result"
            for (const key in response) {
                if (!response[key].Result) {
                    throw new Error("No result found.");
                }
                context._total = response[key].Total;
                response = response[key].Result;
                for (const responseKey in response) {
                    response = response[responseKey].Row.map(espRowFix);
                    break;
                }
                break;
            }
            context._resultNameCache[target.resultname] = response;
            if (!skipMapping) {
                context._mappings.mapResult(context._resultNameCache, target.resultname);
            }
            if (callback) {
                console.log("Deprecated:  callback, use promise (WsWorkunits.prototype._fetchResult)");
                callback(context._resultNameCache[target.resultname]);
            }
            return context._resultNameCache[target.resultname];
        });
    }
    return this._fetchResultPromise[target.resultname];
};

WsWorkunits.prototype.fetchResult = function (target, callback, skipMapping) {
    if (target.wuid) {
        return this._fetchResult(target, callback, skipMapping);
    } else if (target.jobname) {
        const context = this;
        return this.WUQuery(target, function (response) {
            target.wuid = response[0].Wuid;
            return context._fetchResult(target, callback, skipMapping);
        });
    }
};

WsWorkunits.prototype.WUQuery = function (_request, callback) {
    const url = this.getUrl({
        pathname: "WsWorkunits/WUQuery.json",
    });
    const request = {
        Jobname: _request.jobname,
        Count: 1
    };

    this._resultNameCache = {};
    this._resultNameCacheCount = 0;
    return this.jsonp(url, request).then(function (response) {
        if (!Utility.exists("WUQueryResponse.Workunits.ECLWorkunit", response)) {
            throw Error("No workunit found.");
        }
        response = response.WUQueryResponse.Workunits.ECLWorkunit;
        if (callback) {
            console.log("Deprecated:  callback, use promise (WsWorkunits.prototype.WUQuery)");
            callback(response);
        }
        return response;
    });
};

WsWorkunits.prototype.fetchResultNames = function (callback) {
    if (!this._fetchResultNamesPromise) {
        const url = this.getUrl({
            pathname: "WsWorkunits/WUInfo.json",
        });
        const request = {
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
        const context = this;
        this._fetchResultNamesPromise = this.jsonp(url, request).then(function (response) {
            if (Utility.exists("WUInfoResponse.Workunit.Archived", response) && response.WUInfoResponse.Workunit.Archived) {
                console.log("WU is archived:  " + url + " " + JSON.stringify(request));
            }
            if (Utility.exists("WUInfoResponse.Workunit.Results.ECLResult", response)) {
                response.WUInfoResponse.Workunit.Results.ECLResult.map(function (item) {
                    context._resultNameCache[item.Name] = [];
                    ++context._resultNameCacheCount;
                });
            }
            if (callback) {
                console.log("Deprecated:  callback, use promise (WsWorkunits.prototype.fetchResultNames)");
                callback(context._resultNameCache);
            }
            return context._resultNameCache;
        });
    }
    return this._fetchResultNamesPromise;
};

WsWorkunits.prototype.fetchResults = function (callback, skipMapping) {
    const context = this;
    return this.fetchResultNames().then(function (response) {
        const fetchArray = [];
        for (const key in context._resultNameCache) {
            fetchArray.push(context.fetchResult({ wuid: context._wuid, resultname: key }, null, skipMapping));
        }
        return Promise.all(fetchArray).then(function (responseArray) {
            if (callback) {
                console.log("Deprecated:  callback, use promise (WsWorkunits.prototype.fetchResults)");
                callback(context._resultNameCache);
            }
            return context._resultNameCache;
        });
    });
};

WsWorkunits.prototype.postFilter = function (request, response) {
    const retVal = {};
    for (const key in response) {
        retVal[key] = response[key].filter(function (row, idx) {
            for (const request_key in request) {
                // tslint:disable-next-line:triple-equals
                if (row[request_key] !== undefined && request[request_key] !== undefined && row[request_key] != request[request_key]) {
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
    const context = this;
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
    const retVal = Comms.prototype.url.apply(this, arguments);
    if (arguments.length) {
        //  http://localhost:8010/WsWorkunits/WUGetStats?WUID="xxx"
        for (const key in this._params) {
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
    const url = this.getUrl({
        pathname: "WsWorkunits/WUGetStats.json?WUID=" + this._wuid
    });
    return this.jsonp(url, request).then(function (response) {
        if (Utility.exists("WUGetStatsResponse.Statistics.WUStatisticItem", response)) {
            if (callback) {
                console.log("Deprecated:  callback, use promise (WsWorkunits_GetStats.prototype.send)");
                callback(response.WUGetStatsResponse.Statistics.WUStatisticItem);
            }
            return response.WUGetStatsResponse.Statistics.WUStatisticItem;
        } else {
            if (callback) {
                console.log("Deprecated:  callback, use promise (WsWorkunits_GetStats.prototype.send)");
                callback([]);
            }
            return [];
        }
    });
};

//  HIPIERoxie  ---
export function HIPIERoxie() {
    Comms.call(this);
}
HIPIERoxie.prototype = Object.create(Comms.prototype);

HIPIERoxie.prototype.fetchResults = function (request, callback) {
    const url = this.getUrl({});
    this._resultNameCache = {};
    this._resultNameCacheCount = 0;
    const context = this;
    return this.jsonp(url, request).then(function (response) {
        let _response = locateRoxieResponse(response);
        if (!_response) {
            _response = locateRoxieException(response);
        }
        response = _response;

        // Check for exceptions
        if (response.Exception) {
            throw Error(response.Exception.reduce(function (previousValue, exception, index, array) {
                if (previousValue.length) {
                    previousValue += "\n";
                }
                return previousValue + exception.Source + " " + exception.Code + ":  " + exception.Message;
            }, ""));
        }
        // Remove "response.result.Row"
        for (const key in response) {
            if (response[key].Row) {
                context._resultNameCache[key] = response[key].Row.map(espRowFix);
                ++context._resultNameCacheCount;
            }
        }
        if (callback) {
            console.log("Deprecated:  callback, use promise (HIPIERoxie.prototype.fetchResults)");
            callback(context._resultNameCache);
        }
        return context._resultNameCache;
    });
};

HIPIERoxie.prototype.fetchResult = function (name, callback) {
    const context = this;
    return new Promise(function (resolve, reject) {
        if (callback) {
            console.log("Deprecated:  callback, use promise (HIPIERoxie.prototype.fetchResult)");
            callback(context._resultNameCache[name]);
        }
        resolve(context._resultNameCache[name]);
    });
};

HIPIERoxie.prototype.call = function (request, callback) {
    const context = this;
    return this.fetchResults(request, callback).then(function (response) {
        const retVal = {};
        for (const hipieKey in context._hipieResults) {
            const item = context._hipieResults[hipieKey];
            retVal[item.id] = response[item.from];
        }
        return retVal;
    });
};

//  HIPIEWorkunit  ---
export function HIPIEWorkunit() {
    WsWorkunits.call(this);
}
HIPIEWorkunit.prototype = Object.create(WsWorkunits.prototype);

HIPIEWorkunit.prototype.fetchResults = function (callback) {
    const context = this;
    return WsWorkunits.prototype.fetchResultNames.call(this).then(function (response) {
        const fetchArray = [];
        for (const key in context._hipieResults) {
            const item = context._hipieResults[key];
            fetchArray.push(context.fetchResult(item.from));
        }
        return Promise.all(fetchArray).then(function (response2) {
            if (callback) {
                console.log("Deprecated:  callback, use promise (HIPIEWorkunit.prototype.fetchResults)");
                callback(context._resultNameCache);
            }
            return context._resultNameCache;
        });
    });
};

HIPIEWorkunit.prototype.fetchResult = function (name, callback) {
    return WsWorkunits.prototype.fetchResult.call(this, { wuid: this._wuid, resultname: name }).then(function (response) {
        if (callback) {
            console.log("Deprecated:  callback, use promise (HIPIEWorkunit.prototype.fetchResult)");
            callback(response);
        }
        return response;
    });
};

HIPIEWorkunit.prototype.call = function (request, callback) {
    const context = this;
    if (request.refresh || !this._resultNameCache || !this._resultNameCacheCount) {
        return this.fetchResults(callback).then(function (response) {
            return filterResults(request);
        });
    } else {
        return new Promise(function (resolve, reject) {
            resolve(filterResults(request));
        });
    }

    function filterResults(request2) {
        const changedFilter = {};
        for (const key in request2) {
            if (request2[key + "_changed"] !== undefined) {
                changedFilter[key] = {
                    value: request2[key]
                };
            }
        }
        const retVal = {};
        for (const hipieKey in context._hipieResults) {
            const hipieResult = context._hipieResults[hipieKey];
            const outputFilter = {};
            for (let i = 0; i < hipieResult.filters.length; ++i) {
                const filter = hipieResult.filters[i];
                outputFilter[filter.fieldid] = changedFilter[filter.fieldid] || { value: undefined };
                outputFilter[filter.fieldid].filter = filter;
            }
            retVal[hipieResult.id] = context._resultNameCache[hipieResult.from].filter(function (row) {
                for (const key2 in outputFilter) {
                    if (!outputFilter[key2].filter.matches(row, outputFilter[key2].value)) {
                        return false;
                    }
                }
                return true;
            });
        }
        return retVal;
    }
};

//  HIPIEDatabomb  ---
export function HIPIEDatabomb() {
    HIPIEWorkunit.call(this);
}
HIPIEDatabomb.prototype = Object.create(HIPIEWorkunit.prototype);

HIPIEDatabomb.prototype.databomb = function (_) {
    if (!arguments.length) return this._databomb;
    this._databomb = _;
    return this;
};

HIPIEDatabomb.prototype.databombOutput = function (from, id) {
    if (!arguments.length) return undefined;
    this._resultNameCacheCount++;
    if (this._databomb instanceof Array) {
        this._resultNameCache[from] = this._databomb.map(espRowFix);
    } else {
        this._resultNameCache[from] = this._databomb[from].map(espRowFix);
    }
    return this;
};

HIPIEDatabomb.prototype.fetchResults = function (callback) {
    const context = this;
    return new Promise(function (resolve, reject) {
        if (callback) {
            console.log("Deprecated:  callback, use promise (HIPIEDatabomb.prototype.fetchResults)");
            callback(context._resultNameCache);
        }
        resolve(context._resultNameCache);
    });
};

export function createESPConnection(url) {
    url = url || document.URL;
    const testURL = new ESPUrl()
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

export function hookJsonp(func) {
    jsonp = func;
}
