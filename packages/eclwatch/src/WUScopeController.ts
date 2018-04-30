import { Icon } from "@hpcc-js/common";
import { BaseScope, ScopeEdge, ScopeGraph, ScopeSubgraph, ScopeVertex } from "@hpcc-js/comms";
import { Edge, IGraphData, Lineage, Subgraph, Vertex } from "@hpcc-js/graph";
import { Edge as UtilEdge, Subgraph as UtilSubgraph, Vertex as UtilVertex } from "@hpcc-js/util";
import { WUGraphLegendData } from "./WUGraphLegend";

export type VertexType = Vertex | Icon;

export interface MyGraphData {
    subgraphs: Subgraph[];
    vertices: VertexType[];
    edges: Edge[];
    hierarchy: Lineage[];
}

function faCharFactory(kind): string {
    switch (kind) {
        case "2": return "\uf0c7";      //  Disk Write
        case "3": return "\uf15d";      //  sort
        case "5": return "\uf0b0";      //  Filter
        case "6": return "\uf1e0";      //  Split
        case "12": return "\uf039";     //  First N
        case "15": return "\uf126";     //  Lightweight Join
        case "17": return "\uf126";     //  Lookup Join
        case "22": return "\uf1e6";     //  Pipe Output
        case "23": return "\uf078";     //  Funnel
        case "25": return "\uf0ce";     //  Inline Dataset
        case "26": return "\uf074";     //  distribute
        case "29": return "\uf005";     //  Store Internal Result
        case "36": return "\uf128";     //  If
        case "44": return "\uf0c7";     //  write csv
        case "47": return "\uf0c7";     //  write
        case "54": return "\uf013";     //  Workunit Read
        case "56": return "\uf0c7";     //  Spill
        case "59": return "\uf126";     //  Merge
        case "61": return "\uf0c7";     //  write xml
        case "82": return "\uf1c0";     //  Projected Disk Read Spill
        case "88": return "\uf1c0";     //  Projected Disk Read Spill
        case "92": return "\uf129";     //  Limted Index Read
        case "93": return "\uf129";     //  Limted Index Read
        case "99": return "\uf1c0";     //  CSV Read
        case "105": return "\uf1c0";    //  CSV Read

        case "7": return "\uf090";      //  Project
        case "9": return "\uf0e2";      //  Local Iterate
        case "16": return "\uf005";     //  Output Internal
        case "19": return "\uf074";     //  Hash Distribute
        case "21": return "\uf275";     //  Normalize
        case "35": return "\uf0c7";     //  CSV Write
        case "37": return "\uf0c7";     //  Index Write
        case "71": return "\uf1c0";     //  Disk Read Spill
        case "133": return "\uf0ce";    //  Inline Dataset
        case "148": return "\uf0ce";    //  Inline Dataset
        case "168": return "\uf275";    //  Local Denormalize
    }
    return "\uf063";
}

export class WUScopeController {
    private graphDB: ScopeGraph;
    private subgraphsMap: { [id: string]: Subgraph } = {};
    private rSubgraphsMap: { [id: string]: ScopeSubgraph } = {};
    private verticesMap: { [id: string]: VertexType } = {};
    private rVerticesMap: { [id: string]: ScopeVertex } = {};
    private edgesMap: { [id: string]: Edge } = {};
    private rEdgesMap: { [id: string]: ScopeEdge } = {};
    private kindMap: { [id: string]: ScopeVertex[] } = {};

    protected _disabled: { [kind: number]: boolean } = {};

    constructor() {
    }

    clear() {
        this.subgraphsMap = {};
        this.rSubgraphsMap = {};
        this.verticesMap = {};
        this.rVerticesMap = {};
        this.edgesMap = {};
        this.rEdgesMap = {};
    }

    set(masterGraph: ScopeGraph) {
        this.graphDB = masterGraph;
        this.graphGui(this.graphDB);

        this.kindMap = {};
        this.graphDB.walk(item => {
            if (item instanceof UtilSubgraph) {
            } else if (item instanceof UtilVertex) {
                const kind = item._.attr("Kind").RawValue;
                if (!this.kindMap[kind]) {
                    this.kindMap[kind] = [];
                }
                this.kindMap[kind].push(item);
            } else if (item instanceof UtilEdge) {
            }
        });
    }

    disabled(): number[];
    disabled(_: number[]): this;
    disabled(_?: number[]): number[] | this {
        if (!arguments.length) {
            const retVal = [];
            for (const key in this._disabled) {
                if (this._disabled[key]) {
                    retVal.push(key);
                }
            }
            return retVal;
        }
        this._disabled = {};
        _.forEach(kind => this._disabled[kind] = true);
        return this;
    }

    graphGui(graphDB: ScopeGraph): IGraphData {
        const graphGui: MyGraphData = {
            subgraphs: [],
            vertices: [],
            edges: [],
            hierarchy: []
        };

        graphDB.walk((item) => {
            if (item instanceof UtilSubgraph) {
                const subgraph = this.appendSubgraph(item, graphGui.hierarchy, graphGui.subgraphs);
                subgraph.showMinMax(item.vertices.length > 3 || subgraph.minState() !== "normal");
            } else if (item instanceof UtilVertex) {
                this.appendVertex(item, graphGui.hierarchy, graphGui.vertices);
            } else if (item instanceof UtilEdge) {
                this.appendEdge(item, graphGui.edges);
            }
        });

        return graphGui;
    }

    format(labelTpl, obj) {
        let retVal = "";
        let lpos = labelTpl.indexOf("%");
        let rpos = -1;
        while (lpos >= 0) {
            retVal += labelTpl.substring(rpos + 1, lpos);
            rpos = labelTpl.indexOf("%", lpos + 1);
            if (rpos < 0) {
                console.log("Invalid Label Template");
                break;
            }
            const key = labelTpl.substring(lpos + 1, rpos);
            retVal += !key ? "%" : (obj[labelTpl.substring(lpos + 1, rpos)] || "");
            lpos = labelTpl.indexOf("%", rpos + 1);
        }
        retVal += labelTpl.substring(rpos + 1, labelTpl.length);
        return retVal.split("\\n").join("\n");
    }

    createSubgraph(subgraph: ScopeSubgraph): Subgraph {
        let sg = this.subgraphsMap[subgraph._.Id];
        if (!sg) {
            sg = new Subgraph()
                .title(subgraph._.Id)
                .on("minClick", () => {
                    this.minClick(sg);
                })
                ;
            this.subgraphsMap[subgraph._.Id] = sg;
            this.rSubgraphsMap[sg.id()] = subgraph;
        }
        return sg;
    }

    createVertex(vertex: ScopeVertex): VertexType {
        let v = this.verticesMap[vertex._.Id];
        if (!v) {
            const attrs = vertex._.rawAttrs();
            if (vertex._.ScopeType === "dummy") {
                const parent = this.subgraphsMap[vertex.parent._.Id];
                v = new Icon()
                    .shape_colorFill("darkred")
                    .shape_colorStroke("darkred")
                    .image_colorFill("white")
                    .faChar("\uf067")
                    .on("click", () => {
                        parent.minState("normal");
                        this.minClick(parent);
                    })
                    ;
            } else {
                v = new Vertex()
                    .icon_shape_colorFill("#1f77b4")
                    .icon_image_colorFill("white")
                    .faChar(faCharFactory(attrs["Kind"]))
                    .text(attrs["Label"])
                    ;
                const annotations = [];
                if (vertex._.hasAttr("Definition")) {
                    annotations.push({
                        faChar: "\uf036",
                        tooltip: "Definition",
                        shape_colorFill: "lightgray",
                        shape_colorStroke: "lightgray",
                        image_colorFill: "black"
                    });
                }
                if (vertex._.hasAttr("IsInternal")) {
                    annotations.push({
                        faChar: "\uf085",
                        tooltip: "IsInternal",
                        shape_colorFill: "red",
                        shape_colorStroke: "red",
                        image_colorFill: "white"
                    });
                }
                v.annotationIcons(annotations);
            }
            this.verticesMap[vertex._.Id] = v;
            this.rVerticesMap[v.id()] = vertex;
        }
        return v;
    }

    isSpill(edge: ScopeEdge): boolean {
        const sourceKind = edge.source._.attr("Kind").RawValue;
        const targetKind = edge.target._.attr("Kind").RawValue;
        return sourceKind === "2" || targetKind === "71";
    }

    spansSubgraph(edge: ScopeEdge): boolean {
        return edge.source.parent._.Id !== edge.target.parent._.Id;
    }

    createEdge(edge: ScopeEdge): Edge | undefined {
        let e = this.edgesMap[edge._.Id];
        if (!e) {
            const attrs = edge._.rawAttrs();
            const sourceV = this.verticesMap[edge.source._.Id];
            const targetV = this.verticesMap[edge.target._.Id];
            if (sourceV && targetV) {
                const isSpill = this.isSpill(edge);
                const spansSubgraph = this.spansSubgraph(edge);

                const label = this.format("%Label%\n%NumRowsProcessed%", attrs);
                /*  TODO:  Add extra annotations once WUDetails is fixed...
                const numSlaves = parseInt(attrs["NumSlaves"]);
                const numStarts = parseInt(attrs["NumStarts"]);
                const numStops = parseInt(attrs["NumStops"]);
                const started = numStarts > 0;
                const finished = numStops === numSlaves;
                const active = started && !finished;
                */

                let strokeDasharray = null;
                let weight = 100;
                if (attrs["IsDependency"]) {
                    weight = 10;
                    strokeDasharray = "1,5";
                } else if (attrs["_childGraph"]) {
                    strokeDasharray = "5,5";
                } else if (isSpill) {
                    weight = 25;
                    strokeDasharray = "5,5,10,5";
                } else if (spansSubgraph) {
                    weight = 5;
                    strokeDasharray = "5,5";
                }
                e = new Edge()
                    .sourceVertex(sourceV)
                    .targetVertex(targetV)
                    .sourceMarker("circle")
                    .targetMarker("arrow")
                    .weight(weight)
                    .strokeDasharray(strokeDasharray)
                    .text(label)
                    ;
                this.edgesMap[edge._.Id] = e;
                this.rEdgesMap[e.id()] = edge;
            }
        }
        return e;
    }

    appendSubgraph(subgraph: ScopeSubgraph, hierarchy: Lineage[], subgraphs: Subgraph[]): Subgraph {
        const sg = this.createSubgraph(subgraph);
        subgraphs.push(sg);
        const parent = this.subgraphsMap[subgraph.parent._.Id];
        if (parent) {
            hierarchy.push({ parent, child: sg });
        }
        return sg;
    }

    appendVertex(vertex: ScopeVertex, hierarchy: Lineage[], vertices: VertexType[]): VertexType {
        const v = this.createVertex(vertex);
        vertices.push(v);
        const parent = this.subgraphsMap[vertex.parent._.Id];
        if (parent) {
            hierarchy.push({ parent, child: v });
        }
        return v;
    }

    appendEdge(edge: ScopeEdge, edges: Edge[]): Edge {
        const e = this.createEdge(edge);
        if (e) {
            edges.push(e);
        }
        return e;
    }

    filterLegend(graphDB: ScopeGraph) {
        for (let i = graphDB.vertices.length - 1; i >= 0; --i) {
            const vertex = graphDB.vertices[i];
            const kind = vertex._.attr("Kind").RawValue;
            if (this._disabled[kind]) {
                vertex.remove(false, (source: BaseScope, target: BaseScope) => {
                    return new BaseScope({
                        ScopeName: vertex._.ScopeName + ":in",
                        Id: source.Id + "->" + target.Id,
                        ScopeType: "dummy-edge",
                        Properties: {
                            Property: [vertex._.attr("Label")]
                        }
                    });
                });
            }
        }
    }

    filterPartial(graphDB: ScopeGraph) {
        for (const subgraph of graphDB.subgraphs) {
            const sg = this.subgraphsMap[subgraph._.Id];
            switch (sg.minState()) {
                case "partial":
                    const childVertices: ReadonlyArray<ScopeVertex> = subgraph.vertices;
                    const vShow: ScopeVertex[] = [];
                    const vHide: ScopeVertex[] = [];

                    for (const vertex of childVertices) {
                        if (vertex.inEdges.length === 0 || vertex.inEdges.some(edge => edge.source.parent !== edge.target.parent) ||
                            vertex.outEdges.length === 0 || vertex.outEdges.some(edge => edge.source.parent !== edge.target.parent)) {
                            vShow.push(vertex);
                        } else {
                            vHide.push(vertex);
                        }
                    }

                    if (vHide.length > 1) {
                        const dummyDetails = {
                            ScopeName: subgraph._.ScopeName,
                            Id: subgraph._.Id + ":dummy",
                            ScopeType: "dummy",
                            Properties: {
                                Property: [{
                                    Name: "Activities",
                                    RawValue: "" + vHide.length,
                                    Formatted: "" + vHide.length,
                                    Measure: "count",
                                    Creator: "",
                                    CreatorType: ""
                                }]
                            }
                        };
                        const dummyScope = new BaseScope(dummyDetails);
                        const dummyVertex = subgraph.createVertex(dummyScope);

                        for (const vertex of vHide) {
                            for (const edge of vertex.inEdges) {
                                if (vShow.indexOf(edge.source) >= 0) {
                                    const dummyEdgeScope = new BaseScope({
                                        ScopeName: edge.source._.ScopeName,
                                        Id: edge.source._.Id + "->" + dummyVertex._.Id,
                                        ScopeType: "dummy-in",
                                        Properties: {
                                            Property: []
                                        }
                                    });
                                    console.log(dummyEdgeScope.Id);
                                    subgraph.createEdge(edge.source, dummyVertex, dummyEdgeScope);
                                }
                            }
                            for (const edge of vertex.outEdges) {
                                if (vShow.indexOf(edge.target) >= 0) {
                                    const dummyEdgeScope = new BaseScope({
                                        ScopeName: edge.target._.ScopeName,
                                        Id: dummyVertex._.Id + "->" + edge.target._.Id,
                                        ScopeType: "dummy-out",
                                        Properties: {
                                            Property: []
                                        }
                                    });
                                    console.log(dummyEdgeScope.Id);
                                    subgraph.createEdge(dummyVertex, edge.target, dummyEdgeScope);
                                }
                            }
                        }
                        vHide.forEach(vertex => vertex.remove(true));
                    }
                    break;
            }
        }
    }

    filterEmptySubgraphs(graphDB: ScopeGraph) {
        while (true) {
            const emptySubgraphs = graphDB.subgraphs.filter(subgraph => subgraph.subgraphs.length === 0 && subgraph.vertices.length === 0);
            if (emptySubgraphs.length === 0) break;
            emptySubgraphs.forEach(subgraph => subgraph.remove(true));
        }
    }

    removeObsoleteSubgraphs(graphDB: ScopeGraph) {
        for (const subgraph of [...graphDB.subgraphs]) {
            if (subgraph.vertices.length === 0) {
                subgraph.remove(false);
            }
        }
    }

    graphData(): IGraphData {
        const graphDB = this.graphDB.clone();
        this.filterLegend(graphDB);
        this.filterPartial(graphDB);
        this.filterEmptySubgraphs(graphDB);
        this.removeObsoleteSubgraphs(graphDB);
        return this.graphGui(graphDB);
    }

    calcLegend(): WUGraphLegendData[] {
        const retVal: WUGraphLegendData[] = [];
        for (const kind in this.kindMap) {
            retVal.push({
                kind: parseInt(kind),
                faChar: faCharFactory(kind),
                label: this.kindMap[kind][0]._.attr("Label").RawValue.split("\n")[0],
                count: this.kindMap[kind].length
            });
        }
        return retVal;
    }

    vertices(kind: number): VertexType[] {
        const retVal: VertexType[] = [];
        for (const v of this.kindMap[kind]) {
            retVal.push(this.verticesMap[v._.Id]);
        }
        return retVal;
    }

    formatRow(item: ScopeEdge | ScopeSubgraph | ScopeVertex, columns, row) {
        const attrs = item._.formattedAttrs();
        for (const key in attrs) {
            const idx = columns.indexOf(key);
            if (idx === -1) {
                columns.push(key);
                row.push(attrs[key]);
            } else {
                row[idx] = attrs[key];
            }
        }
        for (let i = 0; i < 100; ++i) {
            if (row[i] === undefined) {
                row[i] = "";
            }
        }
        return row;
    }

    activityData(): { columns: string[], data: any[][] } {
        const columns = ["Id", "Kind", "Label"];
        const data = this.graphDB.vertices.map(v => {
            const row = [parseInt(v._.Id.split("a")[1])];
            return this.formatRow(v, columns, row);
        });
        return { columns, data };
    }

    edgeData(): { columns: string[], data: any[][] } {
        const columns = ["Id", "Label"];
        const data = this.graphDB.edges.map(e => {
            const row = [e._.Id];
            return this.formatRow(e, columns, row);
        });
        return { columns, data };
    }

    subgraphData(): { columns: string[], data: any[][] } {
        const columns = ["Id", "Label"];
        const data = this.graphDB.subgraphs.map(sg => {
            const row = [sg._.Id];
            return this.formatRow(sg, columns, row);
        });
        return { columns, data };
    }

    calcTooltip(scope: BaseScope, parentScope?: BaseScope) {
        let label = "";
        const rows = [];
        label = scope.Id;
        rows.push(`<tr><td class="key">ID:</td><td class="value">${scope.Id}</td></tr>`);
        if (parentScope) {
            rows.push(`<tr><td class="key">Parent ID:</td><td class="value">${parentScope.Id}</td></tr>`);
        }
        rows.push(`<tr><td class="key">Scope:</td><td class="value">${scope.ScopeName}</td></tr>`);
        const attrs = scope.formattedAttrs();
        for (const key in attrs) {
            if (key === "Label") {
                label = attrs[key];
            } else {
                rows.push(`<tr><td class="key">${key}</td><td class="value">${attrs[key]}</td></tr>`);
            }
        }

        return `<div class="eclwatch_WUGraph_Tooltip" style="max-width:480px">
            <h4 align="center">${label}</h4>
            <table>
                ${rows.join("")}
            </table>
        </div>`;
    }

    calcGraphTooltip(item: VertexType | Edge) {
        let scope;
        let parentScope;
        if (item instanceof Subgraph) {
            const subgraph = this.rSubgraphsMap[item.id()];
            scope = subgraph._;
            parentScope = subgraph.parent._;
        } else if (item instanceof Vertex || item instanceof Icon) {
            const vertex = this.rVerticesMap[item.id()];
            scope = vertex._;
            parentScope = vertex.parent._;
        } else if (item instanceof Edge) {
            const edge = this.rEdgesMap[item.id()];
            scope = edge._;
            parentScope = edge.parent._;
        }
        if (scope) {
            return this.calcTooltip(scope, parentScope);
        }
        return "";
    }

    //  Events  ---
    minClick(sg: Subgraph) {
    }
}
