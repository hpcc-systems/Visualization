import { forceCenter as d3ForceCenter, forceLink as d3ForceLink, forceManyBody as d3ForceManyBody, forceSimulation as d3ForceSimulation } from "d3-force";
import { Layout } from "./layout";

import { forceDirected as fdWorker, Options } from "./forceDirectedWorker";

export class ForceDirected extends Layout {

    constructor(graph, readonly _options: Options) {
        super(graph);
    }

    start() {
        return super.start().then(self => {
            const size = this._graph.size();
            const data = this._graph.graphData();
            const vertices = data.vertices();
            const edges = data.edges();
            edges.forEach(e => delete e.points);
            return fdWorker({
                nodes: vertices.map(v => v.props),
                links: edges.map(e => e.props)
            }, this._options).then((response: any) => {
                response.nodes.forEach(n => {
                    const v = data.vertex(n.id);
                    v.x = n.x + size.width / 2;
                    v.y = n.y + size.height / 2;
                });
                this._graph
                    .moveVertices(true)
                    .moveEdges(true)
                    ;
                this.stop();
                return this;
            });
        });
    }
}

//  Non worker ---

export class ForceDirectedBase extends Layout {

    protected _links;
    protected _charge;
    protected _center;
    protected _simulation;

    constructor(graph, readonly _options: Options) {
        super(graph);
    }

    start() {
        return super.start().then(() => {

            const size = this._graph.size();
            const data = this._graph.graphData();
            const vertices = data.vertices();
            const edges = data.edges();
            edges.forEach(e => delete e.points);

            this._links = d3ForceLink(edges)
                .id(d => d.id)
                .distance(this._options.linkDistance)
                .strength(this._options.linkStrength)
                ;

            this._charge = d3ForceManyBody()
                .strength(this._options.repulsionStrength)
                ;

            this._center = d3ForceCenter(size.width / 2, size.height / 2);

            this._simulation = d3ForceSimulation(vertices.map(v => {
                const { width, height } = v.element.node().getBBox();
                v["width"] = width;
                v["height"] = height;
                return v;
            }))
                .force("link", this._links)
                .force("charge", this._charge)
                .force("center", this._center)
                .alpha(this._options.alpha / 2)
                .alphaMin(this._options.alphaMin)
                .alphaDecay(this._options.alphaDecay)
                .velocityDecay(this._options.velocityDecay)
                .stop()
                ;

            return this;
        });
    }

    stop() {
        this._simulation.stop();
        return super.stop();
    }
}

export class ForceDirectedAnimated extends ForceDirectedBase {

    start() {
        return super.start().then(() => {
            return new Promise<this>(resolve => {
                let total = 0;
                let count = 0;
                this._simulation
                    .on("tick", () => {
                        const start = performance.now();
                        this._graph
                            .moveVertices(false)
                            .moveEdges(false)
                            ;
                        total += performance.now() - start;
                        ++count;
                        console.log("tick:" + (total / count));
                    })
                    .on("end", () => {
                        this._running = false;
                        resolve(this);
                    })
                    .restart()
                    ;
            });
        });
    }
}
