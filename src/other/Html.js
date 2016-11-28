import { HTMLWidget } from "../common/HTMLWidget";
import "css!./Html";

export function Html() {
    HTMLWidget.call(this);
    this._tag = "div";
}
Html.prototype = Object.create(HTMLWidget.prototype);
Html.prototype.constructor = Html;
Html.prototype._class += " other_Html";

Html.prototype.publish("html", "", "string", "Html to render", null, { tags: ["Basic"] });
Html.prototype.publish("overflowX", null, "set", "CSS overflow-x", ["", "visible", "hidden", "scroll", "auto", "initial", "inherit"], { tags: ["Basic"], optional: true });
Html.prototype.publish("overflowY", null, "set", "CSS overflow-y", ["", "visible", "hidden", "scroll", "auto", "initial", "inherit"], { tags: ["Basic"], optional: true });

Html.prototype.enter = function (domNode, element) {
    HTMLWidget.prototype.enter.apply(this, arguments);
};

Html.prototype.update = function (domNode, element) {
    HTMLWidget.prototype.update.apply(this, arguments);

    element.style({
        "overflow-x": this.overflowX_exists() ? this.overflowX() : "",
        "overflow-y": this.overflowY_exists() ? this.overflowY() : "",
    });

    var html = element.selectAll(".htmlWrapper").data(this.data().length > 0 ? this.data() : [this.html()]);
    html.enter().append("div")
        .attr("class", "htmlWrapper")
        ;
    html
        .html(function (d) { return d; })
        ;
    html.exit().remove();
};
