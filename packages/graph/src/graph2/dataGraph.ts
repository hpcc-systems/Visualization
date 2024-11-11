import { PropertyExt, Widget } from "@hpcc-js/common";
import { Vertex3, CentroidVertex3, Vertex3Props, EdgeProps, SubgraphProps } from "@hpcc-js/react";
import { compare2 } from "@hpcc-js/util";
import { Graph2 } from "./graph.ts";
import { HierarchyBase } from "./layouts/placeholders.ts";

//  Backward compatibility layer  ---
export type IVertex3 = Vertex3Props;

export function toJsonObj<T>(row, columns): T {
    const retVal: T = {} as T;
    columns.forEach((c, i) => retVal[c] = row[i]);
    return retVal;
}

export class AnnotationColumn extends PropertyExt {

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

export interface AnnotationColumn {
    columnID(): string;
    columnID(_: string): this;
    annotationID(): string;
    annotationID(_: string): this;
}

AnnotationColumn.prototype.publish("columnID", "", "set", "Annotation column (boolean)", function (this: AnnotationColumn) { return this._owner.vertexColumns(); });
AnnotationColumn.prototype.publish("annotationID", "", "string", "Annotation ID");

export class DataGraph extends Graph2 {

    constructor() {
        super();
        this
            .vertexRenderer(Vertex3)
            .centroidRenderer(CentroidVertex3)
            .edgeColor("#287EC4")
            .edgeStrokeWidth(2)
            .edgeArcDepth(0)
            ;
    }

    clear() {
        this._prevSubgraphs = [];
        this._masterSubgraphs = [];
        this._masterSubgraphsMap = {};

        this._prevVertices = [];
        this._masterVertices = [];
        this._masterVerticesMap = {};

        this._prevEdges = [];
        this._masterEdges = [];

        this._prevHierarchy = [];
        this._masterHierarchy = [];
        this._masterHierarchyMap = {};

        this._graphData.clear();
        this.resetLayout();
    }

    indexOf(columns: readonly string[], column: string, defColumn: string = ""): number {
        const retVal = columns.indexOf(column);
        return retVal >= 0 ? retVal : columns.indexOf(defColumn);
    }

    private _prevSubgraphs: readonly SubgraphProps[] = [];
    private _masterSubgraphs: SubgraphProps[] = [];
    private _masterSubgraphsMap: { [key: string]: SubgraphProps } = {};
    mergeSubgraphs() {
        const columns = this.subgraphColumns();
        const idIdx = this.indexOf(columns, this.subgraphIDColumn(), "id");
        const labelIdx = this.indexOf(columns, this.subgraphLabelColumn(), "label");
        const subgraphs = this.subgraphs().map((sg): SubgraphProps => {
            return {
                id: "" + sg[idIdx],
                text: "" + sg[labelIdx],
                origData: toJsonObj<SubgraphProps>(sg, columns)
            };
        });
        const diff = compare2(this._prevSubgraphs, subgraphs, d => d.id);
        diff.exit.forEach(item => {
            this._masterSubgraphs = this._masterSubgraphs.filter(i => i.id !== item.id);
            delete this._masterSubgraphsMap[item.id];
        });
        diff.enter.forEach(item => {
            this._masterSubgraphs.push(item);
            this._masterSubgraphsMap[item.id] = item;
        });
        diff.update.forEach(item => {
            this._masterSubgraphsMap[item.id].origData = item.origData;
        });
        this._prevSubgraphs = subgraphs;
    }

    private _prevVertices: readonly IVertex3[] = [];
    private _masterVertices: IVertex3[] = [];
    private _masterVerticesMap: { [key: string]: IVertex3 } = {};
    mergeVertices() {
        const columns = this.vertexColumns();
        const annotationColumns = this.vertexAnnotationColumns();
        const catIdx = this.indexOf(columns, this.vertexCategoryColumn(), "category");
        const idIdx = this.indexOf(columns, this.vertexIDColumn(), "id");
        const labelIdx = this.indexOf(columns, this.vertexLabelColumn(), "label");
        const centroidIdx = this.indexOf(columns, this.vertexCentroidColumn(), "centroid");
        const imageUrlIdx = this.indexOf(columns, this.vertexImageUrlColumn(), "faChar");
        const faCharIdx = this.indexOf(columns, this.vertexFACharColumn(), "faChar");
        const vertexTooltipIdx = this.indexOf(columns, this.vertexTooltipColumn(), "tooltip");
        const annotationIdxs = annotationColumns.map(ac => this.indexOf(columns, ac.columnID(), ""));
        const expansionFACharIdx = this.indexOf(columns, this.vertexExpansionFACharColumn(), "expansionFAChar");
        const vertices: IVertex3[] = this.vertices().map((v): IVertex3 => {
            const annotationIDs = annotationIdxs.map((ai, i) => !!v[ai] ? annotationColumns[i].annotationID() : undefined).filter(a => !!a);
            return {
                categoryID: "" + v[catIdx],
                id: "" + v[idIdx],
                text: "" + v[labelIdx],
                tooltip: "" + v[vertexTooltipIdx],
                origData: toJsonObj(v, columns),
                centroid: !!v[centroidIdx],
                icon: {
                    imageUrl: "" + (v[imageUrlIdx] || this.vertexImageUrl()),
                    imageChar: "" + (v[faCharIdx] || this.vertexFAChar())
                },
                annotationIDs,
                annotations: this.annotations().filter(ann => annotationIDs.indexOf(ann.id) >= 0),
                expansionIcon: v[expansionFACharIdx] ? {
                    imageChar: "" + v[expansionFACharIdx]
                } : undefined
            } as IVertex3;
        });
        const diff = compare2(this._prevVertices, vertices, d => d.id);
        diff.exit.forEach(item => {
            this._masterVertices = this._masterVertices.filter(i => i.id !== item.id);
            delete this._masterVerticesMap[item.id];
        });
        diff.enter.forEach(item => {
            this._masterVertices.push(item);
            this._masterVerticesMap[item.id] = item;
        });
        diff.update.forEach(item => {
            this._masterVerticesMap[item.id].origData = item.origData;
        });
        this._prevVertices = vertices;
    }

    protected _prevEdges: readonly EdgeProps<IVertex3>[] = [];
    protected _masterEdges: EdgeProps<IVertex3>[] = [];
    private _masterEdgesMap: { [key: string]: EdgeProps<IVertex3> } = {};
    mergeEdges() {
        const columns = this.edgeColumns();
        const idIdx = this.indexOf(columns, this.edgeIDColumn(), "id");
        const sourceIdx = this.indexOf(columns, this.edgeSourceColumn(), "source");
        const targetIdx = this.indexOf(columns, this.edgeTargetColumn(), "target");
        const labelIdx = this.indexOf(columns, this.edgeLabelColumn(), "label");
        const weightIdx = this.indexOf(columns, this.edgeWeightColumn(), "weight");
        const colorIdx = this.indexOf(columns, this.edgeColorColumn(), "color");
        const edges: EdgeProps<IVertex3>[] = this.edges().map((e): EdgeProps<IVertex3> => {
            const source = this._masterVerticesMap["" + e[sourceIdx]];
            if (!source) console.error(`Invalid edge source entity "${e[sourceIdx]}" does not exist.`);
            const target = this._masterVerticesMap["" + e[targetIdx]];
            if (!target) console.error(`Invalid edge target entity "${e[targetIdx]}" does not exist.`);
            return {
                id: idIdx >= 0 ? "" + e[idIdx] : "" + e[sourceIdx] + "->" + e[targetIdx],
                source,
                target,
                weight: +e[weightIdx] || 1,
                stroke: e[colorIdx] as string,
                label: labelIdx >= 0 ? ("" + e[labelIdx]) : "",
                origData: toJsonObj(e, columns),
                labelPos: [0, 0],
                path: ""
            };
        }).filter(e => e.source && e.target);
        const diff = compare2(this._masterEdges, edges, d => d.id);
        diff.exit.forEach(item => {
            this._masterEdges = this._masterEdges.filter(i => i.id !== item.id);
            delete this._masterEdgesMap[item.id];
        });
        diff.enter.forEach(item => {
            this._masterEdges.push(item);
            this._masterEdgesMap[item.id] = item;

        });
        diff.update.forEach(item => {
            this._masterEdgesMap[item.id].origData = item.origData;
        });
        this._prevEdges = edges;
    }

    private _prevHierarchy: readonly HierarchyBase<SubgraphProps, IVertex3>[] = [];
    private _masterHierarchy: HierarchyBase<SubgraphProps, IVertex3>[] = [];
    private _masterHierarchyMap: { [key: string]: HierarchyBase<SubgraphProps, IVertex3> } = {};
    mergeHierarchy() {
        const columns = this.hierarchyColumns();
        const parentIDIdx = this.indexOf(columns, this.hierarchyParentIDColumn(), "parentID");
        const childIDIdx = this.indexOf(columns, this.hierarchyChildIDColumn(), "childID");
        const hierarchy: HierarchyBase<SubgraphProps, IVertex3>[] = this.hierarchy().map((h): HierarchyBase<SubgraphProps, IVertex3> => {
            return {
                id: "" + h[parentIDIdx] + "=>" + h[childIDIdx],
                parent: this._masterSubgraphsMap["" + h[parentIDIdx]] as SubgraphProps,
                child: this._masterSubgraphsMap["" + h[childIDIdx]] || this._masterVerticesMap["" + h[childIDIdx]]
            };
        });
        const diff = compare2(this._prevHierarchy, hierarchy, d => d.id);
        diff.exit.forEach(item => {
            this._masterHierarchy = this._masterHierarchy.filter(i => i.id !== item.id);
            delete this._masterHierarchyMap[item.id];
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

export interface DataGraph {
    subgraphColumns(): string[];
    subgraphColumns(_: string[]): this;
    subgraphs(): Array<Array<string | number | boolean>>;
    subgraphs(_: Array<Array<string | number | boolean>>): this;
    subgraphIDColumn(): string;
    subgraphIDColumn(_: string): this;
    subgraphLabelColumn(): string;
    subgraphLabelColumn(_: string): this;

    vertexColumns(): string[];
    vertexColumns(_: string[]): this;
    vertices(): Array<Array<string | number | boolean>>;
    vertices(_: Array<Array<string | number | boolean>>): this;
    vertexCategoryColumn(): string;
    vertexCategoryColumn(_: string): this;
    vertexIDColumn(): string;
    vertexIDColumn(_: string): this;
    vertexLabelColumn(): string;
    vertexLabelColumn(_: string): this;
    vertexCentroidColumn(): string;
    vertexCentroidColumn(_: string): this;
    vertexImageUrl(): string;
    vertexImageUrl(_: string): this;
    vertexImageUrlColumn(): string;
    vertexImageUrlColumn(_: string): this;
    vertexFAChar(): string;
    vertexFAChar(_: string): this;
    vertexFACharColumn(): string;
    vertexFACharColumn(_: string): this;
    vertexTooltipColumn(): string;
    vertexTooltipColumn(_: string): this;
    vertexAnnotationColumns(): AnnotationColumn[];
    vertexAnnotationColumns(_: AnnotationColumn[]): this;
    vertexExpansionFACharColumn(): string;
    vertexExpansionFACharColumn(_: string): this;

    edgeColumns(): string[];
    edgeColumns(_: string[]): this;
    edges(): Array<Array<string | number | boolean>>;
    edges(_: Array<Array<string | number | boolean>>): this;
    edgeIDColumn(): string;
    edgeIDColumn(_: string): this;
    edgeLabelColumn(): string;
    edgeLabelColumn(_: string): this;
    edgeSourceColumn(): string;
    edgeSourceColumn(_: string): this;
    edgeTargetColumn(): string;
    edgeTargetColumn(_: string): this;
    edgeWeightColumn(): string;
    edgeWeightColumn(_: string): this;
    edgeColorColumn(): string;
    edgeColorColumn(_: string): this;

    hierarchyColumns(): string[];
    hierarchyColumns(_: string[]): this;
    hierarchy(): Array<Array<string | number | boolean>>;
    hierarchy(_: Array<Array<string | number | boolean>>): this;
    hierarchyParentIDColumn(): string;
    hierarchyParentIDColumn(_: string): this;
    hierarchyChildIDColumn(): string;
    hierarchyChildIDColumn(_: string): this;
}

DataGraph.prototype.publish("subgraphColumns", [], "any", "Subgraph Columns", null, { internal: true });
DataGraph.prototype.publish("subgraphs", [], "any", "Subgraphs", null, { internal: true });
DataGraph.prototype.publish("subgraphIDColumn", "", "string", "Subgraph ID column");
DataGraph.prototype.publish("subgraphLabelColumn", "", "string", "Subgraph Label column");

DataGraph.prototype.publish("vertexColumns", [], "any", "Vertex Columns", null, { internal: true });
DataGraph.prototype.publish("vertices", [], "any", "Vertices (Nodes)", null, { internal: true });
DataGraph.prototype.publish("vertexCategoryColumn", "", "set", "Vertex Category ID column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true });
DataGraph.prototype.publish("vertexIDColumn", "", "set", "Vertex ID column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true });
DataGraph.prototype.publish("vertexLabelColumn", "", "set", "Vertex label column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true });
DataGraph.prototype.publish("vertexCentroidColumn", "", "set", "Vertex centroid column (boolean)", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true });
DataGraph.prototype.publish("vertexImageUrl", "", "string", "Vertex default image url");
DataGraph.prototype.publish("vertexImageUrlColumn", "", "set", "Vertex image url column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true });
DataGraph.prototype.publish("vertexFAChar", "?", "string", "Vertex default FAChar");
DataGraph.prototype.publish("vertexFACharColumn", "", "set", "Vertex FAChar column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true });
DataGraph.prototype.publish("vertexTooltipColumn", "", "set", "Vertex tooltip column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true });
DataGraph.prototype.publish("vertexAnnotationColumns", [], "propertyArray", "Annotations", null, { autoExpand: AnnotationColumn });
DataGraph.prototype.publish("vertexExpansionFACharColumn", "", "set", "Vertex expansion FAChar column", function (this: DataGraph) { return this.vertexColumns(); }, { optional: true });

DataGraph.prototype.publish("edgeColumns", [], "any", "Edge columns", null, { internal: true });
DataGraph.prototype.publish("edges", [], "any", "Edges (Edges)", null, { internal: true });
DataGraph.prototype.publish("edgeIDColumn", "", "set", "Edge ID column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true });
DataGraph.prototype.publish("edgeLabelColumn", "", "set", "Edge label column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true });
DataGraph.prototype.publish("edgeSourceColumn", "", "set", "Edge source ID column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true });
DataGraph.prototype.publish("edgeTargetColumn", "", "set", "Edge target ID column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true });
DataGraph.prototype.publish("edgeWeightColumn", "", "set", "Edge weight column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true });
DataGraph.prototype.publish("edgeColorColumn", "", "set", "Edge color column", function (this: DataGraph) { return this.edgeColumns(); }, { optional: true });

DataGraph.prototype.publish("hierarchyColumns", [], "any", "Subgraph Columns");
DataGraph.prototype.publish("hierarchy", [], "any", "Subgraphs");
DataGraph.prototype.publish("hierarchyParentIDColumn", "", "string", "Subgraph ID column");
DataGraph.prototype.publish("hierarchyChildIDColumn", "", "string", "Subgraph Label column");
