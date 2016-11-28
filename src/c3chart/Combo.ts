import { CommonND } from "./CommonND";

export function Combo(target) {
    CommonND.call(this);

    this._type = "bar";
    this._previousTypes = undefined;
}
Combo.prototype = Object.create(CommonND.prototype);
Combo.prototype.constructor = Combo;
Combo.prototype._class += " c3chart_Column";

Combo.prototype.publish("stacked", false, "boolean", "Stack Chart", null, { tags: ["Basic"] });
Combo.prototype.publish("defaultType", "bar", "set", "Default chart type", ["bar", "line", "spline", "area", "area-spline", "step", "area-step", "scatter"], { tags: ["Basic"] });
Combo.prototype.publish("types", [], "array", "Array of chart types (ex:bar|line|spline|area|area-spline|step|area-step|scatter)", null, { tags: ["Basic"] });

Combo.prototype.publish("areaFillOpacity", 0.4, "number", "Opacity of all 'Area' chart types in this Combo chart", null, { tags: ["Basic"], number: { min: 0, max: 1, step: 0.1, slider: false } });

Combo.prototype.enter = function (domNode, element) {

    var typesObj = {};

    var typesArr = this.types();
    this._previousTypes = this.types().join("|");
    for (var i in typesArr) {
        typesObj[this.columns()[parseInt(i) + 1]] = typesArr[i];
    }

    if (typesArr.length > 0) {
        this._config.data.types = typesObj;
    }
    CommonND.prototype.enter.apply(this, arguments);
};

Combo.prototype.update = function (domNode, element) {
    CommonND.prototype.update.apply(this, arguments);

    if (this._previousTypes !== this.types().join("|")) {
        var prevTypes = this._previousTypes.split("|");
        var curCols = this.getC3Columns();
        for (var i in curCols) {
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
        "opacity": this.areaFillOpacity()
    });

};
