import { PropertyExt } from "@hpcc-js/common";
import { Dashboard } from "./dashboard";
import { Viz } from "./viz";

export class JavaScriptAdapter {
    private _dashboard: Dashboard;

    constructor(dashboard: Dashboard) {
        this._dashboard = dashboard;
    }

    dummy(viz: Viz) {
        const dashboard = new Dashboard();
        const viz0 = new Viz(dashboard)
            .title(viz.title())
            ;
        viz0;
    }

    createDashboard() {
        const retVal = `const dashboard = new Dashboard();\n`;
        return retVal;
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
                            retVal.push(`XXX${prefix}.${meta.id}([${(pe as any)[meta.id]()}])${postfix};`);
                        break;
                    default:
                        break;
                }
            }
        }
        return retVal;
    }

    createVisualizations() {
        let retVal = "";
        let vizID = 0;
        for (const viz of this._dashboard.visualizations()) {
            retVal += `const viz_${++vizID} = new Viz(dashboard);\n`;
            retVal += this.createProps(`viz_${vizID}`, viz).join("\n") + "\n";
            retVal += "";
        }
        return retVal;
    }

    createJavaScript(): string {
        const retVal = `import {} from "";\n` +
            `\n` +
            `${this.createDashboard()}\n` +
            `${this.createVisualizations()}\n` +
            ``;
        return retVal;
    }
}
