# Gauge

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/Gauge.ts#L48",
    "extends": "SVGWidget"
}
```

A gauge chart displays a value between 0 and 1 as a percentage.

```sample-code
import { Gauge } from "@hpcc-js/chart";

var gauge = new Gauge()
    .target("target")
    .title("Example")
    .value(.38)
    .render()
    ;

```

_tickValue_ can be used to display a point of interest. _showTick_ must be set to _true_ in order for the tick to be visible.

```sample-code
import { Gauge } from "@hpcc-js/chart";

var gauge = new Gauge()
    .target("target")
    .title("Gauge w/ Tick")
    .value(.38)
    .showTick(true)
    .tickValue(.62)
    .render()
    ;

```

_titleDescription_, _valueDescription_ and _tickValueDescription_ can be used to specify hover text that displays while the cursor hovers the title, value or tick respectively.

```sample-code
import { Gauge } from "@hpcc-js/chart";

var gauge = new Gauge()
    .target("target")
    .title("Tick & Descriptions")
    .titleDescription("My Title Description")
    .value(.38)
    .valueDescription("My Value Description")
    .showTick(true)
    .tickValue(.62)
    .tickValueDescription("My Tick Description")
    .render()
    ;

```

Custom colors can be specified using two properties. _colorRange_ expects an array of valid css color style strings. _colorDomain_ expects an array of threshold values from 0 to 1. For the best results these two arrays should have the same number of elements.

```sample-code
import { Gauge } from "@hpcc-js/chart";

var gauge = new Gauge()
    .target("target")
    .title("Custom Color Gauge")
    .value(0)
    .tickValue(0.5)
    .showTick(true)
    .colorDomain([0,0.25,0.5,0.75,1])
    .colorRange(["#0000FF","dodgerblue","goldenrod","orange","rgb(255,0,0)"])
    .emptyColor("#FFFFFF")
    .tickColor("red")
    .render()
    ;

setInterval(function () {
    const v = gauge.value() + 0.25;
    gauge
        .value(v <= 1 ? v : 0)
        .lazyRender()
        ;
}, 1000);

```

When the values change, the gauge animates to display the new values.

```sample-code
import { Gauge } from "@hpcc-js/chart";

var gauge = new Gauge()
    .target("target")
    .title("My Gauge")
    .titleDescription("@hpcc-js/chart")
    .value(.66)
    .valueDescription("Main")
    .showTick(true)
    .tickValue(.33)
    .tickValueDescription("Average")
    .render()
    ;

setInterval(function () {
    gauge
        .value(Math.random())
        .tickValue(Math.random())
        .lazyRender()
        ;
}, 3000);

```


## API

## Published Properties
```@hpcc-js/chart:Gauge
```
