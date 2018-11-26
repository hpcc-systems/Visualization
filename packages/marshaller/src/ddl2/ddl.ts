import { DDL2 } from "@hpcc-js/ddl-shim";
import { scopedLogger } from "@hpcc-js/util";
import { ActivityPipeline, ReferencedFields } from "./activities/activity";
import { Databomb, Form } from "./activities/databomb";
import { DatasourceRef, DatasourceRefType, DatasourceType } from "./activities/datasource";
import { DSPicker } from "./activities/dspicker";
import { Filters } from "./activities/filter";
import { GroupBy } from "./activities/groupby";
import { Limit } from "./activities/limit";
import { LogicalFile } from "./activities/logicalfile";
import { Mappings, Project } from "./activities/project";
import { Param, RoxieResult, RoxieResultRef, RoxieService } from "./activities/roxie";
import { Sort } from "./activities/sort";
import { WU, WUResult, WUResultRef } from "./activities/wuresult";
import { Dashboard } from "./dashboard";
import { Element, ElementContainer } from "./model/element";
import { Visualization } from "./model/visualization";

const logger = scopedLogger("marshaller/ddl2/ddl");

function mergeFieldArray(targetArr: DDL2.IField[], sourceArr: DDL2.IField[]): DDL2.IField[] {
    const existing: string[] = targetArr.map(f => f.id);
    return targetArr.concat(sourceArr.filter(f => existing.indexOf(f.id) < 0));
}

class DDLDatasourceAdapter {
    private _dsDedup: { [key: string]: DDL2.DatasourceType };

    constructor() {
    }

    clear() {
        this._dsDedup = {};
    }

    set(ds: DDL2.DatasourceType) {
        this._dsDedup[ds.id] = ds;
    }

    get(ds: DatasourceType): DDL2.DatasourceType {
        const dsID = ds.id();
        let retVal: DDL2.DatasourceType = this._dsDedup[dsID];
        if (!retVal) {
            retVal = ds.toDDL();
            this._dsDedup[dsID] = retVal;
        }
        return retVal;
    }

    getByDatasourceRef(dsRef: DatasourceRefType): DDL2.DatasourceType {
        const ds: DatasourceType = dsRef instanceof RoxieResult ? dsRef.service() : dsRef instanceof WUResult ? dsRef.wu() : dsRef;
        return this._dsDedup[ds.id()];
    }

    getAll(): DDL2.DatasourceType[] {
        const retVal: DDL2.DatasourceType[] = [];
        for (const key in this._dsDedup) {
            retVal.push(this._dsDedup[key]);
        }
        return retVal;
    }

    updateDSFields(dsRef: DatasourceRef, refs: ReferencedFields) {
        const ddlDatasource = this.getByDatasourceRef(dsRef.datasource());
        const dsDetails = dsRef.datasource();
        if (dsRef instanceof RoxieResultRef) {
            const inFields = dsDetails.localFields().filter(field => refs.inputs[dsRef.id()] && refs.inputs[dsRef.id()].indexOf(field.id) >= 0);
            (ddlDatasource as DDL2.IRoxieService).inputs = mergeFieldArray((ddlDatasource as DDL2.IRoxieService).inputs, inFields);
        }
        const outFields = dsDetails.localFields().filter(field => refs.outputs[dsDetails.id()] && refs.outputs[dsDetails.id()].indexOf(field.id) >= 0);
        if (dsRef instanceof RoxieResultRef || dsRef instanceof WUResultRef) {
            const result: DDL2.IOutput = (ddlDatasource as DDL2.IRoxieService).outputs[dsRef.resultName()] || { fields: [] };
            result.fields = mergeFieldArray(result.fields, outFields);
            (ddlDatasource as DDL2.IRoxieService).outputs[dsRef.resultName()] = result;
        } else {
            (ddlDatasource as DDL2.IDatasource).fields = mergeFieldArray((ddlDatasource as DDL2.IDatasource).fields, outFields);
        }
    }
}

export class DDLAdapter {
    private _dashboard: Dashboard;
    private _elementContainer: ElementContainer;
    private _dsWriteDedup: DDLDatasourceAdapter = new DDLDatasourceAdapter();
    private _dsReadDedup: { [id: string]: RoxieService | WU } = {};

    constructor(dashboard: Dashboard) {
        this._dashboard = dashboard;
        this._elementContainer = this._dashboard.elementContainer();
    }

    writeDatasources(): DDL2.DatasourceType[] {
        for (const viz of this._elementContainer.elements()) {
            const pDS: DSPicker | DatasourceRefType = viz.hipiePipeline().datasource();
            const dsT: DatasourceRefType = pDS instanceof DSPicker ? pDS.datasource() : pDS;
            const ds: DatasourceType = dsT instanceof RoxieResult ? dsT.service() : dsT instanceof WUResult ? dsT.wu() : dsT;
            this._dsWriteDedup.get(ds);
        }
        return this._dsWriteDedup.getAll();
    }

    writeFilters(filters: Filters): DDL2.IFilter {
        if (!filters.exists()) return undefined;
        return filters.toDDL();
    }

    readFilters(ddlFilter: DDL2.IFilter, ec: ElementContainer): Filters {
        return Filters.fromDDL(ec, ddlFilter);
    }

    writeProject(project: Project): DDL2.IProject {
        if (!project.exists()) return undefined;
        return project.toDDL();
    }

    readProject(ddlProject: DDL2.IProject): Project {
        return Project.fromDDL(ddlProject);
    }

    writeMappings(mappings: Mappings): DDL2.IMappings {
        if (!mappings.exists()) return { type: "mappings", transformations: [] };
        return mappings.toDDL();
    }

    readMappings(ddlProject: DDL2.IMappings): Mappings {
        return Mappings.fromDDL(ddlProject);
    }

    writeGroupBy(gb: GroupBy): DDL2.IGroupBy {
        if (!gb.exists()) return undefined;
        return gb.toDDL();
    }

    readGroupBy(ddlGB: DDL2.IGroupBy): GroupBy {
        return GroupBy.fromDDL(ddlGB);
    }

    writeSort(sort: Sort): DDL2.ISort {
        if (!sort.exists()) return undefined;
        return sort.toDDL();
    }

    readSort(ddlSort: DDL2.ISort): Sort {
        return Sort.fromDDL(ddlSort);
    }

    writeLimit(limit: Limit): DDL2.ILimit {
        if (!limit.exists()) return undefined;
        return limit.toDDL();
    }

    readLimit(ddlLimit: DDL2.ILimit): Limit {
        return Limit.fromDDL(ddlLimit);
    }

    writeDatasourceRef(dsRef: DatasourceRef): DDL2.IWUResultRef | DDL2.IRoxieServiceRef | DDL2.IDatasourceRef {
        if (dsRef instanceof RoxieResultRef) {
            const retVal: DDL2.IRoxieServiceRef = {
                id: dsRef.datasource().service().id(),
                output: dsRef.resultName(),
                request: dsRef.request().filter(rf => rf.source()).map((rf): DDL2.IRequestField => {
                    return {
                        source: rf.source(),
                        remoteFieldID: rf.remoteField(),
                        localFieldID: rf.localField()
                    };
                })
            };
            return retVal;
        } else if (dsRef instanceof WUResultRef) {
            return {
                id: dsRef.datasource().wu().id(),
                output: dsRef.resultName()
            } as DDL2.IWUResultRef;
        }
        const retVal: DDL2.IDatasourceRef = {
            id: dsRef.datasource().id()
        };
        return retVal;
    }

    readDatasourceRef(ddlDSRef: DDL2.IDatasourceRef, dsPicker: DSPicker, elementContainer: ElementContainer): this {
        if (DDL2.isRoxieServiceRef(ddlDSRef)) {
            dsPicker.datasourceID(`${ddlDSRef.id}_${ddlDSRef.output}`);
            const dsRef = dsPicker.datasourceRef() as RoxieResultRef;
            dsRef
                .request(ddlDSRef.request.map(rf => {
                    return Param.fromDDL(this._elementContainer, rf);
                }))
                ;
        } else if (DDL2.isWUResultRef(ddlDSRef)) {
            const wu = this._dsReadDedup[ddlDSRef.id] as WU;
            dsPicker.datasourceID(wu.output(ddlDSRef.output).id());
        } else {
            dsPicker.datasourceID(ddlDSRef.id);
        }
        return this;
    }

    writeActivities(view: ActivityPipeline): DDL2.ActivityType[] {
        return view.activities().map(activity => {
            if (activity instanceof Filters) {
                return this.writeFilters(activity);
            } else if (activity instanceof Filters) {
                return this.writeFilters(activity);
            } else if (activity instanceof Project) {
                return this.writeProject(activity);
            } else if (activity instanceof GroupBy) {
                return this.writeGroupBy(activity);
            } else if (activity instanceof Sort) {
                return this.writeSort(activity);
            } else if (activity instanceof Limit) {
                return this.writeLimit(activity);
            } else if (activity instanceof Mappings) {
                return this.writeMappings(activity);
            } else {
                logger.warning(`Unknown activity type: ${activity.classID()}`);
            }
        }).filter(activity => !!activity);
    }

    writeVisualization(visualization: Visualization): DDL2.IVisualization {
        return {
            id: visualization.chartPanel().id(),
            title: visualization.title(),
            description: visualization.description(),
            chartType: visualization.chartType(),
            __class: visualization.chartPanel().widget().classID(),
            mappings: this.writeMappings(visualization.mappings()),
            properties: visualization.properties()
        };
    }

    readVisualization(ddlViz: DDL2.IVisualization, visualization: Visualization): this {
        const mappings = this.readMappings(ddlViz.mappings);
        mappings.trim(true);
        visualization.chartPanel().id(ddlViz.id);
        visualization
            .title(ddlViz.title)
            .description(ddlViz.description)
            .chartType(ddlViz.chartType as any)
            .properties(ddlViz.properties)
            .mappings(mappings)
            ;
        return this;
    }

    writeDDLViews(): DDL2.IView[] {
        //  Gather referenced fields  ---
        const refFields: ReferencedFields = { inputs: {}, outputs: {} };
        for (const element of this._elementContainer.elements()) {
            element.visualization().mappings().referencedFields(refFields);
        }

        return this._elementContainer.elements().map(element => {
            const view = element.hipiePipeline();
            const dsPicker = view.datasource();
            if (dsPicker instanceof DSPicker) {
                const dsRef = dsPicker.datasourceRef();
                const retVal = {
                    id: element.id(),
                    datasource: this.writeDatasourceRef(dsRef),
                    activities: this.writeActivities(view),
                    visualization: this.writeVisualization(element.visualization())
                };
                this._dsWriteDedup.updateDSFields(dsRef, refFields);
                return retVal;
            }
            throw new Error("Missing DSPicker?");
        });
    }

    writeProperties(): DDL2.IWidgetProperties {
        return {
            layout: this._dashboard.layout() as any
        };
    }

    readDDLViews(ddlViews: DDL2.IView[]) {
        for (const ddlView of ddlViews) {
            const element = new Element(this._elementContainer).id(ddlView.id);
            this._elementContainer.append(element);
            const hipiePipeline = element.hipiePipeline();
            this.readDatasourceRef(ddlView.datasource, hipiePipeline.datasource() as DSPicker, this._elementContainer);
            for (const activity of ddlView.activities) {
                if (DDL2.isProjectActivity(activity)) {
                    const project = this.readProject(activity);
                    hipiePipeline.project(project);
                }
                if (DDL2.isFilterActivity(activity)) {
                    const filters = this.readFilters(activity, this._elementContainer);
                    hipiePipeline.filters(filters);
                }
                if (DDL2.isGroupByActivity(activity)) {
                    const groupBy = this.readGroupBy(activity);
                    hipiePipeline.groupBy(groupBy);
                }
                if (DDL2.isSortActivity(activity)) {
                    const sort = this.readSort(activity);
                    hipiePipeline.sort(sort);
                }
                if (DDL2.isLimitActivity(activity)) {
                    const limit = this.readLimit(activity);
                    hipiePipeline.limit(limit);
                }
            }
            this.readVisualization(ddlView.visualization, element.visualization());
        }
    }

    readProperties(properties: DDL2.IWidgetProperties) {
        if (properties && properties.layout) {
            this._dashboard.layoutObj(properties.layout as object);
        }
    }

    write(): DDL2.Schema {
        this._dsWriteDedup.clear();
        const retVal: DDL2.Schema = {
            version: "0.0.22",
            datasources: this.writeDatasources(),
            dataviews: this.writeDDLViews(),
            properties: this.writeProperties()
        };
        return retVal;
    }

    read(ddl: DDL2.Schema) {
        this._dsWriteDedup.clear();
        for (const ddlDS of ddl.datasources) {
            switch (ddlDS.type) {
                case "databomb":
                    this._elementContainer.appendDatasource(Databomb.fromDDL(ddlDS));
                    break;
                case "form":
                    this._elementContainer.appendDatasource(Form.fromDDL(ddlDS));
                    break;
                case "logicalfile":
                    this._elementContainer.appendDatasource(LogicalFile.fromDDL(ddlDS));
                    break;
                case "hipie":
                case "roxie":
                    const rs = RoxieService.fromDDL(ddlDS);
                    this._dsReadDedup[rs.id()] = rs;
                    for (const resultName in ddlDS.outputs) {
                        this._elementContainer.appendDatasource(RoxieResult.fromDDL(this._elementContainer, rs, resultName));
                    }
                    break;
                case "wuresult":
                    const wu = WU.fromDDL(ddlDS);
                    this._dsReadDedup[wu.id()] = wu;
                    for (const resultName in ddlDS.outputs) {
                        this._elementContainer.appendDatasource(wu.output(resultName));
                    }
                    break;
                default:
                    logger.warning(`Unknown ddl datasource type: ${(ddlDS as any).type} `);
            }
        }
        this.readDDLViews(ddl.dataviews);
        this.readProperties(ddl.properties);
    }
}
