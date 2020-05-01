import { PropertyExt, publish, Widget } from "@hpcc-js/common";
import { compare2 } from "@hpcc-js/util";
import { Graph2 } from "./graph";
import { IEdge, IHierarchy, ISubgraph, IVertex } from "./layouts/placeholders";

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

    @publish([], "any", "Subgraph Columns", null, { internal: true })
    subgraphColumns: publish<this, string[]>;
    @publish([], "any", "Subgraphs", null, { internal: true })
    subgraphs: publish<this, Array<Array<string | number | boolean>>>;
    @publish("", "string", "Subgraph ID column")
    subgraphIDColumn: publish<this, string>;
    @publish("", "string", "Subgraph Label column")
    subgraphLabelColumn: publish<this, string>;

    @publish([], "any", "Vertex Columns", null, { internal: true })
    vertexColumns: publish<this, string[]>;
    @publish([], "any", "Vertices (Nodes)", null, { internal: true })
    vertices: publish<this, Array<Array<string | number | boolean>>>;
    @publish("", "set", "Vertex Category ID column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true })
    vertexCategoryColumn: publish<this, string>;
    @publish("", "set", "Vertex ID column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true })
    vertexIDColumn: publish<this, string>;
    @publish("", "set", "Vertex label column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true })
    vertexLabelColumn: publish<this, string>;
    @publish("", "set", "Vertex centroid column (boolean)", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true })
    vertexCentroidColumn: publish<this, string>;
    @publish("fa-user", "string", "Vertex default FAChar")
    vertexFAChar: publish<this, string>;
    @publish("", "set", "Vertex FAChar column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true })
    vertexFACharColumn: publish<this, string>;
    @publish([], "propertyArray", "Annotations", null, { autoExpand: AnnotationColumn })
    vertexAnnotationColumns: publish<this, AnnotationColumn[]>;

    @publish([], "any", "Edge columns", null, { internal: true })
    edgeColumns: publish<this, string[]>;
    @publish([], "any", "Edges (Edges)", null, { internal: true })
    edges: publish<this, Array<Array<string | number | boolean>>>;
    @publish("", "set", "Edge ID column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true })
    edgeIDColumn: publish<this, string>;
    @publish("", "set", "Edge label column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true })
    edgeLabelColumn: publish<this, string>;
    @publish("", "set", "Edge source ID column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true })
    edgeSourceColumn: publish<this, string>;
    @publish("", "set", "Edge target ID column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true })
    edgeTargetColumn: publish<this, string>;
    @publish("", "set", "Edge target ID column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true })
    edgeWeightColumn: publish<this, string>;

    @publish([], "any", "Subgraph Columns")
    hierarchyColumns: publish<this, string[]>;
    @publish([], "any", "Subgraphs")
    hierarchy: publish<this, Array<Array<string | number | boolean>>>;
    @publish("", "string", "Subgraph ID column")
    hierarchyParentIDColumn: publish<this, string>;
    @publish("", "string", "Subgraph Label column")
    hierarchyChildIDColumn: publish<this, string>;

    constructor() {
        super();
    }

    indexOf(columns: readonly string[], column: string, defColumn: string = ""): number {
        const retVal = columns.indexOf(column);
        return retVal >= 0 ? retVal : columns.indexOf(defColumn);
    }

    private _prevSubgraphs: Array<Array<string | number | boolean>> = [];
    private _masterSubgraphs: ISubgraph[] = [];
    private _masterSubgraphsMap: { [key: string]: ISubgraph } = {};
    mergeSubgraphs() {
        const columns = this.subgraphColumns();
        const idIdx = this.indexOf(columns, this.subgraphIDColumn(), "id");
        const labelIdx = this.indexOf(columns, this.subgraphLabelColumn(), "label");
        const subgraphs = this.subgraphs();
        const diff = compare2(this._prevSubgraphs, subgraphs, d => d[idIdx] as string);
        diff.exit.forEach(item => {
            this._masterSubgraphs = this._masterSubgraphs.filter(i => i.id !== item[idIdx]);
        });
        diff.enter.forEach(item => {
            const sg: ISubgraph = {
                id: "" + item[idIdx],
                text: "" + item[labelIdx],
                origData: toJsonObj(item, columns)
            };
            this._masterSubgraphs.push(sg);
            this._masterSubgraphsMap[sg.id] = sg;
        });
        this._prevSubgraphs = subgraphs;
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
        diff.exit.forEach(item => {
            this._masterVertices = this._masterVertices.filter(i => i.id !== item.id);
        });
        diff.enter.forEach(item => {
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
                type: "edge",
                id: idIdx >= 0 ? "" + e[idIdx] : "" + e[sourceIdx] + "->" + e[targetIdx],
                source: this._masterVerticesMap["" + e[sourceIdx]],
                target: this._masterVerticesMap["" + e[targetIdx]],
                weight: +e[weightIdx] || 1,
                label: labelIdx >= 0 ? ("" + e[labelIdx]) : "",
                origData: toJsonObj(e, columns)
            };
        });
        const diff = compare2(this._masterEdges, edges, d => d.id);
        diff.exit.forEach(item => {
            this._masterEdges = this._masterEdges.filter(i => i.id !== item.id);
        });
        diff.enter.forEach(item => {
            this._masterEdges.push(item);
        });
        this._prevEdges = edges;
    }

    private _prevHierarchy: readonly IHierarchy[] = [];
    private _masterHierarchy: IHierarchy[] = [];
    private _masterHierarchyMap: { [key: string]: IHierarchy } = {};
    mergeHierarchy() {
        const columns = this.hierarchyColumns();
        const parentIDIdx = this.indexOf(columns, this.hierarchyParentIDColumn(), "parentID");
        const childIDIdx = this.indexOf(columns, this.hierarchyChildIDColumn(), "childID");
        const hierarchy: IHierarchy[] = this.hierarchy().map((h): IHierarchy => {
            return {
                id: "" + h[parentIDIdx] + "=>" + h[childIDIdx],
                parent: this._masterSubgraphsMap["" + h[parentIDIdx]],
                child: this._masterSubgraphsMap["" + h[childIDIdx]] || this._masterVerticesMap["" + h[childIDIdx]]
            };
        });
        const diff = compare2(this._prevHierarchy, hierarchy, d => d.id);
        diff.exit.forEach(item => {
            this._masterHierarchy = this._masterHierarchy.filter(i => i.id !== item.id);
        });
        diff.enter.forEach(item => {
            this._masterHierarchy.push(item);
            this._masterHierarchyMap[item.id] = item;
        });
        this._prevHierarchy = hierarchy;
    }

    update(domNode, element) {
        this.mergeSubgraphs();
        this.mergeVertices();
        this.mergeEdges();
        this.mergeHierarchy();
        this.data({ subgraphs: this._masterSubgraphs, vertices: this._masterVertices, edges: this._masterEdges, hierarchy: this._masterHierarchy });
        super.update(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        super.render(w => {
            if (callback) {
                callback(w);
            }
        });
        return this;
    }
}
DataGraph.prototype._class += " graph_DataGraph";
