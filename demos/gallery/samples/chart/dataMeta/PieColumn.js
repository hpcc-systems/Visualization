import { Column, Pie } from "@hpcc-js/chart";
import { FlexGrid } from "@hpcc-js/layout";

const columns = ["Category", "Value"];
const data = [
    ["A", 34],
    ["B", 55],
    ["C", 54],
    ["D", 80],
    ["E", 86],
    ["F", 144]
];
const pie = new Pie()
    .columns(columns)
    .data(data)
    .showSeriesPercentage(true)
    .dataMeta({sum: 1000})
    ;
const column = new Column()
    .columns(columns)
    .data(data)
    .showValue(true)
    .showValueAsPercent("series")
    .dataMeta({sum: 1000})
    ;
new FlexGrid()
    .target("target")
    .widgets([
        pie,
        column
    ])
    .render()
    ;