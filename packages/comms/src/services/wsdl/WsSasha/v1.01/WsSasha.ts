import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

export namespace WsSasha {

    export type unsignedInt = number;

    export enum WUTypes {
        ECL = "ECL",
        DFU = "DFU"
    }

    export interface ArchiveWURequest {
        Wuid?: string;
        WUType?: WUTypes;
        DeleteOnSuccess?: boolean;
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

    export interface ResultResponse {
        Exceptions: Exceptions;
        Result: string;
    }

    export interface GetVersionRequest {

    }

    export interface ListWURequest {
        WUType?: WUTypes;
        Wuid?: string;
        Cluster?: string;
        Owner?: string;
        JobName?: string;
        State?: string;
        FromDate?: string;
        ToDate?: string;
        Archived?: boolean;
        Online?: boolean;
        IncludeDT?: boolean;
        BeforeWU?: string;
        AfterWU?: string;
        MaxNumberWUs?: unsignedInt;
        Descending?: boolean;
        OutputFields?: string;
    }

    export interface WSSashaPingRequest {

    }

    export interface WSSashaPingResponse {

    }

    export interface RestoreWURequest {
        Wuid?: string;
        WUType?: WUTypes;
    }

}

export class SashaServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WSSasha", "1.01");
    }

    ArchiveWU(request: Partial<WsSasha.ArchiveWURequest>): Promise<WsSasha.ResultResponse> {
        return this._connection.send("ArchiveWU", request, "json", false, undefined, "ResultResponse");
    }

    GetVersion(request: Partial<WsSasha.GetVersionRequest>): Promise<WsSasha.ResultResponse> {
        return this._connection.send("GetVersion", request, "json", false, undefined, "ResultResponse");
    }

    ListWU(request: Partial<WsSasha.ListWURequest>): Promise<WsSasha.ResultResponse> {
        return this._connection.send("ListWU", request, "json", false, undefined, "ResultResponse");
    }

    Ping(request: Partial<WsSasha.WSSashaPingRequest>): Promise<WsSasha.WSSashaPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WSSashaPingResponse");
    }

    RestoreWU(request: Partial<WsSasha.RestoreWURequest>): Promise<WsSasha.ResultResponse> {
        return this._connection.send("RestoreWU", request, "json", false, undefined, "ResultResponse");
    }

}
