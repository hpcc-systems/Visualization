import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

export namespace WsAccount {

    export type int = number;

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
        Exceptions: Exceptions;
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
        CanUpdatePassword: boolean;
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
        super(optsConnection, "ws_account", "1.06");
    }

    MyAccount(request: Partial<WsAccount.MyAccountRequest>): Promise<WsAccount.MyAccountResponse> {
        return this._connection.send("MyAccount", request, "json", false, undefined, "MyAccountResponse");
    }

    Ping(request: Partial<WsAccount.ws_accountPingRequest>): Promise<WsAccount.ws_accountPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "ws_accountPingResponse");
    }

    UpdateUser(request: Partial<WsAccount.UpdateUserRequest>): Promise<WsAccount.UpdateUserResponse> {
        return this._connection.send("UpdateUser", request, "json", false, undefined, "UpdateUserResponse");
    }

    UpdateUserInput(request: Partial<WsAccount.UpdateUserInputRequest>): Promise<WsAccount.UpdateUserInputResponse> {
        return this._connection.send("UpdateUserInput", request, "json", false, undefined, "UpdateUserInputResponse");
    }

    VerifyUser(request: Partial<WsAccount.VerifyUserRequest>): Promise<WsAccount.VerifyUserResponse> {
        return this._connection.send("VerifyUser", request, "json", false, undefined, "VerifyUserResponse");
    }

}
