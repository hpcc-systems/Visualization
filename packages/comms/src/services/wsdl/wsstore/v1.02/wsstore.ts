import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace Wsstore {

    export type int = number;

    export interface CreateStoreRequest {
        Name?: string;
        Type?: string;
        Description?: string;
        MaxValueSize?: int;
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

    export interface CreateStoreResponse {
        Exceptions?: Exceptions;
        Name?: string;
        Type?: string;
        Description?: string;
        Owner?: string;
        Success?: boolean;
    }

    export interface DeleteRequest {
        StoreName?: string;
        Namespace?: string;
        Key?: string;
        UserSpecific?: boolean;
        TargetUser?: string;
    }

    export interface DeleteResponse {
        Exceptions?: Exceptions;
        Success?: boolean;
    }

    export interface DeleteNamespaceRequest {
        StoreName?: string;
        Namespace?: string;
        UserSpecific?: boolean;
        TargetUser?: string;
    }

    export interface DeleteNamespaceResponse {
        Exceptions?: Exceptions;
        Success?: boolean;
    }

    export interface FetchRequest {
        StoreName?: string;
        Namespace?: string;
        Key?: string;
        UserSpecific?: boolean;
    }

    export interface FetchResponse {
        Exceptions?: Exceptions;
        Value?: string;
    }

    export interface FetchAllRequest {
        StoreName?: string;
        Namespace?: string;
        UserSpecific?: boolean;
    }

    export interface Pair {
        Key?: string;
        Value?: string;
    }

    export interface Pairs {
        Pair?: Pair[];
    }

    export interface FetchAllResponse {
        Exceptions?: Exceptions;
        Namespace?: string;
        Pairs?: Pairs;
    }

    export interface FetchKeyMDRequest {
        StoreName?: string;
        Namespace?: string;
        Key?: string;
        UserSpecific?: boolean;
    }

    export interface FetchKeyMDResponse {
        Exceptions?: Exceptions;
        StoreName?: string;
        Namespace?: string;
        Key?: string;
        Pairs?: Pairs;
    }

    export interface ListKeysRequest {
        StoreName?: string;
        Namespace?: string;
        UserSpecific?: boolean;
    }

    export interface KeySet {
        Key?: string[];
    }

    export interface ListKeysResponse {
        Exceptions?: Exceptions;
        StoreName?: string;
        Namespace?: string;
        KeySet?: KeySet;
    }

    export interface ListNamespacesRequest {
        StoreName?: string;
        UserSpecific?: boolean;
    }

    export interface Namespaces {
        Namespace?: string[];
    }

    export interface ListNamespacesResponse {
        Exceptions?: Exceptions;
        StoreName?: string;
        Namespaces?: Namespaces;
    }

    export interface ListStoresRequest {
        NameFilter?: string;
        TypeFilter?: string;
        OwnerFilter?: string;
    }

    export interface Store {
        Name?: string;
        Type?: string;
        Description?: string;
        Owner?: string;
        CreateTime?: string;
        MaxValSize?: string;
        IsDefault?: boolean;
    }

    export interface Stores {
        Store?: Store[];
    }

    export interface ListStoresResponse {
        Exceptions?: Exceptions;
        Stores?: Stores;
    }

    export interface wsstorePingRequest {

    }

    export interface wsstorePingResponse {

    }

    export interface SetRequest {
        StoreName?: string;
        Namespace?: string;
        Key?: string;
        Value?: string;
        UserSpecific?: boolean;
    }

    export interface SetResponse {
        Exceptions?: Exceptions;
        Success?: boolean;
    }

}

export class storeServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "wsstore", "1.02");
    }

    CreateStore(request: Wsstore.CreateStoreRequest, abortSignal?: AbortSignal): Promise<Wsstore.CreateStoreResponse> {
        return this._connection.send("CreateStore", request, "json", false, abortSignal, "CreateStoreResponse");
    }

    Delete(request: Wsstore.DeleteRequest, abortSignal?: AbortSignal): Promise<Wsstore.DeleteResponse> {
        return this._connection.send("Delete", request, "json", false, abortSignal, "DeleteResponse");
    }

    DeleteNamespace(request: Wsstore.DeleteNamespaceRequest, abortSignal?: AbortSignal): Promise<Wsstore.DeleteNamespaceResponse> {
        return this._connection.send("DeleteNamespace", request, "json", false, abortSignal, "DeleteNamespaceResponse");
    }

    Fetch(request: Wsstore.FetchRequest, abortSignal?: AbortSignal): Promise<Wsstore.FetchResponse> {
        return this._connection.send("Fetch", request, "json", false, abortSignal, "FetchResponse");
    }

    FetchAll(request: Wsstore.FetchAllRequest, abortSignal?: AbortSignal): Promise<Wsstore.FetchAllResponse> {
        return this._connection.send("FetchAll", request, "json", false, abortSignal, "FetchAllResponse");
    }

    FetchKeyMetadata(request: Wsstore.FetchKeyMDRequest, abortSignal?: AbortSignal): Promise<Wsstore.FetchKeyMDResponse> {
        return this._connection.send("FetchKeyMetadata", request, "json", false, abortSignal, "FetchKeyMDResponse");
    }

    ListKeys(request: Wsstore.ListKeysRequest, abortSignal?: AbortSignal): Promise<Wsstore.ListKeysResponse> {
        return this._connection.send("ListKeys", request, "json", false, abortSignal, "ListKeysResponse");
    }

    ListNamespaces(request: Wsstore.ListNamespacesRequest, abortSignal?: AbortSignal): Promise<Wsstore.ListNamespacesResponse> {
        return this._connection.send("ListNamespaces", request, "json", false, abortSignal, "ListNamespacesResponse");
    }

    ListStores(request: Wsstore.ListStoresRequest, abortSignal?: AbortSignal): Promise<Wsstore.ListStoresResponse> {
        return this._connection.send("ListStores", request, "json", false, abortSignal, "ListStoresResponse");
    }

    Ping(request: Wsstore.wsstorePingRequest, abortSignal?: AbortSignal): Promise<Wsstore.wsstorePingResponse> {
        return this._connection.send("Ping", request, "json", false, abortSignal, "wsstorePingResponse");
    }

    Set(request: Wsstore.SetRequest, abortSignal?: AbortSignal): Promise<Wsstore.SetResponse> {
        return this._connection.send("Set", request, "json", false, abortSignal, "SetResponse");
    }

}
