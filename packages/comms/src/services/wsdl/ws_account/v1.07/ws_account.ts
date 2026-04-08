import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsAccount {

    export type int = number;

    export interface MyAccountRequest {

    }

    export interface Exception {
        Code?: string;
        Audience?: string;
        Source?: string;
        Message?: string;
    }

    export interface Exceptions {
        Source?: string;
        Exception?: Exception[];
    }

    export interface Groups {
        Group?: string[];
    }

    export interface MyAccountResponse {
        Exceptions?: Exceptions;
        username?: string;
        firstName?: string;
        lastName?: string;
        passwordExpiration?: string;
        passwordDaysRemaining?: int;
        passwordExpirationWarningDays?: int;
        employeeID?: string;
        distinguishedName?: string;
        accountType?: string;
        passwordNeverExpires?: boolean;
        passwordIsExpired?: boolean;
        CanUpdatePassword?: boolean;
        accountStatus?: int;
        Groups?: Groups;
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
        Exceptions?: Exceptions;
        retcode?: int;
        message?: string;
    }

    export interface UpdateUserInputRequest {

    }

    export interface UpdateUserInputResponse {
        Exceptions?: Exceptions;
        username?: string;
    }

    export interface VerifyUserRequest {
        application?: string;
        version?: string;
    }

    export interface VerifyUserResponse {
        Exceptions?: Exceptions;
        retcode?: int;
    }

}

export class AccountServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "ws_account", "1.07");
    }

    MyAccount(request: WsAccount.MyAccountRequest, abortSignal?: AbortSignal): Promise<WsAccount.MyAccountResponse> {
        return this._connection.send("MyAccount", request, "json", false, abortSignal, "MyAccountResponse");
    }

    Ping(request: WsAccount.ws_accountPingRequest, abortSignal?: AbortSignal): Promise<WsAccount.ws_accountPingResponse> {
        return this._connection.send("Ping", request, "json", false, abortSignal, "ws_accountPingResponse");
    }

    UpdateUser(request: WsAccount.UpdateUserRequest, abortSignal?: AbortSignal): Promise<WsAccount.UpdateUserResponse> {
        return this._connection.send("UpdateUser", request, "json", false, abortSignal, "UpdateUserResponse");
    }

    UpdateUserInput(request: WsAccount.UpdateUserInputRequest, abortSignal?: AbortSignal): Promise<WsAccount.UpdateUserInputResponse> {
        return this._connection.send("UpdateUserInput", request, "json", false, abortSignal, "UpdateUserInputResponse");
    }

    VerifyUser(request: WsAccount.VerifyUserRequest, abortSignal?: AbortSignal): Promise<WsAccount.VerifyUserResponse> {
        return this._connection.send("VerifyUser", request, "json", false, abortSignal, "VerifyUserResponse");
    }

}
