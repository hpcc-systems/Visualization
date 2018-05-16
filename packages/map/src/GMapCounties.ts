import { Widget } from "@hpcc-js/common";
import { ChoroplethCounties } from "./ChoroplethCounties";
import { GMapLayered } from "./GMapLayered";

export class GMapCounties extends GMapLayered {
    _counties: ChoroplethCounties;
    _view;
    _palette;
    _dataMinWeight;
    _dataMaxWeight;

    constructor() {
        super();

        const context = this;
        this._counties = new ChoroplethCounties()
            .paletteID("Blues")
            .meshVisible(false)
            .opacity(0.80)
            .columns(["fips", "weight"])
            .on("click", function (row, col, sel) {
                context.click(row, col, sel);
            })
            .on("dblclick", function (row, col, sel) {
                context.dblclick(row, col, sel);
            })
            ;
    }

    enter(domNode, element) {
        GMapLayered.prototype.enter.apply(this, arguments);
        this
            .layers([
                this._counties
            ])
            ;
    }

    update(domNode, element) {
        this._counties.data(this.data());
        super.update.apply(this, arguments);
        this._palette = this._counties._palette;
        this._dataMinWeight = this._counties._dataMinWeight;
        this._dataMaxWeight = this._counties._dataMaxWeight;
    }

    private _prevBounds;
    render(callback: (w: Widget) => this): this {
        return super.render(w => {
            console.log("as:" + this.autoScale());
            if (this._renderCount > 1 && this.autoScale()) {
                const bounds = this._counties.getDataBounds();
                if (bounds.x && bounds.y &&
                    (!this._prevBounds ||
                        this._prevBounds.x !== bounds.x ||
                        this._prevBounds.y !== bounds.y ||
                        this._prevBounds.width !== bounds.width ||
                        this._prevBounds.height !== bounds.height)
                ) {
                    this._prevBounds = bounds;
                    const tl = this.invert(bounds.x, bounds.y);
                    const br = this.invert(bounds.x + bounds.width, bounds.y + bounds.height);
                    if (tl && br) {
                        this.zoomTo([
                            [tl[1], tl[0]],
                            [br[1], br[0]]
                        ]);
                    }
                }
            }
            if (callback) {
                callback(w);
            }
        });
    }

    exit(domNode, element) {
        super.exit.apply(this, arguments);
    }

    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    }

    dblclick(row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    }
}
GMapCounties.prototype._class += " map_GMapCounties";

export interface GMapCounties {
    autoScale(): boolean;
    autoScale(_: boolean): this;
}

GMapCounties.prototype.publish("autoScale", false, "boolean", "Auto scale to data");
