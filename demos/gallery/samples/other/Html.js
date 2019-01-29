import { Html } from "@hpcc-js/other";

new Html()
    .target("target")
    .html('<div style="border:1px solid red;padding:10px;margin:20px;font-size:24px;">Text in a div!</div>')
    .render()
    ;