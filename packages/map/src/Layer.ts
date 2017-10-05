import { ITooltip } from "@hpcc-js/api";
import { Layered } from "./Layered";

export class Layer extends Layered {
    _svgElement;
    _domElement;
    _topoJsonPromise;

    constructor() {
        super();
        ITooltip.call(this);
    }

    layerEnter(base, svgElement, domElement) {
        this._parentOverlay = base._parentOverlay;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._svgElement = this._layersTarget.append("g");
        this._domElement = this._parentOverlay.append("div");
        this.layerEnter(this, this._svgElement, this._domElement);
    }

    layerUpdate(base, forcePath?) {
    }

    update(domNode, element) {
        super.update(domNode, element);
        this.layerUpdate(this);
    }

    onZoomed() {
        super.onZoomed();
        this.layerUpdate(this);
    }

    layerExit(base) {
    }

    exit(domNode, element) {
        this.layerExit(this);
        this._svgElement.remove();
        this._domElement.remove();
        Layered.prototype.exit.apply(this, arguments);
    }

    layerPreRender() {
        return Promise.resolve();
    }

    render(callback?: (w: this) => void): this {
        const context = this;
        const args = arguments;
        this.layerPreRender().then(function () {
            Layered.prototype.render.apply(context, args);
        });
        return this;
    }

    layerZoomed(base) {
    }

    //  ITooltip  ---
    tooltip: any;

    tooltipHTML: (_: any) => any;
    tooltipFormat: (opts: any) => string;
    tooltipStyle: { (): string; (_: string): ITooltip };
    tooltipStyle_exists: () => boolean;
    tooltipValueFormat: { (): string; (_: string): ITooltip };
    tooltipValueFormat_exists: () => boolean;
    tooltipSeriesColor: { (): string; (_: string): ITooltip };
    tooltipSeriesColor_exists: () => boolean;
    tooltipLabelColor: { (): string; (_: string): ITooltip };
    tooltipLabelColor_exists: () => boolean;
    tooltipValueColor: { (): string; (_: string): ITooltip };
    tooltipValueColor_exists: () => boolean;
    tooltipTick: { (): boolean; (_: boolean): ITooltip };
    tooltipTick_exists: () => boolean;
    tooltipOffset: { (): number; (_: number): ITooltip };
    tooltipOffset_exists: () => boolean;
}
Layer.prototype._class += " map_Layer";
Layer.prototype.implements(ITooltip.prototype);
