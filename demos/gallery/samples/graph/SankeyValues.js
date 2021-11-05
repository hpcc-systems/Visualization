import { SankeyGraph } from "@hpcc-js/graph";

new SankeyGraph()
    .vertexColumns(["category", "id", "label"])
    .vertices([
        [0, 0, "A"],
        [0, 1, "B"],
        [0, 2, "C"],
        [0, 3, "D"],
        [0, 4, "F"],
        [1, 5, "Math"],
        [2, 6, "English"],
        [3, 7, "Geometry"],
        [4, 8, "Science"],
    ])
    .edgeColumns(["source", "target", "weight"])
    .edges([
        [0, 5, 48],
        [0, 6, 28],
        [0, 7, 26],
        [0, 8, 38],
        [1, 5, 63],
        [1, 6, 39],
        [1, 7, 36],
        [1, 8, 58],
        [2, 5, 42],
        [2, 6, 36],
        [2, 7, 27],
        [2, 8, 68],
        [3, 5, 90],
        [3, 6, 59],
        [3, 7, 15],
        [3, 8, 35],
        [4, 5, 10],
        [4, 6, 3],
        [4, 7, 6],
        [4, 8, 4],
    ])
    .target("target")
    .render()
    ;
