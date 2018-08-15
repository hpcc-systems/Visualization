import { Connection, Result } from "@hpcc-js/comms";
import { Dashy } from "@hpcc-js/marshaller";
import { Comms } from "@hpcc-js/other";
import { exists, scopedLogger } from "@hpcc-js/util";

const logger = scopedLogger("index.ts");

export class App {
    _dashy = new Dashy();

    constructor(placeholder: string) {
        this._dashy
            .target(placeholder)
            .render()
            ;
        this.parseUrl();
    }

    parseUrl() {
        const _url = new Comms.ESPUrl().url(document.URL);
        if (_url.param("Wuid")) {
            logger.debug(`WU Params:  ${_url.params()}`);
            const baseUrl = `${_url.param("Protocol")}://${_url.param("Hostname")}:${_url.param("Port")}`;
            logger.debug(baseUrl);
            const result = new Result({ baseUrl }, _url.param("Wuid"), _url.param("ResultName"));
            result.fetchRows().then(async (response: any[]) => {
                const ddlStr = response[0][_url.param("ResultName")];
                const ddl = JSON.parse(ddlStr);
                this._dashy.importDDL(ddl, baseUrl, _url.param("Wuid"));
            });
        } else if (_url.param("QueryID")) {
            // http://10.241.100.159:8002/WsEcl/submit/query/roxie/prichajx_govottocustomerstats.ins109_service_1/json
            // ?Protocol=http&Hostname=10.241.100.159&Port=8002&QuerySet=roxie&QueryID=prichajx_govottocustomerstats.ins109_service_1
            logger.debug(`Roxie Params:  ${JSON.stringify(_url.params())}`);
            const baseUrl = `${_url.param("Protocol") || "http"}://${_url.param("Hostname")}:${_url.param("Port")}`;
            const action = `WsEcl/submit/query/${_url.param("QuerySet")}/${_url.param("QueryID")}/json`;
            const responseID = `${_url.param("QueryID")}Response`;
            logger.debug(action);
            const connection = new Connection({ baseUrl });
            connection.send(action, {}).then(response => {
                if (exists(`Results.HIPIE_DDL.Row`, response[responseID]) && response[responseID].Results.HIPIE_DDL.Row.length) {
                    const ddl = JSON.parse(response[responseID].Results.HIPIE_DDL.Row[0].HIPIE_DDL);
                    this._dashy.importDDL(ddl, baseUrl, _url.param("Wuid"));
                }
            });
        } else {
        }
    }

    doResize(width: number, height: number) {
        this._dashy
            .resize({ width, height })
            .lazyRender();
    }
}

window.addEventListener("resize", doResize);
function doResize() {
    let myWidth;
    let myHeight;
    if (typeof (window.innerWidth) === "number") {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
        }
    }
    if (app && myWidth && myHeight) {
        app.doResize(myWidth - 16, myHeight - 16);
    }
}

let app: App;
export function load(target: string) {
    app = new App(target);
    doResize();
}
