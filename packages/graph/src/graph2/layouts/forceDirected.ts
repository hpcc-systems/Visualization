import { forceCenter as d3ForceCenter, forceLink as d3ForceLink, forceManyBody as d3ForceManyBody, forceSimulation as d3ForceSimulation, forceX as d3ForceX, forceY as d3ForceY } from "d3-force";

import { Layout } from "./layout.ts";

import { Options } from "./forceDirectedWorker.ts";

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
            const vertices = data.allVertices();
            const edges = data.allEdges();
            edges.forEach(e => delete e.points);

            this._links = d3ForceLink(edges)
                .id(d => d.id)
                .distance(this._options.linkDistance)
                .strength(this._options.linkStrength)
                ;

            this._charge = d3ForceManyBody()
                .strength(this._options.repulsionStrength)
                .distanceMin(this._options.distanceMin)
                .distanceMax(this._options.distanceMax)
                ;

            this._center = d3ForceCenter(size.width / 2, size.height / 2);

            const fx = d3ForceX()
                .strength(this._options.forceStrength)
                ;
            const fy = d3ForceY()
                .strength(this._options.forceStrength)
                ;

            this._simulation = d3ForceSimulation(vertices.map(v => {
                const { width, height } = v.element.node().getBBox();
                v.fx = (this._options.pinCentroid && v.props.centroid) ? size.width / 2 : undefined;
                v.fy = (this._options.pinCentroid && v.props.centroid) ? size.height / 2 : undefined;
                v["width"] = width;
                v["height"] = height;
                return v;
            }))
                .force("link", this._links)
                .force("charge", this._charge)
                .force("center", this._center)
                .force("x", fx)
                .force("y", fy)
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

export class ForceDirected extends ForceDirectedBase {

    start() {
        return super.start().then(() => {
            this._simulation.tick(this._options.iterations);
            this.stop();
            this._graph
                .moveVertices(false)
                .moveEdges(false)
                ;
            return this;
        });
    }
}

export class ForceDirectedAnimated extends ForceDirectedBase {

    start() {
        return super.start().then(() => {
            return new Promise<this>(resolve => {
                this._simulation
                    .on("tick", () => {
                        this._graph
                            .moveVertices(false)
                            .moveEdges(false)
                            ;
                        this._graph.progress("layout-tick");
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
