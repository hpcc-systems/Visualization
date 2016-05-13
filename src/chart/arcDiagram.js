"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/Palette", "../common/PropertyExt", "d3-arcdiagram","css!./arcDiagram"], factory);
    } else {
        root.chart_arcdiagram = factory(root.d3, root.common_SVGWidget, root.common_Palette, root.common_PropertyExt, root.d3.arcdiagram);
    }
}(this, function (d3, SVGWidget, Palette, PropertyExt, D3arcdiagram) {
    // D3arcdiagram = D3arcdiagram || d3.arcdiagram ;

     function arcDiagram(target) {
        SVGWidget.call(this);
		this._drawStartPos="origin";
    }
    arcDiagram.prototype = Object.create(SVGWidget.prototype);
    arcDiagram.prototype.constructor = arcDiagram;
    arcDiagram.prototype._class += " chart_Arcs";

    arcDiagram.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");

    arcDiagram.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
	this.mode="compact";
    this.arcStyle="ortho";
    this.topMargin=50; // in case of overrun (perhaps i should just fix the code)
    this.upperHeight=450; // where the arcs go
    this.lowerHeight=15; // where the nodes and labels go
    this.width=800;
	this.radius=5;
	// this.linkLevel(this.mode);
	this.arcd = d3.arcDiagram().linkLevel(this.mode);
	
	this.svg=element.append("svg:g")
		.attr("transform", "translate("+this.radius*3+","+(this.upperHeight+this.topMargin)+")");
		
		// this._ul = element.append("UL");
		
		
    };

    arcDiagram.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
					
		var nodelines=this.svg.selectAll(".dataRow").data(this.data().nodes);
		
				var context=this;		
			 this.arcd.nodes(this.data().nodes).links(this.data().links);			
			this.arcd();
			var xscale = d3.scale.linear()
				.domain([0, this.data().nodes.length])
				.range([0, this.width]);

			var yscale = d3.scale.linear()
				.domain([0, d3.max(this.	arcd.links().map(function(l) { return l.height; }))+1])
				.range([0, this.upperHeight]);

			var arc = pathgen()
				.xscale(xscale)
				.yscale(yscale);
			var nodes = this.svg.selectAll(".node")
				.data(this.arcd.nodes())
				.enter().append("svg:g")
				.attr("class", "node")
				.attr("transform", function(d, i) {
					return "translate(" + xscale(i) + "," + (context.radius*2) + ")";
				});
			nodes.append("svg:circle")
				.attr("r", 5);
			nodes.append("svg:text")
				.attr("class", "label")
				.attr("text-anchor", "end")
				.attr("dx", -context.radius*2)
				.attr("dy", "0.35em")
				.attr("transform", "rotate(-90)")
				.on("click", function (d) {
                console.log(this.innerHTML,this.getAttribute('dx'),this.getAttribute('dy'));
                console.log(d.value,d.x,d.y);
            })
				.text(function(d) { return d.value; });

			var links = this.svg.selectAll(".link")
				.data(this.arcd.links())
				.enter().append("svg:path")
				.attr("class", "link")
				.style("marker-end", "url(#arrowhead)")
				.attr("d", arc[this.arcStyle]);

			d3.selectAll("input").on("change", function change() {
			if (this.name === "mode") this.mode = this.value;
			else if (this.name === "arcStyle") this.arcStyle = this.value;
			this.arcd.linkLevel(this.mode);
			this.arcd();  // run the layout

			yscale = d3.scale.linear()
				.domain([0, d3.max(this.arcd.links().map(function(l) { return l.height; }))+1])
				.range([0, this.upperHeight]);

			arc.yscale(yscale);

			links.data(this.arcd.links())
				.attr("d", arc[this.arcStyle]);
				
		nodelines.exit().remove();
		 });
		}
	;	function pathgen() {
    var gen = {},
        x = function(x) { return x; },
        y = function(y) { return y; };

    gen.arc = function(d) {
        var x1 = x(d.x1),
            x2 = x(d.x2),
            base = y(0),
            height = y(d.height),
            dir = x1 <= x2 ? 1 : 0;
        return [
            "M", x1, base,
            "A", (x2-x1)/2, ",", height, 0, 0, ",", dir, x2, ",", base
        ].join(" ");
    };

    gen.ortho = function(d) {
        var x1 = x(d.x1),
            x2 = x(d.x2),
            height = y(d.height),
            dir = x1 < x2 ? 1 : -1;
        return [
            "M", x1, 0,
            "v", -(height-10),
            "q", 0, -10, dir*10, -10,
            "H", x2 - (dir*10),
            "q", (dir*10), 0, (dir*10), +10,
            "V", -2
        ].join(" ");
    };

    gen.xscale = function(a) {
      if (!arguments.length) return x;
      x = a;
      return gen
	  ;
    }

  ;  gen.yscale = function(a) {
      if (!arguments.length) return y;
      y = a;
      return gen
	  ;
    }
	;
    return gen;
}
return arcDiagram;
}));
