import { SimpleTable } from "@hpcc-js/html";

new SimpleTable()
    .target("target")
    .data([
        ["1999","4%"],
        ["2000","4%"],
        ["2001","4%"],
        ["Other (23)","88%"]
    ])
    .render()
    ;
