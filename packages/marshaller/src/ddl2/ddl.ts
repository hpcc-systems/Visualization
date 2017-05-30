import { DDL2 } from "@hpcc-js/ddl-shim";
import { IField } from "@hpcc-js/dgrid";
import { ReferencedFields } from "./activities/activity";
import { Databomb, Form } from "./activities/databomb";
import { DSPicker } from "./activities/dspicker";
import { ColumnMapping, Filter, Filters } from "./activities/filter";
import { AggregateField, GroupBy, GroupByColumn } from "./activities/groupby";
import { Limit } from "./activities/limit";
import { LogicalFile } from "./activities/logicalfile";
import { ComputedField, Project } from "./activities/project";
import { Param, RoxieRequest } from "./activities/roxie";
import { Sort, SortColumn } from "./activities/sort";
import { WUResult } from "./activities/wuresult";
import { Dashboard } from "./dashboard";
import { Viz } from "./viz";

export { DDL2 };

export class DDLAdapter {
    private _dashboard: Dashboard;
    private _dsDedup: { [key: string]: DDL2.DatasourceType };

    constructor(dashboard: Dashboard) {
        this._dashboard = dashboard;
    }

    writeDatasource(ds, refs: ReferencedFields): DDL2.DatasourceType {
        const dsDetails = ds.details();
        if (dsDetails instanceof WUResult) {
            const ddl: DDL2.IWUResult = {
                type: "wuresult",
                id: ds.id(),
                url: dsDetails.url(),
                wuid: dsDetails.wuid(),
                resultName: dsDetails.resultName(),
                fields: this.writeFields(dsDetails.localFields().filter(field => refs[dsDetails.id()] && refs[dsDetails.id()].indexOf(field.id) >= 0))
            };
            return ddl;
        } else if (dsDetails instanceof LogicalFile) {
            const ddl: DDL2.ILogicalFile = {
                type: "logicalfile",
                id: ds.id(),
                url: dsDetails.url(),
                logicalFile: dsDetails.logicalFile(),
                fields: this.writeFields(dsDetails.localFields().filter(field => refs[dsDetails.id()] && refs[dsDetails.id()].indexOf(field.id) >= 0))
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
                        default: ""
                    };
                })
            };
            return ddl;
        } else if (dsDetails instanceof Databomb) {
            const ddl: DDL2.IDatabomb = {
                type: "databomb",
                id: ds.id(),
                fields: this.writeFields(dsDetails.localFields().filter(field => refs[dsDetails.id()] && refs[dsDetails.id()].indexOf(field.id) >= 0))
            };
            return ddl;
        } else if (dsDetails instanceof RoxieRequest) {
            const ddl: DDL2.IRoxieService = {
                type: "roxieservice",
                id: ds.id(),
                url: dsDetails.url(),
                querySet: dsDetails.querySet(),
                queryID: dsDetails.queryID(),
                resultName: dsDetails.resultName(),
                fields: this.writeFields(dsDetails.localFields().filter(field => refs[dsDetails.id()] && refs[dsDetails.id()].indexOf(field.id) >= 0))
            };
            return ddl;
        }
        return undefined;
    }

    readDatasource(_ddlDS: DDL2.DatasourceType, ds: DSPicker): this {
        ds
            .id(_ddlDS.id)
            .type(_ddlDS.type)
            ;
        const dsDetails = ds.details();
        if (dsDetails instanceof WUResult) {
            const ddlDS = _ddlDS as DDL2.IWUResult;
            dsDetails
                .url(ddlDS.url)
                .wuid(ddlDS.wuid)
                .resultName(ddlDS.resultName)
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
        const retVal: DDL2.DatasourceType[] = [];
        for (const viz of this._dashboard.visualizations()) {
            const ds = viz.view().dataSource();
            if (!this._dsDedup[ds.hash()]) {
                const ddlDataSource = this.writeDatasource(ds, {});
                this._dsDedup[ds.hash()] = ddlDataSource;
                retVal.push(ddlDataSource);
            }
        }
        return retVal;
    }

    writeFields(fields: IField[]): DDL2.IField[] {
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

    writeFilters(filters: Filters): DDL2.IFilter {
        if (!filters.exists()) return undefined;
        return {
            type: "filter",
            conditions: filters.validFilters().map((filter): DDL2.IFilterCondition => {
                return {
                    viewID: filter.source(),
                    nullable: filter.nullable(),
                    mappings: filter.validMappings().map((mapping): DDL2.IMapping => {
                        return {
                            remoteFieldID: mapping.remoteField(),
                            localFieldID: mapping.localField(),
                            condition: mapping.condition()
                        };
                    })
                };
            })
        };
    }

    readFilters(ddlFilter: DDL2.IFilter, filters: Filters): this {
        if (ddlFilter) {
            filters.filter(ddlFilter.conditions.map(condition => {
                const filter = new Filter(filters);
                filter
                    .source(condition.viewID)
                    .nullable(condition.nullable)
                    .mappings(condition.mappings.map(mapping => {
                        return new ColumnMapping(filter)
                            .remoteField(mapping.remoteFieldID)
                            .localField(mapping.localFieldID)
                            .condition(mapping.condition)
                            ;
                    }))
                    ;
                return filter;
            }));
        }
        return this;
    }

    writeProject(project: Project): DDL2.IProject {
        if (!project.exists()) return undefined;
        return {
            type: "project",
            transformations: project.validComputedFields().map((cf): DDL2.TransformationType => {
                if (cf.type() === "scale") {
                    return {
                        fieldID: cf.label(),
                        type: "scale" as any,
                        param1: cf.column1(),
                        factor: cf.constValue()
                    };
                } else {
                    return {
                        fieldID: cf.label(),
                        type: cf.type() as any,
                        param1: cf.column1(),
                        param2: cf.column2()
                    };
                }
            })
        };
    }

    readProject(ddlProject: DDL2.IProject, project: Project): this {
        if (ddlProject) {
            project.computedFields(ddlProject.transformations.map(transformation => {
                if (transformation.type === "scale") {
                    return new ComputedField(project)
                        .label(transformation.fieldID)
                        .type(transformation.type)
                        .column1(transformation.param1)
                        .constValue(transformation.factor)
                        ;
                } else {
                    return new ComputedField(project)
                        .label(transformation.fieldID)
                        .type(transformation.type)
                        .column1(transformation.param1)
                        .column2(transformation.param2)
                        ;
                }
            }));
        }
        return this;
    }

    writeGroupBy(gb: GroupBy): DDL2.IGroupBy {
        if (!gb.exists()) return undefined;
        return {
            type: "groupby",
            groupByIDs: gb.validGroupBy().map(col => col.label()),
            aggregates: gb.validComputedFields().map((cf): DDL2.AggregateType => {
                if (cf.aggrType() === "count") {
                    return {
                        label: cf.label(),
                        type: "count"
                    };
                }
                return {
                    label: cf.label(),
                    type: cf.aggrType() as any,
                    fieldID: cf.aggrColumn()
                };
            })
        };
    }

    readGroupBy(ddlGB: DDL2.IGroupBy, gb: GroupBy): this {
        if (ddlGB) {
            gb
                .column(ddlGB.groupByIDs.map(field => {
                    return new GroupByColumn(gb).label(field);
                }))
                .computedFields(ddlGB.aggregates.map(aggregate => {
                    const af = new AggregateField(gb)
                        .aggrType(aggregate.type)
                        .label(aggregate.label)
                        ;
                    if (aggregate.type !== "count") {
                        af.aggrColumn(aggregate.fieldID);
                    }
                    return af;
                }))
                ;
        }
        return this;
    }

    writeSort(sort: Sort): DDL2.ISort {
        if (!sort.exists()) return undefined;
        return {
            type: "sort",
            conditions: sort.validSortBy().map((sortBy): DDL2.ISortCondition => {
                return {
                    fieldID: sortBy.fieldID(),
                    descending: sortBy.descending()
                };
            })
        };
    }

    readSort(ddlSort: DDL2.ISort, sort: Sort): this {
        if (ddlSort) {
            sort.column(ddlSort.conditions.map(condition => {
                return new SortColumn(sort)
                    .fieldID(condition.fieldID)
                    .descending(condition.descending)
                    ;
            }));
        }
        return this;
    }

    writeLimit(limit: Limit): DDL2.ILimit {
        if (!limit.exists()) return undefined;
        return {
            type: "limit",
            limit: limit.rows()
        };
    }

    readLimit(ddlLimit: DDL2.ILimit, limit: Limit): this {
        if (ddlLimit) {
            limit.rows(ddlLimit.limit);
        }
        return this;
    }

    writeDatasourceRef(ds: DSPicker, refs: ReferencedFields): DDL2.IRoxieServiceRef | DDL2.IDatasourceRef {
        const dsDetails = ds.details();
        if (dsDetails instanceof RoxieRequest) {
            return {
                id: this._dsDedup[ds.hash()].id,
                fields: this.writeFields(dsDetails.localFields().filter(field => refs[dsDetails.id()] && refs[dsDetails.id()].indexOf(field.id) >= 0)),
                request: dsDetails.request().map((rf): DDL2.IRequestField => {
                    return {
                        source: rf.source(),
                        remoteFieldID: rf.remoteFieldID(),
                        localFieldID: rf.localFieldID()
                    };
                })
            };
        } else {
            return {
                id: this._dsDedup[ds.hash()].id,
                fields: this.writeFields(dsDetails.localFields().filter(field => refs[dsDetails.id()] && refs[dsDetails.id()].indexOf(field.id) >= 0))
            };
        }
    }

    readDatasourceRef(ddlDSRef: DDL2.IRoxieServiceRef | DDL2.IDatasourceRef, ds: DSPicker): this {
        const ddlDS = this._dsDedup[ddlDSRef.id];
        this.readDatasource(ddlDS, ds);
        const dsDetails = ds.details();
        if (dsDetails instanceof RoxieRequest && DDL2.isIRoxieServiceRef(ddlDSRef)) {
            dsDetails.request(ddlDSRef.request.map(rf => {
                return new Param(dsDetails)
                    .source(rf.source)
                    .remoteFieldID(rf.remoteFieldID)
                    .localFieldID(rf.localFieldID)
                    ;
            }));
        }
        return this;
    }

    writeDDLViews(refs: ReferencedFields): DDL2.IView[] {
        for (const viz of this._dashboard.visualizations()) {
            viz.view().referencedFields(refs);
        }
        return this._dashboard.visualizations().map(viz => {
            const view = viz.view();
            const ds = view.dataSource();
            const retVal = {
                id: viz.id(),
                datasource: this.writeDatasourceRef(ds, refs),
                filter: this.writeFilters(view.filters()),
                computed: this.writeProject(view.project()),
                groupBy: this.writeGroupBy(view.groupBy()),
                sort: this.writeSort(view.sort()),
                limit: this.writeLimit(view.limit()),
                mappings: this.writeProject(view.mappings())
            };
            const ddlDatasource = this._dsDedup[ds.hash()];
            for (const field of retVal.datasource.fields) {
                if (ddlDatasource.fields.filter(ddlField => ddlField.id === field.id).length === 0) {
                    ddlDatasource.fields.push(field);
                }
            }
            return retVal;
        });
    }

    readDDLViews(ddlViews: DDL2.IView[]) {
        for (const ddlView of ddlViews) {
            const viz = new Viz(this._dashboard).id(ddlView.id).title(ddlView.id);
            this._dashboard.addVisualization(viz);
            const view = viz.view();
            this.readDatasourceRef(ddlView.datasource, view.dataSource())
                .readFilters(ddlView.filter, view.filters())
                .readProject(ddlView.computed, view.project())
                .readGroupBy(ddlView.groupBy, view.groupBy())
                .readSort(ddlView.sort, view.sort())
                .readLimit(ddlView.limit, view.limit())
                .readProject(ddlView.mappings, view.mappings())
                ;
        }
        this._dashboard.syncWidgets();
    }

    write(): DDL2.Schema {
        this._dsDedup = {};
        const refs = {};
        const retVal = {
            datasources: this.writeDatasources(),
            dataviews: this.writeDDLViews(refs)
        };
        return retVal;
    }

    read(ddl: DDL2.Schema) {
        this._dsDedup = {};
        for (const ds of ddl.datasources) {
            this._dsDedup[ds.id] = ds;
        }
        this.readDDLViews(ddl.dataviews);
    }
}
