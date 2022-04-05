# ReactTimeline

ReactTimeline visualizes the chronological order of event ranges along a timeline.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="width:100%;height:600px">
    </div>
    <script type="module">
      import { ReactTimeline } from "@hpcc-js/timeline";
      
      new ReactTimeline()
          .target("target")
          .columns(["Label", "start", "end"])
          .data(random_datetime_ranges(1000))
          .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
          .renderMode("scale-all")
          .render()
          ;
      
      
      function random_datetime_string() {
          const yyyy = 2004 + Math.floor(Math.random() * 2);
          const mm = 1 + Math.floor(Math.random() * 12);
          const dd = 1 + Math.floor(Math.random() * 28);
          const hh = 1 + Math.floor(Math.random() * 23);
          const min = 1 + Math.floor(Math.random() * 59);
          const sec = 0 + Math.floor(Math.random() * 59);
          return `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}T${hh < 10 ? '0' + hh : hh}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}.0Z`;
      }
      
      function random_datetime_ranges(n) {
          return Array(n).fill("").map((row, row_idx) => {
              const d1 = random_datetime_string();
              const d2 = random_datetime_string();
              return new Date(d1) - new Date(d2) > 0 ? [`Random Range #${row_idx}`, d2, d1] : [`Random Range #${row_idx}`, d1, d2];
          });
      }
      
    </script>
  </hpcc-vitepress>
</ClientOnly>


## Events

### click

_Emitted whenever the user clicks on a data element._

### dblclick

_Emitted whenever the user double-clicks on a data element._


## More Examples

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="width:100%;height:600px">
    </div>
    <script type="module">
      import { ReactTimeline } from "@hpcc-js/timeline";
      import { LabelledRect } from "@hpcc-js/react";
      import { Pie } from "@hpcc-js/chart";
      
      const timeline = new ReactTimeline()
          .rangeRenderer(LabelledRect)
          .target("target")
          .columns(["Label", "start", "end"])
          .data(random_datetime_ranges(10))
          .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
          .render()
          ;
      const tooltipWidth = 120;
      const tooltipHeight = 120;
      const div = document.createElement("div");
      div.style.width = tooltipWidth+"px";
      div.style.height = tooltipHeight+"px";
      div.style.backgroundColor = "#FFF";
      timeline.tooltip().tooltipContent(div);
      timeline.tooltip()
          .tooltipWidth(tooltipWidth)
          .tooltipHeight(tooltipHeight)
          .tooltipContent(div)
          ;
      
      const pie = new Pie();
      timeline.tooltip().onShowContent = function (node) {
          pie
              .target(null)
              .target(node)
              .columns(["Index", "Value"])
              .data(this.data()[3].weights.map((n, i)=>{
                  return [i, n];
              }))
              .render();
      };
      
      function random_datetime_string() {
          const yyyy = 2004 + Math.floor(Math.random() * 2);
          const mm = 1 + Math.floor(Math.random() * 12);
          const dd = 1 + Math.floor(Math.random() * 28);
          const hh = 1 + Math.floor(Math.random() * 23);
          const min = 1 + Math.floor(Math.random() * 59);
          const sec = 0 + Math.floor(Math.random() * 59);
          return `${yyyy}-${mm < 10 ? "0" + mm : mm}-${dd < 10 ? "0" + dd : dd}T${hh < 10 ? "0" + hh : hh}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}.0Z`;
      }
      
      function random_datetime_ranges(n) {
          return Array(n).fill("").map((row, row_idx) => {
              const d1 = random_datetime_string();
              const d2 = random_datetime_string();
              const ret = new Date(d1) - new Date(d2) > 0 ? [`Random Range #${row_idx}`, d2, d1] : [`Random Range #${row_idx}`, d1, d2];
              ret[3] = {
                  weights: [
                      Math.random(),
                      Math.random(),
                      Math.random(),
                      Math.random(),
                      Math.random()
                  ]
              };
              return ret;
          });
      }
      
      
    </script>
  </hpcc-vitepress>
</ClientOnly>

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="width:100%;height:600px">
    </div>
    <script type="module">
      import { ReactTimeline } from "@hpcc-js/timeline";
      import { LabelledRect } from "@hpcc-js/react";
      
      const timeline = new ReactTimeline()
          .rangeRenderer(LabelledRect)
          .target("target")
          .columns(["Label", "start", "end"])
          .data(random_datetime_ranges(10))
          .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
          .render()
          ;
      timeline.tooltip()
          .tooltipWidth(200)
          .tooltipHeight(20)
          .tooltipHTML(d=>{
              return `<b>${d[0]}</b>`;
          });
      
      function random_datetime_string() {
          const yyyy = 2004 + Math.floor(Math.random() * 2);
          const mm = 1 + Math.floor(Math.random() * 12);
          const dd = 1 + Math.floor(Math.random() * 28);
          const hh = 1 + Math.floor(Math.random() * 23);
          const min = 1 + Math.floor(Math.random() * 59);
          const sec = 0 + Math.floor(Math.random() * 59);
          return `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}T${hh < 10 ? '0' + hh : hh}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}.0Z`;
      }
      
      function random_datetime_ranges(n) {
          return Array(n).fill("").map((row, row_idx) => {
              const d1 = random_datetime_string();
              const d2 = random_datetime_string();
              return new Date(d1) - new Date(d2) > 0 ? [`Random Range #${row_idx}`, d2, d1] : [`Random Range #${row_idx}`, d1, d2];
          });
      }
      
      
    </script>
  </hpcc-vitepress>
</ClientOnly>

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="width:100%;height:600px">
    </div>
    <script type="module">
      import { ReactTimeline } from "@hpcc-js/timeline";
      import { LabelledRect } from "@hpcc-js/react";
      
      new ReactTimeline()
          .rangeRenderer(LabelledRect)
          .target("target")
          .columns(["Label", "start", "end"])
          .data(random_datetime_ranges(10))
          .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
          .stroke("#000")
          .strokeWidth(1)
          .render()
          ;
      
      function random_datetime_string() {
          const yyyy = 2004 + Math.floor(Math.random() * 2);
          const mm = 1 + Math.floor(Math.random() * 12);
          const dd = 1 + Math.floor(Math.random() * 28);
          const hh = 1 + Math.floor(Math.random() * 23);
          const min = 1 + Math.floor(Math.random() * 59);
          const sec = 0 + Math.floor(Math.random() * 59);
          return `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}T${hh < 10 ? '0' + hh : hh}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}.0Z`;
      }
      
      function random_datetime_ranges(n) {
          return Array(n).fill("").map((row, row_idx) => {
              const d1 = random_datetime_string();
              const d2 = random_datetime_string();
              return new Date(d1) - new Date(d2) > 0 ? [`Random Range #${row_idx}`, d2, d1] : [`Random Range #${row_idx}`, d1, d2];
          });
      }
      
    </script>
  </hpcc-vitepress>
</ClientOnly>

