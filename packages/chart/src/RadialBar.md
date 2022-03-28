# RadialBar
    
<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { RadialBar } from "@hpcc-js/chart";
            
            const radialBar = new RadialBar()
                .target("target")
                .columns(["Subject", "Result"])
                .data([
                    ["Geography", 75],
                    ["English", 45],
                    ["Math", 98],
                    ["Science", 66]
                ])
                .valueDomainHigh(100)
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


