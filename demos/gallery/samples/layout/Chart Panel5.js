import { Radar } from "@hpcc-js/chart";
import { ChartPanel } from "@hpcc-js/layout";

const cp = new ChartPanel()
    .widget(new Radar())
    .target("target")
    .columns(getColumns())
    .data(getData())
    .title("Random 26 Series")
    .legendVisible(true)
    .legendPosition("right")
    .legend_symbolType("square")
    .legend_labelAlign("start")
    .legend_shapeRadius(17)
    .legend_showSeriesTotal(true)
    .legend_showLegendTotal(true)
    .render()
    ;

function getColumns(){
    return [...Array(26)].map(function (n, i){
        if(i===0)return "Subject";
        return [...Array(12)].map(function (){
            return String.fromCharCode(i+64);
        }).join("");
    });
}
function getData(){
    return [...Array(26)].map(function (n, i) {
        return [...Array(26)].map(function (n, i2) {
            if(i2===0)return String.fromCharCode(i+97);
            return (i+1) * (i2+1);
        });
    });
}