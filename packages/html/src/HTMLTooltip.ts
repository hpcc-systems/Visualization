import { HTMLWidget, select as d3Select } from "@hpcc-js/common";
import { scopedLogger, ScopedLogging } from "@hpcc-js/util";

type Direction = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
type Position = { x: number, y: number };
type DirectionalBBox = { [key in Direction]: Position; };

type Rectangle = { top: number, left: number, width: number, height: number };
export class HTMLTooltip extends HTMLWidget {

    public _triggerElement;
    public _contentNode;
    protected _prevContentNode;

    protected _tooltipElement;
    protected _arrowElement;
    protected _tooltipHTMLCallback = (data?) => "<b>_tooltipHTMLCallback is undefined</b>";
    protected _logger: ScopedLogging = scopedLogger("html/HTMLTooltip");
    constructor() {
        super();
        this.visible(false);
    }

    tooltipHTML(_: (data?) => string): this {
        this._tooltipHTMLCallback = _;
        return this;
    }

    tooltipContent(_): this {
        if (!arguments.length) return this._contentNode;
        this._contentNode = _;
        return this;
    }

    triggerElement(_): this {
        this._triggerElement = _;
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        const body = d3Select("body");
        this._tooltipElement = body.append("div")
            .attr("class", "tooltip-div")
            .style("z-index", "2147483638")
            .style("position", "fixed")
            ;
        this._arrowElement = body.append("div")
            .attr("class", "arrow-div")
            .style("z-index", "2147483638")
            .style("position", "fixed")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        if (this._contentNode !== this._prevContentNode) {
            const node = this._tooltipElement.node();
            [...node.querySelectorAll("*")]
                .map(n => n.__data__)
                .filter(n => n)
                .forEach(w => {
                    if (typeof w.target === "function") {
                        w.target(null);
                    }
                    if (typeof w.exit === "function") {
                        w.exit();
                    }
                });
            node.innerHTML = "";
            node.appendChild(this._contentNode);
            this._prevContentNode = this._contentNode;
        }

        if (this._contentNode) {
            this.onShowContent(this._contentNode);
        } else {
            this._tooltipElement
                .html(() => {
                    return this._tooltipHTMLCallback(this.data());
                });
        }
        if (this.fitContent()) {
            this._tooltipElement
                .style("width", "auto")
                .style("height", "auto")
                .style("padding", "0px")
                .style("box-sizing", "content-box")
                ;
            const rect = this._tooltipElement.node().getBoundingClientRect();
            this.tooltipWidth_default(rect.width);
            this.tooltipHeight_default(rect.height);
        }
        this._closing = false;
        this._tooltipElement
            .style("background-color", this.tooltipColor())
            .style("color", this.fontColor())
            .style("width", this.tooltipWidth() + "px")
            .style("height", this.tooltipHeight() + "px")
            .style("opacity", 1)
            .style("padding", this.padding() + "px")
            .style("pointer-events", this.enablePointerEvents() ? "all" : "none")
            .style("box-sizing", "content-box")
            ;
        this._arrowElement
            .style("opacity", 1)
            .style("pointer-events", "none")
            ;
        this.updateTooltipPosition();
    }

    onShowContent(node) {

    }

    protected updateTooltipPosition(): Position {
        const bbox = this.calcReferenceBBox();
        const direction = this.calcTooltipDirection(bbox);
        const box = bbox[direction];
        this._tooltipElement
            .style("top", box.y + "px")
            .style("left", box.x + "px")
            ;
        this.setArrowPosition(box, direction);
        return box;
    }

    protected calcTooltipDirection(bbox: DirectionalBBox): Direction {
        const directions: Direction[] = Object.keys(bbox) as Direction[];

        const defaultDirection = this.direction();
        directions.sort((a, b) => a === defaultDirection ? -1 : 1);
        const windowRect = {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
        for (let i = 0; i < directions.length; i++) {
            const tooltipRect = {
                top: bbox[directions[i]].y,
                left: bbox[directions[i]].x,
                width: this.tooltipWidth(),
                height: this.tooltipHeight()
            };
            if (this.rectFits(tooltipRect, windowRect)) {
                return directions[i];
            }
        }
        this._logger.warning(`Tooltip doesn't fit in the window for any of the directions. Defaulting to '${defaultDirection}'`);
        this._logger.debug(windowRect);
        this._logger.debug({
            top: bbox[defaultDirection].y,
            left: bbox[defaultDirection].x,
            width: this.tooltipWidth(),
            height: this.tooltipHeight()
        });
        return defaultDirection;
    }

    protected rectFits(innerRect: Rectangle, outerRect: Rectangle): boolean {
        return (
            innerRect.top >= outerRect.top &&
            innerRect.left >= outerRect.left &&
            innerRect.width + innerRect.left <= outerRect.width + outerRect.left &&
            innerRect.height + innerRect.top <= outerRect.height + outerRect.top
        );
    }

    protected setArrowPosition(point: Position, direction: Direction) {
        let top;
        let left;
        let visibleBorderStyle = "border-top-color";
        this._arrowElement
            .style("border", `${this.arrowHeight()}px solid ${this.tooltipColor()}`)
            .style("border-top-color", "transparent")
            .style("border-right-color", "transparent")
            .style("border-bottom-color", "transparent")
            .style("border-left-color", "transparent")
            ;
        switch (direction) {
            case "n":
                top = point.y + this.tooltipHeight() + (this.padding() * 2);
                left = point.x + (this.tooltipWidth() / 2) - (this.arrowWidth() / 2) + this.padding();
                visibleBorderStyle = "border-top-color";
                this._arrowElement
                    .style("border-top-width", `${this.arrowHeight()}px`)
                    .style("border-bottom-width", "0px")
                    .style("border-left-width", `${this.arrowWidth() / 2}px`)
                    .style("border-right-width", `${this.arrowWidth() / 2}px`)
                    ;
                break;
            case "s":
                top = point.y - this.arrowHeight();
                left = point.x + this.padding() + (this.tooltipWidth() / 2) - (this.arrowWidth() / 2);
                visibleBorderStyle = "border-bottom-color";
                this._arrowElement
                    .style("border-top-width", "0px")
                    .style("border-bottom-width", `${this.arrowHeight()}px`)
                    .style("border-left-width", `${this.arrowWidth() / 2}px`)
                    .style("border-right-width", `${this.arrowWidth() / 2}px`)
                    ;
                break;
            case "e":
                top = point.y + (this.tooltipHeight() / 2) + this.padding() - (this.arrowWidth() / 2);
                left = point.x - this.arrowHeight();
                visibleBorderStyle = "border-right-color";
                this._arrowElement
                    .style("border-top-width", `${this.arrowWidth() / 2}px`)
                    .style("border-bottom-width", `${this.arrowWidth() / 2}px`)
                    .style("border-left-width", "0px")
                    .style("border-right-width", `${this.arrowHeight()}px`)
                    ;
                break;
            case "w":
                top = point.y + (this.tooltipHeight() / 2) - (this.arrowWidth() / 2) + this.padding();
                left = point.x + this.tooltipWidth() + (this.padding() * 2);
                visibleBorderStyle = "border-left-color";
                this._arrowElement
                    .style("border-top-width", `${this.arrowWidth() / 2}px`)
                    .style("border-bottom-width", `${this.arrowWidth() / 2}px`)
                    .style("border-left-width", `${this.arrowHeight()}px`)
                    .style("border-right-width", "0px")
                    ;
                break;
        }
        if (typeof top !== "undefined" && typeof left !== "undefined") {
            this._arrowElement
                .style("top", top + "px")
                .style("left", left + "px")
                .style(visibleBorderStyle, this.tooltipColor())
                .style("opacity", 1)
                ;
        } else {
            this._arrowElement
                .style("opacity", 0)
                ;
        }
        return point;
    }

    protected getReferenceNode() {
        if (!this._triggerElement) {
            return this.element().node().parentNode.parentNode;
        }
        return this._triggerElement.node();
    }
    public _cursorLoc;
    protected calcReferenceBBox() {
        const node = this.getReferenceNode();
        let { top, left, width, height } = node.getBoundingClientRect();
        const wholeW = this.tooltipWidth();
        const wholeH = this.tooltipHeight();
        const halfW = wholeW / 2;
        const halfH = wholeH / 2;
        const arrowH = this.arrowHeight();
        const p = this.padding();
        const p2 = p * 2;

        if (this.followCursor() && this._cursorLoc) {

            left = this._cursorLoc[0];
            top = this._cursorLoc[1];
            width = 1;
            height = 1;
        }
        const bbox = {
            n: {
                x: left + (width / 2) - halfW - p,
                y: top - wholeH - arrowH - p2
            },
            e: {
                x: left + width + arrowH,
                y: top + (height / 2) - halfH - p
            },
            s: {
                x: left + (width / 2) - halfW - p,
                y: top + height + arrowH
            },
            w: {
                x: left - wholeW - arrowH - p2,
                y: top + (height / 2) - halfH - p
            },
            nw: {
                x: left - wholeW - p2,
                y: top - wholeH - p2
            },
            ne: {
                x: left + width,
                y: top - wholeH - p2
            },
            se: {
                x: left + width,
                y: top + height
            },
            sw: {
                x: left - wholeW - p2,
                y: top + height
            }
        };
        return bbox;
    }

    private _closing = false;
    mouseout() {
        this._closing = true;
        this._tooltipElement.on("mouseover", () => {
            this._closing = false;
        });
        this._tooltipElement.on("mouseout", () => {
            this.mouseout();
        });
        setTimeout(() => {
            if (this._closing) {
                this.visible(false);
            }
        }, this.closeDelay());
    }

    visible(): boolean;
    visible(_: boolean): this;
    visible(_?: boolean): boolean | this {
        if (!arguments.length) return super.visible();
        if (this._arrowElement) {
            this._arrowElement.style("visibility", _ ? "visible" : "hidden");
            this._tooltipElement.style("visibility", _ ? "visible" : "hidden");
        }
        super.visible(_);
        return this;
    }

    exit(domNode, element) {
        if (this._arrowElement) {
            this._arrowElement.remove();
            this._tooltipElement.remove();
        }
        super.exit(domNode, element);
    }
}
HTMLTooltip.prototype._class += " html_HTMLTooltip";

export interface HTMLTooltip {
    padding(): number;
    padding(_: number): this;
    direction(): Direction;
    direction(_: Direction): this;
    arrowHeight(): number;
    arrowHeight(_: number): this;
    arrowWidth(): number;
    arrowWidth(_: number): this;
    fontColor(): string;
    fontColor(_: string): this;
    tooltipColor(): string;
    tooltipColor(_: string): this;
    tooltipWidth(): number;
    tooltipWidth(_: number): this;
    tooltipWidth_default(_: number);
    tooltipHeight(): number;
    tooltipHeight(_: number): this;
    tooltipHeight_default(_: number);
    followCursor(): boolean;
    followCursor(_: boolean): this;
    enablePointerEvents(): boolean;
    enablePointerEvents(_: boolean): this;
    closeDelay(): number;
    closeDelay(_: number): this;
    fitContent(): boolean;
    fitContent(_: boolean): this;

}

HTMLTooltip.prototype.publish("fitContent", false, "boolean", "If true, tooltip will grow to fit its html content");
HTMLTooltip.prototype.publish("followCursor", false, "boolean", "If true, tooltip will display relative to cursor location");
HTMLTooltip.prototype.publish("closeDelay", 400, "number", "Number of milliseconds to wait before closing tooltip (cancelled on tooltip mouseover event)");
HTMLTooltip.prototype.publish("direction", "n", "set", "Direction in which to display the tooltip", ["n", "s", "e", "w", "ne", "nw", "se", "sw"]);
HTMLTooltip.prototype.publish("padding", 8, "number", "Padding (pixels)");
HTMLTooltip.prototype.publish("arrowWidth", 16, "number", "Width (or height depending on direction) of the tooltip arrow (pixels)");
HTMLTooltip.prototype.publish("arrowHeight", 8, "number", "Height (or width depending on direction) of the tooltip arrow (pixels)");
HTMLTooltip.prototype.publish("fontColor", "#FFF", "html-color", "The default font color for text in the tooltip");
HTMLTooltip.prototype.publish("tooltipColor", "#000000EE", "html-color", "Background color of the tooltip");
HTMLTooltip.prototype.publish("tooltipWidth", 200, "number", "Width of the tooltip (not including arrow) (pixels)");
HTMLTooltip.prototype.publish("tooltipHeight", 200, "number", "Height of the tooltip (not including arrow) (pixels)");
HTMLTooltip.prototype.publish("enablePointerEvents", false, "boolean", "If true, the 'pointer-events: all' style will be used");
