"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget","css!./Html"], factory);
    } else {
        root.other_Html = factory(root.common_HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function HTML() {
        HTMLWidget.call(this);
        this._tag = "div";
    }
    HTML.prototype = Object.create(HTMLWidget.prototype);
    HTML.prototype.constructor = HTML;
    HTML.prototype._class += " other_Html";
    
    HTML.prototype.publish("html", "", "string", "Html to render", null, { tags: ["Basic"] });
    HTML.prototype.publish("overflowX", null, "set", "CSS overflow-x", ["","visible","hidden","scroll","auto","initial","inherit"], { tags: ["Basic"], optional:true });
    HTML.prototype.publish("overflowY", null, "set", "CSS overflow-y", ["","visible","hidden","scroll","auto","initial","inherit"], { tags: ["Basic"], optional:true });

    HTML.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    HTML.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        element.style({
            "overflow-x":this.overflowX_exists() ? this.overflowX() : "",
            "overflow-y":this.overflowY_exists() ? this.overflowY() : "",
        });
            
        var html = element.selectAll(".htmlWrapper").data(this.data().length > 0 ? this.data() : [this.html()]);
        html.enter().append("div")
            .attr("class", "htmlWrapper")
        ;
        html
            .html(function (d) { return d; })
        ;
        html.exit().remove();
    };

    return HTML;
}));