# HalfPie

<!--meta
{
    "id": 8854,
    "name": "HalfPie",
    "kind": 128,
    "kindString": "Class",
    "flags": {
        "isExported": true
    },
    "sources": [
        {
            "fileName": "HalfPie.ts",
            "line": 3,
            "character": 20
        }
    ],
    "extendedTypes": [
        {
            "type": "reference",
            "name": "Pie",
            "id": 8247
        }
    ],
    "folder": "packages/chart"
}
-->

[Pie](./Pie.md), HalfPie and [QuarterPie](./QuarterPie.md) are effectively the same class, but have different starting and ending angles. They support all of the same properties.
```sample-code
import { HalfPie } from "@hpcc-js/chart";

new HalfPie()
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
```sample-code
import { HalfPie } from "@hpcc-js/chart";

new HalfPie()
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
    .showSeriesValue(true)
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:HalfPie
```
