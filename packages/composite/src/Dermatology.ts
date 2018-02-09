import { Widget } from "@hpcc-js/common";
import { OnOff } from "@hpcc-js/form";
import { Border, Toolbar } from "@hpcc-js/layout";
import { PropertyEditor } from "@hpcc-js/other";

import "../src/Dermatology.css";

export class Dermatology extends Border {
    _toolbar;
    _propEditor;
    _showProperties;
    _propsButton;
    _prevWidget;

    constructor() {
        super();

        this._toolbar = new Toolbar()
            .title("Dermatology")
            ;
        this._propEditor = new PropertyEditor()
            .show_settings(true)
            ;
    }

    showProperties(_?) {
        if (!arguments.length) return this._showProperties;
        this._showProperties = _;
        this
            .rightPercentage(0)
            .rightSize(this._showProperties ? 360 : 0)
            .setContent("right", this._showProperties ? this._propEditor : null)
            ;
        const widget = this.widget();
        if (widget && widget.designMode) {
            widget.designMode(this._showProperties);
        }
        return this;
    }

    toggleProperties() {
        return this.showProperties(!this.showProperties());
    }

    enter(domNode, element) {
        Border.prototype.enter.apply(this, arguments);

        this
            .topPercentage(0)
            .topSize(0)
            .setContent("top", this._toolbar)
            ;
        this.getCell("top").surfaceShadow(true);

        const context = this;
        this._propsButton = new OnOff()
            .id(this.id() + "_props")
            .value("Properties")
            .on("click", function () {
                context
                    .toggleProperties()
                    .render()
                    ;
            })
            ;
        this._toolbar.widgets([this._propsButton]);
    }

    update(domNode, element) {
        this
            .topPercentage(0)
            .topSize(this.showToolbar() ? 32 : 0)
            ;

        super.update(domNode, element);

        const widget = this.widget();
        element.style("background-color", widget && widget.surfaceShadow ? null : "white");
    }

    render(callback) {
        const widget = this.widget();
        if (widget !== this._prevWidget) {
            if (widget && widget.surfaceShadow) {
                widget.surfaceBackgroundColor_default("white");
            }
            this.setContent("center", widget);
            this._propEditor.widget(widget);
            this._prevWidget = widget;
        }
        return super.render(callback);
    }

    showToolbar_exists: () => boolean;
    widget_exists: () => boolean;
}
Dermatology.prototype._class += " composite_Dermatology";

export interface Dermatology {
    setContent(_: string, _2: Widget): this;
    rightPercentage(): number;
    rightPercentage(_: number): this;
    rightSize(): number;
    rightSize(_: number): this;
    topPercentage(): number;
    topPercentage(_: number): this;
    topSize(): number;
    topSize(_: number): this;
    showToolbar(): boolean;
    showToolbar(_: boolean): this;
    widget(): any;
    widget(_: any): this;
}
Dermatology.prototype.publish("showToolbar", true, "boolean", "Show Toolbar");
Dermatology.prototype.publish("widget", null, "widget", "Widget");
