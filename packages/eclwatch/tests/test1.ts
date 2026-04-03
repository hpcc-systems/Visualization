import { IScope, Workunit } from "@hpcc-js/comms";
import { WUTimeline } from "../src/index.ts";

const columns = ["label", "start", "end", "icon", "color", "series", "depth"];

export class WUTimelinePatched extends WUTimeline {

    constructor() {
        super();
        this
            .columns(columns)
            .bucketColumn("icon")
            ;
        this._gantt
            .bucketHeight(22)
            .gutter(4)
            .preserveZoom(true)
            .overlapTolerence(-100)
            .oddSeriesBackground("transparent")
            .evenSeriesBackground("transparent")
            ;
        this._gantt["_series_idx"] = -1;
        this.strokeWidth(0);
        this.tooltipHTML(d => {
            return d[7].__hpcc_id;
        });
    }

    data(): any;
    data(_: any): this;
    data(_?: any): any | this {
        if (arguments.length === 0) return super.data();
        super.data(_.map(row => {
            if (row[2] === undefined || row[2] === null) {
                row[2] = row[1];
            }
            row[5] = null;
            row.push(row[6]);
            row[6] = (row[6]?.ScopeName?.split(":")?.length - 1) || 0;
            return row;
        }));
        return this;
    }
}

export class WUTimelineNoFetch extends WUTimelinePatched {

    constructor() {
        super();
    }

    async demo() {
        const wu = Workunit.attach({ baseUrl: "http://localhost:8010" }, "W20260219-100208-3");
        const response = await wu.fetchDetailsNormalized({
            ScopeFilter: {
                ScopeTypes: ["operation", "workflow", "graph", "subgraph", "activity", "edge"],
            },
            NestedFilter: {

            },
            PropertiesToReturn: {
                AllScopes: true,
                AllAttributes: true,
                AllProperties: true,
                AllNotes: true,
                AllStatistics: true,
                AllHints: true
            },
            ScopeOptions: {
                IncludeId: true,
                IncludeScope: true,
                IncludeScopeType: true,
                IncludeMatchedScopesInResults: true
            },
            PropertyOptions: {
                IncludeName: true,
                IncludeRawValue: true,
                IncludeFormatted: true,
                IncludeMeasure: true,
                IncludeCreator: false,
                IncludeCreatorType: false
            }
        });
        this
            .scopes(response.data)
            .lazyRender()
            ;
    }

    protected _scopes: IScope[] = [];
    scopes(): IScope[];
    scopes(_: IScope[]): this;
    scopes(_?: IScope[]): IScope[] | this {
        if (arguments.length === 0) return this._scopes;
        this._scopes = _!;
        return this;
    }

    fetchScopes() {
        const data = this._scopes.filter(scope => {
            if (!scope.__hpcc_id) {
                scope.__hpcc_id = scope.name;
            }
            return scope.id &&
                scope.WhenStarted &&
                scope.type !== "activity";
        }).map((scope: IScope) => {
            let whenFinished = scope.WhenFinished;
            if (!whenFinished) {
                if (scope.TimeElapsed) {
                    const d = new Date(scope.WhenStarted);
                    d.setMilliseconds(d.getMilliseconds() + scope.TimeElapsed * 1000);
                    whenFinished = d.toISOString();
                } else {
                    // Graph still running — use current time as a placeholder end  
                    whenFinished = new Date().toISOString();
                }
            }
            return [
                scope.id,
                scope.WhenStarted,
                whenFinished,
                null,
                this._palette(scope.type),
                scope.name.split("::").join(":").split(":").slice(0, 1),
                scope
            ];
        });
        this.data(data);
    }
}
