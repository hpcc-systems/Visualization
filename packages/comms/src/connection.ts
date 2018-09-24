import { join, promiseTimeout, scopedLogger } from "@hpcc-js/util";

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

function authHeader(opts: IOptions): object {
    return opts.userID ? { Authorization: `Basic ${btoa(`${opts.userID}:${opts.password}`)}` } : {};
}

//  _omitMap is a workaround for older HPCC-Platform instances without credentials ---
const _omitMap: { [baseUrl: string]: boolean } = {};
function doFetch(opts: IOptions, action: string, requestInit: RequestInit, headersInit: HeadersInit, responseType: string) {
    headersInit = {
        ...authHeader(opts),
        ...headersInit
    };

    requestInit = {
        credentials: _omitMap[opts.baseUrl] ? "omit" : "include",
        ...requestInit,
        headers: headersInit
    };

    function handleResponse(response: Response): Promise<any> {
        if (response.ok) {
            return responseType === "json" ? response.json() : response.text();
        }
        throw new Error(response.statusText);
    }

    return promiseTimeout(opts.timeoutSecs! * 1000, fetch(join(opts.baseUrl, action), requestInit)
        .then(handleResponse)
        .catch(e => {
            //  Try again with the opposite credentials mode  ---
            requestInit.credentials = !_omitMap[opts.baseUrl] ? "omit" : "include";
            return fetch(join(opts.baseUrl, action), requestInit)
                .then(handleResponse)
                .then(responseBody => {
                    _omitMap[opts.baseUrl] = !_omitMap[opts.baseUrl];  // The "opposite" credentials mode is known to work  ---
                    return responseBody;
                });
        })
    );
}

export function post(opts: IOptions, action: string, request: any, responseType: ResponseType = "json"): Promise<any> {
    return doFetch(opts, action, {
        method: "post",
        body: serializeRequest(request)
    }, {
        "Content-Type": "application/x-www-form-urlencoded"
    } as any, responseType);
}

export function get(opts: IOptions, action: string, request: any, responseType: ResponseType = "json"): Promise<any> {
    return doFetch(opts, `${action}?${serializeRequest(request)}`, {
        method: "get"
    }, {
    } as any, responseType);
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
