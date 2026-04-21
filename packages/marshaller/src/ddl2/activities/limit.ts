import { DDL2 } from "@hpcc-js/ddl-shim";
import { hashSum } from "@hpcc-js/util";
import { Activity } from "./activity.ts";

export class Limit extends Activity {

    constructor() {
        super();
    }

    toDDL(): DDL2.ILimit {
        return {
            type: "limit",
            limit: this.rows()
        };
    }

    fromDDL(ddl: DDL2.ILimit): this {
        return this
            .rows(ddl.limit)
            ;
    }

    static fromDDL(ddl: DDL2.ILimit): Limit {
        return new Limit().fromDDL(ddl);
    }

    hash(): string {
        return hashSum({
            limit: this.rows()
        });
    }

    exists(): boolean {
        return this.rows_exists() && this.rows() > 0;
    }

    computeData(): ReadonlyArray<object> {
        const data = super.computeData();
        if (data.length === 0 || !this.exists()) return data;
        return data.slice(0, Math.min(this.rows(), data.length));
    }
}
Limit.prototype._class += " Limit";

export interface Limit {
    rows(): number | undefined;
    rows(_: number | undefined): this;
    rows_exists(): boolean;
}
Limit.prototype.publish("rows", undefined, "number", "Limit output");