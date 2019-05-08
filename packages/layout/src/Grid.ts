import { HTMLWidget, Platform, Utility } from "@hpcc-js/common";
import { drag as d3Drag } from "d3-drag";
import { event as d3Event, select as d3Select } from "d3-selection";
import * as _GridList from "grid-list";
import { Cell } from "./Cell";

import "../src/Grid.css";

const GridList = (_GridList && _GridList.default) || _GridList;

export type ICellPosition = [number, number, number?, number?];

export class Grid extends HTMLWidget {
    divItems;

    gridList;
    items;
    itemsMap;
    origItems;
    cellWidth;
    cellHeight;
    dragItem;
    dragItemPos;

    _d3Drag;
    _d3DragResize;
    _selectionBag;
    _scrollBarWidth;

    constructor() {
        super();

        this._tag = "div";
        this._selectionBag = new Utility.Selection(this);

        this.content([]);
    }

    getDimensions() {
        const size = { width: 0, height: 0 };
        this.content().forEach(function (cell) {
            if (size.width < cell.gridCol() + cell.gridColSpan()) {
                size.width = cell.gridCol() + cell.gridColSpan();
            }
            if (size.height < cell.gridRow() + cell.gridRowSpan()) {
                size.height = cell.gridRow() + cell.gridRowSpan();
            }
        }, this);
        return size;
    }

    clearContent(widget: Cell) {
        this.content(this.content().filter(function (contentWidget) {
            if (!widget) {
                contentWidget.target(null);
                return false;
            }
            let w: any = contentWidget;
            while (w) {
                if (widget === w) {
                    contentWidget.target(null);
                    return false;
                }
                w = w.widget ? w.widget() : null;
            }
            return true;
        }));
    }

    setContent(row, col, widget, title?, rowSpan?, colSpan?) {
        rowSpan = rowSpan || 1;
        colSpan = colSpan || 1;
        title = title || "";
        this.content(this.content().filter(function (contentWidget) {
            if (contentWidget.gridRow() === row && contentWidget.gridCol() === col) {
                contentWidget.target(null);
                return false;
            }
            return true;
        }));
        if (widget) {
            const cell = new Cell()
                .gridRow(row)
                .gridCol(col)
                .widget(widget)
                .title(title)
                .gridRowSpan(rowSpan)
                .gridColSpan(colSpan)
                ;
            this.content().push(cell);
        }
        return this;
    }

    sortedContent() {
        return this.content().sort(function (l, r) {
            if (l.gridRow() === r.gridRow()) {
                return l.gridCol() - r.gridCol();
            }
            return l.gridRow() - r.gridRow();
        });
    }

    getCell(row, col) {
        let retVal = null;
        this.content().some(function (cell) {
            if (row >= cell.gridRow() && row < cell.gridRow() + cell.gridRowSpan() &&
                col >= cell.gridCol() && col < cell.gridCol() + cell.gridColSpan()) {
                retVal = cell;
                return true;
            }
            return false;
        });
        return retVal;
    }

    getWidgetCell(id) {
        let retVal = null;
        this.content().some(function (cell) {
            if (cell.widget().id() === id) {
                retVal = cell;
                return true;
            }
            return false;
        });
        return retVal;
    }

    getContent(id) {
        let retVal = null;
        this.content().some(function (cell) {
            if (cell.widget().id() === id) {
                retVal = cell.widget();
                return true;
            }
            return false;
        });
        return retVal;
    }

    cellToGridItem(cell) {
        return {
            x: cell.gridCol(),
            y: cell.gridRow(),
            w: cell.gridColSpan(),
            h: cell.gridRowSpan(),
            id: cell.id(),
            cell
        };
    }

    gridItemToCell(item) {
        item.cell
            .gridCol(item.x)
            .gridRow(item.y)
            .gridColSpan(item.w)
            .gridRowSpan(item.h)
            ;
    }

    resetItemsPos() {
        this.origItems.forEach(function (origItem) {
            const item = this.itemsMap[origItem.id];
            item.x = origItem.x;
            item.y = origItem.y;
        }, this);
    }

    initGridList() {
        this.itemsMap = {};
        this.items = this.content().map(function (cell) {
            const retVal = this.cellToGridItem(cell);
            this.itemsMap[retVal.id] = retVal;
            return retVal;
        }, this);
        this.origItems = this.content().map(this.cellToGridItem);
        this.gridList = new GridList(this.items, {
            direction: this.snapping(),
            lanes: this.snapping() === "horizontal" ? this.snappingRows() : this.snappingColumns()
        });
    }

    killGridList() {
        this.gridList = null;
        delete this.items;
        delete this.itemsMap;
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._scrollBarWidth = Platform.getScrollbarWidth();

        const context = this;
        this._d3Drag = d3Drag()
            .subject(function (_d) {
                const d = context.cellToGridItem(_d);
                return { x: d.x * context.cellWidth, y: d.y * context.cellHeight };
            })
            .on("start", function (_d: any) {
                if (!context.designMode()) return;
                d3Event.sourceEvent.stopPropagation();
                context.initGridList();
                const d = context.itemsMap[_d.id()];
                context.dragItem = element.append("div")
                    .attr("class", "dragging")
                    .style("transform", function () { return "translate(" + d.x * context.cellWidth + "px, " + d.y * context.cellHeight + "px)"; })
                    .style("width", function () { return d.w * context.cellWidth - context.gutter() + "px"; })
                    .style("height", function () { return d.h * context.cellHeight - context.gutter() + "px"; })
                    ;
                context.selectionBagClick(_d);
            })
            .on("drag", function (_d: any) {
                if (!context.designMode()) return;
                d3Event.sourceEvent.stopPropagation();
                const d = context.itemsMap[_d.id()];
                if (d3Event.x < 0) {
                    d3Event.x = 0;
                }
                if (d3Event.x + d.w * context.cellWidth > context.snappingColumns() * context.cellWidth) {
                    d3Event.x = context.snappingColumns() * context.cellWidth - d.w * context.cellWidth;
                }
                if (d3Event.y < 0) {
                    d3Event.y = 0;
                }
                if (d3Event.y + d.h * context.cellWidth > context.snappingRows() * context.cellWidth) {
                    d3Event.y = context.snappingRows() * context.cellWidth - d.h * context.cellWidth;
                }
                const pos = [Math.max(0, Math.floor((d3Event.x + context.cellWidth / 2) / context.cellWidth)), Math.max(0, Math.floor((d3Event.y + context.cellHeight / 2) / context.cellHeight))];
                if (d.x !== pos[0] || d.y !== pos[1]) {
                    if (context.snapping() !== "none") {
                        context.resetItemsPos();
                        context.gridList.moveItemToPosition(d, pos);
                    } else {
                        d.x = pos[0];
                        d.y = pos[1];
                    }
                    if (_d.gridCol() !== d.x || _d.gridRow() !== d.y) {
                        context.items.forEach(context.gridItemToCell);
                        context.updateGrid(false, 100);
                    }
                }
                context.dragItem
                    .style("transform", function () { return "translate(" + d3Event.x + "px, " + d3Event.y + "px)"; })
                    .style("width", function () { return d.w * context.cellWidth + "px"; })
                    .style("height", function () { return d.h * context.cellHeight + "px"; })
                    ;
            })
            .on("end", function () {
                if (!context.designMode()) return;
                d3Event.sourceEvent.stopPropagation();
                context.dragItem.remove();
                context.dragItem = null;
                context.killGridList();
            })
            ;

        this._d3DragResize = d3Drag()
            .subject(function (_d) {
                const d = context.cellToGridItem(_d);
                return { x: (d.x + d.w - 1) * context.cellWidth, y: (d.y + d.h - 1) * context.cellHeight };
            })
            .on("start", function (_d: any) {
                if (!context.designMode()) return;
                d3Event.sourceEvent.stopPropagation();
                context.initGridList();
                const d = context.itemsMap[_d.id()];
                context.dragItem = element.append("div")
                    .attr("class", "resizing")
                    .style("transform", function () { return "translate(" + d.x * context.cellWidth + "px, " + d.y * context.cellHeight + "px)"; })
                    .style("width", function () { return d.w * context.cellWidth - context.gutter() + "px"; })
                    .style("height", function () { return d.h * context.cellHeight - context.gutter() + "px"; })
                    ;
                context.dragItemPos = { x: d.x, y: d.y };
            })
            .on("drag", function (_d: any) {
                if (!context.designMode()) return;
                d3Event.sourceEvent.stopPropagation();
                const d = context.itemsMap[_d.id()];
                const pos = [Math.max(0, Math.round(d3Event.x / context.cellWidth)), Math.max(0, Math.round(d3Event.y / context.cellHeight))];
                const size = {
                    w: Math.max(1, pos[0] - d.x + 1),
                    h: Math.max(1, pos[1] - d.y + 1)
                };
                if (d.w !== size.w || d.h !== size.h) {
                    if (context.snapping() !== "none") {
                        context.resetItemsPos();
                        context.gridList.resizeItem(d, size);
                    } else {
                        d.w = size.w;
                        d.h = size.h;
                    }
                    if (_d.gridColSpan() !== d.w || _d.gridRowSpan() !== d.h) {
                        context.items.forEach(context.gridItemToCell);
                        context.updateGrid(d.id, 100);
                    }
                }
                context.dragItem
                    .style("width", function () { return (-d.x + 1) * context.cellWidth + d3Event.x - context.gutter() + "px"; })
                    .style("height", function () { return (-d.y + 1) * context.cellHeight + d3Event.y - context.gutter() + "px"; })
                    ;
            })
            .on("end", function () {
                if (!context.designMode()) return;
                d3Event.sourceEvent.stopPropagation();
                context.dragItem.remove();
                context.dragItem = null;
                context.killGridList();
            })
            ;
    }

    updateGrid(resize, transitionDuration: number = 0, _noRender: boolean = false) {
        transitionDuration = transitionDuration || 0;
        const context = this;
        this.divItems
            .classed("draggable", this.designMode())
            .transition().duration(transitionDuration)
            .style("left", function (d) { return d.gridCol() * context.cellWidth + context.gutter() / 2 + "px"; })
            .style("top", function (d) { return d.gridRow() * context.cellHeight + context.gutter() / 2 + "px"; })
            .style("width", function (d) { return d.gridColSpan() * context.cellWidth - context.gutter() + "px"; })
            .style("height", function (d) { return d.gridRowSpan() * context.cellHeight - context.gutter() + "px"; })
            .on("end", function (d) {
                d
                    .surfaceShadow_default(context.surfaceShadow())
                    .surfacePadding_default(context.surfacePadding())
                    .surfaceBorderWidth_default(context.surfaceBorderWidth())
                    .surfaceBackgroundColor_default(context.surfaceBackgroundColor())
                    ;

                if (resize === true || resize === d.id()) {
                    d
                        .resize()
                        .lazyRender()
                        ;
                }
            })
            ;
    }

    update(domNode, element2) {
        super.update(domNode, element2);

        this._placeholderElement.style("overflow-x", this.fitTo() === "width" ? "hidden" : null);
        this._placeholderElement.style("overflow-y", this.fitTo() === "width" ? "scroll" : null);
        const dimensions = this.getDimensions();
        const clientWidth = this.width() - (this.fitTo() === "width" ? this._scrollBarWidth : 0);
        this.cellWidth = clientWidth / dimensions.width;
        this.cellHeight = this.fitTo() === "all" ? this.height() / dimensions.height : this.cellWidth;
        if (this.designMode()) {
            if (this.adaptiveSnapping()) {
                this.snappingColumns_default(dimensions.width);
                this.snappingRows_default(dimensions.height);
            } else {
                const cellLaneRatio = Math.min(this.width() / this.snappingColumns(), this.height() / this.snappingRows());
                const laneWidth = Math.floor(cellLaneRatio);
                this.cellWidth = laneWidth;
                this.cellHeight = this.cellWidth;
            }
        }
        //  Grid  ---
        const context = this;
        const divItems = element2.selectAll("#" + this.id() + " > .ddCell").data(this.content(), function (d) { return d.id(); });
        this.divItems = divItems.enter().append("div")
            .attr("class", "ddCell")
            .each(function (d) {
                d.target(this);
                d.__grid_watch = d.monitor(function (key, newVal, oldVal) {
                    if (context._renderCount && (key === "snapping" || key.indexOf("grid") === 0) && newVal !== oldVal) {
                        if (!context.gridList) {
                            //  API Call  (only needed when not dragging) ---
                            context.initGridList();
                            if (context.snapping() !== "none") {
                                context.gridList.resizeGrid(context.snapping() === "horizontal" ? context.snappingRows() : context.snappingColumns());
                            }
                            context.items.forEach(context.gridItemToCell);
                            context.updateGrid(d.id(), 100);
                            context.killGridList();
                        }
                    }
                });
                const element = d3Select(this);
                element.append("div")
                    .attr("class", "resizeHandle")
                    .call(context._d3DragResize)
                    .append("div")
                    .attr("class", "resizeHandleDisplay")
                    ;
            }).merge(divItems)
            ;
        this.divItems.each(function (d) {
            const element = d3Select(this);
            if (context.designMode()) {
                element.call(context._d3Drag);
            } else {
                element
                    .on("mousedown.drag", null)
                    .on("touchstart.drag", null)
                    ;
            }
        });
        this.divItems.select(".resizeHandle")
            .style("display", this.designMode() ? null : "none")
            ;

        this.updateGrid(true);
        divItems.exit()
            .each(function (d) {
                d.target(null);
                if (d.__grid_watch) {
                    d.__grid_watch.remove();
                }
            })
            .remove()
            ;

        //  Snapping  ---
        const lanesBackground = element2.selectAll("#" + this.id() + " > .laneBackground").data(this.designMode() ? [""] : []);
        lanesBackground.enter().insert("div", ":first-child")
            .attr("class", "laneBackground")
            .style("left", "1px")
            .style("top", "1px")
            .on("click", function () {
                context.selectionBagClear();
            })
            .merge(lanesBackground)
            .style("width", (this.snappingColumns() * this.cellWidth) + "px")
            .style("height", (this.snappingRows() * this.cellWidth) + "px")
            ;
        lanesBackground.exit()
            .each(function () {
                context.selectionBagClear();
            })
            .remove()
            ;

        const lanes = element2.selectAll("#" + this.id() + " > .lane").data(this.designMode() ? [""] : []);
        lanes.enter().append("div")
            .attr("class", "lane")
            .style("left", "1px")
            .style("top", "1px")
            ;
        lanes
            .style("display", this.showLanes() ? null : "none")
            .style("width", (this.snappingColumns() * this.cellWidth) + "px")
            .style("height", (this.snappingRows() * this.cellWidth) + "px")
            .style("background-image", "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)")
            .style("background-size", this.cellWidth + "px " + this.cellHeight + "px")
            ;
        lanes.exit()
            .remove()
            ;
    }

    exit(domNode, element) {
        this.content().forEach(w => w.target(null));
        super.exit(domNode, element);
    }

    _createSelectionObject(d) {
        return {
            _id: d._id,
            element: () => {
                return d._element;
            },
            widget: d
        };
    }

    selection(_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) { return d._id; });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    }

    selectionBagClear() {
        if (!this._selectionBag.isEmpty()) {
            this._selectionBag.clear();
            this.postSelectionChange();
        }
    }

    selectionBagClick(d) {
        if (d !== null) {
            const selectionObj = this._createSelectionObject(d);
            if (d3Event.sourceEvent.ctrlKey) {
                if (this._selectionBag.isSelected(selectionObj)) {
                    this._selectionBag.remove(selectionObj);
                    this.postSelectionChange();
                } else {
                    this._selectionBag.append(selectionObj);
                    this.postSelectionChange();
                }
            } else {
                const selected = this._selectionBag.get();
                console.log("selected", selected);
                if (selected[0] && selected[0]._id === selectionObj._id) {
                    this.selectionBagClear();
                } else {
                    this._selectionBag.set([selectionObj]);
                }
                this.postSelectionChange();
            }
        }
    }

    postSelectionChange() {
    }

    applyLayout(layoutArr: ICellPosition[]) {
        this.divItems.each((d, i) => {
            if (layoutArr[i]) {
                const [x, y, w, h] = layoutArr[i];
                d
                    .gridCol(x)
                    .gridRow(y)
                    .gridColSpan(w)
                    .gridRowSpan(h)
                    ;
            }
        });
        this.updateGrid(true);
    }

    vizActivation(elem) {
        console.log("called vizActivation elem in Grid");
        console.log("elem", elem);
    }

    designMode: { (): boolean; (_: boolean): Grid; };
    adaptiveSnapping: { (): boolean; (_: boolean): Grid; };
    showLanes: { (): boolean; (_: boolean): Grid; };
    fitTo: { (): string; (_: string): Grid; };
    snapping: { (): string; (_: string): Grid; };
    snappingColumns: { (): number; (_: number): Grid; };
    snappingRows: { (): number; (_: number): Grid; };
    snappingColumns_default: { (): number; (_: number): Grid; };
    snappingRows_default: { (): number; (_: number): Grid; };

    gutter: { (): number; (_: number): Grid; };

    surfaceShadow: { (): boolean; (_: boolean): Grid; };
    surfacePadding: { (): string; (_: string): Grid; };
    surfaceBorderWidth: { (): number; (_: number): Grid; };
    surfaceBackgroundColor: { (): string; (_: string): Grid; };

    content: { (): Cell[]; (_: Cell[]): Grid; };
}
Grid.prototype._class += " layout_Grid";

Grid.prototype.publish("designMode", false, "boolean", "Design Mode", null, { tags: ["Basic"] });
Grid.prototype.publish("adaptiveSnapping", false, "boolean", "Adapt the snapping columns and rows to match the content", null, { tags: ["Basic"], disable: w => !w.designMode() });
Grid.prototype.publish("showLanes", true, "boolean", "Show snapping lanes when in design mode", null, { tags: ["Basic"], disable: w => !w.designMode() });
Grid.prototype.publish("fitTo", "all", "set", "Sizing Strategy", ["all", "width"], { tags: ["Basic"] });
Grid.prototype.publish("snapping", "vertical", "set", "Snapping Strategy", ["vertical", "horizontal", "none"]);
Grid.prototype.publish("snappingColumns", 12, "number", "Snapping Columns");
Grid.prototype.publish("snappingRows", 16, "number", "Snapping Rows");

Grid.prototype.publish("gutter", 6, "number", "Gap Between Widgets", null, { tags: ["Basic"] });

Grid.prototype.publish("surfaceShadow", true, "boolean", "3D Shadow");
Grid.prototype.publish("surfacePadding", null, "string", "Cell Padding (px)", null, { tags: ["Intermediate"] });
Grid.prototype.publish("surfaceBorderWidth", 1, "number", "Width (px) of Cell Border", null, { tags: ["Intermediate"] });
Grid.prototype.publish("surfaceBackgroundColor", null, "html-color", "Surface Background Color", null, { tags: ["Advanced"] });

Grid.prototype.publish("content", [], "widgetArray", "widgets", null, { tags: ["Basic"], render: false });
