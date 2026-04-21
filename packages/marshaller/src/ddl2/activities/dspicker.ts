import { DDL2 } from "@hpcc-js/ddl-shim";
import { ElementContainer } from "../model/element.ts";
import { ActivitySelection, IActivityError } from "./activity.ts";
import { Databomb, emptyDatabomb } from "./databomb.ts";
import { DatasourceRef, DatasourceRefType } from "./datasource.ts";
import { Form } from "./form.ts";
import { LogicalFile } from "./logicalfile.ts";
import { RestResult, RestResultRef } from "./rest.ts";
import { HipieResultRef, RoxieResult, RoxieService } from "./roxie.ts";
import { WUResult, WUResultRef } from "./wuresult.ts";

let dsPickerID = 0;
export class DSPicker extends ActivitySelection {
    private _nullDatasource = emptyDatabomb;

    _origDatasourceID;
    _origDatasourceRef;

    declare _datasourceID: string; // DDL2.IDatasourceType;
    declare _datasourceRef: DatasourceRef;

    datasource(): DatasourceRefType {
        return this.datasourceRef().datasource();
    }

    refreshRef(id: string) {
        const ds: DatasourceRefType = this._ec.datasource(id);
        if (ds instanceof Databomb) {
            this.selection(new DatasourceRef().datasource(ds));
        } else if (ds instanceof Form) {
            this.selection(new DatasourceRef().datasource(ds));
        } else if (ds instanceof LogicalFile) {
            this.selection(new DatasourceRef().datasource(ds));
        } else if (ds instanceof RoxieService) {
            this.selection(new DatasourceRef().datasource(ds));
        } else if (ds instanceof WUResult) {
            this.selection(new WUResultRef().datasource(ds));
        } else if (ds instanceof RoxieResult) {
            this.selection(new HipieResultRef(this._ec).datasource(ds));
        } else if (ds instanceof RestResult) {
            this.selection(new RestResultRef(this._ec).datasource(ds));
        }
    }

    selection(): DatasourceRef;
    selection(_: DatasourceRef): this;
    selection(_?: DatasourceRef): DatasourceRef | this {
        const retVal = super.selection.apply(this, arguments);
        if (!arguments.length) return retVal || this._nullDatasource;
        if (this._datasourceID !== _.datasource().id()) {
            this._datasourceID = _.datasource().id();
        }
        return this;
    }

    validate(): IActivityError[] {
        return this.selection().validate();
    }

    constructor(private _ec: ElementContainer) {
        super();
        this._id = `ds_${++dsPickerID}`;
        const ds = this._ec.datasources()[0];
        this.datasourceID(ds.id());
    }

    toDDL(): DDL2.IDatasourceRef {
        return {
            ...this.datasourceRef().toDDL(),
            id: this.datasourceID()
        };
    }

    //  Activity overrides ---
    hash(more: { [key: string]: any } = {}): string {
        return super.hash({
            ...more
        });
    }

    datasourceIDs() {
        return this._ec.datasources().map(ds => {
            return {
                value: ds.id(),
                text: `${ds.label()} ${ds.id() !== ds.label() ? ` (${ds.id()})` : ""}`
            };
        });
    }
}
DSPicker.prototype._class += " DSPicker";

export interface DSPicker {
    datasourceID(): string;
    datasourceID(_: string): this;
    datasourceRef(): DatasourceRef;
    datasourceRef(_: DatasourceRef): this;
}

DSPicker.prototype.publish("datasourceID", "", "set", "Activity", function (this: DSPicker) { return this.datasourceIDs(); }, { optional: false });
DSPicker.prototype.publish("datasourceRef", "", "widget", "Activity");

DSPicker.prototype._origDatasourceID = DSPicker.prototype.datasourceID;
DSPicker.prototype.datasourceID = function (this: DSPicker, _?) {
    const prev = this._datasourceID;
    const retVal = DSPicker.prototype._origDatasourceID.apply(this, arguments);
    if (_ !== undefined && prev !== _) {
        this.refreshRef(_);
    }
    return retVal;
};

DSPicker.prototype._origDatasourceRef = DSPicker.prototype.datasourceRef;
DSPicker.prototype.datasourceRef = function (this: DSPicker, _?) {
    return ActivitySelection.prototype.selection.apply(this, arguments);
};