import { Bar, Column, Step } from "@hpcc-js/chart";
import { Grid } from "@hpcc-js/layout";

const columns = ["Category", "Value-1", "Value-2"];
const data = [
    ["A", 34, 21],
    ["B", 55, 34],
    ["C", 54, 90],
    ["D", 80, 153],
    ["E", 86, 92],
    ["F", 144, 233]
];

const grid = new Grid()
    .setContent(0, 0, new Bar().columns(columns).data(data))
    .setContent(1, 0, new Column().columns(columns).data(data))
    .setContent(0, 1, new Step().columns(columns).data(data))
    .target("target")
    .render()
    ;
