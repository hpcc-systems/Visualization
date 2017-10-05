import { Utility } from "@hpcc-js/common";
import * as Comms from "./Comms";

function nestedRowFix(row) {
    if (row.Row && row.Row instanceof Array) {
        return row.Row.map(nestedRowFix);
    } else if (row instanceof Object) {
        for (const key in row) {
            row[key] = nestedRowFix(row[key]);
        }
    }
    return row;
}

//  Basic Comms  ---
let enableBasicCommsCache = false;
let basicCommsCache = {};
function BasicComms() {
    Comms.Basic.call(this);
}
BasicComms.prototype = Object.create(Comms.Basic.prototype);

BasicComms.prototype.jsonp = function (url, request) {
    const requestStr = JSON.stringify(request);
    if (enableBasicCommsCache && basicCommsCache[url] && basicCommsCache[url][requestStr]) {
        return Promise.resolve(basicCommsCache[url][requestStr]);
    }
    return Comms.Basic.prototype.jsonp.apply(this, arguments).then(function (response) {
        if (enableBasicCommsCache) {
            if (!basicCommsCache[url]) {
                basicCommsCache[url] = {};
            }
            basicCommsCache[url][requestStr] = response;
        }
        return response;
    });
};

//  WsWorkunits  ---
function WsWorkunits(baseUrl) {
    BasicComms.call(this);

    this.url(baseUrl + "WsWorkunits/");
}
WsWorkunits.prototype = Object.create(BasicComms.prototype);

WsWorkunits.prototype.wuQuery = function (options) {
    const url = this.getUrl({
        pathname: "WsWorkunits/WUQuery.json",
    });
    const request = {
        Wuid: "",
        Type: "",
        Cluster: "",
        RoxieCluster: "",
        Owner: "",
        State: "",
        StartDate: "",
        EndDate: "",
        ECL: "",
        Jobname: "",
        LogicalFile: "",
        LogicalFileSearchType: "",
        /*
        ApplicationValues>
         ApplicationValue>
          Application: "",
          Name: "",
          Value: "",
         /ApplicationValue>
        /ApplicationValues>
        */
        After: "",
        Before: "",
        Count: "",
        PageSize: 100,
        PageStartFrom: 0,
        PageEndAt: "",
        LastNDays: "",
        Sortby: "",
        Descending: 0,
        CacheHint: ""
    };
    for (const key in options) {
        request[key] = options[key];
    }
    return this.jsonp(url, request).then(function (response) {
        if (response.WUQueryResponse && response.WUQueryResponse.Workunits) {
            return response.WUQueryResponse.Workunits.ECLWorkunit;
        }
        return [];
    });
};

//  Workunit  ---
function Workunit(baseUrl, wuid) {
    BasicComms.call(this);

    this.url(baseUrl + "WsWorkunits/");
    this._wuid = wuid;
}
Workunit.prototype = Object.create(BasicComms.prototype);

Workunit.prototype.wuInfo = function (options) {
    const url = this.getUrl({
        pathname: "WsWorkunits/WUInfo.json",
    });
    const request = {
        Wuid: this._wuid,
        TruncateEclTo64k: true,
        IncludeExceptions: false,
        IncludeGraphs: false,
        IncludeSourceFiles: false,
        IncludeResults: false,
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
    for (const key in options) {
        request[key] = options[key];
    }
    return this.jsonp(url, request).then(function (response) {
        if (enableBasicCommsCache) {
            const retVal = { WUInfoResponse: { Workunit: {} } };
            for (const key in options) {
                const includeKey = key.substring(7);
                retVal.WUInfoResponse.Workunit[includeKey] = response.WUInfoResponse.Workunit[includeKey];
            }
            basicCommsCache[url][JSON.stringify(request)] = retVal;
        }
        return response;
    });
};

Workunit.prototype.wuUpdate = function (options) {
    const url = this.getUrl({
        pathname: "WsWorkunits/WUUpdate.json"
    });
    const request = {
        Wuid: this._wuid
    };
    for (const key in options) {
        request[key] = options[key];
    }
    return this.post(url, request);
};

Workunit.prototype.appData = function (appID, key, _) {
    if (arguments.length === 2) {
        return this.wuInfo({
            IncludeApplicationValues: true
        }).then(function (response) {
            let persistString;
            if (response.WUInfoResponse && response.WUInfoResponse.Workunit && response.WUInfoResponse.Workunit.ApplicationValues && response.WUInfoResponse.Workunit.ApplicationValues.ApplicationValue) {
                response.WUInfoResponse.Workunit.ApplicationValues.ApplicationValue.filter(function (row) {
                    return row.Application === appID && row.Name === key;
                }).forEach(function (row) {
                    persistString = row.Value;
                });
            }
            return persistString;
        });
    } else if (arguments.length === 3) {
        return this.wuUpdate({
            "ApplicationValues.ApplicationValue.0.Application": appID,
            "ApplicationValues.ApplicationValue.0.Name": key,
            "ApplicationValues.ApplicationValue.0.Value": _,
            "ApplicationValues.ApplicationValue.itemcount": 1
        });
    }
};

Workunit.prototype.results = function () {
    const context = this;
    return this.wuInfo({
        IncludeResults: true
    }).then(function (response) {
        let retVal = [];
        if (Utility.exists("WUInfoResponse.Workunit.Results.ECLResult", response)) {
            retVal = response.WUInfoResponse.Workunit.Results.ECLResult.map(function (result) {
                return new WUResult(context.getUrl({ pathname: "WsWorkunits/" }), context._wuid, result.Name);
            });
        }
        return retVal;
    });
};

Workunit.prototype.result = function (dataSource, resultName) {
    dataSource = dataSource || this._wuid;
    return createResult(dataSource, resultName);
};

//  Workunit Result  ---
function WUResult(baseUrl, wuid, name) {
    BasicComms.call(this);
    this.url(baseUrl + "WUResult.json");
    this._wuid = wuid;
    this._name = name;
    this._xmlSchema = null;
}
WUResult.prototype = Object.create(BasicComms.prototype);

WUResult.prototype.wuid = function (_) {
    if (!arguments.length) return this._wuid;
    this._wuid = _;
    return this;
};

WUResult.prototype.name = function (_) {
    if (!arguments.length) return this._name;
    this._name = _;
    return this;
};

WUResult.prototype.query = function (options, filter) {
    options = options || {};
    filter = filter || {};
    const request = {
        Wuid: this._wuid,
        ResultName: this._name,
        SuppressXmlSchema: true,
        Start: 0,
        Count: -1
    };
    for (const key in options) {
        request[key] = options[key];
    }
    let filterIdx = 0;
    for (const fKey in filter) {
        request["FilterBy.NamedValue." + filterIdx + ".Name"] = fKey;
        request["FilterBy.NamedValue." + filterIdx + ".Value"] = filter[fKey];
        ++filterIdx;
    }
    if (filterIdx) {
        request["FilterBy.NamedValue.itemcount"] = filterIdx;
    }
    const context = this;
    return this.jsonp(this.url(), request).then(function (response) {
        if (response.WUResultResponse &&
            response.WUResultResponse.Result &&
            response.WUResultResponse.Result[context._name]) {
            if (enableBasicCommsCache) {
                basicCommsCache[context.url()][JSON.stringify(request)] = {
                    WUResultResponse: {
                        Result: response.WUResultResponse.Result
                    }
                };
            }
            context._xmlSchema = response.WUResultResponse.Result.XmlSchema;
            return nestedRowFix(response.WUResultResponse.Result[context._name]);
        }
        return [];
    });
};

//  Logical File  ---
function LogicalFile(baseUrl, logicalName) {
    BasicComms.call(this);
    this.url(baseUrl + "WUResult.json");
    this._logicalName = logicalName;
    this._xmlSchema = null;
}
LogicalFile.prototype = Object.create(BasicComms.prototype);

LogicalFile.prototype.query = function (options, filter) {
    options = options || {};
    filter = filter || {};
    const request = {
        Cluster: "hthor",  //  TODO:  Should not be needed  ---
        LogicalName: this._logicalName,
        SuppressXmlSchema: this._xmlSchema !== null,
        Start: 0,
        Count: -1
    };
    for (const key in options) {
        request[key] = options[key];
    }
    let filterIdx = 0;
    for (const fKey in filter) {
        request["FilterBy.NamedValue." + filterIdx + ".Name"] = fKey;
        request["FilterBy.NamedValue." + filterIdx + ".Value"] = filter[fKey];
        ++filterIdx;
    }
    if (filterIdx) {
        request["FilterBy.NamedValue.itemcount"] = filterIdx;
    }
    const context = this;
    return this.jsonp(this.url(), request).then(function (response) {
        if (response.WUResultResponse &&
            response.WUResultResponse.Result &&
            response.WUResultResponse.Result.Row) {
            context._xmlSchema = response.WUResultResponse.Result.XmlSchema;
            return nestedRowFix(response.WUResultResponse.Result.Row);
        }
        return [];
    });
};

//  Roxie Query  ---
function RoxieQuery(baseUrl, resultName) {
    BasicComms.call(this);
    const urlParts = baseUrl.split("/");
    let queryName = urlParts.pop();
    if (queryName.toLowerCase() === "json") {
        queryName = urlParts.pop();
    }
    this._queryName = queryName;
    this._resultName = resultName;
    this.url(urlParts.join("/") + "/" + queryName + "/json");
}
RoxieQuery.prototype = Object.create(BasicComms.prototype);

function trimRight(str) {
    if (str && str.replace) {
        return str.replace(/ +$/, "");
    }
    return str;
}

function postFilter(results, filter) {
    return results.filter(function (row) {
        for (const key in filter) {
            if (row[key] !== undefined && trimRight(filter[key]) !== trimRight(row[key])) {
                return false;
            }
        }
        return true;
    });
}

function locateRoxieResponse(response) {
    // v5 and v6 compatible ---
    for (const key in response) {
        if (response[key].Row && response[key].Row instanceof Array) {
            return response;
        }
        const retVal = locateRoxieResponse(response[key]);
        if (retVal) {
            return retVal;
        }
    }
    return null;
}

RoxieQuery.prototype.query = function (options, filter) {
    options = options || {};
    filter = filter || {};
    const request = {
    };
    for (const key in options) {
        request[key] = options[key];
    }
    for (const fKey in filter) {
        request[fKey] = filter[fKey];
    }
    const context = this;
    return this.jsonp(this.url(), request).then(function (response) {
        response = locateRoxieResponse(response);
        if (response) {
            if (context._resultName) {
                if (response && response[context._resultName] && response[context._resultName].Row) {
                    return nestedRowFix(postFilter(response[context._resultName].Row, filter));
                }
            } else {
                for (const key in response) {
                    if (response[key].Row) {
                        return nestedRowFix(postFilter(response[key].Row, filter));
                    }
                }
            }
        }
        return [];
    });
};

function createResult(_espUrl, dataSource, resultName?) {
    const espUrl = new Comms.ESPUrl()
        .url(_espUrl)
        ;
    if (dataSource.indexOf("http") === 0) {
        return new RoxieQuery(dataSource, resultName);
    } else if (dataSource.indexOf("~") === 0 || dataSource.indexOf("::") >= 0) {
        return new LogicalFile(espUrl.getUrl({ pathname: "WsWorkunits/" }), dataSource);
    } else if (dataSource) {
        return new WUResult(espUrl.getUrl({ pathname: "WsWorkunits/" }), dataSource, resultName);
    }
    return null;
}

export function enableCache(_) {
    if (!arguments.length) return enableBasicCommsCache;
    enableBasicCommsCache = _;
    if (!_) {
        basicCommsCache = {};
    }
    return this;
}
export function cache(_) {
    if (!arguments.length) return basicCommsCache;
    basicCommsCache = _;
    return this;
}
export function createConnection(url) {
    url = url || document.URL;
    const testURL = new Comms.ESPUrl()
        .url(url)
        ;
    if (testURL.isWsWorkunits()) {
        const espConnection = Comms.createESPConnection(url);
        if (espConnection instanceof Comms.WsWorkunits && espConnection.wuid()) {
            return new Workunit(espConnection.getUrl({ pathname: "" }), espConnection.wuid())
                .url(url)
                ;
        }
    }
    return null;
}
export function flattenResult(result, mappings) {
    const retVal = {
        columns: [],
        data: []
    };
    if (result && result.length) {
        const colIdx = {};
        if (mappings && mappings.length) {
            mappings.forEach(function (mapping) {
                colIdx[mapping.value.toLowerCase()] = retVal.columns.length;
                retVal.columns.push(mapping.key);
            });
        } else {
            for (const key in result[0]) {
                colIdx[key.toLowerCase()] = retVal.columns.length;
                retVal.columns.push(key);
            }
        }
        result.forEach(function (row, rowIdx) {
            const rowArr = [];
            for (const key in row) {
                if (colIdx[key.toLowerCase()] !== undefined) {
                    rowArr[colIdx[key.toLowerCase()]] = row[key];
                }
            }
            retVal.data.push(rowArr);
        });
    }
    return retVal;
}
