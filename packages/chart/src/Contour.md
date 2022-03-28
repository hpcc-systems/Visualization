# Contour
    
<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { randomNormal as d3RandomNormal } from "d3-random";
            import { range as d3Range } from "d3-array";
            import { Contour } from "@hpcc-js/chart";
            
            const randomX = d3RandomNormal(200, 80);
            const randomY = d3RandomNormal(200, 80);
            const points = d3Range(2000).map(function () { return [randomX(), randomY()]; });
            
            new Contour()
                .target("target")
                .columns(["x", "y"])
                .data(points)
                .xAxisType("linear")
                .yAxisType("linear")
                .contourBandwidth(8)
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
            import { Contour } from "@hpcc-js/chart";
            
            new Contour()
                .target("target")
                .columns(["X", "Y"])
                .data([
                    [13, 144],
                    [21, 89],
                    [34, 55],
                    [55, 34],
                    [89, 21],
                    [144, 13]
                ])
                .paletteID("Plasma")
                .contourBandwidth(30)
                .contourStrokeColor("#333")
                .xAxisFocus(true)
                .render()
                ;
            
        </script>
    </hpcc-vitepress>
</ClientOnly>

<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Contour } from "@hpcc-js/chart";
            
            new Contour()
                .target("target")
                .columns(["A", "B"])
                .data([
                    [10, 10],
                    [20, 20],
                    [20, 30],
                    [30, 20],
                    [40, 30],
                    [30, 40],
                    [10, 20],
                    [20, 10]
                ])
                .contourBandwidth(80)
                .contourStrokeWidth(0)
                .render()
                ;
            
        </script>
    </hpcc-vitepress>
</ClientOnly>

<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Contour } from "@hpcc-js/chart";
            
            new Contour()
                .target("target")
                .columns(["A", "B"])
                .data([
                    [10, 10],
                    [20, 20],
                    [20, 30],
                    [30, 20],
                    [40, 30],
                    [30, 40],
                    [10, 20],
                    [20, 10]
                ])
                .showContourFill(false)
                .contourBandwidth(80)
                .contourStrokeWidth(3)
                .render()
                ;
            
        </script>
    </hpcc-vitepress>
</ClientOnly>

<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Contour, Scatter, XYAxis } from "@hpcc-js/chart";
            import { randomNormal as d3RandomNormal } from "d3-random";
            import { range as d3Range } from "d3-array";
            
            const randomX = d3RandomNormal(200, 80);
            const randomY = d3RandomNormal(2000, 20);
            const points = d3Range(800).map(function () { return [randomX(), randomY()]; });
            
            const chart4 = new XYAxis()
                .layers([
                    new Contour().contourBandwidth(8),
                    new Scatter()
                ])
                .target("target")
                .columns(["x", "y"])
                .data(points)
                .xAxisType("linear")
                .yAxisType("linear")
                .render()
                ;
            
        </script>
    </hpcc-vitepress>
</ClientOnly>

