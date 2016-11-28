import { Border } from "../layout/Border";
import { Toolbar } from "../layout/Toolbar";
import { OnOff } from "../form/OnOff";
import { PropertyEditor } from "../other/PropertyEditor";
import "css!./Dermatology";

export function Dermatology() {
    Border.call(this);

    this._toolbar = new Toolbar()
        .title("Dermatology")
        ;
    this._propEditor = new PropertyEditor()
        .show_settings(true)
        ;
}
Dermatology.prototype = Object.create(Border.prototype);
Dermatology.prototype.constructor = Dermatology;
Dermatology.prototype._class += " composite_Dermatology";

Dermatology.prototype.publish("showToolbar", true, "boolean", "Show Toolbar");
Dermatology.prototype.publish("widget", null, "widget", "Widget");

Dermatology.prototype.showProperties = function (_) {
    if (!arguments.length) return this._showProperties;
    this._showProperties = _;
    this
        .rightPercentage(0)
        .rightSize(this._showProperties ? 360 : 0)
        .setContent("right", this._showProperties ? this._propEditor : null)
        ;
    var widget = this.widget();
    if (widget && widget.designMode) {
        widget.designMode(this._showProperties);
    }
    return this;
};

Dermatology.prototype.toggleProperties = function () {
    return this.showProperties(!this.showProperties());
};

Dermatology.prototype.enter = function (domNode, element) {
    Border.prototype.enter.apply(this, arguments);

    this
        .topPercentage(0)
        .topSize(0)
        .setContent("top", this._toolbar)
        ;
    this.getCell("top").surfaceShadow(true);

    var context = this;
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
};

Dermatology.prototype.update = function (domNode, element) {
    Border.prototype.update.apply(this, arguments);

    var widget = this.widget();
    element.style("background-color", widget && widget.surfaceShadow ? null : "white");

    this
        .topPercentage(0)
        .topSize(this.showToolbar() ? 32 : 0)
        ;
};

Dermatology.prototype.render = function (callback) {
    var widget = this.widget();
    if (widget !== this._prevWidget) {
        if (widget && widget.surfaceShadow) {
            widget.surfaceBackgroundColor_default("white");
        }
        this.setContent("center", widget);
        this._propEditor.widget(widget);
        this._prevWidget = widget;
    }
    return Border.prototype.render.apply(this, arguments);
};
