# HexBin
    
<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { HexBin } from "@hpcc-js/chart";
            
            new HexBin()
                .target("target")
                .columns(["x", "y"])
                .data([
                    [13, 144],
                    [21, 89],
                    [34, 55],
                    [55, 34],
                    [89, 21],
                    [144, 13]
                ])
                .paletteID("Plasma")
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
            import { HexBin } from "@hpcc-js/chart";
            
            new HexBin()
                .target("target")
                .columns(["x", "y"])
                .data(Array(200).fill(0).map(n => [
                    Math.random(), Math.random()
                ]))
                .xAxisType("linear")
                .paletteID("Spectral")
                .binSize(40)
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
            import { randomNormal as d3RandomNormal } from "d3-random";
            import { range as d3Range } from "d3-array";
            import { HexBin } from "@hpcc-js/chart";
            
            const randomX = d3RandomNormal(200, 80);
            const randomY = d3RandomNormal(200, 80);
            const points = d3Range(2000).map(function () { return [randomX(), randomY()]; });
            
            new HexBin()
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

<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { HexBin, Scatter, XYAxis } from "@hpcc-js/chart";
            import { randomNormal as d3RandomNormal } from "d3-random";
            import { range as d3Range } from "d3-array";
            
            const randomX = d3RandomNormal(200, 80);
            const randomY = d3RandomNormal(2000, 20);
            const points = d3Range(800).map(function () { return [randomX(), randomY()]; });
            
            const chart4 = new XYAxis()
                .layers([
                    new HexBin().columns(["x", "y"]),
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

