import { I2DChart } from "@hpcc-js/api";
import { Common } from "./Common";

export class Common2D extends Common {
    constructor() {
        super();
        I2DChart.call(this);

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

        super.update(domNode, element);
    }

    paletteID: { (): string; (_: string): Common2D };
    paletteID_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): Common2D };
    useClonedPalette_exists: () => boolean;

    //  I2DChart  ---
    _palette;
}
Common2D.prototype._class += " c3chart_Common2D";
Common2D.prototype.implements(I2DChart.prototype);

Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Common2D.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
