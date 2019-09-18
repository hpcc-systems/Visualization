# Pie

<!--meta
{
    "id": 8247,
    "name": "Pie",
    "kind": 128,
    "kindString": "Class",
    "flags": {
        "isExported": true
    },
    "sources": [
        {
            "fileName": "Pie.ts",
            "line": 11,
            "character": 16
        },
        {
            "fileName": "Pie.ts",
            "line": 427,
            "character": 20
        }
    ],
    "extendedTypes": [
        {
            "type": "reference",
            "name": "SVGWidget"
        }
    ],
    "extendedBy": [
        {
            "type": "reference",
            "name": "HalfPie",
            "id": 8854
        },
        {
            "type": "reference",
            "name": "QuarterPie",
            "id": 10988
        }
    ],
    "folder": "packages/chart"
}
-->

A circular statistical graphic, which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice, is proportional to the quantity it represents. (See also: [HalfPie](./HalfPie.md) and [QuarterPie](./QuarterPie.md) )
```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 144]
    ])
    .target("target")
    .render()
    ;
```
In the below example the 'showSeriesValue' is used to display the value next to each slice label.
```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 144]
    ])
    .target("target")
    .showSeriesValue(true)
    .render()
    ;
```
In the below example the 'innerRadius' is used to transform the pie chart into a donut chart.
'showSeriesPercentage' displays the percentage next to each slice label.
```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 144]
    ])
    .target("target")
    .innerRadius(62)
    .showSeriesPercentage(true)
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:Pie
```
