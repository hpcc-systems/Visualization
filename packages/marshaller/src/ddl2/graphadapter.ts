import { Surface, Widget } from "@hpcc-js/common";
import { Edge, IGraphData, Lineage, Vertex } from "@hpcc-js/graph";
import { Activity } from "./activities/activity";
import { DSPicker, isDatasource } from "./activities/dspicker";
import { HipiePipeline } from "./activities/hipiepipeline";
import { RoxieRequest } from "./activities/roxie";
import { WUResult } from "./activities/wuresult";
import { Element, ElementContainer } from "./model";

export class GraphAdapter {
    private _elementContainer: ElementContainer;
    private subgraphMap: { [key: string]: Surface } = {};
    private vertexMap: { [key: string]: Vertex } = {};
    private edgeMap: { [key: string]: Edge } = {};
    private hierarchy: Lineage[] = [];
    private vertices: Widget[] = [];
    private edges: Edge[] = [];

    constructor(dashboard: ElementContainer) {
        this._elementContainer = dashboard;
    }

    clear() {
        this.subgraphMap = {};
        this.vertexMap = {};
        this.edgeMap = {};

        this.hierarchy = [];
        this.vertices = [];
        this.edges = [];
    }

    createSurface(id: string, label: string, data: any): Surface {
        let retVal: Surface = this.subgraphMap[id];
        if (!retVal) {
            retVal = new Surface()
                .classed({ subgraph: true })
                .showIcon(false)
                .columns(["DS"])
                .data([[data]])
                ;
            this.subgraphMap[id] = retVal;
            this.vertices.push(retVal);
        }
        retVal.title(`${label}`);
        retVal.getBBox(true);
        return retVal;
    }

    createVertex(id: string, label: string, data: any, tooltip: string = "", fillColor: string = "#dcf1ff"): Vertex {
        let retVal: Vertex = this.vertexMap[id];
        if (!retVal) {
            retVal = new Vertex()
                .columns(["DS"])
                .data([[data]])
                .icon_shape_diameter(0)
                .textbox_shape_colorFill(fillColor)
                .tooltip(tooltip)
                ;
            this.vertexMap[id] = retVal;
            this.vertices.push(retVal);
        }
        // retVal.text(`${label} - ${id}`);
        retVal.text(tooltip ? `${label}\n${tooltip}` : `${label}`);
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
            this.edges.push(retVal);
        }
        return retVal;
    }

    createDatasource(viz: Element, view: HipiePipeline, data: any): string {
        const ds = view.dataSource();
        const dsDetails = ds instanceof DSPicker ? ds.details() : ds;
        if (dsDetails instanceof WUResult) {
            const surfaceID = `${dsDetails.url()}/${dsDetails.wuid()}`;
            const surface: Surface = this.createSurface(surfaceID, `${dsDetails.wuid()}`, { viz, view });

            const id = `${surfaceID}/${dsDetails.resultName()}`;
            const vertex: Vertex = this.createVertex(id, dsDetails.resultName(), data);
            this.hierarchy.push({ parent: surface, child: vertex });
            return id;
        } else if (dsDetails instanceof RoxieRequest) {
            const surfaceID = dsDetails.roxieServiceID(); // `${dsDetails.url()}/${dsDetails.querySet()}`;
            const surface: Surface = this.createSurface(surfaceID, dsDetails.querySet(), { viz, view });
            const roxieID = surfaceID;
            this.hierarchy.push({
                parent: surface,
                child: this.createVertex(roxieID, dsDetails.queryID(), data)
            });
            const roxieResultID = `${surfaceID}/${dsDetails.resultName()}`;
            this.hierarchy.push({
                parent: surface,
                child: this.createVertex(roxieResultID, dsDetails.resultName(), data)
            });
            this.createEdge(roxieID, roxieResultID);
            return roxieResultID;
        } else {
            const id = ds.hash();
            this.createVertex(id, ds.label(), data);
            return id;
        }
    }

    createActivity(sourceID: string, viz: Element, view: HipiePipeline, activity: Activity, label?: string): string {
        const surface: Surface = this.createSurface(view.id(), `${viz.id()}`, { viz, view });
        let fillColor = null;
        let tooltip = "";
        if (activity.exists()) {
            const errors = activity.validate();
            if (errors.length) {
                fillColor = "pink";
                tooltip = errors.map(error => `${error.msg}`).join("\n");
            }
        } else {
            fillColor = "lightgrey";
        }
        const vertex: Vertex = this.createVertex(activity.id(), label || `${activity.classID()}`, { viz, view, activity }, tooltip, fillColor);
        if (sourceID) {
            this.createEdge(sourceID, activity.id());
        }
        this.hierarchy.push({ parent: surface, child: vertex });
        return activity.id();
    }

    createGraph(): IGraphData {
        this.clear();

        const lastID: { [key: string]: string } = {};
        for (const viz of this._elementContainer.elements()) {
            const view = viz.hipiePipeline();
            let prevID = "";
            for (const activity of view.activities()) {
                if (isDatasource(activity)) {
                    prevID = this.createDatasource(viz, view, { viz: undefined, activity });
                } else if (activity === view.mappings()) {
                    this.createActivity(prevID, viz, view, activity, "Mappings");
                    const surface: Surface = this.createSurface(`${view.mappings().id()}`, `Visualization`, { viz, view });
                    this.hierarchy.push({
                        parent: this.subgraphMap[view.id()],
                        child: surface
                    });
                    this.hierarchy.push({
                        parent: surface,
                        child: this.vertexMap[view.mappings().id()]
                    });
                    const vizVertexID = `${activity.id()}-viz`;
                    const widgetVertex: Vertex = this.createVertex(vizVertexID, viz.multiChartPanel().chart().classID(), { viz, view, activity: viz.multiChartPanel() });
                    this.createEdge(activity.id(), vizVertexID);
                    this.hierarchy.push({
                        parent: surface,
                        child: widgetVertex
                    });
                    const stateVertexID = `${activity.id()}-state`;
                    const stateVertex: Vertex = this.createVertex(stateVertexID, "Selection", { viz, view, activity: viz.state() });
                    this.createEdge(vizVertexID, stateVertexID)
                        .weight(10)
                        .strokeDasharray("1,5")
                        .text("updates")
                        ;
                    this.createEdge(prevID, stateVertexID);
                    this.hierarchy.push({
                        parent: surface,
                        child: stateVertex
                    });
                    prevID = stateVertexID;
                } else {
                    prevID = this.createActivity(prevID, viz, view, activity);
                }
            }

            lastID[view.id()] = prevID;
        }

        for (const viz of this._elementContainer.elements()) {
            const view = viz.hipiePipeline();
            for (const updateInfo of view.updatedByGraph()) {
                if (updateInfo.to instanceof DSPicker) {
                    updateInfo.to = updateInfo.to.details();
                }
                this.createEdge(lastID[this._elementContainer.element(updateInfo.from).hipiePipeline().id()], updateInfo.to instanceof RoxieRequest ? `${updateInfo.to.roxieServiceID()}/${updateInfo.to.resultName()}` : updateInfo.to.id())
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
