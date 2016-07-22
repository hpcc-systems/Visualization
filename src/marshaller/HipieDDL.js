"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/Class", "../common/Database", "../common/Utility", "../other/Comms", "../common/Widget", "require", "es6-promise"], factory);
    } else {
        root.marshaller_HipieDDL = factory(root.d3, root.common_Class, root.common_Database, root.common_Utility, root.other_Comms, root.common_Widget, root.require);
    }
}(this, function (d3, Class, Database, Utility, Comms, Widget, require) {
    var LOADING = "...loading...";
    var _CHANGED = "_changed";

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
            case "geohash":
                return "geohash";
            default:
                if (hipieType.indexOf("unsigned") === 0) {
                    return "number";
                }
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
        return data.hipieMappings(this.columnsRHS, this.visualization.dashboard.marshaller.missingDataString());
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
            this.columns = ["geohash", "label"];
            this.columnsIdx = { geohash: 0, label: 1 };
        }
        var weightOffset = this.columns.length;
        mappings.weight.forEach(function (w, i) {
            this.columns.push(w);
            this.columnsIdx[i === 0 ? "weight" : "weight_" + i] = i + weightOffset;
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
        this.linkMappings = new SourceMappings(visualization, this.link.mappings);
        this.linkMappings.columns = ["uid"];
        this.linkMappings.columnsIdx = { uid: 0 };
        this.visualization = visualization;
    }
    GraphMappings.prototype = Object.create(SourceMappings.prototype);

    GraphMappings.prototype.calcIconInfo = function (field, origItem, forAnnotation) {
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
        if (origItem && origItem[field.fieldid] && field.valuemappings) {
            var annotationInfo = field.valuemappings[origItem[field.fieldid]];
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
            if (!retVal && origItem) {
                retVal = new graph.Vertex()
                    .faChar((context.icon && context.icon.faChar ? faCharFix(context.icon.faChar) : "\uf128"))
                    .text(item[1] ? item[1] : "")
                ;
                retVal.__hpcc_uid = item[0];
                vertexMap[id] = retVal;
                vertices.push(retVal);

                //  Icon  ---
                var iconInfo = context.calcIconInfo(context.visualization.icon, origItem, false);
                if (iconInfo) {
                    for (var key in iconInfo) {
                        if (retVal[key]) {
                            retVal[key](iconInfo[key]);
                        }
                    }
                }

                // Annotations  ---
                var annotations = [];
                context.visualization.flag.forEach(function (field) {
                    var iconInfo = context.calcIconInfo(field, origItem, true);
                    if (iconInfo) {
                        annotations.push(iconInfo);
                    }
                });
                retVal.annotationIcons(annotations);
            }
            return retVal;
        }
        var edges = [];
        data.forEach(function (item) {
            var mappedItem = context.doMap(item);
            getVertex(mappedItem, item);
        });
        data.forEach(function (item) {
            var mappedItem = context.doMap(item);
            var vertex = getVertex(mappedItem, item);
            if (item[context.link.childfile] && item[context.link.childfile].Row) {
                var childItems = item[context.link.childfile].Row;
                childItems.forEach(function (childItem, i) {
                    var childMappedItem = context.linkMappings.doMap(childItem);
                    var childVertex = getVertex(childMappedItem);
                    if (childVertex && vertex.id() !== childVertex.id()) {
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
                    context.visualization.processEvent(key, context.events[key], row);
                };
            } else if (widget[key]) {
                widget[key] = function (row, col, selected) {
                    context.visualization.processEvent(key, context.events[key], row, col, selected);
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
    function Visualization(dashboard, visualization, parentVisualization) {
        Class.call(this);

        this.dashboard = dashboard;
        this.parentVisualization = parentVisualization;
        this.id = visualization.id;

        this.label = visualization.label;
        this.title = visualization.title || visualization.id;
        this.type = visualization.type;
        this.icon = visualization.icon || {};
        this.flag = visualization.flag || [];
        this.fields = visualization.fields || {};
        this.properties = visualization.properties || (visualization.source ? visualization.source.properties : null) || {};
        this.source = new Source(this, visualization.source);
        this.events = new Events(this, visualization.events);
        this.layers = (visualization.visualizations || []).map(function (innerViz) {
            return new Visualization(dashboard, innerViz, this);
        }, this);

        var context = this;
        switch (this.type) {
            case "CHORO":
                var chartType = visualization.properties && visualization.properties.charttype ? visualization.properties.charttype : "";
                switch (chartType) {
                    case "MAP_PINS":
                        this.loadWidget("../map/Pins", function (widget) {
                            widget
                                .id(visualization.id)
                                .columns(context.source.getColumns())
                                .geohashColumn("geohash")
                                .tooltipColumn("label")
                                .fillColor(visualization.color ? visualization.color : null)
                                .projection("albersUsaPr")
                            ;
                        });
                        break;
                    default:
                        chartType = "CHORO_USSTATES";
                        if (this.source.mappings.contains("state")) {
                            chartType = "CHORO_USSTATES";
                        } else if (this.source.mappings.contains("county")) {
                            chartType = "CHORO_USCOUNTIES";
                        } else if (this.source.mappings.contains("country")) {
                            chartType = "CHORO_COUNTRIES";
                        }
                        Promise.all(context.layers.map(function (layer) { return layer.loadedPromise(); })).then(function () {
                            context.loadWidget("../composite/MegaChart", function (widget) {
                                var layers = context.layers.map(function (layer) { return layer.widget; });
                                widget
                                    .id(visualization.id)
                                    .legendPosition_default("none")
                                    .showChartSelect_default(false)
                                    .chartType_default(chartType)
                                    .chartTypeDefaults({
                                        autoScaleMode: layers.length ? "data" : "mesh"
                                    })
                                    .chartTypeProperties({
                                        layers: layers
                                    })
                                ;
                            });
                        });
                        break;
                }
                break;
            case "2DCHART":
            case "PIE":
            case "BUBBLE":
            case "BAR":
            case "WORD_CLOUD":
                this.loadWidget("../composite/MegaChart", function (widget) {
                    widget
                        .id(visualization.id)
                        .legendPosition_default("none")
                        .chartType_default(context.properties.chartType || context.properties.charttype || context.type)
                    ;
                });
                break;
            case "LINE":
                this.loadWidget("../composite/MegaChart", function (widget) {
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
                this.loadWidget("../composite/MegaChart", function (widget) {
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
                this.loadWidget("../form/Slider", function (widget) {
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
                this.loadWidgets(["../graph/Graph"], function (widget) {
                    widget
                        .id(visualization.id)
                        .layout_default("ForceDirected2")
                        .applyScaleOnLayout_default(true)
                    ;
                });
                break;
            case "FORM":
                this.loadWidgets(["../form/Form", "../form/Input", "../form/Button", "../form/CheckBox", "../form/ColorInput", "../form/Radio", "../form/Range", "../form/Select", "../form/Slider", "../form/TextArea"], function (widget, widgetClasses) {
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
                this.loadWidgets(["../other/HeatMap"], function (widget) {
                    widget
                        .id(visualization.id)
                        .image_default(context.properties.imageUrl)
                    ;
                });
                break;
            default:
                this.loadWidget("../common/TextBox", function (widget) {
                    widget
                        .id(visualization.id)
                        .text_default(context.id + "\n" + "TODO:  " + context.type)
                    ;
                });
                break;
        }
    }
    Visualization.prototype = Object.create(Class.prototype);
    Visualization.prototype.constructor = Visualization;

    Visualization.prototype.getQualifiedID = function () {
        return this.id;
    };

    Visualization.prototype.loadedPromise = function () {
        var context = this;
        return new Promise(function (resolve, reject) {
            var intervalHandle = setInterval(function () {
                if (context.isLoaded()) {
                    clearInterval(intervalHandle);
                    resolve();
                }
            }, 100);
        });
    };

    Visualization.prototype.isLoading = function () {
        return this.widget === null;
    };

    Visualization.prototype.isLoaded = function () {
        return this.widget instanceof Widget;
    };

    Visualization.prototype.loadWidget = function (widgetPath, callback) {
        this.loadWidgets([widgetPath], callback);
    };

    Visualization.prototype.loadWidgets = function (widgetPaths, callback) {
        this.widget = null;

        var context = this;
        require(widgetPaths, function (Widget) {
            var existingWidget = context.dashboard.marshaller._widgetMappings.get(context.id);
            if (existingWidget) {
                if (Widget.prototype._class !== existingWidget._class) {
                    console.log("Unexpected persisted widget type (old persist string?)");
                }
                context.setWidget(existingWidget);
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
        var columns = this.source.getColumns();
        this.widget.columns(columns);
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

    Visualization.prototype.update = function (params) {
        if (!params) {
            var validParams = {};
            var updatedBy = this.getInputVisualizations();
            updatedBy.forEach(function (viz) {
                for (var key in viz._eventValues) {
                    validParams[key] = true;
                }
            });

            var paramsArr = [];
            var datasource = this.source.getDatasource();
            for (var key in datasource.request) {
                if (validParams[key]) {
                    paramsArr.push(datasource.request[key]);
                }
            }
            params = paramsArr.join(", ");
        }

        var titleWidget = null;
        if (!this.parentVisualization) {
            titleWidget = this.widget;
            while (titleWidget && !titleWidget.title) {
                titleWidget = titleWidget.locateParentWidget();
            }
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
        this.update(LOADING);
    };

    Visualization.prototype.on = function (eventID, func) {
        var context = this;
        this.overrideMethod(eventID, function (origFunc, args) {
            origFunc.apply(context, args);
            setTimeout(function () {
                func.apply(context, args);
            }, 0);
        });
        return this;
    };
    
    Visualization.prototype.processEvent = function (eventID, event, row, col, selected) {
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
                                var changed = inViz === context;
                                if (datasourceRequests[dataSource.id].request[key] && datasourceRequests[dataSource.id].request[key] !== inViz._eventValues[key]) {
                                    console.log("Duplicate Filter with mismatched value (defaulting to 'first' or 'first changed' instance):  " + key);
                                    if (changed) {
                                        datasourceRequests[dataSource.id].request[key] = inViz._eventValues[key];
                                        datasourceRequests[dataSource.id].request[key + _CHANGED] = changed;
                                    }
                                } else {
                                    datasourceRequests[dataSource.id].request[key] = inViz._eventValues[key];
                                    datasourceRequests[dataSource.id].request[key + _CHANGED] = changed;
                                }
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

    Visualization.prototype.serializeState = function () {
        return {
            eventValues: this._eventValues
        };
    };

    Visualization.prototype.deserializeState = function (state) {
        if (!state) return;
        this._eventValues = state.eventValues;
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
        if (request && request.refresh !== undefined) { throw "refresh in this request????"; }
        request = request || this.request || {};
        refresh = refresh || false;
        if (!updates) {
            updates = [];
            for (var oKey in this.outputs) {
                var output = this.outputs[oKey];
                output.notify.forEach(function (item) {
                    var viz = this.dashboard.getVisualization(item);
                    var inputs = viz.getInputVisualizations();
                    if (!inputs.length) {
                        updates.push(item);
                        viz.update(LOADING);
                    }
                }, this);
            }
        }

        var context = this;
        this.request.refresh = refresh;
        this.filter.forEach(function (item) {
            this.request[item + _CHANGED] = request[item + _CHANGED] || false;
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
        this.dashboard.marshaller.commsEvent(this, "request", this.request);
        return new Promise(function (resolve, reject) {
            context.comms.call(context.request).then(function (response) {
                var delay = 500 - (Date.now() - now);  //  500 is to allow for all "clear" transitions to complete...
                setTimeout(function () {
                    context.processResponse(response, request, updates);
                    context.dashboard.marshaller.commsEvent(context, "response", context.request, response);
                    ++context._loadedCount;
                    resolve(response);
                }, delay > 0 ? delay : 0);
            }).catch(function (e) {
                context.dashboard.marshaller.commsEvent(context, "error", context.request, e);
                reject(e);
            });
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
                if (!exists(from + _CHANGED, response) || (exists(from + _CHANGED, response) && response[from + _CHANGED].length && response[from + _CHANGED][0][from + _CHANGED])) {
                    this.outputs[key].setData(response[from], request, updates);
                } else {
                    //  TODO - I Suspect there is a HIPIE/Roxie issue here (empty request)
                    this.outputs[key].vizNotify(updates);
                }
            } else if (exists(from, lowerResponse)) {
                console.log("DDL 'DataSource.From' case is Incorrect");
                if (!exists(from + _CHANGED, lowerResponse) || (exists(from + _CHANGED, lowerResponse) && response[from + _CHANGED].length && lowerResponse[from + _CHANGED][0][from + _CHANGED])) {
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

    DataSource.prototype.serializeState = function () {
        return {
            request: this.request
        };
    };

    DataSource.prototype.deserializeState = function (state) {
        if (!state) return;
        this.request = state.request || {};
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

    Dashboard.prototype.loadedPromise = function () {
        return Promise.all(this._visualizationArray.map(function (visualization) { return visualization.loadedPromise(); }));
    };

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

    Dashboard.prototype.fetchData = function () {
        var promises = [];
        for (var key in this.datasources) {
            promises.push(this.datasources[key].fetchData());
        }
        return Promise.all(promises);
    };

    Dashboard.prototype.serializeState = function () {
        var retVal = {
            datasources: {},
            visualizations: {}
        };
        for (var key in this.datasources) {
            retVal.datasources[key] = this.datasources[key].serializeState();
        }
        for (var vizKey in this._visualizations) {
            retVal.visualizations[vizKey] = this._visualizations[vizKey].serializeState();
        }
        return retVal;
    };

    Dashboard.prototype.deserializeState = function (state) {
        if (!state) return;
        for (var key in this.datasources) {
            if (state.datasources[key]) {
                this.datasources[key].deserializeState(state.datasources[key]);
            }
        }
        for (var vizKey in this._visualizations) {
            if (state.visualizations[vizKey]) {
                this._visualizations[vizKey].deserializeState(state.visualizations[vizKey]);
            }
        }
    };

    //  Marshaller  ---
    function Marshaller() {
        Class.call(this);

        this._proxyMappings = {};
        this._widgetMappings = d3.map();
        this._clearDataOnUpdate = true;
        this._propogateClear = false;
        this.id = "Marshaller";
        this._missingDataString = "";
    }
    Marshaller.prototype = Object.create(Class.prototype);
    Marshaller.prototype.constructor = Marshaller;

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
                    context.commsEvent(context, "error", hipieResultName, e);
                });
            }
        }).catch(function (e) {
            context.commsEvent(context, "error", request, e);
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

    Marshaller.prototype.missingDataString = function (_) {
        if (!arguments.length) return this._missingDataString;
        this._missingDataString = _;
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
        this._visualizationArray.forEach(function (ddlViz) {
            ddlViz.on("processEvent", function (eventID, event, row, col, selected) {
                context.vizEvent(ddlViz.widget, eventID, row, col, selected);
            });
        });
        this.ready(callback);
        return this;
    };

    Marshaller.prototype.dashboardsLoaded = function () {
        return Promise.all(this.dashboardArray.map(function (dashboard) { return dashboard.loadedPromise(); }));
    };

    Marshaller.prototype.getVisualizations = function () {
        return this._visualizations;
    };

    Marshaller.prototype.getVisualizationArray = function () {
        return this._visualizationArray;
    };

    Marshaller.prototype.on = function (eventID, func) {
        var context = this;
        this.overrideMethod(eventID, function (origFunc, args) {
            origFunc.apply(context, args);
            func.apply(this, arguments);
        });
        return this;
    };

    Marshaller.prototype.ready = function (callback) {
        if (!callback) {
            return;
        }
        this.dashboardsLoaded().then(function () {
            callback();
        });
    };

    Marshaller.prototype.vizEvent = function (sourceWidget, eventID, row, col, selected) {
        console.log("Marshaller.vizEvent:  " + sourceWidget.id() + "-" + eventID);
    };

    Marshaller.prototype.commsEvent = function (ddlSource, eventID, request, response) {
        switch (eventID) {
            case "request":
                if (window.__hpcc_debug) {
                    console.log("Marshaller.commsEvent:  " + ddlSource.id + "-" + eventID + ":  " + JSON.stringify(request));
                }
                break;
            case "response":
            case "error":
                if (window.__hpcc_debug) {
                    console.log("Marshaller.commsEvent:  " + ddlSource.id + "-" + eventID + ":  " + JSON.stringify(response));
                }
                break;
            default:
                if (window.__hpcc_debug) {
                    console.log("Marshaller.commsEvent:  " + JSON.stringify(arguments));
                }
                break;

        }
    };

    Marshaller.prototype.createDatabomb = function () {
        var retVal = {};
        this.dashboardArray.forEach(function (dashboard) {
            for (var key in dashboard.datasources) {
                var comms = dashboard.datasources[key].comms;
                retVal[key] = {};
                for (var key2 in comms._hipieResults) {
                    var hipieResult = comms._hipieResults[key2];
                    retVal[key][key2] = comms._resultNameCache[hipieResult.from];
                }
            }
        });
        return retVal;
    };

    Marshaller.prototype.fetchData = function () {
        var promises = this.dashboardArray.map(function (dashboard) {
            return dashboard.fetchData();
        });
        return Promise.all(promises);
    };

    Marshaller.prototype.serializeState = function () {
        var retVal = {};
        this.dashboardArray.forEach(function (dashboard, idx) {
            retVal[dashboard.id] = dashboard.serializeState();
        });
        return retVal;
    };

    Marshaller.prototype.deserializeState = function (state) {
        if (!state) return;
        this.dashboardArray.forEach(function (dashboard, idx) {
            dashboard.deserializeState(state[dashboard.id]);
        });
        return this;
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
