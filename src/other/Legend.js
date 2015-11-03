"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Table", "css!./Legend"], factory);
    } else {
        root.other_Legend = factory(root.d3, root.other_Table);
    }
}(this, function (d3, Table) {
    function Legend() {
        Table.call(this);
        this._tag = "div";
        
        this.showHeader(false);
    }
    Legend.prototype = Object.create(Table.prototype);
    Legend.prototype.constructor = Legend;
    Legend.prototype._class += " other_Legend";

    //We may need a new publish param "type" to store references to widgets
    //Legend.prototype.publish("targetWidget", null, "widget", "Target widget for Legend",null,{tags:["Private"]});
    
    Legend.prototype.targetWidget = function (widget) {
        var context = this;
            var colArr = ["Key", "Label"];
            var dataArr = [];
            var widgetColumns = widget.columns();

            var paletteType = widget._palette.toString().split("function ")[1].split("(")[0];
            if(paletteType === "ordinal"){
                for(var i in widgetColumns){
                    if(i > 0){
                        dataArr.push([
                            _htmlColorBlock(widget._palette(widgetColumns[i])),
                            widgetColumns[i]
                        ]);
                    }
                }
            } 
            else if (paletteType === "rainbow"){
                var colorArr = widget._palette.colors().reverse();
                var steps = colorArr.length;
                var weightMin = widget._dataMinWeight;
                var weightMax = widget._dataMaxWeight;
                for(var x = 0;x<steps;x++){
                    var stepWeightDiff = parseInt((weightMax - weightMin) / steps);
                    var lower,higher;
                    if(x === 0){
                        higher = commaSeparateNumber(weightMin + stepWeightDiff*(x+1));
                        dataArr.push([_htmlColorBlock(colorArr[x]),"0 - " + higher]);
                    } else if (x+1 === steps){
                        lower = commaSeparateNumber(weightMin + (stepWeightDiff*x) + 1);
                        dataArr.push([_htmlColorBlock(colorArr[x]),lower + "+"]);
                    } else {
                        lower = commaSeparateNumber(weightMin + (stepWeightDiff*x) + 1);
                        higher = commaSeparateNumber(weightMin + stepWeightDiff*(x+1));
                        dataArr.push([_htmlColorBlock(colorArr[x]),lower + " - " + higher]);
                    }
                }
            }

            context.columns(colArr);
            context.data(dataArr);

            context._targetWidget = widget;
        
        return this;
        
        function _htmlColorBlock(hexColor){
            return "<div class=\"colorBlock\" style=\"background-color:"+hexColor+";\"></div>";
        }
        function commaSeparateNumber(val){
            var int = val.toString().split(".")[0];
            var dec = val.toString().split(".")[1];
            while (/(\d+)(\d{3})/.test(int.toString())){
                int = int.toString().replace(/(\d+)(\d{3})/, "$1"+","+"$2");
            }
            return typeof(dec) !== "undefined" ? int+"."+dec : int;
        }
    };

    Legend.prototype.enter = function (domNode, element) {
        Table.prototype.enter.apply(this, arguments);
        this.renderHtmlDataCells(true);
        this.fixedHeader(false);
        this.fixedSize(true);
        element.classed("other_Legend", true);
    };

    Legend.prototype.update = function (domNode, element) {
        Table.prototype.update.apply(this, arguments);
        
        var context = this;
        if(typeof (this._targetWidget) !== "undefined"){
            this.targetWidget(this._targetWidget);
        }
        
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
        rows
            .on("click",function(d,i){
                context.onClick(d,i);
            })
            .on("mouseover",function(d,i){
                context.onMouseOver(d,i);
            })
        ;
    };
    
    Legend.prototype.onClick = function (rowData,rowIdx) { 
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