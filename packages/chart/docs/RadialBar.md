# RadialBar

<!--meta

-->

RadialBar displays one category and one numeric value per data row.

```sample-code
import { RadialBar } from "@hpcc-js/chart";

new RadialBar()
    .target("target")
    .columns(["Category", "Value"])
    .data([
        ["A", 144],
        ["B", 89],
        ["C", 55],
        ["D", 34]
    ])
    .render()
    ;
```

_valueMaxAngle_ sets the maximum angle of the largest value in the data that you provide.

_tickCount_ sets the target number of ticks to display along the circular axis. The tick count may be slightly lower or higher than the provided number as the axis attempts to place the ticks in sensible intervals.

```sample-code
import { RadialBar } from "@hpcc-js/chart";

new RadialBar()
    .target("target")
    .columns(["Category", "Value 1"])
    .data([
        ["A", 144],
        ["B", 89],
        ["C", 55],
        ["D", 34]
    ])
    .valueMaxAngle(90)
    .tickCount(10)
    .render()
    ;
```

_domainPadding_ sets the ratio of white space to bar width.

_valueDomainHigh_ sets the maximum domain axis value.

```sample-code
import { RadialBar } from "@hpcc-js/chart";

new RadialBar()
    .target("target")
    .columns(["Category", "Value 1"])
    .data([
        ["A", 144],
        ["B", 89],
        ["C", 55],
        ["D", 34]
    ])
    .domainPadding(0.62)
    .valueDomainHigh(200)
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:RadialBar
```
