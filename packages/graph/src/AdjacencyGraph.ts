import { PropertyExt } from "@hpcc-js/common";
import { hashSum } from "@hpcc-js/util";
import { Edge } from "./Edge";
import { Graph, IGraphData } from "./Graph";
import { IAnnotation, Vertex } from "./Vertex";

interface IAnnotationIndexes {
    iconCol: number;
    iconFillCol: number;
    tooltipCol: number;
    shapeStrokeCol: number;
    shapeFillCol: number;
}

export class Annotation extends PropertyExt {
    protected _owner: AdjacencyGraph;

    owner(): AdjacencyGraph;
    owner(_: AdjacencyGraph): this;
    owner(_?: AdjacencyGraph): AdjacencyGraph | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.iconColumn();
    }

    indexes(): IAnnotationIndexes {
        const columns = this._owner.columns();
        return {
            iconCol: columns.indexOf(this.iconColumn()),
            iconFillCol: columns.indexOf(this.iconFillColumn()),
            tooltipCol: columns.indexOf(this.tooltipColumn()),
            shapeStrokeCol: columns.indexOf(this.shapeStrokeColumn()),
            shapeFillCol: columns.indexOf(this.shapeFillColumn())
        };
    }

    mapper(): (row) => IAnnotation {
        const indexes = this.indexes();
        return (row) => ({
            faChar: row[indexes.iconCol],
            tooltip: row[indexes.tooltipCol],
            shape_colorFill: row[indexes.shapeFillCol] || this.shapeFillDefault(),
            shape_colorStroke: row[indexes.shapeStrokeCol] || this.shapeStrokeDefault(),
            image_colorFill: row[indexes.iconFillCol] || this.iconFillDefault()
        });
    }
}
Annotation.prototype._class += " graph_Annotation";
export interface Annotation {
    iconColumn(): string;
    iconColumn(_: string): this;
    iconFillDefault(): string;
    iconFillDefault(_: string): this;
    iconFillColumn(): string;
    iconFillColumn(_: string): this;
    tooltipColumn(): string;
    tooltipColumn(_: string): this;
    shapeStrokeDefault(): string;
    shapeStrokeDefault(_: string): this;
    shapeStrokeColumn(): string;
    shapeStrokeColumn(_: string): this;
    shapeFillDefault(): string;
    shapeFillDefault(_: string): this;
    shapeFillColumn(): string;
    shapeFillColumn(_: string): this;
}
Annotation.prototype.publish("iconColumn", "", "set", "Icon column", function (this: Annotation) { return this._owner.columns(); }, { optional: true });
Annotation.prototype.publish("iconFillDefault", "white", "html-color", "Icon fill default color");
Annotation.prototype.publish("iconFillColumn", "", "set", "Icon fill color column", function (this: Annotation) { return this._owner.columns(); }, { optional: true });
Annotation.prototype.publish("tooltipColumn", "", "set", "Tooltip column", function (this: Annotation) { return this._owner.columns(); }, { optional: true });
Annotation.prototype.publish("shapeStrokeDefault", "darkred", "html-color", "Shape stroke default color");
Annotation.prototype.publish("shapeStrokeColumn", "", "set", "Shape stroke color column", function (this: Annotation) { return this._owner.columns(); }, { optional: true });
Annotation.prototype.publish("shapeFillDefault", "red", "html-color", "Shape fill default color");
Annotation.prototype.publish("shapeFillColumn", "", "set", "Shape fill color column", function (this: Annotation) { return this._owner.columns(); }, { optional: true });

export class AdjacencyGraph extends Graph {

    private _vertexMap: { [key: string]: Vertex } = {};
    private _edgeMap: { [key: string]: Edge } = {};
    private _prevAdjacencyDataHash: string;
    private _merge: boolean = false;
    private _adjacencyData: object[] = [];

    constructor() {
        super();
    }

    linksColumns(): string[] {
        const linksCol: number = this.columns().indexOf(this.linksColumn());
        const linksField = this._db.field(linksCol);
        if (linksField) {
            return linksField.children().map(field => field.label());
        }
        return [];
    }

    validAnnotations() {
        return this.annotations().filter(a => a.valid());
    }

    updateData() {
        const prevAdjacencyDataHash = hashSum([this._adjacencyData, this.uidColumn(), this.labelColumn(), this.iconColumn(), this.linksColumn(), this.linkUidColumn(), this.linkLabelColumn(), this.validAnnotations().map(a => a.hashSum())]);
        if (this._prevAdjacencyDataHash !== prevAdjacencyDataHash) {
            this._prevAdjacencyDataHash = prevAdjacencyDataHash;

            const columns = this.columns();
            const uidCol: number = columns.indexOf(this.uidColumn());
            const labelCol: number = columns.indexOf(this.labelColumn());
            const iconCol: number = columns.indexOf(this.iconColumn());
            const linksCol: number = columns.indexOf(this.linksColumn());

            const linksColumns = this.linksColumns();
            const linksUidCol: number = linksColumns.indexOf(this.linkUidColumn());
            const linksLabelCol: number = linksColumns.indexOf(this.linkLabelColumn());

            const annotationMappers = this.validAnnotations().map(a => a.mapper());

            const vertexMap: { [key: string]: Vertex } = {};
            const edgeMap: { [key: string]: Edge } = {};
            const graphData: IGraphData = {
                vertices: this._adjacencyData.map(row => {
                    const uid = row[uidCol];
                    if (uid !== undefined) {
                        let retVal = vertexMap[uid] || this._vertexMap[uid];
                        if (!retVal) {
                            retVal = new Vertex();
                        }
                        vertexMap[uid] = retVal;

                        retVal
                            .text(row[labelCol])
                            .data(row)
                            .faChar(row[iconCol])
                            .annotationIcons(annotationMappers.map(am => am(row)))
                            ;

                        return retVal;
                    }
                }).filter(v => !!v),
                edges: []
            };
            for (const row of this._adjacencyData) {
                const uid = row[uidCol];
                const links = row[linksCol];
                if (uid !== undefined && links !== undefined) {
                    for (const childRow of links) {
                        const linkUid = childRow[linksUidCol];
                        const linkLabel = childRow[linksLabelCol];
                        const edgeID = `${uid}->${linkUid}`;
                        let retVal = edgeMap[edgeID] || this._edgeMap[edgeID];
                        if (!retVal) {
                            if (vertexMap[uid] && vertexMap[linkUid]) {
                                retVal = new Edge()
                                    .sourceVertex(vertexMap[uid])
                                    .targetVertex(vertexMap[linkUid])
                                    .data(childRow)
                                    ;
                            } else {
                                console.warn("Missing vertices for edge:  " + edgeID);
                            }
                        }
                        if (retVal) {
                            retVal.text(linkLabel);
                            edgeMap[edgeID] = retVal;
                            graphData.edges.push(retVal);
                        }
                    }
                }
            }
            this._vertexMap = vertexMap;
            this._edgeMap = edgeMap;
            super.data(graphData, this._merge);
        }
    }

    data(): IGraphData;
    data(_: IGraphData, merge?: boolean): this;
    data(_?: IGraphData | object[], merge?: boolean): IGraphData | object[] | this {
        if (!arguments.length) return this._adjacencyData;
        if (_ instanceof Array) {
            this._merge = merge;
            this._adjacencyData = _;
            return this;
        }
        throw new Error("Invalid data shape.");
    }

    update(domNode, element) {
        this.updateData();
        super.update(domNode, element);
    }

    click(row, col, sel) {
    }
}
AdjacencyGraph.prototype._class += " graph_AdjacencyGraph";

export interface AdjacencyGraph {
    uidColumn(): string;
    uidColumn(_: string): this;
    labelColumn(): string;
    labelColumn(_: string): this;
    iconColumn(): string;
    iconColumn(_: string): this;
    linksColumn(): string;
    linksColumn(_: string): this;
    linkUidColumn(): string;
    linkUidColumn(_: string): this;
    linkLabelColumn(): string;
    linkLabelColumn(_: string): this;
    annotations(): Annotation[];
    annotations(_: Annotation[]): this;
}
AdjacencyGraph.prototype.publish("uidColumn", "", "set", "UID column", function (this: AdjacencyGraph) { return this.columns(); }, { optional: true });
AdjacencyGraph.prototype.publish("labelColumn", "", "set", "Label column", function (this: AdjacencyGraph) { return this.columns(); }, { optional: true });
AdjacencyGraph.prototype.publish("iconColumn", "", "set", "Icon column", function (this: AdjacencyGraph) { return this.columns(); }, { optional: true });
AdjacencyGraph.prototype.publish("linksColumn", "", "set", "Links column", function (this: AdjacencyGraph) { return this.columns(); }, { optional: true });
AdjacencyGraph.prototype.publish("linkUidColumn", "", "set", "Link UID column", function (this: AdjacencyGraph) { return this.linksColumns(); }, { optional: true });
AdjacencyGraph.prototype.publish("linkLabelColumn", "", "set", "Link Label column", function (this: AdjacencyGraph) { return this.linksColumns(); }, { optional: true });
AdjacencyGraph.prototype.publish("annotations", [], "propertyArray", "Annotations", null, { autoExpand: Annotation });
