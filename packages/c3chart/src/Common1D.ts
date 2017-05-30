import { I1DChart } from "@hpcc-js/api";
import { Common } from "./Common";

export class Common1D extends Common {
    constructor() {
        super();
        I1DChart.call(this);

        const context = this;
        this._config.color = {
            pattern: this._palette.colors()
        };

        this._config.data.color = function (color, d) {
            return context._palette(d.id ? d.id : d);
        };
    }

    update(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        Common.prototype.update.apply(this, arguments);
    }

    paletteID: { (): string; (_: string): Common1D };
    paletteID_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): Common1D };
    useClonedPalette_exists: () => boolean;

    //  I1DChart  ---
    _palette;
}
Common1D.prototype._class += " c3chart_Common1D";
Common1D.prototype.implements(I1DChart.prototype);

Common1D.prototype.publish("paletteID", "default", "set", "Palette ID", Common1D.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Common1D.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
