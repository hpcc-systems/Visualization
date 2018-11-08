import { Bar, Column, Step } from "@hpcc-js/chart";
import { FlexGrid } from "@hpcc-js/layout";

const columns = ["Category", "Value-1", "Value-2"];
const data = [
    ["A", 34, 21],
    ["B", 55, 34],
    ["C", 54, 90],
    ["D", 80, 153],
    ["E", 86, 92],
    ["F", 144, 233]
];

new FlexGrid()
    .target("target")
    .itemMinHeight(50)
    .itemMinWidth(111)
    .flexBasis("38%")
    .widgetsFlexGrow([1,9,1])
    .widgets([
        new Bar().columns(columns).data(data),
        new Column().columns(columns).data(data),
        new Step().columns(columns).data(data)
    ])
    .render()
    ;