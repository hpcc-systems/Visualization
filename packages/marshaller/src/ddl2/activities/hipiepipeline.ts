import { DDL2 } from "@hpcc-js/ddl-shim";
import { ElementContainer } from "../model/element.ts";
import { Activity, ActivityPipeline } from "./activity.ts";
import { DatasourceRefType } from "./datasource.ts";
import { DSPicker } from "./dspicker.ts";
import { Filters } from "./filter.ts";
import { GroupBy } from "./groupby.ts";
import { Limit } from "./limit.ts";
import { Project } from "./project.ts";
import { Sort } from "./sort.ts";

export class HipiePipeline extends ActivityPipeline {

    _origDatasource;
    _origFilters;
    _origProject;
    _origGroupBy;
    _origSort;
    _origLimit;

    declare _datasource: DSPicker | DatasourceRefType;
    declare _filters: Filters;
    declare _project: Project;
    declare _groupBy: GroupBy;
    declare _sort: Sort;
    declare _limit: Limit;

    constructor(private _ec: ElementContainer, viewID: string) {
        super();
        this._id = viewID;
        this._datasource = new DSPicker(this._ec);
        this._filters = new Filters(this._ec);
        this._project = new Project();
        this._groupBy = new GroupBy();
        this._sort = new Sort();
        this._limit = new Limit();
        this.updateSequence();
    }

    activities(): Activity[];
    activities(_: Activity[]): this;
    activities(_?: Activity[]): Activity[] | this {
        const retVal = super.activities.apply(this, arguments);
        return retVal;
    }

    private updateSequence() {
        this.activities([
            this.datasource() as Activity,
            this.filters(),
            this.project(),
            this.groupBy(),
            this.sort(),
            this.limit()
        ]);
    }

    selectionFields(): ReadonlyArray<DDL2.IField> {
        return this.last().outFields();
    }
}

export interface HipiePipeline {
    datasource(): DSPicker | DatasourceRefType;
    datasource(_: DSPicker | DatasourceRefType): this;
    filters(): Filters;
    filters(_: Filters): this;
    project(): Project;
    project(_: Project): this;
    groupBy(): GroupBy;
    groupBy(_: GroupBy): this;
    sort(): Sort;
    sort(_: Sort): this;
    limit(): Limit;
    limit(_: Limit): this;
}

HipiePipeline.prototype.publish("datasource", null, "widget", "Data Source 2");
HipiePipeline.prototype.publish("filters", null, "widget", "Client Filters");
HipiePipeline.prototype.publish("project", null, "widget", "Project");
HipiePipeline.prototype.publish("groupBy", null, "widget", "Group By");
HipiePipeline.prototype.publish("sort", null, "widget", "Sort");
HipiePipeline.prototype.publish("limit", null, "widget", "Limit output");

function wrapHipiePipelineProperty(prop: string) {
    const origKey = `_orig${prop.charAt(0).toUpperCase() + prop.slice(1)}`;
    HipiePipeline.prototype[origKey] = HipiePipeline.prototype[prop];
    HipiePipeline.prototype[prop] = function (_?) {
        const retVal = HipiePipeline.prototype[origKey].apply(this, arguments);
        if (_ !== undefined) {
            this.updateSequence();
        }
        return retVal;
    };
}
wrapHipiePipelineProperty("datasource");
wrapHipiePipelineProperty("filters");
wrapHipiePipelineProperty("project");
wrapHipiePipelineProperty("groupBy");
wrapHipiePipelineProperty("sort");
wrapHipiePipelineProperty("limit");