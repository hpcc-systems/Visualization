import { join } from "@hpcc-js/util";
import { createConnection, IConnection, IOptions, ResponseType } from "./connection.ts";

export type ESPResponseType = ResponseType | "json2" | "xsd";

export function isArray(arg: any) {
    return Object.prototype.toString.call(arg) === "[object Array]";
}

export interface Exception {
    Code: number;
    Message: string;
}

export interface Exceptions {
    Source: string;
    Exception: Exception[];
}

export class ESPExceptions extends Error implements Exceptions {
    isESPExceptions = true;
    action: string;
    request: string;
    Source: string;
    Exception: Exception[];

    constructor(action: string, request: any, exceptions: Exceptions) {
        super("ESPException:  " + exceptions.Source);
        this.action = action;
        this.request = request;
        this.Source = exceptions.Source;
        this.Exception = exceptions.Exception;
        if (exceptions.Exception.length) {
            this.message = `${exceptions.Exception[0].Code}:  ${exceptions.Exception[0].Message}`;
        } else {
            this.message = "";
        }
    }
}

export function isExceptions(err: any): err is Exceptions {
    return err instanceof ESPExceptions || (err.isESPExceptions && Array.isArray(err.Exception));
}

function isConnection(optsConnection: IOptions | IConnection): optsConnection is IConnection {
    return (optsConnection as IConnection).send !== undefined;
}

export class ESPConnection implements IConnection {
    private _connection: IConnection;
    get baseUrl() { return this._connection.opts().baseUrl; }
    private _service: string;
    private _version: string;

    constructor(optsConnection: IOptions | IConnection, service: string, version: string) {
        this._connection = isConnection(optsConnection) ? optsConnection : createConnection(optsConnection);
        this._service = service;
        this._version = version;
    }

    service(): string;
    service(_: string): ESPConnection;
    service(_?: string): string | ESPConnection {
        if (_ === void 0) return this._service;
        this._service = _;
        return this;
    }

    version(): string;
    version(_: string): ESPConnection;
    version(_?: string): string | ESPConnection {
        if (_ === void 0) return this._version;
        this._version = _;
        return this;
    }

    toESPStringArray(target: any, arrayName: string): any {
        if (isArray(target[arrayName])) {
            for (let i = 0; i < target[arrayName].length; ++i) {
                target[arrayName + "_i" + i] = target[arrayName][i];
            }
            delete target[arrayName];
        }
        return target;
    }

    //  IConnection  ---
    opts(_: Partial<IOptions>): this;
    opts(): IOptions;
    opts(_?: Partial<IOptions>): this | IOptions {
        if (_ === void 0) return this._connection.opts();
        this._connection.opts(_);
        return this;
    }

    send(action: string, _request: any = {}, espResponseType: ESPResponseType = "json", largeUpload: boolean = false, abortSignal?: AbortSignal, espResponseField?: string): Promise<any> {
        const request = { ..._request, ...{ ver_: this._version } };
        if (largeUpload) {
            request["upload_"] = true;
        }
        if (abortSignal) {
            request["abortSignal_"] = abortSignal;
        }
        let serviceAction: string;
        let responseType: ResponseType = "json";
        switch (espResponseType) {
            case "text":
                serviceAction = join(this._service, action);
                responseType = "text";
                break;
            case "xsd":
                serviceAction = join(this._service, action + ".xsd");
                responseType = "text";
                break;
            case "json2":
                serviceAction = join(this._service, action + "/json");
                espResponseType = "json";
                const actionParts = action.split("/");
                action = actionParts.pop()!;
                break;
            default:
                serviceAction = join(this._service, action + ".json");
        }
        return this._connection.send(serviceAction, request, responseType).then((response) => {
            if (espResponseType === "json") {
                let retVal;
                if (response && response.Exceptions) {
                    throw new ESPExceptions(action, request, response.Exceptions);
                } else if (response) {
                    retVal = response[espResponseField || (action + "Response")];
                }
                if (!retVal) {
                    throw new ESPExceptions(action, request, {
                        Source: "ESPConnection.send",
                        Exception: [{ Code: 0, Message: "Missing Response" }]
                    });
                }
                return retVal;
            }
            return response;
        });
    }

    clone() {
        return new ESPConnection(this._connection.clone(), this._service, this._version);
    }
}

export class Service {
    protected _connection: ESPConnection;
    get baseUrl() { return this._connection.opts().baseUrl; }

    constructor(optsConnection: IOptions | IConnection, service: string, version: string) {
        this._connection = new ESPConnection(optsConnection, service, version);
    }

    opts() {
        return this._connection.opts();
    }

    connection(): ESPConnection {
        return this._connection.clone();
    }
}
