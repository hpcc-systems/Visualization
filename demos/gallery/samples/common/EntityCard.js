import { EntityCard } from "@hpcc-js/common";

new EntityCard()
    .target("target")
    .icon("")
    .iconDiameter(55)
    .iconPaddingPercent(0)
    .title("Hello\nEntityCard")
    .titleFontSize(28)
    .titleColor("#ecf0f1")
    .description("This is an EntityCard description")
    .descriptionColor("#ecf0f1")
    .iconColor("#ecf0f1")
    .backgroundShape("rect")
    .backgroundColorFill("#2980b9")
    .backgroundColorStroke("#2c3e50")
    .annotationIcons([
        { faChar: "A", image_colorFill: "#2c3e50", shape_colorFill: "#f1c40f", shape_colorStroke: "none" },
        { faChar: "B", image_colorFill: "#2c3e50", shape_colorFill: "#e67e22", shape_colorStroke: "none" },
        { faChar: "C", image_colorFill: "#2c3e50", shape_colorFill: "#e74c3c", shape_colorStroke: "none" },
    ])
    .render()
    ;