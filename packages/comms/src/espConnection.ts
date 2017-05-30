import { join } from "@hpcc-js/util";
import { createConnection, IConnection, IOptions, ResponseType } from "./connection";

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
    readonly isESPExceptions = true;
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
    }
}

function isConnection(optsConnection: IOptions | IConnection): optsConnection is IConnection {
    return (optsConnection as IConnection).send !== undefined;
}

export class ESPConnection implements IConnection {
    private _connection: IConnection;
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

    send(action: string, _request: any = {}, responseType: ResponseType = ResponseType.JSON): Promise<any> {
        const request = { ..._request, ...{ ver_: this._version } };
        let serviceAction;
        switch (responseType) {
            case ResponseType.XSD:
                serviceAction = join(this._service, action + ".xsd");
                break;
            case ResponseType.JSON2:
                serviceAction = join(this._service, action + "/json");
                responseType = ResponseType.JSON;
                const actionParts = action.split("/");
                action = actionParts.pop()!;
                break;
            default:
                serviceAction = join(this._service, action + ".json");
        }
        return this._connection.send(serviceAction, request, responseType).then((response) => {
            if (responseType === ResponseType.JSON) {
                if (response.Exceptions) {
                    throw new ESPExceptions(action, request, response.Exceptions);
                }
                const retVal = response[`${action === "WUCDebug" ? "WUDebug" : action}Response`];
                if (!retVal) {
                    throw new ESPExceptions(action, request, {
                        Source: "ESPConnection.transmit",
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
