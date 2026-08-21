import { EntityPin } from "@hpcc-js/common";

new EntityPin()
    .annotationIcons([
        {faChar: "A",image_colorFill: "#E3151A",shape_colorFill: "none",shape_colorStroke: "#E3151A",shape: "circle"},
        {faChar: "B",image_colorFill: "#E3151A",shape_colorFill: "none",shape_colorStroke: "#E3151A",shape: "circle"},
        {faChar: "C",image_colorFill: "#E3151A",shape_colorFill: "none",shape_colorStroke: "#E3151A",shape: "circle"}
    ])
    .target("target")
    .icon("")
    .iconDiameter(18)
    .iconPaddingPercent(1)
    .title("SomeTitle")
    .titleColor("#E3151A")
    .titleFontSize(24)
    .description("SomeDescription")
    .descriptionColor("#000000")
    .descriptionFontSize(15)
    .iconColor("#E3151A")
    .titleColor("#E3151A")
    .descriptionColor("#E3151A")
    .backgroundShape("pin")
    .backgroundColorFill("#F8F8F8")
    .backgroundColorStroke("#CCCCCC")
    .cornerRadius(5)
    .arrowHeight(10)
    .arrowWidth(16)
    .render()
    ;