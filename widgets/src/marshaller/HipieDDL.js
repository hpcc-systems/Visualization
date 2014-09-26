(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/TextBox",
            "../chart/MultiChartSurface", "../chart/Bar", "../chart/Line", "../chart/Pie", "../chart/Bubble",
            "../map/ChoroplethStates", "../map/ChoroplethCounties",
            "../other/Slider", "../other/Table", "../other/WordCloud", "../other/comms"
        ], factory);
    } else {
        root.Marshaller = factory(root.TextBox, root.MultiChartSurface, root.Bar, root.Line, root.Pie, root.Bubble, root.ChoroplethStates, root.ChoroplethCounties, root.Slider, root.Table, root.WordCloud, root.comms);
    }
}(this, function (TextBox, MultiChartSurface, Bar, Line, Pie, Bubble, ChoroplethStates, ChoroplethCounties, Slider, Table, WordCloud, comms) {

    exists = function (prop, scope) {
        var propParts = prop.split(".");
        var testScope = scope;
        for (var i = 0; i < propParts.length; ++i) {
            var item = propParts[i];
            if (!testScope || testScope[item] === undefined) {
                return false;
            }
            testScope = testScope[item];
        }
        return true;
    };

    //  Mappings ---
    function SourceMappings(source, mappings) {
        this.source = source;
        this.mappings = mappings;
        this.reverseMappings = {};
        for (var key in this.mappings) {
            this.reverseMappings[this.mappings[key]] = key;
        }
    };

    SourceMappings.prototype.contains = function(key) {
        return this.mappings[key] !== undefined;
    };

    SourceMappings.prototype.doMap = function (item) {
        var retVal = item;
        try {
            switch (this.source.visualization.type) {
                case "LINE":
                    retVal = [];
                    for (var i = 0; i < this.mappings.x.length; ++i) {
                        retVal.push({
                            label: item[this.mappings.x[i]],
                            weight: item[this.mappings.y[i]]
                        })
                    }
                    break;
                case "TABLE":
                    for (var key in this.mappings) {
		                retVal = {};
                        this.mappings[key].forEach(function (mapingItem) {
                            var rhsKey = mapingItem.toLowerCase();
                            var val = item[rhsKey];
                            retVal[rhsKey] = val;
                        });
                    }
                    break;
                default:
                    for (var key in this.mappings) {
                        var rhsKey = this.mappings[key].toLowerCase();
                        var val = item[rhsKey];
                        retVal[key] = val;
                    }
                    break;
            }
        } catch (e) {
            console.log("Invalid Mappings");
        }
        return retVal;
    };

    SourceMappings.prototype.getReverseMap = function (key) {
        return this.reverseMappings[key];
    };

    //  Viz Source ---
    function Source(visualization, source) {
        this.visualization = visualization;
        this._id = source.id;
        this._output = source.output;
        this.mappings = new SourceMappings(this, source.mappings);
    };

    Source.prototype.exists = function () {
        return this._id;
    };

    Source.prototype.getDatasource = function () {
        return this.visualization.dashboard.datasources[this._id];
    };

    Source.prototype.getOutput = function () {
        return this.getDatasource().outputs[this._output];
    };

    //  Viz Select ---
    function Select(visualization, onSelect) {
        this.visualization = visualization;
        if (onSelect) {
            this._updates = onSelect.updates;
            this.mappings = onSelect.mappings;
        }
    };

    Select.prototype.exists = function () {
        return this._updates !== undefined;
    };

    Select.prototype.getUpdatesDatasource = function () {
        if (exists("_updates.datasource", this)) {
            return this.visualization.dashboard.datasources[this._updates.datasource];
        }
        return null;
    };

    Select.prototype.getUpdatesVisualization = function () {
        if (exists("_updates.visualization", this)) {
            return this.visualization.dashboard.visualizations[this._updates.visualization];
        }
        return null;
    };

    //  Visualization ---
    function Visualization(dashboard, visualization) {
        this.dashboard = dashboard;
        this.id = visualization.id;
        this.label = visualization.label;
        this.type = visualization.type;
        this.properties = visualization.properties || visualization.source.properties || {};
        this.source = new Source(this, visualization.source);
        this.onSelect = new Select(this, visualization.onSelect);

        switch (this.type) {
            case "CHORO":
                if (this.source.mappings.contains("county")) {
                    this.widget = new ChoroplethCounties()
                        .size({ width: 310, height: 210 })
                    ;
                } else {
                    this.widget = new ChoroplethStates()
                        .size({ width: 310, height: 210 })
                    ;
                }
                break;
            case "2DCHART":
            case "PIE":
            case "BUBBLE":
            case "BAR":
            case "WORD_CLOUD":
                this.widget = new MultiChartSurface()
                    .activate(this.properties.charttype || this.type)
                    .title(this.id)
                ;
                break;
            case "LINE":
                this.widget = new Line()
                    //.xScale("time")
                ;
                break;
            case "TABLE":
                this.widget = new Table()
                    .columns(this.label)
                ;
                break;
            case "SLIDER":
                this.widget = new Slider();
                if (visualization.range) {
                    this.widget
                        .range({ low: +visualization.range[0], high: +visualization.range[1] })
                        .step(+visualization.range[2])
                    ;
                }
                break;
            default:
                this.widget = new TextBox()
                    .text(this.id + "\n" + "TODO:  " + this.type)
                ;
                break;
        }

        if (this.widget) {
            var context = this;
            this.widget.click = function (d) {
                context.click(d);
            }
            for (var key in this.properties) {
                if (this.widget[key]) {
                    try {
                        this.widget[key](this.properties)
                    } catch (e) {
                        console.log("Invalid Property:" + this.id + ".properties." + key);
                    }
                }
            }
        }
    };

    Visualization.prototype.accept = function (visitor) {
        visitor.visit(this);
    };

    Visualization.prototype.notify = function () {
        var context = this;
        if (this.source.getOutput().data) {
            if (this.widget) {
                var data = this.source.getOutput().data.map(function (item) {
                    return context.source.mappings.doMap(item);
                });
                this.dashboard.marshaller.updateViz(this, data);
                this.widget
                    .data(data)
                    .render()
                ;
                var params = this.source.getOutput().getParams();
                if (exists("widget.title", this)) {
                    this.widget
                        .title(this.id + (params ? "(" + params + ")" : ""))
                        .render()
                    ;
                } else if (exists("widget._parentWidget.title", this)) {
                    this.widget._parentWidget
                        .title(this.id + (params ? "(" + params + ")" : ""))
                        .render()
                    ;
                }
            }
        }
    };

    Visualization.prototype.click = function (d) {
        if (this.onSelect.exists()) {
            var request = {};
            for (var key in this.onSelect.mappings) {
                var hackKey = this.source.mappings.getReverseMap(key);
                request[key] = d[hackKey];
            }
            var visualization = this.onSelect.getUpdatesVisualization();
            var dataSource = this.onSelect.getUpdatesDatasource();
            dataSource.fetchData(request);
        }
    };

    //  Output  ---
    function Output(dataSource, output) {
        this.dataSource = dataSource;
        this.id = output.id;
        this.from = output.from;
        this.request = {};
        this.notify = output.notify || [];
        this.filter = output.filter || [];
    };

    Output.prototype.getQualifiedID = function () {
        return this.dataSource.id + "." + this.id;
    };

    Output.prototype.getParams = function () {
        var retVal = "";
        for (var key in this.request) {
            if (retVal.length) {
                retVal += ", ";
            }
            retVal += this.request[key];
        }
        return retVal;
    };

    Output.prototype.accept = function (visitor) {
        visitor.visit(this);
    };

    Output.prototype.setData = function (data, request) {
        var context = this;
        this.request = request;
        this.data = data;
        this.notify.forEach(function (item) {
            var viz = context.dataSource.dashboard.visualizations[item];
            viz.notify();
        });
    };

    //  DataSource  ---
    function DataSource(dashboard, dataSource, proxyMappings) {
        this.dashboard = dashboard;
        this.id = dataSource.id
        this.filter = dataSource.filter || [];
        this.WUID = dataSource.WUID;
        this.URL = dataSource.URL;

        var context = this;
        this.outputs = {};
        var hipieResults = [];
        dataSource.outputs.forEach(function (item) {
            context.outputs[item.id] = new Output(context, item);
            hipieResults.push({
                id: item.id,
                from: item.from,
                filter: item.filter || []
            });
        });

        if (this.WUID) {
            this.comms = new comms.HIPIEWorkunit()
                .ddlUrl(dashboard.marshaller.espUrl)
                .proxyMappings(proxyMappings)
                .hipieResults(hipieResults)
            ;
        } else {
            this.comms = new comms.HIPIERoxie()
                .url(dataSource.URL)
                .proxyMappings(proxyMappings)
            ;
        }
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
        this.comms.call(this.request, function (response) {
            context.processResponse(response, request);
        });
    };

    DataSource.prototype.processResponse = function (response, request) {
        for (var key in this.outputs) {
            var from = this.outputs[key].from;
            if (!from) {
                //  Temp workaround for older services  ---
                from = this.outputs[key].id.toLowerCase();
            }
            if (exists(from, response) && exists(from + "_changed", response) && response[from + "_changed"].length && response[from + "_changed"][0][from + "_changed"]) {
                this.outputs[key].setData(response[from], request);
            }
        }
    };

    //  Dashboard  ---
    function Dashboard(marshaller, dashboard, proxyMappings) {
        this.marshaller = marshaller;
        this.id = dashboard.id;

        var context = this;
        this.datasources = {};
        this.datasourceTotal = 0;
        dashboard.datasources.forEach(function (item) {
            context.datasources[item.id] = new DataSource(context, item, proxyMappings);
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
        this._proxyMappings = {};
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
        this.espUrl = new comms.ESPUrl()
            .url(url)
        ;
        var transport = null;
        var hipieResultName = "HIPIE_DDL";
        if (this.espUrl.isWorkunitResult()) {
            hipieResultName = this.espUrl._params["ResultName"];
            transport = new comms.HIPIEWorkunit()
                .ddlUrl(this.espUrl)
                .proxyMappings(this._proxyMappings)
            ;
        } else {
            transport = new comms.HIPIERoxie()
                .ddlUrl(this.espUrl)
                .proxyMappings(this._proxyMappings)
            ;
        }
        var request = {
            refresh: false
        };
        var context = this;
        transport
            .call(request, function (response) {
                if (exists(hipieResultName, response)) {
                    transport.fetchResult(hipieResultName, function (ddlResponse) {
                        var json = ddlResponse[0][hipieResultName];
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
                    });
                }
            })
        ;
    };

    Marshaller.prototype.proxyMappings = function (_) {
        if (!arguments.length) return this._proxyMappings;
        this._proxyMappings = _;
        return this;
    }

    Marshaller.prototype.parse = function (json) {
        var context = this;
        var dashboards = JSON.parse(json);
        this.dashboards = {};
        dashboards.forEach(function (item) {
            context.dashboards[item.id] = new Dashboard(context, item, context._proxyMappings);
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
