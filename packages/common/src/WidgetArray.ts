import { PropertyExt } from "./PropertyExt";
import { Widget } from "./Widget";

export class WidgetArray extends PropertyExt {

    constructor() {
        super();
    }

    content: { (): Widget[]; (_): WidgetArray };
}
WidgetArray.prototype._class += " common_WidgetArray";

WidgetArray.prototype.publish("content", [], "widgetArray", "Widget Array");
