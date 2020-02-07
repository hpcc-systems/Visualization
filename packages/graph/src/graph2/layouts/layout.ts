import { Graph2 as GraphCollection } from "@hpcc-js/util";
import { EdgePlaceholder, SubgraphPlaceholder, VertexPlaceholder } from "./placeholders";

export interface ILayout {
    start(): Promise<this>;
    stop(): this;
    running(): boolean;
}

export type Size = { width: number, height: number };
export interface IGraph {
    size(): Size;
    graphData(): GraphCollection<VertexPlaceholder, EdgePlaceholder, SubgraphPlaceholder>;

    moveSubgraphs(transition: boolean): this;

    moveVertexPlaceholder(vp: VertexPlaceholder, transition: boolean, moveEdges: boolean): this;
    moveVertices(transition: boolean): this;

    moveEdgePlaceholder(ep: EdgePlaceholder, transition: boolean): this;
    moveEdges(transition: boolean): this;

    progress(what: "start" | "stop" | "layout-start" | "layout-tick" | "layout-stop");
}

export class Layout implements ILayout {

    protected _graph: IGraph;
    protected _running = false;

    constructor(graph: IGraph) {
        this._graph = graph;
    }

    start(): Promise<this> {
        this._running = true;
        this._graph.progress("layout-start");
        return Promise.resolve(this);
    }

    stop() {
        this._running = false;
        this._graph.progress("layout-stop");
        return this;
    }

    running(): boolean {
        return this._running;
    }
}
