import { curveBasis as d3CurveBasis, line as d3Line } from "d3-shape";
import { dagre, Options } from "./dagreWorker";
import { Layout, Point } from "./layout";
import { EdgePlaceholder } from "./placeholders";

const lineBasis = d3Line<Point>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3CurveBasis)
    ;

const clusterID = (id: string | number) => `cluster_${id}`;
const rClusterID = (id: string) => id.substring(8);

function distance(x1, y1, x2, y2) {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
}

export class Dagre extends Layout {

    constructor(graph, readonly _options: Options) {
        super(graph);
    }

    start() {
        super.start();
        const size = this._graph.size();
        const data = this._graph.graphData();

        return dagre({
            subgraphs: data.allSubgraphs().map(s => ({
                ...s.props,
                id: clusterID(s.id)
            })),
            nodes: data.allVertices().map(v => {
                delete v.fx;
                delete v.fy;
                const bbox = v.element.node().getBBox();
                return {
                    width: bbox.width,
                    height: bbox.height,
                    ...v.props,
                    id: String(v.id)
                };
            }),
            links: data.allEdges().map(e => {
                return {
                    id: String(e.props.id),
                    source: {
                        id: String(e.source.props.id),
                        text: e.source.props.text,
                    },
                    target: {
                        id: String(e.target.props.id),
                        text: e.target.props.text,
                    }
                };
            }),
            hierarchy: [
                ...data.allSubgraphs()
                    .filter(s => !!data.subgraphParent(s.id))
                    .map(s => ({
                        parent: clusterID(data.subgraphParent(s.id).props.id),
                        child: clusterID(s.id)
                    })),
                ...data.allVertices()
                    .filter(v => data.vertexParent(v.id) !== undefined)
                    .map(v => ({
                        parent: clusterID(data.vertexParent(v.id).props.id),
                        child: String(v.id)
                    }))
            ]
        }, this._options).response.then((response: any) => {
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
                    const sourceDist = distance(e.source.x, e.source.y, l.points[0][0] + size.width / 2, l.points[0][1] + size.height / 2);
                    const targetDist = distance(e.target.x, e.target.y, l.points[0][0] + size.width / 2, l.points[0][1] + size.height / 2);
                    e.points = [
                        sourceDist < targetDist ? [e.source.x, e.source.y] : [e.target.x, e.target.y],
                        ...l.points.map(p => [p[0] + size.width / 2, p[1] + size.height / 2]),
                        sourceDist < targetDist ? [e.target.x, e.target.y] : [e.source.x, e.source.y]
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
