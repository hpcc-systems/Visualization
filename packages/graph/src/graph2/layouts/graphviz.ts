import { curveBasis as d3CurveBasis, line as d3Line } from "d3-shape";
import { Cluster, graphviz as gvWorker, Node, isLayoutSuccess, LayoutError } from "./graphvizWorker.ts";
import { Layout, Point } from "./layout.ts";
import { EdgePlaceholder } from "./placeholders.ts";

type Engine = "circo" | "dot" | "fdp" | "neato" | "osage" | "patchwork" | "twopi";

const lineBasis = d3Line<Point>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3CurveBasis)
    ;

export class Graphviz extends Layout {

    _engine: Engine;
    _wasmFolder: string;

    constructor(graph, engine: Engine, wasmFolder: string) {
        super(graph);
        this._engine = engine;
        this._wasmFolder = wasmFolder;
    }

    start() {
        super.start();
        const size = this._graph.size();
        const data = this._graph.graphData();
        const nodeIdx = {};
        const hierarchy: Array<Cluster | Node> = data.hierarchy((type, item, children) => {
            switch (type) {
                case "subgraph":
                    return {
                        id: item.id,
                        text: item.props.text,
                        children
                    };
                case "vertex":
                    delete item["fx"];
                    delete item["fy"];
                    const bbox = item.element.node().getBBox();
                    const retVal = {
                        id: item.id,
                        text: item.props.text,
                        width: bbox.width,
                        height: bbox.height
                    };
                    nodeIdx[retVal.id] = retVal;
                    return retVal;
            }
        }) as Array<Cluster | Node>;
        return gvWorker({
            items: hierarchy,
            links: data.allEdges().map(e => ({
                id: String(e.props.id),
                source: nodeIdx[e.source.id],
                target: nodeIdx[e.target.id],
                text: e.props.label || ""
            })),
            raw: ""
        }, {
            engine: this._engine
        }).response.then(response => {
            if (this.running()) {
                if (isLayoutSuccess(response)) {
                    response.clusters.forEach(n => {
                        const sg = data.subgraph(n.id);
                        sg.x = n.x + size.width / 2 - n.width;
                        sg.y = n.y + size.height / 2 - n.height;
                        sg.props.width = n.width;
                        sg.props.height = n.height;
                    });
                    response.nodes.forEach(n => {
                        const v = data.vertex(n.id);
                        v.x = n.x + size.width / 2;
                        v.y = n.y + size.height / 2;
                    });
                    response.links.forEach(l => {
                        const e = data.edge(l.id);
                        const start: [number, number] = [e.source.x, e.source.y];
                        const mid: [number, number][] = l.points !== undefined ? l.points.map(p => [p[0] + size.width / 2, p[1] + size.height / 2]) : [];
                        const end: [number, number] = [e.target.x, e.target.y];
                        e.points = [start, ...mid, end];
                        // e.points = l.points.map(p => [p[0] + size.width / 2, p[1] + size.height / 2]);
                    });
                    this._graph
                        .moveSubgraphs(true)
                        .moveVertices(true)
                        .moveEdges(true)
                        ;
                    this.stop();
                } else {
                    const err = response as LayoutError;
                    console.error(`Graphviz layout fail:  ${err.error}`, err.errorDot);
                }
            }
            return this;
        });
    }

    edgePath(ep: EdgePlaceholder, curveDepth: number): { path: string, labelPos: Point } {
        let points = [];
        let hasNaN = false;
        if (ep.points) {
            points = ep.points.map(p => {
                const x = this._graph.project(p[0], false);
                const y = this._graph.project(p[1], false);
                if (isNaN(x) || isNaN(y)) {
                    hasNaN = true;
                }
                return [x, y];
            });
        }
        if (hasNaN || points.length < 2) {
            return super.edgePath(ep, curveDepth);
        }
        return {
            path: lineBasis(points),
            labelPos: this.center(points)
        };
    }

}

