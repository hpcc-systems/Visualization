import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsESDLConfig {

    export type int = number;

    export interface ConfigureESDLBindingLogTransformRequest {
        EsdlBindingId?: string;
        LogTransformName?: string;
        Overwrite?: boolean;
        Encoded?: boolean;
        Config?: string;
        EchoBinding?: boolean;
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

    export interface status {
        Code?: int;
        Description?: string;
    }

    export interface Attribute {
        Name?: string;
        Value?: string;
    }

    export interface Attributes {
        Attribute?: Attribute[];
    }

    export interface Method {
        Name?: string;
        Attributes?: Attributes;
        Elements?: string;
        XML?: string;
    }

    export interface Methods {
        Method?: Method[];
    }

    export interface Service {
        Methods?: Methods;
        Name?: string;
    }

    export interface Services {
        Service?: Service[];
    }

    export interface History {
        PublishBy?: string;
        CreatedTime?: string;
        LastEditBy?: string;
        LastEditTime?: string;
    }

    export interface Definition {
        Name?: string;
        Seq?: int;
        Id?: string;
        Interface?: string;
        Services?: Services;
        History?: History;
    }

    export interface Configuration {
        Methods?: Methods;
    }

    export interface ESDLBinding {
        Definition?: Definition;
        Configuration?: Configuration;
        History?: History;
    }

    export interface ConfigureESDLBindingLogTransformResponse {
        Exceptions?: Exceptions;
        EspProcName?: string;
        EspBindingName?: string;
        EsdlDefinitionID?: string;
        EsdlServiceName?: string;
        status?: status;
        ESDLBinding?: ESDLBinding;
    }

    export interface MethodStructure {
        Name?: string;
        Attributes?: Attributes;
        Elements?: string;
        XML?: string;
    }

    export interface ConfigureESDLBindingMethodRequest {
        EsdlBindingId?: string;
        MethodName?: string;
        Overwrite?: boolean;
        Config?: string;
        MethodStructure?: MethodStructure;
        EchoBinding?: boolean;
    }

    export interface ConfigureESDLBindingMethodResponse {
        Exceptions?: Exceptions;
        EspProcName?: string;
        EspBindingName?: string;
        EsdlDefinitionID?: string;
        EsdlServiceName?: string;
        status?: status;
        ESDLBinding?: ESDLBinding;
    }

    export interface DeleteESDLBindingRequest {
        Id?: string;
        EspProcess?: string;
        EspBinding?: string;
    }

    export interface DeleteESDLRegistryEntryResponse {
        Exceptions?: Exceptions;
        DeletedTree?: string;
        status?: status;
    }

    export interface DeleteESDLDefinitionRequest {
        Id?: string;
        Name?: string;
        Version?: string;
    }

    export interface EchoRequest {
        Request?: string;
    }

    export interface EchoResponse {
        Response?: string;
    }

    export interface GetESDLBindingRequest {
        EsdlBindingId?: string;
        IncludeInterfaceDefinition?: boolean;
        ReportMethodsAvailable?: boolean;
    }

    export interface GetESDLBindingResponse {
        Exceptions?: Exceptions;
        ServiceName?: string;
        EspProcName?: string;
        BindingName?: string;
        EspPort?: string;
        ConfigXML?: string;
        ESDLBinding?: ESDLBinding;
        status?: status;
    }

    export interface GetESDLDefinitionRequest {
        Id?: string;
        Name?: string;
        Seq?: int;
        ServiceName?: string;
        ReportMethodsAvailable?: boolean;
    }

    export interface GetESDLDefinitionResponse {
        Exceptions?: Exceptions;
        status?: status;
        Definition?: Definition;
    }

    export interface ListDESDLEspBindingsReq {
        IncludeESDLBindingInfo?: boolean;
    }

    export interface TpBindingEx {
        TpBindingEx?: TpBindingEx[];
    }

    export interface ESPServer {
        Name?: string;
        Description?: string;
        Build?: string;
        Type?: string;
        Path?: string;
        LogDirectory?: string;
        TpBindingEx?: TpBindingEx;
    }

    export interface ESPServers {
        ESPServer?: ESPServer[];
    }

    export interface ListDESDLEspBindingsResp {
        ESPServers?: ESPServers;
    }

    export interface ListESDLBindingsRequest {

    }

    export interface Binding {
        Id?: string;
        EspProcess?: string;
        Port?: int;
        History?: History;
    }

    export interface Bindings {
        Binding?: Binding[];
    }

    export interface Port {
        Value?: int;
        Bindings?: Bindings;
    }

    export interface Ports {
        Port?: Port[];
    }

    export interface EspProcess {
        Name?: string;
        Ports?: Ports;
    }

    export interface EspProcesses {
        EspProcess?: EspProcess[];
    }

    export interface ListESDLBindingsResponse {
        Exceptions?: Exceptions;
        BindingsXML?: string;
        EspProcesses?: EspProcesses;
    }

    export interface ListESDLDefinitionsRequest {

    }

    export interface Definitions {
        Definition?: Definition[];
    }

    export interface ListESDLDefinitionsResponse {
        Exceptions?: Exceptions;
        Definitions?: Definitions;
    }

    export interface WsESDLConfigPingRequest {

    }

    export interface WsESDLConfigPingResponse {

    }

    export interface PublishESDLBindingRequest {
        EspProcName?: string;
        EspBindingName?: string;
        EspPort?: string;
        EsdlDefinitionID?: string;
        EsdlServiceName?: string;
        Overwrite?: boolean;
        Config?: string;
        Methods?: Methods;
        EchoBinding?: boolean;
    }

    export interface PublishESDLBindingResponse {
        Exceptions?: Exceptions;
        EsdlDefinitionID?: string;
        Overwrite?: boolean;
        EspProcName?: string;
        EspPort?: string;
        status?: status;
        ESDLBinding?: ESDLBinding;
    }

    export interface PublishESDLDefinitionRequest {
        ServiceName?: string;
        XMLDefinition?: string;
        DeletePrevious?: boolean;
        EchoDefinition?: boolean;
    }

    export interface PublishESDLDefinitionResponse {
        Exceptions?: Exceptions;
        ServiceName?: string;
        EsdlVersion?: int;
        DeletePrevious?: boolean;
        status?: status;
        Definition?: Definition;
    }

}

export class ESDLConfigServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsESDLConfig", "1.5");
    }

    ConfigureESDLBindingLogTransform(request: WsESDLConfig.ConfigureESDLBindingLogTransformRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.ConfigureESDLBindingLogTransformResponse> {
        return this._connection.send("ConfigureESDLBindingLogTransform", request, "json", false, abortSignal, "ConfigureESDLBindingLogTransformResponse");
    }

    ConfigureESDLBindingMethod(request: WsESDLConfig.ConfigureESDLBindingMethodRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.ConfigureESDLBindingMethodResponse> {
        return this._connection.send("ConfigureESDLBindingMethod", request, "json", false, abortSignal, "ConfigureESDLBindingMethodResponse");
    }

    DeleteESDLBinding(request: WsESDLConfig.DeleteESDLBindingRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.DeleteESDLRegistryEntryResponse> {
        return this._connection.send("DeleteESDLBinding", request, "json", false, abortSignal, "DeleteESDLRegistryEntryResponse");
    }

    DeleteESDLDefinition(request: WsESDLConfig.DeleteESDLDefinitionRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.DeleteESDLRegistryEntryResponse> {
        return this._connection.send("DeleteESDLDefinition", request, "json", false, abortSignal, "DeleteESDLRegistryEntryResponse");
    }

    Echo(request: WsESDLConfig.EchoRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.EchoResponse> {
        return this._connection.send("Echo", request, "json", false, abortSignal, "EchoResponse");
    }

    GetESDLBinding(request: WsESDLConfig.GetESDLBindingRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.GetESDLBindingResponse> {
        return this._connection.send("GetESDLBinding", request, "json", false, abortSignal, "GetESDLBindingResponse");
    }

    GetESDLDefinition(request: WsESDLConfig.GetESDLDefinitionRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.GetESDLDefinitionResponse> {
        return this._connection.send("GetESDLDefinition", request, "json", false, abortSignal, "GetESDLDefinitionResponse");
    }

    ListDESDLEspBindings(request: WsESDLConfig.ListDESDLEspBindingsReq, abortSignal?: AbortSignal): Promise<WsESDLConfig.ListDESDLEspBindingsResp> {
        return this._connection.send("ListDESDLEspBindings", request, "json", false, abortSignal, "ListDESDLEspBindingsResp");
    }

    ListESDLBindings(request: WsESDLConfig.ListESDLBindingsRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.ListESDLBindingsResponse> {
        return this._connection.send("ListESDLBindings", request, "json", false, abortSignal, "ListESDLBindingsResponse");
    }

    ListESDLDefinitions(request: WsESDLConfig.ListESDLDefinitionsRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.ListESDLDefinitionsResponse> {
        return this._connection.send("ListESDLDefinitions", request, "json", false, abortSignal, "ListESDLDefinitionsResponse");
    }

    Ping(request: WsESDLConfig.WsESDLConfigPingRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.WsESDLConfigPingResponse> {
        return this._connection.send("Ping", request, "json", false, abortSignal, "WsESDLConfigPingResponse");
    }

    PublishESDLBinding(request: WsESDLConfig.PublishESDLBindingRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.PublishESDLBindingResponse> {
        return this._connection.send("PublishESDLBinding", request, "json", false, abortSignal, "PublishESDLBindingResponse");
    }

    PublishESDLDefinition(request: WsESDLConfig.PublishESDLDefinitionRequest, abortSignal?: AbortSignal): Promise<WsESDLConfig.PublishESDLDefinitionResponse> {
        return this._connection.send("PublishESDLDefinition", request, "json", false, abortSignal, "PublishESDLDefinitionResponse");
    }

}
