"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../common/Palette", "../common/PropertyExt", "d3-bulletbox","css!./BulletBox"], factory);
    } else {
       root.chart_bulletbox = factory(root.d3, root.common_HTMLWidget, root.common_Palette, root.common_PropertyExt, root.d3.bulletbox);
    }
}(this, function (d3, HTMLWidget, Palette, PropertyExt, D3bulletbox) {
    function BulletBox(target) {
        HTMLWidget.call(this);
		this._drawStartPos="origin";
    }
    BulletBox.prototype = Object.create(HTMLWidget.prototype);
    BulletBox.prototype.constructor = BulletBox;
    BulletBox.prototype._class += " chart_BulletBox";

    BulletBox.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");

    BulletBox.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

		this.chart = d3.bulletbox();

			
		// this._containerbox = element.append("svg");
		this._containerbox = element;
    };

    BulletBox.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
		// var context=this;

	 var margin = {top: 5, right: 40, bottom: 20, left: 120};
			var width = this.width() - margin.left - margin.right;
			var height = 50 - margin.top - margin.bottom;
		this.chart.width(width)
			.height(height);
			console.log(width);
		var svg = this._containerbox.selectAll("svg").data(this.data());
		svg.enter().append("svg")
			.attr("class", "bullet")
			// .attr("x", "0")
			// .attr("y",function(d,i){return height*i;})
			.each(function(d) {
				var svg = d3.select(this);
				var g = svg.append("g")
					.attr("class", "bulletChart")
					.append("g")
						.style("text-anchor", "end")
						.attr("transform", "translate(-6," + height / 2 + ")")
				;
				g.append("text")
					.attr("class", "title")
				;
				g.append("text")
					.attr("class", "subtitle")
					.attr("dy", "1em")
				;
			})
		;
		  svg
			.style("width", width + margin.left + margin.right)
			.style("height", height + margin.top + margin.bottom)
		;
		svg.select(".bulletChart")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		  .call(this.chart)
		  ;


svg.select(".title")
      .text(function(d) { return d.title; })
	  ;
	
svg.select(".subtitle")
      .text(function(d) { return d.subtitle; });

		  svg.exit().remove();
  // d3.selectAll("button").on("click", function() {
    // svg.datum(randomize).call(this.chart.duration(1000)); // TODO automatic transition
  // });

    };

    BulletBox.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
// function pathgen() {
    // var gen = {},
        // x = function(x) { return x; },
        // y = function(y) { return y; };

    // gen.arc = function(d) {
        // var x1 = x(d.x1),
            // x2 = x(d.x2),
            // base = y(0),
            // height = y(d.height),
            // dir = x1 <= x2 ? 1 : 0;
        // return [
            // "M", x1, base,
            // "A", (x2-x1)/2, ",", height, 0, 0, ",", dir, x2, ",", base
        // ].join(" ");
    // };

    // gen.ortho = function(d) {
        // var x1 = x(d.x1),
            // x2 = x(d.x2),
            // height = y(d.height),
            // dir = x1 < x2 ? 1 : -1;
        // return [
            // "M", x1, 0,
            // "v", -(height-10),
            // "q", 0, -10, dir*10, -10,
            // "H", x2 - (dir*10),
            // "q", (dir*10), 0, (dir*10), +10,
            // "V", -2
        // ].join(" ");
    // };

    // gen.xscale = function(a) {
      // if (!arguments.length) return x;
      // x = a;
      // return gen;
    // }

    // gen.yscale = function(a) {
      // if (!arguments.length) return y;
      // y = a;
      // return gen;
    // }

    // return gen;
// }
    return BulletBox;
}));
