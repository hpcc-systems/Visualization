"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "./Cell", "../common/Text", "css!./Border"], factory);
    } else {
        root.layout_Border = factory(root.d3, root.common_HTMLWidget, root.layout_Cell, root.common_Text);
    }
}(this, function (d3, HTMLWidget, Cell, Text) {
    function Border() {
        HTMLWidget.call(this);

        this._tag = "div";

        this._colCount = 0;
        this._rowCount = 0;
        this._colSize = 0;
        this._rowSize = 0;
        
        this._shrinkWrapBoxes = {};

        this.content([]);
        this.sectionTypes([]);
    }
    Border.prototype = Object.create(HTMLWidget.prototype);
    Border.prototype.constructor = Border;
    Border.prototype._class += " layout_Border";

    Border.prototype.publish("designMode", false, "boolean", "Design Mode",null,{tags:["Basic"]});
    
    Border.prototype.publish("content", [], "widgetArray", "widgets", null, { tags: ["Intermediate"] });
    
    Border.prototype.publish("gutter", 2, "number", "Gap Between Widgets",null,{tags:["Basic"]});

    Border.prototype.publish("topShrinkWrap", false, "boolean", "'Top' Cell shrinks to fit content",null,{tags:["Intermediate"]});
    Border.prototype.publish("leftShrinkWrap", false, "boolean", "'Left' Cell shrinks to fit content",null,{tags:["Intermediate"]});
    Border.prototype.publish("rightShrinkWrap", false, "boolean", "'Right' Cell shrinks to fit content",null,{tags:["Intermediate"]});
    Border.prototype.publish("bottomShrinkWrap", false, "boolean", "'Bottom' Cell shrinks to fit content",null,{tags:["Intermediate"]});
    
    Border.prototype.publish("topSize", 0, "number", "Height of the 'Top' Cell (px)",null,{tags:["Private"]});
    Border.prototype.publish("leftSize", 0, "number", "Width of the 'Left' Cell (px)",null,{tags:["Private"]});
    Border.prototype.publish("rightSize", 0, "number", "Width of the 'Right' Cell (px)",null,{tags:["Private"]});
    Border.prototype.publish("bottomSize", 0, "number", "Height of the 'Bottom' Cell (px)",null,{tags:["Private"]});

    Border.prototype.publish("topPercentage", 20, "number", "Percentage (of parent) Height of the 'Top' Cell",null,{tags:["Private"]});
    Border.prototype.publish("leftPercentage", 20, "number", "Percentage (of parent) Width of the 'Left' Cell",null,{tags:["Private"]});
    Border.prototype.publish("rightPercentage", 20, "number", "Percentage (of parent) Width of the 'Right' Cell",null,{tags:["Private"]});
    Border.prototype.publish("bottomPercentage", 20, "number", "Percentage (of parent) Height of the 'Bottom' Cell",null,{tags:["Private"]});

    Border.prototype.publish("surfacePadding", 0, "number", "Cell Padding (px)", null, { tags: ["Intermediate"] });


    Border.prototype.publish("sectionTypes", [], "array", "Section Types sharing an index with 'content' - Used to determine position/size.", null, { tags: ["Private"] });

    Border.prototype.applyLayoutType = function () {
        var layoutObj = this.borderLayoutObject();
        this.content().forEach(function (cell, i) {
            cell._fixedLeft = layoutObj[this.sectionTypes()[i]].left;
            cell._fixedTop = layoutObj[this.sectionTypes()[i]].top;
            cell._fixedWidth = layoutObj[this.sectionTypes()[i]].width;
            cell._fixedHeight = layoutObj[this.sectionTypes()[i]].height;
            cell._dragHandles = this.cellSpecificDragHandles(this.sectionTypes()[i]);
        }, this);
    };
    Border.prototype.cellSpecificDragHandles = function (sectionType) {
        switch(sectionType){
            case "top":return ["s"];
            case "right":return ["w"];
            case "bottom":return ["n"];
            case "left":return ["e"];
            case "center":return [];
        }
    };
    Border.prototype.borderLayoutObject = function (layoutType) {
        var t,b,r,l,c,retObj = {},context=this;
        var topSize,topPerc,bottomSize,bottomPerc,leftSize,leftPerc,rightSize,rightPerc;

        var bcRect = this.target().getBoundingClientRect();
        var gridRect = {};
        gridRect.top = bcRect.top;
        gridRect.left = bcRect.left;
        gridRect.bottom = bcRect.bottom;
        gridRect.right = bcRect.right;
        if(this.target() instanceof SVGElement){
            gridRect.width = parseFloat(this.target().getAttribute("width"));
            gridRect.height = parseFloat(this.target().getAttribute("height"));
        } else {
            gridRect.width = bcRect.width;
            gridRect.height = bcRect.height;
        }
        if(this.sectionTypes().indexOf("top") !== -1){
            topSize = this.topSize();
            topPerc = this.topPercentage();
            if(typeof (this._shrinkWrapBoxes["top"]) !== "undefined"){
                topSize = this._shrinkWrapBoxes["top"].height + this.gutter();
                topPerc = 0;
            }
        }
        if(this.sectionTypes().indexOf("bottom") !== -1){
            bottomSize = this.bottomSize();
            bottomPerc = this.bottomPercentage();
            if(typeof (this._shrinkWrapBoxes["bottom"]) !== "undefined"){
                bottomSize = this._shrinkWrapBoxes["bottom"].height + this.gutter();
                bottomPerc = 0;
            }
        }
        if(this.sectionTypes().indexOf("left") !== -1){
            leftSize = this.leftSize();
            leftPerc = this.leftPercentage();
            if(typeof (this._shrinkWrapBoxes["left"]) !== "undefined"){
                leftSize = this._shrinkWrapBoxes["left"].width + this.gutter();
                leftPerc = 0;
            }
        }
        if(this.sectionTypes().indexOf("right") !== -1){
            rightSize = this.rightSize();
            rightPerc = this.rightPercentage();
            if(typeof (this._shrinkWrapBoxes["right"]) !== "undefined"){
                rightSize = this._shrinkWrapBoxes["right"].width + this.gutter();
                rightPerc = 0;
            }
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
        retObj["top"] = t;
        retObj["bottom"] = b;
        retObj["right"] = r;
        retObj["left"] = l;
        retObj["center"] = c;
        return retObj;

        function _sectionPlacementObject(obj){
            obj.width["px"] = typeof (obj.width["px"]) !== "undefined" ? obj.width["px"] : 0;
            obj.width["%"] = typeof (obj.width["%"]) !== "undefined" ? obj.width["%"] : 0;
            obj.height["px"] = typeof (obj.height["px"]) !== "undefined" ? obj.height["px"] : 0;
            obj.height["%"] = typeof (obj.height["%"]) !== "undefined" ? obj.height["%"] : 0;
            var ret = {
                width:obj.width["px"] + (obj.width["%"]/100 * context.width()),
                height:obj.height["px"] + (obj.height["%"]/100 * context.height()),
                top:obj.top["px"] + (obj.top["%"]/100 * context.height()) + context.gutter()/2,
                left:obj.left["px"] + (obj.left["%"]/100 * context.width()) + context.gutter()/2
            };
            return ret;
        }
    };

    Border.prototype.clearContent = function (sectionType) {
        if (!sectionType) {
            this.content().forEach(function (contentWidget) {
                contentWidget.target(null);
                return false;
            });
            this.content([]);
            this.sectionTypes([]);
        } else {
            var idx = this.sectionTypes().indexOf(sectionType);
            if (idx >= 0) {
                this.content().splice(idx, 1);
                this.sectionTypes().splice(idx, 1);
            }
        }
    };

    Border.prototype.hasContent = function (sectionType, widget, title) {
        return this.sectionTypes().indexOf(sectionType) >= 0;
    };

    Border.prototype.setContent = function (sectionType, widget, title) {
        this.clearContent(sectionType);
        title = typeof (title) !== "undefined" ? title : "";
        if (widget) {
            var cell = new Cell()
                .surfaceBorderWidth(0)
                .widget(widget)
                .title(title)
            ;
            this.content().push(cell);
            this.sectionTypes().push(sectionType);
        }
        return this;
    };

    Border.prototype.getContent = function (id) {
        var idx = this.sectionTypes().indexOf(id);
        if (idx >= 0) {
            return this.content()[idx].widget();
        }
        return null;
    };
    
    Border.prototype.getCell = function (id) {
        var idx = this.sectionTypes().indexOf(id);
        if (idx >= 0) {
            return this.content()[idx];
        }
        return null;
    };

    Border.prototype.getSize = function(i){
        switch(this.sectionTypes()[i]){
            case "top":return this.topSize();
            case "right":return this.rightSize();
            case "bottom":return this.bottomSize();
            case "left":return this.leftSize();
        }
    };
    Border.prototype.changeSize = function(i,delta){
        switch(this.sectionTypes()[i]){
            case "top":
                this.topSize(this.topSize() + delta);
                break;
            case "right":
                this.rightSize(this.rightSize() + delta);
                break;
            case "bottom":
                this.bottomSize(this.bottomSize() + delta);
                break;
            case "left":
                this.leftSize(this.leftSize() + delta);
                break;
            case "center":
                this.centerSize(this.centerSize() + delta);
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
        this._dragCellStartSize = this.getSize(i);

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
                case "top":
                    if(yDelta !== 0){
                        this.changeSize(i,-yDelta);
                    }
                    break;
                case "right":
                    if(xDelta !== 0){
                        this.changeSize(i,xDelta);
                    }
                    break;
                case "bottom":
                    if(yDelta !== 0){
                        this.changeSize(i,yDelta);
                    }
                    break;
                case "left":
                    if(xDelta !== 0){
                        this.changeSize(i,-xDelta);
                    }
                    break;
                case "center":
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

    Border.prototype.size = function (_) {
        var retVal = HTMLWidget.prototype.size.apply(this, arguments);
        if (arguments.length && this.contentDiv) {
            this.contentDiv
                .style("width", this._size.width + "px")
                .style("height", this._size.height + "px")
            ;
        }
        return retVal;
    };

    Border.prototype.preUpdate = function (domNode, element) {
        this.resize();
    };
    
    Border.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("position", "relative");
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
        rows.each(function (d, idx) {
                var sectionType = context.sectionTypes()[idx];
                if(typeof (context[sectionType + "ShrinkWrap"]) !== "undefined" && context[sectionType + "ShrinkWrap"]()){
                    d.render();
                    context._shrinkWrapBoxes[sectionType] = d.widget().getBBox(true);
                } else {
                    delete context._shrinkWrapBoxes[sectionType];
                }
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
        this.applyLayoutType();

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
                    .surfacePadding(context.surfacePadding())
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

    return Border;
}));