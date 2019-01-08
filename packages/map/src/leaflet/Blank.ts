import { TileLayer } from "./TileLayer";

export class BlankLayer extends TileLayer {

    constructor() {
        super();
    }
}
BlankLayer.prototype._class += " map_BlankLayer";
