# Bullet
    
<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Bullet } from "@hpcc-js/chart";
            
            new Bullet()
                .target("target")
                .columns(["title", "subtitle", "ranges", "measures", "markers"])
                .data([
                    ["Revenue", "US$, in thousands", [150, 225, 300], [220, 270], [250, 25]],
                    ["Profit  ", "%", [20, 25, 30], [21, 23], [26]],
                    ["Order Size", "US$, average", [350, 500, 600], [100, 320], [550]],
                    ["New Customers", "count", [1400, 2000, 2500], [1000, 1650], 2100],
                    ["Satisfaction", "out of 5", [3.5, 4.25, 5], [3.2, 4.7], [4.4]]
                ])
                .titleColumn("title")
                .subtitleColumn("subtitle")
                .rangesColumn("ranges")
                .measuresColumn("measures")
                .markersColumn("markers")
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


