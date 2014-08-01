(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([ "../chart/Pie", "../map/Choropleth"], factory);
    } else {
        root.Marshaller = factory(root.Pie, root.Choropleth);
    }
}(this, function (Pie, Choropleth) {

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

    jsonp = function (url, request, callback) {
        var callbackName = 'jsonp_callback_' + Math.round(999 * Math.random());
        window[callbackName] = function (data) {
            delete window[callbackName];
            document.body.removeChild(script);
            // Remove "xxxResponse.Result"
            for (var key in data) {
                data = data[key].Results;
                break;
            }
            // Remove "xxx.Row"
            for (var key in data) {
                data[key] = data[key].Row;
            }
            callback(data);
        };

        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'jsonp=' + callbackName + "&" + serialize(request);
        document.body.appendChild(script);
    };


    //  Visualization ---
    function Visualization(dashboard, visualization) {
        this.dashboard = dashboard;
        this.id = visualization.id
        this.type = visualization.type;
        this.source = visualization.source;
        this.onSelect = visualization.onSelect;

        switch (this.type) {
            case "CHORO":
                this.widget = new Choropleth()
                    .size({ width: 310, height: 210 })
                ;
                break;
            case "PIE":
                this.widget = new Pie()
                    .radius(55)
                    .outerText(true)
                ;
                break;
            default:
                throw "Unknown Viz Type" + item.type;
                break;
        }

        var context = this;
        this.widget.click = function (d) {
            context.click(d);
        }
    };

    Visualization.prototype.accept = function (visitor) {
        visitor.visit(this);
    };

    Visualization.prototype.notify = function () {
        var dataSource = this.dashboard.datasources[this.source.id];

        var context = this;
        if (dataSource.outputs[this.source.output].data) {
            var data = dataSource.outputs[this.source.output].data.map(function (item) {
                var retVal = {};
                for (var key in context.source.mappings) {
                    var rhsKey = context.source.mappings[key].toLowerCase();
                    var val = item[rhsKey];
                    retVal[key] = val;
                }
                return retVal;
            });
            this.dashboard.marshaller.updateViz(this, data);
            this.widget
                .data(data)
                .render()
            ;
        }
    };

    Visualization.prototype.click = function (d) {
        if (this.onSelect) {
            var reverseSourceMappings = {};
            for (var key in this.source.mappings) {
                reverseSourceMappings[this.source.mappings[key]] = key;
            }

            var request = {};
            for (var key in this.onSelect.mappings) {
                var hackKey = reverseSourceMappings[key];
                request[key] = d[hackKey];
            }
            var dataSource = this.dashboard.datasources[this.source.id];
            dataSource.fetchData(request);
        }
    };

    //  Debug  ---
    Visualization.prototype.sourceMappingLabel = function () {
        if (!this.source.mappings)
            return null;

        var retVal = "";
        for (var key in this.source.mappings) {
            if (retVal) {
                retVal += "\n";
            }
            retVal += this.source.mappings[key] + " -> " + key;
        }
        return retVal;
    };

    Visualization.prototype.onSelectMappingLabel = function () {
        if (!this.onSelect || !this.onSelect.mappings)
            return null;

        var retVal = "onSelect";
        for (var key in this.onSelect.mappings) {
            if (retVal) {
                retVal += "\n";
            }
            retVal += this.onSelect.mappings[key] + " -> " + key;
        }
        return retVal;
    };

    //  Output  ---
    function Output(dataSource, output) {
        this.dataSource = dataSource;
        this.id = output.id
        this.notify = output.notify;
    };

    Output.prototype.accept = function (visitor) {
        visitor.visit(this);
    };

    Output.prototype.setData = function (data) {
        var context = this;
        this.data = data;
        this.notify.forEach(function (item) {
            var viz = context.dataSource.dashboard.visualizations[item];
            viz.notify();
        });
    };

    //  DataSource  ---
    function DataSource(dashboard, dataSource) {
        this.dashboard = dashboard;
        this.id = dataSource.id
        this.filter = dataSource.filter;
        this.URL = dataSource.URL;

        var context = this;

        this.outputs = {};
        dataSource.outputs.forEach(function (item) {
            context.outputs[item.id] = new Output(context, item);
        });
    };

    DataSource.prototype.accept = function (visitor) {
        visitor.visit(this);
        for (var key in this.outputs) {
            this.outputs[key].accept(visitor);
        }
    };

    DataSource.prototype.fetchData = function (request, refresh) {
        var context = this;
        this.request = {
            refresh: refresh ? true : false
        };
        this.filter.forEach(function (item) {
            context.request[item] = "";
            context.request[item + "_changed"] = false;
        });
        for (var key in request) {
            this.request[key] = request[key];
            this.request[key + "_changed"] = true;
        }
        jsonp(this.URL, this.request, function (response) {
            context.processResponse(response);
        });
    };

    DataSource.prototype.processResponse = function (response) {
        for (var key in this.outputs) {
            if (exists(key.toLowerCase(), response) && exists(key.toLowerCase() + "_changed", response) && response[key.toLowerCase() + "_changed"].length && response[key.toLowerCase() + "_changed"][0][key.toLowerCase() + "_changed"]) {
                this.outputs[key].setData(response[key.toLowerCase()]);
            }
        }
    };

    //  Dashboard  ---
    function Dashboard(marshaller, dashboard) {
        this.marshaller = marshaller;
        this.id = dashboard.id;

        var context = this;
        this.datasources = {};
        this.datasourceTotal = 0;
        dashboard.datasources.forEach(function (item) {
            context.datasources[item.id] = new DataSource(context, item);
            ++this.datasourceTotal;
        });

        this.visualizations = {};
        this.visualizationsArray = [];
        dashboard.visualizations.forEach(function (item) {
            var newItem = new Visualization(context, item);
            context.visualizations[item.id] = newItem;
            context.visualizationsArray.push(newItem);
        });
        this.visualizationTotal = this.visualizationsArray.length;
    };

    Dashboard.prototype.accept = function (visitor) {
        visitor.visit(this);
        for (var key in this.datasources) {
            this.datasources[key].accept(visitor);
        }
        for (var key in this.visualizations) {
            this.visualizations[key].accept(visitor);
        }
    };

    //  Marshaller  ---
    function Marshaller() {
    };

    Marshaller.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.dashboardTotal = 0;
        for (var key in this.dashboards) {
            this.dashboards[key].accept(visitor);
            ++this.dashboardTotal;
        }
    };

    Marshaller.prototype.url = function (url, callback) {
        var request = {
            refresh: true
        };
        var context = this;
        jsonp(url, request, function (response) {
            if (exists("HIPIE_DDL", response) && response.HIPIE_DDL.length) {
                var json = response.HIPIE_DDL[0].HIPIE_DDL;
                //  Temp Hack  ---
                var ddlParts = json.split("<RoxieBase>\\");
                if (ddlParts.length > 1) {
                    var urlEndQuote = ddlParts[1].indexOf("\"");
                    ddlParts[1] = ddlParts[1].substring(urlEndQuote);
                    json = ddlParts.join(url);
                }
                //  ---  ---
                context.parse(json);
                callback(response);
            }
        });
    };

    Marshaller.prototype.parse = function (json) {
        var context = this;
        var dashboards = JSON.parse(json);
        this.dashboards = {};
        dashboards.forEach(function (item) {
            context.dashboards[item.id] = new Dashboard(context, item);
        });
        return this;
    };

    Marshaller.prototype.updateViz = function(vizInfo, data) {
    };

    return {
        exists: exists,
        Marshaller: Marshaller,
        Dashboard: Dashboard,
        DataSource: DataSource,
        Output: Output,
        Visualization: Visualization
    };
}));
