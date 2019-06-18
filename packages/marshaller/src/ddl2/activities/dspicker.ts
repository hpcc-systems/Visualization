import { publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { ElementContainer } from "../model/element";
import { ActivitySelection, IActivityError } from "./activity";
import { Databomb, emptyDatabomb, Form } from "./databomb";
import { DatasourceRef, DatasourceRefType } from "./datasource";
import { LogicalFile } from "./logicalfile";
import { HipieResultRef, RoxieResult, RoxieService } from "./roxie";
import { WUResult, WUResultRef } from "./wuresult";

let dsPickerID = 0;
export class DSPicker extends ActivitySelection {
    private _nullDatasource = emptyDatabomb;

    @publish("", "set", "Activity", function (this: DSPicker) { return this.datasourceIDs(); }, { optional: false })
    _datasourceID: string; // DDL2.IDatasourceType;
    datasourceID(): string;
    datasourceID(_: string): this;
    datasourceID(_?: string): this | string {
        if (!arguments.length) return this._datasourceID;
        if (this._datasourceID !== _) {
            this._datasourceID = _;
            this.refreshRef(_);
        }
        return this;
    }

    @publish("", "widget", "Activity")
    _datasourceRef: DatasourceRef;
    datasourceRef(): DatasourceRef;
    datasourceRef(_: DatasourceRef): this;
    datasourceRef(_?: DatasourceRef): this | DatasourceRef {
        return super.selection.apply(this, arguments);
    }

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
        } else if (ds instanceof RoxieResult) {
            this.selection(new HipieResultRef(this._ec).datasource(ds));
        } else if (ds instanceof WUResult) {
            this.selection(new WUResultRef().datasource(ds));
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
