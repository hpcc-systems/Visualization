import { HTMLWidget, mouse as d3Mouse, select as d3Select, selectAll as d3SelectAll, Widget } from "@hpcc-js/common";

export class DragList extends HTMLWidget {

    protected _container;
    protected _containerTop;
    protected _dragMemory: any = {};

    constructor() {
        super();
    }

    removeItem(node: HTMLElement) {
        const item = node.parentElement.parentElement;
        const order = Number(item.getAttribute("data-order"));
        this.widgets().splice(order, 1);
        this.lazyRender();
    }

    applySortOrder() {
        const order = d3SelectAll(".drag-list-item").nodes()
            .map((elm: HTMLElement) => Number(elm.getAttribute("data-order")))
            ;

        const orderedWidgetArr = [...this.widgets()];

        order.forEach((val, i) => { orderedWidgetArr[val] = this.widgets()[i]; });

        this.widgets(orderedWidgetArr);
        this.lazyRender();
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        const context = this;

        this._container = element.append("div")
            .attr("class", "drag-list-container")
            .style("position", "relative")
            .style("overflow-x", "hidden")
            .style("overflow-y", "auto")
            ;

        element.on("mousemove", function() {
            if (context._dragMemory.element) {
                const coordinates = d3Mouse(this);
                const y = coordinates[1];
                const parentScrollTop = domNode.parentElement.parentElement.scrollTop;

                if (!context._dragMemory.ghost) {
                    context._dragMemory.element.style.visibility = "hidden";

                    const rect = context._dragMemory.element.getBoundingClientRect();

                    const ghost = context._container.append("div")
                        .attr("class", "drag-list-ghost")
                        .style("position", "absolute")
                        .style("display", "flex")
                        .style("background-color", "#ddd")
                        .style("margin-bottom", "4px")
                        .style("width", rect.width + "px")
                        .style("height", rect.height + "px")
                        .style("font-size", "20px")
                        .style("line-height", context.itemMinHeight() + "px")
                        .style("padding-left", rect.height + "px")
                        ;
                    context._dragMemory.yOffset = rect.top - context._containerTop - context._dragMemory.startY;
                    ghost.append("div")
                        .attr("class", "drag-list-item-label")
                        .text(context._dragMemory.label)
                        ;
                    context._dragMemory.ghost = ghost.node();
                }
                const ghostTop = y + context._dragMemory.yOffset;
                context._dragMemory.ghost.style.top = ghostTop + "px";
                let idx = 0;
                const halfItemHeight = context.itemMinHeight() / 2;
                const dragY = y - parentScrollTop;
                context._dragMemory.siblingTops.forEach((top, i) => {
                    if (i === 0) {
                        if (dragY < top - halfItemHeight) {
                            idx = i;
                        }
                    }
                    if (dragY > top - halfItemHeight) {
                        idx = i + 1;
                    }
                });
                if (context._dragMemory.idx !== idx) {
                    context._dragMemory.idx = idx;
                    context._container.node().children[idx].before(context._dragMemory.element);
                }
            }
        });
        element.on("mouseup", function() {
            if (context._dragMemory.ghost) {
                context._dragMemory.element.style.visibility = "visible";
                context._dragMemory.element = undefined;
                context._container.node().removeChild(context._dragMemory.ghost);
                context._dragMemory.ghost = undefined;
                context.applySortOrder();
            }
        });
    }
    update(domNode, element) {
        super.update(domNode, element);

        const context = this;

        this._container
            .style("min-height", (this.widgets().length + 1) * (this.itemMinHeight() + this.spaceBetweenItems()) + "px")
            ;

        const rowSelection = this._container.selectAll(".drag-list-item").data(this.widgets(), d => d.id());
        const rowEnter = rowSelection.enter()
            .append("div")
            .attr("class", "drag-list-item")
            .style("min-height", this.itemMinHeight() + "px")
            .style("display", "flex")
            .style("background-color", "#ddd")
            .style("margin-bottom", this.spaceBetweenItems() + "px")
            .style("-ms-user-select", "none")
            .style("user-select", "none")
            .each(function(d) {
                const item = d3Select(this);
                item.append("div")
                    .attr("class", "drag-list-item-dots")
                    .style("min-height", "30px")
                    .style("min-width", "30px")
                    .style("line-height", "28px")
                    .style("font-size", "20px")
                    .style("text-align", "center")
                    .style("cursor", "ns-resize")
                    .text(String.fromCharCode(8942))
                    .on("mousedown", function(d: any) {
                        const coordinates = d3Mouse(context._container.node());
                        context._containerTop = context._container.node().getBoundingClientRect().top;
                        context._dragMemory.siblingTops = Array
                            .from(context._container.node().children)
                            .map((child: HTMLElement) => {
                                return child.getBoundingClientRect().top;
                            })
                            ;
                        context._dragMemory.startY = coordinates[1];
                        context._dragMemory.element = this.parentNode;
                        context._dragMemory.label = typeof d.label === "function" ? d.label() : d.id();
                    })
                    ;
                const content = item.append("div")
                    .attr("class", "drag-list-item-content")
                    .style("flex", "1")
                    .style("min-height", context.itemMinHeight() + "px")
                    .style("background-color", "#AAA")
                    .style("padding-left", "4px")
                    ;

                const controls = item.append("div")
                    .attr("class", "drag-list-item-controls")
                    ;
                controls.append("div")
                    .attr("class", "drag-list-item-close fa fa-close")
                    .style("height", "30px")
                    .style("width", "30px")
                    .style("text-align", "center")
                    .style("line-height", "28px")
                    .on("click", function() {
                        context.removeItem(this);
                    })
                    ;
                d.target(content.node());
            })
            ;
        rowEnter
            .merge(rowSelection)
            .attr("data-order", (d, i) => i)
            .each(d => {
                d.render();
            })
            ;
        rowSelection.exit()
            .each(d => d.target(null))
            .remove()
            ;
    }
}
DragList.prototype._class += " other_DragList";

export interface DragList {
    widgets(): Widget[];
    widgets(_: Widget[]): this;
    itemMinHeight(): number;
    itemMinHeight(_: number): this;
    spaceBetweenItems(): number;
    spaceBetweenItems(_: number): this;
}

DragList.prototype.publish("spaceBetweenItems", 4, "number", "Space between items (pixels)");
DragList.prototype.publish("itemMinHeight", 15, "number", "Minimum height of each list item (pixels)");
DragList.prototype.publish("widgets", [], "any", "Widgets", null, { render: false });
