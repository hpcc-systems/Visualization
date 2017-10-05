import { publish } from "./PropertyExt";
import { Widget } from "./Widget";

export class WidgetArray extends Widget {

    @publish([], "widgetArray", "Widget Array")
    content: publish<this, Widget[]>;

    constructor() {
        super();
    }
}
WidgetArray.prototype._class += " common_WidgetArray";
