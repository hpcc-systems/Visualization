import { DDLEditor, JSEditor, JSONEditor } from "@hpcc-js/codemirror";
import { d3SelectionType, HTMLWidget } from "@hpcc-js/common";
import { Result } from "@hpcc-js/comms";
import { ddl2Schema, upgrade } from "@hpcc-js/ddl-shim";
import { Dashboard, ElementContainer } from "@hpcc-js/marshaller";
import { Comms } from "@hpcc-js/other";
import { DockPanel, SplitPanel } from "@hpcc-js/phosphor";
import { scopedLogger } from "@hpcc-js/util";

const logger = scopedLogger("app");

export class App extends DockPanel {
    private _url = new Comms.ESPUrl().url(document.URL);
    private _ddlv1 = new JSONEditor();
    private _ddlv2_upgraded = new JSONEditor();
    private _elementContainer: ElementContainer = new ElementContainer();
    private _dashboard = new Dashboard(this._elementContainer);
    private _ddlv2 = new JSONEditor();
    private _schema = new JSONEditor();

    constructor() {
        super();
        this.parseParams();
        this._schema.json(ddl2Schema);
    }

    parseParams() {
        if (this._url.param("Wuid")) {
            const baseUrl = `${this._url.param("Protocol")}://${this._url.param("Hostname")}:${this._url.param("Port")}`;
            const fullUrl = `${baseUrl}/WsWorkunits/WUResult.json?Wuid=${this._url.param("Wuid")}&ResultName=${this._url.param("ResultName")}`;
            logger.info(baseUrl);
            const result = new Result({ baseUrl }, this._url.param("Wuid"), this._url.param("ResultName"));
            result.fetchRows().then(async (response: object[]) => {
                const ddl = JSON.parse(response[0][this._url.param("ResultName")]);
                this._ddlv1.json(ddl);
                this._ddlv2_upgraded.json(upgrade(ddl));
                this._elementContainer.importV1DDL(fullUrl, ddl);
                this._dashboard.lazyRender();
                await this._elementContainer.refresh();
                this._ddlv2.json(this._elementContainer.ddl());
            });
        } else if (this._url.param("QueryID")) {
        } else {
            logger.warning(`Unkown Params:  ${this._url.params()}`);
        }
    }

    enter(domNode: HTMLElement, element: d3SelectionType) {
        super.enter(domNode, element);
        this.addWidget(this._ddlv1, "DDL v1");
        this.addWidget(this._ddlv2_upgraded, "DDL v2", "tab-after", this._dashboard);
        this.addWidget(this._dashboard, "Dashboard", "tab-after", this._ddlv2_upgraded);
        this.addWidget(this._ddlv2, "DDL v2", "tab-after", this._dashboard);
        this.addWidget(this._schema, "Schema", "tab-after", this._ddlv2);
    }

    update(domNode: HTMLElement, element: d3SelectionType) {
        super.update(domNode, element);
    }

    exit(domNode?: HTMLElement, element?: d3SelectionType) {
        super.exit(domNode, element);
    }
}
