# StatChart

<!--meta

-->

StatChart displays a normal distribution of continuous data.

A single data row containing exactly 7 data points is required.

The _1st_ data point sets the lowest value in the set.

The _2nd_ data point sets the lower quartile (typically the average of the smallest half of values in the set).

The _3rd_ data point sets the middle quartile (typically the median value in the set).

The _4th_ data point sets the upper quartile (typically the average of the largest half of values in a set).

The _5th_ data point sets the largest value in the set.

The _6th_ data point sets the _mean_.

The _7th_ data point sets the _standardDeviation_.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { StatChart } from "@hpcc-js/chart";

      new StatChart()
          .data([
              [34,55,89,144,233,90,20]
          ])
          .target("placeholder")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

Alternatively, the _mean_ and _standardDeviation_ can be set via chained methods _AFTER_ the _data_ row has been set.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { StatChart } from "@hpcc-js/chart";

      new StatChart()
          .data([
              [34,55,89,144,233]
          ])
          .mean(90)
          .standardDeviation(20)
          .target("placeholder")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

_candleHeight_ controls the pixel height of the _QuartileCandlestick_ chart along the bottom.

_domainPadding_ controls the left and right padding of the interpolated _Scatter_ chart (bell curve) along the top.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { StatChart } from "@hpcc-js/chart";

      new StatChart()
          .data([
              [34,55,89,144,233]
          ])
          .mean(90)
          .standardDeviation(20)
          .candleHeight(50)
          .domainPadding(100)
          .target("placeholder")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

_tickFormat_ can be used to specify a d3 string formatting rule to be applied to the axis tick values (see: [Formatting](../../../docs/Getting%20Started/formatting.md))

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { StatChart } from "@hpcc-js/chart";

      new StatChart()
          .target("placeholder")
          .quartiles([34,55,89,144,233])
          .mean(120)
          .standardDeviation(130)
          .tickFormat(".2s")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

## API

## Published Properties

```@hpcc-js/chart:StatChart
```
