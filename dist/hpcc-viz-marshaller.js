
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('marshaller/HipieDDL.js',["../other/Comms", "../common/Widget", "require"], factory);
    } else {
        root.marshaller_HipieDDL = factory(root.other_Comms, root.common_Widget, root.require);
    }
}(this, function (Comms, Widget, require) {
    var Vertex = null;
    var Edge = null;
    var exists = function (prop, scope) {
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
        this.mappings = mappings;
        this.hasMappings = false;
        this.reverseMappings = {};
        this.columns = [];
        this.columnsIdx = {};
        this.columnsRHS = [];
        this.columnsRHSIdx = {};
    }

    SourceMappings.prototype.init = function() {
        for (var key in this.mappings) {
            this.reverseMappings[this.mappings[key]] = key;
            if (this.columnsIdx[key] === undefined) {
                this.columns.push(key);
                this.columnsIdx[key] = this.columns.length - 1;
            }
            this.columnsRHS[this.columnsIdx[key]] = this.mappings[key];
            this.columnsRHSIdx[this.mappings[key]] = this.columnsIdx[key];
            this.hasMappings = true;
        }
    };

    SourceMappings.prototype.contains = function (key) {
        return this.mappings[key] !== undefined;
    };

    SourceMappings.prototype.doMap = function (item) {
        var retVal = [];
        for (var key in this.mappings) {
            try {
                var rhsKey = this.mappings[key];
                var val = item[rhsKey];
                if (val === undefined) {
                    val = item[rhsKey.toLowerCase()];
                }
                //  Symposium AVE Hack 
                if (val === undefined && rhsKey.indexOf("_AVE") === rhsKey.length - 4 && item.base_count !== undefined) {
                    var rhsSum = rhsKey.substring(0, rhsKey.length - 4) + "_SUM";
                    val = item[rhsSum];
                    if (val === undefined) {
                        val = item[rhsSum.toLowerCase()];
                    }
                    if (val) {
                        val /= item.base_count;
                    }
                }
                retVal[this.columnsIdx[key]] = val;
            } catch (e) {
                console.log("Invalid Mapping:  " + this.visualization.id + " [" + rhsKey + "->" + item + "]");
            }
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

    function ChartMappings(visualization, mappings) {
        SourceMappings.call(this, visualization, mappings);
        this.columns = ["label", "weight"];
        this.columnsIdx = { label: 0, weight: 1 };
        this.init();
    }
    ChartMappings.prototype = Object.create(SourceMappings.prototype);

    function ChoroMappings(visualization, mappings) {
        SourceMappings.call(this, visualization, mappings);
        if (mappings.state) {
            this.columns = ["state", "weight"];
            this.columnsIdx = { state: 0, weight: 1 };
        } else if (mappings.county) {
            this.columns = ["county", "weight"];
            this.columnsIdx = { county: 0, weight: 1 };
        }
        this.init();
    }
    ChoroMappings.prototype = Object.create(SourceMappings.prototype);

    function LineMappings(visualization, mappings) {
        var newMappings = {
            label: mappings.x[0]
        };
        mappings.y.forEach(function(item, idx) {
            newMappings[item] = item;
        });
        SourceMappings.call(this, visualization, newMappings);
        this.init();
    }
    LineMappings.prototype = Object.create(SourceMappings.prototype);

    function TableMappings(visualization, mappings) {
        var newMappings = {};
        for (var key in mappings) {
            mappings[key].forEach(function (mapingItem, idx) {
                newMappings[visualization.label[idx]] = mapingItem;
            });
        }
        SourceMappings.call(this, visualization, newMappings);
        this.init();
    }
    TableMappings.prototype = Object.create(SourceMappings.prototype);

    function GraphMappings(visualization, mappings, link) {
        SourceMappings.call(this, visualization, mappings);
        this.icon = visualization.icon || {};
        this.fields = visualization.fields || {};
        this.columns = ["uid", "label", "weight", "flags"];
        this.columnsIdx = { uid: 0, label: 1, weight: 2, flags: 3 };
        this.init();
        this.link = link;
    }
    GraphMappings.prototype = Object.create(SourceMappings.prototype);

    GraphMappings.prototype.calcAnnotation = function (field, origItem, forAnnotation) {
        var retVal = {};
        function faCharFix(faChar) {
            if (faChar) {
                return String.fromCharCode(parseInt(faChar));
            }
            return faChar;
        }
        function mapStruct(struct, retVal) {
            if (struct) {
                for (var key in struct) {
                    switch (key) {
                        case "faChar":
                            retVal.faChar = faCharFix(struct.faChar);
                            break;
                        case "tooltip":
                            retVal[key] = struct[key];
                            break;
                        case "icon_image_colorFill":
                        case "icon_shape_colorFill":
                        case "icon_shape_colorStroke":
                            if (forAnnotation) {
                                retVal[key.split("icon_")[1]] = struct[key];
                            } else {
                                retVal[key] = struct[key];
                            }
                            break;
                        case "textbox_image_colorFill":
                        case "textbox_shape_colorFill":
                        case "textbox_shape_colorStroke":
                            if (!forAnnotation) {
                                retVal[key] = struct[key];
                            }
                            break;
                        case "id":
                        case "valuemappings":
                        case "font":
                        case "charttype":
                            break;
                        default:
                            console.log("Unknown annotation property:  " + key);
                    }
                }
            }
        }
        mapStruct(field, retVal);
        if (origItem && origItem[field.id] && field.valuemappings) {
            var annotationInfo = field.valuemappings[origItem[field.id]];
            mapStruct(annotationInfo, retVal);
        }

        for (var key in retVal) { // jshint ignore:line
            return retVal;
        }
        return null;
    };

    GraphMappings.prototype.doMapAll = function (data) {
        var context = this;
        var vertexMap = {};
        var vertices = [];
        function getVertex(item, origItem) {
            var id = "uid_" + item[0];
            var retVal = vertexMap[id];
            if (!retVal) {
                retVal = new Vertex()
                    .faChar("\uf128")
                    .text(item[1])
                ;
                retVal.__hpcc_uid = item[0];
                vertexMap[id] = retVal;
                vertices.push(retVal);
            }
            if (origItem) {
                // Icon  ---
                var icon = context.calcAnnotation(context.visualization.icon, origItem);
                if (icon) {
                    for (var key in icon) {
                        if (retVal[key]) {
                            retVal[key](icon[key]);
                        }
                    }
                }
                // Annotations  ---
                var annotations = [];
                context.fields.forEach(function (field) {
                    var annotation = context.calcAnnotation(field, origItem, true);
                    if (annotation) {
                        annotations.push(annotation);
                    }
                });
                retVal.annotationIcons(annotations);
            }
            return retVal;
        }
        var edges = [];
        data.forEach(function (item) {
            var mappedItem = context.doMap(item);
            var vertex = getVertex(mappedItem, item);
            if (item[context.link.childfile] && item[context.link.childfile].Row) {
                var childItems = item[context.link.childfile].Row;
                childItems.forEach(function (childItem, i) {
                    var childMappedItem = context.doMap(childItem);
                    var childVertex = getVertex(childMappedItem);
                    if (vertex.id() !== childVertex.id()) {
                        var edge = new Edge()
                            .sourceVertex(vertex)
                            .targetVertex(childVertex)
                            .sourceMarker("circleFoot")
                            .targetMarker("arrowHead")
                        ;
                        edges.push(edge);
                    }
                });
            }
        });
        return { vertices: vertices, edges: edges, merge: false };
    };

    //  Viz Source ---
    function Source(visualization, source) {
        this.visualization = visualization;
        if (source) {
            this._id = source.id;
            this._output = source.output;
            this.mappings = null;
            if (!source.mappings) {
                console.log("no mappings for:" + visualization.id + "->" + source.id);
            }
            switch (this.visualization.type) {
            case "LINE":
                this.mappings = new LineMappings(this.visualization, source.mappings);
                break;
            case "TABLE":
                this.mappings = new TableMappings(this.visualization, source.mappings);
                break;
            case "GRAPH":
                this.mappings = new GraphMappings(this.visualization, source.mappings, source.link);
                break;
            case "CHORO":
                this.mappings = new ChoroMappings(this.visualization, source.mappings, source.link);
                break;
            default:
                this.mappings = new ChartMappings(this.visualization, source.mappings);
                break;
            }
            this.first = source.first;
            this.reverse = source.reverse;
            this.sort = source.sort;
        }
    }

    Source.prototype.getQualifiedID = function () {
        return this.visualization.getQualifiedID() + "." + this.id;
    };

    Source.prototype.exists = function () {
        return this._id;
    };

    Source.prototype.getDatasource = function () {
        return this.visualization.dashboard.datasources[this._id];
    };

    Source.prototype.getOutput = function () {
        var datasource = this.getDatasource();
        if (datasource && datasource.outputs) {
            return datasource.outputs[this._output];
        }
        return null;
    };

    Source.prototype.hasData = function () {
        return this.getOutput().data ? true : false;
    };

    Source.prototype.getColumns = function () {
        return this.mappings.columns;
    };

    Source.prototype.getData = function () {
        var context = this;
        var data = this.getOutput().data;
        if (this.sort) {
            data.sort(function (l, r) {
                for (var i = 0; i < context.sort.length; ++i) {
                    var sortField = context.sort[i];
                    var reverse = false;
                    if (sortField.indexOf("-") === 0) {
                        sortField = sortField.substring(1);
                        reverse = true;
                    }
                    var lVal = l[sortField];
                    if (lVal === undefined) {
                        lVal = l[sortField.toLowerCase()];
                    }
                    var rVal = r[sortField];
                    if (rVal === undefined) {
                        rVal = r[sortField.toLowerCase()];
                    }

                    if (lVal !== rVal) {
                        return reverse ? rVal - lVal : lVal - rVal;
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

    //  Viz Events ---
    function Event(visualization, eventID, event) {
        this.visualization = visualization;
        this.eventID = eventID;
        if (event) {
            this._updates = event.updates;
            this.mappings = event.mappings;
        }
    }

    Event.prototype.exists = function () {
        return this._updates !== undefined;
    };

    Event.prototype.getUpdates = function () {
        var retVal = [];
        if (exists("_updates", this) && this._updates instanceof Array) {
            this._updates.forEach(function (item, idx) {
                var datasource = this.visualization.dashboard.datasources[item.datasource];
                var visualization = this.visualization.dashboard.visualizations[item.visualization];
                retVal.push({
                    eventID: this.eventID,
                    datasource: datasource,
                    visualization: visualization
                });
            }, this);
        }
        return retVal;
    };

    Event.prototype.getUpdatesDatasources = function () {
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
        }
        return retVal;
    };

    Event.prototype.getUpdatesVisualizations = function () {
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
        }
        return retVal;
    };

    function Events(visualization, events) {
        this.visualization = visualization;
        this.events = {};
        for (var key in events) {
            this.events[key] = new Event(visualization, key, events[key]);
        }
    }

    Events.prototype.setWidget = function (widget) {
        var context = this;
        for (var key in this.events) {
            if (widget["vertex_" + key]) {
                widget["vertex_" + key] = function (d) {
                    context.visualization.onEvent(key, context.events[key], d);
                };
            } else if (widget[key]) {
                widget[key] = function (d) {
                    context.visualization.onEvent(key, context.events[key], d);
                };
            }
        }
    };

    Events.prototype.exists = function () {
        return this._updates !== undefined;
    };

    Events.prototype.getUpdates = function () {
        var retVal = [];
        for (var key in this.events) {
            retVal = retVal.concat(this.events[key].getUpdates());
        }
        return retVal;
    };

    Events.prototype.getUpdatesDatasources = function () {
        var retVal = [];
        for (var key in this.events) {
            retVal = retVal.concat(this.events[key].getUpdatesDatasources());
        }
        return retVal;
    };

    Events.prototype.getUpdatesVisualizations = function () {
        var retVal = [];
        for (var key in this.events) {
            retVal = retVal.concat(this.events[key].getUpdatesVisualizations());
        }
        return retVal;
    };

    //  Visualization ---
    function Visualization(dashboard, visualization) {
        this.dashboard = dashboard;
        this.id = visualization.id;
        this.label = visualization.label;
        this.title = visualization.title || visualization.id;
        this.type = visualization.type;
        this.icon = visualization.icon || {};
        this.fields = visualization.fields || {};
        this.properties = visualization.properties || (visualization.source ? visualization.source.properties : null) || {};
        this.source = new Source(this, visualization.source);
        this.events = new Events(this, visualization.events);

        var context = this;
        switch (this.type) {
            case "CHORO":
                this.loadWidget(this.source.mappings.contains("county") ? "src/map/ChoroplethCounties" : "src/map/ChoroplethStates", function (widget) {
                    widget
                        .id(visualization.id)
                    ;
                });
                break;
            case "2DCHART":
            case "PIE":
            case "BUBBLE":
            case "BAR":
            case "WORD_CLOUD":
                this.loadWidget("src/chart/MultiChart", function (widget) {
                    widget
                        .id(visualization.id)
                        .chartType(context.properties.charttype || context.type)
                    ;
                });
                break;
            case "LINE":
                this.loadWidget("src/chart/MultiChart", function (widget) {
                    widget
                        .id(visualization.id)
                        .chartType(context.properties.charttype || context.type)
                    ;
                });
                break;
            case "TABLE":
                this.loadWidget("src/other/Table", function (widget) {
                    widget
                        .id(visualization.id)
                        .columns(context.label)
                    ;
                });
                break;
            case "SLIDER":
                this.loadWidget("src/form/Slider", function (widget) {
                    widget
                        .id(visualization.id)
                    ;
                    if (visualization.range) {
                        var selectionLabel = "";
                        for (var key in visualization.events.events.mappings) {
                            selectionLabel = key;
                            break;
                        }
                        widget
                            .low(+visualization.range[0])
                            .high(+visualization.range[1])
                            .step(+visualization.range[2])
                            .selectionLabel(selectionLabel)
                        ;
                    }
                });
                break;
            case "GRAPH":
                this.loadWidgets(["src/graph/Graph", "src/graph/Vertex", "src/graph/Edge"], function (widget, widgetClasses) {
                    Vertex = widgetClasses[1];
                    Edge = widgetClasses[2];
                    widget
                        .id(visualization.id)
                        .layout("ForceDirected2")
                        .applyScaleOnLayout(true)
                    ;
                });
                break;
            case "FORM":
                this.loadWidgets(["src/form/Form", "src/form/Input"], function (widget, widgetClasses) {
                    var Input = widgetClasses[1];
                    widget
                        .id(visualization.id)
                        .inputs(visualization.fields.map(function(field) {
                            return new Input()
                                .name(field.id)
                                .label((field.properties ? field.properties.label : null) || field.label)
                                .type("textbox")
                            ;
                        }))
                    ;
                });
                break;
            default:
                this.loadWidget("src/common/TextBox", function (widget) {
                    widget
                        .id(visualization.id)
                        .text(context.id + "\n" + "TODO:  " + context.type)
                    ;
                });
                break;
        }
    }

    Visualization.prototype.getQualifiedID = function () {
        return this.dashboard.getQualifiedID() + "." + this.id;
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

    Visualization.prototype.setWidget = function (widget, skipProperties) {
        this.widget = widget;
        this.events.setWidget(widget);
        if (!skipProperties) {
            for (var key in this.properties) {
                if (this.widget[key]) {
                    try {
                        this.widget[key](this.properties[key]);
                    } catch (e) {
                        console.log("Invalid Property:" + this.id + ".properties." + key);
                    }
                }
            }
        }
        return this.widget;
    };

    Visualization.prototype.accept = function (visitor) {
        visitor.visit(this);
    };

    Visualization.prototype.notify = function () {
        if (this.source.hasData()) {
            if (this.widget) {
                var columns = this.source.getColumns();
                this.widget.columns(columns);
                var data = this.source.getData();
                this.dashboard.marshaller.updateViz(this, data);
                this.widget.data(data);

                var params = this.source.getOutput().getParams();
                if (exists("widget.title", this)) {
                    this.widget.title(this.title + (params ? " (" +params + ")": ""));
                    this.widget.render();
                } else if (exists("widgetSurface.title", this)) {
                    this.widgetSurface.title(this.title + (params ? " (" + params + ")" : ""));
                    this.widgetSurface.render();
                } else {
                    this.widget.render();
                }
            }
        }
    };

    Visualization.prototype.onEvent = function (eventID, event, d) {
        if (event.exists()) {
            var request = {};
            for (var key in event.mappings) {
                var origKey = (this.source.mappings && this.source.mappings.hasMappings) ? this.source.mappings.getReverseMap(key) : key;
                request[event.mappings[key]] = d[origKey];
            }
            var dataSources = event.getUpdatesDatasources();
            dataSources.forEach(function (item) {
                item.fetchData(request, false, event._updates.map(function (item) {
                    return item.visualization;
                }));
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
    }

    Output.prototype.getQualifiedID = function () {
        return this.dataSource.getQualifiedID() + "." + this.id;
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

    Output.prototype.setData = function (data, request, updates) {
        var context = this;
        this.request = request;
        this.data = data;
        this.notify.forEach(function (item) {
            if (!updates || updates.indexOf(item) >= 0) {
                var viz = context.dataSource.dashboard.visualizations[item];
                viz.notify();
            }
        });
    };

    //  DataSource  ---
    function DataSource(dashboard, dataSource, proxyMappings) {
        this.dashboard = dashboard;
        this.id = dataSource.id;
        this.filter = dataSource.filter || [];
        this.WUID = dataSource.WUID;
        this.URL = dataSource.URL;
        this.databomb = dataSource.databomb;
        this.request = {};

        var context = this;
        this.outputs = {};
        var hipieResults = [];
        dataSource.outputs.forEach(function (item) {
            context.outputs[item.id] = new Output(context, item);
            hipieResults.push({
                id: item.id,
                from: item.from,
                filter: item.filter || this.filter
            });
        }, this);

        if (this.WUID) {
            this.comms = new Comms.HIPIEWorkunit()
                .url(dashboard.marshaller.espUrl._url)
                .proxyMappings(proxyMappings)
                .hipieResults(hipieResults)
            ;
        } else if (this.databomb) {
            this.comms = new Comms.HIPIEDatabomb()
                .hipieResults(hipieResults)
            ;
        } else {
            this.comms = new Comms.HIPIERoxie()
                .url(dataSource.URL)
                .proxyMappings(proxyMappings)
            ;
        }
    }

    DataSource.prototype.getQualifiedID = function () {
        return this.dashboard.getQualifiedID() + "." + this.id;
    };

    DataSource.prototype.accept = function (visitor) {
        visitor.visit(this);
        for (var key in this.outputs) {
            this.outputs[key].accept(visitor);
        }
    };

    DataSource.prototype.fetchData = function (request, refresh, updates) {
        var context = this;
        this.request.refresh = refresh ? true : false;
        this.filter.forEach(function (item) {
            context.request[item + "_changed"] = false;
        });
        for (var key in request) {
            this.request[key] = request[key] === undefined ? "" : request[key];
            this.request[key + "_changed"] = true;
        }
        this.comms.call(this.request, function (response) {
            context.processResponse(response, request, updates);
        });
    };

    DataSource.prototype.processResponse = function (response, request, updates) {
        var lowerResponse = {};
        for (var responseKey in response) {
            lowerResponse[responseKey.toLowerCase()] = response[responseKey];
        }
        for (var key in this.outputs) {
            var from = this.outputs[key].from;
            if (!from) {
                //  Temp workaround for older services  ---
                from = this.outputs[key].id.toLowerCase();
            }
            if (exists(from, response) && (!exists(from + "_changed", response) || (exists(from + "_changed", response) && response[from + "_changed"].length && response[from + "_changed"][0][from + "_changed"]))) {
                this.outputs[key].setData(response[from], request, updates);
            } else if (exists(from, lowerResponse)) {// && exists(from + "_changed", lowerResponse) && lowerResponse[from + "_changed"].length && lowerResponse[from + "_changed"][0][from + "_changed"]) {
                console.log("DDL 'DataSource.From' case is Incorrect");
                this.outputs[key].setData(lowerResponse[from], request, updates);
            } else {
                var responseItems = [];
                for (var responseKey2 in response) {
                    responseItems.push(responseKey2);
                }
                console.log("Unable to locate '" + from + "' in response {" + responseItems.join(", ") + "}");
            }
        }
    };

    //  Dashboard  ---
    function Dashboard(marshaller, dashboard, proxyMappings) {
        this.marshaller = marshaller;
        this.id = dashboard.id;
        this.title = dashboard.title;

        var context = this;
        this.datasources = {};
        this.datasourceTotal = 0;
        dashboard.datasources.forEach(function (item) {
            context.datasources[item.id] = new DataSource(context, item, proxyMappings);
            ++context.datasourceTotal;
        });

        this.visualizations = {};
        this.visualizationsArray = [];
        dashboard.visualizations.forEach(function (item) {
            var newItem = new Visualization(context, item);
            context.visualizations[item.id] = newItem;
            context.visualizationsArray.push(newItem);
        });
        this.visualizationTotal = this.visualizationsArray.length;
        var vizIncluded = {};
        this.visualizationsTree = [];
        var walkSelect = function (viz, result) {
            if (viz && !vizIncluded[viz.id]) {
                vizIncluded[viz.id] = true;
                var treeItem = { visualization: viz, children: [] };
                result.push(treeItem);
                var visualizations = viz.events.getUpdatesVisualizations();
                visualizations.forEach(function (item) {
                    walkSelect(item, treeItem.children);
                });
            }
        };
        this.visualizationsArray.forEach(function (item) {
            walkSelect(item, this.visualizationsTree);
        }, this);
    }

    Dashboard.prototype.getQualifiedID = function () {
        return this.id;
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
    }

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
                .url(url)
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
    };

    Marshaller.prototype.parse = function (json, callback) {
        var context = this;
        this._json = json;
        this._jsonParsed = JSON.parse(this._json);
        this.dashboards = {};
        this.dashboardArray = [];
        this._jsonParsed.forEach(function (item) {
            var newDashboard = new Dashboard(context, item, context._proxyMappings);
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
        }
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


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('marshaller/Graph.js',["d3", "../common/SVGWidget", "../common/TextBox", "../common/Surface", "../common/ResizeSurface", "../chart/MultiChartSurface", "../common/Palette", "../graph/Graph", "../graph/Vertex", "../graph/Edge", "./HipieDDL"], factory);
    } else {
        root.marshaller_Graph = factory(root.d3, root.common_SVGWidget, root.common_TextBox, root.common_Surface, root.common_ResizeSurface, root.chart_MultiChartSurface, root.common_Palette, root.graph_Graph, root.graph_Vertex, root.graph_Edge, root.marshaller_HipieDDL);
    }
}(this, function (d3, SVGWidget, TextBox, Surface, ResizeSurface, MultiChartSurface, Palette, GraphWidget, Vertex, Edge, HipieDDL) {
    function createGraphData(marshaller, databomb, visualizeRoxie) {
        if (databomb instanceof Object) {
        } else if (databomb){
            databomb = JSON.parse(databomb);
        }
        var curr = null;
        var dashboards = {};
        marshaller.accept({
            _visualizeRoxie: visualizeRoxie,
            visit: function (item) {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = {
                        dashboard: item,
                        vertexMap: {},
                        edges: []
                    };
                    dashboards[item.getQualifiedID()] = curr;
                } else if (item instanceof HipieDDL.DataSource) {
                    if (item.databomb && databomb[item.id]) {
                        item.comms.databomb(databomb[item.id]);
                    }
                    if (this._visualizeRoxie) {
                        var params = "";
                        item.filter.forEach(function (item) {
                            if (params.length > 0) {
                                params += ", ";
                            }
                            params += item;
                        });
                        params = " (" + params + ")";
                        curr.vertexMap[item.getQualifiedID()] = new Vertex()
                            .class("vertexLabel")
                            .faChar("\uf1c0")
                            .text(item.id + params)
                        ;
                    }
                } else if (item instanceof HipieDDL.Output) {
                    if (item.dataSource.databomb) {
                        item.dataSource.comms.databombOutput(item.from);
                    }
                    if (this._visualizeRoxie) {
                        curr.vertexMap[item.getQualifiedID()] = new Vertex()
                            .class("vertexLabel")
                            .faChar("\uf0ce")
                            .text(item.id + "\n[" + item.from + "]")
                        ;
                    }
                } else if (item instanceof HipieDDL.Visualization) {
                    if (item.widget) {
                        var newSurface = null;
                        if (item.widget instanceof Surface) {
                            newSurface = item.widget
                                .size({ width: 210, height: 210 })
                            ;
                        } else if (item.widget instanceof TextBox) {
                            newSurface = item.widget;
                        } else {
                            var width = 280;
                            var height = 210;
                            if (item.type === "GRAPH") {
                                width = 800;
                                height = 600;
                            }
                            newSurface = new ResizeSurface()
                                .size({ width: width, height: height })
                                .title(item.title)
                                .content(item.widget)
                            ;
                        }
                        if (newSurface) {
                            item.widgetSurface = newSurface;
                            curr.vertexMap[item.getQualifiedID()] = newSurface;

                            switch (item.type) {
                                case "2DCHART":
                                case "PIE":
                                case "BUBBLE":
                                case "BAR":
                                case "WORD_CLOUD":
                                    newSurface.menu(item.widget._2dChartTypes.concat(item.widget._anyChartTypes).map(function (item) { return item.display; }).sort());
                                    newSurface._menu.click = function (d) {
                                        item.widget
                                            .chartType(d)
                                            .render()
                                        ;
                                    };
                                    break;
                                case "LINE":
                                    newSurface.menu(item.widget._multiChartTypes.concat(item.widget._anyChartTypes).map(function (item) { return item.display; }).sort());
                                    newSurface._menu.click = function (d) {
                                        item.widget
                                            .chartType(d)
                                            .render()
                                        ;
                                    };
                                    break;
                                case "CHORO":
                                    newSurface._menu
                                        .data(Palette.rainbow())
                                    ;
                                    newSurface._menu.click = function (d) {
                                        newSurface._content
                                            .paletteID(d)
                                            .render(d)
                                        ;
                                    };
                                    break;
                                case "GRAPH":
                                    newSurface._menu
                                        .data(["Circle", "ForceDirected", "ForceDirected2", "Hierarchy"])
                                    ;
                                    newSurface._menu.click = function (d) {
                                        newSurface._content
                                            .layout(d)
                                        ;
                                    };
                                    break;
                            }
                        }
                    }
                }
            }
        });

        function addEdge(curr, sourceID, targetID, sourceMarker, targetMarker, text) {
            sourceMarker = sourceMarker || "";
            targetMarker = targetMarker || "";
            text = text || "";
            if (sourceID && targetID && curr.vertexMap[sourceID] && curr.vertexMap[targetID]) {
                curr.edges.push(new Edge()
                    .sourceVertex(curr.vertexMap[sourceID])
                    .targetVertex(curr.vertexMap[targetID])
                    .sourceMarker(sourceMarker)
                    .targetMarker(targetMarker)
                    .text(text)
                );
            } else {
                if (!curr.vertexMap[sourceID]) {
                    console.log("Unknown Vertex:  " + sourceID);
                }
                if (!curr.vertexMap[targetID]) {
                    console.log("Unknown Vertex:  " + targetID);
                }
            }
        }

        curr = null;
        marshaller.accept({
            _visualizeRoxie: visualizeRoxie,
            visit: function (item) {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = dashboards[item.getQualifiedID()];
                } else if (item instanceof HipieDDL.DataSource) {
                } else if (item instanceof HipieDDL.Output) {
                    if (this._visualizeRoxie) {
                        addEdge(curr, item.dataSource.getQualifiedID(), item.getQualifiedID(), "circleFoot", "circleHead");
                    }
                } else if (item instanceof HipieDDL.Visualization) {
                    if (this._visualizeRoxie) {
                        if (item.source.getDatasource()) {
                            addEdge(curr, item.getQualifiedID(), item.source.getDatasource().getQualifiedID(), "", "arrowHead", "update");
                        }
                        if (item.source.getOutput()) {
                            addEdge(curr, item.source.getOutput().getQualifiedID(), item.getQualifiedID(), "", "arrowHead", "notify");
                        }
                    }

                    item.events.getUpdates().forEach(function (updates) {
                        addEdge(curr, item.getQualifiedID(), updates.visualization.getQualifiedID(), undefined, "arrowHead", "on " + updates.eventID);
                    });
                }
            }
        });
        return dashboards;
    }

    var PERSIST_VER = 2;
    function Graph() {
        GraphWidget.call(this);

        this._design_mode = false;
        this._dashboards = [];
        this.graphAttributes = ["snapToGrid", "showEdges"];
        this.widgetAttributes = ["layout", "chartType", "palette", "title", "columns", "data"];
    }
    Graph.prototype = Object.create(GraphWidget.prototype);
    Graph.prototype._class += " marshaller_Graph";

    Graph.prototype.publish("ddlUrl", "", "string", "DDL URL",null,{tags:['Private']});
    Graph.prototype.publish("databomb", "", "string", "Data Bomb",null,{tags:['Private']});
    Graph.prototype.publish("visualizeRoxie", false, "boolean", "Show Roxie Data Sources",null,{tags:['Private']});
    Graph.prototype.publish("proxyMappings", [], "array", "Proxy Mappings",null,{tags:['Private']});

    Graph.prototype.testData = function () {
        //this.ddlUrl("http://10.173.147.1:8002/WsEcl/submit/query/roxie/drealeed_testaddressclean.ins002_service/json");
        //this.ddlUrl("http://10.241.100.157:8002/WsEcl/submit/query/roxie/hipie_testrelavator2.ins002_service/json");
        this.ddlUrl('[ { "visualizations": [ { "color": "Red_Yellow_Blue", "id": "statesummary", "source": { "output": "View_statesummary", "mappings": { "weight": "Cnt", "state": "clean_st" }, "id": "statesum" }, "type": "CHORO", "title": "Count by State", "events": { "click": { "mappings": { "clean_st": "clean_st" }, "updates": [ { "visualization": "statedetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, "onSelect": { "mappings": { "clean_st": "clean_st" }, "updates": [ { "visualization": "statedetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, { "id": "statedetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_statedetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "State Error Details" }, { "color": "Red_Yellow_Blue", "id": "errorsummary", "source": { "output": "View_errorsummary", "mappings": { "weight": "Cnt", "label": "clean_error" }, "id": "errorsum" }, "type": "PIE", "title": "Count by error--aggregated client side", "events": { "click": { "mappings": { "clean_error": "clean_error" }, "updates": [ { "visualization": "errordetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, "onSelect": { "mappings": { "clean_error": "clean_error" }, "updates": [ { "visualization": "errordetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, { "id": "errordetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_errordetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "Error Code Details" }, { "id": "alldetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_alldetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "Details updated from both count by state and count by error" } ], "datasources": [ { "outputs": [ { "from": "View_statesummary", "id": "View_statesummary", "notify": [ "statesummary" ] } ], "databomb": true, "id": "statesum" }, { "outputs": [ { "from": "View_errorsummary", "id": "View_errorsummary", "notify": [ "errorsummary" ] } ], "databomb": true, "id": "errorsum" }, { "filter": [ "clean_st", "clean_error" ], "outputs": [ { "from": "View_statedetails", "id": "View_statedetails", "notify": [ "statedetails" ] }, { "from": "View_errordetails", "id": "View_errordetails", "notify": [ "errordetails" ] }, { "from": "View_alldetails", "id": "View_alldetails", "notify": [ "alldetails" ] } ], "databomb": true, "id": "details" } ], "enable": "true", "id": "Ins001_DatabombDashboard", "label": "DatabombDashboard", "title": "Databomb Dashboard", "primary": false } ]');
        this.databomb('{"errorsum":[{"clean_error":"E212","Cnt":"1"},{"clean_error":"E214","Cnt":"3"},{"clean_error":"E216","Cnt":"1"},{"clean_error":"E412","Cnt":"204"},{"clean_error":"E421","Cnt":"174"},{"clean_error":"E422","Cnt":"43"},{"clean_error":"E423","Cnt":"6"},{"clean_error":"E427","Cnt":"24"},{"clean_error":"E430","Cnt":"1"},{"clean_error":"E505","Cnt":"2"},{"clean_error":"E600","Cnt":"7"},{"clean_error":"S400","Cnt":"3"},{"clean_error":"S800","Cnt":"19370"},{"clean_error":"S810","Cnt":"10"},{"clean_error":"S820","Cnt":"49"},{"clean_error":"S840","Cnt":"2"},{"clean_error":"S860","Cnt":"3"},{"clean_error":"S880","Cnt":"26"},{"clean_error":"S890","Cnt":"9"},{"clean_error":"S891","Cnt":"1"},{"clean_error":"S8A0","Cnt":"3"},{"clean_error":"S8B0","Cnt":"2"},{"clean_error":"S8C0","Cnt":"2"},{"clean_error":"S900","Cnt":"22"},{"clean_error":"S910","Cnt":"4"},{"clean_error":"S920","Cnt":"2"},{"clean_error":"S980","Cnt":"1"},{"clean_error":"SA00","Cnt":"21"},{"clean_error":"SB00","Cnt":"3"},{"clean_error":"SC10","Cnt":"1"}],"statesum":[{"clean_st":"AK","Cnt":"57"},{"clean_st":"AL","Cnt":"225"},{"clean_st":"AR","Cnt":"140"},{"clean_st":"AZ","Cnt":"342"},{"clean_st":"CA","Cnt":"2695"},{"clean_st":"CO","Cnt":"459"},{"clean_st":"CT","Cnt":"246"},{"clean_st":"DC","Cnt":"91"},{"clean_st":"DE","Cnt":"33"},{"clean_st":"FL","Cnt":"1924"},{"clean_st":"GA","Cnt":"683"},{"clean_st":"GU","Cnt":"1"},{"clean_st":"HI","Cnt":"54"},{"clean_st":"IA","Cnt":"163"},{"clean_st":"ID","Cnt":"139"},{"clean_st":"IL","Cnt":"718"},{"clean_st":"IN","Cnt":"318"},{"clean_st":"KS","Cnt":"155"},{"clean_st":"KY","Cnt":"211"},{"clean_st":"LA","Cnt":"279"},{"clean_st":"MA","Cnt":"450"},{"clean_st":"MD","Cnt":"459"},{"clean_st":"ME","Cnt":"57"},{"clean_st":"MI","Cnt":"554"},{"clean_st":"MN","Cnt":"419"},{"clean_st":"MO","Cnt":"297"},{"clean_st":"MS","Cnt":"201"},{"clean_st":"MT","Cnt":"73"},{"clean_st":"NC","Cnt":"433"},{"clean_st":"ND","Cnt":"35"},{"clean_st":"NE","Cnt":"108"},{"clean_st":"NH","Cnt":"97"},{"clean_st":"NJ","Cnt":"505"},{"clean_st":"NM","Cnt":"92"},{"clean_st":"NV","Cnt":"142"},{"clean_st":"NY","Cnt":"1237"},{"clean_st":"OH","Cnt":"652"},{"clean_st":"OK","Cnt":"190"},{"clean_st":"OR","Cnt":"316"},{"clean_st":"PA","Cnt":"678"},{"clean_st":"PR","Cnt":"9"},{"clean_st":"RI","Cnt":"77"},{"clean_st":"SC","Cnt":"209"},{"clean_st":"SD","Cnt":"46"},{"clean_st":"TN","Cnt":"378"},{"clean_st":"TX","Cnt":"1794"},{"clean_st":"UT","Cnt":"189"},{"clean_st":"VA","Cnt":"473"},{"clean_st":"VI","Cnt":"3"},{"clean_st":"VT","Cnt":"43"},{"clean_st":"WA","Cnt":"456"},{"clean_st":"WI","Cnt":"302"},{"clean_st":"WV","Cnt":"61"},{"clean_st":"WY","Cnt":"29"}],"details":[{"clean_st":"LA","clean_error":"S900","Cnt":"1"},{"clean_st":"WA","clean_error":"E422","Cnt":"3"},{"clean_st":"SC","clean_error":"S800","Cnt":"203"},{"clean_st":"NM","clean_error":"E427","Cnt":"3"},{"clean_st":"WY","clean_error":"S820","Cnt":"1"},{"clean_st":"KS","clean_error":"SC10","Cnt":"1"},{"clean_st":"WA","clean_error":"E423","Cnt":"1"},{"clean_st":"PR","clean_error":"S800","Cnt":"8"},{"clean_st":"NE","clean_error":"E412","Cnt":"2"},{"clean_st":"NH","clean_error":"S800","Cnt":"93"},{"clean_st":"OR","clean_error":"S840","Cnt":"1"},{"clean_st":"TX","clean_error":"E421","Cnt":"13"},{"clean_st":"NH","clean_error":"E412","Cnt":"1"},{"clean_st":"FL","clean_error":"SA00","Cnt":"4"},{"clean_st":"GA","clean_error":"E427","Cnt":"2"},{"clean_st":"AZ","clean_error":"S900","Cnt":"2"},{"clean_st":"SD","clean_error":"E412","Cnt":"1"},{"clean_st":"NC","clean_error":"E421","Cnt":"2"},{"clean_st":"MO","clean_error":"S880","Cnt":"1"},{"clean_st":"MI","clean_error":"SB00","Cnt":"1"},{"clean_st":"IL","clean_error":"S920","Cnt":"1"},{"clean_st":"WI","clean_error":"E421","Cnt":"7"},{"clean_st":"LA","clean_error":"S800","Cnt":"270"},{"clean_st":"GA","clean_error":"E412","Cnt":"8"},{"clean_st":"CA","clean_error":"E421","Cnt":"20"},{"clean_st":"KY","clean_error":"E421","Cnt":"1"},{"clean_st":"MI","clean_error":"E412","Cnt":"3"},{"clean_st":"MO","clean_error":"S800","Cnt":"285"},{"clean_st":"WI","clean_error":"E422","Cnt":"2"},{"clean_st":"PA","clean_error":"SA00","Cnt":"1"},{"clean_st":"CA","clean_error":"E422","Cnt":"2"},{"clean_st":"FL","clean_error":"E422","Cnt":"5"},{"clean_st":"WI","clean_error":"S800","Cnt":"262"},{"clean_st":"CO","clean_error":"S820","Cnt":"1"},{"clean_st":"NY","clean_error":"S900","Cnt":"1"},{"clean_st":"TX","clean_error":"SA00","Cnt":"6"},{"clean_st":"WA","clean_error":"E412","Cnt":"1"},{"clean_st":"CA","clean_error":"E423","Cnt":"1"},{"clean_st":"CO","clean_error":"S900","Cnt":"2"},{"clean_st":"NC","clean_error":"E422","Cnt":"3"},{"clean_st":"","clean_error":"E214","Cnt":"2"},{"clean_st":"RI","clean_error":"S800","Cnt":"77"},{"clean_st":"MN","clean_error":"S840","Cnt":"1"},{"clean_st":"TN","clean_error":"E422","Cnt":"2"},{"clean_st":"TX","clean_error":"E505","Cnt":"1"},{"clean_st":"FL","clean_error":"E600","Cnt":"1"},{"clean_st":"MO","clean_error":"S820","Cnt":"1"},{"clean_st":"WV","clean_error":"S810","Cnt":"1"},{"clean_st":"MN","clean_error":"E412","Cnt":"5"},{"clean_st":"ND","clean_error":"S800","Cnt":"29"},{"clean_st":"WI","clean_error":"S820","Cnt":"29"},{"clean_st":"TN","clean_error":"E423","Cnt":"1"},{"clean_st":"IA","clean_error":"E412","Cnt":"5"},{"clean_st":"NE","clean_error":"S800","Cnt":"105"},{"clean_st":"GA","clean_error":"S8A0","Cnt":"1"},{"clean_st":"CA","clean_error":"S900","Cnt":"1"},{"clean_st":"FL","clean_error":"E421","Cnt":"12"},{"clean_st":"AK","clean_error":"E412","Cnt":"1"},{"clean_st":"","clean_error":"E212","Cnt":"1"},{"clean_st":"TX","clean_error":"E427","Cnt":"1"},{"clean_st":"CO","clean_error":"S880","Cnt":"1"},{"clean_st":"FL","clean_error":"S800","Cnt":"1885"},{"clean_st":"WV","clean_error":"E412","Cnt":"3"},{"clean_st":"NV","clean_error":"S800","Cnt":"138"},{"clean_st":"WI","clean_error":"S900","Cnt":"1"},{"clean_st":"NY","clean_error":"S910","Cnt":"1"},{"clean_st":"TX","clean_error":"E412","Cnt":"14"},{"clean_st":"TN","clean_error":"E421","Cnt":"5"},{"clean_st":"AL","clean_error":"S800","Cnt":"219"},{"clean_st":"NC","clean_error":"S800","Cnt":"422"},{"clean_st":"OH","clean_error":"S880","Cnt":"1"},{"clean_st":"ND","clean_error":"E421","Cnt":"1"},{"clean_st":"FL","clean_error":"E427","Cnt":"3"},{"clean_st":"DE","clean_error":"S800","Cnt":"32"},{"clean_st":"AR","clean_error":"E421","Cnt":"3"},{"clean_st":"MN","clean_error":"E421","Cnt":"5"},{"clean_st":"PA","clean_error":"S810","Cnt":"1"},{"clean_st":"ID","clean_error":"E412","Cnt":"6"},{"clean_st":"AK","clean_error":"S800","Cnt":"55"},{"clean_st":"NM","clean_error":"E412","Cnt":"5"},{"clean_st":"OR","clean_error":"E423","Cnt":"1"},{"clean_st":"MS","clean_error":"S800","Cnt":"192"},{"clean_st":"CO","clean_error":"E422","Cnt":"1"},{"clean_st":"AZ","clean_error":"S800","Cnt":"329"},{"clean_st":"ID","clean_error":"S820","Cnt":"4"},{"clean_st":"WY","clean_error":"S810","Cnt":"1"},{"clean_st":"ND","clean_error":"E427","Cnt":"2"},{"clean_st":"PR","clean_error":"E412","Cnt":"1"},{"clean_st":"NY","clean_error":"SB00","Cnt":"1"},{"clean_st":"KS","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"S800","Cnt":"541"},{"clean_st":"MA","clean_error":"S880","Cnt":"1"},{"clean_st":"WV","clean_error":"S900","Cnt":"1"},{"clean_st":"AZ","clean_error":"E421","Cnt":"7"},{"clean_st":"OK","clean_error":"S820","Cnt":"1"},{"clean_st":"LA","clean_error":"E412","Cnt":"3"},{"clean_st":"OR","clean_error":"E421","Cnt":"2"},{"clean_st":"NE","clean_error":"E422","Cnt":"1"},{"clean_st":"MN","clean_error":"E422","Cnt":"1"},{"clean_st":"AR","clean_error":"E422","Cnt":"1"},{"clean_st":"PA","clean_error":"E505","Cnt":"1"},{"clean_st":"MD","clean_error":"S880","Cnt":"2"},{"clean_st":"SC","clean_error":"E421","Cnt":"1"},{"clean_st":"LA","clean_error":"S910","Cnt":"1"},{"clean_st":"UT","clean_error":"SB00","Cnt":"1"},{"clean_st":"CO","clean_error":"E421","Cnt":"3"},{"clean_st":"HI","clean_error":"E421","Cnt":"1"},{"clean_st":"DE","clean_error":"E412","Cnt":"1"},{"clean_st":"ME","clean_error":"S800","Cnt":"54"},{"clean_st":"NY","clean_error":"E412","Cnt":"10"},{"clean_st":"KY","clean_error":"S800","Cnt":"209"},{"clean_st":"OK","clean_error":"S800","Cnt":"180"},{"clean_st":"IN","clean_error":"E412","Cnt":"4"},{"clean_st":"KS","clean_error":"E421","Cnt":"1"},{"clean_st":"GA","clean_error":"S900","Cnt":"1"},{"clean_st":"AZ","clean_error":"E422","Cnt":"4"},{"clean_st":"SC","clean_error":"E427","Cnt":"2"},{"clean_st":"LA","clean_error":"E421","Cnt":"2"},{"clean_st":"OR","clean_error":"E412","Cnt":"1"},{"clean_st":"CT","clean_error":"E412","Cnt":"6"},{"clean_st":"WA","clean_error":"S800","Cnt":"445"},{"clean_st":"MN","clean_error":"E427","Cnt":"5"},{"clean_st":"FL","clean_error":"E412","Cnt":"7"},{"clean_st":"CA","clean_error":"SA00","Cnt":"1"},{"clean_st":"MT","clean_error":"E412","Cnt":"2"},{"clean_st":"AL","clean_error":"SA00","Cnt":"1"},{"clean_st":"IN","clean_error":"E421","Cnt":"1"},{"clean_st":"CA","clean_error":"S880","Cnt":"4"},{"clean_st":"GU","clean_error":"S800","Cnt":"1"},{"clean_st":"UT","clean_error":"S900","Cnt":"2"},{"clean_st":"CT","clean_error":"S890","Cnt":"1"},{"clean_st":"AK","clean_error":"S900","Cnt":"1"},{"clean_st":"OK","clean_error":"S810","Cnt":"2"},{"clean_st":"ND","clean_error":"E412","Cnt":"2"},{"clean_st":"NJ","clean_error":"E421","Cnt":"2"},{"clean_st":"NM","clean_error":"S800","Cnt":"84"},{"clean_st":"UT","clean_error":"S820","Cnt":"5"},{"clean_st":"VA","clean_error":"S8B0","Cnt":"1"},{"clean_st":"CA","clean_error":"S910","Cnt":"1"},{"clean_st":"VA","clean_error":"E412","Cnt":"3"},{"clean_st":"NJ","clean_error":"E422","Cnt":"1"},{"clean_st":"IN","clean_error":"E422","Cnt":"1"},{"clean_st":"TX","clean_error":"S900","Cnt":"1"},{"clean_st":"WY","clean_error":"E412","Cnt":"4"},{"clean_st":"WV","clean_error":"S800","Cnt":"54"},{"clean_st":"MI","clean_error":"S900","Cnt":"2"},{"clean_st":"NV","clean_error":"E412","Cnt":"3"},{"clean_st":"NY","clean_error":"E427","Cnt":"1"},{"clean_st":"IL","clean_error":"S900","Cnt":"1"},{"clean_st":"IL","clean_error":"E412","Cnt":"13"},{"clean_st":"NJ","clean_error":"SA00","Cnt":"1"},{"clean_st":"WA","clean_error":"S8A0","Cnt":"1"},{"clean_st":"CA","clean_error":"S8C0","Cnt":"1"},{"clean_st":"CO","clean_error":"E412","Cnt":"7"},{"clean_st":"DC","clean_error":"E412","Cnt":"1"},{"clean_st":"GA","clean_error":"S800","Cnt":"660"},{"clean_st":"IA","clean_error":"S800","Cnt":"151"},{"clean_st":"WY","clean_error":"S800","Cnt":"23"},{"clean_st":"TN","clean_error":"E600","Cnt":"1"},{"clean_st":"MD","clean_error":"S800","Cnt":"445"},{"clean_st":"PA","clean_error":"E600","Cnt":"1"},{"clean_st":"NY","clean_error":"S8B0","Cnt":"1"},{"clean_st":"NJ","clean_error":"E427","Cnt":"1"},{"clean_st":"TX","clean_error":"S800","Cnt":"1751"},{"clean_st":"CT","clean_error":"E423","Cnt":"1"},{"clean_st":"OH","clean_error":"E412","Cnt":"5"},{"clean_st":"KS","clean_error":"S820","Cnt":"1"},{"clean_st":"NY","clean_error":"E600","Cnt":"1"},{"clean_st":"NJ","clean_error":"E412","Cnt":"5"},{"clean_st":"NY","clean_error":"E422","Cnt":"1"},{"clean_st":"OK","clean_error":"E412","Cnt":"2"},{"clean_st":"MA","clean_error":"E421","Cnt":"1"},{"clean_st":"AR","clean_error":"S820","Cnt":"1"},{"clean_st":"PA","clean_error":"S820","Cnt":"2"},{"clean_st":"MA","clean_error":"S910","Cnt":"1"},{"clean_st":"NY","clean_error":"E421","Cnt":"8"},{"clean_st":"UT","clean_error":"E412","Cnt":"9"},{"clean_st":"NY","clean_error":"S890","Cnt":"2"},{"clean_st":"CO","clean_error":"S800","Cnt":"443"},{"clean_st":"MN","clean_error":"S800","Cnt":"401"},{"clean_st":"FL","clean_error":"E214","Cnt":"1"},{"clean_st":"UT","clean_error":"S880","Cnt":"1"},{"clean_st":"OH","clean_error":"E421","Cnt":"7"},{"clean_st":"IN","clean_error":"S810","Cnt":"1"},{"clean_st":"CA","clean_error":"S800","Cnt":"2645"},{"clean_st":"OR","clean_error":"S800","Cnt":"311"},{"clean_st":"WA","clean_error":"S810","Cnt":"1"},{"clean_st":"FL","clean_error":"E216","Cnt":"1"},{"clean_st":"VT","clean_error":"E430","Cnt":"1"},{"clean_st":"NY","clean_error":"S800","Cnt":"1206"},{"clean_st":"IL","clean_error":"S800","Cnt":"696"},{"clean_st":"MS","clean_error":"E412","Cnt":"4"},{"clean_st":"NV","clean_error":"E422","Cnt":"1"},{"clean_st":"NC","clean_error":"SA00","Cnt":"1"},{"clean_st":"MA","clean_error":"S800","Cnt":"441"},{"clean_st":"MI","clean_error":"S880","Cnt":"1"},{"clean_st":"GA","clean_error":"E600","Cnt":"2"},{"clean_st":"TX","clean_error":"S891","Cnt":"1"},{"clean_st":"OH","clean_error":"E422","Cnt":"1"},{"clean_st":"IA","clean_error":"S8C0","Cnt":"1"},{"clean_st":"KS","clean_error":"S810","Cnt":"1"},{"clean_st":"CA","clean_error":"S890","Cnt":"3"},{"clean_st":"WI","clean_error":"S880","Cnt":"1"},{"clean_st":"VT","clean_error":"S800","Cnt":"37"},{"clean_st":"FL","clean_error":"S820","Cnt":"1"},{"clean_st":"VA","clean_error":"E421","Cnt":"4"},{"clean_st":"VA","clean_error":"S890","Cnt":"2"},{"clean_st":"PA","clean_error":"S900","Cnt":"1"},{"clean_st":"ME","clean_error":"E412","Cnt":"3"},{"clean_st":"MO","clean_error":"E421","Cnt":"4"},{"clean_st":"IL","clean_error":"E422","Cnt":"2"},{"clean_st":"CT","clean_error":"S800","Cnt":"238"},{"clean_st":"UT","clean_error":"E427","Cnt":"1"},{"clean_st":"MI","clean_error":"E422","Cnt":"1"},{"clean_st":"ND","clean_error":"S880","Cnt":"1"},{"clean_st":"TN","clean_error":"S800","Cnt":"369"},{"clean_st":"IL","clean_error":"E421","Cnt":"3"},{"clean_st":"MO","clean_error":"E422","Cnt":"3"},{"clean_st":"MT","clean_error":"E421","Cnt":"1"},{"clean_st":"VI","clean_error":"E421","Cnt":"2"},{"clean_st":"ID","clean_error":"S800","Cnt":"126"},{"clean_st":"MA","clean_error":"E412","Cnt":"6"},{"clean_st":"MS","clean_error":"S900","Cnt":"1"},{"clean_st":"VA","clean_error":"S800","Cnt":"461"},{"clean_st":"LA","clean_error":"S880","Cnt":"2"},{"clean_st":"SD","clean_error":"S800","Cnt":"43"},{"clean_st":"VT","clean_error":"E412","Cnt":"3"},{"clean_st":"FL","clean_error":"S880","Cnt":"2"},{"clean_st":"NC","clean_error":"S980","Cnt":"1"},{"clean_st":"TX","clean_error":"E600","Cnt":"1"},{"clean_st":"MD","clean_error":"SA00","Cnt":"1"},{"clean_st":"AL","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"E421","Cnt":"4"},{"clean_st":"HI","clean_error":"S800","Cnt":"53"},{"clean_st":"IA","clean_error":"S920","Cnt":"1"},{"clean_st":"VI","clean_error":"E412","Cnt":"1"},{"clean_st":"OH","clean_error":"SA00","Cnt":"1"},{"clean_st":"AL","clean_error":"E421","Cnt":"2"},{"clean_st":"MD","clean_error":"E421","Cnt":"5"},{"clean_st":"PA","clean_error":"E412","Cnt":"11"},{"clean_st":"IA","clean_error":"E427","Cnt":"1"},{"clean_st":"FL","clean_error":"S900","Cnt":"2"},{"clean_st":"MS","clean_error":"E421","Cnt":"4"},{"clean_st":"UT","clean_error":"E422","Cnt":"3"},{"clean_st":"NH","clean_error":"E421","Cnt":"3"},{"clean_st":"AL","clean_error":"E427","Cnt":"2"},{"clean_st":"UT","clean_error":"E421","Cnt":"2"},{"clean_st":"VA","clean_error":"SA00","Cnt":"2"},{"clean_st":"SD","clean_error":"E421","Cnt":"2"},{"clean_st":"AR","clean_error":"S900","Cnt":"1"},{"clean_st":"OK","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"S820","Cnt":"1"},{"clean_st":"KY","clean_error":"E412","Cnt":"1"},{"clean_st":"NY","clean_error":"S880","Cnt":"2"},{"clean_st":"MO","clean_error":"E412","Cnt":"3"},{"clean_st":"WV","clean_error":"E422","Cnt":"1"},{"clean_st":"MT","clean_error":"S860","Cnt":"1"},{"clean_st":"OK","clean_error":"E423","Cnt":"1"},{"clean_st":"CA","clean_error":"E412","Cnt":"16"},{"clean_st":"MD","clean_error":"E412","Cnt":"6"},{"clean_st":"NJ","clean_error":"S800","Cnt":"495"},{"clean_st":"NC","clean_error":"E412","Cnt":"4"},{"clean_st":"TX","clean_error":"S860","Cnt":"2"},{"clean_st":"PA","clean_error":"E421","Cnt":"11"},{"clean_st":"IA","clean_error":"E422","Cnt":"1"},{"clean_st":"NY","clean_error":"SA00","Cnt":"2"},{"clean_st":"IL","clean_error":"S8A0","Cnt":"1"},{"clean_st":"GA","clean_error":"S880","Cnt":"1"},{"clean_st":"WV","clean_error":"E421","Cnt":"1"},{"clean_st":"IL","clean_error":"S810","Cnt":"1"},{"clean_st":"IA","clean_error":"S880","Cnt":"2"},{"clean_st":"MT","clean_error":"S800","Cnt":"69"},{"clean_st":"VT","clean_error":"E421","Cnt":"2"},{"clean_st":"SC","clean_error":"E412","Cnt":"2"},{"clean_st":"IN","clean_error":"S800","Cnt":"311"},{"clean_st":"UT","clean_error":"S800","Cnt":"165"},{"clean_st":"GA","clean_error":"E421","Cnt":"8"},{"clean_st":"CO","clean_error":"S890","Cnt":"1"},{"clean_st":"OK","clean_error":"E421","Cnt":"3"},{"clean_st":"ID","clean_error":"E421","Cnt":"3"},{"clean_st":"KS","clean_error":"S800","Cnt":"150"},{"clean_st":"SC","clean_error":"S820","Cnt":"1"},{"clean_st":"TX","clean_error":"S880","Cnt":"3"},{"clean_st":"MN","clean_error":"S810","Cnt":"1"},{"clean_st":"OH","clean_error":"S800","Cnt":"637"},{"clean_st":"AR","clean_error":"S800","Cnt":"134"},{"clean_st":"PA","clean_error":"S800","Cnt":"647"},{"clean_st":"IA","clean_error":"E421","Cnt":"1"},{"clean_st":"PA","clean_error":"E422","Cnt":"2"},{"clean_st":"WA","clean_error":"E421","Cnt":"4"},{"clean_st":"DC","clean_error":"S800","Cnt":"90"}]}');
        return this;
    };

    Graph.prototype.design_mode = function (_) {
        if (!arguments.length) return this._design_mode;
        this._design_mode = _;
        this
            .showEdges(this._designMode)
            .snapToGrid(this._designMode ? 12 : 0)
            .allowDragging(this._designMode)
        ;
        if (this._data.vertices) {
            this._data.vertices.forEach(function (row) {
                row.show_title(this._design_mode)
                    .render()
                ;
            }, this);
        }
        return this;
    };

    Graph.prototype.dashboards = function (_) {
        if (!arguments.length) return this._dashboards;
        this._dashboards = _;
        return this;
    };

    Graph.prototype.title = function () {
        var retVal = "";
        this._dashboards.forEach(function (item) {
            if (retVal) {
                retVal += ", ";
            }
            retVal += item.dashboard.title;
        });
        return retVal;
    };

    Graph.prototype.renderDashboards = function (restorePersist) {
        this.data({ vertices: [], edges: []});
        var vertices = [];
        var edges = [];
        for (var key in this._dashboards) {
            for (var vm_key in this._dashboards[key].vertexMap) {
                vertices.push(this._dashboards[key].vertexMap[vm_key]);
            }
            edges = edges.concat(this._dashboards[key].edges);
        }
        this.data({ vertices: vertices, edges: edges });
        var loadResult = restorePersist ? this.load() : { changed: false, dataChanged: false };
        if (loadResult.changed) {
            this.layout("");
        }
        if (!loadResult.dataChanged) {
            this.fetchData();
        }
        return this;
    };

    Graph.prototype.fetchData = function () {
        for (var dashKey in this._dashboards) {
            var dashboard = this._dashboards[dashKey].dashboard;
            for (var key in dashboard.datasources) {
                dashboard.datasources[key].fetchData({}, true);
            }
        }
        return this;
    };

    Graph.prototype.checksum = function (s) {
        var hash = 0,
        strlen = s.length,
        i,
        c;
        if ( strlen === 0 ) {
            return hash;
        }
        for ( i = 0; i < strlen; i++ ) {
            c = s.charCodeAt( i );
            hash = ((hash << 5) - hash) + c;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    Graph.prototype.calcHash = function () {
        var context = this;
        var hash = PERSIST_VER;
        for (var key in this._dashboards) {
            var currDashboard = this._dashboards[key].dashboard;
            currDashboard.accept({
                visit: function (item) {
                    if (item instanceof HipieDDL.Visualization) {
                        hash += context.checksum(item.getQualifiedID());
                    }
                }
            });
        }
        return hash;
    };

    Graph.prototype.clear = function () {
        localStorage.setItem("Graph_" + this.calcHash(), "");
    };

    Graph.prototype.serialize = function (graphAttributes, widgetAttributes) {
        graphAttributes = graphAttributes || [];
        widgetAttributes = widgetAttributes || [];

        var state = {};
        state["zoom"] = {
            translation: this.zoom.translate(),
            scale: this.zoom.scale()
        };
        graphAttributes.forEach(function (attr) {
            if (this[attr]) {
                state[attr] = this[attr]();
            }
        }, this);
        for (var key in this._dashboards) {
            var currDashboard = this._dashboards[key].dashboard;
            var currDashboardID = currDashboard.getQualifiedID();
            state[currDashboardID] = {};
            currDashboard.accept({
                visit: function (item) {
                    if (item instanceof HipieDDL.Visualization) {
                        if (item.widgetSurface) {
                            var vizState = {
                                pos: item.widgetSurface.pos(),
                                size: item.widgetSurface.size()
                            };
                            widgetAttributes.forEach(function (attr) {
                                if (item.widget[attr]) {
                                    vizState[attr] = item.widget[attr]();
                                } else if (item.widgetSurface[attr]) {
                                    vizState[attr] = item.widgetSurface[attr]();
                                }
                            });
                            state[currDashboardID][item.getQualifiedID()] = vizState;
                        }
                    }
                }
            });
        }
        return JSON.stringify(state);
    };

    Graph.prototype.save = function () {
        localStorage.setItem("Graph_" + this.calcHash(), this.serialize(this.graphAttributes, this.widgetAttributes));
    };

    Graph.prototype.deserialize = function (state, graphAttributes, widgetAttributes) {
        graphAttributes = graphAttributes || [];
        widgetAttributes = widgetAttributes || [];

        var changed = false;
        var dataChanged = false;

        graphAttributes.forEach(function (attr) {
            if (this[attr] && state[attr] !== undefined) {
                this[attr](state[attr]);
            }
        }, this);
        if (state.zoom) {
            this.setZoom(state.zoom.translation, state.zoom.scale);
            changed = true;
        }

        for (var key in this._dashboards) {
            var currDashboard = this._dashboards[key].dashboard;
            var currDashboardID = currDashboard.getQualifiedID();
            currDashboard.accept({
                visit: function (item) {
                    if (item instanceof HipieDDL.Visualization && state[currDashboardID] && state[currDashboardID][item.getQualifiedID()]) {
                        var vizState = state[currDashboardID][item.getQualifiedID()];
                        item.widgetSurface
                            .pos(vizState.pos)
                            .size(vizState.size)
                        ;
                        changed = true;
                        widgetAttributes.forEach(function (attr) {
                            if (item.widget[attr] && vizState[attr] !== undefined) {
                                item.widget[attr](vizState[attr]);
                                if (attr === "data") {
                                    dataChanged = true;
                                }
                            } else if (item.widgetSurface[attr] && vizState[attr]) {
                                item.widgetSurface[attr](vizState[attr]);
                            }
                        });
                    }
                }
            });
        }
        return { changed: changed, dataChanged: dataChanged };
    };

    Graph.prototype.load = function () {
        var retVal = { changed: false, dataChanged: false };
        var stateJSON = localStorage.getItem("Graph_" + this.calcHash());
        if (stateJSON) {
            retVal = this.deserialize(JSON.parse(stateJSON), this.graphAttributes, this.widgetAttributes);
        }
        return retVal;
    };

    Graph.prototype.enter = function (domNode, element) {
        GraphWidget.prototype.enter.apply(this, arguments);
        element.classed("graph_Graph", true);
    };

    Graph.prototype.update = function (domNode, element) {
        GraphWidget.prototype.update.apply(this, arguments);
    };

    Graph.prototype.render = function (callback) {
        if (this.ddlUrl() === "" || (this.ddlUrl() === this._prev_ddlUrl && this.databomb() === this._prev_databomb && this._prev_visualizeRoxie === this.visualizeRoxie())) {
            return GraphWidget.prototype.render.apply(this, arguments);
        }
        this._prev_ddlUrl = this.ddlUrl();
        this._prev_databomb = this.databomb();
        this._prev_visualizeRoxie = this.visualizeRoxie();

        var marshaller = new HipieDDL.Marshaller().proxyMappings(this.proxyMappings());
        var context = this;
        if (this.ddlUrl()[0] === "[" || this.ddlUrl()[0] === "{") {
            marshaller.parse(this.ddlUrl(), function () {
                postParse();
            });
        } else {
            marshaller.url(this.ddlUrl(), function () {
                postParse();
            });
        }
        function postParse() {
            var dashboards = createGraphData(marshaller, context.databomb(), context.visualizeRoxie());
            context.dashboards(dashboards);
            context
                .applyScaleOnLayout(true)
                .layout("Hierarchy")
                .renderDashboards(true)
            ;
            GraphWidget.prototype.render.call(context, function (widget) {
                if (callback) {
                    callback(widget);
                }
            });
        }
        return this;
    };

    return Graph;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('marshaller/HTML.js',["d3", "../layout/Grid", "./HipieDDL", "../layout/Surface", "../layout/Cell"], factory);
    } else {
        root.marshaller_HTML = factory(root.d3, root.layout_Grid, root.marshaller_HipieDDL, root.layout_Surface, root.layout_Cell);
    }
}(this, function (d3, Grid, HipieDDL, Surface, Cell) {
    function HTML() {
        Grid.call(this);
    }
    HTML.prototype = Object.create(Grid.prototype);
    HTML.prototype._class += " marshaller_HTML";

    HTML.prototype.publish("ddlUrl", "", "string", "DDL URL",null,{tags:['Private']});
    HTML.prototype.publish("databomb", "", "string", "Data Bomb",null,{tags:['Private']});
    HTML.prototype.publish("proxyMappings", [], "array", "Proxy Mappings",null,{tags:['Private']});

    HTML.prototype.testData = function () {
        this.ddlUrl('[ { "visualizations": [ { "color": "Red_Yellow_Blue", "id": "statesummary", "source": { "output": "View_statesummary", "mappings": { "weight": "Cnt", "state": "clean_st" }, "id": "statesum" }, "type": "CHORO", "title": "Count by State", "events": { "click": { "mappings": { "clean_st": "clean_st" }, "updates": [ { "visualization": "statedetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, "onSelect": { "mappings": { "clean_st": "clean_st" }, "updates": [ { "visualization": "statedetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, { "id": "statedetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_statedetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "State Error Details" }, { "color": "Red_Yellow_Blue", "id": "errorsummary", "source": { "output": "View_errorsummary", "mappings": { "weight": "Cnt", "label": "clean_error" }, "id": "errorsum" }, "type": "PIE", "title": "Count by error--aggregated client side", "events": { "click": { "mappings": { "clean_error": "clean_error" }, "updates": [ { "visualization": "errordetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, "onSelect": { "mappings": { "clean_error": "clean_error" }, "updates": [ { "visualization": "errordetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, { "id": "errordetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_errordetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "Error Code Details" }, { "id": "alldetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_alldetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "Details updated from both count by state and count by error" } ], "datasources": [ { "outputs": [ { "from": "View_statesummary", "id": "View_statesummary", "notify": [ "statesummary" ] } ], "databomb": true, "id": "statesum" }, { "outputs": [ { "from": "View_errorsummary", "id": "View_errorsummary", "notify": [ "errorsummary" ] } ], "databomb": true, "id": "errorsum" }, { "filter": [ "clean_st", "clean_error" ], "outputs": [ { "from": "View_statedetails", "id": "View_statedetails", "notify": [ "statedetails" ] }, { "from": "View_errordetails", "id": "View_errordetails", "notify": [ "errordetails" ] }, { "from": "View_alldetails", "id": "View_alldetails", "notify": [ "alldetails" ] } ], "databomb": true, "id": "details" } ], "enable": "true", "id": "Ins001_DatabombDashboard", "label": "DatabombDashboard", "title": "Databomb Dashboard", "primary": false } ]');
        this.databomb('{"errorsum":[{"clean_error":"E212","Cnt":"1"},{"clean_error":"E214","Cnt":"3"},{"clean_error":"E216","Cnt":"1"},{"clean_error":"E412","Cnt":"204"},{"clean_error":"E421","Cnt":"174"},{"clean_error":"E422","Cnt":"43"},{"clean_error":"E423","Cnt":"6"},{"clean_error":"E427","Cnt":"24"},{"clean_error":"E430","Cnt":"1"},{"clean_error":"E505","Cnt":"2"},{"clean_error":"E600","Cnt":"7"},{"clean_error":"S400","Cnt":"3"},{"clean_error":"S800","Cnt":"19370"},{"clean_error":"S810","Cnt":"10"},{"clean_error":"S820","Cnt":"49"},{"clean_error":"S840","Cnt":"2"},{"clean_error":"S860","Cnt":"3"},{"clean_error":"S880","Cnt":"26"},{"clean_error":"S890","Cnt":"9"},{"clean_error":"S891","Cnt":"1"},{"clean_error":"S8A0","Cnt":"3"},{"clean_error":"S8B0","Cnt":"2"},{"clean_error":"S8C0","Cnt":"2"},{"clean_error":"S900","Cnt":"22"},{"clean_error":"S910","Cnt":"4"},{"clean_error":"S920","Cnt":"2"},{"clean_error":"S980","Cnt":"1"},{"clean_error":"SA00","Cnt":"21"},{"clean_error":"SB00","Cnt":"3"},{"clean_error":"SC10","Cnt":"1"}],"statesum":[{"clean_st":"AK","Cnt":"57"},{"clean_st":"AL","Cnt":"225"},{"clean_st":"AR","Cnt":"140"},{"clean_st":"AZ","Cnt":"342"},{"clean_st":"CA","Cnt":"2695"},{"clean_st":"CO","Cnt":"459"},{"clean_st":"CT","Cnt":"246"},{"clean_st":"DC","Cnt":"91"},{"clean_st":"DE","Cnt":"33"},{"clean_st":"FL","Cnt":"1924"},{"clean_st":"GA","Cnt":"683"},{"clean_st":"GU","Cnt":"1"},{"clean_st":"HI","Cnt":"54"},{"clean_st":"IA","Cnt":"163"},{"clean_st":"ID","Cnt":"139"},{"clean_st":"IL","Cnt":"718"},{"clean_st":"IN","Cnt":"318"},{"clean_st":"KS","Cnt":"155"},{"clean_st":"KY","Cnt":"211"},{"clean_st":"LA","Cnt":"279"},{"clean_st":"MA","Cnt":"450"},{"clean_st":"MD","Cnt":"459"},{"clean_st":"ME","Cnt":"57"},{"clean_st":"MI","Cnt":"554"},{"clean_st":"MN","Cnt":"419"},{"clean_st":"MO","Cnt":"297"},{"clean_st":"MS","Cnt":"201"},{"clean_st":"MT","Cnt":"73"},{"clean_st":"NC","Cnt":"433"},{"clean_st":"ND","Cnt":"35"},{"clean_st":"NE","Cnt":"108"},{"clean_st":"NH","Cnt":"97"},{"clean_st":"NJ","Cnt":"505"},{"clean_st":"NM","Cnt":"92"},{"clean_st":"NV","Cnt":"142"},{"clean_st":"NY","Cnt":"1237"},{"clean_st":"OH","Cnt":"652"},{"clean_st":"OK","Cnt":"190"},{"clean_st":"OR","Cnt":"316"},{"clean_st":"PA","Cnt":"678"},{"clean_st":"PR","Cnt":"9"},{"clean_st":"RI","Cnt":"77"},{"clean_st":"SC","Cnt":"209"},{"clean_st":"SD","Cnt":"46"},{"clean_st":"TN","Cnt":"378"},{"clean_st":"TX","Cnt":"1794"},{"clean_st":"UT","Cnt":"189"},{"clean_st":"VA","Cnt":"473"},{"clean_st":"VI","Cnt":"3"},{"clean_st":"VT","Cnt":"43"},{"clean_st":"WA","Cnt":"456"},{"clean_st":"WI","Cnt":"302"},{"clean_st":"WV","Cnt":"61"},{"clean_st":"WY","Cnt":"29"}],"details":[{"clean_st":"LA","clean_error":"S900","Cnt":"1"},{"clean_st":"WA","clean_error":"E422","Cnt":"3"},{"clean_st":"SC","clean_error":"S800","Cnt":"203"},{"clean_st":"NM","clean_error":"E427","Cnt":"3"},{"clean_st":"WY","clean_error":"S820","Cnt":"1"},{"clean_st":"KS","clean_error":"SC10","Cnt":"1"},{"clean_st":"WA","clean_error":"E423","Cnt":"1"},{"clean_st":"PR","clean_error":"S800","Cnt":"8"},{"clean_st":"NE","clean_error":"E412","Cnt":"2"},{"clean_st":"NH","clean_error":"S800","Cnt":"93"},{"clean_st":"OR","clean_error":"S840","Cnt":"1"},{"clean_st":"TX","clean_error":"E421","Cnt":"13"},{"clean_st":"NH","clean_error":"E412","Cnt":"1"},{"clean_st":"FL","clean_error":"SA00","Cnt":"4"},{"clean_st":"GA","clean_error":"E427","Cnt":"2"},{"clean_st":"AZ","clean_error":"S900","Cnt":"2"},{"clean_st":"SD","clean_error":"E412","Cnt":"1"},{"clean_st":"NC","clean_error":"E421","Cnt":"2"},{"clean_st":"MO","clean_error":"S880","Cnt":"1"},{"clean_st":"MI","clean_error":"SB00","Cnt":"1"},{"clean_st":"IL","clean_error":"S920","Cnt":"1"},{"clean_st":"WI","clean_error":"E421","Cnt":"7"},{"clean_st":"LA","clean_error":"S800","Cnt":"270"},{"clean_st":"GA","clean_error":"E412","Cnt":"8"},{"clean_st":"CA","clean_error":"E421","Cnt":"20"},{"clean_st":"KY","clean_error":"E421","Cnt":"1"},{"clean_st":"MI","clean_error":"E412","Cnt":"3"},{"clean_st":"MO","clean_error":"S800","Cnt":"285"},{"clean_st":"WI","clean_error":"E422","Cnt":"2"},{"clean_st":"PA","clean_error":"SA00","Cnt":"1"},{"clean_st":"CA","clean_error":"E422","Cnt":"2"},{"clean_st":"FL","clean_error":"E422","Cnt":"5"},{"clean_st":"WI","clean_error":"S800","Cnt":"262"},{"clean_st":"CO","clean_error":"S820","Cnt":"1"},{"clean_st":"NY","clean_error":"S900","Cnt":"1"},{"clean_st":"TX","clean_error":"SA00","Cnt":"6"},{"clean_st":"WA","clean_error":"E412","Cnt":"1"},{"clean_st":"CA","clean_error":"E423","Cnt":"1"},{"clean_st":"CO","clean_error":"S900","Cnt":"2"},{"clean_st":"NC","clean_error":"E422","Cnt":"3"},{"clean_st":"","clean_error":"E214","Cnt":"2"},{"clean_st":"RI","clean_error":"S800","Cnt":"77"},{"clean_st":"MN","clean_error":"S840","Cnt":"1"},{"clean_st":"TN","clean_error":"E422","Cnt":"2"},{"clean_st":"TX","clean_error":"E505","Cnt":"1"},{"clean_st":"FL","clean_error":"E600","Cnt":"1"},{"clean_st":"MO","clean_error":"S820","Cnt":"1"},{"clean_st":"WV","clean_error":"S810","Cnt":"1"},{"clean_st":"MN","clean_error":"E412","Cnt":"5"},{"clean_st":"ND","clean_error":"S800","Cnt":"29"},{"clean_st":"WI","clean_error":"S820","Cnt":"29"},{"clean_st":"TN","clean_error":"E423","Cnt":"1"},{"clean_st":"IA","clean_error":"E412","Cnt":"5"},{"clean_st":"NE","clean_error":"S800","Cnt":"105"},{"clean_st":"GA","clean_error":"S8A0","Cnt":"1"},{"clean_st":"CA","clean_error":"S900","Cnt":"1"},{"clean_st":"FL","clean_error":"E421","Cnt":"12"},{"clean_st":"AK","clean_error":"E412","Cnt":"1"},{"clean_st":"","clean_error":"E212","Cnt":"1"},{"clean_st":"TX","clean_error":"E427","Cnt":"1"},{"clean_st":"CO","clean_error":"S880","Cnt":"1"},{"clean_st":"FL","clean_error":"S800","Cnt":"1885"},{"clean_st":"WV","clean_error":"E412","Cnt":"3"},{"clean_st":"NV","clean_error":"S800","Cnt":"138"},{"clean_st":"WI","clean_error":"S900","Cnt":"1"},{"clean_st":"NY","clean_error":"S910","Cnt":"1"},{"clean_st":"TX","clean_error":"E412","Cnt":"14"},{"clean_st":"TN","clean_error":"E421","Cnt":"5"},{"clean_st":"AL","clean_error":"S800","Cnt":"219"},{"clean_st":"NC","clean_error":"S800","Cnt":"422"},{"clean_st":"OH","clean_error":"S880","Cnt":"1"},{"clean_st":"ND","clean_error":"E421","Cnt":"1"},{"clean_st":"FL","clean_error":"E427","Cnt":"3"},{"clean_st":"DE","clean_error":"S800","Cnt":"32"},{"clean_st":"AR","clean_error":"E421","Cnt":"3"},{"clean_st":"MN","clean_error":"E421","Cnt":"5"},{"clean_st":"PA","clean_error":"S810","Cnt":"1"},{"clean_st":"ID","clean_error":"E412","Cnt":"6"},{"clean_st":"AK","clean_error":"S800","Cnt":"55"},{"clean_st":"NM","clean_error":"E412","Cnt":"5"},{"clean_st":"OR","clean_error":"E423","Cnt":"1"},{"clean_st":"MS","clean_error":"S800","Cnt":"192"},{"clean_st":"CO","clean_error":"E422","Cnt":"1"},{"clean_st":"AZ","clean_error":"S800","Cnt":"329"},{"clean_st":"ID","clean_error":"S820","Cnt":"4"},{"clean_st":"WY","clean_error":"S810","Cnt":"1"},{"clean_st":"ND","clean_error":"E427","Cnt":"2"},{"clean_st":"PR","clean_error":"E412","Cnt":"1"},{"clean_st":"NY","clean_error":"SB00","Cnt":"1"},{"clean_st":"KS","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"S800","Cnt":"541"},{"clean_st":"MA","clean_error":"S880","Cnt":"1"},{"clean_st":"WV","clean_error":"S900","Cnt":"1"},{"clean_st":"AZ","clean_error":"E421","Cnt":"7"},{"clean_st":"OK","clean_error":"S820","Cnt":"1"},{"clean_st":"LA","clean_error":"E412","Cnt":"3"},{"clean_st":"OR","clean_error":"E421","Cnt":"2"},{"clean_st":"NE","clean_error":"E422","Cnt":"1"},{"clean_st":"MN","clean_error":"E422","Cnt":"1"},{"clean_st":"AR","clean_error":"E422","Cnt":"1"},{"clean_st":"PA","clean_error":"E505","Cnt":"1"},{"clean_st":"MD","clean_error":"S880","Cnt":"2"},{"clean_st":"SC","clean_error":"E421","Cnt":"1"},{"clean_st":"LA","clean_error":"S910","Cnt":"1"},{"clean_st":"UT","clean_error":"SB00","Cnt":"1"},{"clean_st":"CO","clean_error":"E421","Cnt":"3"},{"clean_st":"HI","clean_error":"E421","Cnt":"1"},{"clean_st":"DE","clean_error":"E412","Cnt":"1"},{"clean_st":"ME","clean_error":"S800","Cnt":"54"},{"clean_st":"NY","clean_error":"E412","Cnt":"10"},{"clean_st":"KY","clean_error":"S800","Cnt":"209"},{"clean_st":"OK","clean_error":"S800","Cnt":"180"},{"clean_st":"IN","clean_error":"E412","Cnt":"4"},{"clean_st":"KS","clean_error":"E421","Cnt":"1"},{"clean_st":"GA","clean_error":"S900","Cnt":"1"},{"clean_st":"AZ","clean_error":"E422","Cnt":"4"},{"clean_st":"SC","clean_error":"E427","Cnt":"2"},{"clean_st":"LA","clean_error":"E421","Cnt":"2"},{"clean_st":"OR","clean_error":"E412","Cnt":"1"},{"clean_st":"CT","clean_error":"E412","Cnt":"6"},{"clean_st":"WA","clean_error":"S800","Cnt":"445"},{"clean_st":"MN","clean_error":"E427","Cnt":"5"},{"clean_st":"FL","clean_error":"E412","Cnt":"7"},{"clean_st":"CA","clean_error":"SA00","Cnt":"1"},{"clean_st":"MT","clean_error":"E412","Cnt":"2"},{"clean_st":"AL","clean_error":"SA00","Cnt":"1"},{"clean_st":"IN","clean_error":"E421","Cnt":"1"},{"clean_st":"CA","clean_error":"S880","Cnt":"4"},{"clean_st":"GU","clean_error":"S800","Cnt":"1"},{"clean_st":"UT","clean_error":"S900","Cnt":"2"},{"clean_st":"CT","clean_error":"S890","Cnt":"1"},{"clean_st":"AK","clean_error":"S900","Cnt":"1"},{"clean_st":"OK","clean_error":"S810","Cnt":"2"},{"clean_st":"ND","clean_error":"E412","Cnt":"2"},{"clean_st":"NJ","clean_error":"E421","Cnt":"2"},{"clean_st":"NM","clean_error":"S800","Cnt":"84"},{"clean_st":"UT","clean_error":"S820","Cnt":"5"},{"clean_st":"VA","clean_error":"S8B0","Cnt":"1"},{"clean_st":"CA","clean_error":"S910","Cnt":"1"},{"clean_st":"VA","clean_error":"E412","Cnt":"3"},{"clean_st":"NJ","clean_error":"E422","Cnt":"1"},{"clean_st":"IN","clean_error":"E422","Cnt":"1"},{"clean_st":"TX","clean_error":"S900","Cnt":"1"},{"clean_st":"WY","clean_error":"E412","Cnt":"4"},{"clean_st":"WV","clean_error":"S800","Cnt":"54"},{"clean_st":"MI","clean_error":"S900","Cnt":"2"},{"clean_st":"NV","clean_error":"E412","Cnt":"3"},{"clean_st":"NY","clean_error":"E427","Cnt":"1"},{"clean_st":"IL","clean_error":"S900","Cnt":"1"},{"clean_st":"IL","clean_error":"E412","Cnt":"13"},{"clean_st":"NJ","clean_error":"SA00","Cnt":"1"},{"clean_st":"WA","clean_error":"S8A0","Cnt":"1"},{"clean_st":"CA","clean_error":"S8C0","Cnt":"1"},{"clean_st":"CO","clean_error":"E412","Cnt":"7"},{"clean_st":"DC","clean_error":"E412","Cnt":"1"},{"clean_st":"GA","clean_error":"S800","Cnt":"660"},{"clean_st":"IA","clean_error":"S800","Cnt":"151"},{"clean_st":"WY","clean_error":"S800","Cnt":"23"},{"clean_st":"TN","clean_error":"E600","Cnt":"1"},{"clean_st":"MD","clean_error":"S800","Cnt":"445"},{"clean_st":"PA","clean_error":"E600","Cnt":"1"},{"clean_st":"NY","clean_error":"S8B0","Cnt":"1"},{"clean_st":"NJ","clean_error":"E427","Cnt":"1"},{"clean_st":"TX","clean_error":"S800","Cnt":"1751"},{"clean_st":"CT","clean_error":"E423","Cnt":"1"},{"clean_st":"OH","clean_error":"E412","Cnt":"5"},{"clean_st":"KS","clean_error":"S820","Cnt":"1"},{"clean_st":"NY","clean_error":"E600","Cnt":"1"},{"clean_st":"NJ","clean_error":"E412","Cnt":"5"},{"clean_st":"NY","clean_error":"E422","Cnt":"1"},{"clean_st":"OK","clean_error":"E412","Cnt":"2"},{"clean_st":"MA","clean_error":"E421","Cnt":"1"},{"clean_st":"AR","clean_error":"S820","Cnt":"1"},{"clean_st":"PA","clean_error":"S820","Cnt":"2"},{"clean_st":"MA","clean_error":"S910","Cnt":"1"},{"clean_st":"NY","clean_error":"E421","Cnt":"8"},{"clean_st":"UT","clean_error":"E412","Cnt":"9"},{"clean_st":"NY","clean_error":"S890","Cnt":"2"},{"clean_st":"CO","clean_error":"S800","Cnt":"443"},{"clean_st":"MN","clean_error":"S800","Cnt":"401"},{"clean_st":"FL","clean_error":"E214","Cnt":"1"},{"clean_st":"UT","clean_error":"S880","Cnt":"1"},{"clean_st":"OH","clean_error":"E421","Cnt":"7"},{"clean_st":"IN","clean_error":"S810","Cnt":"1"},{"clean_st":"CA","clean_error":"S800","Cnt":"2645"},{"clean_st":"OR","clean_error":"S800","Cnt":"311"},{"clean_st":"WA","clean_error":"S810","Cnt":"1"},{"clean_st":"FL","clean_error":"E216","Cnt":"1"},{"clean_st":"VT","clean_error":"E430","Cnt":"1"},{"clean_st":"NY","clean_error":"S800","Cnt":"1206"},{"clean_st":"IL","clean_error":"S800","Cnt":"696"},{"clean_st":"MS","clean_error":"E412","Cnt":"4"},{"clean_st":"NV","clean_error":"E422","Cnt":"1"},{"clean_st":"NC","clean_error":"SA00","Cnt":"1"},{"clean_st":"MA","clean_error":"S800","Cnt":"441"},{"clean_st":"MI","clean_error":"S880","Cnt":"1"},{"clean_st":"GA","clean_error":"E600","Cnt":"2"},{"clean_st":"TX","clean_error":"S891","Cnt":"1"},{"clean_st":"OH","clean_error":"E422","Cnt":"1"},{"clean_st":"IA","clean_error":"S8C0","Cnt":"1"},{"clean_st":"KS","clean_error":"S810","Cnt":"1"},{"clean_st":"CA","clean_error":"S890","Cnt":"3"},{"clean_st":"WI","clean_error":"S880","Cnt":"1"},{"clean_st":"VT","clean_error":"S800","Cnt":"37"},{"clean_st":"FL","clean_error":"S820","Cnt":"1"},{"clean_st":"VA","clean_error":"E421","Cnt":"4"},{"clean_st":"VA","clean_error":"S890","Cnt":"2"},{"clean_st":"PA","clean_error":"S900","Cnt":"1"},{"clean_st":"ME","clean_error":"E412","Cnt":"3"},{"clean_st":"MO","clean_error":"E421","Cnt":"4"},{"clean_st":"IL","clean_error":"E422","Cnt":"2"},{"clean_st":"CT","clean_error":"S800","Cnt":"238"},{"clean_st":"UT","clean_error":"E427","Cnt":"1"},{"clean_st":"MI","clean_error":"E422","Cnt":"1"},{"clean_st":"ND","clean_error":"S880","Cnt":"1"},{"clean_st":"TN","clean_error":"S800","Cnt":"369"},{"clean_st":"IL","clean_error":"E421","Cnt":"3"},{"clean_st":"MO","clean_error":"E422","Cnt":"3"},{"clean_st":"MT","clean_error":"E421","Cnt":"1"},{"clean_st":"VI","clean_error":"E421","Cnt":"2"},{"clean_st":"ID","clean_error":"S800","Cnt":"126"},{"clean_st":"MA","clean_error":"E412","Cnt":"6"},{"clean_st":"MS","clean_error":"S900","Cnt":"1"},{"clean_st":"VA","clean_error":"S800","Cnt":"461"},{"clean_st":"LA","clean_error":"S880","Cnt":"2"},{"clean_st":"SD","clean_error":"S800","Cnt":"43"},{"clean_st":"VT","clean_error":"E412","Cnt":"3"},{"clean_st":"FL","clean_error":"S880","Cnt":"2"},{"clean_st":"NC","clean_error":"S980","Cnt":"1"},{"clean_st":"TX","clean_error":"E600","Cnt":"1"},{"clean_st":"MD","clean_error":"SA00","Cnt":"1"},{"clean_st":"AL","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"E421","Cnt":"4"},{"clean_st":"HI","clean_error":"S800","Cnt":"53"},{"clean_st":"IA","clean_error":"S920","Cnt":"1"},{"clean_st":"VI","clean_error":"E412","Cnt":"1"},{"clean_st":"OH","clean_error":"SA00","Cnt":"1"},{"clean_st":"AL","clean_error":"E421","Cnt":"2"},{"clean_st":"MD","clean_error":"E421","Cnt":"5"},{"clean_st":"PA","clean_error":"E412","Cnt":"11"},{"clean_st":"IA","clean_error":"E427","Cnt":"1"},{"clean_st":"FL","clean_error":"S900","Cnt":"2"},{"clean_st":"MS","clean_error":"E421","Cnt":"4"},{"clean_st":"UT","clean_error":"E422","Cnt":"3"},{"clean_st":"NH","clean_error":"E421","Cnt":"3"},{"clean_st":"AL","clean_error":"E427","Cnt":"2"},{"clean_st":"UT","clean_error":"E421","Cnt":"2"},{"clean_st":"VA","clean_error":"SA00","Cnt":"2"},{"clean_st":"SD","clean_error":"E421","Cnt":"2"},{"clean_st":"AR","clean_error":"S900","Cnt":"1"},{"clean_st":"OK","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"S820","Cnt":"1"},{"clean_st":"KY","clean_error":"E412","Cnt":"1"},{"clean_st":"NY","clean_error":"S880","Cnt":"2"},{"clean_st":"MO","clean_error":"E412","Cnt":"3"},{"clean_st":"WV","clean_error":"E422","Cnt":"1"},{"clean_st":"MT","clean_error":"S860","Cnt":"1"},{"clean_st":"OK","clean_error":"E423","Cnt":"1"},{"clean_st":"CA","clean_error":"E412","Cnt":"16"},{"clean_st":"MD","clean_error":"E412","Cnt":"6"},{"clean_st":"NJ","clean_error":"S800","Cnt":"495"},{"clean_st":"NC","clean_error":"E412","Cnt":"4"},{"clean_st":"TX","clean_error":"S860","Cnt":"2"},{"clean_st":"PA","clean_error":"E421","Cnt":"11"},{"clean_st":"IA","clean_error":"E422","Cnt":"1"},{"clean_st":"NY","clean_error":"SA00","Cnt":"2"},{"clean_st":"IL","clean_error":"S8A0","Cnt":"1"},{"clean_st":"GA","clean_error":"S880","Cnt":"1"},{"clean_st":"WV","clean_error":"E421","Cnt":"1"},{"clean_st":"IL","clean_error":"S810","Cnt":"1"},{"clean_st":"IA","clean_error":"S880","Cnt":"2"},{"clean_st":"MT","clean_error":"S800","Cnt":"69"},{"clean_st":"VT","clean_error":"E421","Cnt":"2"},{"clean_st":"SC","clean_error":"E412","Cnt":"2"},{"clean_st":"IN","clean_error":"S800","Cnt":"311"},{"clean_st":"UT","clean_error":"S800","Cnt":"165"},{"clean_st":"GA","clean_error":"E421","Cnt":"8"},{"clean_st":"CO","clean_error":"S890","Cnt":"1"},{"clean_st":"OK","clean_error":"E421","Cnt":"3"},{"clean_st":"ID","clean_error":"E421","Cnt":"3"},{"clean_st":"KS","clean_error":"S800","Cnt":"150"},{"clean_st":"SC","clean_error":"S820","Cnt":"1"},{"clean_st":"TX","clean_error":"S880","Cnt":"3"},{"clean_st":"MN","clean_error":"S810","Cnt":"1"},{"clean_st":"OH","clean_error":"S800","Cnt":"637"},{"clean_st":"AR","clean_error":"S800","Cnt":"134"},{"clean_st":"PA","clean_error":"S800","Cnt":"647"},{"clean_st":"IA","clean_error":"E421","Cnt":"1"},{"clean_st":"PA","clean_error":"E422","Cnt":"2"},{"clean_st":"WA","clean_error":"E421","Cnt":"4"},{"clean_st":"DC","clean_error":"S800","Cnt":"90"}]}');
        return this;
    };

    HTML.prototype.testData2 = function () {
        this.ddlUrl("http://10.241.100.159:8002/WsEcl/submit/query/roxie/hipie_testrelavator3.ins002_service/json");
        //this.ddlUrl("http://10.173.147.1:8010/wsWorkunits/WUResult?Wuid=W20150617-115910&ResultName=leeddx_issue_780_formwidget_Comp_Ins002_DDL");
        //this.ddlUrl("http://10.173.147.1:8010/wsWorkunits/WUResult?Wuid=W20150617-120745&ResultName=leeddx_issue_780_formtablewidget_Comp_Ins002_DDL");
        //this.ddlUrl("http://10.241.100.159:8002/WsEcl/submit/query/roxie/hipie_testrelavator2.ins002_service/json");
        return this;
    };

    HTML.prototype.content = function () {
        return Grid.prototype.content.apply(this, arguments);
    };

    HTML.prototype.setContent = function (row, col, widget, title, rowSpan, colSpan) {
        return Grid.prototype.setContent.apply(this, arguments);
    };

    HTML.prototype.enter = function (domNode, element) {
        Grid.prototype.enter.apply(this, arguments);
    };

    function createGraphData(marshaller, databomb) {
        if (databomb instanceof Object) {
        } else if (databomb){
            databomb = JSON.parse(databomb);
        }
        var curr = null;
        var dashboards = {};
        marshaller.accept({
            visit: function (item) {
                if (item instanceof HipieDDL.Dashboard) {
                    curr = {
                        dashboard: item,
                        visualizations: []
                    };
                    dashboards[item.getQualifiedID()] = curr;
                } else if (item instanceof HipieDDL.DataSource) {
                    if (item.databomb && databomb[item.id]) {
                        item.comms.databomb(databomb[item.id]);
                    }
                } else if (item instanceof HipieDDL.Output) {
                    if (item.dataSource.databomb) {
                        item.dataSource.comms.databombOutput(item.from);
                    }
                } else if (item instanceof HipieDDL.Visualization) {
                    if (item.widget) {
                        curr.visualizations.push(item);
                    }
                }
            }
        });
        return dashboards;
    }

    HTML.prototype.render = function (callback) {
        if (this.ddlUrl() === "" || (this.ddlUrl() === this._prev_ddlUrl && this.databomb() === this._prev_databomb)) {
            return Grid.prototype.render.apply(this, arguments);
        }
        this._prev_ddlUrl = this.ddlUrl();
        this._prev_databomb = this.databomb();

        var marshaller = new HipieDDL.Marshaller().proxyMappings(this.proxyMappings());
        var context = this;
        if (this.ddlUrl()[0] === "[" || this.ddlUrl()[0] === "{") {
            marshaller.parse(this.ddlUrl(), function () {
                postParse();
            });
        } else {
            marshaller.url(this.ddlUrl(), function () {
                postParse();
            });
        }
        function postParse() {
            var dashboards = createGraphData(marshaller, context.databomb());
            for (var key in dashboards) {
                var cellRow = 0;
                var cellCol = 0;
                var maxCol = Math.floor(Math.sqrt(dashboards[key].visualizations.length));
                dashboards[key].visualizations.forEach(function (viz, idx) {
                    if (idx && (idx % maxCol === 0)) {
                        cellRow++;
                        cellCol = 0;
                    }
                    viz.widget.size({ width: 0, height: 0 });
                    var existingWidget = context.getContent(viz.widget._id);
                    if (existingWidget) {
                        viz.setWidget(existingWidget, true);
                    } else {
                        context.setContent(cellRow, cellCol, viz.widget, viz.title);
                    }
                    cellCol++;
                });
                for (var key2 in dashboards[key].dashboard.datasources) {
                    dashboards[key].dashboard.datasources[key2].fetchData({}, true);
                }
            }
            Grid.prototype.render.call(context, function (widget) {
                if (callback) {
                    callback(widget);
                }
            });
        }
        return this;
    };

    return HTML;
}));

