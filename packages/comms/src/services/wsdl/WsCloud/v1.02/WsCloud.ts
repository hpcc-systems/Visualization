import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

export namespace WsCloud {

    export type int = number;

    export interface GetPODsRequest {

    }

    export interface Port {
        ContainerPort: int;
        Name: string;
        Protocol: string;
    }

    export interface Ports {
        Port: Port[];
    }

    export interface Pod {
        Name: string;
        Status: string;
        CreationTimestamp: string;
        ContainerName: string;
        ContainerCount: int;
        ContainerReadyCount: int;
        ContainerRestartCount: int;
        Ports: Ports;
    }

    export interface Pods {
        Pod: Pod[];
    }

    export interface GetPODsResponse {
        Pods: Pods;
    }

    export interface GetServicesRequest {

    }

    export interface GetServicesResponse {
        Result: string;
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

    GetPODs(request: Partial<WsCloud.GetPODsRequest>): Promise<WsCloud.GetPODsResponse> {
        return this._connection.send("GetPODs", request, "json", false, undefined, "GetPODsResponse");
    }

    GetServices(request: Partial<WsCloud.GetServicesRequest>): Promise<WsCloud.GetServicesResponse> {
        return this._connection.send("GetServices", request, "json", false, undefined, "GetServicesResponse");
    }

    Ping(request: Partial<WsCloud.WsCloudPingRequest>): Promise<WsCloud.WsCloudPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WsCloudPingResponse");
    }

}
