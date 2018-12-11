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
}
Button.prototype._class += " common_Button";
export interface Button {
    faChar(): string;
    faChar(_: string): this;
    tooltip(): string;
    tooltip(_: string): this;
}
Button.prototype.publish("faChar", "", "string", "FontAwesome class");
Button.prototype.publish("tooltip", "", "string", "Displays as the button alt text attribute");

//  Sticky button  ---
export class StickyButton extends Button {

    enter(domNode: HTMLElement, element) {
        super.enter(domNode, element);
    }

    update(domNode: HTMLElement, element) {
        super.update(domNode, element);
        element
            .classed("selected", this.selected())
            .style("background-color", this.selected() ? this.buttonBackgroundColorSelected() : this.buttonBackgroundColor())
            ;
    }
}
StickyButton.prototype._class += " common_StickyButton";
export interface StickyButton {
    selected(): boolean;
    selected(_: boolean): this;
    buttonBackgroundColor(): string;
    buttonBackgroundColor(_: string): this;
    buttonBackgroundColorSelected(): string;
    buttonBackgroundColorSelected(_: string): this;
}
StickyButton.prototype.publish("selected", false, "boolean");
StickyButton.prototype.publish("buttonBackgroundColor", null, "html-color", "Button background color", { optional: true });
StickyButton.prototype.publish("buttonBackgroundColorSelected", null, "html-color", "Button background color while selected", { optional: true });

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
}
Spacer.prototype._class += " common_Spacer";

export interface Spacer {
    vline(): boolean;
    vline(_: boolean): this;
}
Spacer.prototype.publish("vline", true, "boolean");

//  IconBar  ---
export class IconBar extends HTMLWidget {
    _iconBarElement;    _buttons: Widget[] = [];
    _titleBarHeight: number;
    _padding: number;
    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._iconBarElement = element.append("div")            .attr("class", "icon-bar")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        if (typeof this._titleBarHeight === "undefined" || this._titleBarHeight === 0) {
            this._titleBarHeight = Math.round(this.height() || this.minHeight());
        }
        if (typeof this._padding === "undefined" || this._padding === 0) {
            this._padding = Math.round(this._titleBarHeight / 8);
        }

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
        const icons = this._iconBarElement.selectAll(".icon-bar-item").data(buttons, (d: Widget) => d.id());
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
        const buttonFontSize = Math.round((this._titleBarHeight - (this._padding * 2)) * this.buttonFontSizeRatio());
        icons.order();
        this._iconBarElement.selectAll(".icon-bar-item")
            .style("line-height", `${this._titleBarHeight}px`)
            ;
        this._iconBarElement.selectAll(".icon-bar-item a")
            .style("color", this.buttonFontColor())
            .style("background-color", this.buttonBackgroundColor())
            .style("font-size", `${buttonFontSize}px`)
            .style("line-height", `${this._titleBarHeight}px`)
            .style("height", `${this._titleBarHeight}px`)
            .style("width", `${this._titleBarHeight}px`)
            .style("margin-left", `${this._padding}px`)
            ;
        this._iconBarElement.selectAll(".icon-bar-item .spacer")
            .style("line-height", `${this._titleBarHeight}px`)
            .style("height", `${this._titleBarHeight}px`)
            .style("margin-left", `${this._padding}px`)
            ;
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
    buttonFontColor(): string;
    buttonFontColor(_: string): this;
    buttonBackgroundColor(): string;
    buttonBackgroundColor(_: string): this;
    minHeight(): number;
    minHeight(_: number): this;
    buttonFontSizeRatio(): number;
    buttonFontSizeRatio(_: number): this;
}
IconBar.prototype.publish("minHeight", 22, "number", "Minimum height (pixels)");
IconBar.prototype.publish("buttons", [], "widgetArray", null, { internal: true });
IconBar.prototype.publish("hiddenButtons", [], "widgetArray", null, { internal: true });
IconBar.prototype.publish("buttonFontColor", null, "html-color", "Button font color", null, { optional: true });
IconBar.prototype.publish("buttonFontSizeRatio", 0.7, "number", "Button font size is determined by this ratio of the button size");
IconBar.prototype.publish("buttonBackgroundColor", null, "html-color", "Button background color", null, { optional: true });

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
    _titleWrapper;
    _titleIconElement;
    _titleElement;
    _descriptionElement;
    constructor() {
        super();
    }

    enter(domNode, element) {
        this._titleWrapper = element.append("div")
            .attr("class", "title-title")
            ;
        this._titleIconElement = this._titleWrapper.append("div")
            .attr("class", "title-icon")
            ;
        this._titleWrapper.append<HTMLElement>("div")
            .attr("class", "data-count")
            ;
        this._titleElement = this._titleWrapper.append("div")
            .attr("class", "title-text")
            ;
        this._descriptionElement = this._titleWrapper.append("div")
            .attr("class", "description-text")
            ;

        super.enter(domNode, element);
    }

    update(domNode, element) {
        domNode.parentElement.parentElement.style.minHeight = `${this.minHeight()}px`;
        const grandparentBBox = domNode.parentElement.parentElement.getBoundingClientRect();
        console.log("grandparentBBox.height", grandparentBBox.height);
        console.log("this.minHeight()", this.minHeight());
        const barHeight = Math.round(Math.max(grandparentBBox.height, this.minHeight()));
        console.log("barHeight", barHeight);
        this._padding = Math.round(((1 - this.titleIconFontSizeRatio()) * barHeight) / 2);
        console.log("this._padding", this._padding);
        this._titleBarHeight = barHeight - (this._padding * 2);
        const titleIconFontSize = this.titleIconFontSizeRatio() * barHeight;
        let titleFontSize = this.titleFontSizeRatio() * barHeight;
        let descriptionFontSize = this.descriptionFontSizeRatio() * barHeight;
        const descriptionIsStacked = this.description_exists() && this.descriptionStacked();
        if (descriptionIsStacked) {
            descriptionFontSize = titleFontSize * this.descriptionFontSizeRatio();
            titleFontSize = titleFontSize - descriptionFontSize;
        }

        this._titleWrapper
            .style("color", this.fontColor())
            .style("background-color", this.backgroundColor())
            .style("height", this._titleBarHeight + "px")
            .style("width", `calc(100% - ${this._padding * 2}px)`)
            .style("padding", this._padding + "px")
            ;
        this._titleIconElement
            .style("font-family", this.titleIconFont())
            .style("line-height", `${titleIconFontSize}px`)
            .style("font-size", `${titleIconFontSize}px`)
            .style("width", `${this._titleBarHeight}px`)
            .style("display", this.titleIcon() !== "" ? "inline-block" : "none")
            .text(this.titleIcon())
            ;
        this._titleElement
            .style("font-family", this.titleFont())
            .style("line-height", `${this.description_exists() && descriptionIsStacked ? titleFontSize : this._titleBarHeight}px`)
            .style("font-size", `${titleFontSize}px`)
            .style("position", "absolute")
            .style("left", this.titleIcon() !== "" ? this._titleBarHeight + (this._padding * 3) + "px" : null)
            .style("top", this._padding + "px")
            .text(this.title())
            ;
        let descriptionLeft = this.titleIcon() !== "" ? this._titleBarHeight + (this._padding * 3) : this._padding;
        descriptionLeft += descriptionIsStacked ? 0 : this._titleElement.node().getBoundingClientRect().width + this._padding;
        this._descriptionElement
            .style("font-family", this.descriptionFont())
            .style("display", this.description_exists() ? "block" : "none")
            .style("line-height", descriptionIsStacked ? `${descriptionFontSize}px` : `${this._titleBarHeight}px`)
            .style("font-size", this.description_exists() ? `${descriptionFontSize}px` : null)
            .style("position", "absolute")
            .style("left", descriptionLeft + "px")
            .style("top", descriptionIsStacked ? (this._padding * 2) + titleFontSize + "px" : this._padding + "px")
            .text(this.description())
            ;
        this._iconBarElement
            .style("margin-top", this._padding + "px")
            .style("margin-right", this._padding + "px")
            .style("height", `${this._titleBarHeight}px`)
            ;

        super.update(domNode, element);
    }
}
TitleBar.prototype._class += " common_TitleBar";

export interface TitleBar {
    fontColor(): string;
    fontColor(_: string): this;
    backgroundColor(): string;
    backgroundColor(_: string): this;
    buttonFontColor(): string;
    buttonFontColor(_: string): this;
    buttonBackgroundColor(): string;
    buttonBackgroundColor(_: string): this;
    titleIcon(): string;
    titleIcon(_: string): this;
    titleIconFont(): string;
    titleIconFont(_: string): this;
    titleIconFontSizeRatio(): number;
    titleIconFontSizeRatio(_: number): this;
    title(): string;
    title(_: string): this;
    titleFont(): string;
    titleFont(_: string): this;
    titleFontSize(): number;
    titleFontSize(_: number): this;
    titleFontSize_exists(): boolean;
    titleFontSizeRatio(): number;
    titleFontSizeRatio(_: number): this;
    description(): string;
    description(_: string): this;
    description_exists(): boolean;
    descriptionFont(): string;
    descriptionFont(_: string): this;
    descriptionFontSizeRatio(): number;
    descriptionFontSizeRatio(_: number): this;
    descriptionStacked(): boolean;
    descriptionStacked(_: boolean): this;
}
TitleBar.prototype.publish("fontColor", null, "html-color", "TitleBar font color", null, { optional: true });
TitleBar.prototype.publish("backgroundColor", null, "html-color", "TitleBar background color", null, { optional: true });
TitleBar.prototype.publish("titleIcon", "", "string", "Icon text");
TitleBar.prototype.publish("titleIconFont", "FontAwesome", "string", "Icon font-family");
TitleBar.prototype.publish("titleIconFontSizeRatio", 0.8, "number", "Icon font-size is determined by this ratio of the target height");
TitleBar.prototype.publish("title", "", "string", "Title text");
TitleBar.prototype.publish("titleFont", "", "string", "Title font-family");
TitleBar.prototype.publish("titleFontSize", 16, "number", "Title bar height can be determined by titleFontSize/titleFontRatio (pixels)", null, { optional: true });
TitleBar.prototype.publish("titleFontSizeRatio", 0.618, "number", "Title font-size is determined by this ratio of the target height");
TitleBar.prototype.publish("description", null, "string", "Description text", null, { optional: true });
TitleBar.prototype.publish("descriptionFont", "", "string", "Description font-family");
TitleBar.prototype.publish("descriptionFontSizeRatio", 0.5, "number", "Description font-size is determined by this ratio of the Title font-size");
TitleBar.prototype.publish("descriptionStacked", true, "boolean", "If true, description will display beneath the title (this will affect the font size of both title and description)");
