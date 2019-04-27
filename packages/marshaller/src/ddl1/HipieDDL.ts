import { Class, Database, Utility, Widget } from "@hpcc-js/common";
import { MultiChart } from "@hpcc-js/composite";
import { DDL1 } from "@hpcc-js/ddl-shim";
import { Comms, Table } from "@hpcc-js/other";
import { map as d3Map } from "d3-collection";

declare const require: any;

const LOADING = "...loading...";
const _CHANGED = "_changed";

function faCharFix(faChar) {
    if (faChar) {
        return String.fromCharCode(parseInt(faChar));
    }
    return faChar;
}

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
        case "dataset":
            return "dataset";
        case "visualization":
            return "widget";
        default:
            if (hipieType) {
                if (hipieType.indexOf("unsigned") === 0) {
                    return "number";
                } else if (hipieType.indexOf("integer") === 0) {
                    return "number";
                } else if (hipieType.indexOf("real") === 0) {
                    return "number";
                } else if (hipieType.indexOf("string") === 0) {
                    return "string";
                }
            }
    }
    if ((window as any).__hpcc_debug) {
        console.log("unknown hipieType:  " + hipieType);
    }
    return "string";
}

//  Mappings ---
function SourceMappings(this: any, visualization, mappings) {
    this.visualization = visualization;
    const newMappings = {};
    for (const key in mappings) {
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

SourceMappings.prototype.init = function () {
    for (const key in this.mappings) {
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

SourceMappings.prototype.init = function () {
    for (const key in this.mappings) {
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

SourceMappings.prototype.getFields = function () {
    if (this.visualization.fields()) {
        return Object.keys(this.mappings).map(key => {
            const field = this.visualization.field(key);
            if (!field) console.log("Unknown mapping field:  " + key);
            return new Database.Field(field.id())
                .type(field.jsType())
                .label(this.reverseMappings[field.id()])
                ;
        });
    }
    return null;
};

SourceMappings.prototype.contains = function (key) {
    return this.mappings[key] !== undefined;
};

SourceMappings.prototype.doMap = function (item) {
    const retVal = [];
    for (const key in this.mappings) {
        const rhsKey = this.mappings[key];
        try {
            let val = item[rhsKey];
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

SourceMappings.prototype.doReverseMap = function (item) {
    const retVal = {};
    for (const key in this.mappings) {
        const rhsKey = this.mappings[key];
        try {
            let val = item[key];
            if (val === undefined) {
                val = item[key.toLowerCase()];
            }
            retVal[rhsKey] = val;
        } catch (e) {
            console.log("Invalid Mapping:  " + this.visualization.id + " [" + key + "->" + item + "]");
        }
    }
    return retVal;
};

SourceMappings.prototype.doMapAll = function (data) {
    return data.hipieMappings(this.columnsRHS.map(col => {
        return this.visualization.field(col);
    }), this.visualization.dashboard.marshaller.missingDataString());
};

SourceMappings.prototype.getMap = function (key) {
    return this.mappings[key];
};

SourceMappings.prototype.getReverseMap = function (key) {
    return this.reverseMappings[key];
};

SourceMappings.prototype.hipieMapSortArray = function (sort) {
    return sort.map(sortField => {
        let reverse = false;
        if (sortField.indexOf("-") === 0) {
            sortField = sortField.substring(1);
            reverse = true;
        }
        const fieldIdx = this.columnsRHS.indexOf(sortField);
        if (fieldIdx < 0) {
            console.log("SourceMappings.prototype.hipieMapSortArray:  Invalid sort array - " + sortField);
        }
        return {
            idx: fieldIdx,
            reverse
        };
    }).filter(function (d) { return d.idx >= 0; });
};

function ChartMappings(this: any, visualization, mappings) {
    SourceMappings.call(this, visualization, mappings);
    this.columns = ["label", "weight"];
    this.columnsIdx = { label: 0, weight: 1 };
    this.init();
}
ChartMappings.prototype = Object.create(SourceMappings.prototype);

function ChoroMappings(this: any, visualization, mappings) {
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

function ChoroMappings2(this: any, visualization, mappings) {
    SourceMappings.call(this, visualization, mappings);
    if (mappings.state) {
        this.columns = ["state"];
        this.columnsIdx = { state: 0 };
    } else if (mappings.county) {
        this.columns = ["county"];
        this.columnsIdx = { county: 0 };
    } else if (mappings.geohash) {
        this.columns = ["geohash", "label"];
        this.columnsIdx = { geohash: 0, label: 1 };
    }
    const weightOffset = this.columns.length;
    if (mappings.weight instanceof Array) {
        mappings.weight.forEach((w, i) => {
            this.columns.push(w);
            this.columnsIdx[i === 0 ? "weight" : "weight_" + i] = i + weightOffset;
        });
    }
    this.init();
}
ChoroMappings2.prototype = Object.create(SourceMappings.prototype);

function HeatMapMappings(this: any, visualization, mappings) {
    SourceMappings.call(this, visualization, mappings);
    this.columns = ["x", "y", "weight"];
    this.columnsIdx = { x: 0, y: 1, weight: 2 };
    this.init();
}
HeatMapMappings.prototype = Object.create(SourceMappings.prototype);

function LineMappings(this: any, visualization, mappings) {
    const newMappings = {
        label: mappings.x[0]
    };
    mappings.y.forEach(function (item, idx) {
        newMappings[item] = item;
    });
    SourceMappings.call(this, visualization, newMappings);
    this.init();
}
LineMappings.prototype = Object.create(SourceMappings.prototype);

function TableMappings(this: any, visualization, mappings) {
    const newMappings = {};
    for (const key in mappings) {
        mappings[key].forEach(function (mapingItem, idx) {
            newMappings[visualization.label[idx]] = mapingItem;
        });
    }
    SourceMappings.call(this, visualization, newMappings);
    this.init();
}
TableMappings.prototype = Object.create(SourceMappings.prototype);

TableMappings.prototype.init = function () {
    this.visualization.label.forEach((label, idx) => {
        this.reverseMappings[this.mappings[label]] = label;
        this.columns.push(label);
        this.columnsIdx[label] = idx;
        this.columnsRHS[idx] = this.mappings[label];
        this.columnsRHSIdx[this.mappings[label]] = idx;
        this.hasMappings = true;
    });
};

TableMappings.prototype.doMapAll = function (data) {
    let retVal = SourceMappings.prototype.doMapAll.apply(this, arguments);
    if (retVal instanceof Array) {
        const columnsRHSIdx = this.visualization.source.getColumnsRHSIdx();
        this.visualization.fields().forEach(field => {
            const fieldType = field.jsType();
            const colIdx = columnsRHSIdx[field.id()];
            if (colIdx === undefined) {
                console.log("Invalid Mapping:  " + field.id());
            } else {
                retVal = retVal.map((row) => {
                    let cell = row[colIdx];
                    if (cell && cell.Row) {
                        cell = cell.Row;
                    }
                    if (cell instanceof Array) {
                        switch (fieldType) {
                            case "dataset":
                                const columns = [];
                                const columnsIdx = {};
                                const data2 = cell.map(function (row2, idx) {
                                    const retVal2 = [];
                                    retVal2.length = columns.length;
                                    for (const key in row2) {
                                        if (idx === 0) {
                                            columnsIdx[key] = columns.length;
                                            columns.push(key);
                                        }
                                        retVal2[columnsIdx[key]] = row2[key];
                                    }
                                    return retVal2;
                                });
                                const table = new Table()
                                    .columns(columns)
                                    .data(data2)
                                    ;
                                row[colIdx] = table;
                                break;
                            case "widget":
                                const viz = this.visualization.vizDeclarations[field.localVisualizationID()];
                                const output = viz.source.getOutput();
                                const db = output.db;
                                output.setData(cell, []);
                                const widget = viz.widget;
                                const newWidget = new widget.constructor()
                                    .showToolbar(false)
                                    .chartType(widget.chartType())
                                    .chartTypeDefaults(widget.chartTypeDefaults())
                                    .columns(viz.source.getColumns())
                                    .data(viz.source.getData())
                                    ;
                                output.db = db;
                                row[colIdx] = newWidget;
                                break;
                        }
                    }
                    return row;
                });
            }
        });
    }
    return retVal;
};

function GraphMappings(this: any, visualization, mappings, link) {
    SourceMappings.call(this, visualization, mappings);
    this.icon = visualization.icon || {};
    this.fields = visualization.fields();
    this.columns = ["uid", "label", "weight", "flags"];
    this.columnsIdx = { uid: 0, label: 1, weight: 2, flags: 3 };
    this.init();
    this.link = link;
    this.linkMappings = new SourceMappings(visualization, this.link.mappings);
    this.linkMappings.columns = ["uid"];
    this.linkMappings.columnsIdx = { uid: 0, label: 1 };
    this.visualization = visualization;
}
GraphMappings.prototype = Object.create(SourceMappings.prototype);

GraphMappings.prototype.calcIconInfo = function (flag, origItem, forAnnotation) {
    const retVal = {};
    function mapStruct(struct, retVal2) {
        if (struct) {
            for (const key in struct) {
                switch (key) {
                    case "faChar":
                        retVal2.faChar = faCharFix(struct.faChar);
                        break;
                    default:
                        if (forAnnotation && key.indexOf("icon_") === 0) { //  Backward compatability
                            console.log("Deprecated flag property:  " + key);
                            retVal2[key.split("icon_")[1]] = struct[key];
                        } else {
                            retVal2[key] = struct[key];
                        }
                }
            }
        }
    }
    if (origItem && origItem[flag.fieldid] && flag.valuemappings) {
        const annotationInfo = flag.valuemappings[origItem[flag.fieldid]];
        mapStruct(annotationInfo, retVal);
    }

    for (const _key in retVal) { // jshint ignore:line
        return retVal;
    }
    return null;
};

GraphMappings.prototype.doMapAll = function (db) {
    const data = db.jsonObj();
    const context = this;
    const vertexMap = {};
    const vertices = [];
    const megaChart = this.visualization.widget;
    const graph = megaChart.chart();
    function getVertex(item, origItem?) {
        const id = "uid_" + item[0];
        let retVal = vertexMap[id];
        if (!retVal && origItem) {
            retVal = new graph.Vertex()
                .faChar((context.icon && context.icon.faChar ? faCharFix(context.icon.faChar) : "\uf128"))
                .text(item[1] ? item[1] : "")
                .data(item)
                ;
            retVal.__hpcc_uid = item[0];
            vertexMap[id] = retVal;
            vertices.push(retVal);

            //  Icon  ---
            const iconInfo = context.calcIconInfo(context.visualization.icon, origItem, false);
            if (iconInfo) {
                for (const key in iconInfo) {
                    if (retVal[key]) {
                        retVal[key](iconInfo[key]);
                    }
                }
            }

            // Annotations  ---
            const annotations = [];
            context.visualization.flags.forEach(function (flag) {
                const iconInfo2 = context.calcIconInfo(flag, origItem, true);
                if (iconInfo2) {
                    annotations.push(iconInfo2);
                }
            });
            retVal.annotationIcons(annotations);
        }
        return retVal;
    }
    const edges = [];
    data.forEach(function (item) {
        const mappedItem = context.doMap(item);
        getVertex(mappedItem, item);
    });
    data.forEach(function (item) {
        const mappedItem = context.doMap(item);
        const vertex = getVertex(mappedItem, item);
        if (item[context.link.childfile] && item[context.link.childfile] instanceof Array) {
            const childItems = item[context.link.childfile];
            childItems.forEach(function (childItem, i) {
                const childMappedItem = context.linkMappings.doMap(childItem);
                const childVertex = getVertex(childMappedItem);
                if (childVertex && vertex.id() !== childVertex.id()) {
                    const edge = new graph.Edge()
                        .sourceVertex(vertex)
                        .targetVertex(childVertex)
                        .sourceMarker("circle")
                        .targetMarker("arrow")
                        .text(childMappedItem[1] ? childMappedItem[1] : "")
                        .data(childMappedItem)
                        ;
                    const linkcolor = graph.linkcolor_default();
                    if (linkcolor && linkcolor.fieldid) {
                        edge.strokeColor(childItem[linkcolor.fieldid]);
                    }
                    const linktooltip = graph.linkcolor_default();
                    if (linktooltip && linktooltip.fieldid) {
                        edge.tooltip(childItem[linktooltip.fieldid]);
                    }
                    edges.push(edge);
                }
            });
        }
    });
    return { vertices, edges, merge: false };
};

//  Viz Source ---
function Source(this: any, visualization, source) {
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
                    this.mappings = new ChoroMappings2(this.visualization, source.mappings);
                    if (source.mappings.weight.length > 1) {
                        this.visualization.type = "LINE";
                    }
                } else {
                    this.mappings = new ChoroMappings(this.visualization, source.mappings);
                }
                break;
            case "HEAT_MAP":
                this.mappings = new HeatMapMappings(this.visualization, source.mappings);
                break;
            default:
                this.mappings = new ChartMappings(this.visualization, source.mappings);
                break;
        }
        this.first = source.first;
        this.reverse = source.reverse;
        this.sort = source.sort;
        this.properties = source.properties;
    }
}

Source.prototype.getQualifiedID = function () {
    return this.visualization.getQualifiedID() + "." + this._id;
};

Source.prototype.exists = function () {
    return this._id;
};

Source.prototype.getDatasource = function () {
    return this.visualization.dashboard.getDatasource(this._id);
};

Source.prototype.getOutput = function () {
    const datasource = this.getDatasource();
    if (datasource && datasource._outputs) {
        return datasource._outputs[this._output];
    }
    return null;
};

Source.prototype.hasData = function () {
    return this.getOutput().db ? true : false;
};

Source.prototype.getFields = function () {
    return this.mappings.getFields();
};

Source.prototype.getColumnsRHS = function () {
    return this.mappings.columnsRHS;
};

Source.prototype.getColumnsRHSIdx = function () {
    return this.mappings.columnsRHSIdx;
};

Source.prototype.getColumns = function () {
    return this.mappings && this.mappings.columns ? this.mappings.columns : [];
};

Source.prototype.getData = function () {
    const db = this.getOutput().db;
    const retVal = this.mappings.doMapAll(db);
    if (retVal.length && this.sort) {
        Utility.multiSort(retVal, this.mappings.hipieMapSortArray(this.sort));
    }
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
    return this.mappings.columns.filter(function (d, i) { return i > 0; }).join(" / ");
};

Source.prototype.getMap = function (col) {
    return (this.mappings && this.mappings.hasMappings) ? this.mappings.getMap(col) : col;
};

Source.prototype.getReverseMap = function (col) {
    return (this.mappings && this.mappings.hasMappings) ? this.mappings.getReverseMap(col) : col;
};

//  Viz Events ---
function EventUpdate(this: any, event, update, defMappings) {
    this.event = event;
    this.dashboard = event.visualization.dashboard;
    this._col = update.col;
    this._visualization = update.visualization;
    this._instance = update.instance;
    this._datasource = update.datasource;
    this._merge = update.merge;
    this._mappings = update.mappings || defMappings;
}

EventUpdate.prototype.getDatasource = function () {
    return this.dashboard.getDatasource(this._datasource);
};

EventUpdate.prototype.getVisualization = function () {
    return this.dashboard.getVisualization(this._visualization);
};

EventUpdate.prototype.mapData = function (row) {
    const retVal = {};
    if (row) {
        for (const key in this._mappings) {
            const origKey = this.getReverseMap(key);
            retVal[this._mappings[key]] = row[origKey];
        }
    }
    return retVal;
};

EventUpdate.prototype.getMap = function (col) {
    return this.event.visualization.source.getMap(col);
};

EventUpdate.prototype.getReverseMap = function (col) {
    return this.event.visualization.source.getReverseMap(col);
};

EventUpdate.prototype.selectedRow = function () {
    if (this.event.visualization.hasSelection()) {
        return this.event.visualization._widgetState.row;
    }
    return {};
};

EventUpdate.prototype.mapSelected = function () {
    return this.mapData(this.selectedRow());
};

EventUpdate.prototype.calcRequestFor = function (visualization) {
    const retVal = {};
    const updateVisualization = this.getVisualization();
    updateVisualization.getInputVisualizations().forEach(function (inViz, idx) {
        //  Calc request for each visualization to be updated  ---
        const changed = inViz === visualization;
        inViz.getUpdatesForVisualization(updateVisualization).forEach(function (inVizUpdateObj) {
            //  Gather all contributing "input visualization events" for the visualization that is to be updated  ---
            const inVizRequest = inVizUpdateObj.mapSelected();
            for (const key in inVizRequest) {
                if (retVal[key] && retVal[key] !== inVizRequest[key]) {
                    console.log("Duplicate Filter with mismatched value (defaulting to 'first' or 'first changed' instance):  " + key);
                    if (changed) {
                        retVal[key] = inVizRequest[key];
                        retVal[key + _CHANGED] = changed;
                    }
                } else {
                    retVal[key] = inVizRequest[key];
                    retVal[key + _CHANGED] = changed;
                }
            }
        });
    });
    return retVal;
};

function Event(this: any, visualization, eventID, event) {
    this.visualization = visualization;
    this.eventID = eventID;
    this._updates = [];
    this._mappings = event.mappings;
    if (event) {
        this._updates = event.updates.map(updateInfo => {
            return new EventUpdate(this, updateInfo, event.mappings);
        });
    }
}

Event.prototype.exists = function () {
    return this._updates.length;
};

Event.prototype.getUpdates = function () {
    return this._updates.filter(updateInfo => {
        if (!updateInfo._col) return true;
        return updateInfo._col === updateInfo.getMap(this.visualization._widgetState.col);
    });
};

Event.prototype.getUpdatesDatasources = function () {
    const dedup = {};
    const retVal = [];
    this.getUpdatesVisualizations().forEach(function (item, idx) {
        const datasource = item.source.getDatasource();
        if (datasource && !dedup[datasource.id]) {
            dedup[datasource.id] = true;
            retVal.push(datasource);
        }
    }, this);
    return retVal;
};

Event.prototype.getUpdatesVisualizations = function () {
    const dedup = {};
    const retVal = [];
    this._updates.forEach(function (updateObj, idx) {
        const visualization = updateObj.getVisualization();
        if (!dedup[visualization.id]) {
            dedup[visualization.id] = true;
            retVal.push(visualization);
        }
    }, this);
    return retVal;
};

Event.prototype.fetchData = function () {
    const fetchDataOptimizer = new VisualizationRequestOptimizer();
    this.getUpdates().forEach(updateObj => {
        fetchDataOptimizer.appendRequest(updateObj.getDatasource(), updateObj.calcRequestFor(this.visualization), updateObj.getVisualization());
    });
    return fetchDataOptimizer.fetchData();
};

function Events(this: any, visualization, events) {
    this.visualization = visualization;
    this.events = {};
    for (const key in events) {
        this.events[key] = new Event(visualization, key, events[key]);
    }
}

Events.prototype.setWidget = function (widget) {
    const context = this;
    for (const key in this.events) {
        if (widget["vertex_" + key]) {
            widget["vertex_" + key] = function (row, col, selected) {
                context.visualization.processEvent(key, context.events[key], row, col, selected);
            };
        }
        if (widget[key]) {
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
    let retVal = [];
    for (const key in this.events) {
        retVal = retVal.concat(this.events[key].getUpdates());
    }
    return retVal;
};

Events.prototype.getUpdatesDatasources = function () {
    let retVal = [];
    for (const key in this.events) {
        retVal = retVal.concat(this.events[key].getUpdatesDatasources());
    }
    return retVal;
};

Events.prototype.getUpdatesVisualizations = function () {
    let retVal = [];
    for (const key in this.events) {
        retVal = retVal.concat(this.events[key].getUpdatesVisualizations());
    }
    return retVal;
};

//  Visualization Field---
function Field(this: any, ddlField) {
    this._id = ddlField.id;
    this._label = ddlField.label;
    this._properties = ddlField.properties || {};
}
Field.prototype = Object.create(Class.prototype);
Field.prototype.constructor = Field;

Field.prototype.id = function () {
    return this._id;
};

Field.prototype.label = function () {
    return this._properties.label || this._label;
};

Field.prototype.type = function () {
    return this._properties.type || "";
};

Field.prototype.jsType = function () {
    return hipieType2DBType(this.type());
};

Field.prototype.charttype = function (_) {
    if (!arguments.length) return this._properties.charttype || "";
    this._properties.charttype = _;
    return this;
};

Field.prototype.localVisualizationID = function () {
    return this._properties.localVisualizationID || "";
};

Field.prototype.enumvals = function () {
    return this._properties.enumvals;    //  Return undefined if non existent
};

Field.prototype.hasDefault = function () {
    return this.default() !== undefined;
};

Field.prototype.default = function () {
    if (this.type() === "range") {
        return this._properties.default || ["", ""];
    }
    if (this._properties.default instanceof Array && this._properties.default.length) {
        return this._properties.default[0];
    }
    return this._properties.default || "";
};

Field.prototype.hasFunction = function () {
    return this.function() !== undefined;
};

Field.prototype.function = function () {
    return this._properties.function;
};

Field.prototype.params = function () {
    const retVal = [];
    const params = this._properties.params || {};
    for (const key in params) {
        retVal.push(params[key]);
    }
    return retVal;
};

Field.prototype.properties = function () {
    return this._properties;
};

//  Visualization ---
function requirePromise(this: any, packageID) {
    return new Promise((resolve, reject) => {
        if (require) {
            require([packageID], Package => {
                resolve.call(this, Package);
            });
        } else {
            reject("No require.");
        }
    });
}

function legacyRequire(this: any, packageArr, callback) {
    const promises = packageArr.map(function (packageID) {
        if (packageID.indexOf("../") === 0) {
            const parts = packageID.split("/");
            return requirePromise("@hpcc-js/" + parts[1]).then(function (Package) {
                return Package[parts[2]];
            });
        }
        return requirePromise(packageID);
    });
    Promise.all(promises).then(packages => {
        callback.apply(this, packages);
    });
}

export class Visualization extends Class {
    protected dashboard;
    parentVisualization;
    protected type;
    protected id;
    protected label;
    protected icon;
    protected flags;
    protected title;
    protected _fields;
    protected _fieldsMap;
    properties;
    protected source;
    protected events;
    protected layers;
    protected hasVizDeclarations;
    protected vizDeclarations;
    widget;
    protected _widgetState;

    constructor(dashboard, visualization, parentVisualization) {
        super();

        this.dashboard = dashboard;
        this.parentVisualization = parentVisualization;
        this.type = visualization.type;
        this.id = visualization.id;

        switch (this.type) {
            case "TABLE":
                this.label = (visualization).label;
                break;
            case "GRAPH":
                this.label = (visualization).label;
                this.icon = (visualization).icon || { faChar: "\uf128" };
                this.flags = (visualization).flag || [];
                break;
        }
        this.title = visualization.title || visualization.id;
        this._fields = (visualization.fields || []).map(function (field) {
            return new Field(field);
        });
        this._fieldsMap = {};
        this._fields.forEach(field => {
            this._fieldsMap[field.id()] = field;
        });

        this.properties = visualization.properties || (visualization.source ? visualization.source.properties : null) || {};
        this.source = new Source(this, visualization.source);
        this.events = new Events(this, visualization.events);
        this.layers = [];
        this.hasVizDeclarations = false;
        this.vizDeclarations = {};
        if (this.type === "CHORO") {
            this.layers = (visualization.visualizations || []).map(innerViz => {
                return dashboard.createVisualization(innerViz, this);
            });
        } else {
            (visualization.visualizations || []).forEach(innerViz => {
                this.vizDeclarations[innerViz.id] = dashboard.createVisualization(innerViz, this);
                this.hasVizDeclarations = true;
            });
        }
        const context = this;
        switch (this.type) {
            case "CHORO":
                let chartType = visualization.properties && visualization.properties.charttype ? visualization.properties.charttype : "";
                if (parentVisualization) {
                    switch (chartType) {
                        case "MAP_PINS":
                            this.loadWidget("../map/Pins", function (widget) {
                                try {
                                    widget
                                        .id(visualization.id)
                                        .columns(context.source.getColumns())
                                        .geohashColumn("geohash")
                                        .tooltipColumn("label")
                                        .fillColor(visualization.color ? visualization.color : null)
                                        .projection("albersUsaPr")
                                        ;
                                } catch (e) {
                                    console.log("Unexpected widget type:  " + widget.classID());
                                }
                            });
                            break;
                    }
                } else {
                    chartType = chartType || "CHORO";
                    if (chartType === "CHORO") {
                        if (this.source.mappings.contains("state")) {
                            chartType = "CHORO_USSTATES";
                        } else if (this.source.mappings.contains("county")) {
                            chartType = "CHORO_USCOUNTIES";
                        } else if (this.source.mappings.contains("country")) {
                            chartType = "CHORO_COUNTRIES";
                        }
                    }
                    Promise.all(context.layers.map(function (layer) { return layer.loadedPromise(); })).then(function () {
                        context.loadWidget("../composite/MegaChart", function (widget) {
                            const layers = context.layers.map(function (layer) { return layer.widget; });
                            try {
                                switch (widget.classID()) {
                                    case "composite_MegaChart":
                                        widget
                                            .id(visualization.id)
                                            .showChartSelect_default(false)
                                            .chartType_default(chartType)
                                            .chartTypeDefaults({
                                                autoScaleMode: layers.length ? "data" : "mesh"
                                            })
                                            .chartTypeProperties({
                                                layers
                                            })
                                            ;
                                        break;
                                    default:
                                        widget
                                            .id(visualization.id)
                                            .autoScaleMode(layers.length ? "data" : "mesh")
                                            .layers(layers)
                                            ;
                                        break;
                                }
                            } catch (e) {
                                console.log("Unexpected widget type:  " + widget.classID());
                            }
                        });
                    });
                }
                break;
            case "2DCHART":
            case "PIE":
            case "BUBBLE":
            case "BAR":
            case "WORD_CLOUD":
                this.loadWidget("../composite/MegaChart", function (widget) {
                    try {
                        widget
                            .id(visualization.id)
                            .chartType_default(context.properties.chartType || context.properties.charttype || context.type)
                            ;
                    } catch (e) {
                        console.log("Unexpected widget type:  " + widget.classID());
                    }
                });
                break;
            case "LINE":
                this.loadWidget("../composite/MegaChart", function (widget) {
                    try {
                        widget
                            .id(visualization.id)
                            .chartType_default(context.properties.chartType || context.properties.charttype || context.type)
                            ;
                    } catch (e) {
                        console.log("Unexpected widget type:  " + widget.classID());
                    }
                });
                break;
            case "TABLE":
                this.loadWidget("../composite/MegaChart", function (widget) {
                    try {
                        widget
                            .id(visualization.id)
                            .showChartSelect_default(false)
                            .chartType_default("TABLE")
                            ;
                    } catch (e) {
                        console.log("Unexpected widget type:  " + widget.classID());
                    }
                });
                break;
            case "SLIDER":
                this.loadWidget("../form/Slider", function (widget) {
                    try {
                        widget
                            .id(visualization.id)
                            ;
                        if (visualization.range) {
                            let selectionLabel = "";
                            if (Utility.exists("events.click.updates", visualization) && visualization.events.click.updates.length) {
                                for (const key in visualization.events.click.updates[0].mappings) {
                                    selectionLabel = key;
                                    break;
                                }
                            }
                            widget
                                .low_default(+visualization.range[0])
                                .high_default(+visualization.range[1])
                                .step_default(+visualization.range[2])
                                .selectionLabel_default(selectionLabel)
                                .selectionLabel(selectionLabel)
                                ;
                        }
                    } catch (e) {
                        console.log("Unexpected widget type:  " + widget.classID());
                    }
                });
                break;
            case "GRAPH":
                this.loadWidget("../composite/MegaChart", function (widget) {
                    try {
                        widget
                            .id(visualization.id)
                            .showChartSelect_default(false)
                            .chartType_default("GRAPH")
                            .chartTypeDefaults({
                                layout: "ForceDirected2",
                                applyScaleOnLayout: true
                            })
                            ;
                    } catch (e) {
                        console.log("Unexpected widget type:  " + widget.classID());
                    }
                });
                break;
            case "FORM":
                this.loadWidgets(["../form/Form", "../form/Input", "../form/Button", "../form/CheckBox", "../form/ColorInput", "../form/Radio", "../form/Range", "../form/Select", "../form/Slider", "../form/TextArea", "../form/InputRange"], function (widget, widgetClasses) {
                    const Input = widgetClasses[1];
                    const CheckBox = widgetClasses[3];
                    const Radio = widgetClasses[5];
                    const Select = widgetClasses[7];
                    const TextArea = widgetClasses[9];
                    const InputRange = widgetClasses[10];

                    try {
                        widget
                            .id(visualization.id)
                            .inputs(context.fields().map(function (field) {

                                const selectOptions = [];
                                let options = [];
                                let inp;
                                if (!field.charttype() && field.type() === "range") {
                                    //  TODO - Verify with @DL
                                    field.charttype("RANGE");
                                }
                                switch (field.charttype()) {
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
                                    case "RANGE":
                                        inp = new InputRange();
                                        break;
                                    default:
                                        if (field.enumvals()) {
                                            inp = new Select();
                                            options = field.enumvals();
                                            for (const val in options) {
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
                                    .name_default(field.id())
                                    .label_default(field.label())
                                    .value_default(field.default()) // TODO Hippie support for multiple default values (checkbox only)
                                    ;

                                if (inp instanceof CheckBox || inp instanceof Radio) { // change this to instanceof?
                                    const vals = Object.keys(field.enumvals());
                                    inp.selectOptions_default(vals);
                                } else if (selectOptions.length) {
                                    inp.selectOptions_default(selectOptions);
                                }

                                return inp;
                            }))
                            ;
                    } catch (e) {
                        console.log("Unexpected widget type:  " + widget.classID());
                    }
                });
                break;
            case "HEAT_MAP":
                this.loadWidgets(["../other/HeatMap"], function (widget) {
                    try {
                        widget
                            .id(visualization.id)
                            .image_default(context.properties.imageUrl)
                            ;
                    } catch (e) {
                        console.log("Unexpected widget type:  " + widget.classID());
                    }
                });
                break;
            default:
                this.loadWidget("../common/TextBox", function (widget) {
                    try {
                        widget
                            .id(visualization.id)
                            .text_default(context.id + "\n" + "TODO:  " + context.type)
                            ;
                    } catch (e) {
                        console.log("Unexpected widget type:  " + widget.classID());
                    }
                });
                break;
        }
    }

    getQualifiedID() {
        return this.id;
    }

    fields() {
        return this._fields;
    }

    hasField(id) {
        return this.field[id] !== undefined;
    }

    field(id) {
        return this._fieldsMap[id];
    }

    loadedPromise() {
        const context = this;
        return new Promise(function (resolve, reject) {
            const intervalHandle = setInterval(function () {
                if (context.isLoaded()) {
                    clearInterval(intervalHandle);
                    resolve();
                }
            }, 100);
        });
    }

    isLoading() {
        return this.widget === null;
    }

    isLoaded() {
        return this.widget instanceof Widget;
    }

    loadMegaChartWidget(widgetPath, callback) {
        this.loadWidgets(["../composite/MegaChart", widgetPath], function (megaChart, widgets) {
            const chart = new widgets[1]();
            megaChart
                .chartType_default(MultiChart.prototype._allChartTypesByClass[chart.classID()].id)
                .chart(chart)
                ;
            if (callback) {
                callback(megaChart, chart, widgets);
            }
        });
    }

    loadWidget(widgetPath, callback) {
        this.loadWidgets([widgetPath], callback);
    }

    loadWidgets(widgetPaths, callback) {
        this.widget = null;

        const context = this;
        legacyRequire(widgetPaths, function (WidgetClass) {
            const existingWidget = context.dashboard.marshaller.getWidget(context.id);
            if (existingWidget) {
                if (WidgetClass.prototype._class !== existingWidget.classID()) {
                    console.log("Unexpected persisted widget type (old persist string?)");
                }
                context.setWidget(existingWidget);
            } else {
                context.setWidget(new WidgetClass());
            }
            if (callback) {
                callback(context.widget, arguments);
            }
        });
    }

    setWidget(widget) {
        this.widget = widget;
        this.events.setWidget(widget);
        if (this.widget.columns) {
            const columns = this.source.getColumns();
            this.widget.columns(columns, true);
        }
        for (const key in this.properties) {
            switch (widget.classID()) {
                case "chart_MultiChart":
                case "composite_MegaChart":
                    if (widget[key + "_default"]) {
                        widget[key + "_default"](this.properties[key]);
                    }
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
    }

    accept(visitor) {
        visitor.visit(this);
    }

    getUpdates() {
        return this.events.getUpdates();
    }

    getUpdatesForDatasource(otherDatasource) {
        return this.events.getUpdates().filter(function (updateObj) {
            return updateObj.getDatasource() === otherDatasource;
        });
    }

    getUpdatesForVisualization(otherViz) {
        return this.events.getUpdates().filter(function (updateObj) {
            return updateObj.getVisualization() === otherViz;
        });
    }

    getInputFields(mapped?): any {
        const retVal = {};
        const updatedBy = this.getInputVisualizations();
        updatedBy.forEach(viz => {
            if (viz.hasSelection()) {
                viz.getUpdatesForVisualization(this).forEach(function (updateObj) {
                    const sel = mapped ? updateObj.mapSelected() : updateObj.selectedRow();
                    for (const key in sel) {
                        retVal[key] = sel[key];
                    }
                });
            }
        });
        return retVal;
    }

    update(params?) {
        let titleWidget = null;
        if (!this.parentVisualization) {
            titleWidget = this.widget;
            while (titleWidget && !titleWidget.title) {
                titleWidget = titleWidget.locateParentWidget();
            }
        }

        if (!params) {
            params = "";
            let titleFormatStr = "";
            if (titleWidget && titleWidget.ddlParamsFormat) {
                titleFormatStr = titleWidget.ddlParamsFormat();
            }

            const dedupParams = {};
            if (titleFormatStr) {
                params = Utility.template(titleFormatStr, this.getInputFields());
            } else {
                const paramsArr = [];
                const mappedData = this.getInputFields(true);
                for (const key in mappedData) {
                    if (mappedData[key]) {
                        if (!dedupParams[key]) {
                            dedupParams[key] = true;
                            paramsArr.push(mappedData[key]);
                        }
                    }
                }
                params = paramsArr.join(", ");
            }
        }

        const context = this;
        return new Promise(function (resolve, reject) {
            if (titleWidget) {
                let title = titleWidget.title();
                const titleParts = title.split(" (");
                if (titleParts[0] === "" && titleParts.length > 1) {
                    title = params.trim();
                } else {
                    title = titleParts[0] + (params.trim() ? " (" + params + ")" : "");
                }
                titleWidget
                    .title(title)
                    .render(function () {
                        resolve();
                    })
                    ;
            } else {
                let ddlViz = context;
                while (ddlViz.parentVisualization) {
                    ddlViz = ddlViz.parentVisualization;
                }
                ddlViz.widget.render(function () {
                    resolve();
                });
            }
            if (context.dashboard.marshaller.propogateClear()) {
                context.events.getUpdatesVisualizations().forEach(function (updatedViz) {
                    updatedViz.update();
                });
            }
        });
    }

    notify() {
        if (this.widget) {
            const data = this.source.hasData() ? this.source.getData() : [];
            this.widget.data(data);
            if (this.type === "GRAPH" && data.vertices) {
                const ipFields = this.getInputFields(true);
                data.vertices.filter(function (v) {
                    return v.__hpcc_uid === ipFields.treeuid;
                }).forEach(function (v) {
                    v.centroid(true);
                });
            }
            return this.update();
        }
        return Promise.resolve();
    }

    clear() {
        this._widgetState = {
            row: {},
            selected: false
        };
        this.fields().forEach(field => {
            if (field.hasDefault()) {
                this._widgetState.row[field.id()] = field.default();
                this._widgetState.selected = true;
            }
        });
        if (this.widget && this.dashboard.marshaller.clearDataOnUpdate()) {
            this.widget.data([]);
        }
        if (this.dashboard.marshaller.propogateClear()) {
            this.events.getUpdatesVisualizations().forEach(function (updatedViz) {
                updatedViz.clear();
            });
        }
    }

    on(eventID, func) {
        const context = this;
        this.overrideMethod(eventID, function (origFunc, args) {
            origFunc.apply(context, args);
            setTimeout(function () {
                func.apply(context, args);
            }, 0);
        });
        return this;
    }

    calcRequestFor(visualization) {
        let retVal = {};
        this.getUpdatesForVisualization(visualization).forEach(function (updatesObj) {
            //  TODO:  When we support more than "click" this will need enhancment...
            retVal = updatesObj.calcRequestFor(visualization);
        });
        return retVal;
    }

    processEvent(eventID, event, row, col, selected) {
        this._widgetState = {
            row,
            col,
            selected: selected === undefined ? true : selected
        };
        const context = this;
        setTimeout(function () {
            event.fetchData().then(function (promises) {
                context.dashboard.marshaller.vizEvent(context.widget, "post_" + eventID, row, col, selected);
            });
        }, 0);
    }

    hasSelection() {
        return this._widgetState && this._widgetState.selected;
    }

    selection() {
        if (this.hasSelection()) {
            return this._widgetState.row;
        }
        return null;
    }

    reverseMappedSelection() {
        if (this.hasSelection()) {
            return this.source.mappings ? this.source.mappings.doReverseMap(this._widgetState.row) : this._widgetState.row;
        }
        return null;
    }

    getInputVisualizations() {
        return this.dashboard.marshaller.getVisualizationArray().filter(viz => {
            const updates = viz.events.getUpdatesVisualizations();
            if (updates.indexOf(this) >= 0) {
                return true;
            }
            return false;
        });
    }

    serializeState() {
        const state: any = {
            widgetState: this._widgetState
        };
        if (this.widget) {
            if (this.widget.serializeState) {
                state.widget = this.widget.serializeState();
            } else if (this.widget.data) {
                state.widget = {
                    data: this.widget.data()
                };
            }
        }
        return state;
    }

    deserializeState(state) {
        if (state) {
            this._widgetState = state.widgetState;
            if (this.widget && state.widget) {
                if (this.widget.deserializeState) {
                    this.widget.deserializeState(state.widget);
                } else if (this.widget.data && state.widget.data) {
                    this.widget.data(state.widget.data);
                }
            }
        }
        return this;
    }
}

//  Output  ---
function Filter(this: any, datasource, ddlFilter: string | DDL1.IFilter) {
    this.datasource = datasource;
    if (typeof ddlFilter === "string") {
        ddlFilter = {
            fieldid: ddlFilter,
            nullable: true,
            rule: "=="
        };
    }
    this.fieldid = ddlFilter.fieldid;
    this.nullable = ddlFilter.nullable;
    this.rule = ddlFilter.rule || "==";
    this.minid = ddlFilter.minid;
    this.maxid = ddlFilter.maxid;
    this.calcRequestFieldID();
}

Filter.prototype.calcRequestFieldID = function () {
    this._requestFieldID = this.fieldid;
    this._requestMinID = this.minid;
    this._requestMaxID = this.maxid;
    switch (this.rule) {
        case "<":
        case "<=":
            if (Utility.endsWith(this.fieldid, "-max")) {
                this._requestFieldID = this.fieldid.substring(0, this.fieldid.length - 4) + (this.datasource.isRoxie() ? "_max" : "");
            }
            break;
        case ">":
        case ">=":
            if (Utility.endsWith(this.fieldid, "-min")) {
                this._requestFieldID = this.fieldid.substring(0, this.fieldid.length - 4) + (this.datasource.isRoxie() ? "_min" : "");
            }
            break;
        case "set":
            if (Utility.endsWith(this.fieldid, "-set")) {
                this._requestFieldID = this.fieldid.substring(0, this.fieldid.length - 4) + (this.datasource.isRoxie() ? "_set" : "");
            }
            break;
        case "range":
            if (Utility.endsWith(this.minid, "-min")) {
                this._requestMinID = this.minid.substring(0, this.minid.length - 4) + (this.datasource.isRoxie() ? "_min" : "");
            }
            if (Utility.endsWith(this.maxid, "-max")) {
                this._requestMaxID = this.maxid.substring(0, this.maxid.length - 4) + (this.datasource.isRoxie() ? "_max" : "");
            }
            break;
    }
};

Filter.prototype.isRange = function () {
    return this.rule === "range";
};

Filter.prototype.isSet = function () {
    return this.rule === "set";
};

Filter.prototype._calcRequest = function (filteredRequest, request, fieldid, requestFieldID, value) {
    if (!this.datasource.isRoxie()) {
        //  Ignore requestFieldID, until filtering WU results
        //  Otherwise there are many fieldID collisions
        requestFieldID = fieldid;
    }
    filteredRequest[requestFieldID + _CHANGED] = request[fieldid + _CHANGED] || false;
    if (filteredRequest[requestFieldID] !== value) {
        filteredRequest[requestFieldID] = value;
    }
};

Filter.prototype.calcRequest = function (filteredRequest, request, fillInMissing) {
    if (!fillInMissing && request[this.fieldid] === undefined) {
        return;
    }
    const value = request[this.fieldid] === undefined ? null : request[this.fieldid];
    if (this.isRange()) {
        if (value instanceof Array && value.length === 2) {
            this._calcRequest(filteredRequest, request, this.minid, this._requestMinID, value[0]);
            this._calcRequest(filteredRequest, request, this.maxid, this._requestMaxID, value[1]);
        }
    } else {
        this._calcRequest(filteredRequest, request, this.fieldid, this._requestFieldID, value);
        if (this.isSet() && this.datasource.isRoxie()) {
            //  TODO in the future the value should be an array  ---
            filteredRequest[this._requestFieldID + ".Item$"] = filteredRequest[this._requestFieldID];
            delete filteredRequest[this._requestFieldID];
        }
    }
};

Filter.prototype.matches = function (row, value): boolean {
    if (value === undefined || value === null || value === "") {
        return this.nullable;
    }
    let rowValue = row[this._requestFieldID];
    if (rowValue === undefined) {
        rowValue = row[this._requestFieldID.toLowerCase()];
    }
    if (rowValue === undefined) {
        console.log("Empty cell value:  '" + this._requestFieldID + "'");
        return false;
    }
    switch (this.rule) {
        case "<":
            if (rowValue.localeCompare) {
                return rowValue.localeCompare(value) < 0;
            }
            return rowValue < value;
        case ">":
            if (rowValue.localeCompare) {
                return rowValue.localeCompare(value) > 0;
            }
            return rowValue > value;
        case "<=":
            if (rowValue.localeCompare) {
                return rowValue.localeCompare(value) <= 0;
            }
            return rowValue <= value;
        case ">=":
            if (rowValue.localeCompare) {
                return rowValue.localeCompare(value) >= 0;
            }
            return rowValue >= value;
        case "!=":
        case "notequals":
            // tslint:disable-next-line:triple-equals
            return rowValue != value;    // jshint ignore:line
        case "set":
            if (value instanceof Array) {
                return value.indexOf(rowValue) >= 0;
            }
            // tslint:disable-next-line:triple-equals
            return value == rowValue;    // jshint ignore:line
        case "==":
            // tslint:disable-next-line:triple-equals
            return value == rowValue;    // jshint ignore:line
        default:
            console.log("Unknown filter rule:  '" + this.rule + "'");
            // tslint:disable-next-line:triple-equals
            return value == rowValue;    // jshint ignore:line
    }
};

export class Output {

    datasource;
    id;
    from;
    protected notify;
    filters;
    protected db;

    constructor(datasource, output) {
        this.datasource = datasource;
        this.id = output.id;
        this.from = output.from;
        this.notify = output.notify || [];
        this.filters = (output.filter || []).map(filter => {
            return new Filter(this.datasource, filter);
        });
    }

    getQualifiedID() {
        return this.datasource.getQualifiedID() + "." + this.id;
    }

    getUpdatesVisualizations() {
        const retVal = [];
        this.notify.forEach(item => {
            retVal.push(this.datasource.marshaller.getVisualization(item));
        });
        return retVal;
    }

    accept(visitor) {
        visitor.visit(this);
    }

    vizNotify(updates) {
        const promises = [];
        this.notify.filter(function (item) {
            return !updates || updates.indexOf(item) >= 0;
        }).forEach(item => {
            const viz = this.datasource.marshaller.getVisualization(item);
            promises.push(viz.notify());
        });
        return Promise.all(promises);
    }

    setData(data, updates) {
        this.db = new Database.Grid().jsonObj(data);
        return this.vizNotify(updates);
    }
}

//  FetchData Optimizers  ---
function DatasourceRequestOptimizer(this: any) {
    this.datasourceRequests = {
    };
}

DatasourceRequestOptimizer.prototype.appendRequest = function (updateDatasource, request, updateVisualization) {
    const datasourceRequestID = updateDatasource.id + "(" + JSON.stringify(request) + ")";
    if (!this.datasourceRequests[datasourceRequestID]) {
        this.datasourceRequests[datasourceRequestID] = {
            updateDatasource,
            request,
            updates: []
        };
    } else if ((window as any).__hpcc_debug) {
        console.log("Optimized duplicate fetch:  " + datasourceRequestID);
    }
    const datasourceOptimizedItem = this.datasourceRequests[datasourceRequestID];
    if (datasourceOptimizedItem.updates.indexOf(updateVisualization.id) < 0) {
        datasourceOptimizedItem.updates.push(updateVisualization.id);
    }
};

DatasourceRequestOptimizer.prototype.fetchData = function () {
    const promises = [];
    for (const key in this.datasourceRequests) {
        const item = this.datasourceRequests[key];
        promises.push(item.updateDatasource.fetchData(item.request, item.updates));
    }
    return Promise.all(promises);
};

function VisualizationRequestOptimizer(this: any, skipClear?) {
    this.skipClear = skipClear;
    this.visualizationRequests = {
    };
}

VisualizationRequestOptimizer.prototype.appendRequest = function (updateDatasource, request, updateVisualization) {
    if (updateDatasource && updateVisualization) {
        const visualizationRequestID = updateVisualization.id + "(" + updateDatasource.id + ")";
        if (!this.visualizationRequests[visualizationRequestID]) {
            this.visualizationRequests[visualizationRequestID] = {
                updateVisualization,
                updateDatasource,
                request: {}
            };
        } else if ((window as any).__hpcc_debug) {
            console.log("Optimized duplicate fetch:  " + visualizationRequestID);
        }
        const visualizationOptimizedItem = this.visualizationRequests[visualizationRequestID];
        Utility.mixin(visualizationOptimizedItem.request, request);
    }
};

VisualizationRequestOptimizer.prototype.fetchData = function () {
    const datasourceRequestOptimizer = new DatasourceRequestOptimizer();
    for (const key in this.visualizationRequests) {
        const item = this.visualizationRequests[key];
        if (!this.skipClear && item.updateVisualization.type !== "GRAPH") {
            item.updateVisualization.clear();
        }
        item.updateVisualization.update(LOADING);
        datasourceRequestOptimizer.appendRequest(item.updateDatasource, item.request, item.updateVisualization);
    }
    return datasourceRequestOptimizer.fetchData();
};

//  Datasource  ---
let transactionID = 0;
const transactionQueue = [];
export class Datasource {

    protected marshaller;
    id;
    protected WUID;
    protected URL;
    databomb;
    protected filters;
    protected _loadedCount;
    protected _outputs;
    protected _outputArray;
    comms;
    protected _loadedCount2;
    protected _loadedCount3;
    protected _loadedCount4;

    constructor(marshaller, datasource: DDL1.IAnyDatasource, proxyMappings, timeout) {
        this.marshaller = marshaller;
        this.id = datasource.id;
        if (DDL1.isWorkunitDatasource(datasource)) {
            this.WUID = datasource.WUID;
        } else if (DDL1.isHipieDatasource(datasource)) {
            this.URL = (marshaller.espUrl && marshaller.espUrl.url()) ? marshaller.espUrl.url() : datasource.URL;
        } else if (DDL1.isDatabombDatasource(datasource)) {
            this.databomb = datasource.databomb;
        }
        this.filters = (datasource.filter || []).map(filter => {
            return new Filter(this, filter);
        });
        this._loadedCount = 0;

        const context = this;
        this._outputs = {};
        this._outputArray = [];
        const hipieResults = [];
        datasource.outputs.forEach(item => {
            const output = new Output(context, item);
            context._outputs[item.id] = output;
            context._outputArray.push(output);
            hipieResults.push({
                id: item.id,
                from: item.from,
                filters: output.filters || this.filters
            });
        });

        if (this.WUID) {
            this.comms = new Comms.HIPIEWorkunit()
                .url(this.URL)
                .proxyMappings(proxyMappings)
                .timeout(timeout)
                .hipieResults(hipieResults)
                ;
        } else if (this.databomb) {
            this.comms = new Comms.HIPIEDatabomb()
                .hipieResults(hipieResults)
                ;
        } else if (DDL1.isHipieDatasource(datasource)) {
            this.comms = new Comms.HIPIERoxie()
                .url(datasource.URL)
                .proxyMappings(proxyMappings)
                .timeout(timeout)
                .hipieResults(hipieResults)
                ;
        }
    }

    isRoxie() {
        return !this.WUID && !this.databomb;
    }

    isWU() {
        return !!this.WUID;
    }

    isDatabomb() {
        return !!this.databomb;
    }

    getQualifiedID() {
        return this.id;
    }

    getOutputs() {
        return this._outputs;
    }

    getUpdatesVisualizations() {
        const retVal = [];
        for (const key in this._outputs) {
            this._outputs[key].getUpdatesVisualizations().forEach(function (visualization) {
                retVal.push(visualization);
            });
        }
        return retVal;
    }

    accept(visitor) {
        visitor.visit(this);
        for (const key in this._outputs) {
            this._outputs[key].accept(visitor);
        }
    }

    calcRequest(request, fillInMissing) {
        const retVal = {};
        this.filters.forEach(function (item) {
            item.calcRequest(retVal, request, fillInMissing);
        });
        //  TODO - Workaround HIPIE issue where it omits filters at datasource level  ---
        this._outputArray.forEach(function (output) {
            output.filters.forEach(function (item) {
                item.calcRequest(retVal, request, fillInMissing);
            });
        });
        return retVal;
    }

    fetchData(request, updates) {
        const myTransactionID = ++transactionID;
        transactionQueue.push(myTransactionID);

        let dsRequest = request;
        dsRequest = this.calcRequest(request, this.isRoxie());
        dsRequest.refresh = request.refresh || false;
        if ((window as any).__hpcc_debug) {
            console.log("fetchData:  " + JSON.stringify(updates) + "(" + JSON.stringify(request) + ")");
        }
        for (const key in dsRequest) {
            if (dsRequest[key] === undefined) {
                delete dsRequest[key];
            }
        }
        const now = Date.now();
        this.marshaller.commsEvent(this, "request", dsRequest);
        const context = this;
        return new Promise(function (resolve, reject) {
            context.comms.call(dsRequest).then(function (_response) {
                const response = JSON.parse(JSON.stringify(_response));
                const intervalHandle = setInterval(function () {
                    if (transactionQueue[0] === myTransactionID && Date.now() - now >= 500) {  //  500 is to allow for all "clear" transitions to complete...
                        clearTimeout(intervalHandle);
                        context.processResponse(response, dsRequest, updates).then(function () {
                            transactionQueue.shift();
                            resolve(response);
                            context.marshaller.commsEvent(context, "response", dsRequest, response);
                            ++context._loadedCount;
                        });
                    }
                }, 100);
            }).catch(function (e) {
                context.marshaller.commsEvent(context, "error", dsRequest, e);
                reject(e);
            });
        });
    }

    processResponse(response, request, updates) {
        const lowerResponse = {};
        for (const responseKey in response) {
            lowerResponse[responseKey.toLowerCase()] = response[responseKey];
        }
        const promises = [];
        for (const key in this._outputs) {
            const from = this._outputs[key].id;
            if (Utility.exists(from, response)) {
                if (!Utility.exists(from + _CHANGED, response) || (Utility.exists(from + _CHANGED, response) && response[from + _CHANGED].length && response[from + _CHANGED][0][from + _CHANGED])) {
                    promises.push(this._outputs[key].setData(response[from], updates));
                } else {
                    //  TODO - I Suspect there is a HIPIE/Roxie issue here (empty request)
                    promises.push(this._outputs[key].vizNotify(updates));
                }
            } else if (Utility.exists(from, lowerResponse)) {
                console.log("DDL 'Datasource.From' case is Incorrect");
                if (!Utility.exists(from + _CHANGED, lowerResponse) || (Utility.exists(from + _CHANGED, lowerResponse) && response[from + _CHANGED].length && lowerResponse[from + _CHANGED][0][from + _CHANGED])) {
                    promises.push(this._outputs[key].setData(lowerResponse[from], updates));
                } else {
                    //  TODO - I Suspect there is a HIPIE/Roxie issue here (empty request)
                    promises.push(this._outputs[key].vizNotify(updates));
                }
            } else {
                const responseItems = [];
                for (const responseKey2 in response) {
                    responseItems.push(responseKey2);
                }
                console.log("Unable to locate '" + from + "' in response {" + responseItems.join(", ") + "}");
            }
        }
        return Promise.all(promises);
    }

    isLoaded() {
        return this._loadedCount > 0;
    }

    serializeState() {
        return {
        };
    }

    deserializeState(state) {
        if (!state) return;
    }
}

//  Dashboard  ---
export function Dashboard(this: any, marshaller, dashboard, proxyMappings, timeout?) {
    this.marshaller = marshaller;
    this.id = dashboard.id;
    this.title = dashboard.title;

    this._datasources = {};
    this._datasourceArray = [];
    this._datasourceTotal = 0;
    if (dashboard.datasources) {
        dashboard.datasources.forEach(item => {
            this.createDatasource(item, proxyMappings, timeout);
        });
    }
    this._datasourceTotal = this._datasourceArray.length;

    this._visualizations = {};
    this._visualizationArray = [];
    dashboard.visualizations.forEach(item => {
        this.createVisualization(item);
    });
    this._visualizationTotal = this._visualizationArray.length;
}

Dashboard.prototype.createDatasource = function (ddlDatasouce) {
    let retVal = this._datasources[ddlDatasouce.id];
    if (!retVal) {
        retVal = this.marshaller.createDatasource(ddlDatasouce);
        this._datasources[ddlDatasouce.id] = retVal;
        this._datasourceArray.push(retVal);
    }
    this._datasourceTotal = this._datasourceArray.length;
    return retVal;
};

Dashboard.prototype.createVisualization = function (ddlVisualization, parentVisualization) {
    const retVal = new Visualization(this, ddlVisualization, parentVisualization);
    this._visualizations[ddlVisualization.id] = retVal;
    this._visualizationArray.push(retVal);
    this.marshaller.appendVisualization(retVal);
    return retVal;
};

Dashboard.prototype.loadedPromise = function () {
    return Promise.all(this._visualizationArray.map(function (visualization) { return visualization.loadedPromise(); }));
};

Dashboard.prototype.getQualifiedID = function () {
    return this.id;
};

Dashboard.prototype.getDatasources = function () {
    return this._datasources;
};

Dashboard.prototype.getDatasourceArray = function () {
    return this._datasourceArray;
};

Dashboard.prototype.getDatasource = function (id) {
    return this._datasources[id] || this.marshaller.getDatasource(id);
};

Dashboard.prototype.getDataSourceArray = function () {
    return this._datasourceArray;
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
    for (const key in this._datasources) {
        this._datasources[key].accept(visitor);
    }
    this._visualizationArray.forEach(function (item) {
        item.accept(visitor);
    }, this);
};

Dashboard.prototype.primeData = function (state) {
    const fetchDataOptimizer = new VisualizationRequestOptimizer(true);
    this.getVisualizationArray().forEach(function (visualization) {
        //  Clear all charts back to their default values ---
        visualization.clear();
        visualization.update();
        if (state && state[visualization.id]) {
            if (Utility.exists("source.mappings.mappings", visualization)) {
                for (const key in visualization.source.mappings.mappings) {
                    if (state[visualization.id][visualization.source.mappings.mappings[key]]) {
                        visualization._widgetState.row[key] = state[visualization.id][visualization.source.mappings.mappings[key]];
                        visualization._widgetState.selected = true;
                    }
                }
            }
        }
    });
    this.getVisualizationArray().forEach(function (visualization) {
        const inputVisualizations = visualization.getInputVisualizations();
        const datasource = visualization.source.getDatasource();
        let hasInputSelection = false;
        inputVisualizations.forEach(function (inViz) {
            if (inViz.hasSelection()) {
                const request = inViz.calcRequestFor(visualization);
                request.refresh = true;
                fetchDataOptimizer.appendRequest(datasource, request, visualization);
                hasInputSelection = true;
            }
        });
        if (!hasInputSelection && ((datasource && datasource.isRoxie()) || inputVisualizations.length === 0)) {
            fetchDataOptimizer.appendRequest(datasource, { refresh: true }, visualization);
        }
    });
    return fetchDataOptimizer.fetchData();
};

Dashboard.prototype.serializeState = function () {
    const retVal = {
        datasources: {},
        visualizations: {}
    };
    for (const key in this._datasources) {
        retVal.datasources[key] = this._datasources[key].serializeState();
    }
    for (const vizKey in this._visualizations) {
        retVal.visualizations[vizKey] = this._visualizations[vizKey].serializeState();
    }
    return retVal;
};

Dashboard.prototype.deserializeState = function (state) {
    if (!state) return;
    for (const key in this._datasources) {
        if (state.datasources[key]) {
            this._datasources[key].deserializeState(state.datasources[key]);
        }
    }
    for (const vizKey in this._visualizations) {
        if (state.visualizations[vizKey]) {
            this._visualizations[vizKey].deserializeState(state.visualizations[vizKey]);
        }
    }
};

//  Marshaller  ---
export function Marshaller(this: any) {
    Class.call(this);

    this._proxyMappings = {};
    this._widgetMappings = d3Map();
    this._clearDataOnUpdate = true;
    this._propogateClear = false;
    this.id = "Marshaller";
    this._missingDataString = "";
    this.dashboards = {};
    this.dashboardArray = [];

    this._datasources = {};
    this._datasourceArray = [];
    this._visualizations = {};
    this._visualizationArray = [];
}
Marshaller.prototype = Object.create(Class.prototype);
Marshaller.prototype.constructor = Marshaller;

Marshaller.prototype.commsDataLoaded = function () {
    for (let i = 0; i < this.dashboardArray.length; i++) {
        for (const ds in this.dashboardArray[i].getDatasources()) {
            if (!this.dashboardArray[i].getDatasource(ds).isLoaded()) {
                return false;
            }
        }
    }
    return true;
};

Marshaller.prototype.accept = function (visitor) {
    visitor.visit(this);
    for (const key2 in this._datasources) {
        this._datasources[key2].accept(visitor);
    }
    this.dashboardTotal = 0;
    for (const key in this.dashboards) {
        this.dashboards[key].accept(visitor);
        ++this.dashboardTotal;
    }
};

Marshaller.prototype.url = function (url, callback) {
    this.espUrl = new Comms.ESPUrl()
        .url(url)
        ;
    let transport = null;
    let hipieResultName = "HIPIE_DDL";
    if (this.espUrl.isWorkunitResult()) {
        hipieResultName = this.espUrl.param("ResultName");
        transport = new Comms.HIPIEWorkunit()
            .url(url)
            .proxyMappings(this._proxyMappings)
            .timeout(this._timeout)
            ;
    } else {
        transport = new Comms.HIPIERoxie()
            .url(url)
            .proxyMappings(this._proxyMappings)
            .timeout(this._timeout)
            ;
    }

    const context = this;
    transport.fetchResults().then(function (response) {
        if (Utility.exists(hipieResultName, response)) {
            return transport.fetchResult(hipieResultName).then(function (ddlResponse) {
                const json = ddlResponse[0][hipieResultName];
                context.parse(json, function () {
                    callback(response);
                });
            }).catch(function (e) {
                context.commsEvent(context, "error", hipieResultName, e);
            });
        }
    }).catch(function (e) {
        context.commsEvent(context, "error", "fetchResults", e);
    });
};

Marshaller.prototype.proxyMappings = function (_) {
    if (!arguments.length) return this._proxyMappings;
    this._proxyMappings = _;
    return this;
};

Marshaller.prototype.timeout = function (_) {
    if (!arguments.length) return this._timeout;
    this._timeout = _;
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
    const context = this;
    this._json = json;
    this._jsonParsed = JSON.parse(this._json);

    //  Global Datasources  ---
    this._datasources = {};
    this._datasourceArray = [];
    if (this._jsonParsed.datasources) {
        this._jsonParsed.datasources.forEach(function (item) {
            context.createDatasource(item);
        });
    }

    this.dashboards = {};
    this.dashboardArray = [];
    this._visualizations = {};
    this._visualizationArray = [];
    const dashboards = this._jsonParsed.dashboards || this._jsonParsed;
    dashboards.forEach(function (item) {
        const newDashboard = new Dashboard(context, item, context._proxyMappings, context._timeout);
        context.dashboards[item.id] = newDashboard;
        context.dashboardArray.push(newDashboard);
    });
    this.dashboardTotal = this.dashboardArray.length;
    this._visualizationArray.forEach(function (ddlViz) {
        ddlViz.on("processEvent", function (eventID, event, row, col, selected) {
            context.vizEvent(ddlViz.widget, eventID, row, col, selected);
        });
    });
    this._datasourceTotal = this._datasourceArray.length;

    this.ready(callback);
    return this;
};

Marshaller.prototype.dashboardsLoaded = function () {
    return Promise.all(this.dashboardArray.map(function (dashboard) { return dashboard.loadedPromise(); }));
};

Marshaller.prototype.createDatasource = function (ddlDatasouce: DDL1.IAnyDatasource) {
    let retVal = this._datasources[ddlDatasouce.id];
    if (!retVal) {
        retVal = new Datasource(this, ddlDatasouce, this._proxyMappings, this._timeout);
        this._datasources[ddlDatasouce.id] = retVal;
        this._datasourceArray.push(retVal);
    }
    this._datasourceTotal = this._datasourceArray.length;
    return retVal;
};

Marshaller.prototype.getDatasource = function (id) {
    return this._datasources[id];
};

Marshaller.prototype.getDatasources = function () {
    return this._datasources;
};

Marshaller.prototype.getDatasourceArray = function () {
    return this._datasourceArray;
};

Marshaller.prototype.appendVisualization = function (visualization) {
    this._visualizations[visualization.id] = visualization;
    this._visualizationArray.push(visualization);
};

Marshaller.prototype.getVisualization = function (id) {
    return this._visualizations[id];
};

Marshaller.prototype.appendDataSource = function (datasource) {
    this._datasources[datasource.id] = datasource;
    this._datasourceArray.push(datasource);
};

Marshaller.prototype.getVisualizations = function () {
    return this._visualizations;
};

Marshaller.prototype.getVisualizationArray = function () {
    return this._visualizationArray;
};

Marshaller.prototype.getWidget = function (id) {
    return this._widgetMappings.get(id);
};

Marshaller.prototype.on = function (eventID, func) {
    const context = this;
    this.overrideMethod(eventID, function (origFunc, args) {
        const retVal = origFunc.apply(context, args);
        return func.apply(context, args) || retVal;
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
            if ((window as any).__hpcc_debug) {
                console.log("Marshaller.commsEvent:  " + ddlSource.id + "-" + eventID + ":  " + JSON.stringify(request));
            }
            break;
        case "response":
        case "error":
            if ((window as any).__hpcc_debug) {
                console.log("Marshaller.commsEvent:  " + ddlSource.id + "-" + eventID + ":  " + JSON.stringify(response));
            }
            break;
        default:
            if ((window as any).__hpcc_debug) {
                console.log("Marshaller.commsEvent:  " + JSON.stringify(arguments));
            }
            break;

    }
};

Marshaller.prototype.createDatabomb = function () {
    const retVal = {};
    this.dashboardArray.forEach(function (dashboard) {
        for (const key in dashboard.getDatasources()) {
            const comms = dashboard.getDatasource(key).comms;
            retVal[key] = {};
            for (const key2 in comms._hipieResults) {
                const hipieResult = comms._hipieResults[key2];
                retVal[key][key2] = comms._resultNameCache[hipieResult.from];
            }
        }
    });
    return retVal;
};

Marshaller.prototype.primeData = function (state) {
    const promises = this.dashboardArray.map(function (dashboard) {
        return dashboard.primeData(state);
    });
    return Promise.all(promises);
};

Marshaller.prototype.serializeState = function () {
    const retVal = {};
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
