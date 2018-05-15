// tslint:disable
import { ChoroplethStates } from "@hpcc-js/map";
import { Area, Bubble, Column } from "@hpcc-js/chart";
import { Table } from "@hpcc-js/dgrid";
import { ChartPanel } from "@hpcc-js/layout";
import * as marshaller from "@hpcc-js/marshaller";

//  Dashboard Element Container (Model)  ---
const ec = new marshaller.ElementContainer();

//  Data Sources  ---
const ds_3_Result_1 = new marshaller.WUResult()
    .url("http://192.168.3.22:8010")
    .wuid("W20171201-153452")
    .resultName("Result 1")
    .meta([{ id: "state", type: "string" }, { id: "zip", type: "string" }, { id: "gender", type: "string" }, { id: "personid", type: "number64" }, { id: "firstname", type: "string" }, { id: "lastname", type: "string" }])
    ;


const ds_6_Accounts = new marshaller.RoxieRequest(ec)
    .url("http://192.168.3.22:8002")
    .querySet("roxie")
    .queryID("peopleaccounts")
    .resultName("Accounts")
    .requestFields([{ id: "personid", type: "number" }])
    .responseFields([{ id: "account", type: "string" }, { id: "highcredit", type: "number" }, { id: "balance", type: "number" }, { id: "personid", type: "number" }])
    .requestFieldRefs([{ source: "e_5", remoteFieldID: "personid", localFieldID: "personid" }])
    ;

//  Visualization Widgets (View) ---
const cp_3 = new ChartPanel()
    .id("cp_3")
    .title("States")
    .widget(new ChoroplethStates()
        .projection("AlbersUsaPr")
    )
    ;

const cp_4 = new ChartPanel()
    .id("cp_4")
    .title("Gender")
    .widget(new Bubble())
    ;

const cp_5 = new ChartPanel()
    .id("cp_5")
    .title("People")
    .widget(new Table())
    ;

const cp_6 = new ChartPanel()
    .id("cp_6")
    .title("AC Summary")
    .widget(new Area())
    ;

const cp_7 = new ChartPanel()
    .id("cp_7")
    .title("Credit Summary")
    .widget(new Column()
        .xAxisHidden(true)
        .paletteID("category10")
    )
    ;

//  Dashboard Elements  (Controller) ---
const e_3 = new marshaller.Element(ec)
    .id("e_3")
    .pipeline([
        ds_3_Result_1,
        new marshaller.GroupBy().fieldIDs(["state"]).aggregates([{ fieldID: "meanZip", type: "mean", inFieldID: "zip", baseCountFieldID: undefined }])
    ])
    .chartPanel(cp_3)
    .on("selectionChanged", () => {
        e_5.refresh();
    }, true)
    ;
ec.append(e_3);

const e_4 = new marshaller.Element(ec)
    .id("e_4")
    .pipeline([
        ds_3_Result_1,
        new marshaller.GroupBy().fieldIDs(["gender"]).aggregates([{ fieldID: "Row Count", type: "count" }]),
        new marshaller.Sort().conditions([{ fieldID: "gender", descending: true }])
    ])
    .chartPanel(cp_4)
    .on("selectionChanged", () => {
        e_5.refresh();
    }, true)
    ;
ec.append(e_4);

const e_5 = new marshaller.Element(ec)
    .id("e_5")
    .pipeline([
        ds_3_Result_1,
        new marshaller.Filters(ec).conditions([{ viewID: "e_3", mappings: [{ remoteFieldID: "state", localFieldID: "state", condition: "==", nullable: false }] }, { viewID: "e_4", mappings: [{ remoteFieldID: "gender", localFieldID: "gender", condition: "==", nullable: true }] }]),
        new marshaller.Sort().conditions([{ fieldID: "lastname", descending: false }, { fieldID: "firstname", descending: false }]),
        new marshaller.Mappings().transformations([{ fieldID: "Last", type: "=", param1: "lastname", param2: undefined }, { fieldID: "First", type: "=", param1: "firstname", param2: undefined }])
    ])
    .chartPanel(cp_5)
    .on("selectionChanged", () => {
        e_6.refresh();
        e_7.refresh();
    }, true)
    ;
ec.append(e_5);

const e_6 = new marshaller.Element(ec)
    .id("e_6")
    .pipeline([
        ds_6_Accounts,
        new marshaller.Sort().conditions([{ fieldID: "highcredit", descending: false }]),
        new marshaller.Mappings().transformations([{ fieldID: "AC", type: "=", param1: "account", param2: undefined }, { fieldID: "Balance", type: "=", param1: "balance", param2: undefined }, { fieldID: "High Credit", type: "=", param1: "highcredit", param2: undefined }])
    ])
    .chartPanel(cp_6)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(e_6);

const e_7 = new marshaller.Element(ec)
    .id("e_7")
    .pipeline([
        ds_6_Accounts,
        new marshaller.GroupBy().fieldIDs(["personid"]).aggregates([{ fieldID: "Total Credit", type: "sum", inFieldID: "highcredit", baseCountFieldID: undefined }, { fieldID: "Total Balance", type: "sum", inFieldID: "balance", baseCountFieldID: undefined }])
    ])
    .chartPanel(cp_7)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(e_7);

ec.refresh();

//  Dashboard (optional) ---
export const dashboard = new marshaller.Dashboard(ec)
    .target("placeholder")
    .render(w => {
        (w as marshaller.Dashboard)
            .layout({ main: { type: "split-area", orientation: "vertical", children: [{ type: "split-area", orientation: "horizontal", children: [{ type: "tab-area", widgets: [{ __id: "cp_3" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "cp_4" }], currentIndex: 0 }], sizes: [0.6053857821901089, 0.3946142178098911] }, { type: "tab-area", widgets: [{ __id: "cp_5" }], currentIndex: 0 }, { type: "split-area", orientation: "horizontal", children: [{ type: "tab-area", widgets: [{ __id: "cp_6" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "cp_7" }], currentIndex: 0 }], sizes: [0.5, 0.5] }], sizes: [0.204392305217966, 0.3527826895577317, 0.4428250052243024] } })
            .hideSingleTabs(true)
            ;
    })
    ;
