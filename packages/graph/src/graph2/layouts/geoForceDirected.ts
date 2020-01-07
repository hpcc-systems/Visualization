export const tmp = 42;
/*
import { forceLink as d3ForceLink, forceManyBody as d3ForceManyBody, forceSimulation as d3ForceSimulation } from "d3-force";
import { Layout } from "./layout";

export class GeoForceDirectedBase extends Layout {

    protected _links;
    protected _charge;
    protected _simulation;

    constructor(graph, readonly _options = defaultOptions) {
        super(graph);
    }

    start() {
        return super.start().then(() => {
            const data = this._graph.graphData();
            this._links = d3ForceLink(data.edges())
                .id(d => d.id)
                .distance(this._options.linkDistance)
                .strength(this._options.linkStrength)
                ;
            this._charge = d3ForceManyBody()
                .strength(d => this._options.charge * Math.max(d.width, d.height))
                ;
            this._simulation = d3ForceSimulation()
                .force("link", this._links)
                .force("charge", this._charge)
                .nodes(data.vertices().map(v => {
                    // const { width, height } = v.widget.getBBox();
                    // v["width"] = width;
                    // v["height"] = height;
                    return v;
                }))
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

export class GeoForceDirected extends GeoForceDirectedBase {

    start() {
        return super.start().then(() => {
            const vertices = this._graph.graphData().vertices();
            vertices.forEach(vp => {
                if (vp.lat && vp.lng) {
                    // const [x, y] = this._graph.project(vp.lat, vp.lng);
                    // vp.fx = x;
                    // vp.fy = y;
                }
            });

            this._simulation
                // .velocityDecay(0.1)
                .restart()
                ;
            let total = vertices.length;
            total = Math.min(total * total, 500);
            for (let i = 0; i < total; ++i) {
                this._simulation.tick();
            }
            this._simulation.stop();
            vertices.forEach(vp => {
                if (vp.lat && vp.lng) {
                    delete vp.fx;
                    delete vp.fy;
                }
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

export class GeoForceDirectedAnimated extends GeoForceDirectedBase {

    start() {
        super.start();
        return new Promise<this>(resolve => {
            this._simulation
                .velocityDecay(this._options.velocityDecay)
                .on("tick", () => {
                    this._graph
                        .moveVertices(false)
                        .moveEdges(false)
                        ;
                })
                .on("end", () => {
                    this._running = false;
                    resolve(this);
                })
                .restart()
                ;
        });
    }
}
*/
