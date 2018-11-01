import { IconList } from "@hpcc-js/other";

new IconList()
    .target("target")
    .iconSize(120)
    .data([
        ["", "#e84118", '<fieldset style="text-align: center;"><legend>Test</legend><p>Test1</p></fieldset>'],
        ["", "#44bd32", '<fieldset style="text-align: center;"><legend>Test</legend><p>Test2</p></fieldset>'],
        ["", "#0097e6", '<fieldset style="text-align: center;"><legend>Test</legend><p>Test3</p></fieldset>'],
    ])
    .render()
    ;