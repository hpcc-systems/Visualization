import "@hpcc-js/wc-layout";

import { chain, filter, group, map, sort } from "@hpcc-js/dataflow";
import { ChartPanel } from "@hpcc-js/layout";
import { Line, Pie } from "@hpcc-js/chart";
import { Table } from "@hpcc-js/dgrid2";
import * as db from "./db";

const idx = {};
db.columns.forEach((col, i) => idx[col] = i);

const stateColumn = idx["State"];
const stateChain = chain(
    group(row => row[stateColumn]),
    map(row => [row.key, row.value.length] as [string, number]),
    sort((l, r) => r[1] - l[1])
);

const typeColumn = idx["Type of Breach"];
const typeChain = chain(
    group(row => row[typeColumn]),
    map(row => [row.key, row.value.length] as [string, number]),
    sort((l, r) => r[1] - l[1])
);

const yearColumn = idx["Submission Year"];
const yearChain = chain(
    group(row => row[yearColumn]),
    map(row => [row.key, row.value.length] as [string, number]),
    sort((l, r) => r[1] - l[1])
);

let stateSel;
let typeSel;
let yearSel;

const submissionColumn = idx["Submission Date"];
const individualsColumn = idx["Individuals Affected"];
const lineChain = chain(
    filter(row => {
        return (stateSel === undefined || row[stateColumn] === stateSel["State"]) &&
            (typeSel === undefined || row[typeColumn] === typeSel["Type of Breach"]) &&
            (yearSel === undefined || row[yearColumn] === yearSel["Submission Year"]);
    }),
    group(row => row[submissionColumn]),
    map(row => [row.key, row.value.reduce((previousValue, row) => {
        return previousValue + +row[individualsColumn];
    }, 0)] as [string, number]),
    sort((l, r) => l[0].localeCompare(r[0]))
);

const stateTable = new Table()
    .target("placeholder1")
    .columns([db.columns[stateColumn], "Count"])
    .data([...stateChain(db.data)])
    .on("click", (row, col, sel) => {
        if (sel) {
            stateSel = row;
            refreshLineChart();
        }
    })
    ;

const typeTable = new Table()
    .target("placeholder2")
    .columns([db.columns[typeColumn], "Count"])
    .data([...typeChain(db.data)])
    .on("click", (row, col, sel) => {
        if (sel) {
            typeSel = row;
            refreshLineChart();
        }
    })
    ;

const yearPie = new Pie()
    .target("placeholder3")
    .columns([db.columns[yearColumn], "Count"])
    .data([...yearChain(db.data)])
    .on("click", (row, col, sel) => {
        if (sel) {
            yearSel = row;
            refreshLineChart();
        }
    })
    ;

const lineChart = new ChartPanel()
    .target("placeholder4")
    .widget(new Line()
        .xAxisType("time")
        .xAxisTypeTimePattern("%Y-%m-%dT%H:%M:%S.%LZ")
        .xAxisTickFormat("%b %d")
        .yAxisTickFormat(",.0f")
    )
    .columns(["Submission Date", "Individuals Affected"])
    .data([...lineChain(db.data)])
    .on("click", () => {
    })
    ;

function refreshLineChart() {
    lineChart
        .data([...lineChain(db.data)])
        .lazyRender()
        ;
}

//  Resize  ---
globalThis["doResize"] = function () {
    stateTable.resize().lazyRender();
    typeTable.resize().lazyRender();
    yearPie.resize().lazyRender();
    lineChart.resize().lazyRender();
};

document.getElementsByTagName("hpcc-splitpanel")[0]?.addEventListener("update-request", () => {
    globalThis["doResize"]();
});

//  TODO:  Should not be needed - may need to add a gobal event to Web Components
setTimeout(() => {
    globalThis["doResize"]();
}, 100);
