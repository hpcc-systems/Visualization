
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

if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/CalendarHeatMap.js',["d3", "../common/HTMLWidget", "../common/Palette", "css!./CalendarHeatMap"], factory);
    } else {
        root.other_CalendarHeatMap = factory(root.d3, root.common_HTMLWidget, root.common_Palette);
    }
}(this, function (d3, HTMLWidget, Palette) {
    function CalendarHeatMap(target) {
        HTMLWidget.call(this);
    }
    CalendarHeatMap.prototype = Object.create(HTMLWidget.prototype);
    CalendarHeatMap.prototype.constructor = CalendarHeatMap;
    CalendarHeatMap.prototype._class += " other_CalendarHeatMap";

    CalendarHeatMap.prototype._palette = Palette.rainbow("default");
    CalendarHeatMap.prototype.publish("paletteID", "YlOrRd", "set", "Palette ID", CalendarHeatMap.prototype._palette.switch(), { tags: ["Basic", "Shared"] });

    CalendarHeatMap.prototype.publish("dateColumn", null, "set", "Date Column", function () { return this.columns(); }, { optional: true });
    CalendarHeatMap.prototype.publish("datePattern", "%Y-%m-%d", "string", "Date Pattern");
    CalendarHeatMap.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true });
    CalendarHeatMap.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: function (w) { return !w.aggrType(); } });
    CalendarHeatMap.prototype.publish("aggrDeltaColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: function (w) { return !w.aggrType(); } });

    CalendarHeatMap.prototype.calendarData = function () {
        var dateParser = d3.time.format(this.datePattern()).parse;
        var valueFormatter = this.aggrDeltaColumn() ? d3.format(".1%") : d3.format("s");
        if (this._prevDateColumn !== this.dateColumn() ||
            this._prevAggrType !== this.aggrType() ||
            this._prevAggrColumn !== this.aggrColumn() ||
            this._prevAggrDeltaColumn !== this.aggrDeltaColumn()) {
            this._prevDateColumn = this.dateColumn();
            this._prevAggrType = this.aggrType();
            this._prevAggrColumn = this.aggrColumn();
            this._prevAggrDeltaColumn = this.aggrDeltaColumn();
            this._view = this._db.aggregateView([this.dateColumn()], this.aggrType(), this.aggrColumn(), this.aggrDeltaColumn());
        }
        return this._view.entries().map(function (row) {
            row.dateKey = dateParser(row.key);
            row.formattedValues = valueFormatter(row.values);
            return row;
        });
    };

    CalendarHeatMap.prototype.calcDelta = function (row) {
        return (row.Close - row.Open) / row.Open;
    };

    CalendarHeatMap.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        d3.select(domNode.parentNode).style("overflow", "scroll");
    };

    CalendarHeatMap.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._palette = this._palette.switch(this.paletteID());

        var width = this.width(),
            cellSize = (width / 12) / 5,
            height = cellSize * 8;

        var data = this.calendarData();
        var mappedData = d3.map(data, function (d) { return d.dateKey; });
        var dateExtent = d3.extent(data, function (d) {
            return d.dateKey.getFullYear();
        });
        var context = this;
        var svg = element.selectAll("svg").data(d3.range(dateExtent[0], dateExtent[1] + 1));
        svg.enter().append("svg")
            .each(function (d) {
                var svg = d3.select(this);
                svg.append("g")
                   .append("text")
                    .style("text-anchor", "middle")
                ;
            })
        ;
        svg
            .attr("width", width)
            .attr("height", height)
        ;
        svg.select("g")
            .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")")
        ;
        svg.select("text")
            .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
            .text(function (d) { return d; })
        ;
        svg.exit().remove();

        var dataExtent = d3.extent(data, function (d) {
            return d.values;
        });
        if (this.aggrDeltaColumn()) {
            var max = Math.max(Math.abs(dataExtent[0], dataExtent[1]));
            dataExtent = [-max, max];
        }
        var dayRect = svg.select("g").selectAll(".day").data(function (d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); });
        dayRect.enter().append("rect")
            .attr("class", "day")
            .append("title")
        ;
        dayRect
            .attr("x", function (d) { return d3.time.weekOfYear(d) * cellSize; })
            .attr("y", function (d) { return d.getDay() * cellSize; })
            .attr("width", cellSize)
            .attr("height", cellSize)
        ;
        dayRect.select("title")
            .text(function (d) { return d; })
        ;
        dayRect.filter(function (d) { return mappedData.has(d); })
            .style("fill", function (d) {
                return context._palette(mappedData.get(d).values, dataExtent[0], dataExtent[1]);
            })
          .select("title")
            .text(function (d) {
                var data = mappedData.get(d);
                return data.key + ": " + data.formattedValues;
            })
        ;
        dayRect.exit().remove();

        var monthPath = svg.select("g").selectAll(".month").data(function (d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); });
        monthPath.enter().append("path")
            .attr("class", "month")
        ;
        monthPath
            .attr("d", calcMonthPath)
        ;
        monthPath.exit().remove();

        function calcMonthPath(t0) {
            var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
                d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
                d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
            return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize +
                "H" + w0 * cellSize + "V" + 7 * cellSize +
                "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize +
                "H" + (w1 + 1) * cellSize + "V" + 0 +
                "H" + (w0 + 1) * cellSize + "Z";
        }
    };

    CalendarHeatMap.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return CalendarHeatMap;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Comms.js',["es6-promise"], factory);
    } else {
        root.other_Comms = factory();
    }
}(this, function () {
    function espValFix(val) {
        if (val === undefined || val === null) {
            return null;
        }
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
        parser.href = parser.href; //This fixes an IE9/IE10 DOM value issue

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
        this._timeout = 60;
    }
    Comms.prototype = Object.create(ESPUrl.prototype);

    function exists(prop, scope) {
        if (!prop || !scope) {
            return false;
        }
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
        var context = this;
        return new Promise(function (resolve, reject) {
            for (var key in context._proxyMappings) {
                var newUrlParts = url.split(key);
                var newUrl = newUrlParts[0];
                if (newUrlParts.length > 1) {
                    var espUrl = new ESPUrl()
                        .url(url)
                    ;
                    url = newUrl + context._proxyMappings[key];
                    request.IP = espUrl._hostname;
                    request.PORT = espUrl._port;
                    if (newUrlParts.length > 0) {
                        request.PATH = newUrlParts[1];
                    }
                    break;
                }
            }

            var respondedTimeout = context.timeout() * 1000;
            var respondedTick = 5000;
            var callbackName = "jsonp_callback_" + Math.round(Math.random() * 999999);
            window[callbackName] = function (response) {
                respondedTimeout = 0;
                doCallback(response);
                resolve(response);
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
                        reject(Error("Request timeout:  " + script.src));
                    } else {
                        console.log("Request pending (" + respondedTimeout / 1000 + " sec):  " + script.src);
                    }
                }
            }, respondedTick);

            function doCallback(response) {
                delete window[callbackName];
                document.body.removeChild(script);
                if (callback) {
                    console.log("Deprecated:  callback, use promise (Comms.prototype.jsonp)");
                    callback(response);
                }
            }
        });
    };

    Comms.prototype.ajax = function (method, url, request) {
        return new Promise(function (resolve, reject) {
            var uri = url;
            if (request) {
                uri += "?" + serialize(request);
            }
            var xhr = new XMLHttpRequest();
            xhr.onload = function (e) {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(this.response));
                }
                else {
                    reject(Error(this.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error(this.statusText));
            };
            xhr.open(method, uri);
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.send();
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
        this._timeout = _;
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
        if (this._cacheCalls) {
            var context = this;
            return new Promise(function (resolve, reject) {
                var response = JSON.parse(localStorage.getItem("hpcc.viz." + url));
                if (!response) {
                    throw Error("not cached");
                }
                if (callback) {
                    console.log("Deprecated:  callback, use promise (Basic.prototype.call)");
                    callback(response);
                }
                resolve(response);
            }).catch(function (response) {
                return context.get(url).then(function (response) {
                    localStorage.setItem("hpcc.viz." + url, JSON.stringify(response));
                    if (callback) {
                        console.log("Deprecated:  callback, use promise (Basic.prototype.call)");
                        callback(response);
                    }
                    return response;
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
        return this.jsonp(url, request).then(function(response) {
            // Remove "xxxResponse.Result"
            for (var key in response) {
                response = response[key].Results;
                break;
            }
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
            for (key in response) {
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
        return this.jsonp(url, request).then(function (response) {
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
            if (callback) {
                console.log("Deprecated:  callback, use promise (WsWorkunits.prototype._fetchResult)");
                callback(context._resultNameCache[target.resultname]);
            }
            return context._resultNameCache[target.resultname];
        });
    };

    WsWorkunits.prototype.fetchResult = function (target, callback, skipMapping) {
        if (target.wuid) {
            return this._fetchResult(target, callback, skipMapping);
        } else if (target.jobname) {
            var context = this;
            return this.WUQuery(target, function (response) {
                target.wuid = response[0].Wuid;
                return context._fetchResult(target, callback, skipMapping);
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
        return this.jsonp(url, request).then(function (response) {
            if (!exists("WUQueryResponse.Workunits.ECLWorkunit", response)) {
                throw "No workunit found.";
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
        return this.jsonp(url, request).then(function (response) {
            if (exists("WUInfoResponse.Workunit.Results.ECLResult", response)) {
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
    };

    WsWorkunits.prototype.fetchResults = function (callback, skipMapping) {
        var context = this;
        return this.fetchResultNames().then(function (response) {
            var fetchArray = [];
            for (var key in context._resultNameCache) {
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
        var retVal = {};
        for (var key in response) {
            retVal[key] = response[key].filter(function (row, idx) {
                for (var request_key in request) {
                    if (row[request_key] !== undefined && request[request_key] !== undefined && row[request_key] != request[request_key]) { // jshint ignore:line
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
        return this.jsonp(url, request).then(function (response) {
            if (exists("WUGetStatsResponse.Statistics.WUStatisticItem", response)) {
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
    function HIPIERoxie() {
        Comms.call(this);
    }
    HIPIERoxie.prototype = Object.create(Comms.prototype);

    HIPIERoxie.prototype.fetchResults = function (request, callback) {
        var url = this.getUrl({});
        this._resultNameCache = {};
        this._resultNameCacheCount = 0;
        var context = this;
        return this.jsonp(url, request).then(function (response) {
            // Remove "xxxResponse.Result"
            for (var key in response) {
                response = response[key].Results;
                break;
            }
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
            for (key in response) {
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
        var context = this;
        return new Promise(function (resolve, reject) {
            if (callback) {
                console.log("Deprecated:  callback, use promise (HIPIERoxie.prototype.fetchResult)");
                callback(context._resultNameCache[name]);
            }
            resolve(context._resultNameCache[name]);
        });
    };

    HIPIERoxie.prototype.call = function (request, callback) {
        return this.fetchResults(request, callback);
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
        return WsWorkunits.prototype.fetchResultNames.call(this).then(function (response) {
            var fetchArray = [];
            for (var key in context._hipieResults) {
                var item = context._hipieResults[key];
                fetchArray.push(context.fetchResult(item.from));
            }
            return Promise.all(fetchArray).then(function (response) {
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
        if (request.refresh || !this._resultNameCache || !this._resultNameCacheCount) {
            return this.fetchResults(callback);
        } else {
            var context = this;
            return new Promise(function (resolve, reject) {
                var changedFilter = {};
                for (var key in request) {
                    if (request[key] !== undefined && request[key + "_changed"] !== undefined) {
                        changedFilter[key] = request[key];
                    }
                }
                var retVal = {};
                for (var hipieKey in context._hipieResults) {
                    var item = context._hipieResults[hipieKey];
                    var matchedResult = true;
                    for (var key2 in changedFilter) {
                        if (item.filter.indexOf(key2) < 0) {
                            matchedResult = false;
                            break;
                        }
                    }
                    if (matchedResult) {
                        retVal[item.from] = context._resultNameCache[item.from].filter(function (row) {
                            for (var key2 in changedFilter) {
                                if (row[key2] != changedFilter[key2] && row[key2.toLowerCase()] != changedFilter[key2]) { // jshint ignore:line
                                    return false;
                                }
                            }
                            return true;
                        });
                    }
                }
                if (callback) {
                    console.log("Deprecated:  callback, use promise (HIPIEWorkunit.prototype.call)");
                    callback(retVal);
                }
                resolve(retVal);
            });
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
        return new Promise(function (resolve, reject) {
            if (callback) {
                console.log("Deprecated:  callback, use promise (HIPIEDatabomb.prototype.fetchResults)");
                callback(context._resultNameCache);
            }
            resolve(context._resultNameCache);
        });
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
        define('other/HeatMap.js',["d3", "../common/CanvasWidget", "simpleheat", "../common/Palette"], factory);
    } else {
        root.other_HeatMap = factory(root.d3, root.common_CanvasWidget, root.simpleheat, root.common_Palette);
    }
}(this, function (d3, CanvasWidget, simpleheat, Palette) {
    function HeatMap() {
        CanvasWidget.call(this);
    }
    HeatMap.prototype = Object.create(CanvasWidget.prototype);
    HeatMap.prototype.constructor = HeatMap;
    
    HeatMap.prototype._palette = Palette.rainbow("default");
    HeatMap.prototype._class += " other_HeatMap";
    
    HeatMap.prototype.publish("radius", 15, "number", "Set point radius", null, { tags: ["Basic"] });
    HeatMap.prototype.publish("blur", 15, "number", "Set point blur", null, { tags: ["Basic"] });
    HeatMap.prototype.publish("max", 1, "number", "Set max data value", null, { tags: ["Basic"] });
    
    HeatMap.prototype.publish("gradient", {0.4:"blue",0.6:"cyan",0.7:"lime",0.8:"yellow",1.0:"red"}, "object", "Set gradient colors", null, { tags: ["Basic"] });

    HeatMap.prototype.publish("usePalette", false, "boolean", "If true, uses paletteID and colorCount to determine gradient",null,{tags:["Basic"]});

    HeatMap.prototype.publish("colorCount", 10, "number", "Top left x-value",null,{tags:["Basic"]});
    HeatMap.prototype.publish("paletteID", "default", "set", "Palette ID", HeatMap.prototype._palette.switch(), { tags: ["Basic"] });
    HeatMap.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

    HeatMap.prototype.publish("topLeftX", null, "number", "Top left x-value", null, { tags: ["Basic"], optional: true });
    HeatMap.prototype.publish("topLeftY", null, "number", "Top left y-value", null, { tags: ["Basic"], optional: true });
    HeatMap.prototype.publish("bottomRightX", null, "number", "Bottom right x-value", null, { tags: ["Basic"], optional: true });
    HeatMap.prototype.publish("bottomRightY", null, "number", "Bottom right y-value", null, { tags: ["Basic"], optional: true });

    HeatMap.prototype.enter = function (domNode, element) {
        CanvasWidget.prototype.enter.apply(this, arguments);
        // canvas size needs to be set before render
        this.resize(this._size);
        this._heat = simpleheat(domNode);
    };

    HeatMap.prototype.update = function (domNode, element) {
        CanvasWidget.prototype.update.apply(this, arguments);
        
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
        
        if(this.topLeftX_exists() && this.topLeftY_exists() && this.bottomRightX_exists() && this.bottomRightY_exists()){
            this._heat.data(this.skewedData());
        } else {
            this._heat.data(this.data());
        }
        

        if(this.radius()){
            this._heat.radius(this.radius(), this.blur());
        }
        if(this.usePalette()){
            var grad = {};
            for(var idx = 1;idx<=this.colorCount();idx++){
                var value = idx/this.colorCount();
                grad[value] = this._palette(idx,1,this.colorCount());
            }
            this._heat.defaultGradient = grad;
            this._heat.gradient(grad);
        }else if(this.gradient()){
            this._heat.defaultGradient = this.gradient();
            this._heat.gradient(this.gradient());
        }

        this._heat.draw();    
    };

    HeatMap.prototype.exit = function(domNode, element) {
        delete this._heat;
        CanvasWidget.prototype.exit.apply(this, arguments);
    };
    
    HeatMap.prototype.resize = function(size) {
        CanvasWidget.prototype.resize.apply(this, arguments);
        if(this._heat !== undefined){
            this._heat.resize();
        }
    };
    
    HeatMap.prototype.skewedData = function() {
        var context = this;
        var retArr = [];
        var arr = this.data();
        var box = this.element().node().getBoundingClientRect();
        
        var coordsWidth = this.bottomRightX() - this.topLeftX();
        var coordsHeight = this.bottomRightY() - this.topLeftY();
        
        var pixelValueX = coordsWidth / box.width;
        var pixelValueY = coordsHeight / box.height;
        
        arr.forEach(function(n){
            var left = Math.abs(n[0] - context.topLeftX());
            var top = Math.abs(n[1] - context.topLeftY());
            
            var newX = left / pixelValueX;
            var newY = top / pixelValueY;
            
            retArr.push([newX,newY,n[2]]);
        });
        
        return retArr;
    };
 
    return HeatMap;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Html.js',["../common/HTMLWidget","css!./Html"], factory);
    } else {
        root.other_Html = factory(root.common_HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function HTML() {
        HTMLWidget.call(this);
        this._tag = "div";
    }
    HTML.prototype = Object.create(HTMLWidget.prototype);
    HTML.prototype.constructor = HTML;
    HTML.prototype._class += " other_Html";
    
    HTML.prototype.publish("html", "", "string", "Html to render", null, { tags: ["Basic"] });
    HTML.prototype.publish("overflowX", null, "set", "CSS overflow-x", ["","visible","hidden","scroll","auto","initial","inherit"], { tags: ["Basic"], optional:true });
    HTML.prototype.publish("overflowY", null, "set", "CSS overflow-y", ["","visible","hidden","scroll","auto","initial","inherit"], { tags: ["Basic"], optional:true });

    HTML.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    HTML.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        element.style({
            "overflow-x":this.overflowX_exists() ? this.overflowX() : "",
            "overflow-y":this.overflowY_exists() ? this.overflowY() : "",
        });
            
        var html = element.selectAll(".htmlWrapper").data(this.data().length > 0 ? this.data() : [this.html()]);
        html.enter().append("div")
            .attr("class", "htmlWrapper")
        ;
        html
            .html(function (d) { return d; })
        ;
        html.exit().remove();
    };

    return HTML;
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

    Paginator.prototype.postUpdate = function (domNode, element) { };

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
        define('other/Table.js',["d3", "../common/HTMLWidget", "./Paginator", "../common/Utility", "../common/Widget", "css!./Table"], factory);
    } else {
        root.other_Table = factory(root.d3, root.common_HTMLWidget, root.other_Paginator, root.common_Utility, root.common_Widget);
    }
}(this, function (d3, HTMLWidget, Paginator, Utility, Widget) {
    function Table() {
        HTMLWidget.call(this);
        this._tag = "div";
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
    Table.prototype.publish("paginationLimit", null, "number", "Maximum number of rows allowed before pagination defaults to on",null,{tags:["Private"]});
    Table.prototype.publishProxy("itemsPerPage", "_paginator");
    Table.prototype.publishProxy("pageNumber", "_paginator", "pageNumber",1);
    Table.prototype.publishProxy("adjacentPages", "_paginator");
    Table.prototype.publish("topN", null, "number", "Total number or rows of data to be displayed in the table",null,{tags:["Private"]});
    Table.prototype.publish("pivot", false, "boolean", "Pivot Table");
    Table.prototype.publish("showHeader", true, "boolean", "Show or hide the table header", null, { tags: ["Private"] });
    Table.prototype.publish("fixedHeader", true, "boolean", "Enable or disable fixed table header",null,{tags:["Private"]});
    Table.prototype.publish("fixedColumn", false, "boolean", "Enable or disable fixed first column",null,{tags:["Private"]});
    Table.prototype.publish("multiSelect", false, "boolean", "Multiple Selection", null, { tags: ["Basic"] });

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
    Table.prototype.publish("tbodyFirstColFontColor", null, "html-color", "Table body first column font color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodyFirstColBackgroundColor", null, "html-color", "Table body first column background color", null, { tags: ["Basic"], optional: true });
    
    Table.prototype.publish("tbodyHoverRowFontColor", null, "html-color", "Table body hover row font color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodyHoverRowBackgroundColor", null, "html-color", "Table body hover row background color", null, { tags: ["Basic"], optional: true });
    
    Table.prototype.publish("tbodySelectedRowFontColor", null, "html-color", "Table body selected row color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodySelectedRowBackgroundColor", null, "html-color", "Table body selected row color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tableZebraColor", null, "html-color", "Table zebra row color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("totalledColumns", [], "array", "Array of indices of the columns to be totalled", null, { tags: ["Basic"], optional: true, disable: function (w) { return w.pivot();} });
    Table.prototype.publish("totalledLabel", null, "string", "Adds a label to the first column of the 'Totalled' row", null, { tags: ["Basic"], optional: true, disable: function (w) { return w.pivot(); } });
    
    Table.prototype.publish("stringAlign", "left", "set", "Array of alignment positions for strings", ["left","right","center"], { tags: ["Basic"], optional: true });
    Table.prototype.publish("numberAlign", "right", "set", "Array of alignment positions for numbers", ["left","right","center"], { tags: ["Basic"], optional: true });

    Table.prototype.publish("minWidgetWidth", null, "number", "Minimum width of a child widget", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("minWidgetHeight", null, "number", "Minimum height of a child widget", null, { tags: ["Basic"], optional: true });

    Table.prototype.publish("sortByFieldIndex", null, "number", "Index for the field/column to sort the data", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("descending", false, "boolean", "Direction for sorting the data: ascending (true) or descending (false)", null, { tags: ["Basic"], optional: true });

    Table.prototype.size = function (_) {
        var retVal = HTMLWidget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            if (this.tableDiv) {
                var topMargin = this.showHeader() && this.fixedHeader() ? this.thead.property("offsetHeight") : 0;
                this.tableDiv
                    .style("width", this._size.width + "px")
                    .style("height", this._size.height - topMargin + "px")
                ;
                this._element
                    .style("width", this._size.width + "px")
                    .style("height", this._size.height + "px")
                ;
            }
        }

        return retVal;
    };

    var origColumns = Table.prototype.columns;
    Table.prototype.columns = function (_) {
        var retVal = origColumns.apply(this, arguments);
        if (!arguments.length && this.pivot()) {
            return this._db.column(0);
        }
        return retVal;
    };

    var origData = Table.prototype.data;
    Table.prototype.data = function (_) {
        var retVal = origData.apply(this, arguments);
        if (!arguments.length && this.pivot()) {
            return this._db.columns().filter(function (col, idx) { return idx > 0; });
        }
        return retVal;
    };

    var noTransform = { transform: function (d) { return d; } };
    Table.prototype.field = function (rowIdx, colIdx) {
        if (this.pivot()) {
            if (colIdx === 0) return noTransform;
            return this.fields()[rowIdx + 1];
        }
        if (rowIdx === -1) return noTransform;
        return this.fields()[colIdx];
    };

    Table.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "hidden");

        this.tableDiv = element.append("div").attr("class", "tableDiv");
        this.table = this.tableDiv.append("table");
        this.fixedHead =  element.append("div").classed("header-wrapper", true);
        this.fixedHeadTable = this.fixedHead.append("table");
        this.fixedThead = this.fixedHeadTable.append("thead").append("tr");
        this.unfixedThead = this.table.append("thead").append("tr");
        this.tbody = this.table.append("tbody");
        this.tfoot = this.table.append("tfoot").append("tr");
        this.fixedCol = element.append("div").classed("rows-wrapper", true);
        this.fixedColTable = this.fixedCol.append("table");
        this.fixedColHead = this.fixedColTable.append("thead");
        this.fixedColHeadRow = this.fixedColHead.append("tr");
        this.fixedColBody = this.fixedColTable.append("tbody");
        this.fixedColFoot = this.fixedColTable.append("tfoot");
        this.fixedColFootRow = this.fixedColFoot.append("tr");

        this.tableDiv
            .style("overflow", "auto")
        ;

        this._childWidgets = [];
    };

    Table.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        this.element().selectAll("table,tbody,th,td").style("width", null);

        if (this.sortByFieldIndex_exists() && (this._prevSortByFieldIndex !== this.sortByFieldIndex() || this._prevDescending !== this.descending())) {
            Utility.multiSort(this.data(), [{ idx: this.sortByFieldIndex(), reverse: this.descending() }]);
            this._prevSortByFieldIndex = this.sortByFieldIndex();
            this._prevDescending = this.descending();
        }

        this._childWidgets.forEach(function(d, i) {
            d.target(null);
        });
        this._childWidgets = [];

        if (this.fixedHeader()) {
            this.thead = this.fixedThead;
        } else {
            this.thead = this.unfixedThead;
        }
        this.fixedHead.style("display", this.fixedHeader() ? "table-row" : "none");
        this.unfixedThead.style("display", this.fixedHeader() ? "none" : "table-row");

        var th = this.thead.selectAll("th").data(this.showHeader() ? this.columns() : [], function (d) { return d; });
        th
            .enter()
            .append("th")
                .each(function (d) {
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
            .on("click", function (column, idx) {
                context.headerClick(column, idx);
            })
        ;
        th
            .style("background-color",this.theadRowBackgroundColor())
            .style("border-color",this.theadCellBorderColor())
            .style("color",this.theadFontColor())
            .style("font-size",this.theadFontSize())
        ;
        th.select(".thText")
            .style("font-family",this.theadFontFamily())
            .text(function (column, idx) {
                return context.field(-1, idx).transform(column);
            })
        ;
        th.select(".thIcon")
            .text(function (column, idx) {
                if (context.descending()) {
                    return context.sortByFieldIndex() === idx ? "\uf078" : "";
                } else {
                    return context.sortByFieldIndex() === idx ? "\uf077" : "";
                }
            })
        ;
        th.exit()
            .remove()
        ;
        th.order();

        if (this.paginationLimit()) {
            this.pagination(this.data().length >= parseInt(this.paginationLimit()) ? true : false);
        }
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
        } else {
            this._paginator.numItems(0); // remove widget
        }

        // pageNumber starts at index 1
        var startIndex = this.pageNumber() - 1;
        var itemsOnPage = this.itemsPerPage();

        var start = startIndex * itemsOnPage;
        var end = parseInt(startIndex * itemsOnPage) + parseInt(itemsOnPage);

        var tData = null;

        if (this.topN()) {
            tData = this.data().slice(0, this.topN());
        } else if (this.pagination()) {
            tData = this.data().slice(start, end);
        } else {
            tData = this.data();
        }

        var totalRow = [this.totalledLabel() ? this.totalledLabel() : null];
        if (context.totalledColumns().length !== 0) {
            for(var i=0; i < context.totalledColumns().length; i++) context.totalledColumns()[i] = +context.totalledColumns()[i];

            for (var j = 1; j < context.columns().length; j++) {
                var sum = 0;
                if (context.totalledColumns().indexOf(j) !== -1) {
                    for (var k = 0; k < tData.length; k++) {
                        sum = sum + tData[k][j];
                    }
                    totalRow.push(sum);
                } else {
                    totalRow.push("");
                }
            }

            var tf = this.tfoot.selectAll("td").data(totalRow);
            tf.enter()
                .append("td")
            ;
            tf[this.renderHtmlDataCells() ? "html" : "text"](function (d, idx) { 
                return context.fields()[idx].transform(d);
            });
            tf.exit()
                .remove()
            ; 
            tf
                .style("background-color",this.tfootRowBackgroundColor())
                .style("border-color",this.tfootCellBorderColor())
                .style("color",this.tfootFontColor())
                .style("font-size",this.tfootFontSize())
            ;
        }

        var rows = this.tbody.selectAll("tr").data(tData.map(function (d, idx) {
            //  TODO - Move fix closer to data source?
            for (var i = 0; i < d.length; ++i) {
                if (d[i] === undefined) {
                    d[i] = null;
                }
            }
            return {
                rowIdx: idx,
                row: d
            };
        }));
        rows.enter()
            .append("tr")
            .on("click.selectionBag", function (_d) {
                var d = _d.row;
                var i = _d.rowIdx;
                context.selectionBagClick(d, i);
                context.applyRowStyles(context.getBodyRow(i));
                context.applyFirstColRowStyles(context.getFixedRow(i));
                context.click(context.rowToObj(d), i, context._selectionBag.isSelected(context._createSelectionObject(d)));
            })
            .on("mouseover", function (_d) {
                var i = _d.rowIdx;
                var fixedLeftRows = context.getFixedRow(i);
                if (!fixedLeftRows.empty()) { 
                    fixedLeftRows.classed("hover", true);
                }
                var tbodyRows = context.getBodyRow(i);
                tbodyRows.classed("hover", true);
                context.applyStyleToRows(tbodyRows);
                context.applyFirstColRowStyles(fixedLeftRows);
            })
            .on("mouseout", function (_d) {
                var i = _d.rowIdx;
                var fixedLeftRows = context.getFixedRow(i);
                fixedLeftRows.classed("hover", false);
                var tbodyRows = context.getBodyRow(i);
                tbodyRows.classed("hover", false);
                context.applyStyleToRows(tbodyRows);
                context.applyFirstColRowStyles(fixedLeftRows);
            })
        ;
        rows
            .classed("selected", function (_d) {
                var d = _d.row;
                return context._selectionBag.isSelected(context._createSelectionObject(d));
            })
            .classed("trId" + context._id, true)
        ;
        rows.exit()
            .remove()
        ;

        var cells = rows.selectAll("td").data(function (_d) {
            return _d.row.filter(function (cell, idx) { return idx < context.columns().length; }).map(function (cell, idx) {
                return {
                    rowIdx: _d.rowIdx,
                    colIdx: idx,
                    cell: cell
                };
            });
        });
        cells.enter()
            .append("td")
        ;
        cells[this.renderHtmlDataCells() ? "html" : "text"](function (d, colIdx) {
            if (!(d.cell instanceof Widget)) {
                return context.field(d.rowIdx, d.colIdx).transform(d.cell);
            }
            return; 
        });
        cells.exit()
            .remove()
        ;

        rows.each(function(tr,trIdx){
            var dis = d3.select(this);
            dis.selectAll("td").each(function(tdContents, tdIdx){    
                var alignment = context.getColumnAlignment(tdContents.rowIdx, tdContents.colIdx, tdContents.cell);
                var el = d3.select(this);
                el
                    .style({
                        "height": null,
                        "text-align": alignment
                    })
                    .classed("tr-"+trIdx+"-td-"+tdIdx,true)
                ;
                if (tdContents.cell instanceof Widget) {
                    if (context.pagination()) {
                        console.log("Warning: displaying another widget in the table may cause problems with pagination");
                    }
                    if (tdContents.cell.size().height === 0 ) {
                        tdContents.cell.height(context.minWidgetHeight());
                        tdContents.cell.width(this.offsetWidth > context.minWidgetWidth() ? this.offsetWidth : context.minWidgetWidth());
                    }
                    tdContents.cell.target(null);
                    tdContents.cell.target(this);
                    tdContents.cell._parentWidget = context;
                    if (tdContents.cell._class.indexOf("childWidget") < 0) {
                        tdContents.cell._class = "childWidget " + tdContents._class;
                    }
                    tdContents.cell.render();
                    context._childWidgets.push(tdContents.cell);
                }
            });
            context.applyStyleToRows(dis);
        });  

        var tableMarginHeight = parseInt(this.thead.node().offsetHeight);

        if (this.pagination() && this._childWidgets.length) {
            this.tableDiv.style("overflow-y", "auto");
            this.table.style("margin-bottom", "50px");
        } else {
            this.tableDiv.style("overflow-y", null);
            this.table.style("margin-bottom", null);

        }
        this.size(this._size);

        var fixedColWidth = 0;
        var fixedColTh = this.fixedColHeadRow.selectAll("th").data(this.fixedColumn() && this.showHeader() ? [this.columns()[0]] : []);
        fixedColTh
            .enter()
            .append("th")
                .each(function (d) {
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
            .on("click", function (column, idx) {
                context.headerClick(column, idx);
            })
        ;
        fixedColTh
            .style("background-color",this.theadRowBackgroundColor())
            .style("border-color",this.theadCellBorderColor())
            .style("color",this.theadFontColor())
            .style("font-size",this.theadFontSize())
        ;
        fixedColTh.select(".thText")
            .style("font-family",this.theadFontFamily())
            .text(function (column) {
                return column;
            })
        ;
        fixedColTh.select(".thIcon")
            .text(function (column, idx) {
                if (context.descending()) {
                    return context.sortByFieldIndex() === idx ? "\uf078" : "";
                } else {
                    return context.sortByFieldIndex() === idx ? "\uf077" : "";
                }
            })
        ;
        fixedColTh.exit()
            .remove()
        ;

        var fixedColTr = this.fixedColBody.selectAll("tr").data(this.fixedColumn() ? tData : []);
        fixedColTr.enter()
            .append("tr")
            .attr("class", function(){
                return "trId" + context._id;
            })
        ;
        fixedColTr
            .on("click", function (d, i) {
                d3.select(rows[0][i]).on("click.selectionBag")(rows.data()[i], i)
                ;
            })
            .on("mouseover", function (d, i) {
                d3.select(rows[0][i]).on("mouseover")(rows.data()[i], i)
                ;
            })
            .on("mouseout", function (d, i) {
                d3.select(rows[0][i]).on("mouseout")(rows.data()[i], i)
                ;
            })
            .classed("selected", function (d) {
                return context._selectionBag.isSelected(context._createSelectionObject(d));
            })
        ;
        fixedColTr.exit()
            .remove()
        ;
        var fixedColTd = fixedColTr.selectAll("td").data(function(d, i) {
            return [d[0]];
        });
        fixedColTd
            .enter()
            .append("td")
        ;
        fixedColTd[this.renderHtmlDataCells() ? "html" : "text"](function (d) { 
            if(typeof(d) === "string"){
                return d.trim();
            } else if (typeof(d) === "number") {
                return d;
            }
            return ""; 
        });
        fixedColTd.exit()
            .remove()
        ;

        var fixedColFootTd = this.fixedColFootRow.selectAll("td").data(this.fixedColumn() && this.totalledLabel() ? [this.totalledLabel()] : []);
        fixedColFootTd
            .enter()
            .append("td")
        ;
        fixedColFootTd[this.renderHtmlDataCells() ? "html" : "text"](function (d) { 
            if(typeof(d) === "string"){
                return d.trim();
            } else if (typeof(d) === "number") {
                return d;
            }
            return ""; 
        });
        fixedColFootTd.exit()
            .remove()
        ;

        if (this.fixedColumn() && !this.fixedSize() && fixedColTd.length) {
            if (this.showHeader()) {
                fixedColWidth = fixedColTd.property("offsetWidth") > fixedColTh.property("offsetWidth") ? fixedColTd.property("offsetWidth") : fixedColTh.property("offsetWidth");
            } else {
                fixedColWidth = fixedColTd.property("offsetWidth");
            }
            this.fixedCol
                .style("position", "absolute")
                .style("margin-top", -this.tableDiv.property("scrollTop") + tableMarginHeight + "px")
            ;
            fixedColTd
                .style("width", fixedColWidth + "px")
            ;
            this.fixedColHead
                .style("position", "absolute")
                .style("margin-top", (this.fixedHeader() ? this.tableDiv.property("scrollTop"): 0) - tableMarginHeight + "px")
            ;
            fixedColTh
                .style("width", fixedColWidth + "px")
            ;
            rows.each(function(d, i) {
                var height = d3.select(this).select("td").property("offsetHeight");
                d3.select(fixedColTd[i][0]).style("height", height + "px");
            });
        }

        this.table
            .style("margin-left", -fixedColWidth + "px" )
        ;
        this.tableDiv
            .style("margin-left", fixedColWidth + "px" )
            .style("width", this.width() - fixedColWidth + "px")
        ;

        this._paginator.render();
        
        this._paginator
            .right((this.hasVScroll(this.tableDiv) ? this.getScrollbarWidth() : 0 ) + this._paginatorTableSpacing)
            .bottom((this.hasHScroll(this.tableDiv) ? this.getScrollbarWidth() : 0) + this._paginatorTableSpacing)
            .render()
        ;

        if (!rows.empty()) this.setColumnWidths(rows);

        if(this.fixedSize()) {
            var box = d3.select(".tableDiv > table").node().getBoundingClientRect();
            var newTableHeight, finalWidth, maxWidth;
            if (box.width !== 0 && box.height !== 0) {
                calcWidth();
                calcHeight();
            } else {
                if (box.height - tableMarginHeight <= context.tableDiv.property("offsetHeight") ) {
                    calcHeight();
                } else {
                    if (context.fixedHeader()) {
                        newTableHeight = context.property("offsetHeight");
                        newTableHeight = newTableHeight + "px";
                    } else {
                        newTableHeight ="100%";
                    }
                }
                if (box.width - fixedColWidth < context.tableDiv.property("offsetWidth") ) {
                    calcWidth();
                } else {
                    if (context.fixedColumn()) {
                        finalWidth = context.property("offsetWidth") - fixedColWidth;
                        finalWidth = finalWidth + "px";
                    } else {
                        finalWidth = "100%";
                    }
                }            
            }
            if (element.classed("childWidget")) {
                context._parentElement
                    .style("width", finalWidth + "px")
                    .style("height", newTableHeight + "px")
                ;
                context.tableDiv
                    .style("overflow", "hidden")
                ;
            }
            context.size({width:finalWidth, height: newTableHeight});
        }

        this.setOnScrollEvents(this.tableDiv.node(), tableMarginHeight);

        function calcWidth() {
            var newTableWidth = box.width;
            maxWidth = context.tbody.property("offsetWidth") + 1;
            finalWidth = newTableWidth > maxWidth ? maxWidth : newTableWidth;
            finalWidth = finalWidth;
        }

        function calcHeight() {
            newTableHeight = context.tbody.property("offsetHeight") + tableMarginHeight;
            newTableHeight = newTableHeight;
        }
    };

    Table.prototype.exit = function (domNode, element) {
        this._paginator.target(null);
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
        
    Table.prototype.setColumnWidths = function(rows) {
        var context = this;
        var firstRow = rows.filter(function(d,i){ return i === 0; });

        var tds = [];
        firstRow.each(function(d) {
            tds = d3.selectAll(this.childNodes);
        });

        var tableMarginHeight = this.fixedHeader() ? this.thead.property("offsetHeight") : 0;
        var totalWidth = 1;
        var tdWidths = {};

        tds.each(function(d, i) {
            tdWidths[i] = this.offsetWidth;
        });

        var th = this.thead.selectAll("th");
        th.each(function(d, i) {
            var thwidth = this.offsetWidth;
            var tdwidth = tds.empty() ? 0 : tdWidths[i];
            var usewidth = thwidth >= tdwidth ? thwidth : tdwidth;
            this.style.width = usewidth + "px";
            if (!tds.empty() &&  tds[0][i]) {
                tds[0][i].style.width = usewidth + "px";
            }
            totalWidth += usewidth;
        });
        this.thead
            .style("position", this.fixedHeader() ? "absolute" : "relative")
            .style("width", totalWidth + "px")
            .style("margin-top", "0px")
        ;
        this.table
            .style("width", totalWidth + "px" )
        ;
        this.tableDiv
            .style("margin-top", (context.fixedHeader() ? tableMarginHeight : 0) + "px" )
        ;
        this.tbody
            .style("width", totalWidth + "px" )
        ;
    };

    Table.prototype.getBodyRow = function(i) {
        return this.table.selectAll("tbody tr.trId" + this._id)
            .filter(function (d, idx) {
                return idx === i;
            })
        ;
    };

    Table.prototype.getFixedRow = function(i) {
        return this._element.selectAll(".rows-wrapper tbody tr")
            .filter(function (d, idx) {
                return idx === i;
            })
        ;
    };

    Table.prototype.setOnScrollEvents = function(scrollNode, margHeight) {
        var context = this;
        scrollNode.onscroll = function (e) {
            var topDelta = e.target.scrollTop;
            var leftDelta = e.target.scrollLeft;
            if (context.fixedHeader()) {
                context.thead
                    .style("margin-left", -leftDelta +  "px")
                ;
            }
            if (context.fixedColumn()) {
                context.fixedCol
                    .style("margin-top", -topDelta + margHeight + "px")
                ;
                if (context.fixedHeader()) {
                    context.fixedColHead
                        .style("margin-top", topDelta - margHeight + "px")
                    ;
                }
            }
        };
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
                return context.tbody ? context.tbody.selectAll("tr").filter(function (d2) { return d2 === d; }) : d3.select();
            }
        };
    };

    Table.prototype._calcRowsPerPage = function(th) {
        if (this._paginator.numItems() === 0) { // only run on first render
            this._paginator.numItems(1);
            this.itemsPerPage(1);
        }
        this._paginator.render();

        var thHeight = this.thead.selectAll("th").node() ? this.thead.selectAll("th").node().clientHeight : 0;
        var tfootHeight = this.tfoot.selectAll("td").node() ? this.tfoot.selectAll("td").node().clientHeight : 0;
        var tmpRow = this._generateTempRow();
        var tcellHeight = tmpRow.node().clientHeight;
        tmpRow.remove();
        var paginatorHeight = this.calcHeight(this._paginator.element());
        var ipp = Math.floor((this.height() - thHeight - tfootHeight- paginatorHeight - (this.table.style("width") >= this.table.style("width") ? this.getScrollbarWidth() : 0) - this._paginatorTableSpacing * 2) / tcellHeight) || 1;
        return ipp;
    };

    Table.prototype.sort = function (idx) {
        if (this.sortByFieldIndex() !== idx) {
            this.descending(false);
        } else {
            this.descending(!this.descending());
        }
        this.sortByFieldIndex(idx);

        return this;
    };

    Table.prototype.selection = function (_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) { return d._id; });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    };

    Table.prototype.selectionBagClick = function (d, i) {
        if (this.multiSelect() && d3.event.shiftKey && this._selectionPrevClick) {
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
        } else if (this.multiSelect()) {
            this._selectionBag.click(this._createSelectionObject(d), d3.event);
            this._selectionPrevClick = d;
        } else {
            var selObj = this._createSelectionObject(d);
            this._selectionBag.click(selObj, { ctrlKey: this._selectionBag.isSelected(selObj) });
            this._selectionPrevClick = d;
        }
        this.render();
    };

    Table.prototype.applyHoverRowStyles = function(row){
        var context = this;
        row
            .style("color",context.tbodyHoverRowFontColor())
            .style("background-color",context.tbodyHoverRowBackgroundColor())
        ;
    };
    Table.prototype.applySelectedRowStyles = function(row){
        var context = this;
        row
            .style("color",context.tbodySelectedRowFontColor())
            .style("background-color",context.tbodySelectedRowBackgroundColor())
        ;
    };
    Table.prototype.applyRowStyles = function(row, isFirstCol){
        row
            .style("color", isFirstCol ? this.tbodyFirstColFontColor() : this.tbodyFontColor())
            .style("background-color", isFirstCol ? this.tbodyFirstColBackgroundColor() : this.tableZebraColor_exists() && this.data().indexOf(row.datum()) % 2 ? this.tbodyRowBackgroundColor() : this.tableZebraColor())
        ;
    };
    Table.prototype.applyFirstColRowStyles = function(rows){
        this.applyStyleToRows(rows,true);
    };
    Table.prototype.applyStyleToRows = function(rows,isFirstCol){
        isFirstCol = typeof isFirstCol !== "undefined" ? isFirstCol : false;
        var context = this;
        rows.each(function () {
                var tr = d3.select(this);
                if (tr.classed("hover")) {
                    context.applyHoverRowStyles(tr);
                } else if (tr.classed("selected")) {
                    context.applySelectedRowStyles(tr);
                } else {
                    context.applyRowStyles(tr,isFirstCol);
                }
            })
        ;
    };

    Table.prototype.getColumnAlignment = function (rowIdx, colIdx, cell) {
        var field = this.field(rowIdx, colIdx);
        switch (field.__prop_type) {
            case "string":
                return this.stringAlign();
            case "number":
                return this.numberAlign();
            case "":
            case undefined:
                switch (typeof cell) {
                    case "string":
                        return this.stringAlign();
                    case "number":
                        return this.numberAlign();
                }
        }
        return null;
    };

    Table.prototype.click = function (row, column, selected) {
        function replacer(key, value) {
            if (value instanceof Widget) {
                return "Widget with class: " + value.classID();
            }
            return value;
        }
        console.log("Click:  " + JSON.stringify(row, replacer) + ", " + column + "," + selected);
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
        define('other/Legend.js',["d3", "./Table", "../common/Palette", "css!./Legend"], factory);
    } else {
        root.other_Legend = factory(root.d3, root.other_Table, root.common_Palette);
    }
}(this, function (d3, Table, Palette) {
    function Legend() {
        Table.call(this);
        this._tag = "div";
        
        this.showHeader(false);
    }
    Legend.prototype = Object.create(Table.prototype);
    Legend.prototype.constructor = Legend;
    Legend.prototype._class += " other_Legend";

    Legend.prototype.publish("dataFamily", "ND", "set", "Type of data",["1D","2D","ND", "any"],{tags:["Private"]});
    Legend.prototype.publish("orientation", "vertical", "set", "Orientation of Legend rows",["vertical","horizontal"],{tags:["Private"]});
    
    Legend.prototype.targetWidget = function (_) {
        if (!arguments.length) return this._targetWidget;
        this._targetWidget = _;
        if (this._targetWidgetMonitor) {
            this._targetWidgetMonitor.remove();
            delete this._targetWidgetMonitor;
        }
        var context = this;
        this._targetWidgetMonitor = this._targetWidget.monitor(function (key, newProp, oldProp, source) {
            switch (key) {
                case "chart":
                case "columns":
                case "data":
                case "paletteID":
                    context.lazyRender();
                    break;
            }
        });
        return this;
    };

    Legend.prototype.getWidget = function () {
        if (this._targetWidget) {
            switch (this._targetWidget.classID()) {
                case "chart_MultiChart":
                    return this._targetWidget.chart();
            }
        }
        return this._targetWidget;
    };

    Legend.prototype.getPalette = function () {
        var widget = this.getWidget();
        if (widget && widget._palette) {
            switch (widget._palette.type()) {
                case "ordinal":
                    return Palette.ordinal(widget._palette.id());
                case "rainbow":
                    return Palette.rainbow(widget._palette.id());
            }
        }
        return Palette.ordinal("default");
    };

    Legend.prototype.enter = function (domNode, element) {
        Table.prototype.enter.apply(this, arguments);
        this.renderHtmlDataCells(true);
        this.fixedHeader(false);
        this.fixedSize(true);
        element.classed("other_Legend", true);
    };

    function _htmlColorBlock(hexColor) {
        return "<div class=\"colorBlock\" style=\"background-color:" + hexColor + ";\"></div>";
    }
    function commaSeparateNumber(val) {
        var int = val.toString().split(".")[0];
        var dec = val.toString().split(".")[1];
        while (/(\d+)(\d{3})/.test(int.toString())) {
            int = int.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
        }
        return typeof (dec) !== "undefined" ? int + "." + dec : int;
    }
    Legend.prototype.update = function (domNode, element) {
        var colArr = ["Key", "Label"];
        var dataArr = [];
        if (this._targetWidget) {
            var palette = this.getPalette();
            switch (palette.type()) {
                case "ordinal":
                    switch (this.dataFamily()) {
                        case '2D':
                            dataArr = this._targetWidget.data().map(function (n) {
                                return [_htmlColorBlock(palette(n[0])), n[0]];
                            }, this);
                            break;
                        case 'ND':
                            var widgetColumns = this._targetWidget.columns();
                            dataArr = widgetColumns.filter(function (n, i) { return i > 0; }).map(function (n) {
                                return [_htmlColorBlock(palette(n)), n];
                            }, this);
                            break;
                    }
                    break;
                case "rainbow":
                    var colorArr = palette.colors().reverse();
                    var steps = colorArr.length;
                    var weightMin = this._targetWidget._dataMinWeight;
                    var weightMax = this._targetWidget._dataMaxWeight;
                    for (var x = 0; x < steps; x++) {
                        var stepWeightDiff = parseInt((weightMax - weightMin) / steps);
                        var lower, higher;
                        if (x === 0) {
                            higher = commaSeparateNumber(weightMin + stepWeightDiff * (x + 1));
                            dataArr.push([_htmlColorBlock(colorArr[x]), "0 - " + higher]);
                        } else if (x + 1 === steps) {
                            lower = commaSeparateNumber(weightMin + (stepWeightDiff * x) + 1);
                            dataArr.push([_htmlColorBlock(colorArr[x]), lower + "+"]);
                        } else {
                            lower = commaSeparateNumber(weightMin + (stepWeightDiff * x) + 1);
                            higher = commaSeparateNumber(weightMin + stepWeightDiff * (x + 1));
                            dataArr.push([_htmlColorBlock(colorArr[x]), lower + " - " + higher]);
                        }
                    }
                    break;
            }
        }
        this.columns(colArr);
        this.data(dataArr);
        Table.prototype.update.apply(this, arguments);

        element.classed("horiz-legend",this.orientation() === "horizontal");
        
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
        var context = this;
        rows
            .on("click",function(d,i){
                context.onClick(d,i);
            })
            .on("mouseover",function(d,i){
                context.onMouseOver(d,i);
            })
        ;
    };
    
    Legend.prototype.exit = function (domNode, element) {
        if (this._targetWidgetMonitor) {
            this._targetWidgetMonitor.remove();
            delete this._targetWidgetMonitor;
        }
        Table.prototype.exit.apply(this, arguments);
    };

    Legend.prototype.onClick = function (rowData, rowIdx) {
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
        define('other/NestedTable.js',["./Table"], factory);
    } else {
        root.other_NestedTable = factory(root.other_Table);
    }
}(this, function (Table) {
    function NestedTable(target) {
        Table.call(this);
        this.minWidgetHeight(240);
        this.minWidgetWidth(360);
    }
    NestedTable.prototype = Object.create(Table.prototype);
    NestedTable.prototype.constructor = NestedTable;
    NestedTable.prototype._class += " other_NestedTable";

    var origColumns = NestedTable.prototype.columns;
    NestedTable.prototype.columns = function (_) {
        if (arguments.length) {
            this._columns = _;
            return origColumns.call(this, _.map(function (col) {
                if (typeof col === "object") {
                    return col.label;
                }
                return col;
            }));
        }
        return origColumns.apply(this, arguments);
    };

    var origData = NestedTable.prototype.data;
    NestedTable.prototype.data = function (_) {
        if (arguments.length) {
            var context = this;
            return origData.call(this, _.map(function (row) {
                return row.map(function (cell, idx) {
                    if (cell instanceof Array) {
                        var columns = [];
                        if (typeof context._columns[idx] === "object" && context._columns[idx].columns) {
                            columns = context._columns[idx].columns;
                        } else {
                            for (var i = 0; i < cell.length; ++i) {
                                columns.push(context._columns[idx] + "." + i);
                            }
                        }
                        return new Table()
                            .columns(columns)
                            .data(cell)
                        ;
                    }
                    return cell;
                });
            }));
        }
        return origData.apply(this, arguments);
    };

    return NestedTable;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Persist',["../common/Utility"], factory);
    } else {
        root.other_Persist = factory(root.common_Utility);
    }
}(this, function (Utility) {
    function discover(widget) {
        var retVal = [];
        widget.publishedProperties().forEach(function (_meta) {
            var item = widget;
            var meta = _meta;
            if (meta.type) {
                while (meta.type === "proxy") {
                    item = item[meta.proxy];
                    meta = item.publishedProperty(meta.method);
                }
                if (meta.id !== widget.publishedProperty(_meta.id).id) {
                    meta = JSON.parse(JSON.stringify(meta));  //  Clone meta so we can safely replace the id.
                    meta.id = widget.publishedProperty(_meta.id).id;
                }
                retVal.push(meta);
            }
        }, this);
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
                case "propertyArray":
                    var widgetArray = widget[publishItem.id]();
                    if (widgetArray) {
                        widgetArray.forEach(function (widget) {
                            widgetWalker(widget, visitor);
                        });
                    }
                    break;
            }
        }
    }

    function widgetArrayWalker(widgets, visitor) {
        if (!widgets)
            return;
        widgets.forEach(function (widget) {
            widgetWalker(widget, visitor);
        });
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
        widgetArrayWalker: widgetArrayWalker,
        propertyWalker: propertyWalker,
        widgetPropertyWalker: widgetPropertyWalker,
        serializeTheme: function(widget,filter){
            return JSON.stringify(this.serializeThemeToObject(widget,filter));
        },
        serializeThemeToObject: function (widget, filter){
            filter = filter || ["surface", "Color", "Font", "palette"];

            var propObj = {};
            widgetPropertyWalker(widget, null, function (widget, item) {
                if (widget[item.id + "_modified"]() || widget.publishedProperty(item.id).origDefaultValue !== widget.publishedProperty(item.id).defaultValue) {
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
                widget.publishedProperty(item.id).defaultValue = widget.publishedProperty(item.id).origDefaultValue;
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
                __class: widget.classID(),
            };
            if (widget._id.indexOf(widget._idSeed) !== 0) {
                retVal.__id = widget._id;
            }
            if (widget.version) {
                retVal.__version = widget.version();
            }
            retVal.__properties = {};

            var context = this;
            propertyWalker(widget, filter, function (widget, item) {
                if (widget[item.id + "_modified"]()) {
                    switch (item.type) {
                        case "widget":
                            retVal.__properties[item.id] = context.serializeToObject(widget[item.id](), null, includeData);
                            return true;
                        case "widgetArray":
                        case "propertyArray":
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
            if (includeData && widget.data) {
                if (!retVal.__data) retVal.__data = {};
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
                        case "propertyArray":
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
                                        widgetItem._owner = widget;
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
            if (state.__id && state.__id.indexOf(widget._idSeed) !== 0 && widget._id !== state.__id) {
                console.log("Deserialize:  IDs do not match - " + widget._id);
            }
            this.deserializeFromObject(widget, state, callback);
        },

        create: function (state, callback) {
            if (typeof state === "string") {
                state = JSON.parse(state);
            }
            var context = this;
            Utility.requireWidget(state.__class).then(function (Widget) {
                var widget = new Widget();
                if (state.__id && state.__id.indexOf(widget._idSeed) !== 0 && state.__id.indexOf("_pe") !== 0) {
                    widget._id = state.__id;
                }
                context.deserializeFromObject(widget, state, callback);
            }).catch(function (e) {
                console.log("Persist.create:  ***exception***");
                console.log(e);
                callback(null);
            });
        },

        clone: function (widget, callback) {
            this.create(this.serializeToObject(widget, [], true), callback);
        }
    };
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/PropertyEditor',["d3", "../common/HTMLWidget", "../other/Persist", "../layout/Grid", "../common/Widget", "css!./PropertyEditor"], factory);
    } else {
        root.other_PropertyEditor = factory(root.d3, root.common_HTMLWidget, root.other_Persist, root.layout_Grid, root.common_Widget);
    }
}(this, function (d3, HTMLWidget, Persist, Grid, Widget) {
    function hasProperties(type) {
        switch (type) {
            case "widget":
            case "widgetArray":
            case "propertyArray":
                return true;
        }
        return false;
    }

    function PropertyEditor() {
        HTMLWidget.call(this);
        this._parentPropertyEditor = null;

        this._tag = "div";
        this._show_settings = false;
    }
    PropertyEditor.prototype = Object.create(HTMLWidget.prototype);
    PropertyEditor.prototype.constructor = PropertyEditor;
    PropertyEditor.prototype._class += " other_PropertyEditor";

    PropertyEditor.prototype.publish("showFields", false, "boolean", "If true, widget.fields() will display as if it was a publish parameter.",null,{tags:["Basic"]});
    PropertyEditor.prototype.publish("showData", false, "boolean", "If true, widget.data() will display as if it was a publish parameter.", null, { tags: ["Basic"] });
    
    PropertyEditor.prototype.publish("sorting", "none", "set", "Specify the sorting type",["none","A-Z","Z-A","type"],{tags:["Basic"],icons:["fa-sort","fa-sort-alpha-asc","fa-sort-alpha-desc","fa-sort-amount-asc"]});

    PropertyEditor.prototype.publish("hideNonWidgets", false, "boolean", "Hides non-widget params (at this tier only)",null,{tags:["Basic"]});

    PropertyEditor.prototype.publish("label", "", "string", "Label to display in header of property editor table",null,{tags:["Basic"]});
    PropertyEditor.prototype.publish("filterTags", "", "set", "Only show Publish Params of this type",["Basic","Intermediate","Advance",""], {});
    PropertyEditor.prototype.publish("excludeTags", [], "array", "Exclude this array of tags",null, {});
    PropertyEditor.prototype.publish("excludeParams", [], "array", "Exclude this array of params (widget.param)",null, {});

    PropertyEditor.prototype.publish("widget", null, "widget", "Widget",null,{tags:["Basic"], render:false});

    PropertyEditor.prototype.parentPropertyEditor = function (_) {
        if (!arguments.length) return this._parentPropertyEditor;
        this._parentPropertyEditor = _;
        return this;
    };

    PropertyEditor.prototype._widgetOrig = PropertyEditor.prototype.widget;
    PropertyEditor.prototype.widget = function (_) {
        if (arguments.length && this._widgetOrig() === _) return this;
        var retVal = PropertyEditor.prototype._widgetOrig.apply(this, arguments);
        if (arguments.length) {
            this.watchWidget(_);
            if (_ instanceof Grid) {
                var context = this;
                _.postSelectionChange = function () {
                    context._selectedItems = _._selectionBag.get().map(function (item) { return item.widget; });
                    context.render();
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

    PropertyEditor.prototype.rootWidgets = function () {
        if (this._selectedItems && this._selectedItems.length) {
            return this._selectedItems;
        }
        return this.show_settings() ? [this] : this.widget() ? [this.widget()] : [];
    };

    PropertyEditor.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var context = this;

        var rootWidgets = this.rootWidgets().filter(function(w) {
            if (w._owningWidget && w._owningWidget.excludeObjs instanceof Array) {
                if (w._owningWidget.excludeObjs.indexOf(w.classID()) !== -1) {
                    return false;
                }
            }
            return true;
        });

        var table = element.selectAll(".table" + this.id()).data(rootWidgets, function (d) { return d.id(); });
        table.enter().append("table")
            .attr("class", "property-table table" + this.id())
            .each(function (d) {
                var table = d3.select(this);
                table.append("thead").append("tr").append("th").datum(table)
                    .attr("colspan", "2")
                    .each(function (d) {
                        var th = d3.select(this);
                        th.append("span");
                        context.thButtons(th);
                    })
                ;
                table.append("tbody");
            })
        ;
        table
            .each(function (d) {
                var element = d3.select(this);
                element.select("thead > tr > th > span")
                    .text(function (d) {
                        var spanText = '';
                        if(context.label()){
                            spanText += context.label();
                        }
                        return spanText;
                    })
                ;
                element.selectAll("i")
                        .classed("fa-eye",!context.hideNonWidgets())
                        .classed("fa-eye-slash",context.hideNonWidgets());
                context.renderInputs(element.select("tbody"), d);
            })
        ;
        table.exit()
            .each(function (d) {
                context.renderInputs(element.select("tbody"), null);
            })
            .remove()
        ;
    };
    
    PropertyEditor.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
        this.watchWidget(null);
    };

    var watchDepth = 0;
    PropertyEditor.prototype.watchWidget = function (widget) {
        if (this._watch) {
            if (window.__hpcc_debug) {
                --watchDepth;
                console.log("watchDepth:  " + watchDepth);
            }
            this._watch.remove();
            delete this._watch;
        }
        if (widget) {
            var context = this;
            this._watch = widget.monitor(function (paramId, newVal, oldVal) {
                if (oldVal !== newVal) {
                    context.lazyRender();
                }
            });
            if (window.__hpcc_debug) {
                ++watchDepth;
                console.log("watchDepth:  " + watchDepth);
            }
        }
    };

    PropertyEditor.prototype.thButtons = function (th) {
        var context = this;
        var collapseIcon = th.append("i")
            .attr("class", "fa fa-minus-square-o")
            .on("click", function (d) {
                d
                    .classed("property-table-collapsed", !d.classed("property-table-collapsed"))
                ;
                collapseIcon
                    .classed("fa-minus-square-o", !d.classed("property-table-collapsed"))
                    .classed("fa-plus-square-o", d.classed("property-table-collapsed"))
                ;
            })
        ;
        if (this.parentPropertyEditor() === null) {
            var sortIcon = th.append("i")
                .attr("class", "fa " + context.__meta_sorting.ext.icons[context.sorting_options().indexOf(context.sorting())])
                .on("click", function () {
                    var sort = context.sorting();
                    var types = context.sorting_options();
                    var icons = context.__meta_sorting.ext.icons;
                    sortIcon
                        .classed(icons[types.indexOf(sort)], false)
                        .classed(icons[(types.indexOf(sort) + 1) % types.length], true)
                    ;
                    context.sorting(types[(types.indexOf(sort) + 1) % types.length]).render();
                })
            ;
            var hideParamsIcon = th.append("i")
                .attr("class", "fa " + (context.hideNonWidgets() ? "fa-eye-slash" : "fa-eye"))
                .on("click", function () {
                    hideParamsIcon
                        .classed("fa-eye", context.hideNonWidgets())
                        .classed("fa-eye-slash", !context.hideNonWidgets())
                    ;
                    context.hideNonWidgets(!context.hideNonWidgets()).render();
                })
            ;
            hideParamsIcon
                    .classed("fa-eye", !context.hideNonWidgets())
                    .classed("fa-eye-slash", context.hideNonWidgets())
            ;
        }
    };

    PropertyEditor.prototype.gatherDataTree = function (widget) {
        if (!widget) return null;
        var retVal = {
            label: widget.id() + " (" + widget.classID() + ")",
            children: []
        };
        var arr = Persist.discover(widget);
        arr.forEach(function (prop) {
            var node = {
                label: prop.id,
                children: []
            };
            switch (prop.type) {
                case "widget":
                    node.children.push(this.gatherDataTree(widget[prop.id]()));
                    break;
                case "widgetArray":
                case "propertyArray":
                    var arr = widget[prop.id]();
                    if (arr) {
                        arr.forEach(function (item) {
                            node.children.push(this.gatherDataTree(item));
                        }, this);
                    }
                    break;
            }
            retVal.children.push(node);
        }, this);
        return retVal;
    };

    PropertyEditor.prototype.getDataTree = function () {
        return this.gatherDataTree(this.rootWidget());
    };
    
    PropertyEditor.prototype._rowSorting = function (paramArr) {
        if(this.sorting() === "type"){
            var typeOrder = ["boolean","number","string","html-color","array","object","widget","widgetArray","propertyArray"];
            paramArr.sort(function(a,b){
                if(a.type === b.type){
                    return a.id < b.id ? -1 : 1;
                }else{
                    return typeOrder.indexOf(a.type) < typeOrder.indexOf(b.type) ? -1 : 1;
                }
            });
        } else if(this.sorting() === "A-Z") {
            paramArr.sort(function(a,b){ return a.id < b.id ? -1 : 1;});
        }  else if(this.sorting() === "Z-A") {
            paramArr.sort(function(a,b){ return a.id > b.id ? -1 : 1;});
        }
    };

    PropertyEditor.prototype.filterInputs = function(d) {
        var discArr = Persist.discover(d);
        if ((this.filterTags() || this.excludeTags().length > 0 || this.excludeParams.length > 0) && d instanceof PropertyEditor === false) {
            var context = this;
            return discArr.filter(function(param, idx) {
                for (var i = 0; i < context.excludeParams().length; i++) {
                    var arr = context.excludeParams()[i].split(".");
                    var widgetName, obj, excludeParam;
                    if (arr.length > 2) {
                        widgetName = arr[0];
                        obj = arr[1];
                        excludeParam = arr[2];
                    } else {
                        widgetName = arr[0];
                        excludeParam = arr[1];   
                    }
                    if (d.class().indexOf(widgetName) !== -1) {
                        if (param.id === excludeParam) {
                            return false;
                        }
                        return true;
                    }
                }
                if (context.excludeTags().length > 0 && param.ext && param.ext.tags && param.ext.tags.some(function(item){ return (context.excludeTags().indexOf(item) > -1); })) {
                   return false; 
                }
                if ((context.filterTags() && param.ext && param.ext.tags && param.ext.tags.indexOf(context.filterTags()) !== -1) || !context.filterTags()) {
                    return true;
                }
                return false;
            });
        }
        return discArr;
    };

    PropertyEditor.prototype.renderInputs = function (element, d) {
        var context = this;
        var discArr = [];
        var showFields = !this.show_settings() && this.showFields();
        if (d) {
            discArr = this.filterInputs(d).filter(function (prop) { return prop.id !== "fields" ? true : showFields; });
            if (!this.show_settings() && this.showData() && d.data) {
                discArr.push({ id: "data", type: "array" });
            }
            if (this.hideNonWidgets()) {
                discArr = discArr.filter(function (n) {
                    return hasProperties(n.type);
                });
            }
            this._rowSorting(discArr);
        }

        var rows = element.selectAll("tr.prop" + this.id()).data(discArr, function (d) { return d.id; });
        rows.enter().append("tr")
            .attr("class", "property-wrapper prop" + this.id())
            .each(function (param) {
                var tr = d3.select(this);
                if (hasProperties(param.type)) {
                    tr.classed("property-widget-wrapper", true);
                    tr.append("td")
                        .attr("colspan", "2")
                    ;
                } else {
                    tr.classed("property-input-wrapper", true);
                    tr.append("td")
                        .classed("property-label", true)
                        .text(param.id)
                    ;
                    var inputCell = tr.append("td")
                        .classed("property-input-cell", true)
                    ;
                    context.enterInputs(d, inputCell, param);
                }
            })
        ;
        rows.each(function (param) {
            var tr = d3.select(this);
            tr.classed("disabled", d[param.id + "_disabled"] && d[param.id + "_disabled"]());
            if (hasProperties(param.type)) {
                context.updateWidgetRow(d, tr.select("td"), param);
            } else {
                context.updateInputs(d, param);
            }
        });
        rows.exit().each(function (param) {
            var tr = d3.select(this);
            if (hasProperties(param.type)) {
                context.updateWidgetRow(d, tr.select("td"), null);
            }
        }).remove();
        rows.order();
    };
    
    PropertyEditor.prototype.updateWidgetRow = function (widget, element, param) {
        var tmpWidget = [];
        if (widget && param) {
            tmpWidget = widget[param.id]() || [];
        }
        var widgetArr = tmpWidget instanceof Array ? tmpWidget : [tmpWidget];
        if (param && param.ext && param.ext.autoExpand) {
            //  remove empties and ensure last row is an empty  ---
            var lastModified = true;
            var noEmpties = widgetArr.filter(function (row, idx) {
                lastModified = row.publishedModified();
                row._owner = widget;
                return lastModified || idx === widgetArr.length - 1;
            }, this);
            var changed = widgetArr.length - noEmpties.length;
            if (lastModified) {
                changed = true;
                noEmpties.push(new param.ext.autoExpand(widget));
            }
            if (changed) {
                widget[param.id](noEmpties);
                widgetArr = noEmpties;
            }
        }

        var context = this;
        var widgetCell = element.selectAll("div.propEditor" + this.id()).data(widgetArr, function (d) { return d.id(); });
        widgetCell.enter().append("div")
            .attr("class", "property-input-cell propEditor" + this.id())
            .each(function (w) {
                d3.select(this)
                    .attr("data-widgetid", w.id())
                    .property("data-propEditor", new PropertyEditor().label(param.id).target(this))
                ;
            })
        ;
        widgetCell
            .each(function (w) {
                d3.select(this).property("data-propEditor")
                    .parentPropertyEditor(context)
                    .showFields(context.showFields())
                    .showData(context.showData())
                    .sorting(context.sorting())
                    .filterTags(context.filterTags())
                    .excludeTags(context.excludeTags())
                    .excludeParams(context.excludeParams())
                    .hideNonWidgets(context.hideNonWidgets() && w._class.indexOf("layout_") >= 0)
                    .widget(w)
                    .render()
                ;
            })
        ;
        widgetCell.exit()
            .each(function (w) {
                var element = d3.select(this);
                element.property("data-propEditor")
                    .widget(null)
                    .render()
                    .target(null)
                ;
                element
                    .property("data-propEditor", null)
                ;
            })
            .remove()
        ;
    };

    PropertyEditor.prototype.setProperty = function (widget, id, value) {
        //  With PropertyExt not all "widgets" have a render, if not use parents render...
        var propEditor = this;
        while (propEditor && widget) {
            if (propEditor === this) {
                widget[id](value);
            }
            
            if (widget.render) {
                var tmpPE = propEditor;
                widget.render(function (w) {
                    tmpPE.render();
                });
                propEditor = null;
            } else {
                propEditor = propEditor.parentPropertyEditor();
                widget = propEditor.widget();
            }
        }
    };

    PropertyEditor.prototype.enterInputs = function (widget, cell, param) {
        cell.classed(param.type+"-cell",true);
        var context = this;
        switch (param.type) {
            case "boolean":
                cell.append("input")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .attr("type", "checkbox")
                    .on("change", function () {
                        context.setProperty(widget, param.id, this.checked);
                    })
                ;
                break;
            case "set":
                cell.append("select")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .on("change", function () {
                        context.setProperty(widget, param.id, this.value);
                    })
                    .each(function (d) {
                        var input = d3.select(this);
                        var set = widget[param.id + "_options"]();
                        for (var i = 0; i < set.length; i++) {
                            input.append("option").attr("value", set[i]).text(set[i]);
                        }
                    })
                ;
                break;
            case "array":
            case "object":
                cell.append("textarea")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .on("change", function () {
                        context.setProperty(widget, param.id, JSON.parse(this.value));
                    })
                ;
                break;
            default:

                cell.append("input")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .on("change", function () {
                        context.setProperty(widget, param.id, this.value);
                    })
                ;
                if (param.type === "html-color" && !this.isIE) {
                    cell.append("input")
                        .attr("id", this.id() + "_" + param.id + "_2")
                        .classed("property-input", true)
                        .attr("type", "color")
                        .on("change", function () {
                            context.setProperty(widget, param.id, this.value);
                        })
                    ;
                }
                break;
        }
    };

    PropertyEditor.prototype.updateInputs = function (widget, param) {
        var element = d3.selectAll("#" + this.id() + "_" + param.id + ", #" + this.id() + "_" + param.id + "_2");
        var val = widget ? widget[param.id]() : "";
        element.property("disabled", widget[param.id + "_disabled"] && widget[param.id + "_disabled"]());
        switch (param.type) {
            case "array":
            case "object":
                element.property("value", JSON.stringify(val, function replacer(key, value) {
                    if (value instanceof Widget) {
                        return Persist.serialize(value);
                    }
                    return value;
                }));
                break;
            case "boolean":
                element.property("checked", val);
                break;
            default:
                element.property("value", val);
                break;
        }
    };
    
    return PropertyEditor;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('other/Select.js',["../common/HTMLWidget", "css!./Select"], factory);
    } else {
        root.other_Select = factory(root.common_HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function Select(target) {
        HTMLWidget.call(this);
    }
    Select.prototype = Object.create(HTMLWidget.prototype);
    Select.prototype.constructor = Select;
    Select.prototype._class += " other_Select";

    Select.prototype.publish("label", null, "string", "Label for select");
    Select.prototype.publish("valueColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
    Select.prototype.publish("textColumn", null, "set", "Select value(s)", function () { return this.columns(); }, { optional: true });
    Select.prototype.publish("multiple", false, "boolean", "Multiple selection");
    Select.prototype.publish("selectSize", 5, "number", "Size of multiselect box", null, { disable: function (w) { return !w.multiple(); } });

    Select.prototype.selectData = function () {
        var view = this._db.rollupView([this.valueColumn(), this.textColumn()]);
        return view.entries().map(function (row) {
            return {
                value: row.key,
                text: row.values.length ? row.values[0].key : ""
            };
        }, this).sort(function (l, r) {
            if (l.text < r.text) return -1;
            if (l.text > r.text) return 1;
            return 0;
        });
    };

    Select.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._span = element.append("span");
        this._label = this._span.append("label")
            .attr("for", this.id() + "_select")
        ;

        var context = this;
        this._select = this._span.append("select")
            .attr("id", this.id() + "_select")
            .on("change", function (d) {
                var options = [];
                var options_dom_node = context._select.node().options;
                for (var i = 0; i < options_dom_node.length; ++i) {
                    var optionNode = options_dom_node[i];
                    if (optionNode.selected) {
                        options.push(optionNode.value);
                    }
                }
                context.click(options);
            })
        ;
    };

    Select.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this._label
            .text(this.label())
        ;
        this._select
            .attr("multiple", this.multiple() ? this.multiple() : null)
            .attr("size", this.multiple() && this.selectSize() ? this.selectSize() : null)
        ;

        var option = this._select.selectAll(".dataRow").data(this.selectData());
        option.enter().append("option")
            .attr("class", "dataRow")
        ;
        option
            .attr("value", function (row) { return row.value; })
            .text(function (row) { return row.text; })
        ;
        option.exit().remove();
    };

    Select.prototype.exit = function (domNode, element) {
        this._span.remove();
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Select.prototype.click = function (v) {
        console.log(v);
    };

    return Select;
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
        define('other/WordCloud.js',["d3", "../common/SVGWidget", "../api/I2DChart", "../api/ITooltip", "d3-cloud", "css!./WordCloud"], factory);
    } else {
        root.other_WordCloud = factory(root.d3, root.common_SVGWidget, root.api_I2DChart, root.api_ITooltip, root.d3.layout.cloud);
    }
}(this, function (d3, SVGWidget, I2DChart, ITooltip, D3Cloud) {
    function WordCloud() {
        SVGWidget.call(this);
        I2DChart.call(this);
        ITooltip.call(this);

        this._prevOffsetX = this.offsetX();
        this._prevOffsetY = this.offsetY();
        this._prevZoom = this.zoom();
    }
    WordCloud.prototype = Object.create(SVGWidget.prototype);
    WordCloud.prototype.constructor = WordCloud;
    WordCloud.prototype._class += " other_WordCloud";
    WordCloud.prototype.implements(I2DChart.prototype);
    WordCloud.prototype.implements(ITooltip.prototype);

    WordCloud.prototype.publish("paletteID", "default", "set", "Palette ID", WordCloud.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
    WordCloud.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

    WordCloud.prototype.publish("fontFamily", "Impact", "string", "Font Name", null, { tags: ["Basic"] });
    WordCloud.prototype.publish("fontSizeFrom", 6, "number", "Font Size From", null, { tags: ["Basic"] });
    WordCloud.prototype.publish("fontSizeTo", 48, "number", "Font Size To", null, { tags: ["Basic"] });
    WordCloud.prototype.publish("angleFrom", -60, "number", "Angle From", null, { tags: ["Basic"] });
    WordCloud.prototype.publish("angleTo", 60, "number", "Angle To", null, { tags: ["Basic"] });
    WordCloud.prototype.publish("angleCount", 5, "number", "Angle Count", null, { tags: ["Basic"] });
    WordCloud.prototype.publish("padding", 0, "number", "Padding", null, { tags: ["Intermediate"] });
    WordCloud.prototype.publish("scaleMode", "linear", "set", "Text scaling mode", ["linear", "log", "sqrt", "pow"], { tags: ["Intermediate"] });
    WordCloud.prototype.publish("spiral", "archimedean", "set", "Text scaling mode", ["archimedean", "rectangular"], { tags: ["Intermediate"] });
    WordCloud.prototype.publish("offsetX", 0, "number", "X offset", null, { tags: ["Advanced"] });
    WordCloud.prototype.publish("offsetY", 0, "number", "Y offset", null, { tags: ["Advanced"] });
    WordCloud.prototype.publish("zoom", 1, "number", "Zoom", null, { tags: ["Advanced"] });

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
        SVGWidget.prototype.enter.apply(this, arguments);

        this._root = element.append("g");
        this._canvas = document.createElement("canvas");

        var context = this;
        this._zoom = d3.behavior.zoom()
            .scaleExtent([0.1, 10])
            .on("zoom", function () {
                context.zoomed(context._zoom, d3.event.translate, d3.event.scale);
            })
        ;
        element.call(this._zoom);

        this._cloud = new D3Cloud()
            .canvas(this._canvas)
        ;
    };

    WordCloud.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this.zoomed(this, [this.offsetX(), this.offsetY()], this.zoom());

        var context = this;
        var extent = d3.extent(this._vizData, function (d) { return d.__viz_1; });
        var scale = d3.scale[this.scaleMode()]().domain(extent).range([this.fontSizeFrom(), this.fontSizeTo()]);
        var angleDomain = d3.scale.linear().domain([0, context.angleCount() - 1]).range([context.angleFrom(), context.angleTo()]);

        this._cloud.stop()
            .size([this.width(), this.height()])
            .words(this._vizData)
            .font(this.fontFamily())
            .padding(this.padding())
            .spiral(this.spiral())
            .text(function (d) { return d.__viz_0; })
            .fontSize(function (d) { return scale(d.__viz_1); })
            .rotate(function () { return angleDomain(~~(Math.random() * context.angleCount())); })
            .on("end", draw)
            .start()
        ;

        function draw(data, bounds) {
            var text = context._root.selectAll("text")
                .data(data, function (d) { return d.__viz_0 ? d.__viz_0.toLowerCase() : ""; })
            ;
            text.enter().append("text")
                .attr("text-anchor", "middle")
                .text(function (d) { return d.__viz_0; })
                .on("click", function (d) {
                    context.click({ label: d.__viz_0, weight: d.__viz_1 });
                })
                .style("opacity", 1e-6)
                .on("mouseover.tooltip", function (d) {
                    context.tooltipShow([d.__viz_0, d.__viz_1], context.columns(), 1);
                })
                .on("mouseout.tooltip", function (d) {
                    context.tooltipShow();
                })
                .on("mousemove.tooltip", function (d) {
                    context.tooltipShow([d.__viz_0, d.__viz_1], context.columns(), 1);
                })
            ;
            text
                .style("font-size", function (d) { return scale(d.__viz_1) + "px"; })
                .style("font-family", context.fontFamily())
                .transition().duration(1000)
                    .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                    .style("fill", function (d) { return context._palette(d.__viz_0 ? d.__viz_0.toLowerCase() : ""); })
                    .style("opacity", 1)
            ;
            text.exit().transition().duration(1000)
                .style("opacity", 1e-4)
                .remove()
            ;
        }
    };

    WordCloud.prototype.zoomed = function (source, translate, scale) {
        if (translate[0] !== this._prevOffsetX || translate[1] !== this._prevOffsetY || scale !== this._prevZoom) {
            this._root.attr("transform", "translate(" + translate[0] + "," + translate[1] + ")" + "scale(" + scale + ")");
            switch (source) {
                case this:
                    this._zoom
                        .scale(scale)
                        .translate(translate)
                    ;
                    break;
                case this._zoom:
                    this.offsetX(translate[0]);
                    this.offsetY(translate[1]);
                    this.zoom(scale);
                    break;
            }
            this._prevOffsetX = translate[0];
            this._prevOffsetY = translate[1];
            this._prevZoom = scale;
        }
    };

    return WordCloud;
}));
