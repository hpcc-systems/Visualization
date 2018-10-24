import * as DDL1 from "./ddl";
import * as DDL2 from "./ddl2";

interface IDatasourceOutput {
    datasource: DDL1.IAnyDatasource;
    output: DDL1.IOutput;
}

interface IDatasourceOutputFilter extends IDatasourceOutput {
    filter: DDL1.IFilter;
}

const UPGRADE_HEX_CHAR: boolean = false;
function faCharFix(faChar: any): string | undefined {
    if (UPGRADE_HEX_CHAR && typeof faChar === "string") {
        return String.fromCharCode(parseInt(faChar));
    }
    return faChar;
}

class DDLUpgrade {
    _ddl: DDL1.IDDL;
    _baseUrl: string;
    _wuid?: string;
    _toLowerCase: boolean;

    _datasources: { [id: string]: DDL1.IAnyDatasource } = {};
    _datasourceUpdates: { [id: string]: { id: string, output?: string } } = {};
    _visualizations: { [id: string]: DDL1.IAnyVisualization } = {};

    _ddl2Datasources: { [id: string]: DDL2.DatasourceType } = {};
    _ddl2DatasourceFields: { [dsid: string]: { [outputID: string]: { [fieldID: string]: DDL2.IField } } } = {};

    _ddl2Dataviews: { [id: string]: DDL2.IView } = {};
    _ddl2DataviewActivities: {
        [viewID: string]: {
            project: DDL2.IProject,
            filters: DDL2.IFilter,
            sort: DDL2.ISort,
            groupBy: DDL2.IGroupBy,
            limit: DDL2.ILimit,
            mappings: DDL2.IMappings
        }
    } = {};

    constructor(ddl: DDL1.IDDL, baseUrl: string = "http://localhost:8010", wuid: string = "WUID", toLowerCase = true) {
        this._ddl = ddl;
        this._baseUrl = baseUrl;
        this._wuid = wuid;
        this._toLowerCase = toLowerCase;

        this.indexDDL();
        this.readDDL();
    }

    toLowerCase(s: string): string {
        return this._toLowerCase ? s.toLowerCase() : s;
    }

    isVizDatasourceRoxie(viz: DDL1.IAnyVisualization): boolean {
        if ((viz as any).source) {
            const ds = this._datasources[(viz as any).source.id];
            if (DDL1.isHipieDatasource(ds)) {
                return true;
            }
        }
        return false;
    }

    getDatasourceOutputs(dsID: string, vizID: string): IDatasourceOutput[] {
        const retVal: IDatasourceOutput[] = [];
        const datasource = this._datasources[dsID];
        for (const output of datasource.outputs) {
            if (output.notify) {
                for (const notify of output.notify) {
                    if (notify === vizID) {
                        retVal.push({
                            datasource,
                            output
                        });
                    }
                }
            }
        }
        return retVal;
    }

    getDatasourceFilters(dsID: string, vizID: string): { [id: string]: IDatasourceOutputFilter } {
        const retVal: { [id: string]: IDatasourceOutputFilter } = {};
        for (const dsOut of this.getDatasourceOutputs(dsID, vizID)) {
            if (dsOut.output.filter) {
                for (const filter of dsOut.output.filter) {
                    retVal[filter.fieldid] = {
                        datasource: dsOut.datasource,
                        output: dsOut.output,
                        filter
                    };
                }
            }
        }
        return retVal;
    }

    indexDDL() {
        for (const dash of this._ddl.dashboards) {
            for (const viz of dash.visualizations) {
                this._visualizations[viz.id] = viz;
            }
        }

        for (const ds of this._ddl.datasources) {
            this._datasources[ds.id] = ds;
            for (const output of ds.outputs) {
                if (output.notify) {
                    for (const notify of output.notify) {
                        this._datasourceUpdates[notify] = {
                            id: ds.id,
                            output: output.from || output.id
                        };
                    }
                }
            }
        }
    }

    readDDL() {
        for (const ds of this._ddl.datasources) {
            if (DDL1.isWorkunitDatasource(ds)) {
                const ddl2DS: DDL2.IWUResult = {
                    type: "wuresult",
                    id: ds.id,
                    url: this._baseUrl,
                    wuid: this._wuid!,
                    outputs: {}
                };
                for (const output of ds.outputs) {
                    this.output2output(output, ddl2DS.outputs);
                }
                this._ddl2Datasources[ds.id] = ddl2DS;
            } else if (DDL1.isDatabombDatasource(ds)) {
            } else {
                const urlParts = ds.URL!.split("/WsEcl/submit/query/");
                const hostParts = urlParts[0];
                const roxieParts = urlParts[1].split("/");
                const ddl2DS: DDL2.IHipieService = {
                    type: "hipie",
                    id: ds.id,
                    url: hostParts,
                    querySet: roxieParts[0],
                    queryID: roxieParts[1],
                    inputs: [],
                    outputs: {}
                };
                for (const output of ds.outputs) {
                    this.output2output(output, ddl2DS.outputs);
                }
                this._ddl2Datasources[ds.id] = ddl2DS;
            }
        }
        for (const dash of this._ddl.dashboards) {
            for (const viz of dash.visualizations) {
                if (viz.type === "FORM") {
                    this._ddl2Datasources[viz.id] = {
                        type: "form",
                        id: viz.id,
                        fields: this.formFields2field(viz.fields)
                    };
                    this._datasourceUpdates[viz.id] = { id: viz.id };
                } else if (viz.type === "SLIDER") {
                    this._ddl2Datasources[viz.id] = {
                        type: "form",
                        id: viz.id,
                        fields: this.formFields2field(viz.fields, true)
                    };
                    this._datasourceUpdates[viz.id] = { id: viz.id };
                }

                this._ddl2Dataviews[viz.id] = this.anyViz2view(viz);
            }
        }

        this.readGroupBy();
        this.readFilters();
        this.readSort();
        this.readMappings();
    }

    readGroupBy() {
        for (const dash of this._ddl.dashboards) {
            for (const viz of dash.visualizations) {
                if (viz.fields) {
                    const groupByColumns: string[] = [];
                    const aggrFields: DDL2.IAggregate[] = [];
                    for (const field of viz.fields) {
                        if (field.properties && field.properties.function) {
                            switch (field.properties.function) {
                                case "SUM":
                                case "MIN":
                                case "MAX":
                                    aggrFields.push({
                                        type: this.func2aggr(field.properties.function),
                                        inFieldID: this.toLowerCase(field.properties.params!.param1),
                                        fieldID: this.toLowerCase(field.id)
                                    } as DDL2.IAggregate);
                                    break;
                                case "AVE":
                                    aggrFields.push({
                                        type: this.func2aggr(field.properties.function),
                                        inFieldID: this.toLowerCase(field.properties.params!.param1),
                                        baseCountFieldID: field.properties.params!.param2 ? this.toLowerCase(field.properties.params!.param2) : undefined,
                                        fieldID: this.toLowerCase(field.id)
                                    } as DDL2.IAggregate);
                                    break;
                                case "SCALE":
                                default:
                                    groupByColumns.push(this.toLowerCase(field.id));
                                    throw new Error(`Unhandled field function: ${field.properties.function}`);
                            }
                        } else {
                            groupByColumns.push(this.toLowerCase(field.id));
                        }
                    }
                    if (aggrFields.length) {
                        this._ddl2DataviewActivities[viz.id].groupBy.groupByIDs = [...groupByColumns];
                        this._ddl2DataviewActivities[viz.id].groupBy.aggregates = aggrFields;
                    }
                }
            }
        }
    }

    func2aggr(func: DDL1.VisualizationFieldFuncitonType): DDL2.IAggregateType {
        switch (func) {
            case "SUM":
                return "sum";
            case "AVE":
                return "mean";
            case "MIN":
                return "min";
            case "MAX":
                return "max";
        }
        throw new Error(`Unknown DDL1 Function Type:  ${func}`);
    }

    readMappings() {
        for (const dash of this._ddl.dashboards) {
            for (const viz of dash.visualizations) {
                if (DDL1.isFormVisualization(viz)) {
                } else if (DDL1.isPieVisualization(viz)) {
                    this.readPieMappings(viz);
                } else if (DDL1.isChoroVisualization(viz)) {
                    this.readChoroMappings(viz);
                } else if (DDL1.isLineVisualization(viz)) {
                    this.readLineMappings(viz);
                } else if (DDL1.isTableVisualization(viz)) {
                    this.readTableMappings(viz);
                } else if (DDL1.isGraphVisualization(viz)) {
                    this.readGraphMappings(viz);
                } else if (DDL1.isSliderVisualization(viz)) {
                    this.readSliderMappings(viz);
                } else {
                    throw new Error(`Unkown DDL1 mapping type:  ${viz.type}`);
                }
            }
        }
    }

    readPieMappings(viz: DDL1.IPieVisualization) {
        const mappings = this._ddl2DataviewActivities[viz.id].mappings;
        mappings.transformations.push({
            fieldID: "label",
            type: "=",
            sourceFieldID: this.toLowerCase(viz.source.mappings.label)
        });
        mappings.transformations.push({
            fieldID: "weight",
            type: "=",
            sourceFieldID: this.toLowerCase(viz.source.mappings.weight[0])
        });
    }

    readChoroMappings(viz: DDL1.IChoroVisualization) {
        const mappings = this._ddl2DataviewActivities[viz.id].mappings;
        mappings.transformations.push({
            fieldID: "label",
            type: "=",
            sourceFieldID: this.toLowerCase(this.anyChoroMapping2label(viz.source.mappings))
        });
        mappings.transformations.push({
            fieldID: "weight",
            type: "=",
            sourceFieldID: this.toLowerCase(viz.source.mappings.weight[0])
        });
    }

    anyChoroMapping2label(mapping: any) {
        return mapping.state || mapping.county || mapping.geohash;
    }

    readLineMappings(viz: DDL1.ILineVisualization) {
        const mappings = this._ddl2DataviewActivities[viz.id].mappings;
        mappings.transformations.push({
            fieldID: viz.source.mappings.x[0],
            type: "=",
            sourceFieldID: this.toLowerCase(viz.source.mappings.x[0])
        });
        for (let i = 0; i < viz.source.mappings.y.length; ++i) {
            mappings.transformations.push({
                fieldID: viz.source.mappings.y[i],
                type: "=",
                sourceFieldID: this.toLowerCase(viz.source.mappings.y[i])
            });
        }
    }

    readTableMappings(viz: DDL1.ITableVisualization) {
        const mappings = this._ddl2DataviewActivities[viz.id].mappings;
        for (let i = 0; i < viz.label.length; ++i) {
            mappings.transformations.push({
                fieldID: viz.label[i],
                type: "=",
                sourceFieldID: this.toLowerCase(viz.source.mappings.value[i])
            });
        }
    }

    readGraphEnums(valueMappings?: DDL1.IValueMappings, annotation: boolean = false): DDL2.IMapMapping[] {
        const retVal: DDL2.IMapMapping[] = [];
        if (valueMappings) {
            for (const value in valueMappings) {
                const newValue: { [key: string]: string | number | boolean | undefined } = {};
                for (const key in valueMappings[value]) {
                    if (key === "faChar") {
                        newValue[key] = faCharFix(valueMappings[value][key]);
                    } else if (annotation && key.indexOf("icon_") === 0) {
                        console.log("Deprecated flag property:  " + key);
                        newValue[key.split("icon_")[1]] = valueMappings[value][key];
                    } else {
                        newValue[key] = valueMappings[value][key];
                    }
                }
                //  remove v1.x "0" annotations as they equated to "nothing"  ---
                if (!annotation || value !== "0") {
                    retVal.push({
                        value,
                        newValue
                    });
                }
            }
        }
        return retVal;
    }

    readGraphMappings(viz: DDL1.IGraphVisualization) {
        const mappings = this._ddl2DataviewActivities[viz.id].mappings;
        mappings.transformations.push({
            fieldID: "uid",
            type: "=",
            sourceFieldID: this.toLowerCase(viz.source.mappings.uid)
        });
        mappings.transformations.push({
            fieldID: "label",
            type: "=",
            sourceFieldID: this.toLowerCase(viz.source.mappings.label)
        });
        if (viz.icon.fieldid) {
            mappings.transformations.push({
                fieldID: "icon",
                type: "map",
                sourceFieldID: this.toLowerCase(viz.icon.fieldid),
                default: { fachar: faCharFix(viz.icon.faChar) },
                mappings: this.readGraphEnums(viz.icon.valuemappings)
            });
        }
        let idx = 0;
        if (viz.flag) {
            for (const flag of viz.flag) {
                if (flag.fieldid) {
                    mappings.transformations.push({
                        fieldID: `annotation_${idx++}`,
                        type: "map",
                        sourceFieldID: this.toLowerCase(flag.fieldid),
                        default: {},
                        mappings: this.readGraphEnums(flag.valuemappings, true)
                    });
                }
            }
        }
        mappings.transformations.push({
            fieldID: "links",
            type: "=",
            sourceFieldID: this.toLowerCase(viz.source.link.childfile),
            transformations: [{
                fieldID: "uid",
                type: "=",
                sourceFieldID: this.toLowerCase(viz.source.link.mappings.uid)
            }]
        });
    }

    readSliderMappings(viz: DDL1.ISliderVisualization) {
        const mappings = this._ddl2DataviewActivities[viz.id].mappings;
        mappings.transformations.push({
            fieldID: "label",
            type: "=",
            sourceFieldID: this.toLowerCase(viz.source.mappings.label)
        });
    }

    readFilters() {
        for (const dash of this._ddl.dashboards) {
            for (const viz of dash.visualizations) {
                if (viz.events) {
                    for (const eventID in viz.events) {
                        const event = viz.events[eventID];
                        for (const update of event.updates) {
                            const otherViz = this._ddl2Dataviews[update.visualization];
                            const dsFilters = this.getDatasourceFilters(update.datasource, otherViz.id);
                            if (update.mappings) {
                                if (DDL2.isRoxieServiceRef(otherViz.datasource)) {
                                    for (const key in update.mappings) {
                                        otherViz.datasource.request.push({
                                            source: viz.id,
                                            remoteFieldID: this.toLowerCase(key),
                                            localFieldID: this.toLowerCase(update.mappings[key])
                                        } as DDL2.IRequestField);
                                    }
                                } else {
                                    const condition: DDL2.IFilterCondition = {
                                        viewID: viz.id,
                                        mappings: []
                                    };
                                    for (const key in update.mappings) {
                                        const mapping = update.mappings[key];
                                        const dsFilter = dsFilters[mapping].filter;
                                        if (!dsFilter) {
                                            console.log("Select Mapping " + mapping + " in viz " + viz.id + " not found in filters for " + otherViz.id);
                                        } else {
                                            condition.mappings.push({
                                                remoteFieldID: this.toLowerCase(key),
                                                localFieldID: this.toLowerCase(update.mappings[key]),
                                                condition: this.rule2condition(dsFilter.rule),
                                                nullable: dsFilter.nullable
                                            });
                                        }
                                    }
                                    this._ddl2DataviewActivities[otherViz.id].filters.conditions.push(condition);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    rule2condition(_: DDL1.IFilterRule): DDL2.IMappingConditionType {
        switch (_) {
            case "set":
                return "in";
            case "notequals":
                return "!=";
        }
        return _;
    }

    readSort() {
        for (const dash of this._ddl.dashboards) {
            for (const viz of dash.visualizations) {
                if ((viz as any).source) {
                    if ((viz as any).source.sort) {
                        const vizSort = this._ddl2DataviewActivities[viz.id].sort;
                        vizSort.conditions = ((viz as any).source.sort as string[]).map(s => {
                            if (s.indexOf("-") === 0) {
                                return {
                                    fieldID: this.toLowerCase(s.substr(1)),
                                    descending: true
                                } as DDL2.ISortCondition;
                            }
                            return {
                                fieldID: this.toLowerCase(s),
                                descending: false
                            } as DDL2.ISortCondition;
                        });
                    }
                    if ((viz as any).source.first) {
                        const vizLimit = this._ddl2DataviewActivities[viz.id].limit;
                        vizLimit.limit = +(viz as any).source.first;
                    }
                }
            }
        }
    }

    anyViz2view(viz: DDL1.IAnyVisualization): DDL2.IView {
        const project: DDL2.IProject = {
            type: "project",
            transformations: []
        };
        const filters: DDL2.IFilter = {
            type: "filter",
            conditions: []
        };
        const groupBy: DDL2.IGroupBy = {
            type: "groupby",
            groupByIDs: [],
            aggregates: []
        };
        const sort: DDL2.ISort = {
            type: "sort",
            conditions: []
        };
        const limit: DDL2.ILimit = {
            type: "limit",
            limit: 0
        };
        const mappings: DDL2.IMappings = {
            type: "mappings",
            transformations: []
        };
        this._ddl2DataviewActivities[viz.id] = {
            project,
            filters,
            sort,
            groupBy,
            limit,
            mappings
        };
        const datasourceRef: DDL2.IDatasourceBaseRef | DDL2.IRoxieServiceRef = this.isVizDatasourceRoxie(viz) ? {
            id: this._datasourceUpdates[viz.id].id,
            request: [],
            output: this._datasourceUpdates[viz.id].output
        } : {
                id: this._datasourceUpdates[viz.id].id,
                output: this._datasourceUpdates[viz.id].output
            };
        return {
            id: viz.id,
            datasource: datasourceRef,
            activities: [
                project,
                filters,
                sort,
                groupBy,
                limit
            ],
            visualization: {
                id: viz.id,
                title: viz.title || "",
                description: "",
                ...this.type2chartType(viz.type),
                mappings,
                properties: viz.properties as DDL2.IWidgetProperties || {}

            }
        };
    }

    type2chartType(chartType: DDL1.VisualizationType): { chartType: string, __class: string } {
        switch (chartType) {
            case "LINE":
                return { chartType: "Line", __class: "chart_Line" };
            case "BUBBLE":
                return { chartType: "Bubble", __class: "chart_Bubble" };
            case "PIE":
                return { chartType: "Pie", __class: "chart_Pie" };
            case "BAR":
                return { chartType: "Column", __class: "chart_Column" };
            case "FORM":
                return { chartType: "FieldForm", __class: "form_FieldForm" };
            case "WORD_CLOUD":
                return { chartType: "WordCloud", __class: "chart_WordCloud" };
            case "CHORO":
                return { chartType: "ChoroplethStates", __class: "map_ChoroplethStates" };
            case "SLIDER":
                return { chartType: "FieldForm", __class: "form_FieldForm" };
            case "HEAT_MAP":
                return { chartType: "HeatMap", __class: "other_HeatMap" };
            case "2DCHART":
                return { chartType: "Column", __class: "chart_Column" };
            case "GRAPH":
                return { chartType: "AdjacencyGraph", __class: "graph_AdjacencyGraph" };
            case "TABLE":
            default:
                return { chartType: "Table", __class: "grid_Table" };
        }
    }

    formFields2field(fields?: DDL1.IVisualizationField[], slider: boolean = false): DDL2.IField[] {
        if (!fields) return [];
        return fields.map(field => {
            switch (field.properties.type) {
                case "range":
                    return {
                        type: "range" as DDL2.IFieldType,
                        id: field.id,
                        default: (field.properties.default ? field.properties.default : [undefined, undefined]) as DDL2.IRange
                    };
                case "dataset":
                    return {
                        type: "dataset" as DDL2.IFieldType,
                        id: field.id,
                        default: []
                    };
                default:
                    return {
                        type: this.formFieldType2fieldType(field.properties.datatype, slider),
                        id: field.id,
                        default: field.properties.default ? field.properties.default[0] : undefined
                    };
            }
        });
    }

    formFieldType2fieldType(fieldType: DDL1.VisualizationFieldType, slider: boolean): "string" | "number" | "boolean" {
        switch (fieldType) {
            case "bool":
            case "boolean":
                return "boolean";
            case "integer":
            case "unsigned":
            case "float":
            case "double":
            case "real":
                return "number";
            case "string":
                return "string";
            default:
                return slider ? "number" : "string";
        }
    }

    output2output(output: DDL1.IOutput, target: DDL2.OutputDict) {
        target[output.from || output.id] = {
            fields: this.filters2fields(output.filter)
        };
    }

    filters2fields(filters?: DDL1.IFilter[]): DDL2.IField[] {
        if (!filters) return [];
        return filters.filter(filter => {
            const idParts = filter.fieldid.split("-");
            return idParts.length === 1 || idParts[1] === "range";
        }).map(filter => {
            const idParts = filter.fieldid.split("-");
            const retVal: DDL2.IField = {
                id: idParts[0],
                type: "string"
            };
            return retVal;
        });
    }

    getVizField(vizID: string, fieldID: string): DDL2.IField {
        return {
            type: "string",
            id: "",
            default: ""
        };
    }

    writeDatasources(): DDL2.DatasourceType[] {
        const retVal: DDL2.DatasourceType[] = [];
        for (const id in this._ddl2Datasources) {
            retVal.push(this._ddl2Datasources[id]);
        }
        return retVal;
    }

    writeDataviews(): DDL2.IView[] {
        const retVal: DDL2.IView[] = [];
        for (const id in this._ddl2Dataviews) {
            retVal.push(this._ddl2Dataviews[id]);
        }
        return retVal;
    }

    writeProperties(): DDL2.IWidgetProperties {
        return {};
    }

    write(): DDL2.Schema {
        return {
            version: "0.0.22",
            datasources: this.writeDatasources(),
            dataviews: this.writeDataviews(),
            properties: this.writeProperties()
        };
    }
}

export function upgrade(ddl: DDL1.IDDL, baseUrl?: string, wuid?: string, toLowerCase: boolean = true): DDL2.Schema {
    const ddlUp = new DDLUpgrade(ddl, baseUrl, wuid, toLowerCase);
    return ddlUp.write();
}
