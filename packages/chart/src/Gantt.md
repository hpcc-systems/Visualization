# Gantt

<!--meta

-->

Gantt compares ranges of continuous data. Each range is represented by an array of two numeric values. The first column of each data row must contain a string or number to represent that row's category. Each additional column must contain an array of two numbers.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Gantt } from "@hpcc-js/chart";

      new Gantt()
          .target("placeholder")
          .columns(["Category", "Range"])
          .data([
              ["A", [34, 90]],
              ["B", [55, 75]],
              ["C", [75, 89]],
              ["D", [66, 99]]
          ])
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

Gantt also supports multiple ranges per data row.

The _orientation_ is set to 'horizontal' by default so _yAxisTitle_ is used to assign the horizontal axis' label.

_xAxisSeriesPaddingInner_ can be used to set the ratio between white space and bar size (per series).


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Gantt } from "@hpcc-js/chart";

      new Gantt()
          .target("placeholder")
          .columns(["State Changes", "Iron", "Aluminum", "Lead", "Gold"])
          .data([
              ["Solid", [0, 1811], [0, 933], [0, 600], [0,1337]],
              ["Liquid", [1811, 3134], [933, 2743], [600, 2022], [1337, 3243]],
              ["Gas", [3134, 5000], [2743, 5000], [2022, 5000], [3243, 5000]]
          ])
        .xAxisSeriesPaddingInner(0.3)
          .yAxisTitle("Kelvin")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>


It also supports duplicate category values.


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Gantt } from "@hpcc-js/chart";

      new Gantt()
          .target("placeholder")
          .columns(["Category", "Range"])
          .data([
              ["A", [34, 90]],
              ["B", [55, 75]],
              ["A", [95, 120]],
              ["B", [85, 175]]
          ])
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>


For documentation on axis-specific properties, like those used in the below example, take a look at the [Axis Documentation](./XYAxis.md).


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Gantt } from "@hpcc-js/chart";

      new Gantt()
          .target("placeholder")
          .columns(["Project", "Date Range"])
          .data([
              ["Docs", ["2012-09-09", "2012-10-09"]],
              ["Coding", ["2011-08-09", "2012-09-09"]],
              ["Specs", ["2010-07-09", "2011-08-09"]]
          ])
          .yAxisType("time")
          .yAxisTypeTimePattern("%Y-%m-%d")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>


## API

## Published Properties
```@hpcc-js/chart:Gantt
```
