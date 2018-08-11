import { Column } from "@hpcc-js/chart";

new Column()
    .target("target")
    .columns(["Subject", "Result"]) //  Set "Columns"
    .data([                         //  Set "Data"
        ["English", 45],
        ["Irish", 28],
        ["Math", 98],
        ["Geography", 48],
        ["Science", 82]
    ])
    .render()
    ;
