import { SVGWidget } from "@hpcc-js/common";

const data = [
    ["A", 100],
    ["B", 162],
    ["C", 262]
];
class SVGExample extends SVGWidget{
    constructor(){
        super();
    }
    enter(domNode, element){
        super.enter(domNode, element);
        this._g = element.append("g");
    }
    update(domNode, element){
        super.update(domNode, element);
        const gutter = 4;
        const rowHeight = 30;
        const labelWidth = 10;
        const w = this.width();
        const h = this.height();
        
        const texts = this._g.selectAll(".data-text").data(this.data());
        texts.enter()
            .append("text")
            .classed("data-text", true)
            .merge(texts)
            .attr("fill","red")
            .attr("transform",(row,i)=>{
                const x = gutter;
                const y = (rowHeight * i) + (gutter * (i+1)) + rowHeight;
                return `translate(${x - (w/2)} ${y - (h/2)})`;
            })
            .text(row=>row[0])
            ;
        const rects = this._g.selectAll(".data-rect").data(this.data());
        rects.enter()
            .append("rect")
            .classed("data-rect", true)
            .merge(rects)
            .attr("fill","red")
            .attr("transform",(row,i)=>{
                const x = gutter + labelWidth + gutter;
                const y = (rowHeight * i) + (gutter * (i+1)) + (rowHeight/2);
                return `translate(${x - (w/2)} ${y - (h/2)})`;
            })
            .attr("width",row=>row[1])
            .attr("height",rowHeight)
            ;
        rects.exit().remove();
    }
}
new SVGExample()
    .target("target")
    .data(data)
    .render()
    ;