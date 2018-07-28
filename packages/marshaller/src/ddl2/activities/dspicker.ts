import { publish } from "@hpcc-js/common";
import { Activity, ActivitySelection } from "./activity";
import { Databomb, Form } from "./databomb";
import { HipiePipeline } from "./hipiepipeline";
import { LogicalFile } from "./logicalfile";
import { HipieRequest, RoxieRequest } from "./roxie";
import { WUResult } from "./wuresult";

const sampleData = [];

export function isDatasource(activity: Activity) {
    return activity instanceof DSPicker ||
        activity instanceof Databomb ||
        activity instanceof Form ||
        activity instanceof LogicalFile ||
        activity instanceof RoxieRequest ||
        activity instanceof HipieRequest ||
        activity instanceof WUResult;
}

export type DSPickerType = "wuresult" | "wuresult-vm" | "logicalfile" | "logicalfile-vm" | "form" | "databomb" | "hipie" | "roxie" | "roxie-vm";
let dsPickerID = 0;
export class DSPicker extends ActivitySelection {
    private _view: HipiePipeline;

    @publish("wuresult", "set", "Type", ["wuresult", "wuresult-vm", "logicalfile", "logicalfile-vm", "form", "databomb", "hipie", "roxie", "roxie-vm"])
    _type: DSPickerType; // DDL2.IDatasourceType;
    type(_?: DSPickerType/*DDL2.IDatasourceType*/): this | DSPickerType { // DDL2.IDatasourceType | this {
        if (!arguments.length) return this._type;
        this._type = _;
        switch (_) {
            case "wuresult":
                this.selection(this.activities()[0]);
                break;
            case "wuresult-vm":
                this.selection(this.activities()[6]);
                break;
            case "logicalfile":
                this.selection(this.activities()[1]);
                break;
            case "logicalfile-vm":
                this.selection(this.activities()[7]);
                break;
            case "hipie":
                this.selection(this.activities()[2]);
                break;
            case "roxie":
                this.selection(this.activities()[3]);
                break;
            case "roxie-vm":
                this.selection(this.activities()[8]);
                break;
            case "databomb":
                this.selection(this.activities()[4]);
                break;
            case "form":
                this.selection(this.activities()[5]);
                break;
        }
        this.details(this.selection());
        return this;
    }
    @publish(null, "widget", "Data Source")
    details: publish<this, Activity>;

    constructor(view: HipiePipeline) {
        super();
        this._id = `ds_${++dsPickerID}`;
        this._view = view;
        this.activities([
            new WUResult()
                .url("http://52.51.90.23:8010")
                .wuid("W20180513-082149")
                .resultName("Result 1")
            ,
            new LogicalFile()
                .url("http://52.51.90.23:8010")
                .logicalFile("progguide::exampledata::peopleaccts")
            ,
            new HipieRequest(this._view._elementContainer)
            ,
            new RoxieRequest(this._view._elementContainer)
                .url("http://52.51.90.23:8002")
                .querySet("roxie")
                .queryID("peopleaccounts")
                .resultName("Accounts"),
            new Databomb()
                .payload(JSON.stringify(sampleData))
            ,
            new Form()
                .payload({
                    id: 770,
                    fname: "TIMTOHY",
                    lname: "SALEEMI",
                    minitial: "",
                    gender: "M",
                    street: "1734 NOSTRAND AVE # 3",
                    city: "DRACUT",
                    st: "MA",
                    zip: "01826"
                }),
            new WUResult()
                .url("http://192.168.3.22:8010")
                .wuid("W20171201-153452")
                .resultName("Result 1")
            ,
            new LogicalFile()
                .url("http://192.168.3.22:8010")
                .logicalFile("progguide::exampledata::peopleaccts")
            ,
            new RoxieRequest(this._view._elementContainer)
                .url("http://192.168.3.22:8002")
                .querySet("roxie")
                .queryID("peopleaccounts")
                .resultName("Accounts"),
        ]);
        this.type("form");
    }
}
DSPicker.prototype._class += " DSPicker";
