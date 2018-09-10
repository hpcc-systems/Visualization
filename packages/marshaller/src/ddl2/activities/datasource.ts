import { publish } from "@hpcc-js/common";
import { Activity } from "./activity";
import { Databomb, Form } from "./databomb";
import { LogicalFile } from "./logicalfile";
import { RoxieResult } from "./roxie";
import { WUResult } from "./wuresult";

let datasourceID = 0;
export class Datasource extends Activity {

    constructor() {
        super();
        this._id = `ds_${++datasourceID}`;
    }
}

export type DatasourceType = Databomb | Form | LogicalFile | RoxieResult | WUResult;

export class DatasourceRef extends Activity {
    @publish(null, "widget", "Datasource Reference")
    _datasource: DatasourceType;
    datasource(): DatasourceType;
    datasource(_: DatasourceType): this;
    datasource(_?: DatasourceType): this | DatasourceType {
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
