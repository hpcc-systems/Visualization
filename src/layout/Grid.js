"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "./Cell", "../common/Text", "../chart/Pie", "../chart/MultiChart", "../c3chart/Line", "css!./Grid"], factory);
    } else {
        root.layout_Grid = factory(root.common_HTMLWidget, root.layout_Cell, root.common_Text, root.chart_Pie, root.chart_MultiChart, root.c3chart_Line);
    }
}(this, function (HTMLWidget, Cell, Text, Pie, MultiChart, Line) {
    function Grid() {
        HTMLWidget.call(this);
        this._class = "layout_Grid";

        this._tag = "div";

        this.content([]);
    };
    Grid.prototype = Object.create(HTMLWidget.prototype);

    Grid.prototype.publish("designMode", false, "boolean", "Design Mode");
    Grid.prototype.publish("gutter", 4, "number", "Gap Between Widgets");
    Grid.prototype.publish("fitTo", "all", "set", "Sizing Strategy", ["all", "width"]);
    Grid.prototype.publish("content", [], "widgetArray", "widgets");

    Grid.prototype.testData = function () {
        this.setContent(0, 0, new Pie().testData());
        this.setContent(0, 1, new Pie().testData());
        this.setContent(1, 0, new Pie().testData());
        this.setContent(1, 1, new Pie().testData());
        this.setContent(0, 2, new MultiChart().testData(), "Title AAA", 2, 2);
        this.setContent(2, 0, new Line().testData(), "Title BBB", 2, 4);
        return this;
    };

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

    Grid.prototype.clearContent = function () {
        this.content(this.content().filter(function (contentWidget) {
            contentWidget.target(null);
            return false;
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
            return cell;
        }
        return null;
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
    }

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

    Grid.prototype.selectOverElement = function (row, col, _this) {
        if (this._dragCell._dragHandle) {
            if (row === this._dragCell.gridRow() + this._dragCell.gridRowSpan() - 1 && col === this._dragCell.gridCol() + this._dragCell.gridColSpan() - 1) {
            } else if (row >= this._dragCell.gridRow() && col >= this._dragCell.gridCol()) {
                return d3.select(_this);
            }
        } else {
            var cell = this.getCell(row, col);
            if (cell && cell === this._dragCell && cell.gridRow() === row && cell.gridCol() === col) {
            } else if (cell && cell !== this._dragCell) {
                return cell._element;
            } else {
                return d3.select(_this);
            }
        }
        return d3.select(null);
    };
    
    Grid.prototype.childMoved = Grid.prototype.debounce(function (domNode, element) {
        this.render();
    }, 250);

    Grid.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("position", "relative");
        this.dropDiv = element.append("div");
        this.contentDiv = element.append("div");
        this._scrollBarWidth = this.getScrollbarWidth();
    };

    Grid.prototype.updateCells = function (cellWidth, cellHeight) {
        var context = this;
        var rows = this.contentDiv.selectAll(".cell_" + this._id).data(this.content(), function (d) { return d._id; });
        rows.enter().append("div")
            .attr("class", "cell_" + this._id)
            .style("position", "absolute")
            .on("dragstart", function (d) {
                d3.event.stopPropagation();
                context._dragCell = d;
                console.log("dragstart:  " + d._id);
                setTimeout(function () {
                    context.contentDiv.selectAll(".cell_" + context._id)
                        .classed("dragItem", function (d2) {
                            return d._id === d2._id;
                        }).classed("notDragItem", function (d2) {
                            return d._id !== d2._id;
                        })
                    ;
                }, 0);
            })
            .on("dragend", function (targetElement) {
                d3.event.stopPropagation();
                setTimeout(function () {
                    context.contentDiv.selectAll(".cell_" + context._id)
                        .classed("dragItem", false)
                        .classed("notDragItem", false)
                    ;
                }, 0);

                context._dragCell = null;
            })
            .each(function (d) {
                d
                   .target(this)
                ;
                d.__grid_watch = d.watch(function (key, newVal, oldVal) {
                    if (context._renderCount && key.indexOf("grid") === 0 && newVal !== oldVal) {
                        context.childMoved();
                    }
                });
            })
        ;
        rows
            .style("left", function (d) { return d.gridCol() * cellWidth + context.gutter() / 2 + "px"; })
            .style("top", function (d) { return d.gridRow() * cellHeight + context.gutter() / 2 + "px"; })
            .style("width", function (d) { return d.gridColSpan() * cellWidth - context.gutter() + "px"; })
            .style("height", function (d) { return d.gridRowSpan() * cellHeight - context.gutter() + "px"; })
            .each(function (d) {
                d._parentElement
                    .attr("draggable", context.designMode())
                    .selectAll(".dragHandle")
                        .attr("draggable", context.designMode())
                ;

                d
                    .scale(context.designMode() ? 0.75 : 0)
                    .resize()
                ;
            })
        ;
        rows.exit().each(function (d) {
            d
               .target(null)
            ;
            if (d.__grid_watch) {
                d.__grid_watch.remove();
            }
        }).remove();
    };

    Grid.prototype.updateDropCells = function (dimensions, cellWidth, cellHeight) {
        var dropCells = [];
        if (this.designMode()) {
            for (var rowIdx = 0; rowIdx < dimensions.height; ++rowIdx) {
                for (var colIdx = 0; colIdx < dimensions.width; ++colIdx) {
                    dropCells.push({ x: colIdx, y: rowIdx });
                }
            }
        }
        var dropRows = this.dropDiv.selectAll(".dropCell_" + this._id).data(dropCells);
        dropRows.enter().append("div")
            .attr("class", "dropCell dropCell_" + this._id)
            .on("dragover", function (targetElement) {
                d3.event.stopPropagation();
                console.log("dragover:  " + (context._dragCell ? context._dragCell._id : "") + " - " + targetElement.x + ", " + targetElement.y + " - " + context._dragCell._dragHandle);
                var overSelection = context.selectOverElement(targetElement.y, targetElement.x, this);
                if (overSelection.empty()) {
                    d3.event.dataTransfer.dropEffect = "none";
                } else {
                    d3.event.dataTransfer.dropEffect = "move";
                    d3.event.preventDefault();
                }
            })
            .on("dragenter", function (targetElement) {
                d3.event.stopPropagation();
                console.log("dragenter:  " + (context._dragCell ? context._dragCell._id : "") + " - " + targetElement.x + ", " + targetElement.y + " - " + context._dragCell._dragHandle);
                var overSelection = context.selectOverElement(targetElement.y, targetElement.x, this)
                    .classed("over", true)
                ;
            })
            .on("dragleave", function (targetElement) {
                d3.event.stopPropagation();
                console.log("dragleave:  " + (context._dragCell ? context._dragCell._id : "") + " - " + targetElement.x + ", " + targetElement.y + " - " + context._dragCell._dragHandle);
                var overSelection = context.selectOverElement(targetElement.y, targetElement.x, this)
                    .classed("over", false)
                ;
                d3.event.dataTransfer.dropEffect = overSelection.empty() ? "none" : "none";
            })
            .on("drop", function (targetElement) {
                d3.event.stopPropagation();
                console.log("drop:  " + (context._dragCell ? context._dragCell._id : "") + " - " + targetElement.x + ", " + targetElement.y + " - " + context._dragCell._dragHandle);
                var overSelection = context.selectOverElement(targetElement.y, targetElement.x, this)
                    .classed("over", false);
                ;
                if (overSelection.empty()) {
                    return;
                }
                if (context._dragCell._dragHandle) {
                    var col = targetElement.x;
                    var row = targetElement.y;
                    var colDelta = targetElement.x - context._dragCell.gridCol();
                    var rowDelta = targetElement.y - context._dragCell.gridRow();
                    var colSpanDelta = targetElement.x - (context._dragCell.gridCol() + context._dragCell.gridColSpan()) + 1;
                    var rowSpanDelta = targetElement.y - (context._dragCell.gridRow() + context._dragCell.gridRowSpan()) + 1;
                    switch (context._dragCell._dragHandle) {
                        case "nw":
                            context._dragCell.gridRow(row);
                            context._dragCell.gridRowSpan(context._dragCell.gridRowSpan() - rowDelta);
                            context._dragCell.gridCol(col);
                            context._dragCell.gridColSpan(context._dragCell.gridColSpan() - colDelta);
                            break;
                        case "n":
                            context._dragCell.gridRow(row);
                            context._dragCell.gridRowSpan(context._dragCell.gridRowSpan() - rowDelta);
                            break;
                        case "ne":
                            context._dragCell.gridRow(row);
                            context._dragCell.gridRowSpan(context._dragCell.gridRowSpan() - rowDelta);
                            context._dragCell.gridColSpan(context._dragCell.gridColSpan() + colSpanDelta);
                            break;
                        case "e":
                            context._dragCell.gridColSpan(context._dragCell.gridColSpan() + colSpanDelta);
                            break;
                        case "se":
                            context._dragCell.gridRowSpan(context._dragCell.gridRowSpan() + rowSpanDelta);
                            context._dragCell.gridColSpan(context._dragCell.gridColSpan() + colSpanDelta);
                            break;
                        case "s":
                            context._dragCell.gridRowSpan(context._dragCell.gridRowSpan() + rowSpanDelta);
                            break;
                        case "sw":
                            context._dragCell.gridCol(col);
                            context._dragCell.gridColSpan(context._dragCell.gridColSpan() - colDelta);
                            context._dragCell.gridRowSpan(context._dragCell.gridRowSpan() + rowSpanDelta);
                            break;
                        case "w":
                            context._dragCell.gridCol(col);
                            context._dragCell.gridColSpan(context._dragCell.gridColSpan() - colDelta);
                            break;
                    }
                    //console.log("span:  " + colSpan + ", " + rowSpan);
                } else {
                    var targetRow = targetElement.y;
                    var targetCol = targetElement.x;
                    var targetRowSpan = context._dragCell.gridRowSpan();
                    var targetColSpan = context._dragCell.gridColSpan();
                    var targetCell = context.getCell(targetElement.y, targetElement.x);
                    if (targetCell === context._dragCell) {
                        targetRowSpan = targetCell.gridRowSpan();
                        targetColSpan = targetCell.gridColSpan();
                        targetCell = null;
                    }
                    if (targetCell) {
                        targetRow = targetCell.gridRow();
                        targetCol = targetCell.gridCol();
                        targetRowSpan = targetCell.gridRowSpan();
                        targetColSpan = targetCell.gridColSpan();
                        targetCell
                            .gridCol(context._dragCell.gridCol())
                            .gridColSpan(context._dragCell.gridColSpan())
                            .gridRow(context._dragCell.gridRow())
                            .gridRowSpan(context._dragCell.gridRowSpan())
                        ;
                    }
                    context._dragCell
                        .gridCol(targetCol)
                        .gridRow(targetRow)
                        .gridColSpan(targetColSpan)
                        .gridRowSpan(targetRowSpan)
                    ;
                }
            })
        ;
        var context = this;
        dropRows
            .style("position", "absolute")
            .style("left", function (d) { return d.x * cellWidth + context.gutter() / 2 + "px"; })
            .style("top", function (d) { return d.y * cellHeight + context.gutter() / 2 + "px"; })
            .style("width", function (d) { return 1 * cellWidth - context.gutter() + "px"; })
            .style("height", function (d) { return 1 * cellHeight - context.gutter() + "px"; })
        ;
        dropRows.exit().remove();
    };

    Grid.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._parentElement.style("overflow-x", this.fitTo() === "width" ? "hidden" : null);
        this._parentElement.style("overflow-y", this.fitTo() === "width" ? "scroll" : null);
        var dimensions = this.getDimensions();
        if (this.designMode()) {
            dimensions.width++;
            dimensions.height++;
        }
        var cellWidth = (this.width() - (this.fitTo() === "width" ? this._scrollBarWidth : 0)) / dimensions.width;
        var cellHeight = this.fitTo() === "all" ? this.height() / dimensions.height : cellWidth;

        this.updateCells(cellWidth, cellHeight);
        this.updateDropCells(dimensions, cellWidth, cellHeight);
    };

    Grid.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Grid.prototype.render = function (callback) {
        var context = this;
        HTMLWidget.prototype.render.call(this, function (widget) {
            if (context.content().length) {
                var renderCount = context.content().length;
                context.content().forEach(function (contentWidget, idx) {
                    setTimeout(function () {
                        contentWidget.render(function () {
                            if (--renderCount === 0) {
                                if (callback) {
                                    callback(widget);
                                }
                            }
                        });
                    }, 0);
                });
            } else {
                if (callback) {
                    callback(widget);
                }
            }
        });
        return this;
    }

    return Grid;
}));
