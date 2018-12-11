import { Button, d3SelectionType, HTMLWidget, IconBar, ISize, TitleBar, Widget } from "@hpcc-js/common";
import "../src/Modal.css";

export class Modal extends HTMLWidget {

    protected _widget: Widget;

    protected _relativeTarget: HTMLElement;

    protected _fade;
    protected _modal;
    protected _modalHeader;
    protected _modalFooter;
    protected _modalBody;
    protected _titleBar: TitleBar;
    protected _footerBar: IconBar;
    protected _closeButton: Button;    _close: () => void;

    constructor() {
        super();
        this._tag = "div";
        this._titleBar = new TitleBar();
        this._footerBar = new IconBar();
        this._closeButton = new Button().faChar("fa-close");
    }

    headerButtons(): Widget[];
    headerButtons(_: Widget[]): this;
    headerButtons(_?: Widget[]): Widget[] | this {
        if (!arguments.length) {
            return this._titleBar.buttons();
        }
        _.push(this._closeButton);
        this._titleBar.buttons(_);
        return this;
    }
    footerButtons(): Widget[];
    footerButtons(_: Widget[]): this;
    footerButtons(_?: Widget[]): Widget[] | this {
        if (!arguments.length) {
            return this._footerBar.buttons();
        }
        _.push(this._closeButton);
        this._footerBar.buttons(_);
        return this;
    }

    closeModal() {
        this.visible(false);
    }

    getRelativeTarget() {
        let relativeTarget;
        if (this.relativeTargetId()) {
            relativeTarget = document.getElementById(this.relativeTargetId());
            if (relativeTarget) {
                return relativeTarget;
            }
        }
        if (!relativeTarget) {
            relativeTarget = this.locateAncestor("layout_Grid");
            if (relativeTarget && relativeTarget.element) {
                return relativeTarget.element().node();
            }
        }
        return document.body;
    }
    getRelativeTargetRect() {
        if (this._relativeTarget === document.body) {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
        return this._relativeTarget.getBoundingClientRect();
    }

    setModalSize(): ISize {
        if (this.fixedHeight() !== null && this.fixedWidth() !== null) {
            this._modal
                .style("height", this.fixedHeight())
                .style("width", this.fixedWidth())
                .style("min-height", null)
                .style("min-width", null)
                .style("max-height", null)
                .style("max-width", null)
                ;
        } else if (this.minHeight() || this.minWidth()) {
            this._modal
                .style("min-height", this.minHeight())
                .style("min-width", this.minWidth())
                .style("max-height", this.maxHeight())
                .style("max-width", this.maxWidth())
                ;
        }
        const modalRect = this._modal.node().getBoundingClientRect();
        const headerRect = this._modalHeader.node().getBoundingClientRect();
        this._modalBody
            .style("height", (modalRect.height - headerRect.height) + "px")
            .style("width", modalRect.width);

        return modalRect;
    }

    setFadePosition(rect) {
        this._fade
            .style("top", rect.top + "px")
            .style("left", rect.left + "px")
            .style("width", rect.width + "px")
            .style("height", rect.height + "px")
            ;
    }

    setModalPosition(rect) {
        const modalRect = this.setModalSize();
        if (this.fixedTop() !== null && this.fixedLeft() !== null) {
            this._modal
                .style("top", `calc(${this.fixedTop()} + ${rect.top}px)`)
                .style("left", `calc(${this.fixedLeft()} + ${rect.left}px)`)
                ;
        } else if (this.fixedHeight() !== null && this.fixedWidth() !== null) {
            this._modal
                .style("top", (rect.top + (rect.height / 2) - (modalRect.height / 2)) + "px")
                .style("left", (rect.left + (rect.width / 2) - (modalRect.width / 2)) + "px")
                ;
        } else if (this.minHeight() || this.minWidth()) {
            const contentRect = this._modal.node().getBoundingClientRect();
            this._modal
                .style("top", (rect.top + (rect.height / 2) - (contentRect.height / 2)) + "px")
                .style("left", (rect.left + (rect.width / 2) - (contentRect.width / 2)) + "px")
                ;
        }
    }

    resize(size?: any): this {
        super.resize();
        if (this._modal) this.setModalSize();
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._fade = element.append("div")
            .classed("layout_Modal-fade", true)
            .classed("layout_Modal-fadeClickable", this.enableClickFadeToClose())
            .classed("layout_Modal-fade-hidden", !this.showFade())
            ;
        const headerHeight = this.headerHeight();
        const footerHeight = this.footerHeight();
        this._modal = element.append("div")
            .classed("layout_Modal-content", true)
            ;
        this._modalHeader = this._modal.append("div")
            .attr("id", this.id() + "_titleBar")
            .attr("class", "layout_Modal-header")
            .style("height", headerHeight + "px")
            ;
        this._modalBody = this._modal.append("div")
            .classed("layout_Modal-body", true)
            .style("height", `calc( 100% - ${headerHeight + footerHeight}px )`)
            ;
        this._modalFooter = this._modal.append("div")
            .attr("id", this.id() + "_footerBar")
            .attr("class", "layout_Modal-footer")
            .style("height", footerHeight + "px")
            ;
        this._titleBar
            .target(this.id() + "_titleBar")
            .titleIcon(this.titleIcon())
            .title(this.title())
            .description(this.description())
            .buttons([
                this._closeButton
            ])
            ;
        this._footerBar
            .target(this.id() + "_footerBar")
            .buttons([
                this._closeButton
            ])
            ;
        this._closeButton.on("click", () => {
            this.closeModal();
        });
        this._fade.on("click", () => {
            if (this.enableClickFadeToClose()) {
                this.closeModal();
            }
        });
    }

    update(domNode, element) {
        super.update(domNode, element);
        element.style("display", this.show() ? null : "none");
        this._fade.classed("layout_Modal-fade-hidden", !this.showFade());
        this._relativeTarget = this.getRelativeTarget();
        this.setModalSize();
        const rect = this.getRelativeTargetRect();
        this.setFadePosition(rect);
        this.setModalPosition(rect);

        if (this.show()) {
            if (!this._widget.target()) {
                this._widget.target(this._modalBody.node());
            }
            this._widget.resize().render();
        } else {
            this._widget
                .target(null)
                .render()
                ;
        }
        this._titleBar.render(tb => {
            this._closeButton.element()
                .on("mouseenter", w => w.element().style("opacity", 0.5))
                .on("mouseleave", w => w.element().style("opacity", 1.0))
                ;
        });
        if (this.footerButtons().length === 0) {
            this._modalBody
                .style("height", `calc(100% - ${this.headerHeight()}px)`)
                ;
        } else {
            this._modalBody
                .style("height", `calc(100% - ${this.headerHeight() + this.footerHeight()}px)`)
                ;
        }
    }

    exit(domNode, element) {
        super.exit(domNode, element);
        if (this._widget) {
            this._widget.target(null);
        }
    }
}
Modal.prototype._class += " layout_Modal";

export interface Modal {
    show(): boolean;
    show(_: boolean): this;
    showFade(): boolean;
    showFade(_: boolean): this;
    enableClickFadeToClose(): boolean;
    enableClickFadeToClose(_: boolean): this;
    title(): string;
    title(_: string): this;
    titleFontColor(): string;
    titleFontColor(_: string): this;
    titleIcon(): string;
    titleIcon(_: string): this;
    description(): string;
    description(_: string): this;

    minWidth(): string;
    minWidth(_: string): this;
    minHeight(): string;
    minHeight(_: string): this;
    maxWidth(): string;
    maxWidth(_: string): this;
    maxHeight(): string;
    maxHeight(_: string): this;
    fixedWidth(): string;
    fixedWidth(_: string): this;
    fixedHeight(): string;
    fixedHeight(_: string): this;
    fixedTop(): string;
    fixedTop(_: string): this;
    fixedLeft(): string;
    fixedLeft(_: string): this;
    relativeTargetId(): string;
    relativeTargetId(_: string): this;
    relativeTargetId_exists(): boolean;
    widget(): Widget;
    widget(_: Widget): this;
    headerHeight(): number;
    headerHeight(_: number): this;
    footerHeight(): number;
    footerHeight(_: number): this;
}
Modal.prototype.publishProxy("titleIcon", "_titleBar");
Modal.prototype.publishProxy("title", "_titleBar");
Modal.prototype.publishProxy("description", "_titleBar");
Modal.prototype.publishProxy("fontColor", "_titleBar");
Modal.prototype.publishProxy("backgroundColor", "_titleBar");
Modal.prototype.publishProxy("buttonFontColor", "_titleBar");
Modal.prototype.publishProxy("buttonBackgroundColor", "_titleBar");
Modal.prototype.publish("headerHeight", 32, "number", "Height of the modal header (pixels)");
Modal.prototype.publish("footerHeight", 32, "number", "Height of the modal footer (pixels)");
Modal.prototype.publish("widget", null, "widget", "Widget to be displayed in the modal");
Modal.prototype.publish("titleFontColor", "#ffffff", "html-color", "titleFontColor");
Modal.prototype.publish("relativeTargetId", null, "string", "relativeTargetId");

Modal.prototype.publish("show", true, "boolean", "If true, the modal will be shown");
Modal.prototype.publish("showFade", true, "boolean", "Show the semi transparent modal fade behind the modal to deemphasize background content while the modal is open");
Modal.prototype.publish("showClose", true, "boolean", "Show the close 'x' in the top right corner of the modal");
Modal.prototype.publish("enableClickFadeToClose", true, "boolean", "If true, clicking the modal fade will close the modal");
Modal.prototype.publish("minWidth", "400px", "string", "Minimum width of the modal (pixels)");
Modal.prototype.publish("minHeight", "400px", "string", "Minimum height of the modal (pixels)");
Modal.prototype.publish("maxWidth", "800px", "string", "Maximum width of the modal (pixels)");
Modal.prototype.publish("maxHeight", "800px", "string", "Maximum height of the modal (pixels)");
Modal.prototype.publish("fixedWidth", null, "string", "Fixed width of the modal (CSS length string)");
Modal.prototype.publish("fixedHeight", null, "string", "Fixed height of the modal (CSS length string)");
Modal.prototype.publish("fixedTop", null, "string", "Fixed top position of the modal (CSS length string)");
Modal.prototype.publish("fixedLeft", null, "string", "Fixed left position of the modal (CSS length string)");
Modal.prototype.publishProxy("titleIconFont", "_titleBar");
Modal.prototype.publishProxy("titleIconFontSizeRatio", "_titleBar");
Modal.prototype.publishProxy("titleFont", "_titleBar");
Modal.prototype.publishProxy("titleFontSizeRatio", "_titleBar");
Modal.prototype.publishProxy("descriptionFont", "_titleBar");
Modal.prototype.publishProxy("descriptionFontSizeRatio", "_titleBar");
Modal.prototype.publishProxy("descriptionStacked", "_titleBar");
