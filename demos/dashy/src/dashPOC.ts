// tslint:disable
import { Table } from "@hpcc-js/dgrid";
import { FieldForm } from "@hpcc-js/form";
import * as marshaller from "@hpcc-js/marshaller";

//  Dashboard Element Container (Model)  ---
const ec = new marshaller.ElementContainer();

namespace data {
    export const Ins002_dsOutput1 = new marshaller.WU(ec)
        .url("http://10.173.147.1:8010/")
        .wuid("W20190617-131840")
        ;
    export const Ins002_dsOutput1_Ins002_dsOutput1_View_table1 = new marshaller.WUResult(ec)
        .wu(Ins002_dsOutput1)
        .resultName("Ins002_dsOutput1_View_table1")
        .responseFields([{ id: "state", type: "string" }, { id: "id", type: "number64" }, { id: "first_name", type: "string" }, { id: "last_name", type: "string" }, { id: "gender", type: "string" }, { id: "lat", type: "number" }, { id: "lng", type: "number" }, { id: "whole_number", type: "number64" }, { id: "decimal_number", type: "number" }, { id: "created_time", type: "string" }, { id: "created_date", type: "string" }, { id: "vip", type: "string" }])
        ;
    export const e_8 = new marshaller.Form()
        .formFields([
            new marshaller.FormField().fieldID("filter_state")
        ])
        ;
}

namespace viz {
    export const table1 = new marshaller.VizChartPanel()
        .id("table1")
        .title("Table 1")
        .widget(new Table())
        ;

    export const cp_8 = new marshaller.VizChartPanel()
        .id("cp_8")
        .title("Element 8")
        .widget(new FieldForm()
            .validate(false)
            .allowEmptyRequest(true))
        ;
}

//  Dashboard Elements  (Controller) ---
const table1 = new marshaller.Element(ec)
    .id("table1")
    .pipeline([
        data.Ins002_dsOutput1_Ins002_dsOutput1_View_table1,
        new marshaller.Filters(ec).conditions([{ viewID: "e_8", mappings: [{ remoteFieldID: "filter_state", localFieldID: "state", condition: "==", nullable: true }] }])
    ])
    .mappings(new marshaller.Mappings().transformations([]))
    .chartPanel(viz.table1)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(table1);

const e_8 = new marshaller.Element(ec)
    .id("e_8")
    .pipeline([
        data.e_8
    ])
    .mappings(new marshaller.Mappings().transformations([]))
    .chartPanel(viz.cp_8)
    .on("selectionChanged", () => {
        table1.refresh();
    }, true)
    ;
ec.append(e_8);

ec.refresh();

//  Optional  ---
const errors = ec.validate();
for (const error of errors) {
    console.error(error.elementID + " (" + error.source + "):  " + error.msg);
}

export const dashboard = new marshaller.Dashboard(ec)
    .target("placeholder")
    .render(w => {
        (w as marshaller.Dashboard)
            .layoutObj({ main: { type: "tab-area", widgets: [{ __id: "table1" }], currentIndex: 0 } })
            .hideSingleTabs(true)
            ;
    })
    ;

// @ts-ignore
const ddl = { "version": "0.0.22", "createdBy": { "name": "@hpcc-js/marshaller", "version": "2.13.10" }, "datasources": [{ "type": "wuresult", "id": "Ins002_dsOutput1", "url": "http://10.173.147.1:8010/", "wuid": "W20190617-131840", "outputs": { "Ins002_dsOutput1_View_table1": { "fields": [{ "id": "state", "type": "string" }, { "id": "id", "type": "number64" }, { "id": "first_name", "type": "string" }, { "id": "last_name", "type": "string" }, { "id": "gender", "type": "string" }, { "id": "lat", "type": "number" }, { "id": "lng", "type": "number" }, { "id": "whole_number", "type": "number64" }, { "id": "decimal_number", "type": "number" }, { "id": "created_time", "type": "string" }, { "id": "created_date", "type": "string" }, { "id": "vip", "type": "string" }] } } }, { "type": "form", "id": "e_8", "fields": [{ "id": "filter_state", "type": "string", "default": "" }] }], "dataviews": [{ "id": "table1", "datasource": { "id": "Ins002_dsOutput1", "output": "Ins002_dsOutput1_View_table1" }, "activities": [{ "type": "filter", "conditions": [{ "viewID": "e_8", "mappings": [{ "remoteFieldID": "filter_state", "localFieldID": "state", "condition": "==", "nullable": true }] }] }], "visualization": { "id": "table1", "title": "Table 1", "description": "state == FL", "visibility": "normal", "chartType": "Table", "__class": "dgrid_Table", "mappings": { "type": "mappings", "transformations": [] }, "properties": { "__class": "marshaller_VizChartPanel", "title": "Table 1", "description": "state == FL", "widget": { "__class": "dgrid_Table", "columnFormats": [] } } } }, { "id": "e_8", "datasource": { "id": "e_8" }, "activities": [], "visualization": { "id": "cp_8", "title": "Element 8", "visibility": "flyout", "chartType": "FieldForm", "__class": "form_FieldForm", "mappings": { "type": "mappings", "transformations": [] }, "properties": { "__class": "marshaller_VizChartPanel", "title": "Element 8", "widget": { "__class": "form_FieldForm", "validate": false, "allowEmptyRequest": true } } } }], "properties": { "name": "@hpcc-js/marshaller", "version": "2.13.10", "buildVersion": "2.7.0", "layout": { "main": { "type": "tab-area", "widgets": [{ "__id": "table1" }], "currentIndex": 0 } } } };
