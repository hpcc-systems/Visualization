import { Button, Spacer, ToggleButton, Widget } from "@hpcc-js/common";
import { ScopeGraph, Workunit } from "@hpcc-js/comms";
import { Table } from "@hpcc-js/dgrid";
import { Graph as GraphWidget, Subgraph, Vertex } from "@hpcc-js/graph";
import { Carousel, ChartPanel } from "@hpcc-js/layout";
import { hashSum } from "@hpcc-js/util";
import { WUGraphLegend } from "./WUGraphLegend";
import { WUScopeController } from "./WUScopeController";

import "../src/WUGraph.css";

export class WUGraph extends ChartPanel {

    private _partialAll = new Button("fa-window-restore", "Partial All")
        .on("click", () => {
            this.stateClick(this._partialAll);
        });

    private _maxAll = new Button("fa-window-maximize", "Max All")
        .on("click", () => {
            this.stateClick(this._maxAll);
        });

    private _toggleGraph = new ToggleButton("fa-chain", "Graph")
        .selected(true)
        .on("click", () => {
            this.viewClick(this._toggleGraph);
        });

    private _toggleActivities = new ToggleButton("fa-table", "Activitiies")
        .selected(false)
        .on("click", () => {
            this.viewClick(this._toggleActivities);
        });

    private _toggleEdges = new ToggleButton("fa-table", "Edges")
        .selected(false)
        .on("click", () => {
            this.viewClick(this._toggleEdges);
        });

    private _toggleSubgraphs = new ToggleButton("fa-table", "Subgraphs")
        .selected(false)
        .on("click", () => {
            this.viewClick(this._toggleSubgraphs);
        });

    protected _graph = new GraphWidget()
        .layout("Hierarchy")
        .applyScaleOnLayout(true)
        .showToolbar(false)
        .allowDragging(false)
        ;

    private _activities = new Table()
        .pagination(false)
        ;

    private _edges = new Table()
        .pagination(false)
        ;

    private _subgraphs = new Table()
        .pagination(false)
        ;

    protected _legend = new WUGraphLegend(this)
        .on("click", kind => {
            this.render();
        })
        .on("mouseover", kind => {
            const verticesMap: { [id: string]: boolean } = {};
            for (const vertex of this._gc.vertices(kind)) {
                verticesMap[vertex.id()] = true;
            }
            this._graph.highlightVerticies(verticesMap);
        })
        .on("mouseout", kind => {
            this._graph.highlightVerticies();
        })
        ;

    protected _view = new Carousel().widgets([this._graph, this._activities, this._edges, this._subgraphs]);

    protected _gc = new WUScopeController();

    constructor() {
        super();
        this.topOverlay(false);
        this.widget(this._view);
        const buttons: Widget[] = [
            this._toggleGraph,
            this._toggleActivities,
            this._toggleEdges,
            this._toggleSubgraphs,
            new Spacer(),
            this._partialAll,
            this._maxAll,
            new Spacer(),
            ...this._graph.iconBarButtons(),
            new Spacer()];
        this.buttons(buttons.concat(this.buttons()));
        this._gc.minClick = (sg: Subgraph) => {
            this.loadGraph();
            this._graph.render(w => {
                this._graph
                    .selection([sg])
                    .centerOnItem(sg)
                    ;
            });
        };

        this._graph.tooltipHTML((v: Vertex) => {
            return this._gc.calcGraphTooltip(v);
        });
    }

    stateClick(sourceB: Button) {
        switch (sourceB) {
            case this._partialAll:
                this._graph.data().subgraphs.forEach((sg: Subgraph) => {
                    sg.minState("partial");
                });
                break;
            case this._maxAll:
                this._graph.data().subgraphs.forEach((sg: Subgraph) => {
                    sg.minState("normal");
                });
                break;
        }
        this.render();
    }

    viewClick(sourceTB: ToggleButton) {
        this._toggleGraph.selected(sourceTB === this._toggleGraph);
        this._toggleActivities.selected(sourceTB === this._toggleActivities);
        this._toggleEdges.selected(sourceTB === this._toggleEdges);
        this._toggleSubgraphs.selected(sourceTB === this._toggleSubgraphs);
        switch (sourceTB) {
            case this._toggleGraph:
                this._view.active(0);
                break;
            case this._toggleActivities:
                this._view.active(1);
                break;
            case this._toggleEdges:
                this._view.active(2);
                break;
            case this._toggleSubgraphs:
                this._view.active(3);
                break;
        }
        this.render(w => {
        });
    }

    private _prevHashSum;
    private _prevScopeGraph: ScopeGraph;
    fetchScopeGraph(): Promise<ScopeGraph> {
        const hash = hashSum({
            baseUrl: this.baseUrl(),
            wuid: this.wuid(),
            graphID: this.graphID(),
            subgraphID: this.subgraphID(),
        });
        if (!this._prevScopeGraph || this._prevHashSum !== hash) {
            this.startProgress();
            this._prevHashSum = hash;
            this._gc.clear();
            const wu = Workunit.attach({ baseUrl: this.baseUrl() }, this.wuid());
            return wu.fetchGraphs().then(graphs => {
                for (const graph of graphs) {
                    if (graph.Name === this.graphID()) {
                        this.finishProgress();
                        return graph.fetchScopeGraph(this.subgraphID());
                    }
                }
            }).then(scopeGraph => {
                this._prevScopeGraph = scopeGraph;
                return this._prevScopeGraph;
            });
        }
        return Promise.resolve(this._prevScopeGraph);
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

    loadGraph() {
        this._gc.disabled(this._legend.disabled());
        this._graph
            .data(this._gc.graphData(), true)
            ;
        {
            const { columns, data } = this._gc.activityData();
            this._activities
                .columns(columns)
                .data(data)
                ;
        }
        {
            const { columns, data } = this._gc.edgeData();
            this._edges
                .columns(columns)
                .data(data)
                ;
        }
        {
            const { columns, data } = this._gc.subgraphData();
            this._subgraphs
                .columns(columns)
                .data(data)
                ;
        }
    }

    render(callback?: (w: Widget) => void): this {
        if (this.wuid() && this.graphID()) {
            this._graph.statusText("Fetching...");
            this.fetchScopeGraph().then(scopedGraph => {
                this._gc.set(scopedGraph);
                this._legend.data(this._gc.calcLegend());
                this.loadGraph();
                super.render(callback);
            });
        } else {
            super.render(callback);
        }
        return this;
    }

    selection(_?) {
        if (!arguments.length) return this._graph.selection();
        const item = this._gc.vertex(_) || this._gc.edge(_) || this._gc.subgraph(_);
        if (item) {
            this._graph.selection([item]);
        }
        return this;
    }
}
WUGraph.prototype._class += " eclwatch_WUGraph";

export interface WUGraph {
    baseUrl(): string;
    baseUrl(_: string): this;
    wuid(): string;
    wuid(_: string): this;
    graphID(): string;
    graphID(_: string): this;
    subgraphID(): string;
    subgraphID(_: string): this;
}

WUGraph.prototype.publish("baseUrl", "", "string", "HPCC Platform Base URL");
WUGraph.prototype.publish("wuid", "", "string", "Workunit ID");
WUGraph.prototype.publish("graphID", "", "string", "Graph ID");
WUGraph.prototype.publish("subgraphID", "", "string", "Subgraph ID");
