import { Palette } from "@hpcc-js/common";
import { Graph } from "./Graph";
import { Vertex } from "./Vertex";
import { Edge } from "./Edge";
import { DataGraph } from "./graph2/dataGraph";
import { SankeyGraph } from "./graph2/sankeyGraph";

export { Test2 as Test };

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

export class Test2 extends DataGraph {

    constructor() {
        super();
        const g = genData2();
        this
            .layout("ForceDirected")
            .forceDirectedRepulsionStrength(-3500)
            .forceDirectedLinkDistance(150)
            .forceDirectedLinkStrength(1.5)
            .forceDirectedPinCentroid(true)
            .hierarchyDigraph(false)

            .centroidColor("#777777")

            .selectionGlowColor("#555555")
            .highlightOnMouseOverEdge(true)
            .highlightOnMouseOverVertex(true)
            .showVertexLabels(true)

            .applyScaleOnLayout(true)
            .zoomToFitLimit(1)

            .edgeArcDepth(8)
            .edgeStrokeWidth(2)
            .edgeColor("#287EC4")

            .allowDragging(true)

            .annotations([{
                id: "0",
                imageChar: "fa-plus",
                fill: "white",
                stroke: "whitesmoke",
                imageCharFill: "red"
            }, {
                id: "1",
                imageChar: "fa-star",
                fill: "navy",
                imageCharFill: "white"
            }])

            .vertexColumns(["id", "label", "fachar", "centroid", "ann1", "ann2", "ann3"])
            .vertexCentroidColumn("centroid")
            .vertexFACharColumn("fachar")
            .vertexIDColumn("id")
            .vertexLabelColumn("label")
            .vertexAnnotationColumns([
                { columnID: "ann1", annotationID: "0" } as any,
                { columnID: "ann2", annotationID: "1" } as any
            ])
            .vertices(g.vertices)

            .edgeColumns(["source", "target", "label", "weightXXX"])
            // .edgeIDColumn("id")
            .edgeSourceColumn("source")
            .edgeTargetColumn("target")
            .edgeLabelColumn("label")
            // .edgeWeightColumn("weight")
            .edges(g.edges)

            //  Events  ---
            .on("vertex_click", () => {
                console.log("vertex_click");
            })
            .on("vertex_dblclick", () => {
                console.log("vertex_dblclick");
            })
            .on("vertex_mouseover", () => {
                console.log("vertex_mouseover");
            })
            ;

        setTimeout(() => {
            // this.downloadPNG();
        }, 3000);
    }
}

export class Test3 extends SankeyGraph {

    constructor() {
        super();
        this
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
            ;
    }
}

// 8
let seed = 8;
function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
function rand() {
    return Math.round(random() * 32767);
}

function make_pair<T>(a: T, b: T): [T, T] {
    return [a, b];
}

// @ts-ignore
function genData(MAX_VERTICES = 200, MAX_EDGES = 200) {
    const edges: [number, number][] = [];
    function edges_has(p: [number, number]): boolean {
        return edges.some(row => row[0] === p[0] && row[1] === p[1]);
    }

    const NUM = 1 + rand() % MAX_VERTICES;
    let NUMEDGE = 1 + rand() % MAX_EDGES;

    while (NUMEDGE > NUM * (NUM - 1) / 2) {
        NUMEDGE = 1 + rand() % MAX_EDGES;
    }

    for (let j = 1; j <= NUMEDGE; j++) {
        let a = 1 + rand() % NUM;
        let b = 1 + rand() % NUM;
        let p = make_pair(a, b);

        while (edges_has(p) || a == b) {
            a = 1 + rand() % NUM;
            b = 1 + rand() % NUM;
            p = make_pair(a, b);
        }
        edges.push(p);
    }

    const vertices: { [id: number]: boolean } = {};
    for (const it of edges) {
        vertices[it[0]] = true;
        vertices[it[1]] = true;
    }

    const icons = ["fa-at", "fa-user-o", "fa-address-card-o", "fa-globe", "fa-phone"];
    return {
        vertices: Object.keys(vertices).map(v => [v, `Node-${v}`, icons[Math.floor(Math.random() * icons.length)]]),
        edges: edges.map(e => [e[0], e[1], "", 1])
    };
}

function genData2() {
    return {
        vertices: [
            ["a", "myriel@gmail.com", "fa-at", false],
            [1, "Napoleon", "fa-user-o", false, true, true],
            [2, "Mlle.Baptistine", "fa-user-o"],
            [3, "Mme.Magloire", "fa-user-o"],
            [4, "CountessdeLo", "fa-user-o"],
            [5, "Geborand", "fa-user-o"],
            [6, "Champtercier", "fa-user-o"],
            [7, "Cravatte", "fa-user-o"],
            [8, "(561)888-8888", "fa-phone", true],
            [9, "123-12-1234", "fa-address-card-o"],
            [10, "192.168.0.100", "fa-globe"],
            [11, "28 Mean Street, FL 33487", "fa-map-o"],
            [12, "(561)999-9999", "fa-phone"],
            [13, "123-45-6789", "fa-address-card-o"],
            [14, "123-23-2345", "fa-address-card-o"],
            [15, "(561)777-9999", "fa-phone"],
            [16, "123-45-0000", "fa-address-card-o"],
            [17, "192.168.0.22", "fa-globe"],
            [18, "11 Arcia Ave, FL 33487", "fa-map-o"],
            [19, "123-45-1111", "fa-address-card-o"],
            [20, "123-45-1111", "fa-address-card-o"],
            [21, "192.168.0.22", "fa-globe"],
            [22, "(561)777-9999", "fa-phone"],
            [23, "111-11-1111", "fa-address-card-o"],
            [24, "192.168.0.33", "fa-globe"],
            //    [25, "XXX.XXX.XXX.XXX", "fa-globe"],
        ],
        edges: [
            [1, "a", "XXX", 1],
            [2, "a", "", 8],
            [3, "a", "", 10],
            [4, "a", "", 6],
            [5, "a", "", 1],
            [6, "a", "", 1],
            [7, "a", "", 1],
            [1, 8, "", 1],
            [1, 9, "", 1],
            [1, 10, "", 1],
            [1, 11, "", 1],
            [2, 12, "", 1],
            [2, 13, "", 1],
            [2, 10, "", 1],
            [2, 11, "", 1],
            [3, 12, "", 1],
            [3, 14, "", 1],
            [3, 10, "", 1],
            [3, 11, "", 1],
            [4, 15, "", 1],
            [4, 16, "", 1],
            [4, 17, "", 1],
            [17, 11, "", 1],
            [5, 17, "", 1],
            [5, 18, "", 1],
            [5, 19, "", 1],
            [6, 18, "", 1],
            [6, 20, "", 1],
            [6, 21, "", 1],
            [6, 22, "", 1],
            [7, 22, "", 1],
            [7, 23, "", 1],
            [7, 24, "", 1],
            [24, 24, "", 1],
        ]
    };
}

function createData() {
    const vertices = [];
    const edges = [];
    const palette = Palette.ordinal("dark2");
    const rawData = {
        nodes: [
            { "name": "Myriel", "group": 1 },
            { "name": "Napoleon", "group": 1 },
            { "name": "Mlle.Baptistine", "group": 1 },
            { "name": "Mme.Magloire", "group": 1 },
            { "name": "CountessdeLo", "group": 1 },
            { "name": "Geborand", "group": 1 },
            { "name": "Champtercier", "group": 1 },
            { "name": "Cravatte", "group": 1 },
            { "name": "Count", "group": 1 },
            { "name": "OldMan", "group": 1 },
            { "name": "Labarre", "group": 2 },
            { "name": "Valjean", "group": 2 },
            { "name": "Marguerite", "group": 3 },
            { "name": "Mme.deR", "group": 2 },
            { "name": "Isabeau", "group": 2 },
            { "name": "Gervais", "group": 2 },
            { "name": "Tholomyes", "group": 3 },
            { "name": "Listolier", "group": 3 },
            { "name": "Fameuil", "group": 3 },
            { "name": "Blacheville", "group": 3 },
            { "name": "Favourite", "group": 3 },
            { "name": "Dahlia", "group": 3 },
            { "name": "Zephine", "group": 3 },
            { "name": "Fantine", "group": 3 },
            { "name": "Mme.Thenardier", "group": 4 },
            { "name": "Thenardier", "group": 4 },
            { "name": "Cosette", "group": 5 },
            { "name": "Javert", "group": 4 },
            { "name": "Fauchelevent", "group": 0 },
            { "name": "Bamatabois", "group": 2 },
            { "name": "Perpetue", "group": 3 },
            { "name": "Simplice", "group": 2 },
            { "name": "Scaufflaire", "group": 2 },
            { "name": "Woman1", "group": 2 },
            { "name": "Judge", "group": 2 },
            { "name": "Champmathieu", "group": 2 },
            { "name": "Brevet", "group": 2 },
            { "name": "Chenildieu", "group": 2 },
            { "name": "Cochepaille", "group": 2 },
            { "name": "Pontmercy", "group": 4 },
            { "name": "Boulatruelle", "group": 6 },
            { "name": "Eponine", "group": 4 },
            { "name": "Anzelma", "group": 4 },
            { "name": "Woman2", "group": 5 },
            { "name": "MotherInnocent", "group": 0 },
            { "name": "Gribier", "group": 0 },
            { "name": "Jondrette", "group": 7 },
            { "name": "Mme.Burgon", "group": 7 },
            { "name": "Gavroche", "group": 8 },
            { "name": "Gillenormand", "group": 5 },
            { "name": "Magnon", "group": 5 },
            { "name": "Mlle.Gillenormand", "group": 5 },
            { "name": "Mme.Pontmercy", "group": 5 },
            { "name": "Mlle.Vaubois", "group": 5 },
            { "name": "Lt.Gillenormand", "group": 5 },
            { "name": "Marius", "group": 8 },
            { "name": "BaronessT", "group": 5 },
            { "name": "Mabeuf", "group": 8 },
            { "name": "Enjolras", "group": 8 },
            { "name": "Combeferre", "group": 8 },
            { "name": "Prouvaire", "group": 8 },
            { "name": "Feuilly", "group": 8 },
            { "name": "Courfeyrac", "group": 8 },
            { "name": "Bahorel", "group": 8 },
            { "name": "Bossuet", "group": 8 },
            { "name": "Joly", "group": 8 },
            { "name": "Grantaire", "group": 8 },
            { "name": "MotherPlutarch", "group": 9 },
            { "name": "Gueulemer", "group": 4 },
            { "name": "Babet", "group": 4 },
            { "name": "Claquesous", "group": 4 },
            { "name": "Montparnasse", "group": 4 },
            { "name": "Toussaint", "group": 5 },
            { "name": "Child1", "group": 10 },
            { "name": "Child2", "group": 10 },
            { "name": "Brujon", "group": 4 },
            { "name": "Mme.Hucheloup", "group": 8 }
        ],
        "links": [
            { "source": 1, "target": 0, "value": 1 },
            { "source": 2, "target": 0, "value": 8 },
            { "source": 2, "target": 0, "value": 8 },
            { "source": 3, "target": 0, "value": 10 },
            { "source": 3, "target": 2, "value": 6 },
            { "source": 4, "target": 0, "value": 1 },
            { "source": 5, "target": 0, "value": 1 },
            { "source": 6, "target": 0, "value": 1 },
            { "source": 7, "target": 0, "value": 1 },
            { "source": 8, "target": 0, "value": 2 },
            { "source": 9, "target": 0, "value": 1 },
            { "source": 11, "target": 10, "value": 1 },
            { "source": 11, "target": 3, "value": 3 },
            { "source": 11, "target": 2, "value": 3 },
            { "source": 11, "target": 0, "value": 5 },
            { "source": 12, "target": 11, "value": 1 },
            { "source": 13, "target": 11, "value": 1 },
            { "source": 14, "target": 11, "value": 1 },
            { "source": 15, "target": 11, "value": 1 },
            { "source": 17, "target": 16, "value": 4 },
            { "source": 18, "target": 16, "value": 4 },
            { "source": 18, "target": 17, "value": 4 },
            { "source": 19, "target": 16, "value": 4 },
            { "source": 19, "target": 17, "value": 4 },
            { "source": 19, "target": 18, "value": 4 },
            { "source": 20, "target": 16, "value": 3 },
            { "source": 20, "target": 17, "value": 3 },
            { "source": 20, "target": 18, "value": 3 },
            { "source": 20, "target": 19, "value": 4 },
            { "source": 21, "target": 16, "value": 3 },
            { "source": 21, "target": 17, "value": 3 },
            { "source": 21, "target": 18, "value": 3 },
            { "source": 21, "target": 19, "value": 3 },
            { "source": 21, "target": 20, "value": 5 },
            { "source": 22, "target": 16, "value": 3 },
            { "source": 22, "target": 17, "value": 3 },
            { "source": 22, "target": 18, "value": 3 },
            { "source": 22, "target": 19, "value": 3 },
            { "source": 22, "target": 20, "value": 4 },
            { "source": 22, "target": 21, "value": 4 },
            { "source": 23, "target": 16, "value": 3 },
            { "source": 23, "target": 17, "value": 3 },
            { "source": 23, "target": 18, "value": 3 },
            { "source": 23, "target": 19, "value": 3 },
            { "source": 23, "target": 20, "value": 4 },
            { "source": 23, "target": 21, "value": 4 },
            { "source": 23, "target": 22, "value": 4 },
            { "source": 23, "target": 12, "value": 2 },
            { "source": 23, "target": 11, "value": 9 },
            { "source": 24, "target": 23, "value": 2 },
            { "source": 24, "target": 11, "value": 7 },
            { "source": 25, "target": 24, "value": 13 },
            { "source": 25, "target": 23, "value": 1 },
            { "source": 25, "target": 11, "value": 12 },
            { "source": 26, "target": 24, "value": 4 },
            { "source": 26, "target": 11, "value": 31 },
            { "source": 26, "target": 16, "value": 1 },
            { "source": 26, "target": 25, "value": 1 },
            { "source": 27, "target": 11, "value": 17 },
            { "source": 27, "target": 23, "value": 5 },
            { "source": 27, "target": 25, "value": 5 },
            { "source": 27, "target": 24, "value": 1 },
            { "source": 27, "target": 26, "value": 1 },
            { "source": 28, "target": 11, "value": 8 },
            { "source": 28, "target": 27, "value": 1 },
            { "source": 29, "target": 23, "value": 1 },
            { "source": 29, "target": 27, "value": 1 },
            { "source": 29, "target": 11, "value": 2 },
            { "source": 30, "target": 23, "value": 1 },
            { "source": 31, "target": 30, "value": 2 },
            { "source": 31, "target": 11, "value": 3 },
            { "source": 31, "target": 23, "value": 2 },
            { "source": 31, "target": 27, "value": 1 },
            { "source": 32, "target": 11, "value": 1 },
            { "source": 33, "target": 11, "value": 2 },
            { "source": 33, "target": 27, "value": 1 },
            { "source": 34, "target": 11, "value": 3 },
            { "source": 34, "target": 29, "value": 2 },
            { "source": 35, "target": 11, "value": 3 },
            { "source": 35, "target": 34, "value": 3 },
            { "source": 35, "target": 29, "value": 2 },
            { "source": 36, "target": 34, "value": 2 },
            { "source": 36, "target": 35, "value": 2 },
            { "source": 36, "target": 11, "value": 2 },
            { "source": 36, "target": 29, "value": 1 },
            { "source": 37, "target": 34, "value": 2 },
            { "source": 37, "target": 35, "value": 2 },
            { "source": 37, "target": 36, "value": 2 },
            { "source": 37, "target": 11, "value": 2 },
            { "source": 37, "target": 29, "value": 1 },
            { "source": 38, "target": 34, "value": 2 },
            { "source": 38, "target": 35, "value": 2 },
            { "source": 38, "target": 36, "value": 2 },
            { "source": 38, "target": 37, "value": 2 },
            { "source": 38, "target": 11, "value": 2 },
            { "source": 38, "target": 29, "value": 1 },
            { "source": 39, "target": 25, "value": 1 },
            { "source": 40, "target": 25, "value": 1 },
            { "source": 41, "target": 24, "value": 2 },
            { "source": 41, "target": 25, "value": 3 },
            { "source": 42, "target": 41, "value": 2 },
            { "source": 42, "target": 25, "value": 2 },
            { "source": 42, "target": 24, "value": 1 },
            { "source": 43, "target": 11, "value": 3 },
            { "source": 43, "target": 26, "value": 1 },
            { "source": 43, "target": 27, "value": 1 },
            { "source": 44, "target": 28, "value": 3 },
            { "source": 44, "target": 11, "value": 1 },
            { "source": 45, "target": 28, "value": 2 },
            { "source": 47, "target": 46, "value": 1 },
            { "source": 48, "target": 47, "value": 2 },
            { "source": 48, "target": 25, "value": 1 },
            { "source": 48, "target": 27, "value": 1 },
            { "source": 48, "target": 11, "value": 1 },
            { "source": 49, "target": 26, "value": 3 },
            { "source": 49, "target": 11, "value": 2 },
            { "source": 50, "target": 49, "value": 1 },
            { "source": 50, "target": 24, "value": 1 },
            { "source": 51, "target": 49, "value": 9 },
            { "source": 51, "target": 26, "value": 2 },
            { "source": 51, "target": 11, "value": 2 },
            { "source": 52, "target": 51, "value": 1 },
            { "source": 52, "target": 39, "value": 1 },
            { "source": 53, "target": 51, "value": 1 },
            { "source": 54, "target": 51, "value": 2 },
            { "source": 54, "target": 49, "value": 1 },
            { "source": 54, "target": 26, "value": 1 },
            { "source": 55, "target": 51, "value": 6 },
            { "source": 55, "target": 49, "value": 12 },
            { "source": 55, "target": 39, "value": 1 },
            { "source": 55, "target": 54, "value": 1 },
            { "source": 55, "target": 26, "value": 21 },
            { "source": 55, "target": 11, "value": 19 },
            { "source": 55, "target": 16, "value": 1 },
            { "source": 55, "target": 25, "value": 2 },
            { "source": 55, "target": 41, "value": 5 },
            { "source": 55, "target": 48, "value": 4 },
            { "source": 56, "target": 49, "value": 1 },
            { "source": 56, "target": 55, "value": 1 },
            { "source": 57, "target": 55, "value": 1 },
            { "source": 57, "target": 41, "value": 1 },
            { "source": 57, "target": 48, "value": 1 },
            { "source": 58, "target": 55, "value": 7 },
            { "source": 58, "target": 48, "value": 7 },
            { "source": 58, "target": 27, "value": 6 },
            { "source": 58, "target": 57, "value": 1 },
            { "source": 58, "target": 11, "value": 4 },
            { "source": 59, "target": 58, "value": 15 },
            { "source": 59, "target": 55, "value": 5 },
            { "source": 59, "target": 48, "value": 6 },
            { "source": 59, "target": 57, "value": 2 },
            { "source": 60, "target": 48, "value": 1 },
            { "source": 60, "target": 58, "value": 4 },
            { "source": 60, "target": 59, "value": 2 },
            { "source": 61, "target": 48, "value": 2 },
            { "source": 61, "target": 58, "value": 6 },
            { "source": 61, "target": 60, "value": 2 },
            { "source": 61, "target": 59, "value": 5 },
            { "source": 61, "target": 57, "value": 1 },
            { "source": 61, "target": 55, "value": 1 },
            { "source": 62, "target": 55, "value": 9 },
            { "source": 62, "target": 58, "value": 17 },
            { "source": 62, "target": 59, "value": 13 },
            { "source": 62, "target": 48, "value": 7 },
            { "source": 62, "target": 57, "value": 2 },
            { "source": 62, "target": 41, "value": 1 },
            { "source": 62, "target": 61, "value": 6 },
            { "source": 62, "target": 60, "value": 3 },
            { "source": 63, "target": 59, "value": 5 },
            { "source": 63, "target": 48, "value": 5 },
            { "source": 63, "target": 62, "value": 6 },
            { "source": 63, "target": 57, "value": 2 },
            { "source": 63, "target": 58, "value": 4 },
            { "source": 63, "target": 61, "value": 3 },
            { "source": 63, "target": 60, "value": 2 },
            { "source": 63, "target": 55, "value": 1 },
            { "source": 64, "target": 55, "value": 5 },
            { "source": 64, "target": 62, "value": 12 },
            { "source": 64, "target": 48, "value": 5 },
            { "source": 64, "target": 63, "value": 4 },
            { "source": 64, "target": 58, "value": 10 },
            { "source": 64, "target": 61, "value": 6 },
            { "source": 64, "target": 60, "value": 2 },
            { "source": 64, "target": 59, "value": 9 },
            { "source": 64, "target": 57, "value": 1 },
            { "source": 64, "target": 11, "value": 1 },
            { "source": 65, "target": 63, "value": 5 },
            { "source": 65, "target": 64, "value": 7 },
            { "source": 65, "target": 48, "value": 3 },
            { "source": 65, "target": 62, "value": 5 },
            { "source": 65, "target": 58, "value": 5 },
            { "source": 65, "target": 61, "value": 5 },
            { "source": 65, "target": 60, "value": 2 },
            { "source": 65, "target": 59, "value": 5 },
            { "source": 65, "target": 57, "value": 1 },
            { "source": 65, "target": 55, "value": 2 },
            { "source": 66, "target": 64, "value": 3 },
            { "source": 66, "target": 58, "value": 3 },
            { "source": 66, "target": 59, "value": 1 },
            { "source": 66, "target": 62, "value": 2 },
            { "source": 66, "target": 65, "value": 2 },
            { "source": 66, "target": 48, "value": 1 },
            { "source": 66, "target": 63, "value": 1 },
            { "source": 66, "target": 61, "value": 1 },
            { "source": 66, "target": 60, "value": 1 },
            { "source": 67, "target": 57, "value": 3 },
            { "source": 68, "target": 25, "value": 5 },
            { "source": 68, "target": 11, "value": 1 },
            { "source": 68, "target": 24, "value": 1 },
            { "source": 68, "target": 27, "value": 1 },
            { "source": 68, "target": 48, "value": 1 },
            { "source": 68, "target": 41, "value": 1 },
            { "source": 69, "target": 25, "value": 6 },
            { "source": 69, "target": 68, "value": 6 },
            { "source": 69, "target": 11, "value": 1 },
            { "source": 69, "target": 24, "value": 1 },
            { "source": 69, "target": 27, "value": 2 },
            { "source": 69, "target": 48, "value": 1 },
            { "source": 69, "target": 41, "value": 1 },
            { "source": 70, "target": 25, "value": 4 },
            { "source": 70, "target": 69, "value": 4 },
            { "source": 70, "target": 68, "value": 4 },
            { "source": 70, "target": 11, "value": 1 },
            { "source": 70, "target": 24, "value": 1 },
            { "source": 70, "target": 27, "value": 1 },
            { "source": 70, "target": 41, "value": 1 },
            { "source": 70, "target": 58, "value": 1 },
            { "source": 71, "target": 27, "value": 1 },
            { "source": 71, "target": 69, "value": 2 },
            { "source": 71, "target": 68, "value": 2 },
            { "source": 71, "target": 70, "value": 2 },
            { "source": 71, "target": 11, "value": 1 },
            { "source": 71, "target": 48, "value": 1 },
            { "source": 71, "target": 41, "value": 1 },
            { "source": 71, "target": 25, "value": 1 },
            { "source": 72, "target": 26, "value": 2 },
            { "source": 72, "target": 27, "value": 1 },
            { "source": 72, "target": 11, "value": 1 },
            { "source": 73, "target": 48, "value": 2 },
            { "source": 74, "target": 48, "value": 2 },
            { "source": 74, "target": 73, "value": 3 },
            { "source": 75, "target": 69, "value": 3 },
            { "source": 75, "target": 68, "value": 3 },
            { "source": 75, "target": 25, "value": 3 },
            { "source": 75, "target": 48, "value": 1 },
            { "source": 75, "target": 41, "value": 1 },
            { "source": 75, "target": 70, "value": 1 },
            { "source": 75, "target": 71, "value": 1 },
            { "source": 76, "target": 64, "value": 1 },
            { "source": 76, "target": 65, "value": 1 },
            { "source": 76, "target": 66, "value": 1 },
            { "source": 76, "target": 63, "value": 1 },
            { "source": 76, "target": 62, "value": 1 },
            { "source": 76, "target": 48, "value": 1 },
            { "source": 76, "target": 58, "value": 1 }
        ]
    };
    rawData.nodes.forEach(function (node: any) {
        vertices.push(
            new Vertex()
                .centroid(node.name === "Valjean")
                .text(node.name)
                .textbox_shape_colorStroke(palette(node.group))
                .textbox_shape_colorFill("whitesmoke")
                .icon_shape_colorStroke(palette(node.group))
                .icon_shape_colorFill(palette(node.group))
                .faChar(node.name[0])
        )
            ;
    });

    rawData.links.forEach(function (link, idx) {
        edges.push(
            new Edge()
                .sourceVertex(vertices[link.source])
                .targetVertex(vertices[link.target])
                .sourceMarker("circle")
                .targetMarker("arrow")
                .text("")
                .weight(link.value)
        )
            ;
    });

    return { vertices: vertices, edges: edges };
}
