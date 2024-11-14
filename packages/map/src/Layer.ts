import { ITooltip } from "@hpcc-js/api";
import { Layered } from "./Layered.ts";

export class Layer extends Layered {
    _svgElement;
    _domElement;
    _topoJsonPromise;

    constructor() {
        super();
        ITooltip.call(this);
    }

    //  Disable Glow For Layers ---
    svgGlowID(): string {
        return "";
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
        super.exit(domNode, element);
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
}
Layer.prototype._class += " map_Layer";
Layer.prototype.implements(ITooltip.prototype);

export interface Layer {
    //  ITooltip  ---
    tooltip: any;

    tooltipHTML(_: any): any;
    tooltipFormat(opts: any): string;
    tooltipStyle(): string;
    tooltipStyle(_: string): Layer;
    tooltipStyle_exists(): boolean;
    tooltipValueFormat(): string;
    tooltipValueFormat(_: string): Layer;
    tooltipValueFormat_exists(): boolean;
    tooltipSeriesColor(): string;
    tooltipSeriesColor(_: string): Layer;
    tooltipSeriesColor_exists(): boolean;
    tooltipLabelColor(): string;
    tooltipLabelColor(_: string): Layer;
    tooltipLabelColor_exists(): boolean;
    tooltipValueColor(): string;
    tooltipValueColor(_: string): Layer;
    tooltipValueColor_exists(): boolean;
    tooltipTick(): boolean;
    tooltipTick(_: boolean): Layer;
    tooltipTick_exists(): boolean;
    tooltipOffset(): number;
    tooltipOffset(_: number): Layer;
    tooltipOffset_exists(): boolean;
}
