import { d3Event, SVGZoomWidget } from "@hpcc-js/common";
import { Store } from "./Store.ts";
import type { Node, Edge, Cluster, Graph } from "./types.ts";
import { DotWriter } from "./DotWriter.ts";
import { layoutCache, isGraphvizWorkerResponse } from "./layout.ts";

import "./Widget.css";

class Rect {

    left: number;
    top: number;
    right: number;
    bottom: number;

    toStruct() {
        return { x: this.left, y: this.top, width: this.right - this.left, height: this.bottom - this.top };
    }

    extend(rect: SVGRect) {
        if (this.left === undefined || this.left > rect.x) {
            this.left = rect.x;
        }
        if (this.top === undefined || this.top > rect.y + rect.height) {
            this.top = rect.y + rect.height;
        }
        if (this.right === undefined || this.right < rect.x + rect.width) {
            this.right = rect.x + rect.width;
        }
        if (this.bottom === undefined || this.bottom < rect.y) {
            this.bottom = rect.y;
        }
    }
}

export interface Data {
    graph?: Graph;
    subgraphs?: Cluster[];
    vertices: Node[];
    edges: Edge[];
}

export class Widget extends SVGZoomWidget {

    protected _data: Store = new Store();
    protected _selection: { [id: string]: boolean } = {};

    constructor() {
        super();
        this._drawStartPos = "origin";
        this.showToolbar(false);

        this._iconBar
            .buttons([])
            ;
    }

    data(): Data;
    data(_: Data): this;
    data(_?: Data): this | Data {
        if (!arguments.length) return {
            graph: this._data.graph(),
            subgraphs: this._data.subgraphs(),
            vertices: this._data.vertices(),
            edges: this._data.edges(),
        };
        this._data.load(_.vertices, _.edges, _.subgraphs, _.graph);
        return this;
    }

    exists(id: string) {
        return id && !this._renderElement.select(`#${id}`).empty();
    }

    clearSelection(broadcast: boolean = false) {
        this._selection = {};
        this._selectionChanged(broadcast);
    }

    toggleSelection(id: string, broadcast: boolean = false) {
        if (this._selection[id]) {
            delete this._selection[id];
        } else {
            this._selection[id] = true;
        }
        this._selectionChanged(broadcast);
    }

    selectionCompare(_: string[]): boolean {
        const currSelection = this.selection();
        return currSelection.length !== _.length || _.some(id => currSelection.indexOf(id) < 0);
    }

    selection(): string[];
    selection(_: string[]): this;
    selection(_: string[], broadcast: boolean): this;
    selection(_?: string[], broadcast: boolean = false): string[] | this {
        if (!arguments.length) return Object.keys(this._selection);
        if (this.selectionCompare(_)) {
            this.clearSelection();
            _.forEach(id => this._selection[id] = true);
            this._selectionChanged(broadcast);
        }
        return this;
    }

    setClass(className: string, ids?: string[]): this {
        if (ids) {
            for (const id of ids) {
                const elem = this._renderElement.select(`#${id}`);
                if (!elem.empty()) {
                    elem.classed(className, true);
                }
            }
        } else {
            this._renderElement
                .selectAll(".node,.edge,.cluster")
                .classed(className, true)
                ;
        }
        return this;
    }

    clearClass(className: string, ids?: string[]): this {
        if (ids) {
            for (const id of ids) {
                const elem = this._renderElement.select(`#${id}`);
                if (!elem.empty()) {
                    elem.classed(className, false);
                }
            }
        } else {
            this._renderElement
                .selectAll(".node,.edge,.cluster")
                .classed(className, false)
                ;
        }
        return this;
    }

    hasClass(className: string, id: string): boolean {
        const elem = this._renderElement.select(`#${id}`);
        return !elem.empty() && elem.classed(className);
    }

    itemBBox(scopeID: string) {
        const rect = new Rect();
        const elem = this._renderElement.select(`#${scopeID}`);
        const node = elem.node() as SVGGraphicsElement;
        if (node) {
            rect.extend(node.getBBox());
        }

        const bbox = rect.toStruct();
        const renderBBox = this._renderElement.node().getBBox();
        bbox.y += renderBBox.height;
        return bbox;
    }

    selectionBBox() {
        const rect = new Rect();
        this.selection().filter(sel => !!sel).forEach(sel => {
            const elem = this._renderElement.select(`#${sel}`);
            if (elem?.node()) {
                rect.extend((elem.node() as SVGGraphicsElement).getBBox());
            }
        });
        const bbox = rect.toStruct();
        const renderBBox = this._renderElement.node().getBBox();
        bbox.y += renderBBox.height;
        return bbox;
    }

    _selectionChanged(broadcast = false) {
        const context = this;
        this._renderElement.selectAll(".node,.edge,.cluster")
            .classed("selected", function (this: SVGElement) {
                return !!context._selection[this.id];
            })
            ;
        if (broadcast) {
            this.selectionChanged();
        }
    }

    protected _prevDOT;
    protected _svg = "";
    reset() {
        this._prevDOT = "";
        return this;
    }

    centerOnItem(scopeID: string) {
        this.centerOnBBox(this.itemBBox(scopeID));
        return this;
    }

    centerOnSelection(transitionDuration?: number) {
        this.centerOnBBox(this.selectionBBox(), transitionDuration);
        return this;
    }

    zoomToItem(scopeID: string) {
        this.zoomToBBox(this.itemBBox(scopeID));
        return this;
    }

    zoomToSelection(transitionDuration?: number) {
        this.zoomToBBox(this.selectionBBox(), transitionDuration);
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        const context = this;
        this._renderElement
            .on("click", function () {
                const event = d3Event();
                let target = event.target as SVGElement;
                while (target && target !== event.currentTarget) {
                    if (target.classList.contains("node") || target.classList.contains("edge") || target.classList.contains("cluster")) {
                        if (!event.ctrlKey) {
                            context.clearSelection();
                        }
                        context.toggleSelection(target.id, true);
                        return;
                    }
                    target = target.parentElement as unknown as SVGElement;
                }
            })
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    private static readonly _svgColorMap: Record<string, string> = {
        '"black"': "var(--gv-fg)",
        '"white"': "var(--gv-bg)"
    };
    private static readonly _svgColorRe = /"black"|"white"/g;

    renderSVG(svg: string) {
        this._selection = {};
        const startPos = svg.indexOf("<g id=");
        const endPos = svg.lastIndexOf("</svg>");
        this._renderElement.html(svg.substring(startPos, endPos)
            .replace(Widget._svgColorRe, m => Widget._svgColorMap[m])
        );
    }

    render(callback?: (w: Widget) => void) {

        return super.render(async w => {
            const dotWriter = new DotWriter(this._data);
            const dot = dotWriter.writeGraph();
            if (this._prevDOT !== dot) {
                this._prevDOT = dot;
                const layout = await layoutCache.calcSVG(dot);
                if (isGraphvizWorkerResponse(layout)) {
                    this.renderSVG(layout.svg);
                    this.zoomToFit(0);
                } else {
                    console.warn(`Graphviz layout failed: ${layout.error}, ${layout.errorDot}`);
                }
            }
            if (callback) {
                callback(this);
            }
        });
    }

    //  Events  ---
    selectionChanged() {
    }
}
Widget.prototype._class += " graph_GraphvizWidget";
