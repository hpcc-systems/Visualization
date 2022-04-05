# ReactAxisGanttSeries

ReactAxisGanttSeries visualizes the chronological order of event ranges, categorized by series, along an axis of discrete values.

_seriesColumn_ sets a column to be used for series/categorization.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="width:100%;height:600px">
    </div>
    <script type="module">
      import { ReactAxisGanttSeries } from "@hpcc-js/timeline";
      
      new ReactAxisGanttSeries()
          .target("target")
          .columns(["Label", "start", "end", "category"])
          .seriesColumn("category")
          .bucketHeight(15)
          .data([
              ["A", 1, 3, 0],
              ["B", 2, 7, 1],
              ["C", 5, 6, 2],
              ["D", 2, 4, 0],
              ["E", 5, 8, 1],
              ["F", 7, 9, 2],
          ])
          .render()
          ;
      
    </script>
  </hpcc-vitepress>
</ClientOnly>


## Events

### click

_Emitted whenever the user clicks on a data element._

### dblclick

_Emitted whenever the user double-clicks on a data element._


