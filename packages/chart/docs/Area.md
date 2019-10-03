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

Area, [Line](./Line.md), [Step](./Step.md) and [Scatter](./Scatter.md) serve a similar purpose. They display continuous data along a categorical or continuous axis.

```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
    .target("target")
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 144]
    ])
    .render()
    ;
```

Area supports n-number of numeric values per data row. A series is created for each column as needed. 

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

_pointShape_ can be used to specify the shape of each data point (see the property list below for potential values).

_pointSize_ can be used to set the size of each data point's shape.

_showValue_ specifies whether or not to display the value above each data point.

_yAxisDomainPadding_ can be used to reserve a percentage of the top and bottom edges for white space.

```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
    .target("target")
    .columns(["Category", "Value", "Value 2"])
    .data([
        ["A", 34, 350],
        ["B", 55, 380],
        ["C", 89, 390],
        ["D", 98, 410]
    ])
    .pointShape("circle")
    .pointSize(2)
    .showValue(true)
    .yAxisDomainPadding(10)
    .render()
    ;
```

_interpolate_ can be used to specify which line interpolation mode is used to draw the connecting line between data points (see the property list below for potential values).

_pointDarken_ can be set to 'false' to disable the slight darkening effect applied to each data point.

_showValue_ along with _valueBaseline("central")_ places the values at the center of each data point.

_xAxisDomainPadding_ can be used to reserve a percentage of the left and right edges for white space.

```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
    .target("target")
    .columns(["Value 1", "Value 2"])
    .data([
        [144, 90],
        [89, 50],
        [55, 75],
        [34, 66]
    ])
    .paletteID("FlatUI_German")
    .xAxisType("linear")
    .pointShape("rectangle")
    .pointSize(20)
    .pointDarken(false)
    .showValue(true)
    .valueBaseline("central")
    .xAxisDomainPadding(5)
    .render()
    ;
```

For documentation on axis-specific properties, like those used in the below example, take a look at the [Axis Documentation](./XYAxis.md).

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
