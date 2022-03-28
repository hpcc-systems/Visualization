# Column
    
<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Column } from "@hpcc-js/chart";
            
            new Column()
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


## More Examples

<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Column } from "@hpcc-js/chart";
            
            new Column()
                .target("target")
                .columns(["Category", "Series-1", "Series-2"])
                .data([
                    ["A", 34, 21],
                    ["B", 55, 34],
                    ["C", 54, 90],
                    ["D", 80, 153],
                    ["E", 86, 92],
                    ["F", 144, 233]
                ])
                .tooltipValueFormat(",.0f")
                .showValue(true)
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
            import { Column } from "@hpcc-js/chart";
            
            new Column()
                .target("target")
                .columns(["Category", "Series-1", "Series-2"])
                .data([
                    ["A", 34, 21],
                    ["B", 55, 34],
                    ["C", 54, 90],
                    ["D", 80, 153],
                    ["E", 86, 92],
                    ["F", 144, 233]
                ])
                .tooltipValueFormat(",.0f")
                .showValue(true)
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
            import { Column } from "@hpcc-js/chart";
            
            new Column()
                .target("target")
                .columns(["Subject", "Year 1", "Year 2", "Year 3"])
                .data([
                    ["Geography", 75, 68, 65],
                    ["English", 45, 55, -52],
                    ["Math", 98, 92, 90],
                    ["Science", 66, 60, 72]
                ])
                .xAxisOrdinalPaddingInner(0.2)
                .xAxisOrdinalPaddingOuter(0.2)
                .xAxisSeriesPaddingInner(0.2)
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
            import { Column } from "@hpcc-js/chart";
            
            new Column()
                .target("target")
                .columns(["Male/Female Astronauts Per Year", "Female Astronauts", "Male Astronauts"])
                .data([
                    ["1985", 2, 11],
                    ["1987", 2, 13],
                    ["1990", 5, 18],
                    ["1992", 3, 16],
                    ["1995", 5, 14],
                    ["1996", 8, 27],
                    ["1998", 4, 21],
                    ["2000", 3, 14],
                    ["2004", 2, 9],
                    ["2009", 3, 11]
                ])
                .paletteID("FlatUI_Swedish")
                .tooltipValueFormat(",.0f")
                .showValue(true)
                .showValueAsPercent("domain")
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
            import { Column } from "@hpcc-js/chart";
            
            new Column()
                .target("target")
                .columns(["Male/Female Astronauts Per Year", "Female Astronauts", "Male Astronauts"])
                .data([
                    ["1985", 2, 11],
                    ["1987", 2, 13],
                    ["1990", 5, 18],
                    ["1992", 3, 16],
                    ["1995", 5, 14],
                    ["1996", 8, 27],
                    ["1998", 4, 21],
                    ["2000", 3, 14],
                    ["2004", 2, 9],
                    ["2009", 3, 11]
                ])
                .paletteID("FlatUI_Chinese")
                .tooltipValueFormat(",.0f")
                .showValue(true)
                .showValueAsPercent("series")
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
            import { Column } from "@hpcc-js/chart";
            
            new Column()
                .target("target")
                .columns(["Category", "Series-1", "Series-2"])
                .data([
                    ["A", 34, 21],
                    ["B", 55, 34],
                    ["C", 54, 90],
                    ["D", 80, 153],
                    ["E", 86, 92],
                    ["F", 144, 233]
                ])
                .paletteID("Accent")
                .tooltipValueFormat(",.0f")
                .showValue(true)
                .yAxisStacked(true)
                .orientation("vertical")
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
            import { Column } from "@hpcc-js/chart";
            
            new Column()
                .target("target")
                .columns(["Category", "Series-1", "Series-2"])
                .data([
                    ["A", 34, 21],
                    ["B", 55, 34],
                    ["C", 54, 90],
                    ["D", 80, 153],
                    ["E", 86, 92],
                    ["F", 144, 233]
                ])
                .paletteID("Accent")
                .tooltipValueFormat(",.0f")
                .showValue(true)
                .yAxisStacked(true)
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
            import { Column, Pie } from "@hpcc-js/chart";
            import { FlexGrid } from "@hpcc-js/layout";
            
            const columns = ["Category", "Value"];
            const data = [
                ["A", 34],
                ["B", 55],
                ["C", 54],
                ["D", 80],
                ["E", 86],
                ["F", 144]
            ];
            const pie = new Pie()
                .columns(columns)
                .data(data)
                .showSeriesPercentage(true)
                .dataMeta({sum: 1000})
                ;
            const column = new Column()
                .columns(columns)
                .data(data)
                .showValue(true)
                .showValueAsPercent("series")
                .dataMeta({sum: 1000})
                ;
            new FlexGrid()
                .widgets([
                    pie,
                    column
                ])
                .target("target")
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
            import { Area, Column, Step, XYAxis } from "@hpcc-js/chart";
            
            new XYAxis()
                .layers([
                    new Column().columns(["Year 1"]),
                    new Area().columns(["Year 2"]),
                    new Step().columns(["Year 3"])
                ])
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

