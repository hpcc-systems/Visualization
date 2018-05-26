import { ClassMeta, PropertyExt } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { Activity, stringify } from "./activities/activity";
import { Databomb } from "./activities/databomb";
import { DSPicker } from "./activities/dspicker";
import { Dashboard } from "./dashboard";
import { DDLAdapter } from "./ddl";
import { ElementContainer } from "./model";

export function createProps(pe: PropertyExt): { [key: string]: any } {
    const retVal: { [key: string]: any } = {};
    for (const meta of pe.publishedProperties()) {
        if ((pe as any)[meta.id + "_modified"]() && meta.id !== "fields") {
            retVal[meta.id] = (pe as any)[meta.id]();
        }
    }
    return retVal;
}

interface WidgetMeta extends ClassMeta {
    js: string;
}

function joinWithPrefix(props: DDL2.IWidgetProperties, joinStr: string, postFix: string = ""): string {
    let retVal: string = "";
    for (const prop in props) {
        retVal += `${joinStr}.${prop}(${JSON.stringify(props[prop])})${postFix}`;
    }
    return retVal;
}

export class JavaScriptAdapter {
    private _dashboard: Dashboard;
    private _elementContainer: ElementContainer;
    private _ddlAdapter: DDLAdapter;
    private _ddlSchema: DDL2.Schema;

    constructor(dashboard: Dashboard) {
        this._dashboard = dashboard;
        this._elementContainer = this._dashboard.elementContainer();
        this._ddlAdapter = new DDLAdapter(this._dashboard);
        this._ddlSchema = this._ddlAdapter.write();
    }

    createProps(prefix: string, pe: PropertyExt, postfix: string = ""): string[] {
        let retVal: string[] = [];
        for (const meta of pe.publishedProperties()) {
            if ((pe as any)[meta.id + "_exists"]()) {
                switch (meta.type) {
                    case "string":
                    case "set":
                        retVal.push(`${prefix}.${meta.id}("${(pe as any)[meta.id]()}")${postfix};`);
                        break;
                    case "number":
                    case "boolean":
                        retVal.push(`${prefix}.${meta.id}(${(pe as any)[meta.id]()})${postfix};`);
                        break;
                    case "widget":
                        retVal = retVal.concat(this.createProps(`${prefix}.${meta.id}()`, (pe as any)[meta.id]()));
                        break;
                    case "propertyArray":
                        if (meta.ext)
                            retVal.push(`${prefix}.${meta.id}([${(pe as any)[meta.id]()}])${postfix};`);
                        break;
                    default:
                        break;
                }
            }
        }
        return retVal;
    }

    writeMeta(dsDetails: Activity) {
        return "";
    }

    private safeID(id: string): string {
        if (!id) return id;
        return id.replace(" ", "_");
    }

    private datasourceRefID(datasource: DDL2.IDatasourceRef | DDL2.IWUResultRef | DDL2.IRoxieServiceRef): string {
        if (DDL2.isWUResultRef(datasource) || DDL2.isRoxieServiceRef(datasource)) {
            return `${datasource.id}_${this.safeID(datasource.output)}`;
        }
        return `${datasource.id}`;
    }

    _dedup: { [key: string]: boolean } = {};
    private writeDatasource(datasourceRef: DDL2.IDatasourceRef): string[] {
        const retVal: string[] = [];
        const datasource = this._ddlSchema.datasources.filter(ds => ds.id === datasourceRef.id)[0];
        const outputID = (datasourceRef as any).output;
        const id = outputID ? `${datasource.id}_${this.safeID(outputID)}` : `${datasource.id}`;
        if (!this._dedup[id]) {
            this._dedup[id] = true;
            switch (datasource.type) {
                case "wuresult":
                    retVal.push(`    export const ${id} = new marshaller.WUResult()
        .url("${datasource.url}")
        .wuid("${datasource.wuid}")
        .resultName("${outputID}")
        .responseFields(${stringify(datasource.outputs[outputID].fields)})
        ;`);
                    break;
                case "logicalfile":
                    retVal.push(`    export const ${id} = new marshaller.LogicalFile()
        .url("${datasource.url}")
        .logicalFile("${datasource.logicalFile}")
        .responseFields(${stringify(datasource.fields)})
        ;`);
                    break;
                case "hipie":
                    retVal.push(`    export const ${id} = new marshaller.HipieRequest(ec)
        .url("${datasource.url}")
        .querySet("${datasource.querySet}")
        .queryID("${datasource.queryID}")
        .resultName("${outputID}")
        .requestFields(${stringify(datasource.inputs)})
        .responseFields(${stringify(datasource.outputs[outputID].fields)})
        .requestFieldRefs(${stringify((datasourceRef as DDL2.IRoxieServiceRef).request)})
        ;`);
                    break;
                case "roxie":
                    retVal.push(`    export const ${id} = new marshaller.RoxieRequest(ec)
        .url("${datasource.url}")
        .querySet("${datasource.querySet}")
        .queryID("${datasource.queryID}")
        .resultName("${outputID}")
        .requestFields(${stringify(datasource.inputs)})
        .responseFields(${stringify(datasource.outputs[outputID].fields)})
        .requestFieldRefs(${stringify((datasourceRef as DDL2.IRoxieServiceRef).request)})
        ;`);
                    break;
                case "databomb":
                    let payload = "";
                    const ds = this._elementContainer.elements().filter(e => e.hipiePipeline().dataSource().id() === datasource.id);
                    if (ds.length) {
                        payload = ((ds[0].hipiePipeline().dataSource() as DSPicker).details() as Databomb).payload();
                    }
                    retVal.push(`    export const ${datasource.id} = new marshaller.Databomb()
        .payload(${JSON.stringify(payload)})
        ;`);
                    break;
                case "form":
                    retVal.push(`    export const ${datasource.id} = new marshaller.Form()
        .payload(${JSON.stringify(datasource.fields[0])})
        ;`);
                    break;
            }
        }
        return retVal;
    }

    private writeActivity(activity: DDL2.ActivityType): string {
        switch (activity.type) {
            case "filter":
                return `new marshaller.Filters(ec).conditions(${stringify(activity.conditions)})`;
            case "project":
                return `new marshaller.Project().transformations(${stringify(activity.transformations)})`;
            case "groupby":
                return `new marshaller.GroupBy().fieldIDs(${JSON.stringify(activity.groupByIDs)}).aggregates(${stringify(activity.aggregates)})`;
            case "sort":
                return `new marshaller.Sort().conditions(${stringify(activity.conditions)})`;
            case "limit":
                return `new marshaller.Limit().rows(${activity.limit})`;
            case "mappings":
                return `new marshaller.Mappings().transformations(${stringify(activity.transformations)})`;
        }
    }

    writeWidgetProps(pe: PropertyExt): string[] {
        const retVal: string[] = [];
        for (const meta of pe.publishedProperties()) {
            if ((pe as any)[meta.id + "_modified"]() && meta.id !== "fields") {
                retVal.push(`.${meta.id}(${JSON.stringify((pe as any)[meta.id]())})`);
            }
        }
        return retVal;
    }

    private writeWidget(dataview: DDL2.IView): WidgetMeta {
        /*
        const multiChartPanel = dataview.multiChartPanel();
        const chart = multiChartPanel.chart();
        const meta = chart.classMeta();
        const props = this.writeWidgetProps(chart);
        const vizID = multiChartPanel.id();
        */
        return {
            moduleName: dataview.visualization.moduleName,
            className: dataview.visualization.className,
            memberName: dataview.visualization.memberName,
            js: `    export const ${dataview.visualization.id} = new ChartPanel()
        .id("${dataview.visualization.id}")
        .title("${dataview.visualization.title}")
        .widget(new ${dataview.visualization.className}()${joinWithPrefix(dataview.visualization.properties, "\n            ", "")})
        ;`
        };
    }

    private writeElement(dataview: DDL2.IView) {
        const activities: string[] = [`data.${this.datasourceRefID(dataview.datasource)}`];
        for (const activity of dataview.activities) {
            activities.push(this.writeActivity(activity));
        }
        const updates: string[] = [];
        for (const filteredViz of this._elementContainer.filteredBy(dataview.id)) {
            updates.push(`${filteredViz.id()}.refresh();`);
        }
        return `
const ${dataview.id} = new marshaller.Element(ec)
    .id("${dataview.id}")
    .pipeline([
        ${activities.join(",\n        ")}
    ])
    .chartPanel(viz.${dataview.visualization.id})
    .on("selectionChanged", () => {
        ${updates.join("\n        ")}
    }, true)
    ;
ec.append(${dataview.id});
`;
    }

    private writeDatasources(): string[] {
        let retVal: string[] = [];
        for (const dataview of this._ddlSchema.dataviews) {
            retVal = retVal.concat(this.writeDatasource(dataview.datasource));
        }
        return retVal;
    }

    private writeWidgets(): { widgetImports: string, widgetDefs: string } {
        const jsDef: string[] = [];
        const widgetImport: { [moduleID: string]: { [classID: string]: boolean } } = {};
        for (const dataview of this._ddlSchema.dataviews) {
            const widgetMeta = this.writeWidget(dataview);
            if (!widgetImport[widgetMeta.moduleName]) {
                widgetImport[widgetMeta.moduleName] = {};
            }
            widgetImport[widgetMeta.moduleName][widgetMeta.className] = true;
            jsDef.push(widgetMeta.js);
        }
        const importJS: string[] = [];
        for (const moduleID in widgetImport) {
            const classIDs: string[] = [];
            for (const classID in widgetImport[moduleID]) {
                classIDs.push(classID);
            }
            classIDs.sort();
            importJS.push(`import { ${classIDs.join(", ")} } from "${moduleID}";`);
        }
        return {
            widgetImports: importJS.join("\n"),
            widgetDefs: jsDef.join("\n\n")
        };
    }

    private writeElements(): string {
        let retVal = "";
        for (const dataview of this._ddlSchema.dataviews) {
            retVal += this.writeElement(dataview);
        }
        return retVal;
    }

    createJavaScript(): string {
        const widgets = this.writeWidgets();

        return `// tslint:disable
${widgets.widgetImports}
import { ChartPanel } from "@hpcc-js/layout";
import * as marshaller from "@hpcc-js/marshaller";

//  Dashboard Element Container (Model)  ---
const ec = new marshaller.ElementContainer();

namespace data {
${this.writeDatasources().join("\n")}
}

namespace viz {
${widgets.widgetDefs}
}

//  Dashboard Elements  (Controller) ---
${this.writeElements().trim()}

ec.refresh();

//  Optional  ---
const errors = ec.validate();
for (const error of errors) {
    console.error(error.elementID + " (" + error.source + "):  " + error.msg);
}

export const dashboard = new marshaller.Dashboard(ec)
    .target("placeholder")
    .render(w => {
        (w as marshaller.Dashboard)
            .layout(${stringify(this._dashboard.layout())})
            .hideSingleTabs(true)
            ;
    })
    ;

// @ts-ignore
const ddl = ${JSON.stringify(this._ddlSchema)};
`;
    }
}
