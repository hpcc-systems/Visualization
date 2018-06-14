// tslint:disable
import { Table } from "@hpcc-js/dgrid";
import { FieldForm } from "@hpcc-js/form";
import { ChartPanel } from "@hpcc-js/layout";
import * as marshaller from "@hpcc-js/marshaller";

import { MyGraph } from "./dashPOCGraph";

//  Dashboard Element Container (Model)  ---
const ec = new marshaller.ElementContainer();

namespace data {
    export const Ins5176579_dsOutput1_View_Graph = new marshaller.HipieRequest(ec)
        .url("http://10.241.100.157:8002")
        .querySet("roxie")
        .queryID("carmigjx_govottoclusterdetails1.Ins5176579_Service_2")
        .resultName("View_Graph")
        .requestFields([{ id: "customer_id_", type: "number" }, { id: "industry_type_", type: "number" }, { id: "tree_uid_", type: "string" }, { id: "indicatordescription", type: "string" }, { id: "entity_context_uid_", type: "string" }, { id: "frompersonentitycontextuid", type: "string" }, { id: "topersonentitycontextuid", type: "string" }])
        .responseFields([{ id: "entity_context_uid_", type: "string" }, { id: "entity_type_", type: "number" }, { id: "label_", type: "string" }, { id: "deceased_match_", type: "number" }, { id: "death_prior_to_all_events_", type: "number" }, { id: "high_frequency_flag_", type: "number" }, { id: "high_risk_death_prior_to_all_events_percent_flag_", type: "number" }, { id: "all_high_risk_death_prior_to_all_events_person_percent_flag_", type: "number" }, { id: "nas9_flag_", type: "number" }, { id: "nap3_flag_", type: "number" }, { id: "exp1_", type: "dataset", children: [{ id: "entity_context_uid_", type: "string" }] }, { id: "customer_id_", type: "number" }, { id: "industry_type_", type: "number" }, { id: "score_", type: "number" }, { id: "cluster_score_", type: "number" }, { id: "latitude_", type: "number" }, { id: "longitude_", type: "number" }, { id: "deceased_person_count_", type: "number" }, { id: "date_first_seen_", type: "number" }, { id: "date_last_seen_", type: "number" }, { id: "cl_event_count_", type: "number" }, { id: "cl_identity_count_", type: "number" }, { id: "cl_address_count_", type: "number" }, { id: "cl_event_count_percentile_", type: "number" }, { id: "cl_identity_count_percentile_", type: "number" }, { id: "cl_impact_weight_", type: "number" }, { id: "cl_high_risk_pattern1_flag_", type: "number" }, { id: "cl_high_risk_pattern2_flag_", type: "number" }, { id: "cl_high_risk_pattern3_flag_", type: "number" }, { id: "cl_high_risk_pattern4_flag_", type: "number" }, { id: "cl_high_risk_pattern5_flag_", type: "number" }, { id: "kr_high_risk_flag_", type: "number" }, { id: "kr_medium_risk_flag_", type: "number" }, { id: "person_count_", type: "number" }, { id: "__recordcount", type: "number" }, { id: "street_address_", type: "string" }, { id: "vanity_city_", type: "string" }, { id: "state_", type: "string" }, { id: "zip_", type: "number" }])
        .requestFieldRefs([{ source: "govottoclusterdetails1FORM", remoteFieldID: "customer_id_", localFieldID: "customer_id_" }, { source: "govottoclusterdetails1FORM", remoteFieldID: "industry_type_", localFieldID: "industry_type_" }, { source: "govottoclusterdetails1FORM", remoteFieldID: "tree_uid_", localFieldID: "tree_uid_" }])
        ;
    export const Ins5176579_dsOutput1_View_EntityStats = new marshaller.HipieRequest(ec)
        .url("http://10.241.100.157:8002")
        .querySet("roxie")
        .queryID("carmigjx_govottoclusterdetails1.Ins5176579_Service_2")
        .resultName("View_EntityStats")
        .requestFields([{ id: "customer_id_", type: "number" }, { id: "industry_type_", type: "number" }, { id: "tree_uid_", type: "string" }, { id: "indicatordescription", type: "string" }, { id: "entity_context_uid_", type: "string" }, { id: "frompersonentitycontextuid", type: "string" }, { id: "topersonentitycontextuid", type: "string" }])
        .responseFields([{ id: "indicatordescription", type: "string" }, { id: "field", type: "string" }, { id: "value", type: "string" }, { id: "indicatortype", type: "string" }, { id: "label", type: "string" }, { id: "fieldtype", type: "string" }])
        .requestFieldRefs([{ source: "govottoclusterdetails1FORM", remoteFieldID: "customer_id_", localFieldID: "customer_id_" }, { source: "govottoclusterdetails1FORM", remoteFieldID: "industry_type_", localFieldID: "industry_type_" }, { source: "govottoclusterdetails1FORM", remoteFieldID: "tree_uid_", localFieldID: "entity_context_uid_" }, { source: "govottoclusterdetails2FORM", remoteFieldID: "indicatordescription", localFieldID: "indicatordescription" }])
        ;
    export const Ins5176579_dsOutput1_View_RelatedIdentities = new marshaller.HipieRequest(ec)
        .url("http://10.241.100.157:8002")
        .querySet("roxie")
        .queryID("carmigjx_govottoclusterdetails1.Ins5176579_Service_2")
        .resultName("View_RelatedIdentities")
        .requestFields([{ id: "customer_id_", type: "number" }, { id: "industry_type_", type: "number" }, { id: "tree_uid_", type: "string" }, { id: "indicatordescription", type: "string" }, { id: "entity_context_uid_", type: "string" }, { id: "frompersonentitycontextuid", type: "string" }, { id: "topersonentitycontextuid", type: "string" }])
        .responseFields([{ id: "customer_id_", type: "number" }, { id: "industry_type_", type: "number" }, { id: "topersonentitycontextuid", type: "string" }, { id: "sameaddressemailmatch", type: "number" }, { id: "sameaddressssnmatch", type: "number" }, { id: "sameaddressphonenumbermatch", type: "number" }, { id: "nonhighfrequencyaddresscount", type: "number" }, { id: "nonhighfrequencysameaddresssamedaycount", type: "number" }, { id: "highfrequencysameaddresssamedaycount", type: "number" }, { id: "sharedaddresscount", type: "number" }, { id: "topersonlabel", type: "string" }])
        .requestFieldRefs([{ source: "Graph", remoteFieldID: "entity_context_uid_", localFieldID: "frompersonentitycontextuid" }, { source: "govottoclusterdetails1FORM", remoteFieldID: "customer_id_", localFieldID: "customer_id_" }, { source: "govottoclusterdetails1FORM", remoteFieldID: "industry_type_", localFieldID: "industry_type_" }])
        ;
    export const Ins5176579_dsOutput1_View_AssociationDetails = new marshaller.HipieRequest(ec)
        .url("http://10.241.100.157:8002")
        .querySet("roxie")
        .queryID("carmigjx_govottoclusterdetails1.Ins5176579_Service_2")
        .resultName("View_AssociationDetails")
        .requestFields([{ id: "customer_id_", type: "number" }, { id: "industry_type_", type: "number" }, { id: "tree_uid_", type: "string" }, { id: "indicatordescription", type: "string" }, { id: "entity_context_uid_", type: "string" }, { id: "frompersonentitycontextuid", type: "string" }, { id: "topersonentitycontextuid", type: "string" }])
        .responseFields([{ id: "label", type: "string" }, { id: "highfrequencyaddressflag", type: "number" }, { id: "sameaddressemailmatch", type: "number" }, { id: "sameaddressssnmatch", type: "number" }, { id: "sameaddressphonenumbermatch", type: "number" }, { id: "sameaddressmindistancedays", type: "number" }, { id: "sameaddresssameday", type: "number" }, { id: "highfrequencysameaddresssameday", type: "number" }])
        .requestFieldRefs([{ source: "Graph", remoteFieldID: "entity_context_uid_", localFieldID: "frompersonentitycontextuid" }, { source: "RelatedIdentities", remoteFieldID: "topersonentitycontextuid", localFieldID: "topersonentitycontextuid" }])
        ;
    export const Ins5176579_dsOutput1_View_IndicatorAttributes = new marshaller.HipieRequest(ec)
        .url("http://10.241.100.157:8002")
        .querySet("roxie")
        .queryID("carmigjx_govottoclusterdetails1.Ins5176579_Service_2")
        .resultName("View_IndicatorAttributes")
        .requestFields([{ id: "customer_id_", type: "number" }, { id: "industry_type_", type: "number" }, { id: "tree_uid_", type: "string" }, { id: "indicatordescription", type: "string" }, { id: "entity_context_uid_", type: "string" }, { id: "frompersonentitycontextuid", type: "string" }, { id: "topersonentitycontextuid", type: "string" }])
        .responseFields([{ id: "indicatordescription", type: "string" }, { id: "field", type: "string" }, { id: "value", type: "string" }, { id: "indicatortype", type: "string" }, { id: "label", type: "string" }, { id: "fieldtype", type: "string" }])
        .requestFieldRefs([{ source: "Graph", remoteFieldID: "entity_context_uid_", localFieldID: "entity_context_uid_" }, { source: "govottoclusterdetails1FORM", remoteFieldID: "customer_id_", localFieldID: "customer_id_" }, { source: "govottoclusterdetails1FORM", remoteFieldID: "industry_type_", localFieldID: "industry_type_" }])
        ;
    export const govottoclusterdetails1FORM = new marshaller.Form()
        .payload({ "customer_id_": "248283671", "industry_type_": "1292", "tree_uid_": "_011956742669" })
        ;
    export const govottoclusterdetails2FORM = new marshaller.Form()
        .payload({ "indicatordescription": "Cluster" })
        ;
}

namespace viz {
    export const Graph = new ChartPanel()
        .id("Graph")
        .title("Graph")
        .widget(new MyGraph()
            .zoomToFitLimit(1)
            .layout("ForceDirected2")
            .applyScaleOnLayout(false)
            .highlightOnMouseOverVertex(true))
        ;

    export const ClusterEntities = new ChartPanel()
        .id("ClusterEntities")
        .title("Cluster Entities")
        .widget(new Table())
        ;

    export const EntityStats = new ChartPanel()
        .id("EntityStats")
        .title("Entity Stats")
        .widget(new Table())
        ;

    export const RelatedIdentities = new ChartPanel()
        .id("RelatedIdentities")
        .title("Related Identities")
        .widget(new Table())
        ;

    export const AssociationDetails = new ChartPanel()
        .id("AssociationDetails")
        .title("Association Details")
        .widget(new Table())
        ;

    export const IndicatorAttributes = new ChartPanel()
        .id("IndicatorAttributes")
        .title("Indicator Attributes")
        .widget(new Table())
        ;

    export const govottoclusterdetails1FORM = new ChartPanel()
        .id("govottoclusterdetails1FORM")
        .title("Global Filter")
        .widget(new FieldForm()
            .allowEmptyRequest(true))
        ;

    export const govottoclusterdetails2FORM = new ChartPanel()
        .id("govottoclusterdetails2FORM")
        .title("Entity Stats Filter")
        .widget(new FieldForm()
            .allowEmptyRequest(true))
        ;
}

//  Dashboard Elements  (Controller) ---
const Graph = new marshaller.Element(ec)
    .id("Graph")
    .pipeline([
        data.Ins5176579_dsOutput1_View_Graph,
        new marshaller.Mappings().transformations([{ fieldID: "uid", type: "=", sourceFieldID: "entity_context_uid_", transformations: undefined }, { fieldID: "label", type: "=", sourceFieldID: "label_", transformations: undefined }, { fieldID: "icon", type: "map", sourceFieldID: "entity_type_", default: { fachar: undefined }, mappings: [{ value: "1", newValue: { charttype: "graph_Vertex", diameter: 40, faChar: "", font: "FontAwesome", icon_shape_colorFill: "#ccccff", icon_shape_colorStroke: "#ccccff" } }, { value: "9", newValue: { charttype: "graph_Vertex", faChar: "", font: "FontAwesome", icon_shape_colorFill: "navy", icon_shape_colorStroke: "navy" } }] }, { fieldID: "annotation_0", type: "map", sourceFieldID: "deceased_match_", default: {}, mappings: [{ value: "1", newValue: { charttype: "common_Icon", faChar: "", font: "FontAwesome", shape_colorFill: "darkred", shape_colorStroke: "darkred" } }] }, { fieldID: "annotation_1", type: "map", sourceFieldID: "high_frequency_flag_", default: {}, mappings: [{ value: "1", newValue: { charttype: "common_Icon", faChar: "", font: "FontAwesome", shape_colorFill: "blue", shape_colorStroke: "blue" } }] }, { fieldID: "annotation_2", type: "map", sourceFieldID: "high_risk_death_prior_to_all_events_percent_flag_", default: {}, mappings: [{ value: "1", newValue: { charttype: "common_Icon", faChar: "", font: "FontAwesome", shape_colorFill: "orange", shape_colorStroke: "orange" } }] }, { fieldID: "annotation_3", type: "map", sourceFieldID: "all_high_risk_death_prior_to_all_events_person_percent_flag_", default: {}, mappings: [{ value: "1", newValue: { charttype: "common_Icon", faChar: "", font: "FontAwesome", shape_colorFill: "red", shape_colorStroke: "red" } }] }, { fieldID: "annotation_4", type: "map", sourceFieldID: "death_prior_to_all_events_", default: {}, mappings: [{ value: "1", newValue: { charttype: "common_Icon", faChar: "", font: "FontAwesome", shape_colorFill: "red", shape_colorStroke: "red" } }] }, { fieldID: "annotation_5", type: "map", sourceFieldID: "nap3_flag_", default: {}, mappings: [{ value: "1", newValue: { charttype: "common_Icon", faChar: "", font: "FontAwesome", shape_colorFill: "red", shape_colorStroke: "red" } }] }, { fieldID: "annotation_6", type: "map", sourceFieldID: "nas9_flag_", default: {}, mappings: [{ value: "1", newValue: { charttype: "common_Icon", faChar: "", font: "FontAwesome", shape_colorFill: "red", shape_colorStroke: "red" } }] }, { fieldID: "links", type: "=", sourceFieldID: "exp1_", transformations: [{ fieldID: "uid", type: "=", sourceFieldID: "entity_context_uid_", transformations: undefined }] }])
    ])
    .chartPanel(viz.Graph)
    .on("selectionChanged", () => {
        RelatedIdentities.refresh();
        AssociationDetails.refresh();
        IndicatorAttributes.refresh();
    }, true)
    ;
ec.append(Graph);

const ClusterEntities = new marshaller.Element(ec)
    .id("ClusterEntities")
    .pipeline([
        data.Ins5176579_dsOutput1_View_Graph,
        new marshaller.Mappings().transformations([{ fieldID: "entity_context_uid_", type: "=", sourceFieldID: "entity_context_uid_", transformations: undefined }, { fieldID: "label_", type: "=", sourceFieldID: "label_", transformations: undefined }, { fieldID: "entity_type_", type: "=", sourceFieldID: "entity_type_", transformations: undefined }, { fieldID: "score_", type: "=", sourceFieldID: "score_", transformations: undefined }, { fieldID: "cluster_score_", type: "=", sourceFieldID: "cluster_score_", transformations: undefined }, { fieldID: "deceased_match_", type: "=", sourceFieldID: "deceased_match_", transformations: undefined }, { fieldID: "death_prior_to_all_events_", type: "=", sourceFieldID: "death_prior_to_all_events_", transformations: undefined }, { fieldID: "latitude_", type: "=", sourceFieldID: "latitude_", transformations: undefined }, { fieldID: "longitude_", type: "=", sourceFieldID: "longitude_", transformations: undefined }, { fieldID: "high_frequency_flag_", type: "=", sourceFieldID: "high_frequency_flag_", transformations: undefined }, { fieldID: "high_risk_death_prior_to_all_events_percent_flag_", type: "=", sourceFieldID: "high_risk_death_prior_to_all_events_percent_flag_", transformations: undefined }, { fieldID: "all_high_risk_death_prior_to_all_events_person_percent_flag_", type: "=", sourceFieldID: "all_high_risk_death_prior_to_all_events_person_percent_flag_", transformations: undefined }, { fieldID: "deceased_person_count_", type: "=", sourceFieldID: "deceased_person_count_", transformations: undefined }, { fieldID: "nas9_flag_", type: "=", sourceFieldID: "nas9_flag_", transformations: undefined }, { fieldID: "nap3_flag_", type: "=", sourceFieldID: "nap3_flag_", transformations: undefined }, { fieldID: "customer_id_", type: "=", sourceFieldID: "customer_id_", transformations: undefined }, { fieldID: "industry_type_", type: "=", sourceFieldID: "industry_type_", transformations: undefined }, { fieldID: "date_first_seen_", type: "=", sourceFieldID: "date_first_seen_", transformations: undefined }, { fieldID: "date_last_seen_", type: "=", sourceFieldID: "date_last_seen_", transformations: undefined }, { fieldID: "person_count", type: "=", sourceFieldID: "person_count_", transformations: undefined }, { fieldID: "cl_event_count_", type: "=", sourceFieldID: "cl_event_count_", transformations: undefined }, { fieldID: "cl_identity_count_", type: "=", sourceFieldID: "cl_identity_count_", transformations: undefined }, { fieldID: "cl_address_count_", type: "=", sourceFieldID: "cl_address_count_", transformations: undefined }, { fieldID: "cl_event_count_percentile_", type: "=", sourceFieldID: "cl_event_count_percentile_", transformations: undefined }, { fieldID: "cl_identity_count_percentile_", type: "=", sourceFieldID: "cl_identity_count_percentile_", transformations: undefined }, { fieldID: "cl_impact_weight_", type: "=", sourceFieldID: "cl_impact_weight_", transformations: undefined }, { fieldID: "l_high_risk_pattern1_flag_", type: "=", sourceFieldID: "cl_high_risk_pattern1_flag_", transformations: undefined }, { fieldID: "cl_high_risk_pattern2_flag_", type: "=", sourceFieldID: "cl_high_risk_pattern2_flag_", transformations: undefined }, { fieldID: "cl_high_risk_pattern3_flag_", type: "=", sourceFieldID: "cl_high_risk_pattern3_flag_", transformations: undefined }, { fieldID: "cl_high_risk_pattern4_flag_", type: "=", sourceFieldID: "cl_high_risk_pattern4_flag_", transformations: undefined }, { fieldID: "cl_high_risk_pattern5_flag_", type: "=", sourceFieldID: "cl_high_risk_pattern5_flag_", transformations: undefined }, { fieldID: "kr_high_risk_flag_", type: "=", sourceFieldID: "kr_high_risk_flag_", transformations: undefined }, { fieldID: "kr_medium_risk_flag_", type: "=", sourceFieldID: "kr_medium_risk_flag_", transformations: undefined }, { fieldID: "recordcount", type: "=", sourceFieldID: "__recordcount", transformations: undefined }, { fieldID: "street_address_", type: "=", sourceFieldID: "street_address_", transformations: undefined }, { fieldID: "vanity_city_", type: "=", sourceFieldID: "vanity_city_", transformations: undefined }, { fieldID: "state_", type: "=", sourceFieldID: "state_", transformations: undefined }, { fieldID: "zip_", type: "=", sourceFieldID: "zip_", transformations: undefined }])
    ])
    .chartPanel(viz.ClusterEntities)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(ClusterEntities);

const EntityStats = new marshaller.Element(ec)
    .id("EntityStats")
    .pipeline([
        data.Ins5176579_dsOutput1_View_EntityStats,
        new marshaller.Mappings().transformations([{ fieldID: "field", type: "=", sourceFieldID: "field", transformations: undefined }, { fieldID: "value", type: "=", sourceFieldID: "value", transformations: undefined }, { fieldID: "indicatortype", type: "=", sourceFieldID: "indicatortype", transformations: undefined }, { fieldID: "indicatordescription", type: "=", sourceFieldID: "indicatordescription", transformations: undefined }, { fieldID: "label", type: "=", sourceFieldID: "label", transformations: undefined }, { fieldID: "fieldtype", type: "=", sourceFieldID: "fieldtype", transformations: undefined }])
    ])
    .chartPanel(viz.EntityStats)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(EntityStats);

const RelatedIdentities = new marshaller.Element(ec)
    .id("RelatedIdentities")
    .pipeline([
        data.Ins5176579_dsOutput1_View_RelatedIdentities,
        new marshaller.Mappings().transformations([{ fieldID: "topersonentitycontextuid", type: "=", sourceFieldID: "topersonentitycontextuid", transformations: undefined }, { fieldID: "topersonlabel", type: "=", sourceFieldID: "topersonlabel", transformations: undefined }, { fieldID: "sameaddressemailmatch", type: "=", sourceFieldID: "sameaddressemailmatch", transformations: undefined }, { fieldID: "sameaddressssnmatch", type: "=", sourceFieldID: "sameaddressssnmatch", transformations: undefined }, { fieldID: "sameaddressphonenumbermatch", type: "=", sourceFieldID: "sameaddressphonenumbermatch", transformations: undefined }, { fieldID: "nonhighfrequencyaddresscount", type: "=", sourceFieldID: "nonhighfrequencyaddresscount", transformations: undefined }, { fieldID: "nonhighfrequencysameaddresssamedaycount", type: "=", sourceFieldID: "nonhighfrequencysameaddresssamedaycount", transformations: undefined }, { fieldID: "highfrequencysameaddresssamedaycount", type: "=", sourceFieldID: "highfrequencysameaddresssamedaycount", transformations: undefined }, { fieldID: "sharedaddresscount", type: "=", sourceFieldID: "sharedaddresscount", transformations: undefined }, { fieldID: "customer_id_", type: "=", sourceFieldID: "customer_id_", transformations: undefined }, { fieldID: "industry_type_", type: "=", sourceFieldID: "industry_type_", transformations: undefined }])
    ])
    .chartPanel(viz.RelatedIdentities)
    .on("selectionChanged", () => {
        AssociationDetails.refresh();
    }, true)
    ;
ec.append(RelatedIdentities);

const AssociationDetails = new marshaller.Element(ec)
    .id("AssociationDetails")
    .pipeline([
        data.Ins5176579_dsOutput1_View_AssociationDetails,
        new marshaller.Mappings().transformations([{ fieldID: "label", type: "=", sourceFieldID: "label", transformations: undefined }, { fieldID: "highfrequencyaddressflag", type: "=", sourceFieldID: "highfrequencyaddressflag", transformations: undefined }, { fieldID: "sameaddressemailmatch", type: "=", sourceFieldID: "sameaddressemailmatch", transformations: undefined }, { fieldID: "sameaddressssnmatch", type: "=", sourceFieldID: "sameaddressssnmatch", transformations: undefined }, { fieldID: "sameaddressphonenumbermatch", type: "=", sourceFieldID: "sameaddressphonenumbermatch", transformations: undefined }, { fieldID: "sameaddressmindistancedays", type: "=", sourceFieldID: "sameaddressmindistancedays", transformations: undefined }, { fieldID: "sameaddresssameday", type: "=", sourceFieldID: "sameaddresssameday", transformations: undefined }, { fieldID: "highfrequencysameaddresssameday", type: "=", sourceFieldID: "highfrequencysameaddresssameday", transformations: undefined }])
    ])
    .chartPanel(viz.AssociationDetails)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(AssociationDetails);

const IndicatorAttributes = new marshaller.Element(ec)
    .id("IndicatorAttributes")
    .pipeline([
        data.Ins5176579_dsOutput1_View_IndicatorAttributes,
        new marshaller.Mappings().transformations([{ fieldID: "field", type: "=", sourceFieldID: "field", transformations: undefined }, { fieldID: "value", type: "=", sourceFieldID: "value", transformations: undefined }, { fieldID: "indicatortype", type: "=", sourceFieldID: "indicatortype", transformations: undefined }, { fieldID: "indicatordescription", type: "=", sourceFieldID: "indicatordescription", transformations: undefined }, { fieldID: "label", type: "=", sourceFieldID: "label", transformations: undefined }, { fieldID: "fieldtype", type: "=", sourceFieldID: "fieldtype", transformations: undefined }])
    ])
    .chartPanel(viz.IndicatorAttributes)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(IndicatorAttributes);

const govottoclusterdetails1FORM = new marshaller.Element(ec)
    .id("govottoclusterdetails1FORM")
    .pipeline([
        data.govottoclusterdetails1FORM
    ])
    .chartPanel(viz.govottoclusterdetails1FORM)
    .on("selectionChanged", () => {
        Graph.refresh();
        ClusterEntities.refresh();
        EntityStats.refresh();
        RelatedIdentities.refresh();
        IndicatorAttributes.refresh();
    }, true)
    ;
ec.append(govottoclusterdetails1FORM);

const govottoclusterdetails2FORM = new marshaller.Element(ec)
    .id("govottoclusterdetails2FORM")
    .pipeline([
        data.govottoclusterdetails2FORM
    ])
    .chartPanel(viz.govottoclusterdetails2FORM)
    .on("selectionChanged", () => {
        EntityStats.refresh();
    }, true)
    ;
ec.append(govottoclusterdetails2FORM);

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
            .layout({ main: { type: "split-area", orientation: "vertical", children: [{ type: "tab-area", widgets: [{ __id: "Graph" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "ClusterEntities" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "EntityStats" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "RelatedIdentities" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "AssociationDetails" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "IndicatorAttributes" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "govottoclusterdetails1FORM" }, { __id: "govottoclusterdetails2FORM" }], currentIndex: 0 }], sizes: [0.3079475683429043, 0.14044457253703263, 0.1522967295172603, 0.09238061208167014, 0.11874370375332981, 0.06661668158436637, 0.12157013218343635] } })
            .hideSingleTabs(true)
            ;
    })
    ;

// @ts-ignore
const ddl = { "version": "0.0.22", "datasources": [{ "type": "hipie", "id": "Ins5176579_dsOutput1", "url": "http://10.241.100.157:8002", "querySet": "roxie", "queryID": "carmigjx_govottoclusterdetails1.Ins5176579_Service_2", "inputs": [{ "id": "customer_id_", "type": "number" }, { "id": "industry_type_", "type": "number" }, { "id": "tree_uid_", "type": "string" }, { "id": "indicatordescription", "type": "string" }, { "id": "entity_context_uid_", "type": "string" }, { "id": "frompersonentitycontextuid", "type": "string" }, { "id": "topersonentitycontextuid", "type": "string" }], "outputs": { "View_Graph": { "fields": [{ "id": "entity_context_uid_", "type": "string" }, { "id": "entity_type_", "type": "number" }, { "id": "label_", "type": "string" }, { "id": "deceased_match_", "type": "number" }, { "id": "death_prior_to_all_events_", "type": "number" }, { "id": "high_frequency_flag_", "type": "number" }, { "id": "high_risk_death_prior_to_all_events_percent_flag_", "type": "number" }, { "id": "all_high_risk_death_prior_to_all_events_person_percent_flag_", "type": "number" }, { "id": "nas9_flag_", "type": "number" }, { "id": "nap3_flag_", "type": "number" }, { "id": "exp1_", "type": "dataset", "children": [{ "id": "entity_context_uid_", "type": "string" }] }, { "id": "customer_id_", "type": "number" }, { "id": "industry_type_", "type": "number" }, { "id": "score_", "type": "number" }, { "id": "cluster_score_", "type": "number" }, { "id": "latitude_", "type": "number" }, { "id": "longitude_", "type": "number" }, { "id": "deceased_person_count_", "type": "number" }, { "id": "date_first_seen_", "type": "number" }, { "id": "date_last_seen_", "type": "number" }, { "id": "cl_event_count_", "type": "number" }, { "id": "cl_identity_count_", "type": "number" }, { "id": "cl_address_count_", "type": "number" }, { "id": "cl_event_count_percentile_", "type": "number" }, { "id": "cl_identity_count_percentile_", "type": "number" }, { "id": "cl_impact_weight_", "type": "number" }, { "id": "cl_high_risk_pattern1_flag_", "type": "number" }, { "id": "cl_high_risk_pattern2_flag_", "type": "number" }, { "id": "cl_high_risk_pattern3_flag_", "type": "number" }, { "id": "cl_high_risk_pattern4_flag_", "type": "number" }, { "id": "cl_high_risk_pattern5_flag_", "type": "number" }, { "id": "kr_high_risk_flag_", "type": "number" }, { "id": "kr_medium_risk_flag_", "type": "number" }, { "id": "person_count_", "type": "number" }, { "id": "__recordcount", "type": "number" }, { "id": "street_address_", "type": "string" }, { "id": "vanity_city_", "type": "string" }, { "id": "state_", "type": "string" }, { "id": "zip_", "type": "number" }] }, "View_EntityStats": { "fields": [{ "id": "indicatordescription", "type": "string" }, { "id": "field", "type": "string" }, { "id": "value", "type": "string" }, { "id": "indicatortype", "type": "string" }, { "id": "label", "type": "string" }, { "id": "fieldtype", "type": "string" }] }, "View_RelatedIdentities": { "fields": [{ "id": "customer_id_", "type": "number" }, { "id": "industry_type_", "type": "number" }, { "id": "topersonentitycontextuid", "type": "string" }, { "id": "sameaddressemailmatch", "type": "number" }, { "id": "sameaddressssnmatch", "type": "number" }, { "id": "sameaddressphonenumbermatch", "type": "number" }, { "id": "nonhighfrequencyaddresscount", "type": "number" }, { "id": "nonhighfrequencysameaddresssamedaycount", "type": "number" }, { "id": "highfrequencysameaddresssamedaycount", "type": "number" }, { "id": "sharedaddresscount", "type": "number" }, { "id": "topersonlabel", "type": "string" }] }, "View_AssociationDetails": { "fields": [{ "id": "label", "type": "string" }, { "id": "highfrequencyaddressflag", "type": "number" }, { "id": "sameaddressemailmatch", "type": "number" }, { "id": "sameaddressssnmatch", "type": "number" }, { "id": "sameaddressphonenumbermatch", "type": "number" }, { "id": "sameaddressmindistancedays", "type": "number" }, { "id": "sameaddresssameday", "type": "number" }, { "id": "highfrequencysameaddresssameday", "type": "number" }] }, "View_IndicatorAttributes": { "fields": [{ "id": "indicatordescription", "type": "string" }, { "id": "field", "type": "string" }, { "id": "value", "type": "string" }, { "id": "indicatortype", "type": "string" }, { "id": "label", "type": "string" }, { "id": "fieldtype", "type": "string" }] } } }, { "type": "form", "id": "govottoclusterdetails1FORM", "fields": [{ "id": "customer_id_", "type": "string", "default": "248283671" }, { "id": "industry_type_", "type": "string", "default": "1292" }, { "id": "tree_uid_", "type": "string", "default": "_011956742669" }] }, { "type": "form", "id": "govottoclusterdetails2FORM", "fields": [{ "id": "indicatordescription", "type": "string", "default": "Cluster" }] }], "dataviews": [{ "id": "Graph", "datasource": { "id": "Ins5176579_dsOutput1", "request": [{ "source": "govottoclusterdetails1FORM", "remoteFieldID": "customer_id_", "localFieldID": "customer_id_" }, { "source": "govottoclusterdetails1FORM", "remoteFieldID": "industry_type_", "localFieldID": "industry_type_" }, { "source": "govottoclusterdetails1FORM", "remoteFieldID": "tree_uid_", "localFieldID": "tree_uid_" }], "output": "View_Graph" }, "activities": [{ "type": "mappings", "transformations": [{ "fieldID": "uid", "type": "=", "sourceFieldID": "entity_context_uid_" }, { "fieldID": "label", "type": "=", "sourceFieldID": "label_" }, { "fieldID": "icon", "type": "map", "sourceFieldID": "entity_type_", "default": {}, "mappings": [{ "value": "1", "newValue": { "charttype": "graph_Vertex", "diameter": 40, "faChar": "", "font": "FontAwesome", "icon_shape_colorFill": "#ccccff", "icon_shape_colorStroke": "#ccccff" } }, { "value": "9", "newValue": { "charttype": "graph_Vertex", "faChar": "", "font": "FontAwesome", "icon_shape_colorFill": "navy", "icon_shape_colorStroke": "navy" } }] }, { "fieldID": "annotation_0", "type": "map", "sourceFieldID": "deceased_match_", "default": {}, "mappings": [{ "value": "1", "newValue": { "charttype": "common_Icon", "faChar": "", "font": "FontAwesome", "shape_colorFill": "darkred", "shape_colorStroke": "darkred" } }] }, { "fieldID": "annotation_1", "type": "map", "sourceFieldID": "high_frequency_flag_", "default": {}, "mappings": [{ "value": "1", "newValue": { "charttype": "common_Icon", "faChar": "", "font": "FontAwesome", "shape_colorFill": "blue", "shape_colorStroke": "blue" } }] }, { "fieldID": "annotation_2", "type": "map", "sourceFieldID": "high_risk_death_prior_to_all_events_percent_flag_", "default": {}, "mappings": [{ "value": "1", "newValue": { "charttype": "common_Icon", "faChar": "", "font": "FontAwesome", "shape_colorFill": "orange", "shape_colorStroke": "orange" } }] }, { "fieldID": "annotation_3", "type": "map", "sourceFieldID": "all_high_risk_death_prior_to_all_events_person_percent_flag_", "default": {}, "mappings": [{ "value": "1", "newValue": { "charttype": "common_Icon", "faChar": "", "font": "FontAwesome", "shape_colorFill": "red", "shape_colorStroke": "red" } }] }, { "fieldID": "annotation_4", "type": "map", "sourceFieldID": "death_prior_to_all_events_", "default": {}, "mappings": [{ "value": "1", "newValue": { "charttype": "common_Icon", "faChar": "", "font": "FontAwesome", "shape_colorFill": "red", "shape_colorStroke": "red" } }] }, { "fieldID": "annotation_5", "type": "map", "sourceFieldID": "nap3_flag_", "default": {}, "mappings": [{ "value": "1", "newValue": { "charttype": "common_Icon", "faChar": "", "font": "FontAwesome", "shape_colorFill": "red", "shape_colorStroke": "red" } }] }, { "fieldID": "annotation_6", "type": "map", "sourceFieldID": "nas9_flag_", "default": {}, "mappings": [{ "value": "1", "newValue": { "charttype": "common_Icon", "faChar": "", "font": "FontAwesome", "shape_colorFill": "red", "shape_colorStroke": "red" } }] }, { "fieldID": "links", "type": "=", "sourceFieldID": "exp1_", "transformations": [{ "fieldID": "uid", "type": "=", "sourceFieldID": "entity_context_uid_" }] }] }], "visualization": { "id": "Graph", "title": "Graph", "description": "", "chartType": "ADJACENCY_GRAPH", "moduleName": "@hpcc-js/graph", "className": "AdjacencyGraph", "properties": { "zoomToFitLimit": 1, "layout": "ForceDirected2", "applyScaleOnLayout": false, "highlightOnMouseOverVertex": true } } }, { "id": "ClusterEntities", "datasource": { "id": "Ins5176579_dsOutput1", "request": [{ "source": "govottoclusterdetails1FORM", "remoteFieldID": "customer_id_", "localFieldID": "customer_id_" }, { "source": "govottoclusterdetails1FORM", "remoteFieldID": "industry_type_", "localFieldID": "industry_type_" }, { "source": "govottoclusterdetails1FORM", "remoteFieldID": "tree_uid_", "localFieldID": "tree_uid_" }], "output": "View_Graph" }, "activities": [{ "type": "mappings", "transformations": [{ "fieldID": "entity_context_uid_", "type": "=", "sourceFieldID": "entity_context_uid_" }, { "fieldID": "label_", "type": "=", "sourceFieldID": "label_" }, { "fieldID": "entity_type_", "type": "=", "sourceFieldID": "entity_type_" }, { "fieldID": "score_", "type": "=", "sourceFieldID": "score_" }, { "fieldID": "cluster_score_", "type": "=", "sourceFieldID": "cluster_score_" }, { "fieldID": "deceased_match_", "type": "=", "sourceFieldID": "deceased_match_" }, { "fieldID": "death_prior_to_all_events_", "type": "=", "sourceFieldID": "death_prior_to_all_events_" }, { "fieldID": "latitude_", "type": "=", "sourceFieldID": "latitude_" }, { "fieldID": "longitude_", "type": "=", "sourceFieldID": "longitude_" }, { "fieldID": "high_frequency_flag_", "type": "=", "sourceFieldID": "high_frequency_flag_" }, { "fieldID": "high_risk_death_prior_to_all_events_percent_flag_", "type": "=", "sourceFieldID": "high_risk_death_prior_to_all_events_percent_flag_" }, { "fieldID": "all_high_risk_death_prior_to_all_events_person_percent_flag_", "type": "=", "sourceFieldID": "all_high_risk_death_prior_to_all_events_person_percent_flag_" }, { "fieldID": "deceased_person_count_", "type": "=", "sourceFieldID": "deceased_person_count_" }, { "fieldID": "nas9_flag_", "type": "=", "sourceFieldID": "nas9_flag_" }, { "fieldID": "nap3_flag_", "type": "=", "sourceFieldID": "nap3_flag_" }, { "fieldID": "customer_id_", "type": "=", "sourceFieldID": "customer_id_" }, { "fieldID": "industry_type_", "type": "=", "sourceFieldID": "industry_type_" }, { "fieldID": "date_first_seen_", "type": "=", "sourceFieldID": "date_first_seen_" }, { "fieldID": "date_last_seen_", "type": "=", "sourceFieldID": "date_last_seen_" }, { "fieldID": "person_count", "type": "=", "sourceFieldID": "person_count_" }, { "fieldID": "cl_event_count_", "type": "=", "sourceFieldID": "cl_event_count_" }, { "fieldID": "cl_identity_count_", "type": "=", "sourceFieldID": "cl_identity_count_" }, { "fieldID": "cl_address_count_", "type": "=", "sourceFieldID": "cl_address_count_" }, { "fieldID": "cl_event_count_percentile_", "type": "=", "sourceFieldID": "cl_event_count_percentile_" }, { "fieldID": "cl_identity_count_percentile_", "type": "=", "sourceFieldID": "cl_identity_count_percentile_" }, { "fieldID": "cl_impact_weight_", "type": "=", "sourceFieldID": "cl_impact_weight_" }, { "fieldID": "l_high_risk_pattern1_flag_", "type": "=", "sourceFieldID": "cl_high_risk_pattern1_flag_" }, { "fieldID": "cl_high_risk_pattern2_flag_", "type": "=", "sourceFieldID": "cl_high_risk_pattern2_flag_" }, { "fieldID": "cl_high_risk_pattern3_flag_", "type": "=", "sourceFieldID": "cl_high_risk_pattern3_flag_" }, { "fieldID": "cl_high_risk_pattern4_flag_", "type": "=", "sourceFieldID": "cl_high_risk_pattern4_flag_" }, { "fieldID": "cl_high_risk_pattern5_flag_", "type": "=", "sourceFieldID": "cl_high_risk_pattern5_flag_" }, { "fieldID": "kr_high_risk_flag_", "type": "=", "sourceFieldID": "kr_high_risk_flag_" }, { "fieldID": "kr_medium_risk_flag_", "type": "=", "sourceFieldID": "kr_medium_risk_flag_" }, { "fieldID": "recordcount", "type": "=", "sourceFieldID": "__recordcount" }, { "fieldID": "street_address_", "type": "=", "sourceFieldID": "street_address_" }, { "fieldID": "vanity_city_", "type": "=", "sourceFieldID": "vanity_city_" }, { "fieldID": "state_", "type": "=", "sourceFieldID": "state_" }, { "fieldID": "zip_", "type": "=", "sourceFieldID": "zip_" }] }], "visualization": { "id": "ClusterEntities", "title": "Cluster Entities", "description": "", "chartType": "TABLE", "moduleName": "@hpcc-js/dgrid", "className": "Table", "properties": {} } }, { "id": "EntityStats", "datasource": { "id": "Ins5176579_dsOutput1", "request": [{ "source": "govottoclusterdetails1FORM", "remoteFieldID": "customer_id_", "localFieldID": "customer_id_" }, { "source": "govottoclusterdetails1FORM", "remoteFieldID": "industry_type_", "localFieldID": "industry_type_" }, { "source": "govottoclusterdetails1FORM", "remoteFieldID": "tree_uid_", "localFieldID": "entity_context_uid_" }, { "source": "govottoclusterdetails2FORM", "remoteFieldID": "indicatordescription", "localFieldID": "indicatordescription" }], "output": "View_EntityStats" }, "activities": [{ "type": "mappings", "transformations": [{ "fieldID": "field", "type": "=", "sourceFieldID": "field" }, { "fieldID": "value", "type": "=", "sourceFieldID": "value" }, { "fieldID": "indicatortype", "type": "=", "sourceFieldID": "indicatortype" }, { "fieldID": "indicatordescription", "type": "=", "sourceFieldID": "indicatordescription" }, { "fieldID": "label", "type": "=", "sourceFieldID": "label" }, { "fieldID": "fieldtype", "type": "=", "sourceFieldID": "fieldtype" }] }], "visualization": { "id": "EntityStats", "title": "Entity Stats", "description": "", "chartType": "TABLE", "moduleName": "@hpcc-js/dgrid", "className": "Table", "properties": {} } }, { "id": "RelatedIdentities", "datasource": { "id": "Ins5176579_dsOutput1", "request": [{ "source": "Graph", "remoteFieldID": "entity_context_uid_", "localFieldID": "frompersonentitycontextuid" }, { "source": "govottoclusterdetails1FORM", "remoteFieldID": "customer_id_", "localFieldID": "customer_id_" }, { "source": "govottoclusterdetails1FORM", "remoteFieldID": "industry_type_", "localFieldID": "industry_type_" }], "output": "View_RelatedIdentities" }, "activities": [{ "type": "mappings", "transformations": [{ "fieldID": "topersonentitycontextuid", "type": "=", "sourceFieldID": "topersonentitycontextuid" }, { "fieldID": "topersonlabel", "type": "=", "sourceFieldID": "topersonlabel" }, { "fieldID": "sameaddressemailmatch", "type": "=", "sourceFieldID": "sameaddressemailmatch" }, { "fieldID": "sameaddressssnmatch", "type": "=", "sourceFieldID": "sameaddressssnmatch" }, { "fieldID": "sameaddressphonenumbermatch", "type": "=", "sourceFieldID": "sameaddressphonenumbermatch" }, { "fieldID": "nonhighfrequencyaddresscount", "type": "=", "sourceFieldID": "nonhighfrequencyaddresscount" }, { "fieldID": "nonhighfrequencysameaddresssamedaycount", "type": "=", "sourceFieldID": "nonhighfrequencysameaddresssamedaycount" }, { "fieldID": "highfrequencysameaddresssamedaycount", "type": "=", "sourceFieldID": "highfrequencysameaddresssamedaycount" }, { "fieldID": "sharedaddresscount", "type": "=", "sourceFieldID": "sharedaddresscount" }, { "fieldID": "customer_id_", "type": "=", "sourceFieldID": "customer_id_" }, { "fieldID": "industry_type_", "type": "=", "sourceFieldID": "industry_type_" }] }], "visualization": { "id": "RelatedIdentities", "title": "Related Identities", "description": "", "chartType": "TABLE", "moduleName": "@hpcc-js/dgrid", "className": "Table", "properties": {} } }, { "id": "AssociationDetails", "datasource": { "id": "Ins5176579_dsOutput1", "request": [{ "source": "Graph", "remoteFieldID": "entity_context_uid_", "localFieldID": "frompersonentitycontextuid" }, { "source": "RelatedIdentities", "remoteFieldID": "topersonentitycontextuid", "localFieldID": "topersonentitycontextuid" }], "output": "View_AssociationDetails" }, "activities": [{ "type": "mappings", "transformations": [{ "fieldID": "label", "type": "=", "sourceFieldID": "label" }, { "fieldID": "highfrequencyaddressflag", "type": "=", "sourceFieldID": "highfrequencyaddressflag" }, { "fieldID": "sameaddressemailmatch", "type": "=", "sourceFieldID": "sameaddressemailmatch" }, { "fieldID": "sameaddressssnmatch", "type": "=", "sourceFieldID": "sameaddressssnmatch" }, { "fieldID": "sameaddressphonenumbermatch", "type": "=", "sourceFieldID": "sameaddressphonenumbermatch" }, { "fieldID": "sameaddressmindistancedays", "type": "=", "sourceFieldID": "sameaddressmindistancedays" }, { "fieldID": "sameaddresssameday", "type": "=", "sourceFieldID": "sameaddresssameday" }, { "fieldID": "highfrequencysameaddresssameday", "type": "=", "sourceFieldID": "highfrequencysameaddresssameday" }] }], "visualization": { "id": "AssociationDetails", "title": "Association Details", "description": "", "chartType": "TABLE", "moduleName": "@hpcc-js/dgrid", "className": "Table", "properties": {} } }, { "id": "IndicatorAttributes", "datasource": { "id": "Ins5176579_dsOutput1", "request": [{ "source": "Graph", "remoteFieldID": "entity_context_uid_", "localFieldID": "entity_context_uid_" }, { "source": "govottoclusterdetails1FORM", "remoteFieldID": "customer_id_", "localFieldID": "customer_id_" }, { "source": "govottoclusterdetails1FORM", "remoteFieldID": "industry_type_", "localFieldID": "industry_type_" }], "output": "View_IndicatorAttributes" }, "activities": [{ "type": "mappings", "transformations": [{ "fieldID": "field", "type": "=", "sourceFieldID": "field" }, { "fieldID": "value", "type": "=", "sourceFieldID": "value" }, { "fieldID": "indicatortype", "type": "=", "sourceFieldID": "indicatortype" }, { "fieldID": "indicatordescription", "type": "=", "sourceFieldID": "indicatordescription" }, { "fieldID": "label", "type": "=", "sourceFieldID": "label" }, { "fieldID": "fieldtype", "type": "=", "sourceFieldID": "fieldtype" }] }], "visualization": { "id": "IndicatorAttributes", "title": "Indicator Attributes", "description": "", "chartType": "TABLE", "moduleName": "@hpcc-js/dgrid", "className": "Table", "properties": {} } }, { "id": "govottoclusterdetails1FORM", "datasource": { "id": "govottoclusterdetails1FORM" }, "activities": [], "visualization": { "id": "govottoclusterdetails1FORM", "title": "Global Filter", "description": "", "chartType": "FORM", "moduleName": "@hpcc-js/form", "className": "FieldForm", "properties": { "allowEmptyRequest": true } } }, { "id": "govottoclusterdetails2FORM", "datasource": { "id": "govottoclusterdetails2FORM" }, "activities": [], "visualization": { "id": "govottoclusterdetails2FORM", "title": "Entity Stats Filter", "description": "", "chartType": "FORM", "moduleName": "@hpcc-js/form", "className": "FieldForm", "properties": { "allowEmptyRequest": true } } }] };
