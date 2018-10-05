import { Edge, Vertex } from "@hpcc-js/graph";

/**
 * The IMDBEdge class provides basic styling for links between people and movies.
 * Each edge is terminated with a circle at both ends to indicate the graph is undirected.
 * Contains a simple example of custom HTML for the tooltip.
 */
export class IMDBEdge extends Edge {

    /**
     * Initializes the default styling for the edge.  The edge will link Movies and
     * People indicating their relationship ("Actor" | "Director")
     */
    constructor() {
        super();
        this
            .sourceMarker("circle")
            .targetMarker("circle")
            ;
    }

    /**
     * Custom HTML tooltip
     */
    tooltipHTML(): string {
        const s = this.sourceVertex() as Vertex;
        const t = this.targetVertex() as Vertex;
        return `<div style="text-align:center">
            <p>${s.text()}</p>
            <p>|</p>
            <p>${this.text()}</p>
            <p>|</p>
            <p>${t.text()}</p>
        </div>`;
    }
}
