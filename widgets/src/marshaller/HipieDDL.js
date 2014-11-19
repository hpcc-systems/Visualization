(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../other/Comms", "../common/Widget"], factory);
    } else {
        root.Marshaller = factory(root.Comms, root.Widget);
    }
}(this, function (Comms, Widget) {
    var Vertex = null;
    var Edge = null;
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
    function SourceMappings(visualization, mappings) {
        this.visualization = visualization;
        this.hasMappings = false;
        this.mappings = mappings;
        this.reverseMappings = {};
        for (var key in this.mappings) {
            this.reverseMappings[this.mappings[key]] = key;
            this.hasMappings = true;
        }
    };

    SourceMappings.prototype.contains = function (key) {
        return this.mappings[key] !== undefined;
    };

    SourceMappings.prototype.doMap = function (item) {
        var retVal = {};
        try {
            for (var key in this.mappings) {
                var rhsKey = this.mappings[key];
                var val = item[rhsKey];
                if (val === undefined) {
                    val = item[rhsKey.toLowerCase()];
                }
                retVal[key] = val;
            }
        } catch (e) {
            console.log("Invalid Mappings");
        }
        return retVal;
    };

    SourceMappings.prototype.doMapAll = function (data) {
        var context = this;
        return data.map(function (item) {
            return context.doMap(item);
        });
    };

    SourceMappings.prototype.getMap = function (key) {
        return this.mappings[key];
    };

    SourceMappings.prototype.getReverseMap = function (key) {
        return this.reverseMappings[key];
    };

    function LineMappings(visualization, mappings) {
        SourceMappings.call(this, visualization, mappings);
    };
    LineMappings.prototype = Object.create(SourceMappings.prototype);

    LineMappings.prototype.doMap = function (item) {
        var retVal = {};
        try {
            retVal = [];
            for (var i = 0; i < this.mappings.x.length; ++i) {
                retVal.push({
                    label: item[this.mappings.x[i]],
                    weight: item[this.mappings.y[i]]
                })
            }
        } catch (e) {
            console.log("Invalid Mappings");
        }
        return retVal;
    };

    function TableMappings(visualization, mappings) {
        var newMappings = {};
        for (var key in mappings) {
            mappings[key].forEach(function (mapingItem, idx) {
                newMappings[visualization.label[idx]] = mapingItem;
            });
        }
        SourceMappings.call(this, visualization, newMappings);
    };
    TableMappings.prototype = Object.create(SourceMappings.prototype);

    function GraphMappings(visualization, mappings, link) {
        SourceMappings.call(this, visualization, mappings);
        this.link = link;
    };
    GraphMappings.prototype = Object.create(SourceMappings.prototype);

    GraphMappings.prototype.doMapAll = function (data) {
        var context = this;
        var vertexMap = {};
        var vertices = [];
        function getVertex(item) {
            var id = "uid_" + item.uid;
            var retVal = vertexMap[id];
            if (!retVal) {
                retVal = new Vertex()
                    .id(id)
                    .faChar("\uf128")
                    .text(item.label)
                ;
                vertexMap[id] = retVal;
                vertices.push(retVal);
            }
            return retVal;
        };
        var edges = [];
        data.forEach(function (item) {
            var mappedItem = context.doMap(item);
            var vertex = getVertex(mappedItem);
            vertices.push(vertex);
            if (item[context.link.childfile] && item[context.link.childfile].Row) {
                var childItems = item[context.link.childfile].Row;
                childItems.forEach(function (childItem) {
                    var childMappedItem = context.doMap(childItem);
                    var childVertex = getVertex(childMappedItem);
                    vertices.push(childVertex);
                    var edge = new Edge()
                        .sourceVertex(vertex)
                        .targetVertex(childVertex)
                        .sourceMarker("circleFoot")
                        .targetMarker("arrowHead")
                    ;
                    edges.push(edge);
                });
            }
        })
        return { vertices: vertices, edges: edges, merge: false };
    };

    //  Viz Source ---
    function Source(visualization, source) {
        this.visualization = visualization;
        this._id = source.id;
        this._output = source.output;
        this.mappings = null;
        switch(this.visualization.type) {
            case "LINE":
                this.mappings = new LineMappings(this.visualization, source.mappings);
                break;
            case "TABLE":
                this.mappings = new TableMappings(this.visualization, source.mappings);
                break;
            case "GRAPH":
                this.mappings = new GraphMappings(this.visualization, source.mappings, source.link);
                break;
            default:
                this.mappings = new SourceMappings(this.visualization, source.mappings);
                break;
        }
        this.first = source.first;
        this.reverse = source.reverse;
        this.sort = source.sort;
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

    Source.prototype.hasData = function () {
        return this.getOutput().data ? true : false;
    };

    Source.prototype.getData = function () {
        var context = this;
        var data = this.getOutput().data;
        if (this.sort) {
            var context = this;
            data.sort(function (l, r) {
                for (var i = 0; i < context.sort.length; ++i) {
                    var sortField = context.sort[i];
                    var reverse = false;
                    if (sortField.indexOf("-") === 0) {
                        sortField = sortField.substring(1);
                        reverse = true;
                    }
                    if (l[sortField] !== r[sortField]) {
                        return reverse ? r[sortField] - l[sortField] : l[sortField] - r[sortField];
                    }
                }
                return 0;
            });
        }
        if (this.reverse) {
            data.reverse();
        }
        if (this.first && data.length > this.first) {
            data.length = this.first;
        }
        return this.mappings.doMapAll(data);
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

    Select.prototype.getUpdatesDatasources = function () {
        var dedup = {};
        var retVal = [];
        if (exists("_updates", this) && this._updates instanceof Array) {
            this._updates.forEach(function (item, idx) {
                var datasource = this.visualization.dashboard.datasources[item.datasource];
                if (!dedup[datasource.id]) {
                    dedup[datasource.id] = true;
                    retVal.push(datasource);
                }
            }, this);
        } else if (exists("_updates.datasource", this)) { //TODO For backward compatability - Remove in the future  ---
            retVal.push(this.visualization.dashboard.datasources[this._updates.datasource]);
        }
        return retVal;
    };

    Select.prototype.getUpdatesVisualizations = function () {
        var dedup = {};
        var retVal = [];
        if (exists("_updates", this) && this._updates instanceof Array) {
            this._updates.forEach(function (item, idx) {
                var visualization = this.visualization.dashboard.visualizations[item.visualization];
                if (!dedup[visualization.id]) {
                    dedup[visualization.id] = true;
                    retVal.push(visualization);
                }
            }, this);
        } else if (exists("_updates.visualization", this)) { //TODO For backward compatability - Remove in the future  ---
            retVal.push(this.visualization.dashboard.visualizations[this._updates.visualization]);
        }
        return retVal;
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

        var context = this;
        switch (this.type) {
            case "CHORO":
                this.loadWidget(this.source.mappings.contains("county") ? "src/map/ChoroplethCounties" : "src/map/ChoroplethStates");
                break;
            case "2DCHART":
            case "PIE":
            case "BUBBLE":
            case "BAR":
            case "WORD_CLOUD":
                this.loadWidget("src/chart/MultiChartSurface", function (widget) {
                    widget
                        .chartType(context.properties.charttype || context.type)
                        .title(context.id)
                    ;
                });
                break;
            case "LINE":
                this.loadWidget("src/chart/Line", function (widget) {
                    widget.labels(context.source.mappings.mappings.y);
                });
                break;
            case "TABLE":
                this.loadWidget("src/other/Table", function (widget) {
                    widget
                        .columns(context.label)
                    ;
                });
                break;
            case "SLIDER":
                this.loadWidget("src/other/Slider", function (widget) {
                    if (visualization.range) {
                        var selectionLabel = "";
                        for (key in visualization.onSelect.mappings) {
                            selectioLabel = key;
                            break;
                        }
                        widget
                            .range({ low: +visualization.range[0], high: +visualization.range[1] })
                            .step(+visualization.range[2])
                            .selectionLabel(selectioLabel)
                        ;
                    }
                });
                break;
            case "GRAPH":
                this.loadWidgets(["src/graph/Graph", "src/graph/Vertex", "src/graph/Edge"], function (widget, widgetClasses) {
                    Vertex = widgetClasses[1];
                    Edge = widgetClasses[2];
                    widget
                        .layout("ForceDirected2")
                        .shrinkToFitOnLayout(true)
                    ;
                });
                break;
            default:
                this.loadWidget("src/common/TextBox", function (widget) {
                    widget
                        .text(context.id + "\n" + "TODO:  " + context.type)
                    ;
                });
                break;
        }
    };

    Visualization.prototype.isLoading = function (widgetPath, callback) {
        return this.widget === null;
    };

    Visualization.prototype.isLoaded = function (widgetPath, callback) {
        return this.widget instanceof Widget;
    };

    Visualization.prototype.loadWidget = function (widgetPath, callback) {
        this.loadWidgets([widgetPath], callback);
    };

    Visualization.prototype.loadWidgets = function (widgetPaths, callback) {
        this.widget = null;

        var context = this;
        require(widgetPaths, function (Widget) {
            context.setWidget(new Widget());
            if (callback) {
                callback(context.widget, arguments);
            }
        });
    };

    Visualization.prototype.setWidget = function (widget) {
        this.widget = widget;

        var context = this;
        this.widget.click = function (d) {
            context.click(d);
        }
        for (var key in this.properties) {
            if (this.widget[key]) {
                try {
                    this.widget[key](this.properties[key])
                } catch (e) {
                    console.log("Invalid Property:" + this.id + ".properties." + key);
                }
            }
        }
        return this.widget;
    };

    Visualization.prototype.accept = function (visitor) {
        visitor.visit(this);
    };

    Visualization.prototype.getSelectDepth = function () {
        var retVal = 0;
        var visualizations = this.onSelect.getUpdatesVisualizations();
        visualizations.forEach(function (item) {
            var depth = item.getSelectDepth() + 1;
            if (depth > retVal) {
                retVal = depth;
            }
        }, this);
        return retVal;
    };

    Visualization.prototype.notify = function () {
        var context = this;
        if (this.source.hasData()) {
            if (this.widget) {
                var data = this.source.getData();
                this.dashboard.marshaller.updateViz(this, data);
                this.widget
                    .data(data)
                    .render()
                ;
                var params = this.source.getOutput().getParams();
                if (exists("widget.title", this)) {
                    this.widget
                        .title(this.id + (params ? " (" + params + ")" : ""))
                        .render()
                    ;
                } else if (exists("widget._parentWidget.title", this)) {
                    this.widget._parentWidget
                        .title(this.id + (params ? " (" + params + ")" : ""))
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
                var origKey = this.source.mappings.hasMappings ? this.source.mappings.getReverseMap(key) : key;
                request[this.onSelect.mappings[key]] = d[origKey];
            }
            var dataSources = this.onSelect.getUpdatesDatasources();
            dataSources.forEach(function (item) {
                item.fetchData(request);
            });
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
            this.comms = new Comms.HIPIEWorkunit()
                .url(dashboard.marshaller.espUrl.getUrl())
                .proxyMappings(proxyMappings)
                .hipieResults(hipieResults)
            ;
        } else {
            this.comms = new Comms.HIPIERoxie()
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
        var lowerResponse = {};
        for (var key in response) {
            lowerResponse[key.toLowerCase()] = response[key];
        }
        for (var key in this.outputs) {
            var from = this.outputs[key].from;
            if (!from) {
                //  Temp workaround for older services  ---
                from = this.outputs[key].id.toLowerCase();
            }
            if (exists(from, response) && (!exists(from + "_changed", response) || (exists(from + "_changed", response) && response[from + "_changed"].length && response[from + "_changed"][0][from + "_changed"]))) {
                this.outputs[key].setData(response[from], request);
            } else if (exists(from, lowerResponse)) {// && exists(from + "_changed", lowerResponse) && lowerResponse[from + "_changed"].length && lowerResponse[from + "_changed"][0][from + "_changed"]) {
                console.log("DDL 'DataSource.From' case is Incorrect");
                this.outputs[key].setData(lowerResponse[from], request);
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
        this.visualizationsArray.sort(function (l, r) {
            return r.getSelectDepth() - l.getSelectDepth();
        });
        var vizIncluded = {};
        this.visualizationsTree = [];
        var walkSelect = function (viz, result) {
            if (viz && !vizIncluded[viz.id]) {
                vizIncluded[viz.id] = true;
                var treeItem = { visualization: viz, children: [] };
                result.push(treeItem);
                var visualizations = viz.onSelect.getUpdatesVisualizations();
                visualizations.forEach(function (item) {
                    walkSelect(item, treeItem.children);
                });
            }
        };
        this.visualizationsArray.forEach(function (item) {
            walkSelect(item, this.visualizationsTree);
        }, this);
    };

    Dashboard.prototype.accept = function (visitor) {
        visitor.visit(this);
        for (var key in this.datasources) {
            this.datasources[key].accept(visitor);
        }
        this.visualizationsArray.forEach(function (item) {
            item.accept(visitor);
        }, this);
    };

    Dashboard.prototype.allVisualizationsLoaded = function () {
        var notLoaded = this.visualizationsArray.filter(function (item) { return !item.isLoaded(); });
        return notLoaded.length === 0;
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
        this.espUrl = new Comms.ESPUrl()
            .url(url)
        ;
        var transport = null;
        var hipieResultName = "HIPIE_DDL";
        if (this.espUrl.isWorkunitResult()) {
            hipieResultName = this.espUrl._params["ResultName"];
            transport = new Comms.HIPIEWorkunit()
                .url(url)
                .proxyMappings(this._proxyMappings)
            ;
        } else {
            transport = new Comms.HIPIERoxie()
                .url(this.espUrl.getUrl())
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
                        context.parse(json, function () {
                            callback(response);
                        });
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

    Marshaller.prototype.parse = function (json, callback) {
        var context = this;
        this._json = json;
        this._jsonParsed = JSON.parse(this._json);
        this.dashboards = {};
        this.dashboardArray = [];
        this._jsonParsed.forEach(function (item) {
            newDashboard = new Dashboard(context, item, context._proxyMappings);
            context.dashboards[item.id] = newDashboard;
            context.dashboardArray.push(newDashboard);
        });
        this.ready(callback);
        return this;
    };

    Marshaller.prototype.allDashboardsLoaded = function () {
        return this.dashboardArray.filter(function (item) { return !item.allVisualizationsLoaded(); }).length === 0;
    };

    Marshaller.prototype.ready = function (callback) {
        if (!callback) {
            return;
        }
        var context = this;
        function waitForLoad(callback) {
            if (context.allDashboardsLoaded()) {
                callback();
            } else {
                setTimeout(waitForLoad, 100, callback);
            }
        };
        waitForLoad(callback);
    };

    Marshaller.prototype.updateViz = function (vizInfo, data) {
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
