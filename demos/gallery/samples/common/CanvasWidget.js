import { CanvasWidget } from "@hpcc-js/common";

const data = [
    ["A", 100],
    ["B", 162],
    ["C", 262]
];
class CanvasExample extends CanvasWidget{
    constructor(){
        super();
    }
    enter(domNode, element){
        super.enter(domNode, element);
    }
    update(domNode, element){
        super.update(domNode, element);
        const gutter = 4;
        const rowHeight = 30;
        const labelWidth = 10;
        this._ctx = domNode.getContext("2d");
        this.data().forEach((row,i)=>{
            this._ctx.fillStyle = "red";
            this._ctx.fillText(row[0], gutter, (rowHeight * i) + (gutter * (i+1)) + (rowHeight/2));
            this._ctx.fillRect(
                gutter + labelWidth + gutter, 
                (rowHeight * i) + (gutter * (i+1)),
                row[1], 
                rowHeight - gutter
            );
        })
    }
}
new CanvasExample()
    .target("target")
    .data(data)
    .render()
    ;