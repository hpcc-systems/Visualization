# Line
    
<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Line } from "@hpcc-js/chart";
            
            new Line()
                .target("target")
                .columns(["Subject", "Year 1", "Year 2", "Year 3"])
                .data([
                    ["Geography", 75, 68, 65],
                    ["English", 45, 55, -52],
                    ["Math", 98, 92, 90],
                    ["Science", 66, 60, 72]
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


