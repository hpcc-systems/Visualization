// tslint:disable

import { Column } from "@hpcc-js/chart";
import { Select } from "@hpcc-js/other";
import { Table } from "@hpcc-js/dgrid";
import { Graph } from "@hpcc-js/graph";
import { ChartPanel } from "@hpcc-js/layout";
import { Dashboard, Databomb, Element, ElementContainer, Filters, Form, GroupBy, HipieRequest, Limit, LogicalFile, Project, RoxieRequest, Sort, WUResult } from "@hpcc-js/marshaller";

//  Dashboard Element Container (Model)  ---
const ec = new ElementContainer();
ec.refresh();

//  Dashboard (optional) ---
export const dashboard = new Dashboard(ec)
    .target("placeholder")
    .render(w => {
        (w as Dashboard).layout({ main: { type: "split-area", orientation: "vertical", children: [{ type: "split-area", orientation: "horizontal", children: [{ type: "tab-area", widgets: [{ __id: "SanctionTotal" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "SanctionType" }], currentIndex: 0 }], sizes: [0.5, 0.5] }, { type: "tab-area", widgets: [{ __id: "Search" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "Graph" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "SanctionDisplay" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "Officers" }], currentIndex: 0 }, { type: "split-area", orientation: "horizontal", children: [{ type: "tab-area", widgets: [{ __id: "Businesses" }], currentIndex: 0 }, { type: "tab-area", widgets: [{ __id: "Legend" }], currentIndex: 0 }], sizes: [0.5871323584894583, 0.4128676415105417] }], sizes: [0.27109043904262947, 0.20892457167307538, 0.08932486176490784, 0.15380904078483582, 0.0859375, 0.1909135867345515] } });
    })
    ;
