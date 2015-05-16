if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Surface.js',["d3", "../common/HTMLWidget", "../chart/MultiChart", "css!./Surface"], factory);
    } else {
        root.layout_Surface = factory(root.d3, root.common_HTMLWidget, root.chart_MultiChart);
    }
}(this, function (d3, HTMLWidget, MultiChart) {
    function Surface() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    Surface.prototype = Object.create(HTMLWidget.prototype);
    Surface.prototype._class = "layout_Surface";

    Surface.prototype.publish("padding", null, "number", "Surface Padding (px)",null,{tags:['Intermediate']});

    Surface.prototype.publish("titlePadding", null, "number", "Title Padding (px)",null,{tags:['Intermediate']});
    Surface.prototype.publish("titleFontSize", null, "string", "Title Font Size",null,{tags:['Basic']});
    Surface.prototype.publish("titleFontColor", null, "html-color", "Title Font Color",null,{tags:['Basic']});
    Surface.prototype.publish("titleFontFamily", null, "string", "Title Font Family",null,{tags:['Basic']});
    Surface.prototype.publish("titleFontBold", true, "boolean", "Enable Bold Title Font",null,{tags:['Intermediate']});
    Surface.prototype.publish("titleBackgroundColor", null, "html-color", "Title Background Color",null,{tags:['Basic']});

    Surface.prototype.publish("backgroundColor", null, "html-color", "Surface Background Color",null,{tags:['Basic']});

    Surface.prototype.publish("borderWidth", null, "string", "Surface Border Width",null,{tags:['Basic']});
    Surface.prototype.publish("borderColor", null, "html-color", "Surface Border Color",null,{tags:['Basic']});
    Surface.prototype.publish("borderRadius", null, "string", "Surface Border Radius",null,{tags:['Basic']});

    Surface.prototype.publish("title", "", "string", "Title",null,{tags:['Intermediate']});
    Surface.prototype.publish("titleAlignment", "center", "set", "Title Alignment", ["left","right","center"],{tags:['Intermediate']});
    Surface.prototype.publish("widget", null, "widget", "Widget",null,{tags:['Advanced']});

    Surface.prototype.testData = function () {
        this.title("ABC");
        this.widget(new Surface().widget(new MultiChart().testData()));
        return this;
    };

    Surface.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    Surface.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        element
            .style("border-width",this.borderWidth())
            .style("border-color",this.borderColor())
            .style("border-radius",this.borderRadius())
            .style("background-color",this.backgroundColor());

        var titles = element.selectAll(".surfaceTitle").data(this.title() ? [this.title()] : []);
        titles.enter().insert("h3", "div")
            .attr("class", "surfaceTitle")
        ;
        titles
            .text(function (d) { return d; })
            .style("text-align",this.titleAlignment())
            .style("color",this.titleFontColor())
            .style("font-size",this.titleFontSize())
            .style("font-family",this.titleFontFamily())
            .style("font-weight",this.titleFontBold() ? "bold" : "normal")
            .style("background-color",this.titleBackgroundColor())
            .style("padding",this.titlePadding()+"px")
        ;
        titles.exit().remove();

        var widgets = element.selectAll("#" + this._id + " > .surfaceWidget").data(this.widget() ? [this.widget()] : [], function (d) { return d._id; });

        var context = this;
        widgets.enter().append("div")
            .attr("class", "surfaceWidget")
            .each(function (d) {
                //console.log("surface enter:" + d._class + d._id);
                d.target(this);
            })
        ;
        widgets
            .each(function (d) {
                //console.log("surface update:" + d._class + d._id);
                var width = context.clientWidth();
                var height = context.clientHeight();
                if (context.title()) {
                    height -= context.calcHeight(element.select("h3"));
                }
                var widgetDiv = d3.select(this);
                height -= context.calcFrameHeight(widgetDiv);
                width -= context.calcFrameWidth(widgetDiv);
                d
                    .resize({ width: width, height: height })
                ;
            })
            .style("padding",this.padding()+"px")
        ;
        widgets.exit().each(function (d) {
            //console.log("surface exit:" + d._class + d._id);
            d.target(null);
        }).remove();
    };

    Surface.prototype.exit = function (domNode, element) {
        if (this.widget()) {
            this.widget(null);
            this.render();
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Surface.prototype.render = function (callback) {
        var context = this;
        HTMLWidget.prototype.render.call(this, function (widget) {
            if (context.widget()) {
                context.widget().render(function (widget) {
                    if (callback) {
                        callback(widget);
                    }
                });
            } else {
                if (callback) {
                    callback(widget);
                }
            }
        });
    };

    return Surface;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Cell',["./Surface"], factory);
    } else {
        root.layout_Cell = factory(root.layout_Surface, root.chart_Pie, root.c3_Column, root.c3_Line);
    }
}(this, function (Surface, Pie, Column, Line) {
    function Cell() {
        Surface.call(this);
        //this._dragHandles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
        this._dragHandles = ["se"];
    }
    Cell.prototype = Object.create(Surface.prototype);
    Cell.prototype._class += " layout_Cell";

    Cell.prototype.publish("gridRow", 0, "number", "Grid Row Position",null,{tags:['Private']});
    Cell.prototype.publish("gridCol", 0, "number", "Grid Column Position",null,{tags:['Private']});
    Cell.prototype.publish("gridRowSpan", 1, "number", "Grid Row Span",null,{tags:['Private']});
    Cell.prototype.publish("gridColSpan", 1, "number", "Grid Column Span",null,{tags:['Private']});
    Cell.prototype.publish("handleSize", 6, "number", "Grid Row Position",null,{tags:['Private']});

    Cell.prototype.enter = function (domNode, element) {
        Surface.prototype.enter.apply(this, arguments);
        element.classed("layout_Surface", true);
    };

    Cell.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);
        var context = this;

        var dragHandles = element.selectAll(".dragHandle").data(this._dragHandles, function (d) { return d; });
        dragHandles.enter().append("div")
            .attr("class", function (d) { return "dragHandle dragHandle_" + d; })
            .style("position", "absolute")
        ;

        dragHandles
            .style({
                padding: "0px",
                margin: "0px",
                left: function (d) {
                    switch (d) {
                        case "ne":
                        case "e":
                        case "se":
                            return context._size.width - context.handleSize() + "px";
                        case "nw":
                        case "w":
                        case "sw":
                            return "0px";
                        default:
                            return context._size.width / 2 - context.handleSize() / 2 + "px";
                    }
                },
                top: function (d) {
                    switch (d) {
                        case "nw":
                        case "n":
                        case "ne":
                            return "0px";
                        case "sw":
                        case "s":
                        case "se":
                            return context._size.height - context.handleSize() + "px";
                        default:
                            return context._size.height / 2 - context.handleSize() / 2 + "px";
                    }
                },
                width: context.handleSize() + "px",
                height: context.handleSize() + "px"
            })
            .on("dragstart", function (d) {
                //d3.event.stopPropagation();
                context._dragHandle = d;
                console.log("dragstart:  " + d);
            })
            .on("dragend", function (targetElement) {
                //d3.event.stopPropagation();
                console.log("dragend:  " + (context._dragHandle ? context._dragHandle : ""));
                context._dragHandle = null;
            })
        ;
        dragHandles.exit().remove();
    };

    return Cell;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Grid.js',["d3", "../common/HTMLWidget", "./Cell", "../common/Text", "../chart/Pie", "../chart/MultiChart", "../c3chart/Line", "css!./Grid"], factory);
    } else {
        root.layout_Grid = factory(root.d3, root.common_HTMLWidget, root.layout_Cell, root.common_Text, root.chart_Pie, root.chart_MultiChart, root.c3chart_Line);
    }
}(this, function (d3, HTMLWidget, Cell, Text, Pie, MultiChart, Line) {
    function Grid() {
        HTMLWidget.call(this);

        this._tag = "div";

        this.content([]);
    }
    Grid.prototype = Object.create(HTMLWidget.prototype);
    Grid.prototype._class += " layout_Grid";

    Grid.prototype.publish("designMode", false, "boolean", "Design Mode",null,{tags:['Private']});
    Grid.prototype.publish("gutter", 4, "number", "Gap Between Widgets",null,{tags:['Private']});
    Grid.prototype.publish("fitTo", "all", "set", "Sizing Strategy", ["all", "width"],{tags:['Private']});
    Grid.prototype.publish("content", [], "widgetArray", "widgets",null,{tags:['Private']});

    Grid.prototype.testData = function () {
        this
            .setContent(0, 0, new Pie().testData())
            .setContent(0, 1, new Pie().testData())
            .setContent(1, 0, new Pie().testData())
            .setContent(1, 1, new Pie().testData())
            .setContent(0, 2, new MultiChart().testData(), "Title AAA", 2, 2)
            .setContent(2, 0, new Line().testData(), "Title BBB", 2, 4)
        ;
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
        }
        return this;
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
                context.selectOverElement(targetElement.y, targetElement.x, this)
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
                    .classed("over", false)
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
    };

    return Grid;
}));

