import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://localhost:8010/ws_codesign/ListUserIDs?respjson_&&ver_=1
    * http://json2ts.com/
*/
export namespace ListUserIDs {

    export interface Request {
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

    export interface UserIDs {
        Item: string[];
    }

    export interface Response {
        Exceptions: Exceptions;
        UserIDs: UserIDs;
    }
}

export namespace Sign {

    export interface Request {
        SigningMethod?: string;
        UserID: string;
        KeyPass: string;
        Text: string;
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
        RetCode: number;
        ErrMsg: string;
        SignedText: string;
    }
}

export class CodesignService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "ws_codesign", "1");
    }

    connectionOptions(): IOptions {
        return this._connection.opts();
    }

    ListUserIDs(request: ListUserIDs.Request): Promise<string[]> {
        return this._connection.send("ListUserIDs", request).then((response: ListUserIDs.Response) => {
            return response.UserIDs.Item;
        }).catch(e => {
            return [];
        });
    }

    Sign(request: Sign.Request): Promise<Sign.Response> {
        return this._connection.send("Sign", { SigningMethod: "gpg", ...request });
    }
}
