# Area

<!--meta
{
    "id": 2361,
    "name": "Area",
    "kind": 128,
    "kindString": "Class",
    "flags": {
        "isExported": true
    },
    "sources": [
        {
            "fileName": "Area.ts",
            "line": 3,
            "character": 17
        }
    ],
    "extendedTypes": [
        {
            "type": "reference",
            "name": "Scatter",
            "id": 1462
        }
    ],
    "folder": "packages/chart"
}
-->

An area chart represents the change in one or more series over a continuous or discrete axis. Data points are plotted and then connected by line segments to show the value of a quantity at several different intervals.
```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
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
Two or more series are commonly compared with an area chart.
```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
    .columns(["Category", "Value 1", "Value 2"])
    .data([
        ["A", 34, 90],
        ["B", 55, 50],
        ["C", 89, 75],
        ["D", 144, 66]
    ])
    .target("target")
    .showValue(true)
    .render()
    ;
```
An area chart supports n-number of numeric values per data row. A series is created for each column as needed. 
```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
    .columns(["Category", "Value 1", "Value 2", "Value 3"])
    .data([
        ["A", 34, 90, 82],
        ["B", 55, 50, 65],
        ["C", 89, 75, 43],
        ["D", 144, 66, 56]
    ])
    .target("target")
    .render()
    ;
```
For documentation on axis-specific properties, like those used in the below example, take a look at the [Axis Documentation](./XYAxis.md)</a>.
```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
    .columns(["Value 1", "Value 2"])
    .data([
        [144, 90],
        [89, 50],
        [55, 75],
        [34, 66]
    ])
    .target("target")
    .xAxisType("linear")
    .xAxisTitle("X-Axis Title")
    .yAxisTitle("Y-Axis Title")
    .xAxisTickCount(30)
    .xAxisOverlapMode("rotate")
    .xAxisLabelRotation(90)
    .pointShape("circle")
    .render()
    ;
```

## API

<!--meta:Area.target
{
    "id": 2658,
    "name": "target",
    "kind": 2048,
    "kindString": "Method",
    "flags": {
        "isExported": true
    },
    "signatures": [
        {
            "id": 2659,
            "name": "target",
            "kind": 4096,
            "kindString": "Call signature",
            "flags": {},
            "type": {
                "type": "union",
                "types": [
                    {
                        "type": "intrinsic",
                        "name": "null"
                    },
                    {
                        "type": "reference",
                        "name": "HTMLElement"
                    },
                    {
                        "type": "reference",
                        "name": "SVGElement"
                    }
                ]
            },
            "overwrites": {
                "type": "reference",
                "name": "Widget.target"
            },
            "inheritedFrom": {
                "type": "reference",
                "name": "SVGWidget.target"
            }
        },
        {
            "id": 2660,
            "name": "target",
            "kind": 4096,
            "kindString": "Call signature",
            "flags": {},
            "parameters": [
                {
                    "id": 2661,
                    "name": "_",
                    "kind": 32768,
                    "kindString": "Parameter",
                    "flags": {},
                    "type": {
                        "type": "union",
                        "types": [
                            {
                                "type": "intrinsic",
                                "name": "null"
                            },
                            {
                                "type": "intrinsic",
                                "name": "string"
                            },
                            {
                                "type": "reference",
                                "name": "HTMLElement"
                            },
                            {
                                "type": "reference",
                                "name": "SVGElement"
                            }
                        ]
                    }
                }
            ],
            "type": {
                "type": "intrinsic",
                "name": "this"
            },
            "overwrites": {
                "type": "reference",
                "name": "Widget.target"
            },
            "inheritedFrom": {
                "type": "reference",
                "name": "SVGWidget.target"
            }
        }
    ],
    "sources": [
        {
            "fileName": "C:/Users/jaman/CODE/HPCCJS_2_x_x/Visualization/packages/common/types/SVGWidget.d.ts",
            "line": 43,
            "character": 10
        },
        {
            "fileName": "C:/Users/jaman/CODE/HPCCJS_2_x_x/Visualization/packages/common/types/SVGWidget.d.ts",
            "line": 44,
            "character": 10
        }
    ],
    "overwrites": {
        "type": "reference",
        "name": "Widget.target"
    },
    "inheritedFrom": {
        "type": "reference",
        "name": "SVGWidget.target"
    },
    "folder": "packages/chart"
}
-->

## Published Properties
```@hpcc-js/chart:Area
```
