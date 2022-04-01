# Summary
    
<ClientOnly>
    <hpcc-vitepress style="width:100%;height:600px">
        <div id="placeholder" style="width:100%;height:600px">
        </div>
        <script type="module">
            import { Summary } from "@hpcc-js/chart";
            
            new Summary()
                .target("target")
                .columns(["Summary", "Score", "Details", "Status", "Icon"])
                .data([
                    ["Elephants", 22, "<a href='http://www.google.com#q=Elephants'>Big an grey</a>", "grey", "fa-info-circle"],
                    ["Mice", 87, "<a href='http://www.google.com#q=Elephants'>Squeaky</a>", "red", "fa-briefcase"],
                    ["Sheep", 50, "<a href='http://www.google.com#q=Elephants'>Tasty</a>", "green", "fa-info-circle"],
                    ["People", 42, "<a href='http://www.google.com#q=Elephants'>Two Legs</a>", "orange", "fa-briefcase"]
                ])
                .iconColumn("Icon")
                .labelColumn("Summary")
                .valueColumn("Score")
                .moreTextColumn("Details")
                .moreTextHTML(true)
                .colorFillColumn("Status")
                .playInterval(1000)
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


