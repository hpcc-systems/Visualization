import { Common2D } from "./Common2D";

export function Pie(target) {
    Common2D.call(this);

    this._type = "pie";

        var context = this;
        this._config.data.onclick = function (d, element) {
            var rows = context.data().filter(function (row) {
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
    Pie.prototype = Object.create(Common2D.prototype);
    Pie.prototype.constructor = Pie;
    Pie.prototype._class += " c3chart_Pie";

Pie.prototype.update = function (domNode, element) {
    Common2D.prototype.update.apply(this, arguments);
};

Pie.prototype.getChartOptions = function () {
    var chartOptions = Common2D.prototype.getChartOptions.apply(this, arguments);

    var data = this.data().map(function (row, idx) {
        return [row[0], row[1]];
    }, this);

    chartOptions.columns = data;

    return chartOptions;
};
