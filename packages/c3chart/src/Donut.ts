import { Common2D } from "./Common2D";

export class Donut extends Common2D {
    constructor() {
        super();

        this._type = "donut";

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

    enter(domNode, element) {
        this._config.donut = {
            label_show: this.showLabel(),
            width: this.arcWidth(),
            expand: this.expand(),
            title: this.title()
        };

        Common2D.prototype.enter.apply(this, arguments);
    }

    update(domNode, element) {
        this.c3Chart.internal.config.donut_label_show = this.showLabel();
        this.c3Chart.internal.config.donut_width = this.arcWidth();
        this.c3Chart.internal.config.donut_expand = this.expand();
        this.c3Chart.internal.config.donut_title = this.title();

        Common2D.prototype.update.apply(this, arguments);

        element.select(".c3-chart-arcs-title")
            .text(this.showLabel() ? this.title() : "")
            ;
    }

    getChartOptions() {
        const chartOptions = Common2D.prototype.getChartOptions.apply(this, arguments);

        const data = this.data().map(function (row, idx) {
            return [row[0], row[1]];
        }, this);

        chartOptions.columns = data;

        return chartOptions;
    }

    showLabel: { (): boolean; (_: boolean): Donut };
    showLabel_exists: () => boolean;
    arcWidth: { (): number; (_: number): Donut };
    arcWidth_exists: () => boolean;
    expand: { (): boolean; (_: boolean): Donut };
    expand_exists: () => boolean;
    title: { (): string; (_: string): Donut };
    title_exists: () => boolean;
}
Donut.prototype._class += " c3chart_Donut";

Donut.prototype.publish("showLabel", true, "boolean", "Show Label", null, { tags: ["Basic"] });
Donut.prototype.publish("arcWidth", 45, "number", "Arc Width", null, { tags: ["Basic"] });
Donut.prototype.publish("expand", true, "boolean", "Arc Explode", null, { tags: ["Intermediate"] });
Donut.prototype.publish("title", "", "string", "Center Label", null, { tags: ["Intermediate"] });
