import { publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { hashSum } from "@hpcc-js/util";
import { Activity } from "./activity";

export class Limit extends Activity {

    @publish(undefined, "number", "Limit output")
    rows: publish<this, number | undefined>;
    rows_exists: () => boolean;

    constructor() {
        super();
    }

    toDDL(): DDL2.ILimit {
        return {
            type: "limit",
            limit: this.rows()
        };
    }

    static fromDDL(ddl: DDL2.ILimit): Limit {
        return new Limit()
            .rows(ddl.limit)
            ;
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
