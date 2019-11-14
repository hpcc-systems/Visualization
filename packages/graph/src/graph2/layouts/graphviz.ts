import { Cluster, graphviz as gvWorker, Node } from "./graphvizWorker";
import { Layout } from "./layout";

declare const window: any;

type Engine = "circo" | "dot" | "fdp" | "neato" | "osage" | "patchwork" | "twopi";

export class Graphviz extends Layout {

    _engine: Engine;

    constructor(graph, engine: Engine) {
        super(graph);
        this._engine = engine;
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
            links: data.edges().map(e => ({
                id: e.props.id,
                source: nodeIdx[e.source.id],
                target: nodeIdx[e.target.id]
            }))
        }, {
            engine: this._engine,
            wasmFolder: window.__hpcc_wasmFolder
        }).then((response: any) => {
            if (this.running()) {
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
                    e.points = [[e.source.x, e.source.y], ...l.points.map(p => [p[0] + size.width / 2, p[1] + size.height / 2]), [e.target.x, e.target.y]];
                    // e.points = l.points.map(p => [p[0] + size.width / 2, p[1] + size.height / 2]);
                });
                this._graph
                    .moveSubgraphs(true)
                    .moveVertices(true)
                    .moveEdges(true)
                    ;
                this.stop();
            }
            return this;
        });
    }
}
