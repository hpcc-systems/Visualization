import { publish } from "@hpcc-js/common";
import { ElementContainer } from "../model/element";
import { ActivitySelection } from "./activity";
import { Databomb, emptyDatabomb, Form } from "./databomb";
import { DatasourceRef, DatasourceType } from "./datasource";
import { LogicalFile } from "./logicalfile";
import { HipieResultRef, RoxieResult, RoxieService } from "./roxie";
import { WUResult, WUResultRef } from "./wuresult";

let dsPickerID = 0;
export class DSPicker extends ActivitySelection {
    private _elementContainer: ElementContainer;
    private _nullDatasource = emptyDatabomb;

    @publish("", "set", "Activity", function (this: DSPicker) { return this.datasourceIDs(); }, { optional: false })
    _datasourceID: string; // DDL2.IDatasourceType;
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

    datasource(): DatasourceType {
        return this.datasourceRef().datasource();
    }

    refreshRef(id: string) {
        const ds: DatasourceType = this._elementContainer.datasource(id);
        if (ds instanceof Databomb) {
            this.selection(new DatasourceRef().datasource(ds));
        } else if (ds instanceof Form) {
            this.selection(new DatasourceRef().datasource(ds));
        } else if (ds instanceof LogicalFile) {
            this.selection(new DatasourceRef().datasource(ds));
        } else if (ds instanceof RoxieService) {
            this.selection(new DatasourceRef().datasource(ds));
        } else if (ds instanceof RoxieResult) {
            this.selection(new HipieResultRef(this._elementContainer).datasource(ds));
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

    constructor(ec: ElementContainer) {
        super();
        this._id = `ds_${++dsPickerID}`;
        this._elementContainer = ec;
        const ds = this._elementContainer.datasources()[0];
        this.datasourceID(ds.id());
    }

    datasourceIDs() {
        return this._elementContainer.datasources().map(ds => {
            return {
                value: ds.id(),
                text: ds.label()
            };
        });
    }
}
DSPicker.prototype._class += " DSPicker";
