import { HTMLWidget } from "@hpcc-js/common";
import { Deck, mapboxgl } from "@hpcc-js/deck-shim";
import { hashSum } from "@hpcc-js/util";

declare const window: any;

export interface ViewState {
    width?: number;
    height?: number;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    bearing?: number;
    pitch?: number;
}

export class Common extends HTMLWidget {

    protected _mapgl: mapboxgl.Map;
    protected _deckgl: Deck;
    protected _div: any;
    protected _divMapbox: any;
    protected _canvasDeck: any;
    protected _layers: any[] = [];

    constructor() {
        super();
    }

    viewState(): ViewState;
    viewState(_: ViewState): this;
    viewState(_?: ViewState): ViewState | this {
        if (_ === void 0) return {
            width: this.width(),
            height: this.height(),
            latitude: this.latitude(),
            longitude: this.longitude(),
            zoom: this.zoom(),
            bearing: this.bearing(),
            pitch: this.pitch()
        };

        //  Dont set width and height  ---
        this.latitude(_.latitude);
        this.longitude(_.longitude);
        this.zoom(_.zoom);
        this.bearing(_.bearing);
        this.pitch(_.pitch);

        return this;
    }

    syncMapbox(viewState: ViewState) {
        this._mapgl.jumpTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            bearing: viewState.bearing,
            pitch: viewState.pitch
        });
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._div = element.append("div")
            .attr("id", "container")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
            ;
        this._divMapbox = this._div.append("div")
            .attr("id", "map")
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0)
            .style("width", "100%")
            .style("height", "100%")
            ;
        this._canvasDeck = this._div.append("canvas")
            .attr("id", "deck-canvas")
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0)
            .style("width", "100%")
            .style("height", "100%")
            ;

        //  Default key should be in sync with packages/map/src/leaflet/MapBox.ts
        if (!window.__hpcc_mapbox_apikey) {
            console.warn("__hpcc_mapbox_apikey does not contain a valid API key, reverting to developers key (expect limited performance)");
        }
        mapboxgl.accessToken = mapboxgl.accessToken || window.__hpcc_mapbox_apikey || "pk.eyJ1IjoibGVzY2htb28iLCJhIjoiY2psY2FqY3l3MDhqNDN3cDl1MzFmZnkwcCJ9.HRoFwmz1j80gyz18ruggqw";
        this._mapgl = new mapboxgl.Map({
            container: "map",
            interactive: false,
            center: [this.longitude(), this.latitude()],
            zoom: this.zoom(),
            bearing: this.bearing(),
            pitch: this.pitch()
        });

        this._deckgl = new Deck({
            canvas: "deck-canvas",
            width: "100%",
            height: "100%",
            initialViewState: this.viewState(),
            controller: true,
            onViewStateChange: ({ viewState }) => {
                this._prevViewStateHash = hashSum(viewState);
                this.viewState(viewState);
                this.syncMapbox(viewState);
            }
        });
    }

    private _prevStyle;
    private _prevViewStateHash;
    update(domNode, element) {
        super.update(domNode, element);

        if (this._prevStyle !== this.style()) {
            this._prevStyle = this.style();
            this._mapgl.setStyle(`mapbox://styles/mapbox/${this._prevStyle}`);
        }

        const viewState = this.viewState();
        const viewStateHash = hashSum(viewState);
        if (this._prevViewStateHash !== viewStateHash) {
            this._prevViewStateHash = viewStateHash;

            this._div
                .style("width", this.width() + "px")
                .style("height", this.height() + "px")
                ;
            this._mapgl.resize();

            this._deckgl.setProps({
                viewState: { ...viewState }
            });
            this._deckgl.redraw();
            this.syncMapbox(viewState);
        }
    }
}
Common.prototype._class += " map-deck_Common";

export interface Common {
    style(): string;
    style(_: string): this;
    latitude(): number;
    latitude(_: number): this;
    longitude(): number;
    longitude(_: number): this;
    zoom(): number;
    zoom(_: number): this;
    bearing(): number;
    bearing(_: number): this;
    pitch(): number;
    pitch(_: number): this;
}

Common.prototype.publish("style", "light-v9", "set", "Map Style", ["streets-v10", "outdoors-v10", "light-v9", "dark-v9", "satellite-v9", "satellite-streets-v10", "navigation-preview-day-v2", "navigation-preview-night-v2", "navigation-guidance-day-v2", "navigation-guidance-night-v2"]);
Common.prototype.publish("latitude", 37.1, "number", "Latitude");
Common.prototype.publish("longitude", -95.7, "number", "Latitude");
Common.prototype.publish("zoom", 2, "number", "Latitude");
Common.prototype.publish("bearing", 0, "number", "Latitude");
Common.prototype.publish("pitch", 30, "number", "Latitude");
