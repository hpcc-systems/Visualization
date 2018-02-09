import { HTMLWidget, Widget } from "@hpcc-js/common";
import { ChartPanel } from "@hpcc-js/layout";
import { MultiChart } from "./MultiChart";

import "../src/ChartPanel.css";

class Summary extends HTMLWidget {

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        element.append("p");
    }

    update(domNode, element) {
        super.update(domNode, element);
        element.select("p").text(this.text());
    }
}
interface Summary {
    text(): string;
    text(_: string): this;
}
Summary.prototype.publish("text", "", "string");

export class MultiChartPanel extends ChartPanel {

    _widget: MultiChart;

    constructor() {
        super();
        this.widget(new MultiChart().chartType("COLUMN"));
    }

    multiChart(): MultiChart {
        return this._widget;
    }

    chartType(): string;
    chartType(_: string): this;
    chartType(_?: string): string | this {
        if (!arguments.length) return this._widget.chartType();
        this._widget.chartType(_);
        return this;
    }

    chart(): Widget;
    chart(_: Widget): this;
    chart(_?: Widget): Widget | this {
        if (!arguments.length) return this._widget.chart();
        this._widget.chart(_);
        return this;
    }

    chartTypeDefaults(): object;
    chartTypeDefaults(_: object): this;
    chartTypeDefaults(_?: object): this | object {
        if (!arguments.length) return this._widget.chartTypeDefaults();
        this._widget.chartTypeDefaults(_);
        return this;
    }

    chartTypeProperties(): object;
    chartTypeProperties(_: object): this;
    chartTypeProperties(_?: object): this | object {
        if (!arguments.length) return this._widget.chartTypeProperties();
        this._widget.chartTypeProperties(_);
        return this;
    }

    update(domNode, element) {
        if (this._widget instanceof MultiChart)this._legend.dataFamily(this._widget.getChartDataFamily());
        super.update(domNode, element);
    }
}
MultiChartPanel.prototype._class += " composite_MultiChartPanel";
