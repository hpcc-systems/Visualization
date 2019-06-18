import { Column } from "@hpcc-js/chart";
import { ChartPanel } from "@hpcc-js/layout";

const cp = new ChartPanel()
    .widget(new Column()
        .overrideMethod("fillColor", (row, col, sel) => {
            switch (col) {
                case "Year 1":
                    return "lightgray";
                case "Year 2":
                    return "lightblue";
                case "Year 3":
                    return "lightgreen";
            }
        })
    )
    .target("target")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .title("Exam Results 2008->10")
    .legendVisible(true)
    .render()
    ;
