# Pie

<!--meta

-->

A circular statistical graphic, which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice, is proportional to the quantity it represents. (See also: [HalfPie](./HalfPie.md) and [QuarterPie](./QuarterPie.md) )

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Pie } from "@hpcc-js/chart";

      new Pie()
          .target("placeholder")
          .columns(["Category", "Value"])
          .data([
              ["A", 34],
              ["B", 55],
              ["C", 89],
              ["D", 144]
          ])
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

In the below example the 'showSeriesValue' is used to display the value next to each slice label.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Pie } from "@hpcc-js/chart";

      new Pie()
          .target("placeholder")
          .columns(["Category", "Value"])
          .data([
              ["A", 34],
              ["B", 55],
              ["C", 89],
              ["D", 144]
          ])
          .showSeriesValue(true)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

In the below example the 'innerRadius' is used to transform the pie chart into a donut chart.
'showSeriesPercentage' displays the percentage next to each slice label.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Pie } from "@hpcc-js/chart";

      new Pie()
          .target("placeholder")
          .columns(["Category", "Value"])
          .data([
              ["A", 34],
              ["B", 55],
              ["C", 89],
              ["D", 144]
          ])
          .innerRadius(62)
          .showSeriesPercentage(true)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

## API

## Published Properties

```@hpcc-js/chart:Pie
```
