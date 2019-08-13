import { Widget } from "@hpcc-js/common";
import { Edge, IGraphData, Lineage, Subgraph, Vertex } from "@hpcc-js/graph";
import { Activity } from "./activities/activity";
import { Databomb } from "./activities/databomb";
import { DSPicker } from "./activities/dspicker";
import { Form } from "./activities/form";
import { LogicalFile } from "./activities/logicalfile";
import { RoxieResult, RoxieResultRef } from "./activities/roxie";
import { WUResult } from "./activities/wuresult";
import { Element, ElementContainer, State } from "./model/element";
import { Visualization } from "./model/visualization";
import { VizChartPanel } from "./model/vizChartPanel";

export interface VertexData {
    view?: Element;
    activity?: Activity;
    visualization?: Visualization;
    chartPanel?: VizChartPanel;
    state?: State;
}

export class GraphAdapter {
    private subgraphMap: { [key: string]: Subgraph } = {};
    private vertexMap: { [key: string]: Vertex } = {};
    private edgeMap: { [key: string]: Edge } = {};
    private hierarchy: Lineage[] = [];
    private vertices: Widget[] = [];
    private edges: Edge[] = [];

    constructor(private _ec: ElementContainer) {
    }

    clear() {
        this.subgraphMap = {};
        this.vertexMap = {};
        this.edgeMap = {};

        this.hierarchy = [];
        this.vertices = [];
        this.edges = [];
    }

    createSubgraph(id: string, label: string, data?: VertexData): Subgraph {
        let retVal: Subgraph = this.subgraphMap[id];
        if (!retVal) {
            retVal = new Subgraph()
                // .classed({ subgraph: true })
                // .showIcon(false)
                .columns(["DS"])
                .data([[data]])
                ;
            this.subgraphMap[id] = retVal;
        }
        this.vertices.push(retVal);
        retVal.title(`${label}`);
        retVal.getBBox(true);
        return retVal;
    }

    createVertex(id: string, label: string, data?: VertexData, tooltip: string = "", fillColor: string = "#dcf1ff"): Vertex {
        let retVal: Vertex = this.vertexMap[id];
        if (!retVal) {
            retVal = new Vertex()
                .columns(["DS"])
                .data([[data]])
                .icon_diameter(0)
                ;
            this.vertexMap[id] = retVal;
        }
        this.vertices.push(retVal);
        retVal
            .textbox_shape_colorFill(fillColor)
            .text(tooltip ? `${label}\n${tooltip}` : `${label}`)
            .tooltip(tooltip)
            ;
        retVal.getBBox(true);
        return retVal;
    }

    createEdge(sourceID: string, targetID: string) {
        const edgeID = `${sourceID}->${targetID}`;
        let retVal = this.edgeMap[edgeID];
        if (!retVal) {
            retVal = new Edge()
                .sourceVertex(this.vertexMap[sourceID])
                .targetVertex(this.vertexMap[targetID])
                ;
            this.edgeMap[edgeID] = retVal;
        }
        this.edges.push(retVal);
        return retVal;
    }

    createDatasource(dsDetails: Activity): string {
        if (dsDetails instanceof DSPicker) {
            dsDetails = dsDetails.selection().datasource();
        }
        if (dsDetails instanceof WUResult) {
            const serverID = `${dsDetails.url()}`;
            const server: Subgraph = this.createSubgraph(serverID, `${serverID}`);
            const wuID = `${dsDetails.url()}/${dsDetails.wuid()}`;
            const wu: Subgraph = this.createSubgraph(wuID, `${dsDetails.wuid()}`);
            this.hierarchy.push({ parent: server, child: wu });
            const resultID = `${wuID}/${dsDetails.resultName()}`;
            const result: Vertex = this.createVertex(resultID, dsDetails.resultName(), { activity: dsDetails });
            this.hierarchy.push({ parent: wu, child: result });
            return resultID;
        } else if (dsDetails instanceof LogicalFile) {
            const serverID = `${dsDetails.url()}`;
            const server: Subgraph = this.createSubgraph(serverID, `${serverID}`);
            const lfID = `${serverID}/${dsDetails.logicalFile()}`;
            const lf: Vertex = this.createVertex(lfID, dsDetails.logicalFile(), { activity: dsDetails });
            this.hierarchy.push({ parent: server, child: lf });
            return lfID;
        } else if (dsDetails instanceof RoxieResultRef) {
            const serverID = `${dsDetails.url()}`;
            const server: Subgraph = this.createSubgraph(serverID, `${serverID}`);
            const surfaceID = dsDetails.roxieServiceID(); // `${dsDetails.url()}/${dsDetails.querySet()}`;
            const surface: Subgraph = this.createSubgraph(surfaceID, dsDetails.querySet());
            this.hierarchy.push({ parent: server, child: surface });
            const roxieID = surfaceID;
            this.hierarchy.push({
                parent: surface,
                child: this.createVertex(roxieID, dsDetails.queryID())
            });
            const roxieResultID = `${surfaceID}/${dsDetails.resultName()}`;
            this.hierarchy.push({
                parent: surface,
                child: this.createVertex(roxieResultID, dsDetails.resultName(), { activity: dsDetails })
            });
            this.createEdge(roxieID, roxieResultID);
            return roxieResultID;
        } else if (dsDetails instanceof RoxieResult) {
            const serverID = `${dsDetails.service().url()}`;
            const server: Subgraph = this.createSubgraph(serverID, `${serverID}`);
            const querySetID = dsDetails.roxieServiceID();
            const querySet: Subgraph = this.createSubgraph(querySetID, dsDetails.service().querySet());
            this.hierarchy.push({ parent: server, child: querySet });
            const queryID = `${querySetID}/${dsDetails.service().queryID()}`;
            const query: Subgraph = this.createSubgraph(queryID, dsDetails.service().queryID());
            this.hierarchy.push({ parent: querySet, child: query });
            const resultID = `${queryID}/${dsDetails.resultName()}`;
            this.hierarchy.push({
                parent: query,
                child: this.createVertex(resultID, dsDetails.resultName(), { activity: dsDetails })
            });
            this.createEdge(queryID, resultID);
            return resultID;
        } else if (dsDetails instanceof Form) {
            const id = dsDetails.hash();
            this.createVertex(id, dsDetails.label(), { activity: dsDetails });
            return id;
        } else if (dsDetails instanceof Databomb) {
            const id = dsDetails.id();
            this.createVertex(id, dsDetails.label(), { activity: dsDetails });
            return id;
        } else {
            const id = dsDetails.hash();
            this.createVertex(id, dsDetails.label(), { activity: dsDetails });
            return id;
        }
    }

    createActivity(sourceID: string, view: Element, activity: Activity, label?: string): string {
        const surface: Subgraph = this.createSubgraph(view.id(), `${view.id()}`, { view });
        let fillColor = null;
        let tooltip = "";
        if (activity.exists()) {
            const errors = activity.validate();
            if (errors.length) {
                fillColor = "pink";
                tooltip = errors.map(error => `${error.source}:  ${error.msg}`).join("\n");
            }
        } else {
            fillColor = "lightgrey";
        }
        const vertex: Vertex = this.createVertex(activity.id(), label || `${activity.classID()}`, { view, activity }, tooltip, fillColor);
        if (sourceID) {
            this.createEdge(sourceID, activity.id());
        }
        this.hierarchy.push({ parent: surface, child: vertex });
        return activity.id();
    }

    createGraph(): IGraphData {
        this.hierarchy = [];
        this.vertices = [];
        this.edges = [];

        this._ec.elements().forEach(e => {
            this.createDatasource(e.hipiePipeline().datasource());
        });

        const lastID: { [key: string]: string } = {};
        for (const view of this._ec.elements()) {
            const pipeline = view.hipiePipeline();
            let prevID = this.createDatasource(pipeline.datasource());
            for (const activity of pipeline.activities()) {
                prevID = this.createActivity(prevID, view, activity);
            }
            const visualization = view.visualization();
            const mappings = visualization.mappings();
            const mappingVertexID = this.createActivity(prevID, view, mappings, "Mappings");
            const vizSubgraphID = `${visualization.id()}-sg`;
            const surface: Subgraph = this.createSubgraph(vizSubgraphID, "Visualization", { visualization });
            this.hierarchy.push({
                parent: this.subgraphMap[view.id()],
                child: surface
            });
            this.hierarchy.push({
                parent: surface,
                child: this.vertexMap[mappings.id()]
            });
            const vizVertexID = `${visualization.id()}-viz`;
            const widgetVertex: Vertex = this.createVertex(vizVertexID, visualization.chartPanel().widget().classID(), { view, chartPanel: visualization.chartPanel() });
            this.createEdge(mappingVertexID, vizVertexID);
            this.hierarchy.push({
                parent: surface,
                child: widgetVertex
            });
            const stateVertexID = `${visualization.id()}-state`;
            const stateVertex: Vertex = this.createVertex(stateVertexID, "Selection", { view, state: view.state() });
            this.createEdge(vizVertexID, stateVertexID)
                .weight(10)
                .strokeDasharray("1,5")
                .text("updates")
                ;
            this.createEdge(prevID, stateVertexID);
            this.hierarchy.push({
                parent: this.subgraphMap[view.id()],
                child: stateVertex
            });
            prevID = stateVertexID;
            lastID[pipeline.id()] = prevID;
        }

        for (const viz of this._ec.elements()) {
            const view = viz.hipiePipeline();
            for (const updateInfo of view.updatedByGraph()) {
                this.createEdge(lastID[this._ec.element(updateInfo.from).hipiePipeline().id()], updateInfo.to.id())
                    .weight(10)
                    .strokeDasharray("1,5")
                    .text("updates")
                    ;
            }
        }

        return {
            vertices: this.vertices,
            edges: this.edges,
            hierarchy: this.hierarchy
        };
    }
}
