"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Comms", "../common/Utility"], factory);
    } else {
        root.other_ESP = factory(root.other_Comms, root.common_Utility);
    }
}(this, function (Comms, Utility) {
    function nestedRowFix(row) {
        if (row.Row && row.Row instanceof Array) {
            return row.Row.map(nestedRowFix);
        } else if (row instanceof Object) {
            for (var key in row) {
                row[key] = nestedRowFix(row[key]);
            }
        }
        return row;
    }

    //  Basic Comms  ---
    var enableBasicCommsCache = false;
    var basicCommsCache = {};
    function BasicComms() {
        Comms.Basic.call(this);
    }
    BasicComms.prototype = Object.create(Comms.Basic.prototype);

    BasicComms.prototype.jsonp = function (url, request) {
        var requestStr = JSON.stringify(request);
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
        var url = this.getUrl({
            pathname: "WsWorkunits/WUQuery.json",
        });
        var request = {
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
        for (var key in options) {
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
        var url = this.getUrl({
            pathname: "WsWorkunits/WUInfo.json",
        });
        var request = {
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
        for (var key in options) {
            request[key] = options[key];
        }
        return this.jsonp(url, request).then(function (response) {
            if (enableBasicCommsCache) {
                var retVal = { WUInfoResponse: { Workunit: {} } };
                for (var key in options) {
                    var includeKey = key.substring(7);
                    retVal.WUInfoResponse.Workunit[includeKey] = response.WUInfoResponse.Workunit[includeKey];
                }
                basicCommsCache[url][JSON.stringify(request)] = retVal;
            }
            return response;
        });
    };

    Workunit.prototype.wuUpdate = function (options) {
        var url = this.getUrl({
            pathname: "WsWorkunits/WUUpdate.json"
        });
        var request = {
            Wuid: this._wuid
        };
        for (var key in options) {
            request[key] = options[key];
        }
        return this.post(url, request);
    };

    Workunit.prototype.appData = function (appID, key, _) {
        if (arguments.length === 2) {
            return this.wuInfo({
                IncludeApplicationValues: true
            }).then(function (response) {
                var persistString;
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
        var context = this;
        return this.wuInfo({
            IncludeResults: true
        }).then(function (response) {
            var retVal = [];
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
        var request = {
            Wuid: this._wuid,
            ResultName: this._name,
            SuppressXmlSchema: true,
            Start: 0,
            Count: -1
        };
        for (var key in options) {
            request[key] = options[key];
        }
        var filterIdx = 0;
        for (var fKey in filter) {
            request["FilterBy.NamedValue." + filterIdx + ".Name"] = fKey;
            request["FilterBy.NamedValue." + filterIdx + ".Value"] = filter[fKey];
            ++filterIdx;
        }
        if (filterIdx) {
            request["FilterBy.NamedValue.itemcount"] = filterIdx;
        }
        var context = this;
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
        var request = {
            Cluster:"hthor",  //  TODO:  Should not be needed  ---
            LogicalName: this._logicalName,
            SuppressXmlSchema: this._xmlSchema !== null,
            Start: 0,
            Count: -1
        };
        for (var key in options) {
            request[key] = options[key];
        }
        var filterIdx = 0;
        for (var fKey in filter) {
            request["FilterBy.NamedValue." + filterIdx + ".Name"] = fKey;
            request["FilterBy.NamedValue." + filterIdx + ".Value"] = filter[fKey];
            ++filterIdx;
        }
        if (filterIdx) {
            request["FilterBy.NamedValue.itemcount"] = filterIdx;
        }
        var context = this;
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
        var urlParts = baseUrl.split("/");
        var queryName = urlParts.pop();
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
            return str.replace(/ +$/, '');
        }
        return str;
    }

    function postFilter(results, filter) {
        return results.filter(function (row) {
            for (var key in filter) {
                if (row[key] !== undefined && trimRight(filter[key]) !== trimRight(row[key])) {
                    return false;
                }
            }
            return true;
        });
    }

    function locateRoxieResponse(response) {
        // v5 and v6 compatible ---
        for (var key in response) {
            if (response[key].Row && response[key].Row instanceof Array) {
                return response;
            }
            var retVal = locateRoxieResponse(response[key]);
            if (retVal) {
                return retVal;
            }
        }
        return null;
    }

    RoxieQuery.prototype.query = function (options, filter) {
        options = options || {};
        filter = filter || {};
        var request = {
        };
        for (var key in options) {
            request[key] = options[key];
        }
        for (var fKey in filter) {
            request[fKey] = filter[fKey];
        }
        var context = this;
        return this.jsonp(this.url(), request).then(function (response) {
            response = locateRoxieResponse(response);
            if (response) {
                if (context._resultName) {
                    if (response && response[context._resultName] && response[context._resultName].Row) {
                    return nestedRowFix(postFilter(response[context._resultName].Row, filter));
                    }
                } else {
                    for (var key in response) {
                        if (response[key].Row) {
                        return nestedRowFix(postFilter(response[key].Row, filter));
                        }
                    }
                }
            }
            return [];
        });
    };

    function createResult(_espUrl, dataSource, resultName) {
        var espUrl = new Comms.ESPUrl()
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

    return {
        enableCache: function (_) {
            if (!arguments.length) return enableBasicCommsCache;
            enableBasicCommsCache = _;
            if (!_) {
                basicCommsCache = {};
            }
            return this;
        },
        cache: function (_) {
            if (!arguments.length) return basicCommsCache;
            basicCommsCache = _;
            return this;
        },
        WsWorkunits: WsWorkunits,
        Workunit: Workunit,
        WUResult: WUResult,
        createConnection: function (url) {
            url = url || document.URL;
            var testURL = new Comms.ESPUrl()
                .url(url)
            ;
            if (testURL.isWsWorkunits()) {
                var espConnection = Comms.createESPConnection(url);
                if (espConnection instanceof Comms.WsWorkunits && espConnection.wuid()) {
                    return new Workunit(espConnection.getUrl({ pathname: "" }), espConnection.wuid())
                        .url(url)
                    ;
                }
            }
            return null;
        },
        createResult: createResult,
        flattenResult: function (result, mappings) {
            var retVal = {
                columns: [],
                data: []
            };
            if (result && result.length) {
                var colIdx = {};
                if (mappings && mappings.length) {
                    mappings.forEach(function (mapping) {
                        colIdx[mapping.value.toLowerCase()] = retVal.columns.length;
                        retVal.columns.push(mapping.key);
                    });
                } else {
                    for (var key in result[0]) {
                        colIdx[key.toLowerCase()] = retVal.columns.length;
                        retVal.columns.push(key);
                    }
                }

                result.forEach(function (row, rowIdx) {
                    var rowArr = [];
                    for (var key in row) {
                        if (colIdx[key.toLowerCase()] !== undefined) {
                            rowArr[colIdx[key.toLowerCase()]] = row[key];
                        }
                    }
                    retVal.data.push(rowArr);
                });
            }
            return retVal;
        }
    };
}));
