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
    CirclePacking.prototype.constructor = CirclePacking;
    CirclePacking.prototype._class += " tree_CirclePacking";
    CirclePacking.prototype.implements(ITree.prototype);

    CirclePacking.prototype.publish("paletteID", "default", "set", "Palette ID", CirclePacking.prototype._palette.switch(),{tags:["Basic","Shared"]});
    CirclePacking.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

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
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this.svg.selectAll("circle").remove();
        this.svg.selectAll("text").remove();

        var root = this.data();
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
        define('tree/Dendrogram.js',["d3", "../common/SVGZoomWidget", "../common/PropertyExt", "../api/ITree", "../common/Utility", "css!./Dendrogram"], factory);
    } else {
        root.tree_Dendrogram = factory(root.d3, root.common_SVGZoomWidget, root.common_PropertyExt, root.api_ITree, root.common_Utility);
    }
}(this, function (d3, SVGZoomWidget, PropertyExt, ITree, Utility) {
    function Column(owner) {
        PropertyExt.call(this);
        this._owner = owner;
    }
    Column.prototype = Object.create(PropertyExt.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " tree_Dendrogram.Column";

    Column.prototype.publish("column", null, "set", "Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });

    // ===
    function Dendrogram(target) {
        SVGZoomWidget.call(this);
        ITree.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";

        var context = this;

        this._d3LayoutCluster = d3.layout.cluster();
        this._d3LayoutTree = d3.layout.tree();
        this._d3Diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return context.orientation() === "horizontal" ? [d.y, d.x] : [d.x, d.y];
            })
        ;
        this._d3DiagonalRadial = d3.svg.diagonal.radial()
            .projection(function (d) {
                return [d.y, d.x / 180 * Math.PI];
            })
        ;
    }
    Dendrogram.prototype = Object.create(SVGZoomWidget.prototype);
    Dendrogram.prototype.constructor = Dendrogram;
    Dendrogram.prototype._class += " tree_Dendrogram";
    Dendrogram.prototype.implements(ITree.prototype);
    Dendrogram.prototype.mixin(Utility.SimpleSelectionMixin);
    Dendrogram.prototype.Column = Column;

    Dendrogram.prototype.publish("paletteID", "default", "set", "Palette ID", Dendrogram.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Dendrogram.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});
    Dendrogram.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: Column });

    Dendrogram.prototype.publish("circleRadius", 4.5, "number", "Text offset from circle");
    Dendrogram.prototype.publish("separation", 240, "number", "Leaf Separation");
    Dendrogram.prototype.publish("dendrogram", true, "boolean", "Dendrogram");
    Dendrogram.prototype.publish("radial", false, "boolean", "Radial");
    Dendrogram.prototype.publish("orientation", "horizontal", "set", "Orientation", ["horizontal", "vertical"], { tags: ["Private"], disabled: function () { return this.radial(); } });

    Dendrogram.prototype.dendrogramData = function () {
        if (!this.mappings().filter(function (mapping) { return mapping.column(); }).length) {
            return this.data();
        }
        var view = this._db.rollupView(this.mappings().map(function (mapping) { return mapping.column(); }));
        var retVal = {
            key: "root",
            values: view.entries()
        };
        return formatData(retVal);

        function formatData(node) {
            return {
                label: node.key,
                children: node.values.filter(function (value) { return !(value instanceof Array); }).map(function (value) { return formatData(value); }),
                origRows: node.values
            };
        }
    };
    
    Dendrogram.prototype.enter = function (domNode, element) {
        SVGZoomWidget.prototype.enter.apply(this, arguments);
        this._renderElement
            .attr("opacity", 0)
            .transition().duration(500)
            .attr("opacity", 1)
        ;
        this._selection.widgetElement(this._renderElement);
    };

    Dendrogram.prototype.update = function (domNode, element, secondPass) {
        SVGZoomWidget.prototype.update.apply(this, arguments);
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._d3Layout = this.dendrogram() ? this._d3LayoutCluster : this._d3LayoutTree;

        if (this.radial()) {
            this._d3Layout
                .size([360, this.separation() * 2])
            ;
            this._d3Layout.separation(function separation(a, b) {
                return (a.parent === b.parent ? 1 : 2) / a.depth;
            });
        } else {
            this._d3Layout.nodeSize([14, this.separation()]);
            this._d3Layout.separation(function separation(a, b) {
                return a.parent === b.parent ? 1 : 2;
            });
        }

        var data = this.dendrogramData();
        var dataNodes = this._d3Layout.nodes(data);
        var links = this._d3Layout.links(dataNodes);

        //  Lines  ---
        var transitionDuration = this._renderCount ? 500 : 0;
        var lines = this._renderElement.selectAll(".link").data(links);
        lines.enter().append("path")
            .attr("class", "link")
            .attr("d", this.radial() ? this._d3DiagonalRadial : this._d3Diagonal)
        ;
        lines.transition().duration(transitionDuration)
            .attr("d", this.radial() ? this._d3DiagonalRadial : this._d3Diagonal)
        ;
        lines.exit().remove();

        //  Nodes  ---
        var textOffsetX = this.circleRadius() + 2;
        function nodeTransform(d) {
            if (context.radial()) {
                return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
            }
            return context.orientation() === "horizontal" ? "translate(" + d.y + "," + d.x + ")" : "translate(" + d.x + "," + d.y + ")";
        }
        var nodes = this._renderElement.selectAll(".node").data(dataNodes);
        nodes.transition().duration(transitionDuration)
            .attr("transform", nodeTransform)
        ;
        nodes.enter().append("g")
            .attr("class", "node")
            .attr("transform", nodeTransform)
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                var tmp = d;
                while (tmp.children) {
                    tmp = tmp.children[0];
                }
                if (d.depth > 0) {
                    context.click(context.rowToObj(tmp.origRows[0]), context.mappings()[d.depth - 1].column(), true);
                }
            })
            .each(function (d, i) {
                var element = d3.select(this);
                element.append("circle");
                element.append("text");
            })
        ;
        nodes.select("circle")
            .attr("r", this.circleRadius())
            .style("fill", function (d) { return context._palette(d.label); })
            .append("title")
            .text(function (d) { return d.label; })
        ;
        nodes.select("text")
            .attr("dx", function (d) { 
                if (context.radial()) {
                    if (d.children) {
                        return d.x < 180 ? -textOffsetX : textOffsetX;
                    } else {
                        return d.x < 180 ? textOffsetX : -textOffsetX;
                    }
                } else if (context.orientation() === "vertical") {
                    return d.children ? textOffsetX : -textOffsetX;
                }
                return d.children ? -textOffsetX : textOffsetX;
            })
            .attr("dy", "0.25em")
            .style("text-anchor", function (d) {
                if (context.radial()) {
                    if (d.children) {
                        return d.x < 180 ? "end" : "start";
                    } else {
                        return d.x < 180 ? "start" : "end";
                    }
                } else if (context.orientation() === "vertical") {
                    return d.children ? "start" : "end";
                }
                return d.children ? "end" : "start";
            })
            .attr("transform", function (d) {
                if (context.radial()) {
                    return d.x < 180 ? null : "rotate(180)";
                } else if (context.orientation() === "vertical") {
                    return "rotate(-66)";
                }
                return null;
            })
            .text(function (d) { return d.label; })
        ;
        nodes.exit().remove();

        if (!this._renderCount) {
            context.zoomToFit();
        }
    };

    return Dendrogram;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('tree/Indented.js',["d3", "../common/SVGZoomWidget", "../common/PropertyExt", "../api/ITree", "../common/Utility", "css!./Indented"], factory);
    } else {
        root.tree_Indented = factory(root.d3, root.common_SVGZoomWidget, root.common_PropertyExt, root.api_ITree, root.common_Utility);
    }
}(this, function (d3, SVGZoomWidget, PropertyExt, ITree, Utility) {
    function Column(owner) {
        PropertyExt.call(this);
        this._owner = owner;
    }
    Column.prototype = Object.create(PropertyExt.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " tree_Dendrogram.Column";

    Column.prototype.publish("column", null, "set", "Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });

    // ===
    function Indented(target) {
        SVGZoomWidget.call(this);
        ITree.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";

        this._d3LayoutTree = d3.layout.tree();
        this._d3Diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.y, d.x];
            })
        ;
    }
    Indented.prototype = Object.create(SVGZoomWidget.prototype);
    Indented.prototype.constructor = Indented;
    Indented.prototype._class += " tree_Indented";
    Indented.prototype.implements(ITree.prototype);
    Indented.prototype.mixin(Utility.SimpleSelectionMixin);
    Indented.prototype.Column = Column;

    Indented.prototype.publish("xmlColumn", null, "set", "Field", function () { return this.columns(); }, { optional: true });
    Indented.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: Column, disable: function (w) { return w.xmlColumn_exists(); } });
    Indented.prototype.publish("barHeight", 16, "number", "Bar height");

    function xmlToJson(xml, id) {
        id = id || "";
        var retVal = {
            id: id,
            label: "",
            attributes: {},
            children: []
        };

        retVal.label = xml.nodeName;
        if (xml.nodeType === 1) { // element
            if (xml.attributes.length > 0) {
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    retVal.attributes[attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) { // text
            retVal.label = xml.nodeValue;
        }

        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var child = xmlToJson(item, id + "[" + retVal.children.length + "]");
                retVal.children.push(child);
            }
        }
        return retVal;
    }

    Indented.prototype.xmlToData = function (xml, id) {
        if (DOMParser) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(xml, "text/xml");
            return xmlToJson(doc, id).children[0];
        }
        return [];
    };

    Indented.prototype.xml = function (_) {
        if (!arguments.length) return this._xml;
        this._xml = _;
        this.data(this.xmlToData(this._xml));
        return this;
    };

    Indented.prototype.IndentedData = function () {
        if (this.xmlColumn_exists()) {
            var cellIdx = this.columns().indexOf(this.xmlColumn());
            var retVal = {
                label: this.xmlColumn(),
                children: this.data().map(function (row, idx) {
                    return this.xmlToData(row[cellIdx], "[" + idx + "]");
                }, this)
            };
            return retVal.children.length === 1 ? retVal.children[0] : retVal;
        } else {
            if (!this.mappings().filter(function (mapping) { return mapping.column(); }).length) {
                return this.data();
            }
            var view = this._db.rollupView(this.mappings().map(function (mapping) { return mapping.column(); }));
            var root = {
                key: "root",
                values: view.entries()
            };
            return formatData(root);
        }

        function formatData(node) {
            if (node.values instanceof Array) {
                var children = node.values.filter(function (value) {
                    return !(value instanceof Array);
                }).map(function (value) {
                    return formatData(value);
                });
                var retVal = {
                    label: node.key
                };
                if (children.length) {
                    retVal.children = children;
                } else {
                    retVal.size = 22;
                }
                return retVal;
            }
            return {
                label: node.key,
                size: node.values.aggregate,
                origRows: node.values
            };
        }
    };

    Indented.prototype.enter = function (domNode, element) {
        SVGZoomWidget.prototype.enter.apply(this, arguments);
        this._svgLinks = this._renderElement.append("g");
        this._svgNodes = this._renderElement.append("g");
        this._selection.widgetElement(this._svgNodes);
    };

    Indented.prototype.update = function (domNode, element, secondPass) {
        SVGZoomWidget.prototype.update.apply(this, arguments);
        var context = this;

        this._d3LayoutTree
            .nodeSize([0, this.barHeight()])
        ;
        var dataChecksum = this._db.dataChecksum();
        if (this._prevDataChecksum !== dataChecksum) {
            this._treeData = this.IndentedData();
            this._prevDataChecksum = dataChecksum;
        }
        var dataNodes = this._d3LayoutTree.nodes(this._treeData);
        var links = this._d3LayoutTree.links(dataNodes);

        dataNodes.forEach(function (n, i) {
            n.x = i * this.barHeight();
        }, this);

        var boxSize = this.barHeight() - 4;
        var transitionDuration = this._renderCount ? 500 : 0;

        //  Lines  ---
        var lines = this._svgLinks.selectAll(".link").data(links, function (d, i) { return d.source.id + "->" + d.target.id; });
        lines.enter().append("path")
            .attr("class", "link")
            .attr("d", this._d3Diagonal)
        ;
        lines.transition().duration(transitionDuration)
            .attr("d", this._d3Diagonal)
        ;
        lines.exit().remove();

        //  Nodes  ---
        var nodes = this._svgNodes.selectAll(".node").data(dataNodes, function (d, i) { return d.id; });
        nodes.transition().duration(transitionDuration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
        ;
        nodes.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
            .call(this._selection.enter.bind(this._selection))
            .each(function (d, i) {
                var element = d3.select(this);
                element.append("rect")
                    .attr("height", boxSize)
                    .attr("width", boxSize)
                    .on("click", function (d) {
                        if (d.children) {
                            d._children = d.children;
                            d.children = null;
                        } else {
                            d.children = d._children;
                            d._children = null;
                        }
                        if (d.depth > 0) {
                            //context.click(context.rowToObj(tmp.origRows ? tmp.origRows[0] : tmp), context.mappings()[d.depth - 1].column(), true);
                        }
                        context.lazyRender();
                    })
                ;
                element.append("text");
            })
            .style("opacity", 0).transition()
            .style("opacity", 1)
        ;
        nodes.select("rect")
            .attr("x", -boxSize / 2)
            .attr("y", -boxSize / 2)
            .style("fill", color)
        ;
        nodes.select("text")
            .attr("dx", boxSize / 2 + 4 + "px")
            .attr("dy", "0.33em")
            .text(function (d) { return d.label; })
        ;
        nodes.exit().transition()
            .style("opacity", 0)
            .remove()
        ;

        if (!this._renderCount) {
            context.zoomToFit();
        }

        function color(d) {
            return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
        }
    };

    return Indented;
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
    SunburstPartition.prototype.constructor = SunburstPartition;
    SunburstPartition.prototype._class += " tree_SunburstPartition";
    SunburstPartition.prototype.implements(ITree.prototype);

    SunburstPartition.prototype.publish("paletteID", "default", "set", "Palette ID", SunburstPartition.prototype._palette.switch(),{tags:["Basic","Shared"]});
    SunburstPartition.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    SunburstPartition.prototype.root = function (_) {
        if (!arguments.length) return this._root || this.data();
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
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this.radius = Math.min(this.width(), this.height()) / 2;
        this._xScale.range([0, 2 * Math.PI]);
        this._yScale.range([0, this.radius]);

        this._dataNodes = this.partition.nodes(this.data());
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



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('tree/Treemap.js',["d3", "../common/HTMLWidget", "../common/PropertyExt", "../api/ITree", "../common/Utility", "css!./Treemap"], factory);
    } else {
        root.tree_Treemap = factory(root.d3, root.common_HTMLWidget, root.common_PropertyExt, root.api_ITree, root.common_Utility);
    }
}(this, function (d3, HTMLWidget, PropertyExt, ITree, Utility) {
    function Column(owner) {
        PropertyExt.call(this);
        this._owner = owner;
    }
    Column.prototype = Object.create(PropertyExt.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " tree_Dendrogram.Column";

    Column.prototype.publish("column", null, "set", "Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });

    // ===
    function Treemap(target) {
        HTMLWidget.call(this);
        ITree.call(this);
        Utility.SimpleSelectionMixin.call(this);
    }
    Treemap.prototype = Object.create(HTMLWidget.prototype);
    Treemap.prototype.constructor = Treemap;
    Treemap.prototype._class += " tree_Treemap";
    Treemap.prototype.implements(ITree.prototype);
    Treemap.prototype.mixin(Utility.SimpleSelectionMixin);
    Treemap.prototype.Column = Column;

    Treemap.prototype.publish("paletteID", "default", "set", "Palette ID", Treemap.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
    Treemap.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
    Treemap.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: Column });
    Treemap.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true });
    Treemap.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: function (w) { return !w.aggrType(); } });
    Treemap.prototype.publish("fontSize", null, "number", "Font Size", null, { optional: true });
    Treemap.prototype.publish("transitionDuration", 250, "number", "Transition Duration");

    Treemap.prototype.treemapData = function () {
        if (!this.mappings().filter(function (mapping) { return mapping.column(); }).length) {
            return this.data();
        }

        var view = this._db.aggregateView(this.mappings().map(function (mapping) { return mapping.column(); }), this.aggrType(), this.aggrColumn());
        var retVal = {
            key: "root",
            values: view.entries()
        };
        return formatData(retVal);

        function formatData(node) {
            if (node.values instanceof Array) {
                var children = node.values.filter(function (value) {
                    return !(value instanceof Array);
                }).map(function (value) {
                    return formatData(value);
                });
                var retVal = {
                    label: node.key
                };
                if (children.length) {
                    retVal.children = children;
                } else {
                    retVal.size = 22;
                }
                return retVal;
            }
            return {
                label: node.key,
                size: node.values.aggregate,
                origRows: node.values
            };
        }
    };

    Treemap.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._d3Treemap = d3.layout.treemap()
            .value(function (d) {
                return d.size || 50;
            })
        ;

        this._elementDIV = element.append("div");
        this._selection.widgetElement(this._elementDIV);
    };

    Treemap.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        var nodes = this._d3Treemap
            .size([this.width(), this.height()])
            .nodes(this.treemapData())
        ;

        this._elementDIV
            .style("font-size", this.fontSize_exists() ? this.fontSize() + "px" : null)
            .style("line-height", this.fontSize_exists() ? (this.fontSize() + 2) + "px" : null)
        ;

        var context = this;
        var node = this._elementDIV.selectAll(".node").data(nodes);
        node.enter().append("div")
            .attr("class", "node")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (d && d.origRows) {
                    var columnLabel = "";
                    context.mappings().forEach(function (mapping) {
                        if (mapping.column()) {
                            columnLabel = mapping.column();
                        }
                    });
                    context.click(context.rowToObj(d.origRows[0]), columnLabel, context._selection.selected(this));
                }
            })
            .call(enterPosition)
        ;
        node
            .attr("title", tooltip)
            .text(function (d) { return d.children ? null : d.label; })
            .style("background", function (d) { return d.children ? context._palette(d.label) : null; })
            .transition().duration(this.transitionDuration())
            .style("opacity", function (d) { return d.children ? 1 : null; })
            .call(position)
        ;
        node.exit().transition().duration(this.transitionDuration())
            .style("opacity", 0)
            .remove()
        ;
        function tooltip(d) {
            if (d.children) {
                return null;
            }
            var retVal = d.label + " (" + d.value + ")";
            while (d.parent && d.parent.parent) {
                retVal = d.parent.label + " -> " + retVal;
                d = d.parent;
            }
            return retVal;
        }
        function enterPosition(d) {
            this
                .style("left", function (d) { return (d.x + Math.max(0, d.dx - 1) / 2) + "px"; })
                .style("top", function (d) { return (d.y + Math.max(0, d.dy - 1) / 2) + "px"; })
                .style("width", function (d) { return 0 + "px"; })
                .style("height", function (d) { return 0 + "px"; })
            ;
        }

        function position() {
            this
                .style("left", function (d) { return d.x + "px"; })
                .style("top", function (d) { return d.y + "px"; })
                .style("width", function (d) { return Math.max(0, d.dx - 1) + "px"; })
                .style("height", function (d) { return Math.max(0, d.dy - 1) + "px"; })
            ;
        }
    };

    Treemap.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Treemap;
}));

