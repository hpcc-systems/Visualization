import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

type unsignedInt = number;

export namespace WsResources {

    export interface WsResourcesPingRequest {

    }

    export interface WsResourcesPingResponse {

    }

    export interface ServiceQueryRequest {
        Type?: string;
        Name?: string;
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

    export interface Service {
        Name: string;
        Type: string;
        Port: unsignedInt;
        TLSSecure: boolean;
    }

    export interface Services {
        Service: Service[];
    }

    export interface ServiceQueryResponse {
        Exceptions: {
            Source: string;
            Exception: Exception[];
        };
        Services: {
            Service: Service[];
        };
    }

    export interface WebLinksQueryRequest {

    }

    export interface NamedValue {
        Name: string;
        Value: string;
    }

    export interface Annotations {
        NamedValue: NamedValue[];
    }

    export interface DiscoveredWebLink {
        ServiceName: string;
        NameSpace: string;
        Annotations: {
            NamedValue: NamedValue[];
        };
    }

    export interface DiscoveredWebLinks {
        DiscoveredWebLink: DiscoveredWebLink[];
    }

    export interface ConfiguredWebLink {
        Name: string;
        Description: string;
        URL: string;
    }

    export interface ConfiguredWebLinks {
        ConfiguredWebLink: ConfiguredWebLink[];
    }

    export interface WebLinksQueryResponse {
        Exceptions: Exceptions;
        DiscoveredWebLinks: {
            DiscoveredWebLink: DiscoveredWebLink[];
        };
        ConfiguredWebLinks: {
            ConfiguredWebLink: ConfiguredWebLink[];
        };
    }

}

export class ResourcesServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsResources", "1.01");
    }

    Ping(request: WsResources.WsResourcesPingRequest): Promise<WsResources.WsResourcesPingResponse> {
        return this._connection.send("Ping", request);
    }

    ServiceQuery(request: WsResources.ServiceQueryRequest): Promise<WsResources.ServiceQueryResponse> {
        return this._connection.send("ServiceQuery", request);
    }

    WebLinksQuery(request: WsResources.WebLinksQueryRequest): Promise<WsResources.WebLinksQueryResponse> {
        return this._connection.send("WebLinksQuery", request);
    }

}
