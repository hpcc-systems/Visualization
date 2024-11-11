import { Layout } from "./layout.ts";

const rads = (degrees: number) => degrees * Math.PI / 180;
const radius = (vertexCount: number, sideLength: number) => sideLength / (2 * Math.sin(rads(180 / vertexCount)));

export class Circle extends Layout {

    constructor(graph, readonly sideLength = 60) {
        super(graph);
    }

    start(): Promise<this> {
        return super.start().then(() => {
            const size = this._graph.size();
            const data = this._graph.graphData();
            const vertices = data.allVertices();
            const edges = data.allEdges();
            edges.forEach(e => delete e.points);

            const r = radius(vertices.length, this.sideLength);
            const angle = 360 / vertices.length;
            vertices.forEach((v, i) => {
                delete v.fx;
                delete v.fy;
                v.x = size.width / 2 + Math.cos(rads(i * angle)) * r;
                v.y = size.height / 2 + Math.sin(rads(i * angle)) * r;
            });
            this._graph
                .moveVertices(true)
                .moveEdges(true)
                ;
            this.stop();
            this._running = false;
            return this;
        });
    }
}
