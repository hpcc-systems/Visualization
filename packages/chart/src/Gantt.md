# Gantt
    
<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Gantt } from "@hpcc-js/chart";
            
            new Gantt()
                .target("target")
                .columns(["Water State Changes", "Values"])
                .data([
                    ["Solid", [0, 273]],
                    ["Liquid", [273, 373]],
                    ["Gas", [373, 650]]
                ])
                .tooltipValueFormat(",.0f")
                .orientation("horizontal")
                .yAxisType("linear")
                .yAxisStacked(false)
                .yAxisTitle("Kelvin")
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


## More Examples

<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Gantt } from "@hpcc-js/chart";
            
            new Gantt()
                .target("target")
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

