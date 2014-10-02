(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "../common/Palette", "./ITree", "../common/Text", "../common/FAChar", "css!./CirclePacking"], factory);
    } else {
        root.CirclePacking = factory(root.d3, root.SVGWidget, root.Palette, root.ITree, root.Text, root.FAChar);
    }
}(this, function (d3, SVGWidget, Palette, ITree, Text, FAChar) {
    function CirclePacking(target) {
        SVGWidget.call(this);
        ITree.call(this);

        this._class = "circlepacking";
    };
    CirclePacking.prototype = Object.create(SVGWidget.prototype);
    CirclePacking.prototype.implements(ITree.prototype);

    CirclePacking.prototype.d3Color = Palette.ordinal("category20");

    CirclePacking.prototype.enter = function (domNode, element) {
        var context = this;

        var diameter = Math.min(this.width(), this.height());

        this.pack = d3.layout.pack()
            .size([diameter - 4, diameter - 4])
            .value(function(d) { 
                return 1; 
            })
        ;

        this.svg = element
            .append("g")
            .attr("transform", "translate(" + -this.width() / 2 + "," + -this.height() / 2 + ")")
        ;
    };

    CirclePacking.prototype.update = function (domNode, element) {
        var context = this;

        var node = this.svg.datum(this._data).selectAll(".node").data(this.pack.nodes)
            .enter().append("g")
                .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        ;

        node.append("title")
          .text(function(d) { return d.label; })
        ;

        node.append("circle")
          .attr("r", function(d) { return d.r; })
        ;

        node.filter(function(d) { return !d.children; }).append("text")
          .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.label.substring(0, d.r / 3); })
        ;
    };

    return CirclePacking;
}));
