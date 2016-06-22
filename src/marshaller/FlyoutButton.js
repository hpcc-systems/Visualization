"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../form/Button", "../layout/Popup", "../layout/Surface"], factory);
    } else {
        root.marshaller_FlyoutButton = factory(root.form_Button, root.layout_Popup, root.layout_Surface);
    }
}(this, function (Button, Popup, Surface) {
    function FlyoutButton() {
        Button.call(this);

        this.value("^");

        var context = this;
        this._popupSurface = new Surface()
            .surfaceBackgroundColor("rgb(234, 249, 255)")
            .buttonAnnotations([
                {
                    id: "",
                    label: "\uf00d",
                    width: 20,
                    padding: "0px 5px",
                    class: "close",
                    font: "FontAwesome",
                }
            ])
            .on("click", function(ann) {
                if (ann.class === "close") {
                    context._popup
                        .visible(false)
                        .popupState(false)
                        .render()
                    ;
                }
            })
        ;
        this._popup = new Popup()
            .size({ width: 400, height: 400 })
            .position("absolute")
            .widget(this._popupSurface)
        ;
    }
    FlyoutButton.prototype = Object.create(Button.prototype);
    FlyoutButton.prototype.constructor = FlyoutButton;
    FlyoutButton.prototype._class += " marshaller_FlyoutButton";

    FlyoutButton.prototype.publishProxy("title", "_popupSurface");
    FlyoutButton.prototype.publishProxy("widget", "_popupSurface");

    FlyoutButton.prototype.click = function (obj) {
        var context = this;
        this._popup
            .visible(true)
            .popupState(true)
            .render(function (w) {
                var bbox = context._popupSurface.widget().getBBox();
                context._popupSurface.resize({
                    width: bbox.width,
                    height: bbox.height + context._popupSurface.calcHeight(context._popupSurface.element().select(".surfaceTitle")) + 18
                });
                context._popup.render();
            })
        ;
    };

    FlyoutButton.prototype.enter = function (domNode, element) {
        Button.prototype.enter.apply(this, arguments);
        var parentWidget = this;
        while (parentWidget && ["marshaller_HTML", "marshaller_Graph", "composite_MegaChart"].indexOf(parentWidget.classID()) === -1) {
            parentWidget = parentWidget.locateParentWidget();
        }
        if (parentWidget) {
            this._popupParentWidget = parentWidget;
            this._popup
                .target(parentWidget.node())
            ;
        }
    };

    FlyoutButton.prototype.render = function (callback) {
        var context = this;
        Button.prototype.render.call(context, function (widget) {
            var popupParentWidgetBBox = context._popupParentWidget.getBBox();
            var bbox = widget.getBBox();
            context._popup
                .left(bbox.x - popupParentWidgetBBox.x + bbox.width - context._popup.width())
                .top(bbox.y - popupParentWidgetBBox.y + bbox.height)
                .visible(false)  //  hack:  closes the form when submit is clicked  ---
                .popupState(false)
                .render()
            ;
            if (callback) {
                callback(widget);
            }
        });
    };

    return FlyoutButton;
}));
