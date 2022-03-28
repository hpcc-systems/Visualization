# Pie
    
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
            import { Pie } from "@hpcc-js/chart";
            
            new Pie()
                .target("target")
                .columns(["C1", "V1"])
                .data([
                    ["C1_6", 44],
                    ["C1_1", 44],
                    ["C1_5", 47],
                    ["C1_4", 47],
                    ["C1_3", 51],
                    ["C1_0", 56],
                    ["C1_8", 58],
                    ["C1_2", 59],
                    ["C1_7", 61],
                    ["C1_9", 62]
                ])
                .innerRadius(90)
                .paletteID("category10")
                .useClonedPalette(true)
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
            import { Pie } from "@hpcc-js/chart";
            
            new Pie()
                .target("target")
                .columns(["C1", "V1"])
                .data([
                    ["A", 144],
                    ["B", 89],
                    ["C", 55],
                    ["D", 34],
                    ["E", 21],
                    ["F", 13]
                ])
                .innerRadius(90)
                .paletteID("category10")
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
            import { Pie } from "@hpcc-js/chart";
            
            new Pie()
                .target("target")
                .columns(["C1", "V1"])
                .data([
                    ["C1_0", 35],
                    ["C1_8", 39],
                    ["C1_6", 45],
                    ["C1_4", 49],
                    ["C1_9", 51],
                    ["C1_1", 53],
                    ["C1_3", 56],
                    ["C1_5", 58],
                    ["C1_7", 64],
                    ["C1_2", 70]
                ])
                .innerRadius(38)
                .paletteID("category10")
                .useClonedPalette(true)
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
            import { Pie } from "@hpcc-js/chart";
            
            new Pie()
                .target("target")
                .columns(["Subject", "Result"])
                .data([
                    ["English", 45],
                    ["Irish", 28],
                    ["Math", 98],
                    ["Geography", 48],
                    ["Science", 82]
                ])
                .render()
                ;
            
        </script>
    </hpcc-vitepress>
</ClientOnly>

