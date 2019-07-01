import { Area, Bar, Bubble, Column, Contour, HexBin, Line, Pie, Radar, RadialBar, Scatter, Step, WordCloud } from "@hpcc-js/chart";
import { Database, EntityRectList, InputField, PropertyExt, publish, publishProxy, Widget } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { Table } from "@hpcc-js/dgrid";
import { FieldForm } from "@hpcc-js/form";
import { AdjacencyGraph } from "@hpcc-js/graph";
import { ChoroplethCounties, ChoroplethStates, Leaflet } from "@hpcc-js/map";
import { isArray } from "@hpcc-js/util";
import { HipiePipeline } from "../activities/hipiepipeline";
import { ComputedField, Mappings, MultiField } from "../activities/project";
import { VizChartPanel } from "./vizChartPanel";

export type VizType = "Table" | "FieldForm" |
    "Area" | "Bubble" | "Bar" | "Column" | "Contour" | "HexBin" | "Line" | "Pie" | "WordCloud" | "Radar" | "RadialBar" | "Scatter" | "Step" |
    "USCountiesChoropleth" | "USStatesChoropleth" | "ClusterPins" |
    "EntityRectList" | "AdjacencyGraph";
const VizTypeMap: { [key: string]: new (...args: any[]) => {} } = {
    Table, FieldForm,
    Area, Bubble, Bar, Column, Contour, HexBin, Line, Pie, Radar, RadialBar, Scatter, Step, WordCloud,
    USCountiesChoropleth: ChoroplethCounties, USStatesChoropleth: ChoroplethStates, ClusterPins: Leaflet.ClusterPins,
    EntityRectList, AdjacencyGraph
};
export const VizTypeSet = [];
for (const key in VizTypeMap) {
    VizTypeSet.push(key);
}

function typeClass(type: VizType): any {
    const retVal = VizTypeMap[type];
    return retVal || Table;
}

function typeNew(type: VizType): Widget {
    const ChartClass = VizTypeMap[type];
    const retVal = new (ChartClass || Table)() as Widget;

    //  Override default properties as needed  ---
    if (retVal instanceof FieldForm) {
        retVal
            .validate(false)
            .allowEmptyRequest(true)
            ;
    }
    return retVal;
}

function typeInputs(type: VizType): InputField[] {
    return typeClass(type).__inputs || [];
}

export class Visualization extends PropertyExt {
    @publishProxy("_chartPanel")
    title: publish<this, string>;
    @publishProxy("_chartPanel")
    description: publish<this, string>;
    @publish(DDL2.VisibilitySet[0], "set", "Type", DDL2.VisibilitySet)
    visibility: publish<this, DDL2.VisibilityType>;

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
    @publish(null, "widget", "Mappings", undefined, { render: false, internal: true })
    mappings: publish<this, Mappings>;
    @publish([], "widget", "Widget")
    _chartPanel: VizChartPanel;
    chartPanel(): VizChartPanel;
    chartPanel(_: VizChartPanel): this;
    chartPanel(_?: VizChartPanel): VizChartPanel | this {
        if (!arguments.length) return this._chartPanel;
        this._chartPanel = _;
        this._chartPanel
            .on("click", (row: any, col: string, sel: boolean) => this.click(row, col, sel))
            .on("vertex_click", (row: any, col: string, sel: boolean) => this.vertex_click(row, col, sel))
            ;
        return this;
    }

    protected _hipiePipeline: HipiePipeline;
    constructor(hipiePipeline: HipiePipeline) {
        super();
        this._hipiePipeline = hipiePipeline;
        this.mappings(new Mappings());
        this.chartPanel(new VizChartPanel());
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
        if (!arguments.length) return this.chartPanel().serialize();
        this.chartPanel().deserialize(_);

        return this;
    }

    refreshMappings(): this {
        const mappings = this.mappings();
        mappings.sourceActivity(this._hipiePipeline);
        const cfs = mappings.validComputedFields();
        const inFields = mappings.inFields();
        const taken = {};
        mappings.computedFields(typeInputs(this._chartType).map((input, idx) => {
            let retVal: MultiField | ComputedField = cfs[idx];
            if (retVal) {
                if (retVal instanceof MultiField) {
                } else {
                    retVal.label(input.id);
                }
            } else {
                if (input.multi) {
                    retVal = new MultiField()
                        .owner(mappings)
                        .label(input.id)
                        ;
                    const computedFields: ComputedField[] = [];
                    for (const inField of inFields) {
                        if ((input.type === "any" || input.type === inField.type) && !taken[inField.id]) {
                            taken[inField.id] = true;
                            computedFields.push(new ComputedField()
                                .label(inField.id)
                                .type("=")
                                .column1(inField.id)
                            );
                        }
                    }
                    retVal.multiFields(computedFields);
                } else {
                    retVal = new ComputedField()
                        .owner(mappings)
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

    _prevFields: ReadonlyArray<DDL2.IField> = [];
    _prevData: ReadonlyArray<object> = [];
    refreshData(): Promise<void> {
        const mappings = this.mappings();

        const fields = mappings.outFields();
        const dbfields = this.toDBFields(fields);
        const fieldsChanged = this._prevFields !== fields;
        if (fieldsChanged) {
            this._prevFields = fields;
            this.chartPanel().fields(dbfields.filter(f => f.id() !== "__lparam"));
        } else {
            console.log(`***${this.id()} Immutable Fields***`);
        }

        const data = mappings.outData();
        const dataChanged = this._prevData !== data;
        if (dataChanged) {
            this._prevData = data;
            const mappedData = this.toDBData(dbfields, data);
            this.chartPanel().data(mappedData);
        } else {
            console.log(`${this.id()} Immutable Data!`);
        }

        if (fieldsChanged || dataChanged) {
            return this.chartPanel().renderPromise().then(() => { });
        }
        return Promise.resolve();
    }

    toDBFields(fields: ReadonlyArray<DDL2.IField>): Database.Field[] {
        const retVal: Database.Field[] = [];
        for (const field of fields || []) {
            const f = new Database.Field()
                .id(field.id)
                .label(field.id)
                ;
            switch (field.type) {
                case "dataset":
                    f.children(this.toDBFields(field.children));
                    break;
                case "object":
                    //  TODO:  For __lparam we should do nothing - not 100% if that is correct for "real" data (we don't really support "object" anyway)?
                    break;
            }
            retVal.push(f);
        }
        return retVal;
    }

    toDBData(fields: Database.Field[], data: ReadonlyArray<object> | Readonly<object>) {
        const _data: ReadonlyArray<object> = isArray(data) ? data : [data];
        return _data.map((row: any) => {
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

    refresh(): Promise<void> {
        this.chartPanel().startProgress && this.chartPanel().startProgress();
        const mappings = this.mappings();
        mappings.sourceActivity(this._hipiePipeline);
        return mappings.refreshMeta().then(() => {
            return mappings.exec();
        }).then(() => {
            this.chartPanel().finishProgress && this.chartPanel().finishProgress();
            return this.refreshData();
        });
    }

    //  Events  ---
    click(row: any, col: string, sel: boolean) {
    }
    vertex_click(row: any, col: string, sel: boolean) {
    }
}
Visualization.prototype._class += " Visualization";
