import { join, scopedLogger } from "@hpcc-js/util";

const logger = scopedLogger("comms/connection.ts");

export type RequestType = "post" | "get" | "jsonp";

export type ResponseType = "json" | "text";

export interface IOptions {
    baseUrl: string;
    type?: RequestType;
    userID?: string;
    password?: string;
    rejectUnauthorized?: boolean;
    timeoutSecs?: number;
}

const DefaultOptions: IOptions = {
    type: "post",
    baseUrl: "",
    userID: "",
    password: "",
    rejectUnauthorized: false,
    timeoutSecs: 60
};

export interface IConnection {
    opts(_: Partial<IOptions>): this;
    opts(): IOptions;

    send(action: string, request: any, responseType?: ResponseType): Promise<any>;
    clone(): IConnection;
}

//  Polyfill helpers  ---
let _nodeRequest: any = null;
export function initNodeRequest(nodeRequest: any) {
    _nodeRequest = nodeRequest;
}

let _d3Request: any = null;
export function initD3Request(d3Request: any) {
    _d3Request = d3Request;
}

//  comms  ---
export function serializeRequest(obj: any, prefix: string = ""): string {
    if (prefix) {
        prefix += ".";
    }
    if (typeof obj !== "object") {
        return encodeURIComponent(obj);
    }

    const str: string[] = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] instanceof Array) {
                //  Specific to ESP - but no REST standard exists...
                let includeItemCount = false;
                obj[key].forEach((row: any, i: number) => {
                    if (typeof row === "object") {
                        includeItemCount = true;
                        str.push(serializeRequest(row, prefix + encodeURIComponent(`${key}.${i}`)));
                    } else {
                        str.push(prefix + encodeURIComponent(`${key}_i${i}`) + "=" + serializeRequest(row));
                    }
                });
                if (includeItemCount) {
                    str.push(prefix + encodeURIComponent(`${key}.itemcount`) + "=" + obj[key].length);
                }
            } else if (typeof obj[key] === "object") {
                if (obj[key] && obj[key]["Item"] instanceof Array) {  // Specific to ws_machine.GetTargetClusterInfo?
                    str.push(serializeRequest(obj[key]["Item"], prefix + encodeURIComponent(key)));
                    str.push(prefix + encodeURIComponent(`${key}.itemcount`) + "=" + obj[key]["Item"].length);
                } else {
                    str.push(serializeRequest(obj[key], prefix + encodeURIComponent(key)));
                }
            } else if (obj[key] !== undefined) {
                str.push(prefix + encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
            } else {
                str.push(prefix + encodeURIComponent(key));
            }
        }
    }
    return str.join("&");
}

export function deserializeResponse(body: string) {
    return JSON.parse(body);
}

export function jsonp(opts: IOptions, action: string, request: any = {}, responseType: ResponseType = "json"): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let respondedTimeout = opts.timeoutSecs! * 1000;
        const respondedTick = 5000;
        const callbackName = "jsonp_callback_" + Math.round(Math.random() * 999999);
        (window as any)[callbackName] = function (response: any) {
            respondedTimeout = 0;
            doCallback();
            resolve(responseType === "json" && typeof response === "string" ? deserializeResponse(response) : response);
        };
        const script = document.createElement("script");
        let url = join(opts.baseUrl, action);
        url += url.indexOf("?") >= 0 ? "&" : "?";
        script.src = url + "jsonp=" + callbackName + "&" + serializeRequest(request);
        document.body.appendChild(script);
        const progress = setInterval(function () {
            if (respondedTimeout <= 0) {
                clearInterval(progress);
            } else {
                respondedTimeout -= respondedTick;
                if (respondedTimeout <= 0) {
                    clearInterval(progress);
                    logger.error("Request timeout:  " + script.src);
                    doCallback();
                    reject(Error("Request timeout:  " + script.src));
                } else {
                    logger.debug("Request pending (" + respondedTimeout / 1000 + " sec):  " + script.src);
                }
            }
        }, respondedTick);

        function doCallback() {
            delete (window as any)[callbackName];
            document.body.removeChild(script);
        }
    });
}

function nodeRequestSend(opts: IOptions, verb: "POST" | "GET", action: string, request: any, responseType: ResponseType = "json"): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const options: any = {
            method: verb,
            uri: join(opts.baseUrl, action),
            auth: {
                user: opts.userID,
                pass: opts.password,
                sendImmediately: true
            },
            username: opts.userID,
            password: opts.password,
            timeout: opts.timeoutSecs! * 1000
        };
        //  Older ESP versions were not case insensitive  ---
        const oldESPAuth = `Basic ${btoa(opts.userID + ":" + opts.password)}`;
        switch (verb) {
            case "GET":
                options.headers = {
                    Authorization: oldESPAuth
                };
                options.uri += "?" + serializeRequest(request);
                break;
            case "POST":
                options.headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": oldESPAuth
                };
                options.rejectUnauthorized = opts.rejectUnauthorized;
                options.body = serializeRequest(request);
                break;
            default:
        }
        _nodeRequest(options, (err: any, resp: any, body: any) => {
            if (err) {
                reject(new Error(err));
            } else if (resp && resp.statusCode === 200) {
                resolve(responseType === "json" ? deserializeResponse(body) : body);
            } else {
                reject(new Error(body));
            }
        });
    });
}

function d3Send(opts: IOptions, verb: "POST" | "GET", action: string, request: any, responseType: ResponseType = "json"): Promise<any> {
    return new Promise((resolve, reject) => {
        const options: any = {
            method: verb,
            uri: join(opts.baseUrl, action),
            auth: {
                user: opts.userID,
                pass: opts.password,
                sendImmediately: true
            },
            username: opts.userID,
            password: opts.password
        };
        switch (verb) {
            case "GET":
                options.uri += "?" + serializeRequest(request);
                break;
            case "POST":
                options.headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                };
                options.rejectUnauthorized = opts.rejectUnauthorized;
                options.body = serializeRequest(request);
                break;
            default:
        }
        const xhr = _d3Request(options.uri)
            .timeout(opts.timeoutSecs! * 1000)
            ;
        if (verb === "POST") {
            xhr
                .header("X-Requested-With", "XMLHttpRequest")
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Origin", null)
                ;
        }
        xhr
            .send(verb, options.body, (err: any, resp: any) => {
                if (err) {
                    reject(new Error(err));
                } else if (resp && resp.status === 200) {
                    resolve(responseType === "json" ? deserializeResponse(resp.responseText) : resp.responseText);
                } else {
                    reject(new Error(resp.responseText));
                }
            });
    });
}

export function post(opts: IOptions, action: string, request: any, responseType: ResponseType = "json"): Promise<any> {
    if (_nodeRequest) {
        return nodeRequestSend(opts, "POST", action, request, responseType);
    } else if (_d3Request) {
        return d3Send(opts, "POST", action, request, responseType);
    }
    throw new Error("No transport");
}

export function get(opts: IOptions, action: string, request: any, responseType: ResponseType = "json"): Promise<any> {
    if (_nodeRequest) {
        return nodeRequestSend(opts, "GET", action, request, responseType);
    } else if (_d3Request) {
        return d3Send(opts, "GET", action, request, responseType);
    }
    throw new Error("No transport");
}

export type SendFunc = (opts: IOptions, action: string, request: any, responseType: ResponseType) => Promise<any>;
export function send(opts: IOptions, action: string, request: any, responseType: ResponseType = "json"): Promise<any> {
    let retVal: Promise<any>;
    switch (opts.type) {
        case "jsonp":
            retVal = jsonp(opts, action, request, responseType);
            break;
        case "get":
            retVal = get(opts, action, request, responseType);
            break;
        case "post":
        default:
            retVal = post(opts, action, request, responseType);
            break;
    }
    return retVal;
}

let hookedSend: SendFunc = send;
export function hookSend(newSend?: SendFunc): SendFunc {
    const retVal = hookedSend;
    if (newSend) {
        hookedSend = newSend;
    }
    return retVal;
}

export class Connection implements IConnection {
    protected _opts: IOptions;

    constructor(opts: IOptions) {
        this.opts(opts);
    }

    //  IConnection  ---
    opts(_: Partial<IOptions>): this;
    opts(): IOptions;
    opts(_?: Partial<IOptions>): this | IOptions {
        if (arguments.length === 0) return this._opts;
        this._opts = { ...DefaultOptions, ..._ };
        return this;
    }

    send(action: string, request: any, responseType: ResponseType = "json"): Promise<any> {
        return hookedSend(this._opts, action, request, responseType);
    }

    clone() {
        return new Connection(this.opts());
    }
}

export type IConnectionFactory = (opts: IOptions) => IConnection;
export let createConnection: IConnectionFactory = function (opts: IOptions): IConnection {
    return new Connection(opts);
};

export function setTransportFactory(newFunc: IConnectionFactory): IConnectionFactory {
    const retVal = createConnection;
    createConnection = newFunc;
    return retVal;
}
