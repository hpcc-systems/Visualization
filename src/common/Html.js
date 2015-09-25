"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./HTMLWidget", "css!./Html"], factory);
    } else {
        root.common_Html = factory(root.common_HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function Html() {
        HTMLWidget.call(this);
        
        this._tag = "div";
    }
    Html.prototype = Object.create(HTMLWidget.prototype);
    Html.prototype._class += " common_Html";

    Html.prototype.publish("html", "", "string", "Display HTML",null,{tags:['Private']});

    Html.prototype.testData = function () {
        this.html('<button class="btn btn-success">This is an HTML button</button>');
        return this;
    };

    Html.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    Html.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        var divWrapper = element.selectAll("div").data([this.html()], function (d) { return d; });
        divWrapper.enter()
                .append("div")
        ;
        divWrapper.html(function (d) { 
                return d; 
            })
        ;
        divWrapper.exit()
            .remove()
        ;
    };

    return Html;
}));
