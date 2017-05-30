import { CommonND } from "./CommonND";

export class Combo extends CommonND {
    _previousTypes;

    constructor() {
        super();

        this._type = "bar";
        this._previousTypes = undefined;
    }

    enter(domNode, element) {

        const typesObj = {};

        const typesArr = this.types();
        this._previousTypes = this.types().join("|");
        for (const i in typesArr) {
            typesObj[this.columns()[parseInt(i) + 1]] = typesArr[i];
        }

        if (typesArr.length > 0) {
            this._config.data.types = typesObj;
        }
        CommonND.prototype.enter.apply(this, arguments);
    }

    update(domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        if (this._previousTypes !== this.types().join("|")) {
            const prevTypes = this._previousTypes.split("|");
            const curCols = this.getC3Columns();
            for (const i in curCols) {
                if (typeof (prevTypes[i]) === "undefined" || this.types()[i] !== prevTypes[i]) {
                    this.c3Chart.unload({ ids: curCols[i][0] });
                    this.c3Chart.load({
                        columns: [curCols[i]],
                        type: typeof (this.types()[i]) !== "undefined" ? this.types()[i] : this.defaultType()
                    });
                }
            }
            this._previousTypes = this.types().join("|");
        }
        if (this.stacked()) {
            this.c3Chart.groups([this.columns().slice(1, this.columns().length)]);
        } else {
            this.c3Chart.groups([]);
        }

        element.selectAll(".c3-area").style({
            opacity: this.areaFillOpacity()
        });

    }

    stacked: { (): boolean; (_: boolean): Combo };
    stacked_exists: () => boolean;
    defaultType: { (): string; (_: string): Combo };
    defaultType_exists: () => boolean;
    types: { (): any[]; (_: any[]): Combo };
    types_exists: () => boolean;
    areaFillOpacity: { (): number; (_: number): Combo };
    areaFillOpacity_exists: () => boolean;
}
Combo.prototype._class += " c3chart_Combo";

Combo.prototype.publish("stacked", false, "boolean", "Stack Chart", null, { tags: ["Basic"] });
Combo.prototype.publish("defaultType", "bar", "set", "Default chart type", ["bar", "line", "spline", "area", "area-spline", "step", "area-step", "scatter"], { tags: ["Basic"] });
Combo.prototype.publish("types", [], "array", "Array of chart types (ex:bar|line|spline|area|area-spline|step|area-step|scatter)", null, { tags: ["Basic"] });

Combo.prototype.publish("areaFillOpacity", 0.4, "number", "Opacity of all 'Area' chart types in this Combo chart", null, { tags: ["Basic"], number: { min: 0, max: 1, step: 0.1, slider: false } });
