import { publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { Activity } from "./activity";
import { Databomb } from "./databomb";
import { Form } from "./form";
import { LogicalFile } from "./logicalfile";
import { RoxieResult, RoxieService } from "./roxie";
import { WU, WUResult } from "./wuresult";

let datasourceID = 0;
export class Datasource extends Activity {

    constructor() {
        super();
        this._id = `ds_${++datasourceID}`;
    }
}

export type DatasourceRefType = Databomb | Form | LogicalFile | RoxieResult | WUResult;
export type DatasourceType = Databomb | Form | LogicalFile | RoxieService | WU;

export class DatasourceRef extends Activity {
    @publish(null, "widget", "Datasource Reference", null, { internal: true })
    _datasource: DatasourceRefType;
    datasource(): DatasourceRefType;
    datasource(_: DatasourceRefType): this;
    datasource(_?: DatasourceRefType): this | DatasourceRefType {
        if (!arguments.length) return this._datasource;
        this._datasource = _;
        this.sourceActivity(_);
        return this;
    }

    constructor() {
        super();
    }

    toDDL(): DDL2.IDatabombRef {
        return {
            id: this.id()
        };
    }
}
DatasourceRef.prototype._class += " DatasourceRef";
