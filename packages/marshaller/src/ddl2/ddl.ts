import { DDL2 } from "@hpcc-js/ddl-shim";
import { scopedLogger } from "@hpcc-js/util";
import { BUILD_VERSION, PKG_NAME, PKG_VERSION } from "../__package__";
import { ActivityPipeline, ReferencedFields } from "./activities/activity";
import { Databomb } from "./activities/databomb";
import { DatasourceRef, DatasourceRefType, DatasourceType } from "./activities/datasource";
import { DSPicker } from "./activities/dspicker";
import { Filters } from "./activities/filter";
import { Form } from "./activities/form";
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

type DatasourceRefTypeMap = { [key: string]: DatasourceRefType };
type ServerRefTypeMap = { [key: string]: { ds: DatasourceType, result: DatasourceRefTypeMap } };

class DDLDatasourceAdapter {
    private _dsDedup: ServerRefTypeMap;

    constructor() {
    }

    clear() {
        this._dsDedup = {};
    }

    id(dsT: DatasourceType): string {
        if (dsT instanceof WU) {
            return `${dsT.url()}/${dsT.wuid()}`;
        } else if (dsT instanceof RoxieService) {
            return `${dsT.url()}/${dsT.querySet()}/${dsT.queryID()}`;
        }
        return dsT.id();
    }

    append(pDS: DSPicker | DatasourceRefType) {
        const dsT: DatasourceRefType = pDS instanceof DSPicker ? pDS.datasource() : pDS;
        const dsTID = dsT.id();
        const ds: DatasourceType = dsT instanceof RoxieResult ? dsT.service() : dsT instanceof WUResult ? dsT.wu() : dsT;
        const dsID = this.id(ds);
        if (!this._dsDedup[dsID]) {
            this._dsDedup[dsID] = {
                ds,
                result: {}
            };
        } else {
            //  Common up WU and RoxieService datasources!
            if (dsT instanceof RoxieResult) {
                dsT.service(this._dsDedup[dsID].ds as RoxieService);
            } else if (dsT instanceof WUResult) {
                dsT.wu(this._dsDedup[dsID].ds as WU);
            }
        }
        if (!this._dsDedup[dsID].result[dsTID]) {
            this._dsDedup[dsID].result[dsTID] = dsT;
        }
    }

    getAll(): DDL2.DatasourceType[] {
        const retVal: DDL2.DatasourceType[] = [];
        for (const key in this._dsDedup) {
            const ddl = this._dsDedup[key].ds.toDDL();
            if (ddl.type === "wuresult" || ddl.type === "roxie") {
                for (const key2 in this._dsDedup[key].result) {
                    const ddl2 = this._dsDedup[key].result[key2].toDDL();
                    if (ddl2.type === "wuresult" || ddl2.type === "roxie") {
                        for (const key3 in ddl2.outputs) {
                            ddl.outputs[key3] = ddl2.outputs[key3];
                        }
                    }
                }
            }
            retVal.push(ddl);
        }
        return retVal;
    }
}

export class DDLAdapter {
    private _dashboard: Dashboard;
    private _ec: ElementContainer;
    private _dsWriteDedup: DDLDatasourceAdapter = new DDLDatasourceAdapter();
    private _dsReadDedup: { [id: string]: RoxieService | WU } = {};

    constructor(dashboard: Dashboard) {
        this._dashboard = dashboard;
        this._ec = this._dashboard.elementContainer();
    }

    writeDatasources(): DDL2.DatasourceType[] {
        for (const viz of this._ec.elements()) {
            this._dsWriteDedup.append(viz.hipiePipeline().datasource());
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
                    return Param.fromDDL(this._ec, rf);
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
            visibility: visualization.visibility(),
            chartType: visualization.chartType(),
            __class: visualization.chartPanel().widget().classID(),
            mappings: this.writeMappings(visualization.mappings()),
            properties: visualization.properties()
        };
    }

    readVisualization(ddlViz: DDL2.IVisualization, visualization: Visualization): this {
        const mappings = this.readMappings(ddlViz.mappings);
        visualization.chartPanel().id(ddlViz.id);
        visualization
            .title(ddlViz.title)
            .description(ddlViz.description)
            .visibility(ddlViz.visibility)
            .chartType(ddlViz.chartType as any)
            .properties(ddlViz.properties)
            .mappings(mappings)
            ;
        return this;
    }

    writeDDLViews(): DDL2.IView[] {
        //  Gather referenced fields  ---
        const refFields: ReferencedFields = { inputs: {}, outputs: {} };
        for (const element of this._ec.elements()) {
            element.visualization().mappings().referencedFields(refFields);
        }

        return this._ec.elements().map(element => {
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
                return retVal;
            }
            throw new Error("Missing DSPicker?");
        });
    }

    writeProperties(): DDL2.IProperties {
        return {
            name: PKG_NAME,
            version: PKG_VERSION,
            buildVersion: BUILD_VERSION,
            layout: this._dashboard.layout() as any
        };
    }

    readDDLViews(ddlViews: DDL2.IView[]) {
        for (const ddlView of ddlViews) {
            const element = new Element(this._ec).id(ddlView.id);
            this._ec.append(element);
            const hipiePipeline = element.hipiePipeline();
            this.readDatasourceRef(ddlView.datasource, hipiePipeline.datasource() as DSPicker, this._ec);
            for (const activity of ddlView.activities) {
                if (DDL2.isProjectActivity(activity)) {
                    const project = this.readProject(activity);
                    hipiePipeline.project(project);
                }
                if (DDL2.isFilterActivity(activity)) {
                    const filters = this.readFilters(activity, this._ec);
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

    readProperties(properties: DDL2.IProperties) {
        if (properties && properties.layout) {
            this._dashboard.layoutObj(properties.layout as object);
        }
    }

    write(): DDL2.Schema {
        this._dsWriteDedup.clear();
        const retVal: DDL2.Schema = {
            version: "2.0.23",
            createdBy: {
                name: PKG_NAME,
                version: PKG_VERSION
            },
            datasources: this.writeDatasources(),
            dataviews: this.writeDDLViews(),
            properties: this.writeProperties(),
            hipieProperties: this._dashboard.hipieProps()
        };
        return retVal;
    }

    read(ddl: DDL2.Schema) {
        this._dsWriteDedup.clear();
        for (const ddlDS of ddl.datasources) {
            switch (ddlDS.type) {
                case "databomb":
                    this._ec.appendDatasource(Databomb.fromDDL(ddlDS));
                    break;
                case "form":
                    this._ec.appendDatasource(Form.fromDDL(ddlDS));
                    break;
                case "logicalfile":
                    this._ec.appendDatasource(LogicalFile.fromDDL(this._ec, ddlDS));
                    break;
                case "hipie":
                case "roxie":
                    const rs = RoxieService.fromDDL(this._ec, ddlDS);
                    this._dsReadDedup[rs.id()] = rs;
                    for (const resultName in ddlDS.outputs) {
                        this._ec.appendDatasource(RoxieResult.fromDDL(this._ec, rs, resultName));
                    }
                    break;
                case "wuresult":
                    const wu = WU.fromDDL(this._ec, ddlDS);
                    this._dsReadDedup[wu.id()] = wu;
                    for (const resultName in ddlDS.outputs) {
                        this._ec.appendDatasource(wu.output(resultName));
                    }
                    break;
                default:
                    logger.warning(`Unknown ddl datasource type: ${(ddlDS as any).type} `);
            }
        }
        this.readDDLViews(ddl.dataviews);
        this.readProperties(ddl.properties);
        this._dashboard.hipieProps(ddl.hipieProperties);
    }
}
