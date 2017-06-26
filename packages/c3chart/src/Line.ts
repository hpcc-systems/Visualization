import { CommonND } from "./CommonND";

export class Line extends CommonND {
    constructor() {
        super();
        this._type = "line";
    }

    enter(domNode, element) {
        this._config.line = {
            connectNull: this.connectNull()
        };
        CommonND.prototype.enter.apply(this, arguments);
    }

    update(domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        element.selectAll(".c3-line").style({
            "stroke-width": this.lineWidth_exists() ? this.lineWidth() + "px" : null,
            "stroke-opacity": this.lineOpacity(),
            "stroke-dasharray": this.lineDashStyle().toString(),
        });
    }

    lineWidth: { (): number; (_: number): Line };
    lineWidth_exists: () => boolean;
    lineDashStyle: { (): any[]; (_: any[]): Line };
    lineDashStyle_exists: () => boolean;
    lineOpacity: { (): number; (_: number): Line };
    lineOpacity_exists: () => boolean;
    connectNull: { (): boolean; (_: boolean): Line };
    connectNull_exists: () => boolean;
}
Line.prototype._class += " c3chart_Line";

Line.prototype.publish("lineWidth", 1.0, "number", "Line Width", null, { tags: ["Basic", "Shared"] });
Line.prototype.publish("lineDashStyle", [], "array", "Dashed Lines", null, { tags: ["Basic", "Shared"] });
Line.prototype.publish("lineOpacity", 1.0, "number", "Line Alpha", null, { tags: ["Basic", "Shared"] });
Line.prototype.publish("connectNull", true, "boolean", "Connect null data points in line", null, { tags: ["Basic", "Shared"] });
