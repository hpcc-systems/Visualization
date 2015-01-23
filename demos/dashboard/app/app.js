define([
    "dojo/_base/fx",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/ready",

    "app/Main"
], function (fx, dom, domStyle, ready,
    Main) {

    var initUi = function () {
        var widget = new Main();
        if (widget) {
            widget.placeAt(dojo.body(), "last");
            widget.startup();
        }
        stopLoading();
    },

    startLoading = function (targetNode) {
        domStyle.set(dom.byId("loadingOverlay"), "display", "block");
        domStyle.set(dom.byId("loadingOverlay"), "opacity", "255");
    },

    stopLoading = function () {
        fx.fadeOut({
            node: dom.byId("loadingOverlay"),
            onEnd: function (node) {
                domStyle.set(node, "display", "none");
            }
        }).play();
    };

    return {
        init: function () {
            ready(function () {
                initUi();
            });
        }
    };
});
