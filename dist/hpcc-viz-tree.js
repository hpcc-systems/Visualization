if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('tree/CirclePacking.js',["d3", "../common/SVGWidget", "../api/ITree", "../common/Text", "../common/FAChar", "css!./CirclePacking"], factory);
    } else {
        root.tree_CirclePacking = factory(root.d3, root.common_SVGWidget, root.api_ITree, root.common_Text, root.common_FAChar);
    }
}(this, function (d3, SVGWidget, ITree, Text, FAChar) {
    function CirclePacking(target) {
        SVGWidget.call(this);
        ITree.call(this);
    }
    CirclePacking.prototype = Object.create(SVGWidget.prototype);
    CirclePacking.prototype._class += " tree_CirclePacking";
    CirclePacking.prototype.implements(ITree.prototype);

    CirclePacking.prototype.publish("paletteID", "default", "set", "Palette ID", CirclePacking.prototype._palette.switch());

    CirclePacking.prototype.enter = function (domNode, element) {
        this.diameter = Math.min(this.width(), this.height());

        this.pack = d3.layout.pack()
            .size([this.diameter - 4, this.diameter - 4])
            .value(function (d) {
                return 1;
            })
        ;

        this.svg = element
            .append("g")
            .attr("transform", "rotate(30)")
        ;
    };

    CirclePacking.prototype.update = function (domNode, element) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        this.svg.selectAll("circle").remove();
        this.svg.selectAll("text").remove();

        var root = this._data;
        var focus = root;
        var nodes = this.pack.nodes(root);

        this.circle = this.svg.selectAll("circle")
            .data(nodes)
          .enter().append("circle")
            .attr("class", function (d) { return d.parent ? d.children ? "node" : "node leaf" : "node root"; })
            .style("fill", function (d) { return context._palette(d.label); })
            .on("click", function (d) { context.click(d); })
            .on("dblclick", function (d) {
                if (focus !== d) {
                    context.zoom(d);
                }
                d3.event.stopPropagation();
            })
        ;
        this.circle.append("title").text(function (d) { return d.label; });

        this.svg.selectAll("text").data(nodes).enter()
            .append("text")
            .attr("class", "label")
            .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
            .style("display", function (d) { return d.parent === root ? null : "none"; })
            .text(function (d) { return d.label; })
        ;

        this.node = this.svg.selectAll("circle,text");

        this.zoomTo([root.x, root.y, root.r * 2]);
    };

    CirclePacking.prototype.zoom = function (d) {
        var context = this;
        var focus = d;

        this.svg.selectAll("circle")
            .filter(function (d) { return d === focus; })
        ;
        var zoomTextSel = this.svg.selectAll("text")
           .filter(function (d) { return d !== focus && this.style.display === "inline"; })
        ;
        zoomTextSel.transition().duration(500)
            .style("opacity", 0)
            .each("end", function (d) {
                if (d !== focus) {
                    d3.select(this)
                        .style("display", "none")
                        .style("opacity", 1)
                    ;
                }
            })
        ;

        var transition = this.svg.transition()
            .duration(1000)
            .tween("zoom", function (d) {
                var i = d3.interpolateZoom(context.view, [focus.x, focus.y, focus.r * 2]);
                return function (t) { context.zoomTo(i(t)); };
            });

        transition.selectAll("text")
          .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
            .style("fill-opacity", function (d) { return d.parent === focus ? 1 : 0; })
            .each("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
            .each("end", function (d) {
                if (d.parent !== focus) {
                    this.style.display = "none";
                }
            })
        ;
    };

    CirclePacking.prototype.zoomTo = function (v) {
        var k = this.diameter / v[2];
        this.view = v;
        this.node.attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")rotate(-30)"; });
        this.circle.attr("r", function (d) { return d.r * k; });
    };

    return CirclePacking;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('tree/Dendrogram.js',["d3", "../common/SVGWidget", "../api/ITree", "css!./Dendrogram"], factory);
    } else {
        root.tree_Dendrogram = factory(root.d3, root.common_SVGWidget, root.api_ITree);
    }
}(this, function (d3, SVGWidget, ITree) {
    function Dendrogram(target) {
        SVGWidget.call(this);
        ITree.call(this);

        this._drawStartPos = "origin";
        this._maxTextWidth = 0;
    }
    Dendrogram.prototype = Object.create(SVGWidget.prototype);
    Dendrogram.prototype._class += " tree_Dendrogram";
    Dendrogram.prototype.implements(ITree.prototype);
    
    Dendrogram.prototype.publish("paletteID", "default", "set", "Palette ID", Dendrogram.prototype._palette.switch());
    Dendrogram.prototype.publish("textOffset", 8, "number", "Text offset from circle",null,{tags:['Private']});
    Dendrogram.prototype.publish("orientation", "horizontal", "set", "Orientation", ["horizontal","vertical"],{tags:['Private']}); 
     
    Dendrogram.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        var context = this;
        this.layout = d3.layout.cluster();

        this.diagonal = d3.svg.diagonal()
            .projection(function (d) { return context.orientation() === "horizontal" ? [d.y, d.x] : [d.x, d.y]; })
        ;
    };

    Dendrogram.prototype.update = function (domNode, element, secondPass) {
        var context = this;
        SVGWidget.prototype.update.apply(this, arguments);
        
        this._palette = this._palette.switch(this.paletteID());

        //  Pad to allow text to display  ---
        this.x(this._maxTextWidth);
        var width = this.width() - this._maxTextWidth * 2;
        if(this.orientation() === "horizontal"){
            this.layout
                .size([this.height(), width])
            ;
        } else {
            this.layout
                .size([width, this.height()])
            ;            
        }

        var dataNodes = this.layout.nodes(this.data());
        var links = this.layout.links(dataNodes);

        //  Lines  ---
        var lines = element.selectAll(".link").data(links);
        lines.enter().append("path")
            .attr("class", "link")
        ;
        lines
            .attr("d", this.diagonal)
        ;
        lines.exit().remove();

        //  Nodes  ---
        var nodes = element.selectAll(".node").data(dataNodes);
        nodes.enter().append("g")
            .attr("class", "node")
            .on("click", function (d) { context.click(d); })
            .each(function (d) {
                var element = d3.select(this);
                element.append("circle");
                element.append("text");
            })
        ;

        var maxTextWidth = 0;
        nodes
            .attr("transform", function (d) { return context.orientation() === "horizontal" ? "translate(" + d.y + "," + d.x + ")" : "translate(" + d.x + "," + d.y + ")";  })
        ;
        nodes.select("circle")
            .attr("r", 4.5)
            .style("fill", function (d) { return context._palette(d.label); })
            .append("title")
            .text(function (d) { return d.label; })
        ;
        nodes.select("text")
            .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
            .attr("dx", function (d) { return d.children ? -context.textOffset() : context.textOffset(); })
            .attr("dy", 3)
            .text(function (d) { return d.label; })
            .each(function (d) {
                if (!secondPass) {
                    var bbox = d3.select(this).node().getBBox();
                    if (bbox.width > maxTextWidth) {
                        maxTextWidth = bbox.width;
                    }
                }
            })
        ;
        maxTextWidth += this.textOffset();

        nodes.exit().remove();

        if (!secondPass && this._maxTextWidth !== maxTextWidth) {
            this._maxTextWidth = maxTextWidth;
            this.update(domNode, element, true);
        }
    };

    return Dendrogram;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('tree/SunburstPartition.js',["d3", "../common/SVGWidget", "../api/ITree", "../common/Text", "../common/FAChar", "css!./SunburstPartition"], factory);
    } else {
        root.tree_SunburstPartition = factory(root.d3, root.common_SVGWidget, root.api_ITree, root.common_Text, root.common_FAChar);
    }
}(this, function (d3, SVGWidget, ITree, Text, FAChar) {
    function SunburstPartition(target) {
        SVGWidget.call(this);
        ITree.call(this);
    }
    SunburstPartition.prototype = Object.create(SVGWidget.prototype);
    SunburstPartition.prototype._class += " tree_SunburstPartition";
    SunburstPartition.prototype.implements(ITree.prototype);

    SunburstPartition.prototype.publish("paletteID", "default", "set", "Palette ID", SunburstPartition.prototype._palette.switch());

    SunburstPartition.prototype.root = function (_) {
        if (!arguments.length) return this._root || this._data;
        this._root = _;

        if (this.svg) {
            this.svg.selectAll("path").transition()
                .duration(750)
                .attrTween("d", this.arcTweenFunc(this._root))
            ;
        }
        return this;
    };

    SunburstPartition.prototype.data = function () {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._resetRoot = true;
        }
        return retVal;
    };

    SunburstPartition.prototype.enter = function (domNode, element) {
        var context = this;

        this.radius = Math.min(this.width(), this.height()) / 2;

        this._xScale = d3.scale.linear()
            .range([0, 2 * Math.PI])
        ;

        this._yScale = d3.scale.sqrt()
            .range([0, this.radius])
        ;

        this.partition = d3.layout.partition()
            .value(function (d) {
                return d.value !== undefined ? d.value : 1;
            })
        ;

        this.arc = d3.svg.arc()
            .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, context._xScale(d.x))); })
            .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, context._xScale(d.x + d.dx))); })
            .innerRadius(function (d) { return Math.max(0, context._yScale(d.y)); })
            .outerRadius(function (d) { return Math.max(0, context._yScale(d.y + d.dy)); })
        ;

        this.svg = element.append("g");
    };

    SunburstPartition.prototype.update = function (domNode, element) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        this.radius = Math.min(this.width(), this.height()) / 2;
        this._xScale.range([0, 2 * Math.PI]);
        this._yScale.range([0, this.radius]);

        this._dataNodes = this.partition.nodes(this._data);
        var paths = this.svg.selectAll("path").data(this._dataNodes, function (d, i) { return d.id !== undefined ? d.id : i; });
        paths.enter().append("path")
            .on("click", function (d) { context.click(d); })
            .on("dblclick", dblclick)
            .append("title")
        ;
        paths
            .attr("d", this.arc)
            .style("fill", function (d) {
                return d.__viz_fill ? d.__viz_fill : context._palette(d.label);
            })
            .style("stroke", function (d) {
                return d.value > 16 ? "white" : "none";
            })
            .select("title")
                .text(function (d) { return d.label; })
        ;

        paths.exit().remove();

        if (this._resetRoot) {
            this._resetRoot = false;
            this.root(this._dataNodes[0]);
        }

        function dblclick(d) {
            if (d3.event) {
                d3.event.stopPropagation();
            }
            context.root(d);
        }
    };

    SunburstPartition.prototype.arcTweenFunc = function (d) {
        var xd = d3.interpolate(this._xScale.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(this._yScale.domain(), [d.y, 1]),
            yr = d3.interpolate(this._yScale.range(), [d.y ? 20 : 0, this.radius]);
        var context = this;
        return function (d, i) {
            return i ?
                function (t) { return context.arc(d); } :
                function (t) { context._xScale.domain(xd(t)); context._yScale.domain(yd(t)).range(yr(t)); return context.arc(d); };
        };
    };

    return SunburstPartition;
}));

