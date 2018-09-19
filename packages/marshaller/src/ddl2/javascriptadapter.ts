import { PropertyExt } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { classID2Meta, ClassMeta, isArray } from "@hpcc-js/util";
import { Activity, stringify } from "./activities/activity";
import { Dashboard } from "./dashboard";
import { DDLAdapter } from "./ddl";
import { ElementContainer } from "./model/element";

type WidgetImport = { [moduleID: string]: { [classID: string]: boolean } };

class Imports {
    _moduleMap: WidgetImport = {};

    append(widgetMeta: ClassMeta) {
        if (!this._moduleMap[widgetMeta.module]) {
            this._moduleMap[widgetMeta.module] = {};
        }
        this._moduleMap[widgetMeta.module][widgetMeta.class] = true;
    }

    write(): string {
        const importJS: string[] = [];
        for (const moduleID in this._moduleMap) {
            const classIDs: string[] = [];
            for (const classID in this._moduleMap[moduleID]) {
                classIDs.push(classID);
            }
            classIDs.sort();
            importJS.push(`import { ${classIDs.join(", ")} } from "${moduleID}";`);
        }
        return importJS.join("\n");
    }
}

export function createProps(pe: PropertyExt): { [key: string]: any } {
    const retVal: { [key: string]: any } = {};
    for (const meta of pe.publishedProperties()) {
        if (pe[meta.id + "_modified"]() && meta.id !== "fields") {
            const val = pe[meta.id]();
            switch (meta.type) {
                case "propertyArray":
                    const serialization = val.map(item => createProps(item));
                    if (serialization) {
                        retVal[meta.id] = serialization;
                    }
                    break;
                default:
                    retVal[meta.id] = val;
            }
        }
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
        return id.replace(" ", "_").replace(".", "_");
    }

    private datasourceRefID(view: DDL2.IView): string {
        const datasourceRef = view.datasource;
        if (DDL2.isRoxieServiceRef(datasourceRef)) {
            return `${this.safeID(datasourceRef.id)}_${this.safeID(datasourceRef.output)}_${this.safeID(view.id)}`;
        }
        return `${this.safeID(datasourceRef.id)}`;
    }

    _dedup: { [key: string]: boolean } = {};
    private writeDatasource(view: DDL2.IView): string[] {
        const datasourceRef = view.datasource;
        const retVal: string[] = [];
        const datasource = this._ddlSchema.datasources.filter(ds => ds.id === datasourceRef.id)[0];
        const outputID = (datasourceRef as any).output;
        const id = this.datasourceRefID(view);
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
        .requestFieldRefs(${stringify((datasourceRef as DDL2.IRoxieServiceRef).request)})
        .responseFields(${stringify(datasource.outputs[outputID].fields)})
        ;`);
                    break;
                case "roxie":
                    const serviceID = this.safeID(view.datasource.id);
                    if (!this._dedup[serviceID]) {
                        this._dedup[serviceID] = true;
                        retVal.push(`    export const ${serviceID} = new marshaller.RoxieService()
        .url("${datasource.url}")
        .querySet("${datasource.querySet}")
        .queryID("${datasource.queryID}")
        .requestFields(${stringify(datasource.inputs)})
        ;`);
                    }
                    const resultID = serviceID + "_" + this.safeID(outputID);
                    if (!this._dedup[resultID]) {
                        this._dedup[resultID] = true;
                        retVal.push(`    export const ${resultID} = new marshaller.RoxieResult(ec)
        .service(${serviceID})
        .resultName("${outputID}")
        .responseFields(${stringify(datasource.outputs[outputID].fields)})
        ;`);
                    }
                    retVal.push(`    export const ${id} = new marshaller.HipieResultRef(ec)
        .datasource(${resultID})
        .requestFieldRefs(${stringify((datasourceRef as DDL2.IRoxieServiceRef).request)})
        ;`);
                    break;
                case "databomb":
                    {
                        retVal.push(`    export const ${id} = new marshaller.Databomb()
        .format("${datasource.format}")
        .payload(${JSON.stringify(datasource.payload)})
        ;`);
                    }
                    break;
                case "form":
                    {
                        const payload = {};
                        for (const field of datasource.fields) {
                            payload[field.id] = field.default || "";
                        }
                        retVal.push(`    export const ${id} = new marshaller.Form()
        .payload(${JSON.stringify(payload)})
        ;`);
                    }
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

    private joinWithPrefix(props: DDL2.IWidgetProperties, imports: Imports, joinStr: string, postFix: string): string {
        let retVal: string = "";
        let meta: ClassMeta;
        if (props.__class) {
            meta = classID2Meta(props.__class);
            imports.append(meta);
            retVal += `new ${meta.class}()`;
        }
        for (const prop in props) {
            if (prop === "__class") {
            } else if (isArray(props[prop])) {
                const arr = `${(props[prop] as any[]).map(item => this.joinWithPrefix(item, imports, joinStr + "        ", "")).join(`,${joinStr}        `)}`;
                if (arr) {
                    retVal += `${joinStr}    .${prop}([${joinStr}        ${arr}${joinStr}    ])${postFix}`;
                }
            } else {
                retVal += `${joinStr}    .${prop}(${JSON.stringify(props[prop])})${postFix}`;
            }
        }
        return retVal;
    }

    private writeWidget(dataview: DDL2.IView, imports: Imports): string {
        return `    export const ${dataview.visualization.id} = new ChartPanel()
        .id("${dataview.visualization.id}")
        .title("${dataview.visualization.title}")
        .widget(${this.joinWithPrefix(dataview.visualization.properties, imports, "\n        ", "")})
        ;`;
    }

    private writeElement(dataview: DDL2.IView) {
        const activities: string[] = [`data.${this.datasourceRefID(dataview)}`];
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
    .mappings(new marshaller.Mappings().transformations(${stringify(dataview.visualization.mappings.transformations)}))
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
            retVal = retVal.concat(this.writeDatasource(dataview));
        }
        return retVal;
    }

    private writeWidgets(): { widgetImports: string, widgetDefs: string } {
        const jsDef: string[] = [];
        const imports = new Imports();
        for (const dataview of this._ddlSchema.dataviews) {
            jsDef.push(this.writeWidget(dataview, imports));
        }
        return {
            widgetImports: imports.write(),
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
