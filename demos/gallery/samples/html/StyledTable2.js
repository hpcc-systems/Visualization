import { StyledTable } from "@hpcc-js/html";
import { interpolateHsl as d3interpolateHsl } from "d3-interpolate";
import { scaleLinear as d3scaleLinear } from "d3-scale";

new StyledTable()
    .target("target")
    .columns(["Year","Percent"])
    .data(getData())
    .renderHtmlDataCells(true)
    .evenRowStyles({
        "background-color":"#EEE",
        "color": "black"
    })
    .render()
    ;

function getData(){
    const interp = d3interpolateHsl("#179BD7","#ED1C24");
    const data = [
        ["1999",1543],
        ["2000",1234],
        ["2001",987],
        ["2002",934],
        ["2003",834],
        ["2004",234]
    ];
    const scale = d3scaleLinear()
        .domain([234, 1543])
        .range([0, 1])
        ;
    return data.map(row=>{
        const ratio = scale(row[1]);
        const color = interp(ratio);
        return [
            `<span style="color:${color};font-weight:${ratio > 0.5 ? "bold" : "normal"}">${row[0]}</span>`,
            row[1]
        ];
    })
}