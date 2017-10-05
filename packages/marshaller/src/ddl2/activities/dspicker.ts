import { publish } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { Activity, ActivitySelection } from "./activity";
import { Databomb, Form } from "./databomb";
import { LogicalFile } from "./logicalfile";
import { HipieRequest, RoxieRequest } from "./roxie";
import { sampleData } from "./sampledata";
import { View } from "./view";
import { WUResult } from "./wuresult";

let dsPickerID = 0;
export class DSPicker extends ActivitySelection {
    private _view: View;

    @publish("wuresult", "set", "Type", ["wuresult", "logicalfile", "form", "databomb", "roxieservice", "hipieservice"])
    _type: DDL2.IDatasourceType;
    type(_?: DDL2.IDatasourceType): DDL2.IDatasourceType | this {
        if (!arguments.length) return this._type;
        this._type = _;
        switch (_) {
            case "wuresult":
                this.selection(this.activities()[0]);
                break;
            case "logicalfile":
                this.selection(this.activities()[1]);
                break;
            case "form":
                this.selection(this.activities()[4]);
                break;
            case "databomb":
                this.selection(this.activities()[3]);
                break;
            case "roxieservice":
                this.selection(this.activities()[2]);
                break;
            case "hipieservice":
                this.selection(this.activities()[5]);
                break;
        }
        this.details(this.selection());
        return this;
    }
    @publish(null, "widget", "Data Source")
    details: publish<this, Activity>;

    constructor(view: View) {
        super();
        this._id = `ds-${++dsPickerID}`;
        this._view = view;
        this.activities([
            new WUResult(this._view)
                .url("http://192.168.3.22:8010")
                .wuid("W20170424-070701")
                .resultName("Result 1")
            ,
            new LogicalFile(this._view)
                .url("http://192.168.3.22:8010")
                .logicalFile("progguide::exampledata::peopleaccts")
            ,
            new RoxieRequest(this._view)
                .url("http://192.168.3.22:8010")
                .querySet("roxie")
                .queryID("peopleaccounts.3")
                .resultName("Accounts"),
            new Databomb()
                .payload(sampleData)
            ,
            new Form()
                .payload({})
            ,
            new HipieRequest(this._view)
        ]);
        this.type("form");
    }
}
DSPicker.prototype._class += " DSPicker";
