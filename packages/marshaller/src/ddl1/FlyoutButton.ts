import { Widget } from "@hpcc-js/common";
import { Button } from "@hpcc-js/form";
import { Popup, Surface } from "@hpcc-js/layout";

export class FlyoutButton extends Button {
    _popupSurface;
    _popup;
    _popupParentWidget;

    constructor() {
        super();

        this.value("^");

        const context = this;
        this._popupSurface = new Surface()
            .surfaceBackgroundColor("rgb(234, 249, 255)")
            .buttonAnnotations([
                {
                    id: "",
                    label: "\uf00d",
                    width: 20,
                    padding: "0px 5px",
                    class: "close",
                    font: "FontAwesome"
                }
            ])
            .on("click", function (ann) {
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

    reference(obj) {
        const retVal: any = new Button()
            .value(this.value())
            ;
        const context = this;
        retVal.click = function () {
            context.click();
        };
        return retVal;
    }

    click(obj?) {
        const context = this;
        this._popup
            .visible(true)
            .popupState(true)
            .render(function (w) {
                const bbox = context._popupSurface.widget().getBBox();
                context._popupSurface.resize({
                    width: bbox.width,
                    height: bbox.height + context._popupSurface.calcHeight(context._popupSurface.element().select(".surfaceTitle")) + 18
                });
                context._popup.render();
            })
            ;
    }

    enter(domNode, element) {
        Button.prototype.enter.apply(this, arguments);
        let parentWidget: Widget = this;
        while (parentWidget && ["marshaller_HTML", "marshaller_Graph", "composite_MegaChart"].indexOf(parentWidget.classID()) === -1) {
            parentWidget = parentWidget.locateParentWidget();
        }
        if (parentWidget) {
            this._popupParentWidget = parentWidget;
            this._popup
                .target(parentWidget.node())
                ;
        }
    }

    render(callback?): this {
        const context = this;
        const isVisible = this._popup.popupState();
        Button.prototype.render.call(context, function (widget) {
            const popupParentWidgetBBox = context._popupParentWidget.getBBox();
            const bbox = widget.getBBox();
            context._popup
                .left(bbox.x - popupParentWidgetBBox.x + bbox.width - context._popup.width())
                .top(bbox.y - popupParentWidgetBBox.y + bbox.height)
                .visible(isVisible && context.autoClose() ? false : isVisible)  //  hack:  closes the form when submit is clicked  ---
                .popupState(isVisible && context.autoClose() ? false : isVisible)
                .render()
                ;
            if (callback) {
                callback(widget);
            }
        });
        return this;
    }

    autoClose: { (): boolean; (_: boolean): FlyoutButton };
    autoClose_exists: () => boolean;
}
FlyoutButton.prototype._class += " marshaller_FlyoutButton";

FlyoutButton.prototype.publishProxy("title", "_popupSurface");
FlyoutButton.prototype.publishProxy("widget", "_popupSurface");
FlyoutButton.prototype.publish("autoClose", true, "boolean", "Auto Close");
