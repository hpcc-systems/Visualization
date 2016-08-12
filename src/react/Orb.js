"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["src/common/HTMLWidget", "css!orb"], factory);
    } else {
        root.template_Orb = factory(root.common_HTMLWidget, root.React);
    }
}(this, function (HTMLWidget) {
    var orb = null
    function Orb(target) {
        HTMLWidget.call(this);
    }
    Orb.prototype = Object.create(HTMLWidget.prototype);
    Orb.prototype.constructor = Orb;
    Orb.prototype._class += " react_Orb";

    Orb.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");

    Orb.prototype.orbConfig = function () {
        return {};
    };

    Orb.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._orb = new orb.pgridwidget(this.orbConfig())
            .render(domNode)
        ;
    };

    Orb.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
    };

    Orb.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Orb.prototype.render = function (domNode, element) {
        if (!orb) {
            var context = this;
            var args = arguments;
            require(["orb-react"], function (React) {
                window.React = window.React || React;
                require(["orb"], function (_orb) {
                    orb = _orb;
                    HTMLWidget.prototype.render.apply(context, args);
                });
            });
        } else {
            HTMLWidget.prototype.render.apply(this, arguments);
        }
    };

    return Orb;
}));
