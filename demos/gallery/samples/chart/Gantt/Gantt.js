import { Gantt } from "@hpcc-js/chart";

new Gantt()
    .target("target")
    .columns(["Project", "Date Range"])
    .data([
        ["Docs", ["2012-09-09", "2012-10-09"]],
        ["Coding", ["2011-08-09", "2012-09-09"]],
        ["Specs", ["2010-07-09", "2011-08-09"]]
    ])
    .yAxisType("time")
    .yAxisTypeTimePattern("%Y-%m-%d")
    .render()
    ;
