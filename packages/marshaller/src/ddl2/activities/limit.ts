import { publish } from "@hpcc-js/common";
import { hashSum } from "@hpcc-js/util";
import { Activity } from "./activity";
import { View } from "./view";

export class Limit extends Activity {
    _owner: View;

    @publish(undefined, "number", "Limit output")
    rows: publish<this, number | undefined>;
    rows_exists: () => boolean;

    constructor(owner: View) {
        super();
        this._owner = owner;
    }

    hash(): string {
        return hashSum({
            limit: this.rows()
        });
    }

    exists(): boolean {
        return this.rows_exists() && this.rows() > 0;
    }

    pullData(): object[] {
        const data = super.pullData();
        if (this.exists()) {
            data.length = Math.min(this.rows(), data.length);
        }
        return data;
    }
}
Limit.prototype._class += " Limit";
