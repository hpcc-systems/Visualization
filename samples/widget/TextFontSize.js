import { TextBox } from "@hpcc-js/common";

new TextBox()
    .target("target")
    .text("Hello\nand\nWelcome!")
    .fontSize(28)
    .render()
    ;
