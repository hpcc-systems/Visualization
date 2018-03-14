import { Widget } from "@hpcc-js/common";
import { Scope, Workunit } from "@hpcc-js/comms";
import { MiniGantt } from "@hpcc-js/timeline";
import { hashSum } from "@hpcc-js/util";
import { WUScopeController } from "./WUScopeController";

import "../src/WUGraph.css";

export class WUTimeline extends MiniGantt {

    protected _gc = new WUScopeController();

    constructor() {
        super();
        this.tooltipHTML(d => {
            return this._gc.calcTooltip(d[3]);
        });
    }

    private _prevHashSum;
    private _prevScopes;
    fetchScopes(): Promise<any> {
        const hash = hashSum({
            baseUrl: this.baseUrl(),
            wuid: this.wuid()
        });
        if (!this._prevScopes || this._prevHashSum !== hash) {
            this._prevHashSum = hash;
            this._gc.clear();
            const wu = Workunit.attach({ baseUrl: this.baseUrl() }, this.wuid());
            return wu.fetchDetails({
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
            }).then(scopes => {
                return scopes.filter(scope => scope.attr("WhenStarted").RawValue && scope.attr("TimeElapsed").RawValue).map((scope: Scope) => {
                    return [
                        scope.Id,
                        new Date(+scope.attr("WhenStarted").RawValue / 1000).toISOString(),
                        new Date((+scope.attr("WhenStarted").RawValue / 1000) + (+scope.attr("TimeElapsed").RawValue / 1000000)).toISOString(),
                        scope
                    ];
                });
            }).then(scopes => {
                this._prevScopes = scopes;
                return this._prevScopes;
            });
        }
        return Promise.resolve(this._prevScopes);
    }

    enter(domNode, _element) {
        super.enter(domNode, _element);
    }

    update(domNode, element) {
        super.update(domNode, element);
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        this.fetchScopes().then(scopes => {
            this
                .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                .tickFormat("%H:%M")
                .tooltipTimeFormat("%H:%M:%S.%L")
                .data(scopes)
                ;
            super.render(callback);
        });
        return this;
    }
}
WUTimeline.prototype._class += " eclwatch_WUTimeline";

export interface WUTimeline {
    baseUrl(): string;
    baseUrl(_: string): this;
    wuid(): string;
    wuid(_: string): this;
}

WUTimeline.prototype.publish("baseUrl", "", "string", "HPCC Platform Base URL");
WUTimeline.prototype.publish("wuid", "", "string", "Workunit ID");
