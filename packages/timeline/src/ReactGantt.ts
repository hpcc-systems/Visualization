import { d3Event, drag as d3Drag, DraggablePlaceholder, select as d3Select, SVGZoomWidget, Utility } from '@hpcc-js/common';
import { scaleLinear as d3ScaleLinear } from "d3-scale";
import { React, render, Rectangle } from "@hpcc-js/react";

export class ReactGantt extends SVGZoomWidget {

    protected _selection = new Utility.Selection(this);

    private _dragHandler = d3Drag<Element, DraggablePlaceholder>();

    constructor(){
        super();
    }
    
    enter(domNode, element){
        super.enter(domNode, element);
    }

    update(domNode, element){
        super.update(domNode, element);
        const context = this;
        const minStart = Math.min(...this.data().map(n=>n.start));
        const maxEnd = Math.max(...this.data().map(n=>n.end));

        const w = this.width();
        const h = this.height();
        const x0 = -(w/2);
        const x1 = (w/2);
        const y0 = -(h/2);
        const y1 = (h/2);

        const interpolateX = d3ScaleLinear()
            .domain([minStart, maxEnd])
            .range([x0, x1])
            ;
        const interpolateY = d3ScaleLinear()
            .domain([0, this.data().length])
            .range([y0, y1])
            ;
        this.data().forEach((d,i)=>{
            d.x = interpolateX(d.start);
            const endX = interpolateX(d.end);
            d.y = interpolateY(i);
            const endY = interpolateY(i+1);
            if(!d.props)d.props={};
            d.props.width = (endX - d.x);
            d.props.height = (endY - d.y);
            d.endPos = d.x + d.props.width;
        });
        const buckets = this.calcBuckets(x0);
        
        const itemSelection = element.selectAll(".item")
            .data(this.data(), d => JSON.stringify(d))
            ;
        itemSelection
            .join(
                enter => enter.append("g")
                    .attr("class", "item")
                    .on("click.selectionBag", function (d) {
                        context._selection.click({
                            _id: d.id,
                            element: () => d.element
                        }, d3Event);
                        context.selectionChanged();
                    })
                    .on("click", function (this: SVGElement, d) {
                        const selected = d.element.classed("selected");
                        context.item_click(d.props.origData || d.props, "", selected);
                    })
                    .on("mousein", function (d) {
                        context.highlightItem(d3Select(this), d);
                        const selected = d.element.classed("selected");
                        context.item_mousein(d.props.origData || d.props, "", selected);
                    })
                    .on("mouseover", function (d) {
                        context.highlightItem(d3Select(this), d);
                        const selected = d.element.classed("selected");
                        context.item_mouseover(d.props.origData || d.props, "", selected);
                    })
                    .on("mouseout", function (d) {
                        context.highlightItem(null, null);
                        const selected = d.element.classed("selected");
                        context.item_mouseout(d.props.origData || d.props, "", selected);
                    })
                    .call(this._dragHandler)
                    .each(function (d, i) {
                        d.element = d3Select(this);
                        d.y = interpolateY(buckets[i]);
                        d.element.attr("transform", `translate(${d.x+(d.props.width/2)} ${d.y+(d.props.height/2)})`);
                    }),
                update => update,
                exit => exit
                    .each(function (d) {
                        delete d.element;
                    })
                    .remove()
            )
            .attr("opacity", d => d.props && d.props.hidden ? 0 : 1)
            .each(function (this: SVGGElement, d) {
                render(
                    context._itemRenderer,
                    d.props,
                    this
                );
            })
            ;
    }

    calcBuckets(min) {
        const bucketMap = {};
        const tol = this.overlapTolerence();
        const buckets = [{endPos:min}];
        this.data().forEach((d,i)=>{
            for (let i2 = 0; i2 < buckets.length; ++i2) {
                if (i === 0 || buckets[i2].endPos + tol <= d.x) {
                    bucketMap[i] = i2;
                    buckets[i2].endPos = d.endPos;
                    break;
                }
            }
            if(typeof bucketMap[i] === "undefined"){
                bucketMap[i] = buckets.length;
                buckets.push({endPos:d.endPos});
            }
        });
        return bucketMap;
    }

    private _itemRenderer: React.FunctionComponent = Rectangle;
    itemRenderer(): React.FunctionComponent;
    itemRenderer(_: React.FunctionComponent): this;
    itemRenderer(_?: React.FunctionComponent): this | React.FunctionComponent {
        if (!arguments.length) return this._itemRenderer;
        this._itemRenderer = _;
        return this;
    }

    selectionChanged() {
        console.group("selectionChanged");
        console.log('this._selection', this._selection);
        console.groupEnd();
    }
    
    highlightItem(_element, d) {
        console.group("highlightItem");
        console.log('_element', _element);
        console.log('d', d);
        console.groupEnd();
    }

    item_click(row, _col, sel) {
    }

    item_mousein(row, _col, sel) {
    }

    item_mouseover(row, _col, sel) {
    }

    item_mouseout(row, _col, sel) {
    }
}
ReactGantt.prototype._class += ' timeline_ReactGantt';

export interface ReactGantt {
    overlapTolerence(): number;
    overlapTolerence(_: number): this;
}
ReactGantt.prototype.publish("overlapTolerence", 2, "number", "overlapTolerence");