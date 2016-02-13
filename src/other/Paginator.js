"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "css!./Paginator.css"], factory);
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
    Paginator.prototype.constructor = Paginator;
    Paginator.prototype._class += " other_Paginator";

    Paginator.prototype.publish("itemsPerPage", 2, "number", "Pagination items per page",null,{tags:["Private"]});

    Paginator.prototype.publish("numItems", 10, "number", "Pagination total number of items",null,{tags:["Private"]});
    Paginator.prototype.publish("pageNumber", 1, "number", "Pagination set or get the page number",null,{tags:["Private"]});
    Paginator.prototype.publish("adjacentPages", 2, "number", "Number of page indexes either side of current one", null, { tags: ["Private"] });
    Paginator.prototype.publish("bottom", 20, "number", "Pagination bottom offset", null, { tags: ["Private"] });
    Paginator.prototype.publish("right", 20, "number", "Pagination right offset", null, { tags: ["Private"] });

    Paginator.prototype.postUpdate = function (domNode, element) { };

    Paginator.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;

        this.paginator = element.append("ul").attr("class","paginator pagination pagination-sm");
        this.side = element.append("div").attr("class","paginator pagination side");

        this.side.append("span")
            .classed("side", true)
            .text("Page ")
        ;

        this.side.append("input")
            .attr("type","number")
            .attr("class","currentPageNumber")
            .property("value",1)
            .attr("min",1)
            .on("change", function() {
                context.pageNumber(this.value);
                context._onSelect(this.value);
            })
        ;

        this.side.append("span")
            .classed("side total", true)
            .text(" of 1")
        ;
    };

    Paginator.prototype.update = function (domNode, element) {
        var context = this;
        element
            .style("bottom", this.bottom() + "px")
            .style("right", this.right() + "px")
        ;

        this._tNumPages = Math.ceil(this.numItems() / this.itemsPerPage()) || 1;

        if (this.pageNumber() > this._tNumPages) { this.pageNumber(1); }

        this._numList = [];
        if (this.numItems()) {
            this._numList.push("first");
            for (var x = -this.adjacentPages() ; x <= this.adjacentPages() ; x++) {
                if (this.pageNumber() + x > 0 && this.pageNumber() + x <= this._tNumPages) {
                    this._numList.push(this.pageNumber() + x);
                }
            }
            this._numList.push("last");
        }

        this.side.select(".total").text(" of "+this._tNumPages);
        this.side.select(".currentPageNumber").property("value",this.pageNumber());
        this.side.select(".currentPageNumber").attr("max",this._tNumPages);

        var page = this.paginator.selectAll("li").data(this._numList,function(d) { return d; });
        page
            .enter()
            .append(function(d) {
                var li = document.createElement("li");

                if (d !== context.pageNumber()) {
                    var a = document.createElement("a");
                    var linkText = document.createTextNode(d);

                    a.appendChild(linkText);
                    a.href = "#";
                    li.appendChild(a);

                    return li;
                } else {
                    var span = document.createElement("span");
                        span.innerHTML = d;

                        li.appendChild(span);

                    return li;
                }
            })
            .on("click", function(d, i) {
                d3.event.preventDefault();
                context.side.select(".currentPageNumber").property("value",context.pageNumber());
                switch(d) {
                    case "first":
                        if (context.pageNumber() !== 1) {
                            context.pageNumber(1);
                            context._onSelect(1, "previous");
                        }
                        break;
                    case "last":
                        if (context.pageNumber() !== context._tNumPages) {
                            context.pageNumber(context._tNumPages);
                            context._onSelect(context._tNumPages, "previous");
                        }
                        break;
                    default:
                        context.pageNumber(d);
                        context._onSelect(d);
                }
            })
        ;

        page.classed("active", function(e, j) { return e === context.pageNumber(); })
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