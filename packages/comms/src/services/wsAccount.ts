import { IConnection, IOptions } from "../connection";
import { ESPConnection, ESPExceptions } from "../espConnection";

/*
    Response structures generated via:
    * http://localhost:8010/Ws_Account/?reqjson_
    * http://localhost:8010/Ws_Account/?respjson_
    * http://json2ts.com/
*/
export namespace WsAccount {

    export interface MyAccountRequest {
    }

    export interface WsAccountPingRequest {
    }

    export interface UpdateUserRequest {
        username: string;
        oldpass: string;
        newpass1: string;
        newpass2: string;
    }

    export interface UpdateUserInputRequest {
    }

    export interface VerifyUserRequest {
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

    export interface MyAccountResponse {
        Exceptions: Exceptions;
        username: string;
        firstName: string;
        lastName: string;
        passwordExpiration: string;
        passwordDaysRemaining: number;
        passwordExpirationWarningDays: number;
        employeeID: string;
        distinguishedName: string;
        accountType: string;
        passwordNeverExpires: boolean;
        passwordIsExpired: boolean;
        accountStatus: number;
    }

    export interface WsAccountPingResponse {
    }

    export interface UpdateUserResponse {
        Exceptions: Exceptions;
        retcode: number;
        message: string;
    }

    export interface UpdateUserInputResponse {
        Exceptions: Exceptions;
        username: string;
    }

    export interface VerifyUserResponse {
        Exceptions: Exceptions;
        retcode: number;
    }
}

export class AccountService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "Ws_Account", "1.05");
    }

    connectionOptions(): IOptions {
        return this._connection.opts();
    }

    MyAccount(request: WsAccount.MyAccountRequest): Promise<WsAccount.MyAccountResponse> {
        return this._connection.send("MyAccount", request);
    }

    UpdateUser(request: WsAccount.UpdateUserRequest): Promise<WsAccount.UpdateUserResponse> {
        return this._connection.send("UpdateUser", request);
    }

    UpdateUserInput(request: WsAccount.UpdateUserInputRequest): Promise<WsAccount.UpdateUserInputResponse> {
        return this._connection.send("UpdateUserInput", request);
    }

    VerifyUser(request: WsAccount.VerifyUserRequest): Promise<WsAccount.VerifyUserResponse> {
        return this._connection.send("VerifyUser", request)
            .catch((e: ESPExceptions) => {
                //  old client version warning  ---
                if (e.isESPExceptions && e.Exception.some(exception => exception.Code === 20043)) {
                    return {
                        retcode: 20043,
                        Exceptions: {
                            Source: "wsAccount",
                            Exception: e.Exception
                        }
                    };
                }
                throw e;
            });
    }
}
