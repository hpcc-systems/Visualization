(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "./ITree", "css!./Dendrogram"], factory);
    } else {
        root.Dendrogram = factory(root.d3, root.SVGWidget, root.ITree);
    }
}(this, function (d3, SVGWidget, ITree) {
    function Dendrogram(target) {
        SVGWidget.call(this);
        ITree.call(this);
        this._class = "tree_Dendrogram";
    };
    Dendrogram.prototype = Object.create(SVGWidget.prototype);
    Dendrogram.prototype.implements(ITree.prototype);

    Dendrogram.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);

        this.layout = d3.layout.cluster();

        this.diagonal = d3.svg.diagonal()
            .projection(function (d) { return [d.y, d.x]; })
        ;

        this.g = element.append("g");
    };

    Dendrogram.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        var width = this.width() - 60;  //  Pad to allow text to display
        this.layout
            .size([this.height(), width])
        ;
        this.g
            .attr("transform", "translate(" + (-width  / 2) + "," + (-this.height() / 2) + ")");
        ;

        var nodes = this.layout.nodes(this.data());
        var links = this.layout.links(nodes);

        //  Lines  ---
        var lines = this.g.selectAll(".link").data(links);
        lines.enter().append("path")
            .attr("class", "link")
        ;
        lines
            .attr("d", this.diagonal)
        ;
        lines.exit().remove();

        //  Nodes  ---
        var nodes = this.g.selectAll(".node").data(nodes);
        var node = nodes.enter().append("g")
            .attr("class", "node")
        ;
        var context = this;
        node.append("circle")
            .attr("r", 4.5)
            .style("fill", function (d) { return context._palette(d.label); })
        ;
        node.append("text")
            .attr("dx", function (d) { return d.children ? -8 : 8; })
            .attr("dy", 3)
        ;
        nodes
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
        ;
        nodes.select("text")
            .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
            .text(function (d) { return d.label; })
        ;
        nodes.exit().remove();
    };

    return Dendrogram;
}));
