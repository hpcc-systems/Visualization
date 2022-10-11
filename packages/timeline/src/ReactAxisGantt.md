# ReactAxisGantt

ReactAxisGantt visualizes the chronological order of event ranges along an axis of discrete values.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="width:100%;height:600px">
    </div>
    <script type="module">
      import { ReactAxisGantt } from "@hpcc-js/timeline";
      
      new ReactAxisGantt()
          .target("target")
          .columns(["Label", "start", "end"])
          .data([
              ["A", 1, 3],
              ["B", 2, 7],
              ["C", 5, 6],
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


