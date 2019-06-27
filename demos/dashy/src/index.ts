import { event as d3Event } from "@hpcc-js/common";
import { Connection, Result } from "@hpcc-js/comms";
import { Dashboard, Dashy, Databomb, ElementContainer, Form, LogicalFile, RoxieResult, RoxieService, WU, WUResult } from "@hpcc-js/marshaller";
import { Comms } from "@hpcc-js/other";
import { exists, scopedLogger } from "@hpcc-js/util";
import { sample } from "./sample";

const logger = scopedLogger("index.ts");

/* Test race condition  ---
import { hookSend, IOptions, ResponseType, SendFunc } from "@hpcc-js/comms";
let delay = 0;
const origSend: SendFunc = hookSend(function mySend(opts: IOptions, action: string, request: any, responseType: ResponseType) {
    return new Promise((resolve, reject) => {
        origSend(opts, action, request, responseType).then(response => {
            delay += 1000;
            if (delay > 5000) delay = 0;
            setTimeout(() => {
                resolve(response);
            }, delay);
        });
    });
});
*/

export class App {
    _dashy: Dashy | Dashboard;
    _layoutJson = {};

    constructor(placeholder: string) {
        this.init(placeholder, document.URL);
    }

    event() {
        return d3Event || event;
    }

    importDDL(ddlStr: string, baseUrl: string, wuid: string, layoutJson) {
        const ddl = JSON.parse(ddlStr);
        this._dashy.importDDL(ddl, baseUrl, wuid, layoutJson);
    }

    init(placeholder: string, urlStr, layoutJson?) {
        const _url = new Comms.ESPUrl().url(urlStr);
        if (!!_url.param("dashboard")) {
            this._dashy = new Dashboard(new ElementContainer())
                .target(placeholder)
                .hideSingleTabs(true)
                .titleVisible(false)
                .render()
                ;
        } else {
            this._dashy = new Dashy()
                .target(placeholder)
                .render()
                ;
        }

        this._dashy.element()
            .on("drop", () => this.dropHandler(this.event()))
            .on("dragover", () => this.dragOverHandler(this.event()))
            ;

        if (_url.param("Wuid")) {
            logger.debug(`WU Params:  ${_url.params()}`);
            const baseUrl = `${_url.param("Protocol")}://${_url.param("Hostname")}:${_url.param("Port")}`;
            logger.debug(baseUrl);
            const result = new Result({ baseUrl }, _url.param("Wuid"), _url.param("ResultName"));
            result.fetchRows().then(async (response: any[]) => {
                this.importDDL(response[0][_url.param("ResultName")], baseUrl, _url.param("Wuid"), layoutJson);
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
                if (exists("Results.HIPIE_DDL.Row", response[responseID]) && response[responseID].Results.HIPIE_DDL.Row.length) {
                    this.importDDL(response[responseID].Results.HIPIE_DDL.Row[0].HIPIE_DDL, baseUrl, _url.param("Wuid"), layoutJson);
                }
            });
        } else if (_url.param("dsp")) {
            const dsp = document.URL.split("dsp=")[1].split("&")[0].split("%26").join("&");
            fetch(dsp)
                .then(resp => resp.json())
                .then(json => {
                    const protocol = json.response.LayoutText.__properties.ddlUrl.split("://")[0];
                    const hostname = json.response.LayoutText.__properties.ddlUrl.split(":")[1].slice(2);
                    const port = json.response.LayoutText.__properties.ddlUrl.split(":")[2].split("/")[0];
                    const urlStr = json.response.LayoutText.__properties.ddlUrl + `&Protocol=${protocol}&Hostname=${hostname}&Port=${port}`;
                    this.init(placeholder, urlStr, json.response.LayoutText);
                })
                ;

        } else if (false) {
            //  Lets add some demo datasoures
            const ec = this._dashy.elementContainer();
            const datasources = ec.datasources();
            const publicRoxie = new RoxieService(ec)
                .url("http://52.210.14.156:8002")
                .querySet("roxie")
                .queryID("peopleaccounts")
                ;

            const vmRoxie = new RoxieService(ec)
                .url("http://192.168.3.22:8002")
                .querySet("roxie")
                .queryID("peopleaccounts")
                ;

            for (const datasource of [
                new WUResult(ec)
                    .wu(
                        new WU(ec)
                            .url("http://52.210.14.156:8010")
                            .wuid("W20180513-082149")
                    )
                    .resultName("Result 1")
                ,
                new LogicalFile(ec)
                    .url("http://52.210.14.156:8010")
                    .logicalFile("progguide::exampledata::peopleaccts")
                ,
                new RoxieResult(ec)
                    .service(publicRoxie)
                    .resultName("Accounts"),
                new Databomb()
                    .payload(JSON.stringify([]))
                ,
                new Form()
                    .payload({
                        id: 770,
                        fname: "TIMTOHY",
                        lname: "SALEEMI",
                        minitial: "",
                        gender: "M",
                        street: "1734 NOSTRAND AVE # 3",
                        city: "DRACUT",
                        st: "MA",
                        zip: "01826"
                    }),
                new WUResult(ec)
                    .wu(
                        new WU(ec)
                            .url("http://192.168.3.22:8010")
                            .wuid("W20171201-153452")
                    )
                    .resultName("Result 1")
                ,
                new LogicalFile(ec)
                    .url("http://192.168.3.22:8010")
                    .logicalFile("progguide::exampledata::peopleaccts")
                ,
                new RoxieResult(ec)
                    .service(vmRoxie)
                    .resultName("Accounts")
            ]) {
                datasources.push(datasource);
            }
        }
    }

    doResize(width: number, height: number) {
        this._dashy
            .resize({ width, height })
            .lazyRender();
    }

    loadFile(file) {
        const ext = file.name.split(".").pop();
        switch (ext) {
            case "csv":
            case "tsv":
            case "json":
                break;
            default:
                alert(`Unsupported file type "${ext}".\nSupported file types are "json", "csv", "tsv".`);
                return;
        }

        const reader = new FileReader();
        const context = this;
        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            const ext = theFile.name.split(".").pop();
            return function (e) {
                context._dashy.addDatabomb(theFile.name, e.target.result, ext);
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsText(file);
    }

    dropHandler(evt) {
        console.log("File(s) dropped");

        // Prevent default behavior (Prevent file from being opened)
        evt.preventDefault();

        if (evt.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < evt.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (evt.dataTransfer.items[i].kind === "file") {
                    const file = evt.dataTransfer.items[i].getAsFile();
                    console.log("... file[" + i + "].name = " + file.name);
                    this.loadFile(file);
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < evt.dataTransfer.files.length; i++) {
                console.log("... file[" + i + "].name = " + evt.dataTransfer.files[i].name);
                this.loadFile(evt.dataTransfer.files[i]);
            }
        }

        // Pass event to removeDragData for cleanup
        this.removeDragData(evt);
    }

    dragOverHandler(evt) {
        console.log("File(s) in drop zone");

        // Prevent default behavior (Prevent file from being opened)
        evt.preventDefault();
    }

    removeDragData(ev) {
        console.log("Removing drag data");

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to remove the drag data
            ev.dataTransfer.items.clear();
        } else {
            // Use DataTransfer interface to remove the drag data
            ev.dataTransfer.clearData();
        }
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
export function loadDashy(target: string) {
    app = new App(target);
    doResize();

}

export function loadDashboard(target: string) {
    const ec = new ElementContainer();
    const dashboard = new Dashboard(ec);
    dashboard
        .target(target)
        .titleVisible(false)
        .hideSingleTabs(true)
        .restore(sample as any)
        .render(w => {
            ec.refresh();
        })
        ;
}
