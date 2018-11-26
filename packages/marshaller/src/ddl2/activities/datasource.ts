import { publish } from "@hpcc-js/common";
import { Activity } from "./activity";
import { Databomb, Form } from "./databomb";
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
    @publish(null, "widget", "Datasource Reference")
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
}
DatasourceRef.prototype._class += " DatasourceRef";
