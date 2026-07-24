import type { Graph } from "@hpcc-js/wasm-graphviz";
import { d3Event, SVGZoomWidget, type Widget as WidgetT } from "@hpcc-js/common";
import { graphvizDot, GraphvizDotResponse } from "../common/layouts/index.ts";

import "./Widget.css";

export const CUSTOM_HTML = "htmlContent";
export const CUSTOM_SVG = "svgContent";
export interface CustomVertex {
    id: string;
    svg?: string;
    html?: string;
}

export class SVGWidget extends SVGZoomWidget {

    protected static readonly _customVertexDPI = 72;

    private static readonly _svgColorMap: Record<string, string> = {
        '"black"': '"var(--gv-fg)"',
        '"white"': '"var(--gv-bg)"'
    };
    private static readonly _svgColorRe = /"black"|"white"/g;

    protected _selection: { [id: string]: boolean } = {};
    protected _selectionPreferredNode: { [id: string]: SVGGElement } = {};

    constructor() {
        super();
        this._drawStartPos = "origin";
        this.zoomToFitLimit(1);
        this.showToolbar(false);
    }

    protected _svg: string = "";
    svg(): string;
    svg(_: string): this;
    svg(_?: string): this | string {
        if (!arguments.length) return this._svg;
        this._svg = _;
        return this;
    }

    clearSelection(broadcast: boolean = false) {
        this._selection = {};
        this._selectionPreferredNode = {};
        this._selectionChanged(broadcast);
    }

    toggleSelection(id: string, broadcast: boolean = false, preferredNode?: SVGGElement) {
        if (this._selection[id]) {
            delete this._selection[id];
            delete this._selectionPreferredNode[id];
        } else {
            this._selection[id] = true;
            if (preferredNode) {
                this._selectionPreferredNode[id] = preferredNode;
            }
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
            this._selectionPreferredNode = {};
            this._selectionChanged(broadcast);
        }
        return this;
    }

    hasSelection(): boolean {
        return Object.keys(this._selection).length > 0;
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

    protected _selectionChanged(broadcast = false) {
        const hasClass = (node: any, className: string): boolean => {
            return !!(node && node.classList && typeof node.classList.contains === "function" && node.classList.contains(className));
        };
        const addSelectedClass = (node: any): void => {
            if (node && node.classList && typeof node.classList.add === "function") {
                node.classList.add("selected");
            }
        };

        this._renderElement.selectAll(".node,.edge,.cluster")
            .classed("selected", false);

        for (const id of Object.keys(this._selection)) {
            const matches = this._renderElement.selectAll(`.node[id='${id}'],.edge[id='${id}'],.cluster[id='${id}']`) as any;
            const nodes: SVGGElement[] = typeof matches.nodes === "function"
                ? matches.nodes()
                : (() => {
                    const retVal: SVGGElement[] = [];
                    if (typeof matches.each === "function") {
                        matches.each(function (this: SVGGElement) {
                            retVal.push(this);
                        });
                    }
                    return retVal;
                })();
            if (!nodes.length) continue;

            // Some graphs emit duplicate cluster IDs; prefer the exact clicked cluster when available.
            const clusterNodes = nodes.filter(n => hasClass(n, "cluster"));
            if (clusterNodes.length > 1) {
                const preferred = this._selectionPreferredNode[id];
                if (preferred && clusterNodes.indexOf(preferred) >= 0) {
                    addSelectedClass(preferred);
                } else {
                    let largest = clusterNodes[0] as SVGGraphicsElement;
                    let largestArea = 0;
                    for (const node of clusterNodes) {
                        const bbox = (node as SVGGraphicsElement).getBBox();
                        const area = bbox.width * bbox.height;
                        if (area > largestArea) {
                            largestArea = area;
                            largest = node as SVGGraphicsElement;
                        }
                    }
                    addSelectedClass(largest);
                }
                for (const node of nodes) {
                    if (!hasClass(node, "cluster")) {
                        addSelectedClass(node);
                    }
                }
            } else {
                for (const node of nodes) {
                    addSelectedClass(node);
                }
            }
        }

        if (broadcast) {
            this.selectionChanged();
        }
    }

    enter(domNode: HTMLElement | SVGElement, element?: SVGGElement): this {
        super.enter(domNode, element);
        const context = this;
        this._renderElement
            .on("click", function () {
                const event = d3Event();
                let target = event.target as SVGElement;
                while (target && target !== event.currentTarget) {
                    const action = (target as Element).getAttribute?.("data-action");
                    if (action) {
                        let nodeEl = target.parentElement as unknown as SVGElement;
                        while (nodeEl && nodeEl !== event.currentTarget) {
                            if (nodeEl.classList?.contains("node")) {
                                context.vertexButtonClicked(nodeEl.id, action);
                                return;
                            }
                            nodeEl = nodeEl.parentElement as unknown as SVGElement;
                        }
                        return;
                    }
                    if (target.classList.contains("node") || target.classList.contains("edge") || target.classList.contains("cluster")) {
                        if (!event.ctrlKey && !event.metaKey) {
                            context.clearSelection();
                        }
                        context.toggleSelection(target.id, true, target as SVGGElement);
                        return;
                    }
                    target = target.parentElement as unknown as SVGElement;
                }
                context.clearSelection(true);
            })
            .on("dblclick", function () {
                const event = d3Event();
                event.stopPropagation();
                event.preventDefault();
                let target = event.target as SVGElement;
                while (target && target !== event.currentTarget) {
                    if (target.classList.contains("node") || target.classList.contains("edge") || target.classList.contains("cluster")) {
                        context.zoomToItem(target as SVGGraphicsElement);
                        return;
                    }
                    target = target.parentElement as unknown as SVGElement;
                }
                context.zoomToFit();
            })
            ;

        this._zoomGrab
            .on("dblclick", function () {
                const event = d3Event();
                event.stopPropagation();
                event.preventDefault();
                context.zoomToFit();
            })
            ;

        this.on("startMarqueeSelection", () => {
            context.clearSelection();
        }).on("updateMarqueeSelection", () => {
            const selectedIds: string[] = [];

            // Use screen coordinates to avoid coordinate system complexity
            // (graphviz root g has a Y-flip transform that getBBox() does not account for)
            const marqueeNode = context._marqueeSelection?.node() as SVGRectElement | undefined;
            if (!marqueeNode) return;
            const marqueeRect = marqueeNode.getBoundingClientRect();

            context._renderElement.selectAll(".node,.edge,.cluster")
                .each(function (this: SVGGraphicsElement) {
                    if (!this.id) return;
                    const elemRect = this.getBoundingClientRect();
                    if (!elemRect) return;

                    if (marqueeRect.left <= elemRect.left && marqueeRect.right >= elemRect.right &&
                        marqueeRect.top <= elemRect.top && marqueeRect.bottom >= elemRect.bottom) {
                        selectedIds.push(this.id);
                    }
                });

            context.selection(selectedIds);
        }).on("endMarqueeSelection", () => {
            context.selectionChanged();
        });

        return this;
    }

    itemBBox(scopeID: string): ReturnType<Widget["getRenderElementBBox"]>;
    itemBBox(node: SVGGraphicsElement): ReturnType<Widget["getRenderElementBBox"]>;
    itemBBox(scopeIDOrNode: string | SVGGraphicsElement) {
        const node = typeof scopeIDOrNode === "string"
            ? this._renderElement.select(`#${scopeIDOrNode}`).node() as SVGGraphicsElement
            : scopeIDOrNode;
        const renderNode = this._renderElement.node() as SVGGraphicsElement;
        if (node && renderNode) {
            const clientRect = node.getBoundingClientRect();
            const inverseScreenCTM = renderNode.getScreenCTM()?.inverse();
            if (inverseScreenCTM && clientRect.width && clientRect.height) {
                const topLeft = {
                    x: inverseScreenCTM.a * clientRect.left + inverseScreenCTM.c * clientRect.top + inverseScreenCTM.e,
                    y: inverseScreenCTM.b * clientRect.left + inverseScreenCTM.d * clientRect.top + inverseScreenCTM.f
                };
                const bottomRight = {
                    x: inverseScreenCTM.a * clientRect.right + inverseScreenCTM.c * clientRect.bottom + inverseScreenCTM.e,
                    y: inverseScreenCTM.b * clientRect.right + inverseScreenCTM.d * clientRect.bottom + inverseScreenCTM.f
                };
                return {
                    x: Math.min(topLeft.x, bottomRight.x),
                    y: Math.min(topLeft.y, bottomRight.y),
                    width: Math.abs(bottomRight.x - topLeft.x),
                    height: Math.abs(bottomRight.y - topLeft.y)
                };
            }
            return node.getBBox();
        }
        return this.getRenderElementBBox();
    }

    zoomToItem(scopeID: string, transitionDuration?: number): this;
    zoomToItem(node: SVGGraphicsElement, transitionDuration?: number): this;
    zoomToItem(scopeIDOrNode: string | SVGGraphicsElement, transitionDuration?: number) {
        const itemBBox = typeof scopeIDOrNode === "string"
            ? this.itemBBox(scopeIDOrNode)
            : this.itemBBox(scopeIDOrNode);
        if (transitionDuration === undefined) {
            this.zoomToBBox(itemBBox);
        } else {
            this.zoomToBBox(itemBBox, transitionDuration);
        }
        return this;
    }

    zoomToSelection(transitionDuration?: number): this {
        const ids = Object.keys(this._selection);
        if (!ids.length) return this;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const id of ids) {
            const bbox = this.itemBBox(id);
            if (!bbox) continue;
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x + bbox.width);
            maxY = Math.max(maxY, bbox.y + bbox.height);
        }
        if (isFinite(minX) && isFinite(minY) && isFinite(maxX) && isFinite(maxY)) {
            this.zoomToBBox({ x: minX, y: minY, width: maxX - minX, height: maxY - minY }, transitionDuration);
        }
        return this;
    }

    centerOnItem(scopeID: string, transitionDuration?: number): this;
    centerOnItem(node: SVGGraphicsElement, transitionDuration?: number): this;
    centerOnItem(scopeIDOrNode: string | SVGGraphicsElement, transitionDuration?: number) {
        const bbox = typeof scopeIDOrNode === "string"
            ? this.itemBBox(scopeIDOrNode)
            : this.itemBBox(scopeIDOrNode);
        this.centerOnBBox(bbox, transitionDuration);
        return this;
    }

    centerOnSelection(transitionDuration?: number): this {
        const ids = Object.keys(this._selection);
        if (!ids.length) return this;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const id of ids) {
            const bbox = this.itemBBox(id);
            if (!bbox) continue;
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x + bbox.width);
            maxY = Math.max(maxY, bbox.y + bbox.height);
        }
        if (isFinite(minX) && isFinite(minY) && isFinite(maxX) && isFinite(maxY)) {
            this.centerOnBBox({ x: minX, y: minY, width: maxX - minX, height: maxY - minY }, transitionDuration);
        }
        return this;
    }

    update(domNode: HTMLElement | SVGElement, element: SVGGElement): this {
        super.update(domNode, element);
        if (this._prevSvg !== this._svg) {
            this._prevSvg = this._svg;

            const renderNode = this._renderElement.node();
            renderNode.innerHTML = "";

            const svg = this._svg.replace(SVGWidget._svgColorRe, m => SVGWidget._svgColorMap[m]);
            const svgDoc = new DOMParser().parseFromString(svg, "image/svg+xml");
            renderNode.replaceChildren(...svgDoc.documentElement.childNodes);
            if (this.hasSelection()) {
                this.centerOnSelection();
            } else {
                this.zoomToFit();
            }
            this._selectionChanged();
        }
        return this;
    }

    exit(domNode: HTMLElement | SVGElement, element?: SVGGElement): this {
        super.exit(domNode, element);
        return this;
    }

    protected _prevSvg: string | undefined;
    render(callback?: (w: WidgetT) => void): this {
        super.render(callback);
        return this;
    }

    //  Events  ---
    selectionChanged() {
    }

    vertexButtonClicked(id: string, action: string) {
    }
}
SVGWidget.prototype._class += " graph_GraphvizSVGWidget";

export class Widget extends SVGWidget {

    constructor() {
        super();
    }

    protected _data: Graph;
    data(_: Graph): this;
    data(): Graph;
    data(_?: Graph): this | Graph {
        if (!arguments.length) return this._data;
        if (this._data === _) return this;
        if (this._data) {
            this._data.delete();
        }
        this._data = _;
        return this;
    }

    protected collectCustomVertices(): CustomVertex[] {
        const customVertices: CustomVertex[] = [];
        for (const nodeName of this._data.nodeNames()) {
            const svg = this._data.getNodeAttr(nodeName, CUSTOM_SVG);
            const html = this._data.getNodeAttr(nodeName, CUSTOM_HTML);
            if (!svg && !html) continue;

            const svgWidth = parseFloat(this._data.getNodeAttr(nodeName, "svgWidth"));
            const svgHeight = parseFloat(this._data.getNodeAttr(nodeName, "svgHeight"));
            if (!isFinite(svgWidth) || !isFinite(svgHeight) || svgWidth <= 0 || svgHeight <= 0) continue;

            customVertices.push({ id: nodeName, svg: svg || undefined, html: html || undefined });

            this._data
                .setNodeAttr(nodeName, "label", "")
                .setNodeAttr(nodeName, "shape", this._data.getNodeAttr(nodeName, "shape") || "rectangle")
                .setNodeAttr(nodeName, "fixedsize", true)
                .setNodeAttr(nodeName, "width", svgWidth / Widget._customVertexDPI)
                .setNodeAttr(nodeName, "height", svgHeight / Widget._customVertexDPI);
        }
        return customVertices;
    }

    protected postrenderCustomVertices(customVertices: CustomVertex[]) {
        for (const v of customVertices) {
            const nodeGroup = this._renderElement.select(`#${v.id}`);
            if (nodeGroup.empty()) continue;

            const bbox = (nodeGroup.node() as SVGGraphicsElement).getBBox();
            const cx = bbox.x + bbox.width / 2;
            const cy = bbox.y + bbox.height / 2;

            nodeGroup.select("polygon,ellipse,path")
                .attr("stroke", "transparent")
                .attr("fill", "transparent");

            if (v.html) {
                const nodeId = v.id;
                const fo = nodeGroup.append("foreignObject")
                    .attr("class", CUSTOM_HTML)
                    .attr("width", bbox.width)
                    .attr("height", bbox.height)
                    .attr("x", bbox.x)
                    .attr("y", bbox.y);

                const div = fo.append("xhtml:div")
                    .attr("xmlns", "http://www.w3.org/1999/xhtml")
                    .style("width", `${bbox.width}px`)
                    .style("height", `${bbox.height}px`)
                    .style("overflow", "hidden")
                    .html(v.html);

                (div.node() as HTMLElement).querySelectorAll<HTMLElement>("[data-action]").forEach(btn => {
                    btn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        this.vertexButtonClicked(nodeId, btn.dataset.action!);
                    });
                });
            } else if (v.svg) {
                const g = nodeGroup.append("g")
                    .attr("class", CUSTOM_SVG);
                g.html(v.svg);

                const contentBBox = (g.node() as SVGGraphicsElement).getBBox();
                const dx = cx - (contentBBox.x + contentBBox.width / 2);
                const dy = cy - (contentBBox.y + contentBBox.height / 2);
                g.attr("transform", `translate(${dx},${dy})`);
            }
        }
    }

    enter(domNode: HTMLElement | SVGElement, element: SVGGElement): this {
        super.enter(domNode, element);
        return this;
    }

    update(domNode: HTMLElement | SVGElement, element: SVGGElement): this {
        super.update(domNode, element);
        return this;
    }

    exit(domNode: HTMLElement | SVGElement, element?: SVGGElement): this {
        super.exit(domNode, element);
        if (this._data) {
            this._data.delete();
            this._data = undefined;
        }
        if (this._prevLayout) {
            this._prevLayout.terminate();
            this._prevLayout = undefined;
        }
        return this;
    }

    protected _prevDot: string | undefined;
    protected _prevLayout: GraphvizDotResponse | undefined;
    render(callback?: (w: WidgetT) => void): this {
        super.render((w: WidgetT) => {
            const customVertices = this.collectCustomVertices();
            const dot = this._data.toDot();
            if (this._prevDot !== dot) {
                this._prevDot = dot;
                if (this._prevLayout) {
                    this._prevLayout.terminate();
                }
                const renderNode = this._renderElement.node();
                renderNode.innerHTML = "";

                this._prevLayout = graphvizDot(dot, "dot");
                this._prevLayout.response
                    .then(svg => {
                        if (this._prevLayout) {
                            this._prevLayout = undefined;
                        }
                        this
                            .svg(svg)
                            .render()
                            ;
                        this.postrenderCustomVertices(customVertices);
                    }).catch(e => {
                        if (this._prevLayout) {
                            this._prevLayout = undefined;
                        }
                        renderNode.innerHTML = "";
                        this.postrenderCustomVertices([]);
                        this._selectionChanged();
                        console.error(e);
                    }).finally(() => {
                        if (callback) {
                            callback(w);
                        }
                    });
            } else {
                if (callback) {
                    callback(w);
                }
            }
        });
        return this;
    }

}
Widget.prototype._class += " graph_GraphvizWidget";
