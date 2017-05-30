import { PropertyExt } from "@hpcc-js/common";

export class Axis extends PropertyExt {
    _owningWidget;

    constructor() {
        super();
    }

    id(): string;
    id(_: string): this;
    id(_?): string | this {
        if (!arguments.length) return this._id;
        this._id = _;
        return this;
    }

    render(callback) {
        this._owningWidget.render(callback);
    }

    type: { (): string; (_: string): Axis };
    type_exists: () => boolean;
}
Axis.prototype._class += " amchart_Axis";

Axis.prototype.publish("type", null, "set", "X/Y Axis Text Font Size", ["x", "y"], { tags: ["Basic", "Shared"] }); // just incase we need it
