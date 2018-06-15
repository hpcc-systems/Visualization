import { Area, Bubble, Column, Contour, HexBin, Line, Pie, Scatter, Step, WordCloud } from "@hpcc-js/chart";
import { Database, InputField, PropertyExt, publish, publishProxy, Widget } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { Table } from "@hpcc-js/dgrid";
import { FieldForm } from "@hpcc-js/form";
import { ChartPanel } from "@hpcc-js/layout";
import { ChoroplethCounties, ChoroplethStates } from "@hpcc-js/map";
import { HipiePipeline } from "../activities/hipiepipeline";
import { ComputedField, Mappings, MultiField } from "../activities/project";

export type VizType = "Table" | "FieldForm" | "Area" | "Bubble" | "Column" | "Contour" | "HexBin" | "Line" | "Pie" | "WordCloud" | "Scatter" | "Step" | "ChoroplethCounties" | "ChoroplethStates";
const VizTypeMap: { [key: string]: { new(...args: any[]): {} } } = { Table, FieldForm, Area, Bubble, Column, Contour, HexBin, Line, Pie, Scatter, Step, WordCloud, ChoroplethCounties, ChoroplethStates };
export const VizTypeSet = [];
for (const key in VizTypeMap) {
    VizTypeSet.push(key);
}

function typeClass(type: VizType): any {
    const retVal = VizTypeMap[type];
    return retVal || Table;
}

function typeNew(type: VizType): Widget {
    const retVal = VizTypeMap[type];
    return new (retVal || Table)() as Widget;
}

function typeInputs(type: VizType): InputField[] {
    return typeClass(type).__inputs || [];
}

export class Visualization extends PropertyExt {
    @publish("Table", "set", "Type", VizTypeSet)
    _chartType: VizType;
    chartType(): VizType;
    chartType(_: VizType, props?: { [prop: string]: any }): this;
    chartType(_?: VizType, props?: { [prop: string]: any }): VizType | this {
        if (!arguments.length) return this._chartType;
        if (VizTypeSet.indexOf(_) === -1) {
            _ = "Table";
        }
        this._chartType = _;
        this.typeChanged();
        if (props) {
            const widget = this.chartPanel().widget();
            for (const prop in props) {
                if (typeof widget[prop] === "function") {
                    widget[prop](props[prop]);
                }
            }
        }
        return this;
    }
    @publish(null, "widget", "Mappings", undefined, { render: false })
    mappings: publish<this, Mappings>;
    @publish([], "widget", "Widget")
    _chartPanel: ChartPanel;
    chartPanel(): ChartPanel;
    chartPanel(_: ChartPanel): this;
    chartPanel(_?: ChartPanel): ChartPanel | this {
        if (!arguments.length) return this._chartPanel;
        this._chartPanel = _;
        this._chartPanel
            .on("click", (row: any, col: string, sel: boolean) => this.click(row, col, sel))
            .on("vertex_click", (row: any, col: string, sel: boolean) => this.vertex_click(row, col, sel))
            ;
        return this;
    }

    @publishProxy("_chartPanel")
    title: publish<this, string>;
    @publishProxy("_chartPanel")
    description: publish<this, string>;

    protected _hipiePipeline: HipiePipeline;
    constructor(hipiePipeline: HipiePipeline) {
        super();
        this._hipiePipeline = hipiePipeline;
        this.mappings(new Mappings());
        this.chartPanel(new ChartPanel());
        this.typeChanged();
    }

    _prevChartType;
    typeChanged() {
        if (this._prevChartType !== this._chartType) {
            this._prevChartType = this._chartType;
            this.refreshMappings();
            const chart = typeNew(this._chartType);
            this.chartPanel().widget(chart);
        }
    }

    properties(): DDL2.IWidgetProperties;
    properties(_: DDL2.IWidgetProperties): this;
    properties(_?: DDL2.IWidgetProperties): DDL2.IWidgetProperties | this {
        if (!arguments.length) return this.chartPanel().widget().serialize();
        this.chartPanel().widget().deserialize(_);
        return this;
    }

    refreshMappings(): this {
        const mappings = this.mappings();
        mappings.sourceActivity(this._hipiePipeline);
        // const cfs = mappings.validComputedFields();
        const inFields = mappings.inFields();
        const taken = {};
        mappings.computedFields(typeInputs(this._chartType).map((input, idx) => {
            let retVal: MultiField | ComputedField; // = cfs[idx];
            if (retVal) {
                if (retVal instanceof MultiField) {
                } else {
                    retVal.label(input.id);
                }
            } else {
                if (input.multi) {
                    retVal = new MultiField(mappings).label(input.id);
                    const computedFields: ComputedField[] = [];
                    for (const inField of inFields) {
                        if ((input.type === "any" || input.type === inField.type) && !taken[inField.id]) {
                            taken[inField.id] = true;
                            computedFields.push(new ComputedField(retVal)
                                .label(inField.id)
                                .type("=")
                                .column1(inField.id)
                            );
                        }
                    }
                    retVal.multiFields(computedFields);
                } else {
                    retVal = new ComputedField(mappings)
                        .label(input.id)
                        .type("=")
                        ;
                    for (const inField of inFields) {
                        if ((input.type === "any" || input.type === inField.type) && !taken[inField.id]) {
                            taken[inField.id] = true;
                            retVal.column1(inField.id);
                            break;
                        }
                    }
                }
            }
            return retVal;
        }));
        return this;
    }

    refreshData(): this {
        const mappings = this.mappings();
        const fields = this.toDBFields(mappings.outFields());
        const data = mappings.outData();
        const mappedData = this.toDBData(fields, data);
        this.chartPanel()
            .fields(fields.filter(f => f.id() !== "__lparam"))
            .data(mappedData)
            .render()
            ;
        return this;
    }

    toDBFields(fields: DDL2.IField[]): Database.Field[] {
        const retVal: Database.Field[] = [];
        for (const field of fields) {
            const f = new Database.Field()
                .id(field.id)
                .label(field.id)
                ;
            if (field.children) {
                f.children(this.toDBFields(field.children));
            }
            retVal.push(f);
        }
        return retVal;
    }

    toDBData(fields: Database.Field[], data) {
        return data.map((row: any) => {
            const retVal = [];
            for (const field of fields) {
                if (field.type() === "nested") {
                    retVal.push(this.toDBData(field.children() as Database.Field[], row[field.id()].Row || row[field.id()]));
                } else {
                    retVal.push(row[field.label()]);
                }
            }
            return retVal;
        });
    }

    async refresh() {
        //        if (this.chartPanel().renderCount()) {
        this.chartPanel().startProgress && this.chartPanel().startProgress();
        //        }
        const mappings = this.mappings();
        mappings.sourceActivity(this._hipiePipeline);
        await mappings.refreshMeta();
        await mappings.exec();
        //        if (this.chartPanel().renderCount()) {
        this.refreshData();
        this.chartPanel().finishProgress && this.chartPanel().finishProgress();
        //        }
    }

    //  Events  ---
    click(row: any, col: string, sel: boolean) {
    }
    vertex_click(row: any, col: string, sel: boolean) {
    }
}
Visualization.prototype._class += " Visualization";
