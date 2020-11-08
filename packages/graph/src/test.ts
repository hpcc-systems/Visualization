import { DataGraph } from "./graph2/dataGraph";

export class Test extends DataGraph {

    constructor() {
        super();
        const g = genData2();
        this
            .forceDirectedRepulsionStrength(-3500)
            .forceDirectedLinkDistance(150)
            .forceDirectedLinkStrength(1.5)
            .layout("ForceDirectedHybrid")
            .hierarchyDigraph(false)
            .applyScaleOnLayout(true)
            .edgeArcDepth(8)
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
            ;

        setTimeout(() => {
            this.downloadPNG();
        }, 3000);
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
            [8, "(561)888-8888", "fa-phone"],
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
        ]
    };
}
