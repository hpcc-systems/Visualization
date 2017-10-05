import { publish } from "@hpcc-js/common";
import { Dashboard } from "../dashboard";
import { Activity, ActivitySequence } from "./activity";
import { DSPicker } from "./dspicker";
import { Filters } from "./filter";
import { GroupBy } from "./groupby";
import { Limit } from "./limit";
import { Project } from "./project";
import { Sort } from "./sort";

export class View extends ActivitySequence {
    _dashboard: Dashboard;

    @publish(null, "widget", "Data Source 2")
    dataSource: publish<this, DSPicker>;
    @publish(null, "widget", "Client Filters")
    filters: publish<this, Filters>;
    @publish(null, "widget", "Project")
    project: publish<this, Project>;
    @publish(null, "widget", "Group By")
    groupBy: publish<this, GroupBy>;
    @publish(null, "widget", "Source Columns")
    sort: publish<this, Sort>;
    @publish(null, "widget", "Mappings")
    mappings: publish<this, Project>;
    @publish(null, "widget", "Limit output")
    limit: publish<this, Limit>;

    constructor(model: Dashboard, viewID: string) {
        super();
        this._dashboard = model;
        this._id = viewID;
        this.dataSource(new DSPicker(this));
        this.dataSource().monitor((id, newVal, oldVal) => {
            this.broadcast(id, newVal, oldVal, this.dataSource());
        });
        this.filters(new Filters(this));
        this.project(new Project());
        this.groupBy(new GroupBy(this));
        this.sort(new Sort());
        this.limit(new Limit());
        this.mappings(new Project());
        this.activities([
            this.dataSource(),
            this.filters(),
            this.project(),
            this.groupBy(),
            this.sort(),
            this.limit(),
            this.mappings()
        ]);

        let prevActivity: Activity;
        for (const activity of this.activities()) {
            if (prevActivity) {
                activity.sourceActivity(prevActivity);
            }
            prevActivity = activity;
        }
    }

    private calcUpdatedGraph(activity: Activity): Array<{ from: string, to: Activity }> {
        return activity.updatedBy().map(source => {
            return {
                from: source,
                to: activity
            };
        });
    }

    updatedByGraph(): Array<{ from: string, to: Activity }> {
        let retVal: Array<{ from: string, to: Activity }> = [];
        for (const activity of this.activities()) {
            retVal = retVal.concat(this.calcUpdatedGraph(activity));
        }
        return retVal;
    }

    fetch(from: number = 0, count: number = Number.MAX_VALUE): Promise<any[]> {
        return this.last().exec().then(() => {
            const data = this.last().pullData();
            return data.slice(from, from + count);
        });
    }
}
