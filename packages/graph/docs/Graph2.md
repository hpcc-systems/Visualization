# Graph2 (beta)

Graph2 is a newer implementation of the Graph widget, the main focus has been on improving performance and reverting to a data driven modal.

```sample-code
import {Graph2} from "@hpcc-js/graph";

const subgraphs = [
    { id: 10, text: "Adults" }
];

const vertices = [
    { id: 0, text: "Daddy" },
    { id: 1, text: "Mummy" },
    { id: 2, text: "Baby" }
];

const edges = [
    { id: 0, source: vertices[0], target: vertices[2] },
    { id: 1, source: vertices[1], target: vertices[2] }
];

const hierarchy = [
    { parent: subgraphs[0], child: vertices[0] },
    { parent: subgraphs[0], child: vertices[1] }
];

new Graph2()
    .target("target")
    .data({ subgraphs, vertices, edges, hierarchy })
    .layout("Hierarchy")
    .render()
    ;
```

## With Categories

```sample-code
import {Graph2} from "@hpcc-js/graph";

const subgraphs = [
    { id: 10, text: "Adults" }
];

const vertices = [
    { categoryID: 0, id: 0, text: "Daddy" },
    { categoryID: 0, id: 1, text: "Mummy" },
    { categoryID: 1, id: 2, text: "Pickup", centroid: true }
];

const edges = [
    { id: 0, source: vertices[0], target: vertices[2] },
    { id: 1, source: vertices[1], target: vertices[2] }
];

const hierarchy = [
    { parent: subgraphs[0], child: vertices[0] },
    { parent: subgraphs[0], child: vertices[1] }
];

new Graph2()
    .target("target")
    .categories([{
        id: 0,
        imageChar: "fa-user"
    },{
        id: 1,
        imageChar: "fa-car"
    }])
    .data({ subgraphs, vertices, edges, hierarchy })
    .layout("Hierarchy")
    .render()
    ;
```

## With Annotations

```sample-code
import {Graph2} from "@hpcc-js/graph";

const subgraphs = [
    { id: 10, text: "Adults" }
];

const vertices = [
    { categoryID: 0, id: 0, text: "Daddy", centroid: true },
    { categoryID: 0, id: 1, text: "Mummy" },
    { categoryID: 1, id: 2, text: "Pickup", annotations:[0, 1] }
];

const edges = [
    { id: 0, source: vertices[0], target: vertices[2] },
    { id: 1, source: vertices[1], target: vertices[2] }
];

const hierarchy = [
    { parent: subgraphs[0], child: vertices[0] },
    { parent: subgraphs[0], child: vertices[1] }
];

new Graph2()
    .target("target")
    .categories([{
        id: 0,
        imageChar: "fa-user"
    },{
        id: 1,
        imageChar: "fa-car"
    }])
    .annotations([{
        id: 0,
        imageChar: "fa-plus",
        fill: "white",
        stroke: "whitesmoke",
        imageCharFill: "red"
    },{
        id: 1,
        imageChar: "fa-star",
        fill: "navy",
        imageCharFill: "white"
    }])
    .data({ subgraphs, vertices, edges, hierarchy })
    .layout("Hierarchy")
    .render()
    ;
```
