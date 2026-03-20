import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsCloud {

    export type int = number;

    export interface GetPODsRequest {

    }

    export interface Port {
        ContainerPort?: int;
        Name?: string;
        Protocol?: string;
    }

    export interface Ports {
        Port?: Port[];
    }

    export interface Pod {
        Name?: string;
        Status?: string;
        CreationTimestamp?: string;
        ContainerName?: string;
        ContainerCount?: int;
        ContainerReadyCount?: int;
        ContainerRestartCount?: int;
        Ports?: Ports;
    }

    export interface Pods {
        Pod?: Pod[];
    }

    export interface GetPODsResponse {
        Pods?: Pods;
    }

    export interface GetServicesRequest {

    }

    export interface GetServicesResponse {
        Result?: string;
    }

    export interface WsCloudPingRequest {

    }

    export interface WsCloudPingResponse {

    }

}

export class CloudServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsCloud", "1.02");
    }

    GetPODs(request: WsCloud.GetPODsRequest, abortSignal?: AbortSignal): Promise<WsCloud.GetPODsResponse> {
        return this._connection.send("GetPODs", request, "json", false, abortSignal, "GetPODsResponse");
    }

    GetServices(request: WsCloud.GetServicesRequest, abortSignal?: AbortSignal): Promise<WsCloud.GetServicesResponse> {
        return this._connection.send("GetServices", request, "json", false, abortSignal, "GetServicesResponse");
    }

    Ping(request: WsCloud.WsCloudPingRequest, abortSignal?: AbortSignal): Promise<WsCloud.WsCloudPingResponse> {
        return this._connection.send("Ping", request, "json", false, abortSignal, "WsCloudPingResponse");
    }

}
