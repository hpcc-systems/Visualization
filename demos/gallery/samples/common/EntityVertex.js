import { EntityVertex } from "@hpcc-js/common";

new EntityVertex()
    .annotationIcons([
        { faChar: "A", image_colorFill: "#2c3e50", shape_colorFill: "#f1c40f", shape_colorStroke: "#2c3e50" },
        { faChar: "B", image_colorFill: "#2c3e50", shape_colorFill: "#e67e22", shape_colorStroke: "#2c3e50" },
        { faChar: "C", image_colorFill: "#2c3e50", shape_colorFill: "#e74c3c", shape_colorStroke: "#2c3e50" }
    ])
    .target("target")
    .icon("")
    .title("EntityVertex Title")
    .iconColor("#2c3e50")
    .iconColorFill("#ecf0f1")
    .iconColorStroke("#2c3e50")
    .textboxColorFill("#ecf0f1")
    .textboxColorStroke("#2c3e50")
    .render()
    ;