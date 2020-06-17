import { FieldForm } from "@hpcc-js/form";
import { Table } from "@hpcc-js/dgrid";
import { DataGraph } from "@hpcc-js/graph";
import * as marshaller from "@hpcc-js/marshaller";

//  Dashboard Element Container (Model)  ---
const ec = new marshaller.ElementContainer();

namespace data {
    export const ds_4 = new marshaller.Form()
        .formFields([
            new marshaller.FormField().fieldID("CustomerID").default("20995239"),
            new marshaller.FormField().fieldID("IndustryType").default("1029"),
            new marshaller.FormField().fieldID("TreeUID").default("_013550779256")
        ])
        ;
    export const Ins003_dsOutput2 = new marshaller.RoxieService(ec)
        .url("http://10.173.10.157:8002/")
        .querySet("roxie")
        .queryID("databuildramps_mbs_Fraudgov_LinksChart1.Ins003_Service_1")
        .requestFields([{ id: "customerid", type: "number" }, { id: "industrytype", type: "number" }, { id: "treeuid", type: "string" }])
        ;
    export const Ins003_dsOutput2_View_e_5 = new marshaller.RoxieResult(ec)
        .service(Ins003_dsOutput2)
        .resultName("View_e_5")
        .responseFields([{ id: "customerid", type: "number" }, { id: "industrytype", type: "number" }, { id: "treeuid", type: "string" }, { id: "fromentitycontextuid", type: "string" }, { id: "toentitycontextuid", type: "string" }])
        ;
    export const Ins003_dsOutput2_View_e_5_e_5 = new marshaller.HipieResultRef(ec)
        .datasource(Ins003_dsOutput2_View_e_5)
        .requestFieldRefs([{ source: "e_4", remoteFieldID: "CustomerID", localFieldID: "customerid", value: undefined }, { source: "e_4", remoteFieldID: "IndustryType", localFieldID: "industrytype", value: undefined }, { source: "e_4", remoteFieldID: "TreeUID", localFieldID: "treeuid", value: undefined }])
        ;
    export const Ins003_dsOutput2_View_e_6 = new marshaller.RoxieResult(ec)
        .service(Ins003_dsOutput2)
        .resultName("View_e_6")
        .responseFields([{ id: "customerid", type: "number" }, { id: "industrytype", type: "number" }, { id: "treeuid", type: "string" }, { id: "entitycontextuid", type: "string" }, { id: "t_actdtecho", type: "number" }, { id: "entitytype", type: "number" }, { id: "label", type: "string" }, { id: "riskindx", type: "number" }, { id: "aotkractflagev", type: "number" }, { id: "aotsafeactflagev", type: "number" }, { id: "personeventcount", type: "number" }, { id: "deceaseddate", type: "number" }])
        ;
    export const Ins003_dsOutput2_View_e_6_e_6 = new marshaller.HipieResultRef(ec)
        .datasource(Ins003_dsOutput2_View_e_6)
        .requestFieldRefs([{ source: "e_4", remoteFieldID: "CustomerID", localFieldID: "customerid", value: undefined }, { source: "e_4", remoteFieldID: "IndustryType", localFieldID: "industrytype", value: undefined }, { source: "e_4", remoteFieldID: "TreeUID", localFieldID: "treeuid", value: undefined }])
        ;
}

namespace viz {
    export const cp_4 = new marshaller.VizChartPanel()
        .id("cp_4")
        .title("Input Form")
        .widget(new FieldForm()
            .validate(false)
            .allowEmptyRequest(true))
        ;

    export const cp_5 = new marshaller.VizChartPanel()
        .id("cp_5")
        .title("Edges")
        .widget(new Table())
        ;

    export const cp_6 = new marshaller.VizChartPanel()
        .id("cp_6")
        .title("Links Chart")
        .widget(new DataGraph()
            .zoomToFitLimit(1)
            .layout("ForceDirected")
            .edgeArcDepth(0)
            .edgeColor("#287EC4")
            .edgeStrokeWidth(2)
            .vertexCategoryColumn("entitytype")
            .vertexIDColumn("entitycontextuid")
            .vertexLabelColumn("label")
            .vertexCentroidColumn("treeuid")
            .edgeSourceColumn("fromentitycontextuid")
            .edgeTargetColumn("toentitycontextuid"))
        ;
}

//  Dashboard Elements  (Controller) ---
const e_4 = new marshaller.Element(ec)
    .id("e_4")
    .pipeline([
        data.ds_4
    ])
    .mappings(new marshaller.Mappings().transformations([]))
    .chartPanel(viz.cp_4)
    .on("selectionChanged", () => {
        // TODO: DataGraph Will need to be last.
        e_5.refresh();
        e_6.refresh();
    }, true)
    ;
e_4.visualization()
    .visibility("normal")
    .secondaryDataviewID("")
    ;
ec.append(e_4);

const e_5 = new marshaller.Element(ec)
    .id("e_5")
    .pipeline([
        data.Ins003_dsOutput2_View_e_5_e_5
    ])
    .mappings(new marshaller.Mappings().transformations([]))
    .chartPanel(viz.cp_5)
    .on("selectionChanged", () => {
        // TODO: DataGraph Will need to be last.
    }, true)
    ;
e_5.visualization()
    .visibility("normal")
    .secondaryDataviewID("")
    ;
ec.append(e_5);

const e_6 = new marshaller.Element(ec)
    .id("e_6")
    .pipeline([
        data.Ins003_dsOutput2_View_e_6_e_6
    ])
    .mappings(new marshaller.Mappings().transformations([]))
    .chartPanel(viz.cp_6)
    .on("selectionChanged", () => {
        // TODO: DataGraph Will need to be last.
    }, true)
    ;
e_6.visualization()
    .visibility("normal")
    .secondaryDataviewID("e_5")
    ;
ec.append(e_6);

ec.refresh();

//  Optional  ---
const errors = ec.validate();
for (const error of errors) {
    console.error(error.elementID + " (" + error.source + "):  " + error.msg);
}

export const dashboard = new marshaller.Dashboard(ec)
    .target("placeholder")
    .titleVisible(false)
    .hideSingleTabs(true)
    .layoutObj({ main: { type: "split-area", orientation: "horizontal", children: [{ type: "split-area", orientation: "vertical", children: [{ type: "tab-area", widgets: [{ __id: "cp_4" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "cp_5" }], currentIndex: 0 }], sizes: [0.5416666666666666, 0.4583333333333334] }, { type: "tab-area", widgets: [{ __id: "cp_6" }], currentIndex: 0 }], sizes: [0.4224119755429053, 0.5775880244570947] } })
    .render()
    ;

// @ts-ignore
const ddl = { "version": "2.2.1", "createdBy": { "name": "@hpcc-js/marshaller", "version": "2.23.29" }, "datasources": [{ "type": "form", "id": "ds_4", "fields": [{ "type": "string", "id": "CustomerID", "default": "20995239" }, { "type": "string", "id": "IndustryType", "default": "1029" }, { "type": "string", "id": "TreeUID", "default": "_013550779256" }] }, { "type": "hipie", "id": "Ins003_dsOutput2", "url": "http://10.173.10.157:8002/", "querySet": "roxie", "queryID": "databuildramps_mbs_Fraudgov_LinksChart1.Ins003_Service_1", "inputs": [{ "id": "customerid", "type": "number" }, { "id": "industrytype", "type": "number" }, { "id": "treeuid", "type": "string" }], "outputs": { "View_e_5": { "fields": [{ "id": "customerid", "type": "number" }, { "id": "industrytype", "type": "number" }, { "id": "treeuid", "type": "string" }, { "id": "fromentitycontextuid", "type": "string" }, { "id": "toentitycontextuid", "type": "string" }] }, "View_e_6": { "fields": [{ "id": "customerid", "type": "number" }, { "id": "industrytype", "type": "number" }, { "id": "treeuid", "type": "string" }, { "id": "entitycontextuid", "type": "string" }, { "id": "t_actdtecho", "type": "number" }, { "id": "entitytype", "type": "number" }, { "id": "label", "type": "string" }, { "id": "riskindx", "type": "number" }, { "id": "aotkractflagev", "type": "number" }, { "id": "aotsafeactflagev", "type": "number" }, { "id": "personeventcount", "type": "number" }, { "id": "deceaseddate", "type": "number" }] } } }], "dataviews": [{ "id": "e_4", "datasource": { "id": "ds_4" }, "activities": [], "visualization": { "id": "cp_4", "title": "Input Form", "visibility": "normal", "chartType": "FieldForm", "__class": "form_FieldForm", "mappings": { "type": "mappings", "transformations": [] }, "properties": { "__class": "marshaller_VizChartPanel", "title": "Input Form", "widget": { "__class": "form_FieldForm", "validate": false, "allowEmptyRequest": true } } } }, { "id": "e_5", "datasource": { "id": "Ins003_dsOutput2", "output": "View_e_5", "request": [{ "source": "e_4", "remoteFieldID": "CustomerID", "localFieldID": "customerid" }, { "source": "e_4", "remoteFieldID": "IndustryType", "localFieldID": "industrytype" }, { "source": "e_4", "remoteFieldID": "TreeUID", "localFieldID": "treeuid" }] }, "activities": [], "visualization": { "id": "cp_5", "title": "Edges", "visibility": "normal", "chartType": "Table", "__class": "dgrid_Table", "mappings": { "type": "mappings", "transformations": [] }, "properties": { "__class": "marshaller_VizChartPanel", "title": "Edges", "widget": { "__class": "dgrid_Table", "columnFormats": [] } } } }, { "id": "e_6", "datasource": { "id": "Ins003_dsOutput2", "output": "View_e_6", "request": [{ "source": "e_4", "remoteFieldID": "CustomerID", "localFieldID": "customerid" }, { "source": "e_4", "remoteFieldID": "IndustryType", "localFieldID": "industrytype" }, { "source": "e_4", "remoteFieldID": "TreeUID", "localFieldID": "treeuid" }] }, "activities": [], "visualization": { "id": "cp_6", "title": "Links Chart", "visibility": "normal", "chartType": "DataGraph", "__class": "graph_DataGraph", "mappings": { "type": "mappings", "transformations": [] }, "properties": { "__class": "marshaller_VizChartPanel", "title": "Links Chart", "widget": { "__class": "graph_DataGraph", "zoomToFitLimit": 1, "layout": "ForceDirected", "edgeArcDepth": 0, "edgeColor": "#287EC4", "edgeStrokeWidth": 2, "vertexCategoryColumn": "entitytype", "vertexIDColumn": "entitycontextuid", "vertexLabelColumn": "label", "vertexCentroidColumn": "treeuid", "vertexAnnotationColumns": [], "edgeSourceColumn": "fromentitycontextuid", "edgeTargetColumn": "toentitycontextuid" } }, "secondaryDataviewID": "e_5" } }], "properties": { "name": "@hpcc-js/marshaller", "version": "2.23.29", "buildVersion": "2.19.0", "layout": { "main": { "type": "split-area", "orientation": "horizontal", "children": [{ "type": "split-area", "orientation": "vertical", "children": [{ "type": "tab-area", "widgets": [{ "__id": "cp_4" }], "currentIndex": 0 }, { "type": "tab-area", "widgets": [{ "__id": "cp_5" }], "currentIndex": 0 }], "sizes": [0.5416666666666666, 0.4583333333333334] }, { "type": "tab-area", "widgets": [{ "__id": "cp_6" }], "currentIndex": 0 }], "sizes": [0.4224119755429053, 0.5775880244570947] } } } };
