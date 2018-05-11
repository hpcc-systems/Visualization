import { Edge } from "./Edge";
import { Graph, IGraphData } from "./Graph";
import { Vertex } from "./Vertex";

export class AdjacencyGraph extends Graph {
    private _vertexMap: { [key: string]: Vertex } = {};
    private _edgeMap: { [key: string]: Edge } = {};

    constructor() {
        super();
    }

    private _prevAdjacencyData: string;
    private _adjacencyData: object[] = [];

    data(): IGraphData;
    data(_: IGraphData, merge?: boolean): this;
    data(_?: IGraphData | object[], merge?: boolean): IGraphData | object[] | this {
        if (!arguments.length) return this._adjacencyData;
        if (_ instanceof Array) {
            const prevAdjacencyData = JSON.stringify(_);    //  TODO:  Should not be needed
            if (this._prevAdjacencyData !== prevAdjacencyData) {
                this._prevAdjacencyData = prevAdjacencyData;
                this._adjacencyData = _;
                let uidCol: number;
                let labelCol: number;
                let iconCol: number;
                let linkCol: number;
                const annotationCols: number[] = [];
                let idx = 0;
                for (const col of this.columns()) {
                    switch (col) {
                        case "uid":
                            uidCol = idx;
                            break;
                        case "label":
                            labelCol = idx;
                            break;
                        case "icon":
                            iconCol = idx;
                            break;
                        case "links":
                            linkCol = idx;
                            break;
                        default:
                            if (col.indexOf("annotation_") === 0) {
                                annotationCols.push(idx);
                            }
                    }
                    ++idx;
                }
                let graphData: IGraphData;
                const vertexMap: { [key: string]: Vertex } = {};
                const edgeMap: { [key: string]: Edge } = {};
                graphData = {
                    vertices: _.map(row => {
                        let retVal = vertexMap[row[uidCol]] || this._vertexMap[row[uidCol]];
                        if (!retVal) {
                            retVal = new Vertex();

                            //  Icon  ---
                            for (const key in row[iconCol]) {
                                if (typeof retVal[key] === "function") {
                                    retVal[key](row[iconCol][key]);
                                }
                            }

                            //  Annotations ---
                            const annotations = [];
                            for (const annCol of annotationCols) {
                                const annotation = row[annCol];
                                if (annotation.faChar) {
                                    annotation.faChar = annotation.faChar;
                                    annotations.push(annotation);
                                }
                            }

                            retVal
                                .text(row[labelCol])
                                .data(row)
                                .annotationIcons(annotations)
                                ;
                        }
                        vertexMap[row[uidCol]] = retVal;
                        return retVal;
                    }),
                    edges: []
                };
                for (const row of _) {
                    for (const childRow of row[linkCol]) {
                        const edgeID = `${row[uidCol]}->${childRow[uidCol]}`;
                        let retVal = edgeMap[edgeID] || this._edgeMap[edgeID];
                        if (!retVal) {
                            if (vertexMap[row[uidCol]] && vertexMap[childRow[uidCol]]) {
                                retVal = new Edge()
                                    .sourceVertex(vertexMap[row[uidCol]])
                                    .targetVertex(vertexMap[childRow[uidCol]])
                                    .data(childRow)
                                    ;
                                edgeMap[edgeID] = retVal;
                            } else {
                                console.log("Missing vertices for edge:  " + edgeID);
                            }
                        }
                        if (retVal) {
                            graphData.edges.push(retVal);
                        }
                    }
                }
                this._vertexMap = vertexMap;
                this._edgeMap = edgeMap;
                return super.data(graphData, merge);
            }
            return this;
        }
        throw new Error("Invalid data shape.");
    }

    click(row, col, sel) {
        console.log("click");
    }
}
AdjacencyGraph.prototype._class += " graph_AdjacencyGraph";
