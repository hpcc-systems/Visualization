import { Table } from "@hpcc-js/dgrid";
import { ChartPanel } from "@hpcc-js/layout";
import { hashSum } from "@hpcc-js/util";
import { ElementContainer } from "./model/element";

export class DVTable extends ChartPanel {

    private _dvtable = new Table();

    constructor(private _ec: ElementContainer) {
        super();
        this
            .titleVisible(false)
            .widget(this._dvtable)
            .columns(["ID", "Title"])
            ;
    }

    private _prevDataID;
    render(callback?) {
        const data = this._ec.elements().map(elem => {
            return [elem.id(), elem.visualization().title(), elem];
        });
        const dataID = hashSum(data.map(row => row[0]));
        if (this._prevDataID !== dataID) {
            this._prevDataID = dataID;
            this.data(data);
        }
        return super.render(callback);
    }
}
