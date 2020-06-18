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
        const nodeIndexMap = {};
        const nodes = data.vertices().map((v,i) => {
            const bbox = v.element.node().getBBox();
            nodeIndexMap[v.id] = i;
            return {
                vertex_id: v.id,
                width: bbox.width,
                height: bbox.height,
                ...v.props,
                id: i
            };
        });
        const links = data.edges().map((e,i) => {
            const source = {...e.props.source};
            const target = {...e.props.target};
            if(typeof nodeIndexMap[source.id] !== "undefined") source.id = nodeIndexMap[source.id];
            if(typeof nodeIndexMap[target.id] !== "undefined") target.id = nodeIndexMap[target.id];
            return {
                edge_id: e.id,
                ...e.props,
                source,
                target,
                id: i
            }
        });
        return dagre({
            subgraphs: data.subgraphs().map(s => ({
                ...s.props,
                id: clusterID(s.id)
            })),
            nodes: (nodes as any),
            links: (links as any),
            hierarchy: [
                ...data.subgraphs()
                    .filter(s => !!data.subgraphParent(s.id))
                    .map(s => ({
                        parent: clusterID(data.subgraphParent(s.id).props.id),
                        child: clusterID(s.id)
                    })),
                ...data.vertices()
                    .filter(v => data.vertexParent(v.id) !== undefined)
                    .map(v => ({
                        parent: clusterID(data.vertexParent(v.id).props.id),
                        child: v.id
                    }))
            ]
        }, this._options).then((response: any) => {
            if (this.running()) {
                response.subgraphs.forEach(n => {
                    const sg = data.subgraph(rClusterID(n.id));
                    sg.x = n.x + size.width / 2;
                    sg.y = n.y + size.height / 2;
                    sg.props.width = n.width;
                    sg.props.height = n.height;
                });
                response.nodes.forEach(n => {
                    const v = data.vertex(n.vertex_id);
                    v.x = n.x + size.width / 2;
                    v.y = n.y + size.height / 2;
                });
                response.links.forEach(l => {
                    const e = data.edge(l.edge_id);
                    e.points = [
                        [e.source.x, e.source.y],
                        ...l.points.map(p => [p[0] + size.width / 2, p[1] + size.height / 2]),
                        [e.target.x, e.target.y]
                    ];
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
