"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["src/common/HTMLWidget", "css!./HTMLTemplate"], factory);
    } else {
        root.template_HTMLTemplate = factory(root.common_HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function HTMLTemplate(target) {
        HTMLWidget.call(this);
    }
    HTMLTemplate.prototype = Object.create(HTMLWidget.prototype);
    HTMLTemplate.prototype.constructor = HTMLTemplate;
    HTMLTemplate.prototype._class += " template_HTMLTemplate";

    HTMLTemplate.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");

    HTMLTemplate.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._ul = element.append("ul");
    };

    HTMLTemplate.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var li = this._ul.selectAll(".dataRow").data(this.data());
        li.enter().append("li")
            .attr("class", "dataRow")
        ;
        li
            .text(function (row) { return row[0]; })
        ;
        li.exit().remove();
    };

    HTMLTemplate.prototype.exit = function (domNode, element) {
        this._ul.remove();  //  Not really needed  ---
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return HTMLTemplate;
}));
