import { HTMLWidget } from "@hpcc-js/common";

import "../src/Html.css";

export class Html extends HTMLWidget {
    constructor() {
        super();

        this._tag = "div";
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        element.style({
            "overflow-x": this.overflowX_exists() ? this.overflowX() : "",
            "overflow-y": this.overflowY_exists() ? this.overflowY() : "",
        });

        const html = element.selectAll(".htmlWrapper").data(this.data().length > 0 ? this.data() : [this.html()]);
        html.enter().append("div")
            .attr("class", "htmlWrapper")
            .merge(html)
            .html(function (d) { return d; })
            ;
        html.exit().remove();
    }

    html_exists: () => boolean;
    overflowX_exists: () => boolean;
    overflowY_exists: () => boolean;
}
Html.prototype._class += " other_Html";

export interface Html {
    html(): string;
    html(_: string): this;
    overflowX(): string;
    overflowX(_: string): this;
    overflowY(): string;
    overflowY(_: string): this;
}
Html.prototype.publish("html", "", "string", "Html to render", null, { tags: ["Basic"] });
Html.prototype.publish("overflowX", null, "set", "CSS overflow-x", ["", "visible", "hidden", "scroll", "auto", "initial", "inherit"], { tags: ["Basic"], optional: true });
Html.prototype.publish("overflowY", null, "set", "CSS overflow-y", ["", "visible", "hidden", "scroll", "auto", "initial", "inherit"], { tags: ["Basic"], optional: true });
