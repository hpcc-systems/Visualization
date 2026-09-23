import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsResources {

    export type unsignedInt = number;

    export enum HPCCQueueType {
        Thor = "Thor",
        HThor = "HThor",
        Roxie = "Roxie",
        All = "All"
    }

    export enum ExternalIPStatus {
        Unknown = "Unknown",
        None = "None",
        Pending = "Pending"
    }

    export enum ResourceType {
        UNKNOWN = "UNKNOWN",
        TRACES = "TRACES",
        LOGS = "LOGS",
        METRICS = "METRICS"
    }

    export interface WsResourcesPingRequest {

    }

    export interface WsResourcesPingResponse {

    }

    export interface ServiceQueryRequest {
        Type?: string;
        Name?: string;
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

    export interface Service {
        Name?: string;
        Type?: string;
        Port?: unsignedInt;
        TLSSecure?: boolean;
    }

    export interface Services {
        Service?: Service[];
    }

    export interface ServiceQueryResponse {
        Exceptions?: Exceptions;
        Services?: Services;
    }

    export interface TargetQueryRequest {
        Type?: HPCCQueueType;
    }

    export interface HPCCQueue {
        Name?: string;
        Type?: HPCCQueueType;
    }

    export interface Queues {
        HPCCQueue?: HPCCQueue[];
    }

    export interface Roxies {
        Item?: string[];
    }

    export interface TargetQueryResponse {
        Exceptions?: Exceptions;
        Queues?: Queues;
        Roxies?: Roxies;
    }

    export interface WebLinksQueryRequest {

    }

    export interface NamedValue {
        Name?: string;
        Value?: string;
    }

    export interface Annotations {
        NamedValue?: NamedValue[];
    }

    export interface ExternalIPs {
        Item?: string[];
    }

    export interface ServicePorts {
        Name?: string;
        Protocol?: string;
        Port?: unsignedInt;
    }

    export interface Ports {
        ServicePorts?: ServicePorts[];
    }

    export interface Connection {
        Type?: string;
        ExternalIPs?: ExternalIPs;
        ExternalIPStatus?: ExternalIPStatus;
        Ports?: Ports;
    }

    export interface DiscoveredWebLink {
        ServiceName?: string;
        NameSpace?: string;
        Annotations?: Annotations;
        Connection?: Connection;
    }

    export interface DiscoveredWebLinks {
        DiscoveredWebLink?: DiscoveredWebLink[];
    }

    export interface ConfiguredWebLink {
        Name?: string;
        Description?: string;
        URL?: string;
        ResourceType?: ResourceType;
    }

    export interface ConfiguredWebLinks {
        ConfiguredWebLink?: ConfiguredWebLink[];
    }

    export interface WebLinksQueryResponse {
        Exceptions?: Exceptions;
        DiscoveredWebLinks?: DiscoveredWebLinks;
        ConfiguredWebLinks?: ConfiguredWebLinks;
    }

}

export class ResourcesServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsResources", "1.04");
    }

    Ping(request: WsResources.WsResourcesPingRequest, abortSignal?: AbortSignal): Promise<WsResources.WsResourcesPingResponse> {
        return this._connection.send("Ping", request, "json", false, abortSignal, "WsResourcesPingResponse");
    }

    ServiceQuery(request: WsResources.ServiceQueryRequest, abortSignal?: AbortSignal): Promise<WsResources.ServiceQueryResponse> {
        return this._connection.send("ServiceQuery", request, "json", false, abortSignal, "ServiceQueryResponse");
    }

    TargetQuery(request: WsResources.TargetQueryRequest, abortSignal?: AbortSignal): Promise<WsResources.TargetQueryResponse> {
        return this._connection.send("TargetQuery", request, "json", false, abortSignal, "TargetQueryResponse");
    }

    WebLinksQuery(request: WsResources.WebLinksQueryRequest, abortSignal?: AbortSignal): Promise<WsResources.WebLinksQueryResponse> {
        return this._connection.send("WebLinksQuery", request, "json", false, abortSignal, "WebLinksQueryResponse");
    }

}
