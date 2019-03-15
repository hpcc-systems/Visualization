import { publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { ElementContainer } from "../model/element";
import { Activity, ActivityPipeline } from "./activity";
import { DatasourceRefType } from "./datasource";
import { DSPicker } from "./dspicker";
import { Filters } from "./filter";
import { GroupBy } from "./groupby";
import { Limit } from "./limit";
import { Project } from "./project";
import { Sort } from "./sort";

export class HipiePipeline extends ActivityPipeline {

    @publish(null, "widget", "Data Source 2")
    _datasource: DSPicker | DatasourceRefType;
    datasource(): DSPicker | DatasourceRefType;
    datasource(_: DSPicker | DatasourceRefType): this;
    datasource(_?: DSPicker | DatasourceRefType): DSPicker | DatasourceRefType | this {
        if (!arguments.length) return this._datasource;
        this._datasource = _;
        this.updateSequence();
        return this;
    }

    @publish(null, "widget", "Client Filters")
    _filters: Filters;
    filters(): Filters;
    filters(_: Filters): this;
    filters(_?: Filters): Filters | this {
        if (!arguments.length) return this._filters;
        this._filters = _;
        this.updateSequence();
        return this;
    }

    @publish(null, "widget", "Project")
    _project: Project;
    project(): Project;
    project(_: Project): this;
    project(_?: Project): Project | this {
        if (!arguments.length) return this._project;
        this._project = _;
        this.updateSequence();
        return this;
    }

    @publish(null, "widget", "Group By")
    _groupBy: GroupBy;
    groupBy(): GroupBy;
    groupBy(_: GroupBy): this;
    groupBy(_?: GroupBy): GroupBy | this {
        if (!arguments.length) return this._groupBy;
        this._groupBy = _;
        this.updateSequence();
        return this;
    }

    @publish(null, "widget", "Sort")
    _sort: Sort;
    sort(): Sort;
    sort(_: Sort): this;
    sort(_?: Sort): Sort | this {
        if (!arguments.length) return this._sort;
        this._sort = _;
        this.updateSequence();
        return this;
    }

    @publish(null, "widget", "Limit output")
    _limit: Limit;
    limit(): Limit;
    limit(_: Limit): this;
    limit(_?: Limit): Limit | this {
        if (!arguments.length) return this._limit;
        this._limit = _;
        this.updateSequence();
        return this;
    }

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
