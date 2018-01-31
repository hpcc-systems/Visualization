import { ClassMeta, PropertyExt } from "@hpcc-js/common";
import { Activity, stringify } from "./activities/activity";
import { Databomb, Form } from "./activities/databomb";
import { DSPicker, isDatasource } from "./activities/dspicker";
import { Filters } from "./activities/filter";
import { GroupBy } from "./activities/groupby";
import { Limit } from "./activities/limit";
import { LogicalFile } from "./activities/logicalfile";
import { Project } from "./activities/project";
import { HipieRequest, RoxieRequest } from "./activities/roxie";
import { Sort } from "./activities/sort";
import { WUResult } from "./activities/wuresult";
import { Dashboard } from "./dashboard";
import { Element, ElementContainer } from "./model";

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

function joinWithPrefix(arr: string[], joinStr: string, postFix: string = ""): string {
    return arr.length ? `${joinStr}${arr.join(joinStr)}${postFix}` : "";
}

export class JavaScriptAdapter {
    private _dashboard: Dashboard;
    private _elementContainer: ElementContainer;
    private _dsDedup: { [key: string]: Activity } = {};

    constructor(dashboard: Dashboard) {
        this._dashboard = dashboard;
        this._elementContainer = dashboard.elementContainer();
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

    writeDSActivity(ds: Activity): string {
        const dsDetails = ds instanceof DSPicker ? ds.details() : ds;
        if (dsDetails instanceof WUResult) {
            return `
const ds_${ds.id()} = new WUResult()
    .url("${dsDetails.url()}")
    .wuid("${dsDetails.wuid()}")
    .resultName("${dsDetails.resultName()}")
    ;
`.trim();
        } else if (dsDetails instanceof LogicalFile) {
            return `
const ds_${ds.id()} = new LogicalFile()
    .url("${dsDetails.url()}")
    .logicalFile("${dsDetails.logicalFile()}")
    ;
`.trim();
        } else if (dsDetails instanceof HipieRequest) {
            return `
const ds_${ds.id()} = new HipieRequest(ec)
    .url("${dsDetails.url()}")
    .querySet("${dsDetails.querySet()}")
    .queryID("${dsDetails.queryID()}")
    .resultName("${dsDetails.resultName()}")
    .requestFields(${stringify(dsDetails.requestFields())})
    ;
`.trim();
        } else if (dsDetails instanceof RoxieRequest) {
            return `
const ds_${ds.id()} = new RoxieRequest(ec)
    .url("${dsDetails.url()}")
    .querySet("${dsDetails.querySet()}")
    .queryID("${dsDetails.queryID()}")
    .resultName("${dsDetails.resultName()}")
    .requestFields(${stringify(dsDetails.requestFields())})
    ;
`.trim();
        } else if (dsDetails instanceof Databomb) {
            return `
const ds_${ds.id()} = new Databomb()
    .payload(${stringify(dsDetails.payload())})
    ;
`.trim();
        } else if (dsDetails instanceof Form) {
            return `
const ds_${ds.id()} = new Form()
    .payload(${JSON.stringify(dsDetails.payload())})
    ;
`.trim();
        }
        return `
const ds_${ds.id()} = TODO-writeDSActivity: ${dsDetails.classID()}
`.trim();
    }

    writeDatasource(element: Element): string[] {
        const dataSources: string[] = [];
        const ds = element.hipiePipeline().dataSource();
        if (!this._dsDedup[ds.hash()]) {
            this._dsDedup[ds.hash()] = ds;
            dataSources.push(this.writeDSActivity(ds));
        }
        return dataSources;
    }

    writeActivity(activity: Activity): string {
        if (activity instanceof GroupBy) {
            return `new GroupBy().fieldIDs(${JSON.stringify(activity.fieldIDs())}).aggregates(${stringify(activity.aggregates())})`;
        } else if (activity instanceof Sort) {
            return `new Sort().conditions(${stringify(activity.conditions())})`;
        } else if (activity instanceof Filters) {
            return `new Filters(ec).conditions(${stringify(activity.conditions())})`;
        } else if (activity instanceof Project) {
            return `new Project().trim(${activity.trim()}).transformations(${stringify(activity.transformations())})`;
        } else if (activity instanceof Limit) {
            return `new Limit().rows(${activity.rows()})`;
        }
        return `TODO-writeActivity: ${activity.classID()}`;
    }

    private writeWidgetProps(pe: PropertyExt): string[] {
        const retVal: string[] = [];
        for (const meta of pe.publishedProperties()) {
            if ((pe as any)[meta.id + "_modified"]() && meta.id !== "fields") {
                retVal.push(`.${meta.id}(${JSON.stringify((pe as any)[meta.id]())})`);
            }
        }
        return retVal;
    }

    private writeWidget(element: Element): WidgetMeta {
        const multiChartPanel = element.multiChartPanel();
        const chart = multiChartPanel.chart();
        const meta = chart.classMeta();
        const props = this.writeWidgetProps(chart);
        const vizID = multiChartPanel.id();
        return {
            ...chart.classMeta(),
            js: `
const cp_${vizID} = new ChartPanel()
    .id("${vizID}")
    .title("${element.chartPanel().title()}")
    .widget(new ${meta.className}()${joinWithPrefix(props, "\n        ", "\n    ")})
    ;
`.trim()
        };
    }

    writeElement(element: Element) {
        const activities: string[] = [];
        for (const activity of element.hipiePipeline().activities()) {
            if (activity.exists()) {
                if (isDatasource(activity)) {
                    activities.push(`ds_${this._dsDedup[activity.hash()].id()}`);
                } else {
                    activities.push(this.writeActivity(activity));
                }
            }
        }
        const updates: string[] = [];
        for (const filteredViz of this._elementContainer.filteredBy(element)) {
            updates.push(`elem_${filteredViz.id()}.refresh();`);
        }
        const vizID = element.chartPanel().id();
        return `
const elem_${element.id()} = new Element(ec)
    .id("${element.id()}")
    .pipeline([
        ${activities.join(",\n        ")}
    ])
    .chartPanel(cp_${vizID})
    .on("selectionChanged", () => {
        ${updates.join("\n        ")}
    }, true)
    ;
ec.append(elem_${element.id()});
`;
    }

    writeDatasources(): string[] {
        let retVal: string[] = [];
        for (const element of this._elementContainer.elements()) {
            retVal = retVal.concat(this.writeDatasource(element));
        }
        return retVal;
    }

    writeWidgets(): { widgetImports: string, widgetDefs: string } {
        const widgetImport: { [moduleID: string]: { [classID: string]: boolean } } = {};
        const jsDef: string[] = [];
        for (const element of this._elementContainer.elements()) {
            const widgetMeta = this.writeWidget(element);
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

    writeElements(): string {
        let retVal = "";
        for (const element of this._elementContainer.elements()) {
            retVal += this.writeElement(element);
        }
        return retVal;
    }

    createJavaScript(): string {
        const widgets = this.writeWidgets();

        return `
${widgets.widgetImports}
import { ChartPanel } from "@hpcc-js/layout";
import { Dashboard, Databomb, Element, ElementContainer, Filters, Form, GroupBy, HipieRequest, Limit, LogicalFile, Project, RoxieRequest, Sort, WUResult } from "@hpcc-js/marshaller";

//  Dashboard Element Container (Model)  ---
const ec = new ElementContainer();

//  Data Sources  ---
${this.writeDatasources().join("\n").trim()}

//  Visualization Widgets (View) ---
${widgets.widgetDefs}

//  Dashboard Elements  (Controller) ---
${this.writeElements().trim()}

ec.refresh();

//  Dashboard (optional) ---
export const dashboard = new Dashboard(ec)
    .target("placeholder")
    .render(w => {
        (w as Dashboard).layout(${stringify(this._dashboard.layout())});
    })
    ;
`;
    }
}
