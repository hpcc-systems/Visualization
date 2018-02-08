// tslint:disable

import { Line, Summary } from "@hpcc-js/chart";
import { CalendarHeatMap } from "@hpcc-js/other";
import { GMapPin } from "@hpcc-js/map";
import { FieldForm } from "@hpcc-js/form";
import { ChartPanel } from "@hpcc-js/layout";
// @ts-ignore:  Activities may not be read
import { Dashboard, Databomb, Element, ElementContainer, Filters, Form, GroupBy, HipieRequest, Limit, LogicalFile, Project, RoxieRequest, Sort, WUResult } from "@hpcc-js/marshaller";

//  Dashboard Element Container (Model)  ---
const ec = new ElementContainer();

//  Data Sources  ---
const ds_Ins109_dsOutput1_View_CustomerIdentityStats = new HipieRequest(ec)
    .url("http://10.241.100.159:8010")
    .querySet("roxie")
    .queryID("prichajx_govottocustomerstats.Ins109_Service_1")
    .resultName("View_CustomerIdentityStats")
    .requestFields([{ source: "govottocustomerstatsFORM", remoteFieldID: "customer_id_", localFieldID: "customer_id_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "industry_type_", localFieldID: "industry_type_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "source_customer_", localFieldID: "source_customer_" }])
    ;
const ds_Ins109_dsOutput2_View_AddressIdentityCountDistribution = new HipieRequest(ec)
    .url("http://10.241.100.159:8010")
    .querySet("roxie")
    .queryID("prichajx_govottocustomerstats.Ins109_Service_1")
    .resultName("View_AddressIdentityCountDistribution")
    .requestFields([{ source: "govottocustomerstatsFORM", remoteFieldID: "customer_id_", localFieldID: "customer_id_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "industry_type_", localFieldID: "industry_type_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "source_customer_", localFieldID: "source_customer_" }])
    ;
const ds_Ins109_dsOutput3_View_CalendarHeatmap = new HipieRequest(ec)
    .url("http://10.241.100.159:8010")
    .querySet("roxie")
    .queryID("prichajx_govottocustomerstats.Ins109_Service_1")
    .resultName("View_CalendarHeatmap")
    .requestFields([{ source: "govottocustomerstatsFORM", remoteFieldID: "customer_id_", localFieldID: "customer_id_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "industry_type_", localFieldID: "industry_type_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "source_customer_", localFieldID: "source_customer_" }])
    ;
const ds_Ins109_dsOutput3_View_EventTrend = new HipieRequest(ec)
    .url("http://10.241.100.159:8010")
    .querySet("roxie")
    .queryID("prichajx_govottocustomerstats.Ins109_Service_1")
    .resultName("View_EventTrend")
    .requestFields([{ source: "govottocustomerstatsFORM", remoteFieldID: "customer_id_", localFieldID: "customer_id_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "industry_type_", localFieldID: "industry_type_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "source_customer_", localFieldID: "source_customer_" }])
    ;
const ds_Ins109_dsOutput4_View_TopLocations = new HipieRequest(ec)
    .url("http://10.241.100.159:8010")
    .querySet("roxie")
    .queryID("prichajx_govottocustomerstats.Ins109_Service_1")
    .resultName("View_TopLocations")
    .requestFields([{ source: "EventTrend", remoteFieldID: "event_year_month_", localFieldID: "event_year_month_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "customer_id_", localFieldID: "customer_id_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "industry_type_", localFieldID: "industry_type_" }, { source: "govottocustomerstatsFORM", remoteFieldID: "source_customer_", localFieldID: "source_customer_" }])
    ;
const ds_govottocustomerstatsFORM = new Form()
    .payload({ "customer_id_": "247949891", "industry_type_": "0", "source_customer_": "272" })
    ;

//  Visualization Widgets (View) ---
const cp_CustomerIdentityStats = new ChartPanel()
    .id("CustomerIdentityStats")
    .title("Customer Identity Stats")
    .widget(new Summary()
        .iconColumn("icon")
        .valueColumn("summaryvalue")
        .moreIconColumn("moreicon")
        .moreTextColumn("moredescription")
        .fixedSize(false)
        .playInterval(3000)
    )
    ;

const cp_AddressIdentityCountDistribution = new ChartPanel()
    .id("AddressIdentityCountDistribution")
    .title("Address Identity Count Distribution")
    .widget(new Line()
        .xAxisType("linear")
        .xAxisDomainHigh("600")
        .yAxisType("pow")
        .yAxisTypePowExponent(0.3)
        .pointShape("rectangle")
        .pointSize(4)
    )
    ;

const cp_CalendarHeatmap = new ChartPanel()
    .id("CalendarHeatmap")
    .title("Calendar Heatmap")
    .widget(new CalendarHeatMap()
        .dateColumn("event_date_")
        .datePattern("%Y%m%d")
        .aggrType("sum")
        .aggrColumn("rowcount")
    )
    ;

const cp_EventTrend = new ChartPanel()
    .id("EventTrend")
    .title("Event Trend")
    .widget(new Line()
        .xAxisType("time")
        .xAxisTypeTimePattern("%Y%m")
        .interpolate("catmullRom")
        .interpolateFill(true)
    )
    ;

const cp_TopLocations = new ChartPanel()
    .id("TopLocations")
    .title("Top Locations")
    .widget(new GMapPin()
        .centerLat(27.817652450092126)
        .centerLong(-83.67903000000001)
        .zoom(6)
        .streetViewOnClick(true)
        .autoScale(true)
        .pinColor("#ff8080")
        .pinType("circle")
        .pinRadius(2.5)
        .omitNullLatLong(true)
        .latitudeColumn("latitude_")
        .longtitudeColumn("longitude_")
        .tooltipColumn("full_address_")
    )
    ;

const cp_govottocustomerstatsFORM = new ChartPanel()
    .id("govottocustomerstatsFORM")
    .title("GOV-Otto-CustomerStats Filter")
    .widget(new FieldForm())
    ;

//  Dashboard Elements  (Controller) ---
const elem_CustomerIdentityStats = new Element(ec)
    .id("CustomerIdentityStats")
    .pipeline([
        ds_Ins109_dsOutput1_View_CustomerIdentityStats,
        new Project(true).trim(true).transformations([{ fieldID: "description", type: "=", param1: "description", param2: undefined }, { fieldID: "summaryvalue", type: "=", param1: "summaryvalue", param2: undefined }, { fieldID: "icon", type: "=", param1: "icon", param2: undefined }, { fieldID: "moredescription", type: "=", param1: "moredescription", param2: undefined }, { fieldID: "moreicon", type: "=", param1: "moreicon", param2: undefined }])
    ])
    .chartPanel(cp_CustomerIdentityStats)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(elem_CustomerIdentityStats);

const elem_AddressIdentityCountDistribution = new Element(ec)
    .id("AddressIdentityCountDistribution")
    .pipeline([
        ds_Ins109_dsOutput2_View_AddressIdentityCountDistribution,
        new Sort().conditions([{ fieldID: "person_count_", descending: false }]),
        new Project(true).trim(true).transformations([{ fieldID: "Person Count", type: "=", param1: "person_count_", param2: undefined }, { fieldID: "## People", type: "=", param1: "base_count", param2: undefined }])
    ])
    .chartPanel(cp_AddressIdentityCountDistribution)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(elem_AddressIdentityCountDistribution);

const elem_CalendarHeatmap = new Element(ec)
    .id("CalendarHeatmap")
    .pipeline([
        ds_Ins109_dsOutput3_View_CalendarHeatmap,
        new Sort().conditions([{ fieldID: "event_date_", descending: false }]),
        new Project(true).trim(true).transformations([{ fieldID: "event_date_", type: "=", param1: "event_date_", param2: undefined }, { fieldID: "rowcount", type: "=", param1: "base_count", param2: undefined }])
    ])
    .chartPanel(cp_CalendarHeatmap)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(elem_CalendarHeatmap);

const elem_EventTrend = new Element(ec)
    .id("EventTrend")
    .pipeline([
        ds_Ins109_dsOutput3_View_EventTrend,
        new Sort().conditions([{ fieldID: "event_year_month_", descending: false }]),
        new Project(true).trim(true).transformations([{ fieldID: "Year Month", type: "=", param1: "event_year_month_", param2: undefined }, { fieldID: "Address Count", type: "=", param1: "base_count", param2: undefined }])
    ])
    .chartPanel(cp_EventTrend)
    .on("selectionChanged", () => {
        elem_TopLocations.refresh();
    }, true)
    ;
ec.append(elem_EventTrend);

const elem_TopLocations = new Element(ec)
    .id("TopLocations")
    .pipeline([
        ds_Ins109_dsOutput4_View_TopLocations,
        new Sort().conditions([{ fieldID: "base_count", descending: true }]),
        new Limit().rows(200),
        new Project(true).trim(true).transformations([{ fieldID: "lat_long_id_", type: "=", param1: "lat_long_id_", param2: undefined }, { fieldID: "latitude_", type: "=", param1: "latitude_", param2: undefined }, { fieldID: "longitude_", type: "=", param1: "longitude_", param2: undefined }, { fieldID: "full_address_", type: "=", param1: "full_address_", param2: undefined }, { fieldID: "rowcount", type: "=", param1: "base_count", param2: undefined }])
    ])
    .chartPanel(cp_TopLocations)
    .on("selectionChanged", () => {

    }, true)
    ;
ec.append(elem_TopLocations);

const elem_govottocustomerstatsFORM = new Element(ec)
    .id("govottocustomerstatsFORM")
    .pipeline([
        ds_govottocustomerstatsFORM
    ])
    .chartPanel(cp_govottocustomerstatsFORM)
    .on("selectionChanged", () => {
        elem_CustomerIdentityStats.refresh();
        elem_AddressIdentityCountDistribution.refresh();
        elem_CalendarHeatmap.refresh();
        elem_EventTrend.refresh();
        elem_TopLocations.refresh();
    }, true)
    ;
ec.append(elem_govottocustomerstatsFORM);

ec.refresh();

//  Dashboard (optional) ---
export const dashboard = new Dashboard(ec)
    .target("placeholder")
    .render(w => {
        (w as Dashboard).layout({ main: { type: "split-area", orientation: "vertical", children: [{ type: "split-area", orientation: "horizontal", children: [{ type: "tab-area", widgets: [{ __id: "govottocustomerstatsFORM" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "CustomerIdentityStats" }], currentIndex: 0 }], sizes: [0.5, 0.5] }, { type: "split-area", orientation: "horizontal", children: [{ type: "tab-area", widgets: [{ __id: "CalendarHeatmap" }], currentIndex: 0 }, { type: "split-area", orientation: "vertical", children: [{ type: "tab-area", widgets: [{ __id: "AddressIdentityCountDistribution" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "EventTrend" }], currentIndex: 0 }], sizes: [0.5, 0.5] }], sizes: [0.5, 0.5] }, { type: "tab-area", widgets: [{ __id: "TopLocations" }], currentIndex: 0 }], sizes: [0.3293000775647055, 0.3279209829106161, 0.34277893952467847] } });
    })
    ;
