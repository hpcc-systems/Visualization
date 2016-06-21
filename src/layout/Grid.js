"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "grid-list", "../common/HTMLWidget", "./Cell", "../common/TextBox", "../common/Utility", "css!./Grid"], factory);
    } else {
        root.layout_Grid = factory(root.d3, root.GridList, root.common_HTMLWidget, root.layout_Cell, root.common_TextBox, root.common_Utility);
    }
}(this, function (d3, GridList, HTMLWidget, Cell, TextBox, Utility) {

    function Grid() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._selectionBag = new Utility.Selection();

        this.content([]);
    }
    Grid.prototype = Object.create(HTMLWidget.prototype);
    Grid.prototype.constructor = Grid;
    Grid.prototype._class += " layout_Grid";

    Grid.prototype.publish("designMode", false, "boolean", "Design Mode", null, { tags: ["Basic"] });
    Grid.prototype.publish("fitTo", "all", "set", "Sizing Strategy", ["all", "width"], { tags: ["Basic"] });
    Grid.prototype.publish("snapping", "vertical", "set", "Snapping Strategy", ["vertical", "horizontal"]);
    Grid.prototype.publish("snappingLanes", 12, "number", "Snapping Lanes");

    Grid.prototype.publish("gutter", 6, "number", "Gap Between Widgets", null, { tags: ["Basic"] });

    Grid.prototype.publish("surfaceShadow", true, "boolean", "3D Shadow");
    Grid.prototype.publish("surfacePadding", null, "string", "Cell Padding (px)", null, { tags: ["Intermediate"] });
    Grid.prototype.publish("surfaceBorderWidth", 1, "number", "Width (px) of Cell Border", null, { tags: ["Intermediate"] });
    Grid.prototype.publish("surfaceBackgroundColor", null, "html-color", "Surface Background Color", null, { tags: ["Advanced"] });

    Grid.prototype.publish("content", [], "widgetArray", "widgets", null, { tags: ["Basic"], render: false});

    Grid.prototype.getDimensions = function () {
        var size = { width: 0, height: 0 };
        this.content().forEach(function (cell) {
            if (size.width < cell.gridCol() + cell.gridColSpan()) {
                size.width = cell.gridCol() + cell.gridColSpan();
            }
            if (size.height < cell.gridRow() + cell.gridRowSpan()) {
                size.height = cell.gridRow() + cell.gridRowSpan();
            }
        }, this);
        return size;
    };

    Grid.prototype.clearContent = function (widget) {
        this.content(this.content().filter(function (contentWidget) {
            if (!widget) {
                contentWidget.target(null);
                return false;
            }
            var w = contentWidget;
            while (w) {
                if (widget === w) {
                    contentWidget.target(null);
                    return false;
                }
                w = w.widget ? w.widget() : null;
            }
            return true;
        }));
    };

    Grid.prototype.setContent = function (row, col, widget, title, rowSpan, colSpan) {
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
            var cell = new Cell()
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
    };

    Grid.prototype.sortedContent = function () {
        return this.content().sort(function (l, r) {
            if (l.gridRow() === r.gridRow()) {
                return l.gridCol() - r.gridCol();
            }
            return l.gridRow() - r.gridRow();
        });
    };

    Grid.prototype.getCell = function (row, col) {
        var retVal = null;
        this.content().some(function (cell) {
            if (row >= cell.gridRow() && row < cell.gridRow() + cell.gridRowSpan() &&
                col >= cell.gridCol() && col < cell.gridCol() + cell.gridColSpan()) {
                retVal = cell;
                return true;
            }
            return false;
        });
        return retVal;
    };

    Grid.prototype.getWidgetCell = function (id) {
        var retVal = null;
        this.content().some(function (cell) {
            if (cell.widget()._id === id) {
                retVal = cell;
                return true;
            }
            return false;
        });
        return retVal;
    };

    Grid.prototype.getContent = function (id) {
        var retVal = null;
        this.content().some(function (cell) {
            if (cell.widget()._id === id) {
                retVal = cell.widget();
                return true;
            }
            return false;
        });
        return retVal;
    };

    Grid.prototype.cellToGridItem = function(cell) {
        return {
            x: cell.gridCol(),
            y: cell.gridRow(),
            w: cell.gridColSpan(),
            h: cell.gridRowSpan(),
            id: cell.id(),
            cell: cell
        };
    };

    Grid.prototype.gridItemToCell = function (item) {
        item.cell
            .gridCol(item.x)
            .gridRow(item.y)
            .gridColSpan(item.w)
            .gridRowSpan(item.h)
        ;
    };

    Grid.prototype.initGridList = function () {
        this.itemsMap = {};
        this.items = this.content().map(function (cell) {
            var retVal = this.cellToGridItem(cell);
            this.itemsMap[retVal.id] = retVal;
            return retVal;
        }, this);
        this.gridList = new GridList(this.items, {
            direction: this.snapping(),
            lanes: this.snappingLanes()
        });
    };

    Grid.prototype.killGridList = function () {
        this.gridList = null;
        delete this.items;
        delete this.itemsMap;
    };

    Grid.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        this._scrollBarWidth = this.getScrollbarWidth();

        var context = this;
        this._d3Drag = d3.behavior.drag()
            .origin(function (_d) {
                var d = context.cellToGridItem(_d);
                return { x: d.x * context.cellWidth, y: d.y * context.cellHeight };
            })
            .on("dragstart", function (_d) {
                if (!context.designMode()) return;
                d3.event.sourceEvent.stopPropagation();
                context.initGridList();
                var d = context.itemsMap[_d.id()];
                context.dragItem = element.append("div")
                    .attr("class", "dragging")
                    .style("transform", function () { return "translate(" + d.x * context.cellWidth + "px, " + d.y * context.cellHeight + "px)"; })
                    .style("width", function () { return d.w * context.cellWidth - context.gutter() + "px"; })
                    .style("height", function () { return d.h * context.cellHeight - context.gutter() + "px"; })
                ;
                context.selectionBagClick(_d);
            })
            .on("drag", function (_d) {
                if (!context.designMode()) return;
                d3.event.sourceEvent.stopPropagation();
                var d = context.itemsMap[_d.id()];
                var pos = [Math.max(0, Math.floor((d3.event.x + context.cellWidth / 2) / context.cellWidth)), Math.max(0, Math.floor((d3.event.y + context.cellHeight / 2) / context.cellHeight))];
                if (pos[0] + d.w > context.snappingLanes()) {
                    pos[0] = d.w - context.snappingLanes();
                }
                if (pos[1] + d.h > context.snappingLanes()) {
                    pos[1] = d.h - context.snappingLanes();
                }
                if (d.x !== pos[0] || d.y !== pos[1]) {
                    context.gridList.moveItemToPosition(d, pos);
                    context.items.forEach(context.gridItemToCell);
                    context.updateGrid(false, 100);
                }
                context.dragItem
                    .style("transform", function () { return "translate(" + d3.event.x + "px, " + d3.event.y + "px)"; })
                    .style("width", function () { return d.w * context.cellWidth + "px"; })
                    .style("height", function () { return d.h * context.cellHeight + "px"; })
                ;
            })
            .on("dragend", function () {
                if (!context.designMode()) return;
                d3.event.sourceEvent.stopPropagation();
                context.dragItem.remove();
                context.dragItem = null;
                context.killGridList();
            })
        ;

        this._d3DragResize = d3.behavior.drag()
            .origin(function (_d) {
                var d = context.cellToGridItem(_d);
                return { x: (d.x + d.w - 1) * context.cellWidth, y: (d.y + d.h - 1) * context.cellHeight };
            })
            .on("dragstart", function (_d) {
                if (!context.designMode()) return;
                d3.event.sourceEvent.stopPropagation();
                context.initGridList();
                var d = context.itemsMap[_d.id()];
                context.dragItem = element.append("div")
                    .attr("class", "resizing")
                    .style("transform", function () { return "translate(" + d.x * context.cellWidth + "px, " + d.y * context.cellHeight + "px)"; })
                    .style("width", function () { return d.w * context.cellWidth - context.gutter() + "px"; })
                    .style("height", function () { return d.h * context.cellHeight - context.gutter() + "px"; })
                ;
                context.dragItemPos = { x: d.x, y: d.y };
            })
            .on("drag", function (_d) {
                if (!context.designMode()) return;
                d3.event.sourceEvent.stopPropagation();
                var d = context.itemsMap[_d.id()];
                var pos = [Math.max(0, Math.round(d3.event.x / context.cellWidth)), Math.max(0, Math.round(d3.event.y / context.cellHeight))];
                var size = {
                    w: Math.max(1, pos[0] - d.x + 1),
                    h: Math.max(1, pos[1] - d.y + 1)
                };
                if (d.w !== size.w || d.h !== size.h) {
                    context.gridList.resizeItem(d, size);
                    context.items.forEach(context.gridItemToCell);
                    context.updateGrid(d.id, 100);
                }
                context.dragItem
                    .style("width", function () { return (-d.x + 1) * context.cellWidth + d3.event.x - context.gutter() + "px"; })
                    .style("height", function () { return (-d.y + 1) * context.cellHeight + d3.event.y - context.gutter() + "px"; })
                ;
            })
            .on("dragend", function () {
                if (!context.designMode()) return;
                d3.event.sourceEvent.stopPropagation();
                context.dragItem.remove();
                context.dragItem = null;
                context.killGridList();
            })
        ;
    };

    Grid.prototype.updateGrid = function (resize, transitionDuration, noRender) {
        transitionDuration = transitionDuration || 0;
        var context = this;
        this.divItems
            .classed("draggable", this.designMode())
            .transition().duration(transitionDuration)
            .style("left", function (d) { return d.gridCol() * context.cellWidth + context.gutter() / 2 + "px"; })
            .style("top", function (d) { return d.gridRow() * context.cellHeight + context.gutter() / 2 + "px"; })
            .style("width", function (d) { return d.gridColSpan() * context.cellWidth - context.gutter() + "px"; })
            .style("height", function (d) { return d.gridRowSpan() * context.cellHeight - context.gutter() + "px"; })
            .each("end", function (d) {
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
    };

    Grid.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var dimensions = this.getDimensions();
        var clientWidth = this.width() - (this.fitTo() === "width" ? this._scrollBarWidth : 0);
        this.cellWidth = clientWidth / dimensions.width;
        this.cellHeight = this.fitTo() === "all" ? this.height() / dimensions.height : this.cellWidth;
        if (this.designMode()) {
            var cellLaneRatio = dimensions.width / this.snappingLanes();
            var laneWidth = Math.floor(this.cellWidth * cellLaneRatio);
            this.cellWidth = laneWidth;
            this.cellHeight = this.cellWidth;
        }

        //  Grid  ---
        var context = this;
        this.divItems = element.selectAll("#" + this.id() + " > .ddCell").data(this.content(), function (d) { return d.id(); });
        this.divItems.enter().append("div")
            .attr("class", "ddCell")
            .call(this._d3Drag)
            .each(function (d) {
                d.target(this);
                d.__grid_watch = d.monitor(function (key, newVal, oldVal) {
                    if (context._renderCount && key.indexOf("grid") === 0 && newVal !== oldVal) {
                        if (!context.gridList) {
                            //  API Call  (only needed when not dragging) ---
                            context.initGridList();
                            context.gridList.resizeGrid(context.snappingLanes());
                            context.items.forEach(context.gridItemToCell);
                            context.updateGrid(d.id(), 100);
                            context.killGridList();
                        }
                    }
                });
                var element = d3.select(this);
                element.append("div")
                    .attr("class", "resizeHandle")
                    .call(context._d3DragResize)
                    .append("div")
                        .attr("class", "resizeHandleDisplay")
                ;
            })
        ;
        this.divItems.select(".resizeHandle")
            .style("display", this.designMode() ? null : "none")
        ;

        this.updateGrid(true);
        this.divItems.exit()
            .each(function (d) {
                d.target(null);
                if (d.__grid_watch) {
                    d.__grid_watch.remove();
                }
            })
            .remove()
        ;

        //  Snapping  ---
        var lanesBackground = element.selectAll("#" + this.id() + " > .laneBackground").data(this.designMode() ? [""] : []);
        lanesBackground.enter().insert("div", ":first-child")
            .attr("class", "laneBackground")
            .style("left", "1px")
            .style("top", "1px")
            .on("click", function () {
                context.selectionBagClear();
            })
        ;
        lanesBackground
            .style("width", (clientWidth + 10) + "px")
            .style("height", this.height() + "px")
        ;
        lanesBackground.exit()
            .each(function (d) {
                context.selectionBagClear();
            })
            .remove()
        ;

        var lanes = element.selectAll("#" + this.id() + " > .lane").data(this.designMode() ? [""] : []);
        lanes.enter().append("div")
            .attr("class", "lane")
            .style("left", "1px")
            .style("top", "1px")
        ;
        lanes
            .style("width", (clientWidth + 10) + "px")
            .style("height", this.height() + "px")
            .style("background-image", "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)")
            .style("background-size", this.cellWidth + "px " + this.cellHeight + "px")
        ;
        lanes.exit()
            .remove()
        ;
    };

    Grid.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Grid.prototype._createSelectionObject = function (d) {
        return {
            _id: d._id,
            element: function () {
                return d._element;
            },
            widget: d
        };
    };

    Grid.prototype.selection = function (_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) { return d._id; });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    };

    Grid.prototype.selectionBagClear = function () {
        if (!this._selectionBag.isEmpty()) {
            this._selectionBag.clear();
            this.postSelectionChange();
        }
    };

    Grid.prototype.selectionBagClick = function (d) {
        if (d !== null) {
            var selectionObj = this._createSelectionObject(d);
            if (d3.event.sourceEvent.ctrlKey) {
                if (this._selectionBag.isSelected(selectionObj)) {
                    this._selectionBag.remove(selectionObj);
                    this.postSelectionChange();
                } else {
                    this._selectionBag.append(selectionObj);
                    this.postSelectionChange();
                }
            } else {
                this._selectionBag.set([selectionObj]);
                this.postSelectionChange();
            }
        }
    };

    Grid.prototype.postSelectionChange = function () {
    };

    return Grid;
}));

