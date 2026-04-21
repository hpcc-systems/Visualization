import { DDL2 } from "@hpcc-js/ddl-shim";
import { Activity } from "./activity.ts";
import { Databomb } from "./databomb.ts";
import { Form } from "./form.ts";
import { LogicalFile } from "./logicalfile.ts";
import { RestResult, RestService } from "./rest.ts";
import { RoxieResult, RoxieService } from "./roxie.ts";
import { WU, WUResult } from "./wuresult.ts";

let datasourceID = 0;
export class Datasource extends Activity {

    constructor() {
        super();
        this._id = `ds_${++datasourceID}`;
    }
}

export type DatasourceRefType = Databomb | Form | LogicalFile | RoxieResult | WUResult | RestResult;
export type DatasourceType = Databomb | Form | LogicalFile | RoxieService | WU | RestService;

export class DatasourceRef extends Activity {
    _origDatasource;
    declare _datasource: DatasourceRefType;

    constructor() {
        super();
    }

    hash(more: { [key: string]: any } = {}): string {
        return super.hash({
            datasource: this._datasource ? this._datasource.hash(more) : undefined,
            ...more
        });
    }

    toDDL(): DDL2.IDatabombRef {
        return {
            id: this.datasource().id()
        };
    }
}
DatasourceRef.prototype._class += " DatasourceRef";

export interface DatasourceRef {
    datasource(): DatasourceRefType;
    datasource(_: DatasourceRefType): this;
}

DatasourceRef.prototype.publish("datasource", null, "widget", "Datasource Reference", null, { internal: true });

DatasourceRef.prototype._origDatasource = DatasourceRef.prototype.datasource;
DatasourceRef.prototype.datasource = function (this: DatasourceRef, _?) {
    const retVal = DatasourceRef.prototype._origDatasource.apply(this, arguments);
    if (_ !== undefined) {
        this.sourceActivity(_);
    }
    return retVal;
};