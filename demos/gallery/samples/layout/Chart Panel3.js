import { Line } from "@hpcc-js/chart";
import { ChartPanel } from "@hpcc-js/layout";

const cp = new ChartPanel()
    .widget(new Line())
    .target("target")
    .columns(getColumns())
    .data(getData())
    .title("Random 26 Series")
    .legendVisible(true)
    .legendPosition("bottom")
    .legend_labelAlign("start")
    .legend_shapeRadius(7)
    .render()
    ;

function getColumns(){
    return [...Array(15)].map(function (n, i){
        if(i===0)return "Subject";
        return [...Array(12)].map(function (){
            return String.fromCharCode(i+64);
        }).join("");
    });
}
function getData(){
    return [...Array(26)].map(function (n, i) {
        return [...Array(15)].map(function (n, i2) {
            if(i2===0)return String.fromCharCode(i+97);
            return (i+1) * (i2+1);
        });
    });
}