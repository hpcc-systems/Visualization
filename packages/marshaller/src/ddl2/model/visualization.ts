import { Area, Bar, Bubble, Column, Contour, HexBin, Line, Pie, Radar, RadialBar, Scatter, Step, WordCloud } from "@hpcc-js/chart";
import { Database, EntityRectList, InputField, PropertyExt, publish, publishProxy, Widget } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { Table } from "@hpcc-js/dgrid";
import { FieldForm } from "@hpcc-js/form";
import { AdjacencyGraph, DataGraph } from "@hpcc-js/graph";
import { ChoroplethCounties, ChoroplethStates, Leaflet } from "@hpcc-js/map";
import { isArray } from "@hpcc-js/util";
import { HipiePipeline } from "../activities/hipiepipeline";
import { ComputedField, Mappings, MultiField } from "../activities/project";
import { ElementContainer } from "./element";
import { VizChartPanel } from "./vizChartPanel";

export type VizType = "Table" | "FieldForm" |
    "Area" | "Bubble" | "Bar" | "Column" | "Contour" | "HexBin" | "Line" | "Pie" | "WordCloud" | "Radar" | "RadialBar" | "Scatter" | "Step" |
    "USCountiesChoropleth" | "USStatesChoropleth" | "ClusterPins" |
    "EntityRectList" | "AdjacencyGraph" | "DataGraph";
const VizTypeMap: { [key: string]: new (...args: any[]) => {} } = {
    Table, FieldForm,
    Area, Bubble, Bar, Column, Contour, HexBin, Line, Pie, Radar, RadialBar, Scatter, Step, WordCloud,
    USCountiesChoropleth: ChoroplethCounties, USStatesChoropleth: ChoroplethStates, ClusterPins: Leaflet.ClusterPins,
    EntityRectList, AdjacencyGraph, DataGraph
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
    } else if (retVal instanceof AdjacencyGraph) {
        retVal
            .uidColumn("uid")
            .labelColumn("label")
            .iconColumn("icon")
            .linksColumn("links")
            .linkUidColumn("uid")
            .linkLabelColumn("label")
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
    _visibility: DDL2.VisibilityType;
    visibility(): DDL2.VisibilityType;
    visibility(_: DDL2.VisibilityType): this;
    visibility(_?: DDL2.VisibilityType): DDL2.VisibilityType | this {
        if (!arguments.length) return this._visibility;
        if (this._visibility !== _) {
            this.chartPanel().target(null);
        }
        this._visibility = _;
        return this;
    }

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

    @publish(null, "set", "Secondary Data View (e.g. graph edges)", function (this: Visualization) { return this.visualizationIDs(); }, { optional: true })
    secondaryDataviewID: publish<this, string>;
    secondaryDataviewID_exists: () => boolean;
    secondaryDataviewID_valid: () => boolean;

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
            .on("click", (row: any, col: string, sel: boolean, more) => this.click(row, col, sel, more))
            .on("vertex_click", (row: any, col: string, sel: boolean) => this.vertex_click(row, col, sel))
            ;
        for (const key in VizTypeMap) {
            if (this._chartPanel.widget() instanceof VizTypeMap[key]) {
                this._chartType = key as VizType;
                break;
            }
        }
        return this;
    }

    protected _hipiePipeline: HipiePipeline;
    constructor(protected _ec: ElementContainer, hipiePipeline: HipiePipeline) {
        super();
        this._hipiePipeline = hipiePipeline;
        this.mappings(new Mappings());
        this.chartPanel(new VizChartPanel());
        this.typeChanged();
    }

    visualizationIDs(): string[] {
        return this._ec.elementIDs().filter(id => id !== this.id());
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
    _prevLinkFields: ReadonlyArray<DDL2.IField> = [];
    _prevData: ReadonlyArray<object> = [];
    refreshData(): Promise<void> {
        const mappings = this.mappings();

        const fields = mappings.outFields();
        const dbFields = this.toDBFields(fields);
        let linkFields: ReadonlyArray<DDL2.IField>;
        let dbLinkFields = [];
        const se = this._ec.element(this.secondaryDataviewID());
        if (se) {
            linkFields = se.mappings().outFields();
            dbLinkFields = this.toDBFields(linkFields);
        }

        const fieldsChanged = this._prevFields !== fields || this._prevLinkFields !== linkFields;
        if (fieldsChanged) {
            this._prevFields = fields;
            if (this.chartType() === "DataGraph") {
                const dataGraph = this.chartPanel().widget() as DataGraph;
                dataGraph.vertexColumns(dbFields.map(f => f.label()));
                dataGraph.edgeColumns(dbLinkFields.map(f => f.label()));
            } else {
                this.chartPanel().fields(dbFields.filter(f => f.id() !== "__lparam"));
            }
        } else {
            console.log(`***${this.id()} Immutable Fields***`);
        }

        const data = mappings.outData();
        const dataChanged = this._prevData !== data;
        if (dataChanged) {
            this._prevData = data;
            const mappedData = this.toDBData(dbFields, data);
            if (this.chartType() === "DataGraph") {
                const dataGraph = this.chartPanel().widget() as DataGraph;
                dataGraph.clear();
                dataGraph.vertices(mappedData);
                if (se) {
                    const linkData = se.mappings().outData();
                    const mappedLinkData = this.toDBData(dbLinkFields, linkData);
                    dataGraph.edges(mappedLinkData);
                }
            } else {
                this.chartPanel().data(mappedData);
            }
        } else {
            console.log(`${this.id()} Immutable Data!`);
        }

        if (fieldsChanged || dataChanged) {
            return this.chartPanel().renderPromise().then(() => { });
        }
        return Promise.resolve();
    }

    private fieldTypeTodbFieldType(type: DDL2.IFieldType): Database.FieldType {
        switch (type) {
            case "dataset":
                return "nested";
            case "boolean":
                return "boolean";
            case "number":
                return "number";
            case "string":
            default:
                return "string";
        }
    }

    toDBFields(fields: ReadonlyArray<DDL2.IField>): Database.Field[] {
        const retVal: Database.Field[] = [];
        for (const field of fields || []) {
            const f = new Database.Field()
                .type(this.fieldTypeTodbFieldType(field.type))
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
    click(row: any, col: string, sel: boolean, more?) {
    }

    vertex_click(row: any, col: string, sel: boolean) {
    }
}
Visualization.prototype._class += " Visualization";
