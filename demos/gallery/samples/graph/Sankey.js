import { Sankey } from "@hpcc-js/graph";

let columns = ["Year","Subject"];
let data = [
    ["Year 1","Math"],
    ["Year 2","Math"],
    ["Year 3","Math"],
    ["Year 4","Math"],
    ["Year 1","English"],
    ["Year 2","English"],
    ["Year 3","Geometry"],
    ["Year 4","Geometry"],
    ["Year 2","Science"],
    ["Year 3","Science"],
    ["Year 4","Science"]
];
new Sankey()
    .target("target")
    .columns(columns)
    .data(data)
    .mappings([
        new Sankey.Column().column("Year"),
        new Sankey.Column().column("Subject")
    ])
    .render()
    ;
