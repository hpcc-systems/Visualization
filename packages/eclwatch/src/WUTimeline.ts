﻿import { Palette } from "@hpcc-js/common";
import { Scope, Workunit, WsWorkunits } from "@hpcc-js/comms";
import { ReactTimelineSeries } from "@hpcc-js/timeline";
import { multiScale24Hours } from "@hpcc-js/chart";
import { hashSum, RecursivePartial } from "@hpcc-js/util";

import "../src/WUGraph.css";

const columns = ["label", "start", "end", "icon", "color", "series"];

export class WUTimeline extends ReactTimelineSeries {

    protected _palette = Palette.ordinal("default");

    constructor() {
        super();
        this
            .columns(columns)
            .titleColumn("label")
            .iconColumn("icon")
            .colorColumn("color")
            .seriesColumn("series")
            .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
            .tickFormatFunc(multiScale24Hours())
            .tooltipTimeFormat("%H:%M:%S.%L")
            .tooltipHTML(d => {
                return d[columns.length].calcTooltip();
            })
            ;
    }

    private _prevHashSum;
    clear(): this {
        delete this._prevHashSum;
        return this;
    }
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
                return scopes.filter(scope => scope.Id && scope.attr("WhenStarted").RawValue).map((scope: Scope) => {
                    const whenStarted = +scope.attr("WhenStarted").RawValue / 1000;
                    const timeElapsed = +scope.attr("TimeElapsed").RawValue / 1000000;
                    return [
                        scope.Id,
                        new Date(whenStarted).toISOString(),
                        timeElapsed ? new Date(whenStarted + timeElapsed).toISOString() : undefined,
                        null,
                        this._palette(scope.ScopeType),
                        scope.ScopeName.split("::").join(":").split(":").slice(0, 1),
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
    request(): Partial<WsWorkunits.WUDetails>;
    request(_: RecursivePartial<WsWorkunits.WUDetails>): this;
}

WUTimeline.prototype.publish("baseUrl", "", "string", "HPCC Platform Base URL");
WUTimeline.prototype.publish("wuid", "", "string", "Workunit ID");
WUTimeline.prototype.publish("request", {
    ScopeFilter: {
        MaxDepth: 3,
        ScopeTypes: ["graph", "subgraph"]
    },
    NestedFilter: {
        Depth: 0,
        ScopeTypes: []
    },
    PropertiesToReturn: {
        AllProperties: false,
        AllStatistics: true,
        AllHints: false,
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
