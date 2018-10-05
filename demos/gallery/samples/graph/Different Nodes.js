import { Icon, TextBox, EntityCard } from "@hpcc-js/common";
import { RadialBar } from "@hpcc-js/chart";
import { Graph, Vertex, Edge } from "@hpcc-js/graph";

new Graph()
    .on("vertex_dblclick", (row, col, sel, ext) => {
        alert("Vertex " + ext.vertex.id() + " Double Clicked").then(() => {
            this.refreshTables(true);
        });
    }, true)
    .target("target")
    .data(createData())
    .layout("ForceDirected")
    .applyScaleOnLayout(true)
    .render()
    ;

function createData() {
    var vertices = [
        new Vertex()
            .centroid(true)
            .icon_diameter(60)
            .icon_shape_colorStroke("transparent")
            .icon_shape_colorFill("transparent")
            .icon_image_colorFill("#333333")
            .iconAnchor("middle")
            .faChar("")
            .textbox_shape_colorStroke("transparent")
            .textbox_shape_colorFill("white")
            .textbox_text_colorFill("#333333")
            .text("James Bond"),
        new Icon().faChar(""),
        new TextBox().text("Super\nSimple\nText"),
        new EntityCard()
            .icon("")
            .iconDiameter(28)
            .iconPaddingPercent(0)
            .title("George North")
            .titleFontSize(28)
            .titleColor("#2980b9")
            .description("Ospreys, Wales, UK")
            .descriptionColor("#2980b9")
            .iconColor("#2980b9")
            .backgroundShape("rect")
            .backgroundColorFill("whitesmoke")
            .backgroundColorStroke("#2c3e50")
            .annotationIcons([
                { faChar: "A", image_colorFill: "#2c3e50", shape_colorFill: "#f1c40f", shape_colorStroke: "none" },
                { faChar: "B", image_colorFill: "#2c3e50", shape_colorFill: "#e67e22", shape_colorStroke: "none" },
                { faChar: "C", image_colorFill: "#2c3e50", shape_colorFill: "#e74c3c", shape_colorStroke: "none" },
            ]),
        new RadialBar()
            .columns(["Subject", "Score"])
            .data([
                ["Geography", 75],
                ["English", 45],
                ["Math", 98],
                ["Science", 66]
            ])
            .valueDomainHigh(100)
            .width(300)
            .height(300)
    ];
    var edges = [
        new Edge().sourceVertex(vertices[0]).targetVertex(vertices[1]).showArc(false).strokeDasharray([4, 10]),
        new Edge().sourceVertex(vertices[0]).targetVertex(vertices[2]).showArc(false).strokeDasharray([4, 10]),
        new Edge().sourceVertex(vertices[0]).targetVertex(vertices[3]).showArc(false).strokeDasharray([4, 10]),
        new Edge().sourceVertex(vertices[0]).targetVertex(vertices[4]).showArc(false).strokeDasharray([4, 10])
    ];
    return { vertices: vertices, edges: edges };
}
