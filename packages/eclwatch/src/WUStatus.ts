import { Workunit, WUStateID } from "@hpcc-js/comms";
import { Edge, Graph, Vertex } from "@hpcc-js/graph";
import { hashSum, IObserverHandle } from "@hpcc-js/util";

export class WUStatus extends Graph {

    protected _wu: Workunit;
    protected _wuHandle: IObserverHandle;

    private created: Vertex;
    private compiled: Vertex;
    private executed: Vertex;
    private complete: Vertex;

    constructor() {
        super();
        this
            .zoomable(false)
            .zoomToFitLimit(1)
            .layout("Hierarchy")
            .hierarchyRankDirection("LR")
            .showToolbar(false)
            .allowDragging(false)
            ;
    }

    private _prevHash;
    attachWorkunit() {
        const hash = hashSum({
            baseUrl: this.baseUrl(),
            wuid: this.wuid()
        });
        if (this._prevHash !== hash) {
            this._prevHash = hash;
            this._wu = Workunit.attach({ baseUrl: this.baseUrl() }, this.wuid());
            if (this._wuHandle) {
                this._wuHandle.release();
            }
            this._wuHandle = this._wu.watch(changes => {
                this.lazyRender();
            });
        }
    }

    createVertex(faChar: string, text: string) {
        return new Vertex()
            .icon_diameter(32)
            .icon_shape_colorFill("none")
            .icon_shape_colorStroke("none")
            .icon_image_colorFill("darkgray")
            .iconAnchor("middle")
            .textbox_shape_colorFill("none")
            .textbox_shape_colorStroke("none")
            .textbox_text_colorFill("darkgray")
            .faChar(faChar)
            .text(text)
            ;
    }

    updateVertex(vertex: Vertex, color: string) {
        vertex
            .icon_image_colorFill(color)
            .textbox_text_colorFill(color)
            ;
    }

    updateVertexStatus(level: 0 | 1 | 2 | 3 | 4, active: boolean = false) {
        const completeColor = this._wu.isFailed() ? "darkred" : "darkgreen";
        switch (level) {
            case 0:
                this.updateVertex(this.created, "darkgray");
                this.updateVertex(this.compiled, "darkgray");
                this.updateVertex(this.executed, "darkgray");
                this.updateVertex(this.complete, "darkgray");
                break;
            case 1:
                this.updateVertex(this.created, active ? "orange" : completeColor);
                this.updateVertex(this.compiled, "darkgray");
                this.updateVertex(this.executed, "darkgray");
                this.updateVertex(this.complete, "darkgray");
                break;
            case 2:
                this.updateVertex(this.created, completeColor);
                this.updateVertex(this.compiled, active ? "orange" : completeColor);
                this.updateVertex(this.executed, completeColor);
                this.updateVertex(this.complete, "darkgray");
                break;
            case 3:
                this.updateVertex(this.created, completeColor);
                this.updateVertex(this.compiled, completeColor);
                this.updateVertex(this.executed, active ? "orange" : completeColor);
                this.updateVertex(this.complete, "darkgray");
            case 4:
                this.updateVertex(this.created, completeColor);
                this.updateVertex(this.compiled, completeColor);
                this.updateVertex(this.executed, completeColor);
                this.updateVertex(this.complete, completeColor);
                break;
        }

    }

    createEdge(source, target) {
        return new Edge()
            .sourceVertex(source)
            .targetVertex(target)
            .strokeColor("black")
            .showArc(false)
            ;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this.created = this.createVertex("\uf11d", "Created");
        this.compiled = this.createVertex("\uf085", "Compiled");
        this.executed = this.createVertex("\uf275", "Executed");
        this.complete = this.createVertex("\uf11e", "Completed");
        const e1 = this.createEdge(this.created, this.compiled);
        const e2 = this.createEdge(this.compiled, this.executed);
        const e3 = this.createEdge(this.executed, this.complete);
        this.data({
            vertices: [this.created, this.compiled, this.executed, this.complete],
            edges: [e1, e2, e3]
        });
    }

    update(domNode, element) {
        this.attachWorkunit();
        switch (this._wu.StateID) {
            case WUStateID.Blocked:
            case WUStateID.Wait:
            case WUStateID.Scheduled:
            case WUStateID.UploadingFiled:
                this.updateVertexStatus(1);
                break;
            case WUStateID.Compiling:
                this.updateVertexStatus(2, true);
                break;
            case WUStateID.Submitted:
                this.updateVertexStatus(1, true);
                break;
            case WUStateID.Compiled:
                this.updateVertexStatus(2);
                break;
            case WUStateID.Aborting:
            case WUStateID.Running:
                this.updateVertexStatus(3, true);
                break;
            case WUStateID.Aborted:
            case WUStateID.Archived:
            case WUStateID.Completed:
                this.updateVertexStatus(4);
                break;
            case WUStateID.Failed:
                this.updateVertexStatus(4, false);
                break;
            case WUStateID.DebugPaused:
            case WUStateID.DebugRunning:
            case WUStateID.Paused:
            case WUStateID.Unknown:
            default:
                this.updateVertexStatus(0);
                break;
        }
        super.update(domNode, element);
        this.zoomToFit();
    }

    exit(domNode, element) {
        if (this._wuHandle) {
            this._wuHandle.release();
        }
        super.exit(domNode, element);
    }
}
WUStatus.prototype._class += " eclwatch_WUStatus";

export interface WUStatus {
    baseUrl(): string;
    baseUrl(_: string): this;
    wuid(): string;
    wuid(_: string): this;
}

WUStatus.prototype.publish("baseUrl", "", "string", "HPCC Platform Base URL");
WUStatus.prototype.publish("wuid", "", "string", "Workunit ID");
