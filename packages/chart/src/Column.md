# Column

<!--meta

-->

[Bar](./Bar) and Column are effectively the same class, but have one different default value - their _orientation_. They support all of the same properties.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Column } from "@hpcc-js/chart";

      new Column()
          .target("placeholder")
          .columns(["Category", "Value"])
          .data([
              ["A", 34],
              ["B", 55],
              ["C", 89],
              ["D", 144]
          ])
          .yAxisDomainLow(0)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

Two or more series are commonly compared with a column chart.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Column } from "@hpcc-js/chart";

      new Column()
          .target("placeholder")
          .columns(["Category", "Value 1", "Value 2"])
          .data([
              ["A", 34, 90],
              ["B", 55, 50],
              ["C", 89, 75],
              ["D", 144, 66]
          ])
          .xAxisOrdinalPaddingInner(0.38)
          .xAxisOrdinalPaddingOuter(0.62)
          .xAxisFocus(true)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

A column chart supports n-number of numeric values per data row. A series is created for each column as needed.  In the below example the series' are stacked together using the _yAxisStacked_ property.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Column } from "@hpcc-js/chart";

      new Column()
          .target("placeholder")
          .columns(["Category", "Value 1", "Value 2", "Value 3"])
          .data([
              ["A", 34, 90, 82],
              ["B", 55, 50, 65],
              ["C", 89, 75, 43],
              ["D", 144, 66, 56]
          ])
          .showValue(true)
          .valueCentered(true)
          .yAxisStacked(true)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

## API

## Published Properties
```@hpcc-js/chart:Column
```
