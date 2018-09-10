import { Sankey, SankeyColumn } from "@hpcc-js/graph";

new Sankey()
    .target("target")
    .columns(["Year", "Subject"])
    .data([
        ["Year 1", "Math"],
        ["Year 2", "Math"],
        ["Year 3", "Math"],
        ["Year 4", "Math"],
        ["Year 1", "English"],
        ["Year 2", "English"],
        ["Year 3", "Geometry"],
        ["Year 4", "Geometry"],
        ["Year 2", "Science"],
        ["Year 3", "Science"],
        ["Year 4", "Science"]
    ])
    .mappings([
        new SankeyColumn().column("Year"),
        new SankeyColumn().column("Subject")
    ])
    .render()
    ;
