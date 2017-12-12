import { DDL2 } from "@hpcc-js/ddl-shim";
import { IField } from "@hpcc-js/dgrid";
import { Activity, ActivityPipeline, ReferencedFields } from "./activities/activity";
import { Databomb, Form } from "./activities/databomb";
import { DSPicker } from "./activities/dspicker";
import { Filters } from "./activities/filter";
import { GroupBy } from "./activities/groupby";
import { Limit } from "./activities/limit";
import { LogicalFile } from "./activities/logicalfile";
import { Project } from "./activities/project";
import { HipieRequest, Param, RoxieRequest } from "./activities/roxie";
import { Sort } from "./activities/sort";
import { WUResult } from "./activities/wuresult";
import { Element, ElementContainer } from "./model";

export { DDL2 };

function writeFields(fields: IField[]): DDL2.IField[] {
    return fields.map(field => {
        const retVal: DDL2.IField = {
            id: field.id,
            type: field.type as any,  //  TODO Align DGrid field type and DDL2 field type
            default: undefined
        };
        if (field.children && field.children.length) {
            retVal.children = this.writeFields(field.children);
        }
        return retVal;
    });
}

class DDLDatasourceAdapter {
    private _dsDedup: { [key: string]: DDL2.DatasourceType };
    private _dsDedupID: { [key: string]: DDL2.DatasourceType };

    constructor() {
    }

    private id(ds: Activity): string {
        const dsDetails = ds instanceof DSPicker ? ds.details() : ds;
        if (dsDetails instanceof RoxieRequest || dsDetails instanceof WUResult) {
            return dsDetails.sourceHash();
        }
        return dsDetails.hash();
    }

    private writeDatasource(ds: Activity, refs: ReferencedFields): DDL2.DatasourceType {
        const dsDetails = ds instanceof DSPicker ? ds.details() : ds;
        if (dsDetails instanceof WUResult) {
            const ddl: DDL2.IWUResult = {
                type: "wuresult",
                id: ds.id(),
                url: dsDetails.url(),
                wuid: dsDetails.wuid(),
                outputs: {}
            };
            return ddl;
        } else if (dsDetails instanceof LogicalFile) {
            const ddl: DDL2.ILogicalFile = {
                type: "logicalfile",
                id: ds.id(),
                url: dsDetails.url(),
                logicalFile: dsDetails.logicalFile(),
                fields: writeFields(dsDetails.localFields().filter(field => refs.outputs[dsDetails.id()] && refs.outputs[dsDetails.id()].indexOf(field.id) >= 0))
            };
            return ddl;
        } else if (dsDetails instanceof Form) {
            const ddl: DDL2.IForm = {
                type: "form",
                id: ds.id(),
                fields: dsDetails.outFields().map((field): DDL2.IField => {
                    return {
                        id: field.id,
                        type: field.type as any,
                        default: field.default
                    };
                })
            };
            return ddl;
        } else if (dsDetails instanceof Databomb) {
            const ddl: DDL2.IDatabomb = {
                type: "databomb",
                id: ds.id(),
                fields: writeFields(dsDetails.localFields().filter(field => refs.outputs[dsDetails.id()] && refs.outputs[dsDetails.id()].indexOf(field.id) >= 0))
            };
            return ddl;
        } else if (dsDetails instanceof HipieRequest) {
            const ddl: DDL2.IHipieService = {
                type: "hipie",
                id: ds.id(),
                url: dsDetails.url(),
                querySet: dsDetails.querySet(),
                queryID: dsDetails.queryID(),
                inputs: [],
                outputs: {}
            };
            return ddl;
        } else if (dsDetails instanceof RoxieRequest) {
            const ddl: DDL2.IRoxieService = {
                type: "roxie",
                id: ds.id(),
                url: dsDetails.url(),
                querySet: dsDetails.querySet(),
                queryID: dsDetails.queryID(),
                inputs: [],
                outputs: {}
            };
            return ddl;
        }
        return undefined;
    }

    clear() {
        this._dsDedup = {};
        this._dsDedupID = {};
    }

    set(ds: DDL2.DatasourceType) {
        this._dsDedup[ds.id] = ds;
        this._dsDedupID[ds.id] = ds;
    }

    get(ds: Activity, refs: ReferencedFields = { inputs: {}, outputs: {} }): DDL2.DatasourceType {
        const dsID = this.id(ds);
        let retVal: DDL2.DatasourceType = this._dsDedup[dsID];
        if (!retVal) {
            retVal = this.writeDatasource(ds, refs);
            this._dsDedup[dsID] = retVal;
        }
        this._dsDedupID[ds.id()] = retVal;
        return retVal;
    }

    getByID(dsID: string): DDL2.DatasourceType {
        return this._dsDedupID[dsID];
    }

    getAll(): DDL2.DatasourceType[] {
        const retVal: DDL2.DatasourceType[] = [];
        for (const key in this._dsDedup) {
            retVal.push(this._dsDedup[key]);
        }
        return retVal;
    }
}

export class DDLAdapter {
    private _elementContainer: ElementContainer;
    private _dsDedup: DDLDatasourceAdapter = new DDLDatasourceAdapter();

    constructor(dashboard: ElementContainer) {
        this._elementContainer = dashboard;
    }

    readDatasource(_ddlDS: DDL2.DatasourceType, ds: Activity): this {
        if (ds instanceof DSPicker) {
            ds
                .id(_ddlDS.id)
                .type(_ddlDS.type)
                ;
        }
        const dsDetails = ds instanceof DSPicker ? ds.details() : ds;
        if (dsDetails instanceof WUResult) {
            const ddlDS = _ddlDS as DDL2.IWUResult;
            dsDetails
                .url(ddlDS.url)
                .wuid(ddlDS.wuid)
                ;
        } else if (dsDetails instanceof LogicalFile) {
            const ddlDS = _ddlDS as DDL2.ILogicalFile;
            dsDetails
                .url(ddlDS.url)
                .logicalFile(ddlDS.logicalFile)
                ;
        } else if (dsDetails instanceof Form) {
            const ddlDS = _ddlDS as DDL2.IForm;
            const payload = {};
            for (const field of ddlDS.fields) {
                switch (field.type) {
                    case "boolean":
                        payload[field.id] = field.default || false;
                        break;
                    case "number":
                        payload[field.id] = field.default || 0;
                        break;
                    case "string":
                    default:
                        payload[field.id] = field.default || "";
                        break;
                }
            }
            dsDetails.payload(payload);
        } else if (dsDetails instanceof Databomb) {
        } else if (dsDetails instanceof RoxieRequest) {
            const ddlDS = _ddlDS as DDL2.IRoxieService;
            dsDetails
                .url(ddlDS.url)
                .querySet(ddlDS.querySet)
                .queryID(ddlDS.queryID)
                ;
        }
        return this;
    }

    writeDatasources(): DDL2.DatasourceType[] {
        for (const viz of this._elementContainer.elements()) {
            const ds = viz.view().dataSource();

            //  Prime ds;
            this._dsDedup.get(ds);
        }
        return this._dsDedup.getAll();
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

    writeDatasourceRef(ds: Activity, refs: ReferencedFields): DDL2.IWUResultRef | DDL2.IRoxieServiceRef | DDL2.IDatasourceRef {
        const dsDetails = ds instanceof DSPicker ? ds.details() : ds;
        if (dsDetails instanceof RoxieRequest) {
            const retVal: DDL2.IRoxieServiceRef = {
                id: this._dsDedup.get(ds).id,
                request: dsDetails.request().map((rf): DDL2.IRequestField => {
                    return {
                        source: rf.source(),
                        remoteFieldID: rf.remoteField(),
                        localFieldID: rf.localField()
                    };
                }),
                output: dsDetails.resultName()
            };
            return retVal;
        } else if (dsDetails instanceof WUResult) {
            const retVal: DDL2.IWUResultRef = {
                id: this._dsDedup.get(ds).id,
                output: dsDetails.resultName()
            };
            return retVal;
        }
        const retVal: DDL2.IDatasourceRef = {
            id: this._dsDedup.get(ds).id
        };
        return retVal;
    }

    readDatasourceRef(ddlDSRef: DDL2.IRoxieServiceRef | DDL2.IDatasourceRef, ds: Activity, elementContainer: ElementContainer): this {
        const ddlDS = this._dsDedup.getByID(ddlDSRef.id);
        this.readDatasource(ddlDS, ds);
        const dsDetails = ds instanceof DSPicker ? ds.details() : ds;
        if (dsDetails instanceof WUResult && DDL2.isIWUResultRef(ddlDSRef)) {
            dsDetails.resultName(ddlDSRef.output);
        } else if (dsDetails instanceof RoxieRequest && DDL2.isIRoxieServiceRef(ddlDSRef)) {
            dsDetails.resultName(ddlDSRef.output);
            dsDetails.request(ddlDSRef.request.map(rf => {
                return new Param(this._elementContainer)
                    .source(rf.source)
                    .remoteField(rf.remoteFieldID)
                    .localField(rf.localFieldID)
                    ;
            }));
        }
        return this;
    }

    writeActivities(view: ActivityPipeline): DDL2.ActivityType[] {
        return view.activities().map(activity => {
            if (activity instanceof Filters) {
                return this.writeFilters(activity);
            } else if (activity instanceof Project) {
                return this.writeProject(activity);
            } else if (activity instanceof GroupBy) {
                return this.writeGroupBy(activity);
            } else if (activity instanceof Sort) {
                return this.writeSort(activity);
            } else if (activity instanceof Limit) {
                return this.writeLimit(activity);
            }
        }).filter(activity => !!activity);
    }

    mergeFieldArray(targetArr: DDL2.IField[], sourceArr: DDL2.IField[]): DDL2.IField[] {
        const existing: string[] = targetArr.map(f => f.id);
        return targetArr.concat(sourceArr.filter(f => existing.indexOf(f.id) < 0));
    }

    updateDSFields(ds: Activity, refs: ReferencedFields) {
        const ddlDatasource = this._dsDedup.getByID(ds.id());
        const dsDetails = ds instanceof DSPicker ? ds.details() : ds;
        if (dsDetails instanceof RoxieRequest) {
            const inFields = writeFields(dsDetails.localFields().filter(field => refs.inputs[dsDetails.id()] && refs.inputs[dsDetails.id()].indexOf(field.id) >= 0));
            (ddlDatasource as DDL2.IRoxieService).inputs = this.mergeFieldArray((ddlDatasource as DDL2.IRoxieService).inputs, inFields);
        }
        const outFields = writeFields(dsDetails.localFields().filter(field => refs.outputs[dsDetails.id()] && refs.outputs[dsDetails.id()].indexOf(field.id) >= 0));
        if (dsDetails instanceof RoxieRequest || dsDetails instanceof WUResult) {
            const result: DDL2.IOutput = (ddlDatasource as DDL2.IRoxieService).outputs[dsDetails.resultName()] || { fields: [] };
            result.fields = this.mergeFieldArray(result.fields, outFields);
            (ddlDatasource as DDL2.IRoxieService).outputs[dsDetails.resultName()] = result;
        } else {
            (ddlDatasource as DDL2.IDatasource).fields = this.mergeFieldArray((ddlDatasource as DDL2.IDatasource).fields, outFields);
        }
    }

    writeDDLViews(): DDL2.IView[] {
        const refs: ReferencedFields = { inputs: {}, outputs: {} };
        for (const viz of this._elementContainer.elements()) {
            viz.view().referencedFields(refs);
        }
        return this._elementContainer.elements().map(viz => {
            const view = viz.view();
            const ds = view.dataSource();
            const retVal = {
                id: viz.id(),
                datasource: this.writeDatasourceRef(ds, refs),
                activities: this.writeActivities(view)
            };
            this.updateDSFields(ds, refs);
            return retVal;
        });
    }

    readDDLViews(ddlViews: DDL2.IView[]) {
        for (const ddlView of ddlViews) {
            const viz = new Element(this._elementContainer).id(ddlView.id).title(ddlView.id);
            this._elementContainer.append(viz);
            const view = viz.view();
            this.readDatasourceRef(ddlView.datasource, view.dataSource(), this._elementContainer);
            const activities: Activity[] = [
                view.dataSource(),
                ...ddlView.activities.map(activity => {
                    if (DDL2.isFilterActivity(activity)) {
                        return this.readFilters(activity, this._elementContainer);
                    } else if (DDL2.isProjectActivity(activity)) {
                        return this.readProject(activity);
                    } else if (DDL2.isGroupByActivity(activity)) {
                        return this.readGroupBy(activity);
                    } else if (DDL2.isSortActivity(activity)) {
                        return this.readSort(activity);
                    } else if (DDL2.isLimitActivity(activity)) {
                        return this.readLimit(activity);
                    }
                })
            ];
            view.activities(activities);
        }
        // this._dashboard.syncWidgets();
    }

    write(): DDL2.Schema {
        this._dsDedup.clear();
        const retVal: DDL2.Schema = {
            version: "0.0.18",
            datasources: this.writeDatasources(),
            dataviews: this.writeDDLViews()
        };
        return retVal;
    }

    read(ddl: DDL2.Schema) {
        this._dsDedup.clear();
        for (const ds of ddl.datasources) {
            this._dsDedup.set(ds);
        }
        this.readDDLViews(ddl.dataviews);
    }
}
