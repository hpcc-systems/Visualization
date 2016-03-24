"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/Database", "../common/Utility", "../other/Comms", "../common/Widget", "require"], factory);
    } else {
        root.marshaller_HipieDDL = factory(root.d3, root.common_Database, root.common_Utility, root.other_Comms, root.common_Widget, root.require);
    }
}(this, function (d3, Database, Utility, Comms, Widget, require) {
    var loading = "...loading...";

    function exists(prop, scope) {
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
    }

    function faCharFix(faChar) {
        if (faChar) {
            return String.fromCharCode(parseInt(faChar));
        }
        return faChar;
    }

    //  Mappings ---
    function SourceMappings(visualization, mappings) {
        this.visualization = visualization;
        var newMappings = {};
        for (var key in mappings) {
            if (mappings[key] instanceof Array) {
                mappings[key].forEach(function (mapingItem, idx) {
                    newMappings[idx === 0 ? key : key + "_" + idx] = mapingItem;
                });
            } else {
                newMappings[key] = mappings[key];
            }
        }
        this.mappings = newMappings;
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

    function hipieType2DBType(hipieType) {
        switch (hipieType) {
            case "bool":
            case "boolean":
                return "boolean";
            case "integer":
            case "float":
            case "double":
                return "number";
            case "date":
            case "time":
                return "time";
        }
        return "string";
    }

    SourceMappings.prototype.getFields = function () {
        if (this.visualization.fields) {
            return Object.keys(this.mappings).map(function(key) {
                return this.visualization.fields.filter(function(field) {
                   return field.id === this.mappings[key];
                }, this).map(function(field) {
                    return new Database.Field(field.id)
                        .type(hipieType2DBType(field.properties.type))
                        .label(this.reverseMappings[field.id])
                    ;
                }, this)[0];
            }, this);
        }
        return null;
    };

    SourceMappings.prototype.contains = function (key) {
        return this.mappings[key] !== undefined;
    };

    SourceMappings.prototype.doMap = function (item) {
        var retVal = [];
        for (var key in this.mappings) {
            var rhsKey = this.mappings[key];
            try {
                var val = item[rhsKey];
                if (val === undefined) {
                    val = item[rhsKey.toLowerCase()];
                }
                retVal[this.columnsIdx[key]] = val;
            } catch (e) {
                console.log("Invalid Mapping:  " + this.visualization.id + " [" + rhsKey + "->" + item + "]");
            }
        }
        return retVal;
    };

    SourceMappings.prototype.doMapAll = function (data) {
        return data.hipieMappings(this.columnsRHS);
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
        } else if (mappings.geohash) {
            this.columns = ["geohash", "weight"];
            this.columnsIdx = { geohash: 0, weight: 1 };
        }
        this.init();
    }
    ChoroMappings.prototype = Object.create(SourceMappings.prototype);

    function ChoroMappings2(visualization, mappings) {
        SourceMappings.call(this, visualization, mappings);
        if (mappings.state) {
            this.columns = ["state"];
            this.columnsIdx = { state: 0 };
        } else if (mappings.county) {
            this.columns = ["county"];
            this.columnsIdx = { county: 0};
        } else if (mappings.geohash) {
            this.columns = ["geohash"];
            this.columnsIdx = { geohash: 0 };
        }
        mappings.weight.forEach(function (w, i) {
            this.columns.push(w);
            this.columnsIdx[i === 0 ? "weight" : "weight_" + i] = i + 1;
        }, this);
        this.init();
    }
    ChoroMappings2.prototype = Object.create(SourceMappings.prototype);

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

    TableMappings.prototype.init = function () {
        this.visualization.label.forEach(function (label, idx) {
            this.reverseMappings[this.mappings[label]] = label;
            this.columns.push(label);
            this.columnsIdx[label] = idx;
            this.columnsRHS[idx] = this.mappings[label];
            this.columnsRHSIdx[this.mappings[label]] = idx;
            this.hasMappings = true;
        }, this);
    };

    function GraphMappings(visualization, mappings, link) {
        SourceMappings.call(this, visualization, mappings);
        this.icon = visualization.icon || {};
        this.fields = visualization.fields || {};
        this.columns = ["uid", "label", "weight", "flags"];
        this.columnsIdx = { uid: 0, label: 1, weight: 2, flags: 3 };
        this.init();
        this.link = link;
        this.visualization = visualization;
    }
    GraphMappings.prototype = Object.create(SourceMappings.prototype);

    GraphMappings.prototype.calcAnnotation = function (field, origItem, forAnnotation) {
        var retVal = {};
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

    GraphMappings.prototype.doMapAll = function (db) {
        var data = db.jsonObj();
        var context = this;
        var vertexMap = {};
        var vertices = [];
        var graph = this.visualization.widget;
        function getVertex(item, origItem) {
            var id = "uid_" + item[0];
            var retVal = vertexMap[id];
            if (!retVal) {
                retVal = new graph.Vertex()
                    .faChar((context.icon && context.icon.faChar ? faCharFix(context.icon.faChar) : "\uf128"))
                    .text(item[1] ? item[1] : "")
                ;
                retVal.__hpcc_uid = item[0];
                vertexMap[id] = retVal;
                vertices.push(retVal);
            }
            if (origItem) {
                if (item[1]) {
                    retVal.text(item[1]);
                }
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
                        var edge = new graph.Edge()
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
                if (source.mappings.weight instanceof Array && source.mappings.weight.length) {
                    this.mappings = new ChoroMappings2(this.visualization, source.mappings, source.link);
                    if (source.mappings.weight.length > 1) {
                        this.visualization.type = "LINE";
                    }
                } else {
                    this.mappings = new ChoroMappings(this.visualization, source.mappings, source.link);
                }
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
        return this.getOutput().db ? true : false;
    };

    Source.prototype.getFields = function () {
        return this.mappings.getFields();
    };

    Source.prototype.getColumns = function () {
        return this.mappings.columns;
    };

    Source.prototype.getData = function () {
        var db = this.getOutput().db;
        var dataRef = db.data();
        if (dataRef.length && this.sort) {
            Utility.multiSort(dataRef, db.hipieMapSortArray(this.sort));
        }
        var retVal = this.mappings.doMapAll(db);
        if (this.reverse) {
            retVal.reverse();
        }
        if (this.first && retVal.length > this.first) {
            retVal.length = this.first;
        }
        return retVal;
    };

    Source.prototype.getXTitle = function () {
        return this.mappings.columns[0];
    };

    Source.prototype.getYTitle = function () {
        return this.mappings.columns.filter(function(d, i) {return i > 0;}).join(" / ");
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
                var visualization = this.visualization.dashboard.getVisualization(item.visualization);
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
                var visualization = this.visualization.dashboard.getVisualization(item.visualization);
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
                if (this.source.mappings.contains("state")) {
                    this.loadWidget("src/map/ChoroplethStates", function (widget) {
                        widget
                            .id(visualization.id)
                            .paletteID_default(visualization.color)
                        ;
                    });
                } else if (this.source.mappings.contains("county")) {
                    this.loadWidget("src/map/ChoroplethCounties", function (widget) {
                        widget
                            .id(visualization.id)
                            .paletteID_default(visualization.color)
                        ;
                    });

                } else if (this.source.mappings.contains("geohash")) {
                    this.loadWidget("src/map/Layered", function (widget) {
                        widget
                            .id(visualization.id)
                        ;
                    });
                }
                break;
            case "2DCHART":
            case "PIE":
            case "BUBBLE":
            case "BAR":
            case "WORD_CLOUD":
                this.loadWidget("src/composite/MegaChart", function (widget) {
                    widget
                        .id(visualization.id)
                        .legendPosition_default("none")
                        .chartType_default(context.properties.chartType || context.properties.charttype || context.type)
                    ;
                });
                break;
            case "LINE":
                this.loadWidget("src/composite/MegaChart", function (widget) {
                    widget
                        .id(visualization.id)
                        .legendPosition_default("none")
                        //.domainAxisTitle(context.source.getXTitle())
                        //.valueAxisTitle(context.source.getYTitle())
                        .chartType_default(context.properties.chartType || context.properties.charttype || context.type)
                    ;
                });
                break;
            case "TABLE":
                this.loadWidget("src/composite/MegaChart", function (widget) {
                    widget
                        .id(visualization.id)
                        .legendPosition_default("none")
                        .showChartSelect_default(false)
                        .chartType_default("TABLE")
                        .chartTypeDefaults({ pagination: true })
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
                            .low_default(+visualization.range[0])
                            .high_default(+visualization.range[1])
                            .step_default(+visualization.range[2])
                            .selectionLabel_default(selectionLabel)
                        ;
                    }
                });
                break;
            case "GRAPH":
                this.loadWidgets(["src/graph/Graph"], function (widget) {
                    widget
                        .id(visualization.id)
                        .layout_default("ForceDirected2")
                        .applyScaleOnLayout_default(true)
                    ;
                });
                break;
            case "FORM":
                this.loadWidgets(["src/form/Form", "src/form/Input", "src/form/Button", "src/form/CheckBox", "src/form/ColorInput", "src/form/Radio", "src/form/Range", "src/form/Select", "src/form/Slider", "src/form/TextArea"], function (widget, widgetClasses) {
                    var Input = widgetClasses[1];
                    var CheckBox = widgetClasses[3];
                    var Radio = widgetClasses[5];
                    var Select = widgetClasses[7];
                    var TextArea = widgetClasses[9];

                    widget
                        .id(visualization.id)
                        .inputs(visualization.fields.map(function (field) {

                            var selectOptions = [];
                            var options = [];
                            var inp;
                            switch (field.properties.charttype) {
                                case "TEXT":
                                    inp = new Input()
                                        .type_default("text")
                                    ;
                                    break;
                                case "TEXTAREA":
                                    inp = new TextArea();
                                    break;
                                case "CHECKBOX":
                                    inp = new CheckBox();
                                    break;
                                case "RADIO":
                                    inp = new Radio();
                                    break;
                                case "HIDDEN":
                                    inp = new Input()
                                        .type_default("hidden")
                                    ;
                                    break;
                                default:
                                    if (field.properties.enumvals) {
                                        inp = new Select();
                                        options = field.properties.enumvals;
                                        for (var val in options) {
                                            selectOptions.push([val, options[val]]);
                                        }
                                    } else {
                                        inp = new Input()
                                            .type_default("text")
                                        ;
                                    }
                                    break;
                            }

                            inp
                                .name_default(field.id)
                                .label_default((field.properties ? field.properties.label : null) || field.label)
                                .value_default(field.properties.default ? field.properties.default : "") // TODO Hippie support for multiple default values (checkbox only)
                            ;

                            if (inp instanceof CheckBox || inp instanceof Radio) { // change this to instanceof?
                                var vals = Object.keys(field.properties.enumvals);
                                inp.selectOptions_default(vals);
                            } else if (selectOptions.length) {
                                inp.selectOptions_default(selectOptions);
                            }

                            return inp;
                        }))
                    ;
                });
                break;
            case "HEAT_MAP":
                this.loadWidgets(["src/other/HeatMap"], function (widget) {
                    widget
                        .id(visualization.id)
                        .image_default(context.properties.imageUrl)
                    ;
                });
                break;
            default:
                this.loadWidget("src/common/TextBox", function (widget) {
                    widget
                        .id(visualization.id)
                        .text_default(context.id + "\n" + "TODO:  " + context.type)
                    ;
                });
                break;
        }
    }

    Visualization.prototype.getQualifiedID = function () {
        return this.id;
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
            if (context.dashboard.marshaller._widgetMappings.has(context.id)) {
                context.setWidget(context.dashboard.marshaller._widgetMappings.get(context.id));
            } else {
                context.setWidget(new Widget());
            }
            if (callback) {
                callback(context.widget, arguments);
            }
        });
    };

    Visualization.prototype.setWidget = function (widget) {
        this.widget = widget;
        this.events.setWidget(widget);
        for (var key in this.properties) {
            switch (widget.classID()) {
                case "chart_MultiChart":
                case "composite_MegaChart":
                    widget.chartTypeDefaults()[key] = this.properties[key];
                    break;
                default:
                    if (this.widget[key + "_default"]) {
                        try {
                            this.widget[key + "_default"](this.properties[key]);
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

    Visualization.prototype.update = function (msg) {
        var updatedBy = this.getInputVisualizations();
        var paramsArr = [];
        updatedBy.forEach(function (viz) {
            for (var key in viz._eventValues) {
                paramsArr.push(viz._eventValues[key]);
            }
        });
        var params = msg || paramsArr.join(", ");

        var titleWidget = this.widget;
        while (titleWidget && !titleWidget.title) {
            titleWidget = titleWidget.locateParentWidget();
        }
        if (titleWidget) {
            var title = titleWidget.title();
            var titleParts = title.split(" (");
            titleWidget
                .title(titleParts[0] + (params ? " (" + params + ")" : ""))
                .render()
            ;
        } else {
            this.widget.render();
        }
    };

    Visualization.prototype.notify = function () {
        if (this.source.hasData()) {
            if (this.widget) {
                if (!this.widget.fields().length) {
                    var columns = this.source.getColumns();
                    this.widget.columns(columns);
                }
                var data = this.source.getData();
                this.widget.data(data);

                this.update();
            }
        }
    };

    Visualization.prototype.clear = function () {
        if (this.widget && this.dashboard.marshaller.clearDataOnUpdate()) {
            this.widget.data([]);
            this.source.getOutput().request = {};
        }
        if (this.dashboard.marshaller.propogateClear() && this._eventValues) {
            delete this._eventValues;
            this.events.getUpdatesVisualizations().forEach(function (updatedViz) {
                updatedViz.clear();
            });
        }
        this.update(loading);
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
                                datasourceRequests[dataSource.id].request[key + "_changed"] = inViz === context;
                            }
                        }
                    });
                    if (updatedViz.type !== "GRAPH") {
                        updatedViz.clear();    
                    } 
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
        return this.dashboard.marshaller.getVisualizationArray().filter(function (viz) {
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

    Output.prototype.accept = function (visitor) {
        visitor.visit(this);
    };

    Output.prototype.vizNotify = function (updates) {
        this.notify.filter(function (item) {
            return !updates || updates.indexOf(item) >= 0;
        }).forEach(function (item) {
            var viz = this.dataSource.dashboard.getVisualization(item);
            viz.notify();
        }, this);
    };

    Output.prototype.setData = function (data, request, updates) {
        this.request = request;
        this.db = new Database.Grid().jsonObj(data);
        this.vizNotify(updates);
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
        this._loadedCount = 0;

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
                output.notify.forEach(function (item) {
                    if (!output.filter || !output.filter.length) {
                        updates.push(item);
                    }
                    var viz = this.dashboard.getVisualization(item);
                    viz.update(loading);
                }, this);
            }
        }

        var context = this;
        this.request.refresh = refresh ? true : false;
        this.filter.forEach(function (item) {
            this.request[item + "_changed"] = request[item + "_changed"] || false;
            var value = request[item] === undefined ? null : request[item];
            if (this.request[item] !== value) {
                this.request[item] = value;
            }
        }, this);
        if (window.__hpcc_debug) {
            console.log("fetchData:  " + JSON.stringify(updates) + "(" + JSON.stringify(request) + ")");
        }
        for (var key in this.request) {
            if (this.request[key] === null) {
                delete this.request[key];
            }
        }
        var now = Date.now();
        this.comms.call(this.request).then(function (response) {
            var delay = 500 - (Date.now() - now);  //  500 is to allow for all "clear" transitions to complete...
            setTimeout(function() {
                context.processResponse(response, request, updates);
                ++context._loadedCount;
            }, delay > 0 ? delay : 0);
        }).catch(function (e) {
            context.dashboard.marshaller.commsError("DataSource.prototype.fetchData", e);
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
                } else {
                    //  TODO - I Suspect there is a HIPIE/Roxie issue here (empty request)
                    this.outputs[key].vizNotify(updates);
                }
            } else if (exists(from, lowerResponse)) {
                console.log("DDL 'DataSource.From' case is Incorrect");
                if (!exists(from + "_changed", lowerResponse) || (exists(from + "_changed", lowerResponse) && response[from + "_changed"].length && lowerResponse[from + "_changed"][0][from + "_changed"])) {
                    this.outputs[key].setData(lowerResponse[from], request, updates);
                } else {
                    //  TODO - I Suspect there is a HIPIE/Roxie issue here (empty request)
                    this.outputs[key].vizNotify(updates);
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

        this._visualizations = {};
        this._visualizationArray = [];
        dashboard.visualizations.forEach(function (item) {
            var newItem = new Visualization(this, item);
            this._visualizations[item.id] = newItem;
            this._visualizationArray.push(newItem);
            this.marshaller._visualizations[item.id] = newItem;
            this.marshaller._visualizationArray.push(newItem);
        }, this);
        this._visualizationTotal = this._visualizationArray.length;
    }

    Dashboard.prototype.getQualifiedID = function () {
        return this.id;
    };

    Dashboard.prototype.getVisualization = function (id) {
        return this._visualizations[id] || this.marshaller.getVisualization(id);
    };

    Dashboard.prototype.getVisualizations = function () {
        return this._visualizations;
    };

    Dashboard.prototype.getVisualizationArray = function () {
        return this._visualizationArray;
    };

    Dashboard.prototype.getVisualizationTotal = function () {
        return this._visualizationTotal;
    };

    Dashboard.prototype.accept = function (visitor) {
        visitor.visit(this);
        for (var key in this.datasources) {
            this.datasources[key].accept(visitor);
        }
        this._visualizationArray.forEach(function (item) {
            item.accept(visitor);
        }, this);
    };

    Dashboard.prototype.allVisualizationsLoaded = function () {
        var notLoaded = this._visualizationArray.filter(function (item) { return !item.isLoaded(); });
        return notLoaded.length === 0;
    };

    //  Marshaller  ---
    function Marshaller() {
        this._proxyMappings = {};
        this._widgetMappings = d3.map();
        this._clearDataOnUpdate = true;
        this._propogateClear = false;
    }

    Marshaller.prototype.commsDataLoaded = function () {
        for (var i = 0; i < this.dashboardArray.length; i++) {
            for (var ds in this.dashboardArray[i].datasources) {
                if (this.dashboardArray[i].datasources[ds]._loadedCount === 0) {
                    return false;
                }
            }
        }
        return true;
    };

    Marshaller.prototype.getVisualization = function (id) {
        return this._visualizations[id];
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
                .url(url)
                .proxyMappings(this._proxyMappings)
            ;
        }
        var request = {
            refresh: false
        };

        var context = this;
        transport.call(request).then(function (response) {
            if (exists(hipieResultName, response)) {
                return transport.fetchResult(hipieResultName).then(function (ddlResponse) {
                    var json = ddlResponse[0][hipieResultName];
                    context.parse(json, function () {
                        callback(response);
                    });
                }).catch(function (e) {
                    context.commsError("Marshaller.prototype.url", e);
                });
            }
        }).catch(function (e) {
            context.commsError("Marshaller.prototype.url", e);
        });
    };

    Marshaller.prototype.proxyMappings = function (_) {
        if (!arguments.length) return this._proxyMappings;
        this._proxyMappings = _;
        return this;
    };

    Marshaller.prototype.widgetMappings = function (_) {
        if (!arguments.length) return this._widgetMappings;
        this._widgetMappings = _;
        return this;
    };

    Marshaller.prototype.clearDataOnUpdate = function (_) {
        if (!arguments.length) return this._clearDataOnUpdate;
        this._clearDataOnUpdate = _;
        return this;
    };

    Marshaller.prototype.propogateClear = function (_) {
        if (!arguments.length) return this._propogateClear;
        this._propogateClear = _;
        return this;
    };

    Marshaller.prototype.parse = function (json, callback) {
        var context = this;
        this._json = json;
        this._jsonParsed = JSON.parse(this._json);
        this.dashboards = {};
        this.dashboardArray = [];
        this._visualizations = {};
        this._visualizationArray = [];
        this._jsonParsed.forEach(function (item) {
            var newDashboard = new Dashboard(context, item, context._proxyMappings);
            context.dashboards[item.id] = newDashboard;
            context.dashboardArray.push(newDashboard);
        });
        this.dashboardTotal = this.dashboardArray.length;
        this.ready(callback);
        return this;
    };

    Marshaller.prototype.getVisualizations = function () {
        return this._visualizations;
    };

    Marshaller.prototype.getVisualizationArray = function () {
        return this._visualizationArray;
    };

    Marshaller.prototype.on = function (eventID, func) {
        if (this[eventID] === undefined) {
            throw "Method:  " + eventID + " does not exist.";
        }
        var origFunc = this[eventID];
        this[eventID] = function () {
            origFunc.apply(this, arguments);
            func.apply(this, arguments);
        };
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

    Marshaller.prototype.commsError = function (source, error) {
        console.log("Comms Error:\n" + source + "\n" + error);
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
