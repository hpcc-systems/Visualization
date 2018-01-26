import { d3SelectionType, HTMLWidget, publish, publishProxy, Widget } from "@hpcc-js/common";

import "../src/Modal.css";

export class Modal extends HTMLWidget {

    private _widget: Widget;

    private _relativeTarget: HTMLElement;

    private _fade: d3SelectionType;
    private _modal: d3SelectionType;
    private _modalHeader: d3SelectionType;
    private _modalBody: d3SelectionType;
    private _modalHeaderAnnotations: d3SelectionType;
    private _modalHeaderCloseButton: d3SelectionType;
    private _close: any;

    constructor() {
        super();
        this._tag = "div";
    }

    closeModal() {
        if (typeof this._close === "function") {
            this._close();
        }
        this.show(false).render();
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

    setModalSizeLimits() {
        if (this.minHeight() || this.minWidth()) {
            this._modal
                .style("min-height", this.minHeight())
                .style("min-width", this.minWidth())
                .style("max-height", this.maxHeight())
                .style("max-width", this.maxWidth())
                ;
        }
    }

    setFadePosition(rect) {
        this._fade.node().style.top = rect.top + "px";
        this._fade.node().style.left = rect.left + "px";
        this._fade.node().style.width = rect.width + "px";
        this._fade.node().style.height = rect.height + "px";
    }

    setModalPosition(rect) {
        const _node = this._modal.node();
        const contentRect = _node.getBoundingClientRect();
        _node.style.position = "fixed";
        _node.style.top = (rect.top + (rect.height / 2) - (contentRect.height / 2)) + "px";
        _node.style.left = (rect.left + (rect.width / 2) - (contentRect.width / 2)) + "px";
        _node.style.width = contentRect.width + "px";
        _node.style.height = contentRect.height + "px";
        if (this.minHeight() || this.minWidth()) {
            _node.style["min-height"] = this.minHeight();
            _node.style["min-width"] = this.minWidth();
        }
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        const context = this;
        this._fade = element.append("div")
            .classed("layout_Modal-fade", true)
            .classed("layout_Modal-fadeClickable", this.enableClickFadeToClose())
            .classed("layout_Modal-fade-hidden", !this.showFade())
            ;
        const header_h = this.titleFontSize() * 2;
        this._modal = element.append("div")
            .classed("layout_Modal-content", true)
            ;
        this._modalHeader = this._modal.append("div")
            .classed("layout_Modal-header", true)
            .style("color", this.titleFontColor())
            .style("font-size", this.titleFontSize() + "px")
            .style("height", header_h + "px")
            ;
        this._modalBody = this._modal.append("div")
            .classed("layout_Modal-body", true)
            .style("height", `calc( 100% - ${header_h}px )`)
            ;
        this._modalHeader.append("div")
            .classed("layout_Modal-title", true)
            .style("line-height", this.titleFontSize() + "px")
            .style("top", (this.titleFontSize() / 2) + "px")
            .style("left", (this.titleFontSize() / 2) + "px")
            .text(this.title())
            ;

        this._modalHeaderAnnotations = this._modalHeader.append("div")
            .classed("layout_Modal-annotations", true)
            ;
        this._modalHeaderCloseButton = this._modalHeaderAnnotations.append("div")
            .classed("layout_Modal-closeButton", true)
            .html("<i class=\"fa fa-close\"></i>")
            ;

        this._modalHeaderAnnotations
            .style("line-height", this.titleFontSize() + "px")
            .style("right", (this.titleFontSize() / 2) + "px")
            .style("top", (this.titleFontSize() / 2) + "px")
            ;
        this._modalHeaderCloseButton.on("click", function () {
            context.closeModal();
        });
        this._fade.on("click", n => {
            if (this.enableClickFadeToClose()) {
                this.closeModal();
            }
        });

        this.setModalSizeLimits();
    }

    update(domNode, element) {
        super.update(domNode, element);
        if (this.show()) {
            if (!this._widget.target()) {
                this._modalBody.node().innerHTML = "";
                this._widget.target(this._modalBody.node());
            }
            this._widget
                .render(n => {
                    n.resize().render();
                })
                ;
        } else {
            this._widget
                .target(null)
                .render()
                ;
        }
        this.element().style("display", this.show() || this.showPreview() ? null : "none");
        this.element().style("opacity", this.showPreview() ? this.previewOpacity() : this.opacity());
        this._fade
            .classed("layout_Modal-fade-hidden", !this.showFade() || this.showPreview())
            ;
        this._relativeTarget = this.getRelativeTarget();

        this.setModalSizeLimits();

        this._widget.render(n => {
            const rect = this._relativeTarget.getBoundingClientRect();
            this.setFadePosition(rect);
            this.setModalPosition(rect);
        });
    }
}

Modal.prototype._class += " layout_Modal";

export interface Modal {
    show(): boolean;
    show(_: boolean): this;
    showPreview(): boolean;
    showPreview(_: boolean): this;
    showFade(): boolean;
    showFade(_: boolean): this;
    enableClickFadeToClose(): boolean;
    enableClickFadeToClose(_: boolean): this;
    title(): string;
    title(_: string): this;
    titleFontSize(): number;
    titleFontSize(_: number): this;
    opacity(): number;
    opacity(_: number): this;
    previewOpacity(): number;
    previewOpacity(_: number): this;
    titleFontColor(): string;
    titleFontColor(_: string): this;
    relativeTargetId(): string;
    relativeTargetId(_: string): this;
    minWidth(): string;
    minWidth(_: string): this;
    minHeight(): string;
    minHeight(_: string): this;
    maxWidth(): string;
    maxWidth(_: string): this;
    maxHeight(): string;
    maxHeight(_: string): this;
    widget(): Widget;
    widget(_: Widget): this;
}

Modal.prototype.publish("title", null, "string", "title");
Modal.prototype.publish("widget", null, "widget", "widget");
Modal.prototype.publish("titleFontSize", 18, "number", "titleFontSize (in pixels)");
Modal.prototype.publish("opacity", 0.9, "number", "opacity");
Modal.prototype.publish("previewOpacity", 0.7, "number", "previewOpacity");
Modal.prototype.publish("titleFontColor", "#ffffff", "html-color", "titleFontColor");
Modal.prototype.publish("relativeTargetId", null, "string", "relativeTargetId");

Modal.prototype.publish("show", true, "boolean", "show");
Modal.prototype.publish("showPreview", true, "boolean", "show");
Modal.prototype.publish("showFade", true, "boolean", "showFade");
Modal.prototype.publish("enableClickFadeToClose", true, "boolean", "enableClickFadeToClose");

Modal.prototype.publish("minWidth", "400px", "string", "minWidth");
Modal.prototype.publish("minHeight", "400px", "string", "minHeight");
Modal.prototype.publish("maxWidth", "800px", "string", "maxWidth");
Modal.prototype.publish("maxHeight", "800px", "string", "maxHeight");
