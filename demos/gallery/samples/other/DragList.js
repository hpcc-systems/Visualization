import { DragList, FlexInput } from "@hpcc-js/other";

new DragList()
    .target("target")
    .itemMinHeight(36)
    .widgets([
        new FlexInput().label("A"),
        new FlexInput().label("B"),
        new FlexInput().label("C")
    ])
    .render()
    ;