"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/Palette", "../common/PropertyExt", "d3-bulletbox","css!./BulletBox"], factory);
    } else {
       root.chart_bulletbox = factory(root.d3, root.common_SVGWidget, root.common_Palette, root.common_PropertyExt, root.d3.bulletbox);
    }
}(this, function (d3, SVGWidget, Palette, PropertyExt, D3bulletbox) {
    function BulletBox(target) {
        SVGWidget.call(this);
		this._drawStartPos="origin";
    }
    BulletBox.prototype = Object.create(SVGWidget.prototype);
    BulletBox.prototype.constructor = BulletBox;
    BulletBox.prototype._class += " chart_BulletBox";

    BulletBox.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");

    BulletBox.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);

		this.margin = {top: 5, right: 40, bottom: 20, left: 120},
			this.width = 960 - this.margin.left - this.margin.right,
			this.height = 50 - this.margin.top - this.margin.bottom;

		this.chart = d3.bulletbox()
			.width(this.width)
			.height(this.height);
		this._containerdiv = element.append("svg:g");
    };

    BulletBox.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
		var svg = this._containerdiv.selectAll("svg")
      .data(this.data())
		.enter().append("svg")
      .attr("class", "bullet")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      .call(this.chart);

  var title = svg.append("g")
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + this.height / 2 + ")");

  title.append("text")
      .attr("class", "title")
      .text(function(d) { return d.title; });

  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "1em")
      .text(function(d) { return d.subtitle; });

  d3.selectAll("button").on("click", function() {
    svg.datum(randomize).call(this.chart.duration(1000)); // TODO automatic transition
  });

    };

    BulletBox.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };
function pathgen() {
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
      return gen;
    }

    gen.yscale = function(a) {
      if (!arguments.length) return y;
      y = a;
      return gen;
    }

    return gen;
}
    return BulletBox;
}));
