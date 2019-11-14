import { dagre, Options } from "./dagreWorker";
import { Layout } from "./layout";

const clusterID = (id: string) => `cluster_${id}`;
const rClusterID = (id: string) => id.substring(8);

export class Dagre extends Layout {

    constructor(graph, readonly _options: Options) {
        super(graph);
    }

    start() {
        super.start();
        const size = this._graph.size();
        const data = this._graph.graphData();
        const start = performance.now();

        return dagre({
            subgraphs: data.subgraphs().map(s => ({ ...s.props, id: clusterID(s.id) })),
            nodes: data.vertices().map(v => {
                const bbox = v.element.node().getBBox();
                return { width: bbox.width, height: bbox.height, ...v.props };
            }),
            links: data.edges().map(e => e.props),
            hierarchy: [
                ...data.subgraphs().filter(s => !!data.subgraphParent(s.id)).map(s => ({ parent: clusterID(data.subgraphParent(s.id).props.id), child: clusterID(s.id) })),
                ...data.vertices().filter(v => data.vertexParent(v.id) !== undefined).map(v => ({ parent: clusterID(data.vertexParent(v.id).props.id), child: v.id }))
            ]
        }, this._options).then((response: any) => {
            const end = performance.now();
            console.log("dagreWorker:  " + (end - start));
            if (this.running()) {
                response.subgraphs.forEach(n => {
                    const sg = data.subgraph(rClusterID(n.id));
                    sg.x = n.x + size.width / 2;
                    sg.y = n.y + size.height / 2;
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
                });
                this._graph
                    .moveVertices(true)
                    .moveSubgraphs(true)
                    .moveEdges(true)
                    ;
                this.stop();
            }
            return this;
        });
    }
}

//  No worker - old ---

import { GraphLabel, graphlib, layout } from "dagre";

export class DagreOld extends Layout {

    _options: GraphLabel = {
    };

    start() {
        return super.start().then(() => {
            const size = this._graph.size();
            const data = this._graph.graphData();
            const digraph = new graphlib.Graph({ multigraph: true, compound: false })
                .setGraph({
                    compound: false

                })
                .setDefaultNodeLabel(function () { return {}; })
                .setDefaultEdgeLabel(function () { return {}; })
                ;
            data.vertices().forEach(vp => {
                digraph.setNode(vp.id, vp);
            });
            data.edges().forEach(ep => {
                digraph.setEdge(ep.source.id, ep.target.id, ep, ep.id);
            });
            /*
            graphData.eachNode(function (u) {
                digraph.setParent(u, graphData.parent(u));
            });
            */
            const start = performance.now();
            layout(digraph, { debugTiming: false } as GraphLabel);
            const end = performance.now();
            console.log("Layout:  " + (end - start));
            const deltaX = -digraph.graph().width / 2 + size.width / 2;
            const deltaY = -digraph.graph().height / 2 + size.height / 2;
            digraph.nodes().forEach(function (u) {
                const vp = digraph.node(u) as any;
                vp.x += deltaX;
                vp.y += deltaY;
            });
            digraph.edges().forEach(function (e) {
                const ep = digraph.edge(e) as any;
                ep.points = ep.points.map(p => [p.x + deltaX, p.y + deltaY]);
            });
            this._graph
                .moveVertices(true)
                .moveEdges(true)
                ;
            this.stop();
            return this;
        });
    }
}
