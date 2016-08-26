"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Table", "../common/Palette", "css!./Legend"], factory);
    } else {
        root.other_Legend = factory(root.d3, root.other_Table, root.common_Palette);
    }
}(this, function (d3, Table, Palette) {
    function Legend() {
        Table.call(this);
        
        this.showHeader(false);
        this.pagination(false);
    }
    Legend.prototype = Object.create(Table.prototype);
    Legend.prototype.constructor = Legend;
    Legend.prototype._class += " other_Legend";

    Legend.prototype.publish("dataFamily", "ND", "set", "Type of data", ["1D", "2D", "ND", "map", "any"], { tags: ["Private"] });
    Legend.prototype.publish("orientation", "vertical", "set", "Orientation of Legend rows",["vertical","horizontal"],{tags:["Private"]});
    Legend.prototype.publish("rainbowFormat", ",", "string", "Rainbow number formatting", null, { tags: ["Private"], optional: true, disable: function (w) { return !w.isRainbow(); } });
    Legend.prototype.publish("rainbowBins", 8, "number", "Number of rainbow bins", null, { tags: ["Private"], disable: function (w) { return !w.isRainbow(); } });

    Legend.prototype.isRainbow = function () {
        var widget = this.getWidget();
        return widget && widget._palette && widget._palette.type() === "rainbow";
    };
    
    Legend.prototype.targetWidget = function (_) {
        if (!arguments.length) return this._targetWidget;
        this._targetWidget = _;
        if (this._targetWidgetMonitor) {
            this._targetWidgetMonitor.remove();
            delete this._targetWidgetMonitor;
        }
        var context = this;
        this._targetWidgetMonitor = this._targetWidget.monitor(function (key, newProp, oldProp, source) {
            switch (key) {
                case "chart":
                case "columns":
                case "data":
                case "paletteID":
                    context.lazyRender();
                    break;
            }
        });
        return this;
    };

    Legend.prototype.getWidget = function () {
        if (this._targetWidget) {
            switch (this._targetWidget.classID()) {
                case "chart_MultiChart":
                    return this._targetWidget.chart();
            }
        }
        return this._targetWidget;
    };

    Legend.prototype.getPalette = function () {
        var widget = this.getWidget();
        if (widget && widget._palette) {
            switch (widget._palette.type()) {
                case "ordinal":
                    return Palette.ordinal(widget._palette.id());
                case "rainbow":
                    return Palette.rainbow(widget._palette.id());
            }
        }
        return Palette.ordinal("default");
    };

    Legend.prototype.enter = function (domNode, element) {
        Table.prototype.enter.apply(this, arguments);
        d3.select(domNode.parentNode).style("overflow-y", "auto");

        this.renderHtmlDataCells(true);
        this.fixedHeader(false);
        this.fixedSize(true);
        element.classed("other_Legend", true);
    };

    function _htmlColorBlock(hexColor) {
        return "<div class=\"colorBlock\" style=\"background-color:" + hexColor + ";\"></div>";
    }

    Legend.prototype.update = function (domNode, element) {
        var colArr = ["Key", "Label"];
        var dataArr = [];
        if (this._targetWidget) {
            var palette = this.getPalette();
            switch (palette.type()) {
                case "ordinal":
                    switch (this.dataFamily()) {
                        case '2D':
                            dataArr = this._targetWidget.data().map(function (n) {
                                return [_htmlColorBlock(palette(n[0])), n[0]];
                            }, this);
                            break;
                        case 'ND':
                            var widgetColumns = this._targetWidget.columns();
                            dataArr = widgetColumns.filter(function (n, i) { return i > 0; }).map(function (n) {
                                return [_htmlColorBlock(palette(n)), n];
                            }, this);
                            break;
                    }
                    break;
                case "rainbow":
                    var format = d3.format(this.rainbowFormat());
                    var widget = this.getWidget();
                    var steps = this.rainbowBins();
                    var weightMin = widget._dataMinWeight;
                    var weightMax = widget._dataMaxWeight;
                    var stepWeightDiff = (weightMax - weightMin) / (steps - 1);
                    dataArr.push([_htmlColorBlock(palette(weightMin, weightMin, weightMax)), format(weightMin)]);
                    for (var x = 1; x < steps - 1; ++x) {
                        var mid = stepWeightDiff * x;
                        dataArr.push([_htmlColorBlock(palette(mid, weightMin, weightMax)), format(Math.floor(mid))]);
                    }
                    dataArr.push([_htmlColorBlock(palette(weightMax, weightMin, weightMax)), format(weightMax)]);
                    break;
            }
        }
        this.columns(colArr);
        this.data(dataArr);
        Table.prototype.update.apply(this, arguments);

        element.classed("horiz-legend",this.orientation() === "horizontal");
        
        var table = element.select(".tableDiv > table");
        var tableRect = table.node().getBoundingClientRect();
        var elementRect = this._parentElement.node().getBoundingClientRect();
        
        element.select(".tableDiv").style({overflow:"visible"});
        
        var top = elementRect.height/2 - tableRect.height/2;
        var left = elementRect.width/2 - tableRect.width/2;
        table.style({position:"absolute",top:top+"px",left:left+"px"});
        
        var startIndex = this.pageNumber()-1;
        var itemsOnPage = this.itemsPerPage();

        var start = startIndex * itemsOnPage;
        var end = parseInt(startIndex * itemsOnPage) + parseInt(itemsOnPage);

        var tData = null;
        if (this.pagination()) {
            tData = this.data().slice(start,end);
        } else {
            tData = this.data();
        }

        var rows = this.tbody.selectAll("tr").data(tData);
        var context = this;
        rows
            .on("click",function(d,i){
                context.onClick(d,i);
            })
            .on("mouseover",function(d,i){
                context.onMouseOver(d,i);
            })
        ;
    };
    
    Legend.prototype.exit = function (domNode, element) {
        if (this._targetWidgetMonitor) {
            this._targetWidgetMonitor.remove();
            delete this._targetWidgetMonitor;
        }
        Table.prototype.exit.apply(this, arguments);
    };

    Legend.prototype.onClick = function (rowData, rowIdx) {
        console.log("Legend onClick method"); 
        console.log("rowData: "+rowData);
        console.log("rowIdx: "+rowIdx);
    };
    Legend.prototype.onMouseOver = function (rowData,rowIdx) {
        console.log("Legend onMouseOver method"); 
        console.log("rowData: "+rowData);
        console.log("rowIdx: "+rowIdx);
    };

    return Legend;
}));