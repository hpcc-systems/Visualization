import { HTMLWidget, Platform, Utility } from "@hpcc-js/common";
import { drag as d3Drag } from "d3-drag";
import { event as d3Event, select as d3Select, selectAll as d3SelectAll } from "d3-selection";
import { Cell } from "./Cell";

import "../src/Border.css";

export class Border extends HTMLWidget {
    _colCount: number;
    _rowCount: number;
    _colSize: number;
    _rowSize: number;
    _shrinkWrapBoxes;
    _watch;
    _offsetX;
    _offsetY;
    _dragCell;
    _dragCellSize;
    _dragCellStartSize;
    _handleTop;
    _handleLeft;
    _dragPrevX;
    _dragPrevY;
    _cellSizes;
    contentDiv;
    _scrollBarWidth;
    _borderHandles;
    _sectionTypeArr;

    constructor() {
        super();

        this._tag = "div";

        this._colCount = 0;
        this._rowCount = 0;
        this._colSize = 0;
        this._rowSize = 0;

        this._shrinkWrapBoxes = {};

        this.content([]);
        this.sectionTypes([]);
    }

    watchWidget(widget) {
        if (this._watch === undefined) {
            this._watch = {};
        }
        if (this._watch[widget.id()]) {
            this._watch[widget.id()].remove();
            delete this._watch[widget.id()];
        }
        if (widget) {
            const context = this;
            this._watch[widget.id()] = widget.monitor(function (paramId, newVal, oldVal) {
                if (oldVal !== newVal) {
                    context.lazyPostUpdate();
                }
            });
        }
    }

    lazyPostUpdate = Utility.debounce(function () {
        this.postUpdate();
    }, 100);

    applyLayoutType() {
        const layoutObj = this.borderLayoutObject();
        this.content().forEach(function (cell, i) {
            cell._fixedLeft = layoutObj[this.sectionTypes()[i]].left;
            cell._fixedTop = layoutObj[this.sectionTypes()[i]].top;
            cell._fixedWidth = layoutObj[this.sectionTypes()[i]].width;
            cell._fixedHeight = layoutObj[this.sectionTypes()[i]].height;
            cell._dragHandles = this.cellSpecificDragHandles(this.sectionTypes()[i]);
        }, this);
    }
    cellSpecificDragHandles(sectionType) {
        switch (sectionType) {
            case "top": return ["s"];
            case "right": return ["w"];
            case "bottom": return ["n"];
            case "left": return ["e"];
            case "center": return [];
        }
    }

    borderLayoutObject(layoutType?) {
        let t;
        let b;
        let r;
        let l;
        let c;
        const retObj = {};
        const context = this;
        let topSize;
        let topPerc;
        let bottomSize;
        let bottomPerc;
        let leftSize;
        let leftPerc;
        let rightSize;
        let rightPerc;

        const bcRect = this.target().getBoundingClientRect();
        const gridRect: any = {};
        gridRect.top = bcRect.top;
        gridRect.left = bcRect.left;
        gridRect.bottom = bcRect.bottom;
        gridRect.right = bcRect.right;
        if (this.target() instanceof SVGElement) {
            gridRect.width = parseFloat(this.target().getAttribute("width"));
            gridRect.height = parseFloat(this.target().getAttribute("height"));
        } else {
            gridRect.width = bcRect.width;
            gridRect.height = bcRect.height;
        }
        if (this.sectionTypes().indexOf("top") !== -1) {
            topSize = this.topSize();
            topPerc = this.topPercentage();
            if (typeof (this._shrinkWrapBoxes["top"]) !== "undefined") {
                topSize = this._shrinkWrapBoxes["top"].height + this.gutter();
                topPerc = 0;
            }
        }
        if (this.sectionTypes().indexOf("bottom") !== -1) {
            bottomSize = this.bottomSize();
            bottomPerc = this.bottomPercentage();
            if (typeof (this._shrinkWrapBoxes["bottom"]) !== "undefined") {
                bottomSize = this._shrinkWrapBoxes["bottom"].height + this.gutter();
                bottomPerc = 0;
            }
        }
        if (this.sectionTypes().indexOf("left") !== -1) {
            leftSize = this.leftSize();
            leftPerc = this.leftPercentage();
            if (typeof (this._shrinkWrapBoxes["left"]) !== "undefined") {
                leftSize = this._shrinkWrapBoxes["left"].width + this.gutter();
                leftPerc = 0;
            }
        }
        if (this.sectionTypes().indexOf("right") !== -1) {
            rightSize = this.rightSize();
            rightPerc = this.rightPercentage();
            if (typeof (this._shrinkWrapBoxes["right"]) !== "undefined") {
                rightSize = this._shrinkWrapBoxes["right"].width + this.gutter();
                rightPerc = 0;
            }
        }

        t = _sectionPlacementObject({
            width: { "px": 0, "%": 100 },
            height: { "px": topSize, "%": topPerc },
            top: { "px": 0, "%": 0 },
            left: { "px": 0, "%": 0 }
        });
        b = _sectionPlacementObject({
            width: { "px": 0, "%": 100 },
            height: { "px": bottomSize, "%": bottomPerc },
            top: { "px": 0, "%": 100 },
            left: { "px": 0, "%": 0 }
        });
        b.top -= b.height;
        l = _sectionPlacementObject({
            width: { "px": leftSize, "%": leftPerc },
            height: { "px": -t.height - b.height, "%": 100 },
            top: { "px": t.height, "%": 0 },
            left: { "px": 0, "%": 0 }
        });
        r = _sectionPlacementObject({
            width: { "px": rightSize, "%": rightPerc },
            height: { "px": -t.height - b.height, "%": 100 },
            top: { "px": t.height, "%": 0 },
            left: { "px": 0, "%": 100 }
        });
        r.left -= r.width;
        c = _sectionPlacementObject({
            width: { "px": -r.width - l.width, "%": 100 },
            height: { "px": -t.height - b.height, "%": 100 },
            top: { "px": t.height, "%": 0 },
            left: { "px": l.width, "%": 0 }
        });
        retObj["top"] = t;
        retObj["bottom"] = b;
        retObj["right"] = r;
        retObj["left"] = l;
        retObj["center"] = c;
        return retObj;

        function _sectionPlacementObject(obj) {
            obj.width["px"] = typeof (obj.width["px"]) !== "undefined" ? obj.width["px"] : 0;
            obj.width["%"] = typeof (obj.width["%"]) !== "undefined" ? obj.width["%"] : 0;
            obj.height["px"] = typeof (obj.height["px"]) !== "undefined" ? obj.height["px"] : 0;
            obj.height["%"] = typeof (obj.height["%"]) !== "undefined" ? obj.height["%"] : 0;
            const ret = {
                width: obj.width["px"] + (obj.width["%"] / 100 * context.width()),
                height: obj.height["px"] + (obj.height["%"] / 100 * context.height()),
                top: obj.top["px"] + (obj.top["%"] / 100 * context.height()) + context.gutter() / 2,
                left: obj.left["px"] + (obj.left["%"] / 100 * context.width()) + context.gutter() / 2
            };
            return ret;
        }
    }

    clearContent(sectionType) {
        if (!sectionType) {
            this.content().forEach(function (contentWidget) {
                contentWidget.target(null);
                return false;
            });
            d3Select("#" + this.id() + " > div.borderHandle")
                .classed("borderHandleDisabled", true)
                ;
            delete this._watch;
            this.content([]);
            this.sectionTypes([]);
        } else {
            const idx = this.sectionTypes().indexOf(sectionType);
            if (idx >= 0) {
                if (this._watch && this.content()[idx]) {
                    delete this._watch[this.content()[idx].id()];
                }
                this.content()[idx].target(null);
                d3Select("#" + this.id() + " > div.borderHandle_" + sectionType)
                    .classed("borderHandleDisabled", true)
                    ;
                this.content().splice(idx, 1);
                this.sectionTypes().splice(idx, 1);
            }
        }
    }

    hasContent(sectionType, widget, title) {
        return this.sectionTypes().indexOf(sectionType) >= 0;
    }

    setContent(sectionType, widget, title?) {
        this.clearContent(sectionType);
        title = typeof (title) !== "undefined" ? title : "";
        if (widget) {
            const cell = new Cell()
                .surfaceBorderWidth(0)
                .widget(widget)
                .title(title)
                ;
            this.watchWidget(widget);
            this.content().push(cell);
            this.sectionTypes().push(sectionType);
        }
        return this;
    }

    getCell(id) {
        const idx = this.sectionTypes().indexOf(id);
        if (idx >= 0) {
            return this.content()[idx];
        }
        return null;
    }

    getContent(id) {
        const idx = this.sectionTypes().indexOf(id);
        if (idx >= 0) {
            return this.content()[idx].widget();
        }
        return null;
    }

    setLayoutOffsets() {
        this._offsetX = this._element.node().getBoundingClientRect().left + (this.gutter() / 2);
        this._offsetY = this._element.node().getBoundingClientRect().top + (this.gutter() / 2);
    }

    dragStart(handle) {
        d3Event.sourceEvent.stopPropagation();
        const context = this;

        this._dragCell = handle;
        this._dragCellStartSize = this[handle + "Size"]();

        if (this[handle + "ShrinkWrap"]()) {
            this[handle + "Percentage"](0);
            this[handle + "ShrinkWrap"](false);
        }

        const handleElm = d3Select("#" + context.id() + " > div.borderHandle_" + handle);
        context._handleTop = parseFloat(handleElm.style("top").split("px")[0]);
        context._handleLeft = parseFloat(handleElm.style("left").split("px")[0]);

        this._dragPrevX = d3Event.sourceEvent.clientX;
        this._dragPrevY = d3Event.sourceEvent.clientY;
    }
    dragTick(handle) {
        const context = this;

        const xDelta = this._dragPrevX - d3Event.sourceEvent.clientX;
        const yDelta = this._dragPrevY - d3Event.sourceEvent.clientY;

        switch (handle) {
            case "top":
            case "bottom":
                _moveHandles(handle, yDelta);
                break;
            case "right":
            case "left":
                _moveHandles(handle, xDelta);
                break;
        }

        function _moveHandles(handle2, delta) {
            if (delta === 0) return;
            const handles = d3SelectAll("#" + context.id() + " > div.borderHandle");
            const grabbedHandle = d3Select("#" + context.id() + " > div.borderHandle_" + handle2);

            if (grabbedHandle.classed("borderHandle_top")) {
                grabbedHandle.style("top", (context._handleTop - delta) + "px");
                context._cellSizes.topHeight = context._handleTop - delta;
                context._cellSizes.leftHeight = context._cellSizes.height;
                context._cellSizes.leftHeight -= context._cellSizes.topHeight;
                context._cellSizes.leftHeight -= context._cellSizes.bottomHeight;
                context._cellSizes.rightHeight = context._cellSizes.leftHeight;
            } else if (grabbedHandle.classed("borderHandle_right")) {
                grabbedHandle.style("left", (context._handleLeft - delta) + "px");
                context._cellSizes.rightWidth = context._cellSizes.width - context._handleLeft + delta;
            } else if (grabbedHandle.classed("borderHandle_bottom")) {
                grabbedHandle.style("top", (context._handleTop - delta) + "px");
                context._cellSizes.bottomHeight = context._cellSizes.height - context._handleTop + delta;
                context._cellSizes.leftHeight = context._cellSizes.height;
                context._cellSizes.leftHeight -= context._cellSizes.bottomHeight;
                context._cellSizes.leftHeight -= context._cellSizes.topHeight;
                context._cellSizes.rightHeight = context._cellSizes.leftHeight;
            } else if (grabbedHandle.classed("borderHandle_left")) {
                grabbedHandle.style("left", (context._handleLeft - delta) + "px");
                context._cellSizes.leftWidth = context._handleLeft - delta;
            }

            handles.each(function () {
                const handle3 = d3Select(this);
                if (handle3.classed("borderHandle_top")) {
                    handle3.style("width", context._cellSizes.width + "px");
                    handle3.style("top", (context._cellSizes.topHeight - 3) + "px");
                } else if (handle3.classed("borderHandle_right")) {
                    handle3.style("left", (context._cellSizes.width - context._cellSizes.rightWidth) + "px");
                    handle3.style("top", (context._cellSizes.topHeight + 3) + "px");
                    handle3.style("height", context._cellSizes.rightHeight + "px");
                } else if (handle3.classed("borderHandle_bottom")) {
                    handle3.style("width", context._cellSizes.width + "px");
                    handle3.style("top", (context._cellSizes.height - context._cellSizes.bottomHeight - 3) + "px");
                } else if (handle3.classed("borderHandle_left")) {
                    handle3.style("left", context._cellSizes.leftWidth + "px");
                    handle3.style("height", context._cellSizes.leftHeight + "px");
                    handle3.style("top", (context._cellSizes.topHeight + 3) + "px");
                }
            });
        }
    }
    dragEnd(handle) {
        if (handle) {
            const xDelta = this._dragPrevX - d3Event.sourceEvent.clientX;
            const yDelta = this._dragPrevY - d3Event.sourceEvent.clientY;

            switch (handle) {
                case "top":
                    if (yDelta !== 0) {
                        this.topPercentage(0);
                        this.topSize(this.topSize() === 0 ? this.getContent("top").getBBox().height - yDelta : this.topSize() - yDelta);
                    }
                    break;
                case "right":
                    if (xDelta !== 0) {
                        this.rightPercentage(0);
                        this.rightSize(this.rightSize() === 0 ? this.getContent("right").getBBox().width + xDelta : this.rightSize() + xDelta);
                    }
                    break;
                case "bottom":
                    if (yDelta !== 0) {
                        this.bottomPercentage(0);
                        this.bottomSize(this.bottomSize() === 0 ? this.getContent("bottom").getBBox().height + yDelta : this.bottomSize() + yDelta);
                    }
                    break;
                case "left":
                    if (xDelta !== 0) {
                        this.leftPercentage(0);
                        this.leftSize(this.leftSize() === 0 ? this.getContent("left").getBBox().width - xDelta : this.leftSize() - xDelta);
                    }
                    break;
            }

            this._dragPrevX = d3Event.sourceEvent.clientX;
            this._dragPrevY = d3Event.sourceEvent.clientY;
        }
        this.render();
    }

    size(_?) {
        const retVal = HTMLWidget.prototype.size.apply(this, arguments);
        if (arguments.length && this.contentDiv) {
            this.contentDiv
                .style("width", this._size.width + "px")
                .style("height", this._size.height + "px")
                ;
        }
        return retVal;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        const context = this;
        element.style("position", "relative");
        this.contentDiv = element.append("div").classed("border-content", true);
        this._scrollBarWidth = Platform.getScrollbarWidth();
        this._borderHandles = ["top", "left", "right", "bottom"];

        const handles = element.selectAll("div.borderHandle").data(this._borderHandles);
        handles.enter().append("div")
            .classed("borderHandle", true)
            .each(function (handle) {
                const h = d3Select(this);
                h.classed("borderHandle_" + handle, true)
                    .classed("borderHandleDisabled", context.getContent(handle) === null)
                    ;
            });
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._sectionTypeArr = this.sectionTypes();
        const context = this;

        element.classed("design-mode", this.designMode());

        this.setLayoutOffsets();

        const rows = this.contentDiv.selectAll(".cell_" + this._id).data(this.content(), function (d) { return d._id; });
        const rowsUpdate = rows.enter().append("div")
            .classed("cell_" + this._id, true)
            .style("position", "absolute")
            .each(function (d, i) {
                d3Select(this).classed("border-cell border-cell-" + context._sectionTypeArr[i], true);
                d.target(this);
                d3Select("#" + context.id() + " > div.borderHandle_" + context._sectionTypeArr[i])
                    .classed("borderHandleDisabled", false);
            }).merge(rows);
        rowsUpdate
            .each(function (d, idx) {
                const sectionType = context.sectionTypes()[idx];
                if (typeof (context[sectionType + "ShrinkWrap"]) !== "undefined" && context[sectionType + "ShrinkWrap"]()) {
                    d.render();
                    context._shrinkWrapBoxes[sectionType] = d.widget().getBBox(true);
                } else {
                    delete context._shrinkWrapBoxes[sectionType];
                }
            });

        const drag = d3Drag()
            .on("start", function (d, i) { context.dragStart.call(context, d, i); })
            .on("drag", function (d, i) { context.dragTick.call(context, d, i); })
            .on("end", function (d, i) { context.dragEnd.call(context, d, i); })
            ;
        if (this.designMode()) {
            element.selectAll("#" + this.id() + " > div.borderHandle").call(drag);
        } else {
            element.selectAll("#" + this.id() + " > div.borderHandle").on(".drag", null);
        }

        const layoutObj = this.borderLayoutObject();
        this.content().forEach(function (cell, i) {
            cell._fixedLeft = layoutObj[this.sectionTypes()[i]].left;
            cell._fixedTop = layoutObj[this.sectionTypes()[i]].top;
            cell._fixedWidth = layoutObj[this.sectionTypes()[i]].width;
            cell._fixedHeight = layoutObj[this.sectionTypes()[i]].height;
            cell._dragHandles = [];
        }, this);

        rowsUpdate
            .style("left", function (d) { return d._fixedLeft + "px"; })
            .style("top", function (d) { return d._fixedTop + "px"; })
            .style("width", function (d) { return d._fixedWidth - context.gutter() + "px"; })
            .style("height", function (d) { return d._fixedHeight - context.gutter() + "px"; })
            .each(function (d) {
                d._parentElement
                    .attr("draggable", context.designMode())
                    .selectAll(".dragHandle")
                    .attr("draggable", context.designMode())
                    ;
                d
                    .surfacePadding(context.surfacePadding())
                    .resize()
                    ;
            });
        rows.exit().each(function (d) {
            d.target(null);
        }).remove();

        this.getCellSizes();

        element
            .selectAll("#" + this.id() + " > div.borderHandle")
            .each(function () {
                const handle = d3Select(this);
                if (handle.classed("borderHandle_top")) {
                    handle.style("width", context._cellSizes.width + "px");
                    handle.style("top", (context._cellSizes.topHeight - 3) + "px");
                } else if (handle.classed("borderHandle_right")) {
                    handle.style("left", (context._cellSizes.width - context._cellSizes.rightWidth) + "px");
                    handle.style("top", (context._cellSizes.topHeight + 3) + "px");
                    handle.style("height", context._cellSizes.rightHeight + "px");
                } else if (handle.classed("borderHandle_bottom")) {
                    handle.style("width", context._cellSizes.width + "px");
                    handle.style("top", (context._cellSizes.height - context._cellSizes.bottomHeight - 3) + "px");
                } else if (handle.classed("borderHandle_left")) {
                    handle.style("left", context._cellSizes.leftWidth + "px");
                    handle.style("height", context._cellSizes.leftHeight + "px");
                    handle.style("top", (context._cellSizes.topHeight + 3) + "px");
                }

            })
            ;
    }

    getCellSizes() {
        const context = this;
        context._cellSizes = {};
        const contentRect = this.element().node().getBoundingClientRect();
        context._cellSizes.width = contentRect.width;
        context._cellSizes.height = contentRect.height;
        this.element()
            .selectAll("#" + this.id() + " > div > div.border-cell")
            .each(function () {
                const cell = d3Select(this);
                if (typeof cell.node === "function") {
                    const rect = cell.node().getBoundingClientRect();
                    if (cell.classed("border-cell-top")) {
                        context._cellSizes.topHeight = rect.height;
                    } else if (cell.classed("border-cell-left")) {
                        context._cellSizes.leftWidth = rect.width;
                        context._cellSizes.leftHeight = rect.height;
                    } else if (cell.classed("border-cell-right")) {
                        context._cellSizes.rightWidth = rect.width;
                        context._cellSizes.rightHeight = rect.height;
                    } else if (cell.classed("border-cell-bottom")) {
                        context._cellSizes.bottomHeight = rect.height;
                    }
                }
            });
        const sizes = ["height", "width", "topHeight", "bottomHeight", "leftHeight", "rightHeight", "leftWidth", "rightWidth"];
        sizes.forEach(function (size) {
            context._cellSizes[size] = context._cellSizes[size] === undefined ? 0 : context._cellSizes[size];
        });
    }

    postUpdate(domNode, element) {
        const context = this;
        this.content().forEach(function (n) {
            if (n._element.node() !== null) {
                const prevBox = n.widget().getBBox(false, true);
                const currBox = n.widget().getBBox(true, true);
                if (prevBox.width !== currBox.width || prevBox.height !== currBox.height) {
                    context.lazyRender();
                }
            }
        });
    }

    exit(domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    }

    designMode: { (): boolean; (_: boolean): Border; };

    content: { (): any[]; (_: any[]): Border; };

    gutter: { (): number; (_: number): Border; };

    topShrinkWrap: { (): boolean; (_: boolean): Border; };
    leftShrinkWrap: { (): boolean; (_: boolean): Border; };
    rightShrinkWrap: { (): boolean; (_: boolean): Border; };
    bottomShrinkWrap: { (): boolean; (_: boolean): Border; };

    topSize: { (): number; (_: number): Border; };
    leftSize: { (): number; (_: number): Border; };
    rightSize: { (): number; (_: number): Border; };
    bottomSize: { (): number; (_: number): Border; };

    topPercentage: { (): number; (_: number): Border; };
    leftPercentage: { (): number; (_: number): Border; };
    rightPercentage: { (): number; (_: number): Border; };
    bottomPercentage: { (): number; (_: number): Border; };

    surfacePadding: { (): number; (_: number): Border; };

    sectionTypes: { (): any[]; (_: any[]): Border; };
}
Border.prototype._class += " layout_Border";

Border.prototype.publish("designMode", false, "boolean", "Design Mode", null, { tags: ["Basic"] });

Border.prototype.publish("content", [], "widgetArray", "widgets", null, { tags: ["Intermediate"] });

Border.prototype.publish("gutter", 0, "number", "Gap Between Widgets", null, { tags: ["Basic"] });

Border.prototype.publish("topShrinkWrap", false, "boolean", "'Top' Cell shrinks to fit content", null, { tags: ["Intermediate"] });
Border.prototype.publish("leftShrinkWrap", false, "boolean", "'Left' Cell shrinks to fit content", null, { tags: ["Intermediate"] });
Border.prototype.publish("rightShrinkWrap", false, "boolean", "'Right' Cell shrinks to fit content", null, { tags: ["Intermediate"] });
Border.prototype.publish("bottomShrinkWrap", false, "boolean", "'Bottom' Cell shrinks to fit content", null, { tags: ["Intermediate"] });

Border.prototype.publish("topSize", 0, "number", "Height of the 'Top' Cell (px)", null, { tags: ["Private"] });
Border.prototype.publish("leftSize", 0, "number", "Width of the 'Left' Cell (px)", null, { tags: ["Private"] });
Border.prototype.publish("rightSize", 0, "number", "Width of the 'Right' Cell (px)", null, { tags: ["Private"] });
Border.prototype.publish("bottomSize", 0, "number", "Height of the 'Bottom' Cell (px)", null, { tags: ["Private"] });

Border.prototype.publish("topPercentage", 20, "number", "Percentage (of parent) Height of the 'Top' Cell", null, { tags: ["Private"] });
Border.prototype.publish("leftPercentage", 20, "number", "Percentage (of parent) Width of the 'Left' Cell", null, { tags: ["Private"] });
Border.prototype.publish("rightPercentage", 20, "number", "Percentage (of parent) Width of the 'Right' Cell", null, { tags: ["Private"] });
Border.prototype.publish("bottomPercentage", 20, "number", "Percentage (of parent) Height of the 'Bottom' Cell", null, { tags: ["Private"] });

Border.prototype.publish("surfacePadding", 0, "number", "Cell Padding (px)", null, { tags: ["Intermediate"] });

Border.prototype.publish("sectionTypes", [], "array", "Section Types sharing an index with 'content' - Used to determine position/size.", null, { tags: ["Private"] });
