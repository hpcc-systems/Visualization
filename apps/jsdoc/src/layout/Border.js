"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "./Cell", "../common/Text", "css!./Border"], factory);
    } else {
        root.layout_Grid = factory(root.d3, root.common_HTMLWidget, root.layout_Cell, root.common_Text, root.chart_Pie, root.chart_MultiChart, root.c3chart_Line);
    }
}(this, function (d3, HTMLWidget, Cell, Text) {
    function Border() {
        HTMLWidget.call(this);

        this._tag = "div";

        this._colCount = 0;
        this._rowCount = 0;
        this._colSize = 0;
        this._rowSize = 0;

        this.content([]);
    }
    Border.prototype = Object.create(HTMLWidget.prototype);
    Border.prototype.constructor = Border;
    Border.prototype._class += " layout_Border";

    Border.prototype.publish("gutter", 4, "number", "Gap Between Widgets",null,{tags:["Private"]});

    Border.prototype.publish("designMode", false, "boolean", "Design Mode",null,{tags:["Private"]});

    Border.prototype.publish("layoutType", "Default", "set", "This determines the placement/size of the Cells relative to the Border._target element", ["Default"], { tags: ["Private"] });

    Border.prototype.publish("topCellSize", 100, "number", "Height of the 'Top' Cell (px)",null,{tags:["Private"]});
    Border.prototype.publish("leftCellSize", 150, "number", "Width of the 'Left' Cell (px)",null,{tags:["Private"]});
    Border.prototype.publish("rightCellSize", 250, "number", "Width of the 'Right' Cell (px)",null,{tags:["Private"]});
    Border.prototype.publish("bottomCellSize", 80, "number", "Height of the 'Bottom' Cell (px)",null,{tags:["Private"]});

    Border.prototype.publish("topCellPercentage", 0, "number", "Percentage (of parent) Height of the 'Top' Cell",null,{tags:["Private"]});
    Border.prototype.publish("leftCellPercentage", 0, "number", "Percentage (of parent) Width of the 'Left' Cell",null,{tags:["Private"]});
    Border.prototype.publish("rightCellPercentage", 0, "number", "Percentage (of parent) Width of the 'Right' Cell",null,{tags:["Private"]});
    Border.prototype.publish("bottomCellPercentage", 0, "number", "Percentage (of parent) Height of the 'Bottom' Cell",null,{tags:["Private"]});

    Border.prototype.publish("cellPadding", "0px", "string", "Cell Padding (px)", null, { tags: ["Intermediate"] });

    Border.prototype.publish("content", [], "widgetArray", "widgets",null,{tags:["Private"]});

    Border.prototype.publish("sectionTypes", [], "array", "Section Types sharing an index with 'content' - Used to determine position/size.",null,{tags:["Private"]});

    Border.prototype.testData = function () {
        this
            .setContent("topSection",new Text().testData())
            .setContent("rightSection",new Text().testData())
            .setContent("bottomSection",new Text().testData())
            .setContent("leftSection",new Text().testData())
            .setContent("centerSection",new Text().testData())
        ;

        return this;
    };

    Border.prototype.applyLayoutType = function (layoutType) {
        var layoutObj = this.borderLayoutObject(layoutType);
        for(var i in this.content()){
            this.content()[i]._fixedLeft = layoutObj[this.sectionTypes()[i]].left;
            this.content()[i]._fixedTop = layoutObj[this.sectionTypes()[i]].top;
            this.content()[i]._fixedWidth = layoutObj[this.sectionTypes()[i]].width;
            this.content()[i]._fixedHeight = layoutObj[this.sectionTypes()[i]].height;
            this.content()[i]._dragHandles = this.cellSpecificDragHandles(this.sectionTypes()[i]);
        }
    };
    Border.prototype.cellSpecificDragHandles = function (sectionType) {
        switch(this.layoutType()){
            default:
                switch(sectionType){
                    case "topSection":return ["s"];
                    case "rightSection":return ["w"];
                    case "bottomSection":return ["n"];
                    case "leftSection":return ["e"];
                    case "centerSection":return [];
                }
        }
    };
    Border.prototype.borderLayoutObject = function (layoutType) {
        var t,b,r,l,c,retObj = {},context=this;
        var topSize,topPerc,bottomSize,bottomPerc,leftSize,leftPerc,rightSize,rightPerc;

        var gridRect = this.target().getBoundingClientRect();
        switch(layoutType){
            default:
                if(this.sectionTypes().indexOf("topSection") !== -1){
                    topSize = this.topCellSize();
                    topPerc = this.topCellPercentage();
                }
                if(this.sectionTypes().indexOf("bottomSection") !== -1){
                    bottomSize = this.bottomCellSize();
                    bottomPerc = this.bottomCellPercentage();
                }
                if(this.sectionTypes().indexOf("leftSection") !== -1){
                    leftSize = this.leftCellSize();
                    leftPerc = this.leftCellPercentage();
                }
                if(this.sectionTypes().indexOf("rightSection") !== -1){
                    rightSize = this.rightCellSize();
                    rightPerc = this.rightCellPercentage();
                }

                t = _sectionPlacementObject({
                    width:{"px":0,"%":100},
                    height:{"px":topSize,"%":topPerc},
                    top:{"px":0,"%":0},
                    left:{"px":0,"%":0}
                });
                b = _sectionPlacementObject({
                    width:{"px":0,"%":100},
                    height:{"px":bottomSize,"%":bottomPerc},
                    top:{"px":0,"%":100},
                    left:{"px":0,"%":0}
                });
                b.top -= b.height;
                l = _sectionPlacementObject({
                    width:{"px":leftSize,"%":leftPerc},
                    height:{"px":-t.height-b.height,"%":100},
                    top:{"px":t.height,"%":0},
                    left:{"px":0,"%":0}
                });
                r = _sectionPlacementObject({
                    width:{"px":rightSize,"%":rightPerc},
                    height:{"px":-t.height-b.height,"%":100},
                    top:{"px":t.height,"%":0},
                    left:{"px":0,"%":100}
                });
                r.left -= r.width;
                c = _sectionPlacementObject({
                    width:{"px":-r.width-l.width,"%":100},
                    height:{"px":-t.height-b.height,"%":100},
                    top:{"px":t.height,"%":0},
                    left:{"px":l.width,"%":0}
                });
                retObj["topSection"] = t;
                retObj["bottomSection"] = b;
                retObj["rightSection"] = r;
                retObj["leftSection"] = l;
                retObj["centerSection"] = c;
        }
        return retObj;

        function _sectionPlacementObject(obj){
            obj.width["px"] = typeof (obj.width["px"]) !== "undefined" ? obj.width["px"] : 0;
            obj.width["%"] = typeof (obj.width["%"]) !== "undefined" ? obj.width["%"] : 0;
            obj.height["px"] = typeof (obj.height["px"]) !== "undefined" ? obj.height["px"] : 0;
            obj.height["%"] = typeof (obj.height["%"]) !== "undefined" ? obj.height["%"] : 0;
            var ret = {
                width:obj.width["px"] + (obj.width["%"]/100 * gridRect.width),
                height:obj.height["px"] + (obj.height["%"]/100 * gridRect.height),
                top:obj.top["px"] + (obj.top["%"]/100 * gridRect.height) + context.gutter()/2,
                left:obj.left["px"] + (obj.left["%"]/100 * gridRect.width) + context.gutter()/2
            };
            return ret;
        }
    };

    Border.prototype.clearContent = function () {
        this.content(this.content().filter(function (contentWidget) {
            contentWidget.target(null);
            return false;
        }));
        this.sectionTypes([]);
    };

    Border.prototype.setContent = function (sectionType, widget, title) {
        title = typeof (title) !== "undefined" ? title : "";
        var arr = this.sectionTypes();
        if (widget) {
            var cell = new Cell()
                .widget(widget)
                .title(title)
            ;
            this.content().push(cell);
            arr.push(sectionType);
        }
        this.sectionTypes(arr);
        return this;
    };

    Border.prototype.getContent = function (id) {
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

    Border.prototype.getCellSize = function(i){
        switch(this.sectionTypes()[i]){
            case "topSection":return this.topCellSize();
            case "rightSection":return this.rightCellSize();
            case "bottomSection":return this.bottomCellSize();
            case "leftSection":return this.leftCellSize();
        }
    };
    Border.prototype.changeCellSize = function(i,delta){
        switch(this.sectionTypes()[i]){
            case "topSection":
                this.topCellSize(this.topCellSize() + delta);
                break;
            case "rightSection":
                this.rightCellSize(this.rightCellSize() + delta);
                break;
            case "bottomSection":
                this.bottomCellSize(this.bottomCellSize() + delta);
                break;
            case "leftSection":
                this.leftCellSize(this.leftCellSize() + delta);
                break;
            case "centerSection":
                this.centerCellSize(this.centerCellSize() + delta);
                break;
        }
    };

    Border.prototype.overHandle = function (e) {
        var handle = "";
        var handleSize = this._dragCell.handleSize();

        var top = this._offsetY + this._dragCell._fixedTop - this.gutter()/2;
        var left = this._offsetX + this._dragCell._fixedLeft - this.gutter()/2;
        var width = this._dragCell._fixedWidth;
        var height = this._dragCell._fixedHeight;

        if(Math.ceil(top + height - this.gutter()) >= e.clientY && Math.floor(top + height - handleSize - this.gutter()) <= e.clientY){
            handle = "s";//within SOUTH handle range
        }
        else if(Math.floor(top) <= e.clientY && Math.ceil(top + handleSize) >= e.clientY){
            handle = "n";//within NORTH handle range
        }
        if(Math.ceil(left + width - this.gutter()) >= e.clientX && Math.floor(left + width - handleSize - this.gutter()) <= e.clientX){
            handle += "e";//within EAST handle range
        }
        else if(Math.floor(left) <= e.clientX && Math.ceil(left + handleSize) >= e.clientX){
            handle += "w";//within WEST handle range
        }
        return handle;
    };

    Border.prototype.setLayoutOffsets = function () {
        this._offsetX = this._element.node().getBoundingClientRect().left + (this.gutter()/2);
        this._offsetY = this._element.node().getBoundingClientRect().top + (this.gutter()/2);
    };

    Border.prototype.dragStart = function(d,i){
        d3.event.sourceEvent.stopPropagation();
        var context = this;

        this._dragCell = d;
        this._dragCellStartSize = this.getCellSize(i);

        context._handle = context.overHandle(d3.event.sourceEvent);
        if(context._dragCell._dragHandles.indexOf(context._handle) === -1){
            context._handle = undefined;
        }
        this._dragPrevX = d3.event.sourceEvent.clientX;
        this._dragPrevY = d3.event.sourceEvent.clientY;
    };
    Border.prototype.dragTick = function(d,i){
        if(this._handle){
            var xDelta = this._dragPrevX - d3.event.sourceEvent.clientX;
            var yDelta = this._dragPrevY - d3.event.sourceEvent.clientY;

            switch(this._sectionTypeArr[i]){
                case "topSection":
                    if(yDelta !== 0){
                        this.changeCellSize(i,-yDelta);
                    }
                    break;
                case "rightSection":
                    if(xDelta !== 0){
                        this.changeCellSize(i,xDelta);
                    }
                    break;
                case "bottomSection":
                    if(yDelta !== 0){
                        this.changeCellSize(i,yDelta);
                    }
                    break;
                case "leftSection":
                    if(xDelta !== 0){
                        this.changeCellSize(i,-xDelta);
                    }
                    break;
                case "centerSection":
                    break;
            }

            this._dragPrevX = d3.event.sourceEvent.clientX;
            this._dragPrevY = d3.event.sourceEvent.clientY;
        }
        this.render();
    };
    Border.prototype.dragEnd = function(d){
        this.render();
    };

    Border.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("position", "relative");
        this.dropDiv = element.append("div");
        this.contentDiv = element.append("div");
        this._scrollBarWidth = this.getScrollbarWidth();
    };

    Border.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._sectionTypeArr = this.sectionTypes();
        var context = this;

        this.setLayoutOffsets();

        var rows = this.contentDiv.selectAll(".cell_" + this._id).data(this.content(), function (d) { return d._id; });
        rows.enter().append("div")
            .attr("class", "cell_" + this._id)
            .style("position", "absolute")
            .each(function (d) {
                d
                   .target(this)
                ;
            });

        var drag = d3.behavior.drag()
            .on("dragstart", function (d,i) { context.dragStart.call(context,d,i); })
            .on("drag", function (d,i) { context.dragTick.call(context,d,i); })
            .on("dragend", function (d,i) { context.dragEnd.call(context,d,i); })
        ;
        if(this.designMode()){
            this.contentDiv.selectAll(".cell_" + this._id).call(drag);
        } else {
            this.contentDiv.selectAll(".cell_" + this._id).on(".drag", null);
        }
        this.applyLayoutType(this.layoutType());

        rows
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
                    .surfacePadding(context.cellPadding())
                    .resize()
                ;
            });
        rows.exit().each(function (d) {
            d
               .target(null)
            ;
        }).remove();

    };

    Border.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Border.prototype.render = function (callback) {
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

    return Border;
}));