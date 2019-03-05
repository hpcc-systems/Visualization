import { PropertyExt, publish } from "./PropertyExt";
import { d3SelectionType } from "./Widget";

export class ProgressBar extends PropertyExt {

    @publish(5000, "number", "Half Life")
    halfLife: publish<this, number>;
    @publish(1.2, "number", "Decay")
    decay: publish<this, number>;
    @publish(2, "number", "Size")
    size: publish<this, number>;
    @publish("#2ed573", "string", "Color")
    color: publish<this, string>;
    @publish(true, "boolean", "Bar Blur")
    blurBar: publish<this, boolean>;
    @publish(50, "number", "Blur Size")
    blurSize: publish<this, number>;
    @publish("#7bed9f", "string", "Blur Color (hex)", null, { optional: true })
    blurColor: publish<this, string>;
    @publish(0.35, "number", "Blur Opacity")
    blurOpacity: publish<this, number>;

    protected _elementID: string;
    protected _running: boolean = false;
    protected _style: d3SelectionType;

    constructor() {
        super();
    }

    calcCSS(halflife: number, perc: number) {
        const bar_size = this.size();
        const bar_color = this.color();
        const blur_opacity = this.blurOpacity();
        const blur_opacity_hex = blur_opacity * 255 >= 16 ? Math.floor(blur_opacity * 255).toString(16).slice(-2) : "00";
        const blur_color = this.blurColor() || bar_color;
        const blur_size = this.blurSize();
        const blur_fx = this.blurBar() ? `background: radial-gradient(ellipse at 50% 50%, ${blur_color}${blur_opacity_hex}, ${blur_color}00, #00000000 ${blur_size}px);` : "";
        return `
            #${this._elementID}::before{
                content:" ";display:block;position:absolute;
                height:${bar_size}px;width:${perc}%;
                left:0;top:0;
                background-color: ${bar_color};
                transition: width ${(halflife / 1000)}s;
            }
            #${this._elementID}::after{
                content:" ";display:block;position:absolute;
                height:${blur_size}px;width:${blur_size * 2}px;
                left:calc(${perc}% - ${blur_size}px);
                top:${-((blur_size / 2) - (bar_size / 2))}px;
                background-color: ${bar_color};
                transition: left ${(halflife / 1000)}s;
                transform: rotate(1deg) translate(-${blur_size / 2.5}px,0px) scale(1.5,0.5);
                ${blur_fx}
            }
        `;
    }

    start() {
        this._running = true;
        this.updateProgress(this.halfLife(), 10);
    }

    finish() {
        this.updateProgress(100, 100);
    }

    enter(domNode, element) {
        this._elementID = element.attr("id");
        if (!this._elementID) throw new Error("Target element requires an id attribute.");
        this._style = element.insert("style");
    }

    exit(_domNode, _element) {
        this._running = false;
        if (this._style)
            this._style.remove();
        delete this._style;
    }

    protected updateProgress(halflife: number, perc: number) {
        if (!this._running) return;
        if (this._style) {
            this._style.html(this.calcCSS(halflife, perc));
        }

        const percLimit = 95;
        halflife *= this.decay();
        perc = perc ? perc : 10;
        if (perc < percLimit) {
            setTimeout(() => {
                const _remaining = 100 - perc;
                this.updateProgress(halflife, perc + (_remaining / 2));
            }, perc === 10 ? 100 : halflife);
        } else if (perc === 100) {
            setTimeout(() => {
                this._running = false;
                if (this._style) {
                    this._style.html("");
                }
            }, halflife);
        }
    }
}
ProgressBar.prototype._class += " common_ProgressBar";
