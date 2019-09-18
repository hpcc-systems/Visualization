# QuarterPie

<!--meta
{
    "id": 10988,
    "name": "QuarterPie",
    "kind": 128,
    "kindString": "Class",
    "flags": {
        "isExported": true
    },
    "sources": [
        {
            "fileName": "QuarterPie.ts",
            "line": 3,
            "character": 23
        },
        {
            "fileName": "QuarterPie.ts",
            "line": 31,
            "character": 27
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

[Pie](./Pie.md), [HalfPie](./HalfPie.md) and QuarterPie are effectively the same class, but have different starting and ending angles. They support all of the same properties.
```sample-code
import { QuarterPie } from "@hpcc-js/chart";

new QuarterPie()
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
import { QuarterPie } from "@hpcc-js/chart";

new QuarterPie()
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
```@hpcc-js/chart:QuarterPie
```
