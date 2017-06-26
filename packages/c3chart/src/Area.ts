import { CommonND } from "./CommonND";

export class Area extends CommonND {
    constructor() {
        super();

        this._type = "area";
    }

    enter(domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    }

    update(domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        if (this.stacked()) {
            this.c3Chart.groups([this.columns().slice(1, this.columns().length)]);
        } else {
            this.c3Chart.groups([]);
        }

        element.selectAll(".c3-line")
            .style("stroke-width", this.lineWidth() + "px")
            .style("stroke-opacity", this.lineOpacity())
            .style("stroke-dasharray", this.lineDashStyle().toString())
            ;

        element.selectAll(".c3-area").style({
            opacity: this.fillOpacity()
        });
    }

    stacked: { (): boolean; (_: boolean): Area };
    stacked_exists: () => boolean;
    lineWidth: { (): number; (_: number): Area };
    lineWidth_exists: () => boolean;
    lineDashStyle: { (): any[]; (_: any[]): Area };
    lineDashStyle_exists: () => boolean;
    lineOpacity: { (): number; (_: number): Area };
    lineOpacity_exists: () => boolean;
    fillOpacity: { (): number; (_: number): Area };
    fillOpacity_exists: () => boolean;
}
Area.prototype._class += " c3chart_Area";

Area.prototype.publish("stacked", false, "boolean", "Stack Chart", null, { tags: ["Basic", "Shared"] });
Area.prototype.publish("lineWidth", 1.0, "number", "Line Width", null, { tags: ["Basic", "Shared"] });
Area.prototype.publish("lineDashStyle", [], "array", "Dashed Lines", null, { tags: ["Basic", "Shared"] });
Area.prototype.publish("lineOpacity", 1.0, "number", "Line Alpha", null, { tags: ["Basic", "Shared"] });
Area.prototype.publish("fillOpacity", 0.2, "number", "Opacity of The Fill Color", null, { tags: ["Basic", "Shared"] });
