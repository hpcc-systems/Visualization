import { Column } from "@hpcc-js/chart";
import { Modal } from "@hpcc-js/layout";

new Modal()
    .widget(
        new Column()
            .columns(["Subject", "Year 1", "Year 2", "Year 3"])
            .data([
                ["Geography", 75, 68, 65],
                ["English", 45, 55, -52],
                ["Math", 98, 92, 90],
                ["Science", 66, 60, 72]
            ])
    )
    .target("target")
    .relativeTargetId("target")
    .title("Column in a Modal")
    .minWidth("250px")
    .minHeight("250px")
    .render()
    ;
