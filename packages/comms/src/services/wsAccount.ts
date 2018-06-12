import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://192.168.3.22:8010/Ws_Account/VerifyUser?respjson_
    * http://json2ts.com/
*/
export namespace VerifyUser {

    export interface Request {
        application: string;
        version: string;
    }

    export interface Exception {
        Code: string;
        Audience: string;
        Source: string;
        Message: string;
    }

    export interface Exceptions {
        Source: string;
        Exception: Exception[];
    }

    export interface Response {
        Exceptions: Exceptions;
        retcode: number;
    }
}

export class AccountService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "Ws_Account", "1.03");
    }

    connectionOptions(): IOptions {
        return this._connection.opts();
    }

    VerifyUser(request: VerifyUser.Request): Promise<VerifyUser.Response> {
        return this._connection.send("VerifyUser", request);
    }
}
