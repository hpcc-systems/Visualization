import { PropertyExt, publish, Widget } from "@hpcc-js/common";
import { compare2 } from "@hpcc-js/util";
import { Graph2 } from "./graph";
import { IEdge, IVertex } from "./layouts/placeholders";

function toJsonObj(row, columns) {
    const retVal = {};
    columns.forEach((c, i) => retVal[c] = row[i]);
    return retVal;
}

export class AnnotationColumn extends PropertyExt {

    @publish("", "set", "Annotation column (boolean)", function (this: AnnotationColumn) { return this._owner.vertexColumns(); })
    columnID: publish<this, string>;
    @publish("", "string", "Annotation ID")
    annotationID: publish<this, string>;

    protected _owner: DataGraph;
    owner(): DataGraph;
    owner(_: DataGraph): this;
    owner(_?: DataGraph): DataGraph | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.columnID();
    }
}
AnnotationColumn.prototype._class += " graph_AnnotationColumn";

export class DataGraph extends Graph2 {

    @publish([], "any", "Vertex Columns")
    vertexColumns: publish<this, string[]>;
    @publish([], "any", "Vertices (Nodes)")
    vertices: publish<this, Array<Array<string | number | boolean>>>;
    @publish("", "any", "Vertex Category ID column")
    vertexCategoryColumn: publish<this, string>;
    @publish("", "any", "Vertex ID column")
    vertexIDColumn: publish<this, string>;
    @publish("", "any", "Vertex label column")
    vertexLabelColumn: publish<this, string>;
    @publish("", "any", "Vertex centroid column (boolean)")
    vertexCentroidColumn: publish<this, string>;
    @publish("fa-user", "any", "Vertex default FAChar")
    vertexFAChar: publish<this, string>;
    @publish("", "any", "Vertex FAChar column")
    vertexFACharColumn: publish<this, string>;
    @publish([], "propertyArray", "Annotations", null, { autoExpand: AnnotationColumn })
    vertexAnnotationColumns: publish<this, AnnotationColumn[]>;

    @publish([], "any", "Edge columns")
    edgeColumns: publish<this, string[]>;
    @publish([], "any", "Edges (Edges)")
    edges: publish<this, Array<Array<string | number | boolean>>>;
    @publish("", "any", "Edge ID column")
    edgeIDColumn: publish<this, string>;
    @publish("", "any", "Edge label column")
    edgeLabelColumn: publish<this, string>;
    @publish("", "any", "Edge source ID column")
    edgeSourceColumn: publish<this, string>;
    @publish("", "any", "Edge target ID column")
    edgeTargetColumn: publish<this, string>;
    @publish("", "any", "Edge target ID column")
    edgeWeightColumn: publish<this, string>;

    constructor() {
        super();
    }

    indexOf(columns: readonly string[], column: string, defColumn: string = ""): number {
        const retVal = columns.indexOf(column);
        return retVal >= 0 ? retVal : columns.indexOf(defColumn);
    }

    private _prevVertices: readonly IVertex[] = [];
    private _masterVertices: IVertex[] = [];
    private _masterVerticesMap: { [key: string]: IVertex } = {};
    mergeVertices() {
        const columns = this.vertexColumns();
        const annotationColumns = this.vertexAnnotationColumns();
        const catIdx = this.indexOf(columns, this.vertexCategoryColumn(), "category");
        const idIdx = this.indexOf(columns, this.vertexIDColumn(), "id");
        const labelIdx = this.indexOf(columns, this.vertexLabelColumn(), "label");
        const centroidIdx = this.indexOf(columns, this.vertexCentroidColumn(), "centroid");
        const faCharIdx = this.indexOf(columns, this.vertexFACharColumn(), "faChar");
        const annotationIdxs = annotationColumns.map(ac => this.indexOf(columns, ac.columnID(), ""));
        const vertices: IVertex[] = this.vertices().map((v): IVertex => {
            return {
                categoryID: "" + v[catIdx],
                id: "" + v[idIdx],
                text: "" + v[labelIdx],
                origData: toJsonObj(v, columns),
                centroid: !!v[centroidIdx],
                icon: {
                    imageChar: "" + v[faCharIdx] || this.vertexFAChar()
                },
                annotations: annotationIdxs.map((ai, i) => !!v[ai] ? annotationColumns[i].annotationID() : undefined).filter(a => !!a)
            };
        });
        const diff = compare2(this._prevVertices, vertices, d => d.id);
        diff.removed.forEach(item => {
            this._masterVertices = this._masterVertices.filter(i => i.id !== item.id);
        });
        diff.added.forEach(item => {
            this._masterVertices.push(item);
            this._masterVerticesMap[item.id] = item;
        });
        this._prevVertices = vertices;
    }

    protected _prevEdges: readonly IEdge[] = [];
    protected _masterEdges: IEdge[] = [];
    mergeEdges() {
        const columns = this.edgeColumns();
        const idIdx = this.indexOf(columns, this.edgeIDColumn(), "id");
        const sourceIdx = this.indexOf(columns, this.edgeSourceColumn(), "source");
        const targetIdx = this.indexOf(columns, this.edgeTargetColumn(), "target");
        const labelIdx = this.indexOf(columns, this.edgeLabelColumn(), "label");
        const weightIdx = this.indexOf(columns, this.edgeWeightColumn(), "weight");
        const edges: IEdge[] = this.edges().map(e => {
            return {
                id: ("" + e[idIdx]) || ("" + e[sourceIdx] + "->" + e[targetIdx]),
                source: this._masterVerticesMap["" + e[sourceIdx]],
                target: this._masterVerticesMap["" + e[targetIdx]],
                weight: e[weightIdx] || 1,
                label: ("" + e[labelIdx]) || ""
            };
        });
        const diff = compare2(this._masterEdges, edges, d => d.id);
        diff.removed.forEach(item => {
            this._masterEdges = this._masterEdges.filter(i => i.id !== item.id);
        });
        diff.added.forEach(item => {
            this._masterEdges.push(item);
        });
        this._prevEdges = edges;
    }

    update(domNode, element) {
        this.mergeVertices();
        this.mergeEdges();
        this.data({ vertices: this._masterVertices, edges: this._masterEdges });
        super.update(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        console.log("Vertices:  " + this.vertices().length);
        console.log("Edges:  " + this.edges().length);
        const start = performance.now();
        super.render(w => {
            const end = performance.now();
            console.log(end - start);
            if (callback) {
                callback(w);
            }
        });
        return this;
    }
}
DataGraph.prototype._class += " graph_DataGraph";
