import { Button, TitleBar } from "@hpcc-js/common";
import { VerticalList } from "@hpcc-js/layout";

const data = [
    ["First", 34, 21],
    ["Second", 34, 21],
    ["Third", 34, 21],
    ["Fourth", 34, 21],
    ["Fifth", 34, 21],
    ["Sixth", 34, 21],
    ["Seventh", 34, 21],
];
let colors = [
    ["#2c3e50", "#2c3e50", "#1abc9c", "#16a085"],
    ["#2c3e50", "#2c3e50", "#2ecc71", "#27ae60"],
    ["#2c3e50", "#2c3e50", "#9b59b6", "#8e44ad"],
    ["#2c3e50", "#2c3e50", "#f1c40f", "#f39c12"],
    ["#2c3e50", "#2c3e50", "#e67e22", "#d35400"],
    ["#2c3e50", "#2c3e50", "#3498db", "#2980b9"],
    ["#2c3e50", "#2c3e50", "#95a5a6", "#7f8c8d"],
];
new VerticalList()
    .target("target")
    .itemMinHeight(22)
    .widgets(data.map(row=>{
        const c = colors.pop();
        return new TitleBar()
            .minHeight(22)
            .titleIcon(Math.random() < 0.5 ? "" : "")
            .title(row[0])
            .titleFont("Arial")
            .titleFontSizeRatio(0.62)
            .description(Math.random() < 0.5 ? 'sum: '+(row[1] + row[2]) : null)
            .descriptionFont("Arial")
            .descriptionFontSizeRatio(0.4)
            .descriptionStacked(Math.random() < 0.5)
            .fontColor(c[0])
            .buttonFontColor(c[1])
            .backgroundColor(c[2])
            .buttonBackgroundColor(c[3])
            .buttons([
                new Button().faChar("fa-navicon")
            ])
            ;
    }))
    .render()
    ;