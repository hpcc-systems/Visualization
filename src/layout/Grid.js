"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "./Cell", "../common/TextBox", "../other/Bag", "css!./Grid"], factory);
    } else {
        root.layout_Grid = factory(root.d3, root.common_HTMLWidget, root.layout_Cell, root.common_TextBox, root.other_Bag);
    }
}(this, function (d3, HTMLWidget, Cell, TextBox, Bag) {
    function Grid() {
        HTMLWidget.call(this);

        this._tag = "div";
        
        this._colCount = 0;
        this._rowCount = 0;
        this._colSize = 0;
        this._rowSize = 0;
        this._selectionBag = new Bag.Selection();
        
        this.content([]);
    }
    Grid.prototype = Object.create(HTMLWidget.prototype);
    Grid.prototype.constructor = Grid;
    Grid.prototype._class += " layout_Grid";

    Grid.prototype.publish("designMode", false, "boolean", "Design Mode",null,{tags:["Basic"]});
    Grid.prototype.publish("gutter", 4, "number", "Gap Between Widgets",null,{tags:["Basic"]});
    Grid.prototype.publish("fitTo", "all", "set", "Sizing Strategy", ["all", "width"], { tags: ["Basic"] });
    
    Grid.prototype.publish("designGridColor", "#ddd", "html-color", "Color of grid lines in Design Mode",null,{tags:["Private"]});
    Grid.prototype.publish("designGridColorExtra", "#333333", "html-color", "Color of excess grid lines in Design Mode",null,{tags:["Private"]});

    Grid.prototype.publish("cellPadding", null, "string", "Cell Padding (px)", null, { tags: ["Intermediate"] });
    
    Grid.prototype.publish("extraDesignModeWidth", 2, "number", "Number of additional columns added when in Design Mode.",null,{tags:["Private"]});
    Grid.prototype.publish("extraDesignModeHeight", 2, "number", "Number of additional rows added when in Design Mode.",null,{tags:["Private"]});
    Grid.prototype.publish("cellDensity", 3, "string", "Increase the cell density with this multiplier (Ex: 3 results in 3 cols per col and 3 rows per row)", null, { tags: ["Intermediate"] });

    Grid.prototype.publish("content", [], "widgetArray", "widgets",null,{tags:["Basic"]});

    Grid.prototype.testData = function () {
        this
            .setContent(0, 0, new TextBox().testData())
            .setContent(0, 1, new TextBox().testData())
            .setContent(1, 0, new TextBox().testData())
            .setContent(1, 1, new TextBox().testData())
            .setContent(0, 2, new TextBox().testData(), "Title AAA", 2, 2)
            .setContent(2, 0, new TextBox().testData(), "Title BBB", 2, 4)
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
        var mult = this.cellDensity();
        this.content(this.content().filter(function (contentWidget) {
            if (contentWidget.gridRow() === row*mult && contentWidget.gridCol() === col*mult) {
                contentWidget.target(null);
                return false;
            }
            return true;
        }));
        if (widget) {
            var cell = new Cell()
                .gridRow(row*mult)
                .gridCol(col*mult)
                .widget(widget)
                .title(title)
                .gridRowSpan(rowSpan*mult)
                .gridColSpan(colSpan*mult)
            ;
            this.prevDensity = mult;
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
    
    Grid.prototype.updateCellMultiples = function () {
        var context = this;
        if(this.prevDensity !== this.cellDensity()){
            this.content().forEach(function (cell) {
                if(context.prevDensity && context.cellDensity()){
                    var m1 = context.prevDensity;
                    var m2 = context.cellDensity();
                    cell.gridRow(Math.floor(cell.gridRow() * m2/m1));
                    cell.gridCol(Math.floor(cell.gridCol() * m2/m1));
                    cell.gridRowSpan(Math.floor(cell.gridRowSpan() * m2/m1));
                    cell.gridColSpan(Math.floor(cell.gridColSpan() * m2/m1));
                }
            });
            this.prevDensity = this.cellDensity();
        }
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

    Grid.prototype.findCurrentLocation = function (e) {
        this._currLoc = [
            Math.floor((e.clientX - this._offsetX)/this._colSize),
            Math.floor((e.clientY - this._offsetY)/this._rowSize)
        ];
    };
    
    Grid.prototype.overHandle = function (e) {
        var handle = "";
        var handleSize = this._dragCell.handleSize();
        
        //Determines which edge cell (if any) this._currLoc is hovering over
        //An "edge" meaning a dropCell on the exterrior edge of a surface that covers many cells
        var onSouthEdge = this._dragCell.gridRowSpan() === this._currLoc[1] - this._dragCell.gridRow() + 1;
        var onNorthEdge = this._dragCell.gridRow() === this._currLoc[1];
        var onEastEdge = this._dragCell.gridColSpan() === this._currLoc[0] - this._dragCell.gridCol() + 1;
        var onWestEdge = this._dragCell.gridCol() === this._currLoc[0];
        
        var top = this._offsetY + ((this._currLoc[1]) * this._rowSize);
        var left = this._offsetX + ((this._currLoc[0]) * this._colSize);
        var width = this._colSize - this.gutter();
        var height = this._rowSize - this.gutter();
        
        if(Math.ceil(top + height) >= e.clientY && Math.floor(top + height - handleSize) <= e.clientY && onSouthEdge){
            handle = "s";//within SOUTH handle range
        }
        else if(Math.floor(top) <= e.clientY && Math.ceil(top + handleSize) >= e.clientY && onNorthEdge){
            handle = "n";//within NORTH handle range
        }
        if(Math.ceil(left + width) >= e.clientX && Math.floor(left + width - handleSize) <= e.clientX && onEastEdge){
            handle += "e";//within EAST handle range
        }
        else if(Math.floor(left) <= e.clientX && Math.ceil(left + handleSize) >= e.clientX && onWestEdge){
            handle += "w";//within WEST handle range
        }
        return handle;
    };
    
    Grid.prototype.createDropTarget = function (loc) {
        var col = loc[0] - this._dragCellOffsetX;
        var row = loc[1] - this._dragCellOffsetY;
        var colSpan = this._dragCell.gridColSpan();
        var rowSpan = this._dragCell.gridRowSpan();
        
        var dropTarget = document.createElement("div");
        dropTarget.id = "grid-drop-target"+this.id();
        dropTarget.className = "grid-drop-target";
        
        this._element.node().appendChild(dropTarget);
        this.updateDropTarget(col,row,colSpan,rowSpan);
    };
    
    Grid.prototype.setGridOffsets = function () {
        this._offsetX = this._element.node().getBoundingClientRect().left + (this.gutter()/2);
        this._offsetY = this._element.node().getBoundingClientRect().top + (this.gutter()/2);
    };
    
    Grid.prototype.updateDropTarget = function (col,row,colSpan,rowSpan) {
        var top,left,width,height;
        top = this._offsetY + (row * this._rowSize);
        left = this._offsetX + (col * this._colSize);
        width = colSpan * this._colSize - this.gutter();
        height = rowSpan * this._rowSize - this.gutter();
        
        var dropTarget = document.getElementById("grid-drop-target"+this.id());
        dropTarget.style.top = top + "px";
        dropTarget.style.left = left + "px";
        dropTarget.style.width = width + "px";
        dropTarget.style.height = height + "px";
    };
    
    Grid.prototype.moveDropTarget = function (loc) {
        if(this._handle){
            var pivotCell = [];
            switch(this._handle){
                case "nw":
                    pivotCell = [this._dragCell.gridCol()+this._dragCell.gridColSpan()-1,this._dragCell.gridRow()+this._dragCell.gridRowSpan()-1];
                    break;
                case "n":
                case "ne":
                    pivotCell = [this._dragCell.gridCol(),this._dragCell.gridRow()+this._dragCell.gridRowSpan()-1];
                    break;
                case "e":
                case "se":
                case "s":
                    pivotCell = [this._dragCell.gridCol(),this._dragCell.gridRow()];
                    break;
                case "sw":
                case "w":
                    pivotCell = [this._dragCell.gridCol()+this._dragCell.gridColSpan()-1,this._dragCell.gridRow()];
                    break;
            }
            switch(this._handle){
                case "e":
                case "w":
                    this._locY = pivotCell[1];
                    break;
                default:
                    this._locY = loc[1] <= pivotCell[1] ? loc[1] : pivotCell[1];
                    break;
            }
            switch(this._handle){
                case "n":
                case "s":
                    this._locX = pivotCell[0];
                    break;
                default:
                    this._locX = loc[0] <= pivotCell[0] ? loc[0] : pivotCell[0];
                    break;
            }
            switch(this._handle){
                case "n":
                case "s":
                    this._sizeX = this._dragCell.gridColSpan();
                    break;
                default:
                    this._sizeX = Math.abs(loc[0] - pivotCell[0]) + 1;
                    break;
            }
            switch(this._handle){
                case "e":
                case "w":
                    this._sizeY = this._dragCell.gridRowSpan();
                    break;
                default:
                    this._sizeY = Math.abs(loc[1] - pivotCell[1]) + 1;
                    break;
            }
        } else if (document.getElementById("grid-drop-target"+this.id()) !== null) {
            var target = this.getCell(loc[1], loc[0]);
            if(target !== null && this._dragCell._id !== target._id){
                document.getElementById("grid-drop-target"+this.id()).className = "grid-drop-target drop-target-over";
                this._locX = target.gridCol();
                this._locY = target.gridRow();
                this._sizeX = target.gridColSpan();
                this._sizeY = target.gridRowSpan();
            } else {
                document.getElementById("grid-drop-target"+this.id()).className = "grid-drop-target";
                this._locX = loc[0] - this._dragCellOffsetX;
                this._locY = loc[1] - this._dragCellOffsetY;
                this._sizeX = this._dragCell.gridColSpan();
                this._sizeY = this._dragCell.gridRowSpan();
            }
        }
        
        this.updateDropTarget(this._locX,this._locY,this._sizeX,this._sizeY);
    };
    
    Grid.prototype.updateCells = function (cellWidth, cellHeight) {
        var context = this;
        
        this.updateCellMultiples();
        
        var rows = this.contentDiv.selectAll(".cell_" + this._id).data(this.content(), function (d) { return d._id; });
        rows.enter().append("div")
            .attr("class", "cell_" + this._id)
            .style("position", "absolute")
            .each(function (d) {
                d
                   .target(this)
                ;
                d.__grid_watch = d.watch(function (key, newVal, oldVal) {
                    if (context._renderCount && key.indexOf("grid") === 0 && newVal !== oldVal) {
                        context.childMoved();
                    }
                });
            });
        var drag = d3.behavior.drag()
            .on("dragstart", function (d) {
                d3.event.sourceEvent.stopPropagation();
        
                context._dragCell = d;
                
                context.setGridOffsets();
                context.findCurrentLocation(d3.event.sourceEvent);
                
                context._startLoc = [context._currLoc[0],context._currLoc[1]];
                
                context._element.selectAll(".dragHandle")
                    .style("visibility", "hidden")
                ;
                
                context._handle = context.overHandle(d3.event.sourceEvent);
                if(context._dragCell._dragHandles.indexOf(context._handle) === -1){
                    context._handle = undefined;
                }
                
                context._dragCellOffsetX = context._currLoc[0] - d.gridCol();
                context._dragCellOffsetY = context._currLoc[1] - d.gridRow();
                context.createDropTarget(context._currLoc);
                setTimeout(function () {
                    context.contentDiv.selectAll(".cell_" + context._id)
                        .classed("dragItem", function (d2) {
                            return d._id === d2._id;
                        }).classed("notDragItem", function (d2) {
                            return d._id !== d2._id;
                        })
                    ;
                }, 0);
                
                context._initSelection = true;
            })
            .on("drag", function (d) {
                context._initSelection = false;
                context._dragCell = d;
                context.findCurrentLocation(d3.event.sourceEvent);
                if(typeof (context._currLocation) === "undefined" || (context._currLocation[0] !== context._currLoc[0] || context._currLocation[1] !== context._currLoc[1])){
                    context._currLocation = context._currLoc;
                    context.moveDropTarget(context._currLoc);
                }
            })
            .on("dragend", function () {
                d3.event.sourceEvent.stopPropagation();
        
                if(context._initSelection || context._startLoc[0] === context._currLoc[0] || context._startLoc[1] === context._currLoc[1]){
                    context.selectionBagClick(context.getCell(context._currLoc[1],context._currLoc[0]));
                }
        
                context._element.selectAll(".dragHandle")
                    .style("visibility", null)
                ;
        
                if (context._handle) {
                    context._dragCell.gridRow(context._locY);
                    context._dragCell.gridRowSpan(context._sizeY);
                    context._dragCell.gridCol(context._locX);
                    context._dragCell.gridColSpan(context._sizeX);
                } else {
                    var targetRow = context._currLoc[1];
                    var targetCol = context._currLoc[0];
                    var targetRowSpan = context._dragCell.gridRowSpan();
                    var targetColSpan = context._dragCell.gridColSpan();
                    var targetCell = context.getCell(context._currLoc[1], context._currLoc[0]);
                    if (targetCell === context._dragCell) {
                        targetRowSpan = targetCell.gridRowSpan();
                        targetColSpan = targetCell.gridColSpan();
                        targetCell = null;
                    }
                    var newDragCellCol;
                    var newDragCellRow;
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
                        newDragCellCol = targetCol;
                        newDragCellRow = targetRow;
                    } else {
                        newDragCellCol = targetCol - context._dragCellOffsetX;
                        newDragCellRow = targetRow - context._dragCellOffsetY;
                    }
                    context._dragCell
                        .gridCol(newDragCellCol)
                        .gridRow(newDragCellRow)
                        .gridColSpan(targetColSpan)
                        .gridRowSpan(targetRowSpan)
                    ;
                }
                var gridDropTarget = document.getElementById("grid-drop-target"+context.id());
                gridDropTarget.parentNode.removeChild(gridDropTarget);
                
                setTimeout(function () {
                    context.contentDiv.selectAll(".cell_" + context._id)
                        .classed("dragItem", false)
                        .classed("notDragItem", false)
                    ;
                }, 0);

                context._dragCell = null;
            });
            
        if(this.designMode()){ 
            this.contentDiv.selectAll(".cell_" + this._id).call(drag);
            d3.select(context._target).on("click",function(){
                context._selectionBag.clear();
                context.postSelectionChange();
            });
        } else {
            this.contentDiv.selectAll(".cell_" + this._id).on(".drag", null);
            this._selectionBag.clear();
        }
        
        rows.style("left", function (d) { return d.gridCol() * cellWidth + context.gutter() / 2 + "px"; })
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
                    .surfacePadding(context.cellPadding())
                    .resize()
                ;
            });
        rows.exit().each(function (d) {
            d
               .target(null)
            ;
            if (d.__grid_watch) {
                d.__grid_watch.remove();
            }
        }).remove();
    };

    Grid.prototype.postSelectionChange = function(){};

    Grid.prototype.updateDropCells = function (dimensions, cellWidth, cellHeight) {
        var context = this;
        if(_needsCanvasRedraw()){
            if(this.designMode()){
                var c_canvas = document.createElement("canvas");
                c_canvas.width = dimensions.width * cellWidth;
                c_canvas.height = dimensions.height * cellHeight;
                var contentWidth = (dimensions.width - this.extraDesignModeWidth()) * cellWidth;
                var contentHeight = (dimensions.height  - this.extraDesignModeHeight()) * cellHeight;
                var canvasContext = c_canvas.getContext("2d");

                //Draw vertical lines
                var xCount = 0;
                for (var x = 0.5 + cellWidth; x < c_canvas.width; x += cellWidth) {
                    xCount++;
                    if(xCount < dimensions.width - this.extraDesignModeWidth()){
                        _drawLine(_roundHalf(x),_roundHalf(x),0,contentHeight,this.designGridColor());
                    } else {
                        _drawLine(_roundHalf(x),_roundHalf(x),0,c_canvas.height,this.designGridColorExtra());
                    }
                }
                //Draw horizontal lines
                var yCount = 0;
                for (var y = 0.5 + cellHeight; y < c_canvas.height; y += cellHeight) {
                    yCount++;
                    if(yCount < dimensions.height - this.extraDesignModeHeight()){
                        _drawLine(0,contentWidth,_roundHalf(y),_roundHalf(y),this.designGridColor());
                    } else {
                        _drawLine(0,c_canvas.width,_roundHalf(y),_roundHalf(y),this.designGridColorExtra());
                    }
                }
                //Draw excess (short) vertical lines
                xCount = 0;
                for (var x2 = 0.5 + cellWidth; x2 < c_canvas.width; x2 += cellWidth) {
                    if(xCount < dimensions.width - this.extraDesignModeWidth()){
                        _drawLine(_roundHalf(x2),_roundHalf(x2),contentHeight,c_canvas.height,this.designGridColorExtra());
                    }
                }
                //Draw excess (short) horizontal lines
                yCount = 0;
                for (var y2 = 0.5 + cellHeight; y2 < c_canvas.height; y2 += cellHeight) {
                    if(yCount < dimensions.height - this.extraDesignModeHeight()){
                        _drawLine(contentWidth,c_canvas.width,_roundHalf(y2),_roundHalf(y2),this.designGridColorExtra());
                    }
                }

                if(this._target){
                    this._target.style.backgroundImage = "url("+ c_canvas.toDataURL()+")";
                }
                
                this.prevDimensions = {
                    "width":dimensions.width,
                    "height":dimensions.height
                };
                this.prevCellWidth = cellWidth;
                this.prevCellHeight = cellHeight;
            } else {
                this._target.style.backgroundImage = "";
            }
        }
        
        
        function _roundHalf(n){
            return parseInt(n) + 0.5;
        }
        function _drawLine(x1,x2,y1,y2,color){
            canvasContext.beginPath();
            canvasContext.strokeStyle = color;
            canvasContext.moveTo(x1,y1);
            canvasContext.lineTo(x2,y2);
            canvasContext.stroke();
        }
        function _needsCanvasRedraw(){
            var ret = false;
            if(typeof (context.prevDimensions) === "undefined"){
                ret = true;
            } else if (context.prevDimensions.width !== dimensions.width || context.prevDimensions.height !== dimensions.height) {
                ret = true;
            } else if (context.prevCellWidth !== cellWidth || context.prevCellHeight !== cellHeight) {
                ret = true;
            } else if (context._target.style.backgroundImage === "" && context.designMode()) {
                ret = true;
            }
            return ret;
        }
    };

    Grid.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        this._parentElement.style("overflow-x", this.fitTo() === "width" ? "hidden" : null);
        this._parentElement.style("overflow-y", this.fitTo() === "width" ? "scroll" : null);
        var dimensions = this.getDimensions();
        if (this.designMode()) {
            dimensions.width+=this.extraDesignModeWidth();
            dimensions.height+=this.extraDesignModeHeight();
        }
        var cellWidth = (this.width() - (this.fitTo() === "width" ? this._scrollBarWidth : 0)) / dimensions.width;
        var cellHeight = this.fitTo() === "all" ? this.height() / dimensions.height : cellWidth;

        this._colCount = dimensions.width;
        this._rowCount = dimensions.height;
        this._colSize = cellWidth;
        this._rowSize = cellHeight;

        this.updateCells(cellWidth, cellHeight);
        this.updateDropCells(dimensions, cellWidth, cellHeight);
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
            widget:d
        };
    };
    
    Grid.prototype.selection = function (_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) { return d._id; });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    };

    Grid.prototype.selectionBagClick = function (d) {
        if(d !== null){
            var selectionObj = this._createSelectionObject(d);
            if(d3.event.sourceEvent.ctrlKey){
                if(this._selectionBag.isSelected(selectionObj)){
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
