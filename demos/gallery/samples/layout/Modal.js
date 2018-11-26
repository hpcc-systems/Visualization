import { Column } from "@hpcc-js/chart";
import { Modal } from "@hpcc-js/layout";

new Modal()
    .target("target")
    .title("Column in a Modal")
    .minWidth("80%")
    .minHeight("80%")
    .widget(new Column()
        .columns(["Subject", "Year 1", "Year 2", "Year 3"])
        .data([
            ["Geography", 75, 68, 65],
            ["English", 45, 55, -52],
            ["Math", 98, 92, 90],
            ["Science", 66, 60, 72]
        ])
    )
    .render()
    ;
