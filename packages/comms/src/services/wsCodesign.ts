import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://localhost:8010/ws_codesign/ListUserIDs?respjson_&&ver_=1
    * http://json2ts.com/
*/
export namespace WsCodesign {

    export interface ListUserIDsRequest {
    }

    export interface WsCodesignPingRequest {
    }

    export interface SignRequest {
        SigningMethod: string;
        UserID: string;
        KeyPass: string;
        Text: string;
    }

    export interface VerifyRequest {
        Text: string;
    }

    export interface Request {
        ListUserIDsRequest: ListUserIDsRequest;
        ws_codesignPingRequest: WsCodesignPingRequest;
        SignRequest: SignRequest;
        VerifyRequest: VerifyRequest;
    }

    export interface Examples {
        Request: Request[];
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

    export interface ListUserIDsResponse {
        Exceptions: Exceptions;
        UserIDs: UserIDs;
    }

    export interface WsCodesignPingResponse {
    }

    export interface Exception2 {
        Code: string;
        Audience: string;
        Source: string;
        Message: string;
    }

    export interface Exceptions2 {
        Source: string;
        Exception: Exception2[];
    }

    export interface SignResponse {
        Exceptions: Exceptions2;
        RetCode: number;
        ErrMsg: string;
        SignedText: string;
    }

    export interface Exception3 {
        Code: string;
        Audience: string;
        Source: string;
        Message: string;
    }

    export interface Exceptions3 {
        Source: string;
        Exception: Exception3[];
    }

    export interface VerifyResponse {
        Exceptions: Exceptions3;
        RetCode: number;
        ErrMsg: string;
        IsVerified: boolean;
        SignedBy: string;
    }

    export interface Response {
        ListUserIDsResponse: ListUserIDsResponse;
        ws_codesignPingResponse: WsCodesignPingResponse;
        SignResponse: SignResponse;
        VerifyResponse: VerifyResponse;
    }

    export interface Examples {
        Response: Response[];
    }
}

export class CodesignService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "ws_codesign", "1.1");
    }

    connectionOptions(): IOptions {
        return this._connection.opts();
    }

    ListUserIDs(request: WsCodesign.ListUserIDsRequest): Promise<string[]> {
        return this._connection.send("ListUserIDs", request).then((response: WsCodesign.ListUserIDsResponse) => {
            return response.UserIDs.Item;
        }).catch(e => {
            return [];
        });
    }

    Sign(request: WsCodesign.SignRequest): Promise<WsCodesign.SignResponse> {
        return this._connection.send("Sign", { SigningMethod: "gpg", ...request });
    }

    Verify(request: WsCodesign.VerifyRequest): Promise<WsCodesign.VerifyResponse> {
        return this._connection.send("Verify", request);
    }
}
