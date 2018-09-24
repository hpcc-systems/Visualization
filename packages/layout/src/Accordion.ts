import { FAChar, HTMLWidget } from "@hpcc-js/common";

import "../src/Accordion.css";

export class Accordion extends HTMLWidget {
    protected _isClosed: boolean;
    titleSpan;
    iconDiv;
    ul;
    icon;

    constructor() {
        super();

        this._tag = "div";
        this._isClosed = false;
    }

    pushListItem(widget, prepend: boolean = false, protect: boolean = false) {
        const contentArr = this.content();

        widget._protected = protect;

        if (prepend) {
            contentArr.unshift(widget);
        } else {
            contentArr.push(widget);
        }
        this.content(contentArr);
        return this;
    }

    clearListItems() {
        const arr = [];
        for (const i in this.content()) {
            if (this.content()[i]._protected) {
                arr.push(this.content()[i]);
            }
        }
        this.content(arr);
        return this;
    }

    collapseClick(element) {
        if (element.classed("closed")) {
            this._isClosed = false;
            element.classed("open", true);
            element.classed("closed", false);
        } else {
            this._isClosed = true;
            element.classed("open", false);
            element.classed("closed", true);
        }
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        const context = this;
        this._isClosed = this.defaultCollapsed();
        element.classed(this._isClosed ? "closed" : "open", true);

        this.titleSpan = element.append("span").classed("collapsible-title", true);
        this.iconDiv = element.append("div").classed("collapsible-icon", true);
        this.ul = element.append("ul");

        this.icon = new FAChar()
            .size({ height: 24, width: 24 })
            .target(this.iconDiv.node());

        this.iconDiv.on("click", function () {
            context.collapseClick(element);
            context.render();
        });
        this.titleSpan.on("click", function () {
            context.collapseClick(element);
            context.render();
        });
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        const context = this;
        const this_id = "";
        this.titleSpan.text(context.title().length > 0 ? context.title() + this_id : "Accordion [" + context._id + "]" + this_id);
        const rows = this.ul.selectAll("#" + context._id + " > ul > li").data(this.content(), function (d) {
            return d._id;
        });
        rows.enter()
            .append(function (widget) {
                const li = document.createElement("li");
                if (widget._target === null) {
                    const wSize = widget.size();
                    if (wSize.width === 0 || wSize.height === 0) {
                        const cSize = context.size();
                        widget.size({
                            width: cSize.width,
                            height: cSize.width
                        });
                    }
                    widget.target(li);
                } else {
                    return widget._target;
                }
                return li;
            })
            ;
        rows.exit().remove();

        this.icon
            .text_colorFill(this.titleFontColor())
            .char(this._isClosed ? this.closedIcon() : this.openIcon()).render()
            ;
    }

    exit(domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    }

    content: { (): any[]; (_: any[]): Accordion; };
    title: { (): string; (_: string): Accordion; };
    openIcon: { (): string; (_: string): Accordion; };
    closedIcon: { (): string; (_: string): Accordion; };
    titleFontColor: { (): string; (_: string): Accordion; };
    titleBackgroundColor: { (): any; (_: any): Accordion; };
    defaultCollapsed: { (): boolean; (_: boolean): Accordion; };
}
Accordion.prototype._class += " layout_Accordion";

Accordion.prototype.publish("content", [], "widgetArray", "Array of widgets", null, { tags: ["Basic"] });
Accordion.prototype.publish("title", "", "string", "Title of collapsible section", null, { tags: ["Private"] });
Accordion.prototype.publish("openIcon", "\uf147", "string", "Icon to display when list is open", null, { tags: ["Private"] });
Accordion.prototype.publish("closedIcon", "\uf196", "string", "Icon to display when list is closed", null, { tags: ["Private"] });
Accordion.prototype.publish("titleFontColor", "#FFFFFF", "html-color", "Title font color", null, { tags: ["Private"] });
Accordion.prototype.publish("titleBackgroundColor", "#333333", "html-color", "Title background color", null, { tags: ["Private"] });

Accordion.prototype.publish("defaultCollapsed", false, "boolean", "Collapsed by default if true", null, { tags: ["Private"] });
