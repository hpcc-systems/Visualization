import { select as d3Select } from "d3-selection";
import { HTMLWidget } from "./HTMLWidget";

export class Image extends HTMLWidget {
    private _imgElement;

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;
        const img = element.selectAll("img").data(this.source() ? [this.source()] : [], function (d) { return d; });
        img.enter()
            .append("img")
            .attr("src", this.source())
            .style("opacity", 0)
            .on("load", function () {
                context._imgElement = d3Select(this);
                context.styleImageElement();
                context._imgElement.style("opacity", 1);
            })
            ;
        this.styleImageElement();
        img.exit()
            .remove()
            ;
    }

    styleImageElement() {
        if (!this._imgElement) return;
        switch (this.sizing()) {
            case "actual":
                this._imgElement.style("width", "auto");
                this._imgElement.style("height", "auto");
                break;
            case "fit":
                if (this.lockAspectRatio()) {
                    this._imgElement.style("width", "auto");
                    this._imgElement.style("height", "auto");
                    const bbox = this._imgElement.node().getBoundingClientRect();
                    const xScale = bbox.width / this.width();
                    const yScale = bbox.height / this.height();
                    if (xScale > yScale) {
                        this._imgElement.style("width", this.width() + "px");
                        this._imgElement.style("height", (bbox.height / xScale) + "px");
                    } else {
                        this._imgElement.style("width", (bbox.width / yScale) + "px");
                        this._imgElement.style("height", this.height() + "px");
                    }
                } else {
                    this._imgElement.style("width", this.width() + "px");
                    this._imgElement.style("height", this.height() + "px");
                }
                break;
            case "custom":
                this._imgElement.style("width", this.customWidth());
                this._imgElement.style("height", this.customHeight());
                break;
        }
        switch (this.alignment()) {
            case "origin":
                break;
            case "center":
                const bbox = this._imgElement.node().getBoundingClientRect();
                this._imgElement.style("margin-left", `${(this.width() - bbox.width) / 2}px`);
                this._imgElement.style("margin-top", `${(this.height() - bbox.height) / 2}px`);
                break;
        }
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    source: { (): string; (_: string): Image; };
    sizing: { (): string; (_: string): Image; };
    customWidth: { (): string; (_: string): Image; };
    customHeight: { (): string; (_: string): Image; };
    lockAspectRatio: { (): boolean; (_: boolean): Image; };
    alignment: { (): string; (_: string): Image; };
}
Image.prototype._class += " common_Image";

Image.prototype.publish("source", null, "string", "Image Source", null, { tags: ["Basic"] });
Image.prototype.publish("sizing", "actual", "set", "Controls sizing mode", ["actual", "fit", "custom"], { tags: ["Basic"] });
Image.prototype.publish("customWidth", "50%", "string", "Applies this width to IMG element if 'sizing' is set to 'custom' (user should set 'px' or 'em' etc.)", null, { tags: ["Basic"], disable: (w) => w.sizing() !== "custom" });
Image.prototype.publish("customHeight", "20%", "string", "Applies this height to IMG element if 'sizing' is set to 'custom' (user should set 'px' or 'em' etc.)", null, { tags: ["Basic"], disable: (w) => w.sizing() !== "custom" });
Image.prototype.publish("lockAspectRatio", true, "boolean", "Locks the aspect ratio when scaling/stretching", null, { tags: ["Basic"], disable: (w) => w.sizing() !== "fit" });
Image.prototype.publish("alignment", "center", "set", "Image Alignment", ["center", "origin"], { tags: ["Basic"] });
