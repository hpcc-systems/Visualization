import { HTMLWidget } from "@hpcc-js/common";

import "../src/Html.css";

export class Html extends HTMLWidget {
    constructor() {
        super();

        this._tag = "div";
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);

        element
            .style("overflow-x", this.overflowX_exists() ? this.overflowX() : "")
            .style("overflow-y", this.overflowY_exists() ? this.overflowY() : "")
            ;

        const html = element.selectAll(".htmlWrapper").data(this.data().length > 0 ? this.data() : [this.html()]);
        html.enter().append("div")
            .attr("class", "htmlWrapper")
            .merge(html)
            .html(function (d) { return d; })
            ;
        html.exit().remove();
    }
}
Html.prototype._class += " other_Html";

export interface Html {
    html(): string;
    html(_: string): Html;
    overflowX(): string;
    overflowX(_: string): Html;
    overflowX_exists(): boolean;
    overflowY(): string;
    overflowY(_: string): Html;
    overflowY_exists(): boolean;
}

Html.prototype.publish("html", "", "string", "Html to render", null, { tags: ["Basic"] });
Html.prototype.publish("overflowX", null, "set", "CSS overflow-x", ["", "visible", "hidden", "scroll", "auto", "initial", "inherit"], { tags: ["Basic"], optional: true });
Html.prototype.publish("overflowY", null, "set", "CSS overflow-y", ["", "visible", "hidden", "scroll", "auto", "initial", "inherit"], { tags: ["Basic"], optional: true });
