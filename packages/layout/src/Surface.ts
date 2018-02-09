import { HTMLWidget, Widget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";

import "../src/Surface.css";

export class Surface extends HTMLWidget {
    _surfaceButtons;

    constructor() {
        super();

        this._tag = "div";
        this._surfaceButtons = [];
    }

    widgetSize(titleDiv, widgetDiv) {
        let width = this.clientWidth();
        let height = this.clientHeight();
        if (this.title()) {
            height -= this.calcHeight(titleDiv);
        }
        height -= this.calcFrameHeight(widgetDiv);
        width -= this.calcFrameWidth(widgetDiv);
        return { width, height };
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element2) {
        super.update(domNode, element2);
        const context = this;

        element2
            .classed("shadow2", this.surfaceShadow())
            .style("border-width", this.surfaceBorderWidth_exists() ? this.surfaceBorderWidth() + "px" : null)
            .style("border-color", this.surfaceBorderColor())
            .style("border-radius", this.surfaceBorderRadius_exists() ? this.surfaceBorderRadius() + "px" : null)
            .style("background-color", this.surfaceBackgroundColor())
            ;

        const titles = element2.selectAll(".surfaceTitle").data(this.title() ? [this.title()] : []);
        titles.enter().insert("h3", "div")
            .attr("class", "surfaceTitle")
            .merge(titles)
            .text(function (d) { return d; })
            .style("text-align", this.surfaceTitleAlignment())
            .style("color", this.surfaceTitleFontColor())
            .style("font-size", this.surfaceTitleFontSize_exists() ? this.surfaceTitleFontSize() + "px" : null)
            .style("font-family", this.surfaceTitleFontFamily())
            .style("font-weight", this.surfaceTitleFontBold() ? "bold" : "normal")
            .style("background-color", this.surfaceTitleBackgroundColor())
            .style("padding", this.surfaceTitlePadding_exists() ? this.surfaceTitlePadding() + "px" : null)
            ;
        titles.exit().remove();

        const surfaceTitle = element2.select(".surfaceTitle");

        const surfaceButtons = surfaceTitle.append("div").attr("class", "html-button-container").selectAll(".surface-button").data(this.buttonAnnotations());
        surfaceButtons.enter().append("button").classed("surface-button", true)
            .each(function (button, idx) {
                const el = context._surfaceButtons[idx] = d3Select(this)
                    .attr("class", "surface-button" + (button.class ? " " + button.class : ""))
                    .attr("id", button.id)
                    .style("padding", button.padding)
                    .style("width", button.width)
                    .style("height", button.height)
                    .style("cursor", "pointer");
                if (button.font === "FontAwesome") {
                    el
                        .style("background", "transparent")
                        .style("border", "none")
                        .on("click", function (d) { context.click(d); })
                        .append("i")
                        .attr("class", "fa")
                        .text(function () { return button.label; });
                } else {
                    el
                        .text(function () { return button.label; })
                        .on("click", function (d) { context.click(d); });
                }
            })
            ;
        surfaceButtons.exit()
            .each(function (_d, idx) {
                const element = d3Select(this);
                delete context._surfaceButtons[idx];
                element.remove();
            })
            ;
        const widgets = element2.selectAll("#" + this._id + " > .surfaceWidget").data(this.widget() ? [this.widget()] : [], function (d) { return d._id; });

        widgets.enter().append("div")
            .attr("class", "surfaceWidget")
            .each(function (d) {
                d3Select(context.element().node().parentElement).classed("content-icon content-icon-" + (d.classID().split("_")[1]), true);
                d.target(this);
            })
            .merge(widgets)
            .style("padding", this.surfacePadding_exists() ? this.surfacePadding() + "px" : null)
            .each(function (d) {
                const widgetSize = context.widgetSize(element2.select("h3"), d3Select(this));
                if (widgetSize.width < 0) widgetSize.width = 0;
                if (widgetSize.height < 0) widgetSize.height = 0;
                d
                    .resize({ width: widgetSize.width, height: widgetSize.height })
                    ;
            })
            ;
        widgets.exit().each(function (d) {
            d.target(null);
        }).remove();
    }

    exit(domNode, element) {
        if (this.widget()) {
            this.widget(null);
            this.render();
        }
        super.exit(domNode, element);
    }

    surfaceTitlePadding_exists: () => boolean;
    surfaceTitleFontSize_exists: () => boolean;
    surfacePadding_exists: () => boolean;
    surfaceBorderWidth_exists: () => boolean;
    surfaceBorderRadius_exists: () => boolean;

    //  Events  ---
    click(obj) {
        console.log("Clicked: " + obj.id);
    }
}
Surface.prototype._class += " layout_Surface";

export interface Surface {
    title(): string;
    title(_: string): this;
    surfaceTitlePadding(): number;
    surfaceTitlePadding(_: number): this;
    surfaceTitleFontSize(): number;
    surfaceTitleFontSize(_: number): this;
    surfaceTitleFontColor(): string;
    surfaceTitleFontColor(_: string): this;
    surfaceTitleFontFamily(): string;
    surfaceTitleFontFamily(_: string): this;
    surfaceTitleFontBold(): boolean;
    surfaceTitleFontBold(_: boolean): this;
    surfaceTitleBackgroundColor(): string;
    surfaceTitleBackgroundColor(_: string): this;
    surfaceTitleAlignment(): string;
    surfaceTitleAlignment(_: string): this;
    surfaceShadow(): boolean;
    surfaceShadow(_: boolean): this;
    surfacePadding(): string;
    surfacePadding(_: string): this;
    surfaceBackgroundColor(): string;
    surfaceBackgroundColor(_: string): this;
    surfaceBorderWidth(): number;
    surfaceBorderWidth(_: number): this;
    surfaceBorderColor(): string;
    surfaceBorderColor(_: string): this;
    surfaceBorderRadius(): number;
    surfaceBorderRadius(_: number): this;
    buttonAnnotations(): any[];
    buttonAnnotations(_: any[]): this;
    widget(): Widget;
    widget(_: Widget): this;
}
Surface.prototype.publish("title", "", "string", "Title", null, { tags: ["Intermediate"] });
Surface.prototype.publish("surfaceTitlePadding", null, "number", "Title Padding (px)", null, { tags: ["Advanced"], disable: (w: any) => !w.title() });
Surface.prototype.publish("surfaceTitleFontSize", null, "number", "Title Font Size (px)", null, { tags: ["Advanced"], disable: (w: any) => !w.title() });
Surface.prototype.publish("surfaceTitleFontColor", null, "html-color", "Title Font Color", null, { tags: ["Advanced"], disable: (w: any) => !w.title() });
Surface.prototype.publish("surfaceTitleFontFamily", null, "string", "Title Font Family", null, { tags: ["Advanced"], disable: (w: any) => !w.title() });
Surface.prototype.publish("surfaceTitleFontBold", true, "boolean", "Enable Bold Title Font", null, { tags: ["Advanced"], disable: (w: any) => !w.title() });
Surface.prototype.publish("surfaceTitleBackgroundColor", null, "html-color", "Title Background Color", null, { tags: ["Advanced"], disable: (w: any) => !w.title() });
Surface.prototype.publish("surfaceTitleAlignment", "center", "set", "Title Alignment", ["left", "right", "center"], { tags: ["Basic"], disable: (w: any) => !w.title() });
Surface.prototype.publish("surfaceShadow", false, "boolean", "3D Shadow");
Surface.prototype.publish("surfacePadding", null, "string", "Surface Padding (px)", null, { tags: ["Intermediate"] });
Surface.prototype.publish("surfaceBackgroundColor", null, "html-color", "Surface Background Color", null, { tags: ["Advanced"] });
Surface.prototype.publish("surfaceBorderWidth", null, "number", "Surface Border Width (px)", null, { tags: ["Advanced"] });
Surface.prototype.publish("surfaceBorderColor", null, "html-color", "Surface Border Color", null, { tags: ["Advanced"] });
Surface.prototype.publish("surfaceBorderRadius", null, "number", "Surface Border Radius (px)", null, { tags: ["Advanced"] });
Surface.prototype.publish("buttonAnnotations", [], "array", "Button Array", null, { tags: ["Private"] });
Surface.prototype.publish("widget", null, "widget", "Widget", null, { tags: ["Basic"] });
