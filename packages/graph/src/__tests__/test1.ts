import { Graph } from "../Graph";
import { createData } from "./data";

export class Test extends Graph {

    constructor() {
        super();
        this
            .data(createData())
            .layout("ForceDirected")
            .applyScaleOnLayout(true)
            .centroidColor("darkgreen")
            .dragSingleNeighbors(true)
            .highlightSelectedPathToCentroid(true)
            ;
    }
}

