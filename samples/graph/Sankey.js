import { SankeyGraph } from "@hpcc-js/graph";

new SankeyGraph()
    .vertexColumns(["category", "id", "label"])
    .vertices([
        [0, 0, "Year 1"],
        [0, 1, "Year 2"],
        [0, 2, "Year 3"],
        [0, 3, "Year 4"],
        [1, 4, "Math"],
        [1, 5, "English"],
        [1, 6, "Geometry"],
        [1, 7, "Science"],
    ])
    .edgeColumns(["source", "target", "weight"])
    .edges([
        [0, 4, 1],
        [1, 4, 1],
        [2, 4, 1],
        [3, 4, 1],
        [0, 5, 1],
        [1, 5, 1],
        [2, 6, 1],
        [3, 6, 1],
        [1, 7, 1],
        [2, 7, 1],
        [3, 7, 1],
    ])
    .target("target")
    .render()
    ;