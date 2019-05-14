import { event as d3Event } from "d3-selection";
import { HTMLWidget } from "./HTMLWidget";
import { Widget } from "./Widget";

import "../src/TitleBar.css";

//  Lite button for titlebar  ---
export class Button extends HTMLWidget {
    private _enabled = true;

    constructor() {
        super();
        this._tag = "a";
    }

    enter(domNode: HTMLElement, element) {
        super.enter(domNode, element);
        const context = this;
        element
            .attr("href", "#")
            .on("click", function () {
                context.click();
                d3Event.preventDefault();
            })
            .on("mousemove", this.mouseMove)
            .on("mouseout", this.mouseOut)
            .append("i")
            .attr("class", `fa ${this.faChar()} fa-lg fa-fw`)
            ;
    }

    update(domNode: HTMLElement, element) {
        super.update(domNode, element);
        element
            .classed("disabled", !this.enabled())
            .attr("title", this.tooltip())
            .style("height", this.fixedHeight() + "px")
            ;
    }

    //  Events  ---
    click() {
    }

    mouseMove(d, idx, groups) {
    }

    mouseOut(d, idx, groups) {
    }

    enabled(): boolean;
    enabled(_: boolean): this;
    enabled(_?: boolean): boolean | this {
        if (!arguments.length) return this._enabled;
        this._enabled = _;
        return this;
    }

    getBBox(refresh = false, round = false) {
        if (refresh || this._boundingBox === null) {
            const domNode = this._element.node() ? this._element.node() : null;
            if (domNode instanceof Element) {
                const rect = domNode.getBoundingClientRect();
                this._boundingBox = {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height
                };
            }
        }
        if (this._boundingBox === null) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }
        return {
            x: (round ? Math.round(this._boundingBox.x) : this._boundingBox.x) * this._widgetScale,
            y: (round ? Math.round(this._boundingBox.y) : this._boundingBox.y) * this._widgetScale,
            width: (round ? Math.round(this._boundingBox.width) : this._boundingBox.width) * this._widgetScale,
            height: (round ? Math.round(this._boundingBox.height) : this._boundingBox.height) * this._widgetScale
        };
    }

}
Button.prototype._class += " common_Button";
export interface Button {
    faChar(): string;
    faChar(_: string): this;
    tooltip(): string;
    tooltip(_: string): this;
    fixedHeight(): number;
    fixedHeight(_: number): this;
}
Button.prototype.publish("faChar", "", "string", "FontAwesome class");
Button.prototype.publish("tooltip", "", "string", "Displays as the button alt text attribute");
Button.prototype.publish("fixedHeight", 28, "number", "Fixed height of spacer (pixels)");

//  Sticky button  ---
export class StickyButton extends Button {

    enter(domNode: HTMLElement, element) {
        super.enter(domNode, element);
    }

    update(domNode: HTMLElement, element) {
        super.update(domNode, element);
        element.classed("selected", this.selected());
    }
}
StickyButton.prototype._class += " common_StickyButton";
export interface StickyButton {
    selected(): boolean;
    selected(_: boolean): this;
}
StickyButton.prototype.publish("selected", false, "boolean");

//  Toggle button  ---
export class ToggleButton extends StickyButton {

    enter(domNode: HTMLElement, element) {
        element.on("click.sel", (d, idx, groups) => {
            this
                .selected(!this.selected())
                .render()
                ;
            d3Event.preventDefault();
        });
        super.enter(domNode, element);
    }
}
ToggleButton.prototype._class += " common_ToggleButton";

//  Spacer  ---
export class Spacer extends HTMLWidget {

    enter(domNode: HTMLElement, element) {
        super.enter(domNode, element);
        element
            .attr("class", this.vline() ? "spacer vline" : "spacer")
            .attr("href", "#")
            .append("i")
            ;
    }
    update(domNode: HTMLElement, element) {
        super.enter(domNode, element);
        element
            // .style("height", this.fixedHeight() + "px")
            ;
    }
}
Spacer.prototype._class += " common_Spacer";

export interface Spacer {
    vline(): boolean;
    vline(_: boolean): this;
    fixedHeight(): number;
    fixedHeight(_: number): this;
}
Spacer.prototype.publish("vline", true, "boolean");
Spacer.prototype.publish("fixedHeight", 28, "number", "Fixed height of spacer (pixels)");

//  IconBar  ---
export class IconBar extends HTMLWidget {
    _divIconBar;
    _buttons: Widget[] = [];

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._divIconBar = element.append("div")
            .attr("class", "icon-bar")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        let buttons = this.buttons().filter(button => this.hiddenButtons().indexOf(button) < 0);
        buttons = buttons.reduce((prev, item, idx) => {
            if (item instanceof Spacer) {
                if ((prev.length === 0 || idx === buttons.length - 1)) {
                    return prev;
                } else if (buttons[idx + 1] instanceof Spacer) {
                    return prev;
                }
            }
            prev.push(item);
            return prev;
        }, []);
        const icons = this._divIconBar.selectAll(".icon-bar-item").data(buttons, (d: Widget) => d.id());
        const bbox = this.getBBox();
        if (this.id() === "_w178") {
            console.log("this.id()", this.id());
            console.log("bbox", bbox);
            console.log("this.element().node()", this.element().node());
        }
        icons.enter().append("div")
            .attr("class", "icon-bar-item")
            .each(function (this: HTMLElement, d: Widget) {
                d.target(this);
            })
            .merge(icons)
            .each(function (d: Widget) {
                d.render();
            })
            ;
        icons.exit()
            .each(function (d: Widget) {
                d.target(null);
            })
            .remove()
            ;
        icons.order();
    }

    exit(domNode, element) {
        this.buttons().forEach(b => b.target(null));
        super.exit(domNode, element);
    }
}
IconBar.prototype._class += " common_IconBar";

export interface IconBar {
    buttons(): Widget[];
    buttons(_: Widget[]): this;
    hiddenButtons(): Widget[];
    hiddenButtons(_: Widget[]): this;
}
IconBar.prototype.publish("buttons", [], "widgetArray", null, { internal: true });
IconBar.prototype.publish("hiddenButtons", [], "widgetArray", null, { internal: true });

//  SelectionBar  ---
export class SelectionButton extends StickyButton {
    _owner: SelectionBar;

    enter(domNode: HTMLElement, element) {
        element.on("click.sel", (d, idx, groups) => {
            this.selected(true).render();
            d3Event.preventDefault();
        });
        super.enter(domNode, element);
    }

    selected(): boolean;
    selected(_: boolean): this;
    selected(_?: boolean): boolean | this {
        const retVal = super.selected.apply(this, arguments);
        if (_ && this._owner) {
            this._owner.buttons().filter(sb => sb !== this && sb instanceof SelectionButton).forEach((sb: SelectionButton) => sb.selected(false).render());
            this._owner.selected(this);
        }
        return retVal;
    }
}
SelectionButton.prototype._class += " common_SelectionButton";

export class SelectionBar extends IconBar {

    buttons(): Array<SelectionButton | Spacer>;
    buttons(_: Array<SelectionButton | Spacer>): this;
    buttons(_?: Array<SelectionButton | Spacer>): Array<SelectionButton | Spacer> | this {
        const retVal = super.buttons.apply(this, arguments);
        if (arguments.length) {
            _.filter(b => b instanceof SelectionButton).forEach((sb: SelectionButton) => {
                sb._owner = this;
            });
        }
        return retVal;
    }

    //  Events ---
    selected(row: SelectionButton) {
    }
}
SelectionBar.prototype._class += " common_SelectionBar";

//  Titlebar  ---
export class TitleBar extends IconBar {

    _divTitle;
    _divTitleIcon;
    _divTitleText;
    _divDescriptionText;

    constructor() {
        super();
    }

    enter(domNode, element) {
        this._divTitle = element.append("div")
            .attr("class", "title-title")
            ;
        this._divTitleIcon = this._divTitle.append("div")
            .attr("class", "title-icon")
            .style("font-family", this.titleIconFont())
            .style("font-size", `${this.titleIconFontSize()}px`)
            .style("width", `${this.titleIconFontSize()}px`)
            .style("color", this.titleIconFontColor_exists() ? this.titleIconFontColor() : null)
            ;
        this._divTitle.append("div")
            .attr("class", "data-count")
            ;
        this._divTitleText = this._divTitle.append("div")
            .attr("class", "title-text")
            .style("font-family", this.titleFont())
            .style("font-size", `${this.titleFontSize()}px`)
            .style("font-weight", this.titleFontBold() ? "bold" : "normal")
            .style("color", this.titleFontColor_exists() ? this.titleFontColor() : null)
            ;
        this._divDescriptionText = this._divTitle.append("div")
            .attr("class", "description-text")
            .style("font-family", this.descriptionFont())
            ;

        super.enter(domNode, element);
    }

    update(domNode, element) {
        element.style("background-color", this.titleBackgroundColor());
        this._divTitleIcon
            .text(this.titleIcon())
            .style("display", this.titleIcon() !== "" ? "inline-block" : "none")
            ;
        this._divTitleText
            .text(this.title())
            ;
        this._divDescriptionText
            .style("display", this.description_exists() ? "block" : "none")
            .style("font-size", this.description_exists() ? `${this.descriptionFontSize()}px` : null)
            .style("line-height", this.description_exists() ? `${this.descriptionFontSize()}px` : null)
            .text(this.description())
            ;

        super.update(domNode, element);
    }
}
TitleBar.prototype._class += " common_TitleBar";

export interface TitleBar {
    title(): string;
    title(_: string): this;
    titleIcon(): string;
    titleIcon(_: string): this;
    titleIconFont(): string;
    titleIconFont(_: string): this;
    titleIconFontColor(): string;
    titleIconFontColor(_: string): this;
    titleIconFontColor_exists(): boolean;
    titleBackgroundColor(): string;
    titleBackgroundColor(_: string): this;
    titleFont(): string;
    titleFont(_: string): this;
    titleFontBold(): boolean;
    titleFontBold(_: boolean): this;
    titleFontColor(): string;
    titleFontColor(_: string): this;
    titleFontColor_exists(): boolean;
    titleIconFontSize(): number;
    titleIconFontSize(_: number): this;
    titleFontSize(): number;
    titleFontSize(_: number): this;
    description(): string;
    description(_: string): this;
    description_exists(): boolean;
    descriptionFont(): string;
    descriptionFont(_: string): this;
    descriptionFontSize(): number;
    descriptionFontSize(_: number): this;
}
TitleBar.prototype.publish("titleIcon", "", "string", "Icon text");
TitleBar.prototype.publish("titleIconFont", "", "string", "Icon font-family");
TitleBar.prototype.publish("titleIconFontColor", null, "html-color", "Icon font color");
TitleBar.prototype.publish("titleIconFontSize", 28, "number", "Icon font-size (pixels)");
TitleBar.prototype.publish("titleBackgroundColor", null, "html-color", "Color of background");
TitleBar.prototype.publish("title", "", "string", "Title text");
TitleBar.prototype.publish("titleFont", "", "string", "Title font-family");
TitleBar.prototype.publish("titleFontBold", false, "string", "If true, title font-weight is bold");
TitleBar.prototype.publish("titleFontColor", null, "html-color", "Color of the title font");
TitleBar.prototype.publish("titleFontSize", 20, "number", "Title font-size (pixels)");
TitleBar.prototype.publish("description", null, "string", "Description text", null, { optional: true });
TitleBar.prototype.publish("descriptionFont", "", "string", "Description font-family");
TitleBar.prototype.publish("descriptionFontSize", 10, "number", "Description font-size (pixels)");
