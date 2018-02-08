import { publish } from "@hpcc-js/common";
import { ElementContainer } from "../model";
import { Activity, ActivityPipeline } from "./activity";
import { DSPicker } from "./dspicker";
import { Filters } from "./filter";
import { GroupBy } from "./groupby";
import { Limit } from "./limit";
import { Project } from "./project";
import { Sort } from "./sort";

export class HipiePipeline extends ActivityPipeline {
    _elementContainer: ElementContainer;

    @publish(null, "widget", "Data Source 2")
    _dataSource: Activity;
    dataSource(): Activity;
    dataSource(_: Activity): this;
    dataSource(_?: Activity): Activity | this {
        if (!arguments.length) return this._dataSource;
        this._dataSource = _;
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

    @publish(null, "widget", "Mappings")
    _mappings: Project;
    mappings(): Project;
    mappings(_: Project): this;
    mappings(_?: Project): Project | this {
        if (!arguments.length) return this._mappings;
        this._mappings = _;
        this.updateSequence();
        return this;
    }

    constructor(model: ElementContainer, viewID: string) {
        super();
        this._elementContainer = model;
        this._id = viewID;
        this._dataSource = new DSPicker(this);
        this._dataSource.monitor((id, newVal, oldVal) => {
            this.broadcast(id, newVal, oldVal, this.dataSource());
        });
        this._filters = new Filters(model);
        this._project = new Project(false);
        this._groupBy = new GroupBy();
        this._sort = new Sort();
        this._mappings = new Project(true).trim(true);
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
            this.dataSource(),
            this.filters(),
            this.project(),
            this.groupBy(),
            this.sort(),
            this.limit(),
            this.mappings()
        ]);
    }

    //  Mappings is only for the visualization and not the data flow.
    last(skipMappings: boolean = false): Activity | undefined {
        const activities = this.activities();
        for (let i = activities.length - 1; i >= 0; --i) {
            const activity = activities[i];
            if (skipMappings && activity instanceof Project && activity._isMappings) {
                continue;
            }
            return activity;
        }
    }
}
