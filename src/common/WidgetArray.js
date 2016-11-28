import { Widget } from "./Widget";

export function WidgetArray() {
    Widget.call(this);
}
WidgetArray.prototype = Object.create(Widget.prototype);
WidgetArray.prototype.constructor = WidgetArray;
WidgetArray.prototype._class += " common_WidgetArray";

WidgetArray.prototype.publish("content", [], "widgetArray", "Widget Array");

WidgetArray.prototype.target = function (target) {
    if (!target) {
        this.content_reset();
        this.exit();
    }
};
