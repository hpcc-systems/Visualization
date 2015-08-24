﻿"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../other/Comms", "../common/Widget", "require"], factory);
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

    function HeatMapMappings(visualization, mappings) {
        SourceMappings.call(this, visualization, mappings);
        this.columns = ["x", "y", "weight"];
        this.columnsIdx = { x: 0, y:1, weight: 2 };
        this.init();
    }
    HeatMapMappings.prototype = Object.create(SourceMappings.prototype);

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
            case "HEAT_MAP":
                this.mappings = new HeatMapMappings(this.visualization, source.mappings, source.link);
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
        this.getUpdatesVisualizations().forEach(function (item, idx) {
            var datasource = item.source.getDatasource();
            if (datasource && !dedup[datasource.id]) {
                dedup[datasource.id] = true;
                retVal.push(datasource);
            }
        }, this);
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
                widget["vertex_" + key] = function (row) {
                    context.visualization.onEvent(key, context.events[key], row);
                };
            } else if (widget[key]) {
                widget[key] = function (row, col, selected) {
                    context.visualization.onEvent(key, context.events[key], row, col, selected);
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
                                .value(field.properties.default ? field.properties.default : "")
                            ;
                        }))
                    ;
                });
                break;
            case "HEAT_MAP":
                this.loadWidgets(["src/other/HeatMap",], function (widget, widgetClasses) {
                    widget
                        .id(visualization.id)
                        .image(context.properties.imageUrl)                        
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

    Visualization.prototype.onEvent = function (eventID, event, row, col, selected) {
        var context = this;
        setTimeout(function () {
            selected = selected === undefined ? true : selected;
            if (event.exists()) {
                var request = {};
                if (selected) {
                    for (var key in event.mappings) {
                        var origKey = (context.source.mappings && context.source.mappings.hasMappings) ? context.source.mappings.getReverseMap(key) : key;
                        request[event.mappings[key]] = row[origKey];
                    }
                }

                //  New request calculation:
                context._eventValues = request;
                var datasourceRequests = {};
                var updatedVizs = event.getUpdatesVisualizations();
                updatedVizs.forEach(function (updatedViz) {
                    var dataSource = updatedViz.source.getDatasource();
                    if (!datasourceRequests[dataSource.id]) {
                        datasourceRequests[dataSource.id] = {
                            datasource: dataSource,
                            request: {
                            },
                            updates: []
                        };
                    }
                    datasourceRequests[dataSource.id].updates.push(updatedViz.id);
                    updatedViz.getInputVisualizations().forEach(function (inViz, idx) {
                        if (inViz._eventValues) {
                            for (var key in inViz._eventValues) {
                                if (datasourceRequests[dataSource.id].request[key] && datasourceRequests[dataSource.id].request[key] !== inViz._eventValues[key]) {
                                    console.log("Duplicate Filter, with mismatched value:  " + key + "=" + inViz._eventValues[key]);
                                }
                                datasourceRequests[dataSource.id].request[key] = inViz._eventValues[key];
                            }
                        }
                    });
                    if (dataSource.WUID || dataSource.databomb) { // TODO If we have filters for each output this would not be needed  ---
                        dataSource.fetchData(datasourceRequests[dataSource.id].request, false, [updatedViz.id]);
                    }
                });
                for (var drKey in datasourceRequests) {
                    if (!datasourceRequests[drKey].datasource.WUID && !datasourceRequests[drKey].datasource.databomb) {  // TODO If we have filters for each output this would not be needed  ---
                        datasourceRequests[drKey].datasource.fetchData(datasourceRequests[drKey].request, false, datasourceRequests[drKey].updates);
                    }
                }
            }
        }, 0);
    };

    Visualization.prototype.getInputVisualizations = function () {
        return this.dashboard.visualizationsArray.filter(function (viz) {
            var updates = viz.events.getUpdatesVisualizations();
            if (updates.indexOf(this) >= 0) {
                return true;
            }
            return false;
        }, this);
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
        if (!updates) {
            updates = [];
            for (var oKey in this.outputs) {
                var output = this.outputs[oKey];
                if (!output.filter || !output.filter.length) {
                    output.notify.forEach(function (item) {
                        updates.push(item);
                    });
                }
            }
        }

        var context = this;
        this.request.refresh = refresh ? true : false;
        this.filter.forEach(function (item) {
            context.request[item + "_changed"] = false;
            var value = request[item] === undefined ? "" : request[item];
            if (this.request[item] !== value) {
                this.request[item] = value;
                this.request[item + "_changed"] = true;
            }
        }, this);
        if (window.__hpcc_debug) {
            console.log("fetchData:  " + JSON.stringify(updates) + "(" + JSON.stringify(request) + ")");
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
            if (exists(from, response)) {
                if (!exists(from + "_changed", response) || (exists(from + "_changed", response) && response[from + "_changed"].length && response[from + "_changed"][0][from + "_changed"])) {
                    this.outputs[key].setData(response[from], request, updates);
                }
            } else if (exists(from, lowerResponse)) {
                console.log("DDL 'DataSource.From' case is Incorrect");
                if (!exists(from + "_changed", lowerResponse) || (exists(from + "_changed", lowerResponse) && response[from + "_changed"].length && lowerResponse[from + "_changed"][0][from + "_changed"])) {
                    this.outputs[key].setData(lowerResponse[from], request, updates);
                }
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
