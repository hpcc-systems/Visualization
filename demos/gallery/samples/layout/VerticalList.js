import { EntityCard } from "@hpcc-js/common";
import { VerticalList } from "@hpcc-js/layout";

const data = [
    ["A", 34, 21],
    ["B", 55, 34],
    ["C", 54, 90],
    ["D", 80, 153],
    ["E", 86, 92],
    ["F", 144, 233]
];
new VerticalList()
    .target("target")
    .itemMinWidth(85)
    .itemMinHeight(68)
    .widgets(data.map(row=>{
        return new EntityCard()
            .icon("")
            .title(row[0])
            .description('sum: '+(row[1] + row[2]))
            .iconColor("#000")
            .backgroundShape("rect")
            .backgroundColorFill("#c8d6e5")
            .backgroundColorStroke("#576574")
            ;
    }))
    .render()
    ;