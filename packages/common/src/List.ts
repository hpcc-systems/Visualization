import { IList } from "./IList";
import { SVGWidget } from "./SVGWidget";
import { TextBox } from "./TextBox";

import "../src/List.css";

export class List extends SVGWidget implements IList {

    protected _listWidgets;

    constructor() {
        super();

        this._listWidgets = {};
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;

        const line = element.selectAll(".line").data(this.data(), function (d) { return d; });
        const lineEnter = line.enter().append("g")
            .attr("class", "line")
            .each(function (d) {
                const newTextBox = new TextBox()
                    .target(this)
                    .paddingTop(0)
                    .paddingBottom(0)
                    .paddingLeft(8)
                    .paddingRight(8)
                    .text(d)
                    .render()
                    ;
                newTextBox.element()
                    .on("click", function (d2) {
                        context.click(d2.text());
                    })
                    .on("dblclick", function (d2) {
                        context.dblclick(d2.text());
                    })
                    ;
                context._listWidgets[d] = newTextBox;
            })
            ;

        let listHeight = 0;
        let listWidth = 0;
        for (const key in this._listWidgets) {
            if (!this._listWidgets.hasOwnProperty(key)) continue;
            const bbox = this._listWidgets[key].getBBox();
            listHeight += bbox.height;
            if (listWidth < bbox.width)
                listWidth = bbox.width;
        }

        let yPos = -listHeight / 2; // + lineHeight / 2;
        lineEnter.merge(line).each(function (d) {
            const widget = context._listWidgets[d];
            const bbox = widget.getBBox();
            widget
                .pos({ x: 0, y: yPos + bbox.height / 2 })
                .anchor(context.anchor())
                .fixedSize({ width: listWidth, height: bbox.height })
                .render()
                ;
            yPos += bbox.height;
        });
        line.exit()
            .remove()
            .each(function (d) {
                context._listWidgets[d].target(null);
                delete context._listWidgets[d];
            })
            ;
    }

    exit(domNode, element) {
        for (const key in this._listWidgets) {
            if (this._listWidgets.hasOwnProperty(key)) {
                this._listWidgets[key].target(null);
            }
        }
        super.exit(domNode, element);
    }

    //  Events  ---
    click(d) {
        console.log("Click:  " + d);
    }

    dblclick(d) {
        console.log("Double click:  " + d);
    }

    anchor: { (): string; (_: string): List; };
}
List.prototype._class += " common_List";

List.prototype.publish("anchor", "start", "set", "Anchor Position", ["", "start", "middle", "end"], { tags: ["Private"] });
