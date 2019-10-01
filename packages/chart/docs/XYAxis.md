# XYAxis

<!--meta
{
    "id": 693,
    "name": "XYAxis",
    "kind": 128,
    "kindString": "Class",
    "flags": {
        "isExported": true
    },
    "sources": [
        {
            "fileName": "XYAxis.ts",
            "line": 10,
            "character": 19
        },
        {
            "fileName": "XYAxis.ts",
            "line": 649,
            "character": 23
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
            "name": "Scatter",
            "id": 1462
        },
        {
            "type": "reference",
            "name": "Column",
            "id": 3083
        },
        {
            "type": "reference",
            "name": "Contour",
            "id": 6230
        },
        {
            "type": "reference",
            "name": "HexBin",
            "id": 9936
        }
    ],
    "folder": "packages/chart"
}
-->

The XYAxis widget generates the x-axis and y-axis for the following widgets: [Area](./Area.md), [Bar](./Bar.md), [BubbleXY](./BubbleXY.md), [Column](./Column.md), [Contour](./Contour.md), [Gantt](./Gantt.md), [HexBin](./HexBin.md), [Line](./Line.md), [Scatter](./Scatter.md) and [Step](./Step.md).

The x and y axis extend a core 'Axis' widget and share all of the same properties (with the exception of _xAxisFocus_ and _xAxisFocusHeight_). This means that the 'xAxis' and 'yAxis' prefixes can be used interchangeably to affect the corresponding axis. 

```sample-code
import { XYAxis } from "@hpcc-js/chart";

new XYAxis()
    .target("target")
    .render()
    ;
```

_xAxisType_ is likely the most significant property as it determines the expected data shape. This is the breakdown of the different axis types:
* "ordinal" - displays categorical data
* "linear" - displays numerical data
* "time" - displays time data
* "pow" - displays numerical data skewed by a power of 2 to emphasize disproportionately large or small values.
* "log" - displays numerical data skewed by a log of base 10 to de-emphasize disproportionately large or small values.

```sample-code
import { XYAxis } from "@hpcc-js/chart";

new XYAxis()
    .target("target")
    .xAxisType("linear")
    .render()
    ;
```

The following two properties only apply to an axis while its type is 'ordinal':
* _xAxisOrdinalPaddingInner_ sets the ratio of the width of a category and the white space between categories.
* _xAxisOrdinalPaddingOuter_ sets the ratio of the width of a category and the white space between the edges of the chart and the first (and/or last) category.

NOTE: Column is used below as the two padding properties require data in order to observe their effect.

```sample-code
import { Column } from "@hpcc-js/chart";

new Column()
    .target("target")
    .columns(["Category", "Value 1", "Value 2", "Value 3"])
    .xAxisOrdinalPaddingInner(0.9)
    .xAxisOrdinalPaddingOuter(1)
    .data([
        ["A", 34, 90, 82],
        ["B", 55, 50, 65],
        ["C", 89, 75, 43],
        ["D", 144, 66, 56]
    ])
    .render()
    ;
```

_xAxisGuideLines_ displays lines across the background corresponding to each axis tick and perpendicular to their axis.

_xAxisDomainLow_ and _xAxisDomainHigh_ set the axis' lower and upper values (only while the axis type is not ordinal).

_xAxisTickCount_ sets the target number of ticks to display along the axis. The tick count may be slightly lower or higher than the provided number as the axis attempts to place the ticks in sensible intervals.

_xAxisTickFormat_ sets the number format rule for axis tick text (only while the axis type is not ordinal).

_xAxisOverlapMode_ specifies the behavior when tick labels would overlap.

_xAxisLabelRotation_ sets the degree angle of rotation for labels while overlap mode is 'rotate'.

```sample-code
import { XYAxis } from "@hpcc-js/chart";

new XYAxis()
    .target("target")
    .yAxisType("log")
    .xAxisType("pow")
    .xAxisGuideLines(true)
    .xAxisDomainLow(-1000000)
    .xAxisDomainHigh(1000000)
    .xAxisTickCount(7)
    .xAxisTickFormat(",.2r")
    .xAxisOverlapMode("rotate")
    .xAxisLabelRotation(90)
    .xAxisTitle("AXIS TITLE GOES HERE")
    .render()
    ;
```

While working with time data the following properties should be used:
* _xAxisType_ should be set to "time"
* _xAxisTypeTimePattern_ should be set to match the string format of your time data.
    * In other words: *this property tells the widget how to ingest the time strings in your data*
* _xAxisTickFormat_ should be set to match the desired time format of the axis ticks.
    * In other words: *this property tells the widget what you want the tick text to look like*
* _xAxisDomainLow_ and _xAxisDomainHigh_ are optional, but should you choose to use them, then they should match the format specified _xAxisTypeTimePattern_.

```sample-code
import { XYAxis } from "@hpcc-js/chart";

new XYAxis()
    .target("target")
    .xAxisType("time")
    .xAxisTypeTimePattern("%m/%d/%Y")
    .xAxisDomainLow("06/31/1980")
    .xAxisDomainHigh("06/31/2019")
    .xAxisTickFormat("%Y")
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:XYAxis
```
