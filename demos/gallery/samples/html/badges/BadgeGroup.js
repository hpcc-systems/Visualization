import { HTMLBadgeGroup } from "@hpcc-js/html";

new HTMLBadgeGroup()
    .target("target")
    .data([
        {icon:"",label:"Associates"},
        {icon:"",label:"Vehicles"},
        {icon:"",label:"Judgements"},
        {icon:"",label:"Financial History"},
    ])
    .iconFontFamily("FontAwesome")
    .label("layoutMode = horizontal")
    .labelFontSize(12)
    .layoutMode("horizontal")
    .overflowX("scroll")
    .padding(6)
    .margin(2)
    .render()
    ;
