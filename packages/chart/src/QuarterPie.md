# QuarterPie

<!--meta

-->

[Pie](./Pie.md), [HalfPie](./HalfPie.md) and QuarterPie are effectively the same class, but have different starting and ending angles. They support all of the same properties.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { QuarterPie } from "@hpcc-js/chart";

      new QuarterPie()
          .columns(["Category", "Value"])
          .data([
              ["A", 34],
              ["B", 55],
              ["C", 89],
              ["D", 144]
          ])
          .target("placeholder")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { QuarterPie } from "@hpcc-js/chart";

      new QuarterPie()
          .columns(["Category", "Value"])
          .data([
              ["A", 34],
              ["B", 55],
              ["C", 89],
              ["D", 144]
          ])
          .target("placeholder")
          .innerRadius(62)
          .showSeriesPercentage(true)
          .showSeriesValue(true)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

## API

## Published Properties
```@hpcc-js/chart:QuarterPie
```
