import { Common2D } from "./Common2D";

export class Pie extends Common2D {
    constructor() {
        super();
        this._chartType = "PieChart";
    }

    getChartOptions() {
        const retVal = Common2D.prototype.getChartOptions.apply(this, arguments);

        retVal.colors = this.data().map(function (row) {
            return this._palette(row[0]);
        }, this);

        retVal.is3D = this.is3D();
        retVal.pieHole = this.pieHole();
        retVal.pieStartAngle = this.pieStartAngle();
        retVal.pieSliceText = this.pieSliceText();
        retVal.pieSliceTextStyle = {
            color: this.pieSliceFontColor(),
            fontName: this.pieSliceFontFamily(),
            fontSize: this.pieSliceFontSize()
        };
        retVal.pieSliceBorderColor = this.pieSliceBorderColor();
        retVal.pieResidueSliceColor = this.pieResidueSliceColor();
        retVal.pieResidueSliceLabel = this.pieResidueSliceLabel();
        retVal.sliceVisibilityThreshold = this.sliceVisibilityThreshold();

        retVal.slices = initSlices(this.getNumSlices());

        this.slicesColor().forEach(function (d, i) {
            if (typeof (retVal.slices[i]) === "undefined") {
                retVal.slices[i] = {};
            }
            retVal.slices[i].color = d;
        });
        this.slicesOffset().forEach(function (d, i) {
            if (typeof (retVal.slices[i]) === "undefined") {
                retVal.slices[i] = {};
            }
            retVal.slices[i].offset = d;
        });
        this.slicesTextStyle().forEach(function (d, i) {
            if (typeof (retVal.slices[i]) === "undefined") {
                retVal.slices[i] = {};
            }
            retVal.slices[i].textStyle = d;
        });
        return retVal;
    }

    getNumSlices() {
        return this.data().length;
    }

    enter(domNode, element) {
        Common2D.prototype.enter.apply(this, arguments);
    }

    update(domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
    }

    is3D: { (): boolean; (_: boolean): Pie };
    is3D_exists: () => boolean;
    pieHole: { (): number; (_: number): Pie };
    pieHole_exists: () => boolean;
    pieStartAngle: { (): number; (_: number): Pie };
    pieStartAngle_exists: () => boolean;
    pieSliceText: { (): string; (_: string): Pie };
    pieSliceText_exists: () => boolean;
    pieSliceFontColor: { (): string; (_: string): Pie };
    pieSliceFontColor_exists: () => boolean;
    pieSliceFontFamily: { (): string; (_: string): Pie };
    pieSliceFontFamily_exists: () => boolean;
    pieSliceFontSize: { (): number; (_: number): Pie };
    pieSliceFontSize_exists: () => boolean;
    pieSliceBorderColor: { (): string; (_: string): Pie };
    pieSliceBorderColor_exists: () => boolean;
    pieResidueSliceColor: { (): string; (_: string): Pie };
    pieResidueSliceColor_exists: () => boolean;
    pieResidueSliceLabel: { (): string; (_: string): Pie };
    pieResidueSliceLabel_exists: () => boolean;
    sliceVisibilityThreshold: { (): number; (_: number): Pie };
    sliceVisibilityThreshold_exists: () => boolean;
    slicesOffset: { (): any[]; (_: any[]): Pie };
    slicesOffset_exists: () => boolean;
    slicesTextStyle: { (): any[]; (_: any[]): Pie };
    slicesTextStyle_exists: () => boolean;
    slicesColor: { (): any[]; (_: any[]): Pie };
    slicesColor_exists: () => boolean;
}
Pie.prototype._class += " google_Pie";

Pie.prototype.publish("is3D", false, "boolean", "Enable 3D", null, { tags: ["Basic", "Shared"] });

Pie.prototype.publish("pieHole", 0, "number", "Pie Hole Size", null, { min: 0, max: 0.9, step: 0.1, tags: ["Intermediate"] });
Pie.prototype.publish("pieStartAngle", 0, "number", "Pie Start Angle", null, { tags: ["Advanced"] });

Pie.prototype.publish("pieSliceText", "percentage", "set", "The Content of The Text Displayed On The Slice", ["none", "label", "value", "percentage"], { tags: ["Basic"] });
Pie.prototype.publish("pieSliceFontColor", null, "html-color", "Specifies The Slice Text Style (Color)", null, { tags: ["Basic"] });
Pie.prototype.publish("pieSliceFontFamily", null, "string", "Specifies The Slice Text Style (Font Name)", null, { tags: ["Basic"] });
Pie.prototype.publish("pieSliceFontSize", null, "number", "Specifies The Slice Text Style (Font Size)", null, { tags: ["Basic"] });

Pie.prototype.publish("pieSliceBorderColor", null, "html-color", "The Color of The Slice Borders", null, { tags: ["Intermediate"] });
Pie.prototype.publish("pieResidueSliceColor", null, "html-color", "Color For The Combination Slice That Holds All Slices Below SliceVisibilityThreshold", null, { tags: ["Advanced"] });
Pie.prototype.publish("pieResidueSliceLabel", "Other", "string", "A Label For The combination Slice That Holds All Slices Below SliceVisibilityThreshold", null, { tags: ["Advanced"] });

Pie.prototype.publish("sliceVisibilityThreshold", 1 / 720, "number", "The slice relative part, below which a slice will not show individually.", null, { tags: ["Advanced"] });

Pie.prototype.publish("slicesOffset", [], "array", "Per Slice Offset", null, { tags: ["Advanced"] });
Pie.prototype.publish("slicesTextStyle", [], "array", "Per Slice", null, { tags: ["Private"] }); // overrides pieSliceTextStyle
Pie.prototype.publish("slicesColor", [], "array", "Per Slice Color", null, { tags: ["Private"] });

function initSlices(num) {
    const slices = [];
    for (let i = 0; i < num; i++) {
        slices.push({});
    }
    return slices;
}
