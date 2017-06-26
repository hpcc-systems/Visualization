import { CommonND } from "./CommonND";

export class Column extends CommonND {
    constructor() {
        super();

        this._type = "bar";
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
    }

    stacked: { (): boolean; (_: boolean): Column };
    stacked_exists: () => boolean;
}
Column.prototype._class += " c3chart_Column";

Column.prototype.publish("stacked", false, "boolean", "Stack Chart", null, { tags: ["Basic", "Shared"] });
