import { Graph } from "../src/index.ts";
import { createData } from "./data";

export class Test1 extends Graph {

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

