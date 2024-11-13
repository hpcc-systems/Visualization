import { TileLayer } from "./TileLayer.ts";

export class BlankLayer extends TileLayer {

    constructor() {
        super();
    }
}
BlankLayer.prototype._class += " map_BlankLayer";
