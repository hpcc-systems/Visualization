# Scatter
    
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

<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Scatter } from "@hpcc-js/chart";
            
            new Scatter()
                .target("target")
                .columns(["x", "y"])
                .data(Array(200).fill(0).map(n => [
                    Math.random(), Math.random()
                ]))
                .xAxisType("linear")
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
            import { Scatter } from "@hpcc-js/chart";
            
            const randomX = d3RandomNormal(200, 80);
            const randomY = d3RandomNormal(200, 80);
            const points = d3Range(200).map(function () { return [randomX(), randomY()]; });
            
            new Scatter()
                .target("target")
                .columns(["X", "Y"])
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
            import { Scatter } from "@hpcc-js/chart";
            
            new Scatter()
                .columns(["Domain", "Value 1", "Value 2"])
                .data([
                    ["A", 34, 21],
                    ["B", 55, 34],
                    ["C", 54, 90],
                    ["D", 80, 153],
                    ["E", 86, 92],
                    ["F", 144, 233]
                ])
                .target("target")
                .paletteID("FlatUI_Chinese")
                .pointShape("rectangle")
                .pointSize(4)
                .showValue(true)
                .valueBaseline("ideographic")
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
            import { Scatter } from "@hpcc-js/chart";
            
            new Scatter()
                .columns(["x", "y", "z"])
                .data(Array(200).fill(0).map(n => [Math.random(), Math.random(), Math.random()]))
                .target("target")
                .xAxisType("linear")
                .paletteID("hpcc20")
                .render()
                ;
            
        </script>
    </hpcc-vitepress>
</ClientOnly>

