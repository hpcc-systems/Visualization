"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget","css!./Paginator"], factory);
    } else {
        root.other_Paginator = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Paginator() {
        HTMLWidget.call(this);

        this._tag = "div";

        this._tNumPages = 1; //np

        this._numList = []; //pn
    }
    Paginator.prototype = Object.create(HTMLWidget.prototype);
    Paginator.prototype._class += " other_Paginator";

    Paginator.prototype.publish("itemsPerPage", 2, "number", "Pagination items per page",null,{tags:['Private']});
    Paginator.prototype.publish("numItems", 10, "number", "Pagination total number of items",null,{tags:['Private']});
    Paginator.prototype.publish("pageNumber", 1, "number", "Pagination set or get the page number",null,{tags:['Private']});

    Paginator.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this.paginator = element.append("ul").attr("class","paginator pagination pagination-sm");
    };

    Paginator.prototype.update = function (domNode, element) {
        var context = this;
        this._tNumPages = Math.ceil(this.numItems() / this.itemsPerPage()) || 1;

        if (this.pageNumber() > this._tNumPages) { this.pageNumber(1); }

        this._numList = [];
        if (this.numItems()) {
            this._numList.push("previous");
            for (var i=0; i < this._tNumPages; i++) {
                this._numList.push(i+1);
            }
            this._numList.push("next");
        }
        
        var page = this.paginator.selectAll("li").data(this._numList,function(d) { return d; });
        page 
            .enter() 
            .append("li") 
            .append("a") 
            .attr("href", "#")
            .on('click', function(d, i) {
                d3.event.preventDefault();
                if (d==='next') {
                    if ((context.pageNumber()+1) <= context._tNumPages) {
                        var p = context.pageNumber()+1; 
                        context.pageNumber(p); 
                        context._onSelect(p,"next"); 
                    }
                } else if (d==='previous') {
                    if ((context.pageNumber() - 1) >= 1) {
                        var p2 = context.pageNumber()-1; 
                        context.pageNumber(p2); 
                        context._onSelect(p2, "previous"); 
                    }
                } else {
                    context.pageNumber(d); 
                    context._onSelect(d);
                }
            })
        ;
            
        page.classed("active", function(e, j) { return j === context.pageNumber(); })
            .select("a")
            .text(function(d) { return d; })
        ;
        
        page.exit().remove();
        page.order();

        if (this.numItems() === 0) { 
            d3.select(domNode).remove();
        }        
    };
    
    Paginator.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Paginator;
}));