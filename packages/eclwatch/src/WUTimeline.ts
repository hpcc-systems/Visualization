import { Scope, Workunit, WUDetails } from "@hpcc-js/comms";
import { MiniGantt } from "@hpcc-js/timeline";
import { hashSum } from "@hpcc-js/util";

import "../src/WUGraph.css";

export class WUTimeline extends MiniGantt {

    constructor() {
        super();
        this
            .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
            .tickFormat("%H:%M")
            .tooltipTimeFormat("%H:%M:%S.%L")
            .tooltipHTML(d => {
                return d[3].calcTooltip();
            })
            ;
    }

    private _prevHashSum;
    fetchScopes() {
        const hash = hashSum({
            baseUrl: this.baseUrl(),
            wuid: this.wuid(),
            request: this.request()
        });
        if (this._prevHashSum !== hash) {
            this._prevHashSum = hash;
            const wu = Workunit.attach({ baseUrl: this.baseUrl() }, this.wuid());
            wu.fetchDetails(this.request()).then(scopes => {
                return scopes.filter(scope => scope.attr("WhenStarted").RawValue).map((scope: Scope) => {
                    const whenStarted = +scope.attr("WhenStarted").RawValue / 1000;
                    const timeElapsed = +scope.attr("TimeElapsed").RawValue / 1000000;
                    return [
                        scope.Id,
                        new Date(whenStarted).toISOString(),
                        timeElapsed ? new Date(whenStarted + timeElapsed).toISOString() : undefined,
                        scope
                    ];
                });
            }).then(scopes => {
                this
                    .data(scopes)
                    .render()
                    ;
            });
        }
    }

    enter(domNode, _element) {
        super.enter(domNode, _element);
    }

    update(domNode, element) {
        this.fetchScopes();
        super.update(domNode, element);
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }
}
WUTimeline.prototype._class += " eclwatch_WUTimeline";

export interface WUTimeline {
    baseUrl(): string;
    baseUrl(_: string): this;
    wuid(): string;
    wuid(_: string): this;
    request(): Partial<WUDetails.Request>;
    request(_: Partial<WUDetails.Request>): this;
}

WUTimeline.prototype.publish("baseUrl", "", "string", "HPCC Platform Base URL");
WUTimeline.prototype.publish("wuid", "", "string", "Workunit ID");
WUTimeline.prototype.publish("request", {
    ScopeFilter: {
        MaxDepth: 999999,
        ScopeTypes: ["graph"]
    },
    NestedFilter: {
        Depth: 999999,
        ScopeTypes: ["graph", "subgraph"] // , "activity"]
    },
    PropertiesToReturn: {
        AllProperties: true,
        AllStatistics: true,
        AllHints: true,
        Properties: ["WhenStarted", "TimeElapsed"]
    },
    ScopeOptions: {
        IncludeId: true,
        IncludeScope: true,
        IncludeScopeType: true
    },
    PropertyOptions: {
        IncludeName: true,
        IncludeRawValue: true,
        IncludeFormatted: true,
        IncludeMeasure: true,
        IncludeCreator: false,
        IncludeCreatorType: false
    }
}, "object", "WUDetails Request");
