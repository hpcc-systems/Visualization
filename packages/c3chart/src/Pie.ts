import { Common2D } from "./Common2D";

export class Pie extends Common2D {
    constructor() {
        super();

        this._type = "pie";

        const context = this;
        this._config.data.onclick = function (d, element) {
            const rows = context.data().filter(function (row) {
                return row[0] === d.name;
            });
            if (rows.length === 1) {
                context.click(context.rowToObj(rows[0]), d.id, context.c3Chart.selected().length > 0);
            } else if (rows.length > 1) {
                console.log("C3 sel.name matches too much data.");
            } else {
                console.log("C3 sel.name does not match any data.");
            }
        };
    }

    update(domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
    }

    getChartOptions() {
        const chartOptions = Common2D.prototype.getChartOptions.apply(this, arguments);

        const data = this.data().map(function (row, idx) {
            return [row[0], row[1]];
        }, this);

        chartOptions.columns = data;

        return chartOptions;
    }
}
Pie.prototype._class += " c3chart_Pie";
