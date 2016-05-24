"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["src/common/SVGWidget", "css!./SVGTemplate"], factory);
    } else {
        root.template_SVGTemplate = factory(root.common_SVGWidget);
    }
}(this, function (SVGWidget) {
    function SVGTemplate(target) {
        SVGWidget.call(this);
        this._drawStartPos = "origin";
    }
    SVGTemplate.prototype = Object.create(SVGWidget.prototype);
    SVGTemplate.prototype.constructor = SVGTemplate;
    SVGTemplate.prototype._class += " template_SVGTemplate";

    SVGTemplate.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");

    SVGTemplate.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
    };

    SVGTemplate.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        var g = element.selectAll(".dataRow").data(this.data());
        g.enter().append("g")
            .attr("class", "dataRow")
            .each(function (d) {
                var g = d3.select(this);
                g.append("circle")
                    .attr("cx", -8)
                    .attr("cy", -4)
                    .attr("r", 4)
                ;
                g.append("text");
            })
        ;
        g
            .attr("transform", function (d, idx) { return "translate(32 " + ((idx + 1) * 16) + ")";})
        ;
        g.select("text").text(function (row) { return row[0]; });
        g.exit().remove();
    };

    SVGTemplate.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return SVGTemplate;
}));
