import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

type int = number;

export namespace WsAccount {

    export interface MyAccountRequest {

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
        Exceptions: {
            Source: string;
            Exception: Exception[];
        };
        username: string;
        firstName: string;
        lastName: string;
        passwordExpiration: string;
        passwordDaysRemaining: int;
        passwordExpirationWarningDays: int;
        employeeID: string;
        distinguishedName: string;
        accountType: string;
        passwordNeverExpires: boolean;
        passwordIsExpired: boolean;
        accountStatus: int;
    }

    export interface ws_accountPingRequest {

    }

    export interface ws_accountPingResponse {

    }

    export interface UpdateUserRequest {
        username?: string;
        oldpass?: string;
        newpass1?: string;
        newpass2?: string;
    }

    export interface UpdateUserResponse {
        Exceptions: Exceptions;
        retcode: int;
        message: string;
    }

    export interface UpdateUserInputRequest {

    }

    export interface UpdateUserInputResponse {
        Exceptions: Exceptions;
        username: string;
    }

    export interface VerifyUserRequest {
        application?: string;
        version?: string;
    }

    export interface VerifyUserResponse {
        Exceptions: Exceptions;
        retcode: int;
    }

}

export class AccountServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "ws_account", "1.05");
    }

    MyAccount(request: WsAccount.MyAccountRequest): Promise<WsAccount.MyAccountResponse> {
        return this._connection.send("MyAccount", request);
    }

    Ping(request: WsAccount.ws_accountPingRequest): Promise<WsAccount.ws_accountPingResponse> {
        return this._connection.send("Ping", request);
    }

    UpdateUser(request: WsAccount.UpdateUserRequest): Promise<WsAccount.UpdateUserResponse> {
        return this._connection.send("UpdateUser", request);
    }

    UpdateUserInput(request: WsAccount.UpdateUserInputRequest): Promise<WsAccount.UpdateUserInputResponse> {
        return this._connection.send("UpdateUserInput", request);
    }

    VerifyUser(request: WsAccount.VerifyUserRequest): Promise<WsAccount.VerifyUserResponse> {
        return this._connection.send("VerifyUser", request);
    }

}
