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
import { Param, RestResult, RestResultRef, RestService } from "./activities/rest";
import { HipieResultRef, RoxieResult, RoxieResultRef, RoxieService } from "./activities/roxie";
import { Sort } from "./activities/sort";
import { WU, WUResult, WUResultRef } from "./activities/wuresult";
import { Dashboard } from "./dashboard";
import { Element, ElementContainer } from "./model/element";
import { Visualization } from "./model/visualization";

const logger = scopedLogger("marshaller/ddl2/ddl");

type DatasourceRefTypeMap = { [key: string]: { refType: DatasourceRefType, ref: DatasourceRef } };
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
        } else if (dsT instanceof RestService) {
            return `${dsT.url()}/${dsT.action()}`;
        }
        return dsT.id();
    }

    _resolveID(dsT: DatasourceType): string {
        return this._dsDedup[this.id(dsT)].ds.id();
    }

    resolveID(dsRef: DatasourceRef): string | undefined {
        if (dsRef instanceof WUResultRef) {
            return this._resolveID(dsRef.datasource().wu());
        } else if (dsRef instanceof RoxieResultRef) {
            return this._resolveID(dsRef.datasource().service());
        } else if (dsRef instanceof HipieResultRef) {
            return this._resolveID(dsRef.datasource().service());
        } else if (dsRef instanceof RestResultRef) {
            return this._resolveID(dsRef.datasource().service());
        }
    }

    append(pDS: DSPicker | DatasourceRefType) {
        const refType: DatasourceRefType = pDS instanceof DSPicker ? pDS.datasource() : pDS;
        const ref: DatasourceRef = pDS instanceof DSPicker ? pDS.datasourceRef() : undefined;
        const dsTID = refType.id();
        const ds: DatasourceType = refType instanceof WUResult ? refType.wu() : refType instanceof RoxieResult ? refType.service() : refType instanceof RestResult ? refType.service() : refType;
        const dsID = this.id(ds);
        if (!this._dsDedup[dsID]) {
            this._dsDedup[dsID] = {
                ds,
                result: {}
            };
        }
        if (!this._dsDedup[dsID].result[dsTID]) {
            this._dsDedup[dsID].result[dsTID] = {
                refType,
                ref
            };
        }
    }

    getAll(): DDL2.DatasourceType[] {
        const retVal: DDL2.DatasourceType[] = [];
        for (const key in this._dsDedup) {
            const ddl = this._dsDedup[key].ds.toDDL();

            //  Inputs ---
            if (ddl.type === "roxie" || ddl.type === "hipie" || ddl.type === "rest") {
                const inputs: { [fieldID: string]: DDL2.IField } = {};
                for (const key2 in this._dsDedup[key].result) {
                    const ddl2 = this._dsDedup[key].result[key2].refType.toDDL();
                    const refs: ReferencedFields = {
                        inputs: {},
                        outputs: {}
                    };
                    this._dsDedup[key].result[key2].ref.referencedFields(refs);
                    for (const inElementID in refs.inputs) {
                        refs.inputs[inElementID].forEach(fieldID => {
                            inputs[fieldID] = (ddl2 as any).inputs.filter(row => row.id === fieldID)[0];
                        });
                    }
                }
                ddl.inputs = [];
                for (const key in inputs) {
                    ddl.inputs.push(inputs[key]);
                }
            }

            //  Outputs ---
            if (ddl.type === "wuresult" || ddl.type === "roxie" || ddl.type === "hipie" || ddl.type === "rest") {
                const outputs: { [fieldID: string]: DDL2.IOutput } = {};
                for (const key2 in this._dsDedup[key].result) {
                    const ddl2 = this._dsDedup[key].result[key2].refType.toDDL();
                    if (ddl2.type === "wuresult" || ddl2.type === "roxie" || ddl2.type === "hipie" || ddl2.type === "rest") {
                        for (const outputID in ddl2.outputs) {
                            outputs[outputID] = ddl2.outputs[outputID];
                        }
                    }
                }
                ddl.outputs = {};
                for (const key in outputs) {
                    ddl.outputs[key] = outputs[key];
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
    private _dsReadDedup: { [id: string]: WU | RoxieService | RestService } = {};

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

    readDatasourceRef(ddlDSRef: DDL2.IDatasourceRef, dsPicker: DSPicker, elementContainer: ElementContainer): this {
        if (DDL2.isWUResultRef(ddlDSRef)) {
            const wu = this._dsReadDedup[ddlDSRef.id] as WU;
            dsPicker.datasourceID(wu.output(ddlDSRef.output).id());
        } else if (DDL2.isRoxieServiceRef(ddlDSRef)) {
            dsPicker.datasourceID(`${ddlDSRef.id}_${ddlDSRef.output}`);
            const dsRef = dsPicker.datasourceRef() as RoxieResultRef | RestResultRef;
            dsRef
                .request(ddlDSRef.request.map(rf => {
                    return Param.fromDDL(this._ec, rf);
                }))
                ;
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
            } else if (activity instanceof DSPicker) {
                // Fall through  ---
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
            properties: visualization.properties(),
            secondaryDataviewID: visualization.secondaryDataviewID()
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
            .secondaryDataviewID(ddlViz.secondaryDataviewID)
            ;
        return this;
    }

    writeViewDatasource(dsRef: DatasourceRef) {
        const retVal = dsRef.toDDL();
        retVal.id = this._dsWriteDedup.resolveID(dsRef) || retVal.id;
        return retVal;
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
                    datasource: this.writeViewDatasource(dsRef),
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
            version: "2.2.1",
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
                case "wuresult":
                    const wu = WU.fromDDL(this._ec, ddlDS);
                    this._dsReadDedup[wu.id()] = wu;
                    for (const resultName in ddlDS.outputs) {
                        this._ec.appendDatasource(wu.output(resultName));
                    }
                    break;
                case "roxie":
                case "hipie":
                    const rs = RoxieService.fromDDL(this._ec, ddlDS);
                    this._dsReadDedup[rs.id()] = rs;
                    for (const resultName in ddlDS.outputs) {
                        this._ec.appendDatasource(RoxieResult.fromDDL(this._ec, rs, resultName));
                    }
                    break;
                case "rest":
                    const rs2 = RestService.fromDDL(this._ec, ddlDS);
                    this._dsReadDedup[rs2.id()] = rs2;
                    for (const resultName in ddlDS.outputs) {
                        this._ec.appendDatasource(RestResult.fromDDL(this._ec, rs2, resultName));
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
