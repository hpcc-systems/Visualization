import * as DDL1 from "./ddl";
import * as DDL2 from "./ddl2";

interface IDatasourceOutput {
    datasource: DDL1.IAnyDatasource;
    output: DDL1.IOutput;
}

interface IDatasourceOutputFilter extends IDatasourceOutput {
    filter: DDL1.IFilter;
}

function faCharFix(faChar: string): string {
    if (faChar) {
        return String.fromCharCode(parseInt(faChar));
    }
    return faChar;
}

class DDLUpgrade {
    _ddl: DDL1.IDDL;
    _baseUrl: string;
    _wuid?: string;

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

    constructor(ddl: DDL1.IDDL, baseUrl: string, wuid?: string) {
        this._ddl = ddl;
        this._baseUrl = baseUrl;
        this._wuid = wuid;

        this.indexDDL();
        this.readDDL();
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
                            output: output.from
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
                        fields: this.vizFields2field2(viz.fields)
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
                                        inFieldID: field.properties.params!.param1.toLowerCase(),
                                        fieldID: field.id.toLowerCase()
                                    } as DDL2.IAggregate);
                                    break;
                                case "AVE":
                                    aggrFields.push({
                                        type: this.func2aggr(field.properties.function),
                                        inFieldID: field.properties.params!.param1.toLowerCase(),
                                        baseCountFieldID: field.properties.params!.param2 ? field.properties.params!.param2.toLowerCase() : undefined,
                                        fieldID: field.id.toLowerCase()
                                    } as DDL2.IAggregate);
                                    break;
                                case "SCALE":
                                default:
                                    groupByColumns.push(field.id.toLowerCase());
                                    throw new Error(`Unhandled field function: ${field.properties.function}`);
                            }
                        } else {
                            groupByColumns.push(field.id.toLowerCase());
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
            sourceFieldID: viz.source.mappings.label.toLowerCase()
        });
        mappings.transformations.push({
            fieldID: "weight",
            type: "=",
            sourceFieldID: viz.source.mappings.weight[0].toLowerCase()
        });
    }

    readChoroMappings(viz: DDL1.IChoroVisualization) {
        const mappings = this._ddl2DataviewActivities[viz.id].mappings;
        mappings.transformations.push({
            fieldID: "label",
            type: "=",
            sourceFieldID: this.anyChoroMapping2label(viz.source.mappings).toLowerCase()
        });
        mappings.transformations.push({
            fieldID: "weight",
            type: "=",
            sourceFieldID: viz.source.mappings.weight[0].toLowerCase()
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
            sourceFieldID: viz.source.mappings.x[0].toLowerCase()
        });
        for (let i = 0; i < viz.source.mappings.y.length; ++i) {
            mappings.transformations.push({
                fieldID: viz.source.mappings.y[i],
                type: "=",
                sourceFieldID: viz.source.mappings.y[i].toLowerCase()
            });
        }
    }

    readTableMappings(viz: DDL1.ITableVisualization) {
        const mappings = this._ddl2DataviewActivities[viz.id].mappings;
        for (let i = 0; i < viz.label.length; ++i) {
            mappings.transformations.push({
                fieldID: viz.label[i],
                type: "=",
                sourceFieldID: viz.source.mappings.value[i].toLowerCase()
            });
        }
    }

    readGraphEnums(valueMappings: DDL1.IValueMappings, annotation: boolean = false): DDL2.IMapMapping[] {
        const retVal: DDL2.IMapMapping[] = [];
        for (const value in valueMappings) {
            const newValue: { [key: string]: string | number | boolean } = {};
            for (const key in valueMappings[value]) {
                if (key === "faChar") {
                    newValue[key] = faCharFix(valueMappings[value][key] as string);
                } else if (annotation && key.indexOf("icon_") === 0) {
                    console.log("Deprecated flag property:  " + key);
                    newValue[key.split("icon_")[1]] = valueMappings[value][key];
                } else {
                    newValue[key] = valueMappings[value][key];
                }
            }
            retVal.push({
                value,
                newValue
            });
        }
        return retVal;
    }

    readGraphMappings(viz: DDL1.IGraphVisualization) {
        const mappings = this._ddl2DataviewActivities[viz.id].mappings;
        mappings.transformations.push({
            fieldID: "uid",
            type: "=",
            sourceFieldID: viz.source.mappings.uid.toLowerCase()
        });
        mappings.transformations.push({
            fieldID: "label",
            type: "=",
            sourceFieldID: viz.source.mappings.label.toLowerCase()
        });
        mappings.transformations.push({
            fieldID: "icon",
            type: "map",
            sourceFieldID: viz.icon.fieldid.toLowerCase(),
            default: { fachar: faCharFix(viz.icon.faChar) },
            mappings: this.readGraphEnums(viz.icon.valuemappings)
        });
        let idx = 0;
        for (const flag of viz.flag) {
            mappings.transformations.push({
                fieldID: `annotation_${idx++}`,
                type: "map",
                sourceFieldID: flag.fieldid.toLowerCase(),
                default: {},
                mappings: this.readGraphEnums(flag.valuemappings, true)
            });
        }
        mappings.transformations.push({
            fieldID: "links",
            type: "=",
            sourceFieldID: viz.source.link.childfile.toLowerCase(),
            transformations: [{
                fieldID: "uid",
                type: "=",
                sourceFieldID: viz.source.link.mappings.uid.toLowerCase()
            }]
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
                                            remoteFieldID: key.toLowerCase(),
                                            localFieldID: update.mappings[key].toLowerCase()
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
                                        condition.mappings.push({
                                            remoteFieldID: key.toLowerCase(),
                                            localFieldID: update.mappings[key].toLowerCase(),
                                            condition: dsFilter.rule,
                                            nullable: dsFilter.nullable
                                        } as DDL2.IMapping);
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

    readSort() {
        for (const dash of this._ddl.dashboards) {
            for (const viz of dash.visualizations) {
                if ((viz as any).source) {
                    if ((viz as any).source.sort) {
                        const vizSort = this._ddl2DataviewActivities[viz.id].sort;
                        vizSort.conditions = ((viz as any).source.sort as string[]).map(s => {
                            if (s.indexOf("-") === 0) {
                                return {
                                    fieldID: s.substr(1).toLowerCase(),
                                    descending: true
                                } as DDL2.ISortCondition;
                            }
                            return {
                                fieldID: s.toLowerCase(),
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
                limit,
                mappings
            ],
            visualization: {
                id: viz.id,
                title: viz.title || "",
                description: "",
                ...this.type2chartType(viz.type),
                properties: viz.properties as DDL2.IWidgetProperties || {}
            }
        };
    }

    type2chartType(chartType: DDL1.VisualizationType): { chartType: string, moduleName: string, className: string, memberName?: string } {
        switch (chartType) {
            case "LINE":
                return { chartType, moduleName: "@hpcc-js/chart", className: "Line" };
            case "BUBBLE":
                return { chartType, moduleName: "@hpcc-js/chart", className: "Bubble" };
            case "PIE":
                return { chartType, moduleName: "@hpcc-js/chart", className: "Pie" };
            case "BAR":
                return { chartType, moduleName: "@hpcc-js/chart", className: "Column" };
            case "FORM":
                return { chartType, moduleName: "@hpcc-js/form", className: "Form" };
            case "WORD_CLOUD":
                return { chartType, moduleName: "@hpcc-js/other", className: "WordCloud" };
            case "CHORO":
                return { chartType, moduleName: "@hpcc-js/map", className: "ChoroUSStates" };
            case "SLIDER":
                return { chartType, moduleName: "@hpcc-js/form", className: "Slider" };
            case "HEAT_MAP":
                return { chartType, moduleName: "@hpcc-js/other", className: "HeatMap" };
            case "2DCHART":
                return { chartType, moduleName: "@hpcc-js/chart", className: "Column" };
            case "GRAPH":
                return { chartType: "ADJACENCY_GRAPH", moduleName: "@hpcc-js/graph", className: "AdjacencyGraph" };
            case "TABLE":
            default:
                return { chartType, moduleName: "@hpcc-js/grid", className: "Table" };
        }
    }

    vizFields2field2(fields?: DDL1.IVisualizationField[]): DDL2.IField[] {
        if (!fields) return [];
        return fields.map(field => {
            switch (field.properties.type) {
                case "range":
                    return {
                        type: "range" as DDL2.IFieldType,
                        id: field.id,
                        default: field.properties.default ? field.properties.default as [DDL2.IPrimative, DDL2.IPrimative] : [undefined, undefined]
                    };
                case "dataset":
                    return {
                        type: "dataset" as DDL2.IFieldType,
                        id: field.id,
                        default: []
                    };
                default:
                    return {
                        type: this.vizFieldType2fieldType(field.properties.datatype),
                        id: field.id,
                        default: field.properties.default ? field.properties.default[0] : null
                    };
            }
        });
    }

    vizFieldType2fieldType(fieldType: DDL1.VisualizationFieldType): "string" | "number" | "boolean" {
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
            default:
                return "string";
        }
    }

    output2output(output: DDL1.IOutput, target: DDL2.OutputDict) {
        target[output.id] = {
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

    write(): DDL2.Schema {
        return {
            version: "0.0.22",
            datasources: this.writeDatasources(),
            dataviews: this.writeDataviews()
        };
    }
}

export function upgrade(ddl: DDL1.IDDL, baseUrl: string, wuid?: string): DDL2.Schema {
    const ddlUp = new DDLUpgrade(ddl, baseUrl, wuid);
    return ddlUp.write();
}
