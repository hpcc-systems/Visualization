import { HTMLWidget } from "@hpcc-js/common";
import { select as d3Select } from "@hpcc-js/common";

const data = [
    ["A", 100],
    ["B", 162],
    ["C", 262]
];
class HTMLExample extends HTMLWidget{
    constructor(){
        super();
    }
    enter(domNode, element){
        super.enter(domNode, element);
        this._div = element.append("div");
    }
    update(domNode, element){
        super.update(domNode, element);
        const gutter = 4;
        const rowHeight = 30;
        const labelWidth = 10;
        
        const rowsDataSelection = this._div.selectAll(".data-row").data(this.data());

        rowsDataSelection
            .enter()
            .append("div")
            .style("width","100%")
            .style("height",rowHeight+"px")
            .style("margin-top",gutter+"px")
            .classed("data-row", true)
            .each(function(row){
                const rowElement = d3Select(this);
                rowElement.append("span");
                rowElement.append("div");
            })
            .merge(rowsDataSelection)
            .style("color","red")
            .style("float","left")
            .each(function(row){
                const rowElement = d3Select(this);
                rowElement.select("span")
                    .style("float", "left")
                    .style("display", "inline-block")
                    .style("width", labelWidth+"px")
                    .text(row[0])
                    ;
                rowElement.select("div")
                    .style("float", "left")
                    .style("display", "inline-block")
                    .style("margin-left", gutter+"px")
                    .style("background-color", "red")
                    .style("width", row[1]+"px")
                    .style("height", rowHeight+"px")
                    .text(row[0])
                    ;
            })
            .attr("transform",(row,i)=>{
                const x = gutter;
                const y = (rowHeight * i) + (gutter * (i+1)) + rowHeight;
                return `translate(${x} ${y})`;
            })
            ;

        rowsDataSelection.exit().remove();
    }
}
new HTMLExample()
    .target("target")
    .data(data)
    .render()
    ;
