import { Widget } from "./Widget.ts";

export class WidgetArray extends Widget {

    constructor() {
        super();
    }
}
WidgetArray.prototype._class += " common_WidgetArray";

export interface WidgetArray {
    content(): Widget[];
    content(_: Widget[]): this;
}
WidgetArray.prototype.publish("content", [], "widgetArray", "Widget Array");
