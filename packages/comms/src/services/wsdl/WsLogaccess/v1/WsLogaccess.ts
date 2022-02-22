import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

type dateTime = string;
type unsignedInt = number;
type long = number;

export enum LogAccessType {
    All = 0,
    ByJobIdID = 1,
    ByComponent = 2,
    ByLogType = 3,
    ByTargetAudience = 4
}

export namespace WsLogaccess {

    export interface GetLogAccessInfoRequest {

    }

    export interface GetLogAccessInfoResponse {
        RemoteLogManagerType: string;
        RemoteLogManagerConnectionString: string;
    }

    export interface Range {
        StartDate?: dateTime;
        EndDate?: dateTime;
    }

    export interface Columns {
        Item: string[];
    }

    export interface GetLogsRequest {
        LogCategory?: LogAccessType;
        SearchByValue?: string;
        Range?: Range;
        LogLineLimit?: unsignedInt;
        LogLineStartFrom?: long;
        Columns?: Columns;
        Format?: string;
    }

    export interface GetLogsResponse {
        LogLines: string;
    }

    export interface ws_logaccessPingRequest {

    }

    export interface ws_logaccessPingResponse {

    }

}

export class LogaccessService extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsLogaccess", "1");
    }

    GetLogAccessInfo(request: WsLogaccess.GetLogAccessInfoRequest): Promise<WsLogaccess.GetLogAccessInfoResponse> {
        return this._connection.send("GetLogAccessInfo", request);
    }

    GetLogs(request: WsLogaccess.GetLogsRequest): Promise<WsLogaccess.GetLogsResponse> {
        return this._connection.send("GetLogs", request);
    }

    Ping(request: WsLogaccess.ws_logaccessPingRequest): Promise<WsLogaccess.ws_logaccessPingResponse> {
        return this._connection.send("Ping", request);
    }

}
