"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "./BorderCell", "../common/Text", "css!./Border"], factory);
    } else {
        root.layout_Grid = factory(root.d3, root.common_HTMLWidget, root.layout_Cell, root.common_Text, root.chart_Pie, root.chart_MultiChart, root.c3chart_Line);
    }
}(this, function (d3, HTMLWidget, BorderCell, Text) {
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
    Border.prototype._class += " layout_Border";

    Border.prototype.publish("gutter", 4, "number", "Gap Between Widgets",null,{tags:['Private']});
    
    Border.prototype.publish("layoutType", "Default", "set", "This determines the placement/size of the BorderCells relative to the Border._target element", ["Default"], { tags: ['Private'] });
    
    Border.prototype.publish("topCellSize", 100, "number", "Height of the 'Top' Cell (px)",null,{tags:['Private']});
    Border.prototype.publish("leftCellSize", 150, "number", "Width of the 'Left' Cell (px)",null,{tags:['Private']});
    Border.prototype.publish("rightCellSize", 150, "number", "Width of the 'Right' Cell (px)",null,{tags:['Private']});
    Border.prototype.publish("bottomCellSize", 80, "number", "Height of the 'Bottom' Cell (px)",null,{tags:['Private']});
    
    Border.prototype.publish("topCellPercentage", 0, "number", "Percentage (of parent) Height of the 'Top' Cell",null,{tags:['Private']});
    Border.prototype.publish("leftCellPercentage", 0, "number", "Percentage (of parent) Width of the 'Left' Cell",null,{tags:['Private']});
    Border.prototype.publish("rightCellPercentage", 0, "number", "Percentage (of parent) Width of the 'Right' Cell",null,{tags:['Private']});
    Border.prototype.publish("bottomCellPercentage", 0, "number", "Percentage (of parent) Height of the 'Bottom' Cell",null,{tags:['Private']});
    

    Border.prototype.publish("cellPadding", null, "string", "Cell Padding (px)", null, { tags: ['Intermediate'] });

    Border.prototype.publish("content", [], "widgetArray", "widgets",null,{tags:['Private']});

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
            this.content()[i]
                .fixedLeft(layoutObj[this.content()[i]._sectionType].left)
                .fixedTop(layoutObj[this.content()[i]._sectionType].top)
                .fixedWidth(layoutObj[this.content()[i]._sectionType].width)
                .fixedHeight(layoutObj[this.content()[i]._sectionType].height)
            ;
        }
    };
    Border.prototype.borderLayoutObject = function (layoutType) {
        var t,b,r,l,c,retObj = {},context=this;
        var gridRect = this.target().getBoundingClientRect();
        switch(layoutType){
            case 'Default':
            default:
                t = _sectionPlacementObject({
                    width:{"px":0,"%":100},
                    height:{"px":this.topCellSize(),"%":this.topCellPercentage()},
                    top:{"px":0,"%":0},
                    left:{"px":0,"%":0}
                });
                b = _sectionPlacementObject({
                    width:{"px":0,"%":100},
                    height:{"px":this.bottomCellSize(),"%":this.bottomCellPercentage()},
                    top:{"px":0,"%":100},
                    left:{"px":0,"%":0}
                });
                b.top -= b.height;
                l = _sectionPlacementObject({
                    width:{"px":this.leftCellSize(),"%":this.leftCellPercentage()},
                    height:{"px":-t.height-b.height,"%":100},
                    top:{"px":t.height,"%":0},
                    left:{"px":0,"%":0}
                });
                r = _sectionPlacementObject({
                    width:{"px":this.rightCellSize(),"%":this.rightCellPercentage()},
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
                retObj['topSection'] = t;
                retObj['bottomSection'] = b;
                retObj['rightSection'] = r;
                retObj['leftSection'] = l;
                retObj['centerSection'] = c;
        }
        return retObj;
        
        function _sectionPlacementObject(obj){
            var ret = {
                width:obj.width['px'] + (obj.width['%']/100 * gridRect.width),
                height:obj.height['px'] + (obj.height['%']/100 * gridRect.height),
                top:obj.top['px'] + (obj.top['%']/100 * gridRect.height) + context.gutter()/2,
                left:obj.left['px'] + (obj.left['%']/100 * gridRect.width) + context.gutter()/2
            };
            return ret;
        }
    };

    Border.prototype.clearContent = function () {
        this.content(this.content().filter(function (contentWidget) {
            contentWidget.target(null);
            return false;
        }));
    };

    Border.prototype.setContent = function (sectionType, widget, title) {
        title = typeof (title) !== 'undefined' ? title : "";
        if (widget) {
            var cell = new BorderCell()
                .widget(widget)
                .title(title)
            ;
            cell._sectionType = sectionType;
            this.content().push(cell);
        }
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
    
    Border.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("position", "relative");
        this.dropDiv = element.append("div");
        this.contentDiv = element.append("div");
        this._scrollBarWidth = this.getScrollbarWidth();
    };

    Border.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        var context = this;
        this.applyLayoutType(this.layoutType());

        var rows = this.contentDiv.selectAll(".cell_" + this._id).data(this.content(), function (d) { return d._id; });
        rows.enter().append("div")
            .attr("class", "cell_" + this._id)
            .style("position", "absolute")
            .each(function (d) {
                d
                   .target(this)
                ;
            });
        
        rows
            .style("left", function (d) { return d.fixedLeft() + "px"; })
            .style("top", function (d) { return d.fixedTop() + "px"; })
            .style("width", function (d) { return d.fixedWidth() - context.gutter() + "px"; })
            .style("height", function (d) { return d.fixedHeight() - context.gutter() + "px"; })
            .each(function (d) {
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
