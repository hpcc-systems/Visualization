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
    
    Border.prototype.publish("gutter", 0, "number", "Gap Between Widgets",null,{tags:["Basic"]});

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

    Border.prototype.borderLayoutObject = function () {
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
            d3.select("#"+this.id()+" > div.borderHandle")
                    .classed("borderHandleDisabled",true);
            this.content([]);
            this.sectionTypes([]);
        } else {
            var idx = this.sectionTypes().indexOf(sectionType);
            if (idx >= 0) {
                
                d3.select("#"+this.id()+" > div.borderHandle_"+sectionType)
                        .classed("borderHandleDisabled",true);
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

    Border.prototype.setLayoutOffsets = function () {
        this._offsetX = this._element.node().getBoundingClientRect().left + (this.gutter()/2);
        this._offsetY = this._element.node().getBoundingClientRect().top + (this.gutter()/2);
    };

    Border.prototype.dragStart = function(handle){
        d3.event.sourceEvent.stopPropagation();
        var context = this;

        this._dragCell = handle;
        this._dragCellStartSize = this[handle+"Size"]();
        
        if(this[handle+"ShrinkWrap"]()){
            this[handle+"Percentage"](0);
            this[handle+"ShrinkWrap"](false);
        }
        
        var handleElm = d3.select("#" + context.id() + " > div.borderHandle_"+handle);
        context._handleTop = parseFloat(handleElm.style("top").split("px")[0]);
        context._handleLeft = parseFloat(handleElm.style("left").split("px")[0]);
        
        this._dragPrevX = d3.event.sourceEvent.clientX;
        this._dragPrevY = d3.event.sourceEvent.clientY;
    };
    Border.prototype.dragTick = function(handle){
        var context = this;
        
        var xDelta = this._dragPrevX - d3.event.sourceEvent.clientX;
        var yDelta = this._dragPrevY - d3.event.sourceEvent.clientY;

        switch(handle){
            case "top":
            case "bottom":
                _moveHandles(handle,yDelta);
                break;
            case "right":
            case "left":
                _moveHandles(handle,xDelta);
                break;
        }
        
        function _moveHandles(handle,delta){
            if(delta===0)return;
            var handles = d3.selectAll("#" + context.id() + " > div.borderHandle");
            var grabbedHandle = d3.select("#" + context.id() + " > div.borderHandle_"+handle);
            
            if(grabbedHandle.classed("borderHandle_top")){
                grabbedHandle.style({
                    top: (context._handleTop-delta)+"px"
                });
                context._cellSizes.topHeight = context._handleTop-delta;
                context._cellSizes.leftHeight = context._cellSizes.height;
                context._cellSizes.leftHeight -= context._cellSizes.topHeight;
                context._cellSizes.leftHeight -= context._cellSizes.bottomHeight;
                context._cellSizes.rightHeight = context._cellSizes.leftHeight;
            }
            else if(grabbedHandle.classed("borderHandle_right")){
                grabbedHandle.style({
                    left: (context._handleLeft-delta)+"px"
                });
                context._cellSizes.rightWidth = context._cellSizes.width - context._handleLeft + delta;
            }
            else if(grabbedHandle.classed("borderHandle_bottom")){
                grabbedHandle.style({
                    top: (context._handleTop-delta)+"px"
                });
                context._cellSizes.bottomHeight = context._cellSizes.height - context._handleTop + delta;
                context._cellSizes.leftHeight = context._cellSizes.height;
                context._cellSizes.leftHeight -= context._cellSizes.bottomHeight;
                context._cellSizes.leftHeight -= context._cellSizes.topHeight;
                context._cellSizes.rightHeight = context._cellSizes.leftHeight;
            }
            else if(grabbedHandle.classed("borderHandle_left")){
                grabbedHandle.style({
                    left: (context._handleLeft-delta)+"px"
                });
                context._cellSizes.leftWidth = context._handleLeft-delta;
            }
            
            handles.each(function(){
                var handle = d3.select(this);
                if(handle.classed("borderHandle_top")){
                    handle.style({
                        width:context._cellSizes.width+"px",
                        top:(context._cellSizes.topHeight - 3)+"px"
                    });
                }
                else if(handle.classed("borderHandle_right")){
                    handle.style({
                        left:(context._cellSizes.width - context._cellSizes.rightWidth)+"px",
                        top:(context._cellSizes.topHeight + 3)+"px",
                        height:context._cellSizes.rightHeight+"px"
                    });
                }
                else if(handle.classed("borderHandle_bottom")){
                    handle.style({
                        width:context._cellSizes.width+"px",
                        top:(context._cellSizes.height - context._cellSizes.bottomHeight - 3)+"px"
                    });
                }
                else if(handle.classed("borderHandle_left")){
                    handle.style({
                        left:context._cellSizes.leftWidth+"px",
                        height:context._cellSizes.leftHeight+"px",
                        top:(context._cellSizes.topHeight + 3)+"px"
                    });
                }
            });
        }
    };
    Border.prototype.dragEnd = function(handle){
        if(handle){
            var xDelta = this._dragPrevX - d3.event.sourceEvent.clientX;
            var yDelta = this._dragPrevY - d3.event.sourceEvent.clientY;
            
            switch(handle){
                case "top":
                    if(yDelta !== 0){
                        this.topPercentage(0);
                        this.topSize(this.topSize() === 0 ? this.getContent("top").getBBox().height - yDelta : this.topSize() - yDelta);
                    }
                    break;
                case "right":
                    if(xDelta !== 0){
                        this.rightPercentage(0);
                        this.rightSize(this.rightSize() === 0 ? this.getContent("right").getBBox().width + xDelta : this.rightSize() + xDelta);
                    }
                    break;
                case "bottom":
                    if(yDelta !== 0){
                        this.bottomPercentage(0);
                        this.bottomSize(this.bottomSize() === 0 ? this.getContent("bottom").getBBox().height + yDelta : this.bottomSize() + yDelta);
                    }
                    break;
                case "left":
                    if(xDelta !== 0){
                        this.leftPercentage(0);
                        this.leftSize(this.leftSize() === 0 ? this.getContent("left").getBBox().width - xDelta : this.leftSize() - xDelta);
                    }
                    break;
            }
            
            this._dragPrevX = d3.event.sourceEvent.clientX;
            this._dragPrevY = d3.event.sourceEvent.clientY;
        }
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
    
    Border.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        element.style("position", "relative");
        this.contentDiv = element.append("div").classed("border-content",true);
        this._scrollBarWidth = this.getScrollbarWidth();
        this._borderHandles = ["top","left","right","bottom"];
        
        var handles = element.selectAll("div.borderHandle").data(this._borderHandles);
        handles.enter().append("div")
            .classed("borderHandle",true)
            .each(function(handle){
                var h = d3.select(this);
                h.classed("borderHandle_"+handle,true)
                    .classed("borderHandleDisabled",context.getContent(handle) === null)
                ;
            });
    };
    
    Border.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._sectionTypeArr = this.sectionTypes();
        var context = this;

        element.classed("design-mode",this.designMode());

        this.setLayoutOffsets();

        var rows = this.contentDiv.selectAll(".cell_" + this._id).data(this.content(), function (d) { return d._id; });
        rows.enter().append("div")
            .classed("cell_" + this._id,true)
            .style("position", "absolute")
            .each(function (d,i) {
                d3.select(this).classed("border-cell border-cell-"+context._sectionTypeArr[i],true);
                d.target(this);
                d3.select("#"+context.id()+" > div.borderHandle_"+context._sectionTypeArr[i])
                        .classed("borderHandleDisabled",false);
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
            element.selectAll("#"+this.id()+" > div.borderHandle").call(drag);
        } else {
            element.selectAll("#"+this.id()+" > div.borderHandle").on(".drag", null);
        }
        
        var layoutObj = this.borderLayoutObject();
        this.content().forEach(function (cell, i) {
            cell._fixedLeft = layoutObj[this.sectionTypes()[i]].left;
            cell._fixedTop = layoutObj[this.sectionTypes()[i]].top;
            cell._fixedWidth = layoutObj[this.sectionTypes()[i]].width;
            cell._fixedHeight = layoutObj[this.sectionTypes()[i]].height;
            cell._dragHandles = [];
        }, this);

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
        
        this.getCellSizes();
        
        element
            .selectAll("#"+this.id()+" > div.borderHandle")
            .each(function(){
                var handle = d3.select(this);
                if(handle.classed("borderHandle_top")){
                    handle.style({
                        width:context._cellSizes.width+"px",
                        top:(context._cellSizes.topHeight - 3)+"px"
                    });
                }
                else if(handle.classed("borderHandle_right")){
                    handle.style({
                        left:(context._cellSizes.width - context._cellSizes.rightWidth)+"px",
                        top:(context._cellSizes.topHeight + 3)+"px",
                        height:context._cellSizes.rightHeight+"px"
                    });
                }
                else if(handle.classed("borderHandle_bottom")){
                    handle.style({
                        width:context._cellSizes.width+"px",
                        top:(context._cellSizes.height - context._cellSizes.bottomHeight - 3)+"px"
                    });
                }
                else if(handle.classed("borderHandle_left")){
                    handle.style({
                        left:context._cellSizes.leftWidth+"px",
                        height:context._cellSizes.leftHeight+"px",
                        top:(context._cellSizes.topHeight + 3)+"px"
                    });
                }
                
            })
        ;
    };

    Border.prototype.getCellSizes = function () {
        var context = this;
        context._cellSizes = {};
        var contentRect = this.element().node().getBoundingClientRect();
        context._cellSizes.width = contentRect.width;
        context._cellSizes.height = contentRect.height;
        this.element()
            .selectAll("#"+this.id()+" > div > div.border-cell")
            .each(function(){
                var cell = d3.select(this);
                if(typeof cell.node === "function"){
                    var rect = cell.node().getBoundingClientRect();
                    if(cell.classed("border-cell-top")){
                        context._cellSizes.topHeight = rect.height;
                    }else if(cell.classed("border-cell-left")){
                        context._cellSizes.leftWidth = rect.width;
                        context._cellSizes.leftHeight = rect.height;
                    }else if(cell.classed("border-cell-right")){
                        context._cellSizes.rightWidth = rect.width;
                        context._cellSizes.rightHeight = rect.height;
                    }else if(cell.classed("border-cell-bottom")){
                        context._cellSizes.bottomHeight = rect.height;
                    }
                }
            });
        var sizes = ['height','width','topHeight','bottomHeight','leftHeight','rightHeight','leftWidth','rightWidth'];
        sizes.forEach(function(size){
            context._cellSizes[size] = context._cellSizes[size] === undefined ? 0 : context._cellSizes[size];
        });
    };
    
    Border.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Border;
}));